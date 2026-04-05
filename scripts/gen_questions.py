#!/usr/bin/env python3
"""Generate diversified Turkish question banks (valid JSON for Careofy)."""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "data" / "questions"


def q4(qid: str, stem: str, opts):
    return {
        "id": qid,
        "text": stem,
        "type": "choice",
        "options": [
            {"id": "a", "label": "A", "text": opts[0][0], **opts[0][1]},
            {"id": "b", "label": "B", "text": opts[1][0], **opts[1][1]},
            {"id": "c", "label": "C", "text": opts[2][0], **opts[2][1]},
            {"id": "d", "label": "D", "text": opts[3][0], **opts[3][1]},
        ],
    }


def build_mbti():
    rows = [
        ("mbti-1", "Kalabalık bir etkinlikte bir süre sonra kendinizi nasıl hissedersiniz?", [
            ("Enerjim yükselir; yeni insanlarla tanışmak beni canlandırır", {"dimensions": {"E": 1}}),
            ("Güzeldir ama ara ara sessiz bir köşeye çekilme ihtiyacı duyarım", {"dimensions": {"E": 0.5, "I": 0.5}}),
            ("Çoğunlukla dinleyici kalırım; derin sohbetleri küçük grupta tercih ederim", {"dimensions": {"I": 0.5}}),
            ("Uzun süre kalabalıkta kalmak beni yorar; erken ayrılmak isterim", {"dimensions": {"I": 1}}),
        ]),
        ("mbti-2", "Telefonla uzun süre konuşmak hakkında ne düşünürsünüz?", [
            ("Rahatım; düşüncelerimi konuşarak netleştiririm", {"dimensions": {"E": 1}}),
            ("İş veya yakınlar için olur; gereksiz uzatmam", {"dimensions": {"E": 0.5}}),
            ("Mesaj veya e-postayı tercih ederim", {"dimensions": {"I": 0.5}}),
            ("Telefon beni gerginleştirir; mümkünse ertelerim", {"dimensions": {"I": 1}}),
        ]),
        ("mbti-3", "Yeni bir işe veya okula başlarken ilk haftada?", [
            ("Ortama hızlı uyum sağlar, birçok kişiyle tanışırım", {"dimensions": {"E": 1}}),
            ("Gözlemleyip yavaş yavaş açılırım", {"dimensions": {"I": 0.5}}),
            ("Bir-iki yakın kişiyle derin bağ kurmayı hedeflerim", {"dimensions": {"I": 0.5}}),
            ("Kendi alanımda çalışıp minimum sosyalleşmeyi tercih ederim", {"dimensions": {"I": 1}}),
        ]),
        ("mbti-4", "Bir problemi çözerken size en çok ne yardımcı olur?", [
            ("Somut örnekler, geçmişte işe yarayan yöntemler", {"dimensions": {"S": 1}}),
            ("Önce veriler, sonra genel bir çerçeve", {"dimensions": {"S": 0.5}}),
            ("Önce olası senaryolar ve bağlantılar", {"dimensions": {"N": 0.5}}),
            ("Yeni modeller, metaforlar ve ‘ya şöyle olsaydı?’ düşüncesi", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-5", "Talimat alırken hangisi sizin için daha nettir?", [
            ("Adım adım yazılı liste veya kontrol listesi", {"dimensions": {"S": 1}}),
            ("Gösterilen örnek ve kısa açıklama", {"dimensions": {"S": 0.5}}),
            ("Genel amaç; detayı kendim tamamlarım", {"dimensions": {"N": 0.5}}),
            ("Sadece yön; yol boyunca şekillendiririm", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-6", "Hata yaptığınız bir raporu düzeltmeniz gerekiyor. İlk bakışta?", [
            ("Hangi satırda neyin yanlış olduğuna odaklanırım", {"dimensions": {"S": 1}}),
            ("Hem detay hem raporun genel tutarlılığına bakarım", {"dimensions": {"S": 0.5, "N": 0.5}}),
            ("Bu hata süreçte nerede üretilmiş olabilir diye düşünürüm", {"dimensions": {"N": 0.5}}),
            ("Bu hata sistemin veya yaklaşımın göstergesi olabilir derim", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-7", "Bir arkadaşınız duygusal bir konuda destek istiyor. İlk tepkiniz?", [
            ("Durumu mantıklı çerçevede analiz edip seçenekleri sıralarım", {"dimensions": {"T": 1}}),
            ("Önce ne olduğunu netleştiririm, sonra çözüm öneririm", {"dimensions": {"T": 0.5}}),
            ("Önce nasıl hissettiğini anlamaya çalışırım", {"dimensions": {"F": 0.5}}),
            ("Yanında olduğumu hissettirmek ve duygularını doğrulamak önceliğimdir", {"dimensions": {"F": 1}}),
        ]),
        ("mbti-8", "Performans geri bildiriminde hangisi size daha yapıcı gelir?", [
            ("Net kriterler ve gelişim için somut maddeler", {"dimensions": {"T": 1}}),
            ("Eleştiri + güçlü yönlerin dengesi", {"dimensions": {"T": 0.5, "F": 0.5}}),
            ("Üslup yumuşak, motive edici bir dil", {"dimensions": {"F": 0.5}}),
            ("İlişkimizin bozulmayacağından emin olmak isterim", {"dimensions": {"F": 1}}),
        ]),
        ("mbti-9", "Ekip içinde anlaşmazlık çıktı. Sizin rolünüz genelde?", [
            ("Haklılık ve verimlilik için tarafsız karşılaştırma yaparım", {"dimensions": {"T": 1}}),
            ("Her iki tarafın argümanını masaya koyarım", {"dimensions": {"T": 0.5}}),
            ("Tarafların duygularını yatıştırmaya çalışırım", {"dimensions": {"F": 0.5}}),
            ("Uzlaşma ve ‘herkes kazanır’ çözümü ararım", {"dimensions": {"F": 1}}),
        ]),
        ("mbti-10", "Büyük bir proje için takvim nasıl olmalı?", [
            ("Aşamalar ve ara teslim tarihleri net yazılı olsun", {"dimensions": {"J": 1}}),
            ("Ana kilometre taşları belli; detay esnek kalsın", {"dimensions": {"J": 0.5}}),
            ("Genel hedef yeterli; yol boyunca revize ederiz", {"dimensions": {"P": 0.5}}),
            ("Sıkı takvim beni boğar; akış içinde ilerlemek isterim", {"dimensions": {"P": 1}}),
        ]),
        ("mbti-11", "Evde düzen konusunda?", [
            ("Her şeyin yeri bellidir; dağınıklık dikkatimi dağıtır", {"dimensions": {"J": 1}}),
            ("Genel olarak düzenlidir; ara sıra dağınıklık olur", {"dimensions": {"J": 0.5}}),
            ("Yaratıcı kaos derim; bulduğum sürece sorun yok", {"dimensions": {"P": 0.5}}),
            ("Son anda toparlarım; sürekli düzen baskı hissettirir", {"dimensions": {"P": 1}}),
        ]),
        ("mbti-12", "Tatil planı yaparken?", [
            ("Günlük program, rezervasyonlar ve rota hazır olsun", {"dimensions": {"J": 1}}),
            ("Uçak ve konaklama net; geri kalan esnek", {"dimensions": {"J": 0.5}}),
            ("Sadece varış noktası belli; gerisi yolda", {"dimensions": {"P": 0.5}}),
            ("Spontane keşif; plan yapmak heyecanı öldürür", {"dimensions": {"P": 1}}),
        ]),
        ("mbti-13", "Toplantıda fikrinizi nasıl sunmayı tercih edersiniz?", [
            ("Düşünürken sesli düşünür, anında tepki veririm", {"dimensions": {"E": 1}}),
            ("Kısa not alır, sıram gelince net konuşurum", {"dimensions": {"E": 0.5}}),
            ("Önce dinlerim; sonra toparlanmış cümlelerle konuşurum", {"dimensions": {"I": 0.5}}),
            ("Mümkünse yazılı özet verir veya toplantı sonrası e-posta atarım", {"dimensions": {"I": 1}}),
        ]),
        ("mbti-14", "Yeni bir hobi öğrenirken?", [
            ("Kurs veya eğitmenle adım adım ilerlerim", {"dimensions": {"S": 1}}),
            ("Video ve kitap karışık kullanırım", {"dimensions": {"S": 0.5}}),
            ("Kendi kendime deneme-yanılma ile keşfederim", {"dimensions": {"N": 0.5}}),
            ("Konunun felsefesini ve farklı yorumlarını araştırırım", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-15", "Bir sunumda soru sorulduğunda cevabınız?", [
            ("Elimdeki veriye dayanarak hızlıca yanıtlarım", {"dimensions": {"S": 1}}),
            ("Kısa cevap verir, gerekirse sonra detay gönderirim", {"dimensions": {"S": 0.5}}),
            ("Soruyu daha geniş çerçeveye bağlayarak cevaplarım", {"dimensions": {"N": 0.5}}),
            ("Paralel örnekler ve uzun vadeli etkiler üzerinden konuşurum", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-16", "İş teklifini değerlendirirken öncelik?", [
            ("Maaş, yan haklar ve somut koşullar", {"dimensions": {"S": 1}}),
            ("Somutlar + takım kültürü", {"dimensions": {"S": 0.5}}),
            ("Kariyer yolu ve şirketin vizyonu", {"dimensions": {"N": 0.5}}),
            ("Bu rolün 5-10 yılda hayatıma katacağı anlam", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-17", "Bir arkadaşınız sizden ‘dürüst ol’ dediğinde?", [
            ("Doğrudan ve net söylemek en iyisidir", {"dimensions": {"T": 1}}),
            ("Gerçeği söylerim ama incitmemeye dikkat ederim", {"dimensions": {"T": 0.5}}),
            ("Önce onun hazır olup olmadığını hissederim", {"dimensions": {"F": 0.5}}),
            ("Sert gerçeği yumuşatarak veya zamanlayarak iletirim", {"dimensions": {"F": 1}}),
        ]),
        ("mbti-18", "Kurallar ve politikalar hakkında?", [
            ("Herkes için aynı kural adil olanıdır", {"dimensions": {"T": 1}}),
            ("Kural + istisna durumları birlikte değerlendirilir", {"dimensions": {"T": 0.5, "F": 0.5}}),
            ("Özel durumlar insani değerlendirilmeli", {"dimensions": {"F": 0.5}}),
            ("İnsanların özel koşulları önce düşünülmeli", {"dimensions": {"F": 1}}),
        ]),
        ("mbti-19", "Son teslim öncesi gece?", [
            ("İş bitmiş, sadece son kontrol yaparım", {"dimensions": {"J": 1}}),
            ("Çoğunu bitirmiş, ufak düzeltmeler kalır", {"dimensions": {"J": 0.5}}),
            ("Önemli kısımlar biter, detaylar yarın", {"dimensions": {"P": 0.5}}),
            ("Baskı altında en iyi performansı gösteririm", {"dimensions": {"P": 1}}),
        ]),
        ("mbti-20", "Günlük görev listesi kullanır mısınız?", [
            ("Evet; tamamlananları işaretlemek keyif verir", {"dimensions": {"J": 1}}),
            ("Haftalık planım var; günlük esnek", {"dimensions": {"J": 0.5}}),
            ("Aklımda tutarım; unutursam hatırlatıcı kullanırım", {"dimensions": {"P": 0.5}}),
            ("Listeler beni sıkıcı hissettirir", {"dimensions": {"P": 1}}),
        ]),
        ("mbti-21", "Alışveriş yaparken?", [
            ("Listeyle girer, hedefe yönelirim", {"dimensions": {"J": 1}}),
            ("Liste + bir iki spontane ürün", {"dimensions": {"J": 0.5}}),
            ("Mağazada gezerken karar veririm", {"dimensions": {"P": 0.5}}),
            ("İlham gelince alırım; plan yapmak zor gelir", {"dimensions": {"P": 1}}),
        ]),
        ("mbti-22", "Sosyal medyada paylaşım?", [
            ("Sık sık hikâye ve gönderi paylaşırım", {"dimensions": {"E": 1}}),
            ("Ara sıra önemli anları paylaşırım", {"dimensions": {"E": 0.5}}),
            ("Çoğunlukla izler, nadiren paylaşırım", {"dimensions": {"I": 0.5}}),
            ("Profilim kapalı veya çok sınırlıdır", {"dimensions": {"I": 1}}),
        ]),
        ("mbti-23", "Grup çalışmasında?", [
            ("Fikir üretmek ve grubu harekete geçirmek isterim", {"dimensions": {"E": 1}}),
            ("Hem konuşur hem dinlerim", {"dimensions": {"E": 0.5}}),
            ("Atanan kısmı sessizce en iyi şekilde yaparım", {"dimensions": {"I": 0.5}}),
            ("Mümkünse bireysel parça üzerinde çalışırım", {"dimensions": {"I": 1}}),
        ]),
        ("mbti-24", "Yeni teknoloji aracı öğrenirken?", [
            ("Kılavuzu okuyup menüleri tek tek denerim", {"dimensions": {"S": 1}}),
            ("Hızlı başlangıç + dokunarak öğrenirim", {"dimensions": {"S": 0.5}}),
            ("Ne işe yarayacağını kavrayınca hızlanırım", {"dimensions": {"N": 0.5}}),
            ("Bu aracın ekosistemdeki yerini düşünürüm", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-25", "Bir film izlerken sizi daha çok ne tatmin eder?", [
            ("Gerçekçi karakterler ve inandırıcı diyaloglar", {"dimensions": {"S": 1}}),
            ("Hikâye tutarlı olsun yeter", {"dimensions": {"S": 0.5}}),
            ("Semboller ve açık uçlu yorum", {"dimensions": {"N": 0.5}}),
            ("Farklı dünyalar ve beklenmedik dönüşler", {"dimensions": {"N": 1}}),
        ]),
        ("mbti-26", "Performansınız eleştirildiğinde iç sesiniz?", [
            ("Nerede hata yaptım, nasıl düzeltirim?", {"dimensions": {"T": 1}}),
            ("Eleştiriyi veri olarak alırım", {"dimensions": {"T": 0.5}}),
            ("Kendimi kötü hissedebilirim", {"dimensions": {"F": 0.5}}),
            ("Beni beğenmediler mi diye üzülürüm", {"dimensions": {"F": 1}}),
        ]),
        ("mbti-27", "İş yerinde ‘adil’ ne demektir?", [
            ("Aynı kriterler herkese uygulanır", {"dimensions": {"T": 1}}),
            ("Kurallar + bağlam", {"dimensions": {"T": 0.5}}),
            ("İhtiyaçlara göre destek farklılaşabilir", {"dimensions": {"F": 0.5}}),
            ("Herkesin duygusal güvenliği korunur", {"dimensions": {"F": 1}}),
        ]),
        ("mbti-28", "Haftalık rutininiz?", [
            ("Benzer saatlerde uyanır, planlı ilerlerim", {"dimensions": {"J": 1}}),
            ("İş günleri düzenli, hafta sonu esnek", {"dimensions": {"J": 0.5}}),
            ("Güne göre değişir; monotonluktan kaçınırım", {"dimensions": {"P": 0.5}}),
            ("Rutin beni boğar; çeşitlilik isterim", {"dimensions": {"P": 1}}),
        ]),
    ]
    return [q4(a, b, c) for a, b, c in rows]


def enne_opt(text, weights):
    return (text, {"enneagram": {str(k): v for k, v in weights.items()}})


def build_enneagram():
    # (id, stem, [a,b,c,d] as enne_opt tuples)
    blocks = [
        ("e-1", "Önemli bir sunum öncesi içinizde en baskın duygu hangisine yakın?", [
            enne_opt("Hata yapmamak ve doğruyu söylemek", {1: 3, 6: 1}),
            enne_opt("Herkesin beni beğenmesi ve yardımcı olmak", {2: 3, 9: 1}),
            enne_opt("Etkileyici görünmek ve başarılı sayılmak", {3: 3, 8: 1}),
            enne_opt("Kendimi özgün ve farklı hissettirmek", {4: 3, 5: 1}),
        ]),
        ("e-2", "Beklenmedik bir çatışma ortamında ilk içgüdünüz?", [
            enne_opt("Ortamı yumuşatıp uzlaşma aramak", {9: 3, 2: 1}),
            enne_opt("Sınır koymak ve kontrolü ele almak", {8: 3, 1: 1}),
            enne_opt("Geriye çekilip analiz etmek", {5: 3, 6: 1}),
            enne_opt("Riskleri ve senaryoları zihinde canlandırmak", {6: 3, 7: 1}),
        ]),
        ("e-3", "Boş bir hafta sonu sabahı sizi en çok ne doldurur?", [
            enne_opt("Yeni mekânlar ve planlar", {7: 3, 3: 1}),
            enne_opt("Yalnızlık, okuma veya derin düşünce", {5: 3, 4: 1}),
            enne_opt("Yakınlarla vakit ve paylaşım", {2: 3, 7: 1}),
            enne_opt("Hedefe yönelik proje veya spor", {3: 3, 1: 1}),
        ]),
        ("e-4", "Haksızlığa uğradığınızı hissettiğinizde?", [
            enne_opt("İçe kapanır, yoğun duygular yaşarım", {4: 3, 6: 1}),
            enne_opt("Karşı çıkar, gücümü gösteririm", {8: 3, 6: 1}),
            enne_opt("Ne yapılması gerektiğini düşünür, düzeltmeye çalışırım", {1: 3, 3: 1}),
            enne_opt("Konuyu hafifletmek veya kaçınmak", {7: 3, 9: 1}),
        ]),
        ("e-5", "Bilgi edinirken size en doğal gelen yol?", [
            enne_opt("Derinlemesine okuyup sonra paylaşmak", {5: 4, 1: 1}),
            enne_opt("Hemen pratiğe dökmek", {3: 3, 8: 1}),
            enne_opt("İnsanlarla konuşup tartışmak", {7: 3, 2: 1}),
            enne_opt("Sezgi ve kişisel anlam bağları", {4: 3, 9: 1}),
        ]),
        ("e-6", "Güvende hissetmek için size en çok ne gerekir?", [
            enne_opt("Net kurallar ve güvenilir insanlar", {6: 4, 1: 1}),
            enne_opt("Seçenekler ve özgürlük", {7: 3, 8: 1}),
            enne_opt("Destekleyici ilişkiler", {2: 3, 9: 1}),
            enne_opt("Bağımsızlık ve mesafe", {5: 3, 8: 1}),
        ]),
        ("e-7", "Planlar suya düştüğünde?", [
            enne_opt("Alternatif planlar üretirim", {7: 4, 3: 1}),
            enne_opt("Moralim bozulur, içe dönerim", {4: 3, 5: 1}),
            enne_opt("Disiplin ve kontrolü artırırım", {1: 3, 8: 1}),
            enne_opt("Uykuya veya rutine sığınırım", {9: 3, 5: 1}),
        ]),
        ("e-8", "Grup lideri olsanız tarzınız?", [
            enne_opt("Doğrudan, kararlı ve sonuç odaklı", {8: 4, 3: 1}),
            enne_opt("İkna ve iş birliği ile ilerletirim", {2: 3, 9: 1}),
            enne_opt("İlham ve enerji veririm", {7: 3, 4: 1}),
            enne_opt("Strateji ve risk analizi", {5: 3, 6: 1}),
        ]),
        ("e-9", "İç huzur için ne şart?", [
            enne_opt("Çatışma minimum, ortam uyumlu", {9: 4, 2: 1}),
            enne_opt("Net hedef ve ilerleme görmek", {3: 3, 1: 1}),
            enne_opt("Kendimi özgün ifade etmek", {4: 3, 8: 1}),
            enne_opt("Merakımı besleyen yeni şeyler", {7: 3, 5: 1}),
        ]),
        ("e-10", "Yeni bir işe başladığınızda sizi en çok ne endişelendirir?", [
            enne_opt("Standartlara uyamamak", {1: 3, 6: 1}),
            enne_opt("Takım tarafından sevilmemek", {2: 3, 9: 1}),
            enne_opt("Görünür başarı gösterememek", {3: 3, 8: 1}),
            enne_opt("Sıradan veya anlamsız hissetmek", {4: 3, 5: 1}),
        ]),
        ("e-11", "Biri size yardım ettiğinde içten içe?", [
            enne_opt("Karşılık vermeliyim hissederim", {2: 3, 1: 1}),
            enne_opt("Minnettarım ama bağımlı hissetmek istemem", {5: 3, 8: 1}),
            enne_opt("Mutlu olur, paylaşmayı severim", {7: 3, 9: 1}),
            enne_opt("Bazen yükümlülük gibi gelir", {6: 3, 4: 1}),
        ]),
        ("e-12", "Yoğun stres altında bedeniniz?", [
            enne_opt("Gerginlik ve titizlik artar", {1: 3, 6: 1}),
            enne_opt("Başkalarına daha fazla yüklenirim", {2: 3, 8: 1}),
            enne_opt("Daha da hızlanır, çok iş yaparım", {3: 3, 7: 1}),
            enne_opt("Çekilip yalnız kalmak isterim", {5: 3, 4: 1}),
        ]),
        ("e-13", "Övgü aldığınızda?", [
            enne_opt("Daha da doğru ve faydalı olmalıyım", {1: 3, 3: 1}),
            enne_opt("Utanırım ama mutlu olurum", {2: 3, 9: 1}),
            enne_opt("Motivasyonum artar, devam ederim", {3: 3, 7: 1}),
            enne_opt("Kimse beni tam anlamıyor hissederim", {4: 3, 5: 1}),
        ]),
        ("e-14", "Kurallar esnetildiğinde?", [
            enne_opt("Rahatlarım, esneklik iyidir", {7: 3, 9: 1}),
            enne_opt("Kaygılanırım, sınırlar belirsizleşir", {6: 3, 1: 1}),
            enne_opt("Fırsat görür, avantaj kullanırım", {8: 3, 3: 1}),
            enne_opt("Kendi iç kurallarıma dönerim", {5: 3, 4: 1}),
        ]),
        ("e-15", "İdeal yaşam temposu?", [
            enne_opt("Dengeli ve sakin", {9: 3, 5: 1}),
            enne_opt("Yoğun ve başarılı", {3: 3, 8: 1}),
            enne_opt("Değişken ve heyecanlı", {7: 3, 4: 1}),
            enne_opt("Anlamlı ve derin", {4: 3, 1: 1}),
        ]),
        ("e-16", "Başkasının hatasını fark ettiğinizde?", [
            enne_opt("Düzeltmesi için söylerim", {1: 3, 8: 1}),
            enne_opt("Yaralar mı diye tereddüt ederim", {2: 3, 9: 1}),
            enne_opt("Verimlilik için net geri bildirim veririm", {3: 3, 8: 1}),
            enne_opt("Genelde müdahale etmem, gözlemlerim", {5: 3, 9: 1}),
        ]),
        ("e-17", "Yalnız kaldığınız uzun süre sonra?", [
            enne_opt("Enerjim düşer, insan özlerim", {2: 3, 7: 1}),
            enne_opt("Rahatlarım, odaklanırım", {5: 4, 9: 1}),
            enne_opt("Sıkılırım, aktivite ararım", {7: 3, 3: 1}),
            enne_opt("Duygularım yoğunlaşır", {4: 3, 6: 1}),
        ]),
        ("e-18", "Başarı tanımınız?", [
            enne_opt("Doğru ve vicdanlı olmak", {1: 3, 6: 1}),
            enne_opt("Sevilmek ve faydalı olmak", {2: 3, 9: 1}),
            enne_opt("Hedeflere ulaşmak ve tanınmak", {3: 3, 8: 1}),
            enne_opt("Kendim olmak ve derinlik", {4: 3, 5: 1}),
        ]),
        ("e-19", "Kontrol kaybı hissi?", [
            enne_opt("Panik veya kontrol arttırma", {6: 3, 1: 1}),
            enne_opt("Öfke veya meydan okuma", {8: 3, 4: 1}),
            enne_opt("Kaçış veya şaka ile hafifletme", {7: 3, 9: 1}),
            enne_opt("Donup içe çekilme", {5: 3, 9: 1}),
        ]),
        ("e-20", "İlişkilerde sınır koymak?", [
            enne_opt("Zorlanırım, uyum önemlidir", {9: 3, 2: 1}),
            enne_opt("Net ve hızlı koyarım", {8: 3, 1: 1}),
            enne_opt("Duruma göre esnek kalırım", {7: 3, 3: 1}),
            enne_opt("İçten içe mesafe koyarım", {5: 3, 4: 1}),
        ]),
        ("e-21", "Hayır demek?", [
            enne_opt("Suçluluk hissederim", {2: 3, 9: 1}),
            enne_opt("Gerekirse kesin hayır derim", {8: 3, 1: 1}),
            enne_opt("Yumuşak bahanelerle reddederim", {9: 3, 6: 1}),
            enne_opt("Nadiren; önceliklerime göre seçerim", {5: 3, 3: 1}),
        ]),
        ("e-22", "Rekabet ortamında?", [
            enne_opt("Kazanmak için zorlarım kendimi", {3: 3, 8: 1}),
            enne_opt("Rekabetten hoşlanmam", {9: 3, 2: 1}),
            enne_opt("Eğlenceli bulurum", {7: 3, 8: 1}),
            enne_opt("Gözlemleyip strateji kurarım", {5: 3, 6: 1}),
        ]),
        ("e-23", "Kendinizi ifade biçiminiz?", [
            enne_opt("Düzenli ve net", {1: 3, 3: 1}),
            enne_opt("Sıcak ve ilgili", {2: 3, 7: 1}),
            enne_opt("Özgün ve yaratıcı", {4: 3, 7: 1}),
            enne_opt("Ölçülü ve seçici", {5: 3, 6: 1}),
        ]),
        ("e-24", "Yaşam amacı sorusu düşündüğünüzde?", [
            enne_opt("Doğru yaşamak", {1: 3, 6: 1}),
            enne_opt("Sevgiyle bağ kurmak", {2: 3, 9: 1}),
            enne_opt("Potansiyelimi gerçekleştirmek", {3: 3, 8: 1}),
            enne_opt("Anlam ve özgünlük bulmak", {4: 3, 5: 1}),
        ]),
    ]
    out = []
    for eid, stem, opts in blocks:
        out.append(q4(eid, stem, opts))
    return out


def ho(t, h):
    return (t, {"holland": h})


def build_holland():
    rows = [
        ("h-1", "Aşağıdaki aktivitelerden hangisi size en çok çekici gelir?", [
            ho("Motor, elektronik veya ahşap üzerinde çalışmak", {"R": 3}),
            ho("Veri toplayıp hipotez test etmek", {"I": 3}),
            ho("Tasarım, müzik veya sahne üzerinde çalışmak", {"A": 3}),
            ho("Birine rehberlik veya koçluk yapmak", {"S": 3}),
        ]),
        ("h-2", "Üniversite bölümü seçseniz hangi alan daha yakın?", [
            ho("Mühendislik, mimarlık (uygulamalı)", {"R": 2, "I": 1}),
            ho("Matematik, fizik, bilgisayar bilimleri", {"I": 3}),
            ho("Güzel sanatlar, iletişim tasarımı", {"A": 3}),
            ho("Psikoloji, sosyal hizmet, öğretmenlik", {"S": 3}),
        ]),
        ("h-3", "İlk iş gününüzde en keyif alacağınız görev?", [
            ho("Sunum yapıp fikir satmak", {"E": 3}),
            ho("Tablo ve rapor düzenlemek", {"C": 3}),
            ho("Teknik kurulum veya saha kontrolü", {"R": 3}),
            ho("Literatür taraması ve analiz", {"I": 3}),
        ]),
        ("h-4", "Takıldığınızda tercih ettiğiniz yaklaşım?", [
            ho("Kontrol listesi ve prosedür", {"C": 3}),
            ho("Beyin fırtınası ve paydaş toplantısı", {"E": 3}),
            ho("Uzmanla birebir derinlemesine görüşme", {"I": 2, "S": 1}),
            ho("Eskiz, prototip veya mock-up", {"A": 3}),
        ]),
        ("h-5", "İdeal çalışma mekânı?", [
            ho("Atölye, üretim hattı veya laboratuvar", {"R": 2, "I": 1}),
            ho("Sessiz araştırma odası veya kütüphane", {"I": 3}),
            ho("Stüdyo veya yaratıcı açık alan", {"A": 3}),
            ho("Danışma odası veya eğitim sınıfı", {"S": 3}),
        ]),
        ("h-6", "Gönüllü olsanız hangi rol?", [
            ho("Etkinlik koordinatörü ve sponsor bulucu", {"E": 3}),
            ho("Kayıt, bütçe ve lojistik", {"C": 3}),
            ho("Çocuklar veya yaşlılarla doğrudan vakit", {"S": 3}),
            ho("Fiziksel altyapı veya tamir işleri", {"R": 3}),
        ]),
        ("h-7", "Takdir edilmek istediğiniz alan?", [
            ho("Yenilikçi ve estetik çözüm", {"A": 2, "I": 1}),
            ho("Hatasız ve zamanında teslim", {"C": 3}),
            ho("Hedef aşma ve ikna", {"E": 3}),
            ho("Ekip içi destek ve güven", {"S": 3}),
        ]),
        ("h-8", "Stresli bir gün sonrası?", [
            ho("Spor, yürüyüş veya el işi", {"R": 3}),
            ho("Belgesel veya uzun okuma", {"I": 3}),
            ho("Resim, yazı veya enstrüman", {"A": 3}),
            ho("Yakın biriyle sohbet", {"S": 3}),
        ]),
        ("h-9", "10 yıllık kariyer vizyonunuz?", [
            ho("Kendi işinizi yürütmek ve büyütmek", {"E": 3}),
            ho("Kurumsal uzman veya analist olmak", {"C": 2, "I": 1}),
            ho("Topluma dokunan meslek", {"S": 3}),
            ho("Üretim veya teknik liderlik", {"R": 2, "I": 1}),
        ]),
        ("h-10", "Takım projesinde hangi rol?", [
            ho("Sunum ve müşteri/stakeholder iletişimi", {"E": 3}),
            ho("Kalite, dokümantasyon ve standartlar", {"C": 3}),
            ho("Fikir ve konsept geliştirme", {"A": 2, "I": 1}),
            ho("Ekip uyumu ve bire bir destek", {"S": 3}),
        ]),
        ("h-11", "Yeni beceri öğrenirken?", [
            ho("Uygulama ve demo ile", {"R": 3}),
            ho("Teori ve model ile", {"I": 3}),
            ho("Hikâye ve tasarım örneği ile", {"A": 3}),
            ho("Grup çalışması ve tartışma ile", {"S": 2, "E": 1}),
        ]),
        ("h-12", "İş ilanında sizi en çok heyecanlandıran ifade?", [
            ho("‘Pazar payını büyüt’", {"E": 3}),
            ho("‘Veri odaklı karar’", {"I": 3}),
            ho("‘Kullanıcı deneyimi ve yaratıcılık’", {"A": 3}),
            ho("‘Ekip refahı ve gelişim’", {"S": 3}),
        ]),
        ("h-13", "Haftalık toplantılarda?", [
            ho("Gündemi yönetmek ve karar aldırmak", {"E": 3}),
            ho("Tutanak ve aksiyon takibi", {"C": 3}),
            ho("Teknik/veri sunumu hazırlamak", {"I": 3}),
            ho("Katılımı ve fikir eşitliğini sağlamak", {"S": 3}),
        ]),
        ("h-14", "Bütçe kısıtı olduğunda?", [
            ho("Önceliklendirip kesin rakamlarla raporlarım", {"C": 3}),
            ho("Yeni gelir kanalı veya sponsor ararım", {"E": 3}),
            ho("Maliyet-fayda analizi yaparım", {"I": 3}),
            ho("İnsanların yükünü hafifletmek için esnek çözüm", {"S": 3}),
        ]),
        ("h-15", "Serbest proje seçseniz?", [
            ho("Bir makine veya yazılım prototipi", {"R": 2, "I": 1}),
            ho("Bilimsel makale veya deney", {"I": 3}),
            ho("Kısa film veya marka kimliği", {"A": 3}),
            ho("Mentorluk programı tasarımı", {"S": 3}),
        ]),
        ("h-16", "Ofis dışı gün (saha)?", [
            ho("Müşteri ziyareti ve sunum", {"E": 3}),
            ho("Saha ölçümü ve teknik kontrol", {"R": 3}),
            ho("Kullanıcı görüşmesi ve gözlem", {"S": 2, "I": 1}),
            ho("Etkinlik fotoğrafı ve içerik üretimi", {"A": 3}),
        ]),
        ("h-17", "Kariyer danışmanına ilk sorunuz?", [
            ho("Hangi alanda en çok iş var?", {"E": 2, "C": 1}),
            ho("Hangi meslekler analitik güç gerektirir?", {"I": 3}),
            ho("Yaratıcılığımı nasıl paraya çeviririm?", {"A": 3}),
            ho("İnsanlara faydalı olabileceğim alanlar?", {"S": 3}),
        ]),
        ("h-18", "İş değiştirirken?", [
            ho("Daha iyi ücret ve unvan", {"E": 2, "C": 1}),
            ho("Araştırma ve AR-GE fırsatı", {"I": 3}),
            ho("Sanat veya içerik odaklı rol", {"A": 3}),
            ho("Anlamlı ve yardım odaklı rol", {"S": 3}),
        ]),
        ("h-19", "Çalışma aracı seçimi?", [
            ho("Güçlü donanım ve keskin aletler", {"R": 3}),
            ho("Analiz yazılımı ve veri setleri", {"I": 3}),
            ho("Tasarım suite’i ve tablet", {"A": 3}),
            ho("İletişim ve CRM araçları", {"S": 2, "E": 1}),
        ]),
        ("h-20", "İdeal takım büyüklüğü?", [
            ho("Küçük ve çevik; herkes çok iş yapsın", {"E": 2, "R": 1}),
            ho("Net hiyerarşi ve raporlama hatları olan orta ekip", {"C": 3}),
            ho("Uzmanların derinlemesine çalıştığı proje ekibi", {"I": 3}),
            ho("Yakın ilişkilerin olduğu destekleyici ekip", {"S": 3}),
        ]),
        ("h-21", "Motivasyonunuz düştüğünde?", [
            ho("Hedefleri ve KPI’ları yeniden yazarım", {"C": 2, "E": 1}),
            ho("Yeni veri ve örnek olay okurum", {"I": 3}),
            ho("Yaratıcı bir yan proje başlatırım", {"A": 3}),
            ho("Bir meslektaşla konuşur, destek istem", {"S": 3}),
        ]),
        ("h-22", "İş güvenliği ve prosedür?", [
            ho("Kurala harfiyen uymak önemli", {"C": 2, "R": 1}),
            ho("Riskleri sayısallaştırıp optimize ederim", {"I": 3}),
            ho("Esnek ama güvenli çözümler üretirim", {"A": 2, "E": 1}),
            ho("Ekibin endişelerini dinleyip uyarlama yaparım", {"S": 3}),
        ]),
        ("h-23", "Kıdemli bir role hazırlık?", [
            ho("P&L ve strateji sunumları", {"E": 3}),
            ho("Metodoloji ve kalite sistemleri", {"C": 3}),
            ho("Teknik derinlik ve yayın", {"I": 3}),
            ho("Koçluk ve gelişim programları", {"S": 3}),
        ]),
        ("h-24", "‘Başarılı bir gün’ sizin için?", [
            ho("Önemli anlaşmalar ve görünürlük", {"E": 3}),
            ho("Tüm işler listeden silindi", {"C": 3}),
            ho("Zor bir problemi çözdüm", {"I": 3}),
            ho("Birine gerçekten yardım ettim", {"S": 3}),
        ]),
    ]
    return [q4(a, b, c) for a, b, c in rows]


def vk(t, v):
    return (t, {"vark": v})


def build_vark():
    rows = [
        ("vk-1", "Karmaşık bir konuyu ilk kez öğrenirken ne işe yarar?", [
            vk("Şema, infografik ve renkli özetler", {"V": 3}),
            vk("Ders anlatımı veya podcast", {"A": 3}),
            vk("Makale ve madde madde notlar", {"R": 3}),
            vk("Deney, simülasyon veya maket", {"K": 3}),
        ]),
        ("vk-2", "Sunum hazırlarken ilk adımınız?", [
            vk("Slayt görselleri ve yerleşim", {"V": 3}),
            vk("Ses kaydı ile prova", {"A": 3}),
            vk("Metin iskeleti ve kaynakça", {"R": 3}),
            vk("Canlı demo veya örnek ürün", {"K": 3}),
        ]),
        ("vk-3", "Yönerge almak istediğiniz format?", [
            vk("Video veya resimli kılavuz", {"V": 3}),
            vk("Sözlü anlatım ve soru-cevap", {"A": 3}),
            vk("PDF veya yazılı talimat", {"R": 3}),
            vk("Yan yana yaparak öğrenme", {"K": 3}),
        ]),
        ("vk-4", "Sınavda bilgiyi nasıl hatırlarsınız?", [
            vk("Sayfa düzeni ve diyagramlar", {"V": 3}),
            vk("Öğretmenin tonlaması ve vurguları", {"A": 3}),
            vk("Okuduğum cümleler", {"R": 3}),
            vk("Çözdüğüm problemler ve pratikler", {"K": 3}),
        ]),
        ("vk-5", "Boş zamanınızda?", [
            vk("Görsel sanatlar, film, tasarım", {"V": 3}),
            vk("Müzik, podcast, konser", {"A": 3}),
            vk("Okuma ve yazma", {"R": 3}),
            vk("Spor, dans, el sanatı", {"K": 3}),
        ]),
        ("vk-6", "Toplantıda verim için?", [
            vk("Slaytlar ve beyaz tahta çizimi", {"V": 3}),
            vk("Tartışma ve fikir alışverişi", {"A": 3}),
            vk("Özet doküman ve tutanak", {"R": 3}),
            vk("Breakout aktivite veya prototip", {"K": 3}),
        ]),
        ("vk-7", "Yeni bir yeri bulmak?", [
            vk("Harita veya ekran görüntüsü", {"V": 3}),
            vk("Sesli navigasyon ve tarif", {"A": 3}),
            vk("Yazılı adres ve yön notları", {"R": 3}),
            vk("Bir kez birlikte gidip öğrenmek", {"K": 3}),
        ]),
        ("vk-8", "Öğrendiğinizi pekiştirmek?", [
            vk("Zihinde görselleştirme", {"V": 3}),
            vk("Birine anlatmak", {"A": 3}),
            vk("Özet yazmak", {"R": 3}),
            vk("Tekrar uygulamak", {"K": 3}),
        ]),
        ("vk-9", "Uzun metin okurken?", [
            vk("Başlıkları ve görselleri tararım", {"V": 3}),
            vk("Sesli okumak veya dinlemek isterim", {"A": 3}),
            vk("Altını çizer, kenara not alırım", {"R": 3}),
            vk("Ara ara kalkıp hareket ederim", {"K": 3}),
        ]),
        ("vk-10", "Yeni yazılım öğrenirken?", [
            vk("Arayüzü keşfedip ikonlara tıklarım", {"V": 3}),
            vk("Eğitmen videosu veya canlı webinar", {"A": 3}),
            vk("Resmi dokümantasyon okurum", {"R": 3}),
            vk("Örnek proje üzerinde denerim", {"K": 3}),
        ]),
        ("vk-11", "Grup çalışmasında?", [
            vk("Poster veya slayt hazırlamak", {"V": 3}),
            vk("Sunuş ve moderasyon", {"A": 3}),
            vk("Rapor yazımı ve kaynakça", {"R": 3}),
            vk("Deney veya saha çalışması", {"K": 3}),
        ]),
        ("vk-12", "Talimatları unuttuğunuzda?", [
            vk("Ekran görüntüsü veya video tekrar", {"V": 3}),
            vk("Arayıp sorarım", {"A": 3}),
            vk("Mesajdaki yazılı listeye bakarım", {"R": 3}),
            vk("Tekrar deneme-yanılma yaparım", {"K": 3}),
        ]),
        ("vk-13", "Motivasyonunuz düştüğünde öğrenmek için?", [
            vk("İlham veren görseller ve moodboard", {"V": 3}),
            vk("Motivasyon konuşması veya sohbet", {"A": 3}),
            vk("Kısa makale ve alıntılar", {"R": 3}),
            vk("Kısa egzersiz veya oyun", {"K": 3}),
        ]),
        ("vk-14", "Bir süreç öğrenirken (ör. yemek tarifi)?", [
            vk("Fotoğraflı adımlar", {"V": 3}),
            vk("Video izleyerek", {"A": 3}),
            vk("Tarifi okuyarak", {"R": 3}),
            vk("Yan yana yaparak", {"K": 3}),
        ]),
        ("vk-15", "Ofiste yeni düzen duyurusu?", [
            vk("Kat planı ve görsel rehber", {"V": 3}),
            vk("Toplantıda açıklama", {"A": 3}),
            vk("E-posta metni", {"R": 3}),
            vk("Yerinde gezdirme", {"K": 3}),
        ]),
        ("vk-16", "Sunumdan sonra hatırladığınız?", [
            vk("Grafikler ve renkler", {"V": 3}),
            vk("Konuşulan ana fikirler", {"A": 3}),
            vk("Dağıtılan dokümandaki maddeler", {"R": 3}),
            vk("Yaptığınız aktivite veya örnek", {"K": 3}),
        ]),
    ]
    return [q4(a, b, c) for a, b, c in rows]


def val(t, k):
    return (t, {"valueKey": k})


def build_values():
    rows = [
        ("v-1", "İş seçerken en yüksek önceliğiniz?", [
            val("Ücret, statü ve kariyer basamakları", "achievement"),
            val("İşin topluma veya misyona katkısı", "purpose"),
            val("Esnek çalışma ve kendi yöntemim", "autonomy"),
            val("İş güvencesi ve öngörülebilirlik", "security"),
        ]),
        ("v-2", "Başarıyı nasıl tanımlarsınız?", [
            val("Tanınmak ve ödüllendirilmek", "recognition"),
            val("Sürekli yeni şeyler öğrenmek", "growth"),
            val("Başkalarına somut fayda sağlamak", "service"),
            val("İş-yaşam dengesi ve huzur", "balance"),
        ]),
        ("v-3", "Risk alma konusunda?", [
            val("Büyük risk büyük kazanç", "adventure"),
            val("Hesaplı ve veriye dayalı risk", "achievement"),
            val("Mümkün olduğunca risksiz ilerlemek", "security"),
            val("Yaratıcı ve alışılmadık denemeler", "creativity"),
        ]),
        ("v-4", "İdeal çalışma ortamı?", [
            val("Rekabetçi ve hızlı tempolu", "achievement"),
            val("İş birlikçi ve sıcak", "community"),
            val("Sessiz ve bağımsız", "autonomy"),
            val("Çeşitli görevler ve değişen günler", "variety"),
        ]),
        ("v-5", "Motivasyonunuz düştüğünde?", [
            val("Daha büyük hedef koyarım", "achievement"),
            val("Neden yaptığımı hatırlarım", "purpose"),
            val("İnsanlarla konuşur, bağ kurarım", "community"),
            val("Yeni ilham kaynağı ararım", "creativity"),
        ]),
        ("v-6", "Liderden beklentiniz?", [
            val("Net talimat ve adil kurallar", "security"),
            val("Vizyon ve anlam", "purpose"),
            val("Güven ve destek", "service"),
            val("Özerklik tanınması", "autonomy"),
        ]),
        ("v-7", "Para harcarken?", [
            val("Deneyim ve seyahat", "adventure"),
            val("Eğitim ve gelişim", "growth"),
            val("Aile ve topluluk", "community"),
            val("Tasarruf ve gelecek güvencesi", "security"),
        ]),
        ("v-8", "Hayatta vazgeçilmeziniz?", [
            val("Bağımsız karar almak", "autonomy"),
            val("Yaratıcı üretmek", "creativity"),
            val("Aidiyet ve bağlılık", "community"),
            val("Başarı hissi ve takdir", "recognition"),
        ]),
        ("v-9", "Değişime bakışınız?", [
            val("Heyecan verici fırsat", "adventure"),
            val("Öğrenme ve gelişim kapısı", "growth"),
            val("Dikkatli ve kontrollü uyum", "security"),
            val("Anlam ve yön sorgulaması", "purpose"),
        ]),
        ("v-10", "10 yıl sonrası vizyon?", [
            val("Sektörde tanınan isim olmak", "recognition"),
            val("Dengeli ve sağlıklı yaşam", "balance"),
            val("Toplumsal etki yaratmak", "service"),
            val("Sürekli öğrenen biri olmak", "growth"),
        ]),
        ("v-11", "Mesai saatleri tercihi?", [
            val("Esnek ve sonuç odaklı", "autonomy"),
            val("Net çizgi; iş bittiğinde kapıyı kapatmak", "balance"),
            val("Yoğun dönemlerde fazla mesai kabul", "achievement"),
            val("Güne göre değişen dinamik tempo", "variety"),
        ]),
        ("v-12", "Terfi teklifi iki şehir arasında?", [
            val("Kariyer fırsatı önde gelir", "achievement"),
            val("Aile ve ilişkiler önce gelir", "community"),
            val("Yaşam kalitesi ve güvenlik", "security"),
            val("Yeni şehir macerası çekici", "adventure"),
        ]),
        ("v-13", "Geri bildirim almak?", [
            val("Doğrudan ve ölçülebilir olsun", "achievement"),
            val("Yapıcı ve gelişim odaklı olsun", "growth"),
            val("İnsani ve saygılı olsun", "service"),
            val("Özgün ve dürüst olsun", "creativity"),
        ]),
        ("v-14", "İş arkadaşlarıyla ilişki?", [
            val("Profesyonel mesafe", "autonomy"),
            val("Yakın dostluklar", "community"),
            val("İş birliği ve yardımlaşma", "service"),
            val("Çeşitli tiplerle tanışmak", "variety"),
        ]),
        ("v-15", "Hayır demek?", [
            val("Kariyer hedefime tersse kolayca derim", "achievement"),
            val("İnsanları kırmaktan çekinirim", "service"),
            val("Önceliklerime göre seçerim", "autonomy"),
            val("Rutin bozulursa zorlanırım", "security"),
        ]),
        ("v-16", "Öğrenme biçiminiz?", [
            val("Sertifika ve unvan kazanmak", "recognition"),
            val("Merak ettiğim her şey", "adventure"),
            val("Derin uzmanlık", "growth"),
            val("Farklı alanlara dokunmak", "variety"),
        ]),
        ("v-17", "Başarısızlık?", [
            val("Bir sonraki denemede daha iyisini yaparım", "achievement"),
            val("Anlamını ve dersini ararım", "purpose"),
            val("Destek alır, paylaşırım", "community"),
            val("Kendime zaman tanırım", "balance"),
        ]),
        ("v-18", "Kurallar ve yenilik?", [
            val("Kurallar güven verir", "security"),
            val("Kuralları yaratıcı esnetmek gerekir", "creativity"),
            val("Kurallar adil olmalı", "service"),
            val("Kurallar verimliliği artırmalı", "achievement"),
        ]),
        ("v-19", "İdeal tatil?", [
            val("Planlı tur ve rezervasyonlar", "security"),
            val("Macera ve doğa", "adventure"),
            val("Yakınlarla birlikte", "community"),
            val("Yalnız kitap ve sessizlik", "balance"),
        ]),
        ("v-20", "Hayatınızın anlamı sorusu?", [
            val("Potansiyelimi gerçekleştirmek", "achievement"),
            val("Başkalarına fayda sağlamak", "service"),
            val("Özgür ve otantik olmak", "autonomy"),
            val("Denge ve iç huzur", "balance"),
        ]),
    ]
    return [q4(a, b, c) for a, b, c in rows]


def st(t, s):
    return (t, {"strengthKey": s})


def build_strengths():
    rows = [
        ("s-1", "Güçlü olduğunuzu düşündüğünüz alan?", [
            st("İnsanları motive ve ikna etmek", "communication"),
            st("Veriden anlam ve örüntü çıkarmak", "analytical"),
            st("Orijinal fikir ve çözüm üretmek", "creative"),
            st("Plan yapıp sonuçlandırmak", "execution"),
        ]),
        ("s-2", "Takımda sizi öne çıkaran?", [
            st("Empati ve aktif dinleme", "empathy"),
            st("Uzun vadeli strateji kurma", "strategic"),
            st("Hızlı öğrenme ve adapte olma", "learning"),
            st("Detay ve titizlik", "discipline"),
        ]),
        ("s-3", "Zorlu görevde?", [
            st("Sakin kalıp çözüm yolu bulmak", "adaptability"),
            st("Net liderlik ve karar", "leadership"),
            st("İş birliği ve köprü kurma", "relationship"),
            st("Derin odak ve konsantrasyon", "focus"),
        ]),
        ("s-4", "Övgü aldığınızda genelde?", [
            st("Yaratıcı çözüm için", "creative"),
            st("Zamanında ve eksiksiz teslim için", "execution"),
            st("İletişim ve sunum için", "communication"),
            st("Analiz kalitesi için", "analytical"),
        ]),
        ("s-5", "Stres altında güçlenen yanınız?", [
            st("Düzen ve önceliklendirme", "discipline"),
            st("Alternatif yollar üretmek", "creative"),
            st("Destek istemek veya vermek", "empathy"),
            st("Büyük resmi görmek", "strategic"),
        ]),
        ("s-6", "Öğrenme hızınız?", [
            st("Kendi kendime hızlı", "learning"),
            st("Grup ve tartışmayla", "relationship"),
            st("Uygulayarak", "adaptability"),
            st("Sistematik adımlarla", "analytical"),
        ]),
        ("s-7", "İkna kabiliyetiniz?", [
            st("Hikâye ve örneklerle", "communication"),
            st("Veri ve mantıkla", "analytical"),
            st("Güven ve ilişkiyle", "relationship"),
            st("Net hedef ve vizyonla", "leadership"),
        ]),
        ("s-8", "Gündelik rutinde?", [
            st("Listeler ve takip", "discipline"),
            st("Esnek akış", "adaptability"),
            st("Önceliklendirme", "strategic"),
            st("Derin çalışma blokları", "focus"),
        ]),
        ("s-9", "Başkalarına ilham?", [
            st("Vizyon çizmek", "leadership"),
            st("Pratik örnek vermek", "execution"),
            st("Dinleyip güçlendirmek", "empathy"),
            st("Yeni bakış açısı sunmak", "creative"),
        ]),
        ("s-10", "Hata yaptığınızda?", [
            st("Kök neden analizi", "analytical"),
            st("Hızlı düzeltme planı", "execution"),
            st("Ekip ile paylaşmak", "relationship"),
            st("Ders çıkarıp ilerlemek", "learning"),
        ]),
        ("s-11", "İnovasyon sürecinde?", [
            st("Kullanıcı ihtiyacı", "empathy"),
            st("Teknoloji ve trend", "learning"),
            st("Süreç iyileştirme", "discipline"),
            st("Cesur deney", "creative"),
        ]),
        ("s-12", "Kendinizi bir kelimeyle?", [
            st("Odaklı", "focus"),
            st("Stratejist", "strategic"),
            st("Etkileyici", "communication"),
            st("Uyumlu", "adaptability"),
        ]),
        ("s-13", "Çoklu görevde?", [
            st("Paralel ilerletirim", "adaptability"),
            st("Tek seferde bir iş, derinlemesine", "focus"),
            st("Öncelik matrisi kurarım", "strategic"),
            st("Ekiple bölüşürüm", "relationship"),
        ]),
        ("s-14", "Belirsizlikte?", [
            st("Veri toplarım", "analytical"),
            st("İçgüdüme güvenirim", "creative"),
            st("Danışırım", "relationship"),
            st("Küçük adımlarla denerim", "execution"),
        ]),
        ("s-15", "Toplantı sonrası?", [
            st("Özet ve aksiyonları yazarım", "execution"),
            st("İnsanların nabzını kontrol ederim", "empathy"),
            st("Stratejik sonuçları düşünürüm", "strategic"),
            st("Sunum slaytlarını iyileştiririm", "creative"),
        ]),
        ("s-16", "Geri bildirim verirken?", [
            st("Net ve ölçülebilir", "analytical"),
            st("Yapıcı ve motive edici", "communication"),
            st("İlişkiyi koruyarak", "relationship"),
            st("Standartlara referansla", "discipline"),
        ]),
        ("s-17", "Yeni rolde ilk 30 gün?", [
            st("İnsanları ve dinamikleri gözlemlerim", "empathy"),
            st("Hedefleri ve metrikleri öğrenirim", "strategic"),
            st("Hızlıca teslimat yaparım", "execution"),
            st("Sistem ve dokümantasyon okurum", "analytical"),
        ]),
        ("s-18", "Çatışma çözümünde?", [
            st("Ortak zemin ararım", "relationship"),
            st("İlke ve kuralları hatırlatırım", "discipline"),
            st("Uzlaşmacı çözüm üretirim", "creative"),
            st("Net karar gerekiyorsa alırım", "leadership"),
        ]),
        ("s-19", "Uzun süreli projede?", [
            st("Disiplinli tempo korurum", "discipline"),
            st("Motivasyonu canlı tutarım", "communication"),
            st("Yön değişimlerine uyarım", "adaptability"),
            st("Derin iş blokları planlarım", "focus"),
        ]),
        ("s-20", "Veri ile hikâye çeliştiğinde?", [
            st("Veriye güvenirim", "analytical"),
            st("İnsan hikâyesini anlarım", "empathy"),
            st("Her ikisini birleştiren model kurarım", "strategic"),
            st("Yeni veri toplamayı öneririm", "learning"),
        ]),
        ("s-21", "Sunum stiliniz?", [
            st("Görsel ve akıcı", "creative"),
            st("Mantık zinciri ve rakamlar", "analytical"),
            st("Etkileşim ve sorular", "communication"),
            st("Kısa ve net sonuç", "execution"),
        ]),
        ("s-22", "Öncelik çakışması?", [
            st("Etki analizi yaparım", "strategic"),
            st("Stakeholder ile konuşurum", "relationship"),
            st("Acil olanı seçerim", "execution"),
            st("Kriter listesiyle karşılaştırırım", "analytical"),
        ]),
        ("s-23", "Öğrendiğiniz beceriyi öğretirken?", [
            st("Adım adım gösteririm", "execution"),
            st("Büyük resmi anlatırım", "strategic"),
            st("Soru sorup birlikte keşfederiz", "learning"),
            st("Örneklerle hikâye anlatırım", "communication"),
        ]),
        ("s-24", "Performans düşüklüğünde (sizde)?", [
            st("Rutini sıkılaştırırım", "discipline"),
            st("Mola ve denge ararım", "adaptability"),
            st("İlham kaynağı değiştiririm", "creative"),
            st("Hedefi yeniden çerçevelerim", "strategic"),
        ]),
    ]
    return [q4(a, b, c) for a, b, c in rows]


def dump(name, data):
    p = OUT / name
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(p, len(data))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    dump("mbti.json", build_mbti())
    dump("enneagram.json", build_enneagram())
    dump("holland.json", build_holland())
    dump("vark.json", build_vark())
    dump("values.json", build_values())
    dump("strengths.json", build_strengths())


if __name__ == "__main__":
    main()
