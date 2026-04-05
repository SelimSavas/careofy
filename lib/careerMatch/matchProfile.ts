import type { ProfileVector } from "@/types/report.types";
import type {
  CatalogWeights,
  DepartmentCatalogEntry,
  HollandWeights,
  ProfessionCatalogEntry,
  RankedDepartment,
  RankedProfession,
} from "@/lib/careerMatch/types";

const H_KEYS = ["R", "I", "A", "S", "E", "C"] as const;

const WEIGHTS = {
  holland: 0.36,
  mbti: 0.22,
  values: 0.14,
  vark: 0.12,
  strengths: 0.11,
  enneagram: 0.05,
} as const;

/** Kullanıcıya gösterilecek eşleşme yüzdesi bileşenleri (WEIGHTS ile senkron). */
export const MATCH_SCORE_WEIGHTS_DISPLAY = [
  { id: "holland", percent: 36, title: "Holland ilgi kodu (RIASEC)" },
  { id: "mbti", percent: 22, title: "MBTI çalışma tercihleri" },
  { id: "values", percent: 14, title: "Kariyer değerleri" },
  { id: "vark", percent: 12, title: "VARK öğrenme stili" },
  { id: "strengths", percent: 11, title: "Güçlü yönler temaları" },
  { id: "enneagram", percent: 5, title: "Enneagram motivasyonları" },
] as const;

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function cosineSim6(
  a: Record<string, number>,
  b: Record<string, number>
): number {
  let dot = 0,
    na = 0,
    nb = 0;
  for (const k of H_KEYS) {
    const x = a[k] ?? 0;
    const y = b[k] ?? 0;
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  if (na < 1e-9 || nb < 1e-9) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function userLeadsHollandLetter(
  scores: Record<string, number>,
  letter: (typeof H_KEYS)[number]
): boolean {
  const ranked = H_KEYS.map((k) => ({ k, v: scores[k] ?? 0 })).sort((a, b) => b.v - a.v);
  return ranked[0].k === letter && ranked[0].v > (ranked[1]?.v ?? 0);
}

/**
 * Holland’da net “Uygulama/teknik (R)” öne çıkan kullanıcılar için, yüksek R ağırlıklı
 * katalog öğelerine (zanaat, tarım, saha) hafif bonus — meslek listesi genişledikçe ayrışmayı korur.
 */
function hollandRealisticAlignmentBonus(
  profile: ProfileVector,
  itemHolland: HollandWeights
): number {
  const u = profile.holland?.scores as Record<string, number> | undefined;
  if (!u) return 0;
  if ((itemHolland.R ?? 0) < 4) return 0;
  if (!userLeadsHollandLetter(u, "R")) return 0;
  return 4;
}

function scoreHolland(profile: ProfileVector, w: CatalogWeights): number {
  const u = profile.holland?.scores;
  if (!u) return 55;
  const ih = w.holland as HollandWeights;
  const cos = cosineSim6(u as Record<string, number>, ih as Record<string, number>);
  const base = clamp(cos * 100, 0, 100);
  const bonus = hollandRealisticAlignmentBonus(profile, ih);
  return clamp(base + bonus, 0, 100);
}

function mbtiAxesFromProfile(profile: ProfileVector): {
  ei: number;
  sn: number;
  tf: number;
  jp: number;
} | null {
  const m = profile.mbti?.scores;
  if (!m) return null;
  const eps = 1e-6;
  const ei = (m.E - m.I) / (m.E + m.I + eps);
  const sn = (m.S - m.N) / (m.S + m.N + eps);
  const tf = (m.T - m.F) / (m.T + m.F + eps);
  const jp = (m.J - m.P) / (m.J + m.P + eps);
  return { ei, sn, tf, jp };
}

function scoreMbti(profile: ProfileVector, ideal?: CatalogWeights["mbtiIdeal"]): number {
  if (!ideal) return 58;
  const u = mbtiAxesFromProfile(profile);
  if (!u) return 55;
  const axes: (keyof typeof u)[] = ["ei", "sn", "tf", "jp"];
  let s = 0;
  for (const ax of axes) {
    const d = Math.abs(u[ax] - ideal[ax]);
    s += (1 - d / 2) * 25;
  }
  return clamp(s, 0, 100);
}

const VALUE_KEYS = [
  "achievement",
  "purpose",
  "autonomy",
  "security",
  "recognition",
  "growth",
  "service",
  "balance",
  "adventure",
  "creativity",
  "community",
  "variety",
] as const;

function scoreValues(profile: ProfileVector, item: CatalogWeights): number {
  const weights = item.values;
  if (!weights || Object.keys(weights).length === 0) return 52;
  const user = profile.values?.scores;
  if (!user) return 52;
  let dot = 0,
    nu = 0,
    ni = 0;
  for (const k of VALUE_KEYS) {
    const iw = weights[k] ?? 0;
    if (iw === 0) continue;
    const uv = user[k] ?? 0;
    dot += uv * iw;
    nu += uv * uv;
    ni += iw * iw;
  }
  if (ni < 1e-9) return 52;
  if (nu < 1e-9) return 50;
  const cos = dot / (Math.sqrt(nu) * Math.sqrt(ni));
  return clamp(((cos + 1) / 2) * 100, 0, 100);
}

const VARK_KEYS = ["V", "A", "R", "K"] as const;

function scoreVark(profile: ProfileVector, item: CatalogWeights): number {
  const iv = item.vark;
  if (!iv || Object.keys(iv).length === 0) return 52;
  const us = profile.vark?.scores;
  if (!us) return 52;
  let dot = 0,
    nu = 0,
    ni = 0;
  for (const k of VARK_KEYS) {
    const a = us[k] ?? 0;
    const b = iv[k] ?? 0;
    dot += a * b;
    nu += a * a;
    ni += b * b;
  }
  if (nu < 1e-9 || ni < 1e-9) return 52;
  return clamp((dot / (Math.sqrt(nu) * Math.sqrt(ni))) * 100, 0, 100);
}

const STRENGTH_KEYS = [
  "communication",
  "analytical",
  "creative",
  "execution",
  "empathy",
  "strategic",
  "learning",
  "discipline",
  "adaptability",
  "leadership",
  "relationship",
  "focus",
] as const;

function scoreStrengths(profile: ProfileVector, item: CatalogWeights): number {
  const iw = item.strengths;
  if (!iw || Object.keys(iw).length === 0) return 52;
  const us = profile.strengths?.scores;
  if (!us) return 52;
  let dot = 0,
    nu = 0,
    ni = 0;
  for (const k of STRENGTH_KEYS) {
    const a = us[k] ?? 0;
    const b = iw[k] ?? 0;
    dot += a * b;
    nu += a * a;
    ni += b * b;
  }
  if (nu < 1e-9 || ni < 1e-9) return 52;
  return clamp((dot / (Math.sqrt(nu) * Math.sqrt(ni))) * 100, 0, 100);
}

function scoreEnneagram(profile: ProfileVector, item: CatalogWeights): number {
  const aff = item.enneagram;
  if (!aff || Object.keys(aff).length === 0) return 50;
  const t = profile.enneagram?.type;
  if (t == null) return 50;
  const key = String(t) as keyof typeof aff;
  const w = aff[key] ?? 0;
  return clamp(50 + w * 50, 0, 100);
}

export function computeCatalogMatchPercent(
  profile: ProfileVector,
  item: CatalogWeights
): number {
  const h = scoreHolland(profile, item);
  const m = scoreMbti(profile, item.mbtiIdeal);
  const v = scoreValues(profile, item);
  const vk = scoreVark(profile, item);
  const st = scoreStrengths(profile, item);
  const e = scoreEnneagram(profile, item);
  const raw =
    WEIGHTS.holland * h +
    WEIGHTS.mbti * m +
    WEIGHTS.values * v +
    WEIGHTS.vark * vk +
    WEIGHTS.strengths * st +
    WEIGHTS.enneagram * e;
  return Math.round(clamp(raw, 35, 99));
}

const H_LABELS: Record<(typeof H_KEYS)[number], string> = {
  R: "Uygulama/teknik",
  I: "Araştırma-analiz",
  A: "Yaratıcı",
  S: "İnsan odaklı",
  E: "İkna-liderlik",
  C: "Düzen-sistem",
};

function topHollandContributions(
  user: Record<string, number>,
  item: Record<string, number>
): string[] {
  const contrib: { k: (typeof H_KEYS)[number]; v: number }[] = [];
  for (const k of H_KEYS) {
    const u = user[k] ?? 0;
    const i = item[k] ?? 0;
    contrib.push({ k, v: u * i });
  }
  contrib.sort((a, b) => b.v - a.v);
  return contrib.slice(0, 2).map((c) => H_LABELS[c.k]);
}

export function buildMatchReason(
  profile: ProfileVector,
  item: CatalogWeights,
  kind: "profession" | "department"
): string {
  const parts: string[] = [];
  if (profile.holland?.scores) {
    const tops = topHollandContributions(
      profile.holland.scores as Record<string, number>,
      item.holland as Record<string, number>
    );
    if (tops.length)
      parts.push(`Holland ilgi profilin (${tops.join(", ")}) bu ${kind === "department" ? "alan" : "rol"} ile örtüşüyor`);
  }
  if (profile.mbti?.type && item.mbtiIdeal) {
    parts.push(`${profile.mbti.type} tercih düzenin görevin gerektirdiği çalışma biçimiyle uyumlu`);
  }
  if (profile.values?.topValues?.length) {
    parts.push(`Öne çıkan değerlerin (${profile.values.topValues.slice(0, 2).join(", ")}) rolün nitelikleriyle örtüşüyor`);
  }
  if (profile.vark?.dominant) {
    parts.push(`${profile.vark.dominant} öğrenme stilin işte kullanılacak yöntemlerle uyumlu`);
  }
  if (profile.strengths?.topThemes?.length) {
    parts.push(`Güçlü yönlerin (${profile.strengths.topThemes.slice(0, 3).join(", ")}) bu çıktıda değer katar`);
  }
  if (parts.length === 0) {
    return "Profil vektörünle katalog ağırlıkları matematiksel olarak eşleştirildi.";
  }
  return parts.slice(0, 3).join(". ") + ".";
}

export function rankProfessions(
  profile: ProfileVector | null | undefined,
  entries: ProfessionCatalogEntry[],
  limit = 24
): RankedProfession[] {
  if (!profile || entries.length === 0) return [];
  const scored = entries.map((entry) => ({
    entry,
    matchPercent: computeCatalogMatchPercent(profile, entry),
    reason: buildMatchReason(profile, entry, "profession"),
  }));
  scored.sort((a, b) => b.matchPercent - a.matchPercent);
  return scored.slice(0, limit);
}

export function rankDepartments(
  profile: ProfileVector | null | undefined,
  entries: DepartmentCatalogEntry[],
  limit = 24
): RankedDepartment[] {
  if (!profile || entries.length === 0) return [];
  const scored = entries.map((entry) => ({
    entry,
    matchPercent: computeCatalogMatchPercent(profile, entry),
    reason: buildMatchReason(profile, entry, "department"),
  }));
  scored.sort((a, b) => b.matchPercent - a.matchPercent);
  return scored.slice(0, limit);
}
