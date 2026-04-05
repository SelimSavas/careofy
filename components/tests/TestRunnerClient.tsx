"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuestionCard } from "@/components/tests/QuestionCard";
import { getQuestions } from "@/lib/questions";
import { TEST_LABELS, TEST_SLUGS, TEST_QUESTION_COUNTS } from "@/lib/testMeta";
import { TestDisclaimerBanner } from "@/components/legal/TestDisclaimerBanner";
import { useTestStore } from "@/store/testStore";

const AUTO_ADVANCE_MS = 300;

export function TestRunnerClient() {
  const params = useParams();
  const router = useRouter();
  const slug = params.testId as string;
  const testType = TEST_SLUGS[slug];

  const ensureSession = useTestStore((s) => s.ensureSession);
  const setAnswer = useTestStore((s) => s.setAnswer);
  const setIndex = useTestStore((s) => s.setIndex);
  const completeTest = useTestStore((s) => s.completeTest);
  const sessions = useTestStore((s) => s.sessions);

  const [selected, setSelected] = useState<string | null>(null);
  const goNextRef = useRef<() => Promise<void>>(async () => {});
  const advanceFromUserClick = useRef(false);
  const autoAdvanceTimerRef = useRef<number | null>(null);

  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceTimerRef.current != null) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, []);

  const questions = useMemo(() => {
    if (!testType) return [];
    return getQuestions(testType);
  }, [testType]);

  const total = testType ? TEST_QUESTION_COUNTS[testType] : 0;
  const session = testType ? sessions[testType] : undefined;
  const currentIndex = session?.currentIndex ?? 0;
  const question = questions[currentIndex];

  useEffect(() => {
    if (testType) ensureSession(testType);
  }, [testType, ensureSession]);

  useEffect(() => {
    if (!question || !session) {
      setSelected(null);
      return;
    }
    const prev = session.answers[question.id];
    setSelected(prev != null ? String(prev) : null);
  }, [question, session]);

  const progress = total ? ((currentIndex + 1) / total) * 100 : 0;

  const goNext = useCallback(async () => {
    clearAutoAdvance();
    if (!testType || !question || selected === null) return;
    setAnswer(testType, question.id, selected);
    if (currentIndex >= total - 1) {
      completeTest(testType);
      const mergedAnswers = {
        ...(useTestStore.getState().sessions[testType]?.answers ?? {}),
        [question.id]: selected,
      };
      try {
        await fetch("/api/tests/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            testType,
            answers: mergedAnswers,
            currentQ: total,
            completed: true,
          }),
        });
      } catch {
        // Sunucu hatası: yerel store tamamlandı; kullanıcı test merkezinden devam edebilir
      }
      router.push("/tests/overview");
      return;
    }
    setIndex(testType, currentIndex + 1);
    setSelected(null);
  }, [
    testType,
    question,
    selected,
    setAnswer,
    currentIndex,
    total,
    completeTest,
    router,
    setIndex,
    clearAutoAdvance,
  ]);

  goNextRef.current = goNext;

  useEffect(() => {
    if (selected === null || !advanceFromUserClick.current) return;
    advanceFromUserClick.current = false;
    clearAutoAdvance();
    autoAdvanceTimerRef.current = window.setTimeout(() => {
      autoAdvanceTimerRef.current = null;
      void goNextRef.current();
    }, AUTO_ADVANCE_MS);
    return () => clearAutoAdvance();
  }, [selected, clearAutoAdvance]);

  const handleSelectOption = useCallback((optionId: string) => {
    advanceFromUserClick.current = true;
    setSelected(optionId);
  }, []);

  const goPrev = () => {
    if (!testType || currentIndex <= 0) return;
    setIndex(testType, currentIndex - 1);
  };

  if (!testType || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <EmptyState
          className="max-w-md border-0 bg-transparent"
          title="Test bulunamadı"
          description="Bu adres geçerli bir teste ait değil."
          action={
            <Link href="/tests/overview">
              <Button variant="primary">Test merkezine dön</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3">
            <TestDisclaimerBanner compact />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <Link href="/tests/overview">
              <Button variant="ghost" className="px-3 text-gray-500 hover:text-navy-800">
                <X size={20} />
                <span>Çık</span>
              </Button>
            </Link>
            <div className="text-center text-sm text-gray-500">
              {TEST_LABELS[testType]}
            </div>
            <div className="text-sm text-gray-500">
              Soru {currentIndex + 1} / {total}
            </div>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {question && (
              <QuestionCard
                key={question.id}
                question={question}
                questionNumber={currentIndex + 1}
                selected={selected}
                onSelect={handleSelectOption}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Button
            variant="ghost"
            icon={<ChevronLeft size={20} />}
            iconPosition="leading"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            Önceki
          </Button>
          <span className="text-sm text-gray-500">%{Math.round(progress)}</span>
          <Button
            variant="primary"
            icon={<ArrowRight size={20} />}
            onClick={() => void goNext()}
            disabled={selected === null}
          >
            {currentIndex >= total - 1 ? "Bitir" : "İlerle"}
          </Button>
        </div>
      </div>
    </div>
  );
}
