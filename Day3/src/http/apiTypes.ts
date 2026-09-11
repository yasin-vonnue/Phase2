import type { Task } from "../types/task.js";

export interface CreateTaskBody {
  title: string;
}

export type ApiError = {
  error: string;
};

export type TaskResponse = Task;
