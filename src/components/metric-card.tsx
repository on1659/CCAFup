import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  variant?: "primary" | "accent";
}

export function MetricCard({ icon: Icon, value, label, variant = "primary" }: MetricCardProps) {
  const iconColor = variant === "accent" ? "text-accent" : "text-primary";

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <Icon className={`mx-auto mb-2 h-6 w-6 ${iconColor}`} />
      <p className="text-h2 text-heading">{value}</p>
      <p className="text-small text-sub">{label}</p>
    </div>
  );
}
