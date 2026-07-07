import type { LucideIcon } from "lucide-react";
import {
  Egg,
  Dumbbell,
  Store,
  Youtube,
  Bot,
  Palette,
  Cpu,
  Award,
  Users,
  Type,
  Gamepad2,
  Clapperboard,
  Building2,
  GraduationCap,
  Swords,
  Package,
  Newspaper,
  MessagesSquare,
  Music,
  Church,
} from "lucide-react";

export const profile = {
  name: "Jeffrey Hamilton",
  firstName: "Jeffrey",
  tagline: "Digital Designer · Blackbelt · Builder of things that just work.",
  intro:
    "I'm 17. I've been working since I was old enough to carry an egg basket — and I haven't really stopped since.",
  location: "Utah, United States",
  email: "jeffreyscotthamilton639@gmail.com",
  quote:
    "I like making things that just work — no fluff, no broken buttons, no excuses.",
};

export const socials = {
  github: "https://github.com/JeffreyHamilton6399",
  linkedin: "https://www.linkedin.com/in/jeffrey-s-hamilton/",
  buymeacoffee: "https://buymeacoffee.com/jeffreyscof",
  youtube: "https://www.youtube.com/@Jeffrey_Creates",
  youtubeVR: "https://www.youtube.com/@JeffreyVR6399",
  modrinth: "https://modrinth.com/user/JeffreyHamilton",
};

// The sidebar tracks exactly these 5 sections, in this order.
export const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#youtube", label: "YouTube", id: "youtube" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export const sectionIds = navLinks.map((n) => n.id);

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  highlights: string[];
  website?: { label: string; url: string };
};

export const experiences: Experience[] = [
  {
    company: "Hamilton Egg Business",
    role: "Farm Operations",
    period: "2018 — 2021",
    location: "Family farm",
    icon: Egg,
    accent: "amber",
    description:
      "Where it started. I was young, but the chickens didn't care how old I was — they needed feeding either way.",
    highlights: [
      "Daily care, feeding, and health checks on the flock",
      "Collected, cleaned, graded, and packaged eggs for sale",
      "Restocked shelves and kept repeat vendors happy",
      "Learned that consistency beats motivation, every single time",
    ],
  },
  {
    company: "Bobby Lawrence Karate",
    role: "Intern & Assistant Instructor",
    period: "Mar 2025 — Present",
    location: "Bobby Lawrence Karate",
    icon: Dumbbell,
    accent: "rose",
    description:
      "Earned my black belt after failing the first test and coming back stronger. Now I help teach younger students — running drills, demonstrating technique, and making sure the newer kids actually want to come back next week.",
    highlights: [
      "Assist in classes across age groups and belt levels",
      "Run drills and demonstrate technique for newer students",
      "Helped turn first-test failure into a black belt",
      "Keep the dojo welcoming so kids stick with it",
    ],
    website: { label: "oremkarate.com", url: "https://oremkarate.com/" },
  },
  {
    company: "Day's Market Place",
    role: "Bagger → Cashier in Training",
    period: "Apr 2026 — Present",
    location: "Day's Market Place",
    icon: Store,
    accent: "emerald",
    description:
      "Part-time customer service and grocery work. Started as a bagger, currently cross-training as a cashier. Day-to-day involves keeping things moving, helping customers, and staying sharp under pressure during busy shifts.",
    highlights: [
      "Bagging, cart runs, and keeping front-end flow moving",
      "Cross-training on the register as a cashier",
      "Customer service through the busy shifts",
      "Staying sharp when the line gets long",
    ],
    website: { label: "daysmarket.com", url: "https://www.daysmarket.com/" },
  },
  {
    company: "The Church of Jesus Christ of Latter-day Saints",
    role: "Volunteer",
    period: "2021 — Present",
    location: "Community",
    icon: Church,
    accent: "amber",
    description:
      "Volunteering through my church — helping with community service projects, events, and whatever needs doing. It's taught me to show up when it's not about me.",
    highlights: [
      "Community service projects and events",
      "Showing up consistently for others",
      "Learning to lead and follow",
    ],
  },
];

