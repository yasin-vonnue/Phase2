import { Router } from "express";
import rateLimit from "express-rate-limit";

import { authenticate } from "../middleware/authMiddleware.js";

export function createAuthRoutes(
  controller: ReturnType<
    typeof import("../controllers/authController.js").createAuthController
  >,
) {
  const router = Router();

  const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });

  router.post("/register", controller.register);
  router.post("/login", loginRateLimiter, controller.login);
  router.get("/me", authenticate, controller.currentUser);

  return router;
}
