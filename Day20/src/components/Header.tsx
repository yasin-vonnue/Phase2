import { Avatar } from "./Avatar";

type HeaderProps = {
  userName: string;
};

export function Header({ userName }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <h1>Project Dashboard</h1>
        <p>Track projects and issues in one place.</p>
      </div>

      <div className="header-user">
        <Avatar name={userName} />
        <span>{userName}</span>
      </div>
    </header>
  );
}
