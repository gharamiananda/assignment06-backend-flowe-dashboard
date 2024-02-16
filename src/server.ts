import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
import seedSuperManager from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    seedSuperManager();

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", async () => {
  process.exit(1);
});
