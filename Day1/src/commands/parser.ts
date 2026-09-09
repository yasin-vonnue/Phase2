export type Command = "version" | "os" | "memory" | "cwd" | "env";

export interface ParsedCommand {
  command: Command | null;
  json: boolean;
}

const validCommands: Command[] = ["version", "os", "memory", "cwd", "env"];

export function parseCommand(args: string[]): ParsedCommand {
  const commandArg = args.find((arg) => !arg.startsWith("--"));

  const json = args.includes("--json");

  if (!commandArg || !validCommands.includes(commandArg as Command)) {
    return {
      command: null,
      json,
    };
  }

  return {
    command: commandArg as Command,
    json,
  };
}
