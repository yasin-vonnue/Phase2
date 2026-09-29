import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { AuthResponse } from "../types/auth.js";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

export function createAuthService(repository: {
  findById: (id: string) => Promise<{
    id: string;
    email: string;
    passwordHash: string;
    role: string;
  } | null>;

  findByEmail: (email: string) => Promise<{
    id: string;
    email: string;
    passwordHash: string;
    role: string;
  } | null>;

  createUser: (
    email: string,
    passwordHash: string,
  ) => Promise<{
    id: string;
    email: string;
    role: string;
  }>;
}) {
  async function register(
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const existingUser = await repository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await repository.createUser(email, passwordHash);

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  }

  async function login(email: string, password: string): Promise<AuthResponse> {
    const user = await repository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  }

  async function getCurrentUser(userId: string): Promise<{
    id: string;
    email: string;
    role: string;
  }> {
    const user = await repository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  return {
    register,
    login,
    getCurrentUser,
  };
}
