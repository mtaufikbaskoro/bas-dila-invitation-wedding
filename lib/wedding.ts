export const weddingImages = {
  hero: "/images/wedding/hero.jpg",
  rsvp: "/images/wedding/rsvp.svg",
} as const;

export const coupleProfiles = [
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
] as const;

export const navItems = [
  { href: "/mempelai", label: "Mempelai", icon: "couple" },
  { href: "/cerita", label: "Cerita", icon: "story" },
  { href: "/acara", label: "Acara", icon: "event" },
  { href: "/galeri", label: "Galeri", icon: "gallery" },
  { href: "/rsvp", label: "RSVP", icon: "mail" },
] as const;