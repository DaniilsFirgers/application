import fs from "fs";
import path from "path";
import toml from "toml";
import process from "process";

type Config = {
  server: {
    port: number;
    host: string;
    protocol: string;
  };
  database: {
    postgres: {
      host: string;
      port: number;
      name: string;
    };
  };
  credentials: {
    database: {
      postgres: {
        user: string;
        password: string;
      };
    };
    google_auth: {
      client_id: string;
      client_secret: string;
      cookie_secret: string;
      callback_url: string;
    };
  };
};
const BASE_CONFIG_PATH = process.env["SERVER_CONFIG_PATH"]!;
const configPath = path.join(BASE_CONFIG_PATH, "config.toml");
const config: Config = toml.parse(fs.readFileSync(configPath, "utf-8"));

export default config;
