"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="text-center">
        <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-warning" />
        <h1 className="text-h1 text-heading mb-2">문제가 발생했습니다</h1>
        <p className="text-body text-sub mb-6">
          잠시 후 다시 시도해 주세요.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-small font-medium text-white hover:bg-primary-hover transition-colors"
        >
          다시 시도
        </button>
      </div>
    </main>
  );
}
