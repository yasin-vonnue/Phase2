import os from "node:os";

export function getNodeVersion(): string {
  return process.version;
}

export function getOperatingSystem(): {
  platform: string;
  architecture: string;
  release: string;
} {
  return {
    platform: os.platform(),
    architecture: os.arch(),
    release: os.release(),
  };
}

export function getMemoryInformation(): {
  total: number;
  free: number;
  used: number;
} {
  const total = os.totalmem();
  const free = os.freemem();

  return {
    total,
    free,
    used: total - free,
  };
}

export function getCurrentDirectory(): string {
  return process.cwd();
}

export function getEnvironment(): NodeJS.ProcessEnv {
  return process.env;
}
