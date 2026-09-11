import type { Task } from "../types/task.js";
import { createTaskService } from "../services/taskService.js";

export async function handleTaskCommand(
  args: string[],
  service: ReturnType<typeof createTaskService>,
): Promise<void> {
  const command = args[0];

  switch (command) {
    case "add": {
      const title = args[1];

      if (!title) {
        throw new Error("Task title is required");
      }

      const task = await service.addTask(title);

      console.log(`Added task: ${task.id} - ${task.title}`);

      break;
    }

    case "list": {
      const tasks = await service.listTasks();

      if (tasks.length === 0) {
        console.log("No tasks found");
        break;
      }

      for (const task of tasks) {
        const status = task.completed ? "✓" : " ";
        console.log(`${task.id} [${status}] ${task.title}`);
      }

      break;
    }

    case "complete": {
      const id = args[1];

      if (!id) {
        throw new Error("Task ID is required");
      }

      const task = await service.completeTask(id);

      console.log(`Completed task: ${task.id} - ${task.title}`);

      break;
    }

    case "delete": {
      const id = args[1];

      if (!id) {
        throw new Error("Task ID is required");
      }

      await service.deleteTask(id);

      console.log(`Deleted task: ${id}`);

      break;
    }

    case "filter": {
      const status = args[1];

      if (status !== "completed" && status !== "pending") {
        throw new Error("Fitler must be 'completed' or 'pending'");
      }

      const tasks = await service.filterTasks(status);

      for (const task of tasks) {
        const status = task.completed ? "✓" : " ";

        console.log(`${task.id} [${status}] ${task.title}`);
      }

      break;
    }

    default:
      throw new Error(`Unknown command: ${command}`);
  }
}
