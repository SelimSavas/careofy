#!/usr/bin/env python3
"""
Append 100 skilled-trade / vocational professions (prof-201 … prof-300) with
Holland/MBTI/values/VARK/strengths/enneagram tuned per role family.
Run from repo: python3 site/scripts/append_trades_professions.py
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROF_PATH = ROOT / "data/careers/professions.json"

MBTI = {
    "istp": {"ei": -0.2, "sn": -0.38, "tf": 0.42, "jp": -0.38},
    "estp": {"ei": 0.38, "sn": -0.32, "tf": 0.32, "jp": -0.28},
    "istj": {"ei": -0.25, "sn": -0.25, "tf": 0.38, "jp": 0.22},
    "estj": {"ei": 0.35, "sn": -0.22, "tf": 0.35, "jp": 0.28},
    "isfj": {"ei": -0.22, "sn": -0.18, "tf": -0.28, "jp": 0.18},
    "esfj": {"ei": 0.32, "sn": -0.12, "tf": -0.22, "jp": 0.12},
    "isfp": {"ei": -0.18, "sn": -0.22, "tf": -0.15, "jp": -0.25},
    "esfp": {"ei": 0.35, "sn": -0.2, "tf": -0.1, "jp": -0.2},
    "intj": {"ei": -0.28, "sn": 0.25, "tf": 0.35, "jp": 0.15},
    "infj": {"ei": -0.15, "sn": 0.2, "tf": -0.2, "jp": 0.1},
    "intp": {"ei": -0.22, "sn": 0.32, "tf": 0.28, "jp": -0.18},
    "entj": {"ei": 0.4, "sn": 0.05, "tf": 0.38, "jp": 0.25},
}

# (values partial, vark, strengths partial, enneagram partial)
FAMILY = {
    "farm": (
        {"purpose": 0.28, "autonomy": 0.32, "security": 0.22, "balance": 0.18},
        {"K": 4, "R": 3, "V": 2, "A": 1},
        {"execution": 0.34, "discipline": 0.26, "adaptability": 0.22},
        {"6": 0.32, "9": 0.22, "1": 0.2},
    ),
    "mech": (
        {"achievement": 0.26, "growth": 0.22, "security": 0.24, "variety": 0.18},
        {"K": 4, "V": 3, "R": 2, "A": 1},
        {"analytical": 0.36, "execution": 0.28, "focus": 0.22},
        {"5": 0.28, "6": 0.26, "8": 0.18},
    ),
    "build": (
        {"achievement": 0.28, "security": 0.24, "autonomy": 0.18},
        {"K": 4, "V": 3, "R": 2, "A": 1},
        {"execution": 0.38, "discipline": 0.26, "adaptability": 0.2},
        {"1": 0.28, "6": 0.26, "8": 0.2},
    ),
    "elec": (
        {"achievement": 0.26, "growth": 0.24, "security": 0.22},
        {"K": 3, "R": 3, "V": 3, "A": 1},
        {"analytical": 0.38, "focus": 0.28, "discipline": 0.22},
        {"5": 0.3, "1": 0.24, "6": 0.22},
    ),
    "food": (
        {"creativity": 0.3, "variety": 0.24, "achievement": 0.2, "service": 0.18},
        {"K": 4, "V": 2, "A": 2, "R": 2},
        {"execution": 0.32, "creative": 0.26, "discipline": 0.22},
        {"2": 0.22, "7": 0.24, "1": 0.22},
    ),
    "care": (
        {"service": 0.34, "community": 0.22, "recognition": 0.2},
        {"A": 3, "K": 3, "V": 2, "R": 2},
        {"empathy": 0.34, "relationship": 0.28, "communication": 0.22},
        {"2": 0.35, "6": 0.22, "9": 0.2},
    ),
    "wood": (
        {"creativity": 0.28, "autonomy": 0.26, "achievement": 0.22},
        {"K": 4, "V": 3, "R": 2, "A": 2},
        {"creative": 0.3, "execution": 0.3, "focus": 0.22},
        {"4": 0.22, "5": 0.22, "1": 0.24},
    ),
    "logistics": (
        {"security": 0.28, "achievement": 0.24, "variety": 0.18},
        {"K": 3, "V": 3, "R": 3, "A": 1},
        {"execution": 0.34, "discipline": 0.3, "focus": 0.22},
        {"6": 0.3, "1": 0.24, "3": 0.2},
    ),
    "metal": (
        {"achievement": 0.3, "security": 0.24, "growth": 0.18},
        {"K": 4, "V": 3, "R": 2, "A": 1},
        {"execution": 0.34, "focus": 0.28, "discipline": 0.24},
        {"8": 0.24, "1": 0.28, "6": 0.22},
    ),
    "service": (
        {"service": 0.28, "security": 0.22, "community": 0.2},
        {"K": 3, "R": 2, "V": 2, "A": 3},
        {"communication": 0.28, "execution": 0.26, "adaptability": 0.22},
        {"6": 0.28, "9": 0.22, "3": 0.2},
    ),
}

# title, category, outlook 1-9, R,I,A,S,E,C, family, mbti_key
ROWS: list[tuple] = [
    ("Çiftçi (bitkisel üretim)", "Tarım ve doğa", 7, (5, 2, 0, 1, 1, 3), "farm", "istj"),
    ("Hayvancılık işletmecisi", "Tarım ve doğa", 6, (5, 1, 0, 2, 1, 3), "farm", "isfj"),
    ("Seracılık ve örtü altı üretim teknisyeni", "Tarım ve doğa", 7, (5, 2, 1, 1, 0, 3), "farm", "istj"),
    ("Arıcı", "Tarım ve doğa", 6, (4, 2, 1, 1, 1, 2), "farm", "istp"),
    ("Meyvecilik ve bağ işletmeciliği teknisyeni", "Tarım ve doğa", 7, (5, 2, 1, 1, 1, 2), "farm", "istj"),
    ("Süt ve besi işletmesi bakım elemanı", "Tarım ve doğa", 6, (5, 1, 0, 2, 0, 3), "farm", "isfj"),
    ("Traktör ve tarım makinesi operatörü", "Tarım ve doğa", 6, (5, 1, 0, 0, 0, 3), "farm", "istp"),
    ("Orman işçisi / ağaç kesim ve bakım", "Tarım ve doğa", 5, (5, 1, 0, 0, 0, 2), "farm", "istp"),
    ("Bahçıvan ve peyzaj bakım elemanı", "Tarım ve doğa", 6, (4, 1, 3, 1, 0, 2), "farm", "isfp"),
    ("İç ve dış mekan bitkileri yetiştiricisi", "Tarım ve doğa", 6, (4, 2, 2, 1, 1, 2), "farm", "isfj"),
    ("Su ürünleri yetiştiriciliği teknisyeni", "Tarım ve doğa", 6, (4, 3, 1, 1, 1, 2), "farm", "istj"),
    ("Zirai ilaçlama ve gübreleme operatörü", "Tarım ve doğa", 5, (5, 1, 0, 0, 0, 3), "farm", "istj"),
    ("Oto mekaniği ve motor teknisyeni", "Motor ve taşıt", 7, (5, 2, 0, 1, 1, 2), "mech", "istp"),
    ("Oto elektrik ve elektronik teknisyeni", "Motor ve taşıt", 7, (4, 3, 0, 1, 0, 2), "elec", "istp"),
    ("Kaporta ve boya ustası", "Motor ve taşıt", 6, (4, 1, 3, 1, 1, 2), "mech", "isfp"),
    ("Lastik ve balans teknisyeni", "Motor ve taşıt", 6, (5, 1, 0, 1, 1, 2), "mech", "estp"),
    ("Ağır vasıta ve iş makinesi mekaniği", "Motor ve taşıt", 6, (5, 2, 0, 0, 0, 3), "mech", "istp"),
    ("Motosiklet ve küçük motor tamircisi", "Motor ve taşıt", 6, (5, 2, 0, 1, 1, 1), "mech", "istp"),
    ("Bisiklet tamircısı", "Motor ve taşıt", 6, (5, 1, 1, 1, 0, 1), "mech", "istp"),
    ("Dizel enjeksiyon ve pompa teknisyeni", "Motor ve taşıt", 7, (4, 3, 0, 0, 0, 3), "mech", "intj"),
    ("Kaynakçı (MAG/MIG/TIG)", "Metal ve makine", 7, (5, 1, 1, 0, 0, 2), "metal", "istp"),
    ("CNC torna-freze operatörü", "Metal ve makine", 7, (5, 2, 0, 0, 0, 3), "metal", "istj"),
    ("Kalıpçı ve metal şekillendirme", "Metal ve makine", 6, (5, 1, 0, 0, 0, 3), "metal", "istj"),
    ("Sac işleme ve pres operatörü", "Metal ve makine", 6, (5, 1, 0, 0, 0, 3), "metal", "estj"),
    ("Endüstriyel bakım-onarım teknisyeni", "Metal ve makine", 7, (4, 2, 0, 1, 0, 3), "mech", "istp"),
    ("Hidrolik-pnömatik sistem teknisyeni", "Metal ve makine", 7, (4, 3, 0, 0, 0, 3), "elec", "intp"),
    ("Elektrik tesisatçısı (konut ve işyeri)", "Elektrik ve enerji", 8, (4, 2, 0, 1, 0, 3), "elec", "istp"),
    ("Elektronik cihaz tamircisi", "Elektrik ve enerji", 6, (4, 3, 0, 1, 0, 2), "elec", "intp"),
    ("Beyaz eşya servis teknisyeni", "Elektrik ve enerji", 6, (4, 2, 0, 2, 0, 2), "elec", "istp"),
    ("Güneş enerjisi saha montajcısı", "Elektrik ve enerji", 8, (4, 2, 0, 1, 1, 2), "build", "estp"),
    ("Altyapı ve fiber kablo teknisyeni", "Elektrik ve enerji", 7, (4, 2, 0, 1, 0, 3), "elec", "istj"),
    ("Yangın algılama ve güvenlik sistemleri teknisyeni", "Elektrik ve enerji", 7, (4, 2, 0, 1, 0, 3), "elec", "istj"),
    ("Endüstriyel otomasyon elektrikçisi", "Elektrik ve enerji", 8, (4, 3, 0, 0, 0, 3), "elec", "intj"),
    ("Sıhhi tesisat ve kanalizasyon ustası", "İnşaat ve yapı", 8, (5, 1, 0, 1, 0, 3), "build", "estp"),
    ("Doğalgaz tesisatçısı", "İnşaat ve yapı", 7, (4, 2, 0, 1, 0, 3), "build", "istj"),
    ("Isıtma-soğutma (klima) teknisyeni", "İnşaat ve yapı", 8, (4, 2, 0, 1, 0, 3), "build", "istp"),
    ("Yalıtım ve çatı ustası", "İnşaat ve yapı", 6, (5, 1, 0, 0, 0, 2), "build", "istp"),
    ("Duvarcı ve sıvacı", "İnşaat ve yapı", 6, (5, 0, 1, 0, 0, 2), "build", "estp"),
    ("Fayans-seramik döşeyici", "İnşaat ve yapı", 7, (4, 1, 3, 0, 0, 2), "build", "isfp"),
    ("İnşaat demircisi ve kaynak montajcısı", "İnşaat ve yapı", 6, (5, 1, 0, 0, 0, 2), "build", "istp"),
    ("Camcı ve doğrama montajcısı", "İnşaat ve yapı", 6, (4, 1, 2, 1, 0, 2), "build", "isfp"),
    ("Asansör bakım ve servis teknisyeni", "İnşaat ve yapı", 7, (4, 2, 0, 1, 0, 3), "elec", "istj"),
    ("Marangoz ve doğrama ustası", "Ahşap ve mobilya", 7, (5, 1, 2, 0, 0, 2), "wood", "istp"),
    ("Mobilya imalat ve montaj ustası", "Ahşap ve mobilya", 6, (4, 1, 3, 0, 0, 3), "wood", "isfp"),
    ("Parke ve döşeme ustası", "Ahşap ve mobilya", 6, (5, 0, 1, 0, 0, 2), "wood", "istj"),
    ("Aşçı ve mutfak elemanı", "Gıda ve içecek", 7, (4, 1, 3, 2, 1, 2), "food", "esfj"),
    ("Pastacı ve fırıncı", "Gıda ve içecek", 6, (4, 1, 4, 1, 0, 3), "food", "isfp"),
    ("Kasap ve şarküteri elemanı", "Gıda ve içecek", 6, (4, 1, 0, 2, 1, 2), "food", "estj"),
    ("Gıda üretim hattı operatörü", "Gıda ve içecek", 6, (4, 1, 0, 0, 0, 4), "food", "istj"),
    ("İçecek ve barista", "Gıda ve içecek", 6, (3, 0, 2, 3, 1, 2), "food", "esfp"),
    ("Endüstriyel mutfak ekipman servisi", "Gıda ve içecek", 6, (4, 2, 0, 1, 0, 3), "mech", "istp"),
    ("Berber", "Kişisel bakım", 7, (3, 0, 2, 3, 1, 2), "care", "esfj"),
    ("Kuaför ve saç tasarımcısı", "Kişisel bakım", 6, (3, 0, 4, 3, 1, 1), "care", "esfp"),
    ("Güzellik ve cilt bakım uzmanı", "Kişisel bakım", 6, (2, 1, 3, 4, 1, 1), "care", "isfj"),
    ("Masaj ve spa terapisti (meslek diploması)", "Kişisel bakım", 6, (2, 1, 1, 4, 0, 1), "care", "isfj"),
    ("Tırnak ve protez tırnak teknisyeni", "Kişisel bakım", 5, (3, 0, 4, 3, 1, 1), "care", "esfp"),
    ("Dövmeci ve piercing uzmanı", "Kişisel bakım", 5, (3, 1, 4, 2, 1, 1), "care", "isfp"),
    ("Terzi ve dikiş ustası", "Tekstil ve deri", 6, (4, 1, 3, 2, 0, 3), "wood", "isfj"),
    ("Ayakkabı tamircisi ve tabakçı", "Tekstil ve deri", 5, (5, 0, 2, 2, 0, 2), "wood", "istp"),
    ("Deri işleme ve saraciye", "Tekstil ve deri", 5, (4, 1, 3, 1, 0, 2), "wood", "isfp"),
    ("Halı ve koltuk yıkama teknisyeni", "Teknik hizmet", 5, (4, 0, 0, 2, 0, 2), "service", "estp"),
    ("Genel tesis bakım ve onarım görevlisi", "Teknik hizmet", 6, (4, 1, 0, 2, 0, 3), "service", "istj"),
    ("Çilingir ve anahtarcı", "Teknik hizmet", 6, (4, 2, 0, 2, 0, 2), "mech", "istp"),
    ("Saat tamircisi", "Teknik hizmet", 5, (4, 3, 1, 1, 0, 2), "mech", "intp"),
    ("Cam işleme ve vitray ustası", "Teknik hizmet", 5, (4, 1, 4, 0, 0, 1), "wood", "isfp"),
    ("Matbaa ve ofset baskı operatörü", "Teknik hizmet", 5, (4, 1, 2, 0, 0, 4), "logistics", "istj"),
    ("Endüstriyel boya ve yüzey hazırlık ustası", "Metal ve makine", 6, (5, 1, 1, 0, 0, 2), "metal", "istj"),
    ("Vinç operatörü", "Lojistik ve taşıma", 6, (4, 1, 0, 0, 0, 3), "logistics", "estp"),
    ("Forklift ve istif makinesi operatörü", "Lojistik ve taşıma", 6, (4, 0, 0, 0, 0, 4), "logistics", "estp"),
    ("Depo ve ambar görevlisi (lojistik)", "Lojistik ve taşıma", 6, (3, 0, 0, 1, 0, 4), "logistics", "istj"),
    ("Kurye ve moto kurye", "Lojistik ve taşıma", 5, (3, 0, 0, 2, 1, 2), "logistics", "estp"),
    ("Güvenlik ve özel güvenlik görevlisi", "Hizmet", 6, (2, 1, 0, 2, 1, 3), "service", "istj"),
    ("Temizlik ve hijyen sorumlusu", "Hizmet", 5, (3, 0, 0, 2, 0, 3), "service", "isfj"),
    ("Çöp toplama ve geri dönüşüm operatörü", "Hizmet", 4, (4, 0, 0, 0, 0, 3), "logistics", "istj"),
    ("Hastane sterilizasyon ve çamaşırhane teknisyeni", "Sağlık destek", 6, (4, 1, 0, 2, 0, 3), "service", "isfj"),
    ("Ambulans şoförü ve acil yardım destek elemanı", "Sağlık destek", 6, (4, 1, 0, 3, 0, 2), "service", "estp"),
    ("Diş protez laboratuvarı teknisyeni", "Sağlık destek", 7, (4, 3, 2, 1, 0, 3), "care", "istj"),
    ("Optisyenlik teknisyeni", "Sağlık destek", 6, (3, 2, 1, 3, 1, 2), "care", "isfj"),
    ("Fizyoterapi destek ve rehabilitasyon asistanı", "Sağlık destek", 7, (3, 2, 1, 4, 0, 2), "care", "esfj"),
    ("Hayvan bakım ve pet kuaförü", "Tarım ve doğa", 6, (4, 1, 1, 3, 0, 2), "care", "isfp"),
    ("Dalgıç ve su altı bakım teknisyeni", "Teknik hizmet", 6, (5, 2, 0, 0, 0, 2), "mech", "istp"),
    ("Boyacı-badana ustası (iç-dış mekân)", "İnşaat ve yapı", 6, (4, 0, 2, 0, 0, 2), "build", "isfp"),
    ("Sıva ve dekoratif sıva ustası", "İnşaat ve yapı", 6, (4, 0, 3, 0, 0, 2), "build", "isfp"),
    ("Zemin kaplama (epoksi, endüstriyel) teknisyeni", "İnşaat ve yapı", 6, (4, 1, 1, 0, 0, 3), "build", "istj"),
    ("Betonarme demir bağlama ustası", "İnşaat ve yapı", 6, (5, 1, 0, 0, 0, 2), "build", "estj"),
    ("İskele kurulum ve yüksekte çalışma teknisyeni", "İnşaat ve yapı", 5, (5, 0, 0, 0, 0, 2), "build", "estp"),
    ("Yol yapım ve asfalt operatörü", "İnşaat ve yapı", 5, (5, 1, 0, 0, 0, 3), "build", "estp"),
    ("Tarımsal sulama sistemleri teknisyeni", "Tarım ve doğa", 7, (4, 2, 0, 1, 0, 3), "farm", "istj"),
    ("Peyzaj inşaat ve taş döşeme ustası", "Tarım ve doğa", 6, (5, 0, 2, 0, 0, 2), "build", "estp"),
    ("Hırdavat ve el aletleri satış danışmanı (teknik)", "Teknik hizmet", 6, (3, 2, 0, 2, 3, 2), "service", "estp"),
    ("Bakım-onarım formenliği (saha liderliği)", "Metal ve makine", 7, (4, 2, 0, 2, 2, 3), "mech", "estj"),
    ("Kalite kontrol ölçüm elemanı (imalat)", "Metal ve makine", 7, (4, 3, 0, 0, 0, 4), "metal", "istj"),
    ("Lazer kesim ve plazma operatörü", "Metal ve makine", 7, (5, 2, 1, 0, 0, 2), "metal", "istp"),
    ("Hırsız alarm ve kamera kurulum teknisyeni", "Elektrik ve enerji", 7, (4, 2, 0, 1, 0, 3), "elec", "istp"),
    ("Jeneratör bakım teknisyeni", "Elektrik ve enerji", 6, (4, 2, 0, 1, 0, 3), "elec", "istp"),
    ("Soğuk oda ve endüstriyel soğutma teknisyeni", "İnşaat ve yapı", 7, (4, 2, 0, 1, 0, 3), "build", "istp"),
    ("Çikolata ve şekerleme üretim operatörü", "Gıda ve içecek", 6, (4, 1, 2, 0, 0, 4), "food", "isfj"),
    ("Et ve şarküteri işleme operatörü", "Gıda ve içecek", 5, (4, 1, 0, 1, 0, 3), "food", "istj"),
    ("Otel ve catering mutfak şefi yardımcılığı", "Gıda ve içecek", 6, (3, 1, 2, 2, 2, 2), "food", "esfj"),
    ("Tıbbi malzeme steril paketleme teknisyeni", "Sağlık destek", 7, (4, 2, 0, 2, 0, 4), "service", "isfj"),
]


def row_to_entry(idx: int, row: tuple) -> dict:
    title, cat, outlook, h6, fam, mkey = row
    R, I, A, S, E, C = h6
    vals, vark, strg, ennea = FAMILY[fam]
    return {
        "id": f"prof-{idx:03d}",
        "title": title,
        "category": cat,
        "futureOutlook": outlook,
        "holland": {"R": R, "I": I, "A": A, "S": S, "E": E, "C": C},
        "mbtiIdeal": MBTI[mkey],
        "values": dict(vals),
        "vark": dict(vark),
        "strengths": dict(strg),
        "enneagram": dict(ennea),
    }


def main() -> None:
    assert len(ROWS) == 100, len(ROWS)
    existing = json.loads(PROF_PATH.read_text(encoding="utf-8"))
    ids = {p["id"] for p in existing}
    start = 201
    new = [row_to_entry(start + i, ROWS[i]) for i in range(100)]
    for p in new:
        assert p["id"] not in ids, p["id"]
    merged = existing + new
    PROF_PATH.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Appended {len(new)} professions; total {len(merged)}.")


if __name__ == "__main__":
    main()
