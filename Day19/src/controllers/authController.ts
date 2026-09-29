import type { Request, Response } from "express";

export function createAuthController(service: {
  register: (email: string, password: string) => Promise<unknown>;

  login: (email: string, password: string) => Promise<unknown>;

  getCurrentUser: (userId: string) => Promise<{
    id: string;
    email: string;
  }>;
}) {
  async function register(req: Request, res: Response): Promise<void> {
    const { email, password } = (await req).body;

    if (typeof email !== "string" || email.trim() === "") {
      res.status(400).json({
        error: "Email is required",
      });
      return;
    }

    if (typeof password !== "string" || password.length < 8) {
      res.status(400).json({
        error: "Password must be at least 8 characters",
      });
      return;
    }

    try {
      const result = await service.register(
        email.trim().toLowerCase(),
        password,
      );

      res.status(201).json(result);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Email already registered"
      ) {
        res.status(409).json({
          error: error.message,
        });
        return;
      }
      throw error;
    }
  }

  async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (typeof email !== "string" || email.trim() === "") {
      res.status(400).json({
        error: "Email is required",
      });
      return;
    }

    if (typeof password !== "string" || password === "") {
      res.status(400).json({
        error: "Password is required",
      });
      return;
    }

    try {
      const result = await service.login(email.trim().toLowerCase(), password);

      res.status(200).json(result);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Invalid email or password"
      ) {
        res.status(401).json({
          error: "Invalid email or password",
        });
        return;
      }
      throw error;
    }
  }

  async function currentUser(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({
        error: "Authentication required",
      });
      return;
    }

    try {
      const user = await service.getCurrentUser(req.user.id);

      res.status(200).json({
        user,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        res.status(401).json({
          error: "Authentication required",
        });
        return;
      }

      throw error;
    }
  }

  return {
    register,
    login,
    currentUser,
  };
}
