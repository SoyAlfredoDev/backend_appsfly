import { afterEach, describe, expect, it } from "vitest";

import {
  getAppsFlyEmailLogoUrl,
  getFrontendBaseUrl,
  wrapEmailLayout,
} from "../emails/shared/layout.js";

describe("public frontend URL", () => {
  const previousProduction = process.env.FRONTEND_URL_PRODUCTION;
  const previousFrontend = process.env.FRONTEND_URL;
  const previousLogo = process.env.APPSFLY_EMAIL_LOGO_URL;

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
    if (previousLogo === undefined) {
      delete process.env.APPSFLY_EMAIL_LOGO_URL;
    } else {
      process.env.APPSFLY_EMAIL_LOGO_URL = previousLogo;
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

  it("points transactional emails at the color AppsFly logo", () => {
    delete process.env.APPSFLY_EMAIL_LOGO_URL;
    process.env.FRONTEND_URL_PRODUCTION = "https://appsfly.cl";

    expect(getAppsFlyEmailLogoUrl()).toBe("https://appsfly.cl/logo_appsfly.png");
  });

  it("places the color logo and a grouped legal footer in platform emails", () => {
    delete process.env.APPSFLY_EMAIL_LOGO_URL;
    process.env.FRONTEND_URL_PRODUCTION = "https://appsfly.cl";

    const html = wrapEmailLayout({
      title: "Prueba",
      preheader: "Prueba",
      bodyHtml: "<p>Hola</p>",
    });

    expect(html).toContain("https://appsfly.cl/logo_appsfly.png");
    expect(html).toContain("TECNOLOGÍA Y SERVICIOS APPSFLY SPA");
    expect(html).toContain("RUT 77.719.288-4");
    expect(html).toContain("https://www.instagram.com/appsfly.app/");
    expect(html).toContain("https://www.linkedin.com/company/appsfly/");
    expect(html).toContain("soporte@appsfly.app");
  });
});
