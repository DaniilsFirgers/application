import { Request, Response, NextFunction } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
}

export { isAuthenticated };
