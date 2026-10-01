export type IssueStatus = "Open" | "In Progress" | "Resolved";

export type IssuePriority = "Low" | "Medium" | "High";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  dueDate: string;
};
