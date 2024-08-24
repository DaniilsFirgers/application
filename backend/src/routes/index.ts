import { Router } from "express";
import authRouter from "./auth";
import apiRouter from "./api";
import tmpRouter from "./tmp";
import { app } from "../express";
import { isAuthenticated } from "../middleware/authentication";

const baseRouter = Router();

baseRouter.use("/api", isAuthenticated, apiRouter);
baseRouter.use("/tmp", isAuthenticated, tmpRouter);
baseRouter.use("/auth", authRouter);

app.use("/", baseRouter);

export default baseRouter;
