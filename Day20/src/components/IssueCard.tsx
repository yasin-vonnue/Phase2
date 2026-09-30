import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

type IssueCardProps = {
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  assignee: string;
};

export function IssueCard({
  title,
  description,
  status,
  priority,
  assignee,
}: IssueCardProps) {
  return (
    <article className="issue-card">
      <div className="issue-card-content">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="issue-meta">
          <Badge>{status}</Badge>
          <Badge>{priority}</Badge>
        </div>
      </div>

      <div className="issue-assignee">
        <Avatar name={assignee} />
        <span>{assignee}</span>
      </div>
    </article>
  );
}
