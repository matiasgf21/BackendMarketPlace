// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const [scheme, token] = auth.split(" ");

    if (scheme !== "Bearer" || !token)
      return res.status(401).json({ error: "Token requerido (formato: Bearer <token>)" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    console.error("authRequired:", err?.message);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
