// models/userModel.js
// Implementación en memoria para desarrollo local sin base de datos.
// Más adelante, reemplaza estas funciones con consultas a PostgreSQL
// manteniendo las MISMAS firmas (findUserByEmail, createUser).

const users = []; // almacén en memoria

export async function findUserByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

export async function createUser({ name, email, passwordHash, role = "user" }) {
  const user = {
    id: users.length + 1,
    name,
    email,
    password_hash: passwordHash, // mantenemos este nombre para compatibilidad futura
    role,
    created_at: new Date(),
  };
  users.push(user);

  // Lo que devolvemos como "usuario seguro" (sin hash)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };
}

// (opcional) utilidades de depuración local
export function __debug_listUsers() {
  return users.map(({ password_hash, ...rest }) => rest);
}
