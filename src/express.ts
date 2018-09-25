import express from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Controllers (route handlers)
import * as spreadSheetController from "./spreadsheet";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../build"))
);

/**
 * Primary app routes.
 */
app.get("/spreadsheet", spreadSheetController.index);

export default app;