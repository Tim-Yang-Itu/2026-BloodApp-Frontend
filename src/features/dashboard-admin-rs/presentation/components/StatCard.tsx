import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  note?: string;
  icon: LucideIcon;
  tone: "red" | "green" | "orange" | "dark";
};

export function StatCard({
  label,
  value,
  note,
  icon: Icon,
  tone,
}: StatCardProps) {
  const toneClasses = {
    red: "bg-primary-50 text-primary",
    green: "bg-success/10 text-success",
    orange: "bg-warning/10 text-warning",
    dark: "bg-surface-highlight text-heading",
  };
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 ">
      <div className="flex items-start justify-between">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon className="size-5" />
        </span>
        <ArrowUpRight className="size-4 text-muted" />
      </div>
      <p className="mt-5 text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-heading">
        {value}
      </p>
      <p className="mt-2 text-xs text-muted">{note}</p>
    </article>
  );
}
