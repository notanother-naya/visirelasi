# VisiRelasi — Psychological Alignment Engine

Platform asesmen keselarasan psikologis dan kompatibilitas relasi pra-nikah / pasangan jangka panjang berbasis 5 pilar fundamental.

---

## 🎯 Tentang VisiRelasi

**VisiRelasi** membantu pasangan mengukur keselarasan nilai, ekspektasi, dan gaya komunikasi secara objektif melalui kuesioner terstruktur dua arah (pihak pria dan wanita). Hasil analisis menyajikan skor kompatibilitas komprehensif, pemetaan pilar kekuatan vs. area rentan, serta daftar topik krusial yang perlu didiskusikan sebelum melangkah ke jenjang komitmen serius.

---

## 🏛️ 5 Pilar Kompatibilitas

1. **Finansial & Ambisi Karir** (`financial`) — Pengelolaan uang, model anggaran bersama/terpisah, ambisi karir, dan toleransi utang/investasi.
2. **Peran Rumah Tangga & Parenting** (`domestic`) — Ekspektasi pembagian tugas domestik harian, pola asuh anak, dan keterlibatan keluarga besar.
3. **Resolusi Konflik & Emosi** (`conflict`) — Gaya komunikasi saat berselisih, de-eskalasi emosi, kebutuhan waktu jeda (*cooling down*), dan pola kompromi.
4. **Batasan Sosial & Privasi** (`boundaries`) — Batasan pertemanan lawan jenis, kebutuhan ruang pribadi (*me-time*), dan keterbukaan di media sosial.
5. **Visi Jangka Panjang & Spiritualitas** (`vision`) — Arah hidup 5–10 tahun ke depan, prinsip spiritual/moral, serta target masa depan bersama.

---

## ✨ Fitur Utama

- **Dual Assessment Flow**: Pengisian kuesioner mandiri untuk masing-masing pasangan.
- **Engine Kompatibilitas Otomatis**: Algoritma pembobotan berbasis matriks keselarasan jawaban antar pasangan per pilar.
- **Tingkatan Harmoni (Compatibility Tiers)**:
  - 85% – 100%: *Harmoni Emas (High Synergy)*
  - 70% – 84%: *Sinergi Sehat (Balanced)*
  - 50% – 69%: *Perlu Kalibrasi (Active Adjustment)*
  - < 50%: *Eksplorasi Mendalam (Critical Focus)*
- **Laporan Komprehensif**: Identifikasi pilar terkuat, pilar paling berisiko, serta butir pertanyaan yang membutuhkan diskusi mendalam (*Critical Discussions*).
- **Simulasi Data Cepat**: Fitur isi contoh data instan untuk demonstrasi atau pengetesan.

---

## 🛠️ Tech Stack

- **Framework & Runtime**: React 18, TypeScript 5, Vite 6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Testing**: TSX unit tests (`compatibilityEngine.test.ts`)

---

## 🚀 Memulai Proyek

### Prasyarat
- Node.js (>= 18)
- npm / pnpm / yarn

### Instalasi & Menjalankan Dev Server

```bash
# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

Buka browser di `http://localhost:5173`.

### Menjalankan Unit Test

```bash
npm test
```

### Build Produksi

```bash
npm run build
```

Hasil build siap di-deploy akan berada di direktori `dist/`.

---

## 📁 Struktur Direktori

```text
src/
├── components/          # Komponen UI (Kuesioner, Ringkasan, Hasil)
├── context/             # State management (QuizContext)
├── data/                # Bank pertanyaan & metadata pilar
├── types/               # Definisi tipe data TypeScript
└── utils/               # Engine kalkulasi skor & unit test
```