// ---- Tools: single hero banner (replaces the old 9-card grid) ----
export const toolsBanner = {
  headline: "9 Privacy-First Browser Tools",
  subheadline:
    "Everything runs on your device. No uploads. No servers. No accounts.",
  pills: [
    "ShrinkRay",
    "ConvertIt",
    "MergePDF",
    "Cutout",
    "DevToys",
    "ExifErase",
    "LinkClean",
    "FileBeam",
    "BlurIt",
  ],
  cta: "Explore All Tools",
  link: "https://jeffrey-hamilton-tools.vercel.app",
};

// ---- Projects ----
export type ProjectStatus = "live" | "school" | "progress";
export type ProjectMedia =
  | { kind: "none" }
  | { kind: "animations" }
  | { kind: "robotics" }
  | { kind: "cad"; src: string };
export type Project = {
  name: string;
  description: string;
  link?: string;
  tag: string;
  status: ProjectStatus;
  icon: LucideIcon;
  // Override the default "View Project" button label
  ctaLabel?: string;
  // Open the link in a new tab via window.open (for local html files)
  openNewTab?: boolean;
  // Inline media shown inside the card body
  media?: ProjectMedia;
  // Grid span on desktop (6-col base).
  span: { col: number; row: number };
  // Compact cards render as half-width on mobile (2-col grid),
  // hiding the description for a clean icon + name + button look.
  mobileCompact?: boolean;
};

export const projects: Project[] = [
  {
    name: "Minecraft Mods",
    description:
      "My Minecraft mods and modpacks — Clean & Fast, KeybindSync, SmartChat Macros, and more. All on Modrinth.",
    link: "https://modrinth.com/user/JeffreyHamilton",
    ctaLabel: "Visit Modrinth",
    tag: "Minecraft · Mods",
    status: "live",
    icon: Package,
    span: { col: 2, row: 1 },
  },
  {
    name: "Echo Heist",
    description: "A single-file browser game. No install — just open and play.",
    // Update to hosted URL when available
    link: "/echo-heist.html",
    openNewTab: true,
    ctaLabel: "Play",
    tag: "Live Project · Playable",
    status: "live",
    icon: Gamepad2,
    span: { col: 2, row: 1 },
  },
  {
    name: "PixelParty",
    description:
      "Jump in. Claim your canvas. Make something chaotic.",
    link: "https://pixelparty-eight.vercel.app",
    tag: "Live Project",
    status: "live",
    icon: Palette,
    span: { col: 2, row: 1 },
    mobileCompact: true,
  },
  {
    name: "SpellFall",
    description:
      "A browser-based word game built for fun and replayability. Type fast, think faster.",
    link: "https://spellfall.vercel.app",
    tag: "Live Project",
    status: "live",
    icon: Type,
    span: { col: 3, row: 1 },
  },
  {
    name: "Bulletin",
    description:
      "A classifieds board — post, browse, and find what you need.",
    link: "https://bulletin-classifieds.vercel.app/",
    tag: "Live Project",
    status: "live",
    icon: Newspaper,
    span: { col: 3, row: 1 },
    mobileCompact: true,
  },
  {
    name: "Counterpoint",
    description: "An AI model that spars with you about certain topics.",
    link: "https://counterpoint-six.vercel.app/",
    tag: "Live Project",
    status: "live",
    icon: MessagesSquare,
    span: { col: 2, row: 1 },
    mobileCompact: true,
  },
  {
    name: "Arcadian King",
    description:
      "A full Unity game project built as part of my digital media coursework.",
    link: "https://drive.google.com/drive/folders/15Z6Z5LzGXDxmJrTZn3WV1Nbb9D4_GRyx",
    tag: "School Project · Unity",
    status: "school",
    icon: Gamepad2,
    span: { col: 2, row: 1 },
  },
  {
    name: "Avatar Archive",
    description:
      "Everything Avatar: The Last Airbender in one place — episodes, lore, books, characters. Email me for access 😉",
    link: "https://jeffreyhamilton6399.github.io/AvatarArchive/",
    tag: "Live Project",
    status: "live",
    icon: Swords,
    span: { col: 2, row: 1 },
  },
  {
    name: "Music",
    description: "Original tracks — beats, loops, and full songs.",
    link: "https://drive.google.com/drive/folders/1FEBMf_0n5hFSyTncZp58bVYQxpnPn_-g",
    tag: "Creative",
    status: "live",
    icon: Music,
    span: { col: 2, row: 1 },
  },
  {
    name: "School Animations",
    description:
      "Motion graphics and animations created for Timpview's digital media program.",
    link: "https://drive.google.com/drive/folders/1O0zvlk09MEzY3aKWY9ww-3gbG3ieK3HN",
    tag: "School Project",
    status: "school",
    icon: Clapperboard,
    media: { kind: "animations" },
    span: { col: 2, row: 1 },
  },
  {
    name: "CAD Housing",
    description:
      "Architectural design projects built in CAD software for my Architectural Design coursework.",
    link: "https://drive.google.com/drive/folders/1r71Wdb5uY_n4Q6YD1srzxSA3QBqubkqv",
    ctaLabel: "View Project",
    tag: "School Project",
    status: "school",
    icon: Building2,
    // Drop cad-housing.pdf into /public — used as card background only (rendered to png)
    media: { kind: "cad", src: "/cad-housing.png" },
    span: { col: 2, row: 1 },
  },
  {
    name: "Robotics Builds",
    description:
      "Physical robotics projects from my Robotics 1 & 2 courses.",
    link: "https://drive.google.com/drive/folders/16tLQJV6DddTNoeT5w3bn1fgl0eAHB9K5",
    ctaLabel: "View Project",
    tag: "School Project",
    status: "school",
    icon: Bot,
    media: { kind: "robotics" },
    span: { col: 6, row: 1 },
  },
];

