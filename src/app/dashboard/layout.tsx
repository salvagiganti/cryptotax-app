import { ReactNode } from "react";
import { getUser } from "@/app/actions/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { DashboardProvider } from "@/components/dashboard/DashboardProvider";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const userResult = await getUser();
  const user = userResult.success ? userResult.data : null;

  return (
    <DashboardProvider>
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 border-r lg:block">
          <Sidebar userEmail={(user as any)?.email} />
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar userEmail={(user as any)?.email} />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
