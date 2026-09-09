import { parseCommand } from "./commands/parser.js";

import {
  getCurrentDirectory,
  getEnvironment,
  getMemoryInformation,
  getNodeVersion,
  getOperatingSystem,
} from "./system/info.js";

const args = process.argv.slice(2);

const { command, json } = parseCommand(args);

if (!command) {
    console.error("Invalid command. Available commands: version, os, memory, cwd, env");

    process.exitCode = 1;
} else {
    let result: unknown;

    switch (command){
        case "version":
            result = getNodeVersion();
            break;

        case "os":
            result = getOperatingSystem();
            break;

        case "memory":
            result = getMemoryInformation();
            break;

        case "cwd":
            result = getCurrentDirectory();
            break;

        case "env":
            result = getEnvironment();
            break;
    }

    if (json) {
        console.log(JSON.stringify(result,null,2));
    } else {
        console.log(result);
    }

}