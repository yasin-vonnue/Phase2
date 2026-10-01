export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav aria-label="Main navigation">
        <h2>Workspace</h2>

        <ul>
          <li>
            <a href="#dashboard">Dashboard</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#issues">Issues</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
