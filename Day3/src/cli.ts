import { createTaskRepository } from "./repository/taskRepository.js";
import { createTaskService } from "./services/taskService.js";
import { handleTaskCommand } from "./commands/taskCommands.js";

const repository = createTaskRepository("./data/tasks.json");
const service = createTaskService(repository);

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  await handleTaskCommand(args, service);
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error("An unknown error occured");
  }

  process.exitCode = 1;
});
