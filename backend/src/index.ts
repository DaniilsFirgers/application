import "./config";
import "./express/index";
import "./database/index";
import "./routes/index";

import process from "process";
console.log("Starting server...");

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
});
