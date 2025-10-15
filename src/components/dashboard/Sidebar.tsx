"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowLeftRight, FileText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";
import { toast } from "sonner";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export interface SidebarProps {
  className?: string;
  userEmail?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
  { label: "Tax Reports", href: "/dashboard/reports", icon: FileText },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ className, userEmail, navItems = defaultNavItems }: SidebarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      const res = await signOut();
      if (res.success) {
        toast.success("Signed out successfully");
        window.location.href = "/login";
      } else {
        toast.error(res.error ?? "Sign out failed");
      }
    } catch (e) {
      toast.error("Sign out failed");
    }
  };

  return (
    <div className={cn("flex h-full flex-col border-r bg-background", className)}>
      {/* Logo/Brand */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold text-primary">CryptoTax</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="border-t p-4">
        <div className="mb-3">
          <p className="text-sm font-medium text-foreground">{userEmail}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
