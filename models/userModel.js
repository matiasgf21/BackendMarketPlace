import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT id, username AS name, email, password AS password_hash, role, created_at FROM users WHERE email = $1",
    [email]
  );
  return rows[0] || null;
}

export async function createUser({ name, email, passwordHash, role = "customer" }) {
  const { rows } = await pool.query(
    `INSERT INTO users (username, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username AS name, email, role, created_at`,
    [name, email, passwordHash, role]
  );
  return rows[0];
}