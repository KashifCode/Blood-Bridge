// IMPORTS -
const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");
const connectDatabase = require("./config/database");
const {initializeSocket} = require("./utils/location");

// PARTIALS -
const server = http.createServer(app);
initializeSocket(server);


// HANDLING UNCAUGHT EXCEPTION -
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("SHUTTING DOWN SERVER DUE TO UNCAUGHT EXCEPTION");
  process.exit(1);
});

// CONFIG -
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config/config.env" });
}

// CONNECTING DATABASE -
connectDatabase();

// SETTING UP THE SERVER -
const runner = server.listen(process.env.PORT, () => {
  console.log(`SERVER IS WORKING ON PORT: ${process.env.PORT}`);
});

// UNHANDLED PROMISE REJECTION -
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("SHUTTING DOWN SERVER DUE TO UNHANDLED PROMISE REJECTION");
  runner.close(() => process.exit(1));
});

