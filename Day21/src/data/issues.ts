import type { Issue } from "../types/issue.js";

export const issues: Issue[] = [
  {
    id: "issue-1",
    title: "Add request logging",
    description: "Add structured request logs and correlation IDs.",
    status: "Resolved",
    priority: "High",
    assignee: "Arthur",
    dueDate: "2026-09-28",
  },
  {
    id: "issue-2",
    title: "Improve dashboard layout",
    description: "Create a responsive layout for project information.",
    status: "In Progress",
    priority: "Medium",
    assignee: "Sarah",
    dueDate: "2026-10-04",
  },
  {
    id: "issue-3",
    title: "Fix ticket filtering",
    description: "Allow user to filter tickets by status and priority.",
    status: "Open",
    priority: "High",
    assignee: "John",
    dueDate: "2026-09-30",
  },
  {
    id: "issue-4",
    title: "Update empty state",
    description: "Improve the message shown when no issues are available.",
    status: "Open",
    priority: "Low",
    assignee: "Alex",
    dueDate: "2026-10-08",
  },
];
