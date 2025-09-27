// routes/protected.routes.js
import { Router } from "express";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/ping", authRequired, (req, res) => {
  res.json({ ok: true, user: req.user, ts: Date.now() });
});

export default router;
