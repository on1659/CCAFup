"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Filter,
  Trophy,
} from "lucide-react";

interface Question {
  id: number;
  domain: string;
  difficulty: string;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

interface QuizPlayerProps {
  questions: Question[];
  locale: string;
}

const DOMAIN_LABELS: Record<string, Record<string, string>> = {
  ko: {
    "agentic-architecture": "Agentic Architecture (27%)",
    "claude-code": "Claude Code (20%)",
    "prompt-engineering": "Prompt Engineering (20%)",
    "tool-design-mcp": "Tool Design & MCP (18%)",
    "context-management": "Context Management (15%)",
  },
  en: {
    "agentic-architecture": "Agentic Architecture (27%)",
    "claude-code": "Claude Code (20%)",
    "prompt-engineering": "Prompt Engineering (20%)",
    "tool-design-mcp": "Tool Design & MCP (18%)",
    "context-management": "Context Management (15%)",
  },
};

const DIFFICULTY_LABELS: Record<string, Record<string, string>> = {
  ko: { basic: "기초", intermediate: "중급", advanced: "고급" },
  en: { basic: "Basic", intermediate: "Intermediate", advanced: "Advanced" },
};

const DIFF_COLORS: Record<string, string> = {
  basic: "bg-success-soft text-success-text",
  intermediate: "bg-warning-soft text-warning-text",
  advanced: "bg-danger-soft text-danger-text",
};

type ViewMode = "quiz" | "result";

export function QuizPlayer({ questions, locale }: QuizPlayerProps) {
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [mode, setMode] = useState<ViewMode>("quiz");

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (domainFilter !== "all" && q.domain !== domainFilter) return false;
      if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter)
        return false;
      return true;
    });
  }, [questions, domainFilter, difficultyFilter]);

  const current = filtered[currentIdx];
  const totalAnswered = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([id, ans]) => questions.find((q) => q.id === Number(id))?.answer === ans
  ).length;

  const handleSelect = useCallback(
    (choiceIdx: number) => {
      if (showExplanation || !current) return;
      setSelected(choiceIdx);
      setShowExplanation(true);
      setAnswers((prev) => ({ ...prev, [current.id]: choiceIdx }));

      // Save to localStorage
      try {
        const key = `ccafup_quiz_answers`;
        const stored = JSON.parse(localStorage.getItem(key) || "{}");
        stored[current.id] = choiceIdx;
        localStorage.setItem(key, JSON.stringify(stored));
      } catch {}
    },
    [showExplanation, current]
  );

  const handleNext = () => {
    if (currentIdx < filtered.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setMode("result");
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setAnswers({});
    setMode("quiz");
    try {
      localStorage.removeItem("ccafup_quiz_answers");
    } catch {}
  };

  const domains = [...new Set(questions.map((q) => q.domain))];
  const isKo = locale === "ko";

  // Result mode
  if (mode === "result") {
    const filteredAnswered = filtered.filter((q) => answers[q.id] !== undefined);
    const filteredCorrect = filteredAnswered.filter(
      (q) => answers[q.id] === q.answer
    );
    const score = filteredAnswered.length
      ? Math.round((filteredCorrect.length / filteredAnswered.length) * 100)
      : 0;
    const passed = score >= 72;

    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <div
            className={`mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${
              passed ? "bg-success-soft" : "bg-danger-soft"
            }`}
          >
            <Trophy
              className={`h-8 w-8 ${passed ? "text-success" : "text-danger"}`}
            />
          </div>
          <h2 className="text-h1 text-heading mb-2">
            {passed
              ? isKo
                ? "합격 예상!"
                : "Likely to Pass!"
              : isKo
                ? "더 연습이 필요해요"
                : "More Practice Needed"}
          </h2>
          <p className="text-[48px] font-bold text-heading mb-1">{score}%</p>
          <p className="text-body text-sub mb-6">
            {filteredCorrect.length} / {filteredAnswered.length}{" "}
            {isKo ? "정답" : "correct"} (
            {isKo ? "합격 기준 72%" : "passing: 72%"})
          </p>

          {/* Domain breakdown */}
          <div className="mb-6 space-y-2 text-left">
            {domains.map((domain) => {
              const dqs = filtered.filter(
                (q) => q.domain === domain && answers[q.id] !== undefined
              );
              const dc = dqs.filter((q) => answers[q.id] === q.answer).length;
              const pct = dqs.length
                ? Math.round((dc / dqs.length) * 100)
                : 0;
              if (dqs.length === 0) return null;
              return (
                <div key={domain} className="flex items-center gap-3">
                  <span className="w-48 truncate text-small text-sub">
                    {DOMAIN_LABELS[locale]?.[domain] || domain}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-raised overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct >= 72 ? "bg-success" : "bg-danger"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-small text-sub">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Wrong answers */}
          {filteredAnswered.filter((q) => answers[q.id] !== q.answer).length >
            0 && (
            <div className="mb-6 text-left">
              <h3 className="text-h3 text-heading mb-3">
                {isKo ? "오답 노트" : "Wrong Answers"}
              </h3>
              <div className="space-y-3">
                {filteredAnswered
                  .filter((q) => answers[q.id] !== q.answer)
                  .map((q) => (
                    <div
                      key={q.id}
                      className="rounded-lg border border-danger-soft bg-danger-soft p-4"
                    >
                      <p className="text-small font-medium text-heading mb-1">
                        Q{q.id}. {q.question}
                      </p>
                      <p className="text-caption text-danger-text">
                        {q.explanation}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-small font-medium text-white hover:bg-primary-hover transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            {isKo ? "다시 풀기" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  // No questions
  if (filtered.length === 0) {
    return (
      <div className="mx-auto max-w-2xl text-center py-12">
        <p className="text-body text-sub">
          {isKo
            ? "해당 필터에 맞는 문제가 없습니다."
            : "No questions match the selected filters."}
        </p>
      </div>
    );
  }

  if (!current) return null;

  const isCorrect = selected === current.answer;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-hint" />
        <select
          value={domainFilter}
          onChange={(e) => {
            setDomainFilter(e.target.value);
            setCurrentIdx(0);
            setSelected(null);
            setShowExplanation(false);
          }}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-small text-body"
        >
          <option value="all">{isKo ? "전체 도메인" : "All Domains"}</option>
          {domains.map((d) => (
            <option key={d} value={d}>
              {DOMAIN_LABELS[locale]?.[d] || d}
            </option>
          ))}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => {
            setDifficultyFilter(e.target.value);
            setCurrentIdx(0);
            setSelected(null);
            setShowExplanation(false);
          }}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-small text-body"
        >
          <option value="all">{isKo ? "전체 난이도" : "All Levels"}</option>
          {["basic", "intermediate", "advanced"].map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_LABELS[locale]?.[d] || d}
            </option>
          ))}
        </select>
        <span className="ml-auto text-small text-hint">
          {currentIdx + 1} / {filtered.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 rounded-full bg-raised overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${((currentIdx + (showExplanation ? 1 : 0)) / filtered.length) * 100}%`,
          }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-border bg-surface p-6">
        {/* Meta */}
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-caption font-medium text-primary-text">
            {DOMAIN_LABELS[locale]?.[current.domain] || current.domain}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-caption font-medium ${DIFF_COLORS[current.difficulty]}`}
          >
            {DIFFICULTY_LABELS[locale]?.[current.difficulty] ||
              current.difficulty}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-h3 text-heading mb-6 leading-relaxed">
          Q{current.id}. {current.question}
        </h3>

        {/* Choices */}
        <div className="space-y-3">
          {current.choices.map((choice, idx) => {
            let borderClass = "border-border hover:border-primary";
            let bgClass = "bg-surface";

            if (showExplanation) {
              if (idx === current.answer) {
                borderClass = "border-success";
                bgClass = "bg-success-soft";
              } else if (idx === selected && idx !== current.answer) {
                borderClass = "border-danger";
                bgClass = "bg-danger-soft";
              } else {
                borderClass = "border-border opacity-50";
              }
            } else if (selected === idx) {
              borderClass = "border-primary";
              bgClass = "bg-primary-soft";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={`w-full rounded-lg border ${borderClass} ${bgClass} px-4 py-3 text-left text-small text-body transition-colors disabled:cursor-default`}
              >
                <div className="flex items-start gap-3">
                  {showExplanation && idx === current.answer && (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  )}
                  {showExplanation &&
                    idx === selected &&
                    idx !== current.answer && (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                    )}
                  <span>{choice}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`mt-6 rounded-lg border p-4 ${
              isCorrect
                ? "border-success-soft bg-success-soft"
                : "border-danger-soft bg-danger-soft"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <XCircle className="h-4 w-4 text-danger" />
              )}
              <span
                className={`text-small font-medium ${
                  isCorrect ? "text-success-text" : "text-danger-text"
                }`}
              >
                {isCorrect
                  ? isKo
                    ? "정답!"
                    : "Correct!"
                  : isKo
                    ? "오답"
                    : "Incorrect"}
              </span>
            </div>
            <p className="text-small text-body">{current.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-small font-medium text-white hover:bg-primary-hover transition-colors"
            >
              {currentIdx < filtered.length - 1
                ? isKo
                  ? "다음 문제"
                  : "Next Question"
                : isKo
                  ? "결과 보기"
                  : "View Results"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Score summary */}
      {totalAnswered > 0 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-small text-sub">
          <span>
            {isKo ? "정답" : "Correct"}: {correctCount}/{totalAnswered}
          </span>
          <span>
            {isKo ? "정답률" : "Rate"}:{" "}
            {Math.round((correctCount / totalAnswered) * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
