import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent
}));
app.use(express.json({limit: "16kb"})); // Limit the size of JSON payloads to 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  // Limit the size of URL-encoded payloads to 16kb
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(cookieParser()); // Parse cookies from incoming requests

// routes import

import userRouter from './routes/user.routes.js';

// router declaration
app.use("/api/v1/users", userRouter);


export { app }