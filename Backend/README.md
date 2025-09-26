# Database Schema

## Database: marketplace

## Table: users

- id: SERIAL PRIMARY KEY
- username: VARCHAR(50) UNIQUE NOT NULL
- email: VARCHAR(100) UNIQUE NOT NULL
- password: TEXT NOT NULL
- purchased_products: JSONB DEFAULT '[]' -- arreglo de IDs de productos comprados
- sold_products: JSONB DEFAULT '[]' -- areglo de IDs de productos vendidos
- created_at: TIMESTAMP DEFAULT NOW()

---

## Table: products

- id: SERIAL PRIMARY KEY
- seller_id: INTEGER REFERENCES users(id) ON DELETE CASCADE
- title: TEXT NOT NULL
- description: TEXT
- price: NUMERIC(10,2) NOT NULL
- image_url: TEXT
- rating: NUMERIC(2,1) DEFAULT 0
- rating_count: INTEGER DEFAULT 0
- created_at: TIMESTAMP DEFAULT NOW()

---

## Example SQL to create tables

```sql

CREATE DATABASE marketplace;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    purchased_products JSONB DEFAULT '[]',
    sold_products JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    rating NUMERIC(2,1) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- usuarios
INSERT INTO users (email, password, purchases, sales)
VALUES
  ('alice@example.com', '$2a$10$Vb7whjW5I8vO6GRi6Mnv.O9H0q8s4r8s7y3dK8LxHfPaO5zn4rP6e', '[]', '[]'),
  ('bob@example.com', '$2a$10$5GkV7HV9f5G9KkjM4rErFuR4A1T8e5Flsu5O9pW9HjJslrQ20n3E6', '[]', '[]'),
  ('carol@example.com', '$2a$10$8lU1VYyZDbR3oW6h8bE2GuBn9kj0zReQjrnzPQjtlD6ZQ7lV/yFPa', '[]', '[]');

-- productos
INSERT INTO products (name, price, stock)
VALUES
  ('Wireless Mouse', 5.590, 100),
  ('Teclado Mecanico', 23.200, 50),
  ('USB-C Charger', 1.790, 200),
  ('Gaming Headset', 35.990, 75);




```
