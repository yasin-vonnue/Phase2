import { describe, it, expect } from "vitest";

import { parseCommand } from "../src/commands/parser.js";

describe("parseCommand", () => {
  it("parses the version command", () => {
    expect(parseCommand(["version"])).toEqual({
      command: "version",
      json: false,
    });
  });

  it("parse the operating system command", () => {
    expect(parseCommand(["os"])).toEqual({
      command: "os",
      json: false,
    });
  });

  it("parse the memory command", () => {
    expect(parseCommand(["memory"])).toEqual({
      command: "memory",
      json: false,
    });
  });

  it("detects the json flag", () => {
    expect(parseCommand(["version", "--json"])).toEqual({
      command: "version",
      json: true,
    });
  });

  it("rejects an invalid command", () => {
    expect(parseCommand(["unknown"])).toEqual({
      command: null,
      json: false,
    });
  });
});
