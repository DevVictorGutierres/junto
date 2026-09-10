import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("GET /api/users sem cabeçalho Authorization", () => {
    it("should return 401 if no token is provided", async () => {
        const response = await request(app).get("/api/users");

        expect(response.status).toBe(401);
        expect(response.body.error).toBe(
            "Voce precisa estar logado para acessar esse recurso."
        );
    });
});

describe("GET /api/users com cabeçalho Authorization inválido", () => {
    it("should return 401 if an invalid token is provided", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer invalid_token");

        expect(response.status).toBe(401);
        expect(response.body.error).toBe(
            "Token inválido ou expirado."
        );
    });
});

describe("GET /api/users com cabeçalho Authorization inválido", () => {
    it("should return 401 if an invalid token is provided", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Basic invalid_token");

        expect(response.status).toBe(401);
        expect(response.body.error).toBe(
            "Token inválido."
        );
    });
});