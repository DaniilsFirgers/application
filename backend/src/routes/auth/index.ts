import { Router } from "express";
import passport from "passport";

const SUCCESS_REDIRECT = "/tmp/success";
const FAILURE_REDIRECT = "/tmp/failure";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT,
  })
);

export default authRouter;
