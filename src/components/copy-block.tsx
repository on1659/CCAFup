"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyBlockProps {
  children: string;
  language?: string;
}

export function CopyBlock({ children, language }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-4 rounded-lg border border-border bg-surface">
      {language && (
        <div className="border-b border-border px-4 py-1.5 text-caption text-hint">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-border bg-raised p-1.5 text-hint opacity-0 transition-opacity hover:text-heading group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className="overflow-x-auto p-4 text-small leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
