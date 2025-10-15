"use client";

import { Button } from "@/components/ui/button";

export default function TestShadButton() {
  return (
    <div className="flex items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}


