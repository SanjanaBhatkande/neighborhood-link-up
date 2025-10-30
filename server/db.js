import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initDB = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      email TEXT UNIQUE,
      phone TEXT,
      aadhaar TEXT,
      experience INTEGER,
      password TEXT,
      role TEXT
    )
  `);

  return db;
};
