import { timeStamp } from "node:console";

type LogData = Record<string, unknown>;

function writelog(
  level: "info" | "error",
  message: string,
  data: LogData = {},
) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data,
    }),
  );
}

export function logger() {
  return {
    info(message: string, data?: LogData) {
      writelog("info", message, data);
    },

    error(message: string, data?: LogData) {
      writelog("error", message, data);
    },
  };
}
