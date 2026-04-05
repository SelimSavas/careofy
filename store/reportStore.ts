import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AIReportData, ProfileVector } from "@/types/report.types";

interface ReportState {
  profileVector: ProfileVector | null;
  reportData: AIReportData | null;
  reportId: string | null;
  setFromAnalysis: (payload: {
    profileVector: ProfileVector;
    reportData: AIReportData;
    reportId?: string | null;
  }) => void;
  clear: () => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      profileVector: null,
      reportData: null,
      reportId: null,
      setFromAnalysis: ({ profileVector, reportData, reportId }) =>
        set({ profileVector, reportData, reportId: reportId ?? null }),
      clear: () =>
        set({ profileVector: null, reportData: null, reportId: null }),
    }),
    { name: "careofy-report" }
  )
);
