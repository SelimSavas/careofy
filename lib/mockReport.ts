import { enrichReportWithCatalog } from "@/lib/career/enrichReport";
import type { AIReportData, ProfileVector, UserContextSnapshot } from "@/types/report.types";

export function buildMockReport(
  profile: ProfileVector,
  userCtx?: UserContextSnapshot | null
): AIReportData {
  const mbti = profile.mbti?.type ?? "INFJ";
  const holland = profile.holland?.code ?? "SAI";
  const base: AIReportData = {
    profileSummary: `Test sonuçların (${mbti}, Holland ${holland}) bir araya geldiğinde, derinlemesine düşünen ve insan odaklı bir profil çiziyorsun. Hem analitik hem de yaratıcı taraflarını dengeleyerek karar verme eğilimindesin. Bu kombinasyon, hem bireysel hem takım içi rollerde güçlü bir etki yaratmana yardım eder.`,
    personalityTitle: "Denge Arayan Vizyoner",
    strengths: [
      {
        title: "Empatik analiz",
        description: "Veriyi ve insanı birlikte okuyabilirsin.",
        workApplication: "Kullanıcı araştırması, koçluk, eğitim tasarımı.",
      },
      {
        title: "Yapı + esneklik",
        description: "Plan yapmayı severken yeni bilgiye adapte olursun.",
        workApplication: "Proje yönetimi, ürün geliştirme rolleri.",
      },
    ],
    growthAreas: [
      {
        title: "Net sınır koyma",
        description: "Yoğun empati bazen yük üstlenmene yol açabilir.",
        tip: "Haftalık öncelik listesinde 'hayır' diyebileceğin 2 slot ayır.",
      },
    ],
    famousMatches: [
      {
        name: "Örnek İsim",
        profession: "UX Stratejisti",
        matchScore: 88,
        connection: "Benzer tip kombinasyonuyla insan ve sistem arasında köprü kuruyor.",
      },
    ],
    recommendations: [],
    careerRoadmap: {
      now: {
        title: "Temel",
        description: "Portfolyo ve temel araçlar.",
        actions: ["İlk 2 case study", "Figma pratiği"],
        skills: ["UI temelleri", "Kullanıcı görüşmesi"],
      },
      oneYear: {
        title: "Junior seviye",
        description: "Gerçek projelerde yer alma.",
        actions: ["Staj veya freelance", "Tasarım sistemi çalışması"],
        skills: ["Design tokens", "Erişilebilirlik"],
      },
      threeYear: {
        title: "Uzmanlık",
        description: "Dar alanda derinleşme.",
        actions: ["Uzmanlık alanı seç", "Mentorluk"],
        skills: ["Strateji", "Ölçümleme"],
      },
      fiveYear: {
        title: "Liderlik",
        description: "Ekip ve vizyon.",
        actions: ["Lead roller", "Ürün stratejisi"],
        skills: ["Stakeholder yönetimi", "Yol haritası"],
      },
    },
    personalLetter: `Merhaba,\n\nSonuçların senin için bir etiket değil, bir harita. ${mbti} tipin ve ${holland} ilgi kodun, hem derin düşünmeyi hem de insanla anlamlı temas kurmayı öne çıkarıyor. Küçük adımlarla — haftada bir portfolyo güncellemesi, bir kullanıcı görüşmesi — yol çok daha netleşecek.\n\nCareofy ekibi`,
    actionPlan: [
      { timeframe: "30 gün", actions: ["Güçlü yön listeni 5 maddeye indir", "1 bilgi görüşmesi ayarla"] },
      { timeframe: "90 gün", actions: ["1 tamamlanmış proje ekle", "LinkedIn özetini güncelle"] },
      { timeframe: "180 gün", actions: ["Hedef rol için 10 başvuru", "geri bildirim döngüsü kur"] },
    ],
    sideHustles: [
      { title: "Mikro eğitim içeriği", reason: "Anlatım ve empati gücün", startTip: "15 dk’lık Notion şablonları ile başla" },
    ],
  };
  return enrichReportWithCatalog(profile, base, userCtx);
}
