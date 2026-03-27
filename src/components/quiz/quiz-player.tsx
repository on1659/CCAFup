"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Filter,
  Trophy,
  Clock,
  Flag,
  BookOpen,
  Timer,
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

type QuizMode = "select" | "practice" | "mock" | "result";

const MOCK_TIME = 120 * 60; // 120 minutes in seconds

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function QuizPlayer({ questions, locale }: QuizPlayerProps) {
  const [quizMode, setQuizMode] = useState<QuizMode>("select");
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(MOCK_TIME);
  const [showNav, setShowNav] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isKo = locale === "ko";
  const isMock = quizMode === "mock";

  const filtered = useMemo(() => {
    if (isMock) return questions; // mock uses all 60
    return questions.filter((q) => {
      if (domainFilter !== "all" && q.domain !== domainFilter) return false;
      if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [questions, domainFilter, difficultyFilter, isMock]);

  const current = filtered[currentIdx];
  const domains = [...new Set(questions.map((q) => q.domain))];

  // Timer for mock mode
  useEffect(() => {
    if (quizMode === "mock") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setQuizMode("result");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [isMock, quizMode]);

  const handleSelect = useCallback(
    (choiceIdx: number) => {
      if (!current) return;
      if (isMock) {
        // Mock: just record answer, no immediate feedback
        setSelected(choiceIdx);
        setAnswers((prev) => ({ ...prev, [current.id]: choiceIdx }));
      } else {
        // Practice: show explanation immediately
        if (showExplanation) return;
        setSelected(choiceIdx);
        setShowExplanation(true);
        setAnswers((prev) => ({ ...prev, [current.id]: choiceIdx }));
      }
    },
    [showExplanation, current, isMock]
  );

  const goTo = (idx: number) => {
    setCurrentIdx(idx);
    setSelected(answers[filtered[idx]?.id] ?? null);
    setShowExplanation(false);
    setShowNav(false);
  };

  const handleNext = () => {
    if (currentIdx < filtered.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setSelected(answers[filtered[nextIdx]?.id] ?? null);
      setShowExplanation(false);
    } else if (!isMock) {
      setQuizMode("result");
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      setCurrentIdx(prevIdx);
      setSelected(answers[filtered[prevIdx]?.id] ?? null);
      setShowExplanation(false);
    }
  };

  const toggleMark = () => {
    if (!current) return;
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(current.id)) next.delete(current.id);
      else next.add(current.id);
      return next;
    });
  };

  const handleSubmitMock = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizMode("result");
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setAnswers({});
    setMarked(new Set());
    setTimeLeft(MOCK_TIME);
    setQuizMode("select");
    setShowNav(false);
  };

  // ─── Mode select ───
  if (quizMode === "select") {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <button
          onClick={() => setQuizMode("practice")}
          className="w-full rounded-xl border border-border bg-surface p-6 text-left hover:border-primary transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-h3 text-heading">
                {isKo ? "연습 모드" : "Practice Mode"}
              </h3>
              <p className="text-small text-sub">
                {isKo
                  ? "문제별 즉시 해설 확인 · 도메인/난이도 필터 · 시간제한 없음"
                  : "Instant explanations · Domain/difficulty filter · No time limit"}
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => { setQuizMode("mock"); setTimeLeft(MOCK_TIME); }}
          className="w-full rounded-xl border border-border bg-surface p-6 text-left hover:border-accent transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-soft">
              <Timer className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-h3 text-heading">
                {isKo ? "모의시험 모드" : "Mock Exam Mode"}
              </h3>
              <p className="text-small text-sub">
                {isKo
                  ? "60문항 · 120분 타이머 · Mark for Review · 실전 시뮬레이션"
                  : "60 questions · 120 min timer · Mark for Review · Exam simulation"}
              </p>
            </div>
          </div>
        </button>
      </div>
    );
  }

  // ─── Result ───
  if (quizMode === "result") {
    const answeredQs = filtered.filter((q) => answers[q.id] !== undefined);
    const correctQs = answeredQs.filter((q) => answers[q.id] === q.answer);
    const score = answeredQs.length ? Math.round((correctQs.length / answeredQs.length) * 100) : 0;
    const passed = score >= 72;
    const unanswered = filtered.length - answeredQs.length;

    // Save history
    useEffect(() => {
      try {
        const history = JSON.parse(localStorage.getItem("ccafup_quiz_history") || "[]");
        history.push({
          date: new Date().toISOString(),
          mode: isMock ? "mock" : "practice",
          total: filtered.length,
          correct: correctQs.length,
          score,
          timeUsed: isMock ? MOCK_TIME - timeLeft : null,
        });
        localStorage.setItem("ccafup_quiz_history", JSON.stringify(history.slice(-20)));
      } catch {}
    }, []);

    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <div className={`mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${passed ? "bg-success-soft" : "bg-danger-soft"}`}>
            <Trophy className={`h-8 w-8 ${passed ? "text-success" : "text-danger"}`} />
          </div>
          <h2 className="text-h1 text-heading mb-2">
            {passed ? (isKo ? "합격 예상!" : "Likely to Pass!") : (isKo ? "더 연습이 필요해요" : "More Practice Needed")}
          </h2>
          <p className="text-[48px] font-bold text-heading mb-1">{score}%</p>
          <p className="text-body text-sub mb-2">
            {correctQs.length} / {answeredQs.length} {isKo ? "정답" : "correct"} ({isKo ? "합격 기준 72%" : "passing: 72%"})
          </p>
          {unanswered > 0 && (
            <p className="text-small text-warning mb-4">
              {isKo ? `미답변: ${unanswered}문항` : `Unanswered: ${unanswered} questions`}
            </p>
          )}
          {isMock && (
            <p className="text-small text-sub mb-4">
              {isKo ? "소요 시간" : "Time used"}: {formatTime(MOCK_TIME - timeLeft)} / 2:00:00
            </p>
          )}

          {/* Domain breakdown */}
          <div className="mb-6 space-y-2 text-left">
            {domains.map((domain) => {
              const dqs = filtered.filter((q) => q.domain === domain && answers[q.id] !== undefined);
              const dc = dqs.filter((q) => answers[q.id] === q.answer).length;
              const pct = dqs.length ? Math.round((dc / dqs.length) * 100) : 0;
              if (dqs.length === 0) return null;
              return (
                <div key={domain} className="flex items-center gap-3">
                  <span className="w-48 truncate text-small text-sub">{DOMAIN_LABELS[locale]?.[domain] || domain}</span>
                  <div className="flex-1 h-2 rounded-full bg-raised overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${pct >= 72 ? "bg-success" : "bg-danger"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-12 text-right text-small text-sub">{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* Wrong answers */}
          {answeredQs.filter((q) => answers[q.id] !== q.answer).length > 0 && (
            <div className="mb-6 text-left">
              <h3 className="text-h3 text-heading mb-3">{isKo ? "오답 노트" : "Wrong Answers"}</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {answeredQs.filter((q) => answers[q.id] !== q.answer).map((q) => (
                  <div key={q.id} className="rounded-lg border border-danger-soft bg-danger-soft p-4">
                    <p className="text-small font-medium text-heading mb-1">Q{q.id}. {q.question}</p>
                    <p className="text-caption text-danger-text">{q.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleReset} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-small font-medium text-white hover:bg-primary-hover transition-colors">
            <RotateCcw className="h-4 w-4" />
            {isKo ? "다시 풀기" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  // ─── No questions ───
  if (filtered.length === 0 || !current) {
    return (
      <div className="mx-auto max-w-2xl text-center py-12">
        <p className="text-body text-sub">{isKo ? "해당 필터에 맞는 문제가 없습니다." : "No questions match the selected filters."}</p>
      </div>
    );
  }

  const isCorrect = selected === current.answer;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Top bar: timer (mock) or filters (practice) */}
      {isMock ? (
        <div className="mb-6 flex items-center justify-between">
          <div className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-small font-mono font-medium ${timeLeft < 300 ? "border-danger text-danger animate-pulse" : timeLeft < 600 ? "border-warning text-warning" : "border-border text-heading"}`}>
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNav(!showNav)} className="rounded-lg border border-border px-3 py-1.5 text-small text-sub hover:text-heading transition-colors">
              {isKo ? "문항 목록" : "Questions"} ({answeredCount}/{filtered.length})
            </button>
            <button onClick={toggleMark} className={`rounded-lg border px-3 py-1.5 text-small transition-colors ${marked.has(current.id) ? "border-warning bg-warning-soft text-warning-text" : "border-border text-sub hover:text-heading"}`}>
              <Flag className="h-3.5 w-3.5 inline mr-1" />
              {isKo ? "표시" : "Mark"}
            </button>
            <button onClick={handleSubmitMock} className="rounded-lg bg-accent px-4 py-1.5 text-small font-medium text-white hover:bg-accent-hover transition-colors">
              {isKo ? "제출" : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-hint" />
          <select value={domainFilter} onChange={(e) => { setDomainFilter(e.target.value); setCurrentIdx(0); setSelected(null); setShowExplanation(false); }} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-small text-body">
            <option value="all">{isKo ? "전체 도메인" : "All Domains"}</option>
            {domains.map((d) => (<option key={d} value={d}>{DOMAIN_LABELS[locale]?.[d] || d}</option>))}
          </select>
          <select value={difficultyFilter} onChange={(e) => { setDifficultyFilter(e.target.value); setCurrentIdx(0); setSelected(null); setShowExplanation(false); }} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-small text-body">
            <option value="all">{isKo ? "전체 난이도" : "All Levels"}</option>
            {["basic", "intermediate", "advanced"].map((d) => (<option key={d} value={d}>{DIFFICULTY_LABELS[locale]?.[d] || d}</option>))}
          </select>
          <span className="ml-auto text-small text-hint">{currentIdx + 1} / {filtered.length}</span>
        </div>
      )}

      {/* Question navigator (mock mode) */}
      {showNav && isMock && (
        <div className="mb-6 rounded-xl border border-border bg-surface p-4">
          <div className="grid grid-cols-10 gap-1.5">
            {filtered.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = marked.has(q.id);
              const isCurrent = idx === currentIdx;
              let cls = "h-8 w-full rounded text-caption font-medium transition-colors ";
              if (isCurrent) cls += "bg-primary text-white";
              else if (isMarked) cls += "bg-warning-soft text-warning-text border border-warning";
              else if (isAnswered) cls += "bg-accent-soft text-accent-text";
              else cls += "bg-raised text-hint hover:bg-muted";
              return (
                <button key={q.id} onClick={() => goTo(idx)} className={cls}>
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-caption text-sub">
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-accent-soft" /> {isKo ? "답변 완료" : "Answered"}</span>
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded border border-warning bg-warning-soft" /> {isKo ? "표시됨" : "Marked"}</span>
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-raised" /> {isKo ? "미답변" : "Unanswered"}</span>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-6 h-1.5 rounded-full bg-raised overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((currentIdx + 1) / filtered.length) * 100}%` }} />
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-border bg-surface p-6">
        {/* Meta */}
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-caption font-medium text-primary-text">
            {DOMAIN_LABELS[locale]?.[current.domain] || current.domain}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-caption font-medium ${DIFF_COLORS[current.difficulty]}`}>
            {DIFFICULTY_LABELS[locale]?.[current.difficulty] || current.difficulty}
          </span>
          {marked.has(current.id) && (
            <span className="rounded-full bg-warning-soft px-2.5 py-0.5 text-caption font-medium text-warning-text">
              <Flag className="h-3 w-3 inline mr-0.5" />{isKo ? "표시됨" : "Marked"}
            </span>
          )}
          <span className="ml-auto text-small text-hint">{currentIdx + 1} / {filtered.length}</span>
        </div>

        {/* Question */}
        <h3 className="text-h3 text-heading mb-6 leading-relaxed">
          Q{currentIdx + 1}. {current.question}
        </h3>

        {/* Choices */}
        <div className="space-y-3">
          {current.choices.map((choice, idx) => {
            let borderClass = "border-border hover:border-primary";
            let bgClass = "bg-surface";

            if (!isMock && showExplanation) {
              if (idx === current.answer) { borderClass = "border-success"; bgClass = "bg-success-soft"; }
              else if (idx === selected && idx !== current.answer) { borderClass = "border-danger"; bgClass = "bg-danger-soft"; }
              else { borderClass = "border-border opacity-50"; }
            } else if (answers[current.id] === idx) {
              borderClass = "border-primary";
              bgClass = "bg-primary-soft";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={!isMock && showExplanation}
                className={`w-full rounded-lg border ${borderClass} ${bgClass} px-4 py-3 text-left text-small text-body transition-colors disabled:cursor-default`}
              >
                <div className="flex items-start gap-3">
                  {!isMock && showExplanation && idx === current.answer && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />}
                  {!isMock && showExplanation && idx === selected && idx !== current.answer && <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />}
                  <span>{choice}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (practice mode only) */}
        {!isMock && showExplanation && (
          <div className={`mt-6 rounded-lg border p-4 ${isCorrect ? "border-success-soft bg-success-soft" : "border-danger-soft bg-danger-soft"}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-danger" />}
              <span className={`text-small font-medium ${isCorrect ? "text-success-text" : "text-danger-text"}`}>
                {isCorrect ? (isKo ? "정답!" : "Correct!") : (isKo ? "오답" : "Incorrect")}
              </span>
            </div>
            <p className="text-small text-body">{current.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-small text-sub hover:text-heading transition-colors disabled:opacity-30 disabled:cursor-default"
          >
            <ArrowLeft className="h-4 w-4" />
            {isKo ? "이전" : "Prev"}
          </button>

          {isMock ? (
            <button onClick={handleNext} disabled={currentIdx >= filtered.length - 1} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-small font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-30">
              {isKo ? "다음" : "Next"} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            showExplanation && (
              <button onClick={handleNext} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-small font-medium text-white hover:bg-primary-hover transition-colors">
                {currentIdx < filtered.length - 1 ? (isKo ? "다음 문제" : "Next Question") : (isKo ? "결과 보기" : "View Results")}
                <ArrowRight className="h-4 w-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* Score summary (practice only) */}
      {!isMock && answeredCount > 0 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-small text-sub">
          <span>{isKo ? "정답" : "Correct"}: {Object.entries(answers).filter(([id]) => questions.find((q) => q.id === Number(id))?.answer === answers[Number(id)]).length}/{answeredCount}</span>
        </div>
      )}
    </div>
  );
}
