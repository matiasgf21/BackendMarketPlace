import pool from "../config/db";

export async function getAllProducts() {
  const result = await pool.query("SELECT * FROM products ORDER BY id");
  return result.rows;
}

export async function getProductById(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createProduct({ title, description, price, image_url }) {
  const result = await pool.query(
    `INSERT INTO products (title, description, price, image_url)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, price, image_url]
  );
  return result.rows[0];
}

export async function deleteProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
