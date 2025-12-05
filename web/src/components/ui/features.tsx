"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass?: string; // e.g., "text-indigo-600"
};

type FeaturesGridProps = {
  items: FeatureItem[];
  columns?: 3 | 4;
  className?: string;
};

export function FeaturesGrid({ items, columns = 4, className }: FeaturesGridProps) {
  return (
    <div className={cn("grid gap-6", columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3", className)}>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Card key={i} className="p-6 hover:shadow-xl transition text-center">
            <Icon className={cn("w-8 h-8 mx-auto mb-4", item.colorClass ?? "text-slate-700")} />
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.description}</p>
          </Card>
        );
      })}
    </div>
  );
}

export default FeaturesGrid;
