#!/usr/bin/env python3
"""Append vocational MYO / meslek lisesi pathways as dep-339 … dep-350."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "data/careers/departments.json"

NEW = [
    {
        "id": "dep-339",
        "name": "Tarım ve Orman Meslek Eğitimi (MYO)",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Bitkisel üretim", "Hayvancılık", "Seracılık", "Tarım makineleri"],
        "holland": {"R": 5, "I": 2, "A": 1, "S": 1, "E": 0, "C": 2},
        "mbtiIdeal": {"ei": -0.15, "sn": -0.2, "tf": 0.15, "jp": 0.1},
        "values": {"purpose": 0.3, "autonomy": 0.28, "security": 0.22, "balance": 0.2},
        "vark": {"K": 4, "R": 3, "V": 2, "A": 1},
        "strengths": {"execution": 0.34, "discipline": 0.26, "adaptability": 0.22},
        "enneagram": {"6": 0.28, "9": 0.22, "1": 0.2},
    },
    {
        "id": "dep-340",
        "name": "Motorlu Araçlar ve Taşıt Teknolojileri",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Oto mekaniği", "Oto elektrik", "Ağır vasıta", "Motosiklet"],
        "holland": {"R": 5, "I": 2, "A": 1, "S": 1, "E": 1, "C": 2},
        "mbtiIdeal": {"ei": -0.05, "sn": -0.35, "tf": 0.38, "jp": -0.32},
        "values": {"achievement": 0.28, "growth": 0.24, "variety": 0.2, "security": 0.18},
        "vark": {"K": 4, "V": 3, "R": 2, "A": 1},
        "strengths": {"analytical": 0.34, "execution": 0.28, "focus": 0.24},
        "enneagram": {"5": 0.26, "6": 0.26, "8": 0.18},
    },
    {
        "id": "dep-341",
        "name": "Elektrik ve Elektronik Teknolojisi",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Elektrik tesisat", "Endüstriyel otomasyon", "Güvenlik sistemleri"],
        "holland": {"R": 4, "I": 3, "A": 0, "S": 1, "E": 0, "C": 3},
        "mbtiIdeal": {"ei": -0.18, "sn": -0.15, "tf": 0.35, "jp": -0.15},
        "values": {"achievement": 0.28, "growth": 0.26, "security": 0.22},
        "vark": {"K": 3, "R": 3, "V": 3, "A": 1},
        "strengths": {"analytical": 0.38, "focus": 0.26, "discipline": 0.22},
        "enneagram": {"5": 0.3, "1": 0.24, "6": 0.2},
    },
    {
        "id": "dep-342",
        "name": "İnşaat ve Yapı Teknolojileri",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Yapı işleri", "Tesisat", "Isıtma-soğutma", "Yüzey kaplama"],
        "holland": {"R": 5, "I": 1, "A": 1, "S": 1, "E": 0, "C": 3},
        "mbtiIdeal": {"ei": 0.05, "sn": -0.28, "tf": 0.32, "jp": -0.2},
        "values": {"achievement": 0.28, "security": 0.24, "autonomy": 0.18},
        "vark": {"K": 4, "V": 3, "R": 2, "A": 1},
        "strengths": {"execution": 0.36, "discipline": 0.28, "adaptability": 0.2},
        "enneagram": {"1": 0.28, "6": 0.24, "8": 0.2},
    },
    {
        "id": "dep-343",
        "name": "Makine ve Metal Teknolojileri",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Kaynak", "CNC", "Kalıpçılık", "Bakım-onarım"],
        "holland": {"R": 5, "I": 2, "A": 1, "S": 0, "E": 0, "C": 3},
        "mbtiIdeal": {"ei": -0.12, "sn": -0.32, "tf": 0.4, "jp": -0.25},
        "values": {"achievement": 0.3, "security": 0.22, "growth": 0.2},
        "vark": {"K": 4, "V": 3, "R": 2, "A": 1},
        "strengths": {"execution": 0.34, "focus": 0.28, "discipline": 0.24},
        "enneagram": {"8": 0.22, "1": 0.28, "6": 0.24},
    },
    {
        "id": "dep-344",
        "name": "Gıda İşleme ve Mutfak Sanatları",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Aşçılık", "Pastacılık", "Gıda üretimi", "İçecek hizmetleri"],
        "holland": {"R": 4, "I": 1, "A": 3, "S": 2, "E": 1, "C": 2},
        "mbtiIdeal": {"ei": 0.22, "sn": -0.18, "tf": -0.05, "jp": 0.05},
        "values": {"creativity": 0.3, "service": 0.22, "variety": 0.22, "achievement": 0.18},
        "vark": {"K": 4, "V": 2, "A": 2, "R": 2},
        "strengths": {"execution": 0.3, "creative": 0.26, "discipline": 0.22},
        "enneagram": {"2": 0.22, "7": 0.24, "1": 0.22},
    },
    {
        "id": "dep-345",
        "name": "Kişisel Bakım ve Güzellik Hizmetleri",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Berberlik", "Kuaförlük", "Güzellik ve cilt bakımı"],
        "holland": {"R": 3, "I": 1, "A": 3, "S": 4, "E": 1, "C": 1},
        "mbtiIdeal": {"ei": 0.25, "sn": -0.12, "tf": -0.18, "jp": 0.08},
        "values": {"service": 0.32, "recognition": 0.24, "community": 0.2},
        "vark": {"A": 3, "K": 3, "V": 2, "R": 2},
        "strengths": {"empathy": 0.34, "relationship": 0.28, "communication": 0.22},
        "enneagram": {"2": 0.32, "6": 0.22, "9": 0.2},
    },
    {
        "id": "dep-346",
        "name": "Lojistik ve Depolama",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Depo yönetimi", "Forklift ve istif", "Kargo ve dağıtım"],
        "holland": {"R": 3, "I": 0, "A": 0, "S": 1, "E": 1, "C": 4},
        "mbtiIdeal": {"ei": 0.1, "sn": -0.25, "tf": 0.2, "jp": 0.2},
        "values": {"security": 0.28, "achievement": 0.24, "variety": 0.18},
        "vark": {"K": 3, "V": 3, "R": 3, "A": 1},
        "strengths": {"execution": 0.34, "discipline": 0.3, "focus": 0.22},
        "enneagram": {"6": 0.28, "1": 0.24, "3": 0.2},
    },
    {
        "id": "dep-347",
        "name": "Tekstil, Deri ve Ayakkabı",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Terzilik", "Deri işleme", "Ayakkabı imalatı"],
        "holland": {"R": 4, "I": 1, "A": 3, "S": 2, "E": 0, "C": 3},
        "mbtiIdeal": {"ei": -0.05, "sn": -0.2, "tf": -0.1, "jp": 0.0},
        "values": {"creativity": 0.28, "autonomy": 0.22, "achievement": 0.2},
        "vark": {"K": 4, "V": 3, "R": 2, "A": 2},
        "strengths": {"creative": 0.3, "execution": 0.28, "focus": 0.22},
        "enneagram": {"4": 0.22, "6": 0.22, "1": 0.22},
    },
    {
        "id": "dep-348",
        "name": "Sağlık Hizmetleri ve Destek Meslekleri",
        "faculty": "Meslek Yüksekokulu",
        "tracks": ["Sterilizasyon", "Optisyenlik asistanlığı", "Fizyoterapi destek"],
        "holland": {"R": 3, "I": 2, "A": 1, "S": 4, "E": 0, "C": 3},
        "mbtiIdeal": {"ei": 0.05, "sn": -0.15, "tf": -0.12, "jp": 0.12},
        "values": {"service": 0.36, "purpose": 0.24, "security": 0.2},
        "vark": {"K": 3, "A": 3, "R": 2, "V": 2},
        "strengths": {"empathy": 0.32, "discipline": 0.28, "communication": 0.22},
        "enneagram": {"2": 0.3, "6": 0.24, "1": 0.2},
    },
    {
        "id": "dep-349",
        "name": "Meslek Lisesi — Elektrik-Elektronik Teknolojisi",
        "faculty": "Meslek Lisesi",
        "tracks": ["Elektrik", "Elektronik", "Endüstriyel otomasyon giriş"],
        "holland": {"R": 4, "I": 2, "A": 0, "S": 1, "E": 0, "C": 3},
        "mbtiIdeal": {"ei": -0.1, "sn": -0.2, "tf": 0.32, "jp": -0.1},
        "values": {"achievement": 0.26, "growth": 0.24, "security": 0.22},
        "vark": {"K": 3, "R": 3, "V": 3, "A": 1},
        "strengths": {"analytical": 0.34, "discipline": 0.26, "focus": 0.22},
        "enneagram": {"5": 0.26, "6": 0.26, "1": 0.22},
    },
    {
        "id": "dep-350",
        "name": "Meslek Lisesi — Makine ve Metal Teknolojileri",
        "faculty": "Meslek Lisesi",
        "tracks": ["Torna-freze", "Kaynak", "Makine resim"],
        "holland": {"R": 5, "I": 1, "A": 1, "S": 0, "E": 0, "C": 3},
        "mbtiIdeal": {"ei": -0.15, "sn": -0.35, "tf": 0.38, "jp": -0.22},
        "values": {"achievement": 0.28, "security": 0.24, "growth": 0.18},
        "vark": {"K": 4, "V": 3, "R": 2, "A": 1},
        "strengths": {"execution": 0.34, "focus": 0.28, "discipline": 0.24},
        "enneagram": {"1": 0.26, "6": 0.26, "8": 0.2},
    },
]


def main() -> None:
    data = json.loads(PATH.read_text(encoding="utf-8"))
    ids = {d["id"] for d in data}
    for d in NEW:
        assert d["id"] not in ids, d["id"]
    data.extend(NEW)
    PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Added {len(NEW)} departments; total {len(data)}.")


if __name__ == "__main__":
    main()
