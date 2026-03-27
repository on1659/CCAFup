"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function FeedbackWidget() {
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (helpful: boolean) => {
    try {
      const key = `feedback:${window.location.pathname}`;
      localStorage.setItem(key, helpful ? "yes" : "no");
    } catch {
      // localStorage unavailable
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-12 border-t border-border pt-6 text-center text-small text-sub">
        감사합니다!
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-border pt-6 text-center">
      <p className="mb-3 text-small text-sub">이 페이지가 도움이 됐나요?</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => handleFeedback(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-small text-sub hover:border-success hover:text-success transition-colors"
        >
          <ThumbsUp className="h-4 w-4" />
          도움됐어요
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-small text-sub hover:border-danger hover:text-danger transition-colors"
        >
          <ThumbsDown className="h-4 w-4" />
          아쉬워요
        </button>
      </div>
    </div>
  );
}
