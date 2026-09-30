import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  userName: string;
  children: ReactNode;
};

export function AppShell({ userName, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Header userName={userName} />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
