import { describe, expect, it } from "vitest";
import { matchRoute } from "../src/http/router.js";

describe("HTTP router", () => {
  it("matches GET /tasks", () => {
    expect(matchRoute("GET", "/tasks")).toEqual({
      route: {
        method: "GET",
        path: "/tasks",
      },
    });
  });

  it("matches POST /tasks", () => {
    expect(matchRoute("POST", "/tasks")).toEqual({
      route: {
        method: "POST",
        path: "/tasks",
      },
    });
  });

  it("extracts the ID from GET /tasks/:id", () => {
    expect(matchRoute("GET", "/tasks/123")).toEqual({
      route: {
        method: "GET",
        path: "/tasks/:id",
      },
      id: "123",
    });
  });

  it("matches PATCH /tasks/:id", () => {
    expect(matchRoute("PATCH", "/tasks/123")).toEqual({
      route: {
        method: "PATCH",
        path: "/tasks/:id",
      },
      id: "123",
    });
  });

  it("matches DELETE /tasks/:id", () => {
    expect(matchRoute("DELETE", "/tasks/123")).toEqual({
      route: {
        method: "DELETE",
        path: "/tasks/:id",
      },
      id: "123",
    });
  });

  it("returns null for an unknown route", () => {
    expect(matchRoute("GET", "/unknown")).toBeNull();
  });
});
