import { afterAll, describe, it, expect } from "vitest";
import { buildApp } from "./main";

const app = buildApp();

afterAll(async () => {
  await app.close();
});

describe("api routes", () => {
  it("serves root route", async () => {
    const res = await app.inject({ method: "GET", url: "/" });
    expect(res.statusCode).toBe(200);
  });

  it("returns custom 404 with hint", async () => {
    const res = await app.inject({ method: "GET", url: "/unknown" });
    expect(res.statusCode).toBe(404);
    expect(res.json().hint).toBe("Check GET /routes for the supported endpoints.");
  });
});
