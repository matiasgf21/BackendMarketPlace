# Database Schema

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
```
