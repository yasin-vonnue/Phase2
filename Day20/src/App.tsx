import "./App.css";
import { AppShell } from "./components/AppShell";
import { EmptyState } from "./components/EmptyState";
import { IssueCard } from "./components/IssueCard";
import { ProjectCard } from "./components/ProjectCard";

function App() {
  return (
    <AppShell userName="Arthur Morgan">
      <div className="dashboard">
        <section aria-labelledby="projects-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 id="projects-heading">Projects</h2>
            </div>
          </div>

          <div className="project-grid">
            <ProjectCard
              name="Support Ticket API"
              description="Manage customers, tickets, assignments and statuses."
              issueCount={12}
              status="Active"
            />

            <ProjectCard
              name="Dashboard UI"
              description="Build a simple interface for tracking project issues."
              issueCount={8}
              status="Active"
            />
          </div>
        </section>

        <section aria-labelledby="issues-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Recent work</p>
              <h2 id="issues-heading">Issues</h2>
            </div>
          </div>

          <div className="issue-list">
            <IssueCard
              title="Add request logging"
              description="Add structured request logs and correlation IDs."
              status="Resolved"
              priority="High"
              assignee="Arthur"
            />

            <IssueCard
              title="Improve dashboard layout"
              description="Create a responsive layout for project and issue information."
              status="In Progress"
              priority="Medium"
              assignee="Micah"
            />
          </div>
        </section>

        <EmptyState
          title="No archived projects"
          message="Archived projects will appear here when available."
        />
      </div>
    </AppShell>
  );
}

export default App;
