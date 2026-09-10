import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("POST /api/users", () => {
    it("should return a validation error for invalid user data", async () => {
        const invalidUserData = {
            nome: "Usuário de teste",
            email: "invalid-email",
            senha: "senha123",
            confirmarSenha: "senha123",
            cpf: "46212345678",
            telefone: "12991014738",
            endereco: "Rua de Teste, 123",
            bairro: "Centro",
            cidade: "Bauru",
            estado: "SP",
            cep: "12345678"
        };

        const response = await request(app)
            .post("/api/users")
            .send(invalidUserData);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.errors[0].message).toBe("Email invalido");
        expect(response.body.errors).toHaveLength(1);
    });
});