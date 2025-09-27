// index.js
import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET || !process.env.JWT_SECRET.trim()) {
  console.error("❌ FALTA JWT_SECRET en .env");
  process.exit(1);
}

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import productosRoutes from "./routes/productos.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Market Place ✅ (modo local sin BD)");
});

app.use("/api/auth", authRoutes);
app.use("/api/secure", protectedRoutes);
app.use("/productos", productosRoutes);

app.set("json spaces", 2);

// ⚡ Solo arrancar el servidor si NO estamos en testing
const PORT = process.env.PORT || 9090;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// 👉 Exportar app para Supertest
export default app;
