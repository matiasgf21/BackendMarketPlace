-- Limpiar datos previos (opcional: garantiza consistencia en tests)
TRUNCATE TABLE products RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Usuario 1 (si no existe) para usar como seller_id=1
INSERT INTO users (id, name, email, password_hash, role)
VALUES (1, 'Seed', 'seed@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'user')
ON CONFLICT (id) DO NOTHING;

-- Producto 1 (si no existe) asociado al usuario 1
INSERT INTO products (id, seller_id, title, price)
VALUES (1, 1, 'Semilla', 1)
ON CONFLICT (id) DO NOTHING;

-- Ajustar secuencias al máximo id existente
SELECT setval(pg_get_serial_sequence('users','id'), (SELECT COALESCE(MAX(id), 0) FROM users));
SELECT setval(pg_get_serial_sequence('products','id'), (SELECT COALESCE(MAX(id), 0) FROM products));
