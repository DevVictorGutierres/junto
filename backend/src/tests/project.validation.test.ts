import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("GET /api/projects?limit=100", () => {
    it("should return a list of projects", async () => {
        const response = await request(app)
            .get("/api/projects")
            .query({ limit: 100 });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeInstanceOf(Array);
    });
}
);