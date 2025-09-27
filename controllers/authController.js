// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createUser, findUserByEmail } from "../models/userModel.js";

// No caches el secreto en variables de módulo: léelo al firmar
function signToken(payload) {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error("JWT_SECRET no está definido");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email y password son obligatorios" });
    }

    // Verifica que el secreto exista ANTES de crear usuario
    if (!process.env.JWT_SECRET?.trim()) {
      return res.status(500).json({ error: "Config del servidor inválida (JWT_SECRET)" });
    }

    const exists = await findUserByEmail(email);
    if (exists) return res.status(409).json({ error: "El email ya está registrado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return res.status(201).json({
      message: "✅ Usuario creado correctamente",
      user,
      token,
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ error: "Error en registro" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email y password son obligatorios" });
    }

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return res.json({
      message: "✅ Login exitoso",
      user: safeUser,
      token,
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ error: "Error en login" });
  }
}

export async function me(req, res) {
  // req.user viene del middleware de auth
  return res.json({
    message: "ℹ️ Sesión válida",
    user: req.user,
  });
}
