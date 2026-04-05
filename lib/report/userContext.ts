import type { OnboardingBackground, UserRoleType } from "@/types/user.types";
import type { UserContextSnapshot } from "@/types/report.types";

export function sanitizeUserContext(raw: unknown): UserContextSnapshot {
  if (!raw || typeof raw !== "object") return { role: "STUDENT" };
  const o = raw as Record<string, unknown>;
  const role = o.role === "WORKER" ? "WORKER" : "STUDENT";
  const str = (k: string) =>
    typeof o[k] === "string" ? (o[k] as string).trim().slice(0, 200) : undefined;
  const num = (k: string) => {
    const v = o[k];
    if (typeof v !== "number" || !Number.isFinite(v)) return undefined;
    return Math.min(120, Math.max(0, v));
  };
  const examField = str("examField") ?? str("field");
  return {
    role,
    displayName: str("displayName"),
    age: num("age"),
    city: str("city"),
    gradeLevel: str("gradeLevel"),
    examField,
    jobTitle: str("jobTitle"),
    industry: str("industry"),
    yearsExp: num("yearsExp"),
  };
}

/** İstemci (Zustand) onboarding verisinden API ile aynı şekilde snapshot üretir. */
export function buildClientUserContext(
  role: UserRoleType | null,
  displayName: string,
  background: Partial<OnboardingBackground> | null
): UserContextSnapshot {
  return sanitizeUserContext({
    role: role === "WORKER" ? "WORKER" : "STUDENT",
    displayName: displayName?.trim() || undefined,
    age: background?.age,
    city: background?.city,
    gradeLevel: background?.gradeLevel,
    examField: background?.examField,
    jobTitle: background?.jobTitle,
    industry: background?.industry,
    yearsExp: background?.yearsExp,
  });
}

/** Öneri satırlarına kısa onboarding etiketi. */
export function formatReasonPrefix(ctx: UserContextSnapshot): string {
  const parts: string[] = [];
  parts.push(ctx.role === "STUDENT" ? "Öğrenci" : "Çalışan");
  if (ctx.city) parts.push(ctx.city);
  if (ctx.role === "STUDENT") {
    if (ctx.gradeLevel) parts.push(ctx.gradeLevel);
    if (ctx.examField) parts.push(ctx.examField);
  } else {
    if (ctx.jobTitle) parts.push(ctx.jobTitle);
    if (ctx.industry) parts.push(ctx.industry);
    if (ctx.yearsExp != null) parts.push(`${ctx.yearsExp} yıl deneyim`);
  }
  return `[Profil: ${parts.join(" · ")}] `;
}

export function userContextDetailRows(
  ctx: UserContextSnapshot
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "Rol", value: ctx.role === "STUDENT" ? "Öğrenci" : "Çalışan" },
  ];
  if (ctx.displayName) rows.push({ label: "Görünen ad", value: ctx.displayName });
  if (ctx.age != null) rows.push({ label: "Yaş", value: String(ctx.age) });
  if (ctx.city) rows.push({ label: "Şehir", value: ctx.city });
  if (ctx.role === "STUDENT") {
    if (ctx.gradeLevel) rows.push({ label: "Sınıf / düzey", value: ctx.gradeLevel });
    if (ctx.examField) rows.push({ label: "Sınav alanı", value: ctx.examField });
  } else {
    if (ctx.jobTitle) rows.push({ label: "İş unvanı", value: ctx.jobTitle });
    if (ctx.industry) rows.push({ label: "Sektör", value: ctx.industry });
    if (ctx.yearsExp != null) rows.push({ label: "Deneyim", value: `${ctx.yearsExp} yıl` });
  }
  return rows;
}
