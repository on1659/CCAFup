import type { ReactNode } from "react";
import { Callout, Tip, Warning } from "./callout";

type Props = { children?: ReactNode; [key: string]: unknown };

export const mdxComponents = {
  h1: (props: Props) => (
    <h1
      className="mt-8 mb-4 text-[24px] font-bold leading-tight text-heading scroll-mt-20"
      {...props}
    />
  ),
  h2: (props: Props) => (
    <h2
      className="mt-8 mb-3 text-[20px] font-semibold text-heading scroll-mt-20 border-b border-border pb-2"
      {...props}
      id={
        typeof props.children === "string"
          ? props.children
              .toLowerCase()
              .replace(/[^a-z0-9가-힣\s-]/g, "")
              .replace(/\s+/g, "-")
          : undefined
      }
    />
  ),
  h3: (props: Props) => (
    <h3
      className="mt-6 mb-2 text-[17px] font-semibold text-heading scroll-mt-20"
      {...props}
      id={
        typeof props.children === "string"
          ? props.children
              .toLowerCase()
              .replace(/[^a-z0-9가-힣\s-]/g, "")
              .replace(/\s+/g, "-")
          : undefined
      }
    />
  ),
  p: (props: Props) => (
    <p className="my-3 text-[15px] leading-[1.8] text-body" {...props} />
  ),
  a: (props: Props) => (
    <a
      className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
      {...props}
    />
  ),
  ul: (props: Props) => (
    <ul className="my-3 ml-6 list-disc space-y-1 text-body" {...props} />
  ),
  ol: (props: Props) => (
    <ol className="my-3 ml-6 list-decimal space-y-1 text-body" {...props} />
  ),
  li: (props: Props) => (
    <li className="text-[15px] leading-[1.7]" {...props} />
  ),
  blockquote: (props: Props) => (
    <blockquote
      className="my-4 border-l-4 border-primary-soft pl-4 italic text-sub"
      {...props}
    />
  ),
  code: (props: Props) => (
    <code
      className="rounded bg-raised px-1.5 py-0.5 font-mono text-[13px] text-heading"
      {...props}
    />
  ),
  pre: (props: Props) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-raised p-4 font-mono text-[13px] leading-[1.6] border border-border"
      {...props}
    />
  ),
  table: (props: Props) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-small" {...props} />
    </div>
  ),
  th: (props: Props) => (
    <th
      className="border border-border bg-raised px-3 py-2 text-left font-medium text-heading"
      {...props}
    />
  ),
  td: (props: Props) => (
    <td className="border border-border px-3 py-2 text-body" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: (props: Props) => (
    <strong className="font-semibold text-heading" {...props} />
  ),
  Callout,
  Tip,
  Warning,
};
