import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from '@/routes/meetings.route'
import authRouter from '@/routes/auth.route'

const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/health-check", async (_, res) => res.json({ ok: true }))
    .use("/api/meetings", router)
    .use("/api/auth", authRouter);

  return app;
};

export { createServer }
