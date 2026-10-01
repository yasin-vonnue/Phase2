import "./App.css";
import { AppShell } from "./components/AppShell";
import { EmptyState } from "./components/EmptyState";
import { ProjectCard } from "./components/ProjectCard";

import { issues } from "./data/issues";
import { IssueList } from "./components/IssueList";

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

        <IssueList issues={issues} />

        <EmptyState
          title="No archived projects"
          message="Archived projects will appear here when available."
        />
      </div>
    </AppShell>
  );
}

export default App;
