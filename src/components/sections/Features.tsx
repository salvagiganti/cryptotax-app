import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileCheck, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export interface FeaturesProps {
  className?: string;
  title?: string;
  items?: FeatureItem[];
}

const defaultItems: FeatureItem[] = [
  {
    title: "Automatic Calculations",
    description:
      "Auto‑import from exchanges, accurate tax calculations.",
    icon: Calculator,
  },
  {
    title: "German Tax Compliant",
    description:
      "Following FIFO/LIFO rules, Finanzamt‑ready reports.",
    icon: FileCheck,
  },
  {
    title: "Export Ready",
    description: "PDF reports for your tax advisor.",
    icon: Download,
  },
];

export function Features({
  className,
  title = "Why CryptoTax?",
  items = defaultItems,
}: FeaturesProps) {
  return (
    <section id="features" className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", className)}>
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {items.map(({ title: t, description, icon: Icon }) => (
          <Card
            key={t}
            className="transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-border"
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-base font-semibold">{t}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


