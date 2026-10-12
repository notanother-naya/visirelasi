export interface QuestionOption {
  id: 'a' | 'b' | 'c' | 'd';
  maleLabel: string;
  femaleLabel: string;
}

export type PillarId = 'financial' | 'domestic' | 'conflict' | 'boundaries' | 'vision';

export interface PillarMeta {
  id: PillarId;
  name: string;
  iconName: string;
  description: string;
}

export const PILLARS: Record<PillarId, PillarMeta> = {
  financial: {
    id: 'financial',
    name: 'Finansial & Ambisi Karir',
    iconName: 'Coins',
    description: 'Pola pengelolaan uang, ambisi karir, dan pembagian pengeluaran bersama.',
  },
  domestic: {
    id: 'domestic',
    name: 'Peran Rumah Tangga & Parenting',
    iconName: 'Home',
    description: 'Ekspektasi peran domestik harian, pola asuh, dan relasi keluarga besar.',
  },
  conflict: {
    id: 'conflict',
    name: 'Resolusi Konflik & Emosi',
    iconName: 'HeartHandshake',
    description: 'Pola de-eskalasi saat berselisih, gaya komunikasi, dan regulasi emosi.',
  },
  boundaries: {
    id: 'boundaries',
    name: 'Batasan Sosial & Privasi',
    iconName: 'ShieldCheck',
    description: 'Batasan interaksi pertemanan lawan jenis, ruang sendiri (me-time), dan media sosial.',
  },
  vision: {
    id: 'vision',
    name: 'Visi Jangka Panjang & Spiritualitas',
    iconName: 'Compass',
    description: 'Arah hidup 5-10 tahun ke depan, prinsip spiritual/moral, dan tujuan masa depan.',
  },
};

export interface Question {
  id: string;
  pillar: PillarId;
  title: string;
  malePrompt: string;
  femalePrompt: string;
  options: QuestionOption[];
  matrix: Record<string, Record<string, { score: number; note: string }>>;
}

