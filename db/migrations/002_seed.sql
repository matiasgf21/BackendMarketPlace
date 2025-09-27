-- Puedes generar hashes con bcryptjs o desde Node.
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Alice', 'alice@example.com', '$2a$10$Wzjz1rUo7c1FJdNf2G1sZ.0v3n5H0b7oU7ZK4nLwXz9xkWv8pYcU2', 'user'),
  ('Bob',   'bob@example.com',   '$2a$10$Wzjz1rUo7c1FJdNf2G1sZ.0v3n5H0b7oU7ZK4nLwXz9xkWv8pYcU2', 'user'),
  ('Admin', 'admin@example.com', '$2a$10$Wzjz1rUo7c1FJdNf2G1sZ.0v3n5H0b7oU7ZK4nLwXz9xkWv8pYcU2', 'admin');

-- Nota: los 3 usan el mismo hash (ej: "123456"). Genera los tuyos si quieres distintos.

-- Toma IDs reales insertados
WITH s AS (
  SELECT id FROM users WHERE email = 'alice@example.com'
), b AS (
  SELECT id FROM users WHERE email = 'bob@example.com'
), a AS (
  SELECT id FROM users WHERE email = 'admin@example.com'
)
INSERT INTO products (seller_id, title, description, price, image_url, rating, rating_count)
VALUES
  ((SELECT id FROM s), 'Wireless Mouse',     'Mouse inalámbrico 2.4G',  5590.00,  NULL, 4.5, 12),
  ((SELECT id FROM b), 'Teclado Mecánico',   'Switches azules',        23200.00,  NULL, 4.6, 34),
  ((SELECT id FROM a), 'USB-C Charger',      'Cargador 20W',            1790.00,  NULL, 4.2, 21),
  ((SELECT id FROM s), 'Gaming Headset',     'Sonido envolvente',      35990.00,  NULL, 4.7, 54);
