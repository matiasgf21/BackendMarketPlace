import fs from "fs";
import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

async function createTables() {
  const query = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    seller_id INT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    rating NUMERIC(2,1) DEFAULT 0,
    rating_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    total NUMERIC(10,2) DEFAULT 0.00
  );

  CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    price NUMERIC(10,2) NOT NULL
  );
  `;

  try {
    await client.connect();
    await client.query(query);
    console.log("✅ Tables created or verified successfully.");

    // 2️⃣ Load and run the 002_seed.sql file if it exists
    const seedFilePath = "db/migrations/002_seed.sql";
    if (fs.existsSync(seedFilePath)) {
      const seedSQL = fs.readFileSync(seedFilePath, "utf8");
      await client.query(seedSQL);
      console.log("✅ Seed data inserted successfully.");
    } else {
      console.log("⚠️  No 002_seed.sql file found. Skipping seed data.");
    }

  } catch (err) {
    console.error("❌ Error creating tables or inserting seed data:", err);
  } finally {
    await client.end();
  }
}

createTables();