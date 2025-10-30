import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { initDB } from "../db.js";

const router = express.Router();
const SECRET = "your_secret_key";

router.post("/signup", async (req, res) => {
  try {
    const db = await initDB();
    const { name, age, email, phone, aadhaar, experience, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await db.run(
      "INSERT INTO users (name, age, email, phone, aadhaar, experience, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, age, email, phone, aadhaar || null, experience || 0, hashed, role]
    );

    res.json({ success: true, message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const db = await initDB();
    const { email, password, role } = req.body;
    const user = await db.get("SELECT * FROM users WHERE email = ? AND role = ?", [email, role]);

    if (!user) return res.status(404).json({ message: "User not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password!" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "2h" });

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
