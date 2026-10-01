import { Badge } from "./Badge";

type ProjectCardProps = {
  name: string;
  description: string;
  issueCount: number;
  status: "Active" | "Completed";
};

export function ProjectCard({
  name,
  description,
  issueCount,
  status,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>

      <div className="project-card-footer">
        <Badge>{status}</Badge>
        <span>{issueCount}</span>
      </div>
    </article>
  );
}
