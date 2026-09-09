import { describe, it, expect } from "vitest";

import os from "node:os";

import {
  getCurrentDirectory,
  getEnvironment,
  getMemoryInformation,
  getNodeVersion,
  getOperatingSystem,
} from "../src/system/info.js";

describe("system information", () => {
  it("returns the Node.js version", () => {
    expect(getNodeVersion()).toBe(process.version);
  });

  it("return operating system information", () => {
    const result = getOperatingSystem();

    expect(result.platform).toBe(os.platform());
    expect(result.architecture).toBe(os.arch());
    expect(result.release).toBe(os.release());
  });

  it("return memory information", () => {
    const result = getMemoryInformation();

    expect(result.total).toBe(os.totalmem());
    expect(result.free).toBe(os.freemem());
    expect(result.used).toBe(os.totalmem() - os.freemem());
  });

  it("returns the current working directory", () => {
    expect(getCurrentDirectory()).toBe(process.cwd());
  });

  it("returns environment information", () => {
    expect(getEnvironment()).toBe(process.env);
  });
});
