import config from "../config";
import { Sequelize } from "sequelize";

class Postrgres {
  private static instance: Postrgres;
  public pool: Sequelize;
  constructor() {
    const uri = `postgres://${config.credentials.database.postgres.user}:${config.credentials.database.postgres.password}@${config.database.postgres.host}/${config.database.postgres.name}`;
    console.log("URI", uri);
    this.pool = new Sequelize(
      uri,
      config.credentials.database.postgres.user,
      config.credentials.database.postgres.password,
      {
        host: config.database.postgres.host,
        dialect: "postgres",
        logging: false,
      }
    );
    this.onConnect();
  }

  public static getInstance(): Postrgres {
    if (!Postrgres.instance) {
      Postrgres.instance = new Postrgres();
    }
    return Postrgres.instance;
  }

  private async onConnect() {
    try {
      await this.pool.authenticate();
      console.log(
        "Connection to the database has been established successfully."
      );
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

const postgres = Postrgres.getInstance();

export default postgres;
