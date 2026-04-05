import type { CatalogWeights, HollandWeights, MBTIAxes } from "@/lib/careerMatch/types";

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * Katalogda ayrı Big Five ağırlığı yokken, Holland + MBTI ideal eksenlerinden
 * iş/rol için tahmini O·C·E·A profili (0–100). Meslek eşleştirmede kullanılır.
 */
export function inferCatalogBigFour(item: CatalogWeights): {
  O: number;
  C: number;
  E: number;
  A: number;
} {
  const h = item.holland as HollandWeights;
  const m = item.mbtiIdeal as MBTIAxes | undefined;
  const O = clamp((((h.A ?? 0) + (h.I ?? 0)) / 10) * 100, 0, 100);
  const C = clamp((((h.C ?? 0) + (h.R ?? 0) * 0.45) / 7.25) * 100, 0, 100);
  const E = m ? clamp(((m.ei + 1) / 2) * 100, 0, 100) : 50;
  const tf = m?.tf ?? 0;
  const agreeFromMbti = (1 - tf) / 2;
  const social = (h.S ?? 0) / 5;
  const A = clamp((agreeFromMbti * 0.55 + social * 0.45) * 100, 0, 100);
  return { O, C, E, A };
}
