"use client";

import * as React from "react";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions/auth";
import { toast } from "sonner";
import { useDashboard } from "./DashboardProvider";

export interface TopBarProps {
  className?: string;
  title?: string;
  onMenuClick?: () => void;
  userEmail?: string;
}

export function TopBar({ className, title = "Dashboard", onMenuClick, userEmail }: TopBarProps) {
  const { openMobileSidebar } = useDashboard();

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
    <header className={cn("flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6", className)}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={openMobileSidebar}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            {userEmail}
          </div>
          <DropdownMenuItem onClick={handleSignOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
