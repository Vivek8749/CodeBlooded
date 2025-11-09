import dotenv from "dotenv";
import app from "./app.js";
import { connectDB, disconnectDB } from "./db/index.js";
import { PORT } from "./constants.js";

dotenv.config({ path: "./.env" });

const port = Number(PORT) || 8000;

const log = {
  info: (...args) => console.log("[app]", ...args),
  warn: (...args) => console.warn("[app]", ...args),
  error: (...args) => console.error("[app]", ...args),
};

function handleFatal(error, code = 1) {
  log.error("Fatal error", error);
  process.exit(code);
}

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(port, () => {
      log.info(`Server listening on port ${port}`);
    });

    server.on("error", (err) => {
      log.error("HTTP server error", err);
    });

    const shutdown = async (signal) => {
      log.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async (serverErr) => {
        if (serverErr) {
          log.error("Error while closing HTTP server", serverErr);
        }
        try {
          await disconnectDB();
        } catch (dbErr) {
          log.error("Error while disconnecting from MongoDB", dbErr);
        }
        process.exit(0);
      });
    };

    ["SIGINT", "SIGTERM", "SIGUSR2"].forEach((signal) => {
      process.once(signal, () => shutdown(signal));
    });

    process.on("unhandledRejection", (reason) => {
      log.error("Unhandled promise rejection", reason);
      shutdown("unhandledRejection");
    });

    process.on("uncaughtException", (error) => {
      log.error("Uncaught exception", error);
      shutdown("uncaughtException");
    });
  } catch (error) {
    log.error("Failed to start server", error);
    handleFatal(error);
  }
}

startServer();

export { startServer };
