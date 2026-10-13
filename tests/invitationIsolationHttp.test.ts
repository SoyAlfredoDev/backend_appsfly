import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({
  getInvite: vi.fn(),
  getUser: vi.fn(),
  register: vi.fn(),
  link: vi.fn(),
  respond: vi.fn(),
  list: vi.fn(),
  membership: vi.fn(),
}));
vi.mock("../services/userGuestService.js", () => ({
  createUserGuest: vi.fn(),
  userGuestExists: vi.fn(),
  userGuestResponseService: m.respond,
  getUserGuests: m.list,
  getUserGuestByBusinessIdService: vi.fn(),
  getUserGuestById: m.getInvite,
  findPendingInvite: vi.fn(),
  assertUserBusinessMembership: m.membership,
  findUserBusinessMembership: vi.fn().mockResolvedValue(null),
  findUserByEmail: vi.fn(),
}));
vi.mock("../services/usersService.js", () => ({ getUserById: m.getUser }));
vi.mock("../services/userBusinessService.js", () => ({ createUserBusinessService: m.link }));
vi.mock("../services/billing/planAccessService.js", () => ({ assertCanInviteUser: vi.fn() }));
vi.mock("../controllers/businessDB/user.controller.js", () => ({
  registerUserBusinessAtBusinessDB: m.register,
}));
vi.mock("../emails/dispatchers/invitation.dispatcher.js", () => ({
  sendUserInvitationEmail: vi.fn(),
}));
import {
  userGuestResponseController,
  getUserGuestsController,
  deleteUserGuestController,
} from "../controllers/userGuest.controller.js";
const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  Object.assign(req, { user: { payload: { id: "user-a" } }, tenantBusinessId: "tenant-a" });
  next();
});
app.put("/invite", userGuestResponseController);
app.get("/invites", getUserGuestsController);
app.delete("/invite/:userGuestId", deleteUserGuestController);
describe("invitation tenant isolation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    m.getUser.mockResolvedValue({ userEmail: "qa@example.invalid", userConfirmEmail: true });
    m.getInvite.mockResolvedValue({
      userGuestId: "invite",
      userGuestBusinessId: "tenant-a",
      userGuestEmail: "qa@example.invalid",
      userGuestRole: "USER",
      userGuestStatus: "PENDIENT",
    });
    m.list.mockResolvedValue([]);
    m.respond.mockResolvedValue({});
    m.register.mockResolvedValue({});
    m.link.mockResolvedValue({});
  });
  it("ignores an admin role supplied when accepting a USER invitation", async () => {
    const result = await request(app)
      .put("/invite")
      .send({ userGuestId: "invite", response: "ACCEPTED", userGuestRole: "ADMIN" });
    expect(result.status).toBe(200);
    expect(m.register).toHaveBeenCalledWith("user-a", "tenant-a", "USER");
    expect(m.link).toHaveBeenCalledWith(expect.objectContaining({ userBusinessRole: "USER" }));
  });
  it("does not let unverified email claims redeem invitations", async () => {
    m.getUser.mockResolvedValue({ userEmail: "qa@example.invalid", userConfirmEmail: false });
    const result = await request(app)
      .put("/invite")
      .send({ userGuestId: "invite", response: "ACCEPTED" });
    expect(result.status).toBe(403);
    expect(result.body.code).toBe("EMAIL_VERIFICATION_REQUIRED");
    expect(m.link).not.toHaveBeenCalled();
  });
  it("does not accept invitations sent to another account", async () => {
    m.getUser.mockResolvedValue({ userEmail: "other@example.invalid", userConfirmEmail: true });
    expect(
      (await request(app).put("/invite").send({ userGuestId: "invite", response: "ACCEPTED" }))
        .status,
    ).toBe(403);
    expect(m.respond).not.toHaveBeenCalled();
  });
  it("scopes the general invitation list to the authorized tenant", async () => {
    expect((await request(app).get("/invites")).status).toBe(200);
    expect(m.list).toHaveBeenCalledWith("tenant-a");
  });
  it("checks the role on the invitation business, not a different active business", async () => {
    m.membership.mockResolvedValue({ userBusinessRole: "USER" });
    expect((await request(app).delete("/invite/invite")).status).toBe(403);
    expect(m.respond).not.toHaveBeenCalled();
  });
});
