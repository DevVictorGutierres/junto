import { z } from "zod";

export const idSchema = z.object({
    id: z
        .string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/, "ID inválido"),
});