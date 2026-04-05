import type { Question } from "@/types/test.types";

function findOption(q: Question, answerId: string) {
  return q.options.find((o) => o.id === answerId);
}

export function scoreMBTI(
  answers: Record<string, string | number>,
  questions: Question[]
) {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const q of questions) {
    const aid = String(answers[q.id] ?? "");
    const opt = findOption(q, aid);
    if (!opt?.dimensions) continue;
    for (const k of Object.keys(opt.dimensions) as (keyof typeof scores)[]) {
      const v = opt.dimensions[k];
      if (typeof v === "number") scores[k] += v;
    }
  }
  const type =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");
  return { type, scores };
}

export function scoreEnneagram(
  answers: Record<string, string | number>,
  questions: Question[]
) {
  const tally: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) tally[i] = 0;
  for (const q of questions) {
    const aid = String(answers[q.id] ?? "");
    const opt = findOption(q, aid);
    if (!opt?.enneagram) continue;
    for (const [k, v] of Object.entries(opt.enneagram)) {
      const n = Number(k);
      if (!Number.isFinite(n)) continue;
      tally[n] = (tally[n] ?? 0) + (v ?? 0);
    }
  }
  const sorted = Object.entries(tally)
    .map(([k, v]) => ({ t: Number(k), v }))
    .sort((a, b) => b.v - a.v);
  const primary = sorted[0]?.t ?? 4;
  const wing = sorted[1]?.t ?? primary;
  return {
    type: primary,
    wing,
    code: `${primary}w${wing}`,
    growthDirection: primary,
    stressDirection: primary,
  };
}

export function scoreHolland(
  answers: Record<string, string | number>,
  questions: Question[]
) {
  const R = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const q of questions) {
    const aid = String(answers[q.id] ?? "");
    const opt = findOption(q, aid);
    if (!opt?.holland) continue;
    for (const k of Object.keys(R) as (keyof typeof R)[]) {
      R[k] += opt.holland[k] ?? 0;
    }
  }
  const order = (Object.entries(R) as [keyof typeof R, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);
  const code = order.slice(0, 3).join("");
  return { code, scores: R };
}

const VALUE_LABELS: Record<string, string> = {
  achievement: "Başarı",
  purpose: "Anlam",
  autonomy: "Özgürlük",
  security: "Güvenlik",
  recognition: "Tanıınma",
  growth: "Gelişim",
  service: "Hizmet",
  balance: "Denge",
  adventure: "Maceraperestlik",
  creativity: "Yaratıcılık",
  community: "Topluluk",
  variety: "Çeşitlilik",
};

export function scoreValues(
  answers: Record<string, string | number>,
  questions: Question[]
) {
  const acc: Record<string, number> = {};
  for (const q of questions) {
    const aid = String(answers[q.id] ?? "");
    const opt = findOption(q, aid);
    const key = opt?.valueKey;
    if (!key) continue;
    acc[key] = (acc[key] ?? 0) + 1;
  }
  const top = Object.entries(acc).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "growth";
  return {
    topValues: [VALUE_LABELS[top] ?? top],
    scores: acc,
  };
}

const VARK_NAMES: Record<string, string> = {
  V: "Görsel",
  A: "İşitsel",
  R: "Okuma/Yazma",
  K: "Kinestetik",
};

export function scoreVARK(
  answers: Record<string, string | number>,
  questions: Question[]
) {
  const V = { V: 0, A: 0, R: 0, K: 0 };
  for (const q of questions) {
    const aid = String(answers[q.id] ?? "");
    const opt = findOption(q, aid);
    if (!opt?.vark) continue;
    for (const k of Object.keys(V) as (keyof typeof V)[]) {
      V[k] += opt.vark[k] ?? 0;
    }
  }
  const dom = (Object.entries(V) as [keyof typeof V, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] ?? "V";
  return {
    dominant: VARK_NAMES[dom] ?? dom,
    scores: V,
  };
}

const STRENGTH_LABELS: Record<string, string> = {
  communication: "İletişim",
  analytical: "Analitik",
  creative: "Yaratıcılık",
  execution: "Uygulama",
  empathy: "Empati",
  strategic: "Strateji",
  learning: "Öğrenme",
  discipline: "Disiplin",
  adaptability: "Uyum",
  leadership: "Liderlik",
  relationship: "İlişki",
  focus: "Odak",
};

export function scoreStrengths(
  answers: Record<string, string | number>,
  questions: Question[]
) {
  const acc: Record<string, number> = {};
  for (const q of questions) {
    const aid = String(answers[q.id] ?? "");
    const opt = findOption(q, aid);
    const key = opt?.strengthKey;
    if (!key) continue;
    acc[key] = (acc[key] ?? 0) + 1;
  }
  const topThemes = Object.entries(acc)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k]) => STRENGTH_LABELS[k] ?? k);
  return { topThemes, scores: acc };
}
