import type { LucideIcon } from "lucide-react";
import {
  Egg,
  Dumbbell,
  Store,
  Youtube,
  Clock,
  Bot,
  Globe,
  Code2,
  Rocket,
  FileText,
  Palette,
  Braces,
  KeyRound,
  QrCode,
  Timer,
  Type,
  Ruler,
  Wrench,
  GraduationCap,
  Award,
  Sword,
  Users,
  Layers,
} from "lucide-react";

export const profile = {
  name: "Jeffrey Hamilton",
  firstName: "Jeffrey",
  tagline: "Digital Designer · Blackbelt · Builder of things that just work.",
  intro:
    "I'm 17. I've been working since I was old enough to carry an egg basket — and I haven't really stopped since.",
  location: "Utah, United States",
  email: "jeffreyscotthamilton639@gmail.com",
  // Pull-quote used in the About area
  quote:
    "I like making things that just work — no fluff, no broken buttons, no excuses.",
};

export const socials = {
  github: "https://github.com/JeffreyHamilton6399",
  linkedin: "https://www.linkedin.com/in/jeffrey-s-hamilton/",
  buymeacoffee: "https://buymeacoffee.com/jeffreyscof",
  youtube: "https://www.youtube.com/@Jeffrey_Creates",
  youtubeVR: "https://www.youtube.com/@JeffreyVR6399",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#tools", label: "Tools" },
  { href: "#youtube", label: "YouTube" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// Every section id that participates in scroll-spy
export const sectionIds = [
  "about",
  "ai-dev",
  "tools",
  "youtube",
  "projects",
  "experience",
  "education",
  "skills",
  "contact",
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  highlights: string[];
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
    role: "Martial Arts Instructor",
    period: "2022 — Present",
    location: "Bobby Lawrence Karate",
    icon: Dumbbell,
    accent: "rose",
    description:
      "I teach students of every age — from kids who can't stand still to adults who finally have time to try. Currently a blackbelt.",
    highlights: [
      "Lead group classes for kids, teens, and adults",
      "Coach students toward belt promotions and real goals",
      "Run sparring, forms, and fundamentals week to week",
      "Hold the line on discipline without killing the fun",
    ],
  },
  {
    company: "Day's Market Place",
    role: "Store Associate",
    period: "Retail",
    location: "Day's Market Place",
    icon: Store,
    accent: "emerald",
    description:
      "Front of house. I'm the person who actually knows where things are and won't roll their eyes when you ask.",
    highlights: [
      "Ran the register and kept the till balanced",
      "Stocked, rotated, and faced product before open",
      "Opened and closed the store on shift",
      "Turned grumpy customers into regulars",
    ],
  },
];

export type AiDevFeature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const aiDevFeatures: AiDevFeature[] = [
  {
    icon: Bot,
    title: "AI-Assisted Development",
    body: "I work alongside AI tools to design, build, and ship real products — not just prompting, but actually reading the output, debugging it, and making it better.",
  },
  {
    icon: Globe,
    title: "Browser-First Tools",
    body: "All 9 of my shipped tools run entirely in the browser. No servers, no databases, no user data leaving the device. Privacy by design, not as an afterthought.",
  },
  {
    icon: Code2,
    title: "Python",
    body: "Comfortable in Python for scripting, automation, and personal projects that scratch an itch.",
  },
  {
    icon: Rocket,
    title: "Rapid Shipping",
    body: "I've gone from idea to deployed app multiple times — using Vercel, GitHub, and modern JS frameworks to move fast without breaking things.",
  },
];

export type Tool = {
  name: string;
  blurb: string;
  icon: LucideIcon;
};

export const tools: Tool[] = [
  { name: "MarkRight", blurb: "Live Markdown editor with instant preview.", icon: FileText },
  { name: "Huebox", blurb: "Color palette generator with contrast checks.", icon: Palette },
  { name: "JSONLab", blurb: "Format, validate, and explore JSON.", icon: Braces },
  { name: "PassForge", blurb: "Password generator with a strength meter.", icon: KeyRound },
  { name: "QRMe", blurb: "Turn any link or text into a QR code.", icon: QrCode },
  { name: "Chronos", blurb: "Convert timezones for meetings in a click.", icon: Clock },
  { name: "Countly", blurb: "Live word and character counter.", icon: Type },
  { name: "Pomofocus", blurb: "Pomodoro timer with a built-in task list.", icon: Timer },
  { name: "ConvertIt", blurb: "Fast unit converter — length, weight, temp.", icon: Ruler },
];

export type YoutubeCard = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const youtubeCards: YoutubeCard[] = [
  {
    title: "Nearly 3,000 Subscribers",
    body: "Grew a YouTube channel from zero to nearly 3,000 subscribers — learning video editing, scripting, thumbnails, and audience retention along the way.",
    icon: Youtube,
  },
  {
    title: "Crunch-Time Creator",
    body: "YouTube taught me how to produce under pressure — planning, filming, editing, and publishing on tight deadlines.",
    icon: Clock,
  },
];

export type Project = {
  name: string;
  tag: string;
  description: string;
  icon: LucideIcon;
  link?: string;
};

export const projects: Project[] = [
  {
    name: "Browser Tool Suite",
    tag: "9 privacy-first tools",
    description:
      "A collection of nine tools that run 100% in the browser. No accounts, no tracking, no data leaving your machine. Built so they'd actually be useful, not just demos.",
    icon: Wrench,
  },
  {
    name: "YouTube Content Engine",
    tag: "Script → shoot → edit → ship",
    description:
      "The full pipeline I use to take a video from an idea in notes to a published upload — scripting, thumbnail design, editing, and a posting rhythm I can actually keep.",
    icon: Youtube,
  },
  {
    name: "Dojo Lesson Planner",
    tag: "Built for the karate studio",
    description:
      "A small tool I built to plan karate classes for different age groups and belt levels — because teaching off the back of a napkin gets old fast.",
    icon: Sword,
  },
];

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
    title: "Self-Taught Web Development",
    org: "Projects, docs, and shipping",
    period: "Ongoing",
    icon: Code2,
  },
];

export type SkillGroup = {
  category: string;
  icon: LucideIcon;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Build",
    icon: Code2,
    skills: [
      "JavaScript / TypeScript",
      "React & Next.js",
      "Tailwind CSS",
      "Python",
      "Framer Motion",
    ],
  },
  {
    category: "Create",
    icon: Layers,
    skills: [
      "Video Editing",
      "Scripting",
      "Thumbnail Design",
      "Audience Retention",
      "Content Strategy",
    ],
  },
  {
    category: "Show Up",
    icon: Users,
    skills: [
      "Martial Arts Instruction",
      "Public Speaking",
      "Customer Service",
      "Leadership",
      "Time Management",
    ],
  },
];

export const contactSocials = [
  { label: "GitHub", href: socials.github, key: "github" as const },
  { label: "LinkedIn", href: socials.linkedin, key: "linkedin" as const },
  { label: "Buy Me a Coffee", href: socials.buymeacoffee, key: "coffee" as const },
  { label: "YouTube", href: socials.youtube, key: "youtube" as const },
];
