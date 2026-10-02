import { afterEach, describe, expect, it } from "vitest";

import { getFrontendBaseUrl } from "../emails/shared/layout.js";

describe("public frontend URL", () => {
  const previousProduction = process.env.FRONTEND_URL_PRODUCTION;
  const previousFrontend = process.env.FRONTEND_URL;

  afterEach(() => {
    if (previousProduction === undefined) {
      delete process.env.FRONTEND_URL_PRODUCTION;
    } else {
      process.env.FRONTEND_URL_PRODUCTION = previousProduction;
    }
    if (previousFrontend === undefined) {
      delete process.env.FRONTEND_URL;
    } else {
      process.env.FRONTEND_URL = previousFrontend;
    }
  });

  it("uses appsfly.cl when no frontend URL is configured", () => {
    delete process.env.FRONTEND_URL_PRODUCTION;
    delete process.env.FRONTEND_URL;

    expect(getFrontendBaseUrl()).toBe("https://appsfly.cl");
  });

  it("prefers the configured production frontend URL", () => {
    process.env.FRONTEND_URL_PRODUCTION = "https://appsfly.cl/";
    process.env.FRONTEND_URL = "http://localhost:5173";

    expect(getFrontendBaseUrl()).toBe("https://appsfly.cl");
  });
});
