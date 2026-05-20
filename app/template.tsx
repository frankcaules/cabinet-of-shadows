import type { ReactNode } from "react";

// template.tsx re-mounts its subtree on every navigation in the App Router.
// We keep it as a minimal passthrough so per-route state (e.g. component-local
// animation refs in dossier components) resets cleanly between routes.
export default function RootTemplate({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
