import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("POST /api/auth/login", () => {
    it("should return an error for invalid email", async () => {
        const credentials = {
            email: "emailemail.com",
            senha: "s2543254323"
        };

        const response = await request(app)
            .post("/api/auth/login")
            .send(credentials);

        expect(response.status).toBe(400);
        expect(response.body.errors[0].message).toBe("Email inválido");
    });

    it("should return an error for short password", async () => {
        const credentials = {
            email: "email@email.com",
            senha: "s23"
        };

        const response = await request(app)
            .post("/api/auth/login")
            .send(credentials);

        expect(response.status).toBe(400);
        expect(response.body.errors[0].message).toBe("A senha deve ter no mínimo 8 caracteres");
    });
});