"use client";

import dynamic from "next/dynamic";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { dim: "Empati", v: 85 },
  { dim: "Yaratıcılık", v: 72 },
  { dim: "Analitik", v: 68 },
  { dim: "Strateji", v: 78 },
  { dim: "İletişim", v: 70 },
  { dim: "Liderlik", v: 62 },
];

function RadarInner() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.15)" />
        <PolarAngleAxis
          dataKey="dim"
          tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 11 }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="Profil"
          dataKey="v"
          stroke="var(--orange-500)"
          fill="var(--orange-500)"
          fillOpacity={0.35}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export const PersonalityRadar = dynamic(() => Promise.resolve(RadarInner), {
  ssr: false,
  loading: () => (
    <div className="flex h-[280px] items-center justify-center text-white/60">
      Grafik yükleniyor…
    </div>
  ),
});
