// routes/productos.routes.js
import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// GET /productos
router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query(
  "SELECT id, title AS nombre, price AS precio, image_url, category FROM products"
);
    res.json(rows);
  } catch (e) {
    console.error("GET /productos error:", e);
    res.status(500).json({ error: "DB error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
   const { rows } = await pool.query(
  "SELECT id, title AS nombre, price AS precio, image_url, category FROM products WHERE id = $1",
  [req.params.id]
);

    if (!rows[0]) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (e) {
    console.error("GET /productos/:id error:", e);
    res.status(500).json({ error: "DB error" });
  }
});

// POST /productos
router.post("/", async (req, res) => {
  try {
    // Acepta ambas convenciones: (title, price) o (nombre, precio)
    const { title, price, nombre, precio, description, image_url } = req.body || {};
    const _title = title ?? nombre;
    const _price = price ?? precio;

    if (!_title || _price === undefined) {
      return res.status(400).json({ message: "Faltan datos del producto" });
    }

    const { rows } = await pool.query(
      `INSERT INTO products (seller_id, title, description, price, image_url)
       VALUES (1, $1, $2, $3, $4)
       RETURNING id, title AS nombre, price AS precio`,
      [_title, description ?? null, _price, image_url ?? null]
    );

    res.status(201).json(rows[0]);
  } catch (e) {
    console.error("POST /productos error:", e);
    res.status(500).json({ error: "DB error" });
  }
});


// DELETE /productos/:id
router.delete("/:id", async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM products WHERE id = $1", [
      req.params.id,
    ]);
    if (rowCount === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.sendStatus(204);
  } catch (e) {
    console.error("DELETE /productos/:id error:", e);
    res.status(500).json({ error: "DB error" });
  }
});

export default router;
