import { publicBootError } from "./bootError.js";

let app;
let bootError;

try {
  const loaded = await import("./server.js");
  app = loaded.default;
} catch (error) {
  bootError = error;
}

export default function handler(req, res) {
  if (bootError || !app) {
    const body = publicBootError(bootError ?? new Error("The API bundle did not load."));
    res.statusCode = 500;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify(body));
    return;
  }

  return app(req, res);
}
