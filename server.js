const express = require("express");
const winston = require("winston");

require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// setup cors
const cors = require("cors");
const corsOptions = {
  // origin: "http://localhost:5000",
};
app.use(cors(corsOptions));

// parse body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/router");
app.use("/", router);

// setup log handlers
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

// Catch all other routes and respond with a 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware.
app.use((err, req, res, next) => {
  logger.error(err.message, { metadata: err.stack });
  res.status(err.status || 500).json({
    success: false,
    message: err?.message || "Internal Server Error",
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
