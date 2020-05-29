import express, { Request, Response, NextFunction, raw } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { developmentConfig, productionConfig } from "../configs";
const { check } = require("express-validator");
const passport = require("passport");

// Defining new Express application
const app = express();
const api = require("./services");

// Load configuration based on the environment states
if (process.env.NODE_ENV !== "production") {
  developmentConfig();
} else {
  productionConfig();
}

// Initiliazing Database Connection
require("../db");

// Adding The 'body-parser' middleware only handles JSON and urlencoded data
app.use(express.json());

// cors middleware for orign and Headers
app.use(cors());

// Use Morgan middleware for logging every request status on console
app.use(morgan("dev"));

// Allow any method from any host and log requests
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Handling GZIPPED ROUTES
const encodeResToGzip = (contentType: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", contentType);
    next();
  };
};

// Converting static files to Gzipped Extensions
app.get("*.js", encodeResToGzip("text/javascript"));
app.get("*.css", encodeResToGzip("text/css"));

// Route API Calls to seperate router
let authService = new api.AuthService();
console.log("authService: ", authService.signIn());

app.use("/signIn", authService.signIn);
app.post(
  "/signUp",
  [
    //username must be an email
    check("email").isEmail(),
    // password must be at least 5 chars long
    check("password").isLength({ min: 5 }),
    // // first name
    check("first_name").isAlpha().trim().escape(),
    // //last name
    check("last_name").isAlpha().trim().escape(),
  ],
  authService.signUp
);

// Routes which should handle request
app.all("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// Invalid routes handling middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("404 not found");
  next(error);
});

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Compressing the Application
app.use(compression());

export { app };
