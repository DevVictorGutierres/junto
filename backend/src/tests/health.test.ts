import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("GET /", () => {
  it("should return the API health status", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      application: "Juntô",
      version: "1.0.0",
      status: "online"
    });
  });
});