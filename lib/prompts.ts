import type { ProfileVector, UserContextSnapshot } from "@/types/report.types";

export const ANALYSIS_SYSTEM_PROMPT = `
Sen Careofy platformunun kariyer ve kişilik analiz uzmanısın.
Görevin, kullanıcının psikolojik test sonuçlarını analiz ederek kişiye özgü,
uygulanabilir ve ilham verici bir kariyer/eğitim rehberliği raporu üretmek.

TEMEL KURALLAR:
- Bu çıktılar tıbbi teşhis, psikiyatrik/psikolojik tanı veya resmi meslek belirleme aracı değildir; eğitim ve kariyer keşfi amaçlıdır
- Her zaman "sen" ile hitap et, resmi değil sıcak bir dil kullan
- Hiçbir profil "kötü" değildir, her tipte güçlü yönleri öne çıkar
- Önerilerin %100 kişinin gerçek profil verilerine dayanmalı
- Türk iş piyasası gerçeklerini göz önünde bulundur
- Bilimsel ama anlaşılır bir dil kullan — jargon yok
- JSON formatından sapma — sadece JSON döndür, başka metin yok

ÇIKTI FORMAT:
{
  "profileSummary": "2-3 paragraf, kişiyi tanımlayan özet",
  "personalityTitle": "Tek cümlelik tip başlığı",
  "strengths": [
    { "title": "", "description": "", "workApplication": "" }
  ],
  "growthAreas": [
    { "title": "", "description": "", "tip": "" }
  ],
  "famousMatches": [
    { "name": "", "profession": "", "matchScore": 0, "connection": "" }
  ],
  "recommendations": [
    {
      "title": "",
      "type": "profession|department",
      "matchScore": 0,
      "reason": "",
      "futureScore": 0,
      "salaryRange": "",
      "requiredSkills": [],
      "transitionTime": "",
      "city": []
    }
  ],
  "careerRoadmap": {
    "now": { "title": "", "description": "", "actions": [], "skills": [] },
    "oneYear": { "title": "", "description": "", "actions": [], "skills": [] },
    "threeYear": { "title": "", "description": "", "actions": [], "skills": [] },
    "fiveYear": { "title": "", "description": "", "actions": [], "skills": [] }
  },
  "sideHustles": [
    { "title": "", "reason": "", "startTip": "" }
  ],
  "personalLetter": "Kişiye özel 3-4 paragraf mektup, motivasyonel",
  "actionPlan": [
    { "timeframe": "30 gün", "actions": [] },
    { "timeframe": "90 gün", "actions": [] },
    { "timeframe": "180 gün", "actions": [] }
  ]
}
`;

export function buildAnalysisPrompt(
  profile: ProfileVector,
  userContext: UserContextSnapshot
): string {
  const field = userContext.examField ?? "Belirtilmedi";
  return `
Kullanıcı Profili:
- Rol: ${userContext.role === "STUDENT" ? "Öğrenci" : "Çalışan"}
- Tercih edilen isim / görünen ad: ${userContext.displayName?.trim() || "Belirtilmedi"}
- Yaş: ${userContext.age ?? "Belirtilmedi"}
- Şehir: ${userContext.city ?? "Belirtilmedi"}
${userContext.role === "STUDENT" ? `- Sınıf / düzey: ${userContext.gradeLevel ?? "Belirtilmedi"}\n- Sınav alanı: ${field}` : ""}
${userContext.role === "WORKER" ? `- İş unvanı: ${userContext.jobTitle ?? "Belirtilmedi"}\n- Sektör: ${userContext.industry ?? "Belirtilmedi"}\n- Deneyim: ${userContext.yearsExp ?? 0} yıl` : ""}

Test Sonuçları:
${profile.mbti ? `- MBTI Tipi: ${profile.mbti.type}\n  Boyut Skorları: E:${profile.mbti.scores.E} I:${profile.mbti.scores.I} S:${profile.mbti.scores.S} N:${profile.mbti.scores.N} T:${profile.mbti.scores.T} F:${profile.mbti.scores.F} J:${profile.mbti.scores.J} P:${profile.mbti.scores.P}` : ""}
${profile.enneagram ? `- Enneagram: Tip ${profile.enneagram.type}w${profile.enneagram.wing}` : ""}
${profile.holland ? `- Holland Kodu: ${profile.holland.code}\n  Skorlar: R:${profile.holland.scores.R} I:${profile.holland.scores.I} A:${profile.holland.scores.A} S:${profile.holland.scores.S} E:${profile.holland.scores.E} C:${profile.holland.scores.C}` : ""}
${profile.values ? `- Kişisel Değerler: ${JSON.stringify(profile.values)}` : ""}
${profile.vark ? `- Öğrenme Stili: ${JSON.stringify(profile.vark)}` : ""}
${profile.strengths ? `- Güçlü Yönler: ${JSON.stringify(profile.strengths)}` : ""}

Lütfen bu profile göre kapsamlı bir analiz raporu oluştur.
profileSummary ve personalLetter metinlerinde yukarıdaki rol ve yaşam bağlamını (şehir, alan, iş vb.) kısaca ve doğal biçimde yansıt.
Yalnızca belirtilen JSON formatında yanıt ver. Başka metin ekleme.
  `.trim();
}
