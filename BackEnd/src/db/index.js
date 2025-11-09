import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Production-friendly MongoDB connection helper
// Features:
// - Builds or validates MONGO_URI
// - Exponential backoff retry on connect
// - Redacted logging for URIs
// - Graceful shutdown handlers
// - Exports connect, disconnect, and health helpers

const DEFAULTS = {
  maxRetries: Number(process.env.DB_MAX_RETRIES) || 5,
  initialDelayMs: Number(process.env.DB_RETRY_DELAY_MS) || 1000,
  socketTimeoutMS: Number(process.env.DB_SOCKET_TIMEOUT_MS) || 45000,
  serverSelectionTimeoutMS:
    Number(process.env.DB_SERVER_SELECTION_TIMEOUT_MS) || 5000,
  maxPoolSize: Number(process.env.DB_MAX_POOL_SIZE) || 10,
  minPoolSize: Number(process.env.DB_MIN_POOL_SIZE) || 1,
};

function buildUriFromParts() {
  const host = process.env.DB_HOST; // e.g. cluster0.example.mongodb.net or localhost:27017
  const name = process.env.DB_NAME || DB_NAME || "test";
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const useSrv =
    (process.env.DB_SRV && process.env.DB_SRV.toLowerCase() === "true") ||
    (host && host.includes("+srv"));

  if (!host) return null;
  if ((user && !pass) || (!user && pass)) return null;

  const credentials =
    user && pass
      ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@`
      : "";
  const scheme = useSrv ? "mongodb+srv" : "mongodb";
  return `${scheme}://${credentials}${host}/${name}`;
}

function getMongoUri() {
  const raw = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : "";
  if (raw) {
    if (raw.startsWith("mongodb://") || raw.startsWith("mongodb+srv://"))
      return raw;
    // Allow people to accidentally include DB name separately (legacy): try to normalize
    if (!raw.includes("//")) return null;
    // If user provided something starting with mongodb but with whitespace, we trimmed above
    console.warn(
      "MONGO_URI provided but didn't start with mongodb:// or mongodb+srv:// — ignoring."
    );
  }

  return buildUriFromParts();
}

function redactUri(uri) {
  if (!uri) return "<empty>";
  // Replace credential section user:pass@ with <REDACTED>@ if present
  return uri.replace(
    /(mongodb(?:\+srv)?:\/\/)([^@]+@)/,
    (m, p1) => `${p1}<REDACTED>@`
  );
}

let _connected = false;
let _shuttingDown = false;

async function connectDB(options = {}) {
  const opts = { ...DEFAULTS, ...options };

  const uri = getMongoUri();
  if (!uri) {
    const msg =
      'No valid MongoDB connection string found. Set MONGO_URI (must start with "mongodb://" or "mongodb+srv://") or provide DB_HOST/DB_NAME (and optional DB_USER/DB_PASS).';
    console.error(msg);
    // In production, it's preferable to fail fast so caller can decide; return rejected promise
    return Promise.reject(new Error(msg));
  }

  const connectOptions = {
    // Mongoose manages options itself; include some useful pool/timeouts
    serverSelectionTimeoutMS: opts.serverSelectionTimeoutMS,
    socketTimeoutMS: opts.socketTimeoutMS,
    maxPoolSize: opts.maxPoolSize,
    minPoolSize: opts.minPoolSize,
    // useNewUrlParser and useUnifiedTopology are defaults in modern mongoose but including is harmless
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  console.info(`Attempting MongoDB connect -> ${redactUri(uri)}`);

  let attempt = 0;
  let lastError;

  while (attempt < opts.maxRetries && !_shuttingDown) {
    attempt += 1;
    try {
      const conn = await mongoose.connect(uri, connectOptions);
      _connected = true;
      console.info(`MongoDB connected: ${conn.connection.host}`);

      // Wireup basic connection event logging
      mongoose.connection.on("connected", () =>
        console.info("Mongoose connection: connected")
      );
      mongoose.connection.on("reconnected", () =>
        console.info("Mongoose connection: reconnected")
      );
      mongoose.connection.on("disconnected", () => {
        _connected = false;
        console.warn("Mongoose connection: disconnected");
      });
      mongoose.connection.on("error", (err) =>
        console.error("Mongoose connection error:", err)
      );

      // Graceful shutdown handlers (only register once)
      if (!process.__mongooseShutdownHookRegistered) {
        process.__mongooseShutdownHookRegistered = true;
        const shutdown = async (signal) => {
          if (_shuttingDown) return;
          _shuttingDown = true;
          console.info(`Received ${signal}. Closing MongoDB connection...`);
          try {
            await disconnectDB();
            console.info("MongoDB connection closed.");
          } catch (err) {
            console.error(
              "Error while closing MongoDB connection during shutdown",
              err
            );
          }
        };

        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
        process.on("SIGUSR2", () => shutdown("SIGUSR2"));
      }

      return conn;
    } catch (err) {
      lastError = err;
      console.warn(
        `MongoDB connect attempt ${attempt} failed: ${err.message || err}. ` +
          `Retrying in ${opts.initialDelayMs * attempt}ms...`
      );
      // backoff
      await new Promise((r) => setTimeout(r, opts.initialDelayMs * attempt));
    }
  }

  console.error("All MongoDB connection attempts failed", lastError);
  _connected = false;
  return Promise.reject(lastError || new Error("Unable to connect to MongoDB"));
}

async function disconnectDB() {
  try {
    if (mongoose.connection && mongoose.connection.readyState) {
      await mongoose.disconnect();
      _connected = false;
    }
  } catch (err) {
    console.error("Error disconnecting mongoose", err);
    throw err;
  }
}

function healthCheck() {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = mongoose.connection.readyState;
  return { connected: state === 1, state };
}

export { connectDB, disconnectDB, healthCheck };
export default connectDB;
