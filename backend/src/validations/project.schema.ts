import { z } from "zod";
import { estados } from "../constants/estados.js";
import { diasFuncionamento } from "../constants/diasFuncionamento.js";
import { categorias } from "../constants/categorias.js";
import { projectStatus } from "../constants/status.js";

export const projectSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(255),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Email invalido"),
    telefone: z
        .string()
        .regex(/^\d{10,11}$/, "Telefone inválido"),
    diasFuncionamento: z
        .array(z.enum(diasFuncionamento, "Dia inválido"))
        .nonempty("Selecione pelo menos um dia de funcionamento"),
    endereco: z.string().min(3, "Endereço deve conter no mínimo 3 caracteres").max(255),
    bairro: z.string().min(3, "Bairro deve conter no mínimo 3 caracteres").max(100),
    cidade: z.string().min(3, "Cidade deve conter no mínimo 3 caracteres").max(100),
    estado: z
        .string()
        .trim()
        .toUpperCase()
        .refine((estado) => estados.includes(estado as typeof estados[number]), {
            message: "Estado inválido",
        }),
    cep: z
        .string()
        .regex(/^\d{8}$/, "CEP inválido"),
    descricao: z.string().min(3).max(1000).optional(),
    categoria: z.enum(categorias, "Categoria inválida"),
    avatarUrl: z.string().optional(),
    instagram: z.string().trim().optional(),
    facebook: z.string().trim().optional(),
    site: z.string().url().optional(),
    imagensProjeto: z.array(z.string().url()).optional(),
    status: z.enum(projectStatus, "Status inválido")
})

export const updateProjectSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(255)
        .optional(),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Email invalido")
        .optional(),
    telefone: z
        .string()
        .regex(/^\d{10,11}$/, "Telefone inválido")
        .optional(),
    diasFuncionamento: z
        .array(z.enum(diasFuncionamento, "Dia inválido"))
        .nonempty("Selecione pelo menos um dia de funcionamento")
        .optional(),
    endereco: z.string().min(3, "Endereço deve conter no mínimo 3 caracteres").max(255).optional(),
    bairro: z.string().min(3, "Bairro deve conter no mínimo 3 caracteres").max(100).optional(),
    cidade: z.string().min(3, "Cidade deve conter no mínimo 3 caracteres").max(100).optional(),
    estado: z
        .string()
        .trim()
        .toUpperCase()
        .refine((estado) => estados.includes(estado as typeof estados[number]), {
            message: "Estado inválido",
        })
        .optional(),
    cep: z
        .string()
        .regex(/^\d{8}$/, "CEP inválido")
        .optional(),
    descricao: z.string().min(3).max(1000).optional(),
    categoria: z.enum(categorias, "Categoria inválida").optional(),
    avatarUrl: z.string().url().optional(),
    instagram: z.string().url().trim().optional(),
    facebook: z.string().url().trim().optional(),
    site: z.string().url().optional(),
    imagensProjeto: z.array(z.string().url()).optional(),
    status: z.enum(projectStatus, "Status inválido").optional()
})