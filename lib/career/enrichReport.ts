import type { AIReportData, ProfileVector, UserContextSnapshot } from "@/types/report.types";
import { DEPARTMENT_CATALOG, PROFESSION_CATALOG } from "@/lib/career/catalog";
import { rankDepartments, rankProfessions } from "@/lib/careerMatch/matchProfile";
import { formatReasonPrefix } from "@/lib/report/userContext";

function futureFromMatch(matchPercent: number): number {
  return Math.min(10, Math.max(5, Math.round(matchPercent / 10)));
}

/**
 * Rapor önerilerini katalogdan profil vektörüne göre doldurur (200 meslek + tüm bölümler skoru).
 */
export function enrichReportWithCatalog(
  profile: ProfileVector,
  report: AIReportData,
  userCtx?: UserContextSnapshot | null
): AIReportData {
  const prefix = userCtx ? formatReasonPrefix(userCtx) : "";

  const profs = rankProfessions(profile, PROFESSION_CATALOG, 20);
  const depts = rankDepartments(profile, DEPARTMENT_CATALOG, 20);

  const professionRecs = profs.map((r) => ({
    title: r.entry.title,
    type: "profession" as const,
    matchScore: r.matchPercent,
    reason: prefix ? `${prefix}${r.reason}` : r.reason,
    futureScore: r.entry.futureOutlook,
    salaryRange: "",
    requiredSkills: [r.entry.category],
    transitionTime: "",
    city: [] as string[],
  }));

  const departmentRecs = depts.map((r) => ({
    title: r.entry.name,
    type: "department" as const,
    matchScore: r.matchPercent,
    reason: prefix ? `${prefix}${r.reason}` : r.reason,
    futureScore: futureFromMatch(r.matchPercent),
    salaryRange: "",
    requiredSkills: r.entry.tracks.slice(0, 4),
    transitionTime: "Lisans (tipik 4 yıl)",
    city: [] as string[],
  }));

  return {
    ...report,
    recommendations: [...professionRecs, ...departmentRecs],
  };
}
