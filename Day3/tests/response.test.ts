import { describe, it, expect, vi } from "vitest";
import { sendError, sendJson, sendNoContent } from "../src/http/response.js";

function createMockResponse() {
  return {
    statusCode: 0,
    setHeader: vi.fn(),
    end: vi.fn(),
  };
}

describe("HTTP response helpers", () => {
  it("sends a JSON response", () => {
    const response = createMockResponse();

    sendJson(response, 200, {
      message: "Success",
    });

    expect(response.statusCode).toBe(200);

    expect(response.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );

    expect(response.end).toHaveBeenCalledWith(
      JSON.stringify({
        message: "Success",
      }),
    );
  });

  it("sends a consistent JSON error", () => {
    const response = createMockResponse();

    sendError(response, 404, "Task not found");

    expect(response.statusCode).toBe(404);

    expect(response.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );

    expect(response.end).toHaveBeenCalledWith(
      JSON.stringify({
        error: "Task not found",
      }),
    );
  });
});
