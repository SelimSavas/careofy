import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Yasal bilgilendirme — Careofy",
  description: "KVKK, çerez politikası ve test uyarıları.",
};

export default function LegalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-6 py-12 md:px-12">
        <article className="prose prose-gray mx-auto max-w-3xl text-gray-700">
          <h1 className="font-heading text-3xl text-navy-800">Yasal bilgilendirme</h1>
          <p className="text-gray-600">
            Bu sayfa bilgilendirme amaçlıdır; kesin hukuki danışmanlık yerine geçmez. Sorularınız için{" "}
            <span className="text-navy-800">destek@careofy.app</span> (örnek) adresine yazabilirsiniz.
          </p>

          <h2 id="kvkk" className="scroll-mt-24 text-2xl text-navy-800">
            KVKK ve kişisel veriler
          </h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, test cevapları, profil vektörü, rapor içeriği ve
            hesap bilgileriniz yalnızca hizmetin sunulması, iyileştirilmesi ve yasal yükümlülüklerin yerine
            getirilmesi amaçlarıyla işlenir. Veri sorumlusu ve iletişim kanalları için güncel aydınlatma metnini
            yayınlamanız önerilir; bu taslakta özetle:
          </p>
          <ul>
            <li>Hukuka ve dürüstlük kurallarına uygun işleme</li>
            <li>Belirli, açık ve meşru amaçlar için sınırlı saklama</li>
            <li>Gerekli teknik ve idari güvenlik önlemleri</li>
            <li>Haklarınız: bilgi talebi, düzeltme, silme, itiraz (Kanun m. 11)</li>
          </ul>

          <h2 id="gizlilik" className="scroll-mt-24 text-2xl text-navy-800">
            Gizlilik özeti
          </h2>
          <p>
            Oturum ve tercihler için çerezler veya tarayıcı yerel depolaması kullanılabilir. Üçüncü taraflarla paylaşım
            yalnızca açık rıza veya yasal zorunluluk hallerinde yapılmalıdır. Yapay zeka analizi için veri bir işleyiciye
            (ör. bulut API) aktarılıyorsa bu, aydınlatma metninde açıkça belirtilmelidir.
          </p>

          <h2 id="cerez" className="scroll-mt-24 text-2xl text-navy-800">
            Çerez politikası
          </h2>
          <p>
            Zorunlu çerezler: oturum ve güvenlik. Tercih çerezleri: dil, tema, analiz bandı onayı. Analitik çerezleri
            yalnızca onay sonrası kullanın. Kullanıcı &quot;Anladım&quot; ile yerel depolamaya kaydettiğinde basit bir
            rıza kaydı tutulur; geri çekme için ayarlar veya tarayıcı temizliği kullanılabilir.
          </p>

          <h2 id="test-uyarisi" className="scroll-mt-24 text-2xl text-navy-800">
            Test ve rapor uyarısı
          </h2>
          <p>
            Careofy üzerindeki kişilik, ilgi, değer ve öğrenme stili ölçekleri <strong>eğlence, öz-farkındalık ve kariyer
            keşfi</strong> amaçlıdır. Sonuçlar <strong>tıbbi teşhis, psikiyatrik veya psikolojik tanı, tedavi planı veya
            resmi meslek/psikometrik değerlendirme</strong> yerine kullanılamaz. Sağlık veya acil durumlarda bir hekime
            veya yetkili kuruma başvurun.
          </p>

          <h2 id="kullanim" className="scroll-mt-24 text-2xl text-navy-800">
            Kullanım şartları (özet)
          </h2>
          <p>
            Hizmet &quot;olduğu gibi&quot; sunulur; önemli kararları yalnızca bu çıktılara dayandırmayın. İçerik ve
            algoritmalar önceden haber verilmeksizin güncellenebilir. Kullanıcı, yanıltıcı veya yasadışı kullanımdan
            sorumludur.
          </p>

          <p className="pt-6">
            <Link href="/" className="font-semibold text-brand-600 hover:underline">
              Ana sayfaya dön
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
