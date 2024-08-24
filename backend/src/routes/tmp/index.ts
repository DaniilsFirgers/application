import { Router } from "express";
import { Request, Response } from "express";

const tmpRouter = Router();

tmpRouter.get("/success", (req: Request, res: Response) => {
  res.json({ message: "Success" });
});

tmpRouter.get("/failure", (req: Request, res: Response) => {
  res.json({ message: "Failure" });
});

export default tmpRouter;
