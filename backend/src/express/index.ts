import express from "express";
import cors from "cors";
import config from "../config";
import cookieParser from "cookie-parser";
import { sessionConfig } from "../cookies";
import session from "express-session";
import passport from "passport";
import path from "path";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();

app.use(express.static(path.join(__dirname, "../../public")));

app.use(
  cors({
    credentials: true,
    origin: `${config.server.protocol}://${config.server.host}:${config.server.port}`, // strict CORS policy
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.credentials.google_auth.client_id,
      clientSecret: config.credentials.google_auth.client_secret,
      callbackURL: `${config.server.protocol}://${config.server.host}:${config.server.port}${config.credentials.google_auth.callback_url}`,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

const server = app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});

app.get("/ui", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

server.on("error", (error) => {
  console.error("Error starting server", error);
});

export { app };