export const PSYCHOLOGY_QUESTIONS: Question[] = [
  // PILAR 1: Finansial & Ambisi Karir
  {
    id: 'q1',
    pillar: 'financial',
    title: 'Model Rekening & Pembagian Anggaran',
    malePrompt: 'Bagaimana model pembagian keuangan keluarga yang paling ideal menurut kamu?',
    femalePrompt: 'Bagaimana model pembagian keuangan keluarga yang paling ideal menurut kamu?',
    options: [
      { id: 'a', maleLabel: 'Satu rekening bersama untuk semua pemasukan dan kebutuhan; transparansi mutlak.', femaleLabel: 'Satu rekening bersama untuk semua pemasukan dan kebutuhan; transparansi mutlak.' },
      { id: 'b', maleLabel: 'Rekening bersama untuk biaya operasional bulanan, sisa uang di rekening pribadi masing-masing.', femaleLabel: 'Rekening bersama untuk biaya operasional bulanan, sisa uang di rekening pribadi masing-masing.' },
      { id: 'c', maleLabel: 'Saya menanggung 100% biaya operasional primer, penghasilan pasangan adalah hak penuhnya.', femaleLabel: 'Pasangan menanggung operasional utama, penghasilan saya untuk tabungan/pengembangan keluarga.' },
      { id: 'd', maleLabel: 'Proporsional sesuai persentase penghasilan kami berdua secara dinamis.', femaleLabel: 'Proporsional sesuai persentase penghasilan kami berdua secara dinamis.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Kalian satu frekuensi mutlak dalam transparansi finansial.' }, b: { score: 75, note: 'Perlu titik temu antara transparansi total vs ruang dompet pribadi.' }, c: { score: 65, note: 'Ekspektasi peran nafkah perlu disepakati batasannya.' }, d: { score: 85, note: 'Cukup selaras dengan pendekatan keadilan anggaran.' } },
      b: { a: { score: 75, note: 'Saling melengkapi jika disepakati batas pos bersama.' }, b: { score: 100, note: 'Sangat harmonis: paham batas kebutuhan bersama & kebebasan pribadi.' }, c: { score: 70, note: 'Bisa kompromi jika alokasi tabungan jelas.' }, d: { score: 90, note: 'Sama-sama fleksibel dan adil dalam pembagian beban.' } },
      c: { a: { score: 65, note: 'Dibutuhkan kompromi pembagian peran nafkah vs otonomi.' }, b: { score: 75, note: 'Saling mengisi peran penyedia utama dan pendukung finansial.' }, c: { score: 100, note: 'Kombinasi klasik yang saling menguatkan komitmen.' }, d: { score: 70, note: 'Perlu sinkronisasi ekspektasi kontribusi finansial.' } },
      d: { a: { score: 85, note: 'Tingkat keterbukaan tinggi dengan perhitungan proporsional.' }, b: { score: 90, note: 'Sangat pragmatis, realistis, dan saling pengertian.' }, c: { score: 70, note: 'Cek kesiapan fleksibilitas jika salah satu karir melambat.' }, d: { score: 100, note: 'Sinergi kemitraan modern yang setara dan adaptif.' } },
    }
  },
  {
    id: 'q2',
    pillar: 'financial',
    title: 'Gaya Pengeluaran & Keputusan Investasi Besar',
    malePrompt: 'Saat ingin membeli aset besar (rumah/mobil) atau berinvestasi berisiko, apa prinsipmu?',
    femalePrompt: 'Saat ingin membeli aset besar (rumah/mobil) atau berinvestasi berisiko, apa prinsipmu?',
    options: [
      { id: 'a', maleLabel: 'Konservatif: Utamakan dana darurat aman & bebas utang sebelum belanja aset besar.', femaleLabel: 'Konservatif: Utamakan kepastian keamanan kas keluarga sebelum aset mewah.' },
      { id: 'b', maleLabel: 'Agresif-Visioner: Berani ambil leverage/cicilan cerdas demi pertumbuhan aset cepat.', femaleLabel: 'Agresif-Visioner: Mendukung langkah investasi besar selama potensinya terukur.' },
      { id: 'c', maleLabel: 'Musyawarah ketat: Apapun nilainya di atas limit tertentu wajib persetujuan berdua.', femaleLabel: 'Musyawarah ketat: Pembelian di atas nominal tertentu wajib veto bersama.' },
      { id: 'd', maleLabel: 'Otonom terukur: Selama kewajiban rumah tangga terpenuhi, masing-masing bebas memutuskan.', femaleLabel: 'Otonom terukur: Asal pos dapur dan tabungan anak aman, bebas alokasi pribadi.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Prinsip kehati-hatian keuangan kalian berdua sangat seimbang.' }, b: { score: 60, note: 'Bisa memicu friksi antara dorongan ambil risiko vs rasa aman.' }, c: { score: 90, note: 'Pilar proteksi finansial kuat dengan pagar musyawarah.' }, d: { score: 75, note: 'Perlu batasan nilai toleransi belanja bebas.' } },
      b: { a: { score: 60, note: 'Perlu rem dan gas yang seimbang agar tidak saling cemas.' }, b: { score: 95, note: 'Keduanya bermental bertumbuh dan berani melangkah maju.' }, c: { score: 80, note: 'Ambisi investasi terarah lewat mekanisme validasi berdua.' }, d: { score: 75, note: 'Pastikan safety net keluarga tidak terganggu.' } },
      c: { a: { score: 90, note: 'Harmoni tinggi dalam menjaga keamanan finansial bersama.' }, b: { score: 80, note: 'Mitigasi risiko yang sehat untuk menjaga laju investasi.' }, c: { score: 100, note: 'Komunikasi dan rasa saling menghargai keputusan sangat solid.' }, d: { score: 80, note: 'Tentukan batasan jelas pos yang wajib musyawarah.' } },
      d: { a: { score: 75, note: 'Perlu menyepakati definisi "kewajiban terpenuhi".' }, b: { score: 75, note: 'Kebebasan tinggi, tapi butuh keterbukaan bila ada kerugian.' }, c: { score: 80, note: 'Kombinasi fleksibilitas dan kontrol yang sehat.' }, d: { score: 95, note: 'Toleransi otonomi finansial tinggi dengan komitmen dasar.' } },
    }
  },

  // PILAR 2: Peran Rumah Tangga & Parenting
  {
    id: 'q3',
    pillar: 'domestic',
    title: 'Beban Tugas Domestik & Urusan Rumah',
    malePrompt: 'Bagaimana kamu memandang keterlibatanmu dalam pekerjaan rumah harian (masak, bersih-bersih, cucian)?',
    femalePrompt: 'Bagaimana ekspektasimu terhadap pembagian pekerjaan rumah harian?',
    options: [
      { id: 'a', maleLabel: 'Bagi rata 50:50; tidak ada pekerjaan berdasarkan gender.', femaleLabel: 'Bagi rata 50:50; saling bantu tanpa batasan stereotip gender.' },
      { id: 'b', maleLabel: 'Fleksibel: Siapapun yang punya waktu luang atau energi lebih yang mengerjakan.', femaleLabel: 'Fleksibel: Mengalir saling bantu sesuai ketersediaan energi harian.' },
      { id: 'c', maleLabel: 'Solutif: Gunakan asisten rumah tangga atau mesin cuci/dish washer otomatis agar tidak stres.', femaleLabel: 'Solutif: Maksimalkan bantuan ART atau teknologi agar energi fokus ke bonding.' },
      { id: 'd', maleLabel: 'Tradisional teratur: Saya fokus hal berat/teknis/luar rumah, urusan dalam rumah dipimpin pasangan.', femaleLabel: 'Tradisional harmonis: Saya bahagia mengelola rumah, pasangan bertanggung jawab hal luar/teknis.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Kemitraan setara dan saling bahu membahu tanpa beban sepihak.' }, b: { score: 85, note: 'Selaras dalam semangat kolaboratif.' }, c: { score: 80, note: 'Cocok, otomatisasi dan delegasi meringankan beban bersama.' }, d: { score: 60, note: 'Beda ekspektasi peran; komunikasikan ekspektasi detailnya.' } },
      b: { a: { score: 85, note: 'Saling melengkapi dengan rasa kebersamaan yang cair.' }, b: { score: 95, note: 'Sangat adaptif dan tidak kaku dalam rutinitas harian.' }, c: { score: 85, note: 'Fleksibilitas tinggi dipadukan dengan solusi praktis.' }, d: { score: 75, note: 'Dapat berjalan mulus dengan kesepakatan tugas inti.' } },
      c: { a: { score: 80, note: 'Praktis dan modern: mengeliminasi sumber perdebatan domestik.' }, b: { score: 85, note: 'Solusi efisien yang memberi ruang relaksasi untuk kalian.' }, c: { score: 100, note: 'Satu suara dalam menyederhanakan urusan domestik lewat fasilitas.' }, d: { score: 80, note: 'Fasilitas pendukung membantu meringankan peran domestik.' } },
      d: { a: { score: 60, note: 'Beda pandangan gender role: butuh diskusi batasan ekspektasi.' }, b: { score: 75, note: 'Bisa selaras asalkan ada apresiasi dan saling dukung.' }, c: { score: 80, note: 'Sinergi peran tradisional yang dimudahkan oleh teknologi.' }, d: { score: 100, note: 'Keselarasan peran komplementer yang saling melengkapi sempurna.' } },
    }
  },
  {
    id: 'q4',
    pillar: 'domestic',
    title: 'Filosofi Pola Asuh & Keterlibatan Anak',
    malePrompt: 'Saat nanti membesarkan anak, pendekatan apa yang paling kamu prioritaskan?',
    femalePrompt: 'Saat nanti membesarkan anak, pendekatan apa yang paling kamu prioritaskan?',
    options: [
      { id: 'a', maleLabel: 'Disiplin terstruktur, penanaman adab tegas, dan mental tahan banting sejak dini.', femaleLabel: 'Disiplin terstruktur, penanaman nilai moral dan adab yang konsisten.' },
      { id: 'b', maleLabel: 'Gentle parenting: Utamakan validasi emosi, dialog dua arah, dan eksplorasi bebas.', femaleLabel: 'Gentle parenting: Validasi emosi anak, dialog hangat, dan minim hukuman fisik.' },
      { id: 'c', maleLabel: 'Seimbang: Satu tegas satu merangkul, asalkan satu suara di depan anak.', femaleLabel: 'Kompak terpadu: Beda gaya wajar asal tidak saling menjatuhkan di depan anak.' },
      { id: 'd', maleLabel: 'Fokus masa depan: Utamakan pendidikan akademik/skill terbaik dan kemandirian global.', femaleLabel: 'Fokus potensi: Dukung bakat unik anak dengan fasilitas pendidikan optimal.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Pola asuh berprinsip kokoh dan saling sejalan dalam ketegasan.' }, b: { score: 60, note: 'Tantangan: Perbedaan tajam gaya disiplin vs pendekatan emosional.' }, c: { score: 85, note: 'Sinergi peran ketegasan yang diimbangi kelembutan.' }, d: { score: 85, note: 'Sama-sama mementingkan pembentukan karakter tangguh.' } },
      b: { a: { score: 60, note: 'Perlu diskusi batasan antara empati dan ketegasan aturan.' }, b: { score: 100, note: 'Sangat harmonis dalam menciptakan lingkungan aman emosional bagi anak.' }, c: { score: 90, note: 'Kombinasi sehat antara rasa aman dan batasan realitas.' }, d: { score: 85, note: 'Mendukung pertumbuhan psikologis dan potensi masa depan anak.' } },
      c: { a: { score: 85, note: 'Satu suara di depan anak menjadi kunci soliditas orang tua.' }, b: { score: 90, note: 'Fleksibilitas peran menciptakan dinamika parenting yang hangat.' }, c: { score: 100, note: 'Prinsip front kompak: resep utama parenting anti-bingung bagi anak.' }, d: { score: 90, note: 'Kekompakan tim yang siap mengawal masa depan anak.' } },
      d: { a: { score: 85, note: 'Fokus pada hasil dan pembentukan etos kerja masa depan.' }, b: { score: 85, note: 'Memadukan kecerdasan emosional dan kompetensi masa depan.' }, c: { score: 90, note: 'Kemitraan suportif untuk investasi generasi masa depan.' }, d: { score: 100, note: 'Visi jangka panjang pendidikan anak berada di frekuensi yang sama.' } },
    }
  },

  // PILAR 3: Resolusi Konflik & Manajemen Emosi
  {
    id: 'q5',
    pillar: 'conflict',
    title: 'Gaya Komunikasi Saat Sedang Berselisih Panas',
    malePrompt: 'Ketika terjadi pertengkaran hebat dan suasana memanas, reaksi spontanmu adalah:',
    femalePrompt: 'Ketika terjadi pertengkaran hebat dan suasana memanas, reaksi spontanmu adalah:',
    options: [
      { id: 'a', maleLabel: 'Butuh jeda (cooling down) 30-60 menit sendirian sebelum bicara dengan kepala dingin.', femaleLabel: 'Butuh jeda (cooling down) sejenak agar kata-kata tidak melukai saat emosi memuncak.' },
      { id: 'b', maleLabel: 'Harus diselesaikan detik itu juga, pantang tidur dalam kondisi masih mendiamkan.', femaleLabel: 'Ingin langsung dituntaskan, gelisah dan overthinking jika masalah digantung berlarut.' },
      { id: 'c', maleLabel: 'Fokus cari akar masalah logis dan solusi konkret, kesampingkan drama emosional.', femaleLabel: 'Validasi perasaan terlebih dahulu; rasa didengar dan dipeluk lebih utama sebelum cari solusi teknis.' },
      { id: 'd', maleLabel: 'Menghindar sementara, lalu mencairkan suasana dengan humor atau makanan sebelum bahas inti topik.', femaleLabel: 'Cari pelukan/kehangatan dulu untuk menurunkan tensi sebelum membedah masalah.' }
    ],
    matrix: {
      a: { a: { score: 95, note: 'Sama-sama menghargai waktu jeda demi rasionalitas dan kedamaian.' }, b: { score: 55, note: 'Titik rawan: Yang satu butuh ruang, yang satu merasa ditinggalkan/dicueki.' }, c: { score: 85, note: 'Waktu jeda membantu menata logika solusi secara objektif.' }, d: { score: 85, note: 'De-eskalasi bertahap yang menjaga stabilitas hubungan.' } },
      b: { a: { score: 55, note: 'Wajib bikin aturan: Jeda boleh asal ada batas waktu janji bicara kembali.' }, b: { score: 90, note: 'Komitmen tinggi menuntaskan masalah tanpa menunda beban batin.' }, c: { score: 70, note: 'Perlu kepekaan: hindari menuntut solusi saat emosi belum stabil.' }, d: { score: 75, note: 'Perlu kelembutan agar dorongan menuntaskan tidak terasa menekan.' } },
      c: { a: { score: 85, note: 'Kombinasi menenangkan diri lalu menyelesaikan problem inti.' }, b: { score: 70, note: 'Hati-hati: Pasangan butuh rasa aman emosi sebelum logika bekerja.' }, c: { score: 95, note: 'Duo pemecah masalah objektif dan berorientasi hasil.' }, d: { score: 80, note: 'Pendekatan logika yang dilembutkan oleh kehangatan afeksi.' } },
      d: { a: { score: 85, note: 'Trik mencairkan suasana efektif menurunkan tensi ego.' }, b: { score: 75, note: 'Pastikan masalah tidak sekadar disapu di bawah karpet.' }, c: { score: 80, note: 'Sinergi apik antara peredam suasana dan penyelesaian logis.' }, d: { score: 95, note: 'Kedekatan emosional menjadi jembatan pemulihan yang cepat.' } },
    }
  },
  {
    id: 'q6',
    pillar: 'conflict',
    title: 'Keterlibatan Pihak Ketiga (Keluarga / Sahabat)',
    malePrompt: 'Saat hubungan kalian mengalami kebuntuan berat, sejauh mana keterlibatan orang luar?',
    femalePrompt: 'Saat hubungan kalian mengalami kebuntuan berat, sejauh mana keterlibatan orang luar?',
    options: [
      { id: 'a', maleLabel: 'Tertutup rapat 100%: Aib dan konflik rumah tangga haram diceritakan ke siapapun.', femaleLabel: 'Tertutup rapat 100%: Masalah internal harus selesai di kamar kita berdua saja.' },
      { id: 'b', maleLabel: 'Boleh konseling profesional berbayar (psikolog/konselor pernikahan netral).', femaleLabel: 'Buka opsi ke psikolog pernikahan berlisensi agar ada fasilitator objektif.' },
      { id: 'c', maleLabel: 'Hanya orang tua/keluarga yang dituakan dan terbukti bijak sebagai juru damai.', femaleLabel: 'Hanya figur orang tua yang arif dan adil jika sudah darurat.' },
      { id: 'd', maleLabel: 'Boleh curhat ke satu sahabat terpercaya untuk sekadar meluapkan uneg-uneg.', femaleLabel: 'Punya safe space sahabat curhat untuk menjaga kewarasan emosi.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Benteng privasi rumah tangga kalian luar biasa kokoh.' }, b: { score: 80, note: 'Kerahasiaan terjaga, dan profesional tetap menjamin privasi.' }, c: { score: 70, note: 'Perlu kesepakatan apakah orang tua boleh tahu masalah dalam.' }, d: { score: 60, note: 'Berisiko bocor rahasia; sepakati batas curhat ke teman.' } },
      b: { a: { score: 80, note: 'Bisa disepakati: Konselor profesional terikat kode etik kerahasiaan.' }, b: { score: 100, note: 'Mindset modern dan dewasa: menghargai solusi ilmiah dan objektif.' }, c: { score: 80, note: 'Fleksibel antara kebijaksanaan adat/keluarga dan ilmu profesional.' }, d: { score: 75, note: 'Kombinasi dukungan profesional dan pertemanan terukur.' } },
      c: { a: { score: 70, note: 'Harus ada kriteria ketat kapan keluarga boleh dilibatkan.' }, b: { score: 80, note: 'Saling melengkapi pandangan keluarga dan ahli.' }, c: { score: 95, note: 'Saling menghormati pranata dan nasihat keluarga besar.' }, d: { score: 70, note: 'Jaga agar narasi masalah tidak bias di lingkaran luar.' } },
      d: { a: { score: 60, note: 'Perlu komitmen tidak membagikan hal sensitif hubungan ke kawan.' }, b: { score: 75, note: 'Kanal emosi pribadi yang tetap butuh panduan objektif.' }, c: { score: 70, note: 'Hindari bias opini luar yang memperkeruh suasana.' }, d: { score: 85, note: 'Saling memahami kebutuhan katarsis sosial, asal menjaga martabat pasangan.' } },
    }
  },

  // PILAR 4: Batasan Sosial & Privasi
  {
    id: 'q7',
    pillar: 'boundaries',
    title: 'Pertemanan Lawan Jenis & Batasan Sosial',
    malePrompt: 'Bagaimana batasan yang kamu harapkan terkait interaksi dengan lawan jenis setelah menikah?',
    femalePrompt: 'Bagaimana batasan yang kamu harapkan terkait interaksi dengan lawan jenis setelah menikah?',
    options: [
      { id: 'a', maleLabel: 'Ketat: Tidak ada jalan berdua/chat privat non-pekerjaan dengan lawan jenis.', femaleLabel: 'Ketat: Menjaga marwah hubungan; no hangout berdua & no curhat privat lawan jenis.' },
      { id: 'b', maleLabel: 'Transparan wajar: Boleh berteman/ngopi santai asal selalu izin dan saling kenal temannya.', femaleLabel: 'Terbuka sehat: Berteman biasa boleh, asalkan terbuka dan pasangan tahu konteksnya.' },
      { id: 'c', maleLabel: 'Kepercayaan penuh: Bebas bersosialisasi tanpa perlu laporan detail setiap saat.', femaleLabel: 'Kebebasan berbasis integritas: Percaya penuh tanpa harus selalu melapor.' },
      { id: 'd', maleLabel: 'Inklusif: Setiap pertemanan lawan jenis sebisa mungkin dibawa jadi teman bersama.', femaleLabel: 'Inklusif: Kenalkan ke pasangan dan jadikan lingkaran teman bersama.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Pagar proteksi loyalitas kalian sangat solid dan sehati.' }, b: { score: 75, note: 'Perlu kesepakatan batas tipis antara sosialisasi vs menjaga kenyamanan.' }, c: { score: 50, note: 'Titik rawan kecemburuan & rasa tidak aman; diskusikan batasan toleransi.' }, d: { score: 85, note: 'Sinergi aman karena pasangan selalu dilibatkan.' } },
      b: { a: { score: 75, note: 'Bisa berjalan baik dengan komitmen izin aktif dan keterbukaan.' }, b: { score: 100, note: 'Kedewasaan sosial yang harmonis: tidak mengekang tapi tetap saling menjaga.' }, c: { score: 80, note: 'Keseimbangan antara rasa percaya dan respek batas sosial.' }, d: { score: 95, note: 'Sangat harmonis dalam membangun pergaulan yang sehat bersama.' } },
      c: { a: { score: 50, note: 'Rentan salah paham. Butuh kompromi aturan main yang disepakati.' }, b: { score: 80, note: 'Rasa percaya diri tinggi dengan komunikasi yang berkala.' }, c: { score: 95, note: 'Tingkat kepercayaan mutual yang sangat tinggi dan rileks.' }, d: { score: 80, note: 'Tetap saling menghargai ruang sosial masing-masing.' } },
      d: { a: { score: 85, note: 'Strategi cerdas: mengubah potensi ancaman jadi pertemanan bersama.' }, b: { score: 95, note: 'Komunikasi sosial yang terbuka, hangat, dan inklusif.' }, c: { score: 80, note: 'Kombinasi ruang sosial yang ramah dan saling percaya.' }, d: { score: 100, note: 'Kalian menjadi satu tim sosial yang kompak di mata lingkungan.' } },
    }
  },
  {
    id: 'q8',
    pillar: 'boundaries',
    title: 'Ruang Pribadi (Me-Time) & Waktu Pasangan',
    malePrompt: 'Seberapa besar porsi "waktu sendiri/hobi pribadi" yang kamu perlukan dalam relasi?',
    femalePrompt: 'Seberapa besar porsi "waktu sendiri/hobi pribadi" yang kamu perlukan dalam relasi?',
    options: [
      { id: 'a', maleLabel: 'Kebutuhan tinggi: Wajib ada waktu rutin sendiri/dengan kawan sehobi tanpa diganggu.', femaleLabel: 'Kebutuhan tinggi: Butuh me-time rutin untuk me-recharge energi mental saya.' },
      { id: 'b', maleLabel: 'Moderat: Me-time secukupnya, mayoritas waktu luang lebih senang dihabiskan bersama.', femaleLabel: 'Moderat: Suka waktu sendiri sesekali, tapi prioritas tetap quality time berdua.' },
      { id: 'c', maleLabel: 'Kolektif: Mengutamakan kebersamaan kapanpun ada waktu luang di rumah.', femaleLabel: 'Dekat & lekat: Senang selalu mendampingi dan berbagi aktivitas berdua.' },
      { id: 'd', maleLabel: 'Fleksibel dinamis: Menyesuaikan beban kerja dan ritme kelelahan masing-masing.', femaleLabel: 'Fleksibel dinamis: Peka kapan pasangan butuh ruang sendiri vs butuh ditemani.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Saling memahami pentingnya ruang bernapas tanpa rasa curiga.' }, b: { score: 80, note: 'Bisa harmonis jika jadwal me-time dikomunikasikan hangat.' }, c: { score: 55, note: 'Rentan merasa diabaikan vs merasa terkekang. Wajib kompromi.' }, d: { score: 90, note: 'Kombinasi fleksibel yang menghargai kesehatan mental pribadi.' } },
      b: { a: { score: 80, note: 'Keseimbangan sehat antara ruang diri dan kehangatan berdua.' }, b: { score: 100, note: 'Irama kebersamaan yang ideal dan saling menikmati kehadiran.' }, c: { score: 85, note: 'Keduanya senang kebersamaan dengan sedikit jeda personal.' }, d: { score: 90, note: 'Sangat lentur menyesuaikan kebutuhan emosional harian.' } },
      c: { a: { score: 55, note: 'Butuh pemahaman bahwa me-time bukan berarti hilangnya rasa cinta.' }, b: { score: 85, note: 'Kemesraan tinggi dengan keterikatan emosi yang kuat.' }, c: { score: 95, note: 'Pasangan perekat tinggi: bahagia selalu beriringan.' }, d: { score: 80, note: 'Peka terhadap momen intim dan saling mendukung.' } },
      d: { a: { score: 90, note: 'Empati tinggi terhadap ritme energi emosional pasangan.' }, b: { score: 90, note: 'Saling pengertian tanpa tuntutan kehadiran yang kaku.' }, c: { score: 80, note: 'Dapat menyesuaikan diri dengan hangat saat dibutuhkan.' }, d: { score: 100, note: 'Kedewasaan emosional yang tinggi dalam membaca kebutuhan pasangan.' } },
    }
  },

  // PILAR 5: Visi Jangka Panjang & Spiritualitas
  {
    id: 'q9',
    pillar: 'vision',
    title: 'Domisili & Tempat Tinggal Ideal Masa Depan',
    malePrompt: 'Dalam 5 tahun ke depan, apa skenario tempat tinggal yang menjadi impianmu?',
    femalePrompt: 'Dalam 5 tahun ke depan, apa skenario tempat tinggal yang menjadi impianmu?',
    options: [
      { id: 'a', maleLabel: 'Mandiri mutlak: Rumah/kontrakan sendiri sejak hari pertama, terpisah dari orang tua/mertua.', femaleLabel: 'Mandiri mutlak: Wajib tinggal berdua terpisah dari orang tua/mertua manapun.' },
      { id: 'b', maleLabel: 'Terbuka tinggal sementara di rumah orang tua/mertua untuk menabung beli rumah.', femaleLabel: 'Toleran tinggal sementara di keluarga asal ada batas waktu dan privasi jelas.' },
      { id: 'c', maleLabel: 'Mobilitas tinggi: Siap merantau ke luar kota/luar negeri mengikuti peluang karir terbaik.', femaleLabel: 'Siap diajak merantau demi karir dan petualangan hidup keluarga baru.' },
      { id: 'd', maleLabel: 'Dekat keluarga besar: Memilih menetap dekat orang tua demi menjaga silaturahmi & bantuan anak.', femaleLabel: 'Memilih satu kota dengan orang tua agar saling menjenguk dan ada support system.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Kalian sepakat total dalam membangun privasi dan fondasi mandiri.' }, b: { score: 70, note: 'Diskusikan batas toleransi waktu jika memang harus berhemat.' }, c: { score: 85, note: 'Sama-sama mandiri dan siap membangun rumah tangga di manapun.' }, d: { score: 75, note: 'Perlu batasan jarak: mandiri tapi tidak memutus hubungan keluarga.' } },
      b: { a: { score: 70, note: 'Perlu timeline tegas agar tidak menjadi gesekan mertua-menantu.' }, b: { score: 95, note: 'Pragmatis demi target aset jangka panjang.' }, c: { score: 75, note: 'Sesuaikan dengan kesiapan finansial dan kenyamanan psikologis.' }, d: { score: 90, note: 'Sinergi hangat dengan keluarga besar sebagai support system.' } },
      c: { a: { score: 85, note: 'Jiwa mandiri dan keberanian membuka lembaran baru bersama.' }, b: { score: 75, note: 'Butuh kesepakatan kapan menetap stabil vs bergerak.' }, c: { score: 100, note: 'Jiwa petualang dan visi ekspansi masa depan kalian selaras sempurna!' }, d: { score: 60, note: 'Dilema antara karir di luar vs ikatan kuat keluarga kampung halaman.' } },
      d: { a: { score: 75, note: 'Jaga batas privasi agar campur tangan keluarga tidak merusak keintiman.' }, b: { score: 90, note: 'Keluarga besar menjadi pilar penguat yang disepakati.' }, c: { score: 60, note: 'Butuh kompromi besar antara ambisi merantau vs kenyamanan zona keluarga.' }, d: { score: 100, note: 'Satu suara dalam memelihara kehangatan lingkaran keluarga inti.' } },
    }
  },
  {
    id: 'q10',
    pillar: 'vision',
    title: 'Peranan Spiritualitas & Ibadah dalam Rumah Tangga',
    malePrompt: 'Bagaimana kamu membayangkan kepemimpinan dan rutinitas spiritual di rumah?',
    femalePrompt: 'Bagaimana kamu membayangkan ritme spiritual dan nilai agama di rumah tangga?',
    options: [
      { id: 'a', maleLabel: 'Fondasi utama & disiplin: Rutin ibadah bersama, kajian, dan target keagamaan konsisten.', femaleLabel: 'Fondasi utama & disiplin: Suami jadi imam spiritual aktif dan rutin membimbing.' },
      { id: 'b', maleLabel: 'Substansi & akhlak: Lebih fokus pada integritas, empati, dan adab keseharian dibanding formalitas.', femaleLabel: 'Nilai moral & karakter: Mengutamakan kebaikan hati, kejujuran, dan kehangatan.' },
      { id: 'c', maleLabel: 'Saling mengingatkan tanpa paksaan: Spiritualitas adalah perjalanan intim masing-masing.', femaleLabel: 'Tumbuh bersama organik: Saling mengajak dengan santai tanpa tekanan dogma kaku.' },
      { id: 'd', maleLabel: 'Tradisi & ritual teratur: Menjaga ibadah wajib dan peringatan hari besar keagamaan keluarga.', femaleLabel: 'Komitmen teratur: Konsisten di kewajiban dasar dan tradisi keluarga yang menenangkan.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Visi spiritual kokoh dan saling menuntun menuju nilai tertinggi.' }, b: { score: 75, note: 'Padukan antara kedisiplinan syariat dan kelembutan akhlak.' }, c: { score: 70, note: 'Perlu kesabaran dalam menyelaraskan ritme percepatan spiritual.' }, d: { score: 85, note: 'Kedua belah pihak menjaga komitmen ibadah yang terstruktur.' } },
      b: { a: { score: 75, note: 'Kombinasi cantik antara ritual tertib dan perilaku welas asih.' }, b: { score: 100, note: 'Harmoni tinggi dalam mengedepankan etika, budi pekerti, dan cinta kasih.' }, c: { score: 90, note: 'Pendekatan humanis dan mendalam dalam penghayatan nilai hidup.' }, d: { score: 85, note: 'Fondasi nilai moral yang menyejukkan suasana rumah tangga.' } },
      c: { a: { score: 70, note: 'Hindari rasa menghakimi jika tingkat rutinitas belum sejajar.' }, b: { score: 90, note: 'Ruang tumbuh yang lapang dan saling menghormati kedewasaan pribadi.' }, c: { score: 95, note: 'Toleransi spiritual yang sehat dan tidak saling membebani.' }, d: { score: 80, note: 'Menghargai tradisi sambil tetap memberi ruang batin yang nyaman.' } },
      d: { a: { score: 85, note: 'Konsistensi ibadah yang memberi kepastian dan ketenangan rumah.' }, b: { score: 85, note: 'Keseimbangan antara rutinitas tradisi dan keluhuran budi.' }, c: { score: 80, note: 'Praktik keagamaan yang terukur tanpa tekanan berlebih.' }, d: { score: 100, note: 'Keluarga dengan pegangan tradisi yang tenang dan stabil.' } },
    }
  },
  {
    id: 'q11',
    pillar: 'financial',
    title: 'Dukungan Karir Pasangan & Kesetaraan Ambisi',
    malePrompt: 'Jika karir pasangan melesat dan berpenghasilan lebih besar atau butuh waktu lembur, bagaimana sikapmu?',
    femalePrompt: 'Bagaimana ekspektasimu terkait ambisi karir pribadi setelah berkeluarga?',
    options: [
      { id: 'a', maleLabel: 'Bangga & siap support penuh, termasuk jika saya harus mengambil lebih banyak peran rumah.', femaleLabel: 'Ingin terus berkarya/berbisnis maksimal dengan dukungan suportif dari suami.' },
      { id: 'b', maleLabel: 'Dukung karir pasangan selama tugas utama rumah tangga dan anak tetap terkontrol aman.', femaleLabel: 'Tetap bekerja teratur tapi keluarga dan anak tetap prioritas utama nomor satu.' },
      { id: 'c', maleLabel: 'Lebih nyaman jika saya tetap menjadi pencari nafkah utama demi martabat peran kepala keluarga.', femaleLabel: 'Bahagia dan fokus menjadi ratu rumah tangga jika suami mampu mencukupi dengan baik.' },
      { id: 'd', maleLabel: 'Kemitraan bisnis/proyek bersama: Lebih suka jika kami membangun usaha bersama.', femaleLabel: 'Senang jika bisa berkolaborasi bisnis atau proyek karir bareng pasangan.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Duo progresif: saling memberdayakan tanpa insecure ego.' }, b: { score: 85, note: 'Dukungan penuh yang diimbangi kesadaran waktu keluarga.' }, c: { score: 65, note: 'Beda filosofi pembagian ambisi; perlu diskusi peran identitas.' }, d: { score: 90, note: 'Visi kolaborasi yang sinergis dan saling mengangkat.' } },
      b: { a: { score: 80, note: 'Kompromi jadwal yang sehat agar karir dan rumah tangga selaras.' }, b: { score: 100, note: 'Prioritas keluarga tetap nomor satu dengan ruang aktualisasi diri.' }, c: { score: 85, note: 'Harmoni peran yang menempatkan kehangatan rumah di garis depan.' }, d: { score: 85, note: 'Keseimbangan ritme kerja dan kebersamaan keluarga.' } },
      c: { a: { score: 55, note: 'Potensi friksi peran maskulinitas/feminitas; wajib bicarakan ekspektasi karir.' }, b: { score: 85, note: 'Pola peran teratur yang saling menghormati tanggung jawab.' }, c: { score: 100, note: 'Pilar peran tradisional yang mantap dan saling melengkapi secara natural.' }, d: { score: 75, note: 'Perlu kejelasan pembagian wewenang dalam kepemimpinan.' } },
      d: { a: { score: 90, note: 'Visi kemitraan karir yang ambisius dan saling percaya.' }, b: { score: 85, note: 'Sinergi kerja cerdas untuk masa depan keluarga.' }, c: { score: 75, note: 'Kombinasi usaha mandiri dan ketenteraman rumah tangga.' }, d: { score: 100, note: 'Power couple: perpaduan sinergi otak dan hati dalam membangun imperium bersama.' } },
    }
  },
  {
    id: 'q12',
    pillar: 'vision',
    title: 'Manajemen Krisis & Komitmen Jangka Panjang',
    malePrompt: 'Saat menghadapi ujian hidup terberat (misal krisis ekonomi mendadak atau sakit berat), apa jangkar komitmenmu?',
    femalePrompt: 'Saat menghadapi ujian hidup terberat (misal krisis ekonomi mendadak atau sakit berat), apa jangkar komitmenmu?',
    options: [
      { id: 'a', maleLabel: 'Janji suci seumur hidup: Bertahan apapun yang terjadi, saling topang hingga nafas terakhir.', femaleLabel: 'Komitmen mutlak: Dalam suka dan duka tetap setia mengarungi badai bersama.' },
      { id: 'b', maleLabel: 'Pendekatan taktis: Fokus survival solusi, saling menjaga kesehatan mental tanpa menyalahkan.', femaleLabel: 'Solutif dan saling menguatkan mental, fokus mencari jalan keluar realistis.' },
      { id: 'c', maleLabel: 'Kekuatan spiritual: Berserah dan yakin semua cobaan ada hikmah penempa derajat.', femaleLabel: 'Doa dan kepasrahan batin: Yakin pertolongan Tuhan hadir bagi yang bersabar.' },
      { id: 'd', maleLabel: 'Dukungan jejaring: Terbuka mencari bantuan keluarga dan relasi agar tidak karam sendirian.', femaleLabel: 'Solidaritas gotong royong: Berani membuka diri meminta bantuan sebelum hancur.' }
    ],
    matrix: {
      a: { a: { score: 100, note: 'Kedalaman cinta dan loyalitas tanpa syarat yang sejati (Gottman Sound House).' }, b: { score: 90, note: 'Kombinasi keteguhan hati dan ketenangan berpikir strategis.' }, c: { score: 90, note: 'Ikatan janji yang diperkuat oleh keimanan batin.' }, d: { score: 85, note: 'Keteguhan komitmen yang didukung jejaring sosial yang sehat.' } },
      b: { a: { score: 90, note: 'Saling menyokong: ada jangkar kesetiaan dan ada navigator solusi.' }, b: { score: 100, note: 'Dua orang dewasa tangguh yang tidak panik saat badai menghantam.' }, c: { score: 85, note: 'Ihtiar maksimal yang diiringi kepasrahan tawakal.' }, d: { score: 90, note: 'Resiliensi tinggi menghadapi berbagai guncangan kehidupan.' } },
      c: { a: { score: 90, note: 'Kedamaian batin dan kesetiaan yang saling memayungi di masa sulit.' }, b: { score: 85, note: 'Doa yang diiringi langkah pemecahan masalah konkret.' }, c: { score: 100, note: 'Ketenteraman spiritual bersama yang menjadi perisai dari keputusasaan.' }, d: { score: 85, note: 'Penerimaan tulus yang membuka jalan pertolongan sekitar.' } },
      d: { a: { score: 85, note: 'Kerendahan hati mencari solusi untuk menyelamatkan bahtera bersama.' }, b: { score: 90, note: 'Cepat tanggap, pragmatis, dan realistis di masa krisis.' }, c: { score: 85, note: 'Kombinasi ikhtiar sosial dan ketenangan batin.' }, d: { score: 95, note: 'Jejaring resiliensi yang kokoh untuk bangkit bersama kembali.' } },
    }
  }
];
