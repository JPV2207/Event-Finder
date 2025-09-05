// server.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import locationRoutes from "./routes/location.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mount routes
app.use("/api", locationRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) =>
  res.json({ ok: true, message: "Event Finder API is running" })
);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 20,
      minPoolSize: 2,
      dbName: "event-finder",
    });
    console.log("MongoDB connected!");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening on: ${port}`));
  } catch (err) {
    console.error("MongoDB connect error:", err.message);
    process.exit(1);
  }
};

start();
