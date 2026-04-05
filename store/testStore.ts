import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TestType } from "@/types/test.types";
import { ALL_TEST_TYPES, TEST_QUESTION_COUNTS } from "@/lib/testMeta";

type Session = {
  currentIndex: number;
  answers: Record<string, string | number>;
  startedAt: string;
  completed: boolean;
};

interface TestStore {
  sessions: Partial<Record<TestType, Session>>;
  setAnswer: (testType: TestType, questionId: string, value: string | number) => void;
  setIndex: (testType: TestType, index: number) => void;
  nextQuestion: (testType: TestType) => void;
  prevQuestion: (testType: TestType) => void;
  completeTest: (testType: TestType) => void;
  getProgress: (testType: TestType) => number;
  allTestsCompleted: () => boolean;
  ensureSession: (testType: TestType) => void;
  hydrateFromServer: (
    data: Partial<
      Record<
        TestType,
        {
          currentIndex: number;
          answers: Record<string, string | number>;
          completed: boolean;
          startedAt: string;
        }
      >
    >
  ) => void;
  reset: () => void;
}

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      sessions: {},

      ensureSession: (testType) =>
        set((state) => {
          if (state.sessions[testType]) return state;
          return {
            sessions: {
              ...state.sessions,
              [testType]: {
                currentIndex: 0,
                answers: {},
                startedAt: new Date().toISOString(),
                completed: false,
              },
            },
          };
        }),

      setAnswer: (testType, questionId, value) =>
        set((state) => {
          const s = state.sessions[testType] ?? {
            currentIndex: 0,
            answers: {},
            startedAt: new Date().toISOString(),
            completed: false,
          };
          return {
            sessions: {
              ...state.sessions,
              [testType]: {
                ...s,
                answers: { ...s.answers, [questionId]: value },
              },
            },
          };
        }),

      setIndex: (testType, index) =>
        set((state) => {
          const s = state.sessions[testType];
          if (!s) return state;
          return {
            sessions: {
              ...state.sessions,
              [testType]: { ...s, currentIndex: index },
            },
          };
        }),

      nextQuestion: (testType) =>
        set((state) => {
          const s = state.sessions[testType];
          if (!s) return state;
          const total = TEST_QUESTION_COUNTS[testType];
          return {
            sessions: {
              ...state.sessions,
              [testType]: {
                ...s,
                currentIndex: Math.min(s.currentIndex + 1, total - 1),
              },
            },
          };
        }),

      prevQuestion: (testType) =>
        set((state) => {
          const s = state.sessions[testType];
          if (!s) return state;
          return {
            sessions: {
              ...state.sessions,
              [testType]: {
                ...s,
                currentIndex: Math.max(0, s.currentIndex - 1),
              },
            },
          };
        }),

      completeTest: (testType) =>
        set((state) => {
          const s = state.sessions[testType];
          if (!s) return state;
          return {
            sessions: {
              ...state.sessions,
              [testType]: { ...s, completed: true },
            },
          };
        }),

      getProgress: (testType) => {
        const session = get().sessions[testType];
        if (!session) return 0;
        const total = TEST_QUESTION_COUNTS[testType];
        const n = Object.keys(session.answers).length;
        return Math.round((n / total) * 100);
      },

      allTestsCompleted: () => {
        const sessions = get().sessions;
        return ALL_TEST_TYPES.every((t) => sessions[t]?.completed === true);
      },

      hydrateFromServer: (data) =>
        set((state) => {
          const next = { ...state.sessions };
          for (const t of ALL_TEST_TYPES) {
            const srv = data[t];
            if (!srv) continue;
            next[t] = {
              currentIndex: srv.currentIndex,
              answers: { ...srv.answers },
              completed: srv.completed,
              startedAt: srv.startedAt,
            };
          }
          return { sessions: next };
        }),

      reset: () => set({ sessions: {} }),
    }),
    { name: "careofy-tests" }
  )
);
