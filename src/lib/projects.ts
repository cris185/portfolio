export type ProjectId = "sevenlever" | "chohealth" | "choplanner" | "neurostock";

export interface Project {
  id: ProjectId;
  gradient: string;
  glow: string;
  href: string;
  repo: string;
  /** Card thumbnail (portrait), served from MinIO */
  coverImage?: string;
  /** Gallery of wide screenshots for the detail page, served from MinIO */
  screenshots?: { label: string; src: string }[];
  mode: "light" | "dark";
  /** Hero band background (top of the detail page, before the diagonal seam) */
  heroBg: string;
  /** Body background after the seam */
  bodyBg: string;
  textPrimary: string;
  textSecondary: string;
  accentText: string;
  pillBg: string;
  pillBorder: string;
  techStack: string[];
  hasProblem: boolean;
  hasStats?: boolean;
  demoAccounts?: { label: string; email: string; password: string }[];
  /** Engineering Mode: deeper technical content pulled from the project's own README */
  engineering?: {
    fullStack: { layer: string; tech: string }[];
  };
}

export const projects: Project[] = [
  {
    id: "sevenlever",
    gradient:
      "linear-gradient(165deg, var(--sevenlever-1), var(--sevenlever-2) 60%, var(--sevenlever-3))",
    glow: "var(--sevenlever-gold)",
    href: "https://seven-lever.cristianpuentes.com",
    repo: "https://github.com/cris185/seven-lever",
    mode: "dark",
    heroBg: "#0f0d1a",
    bodyBg: "#16213e",
    textPrimary: "#f7f6f2",
    textSecondary: "#9aa3c4",
    accentText: "#f4c430",
    pillBg: "#f4c4301a",
    pillBorder: "#f4c4303a",
    techStack: ["Next.js", "TypeScript", "Prisma", "Express", "Framer Motion", "Zustand"],
    hasProblem: false,
  },
  {
    id: "chohealth",
    gradient:
      "linear-gradient(155deg, var(--chohealth-1), var(--chohealth-2) 60%, var(--chohealth-3))",
    glow: "var(--chohealth-2)",
    href: "https://chohealth.cristianpuentes.com",
    repo: "https://github.com/cris185/CHOHEALTH",
    coverImage: "https://minio-api.cristianpuentes.com/portfolio-media/covers/chohealth-card.jpg",
    screenshots: [
      { label: "Services", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/chohealth-services.jpg" },
      { label: "Patient Dashboard", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/chohealth-patient.jpg" },
      { label: "Doctor Dashboard", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/chohealth-doctor.jpg" },
      { label: "Appointments", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/chohealth-appointments.jpg" },
    ],
    mode: "light",
    heroBg: "#0b1b3a",
    bodyBg: "#eaf2ff",
    textPrimary: "#0b1b3a",
    textSecondary: "#45577e",
    accentText: "#1d4ed8",
    pillBg: "#1d4ed80f",
    pillBorder: "#1d4ed82a",
    techStack: ["Django", "Next.js", "PostgreSQL", "Stripe", "Docker"],
    hasProblem: true,
    hasStats: true,
    demoAccounts: [
      { label: "Doctor", email: "elena.rodriguez@chohealth.test", password: "Demo1234!" },
      { label: "Patient", email: "patient@example.com", password: "Demo1234!" },
    ],
    engineering: {
      fullStack: [
        { layer: "Backend", tech: "Django 6, Django REST Framework, SimpleJWT" },
        { layer: "Database", tech: "PostgreSQL — self-hosted on my own VPS" },
        { layer: "Media storage", tech: "MinIO (self-hosted, S3-compatible)" },
        { layer: "Admin UI", tech: "Django Jazzmin" },
        { layer: "Payments", tech: "Stripe (Checkout, Setup Intents, webhooks), PayPal (Orders API)" },
        { layer: "Email", tech: "SendGrid" },
        { layer: "Frontend", tech: "Next.js 16 (App Router), React 19, TypeScript" },
        { layer: "UI", tech: "shadcn/ui, Tailwind CSS v4, Framer Motion" },
        { layer: "i18n", tech: "next-intl (English / Spanish)" },
        { layer: "Deployment", tech: "Docker + Coolify, self-hosted VPS" },
      ],
    },
  },
  {
    id: "choplanner",
    gradient:
      "linear-gradient(200deg, var(--choplanner-1), var(--choplanner-2) 65%, var(--choplanner-3))",
    glow: "var(--choplanner-2)",
    href: "https://cho-planner.cristianpuentes.com",
    repo: "https://github.com/cris185/cho-planner",
    mode: "light",
    heroBg: "#1c1740",
    bodyBg: "#f3f1fc",
    textPrimary: "#241c52",
    textSecondary: "#5b5480",
    accentText: "#534ab7",
    pillBg: "#534ab70f",
    pillBorder: "#534ab72a",
    techStack: ["Next.js 16", "React 19", "Prisma", "NextAuth", "Vercel AI SDK", "Google Calendar API"],
    hasProblem: true,
    demoAccounts: [{ label: "Demo", email: "demo@choplanner.local", password: "demo1234" }],
  },
  {
    id: "neurostock",
    gradient:
      "linear-gradient(200deg, var(--neurostock-1), var(--neurostock-2) 70%, var(--neurostock-3))",
    glow: "var(--neurostock-3)",
    href: "https://neurostock.cristianpuentes.com",
    repo: "https://github.com/cris185/NeuroStock",
    mode: "dark",
    heroBg: "#071522",
    bodyBg: "#0f2136",
    textPrimary: "#f2f6fa",
    textSecondary: "#8fa3bb",
    accentText: "#00d4ff",
    pillBg: "#00d4ff14",
    pillBorder: "#00d4ff2e",
    techStack: ["Django REST", "TensorFlow / Keras", "LSTM", "React", "Chart.js"],
    hasProblem: false,
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