export const projectsTeaser = "";

// ---- YouTube: two compact channels (VR + main) ----
export type YoutubeChannel = {
  label: string;
  copy: string;
  url: string;
};

export const youtubeChannels: YoutubeChannel[] = [
  {
    label: "VR Channel",
    copy: "My VR-focused channel — grown to over 3,000 subscribers.",
    url: socials.youtubeVR,
  },
  {
    label: "Main Channel",
    copy: "My main channel — building in public, tutorials, and random projects.",
    url: socials.youtube,
  },
];

// ---- Education ----
export type Education = {
  title: string;
  org: string;
  period: string;
  icon: LucideIcon;
};

export const education: Education[] = [
  {
    title: "High School Diploma",
    org: "Local High School",
    period: "Expected 2026",
    icon: GraduationCap,
  },
  {
    title: "Black Belt",
    org: "Bobby Lawrence Karate",
    period: "Earned through years of training",
    icon: Award,
  },
  {
    title: "YouTube Creator Milestone",
    org: "~3,000 subscribers",
    period: "Self-driven",
    icon: Youtube,
  },
  {
    title: "Digital Media Coursework",
    org: "Timpview High School",
    period: "Ongoing",
    icon: Clapperboard,
  },
];

// ---- Certificates carousel ----
// Drop certificate PDFs into /public/certificates/
// Name them: cert-1.pdf, cert-2.pdf, etc.
// PNG previews (cert-1.png, cert-2.png) are rendered first-page screenshots.
// Update the certificates array below with name and filename.
// Drive folder: https://drive.google.com/drive/folders/10O-VkD9rSmgf5kZ1UqJyy7lvyIOEgNCX
export type Certificate = {
  name: string;
  pdf: string;
  preview: string;
};

export const certificates: Certificate[] = [
  { name: "Architectural Design 2", pdf: "/certificates/cert-1.pdf", preview: "/certificates/cert-1.png" },
  { name: "CAD Architectural Design I", pdf: "/certificates/cert-2.pdf", preview: "/certificates/cert-2.png" },
  { name: "Computer Programming 1", pdf: "/certificates/cert-3.pdf", preview: "/certificates/cert-3.png" },
  { name: "Computer Programming 2 (Java)", pdf: "/certificates/cert-4.pdf", preview: "/certificates/cert-4.png" },
  { name: "Digital Media 1", pdf: "/certificates/cert-5.pdf", preview: "/certificates/cert-5.png" },
  { name: "Digital Media 2", pdf: "/certificates/cert-6.pdf", preview: "/certificates/cert-6.png" },
  { name: "Game Development Fundamentals", pdf: "/certificates/cert-7.pdf", preview: "/certificates/cert-7.png" },
  { name: "Robotics 1", pdf: "/certificates/cert-8.pdf", preview: "/certificates/cert-8.png" },
  { name: "Unmanned Aerial Systems", pdf: "/certificates/cert-9.pdf", preview: "/certificates/cert-9.png" },
];
