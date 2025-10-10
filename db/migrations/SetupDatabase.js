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
    category TEXT NOT NULL,
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

  const seedData = `
-- Cables
INSERT INTO products (seller_id, title, description, price, image_url, rating, rating_count, category) VALUES
(1, 'HDMI 2.1 Cable 2m', 'High-speed HDMI 2.1 cable, supports 4K@120Hz and 8K passthrough.', 19.99, 'https://upload.wikimedia.org/wikipedia/commons/e/e2/HDMI_Cable_1.JPG', 4.4, 162, 'Cables'),
(1, 'USB-C to USB-A Cable 1m', 'Durable USB-C to USB-A cable, fast charging & data sync.', 9.99, 'https://upload.wikimedia.org/wikipedia/commons/7/77/USB_Type-C_Charging_Cable_for_Apple_MacBook_Pro_%2845718811934%29.jpg', 4.2, 98, 'Cables'),
(1, 'Ethernet Cat6 RJ45 Cable 2m', 'Cat6 UTP cable for gigabit Ethernet, gold-plated RJ45 connectors.', 12.99, 'https://upload.wikimedia.org/wikipedia/commons/a/a2/RJ45_Ethernet_Cable.jpg', 4.3, 74, 'Cables'),
(1, 'DisplayPort 1.4 Cable 2m', 'DisplayPort 1.4 cable—supports 8K and HDR.', 21.99, 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Displayport-cable.jpg', 4.1, 45, 'Cables');

-- Laptops
INSERT INTO products (seller_id, title, description, price, image_url, rating, rating_count, category) VALUES
(1, 'Dell XPS 13', '13-inch ultrabook with Intel CPUs, compact bezel, premium build.', 999.99, 'https://upload.wikimedia.org/wikipedia/commons/8/85/Dell_XPS_13_9300.jpg', 4.6, 210, 'Laptops'),
(1, 'MacBook Air M1 13"', 'Apple M1, 13-inch MacBook Air — great battery life and fanless design.', 999.00, 'https://upload.wikimedia.org/wikipedia/commons/2/20/MacBook_Air_M1.png', 4.8, 345, 'Laptops'),
(1, 'HP Pavilion 15', '15-inch mainstream laptop for work and study.', 649.99, 'https://upload.wikimedia.org/wikipedia/commons/a/a7/HP_Pavilion_laptop.jpg', 4.1, 66, 'Laptops'),
(1, 'Lenovo Legion 5', 'Gaming laptop with dedicated GPU (good price/perf).', 1199.99, 'https://upload.wikimedia.org/wikipedia/commons/5/54/Lenovo_legion_%28laptop%29_%26_Lenovo_400_Wireless_%28Mouse%29_IMG_6309ab.jpg', 4.5, 180, 'Laptops');

-- Smartphones
INSERT INTO products (seller_id, title, description, price, image_url, rating, rating_count, category) VALUES
(1, 'Apple iPhone 14 (128GB)', 'iPhone 14 — excellent camera and performance.', 799.00, 'https://upload.wikimedia.org/wikipedia/commons/0/05/IPhone_14_20240225_%281%29.jpg', 4.7, 1200, 'Smartphones'),
(1, 'Samsung Galaxy S23 (128GB)', 'Galaxy S23 — flagship Samsung phone with great display.', 799.99, 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Samsung_Galaxy_S23_Series.jpg', 4.6, 950, 'Smartphones'),
(1, 'Google Pixel 7 (128GB)', 'Pixel 7 — clean Android experience and strong camera.', 599.99, 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Google_Pixel_7_20230416_HOF00365_RAW-Export.png', 4.5, 670, 'Smartphones'),
(1, 'OnePlus 11 (256GB)', 'OnePlus 11 — flagship performance and fast charging.', 699.00, 'https://upload.wikimedia.org/wikipedia/commons/3/3f/OnePlus_One_64_GB.JPG', 4.4, 420, 'Smartphones');

-- Videojuegos
INSERT INTO products (seller_id, title, description, price, image_url, rating, rating_count, category) VALUES
(1, 'PlayStation 5 (Disc)', 'Sony PlayStation 5 console — next-gen gaming.', 499.99, 'https://upload.wikimedia.org/wikipedia/commons/4/47/PlayStation_5_and_DualSense_%282%29.jpg', 4.9, 5000, 'Videojuegos'),
(1, 'Xbox Series X', 'Microsoft Xbox Series X — powerful console for 4K gaming.', 499.99, 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Xbox_series_X_%2850648958962%29.jpg', 4.8, 4200, 'Videojuegos'),
(1, 'Nintendo Switch OLED', 'Nintendo Switch OLED Model — docked and handheld play.', 349.99, 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Nintendo_Switch_-_OLED.jpg', 4.7, 3800, 'Videojuegos'),
(1, 'Cyberpunk 2077 - PS5 Standard', 'Cyberpunk 2077 (PS5) — open-world RPG with modern update.', 59.99, 'https://upload.wikimedia.org/wikipedia/commons/4/4c/CP2077LOGO.jpg', 3.8, 2200, 'Videojuegos');
`;

  try {
    await client.connect();
    await client.query(query);
    console.log("✅ Tables created or verified successfully.");

    await client.query(seedData);
    console.log("✅ Seed data inserted successfully.");
  } catch (err) {
    console.error("❌ Error creating tables or inserting seed data:", err);
  } finally {
    await client.end();
  }
}

createTables();
