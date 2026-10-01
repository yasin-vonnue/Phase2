import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import type { Issue } from "../types/issue";

type IssueRowProps = {
  issue: Issue;
  isOverdue: boolean;
};

export function IssueRow({ issue, isOverdue }: IssueRowProps) {
  return (
    <article className="issue-row">
      <div className="issue-row-content">
        <div className="issue-row-title">
          <h3>{issue.title}</h3>

          {isOverdue && <span className="overdue-indicator">Overdue</span>}
        </div>

        <p>{issue.description}</p>

        <div className="issue-row-meta">
          <Badge>{issue.status}</Badge>
          <Badge>{issue.priority}</Badge>
          <span>Due: {issue.dueDate}</span>
        </div>
      </div>

      <div className="issue-row-assignee">
        <Avatar name={issue.assignee} />
        <span>{issue.assignee}</span>
      </div>
    </article>
  );
}
