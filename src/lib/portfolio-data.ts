export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  icon: string;
  accent: string;
  description: string;
  highlights: string[];
};

export const profile = {
  name: "Alex Carter",
  title: "Dedicated Professional",
  tagline:
    "Hardworking, reliable, and people-focused. Bringing hands-on experience across agriculture, martial arts instruction, and retail.",
  location: "Utah, United States",
  email: "hello@alexcarter.dev",
  phone: "(801) 555-0142",
  summary:
    "I'm a motivated young professional with a track record of showing up, learning fast, and doing the job right. From early mornings on the farm to leading karate classes and helping customers at the market, I thrive in environments where hard work and a positive attitude make a real difference.",
  stats: [
    { label: "Years Experience", value: "7+" },
    { label: "Roles Held", value: "3" },
    { label: "Martial Arts", value: "Active" },
    { label: "Work Ethic", value: "100%" },
  ],
};

export const experiences: Experience[] = [
  {
    company: "Hamilton Egg Business",
    role: "Farm Operations Assistant",
    period: "2018 — 2021",
    location: "Local Family Farm",
    icon: "egg",
    accent: "amber",
    description:
      "Started young helping run a local egg-producing operation. Learned responsibility, routine, and the value of early mornings.",
    highlights: [
      "Daily care, feeding, and health monitoring of laying hens",
      "Collected, cleaned, sorted, and packaged eggs for sale",
      "Managed inventory and restocked supply at local retailers",
      "Built steady relationships with repeat customers and vendors",
    ],
  },
  {
    company: "Bobby Lawrence Karate",
    role: "Martial Arts Instructor",
    period: "2022 — Present",
    location: "Bobby Lawrence Karate Studio",
    icon: "karate",
    accent: "rose",
    description:
      "Currently teaching and mentoring students of all ages in karate, helping them build discipline, confidence, and technique.",
    highlights: [
      "Lead group classes for kids, teens, and adult students",
      "Mentor students toward belt promotions and personal goals",
      "Demonstrate techniques, forms, and sparring fundamentals",
      "Foster a respectful, encouraging, and disciplined dojo culture",
    ],
  },
  {
    company: "Day's Market Place",
    role: "Store Associate & Customer Service",
    period: "Retail Experience",
    location: "Day's Market Place",
    icon: "store",
    accent: "emerald",
    description:
      "Front-line retail experience serving customers, keeping shelves full, and keeping the store running smoothly.",
    highlights: [
      "Provided friendly, efficient customer service at the register",
      "Stocked shelves, rotated inventory, and maintained displays",
      "Handled cash transactions accurately and balanced the till",
      "Supported opening and closing duties for the store",
    ],
  },
];

export type SkillGroup = {
  category: string;
  icon: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "People & Communication",
    icon: "users",
    skills: [
      "Customer Service",
      "Public Speaking",
      "Teaching & Mentoring",
      "Team Collaboration",
      "Active Listening",
    ],
  },
  {
    category: "Operations & Reliability",
    icon: "wrench",
    skills: [
      "Inventory Management",
      "Cash Handling",
      "Time Management",
      "Attention to Detail",
      "Opening / Closing",
    ],
  },
  {
    category: "Discipline & Craft",
    icon: "shield",
    skills: [
      "Martial Arts Instruction",
      "Physical Fitness",
      "Self-Discipline",
      "Goal Setting",
      "Leadership",
    ],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
