import "dotenv/config";
// npm init -y
// npx tsc --init

import express, { Request, Response } from "express";
import { connectDB } from "./config/db.config";
import { ENV_CONFIG } from "./config/env.config";

//! importing routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = ENV_CONFIG.port || 8000;
//! connect to database

connectDB();

//! using middleware
app.use(express.json({ limit: "10mb" })); //parse req body json data

// ! using routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//! root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is up and running",
  });
});

// listen
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
