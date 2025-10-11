import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET || !process.env.JWT_SECRET.trim()) {
  console.error("❌ FALTA JWT_SECRET en .env");
  process.exit(1);
}

import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

// ✅ Create a PostgreSQL connection using your .env DB_ variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false } // ✅ required for Render PostgreSQL
});

// ✅ Test the connection
pool.query("SELECT NOW()")
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database connection failed:", err));

import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import productosRoutes from "./routes/productos.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Market Place ✅ conectado a PostgreSQL");
});

app.use("/api/auth", authRoutes);
app.use("/api/secure", protectedRoutes);
app.use("/productos", productosRoutes);

app.set("json spaces", 2);

const PORT = process.env.PORT || 9090;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
export { pool };