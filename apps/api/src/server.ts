import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from '@/routes/meetings.route'

const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/health-check", async (_, res) => res.json({ ok: true }))
    .use("/api/meetings", router);

  return app;
};

export { createServer }
