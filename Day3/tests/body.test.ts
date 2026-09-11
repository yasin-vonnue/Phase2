import { describe, expect, it } from "vitest";
import { Readable } from "node:stream";

import { parseJsonBody } from "../src/http/body.js";

describe("JSON body parser", () => {
  it("parses a JSON request body", async () => {
    const request = Readable.from(['{"title":"Learn HTTP"}']);

    const result = await parseJsonBody(request);

    expect(result).toEqual({
      title: "Learn HTTP",
    });
  });

  it("combines multiple body chunks", async () => {
    const request = Readable.from(['{"title":', '"Learn HTTP"}']);

    const result = await parseJsonBody(request);

    expect(result).toEqual({
      title: "Learn HTTP",
    });
  });

  it("returns an empty object when the body is empty", async () => {
    const request = Readable.from([]);

    const result = await parseJsonBody(request);

    expect(result).toEqual({});
  });

  it("throws when JSON is malformed", async () => {
    const request = Readable.from(["{ invalid json }"]);

    await expect(parseJsonBody(request)).rejects.toThrow();
  });
});
