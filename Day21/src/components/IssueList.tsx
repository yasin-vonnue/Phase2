import type { Issue } from "../types/issue";
import { EmptyState } from "./EmptyState";
import { IssueRow } from "./IssueRow";

type IssueListProps = {
  issues: Issue[];
};

function isIssueOverdue(issue: Issue) {
  if (issue.status === "Resolved") {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);

  return issue.dueDate < today;
}

export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <EmptyState
        title="No issues found"
        message="There are no issues to display."
      />
    );
  }

  return (
    <section className="issue-list" aria-labelledby="issues-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Project work</p>
          <h2 id="issues-heading">Issues</h2>
        </div>
      </div>

      <div className="issue-list-items">
        {issues.map((issue) => (
          <IssueRow
            key={issue.id}
            issue={issue}
            isOverdue={isIssueOverdue(issue)}
          />
        ))}
      </div>
    </section>
  );
}
