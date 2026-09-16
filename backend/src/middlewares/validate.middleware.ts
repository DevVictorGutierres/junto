import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
    (schema: z.ZodSchema, reqTipo: "body" | "query" | "params") => {

        return (req: Request, res: Response, next: NextFunction) => {

            const tipo = {
                body: req.body,
                query: req.query,
                params: req.params
            }

            const result = schema.safeParse(tipo[reqTipo]);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    errors: result.error.issues
                });
            }

            if (reqTipo === "body")
                req.body = result.data;
            if (reqTipo === "query")
                res.locals.query = result.data;

            next();
        };
    };