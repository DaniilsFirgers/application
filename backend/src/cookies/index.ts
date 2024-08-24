import config from "../config";
import session, { SessionOptions } from "express-session";

const sessionConfig: SessionOptions = {
  secret: config.credentials.google_auth.cookie_secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.server.protocol == "https",
    httpOnly: config.server.protocol == "https",
    maxAge: 1000 * 60 * 60, // 1 hour
  },
};

export { sessionConfig };
