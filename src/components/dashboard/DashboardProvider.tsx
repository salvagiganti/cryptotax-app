"use client";

import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

type DashboardContextType = {
  openMobileSidebar: () => void;
};

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const openMobileSidebar = React.useCallback(() => {
    setMobileSidebarOpen(true);
  }, []);

  return (
    <DashboardContext.Provider value={{ openMobileSidebar }}>
      {children}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = React.useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
