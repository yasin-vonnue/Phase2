import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import prisma from "../src/config/database.js";
import { createApp } from "../src/app.js";

const app = createApp();

describe("Authentication API", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("registers a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "auth@example.com",
      password: "Password123!",
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe("auth@example.com");
    expect(response.body.user.id).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.password).toBeUndefined();
    expect(response.body.passwordHash).toBeUndefined();
  });

  it("rejects duplicate email registration", async () => {
    await request(app).post("/auth/register").send({
      email: "auth@example.com",
      password: "Password123!",
    });

    const response = await request(app).post("/auth/register").send({
      email: "auth@example.com",
      password: "Password123!",
    });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe("Email already registered");
  });

  it("logs in with valid credentials", async () => {
    await request(app).post("/auth/register").send({
      email: "auth@example.com",
      password: "Password123!",
    });

    const response = await request(app).post("/auth/login").send({
      email: "auth@example.com",
      password: "Password123!",
    });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("auth@example.com");
    expect(response.body.accessToken).toBeDefined();
  });

  it("rejects an incorrect password", async () => {
    await request(app).post("/auth/register").send({
      email: "auth@example.com",
      password: "Password123!",
    });

    const response = await request(app).post("/auth/login").send({
      email: "auth@example.com",
      password: "WrongPassword!",
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid email or password");
  });

  it("rejects an unknown email", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "unknown@example.com",
      password: "Password123!",
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid email or password");
  });

  it("returns the current user with a valid token", async () => {
    const registerResponse = await request(app).post("/auth/register").send({
      email: "auth@example.com",
      password: "Password123!",
    });

    const response = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${registerResponse.body.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("auth@example.com");
  });

  it("rejects /auth/me without a token", async () => {
    const response = await request(app).get("/auth/me");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Authentication required");
  });

  it("rejects /auth/me with an invalid token", async () => {
    const response = await request(app)
      .get("/auth/me")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid or expired token");
  });
});
