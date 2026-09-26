import { Router } from "express";

import { authenticate } from "../middleware/authMiddleware.js";

export function createAuthRoutes(
  controller: ReturnType<
    typeof import("../controllers/authController.js").createAuthController
  >,
) {
  const router = Router();

  router.post("/register", controller.register);
  router.post("/login", controller.login);
  router.get("/me", authenticate, controller.currentUser);

  return router;
}
