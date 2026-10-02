import { describe, expect, it, vi } from "vitest";

const listPlans = vi.hoisted(() => vi.fn());
vi.mock("../services/planService.js", () => ({ getAllPlansService: listPlans }));

import { getPlans } from "../controllers/plan.controller.js";

describe("public plan catalog", () => {
  it("previews inactive optics prices without exposing inactive Pro for checkout", async () => {
    listPlans.mockResolvedValue([
      { planId: "OPT-TRIAL", planActive: true },
      { planId: "OPT-START", planActive: false },
      { planId: "OPT-STANDARD", planActive: false },
      { planId: "OPT-PRO", planActive: false },
    ]);
    const json = vi.fn();
    await getPlans({}, { json });
    expect(json).toHaveBeenCalledWith([
      expect.objectContaining({ planId: "OPT-TRIAL" }),
      expect.objectContaining({ planId: "OPT-START", planActive: false }),
      expect.objectContaining({ planId: "OPT-STANDARD", planActive: false }),
    ]);
  });
});
