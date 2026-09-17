import "dotenv/config";
import express from "express";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandlerMiddleware } from "./middlewares/error.middleware.js";
import { rateLimit } from "express-rate-limit";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
  optionsSuccessStatus: 200 
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    error: 'Limite de requisições atingido! Tente novamente mais tarde.'
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());

app.get("/health", (_, res) => {
    return res.status(200).json({
        application: "Junto",
        version: "1.0.0",
        status: "online"
    });
});

app.use("/api", userRouter);
app.use("/api", projectRouter);
app.use("/api/auth", authRouter);
app.use(errorHandlerMiddleware);

export default app;