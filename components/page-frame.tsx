import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";

export function PageFrame({ children, pattern = false, showBottomNav = true }: { children: ReactNode; pattern?: boolean; showBottomNav?: boolean }) {
  return (
    <div className={`${pattern ? "pattern-bg" : ""} min-h-screen overflow-x-hidden ${showBottomNav ? "pb-28" : ""} text-foreground`}>
      {children}
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}