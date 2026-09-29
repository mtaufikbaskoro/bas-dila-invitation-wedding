import type { ReactNode } from "react";

export function PageFrame({ children, pattern = false }: { children: ReactNode; pattern?: boolean }) {
  return (
    <div className={`${pattern ? "pattern-bg" : ""} min-h-screen overflow-x-hidden text-foreground`}>
      {children}
    </div>
  );
}