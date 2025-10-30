import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:8080",  // 👈 allow your frontend origin
  credentials: true,                // optional but good if you use cookies or auth
}));
app.use(express.json());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
