CREATE EXTENSION IF NOT EXISTS citext;

-- Usuarios
CREATE TABLE IF NOT EXISTS users (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         CITEXT UNIQUE NOT NULL,         -- usa EXTENSION citext (o cambia a VARCHAR y UNIQUE sobre lower(email))
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Productos
CREATE TABLE IF NOT EXISTS products (
  id            BIGSERIAL PRIMARY KEY,
  seller_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  price         NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  image_url     TEXT,
  rating        NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  rating_count  INTEGER NOT NULL DEFAULT 0 CHECK (rating_count >= 0),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- ❌ Importante: NO uses JSONB en users para compras/ventas.
-- Eso debe ser una relación (tablas pivote). Si más adelante quieren historial de compras:
--   purchases (id, buyer_id, created_at)
--   purchase_items (id, purchase_id, product_id, quantity, price)
-- Por ahora lo dejamos simple para no romper tu plan actual.
