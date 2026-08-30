export const wedding = {
  couple: {
    shortName: "Bas & Dila",
    groomName: "Bas",
    brideName: "Dila",
    profiles: [
      {
        role: "Mempelai Pria",
        name: "M Taufik Baskoro",
        parentsLabel: "Putra dari pasangan",
        parents: "Bapak Alm. Zulkarnain & Ibu Tri Puji Astuti",
        image: "/images/wedding/mempelai_pria.jpg",
        imagePosition: "62% center",
      },
      {
        role: "Mempelai Wanita",
        name: "Fadhilah Ramadhani",
        parentsLabel: "Putri dari pasangan",
        parents: "Bapak Efrilianto & Ibu Ida",
        image: "/images/wedding/mempelai_wanita.jpg",
        imagePosition: "88% center",
      },
    ],
  },
  date: {
    display: "26 Desember 2026",
    weekday: "Sabtu",
  },
  location: {
    city: "Simalungun",
    country: "Indonesia",
    mapLabel: "Peta lokasi utama di Simalungun",
  },
  images: {
    hero: "/images/wedding/hero.jpg",
    rsvp: "/gallery/9.jpg",
    map: "/images/wedding/map.svg",
    story: [
      { date: "Desember 2018", title: "Pertemuan Pertama", text: "Di sebuah kedai kopi kecil di sudut Jakarta, hujan deras memaksa kami berbagi meja. Tidak ada yang spesial pada awalnya, hanya sapaan canggung dan buku yang tertukar.", image: "/images/wedding/story-coffee.svg", shape: "rounded-2xl" },
      { date: "Juli 2021", title: "Petualangan Bersama", text: "Kami memutuskan untuk mendaki Rinjani bersama. Di atas awan, dengan lelah yang mendera, kami menyadari bahwa kami saling melengkapi dalam setiap langkah yang sulit.", image: "/images/wedding/story-mountain.svg", shape: "rounded-t-full rounded-b-2xl" },
      { date: "November 2023", title: "Sebuah Pertanyaan", text: "Di tempat yang sama saat kami pertama kali bertemu, dengan cincin sederhana dan hati yang berdebar, sebuah Ya diucapkan, memulai babak baru dalam hidup kami.", image: "/images/wedding/story-proposal.svg", shape: "rounded-full" },
    ],
  },
  home: {
    eyebrow: "Pernikahan Dari",
    heroAlt: "Foto Bas dan Dila",
    openLabel: "Buka Undangan",
  },
  couplePage: {
    title: "Sang Mempelai",
    intro: "Dengan penuh rasa syukur dan memohon ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
    profilesLabel: "Profil mempelai",
  },
  events: [
    { title: "Akad Nikah", subtitle: "Upacara Suci", time: "08:00 WIB - 10:00 WIB", place: "Masjid Raya Kebayoran", address: "Jl. Pangeran Antasari No. 10, Jakarta Selatan", mapUrl: "https://maps.google.com" },
    { title: "Resepsi", subtitle: "Perayaan & Ramah Tamah", time: "11:00 WIB - Selesai", place: "The Glasshouse, Dharmawangsa", address: "Jl. Brawijaya Raya No. 26, Jakarta Selatan", mapUrl: "https://maps.google.com" },
  ],
  eventPage: {
    title: "Detail Acara",
    heroAlt: "Ilustrasi suasana acara pernikahan",
    mapTitle: "Lokasi Utama",
    mapAlt: "Peta lokasi utama di Simalungun",
    parkingNote: "Tersedia area parkir yang luas di kedua lokasi. Kami menyarankan untuk datang 30 menit sebelum acara dimulai.",
    mapLabel: "Lihat Peta",
  },
  storyPage: {
    title: "Kisah Kami",
    intro: "Sebuah perjalanan yang diawali dengan secangkir kopi dan diakhiri dengan janji suci.",
    ctaTitle: "Jadilah Bagian dari Babak Selanjutnya",
    ctaText: "Kami tidak sabar untuk merayakan hari bahagia ini bersama Anda.",
    ctaLabel: "RSVP Sekarang",
  },
  rsvpPage: {
    title: "Kehadiran",
    imageAlt: "Ilustrasi undangan pernikahan",
    intro: "Kami sangat berharap Anda dapat bergabung dalam hari bahagia kami. Mohon konfirmasi kehadiran Anda di bawah ini.",
    giftsTitle: "Kado Pernikahan",
    giftsIntro: "Doa restu Anda adalah kado terindah bagi kami. Jika ingin memberikan tanda kasih, Anda dapat melalui:",
    gifts: [
      { title: "Honeymoon Fund", description: "Rekening BCA / QRIS", href: "#", kind: "bank" },
      { title: "Williams Sonoma", description: "Toko Perabotan Rumah", href: "#", kind: "store" },
    ],
  },
  rsvpForm: {
    nameLabel: "Nama Lengkap",
    namePlaceholder: "Masukkan nama Anda",
    emailLabel: "Email",
    emailPlaceholder: "nama@email.com",
    attendanceLabel: "Kehadiran",
    attending: "Dengan senang hati hadir",
    declining: "Maaf, tidak dapat hadir",
    notesLabel: "Pesan & Doa",
    optionalLabel: "Opsional",
    notesPlaceholder: "Tinggalkan pesan untuk kami...",
    submitLabel: "Kirim Konfirmasi",
    successTitle: "Terima kasih!",
    successText: "Konfirmasi Anda sudah tercatat di perangkat ini.",
    resetLabel: "Kirim jawaban lain",
  },
  galleryPage: {
    title: "Galeri Foto",
    description: "Momen-momen indah perjalanan cinta kami.",
    emptyText: "Belum ada foto di galeri.",
    imageAlt: "Momen pernikahan",
    enlargeLabel: "Perbesar foto",
    dialogLabel: "Foto dalam ukuran penuh",
    closeLabel: "Tutup foto",
    moreLabel: "Lebih Banyak",
  },
  metadata: {
    title: "Bas & Dila | Undangan Pernikahan",
    description: "Dengan penuh sukacita, kami mengundang Anda untuk merayakan hari bahagia kami.",
  },
} as const;

export const weddingImages = wedding.images;
export const coupleProfiles = wedding.couple.profiles;

export const navItems = [
  { href: "#mempelai", label: "Mempelai", icon: "couple" },
  { href: "#cerita", label: "Cerita", icon: "story" },
  { href: "#acara", label: "Acara", icon: "event" },
  { href: "#galeri", label: "Galeri", icon: "gallery" },
  { href: "#rsvp", label: "RSVP", icon: "mail" },
] as const;