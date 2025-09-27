// routes/auth.routes.js
import { Router } from "express";
import { login, me, register } from "../controllers/authController.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authRequired, me);

export default router;
