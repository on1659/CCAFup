import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  info: {
    icon: Info,
    className: "border-l-primary bg-primary-soft text-primary-text",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-l-warning bg-warning-soft text-warning-text",
  },
  tip: {
    icon: Lightbulb,
    className: "border-l-accent bg-accent-soft text-accent-text",
  },
  danger: {
    icon: AlertCircle,
    className: "border-l-danger bg-danger-soft text-danger-text",
  },
} as const;

type CalloutType = keyof typeof variants;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, className } = variants[type];

  return (
    <div className={cn("my-4 rounded-md border-l-4 p-4", className)}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="min-w-0">
          {title && <p className="mb-1 font-medium">{title}</p>}
          <div className="text-small [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Tip({ children, title }: { children: ReactNode; title?: string }) {
  return <Callout type="tip" title={title}>{children}</Callout>;
}

export function Warning({ children, title }: { children: ReactNode; title?: string }) {
  return <Callout type="warning" title={title}>{children}</Callout>;
}
