export type ProjectId = "sevenlever" | "chohealth" | "choplanner" | "neurostock";

export interface TreeNode {
  name: string;
  comment?: string;
  children?: TreeNode[];
}

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
  demoAccounts?: {
    /** `identifierLabel` names the field the login form actually asks for ("Email", "Username") since it differs per project */
    accounts?: { label: string; identifierLabel: string; identifier: string; password: string }[];
    /** Optional larger grid of role-specific demo accounts (e.g. every seeded doctor), shown below `accounts` */
    doctors?: { specKey: string; name: string; email: string; password: string }[];
    /** Link to the payment provider's own test-card documentation, shown alongside `stripeCards` */
    stripeDocsUrl?: string;
  };
  /** Full documentation, transcribed verbatim from the project's own GitHub README */
  docs?: {
    fullStack: { layer: string; tech: string }[];
    architectureDiagram?: string;
    /** Folder-structure diagram, rendered as a styled file tree, for projects without a mermaid source */
    architectureTree?: TreeNode[];
    /** Sequence diagrams for key request/response flows (e.g. auth, a core action). `key` looks up a translated title. */
    dataFlows?: { key: string; mermaid: string }[];
    /** Key implementation pieces worth calling out — title and code stay in English, like any other code sample */
    components?: { title: string; code: string }[];
    /** A simple data model table for projects too small for full ER diagrams */
    dataModel?: { table: string; columns: { field: string; type: string }[] };
    /** A security-relevant config snippet (e.g. JWT lifetimes), shown verbatim below translated `docs.security.steps` */
    securityConfigSnippet?: string;
    schemaDiagrams?: { key: string; mermaid: string }[];
    /** An ML model's layer stack, rendered as a styled vertical flow diagram */
    modelLayers?: { title: string; detail: string }[];
    /** A representative code snippet (e.g. a data-leakage-prevention pattern), shown verbatim */
    modelCodeSnippet?: string;
    apiExampleRequest?: string;
    apiExampleResponse?: string;
    /** Ordered setup steps; `key` looks up the translated title/note in `docs.gettingStarted.stepTitles`/`stepNotes` */
    gettingStarted?: {
      steps: { key: string; commands?: string; env?: string }[];
    };
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
    coverImage: "https://minio-api.cristianpuentes.com/portfolio-media/covers/sevenlever-card.jpg",
    screenshots: [
      { label: "Gameplay", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/sevenlever-gameplay.jpg" },
      { label: "Seal hit", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/sevenlever-seal.jpg" },
      { label: "Defeat", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/sevenlever-defeat.jpg" },
      { label: "History", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/sevenlever-history.jpg" },
    ],
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
    docs: {
      fullStack: [
        { layer: "Next.js 14 (App Router)", tech: "SSR where useful, modern routing structure" },
        { layer: "TypeScript", tech: "Typed game logic on both frontend and backend" },
        { layer: "Tailwind CSS", tech: "Fast utilities, no heavy custom CSS" },
        { layer: "shadcn/ui", tech: "Headless components on top of Tailwind" },
        { layer: "Framer Motion", tech: "Dice roll, seal hit, health bar, crying-loss animations" },
        { layer: "Howler.js", tech: "Dice rolling, hit, and crying sound effects" },
        { layer: "Zustand", tech: "Lightweight in-memory state for the active game" },
        { layer: "Axios", tech: "Calls to the backend" },
        { layer: "Node.js 20 LTS + Express", tech: "REST API server" },
        { layer: "Prisma", tech: "Schema-first ORM, migrations, type-safe queries" },
        { layer: "PostgreSQL", tech: "Relational storage for finished games/rounds/rolls" },
        { layer: "Zod", tech: "Request body validation on the backend" },
      ],
      architectureDiagram: `flowchart LR
    FE["Frontend<br/>Next.js 14 (App Router)<br/>TypeScript · port 3000"]
    BE["Backend<br/>Node.js + Express<br/>TypeScript · port 4000"]
    DB[("PostgreSQL<br/>via Prisma ORM")]

    FE <-->|"HTTP/REST"| BE
    BE --> DB`,
      architectureTree: [
        {
          name: "seven-lever/",
          children: [
            {
              name: "frontend/",
              comment: "Next.js 14",
              children: [
                {
                  name: "app/",
                  children: [
                    { name: "page.tsx", comment: "Home / game setup (names, mode, seals)" },
                    { name: "game/[id]/page.tsx", comment: "Active game screen" },
                    { name: "history/page.tsx", comment: "Match history and stats" },
                  ],
                },
                {
                  name: "components/",
                  children: [
                    { name: "ui/", comment: "shadcn/ui components" },
                    {
                      name: "game/",
                      children: [
                        { name: "Dice.tsx", comment: "Dice with Framer Motion animation" },
                        { name: "HealthBar.tsx", comment: "Seal (health) bar" },
                        { name: "SealAnimation.tsx", comment: "The hit animation" },
                        { name: "PlayerPanel.tsx", comment: "Each player's panel" },
                      ],
                    },
                    { name: "layout/" },
                  ],
                },
                { name: "store/gameStore.ts", comment: "Zustand — in-memory game state" },
                {
                  name: "lib/",
                  children: [
                    { name: "api.ts", comment: "Axios instance + backend calls" },
                    { name: "gameLogic.ts", comment: "Pure game logic, no side effects" },
                  ],
                },
                { name: "types/game.ts", comment: "Shared types (GameMode, RoundResult, etc.)" },
              ],
            },
            {
              name: "backend/",
              comment: "Node.js + Express",
              children: [
                {
                  name: "src/",
                  children: [
                    { name: "index.ts", comment: "Entry point — Express config + middlewares" },
                    {
                      name: "routes/",
                      children: [{ name: "games.ts" }, { name: "rounds.ts" }, { name: "stats.ts" }],
                    },
                    { name: "controllers/", comment: "Logic for each endpoint" },
                    { name: "services/", comment: "Business logic, separate from controllers" },
                    { name: "middlewares/validate.ts", comment: "Zod validation middleware" },
                    { name: "prisma/client.ts", comment: "PrismaClient singleton" },
                  ],
                },
                { name: "prisma/schema.prisma", comment: "Database schema" },
              ],
            },
          ],
        },
      ],
      schemaDiagrams: [
        {
          key: "main",
          mermaid: `erDiagram
    Player ||--o{ Game : "plays as player1"
    Player ||--o{ Game : "plays as player2"
    Player ||--o{ Round : loses
    Game ||--o{ Round : contains
    Round ||--o{ Roll : contains

    Player {
        string id PK
        string name
    }
    Game {
        string id PK
        string player1Id FK
        string player2Id FK
        int maxSeals "configurable 3-10"
        enum mode "CARDS / SEALS"
        enum status "IN_PROGRESS / FINISHED"
        string winnerId "nullable"
    }
    Round {
        string id PK
        string gameId FK
        int roundNumber
        string activePlayer "player1 / player2"
        int targetNumber "set by the first valid roll"
        enum result "WON / LOST"
        string loserId FK
    }
    Roll {
        string id PK
        string roundId FK
        int die1
        int die2
        int total
    }`,
        },
      ],
      apiExampleRequest: `{
  "player1Name": "Cristian",
  "player2Name": "Sebas",
  "mode": "SEALS",
  "maxSeals": 5
}`,
      apiExampleResponse: `{
  "id": "clx1a2b3c",
  "player1": { "id": "clx1...", "name": "Cristian" },
  "player2": { "id": "clx2...", "name": "Sebas" },
  "mode": "SEALS",
  "maxSeals": 5,
  "status": "IN_PROGRESS",
  "createdAt": "2026-09-03T18:00:00.000Z"
}`,
      gettingStarted: {
        steps: [
          {
            key: "db",
            commands: `docker compose up -d`,
            env: `DATABASE_URL=postgresql://seven:lever123@postgres:5432/seven_lever
PORT=4000`,
          },
          {
            key: "backend",
            commands: `cd backend
npm install
npx prisma migrate dev
npm run dev`,
          },
          {
            key: "frontend",
            commands: `cd frontend
npm install
npm run dev`,
            env: `NEXT_PUBLIC_API_URL=http://localhost:4000/api`,
          },
        ],
      },
    },
  },
  {
    id: "choplanner",
    gradient:
      "linear-gradient(200deg, var(--choplanner-1), var(--choplanner-2) 65%, var(--choplanner-3))",
    glow: "var(--choplanner-2)",
    href: "https://cho-planner.cristianpuentes.com",
    repo: "https://github.com/cris185/cho-planner",
    coverImage: "https://minio-api.cristianpuentes.com/portfolio-media/covers/choplanner-card.jpg",
    screenshots: [
      { label: "Board", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/choplanner-board.jpg" },
      { label: "Assistant", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/choplanner-settings.jpg" },
      { label: "Task detail", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/choplanner-task.jpg" },
      { label: "Notes", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/choplanner-notes.jpg" },
    ],
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
    demoAccounts: {
      accounts: [{ label: "Demo", identifierLabel: "Email", identifier: "demo@choplanner.local", password: "demo1234" }],
    },
    docs: {
      fullStack: [
        { layer: "Next.js 16 (App Router)", tech: "React 19, TypeScript — framework and typing" },
        { layer: "Tailwind CSS 4", tech: "Mobile-first responsive styling" },
        { layer: "shadcn/ui + Radix UI", tech: "Accessible, headless component primitives" },
        { layer: "dnd-kit", tech: "Drag and drop with touch sensors" },
        { layer: "next-themes", tech: "Light/dark mode without flicker" },
        { layer: "DiceBear", tech: "Assistant avatar generation" },
        { layer: "react-markdown + remark-gfm", tech: "Markdown rendering for notes" },
        { layer: "PWA", tech: "Web App Manifest + service worker, installable with offline support" },
        { layer: "Server Actions", tech: "CRUD for all entities" },
        { layer: "Route Handlers", tech: "Chat streaming, Google OAuth callback, sync" },
        { layer: "Prisma 6", tech: "ORM" },
        { layer: "PostgreSQL 17", tech: "Database" },
        { layer: "Auth.js (NextAuth v5)", tech: "Credentials-based authentication" },
        { layer: "bcryptjs", tech: "Password hashing" },
        { layer: "Vercel AI SDK", tech: "Single multi-provider adapter (Claude, GPT, Gemini)" },
        { layer: "Zod", tech: "Structured-output contract and validation" },
        { layer: "googleapis", tech: "OAuth 2.0 with incremental syncToken" },
        { layer: "AES-256-GCM", tech: "Encryption of API keys and refresh tokens at rest" },
        { layer: "Docker Compose", tech: "Local Postgres for development" },
      ],
      architectureDiagram: `flowchart LR
    subgraph instance["Your instance — works with nothing external"]
        NEXT["Next.js<br/>UI + API (RSC, Server Actions)"]
        DB[("PostgreSQL<br/>your data")]
        VAULT["Credentials vault<br/>API keys + refresh tokens<br/>AES-256-GCM, never leave the instance"]
        NEXT --> DB
        NEXT --> VAULT
    end

    GCAL[["Google Calendar<br/>optional · OAuth 2.0"]]
    LLM[["LLM provider<br/>optional · your key<br/>Claude / GPT / Gemini"]]

    instance -.->|"optional"| GCAL
    instance -.->|"optional"| LLM`,
      architectureTree: [
        {
          name: "cho-planner/",
          children: [
            {
              name: "prisma/",
              children: [
                { name: "schema.prisma", comment: "10 models + TaskStatus enum" },
                { name: "seed.ts", comment: "sample data (demo user)" },
              ],
            },
            {
              name: "src/",
              children: [
                {
                  name: "app/",
                  children: [
                    { name: "(auth)/", comment: "login and registration" },
                    { name: "(dashboard)/", comment: "board, sprints, notes, chat, settings" },
                    { name: "api/", comment: "chat (streaming), google (OAuth), calendar (sync)" },
                  ],
                },
                { name: "components/", comment: "ui, board, chat, assistant, note" },
                {
                  name: "lib/",
                  children: [
                    { name: "crypto.ts", comment: "AES-256-GCM encrypt/decrypt" },
                    { name: "ai/", comment: "registry, schemas (Zod), generate, provider" },
                    { name: "google/", comment: "oauth, calendar" },
                  ],
                },
                { name: "server/actions/", comment: "Server Actions (CRUD per entity)" },
                { name: "validations/", comment: "input schemas" },
              ],
            },
            { name: "docker-compose.yml", comment: "local Postgres" },
            { name: ".env.example", comment: "variables template (no secrets)" },
            { name: "package.json" },
          ],
        },
      ],
      dataFlows: [
        {
          key: "aiGeneration",
          mermaid: `flowchart TD
    A["App defines the contract<br/>(prompt + Zod schema)"] --> B["Single adapter (Vercel AI SDK)"]
    B --> C1["Claude — native tool use"]
    B --> C2["GPT — structured outputs"]
    B --> C3["Gemini — response schema"]
    C1 --> D{"Validate against<br/>the Zod schema"}
    C2 --> D
    C3 --> D
    D -->|"invalid"| E["Retry — max 3<br/>re-inject the validation error"]
    E --> B
    D -->|"valid"| F["Structurally identical data"]
    F --> G[("Database")]
    F --> H["Board UI"]
    F --> I["Google Calendar"]`,
        },
      ],
      schemaDiagrams: [
        {
          key: "main",
          mermaid: `erDiagram
    User ||--o| Assistant : has
    User ||--o{ Workspace : owns
    User ||--o{ Note : writes
    User ||--o{ ApiKey : configures
    User ||--o| GoogleAccount : connects
    Workspace ||--o{ Task : contains
    Workspace ||--o{ Sprint : contains
    Workspace ||--o{ Note : groups
    Sprint ||--o{ Task : groups
    Task ||--o{ Subtask : "breaks down"
    Task ||--o| CalendarEvent : syncs
    Sprint ||--o| CalendarEvent : syncs
    Note ||--o| CalendarEvent : syncs

    User {
        string id PK
        string email UK
        string firstName
        string lastName
        string defaultProvider
    }
    Task {
        string id PK
        string title
        string description
        int weight
        enum status
        boolean aiGenerated
        int position
        datetime dueDate
    }
    Subtask {
        string id PK
        string title
        string note
        int weight
        boolean done
    }
    CalendarEvent {
        string id PK
        string googleEventId UK
        datetime startsAt
        boolean synced
    }`,
        },
      ],
      gettingStarted: {
        steps: [
          {
            key: "install",
            commands: `git clone https://github.com/cris185/cho-planner.git
cd cho-planner
npm install`,
          },
          {
            key: "env",
            commands: `cp .env.example .env`,
            env: `DATABASE_URL=postgresql://taskmanager:taskmanager@localhost:5433/taskmanager

AUTH_SECRET=                  # openssl rand -base64 32
AUTH_URL=http://localhost:3000

ENCRYPTION_KEY=                # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

GOOGLE_CLIENT_ID=              # optional — Google Calendar
GOOGLE_CLIENT_SECRET=

DEFAULT_LLM_PROVIDER=          # optional — default demo LLM
DEFAULT_LLM_API_KEY=`,
          },
          {
            key: "db",
            commands: `docker compose up -d`,
          },
          {
            key: "schema",
            commands: `npx prisma migrate dev      # creates the tables
npm run db:seed             # loads a sample workspace (optional)`,
          },
          {
            key: "dev",
            commands: `npm run dev`,
          },
        ],
      },
    },
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
    demoAccounts: {
      accounts: [{ label: "Patient", identifierLabel: "Email", identifier: "patient@example.com", password: "Demo1234!" }],
      stripeDocsUrl: "https://docs.stripe.com/testing",
      doctors: [
        { specKey: "generalMedicine", name: "Dr. Elena Rodriguez", email: "elena.rodriguez@chohealth.test", password: "Test1234!" },
        { specKey: "cardiology", name: "Dr. Marcus Chen", email: "marcus.chen@chohealth.test", password: "Test1234!" },
        { specKey: "pediatrics", name: "Dr. Sarah Okonkwo", email: "sarah.okonkwo@chohealth.test", password: "Test1234!" },
        { specKey: "dermatology", name: "Dr. David Mueller", email: "david.mueller@chohealth.test", password: "Test1234!" },
        { specKey: "gynecology", name: "Dr. Aisha Patel", email: "aisha.patel@chohealth.test", password: "Test1234!" },
        { specKey: "orthopedics", name: "Dr. Roberto Silva", email: "roberto.silva@chohealth.test", password: "Test1234!" },
        { specKey: "neurology", name: "Dr. Hannah Schmidt", email: "hannah.schmidt@chohealth.test", password: "Test1234!" },
        { specKey: "psychiatry", name: "Dr. James Okafor", email: "james.okafor@chohealth.test", password: "Test1234!" },
        { specKey: "laboratory", name: "Alex Vargas", email: "lab.staff.alpha@chohealth.test", password: "Test1234!" },
        { specKey: "laboratory", name: "Beatriz Lima", email: "lab.staff.beta@chohealth.test", password: "Test1234!" },
      ],
    },
    docs: {
      fullStack: [
        { layer: "Backend", tech: "Django 6, Django REST Framework, djangorestframework-simplejwt" },
        { layer: "Database", tech: "PostgreSQL (production, via dj-database-url), SQLite (local fallback)" },
        { layer: "Media storage", tech: "Cloudinary" },
        { layer: "Static files", tech: "Whitenoise" },
        { layer: "Admin UI", tech: "Django Jazzmin" },
        { layer: "Payments", tech: "Stripe (Checkout, Setup Intents, webhooks), PayPal (Orders API)" },
        { layer: "Email", tech: "SendGrid" },
        { layer: "Frontend", tech: "Next.js 16 (App Router), React 19, TypeScript" },
        { layer: "UI", tech: "shadcn/ui, @base-ui/react, Tailwind CSS v4, Framer Motion" },
        { layer: "i18n", tech: "next-intl (English/Spanish)" },
      ],
      architectureDiagram: `flowchart LR
    subgraph client["Client"]
        FE["Next.js 16 (App Router)<br/>React 19 + TypeScript"]
    end

    subgraph api["Django REST API"]
        AUTH["userauths<br/>JWT authentication"]
        DOC["doctor"]
        PAT["patient"]
        BASE["base<br/>scheduling / clinical core"]
        BILL["billing"]
    end

    DB[("PostgreSQL (prod)<br/>SQLite (local)")]
    MEDIA[("Cloudinary<br/>media storage")]
    STRIPE[["Stripe"]]
    PAYPAL[["PayPal"]]
    SENDGRID[["SendGrid"]]

    FE -->|"REST, JWT bearer token"| AUTH
    FE --> DOC
    FE --> PAT
    FE --> BASE
    FE --> BILL

    AUTH --> DB
    DOC --> DB
    PAT --> DB
    BASE --> DB
    BILL --> DB

    DOC --> MEDIA
    PAT --> MEDIA
    BASE --> MEDIA

    BILL -->|"Checkout, Setup Intents, webhook"| STRIPE
    BILL -->|"Orders API"| PAYPAL
    AUTH -->|"Transactional email"| SENDGRID`,
      schemaDiagrams: [
        {
          key: "identity",
          mermaid: `erDiagram
    USER ||--o| DOCTOR : "has profile"
    USER ||--o| PATIENT : "has profile"
    DOCTOR ||--o{ DOCTOR_QUALIFICATION : lists
    DOCTOR ||--o{ DOCTOR_SCHEDULE : defines

    USER {
        string sid
        string email UK
        string user_type "Patient / Doctor / Superuser"
        string otp
    }
    DOCTOR {
        string sid
        string specialization
        int years_of_experience
        decimal average_rating "denormalized, synced via signal"
        int total_reviews
    }
    PATIENT {
        string sid
        date date_of_birth
        string blood_group
        string stripe_customer_id
    }
    DOCTOR_QUALIFICATION {
        string degree
        string institution
        int year
    }
    DOCTOR_SCHEDULE {
        int day_of_week
        time start_time
        time end_time
        time break_start
        time break_end
    }`,
        },
        {
          key: "clinical",
          mermaid: `erDiagram
    DOCTOR ||--o{ APPOINTMENT : attends
    PATIENT ||--o{ APPOINTMENT : books
    BRANCH ||--o{ APPOINTMENT : hosts
    SERVICE ||--o{ APPOINTMENT : "billed as"
    APPOINTMENT ||--o| MEDICAL_RECORD : produces
    APPOINTMENT ||--o| REVIEW : "rated by"
    MEDICAL_RECORD ||--o| PRESCRIPTION : issues
    MEDICAL_RECORD ||--o{ LAB_ORDER : requests
    PRESCRIPTION ||--o{ PRESCRIPTION_ITEM : contains
    MEDICATION ||--o{ PRESCRIPTION_ITEM : "referenced by"
    LAB_ORDER ||--o{ LAB_ORDER_ITEM : contains
    LAB_TEST ||--o{ LAB_ORDER_ITEM : "referenced by"
    LAB_ORDER_ITEM ||--o| LAB_RESULT : produces

    APPOINTMENT {
        string sid
        datetime date
        string status "Unpaid / Confirmed / In Progress / Completed / Cancelled / No Show"
        string mode "In-Person / Virtual"
        string cancelled_by
        int reschedule_count
    }
    MEDICAL_RECORD {
        string sid
        text diagnosis
        text treatment_plan
    }
    PRESCRIPTION_ITEM {
        string medication_name
        boolean is_system_medication
        string dosage
        string frequency
        int duration_days
        string delivery_method
    }
    LAB_ORDER {
        string sid
        string status
        boolean is_prescribed
    }
    LAB_ORDER_ITEM {
        boolean is_claimed
    }
    LAB_RESULT {
        text result_text
        file result_file
    }
    REVIEW {
        int rating "1 to 5"
        text comment
    }`,
        },
        {
          key: "pharmacy",
          mermaid: `erDiagram
    PATIENT ||--o{ MEDICINE_ORDER : places
    BRANCH ||--o{ MEDICINE_ORDER : "picked up at"
    MEDICINE_ORDER ||--o{ MEDICINE_ORDER_ITEM : contains
    MEDICATION ||--o{ MEDICINE_ORDER_ITEM : "referenced by"
    MEDICINE_ORDER ||--o| MEDICINE_DELIVERY : "tracked by"
    PRESCRIPTION_ITEM ||--o| MEDICINE_ORDER_ITEM : fulfills

    MEDICINE_ORDER {
        string sid
        string status
        decimal subtotal
        decimal shipping_fee
        decimal total
        string pickup_code UK "set only once Paid"
    }
    MEDICINE_ORDER_ITEM {
        int quantity
        decimal unit_price
        decimal total
    }
    MEDICINE_DELIVERY {
        string stage "picked_up ... delivered"
        datetime started_at
        datetime delivered_at
    }`,
        },
        {
          key: "billing",
          mermaid: `erDiagram
    PATIENT ||--o{ INVOICE : "billed to"
    APPOINTMENT ||--o| INVOICE : "billed by (nullable)"
    MEDICINE_ORDER ||--o| INVOICE : "billed by (nullable)"
    INVOICE ||--o{ INVOICE_LINE_ITEM : contains
    INVOICE ||--o{ PAYMENT : "paid via"
    PAYMENT ||--o{ REFUND : "refunded by"
    INVOICE ||--o{ BILLING_DISPUTE : disputed

    INVOICE {
        string sid
        string invoice_number UK "INV-YYYYMMDD-NNNN"
        decimal total
        decimal amount_paid
        decimal balance_due
        string status
    }
    INVOICE_LINE_ITEM {
        string description
        int quantity
        decimal unit_price
        decimal total "price snapshot"
    }
    PAYMENT {
        string sid
        decimal amount
        string payment_method "cash / card / bank_transfer / stripe / paypal"
        string status
        string gateway_charge_id
        json gateway_response
    }
    REFUND {
        decimal amount
        string reason
        string status
    }
    BILLING_DISPUTE {
        decimal amount_disputed
        string reason
        string status
    }`,
        },
      ],
      gettingStarted: {
        steps: [
          {
            key: "backend",
            commands: `cd backend\\CHOHEALT_BACK

python -m venv venv
.\\venv\\Scripts\\Activate.ps1

pip install -r requirements.txt

# create backend\\CHOHEALT_BACK\\.env — see variables below

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin
python manage.py runserver`,
            env: `SECRET_KEY=
DEBUG=True
ALLOWED_HOSTS=
CORS_ALLOWED_ORIGINS=http://localhost:3000
FRONTEND_URL=http://localhost:3000

DATABASE_URL=                 # optional; falls back to local SQLite
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_MODE=sandbox            # or "live"

SENDGRID_API_KEY=
DEFAULT_FROM_EMAIL=
EMAIL_DOMAIN=`,
          },
          {
            key: "frontend",
            commands: `cd frontend
npm install
npm run dev`,
            env: `NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=`,
          },
        ],
      },
    },
  },
  {
    id: "neurostock",
    gradient:
      "linear-gradient(200deg, var(--neurostock-1), var(--neurostock-2) 70%, var(--neurostock-3))",
    glow: "var(--neurostock-3)",
    href: "https://neurostock.cristianpuentes.com",
    repo: "https://github.com/cris185/NeuroStock",
    coverImage: "https://minio-api.cristianpuentes.com/portfolio-media/covers/neurostock-card.jpg",
    screenshots: [
      { label: "Overview", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/neurostock-landing.jpg" },
      { label: "Analysis", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/neurostock-analysis.jpg" },
      { label: "Forecast", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/neurostock-future.jpg" },
      { label: "Playground", src: "https://minio-api.cristianpuentes.com/portfolio-media/covers/neurostock-playground.jpg" },
    ],
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
    demoAccounts: {
      accounts: [{ label: "Demo", identifierLabel: "Username", identifier: "demo", password: "Demo1234!" }],
    },
    docs: {
      fullStack: [
        { layer: "Python", tech: "3.12 — main language" },
        { layer: "Django", tech: "5.2 — web framework" },
        { layer: "Django REST Framework", tech: "3.16 — REST API" },
        { layer: "TensorFlow / Keras", tech: "3.10 — LSTM model" },
        { layer: "yfinance", tech: "market data source" },
        { layer: "scikit-learn", tech: "preprocessing (MinMaxScaler)" },
        { layer: "NumPy / Pandas", tech: "data manipulation" },
        { layer: "SimpleJWT", tech: "5.5 — JWT authentication" },
        { layer: "React", tech: "19.0 — UI framework" },
        { layer: "Vite", tech: "build tool" },
        { layer: "Chart.js", tech: "4.5 — charts" },
        { layer: "Axios", tech: "1.9 — HTTP client" },
        { layer: "Tailwind CSS", tech: "styling" },
        { layer: "Radix UI", tech: "components" },
        { layer: "React Router", tech: "7.5 — navigation" },
        { layer: "React Hook Form", tech: "7.56 — forms" },
      ],
      architectureDiagram: `flowchart TB
    subgraph client["Client — React + Vite (SPA)"]
        Charts["Charts (Chart.js)"]
        Dashboard["Dashboard"]
        Auth["Auth (Login / Register)"]
        Axios["axiosInstance<br/>(interceptors + JWT refresh)"]
    end

    subgraph server["Server — Django REST Framework"]
        subgraph api["API layer"]
            Predict["/predict/"]
            Token["/token/"]
            Register["/register/"]
        end
        subgraph logic["Business logic"]
            DP["DataPipeline<br/>(yfinance)"]
            MLM["MLManager<br/>(singleton)"]
            PE["PredictionEngine<br/>(Monte Carlo)"]
        end
        subgraph ml["ML layer"]
            LSTM["LSTM model (TensorFlow/Keras)<br/>stock_prediction_model.keras"]
        end
    end

    subgraph data["Data layer"]
        DB[("SQLite DB<br/>users / auth")]
        YF[["Yahoo Finance API"]]
    end

    Charts --> Axios
    Dashboard --> Axios
    Auth --> Axios
    Axios -->|"HTTP/REST (JSON)"| api
    api --> logic
    logic --> ml
    DP --> YF
    Token --> DB
    Register --> DB`,
      dataFlows: [
        {
          key: "auth",
          mermaid: `sequenceDiagram
    participant U as User
    participant B as Backend
    U->>B: POST /register/
    B-->>U: { success: true }
    U->>B: POST /token/ { username, password }
    B-->>U: { access, refresh }
    Note over U: stores both tokens in localStorage`,
        },
        {
          key: "prediction",
          mermaid: `sequenceDiagram
    participant D as Dashboard
    participant V as Views
    participant DP as DataPipeline
    participant ML as MLManager
    participant M as LSTM Model
    participant PE as PredictionEngine
    D->>V: POST /predict/ { ticker: "AAPL" }
    V->>DP: yf.download()
    V->>ML: get_model()
    ML->>M: load once, cache in memory
    V->>PE: predict_future()
    PE->>M: .predict()
    V-->>D: { backtesting metrics, future predictions }`,
        },
      ],
      components: [
        {
          title: "MLModelManager (singleton pattern)",
          code: `# Purpose: load the model once and cache it in memory
class MLModelManager:
    _instance = None
    _lock = threading.Lock()
    _model = None

    @classmethod
    def get_instance(cls):
        # Thread-safe lazy initialization
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance

    def get_model(self):
        # Load the model only if it isn't cached yet
        if self._model is None:
            self._model = load_model('stock_prediction_model.keras')
        return self._model

# Eliminates repetitive I/O (~2-3s per request), thread-safe,
# a single model instance shared across concurrent requests.`,
        },
        {
          title: "DataPipeline",
          code: `def download_stock_data(ticker, years=10):
    """Download data from Yahoo Finance"""

def prepare_backtesting_data(close_prices, train_ratio=0.7):
    """Split data into train/test without data leakage"""

def create_sequences(data, sequence_length=100):
    """Create sequences for the LSTM"""`,
        },
        {
          title: "FuturePredictionEngine",
          code: `# Recursive prediction with Monte Carlo Dropout
def predict_future(historical_prices, horizon, confidence_level):
    """
    - Uses the last 100 days as the initial sequence
    - Predicts day 1, appends it to the sequence
    - Predicts day 2, appends it to the sequence
    - ... until \`horizon\` days are covered
    - Computes confidence intervals along the way
    """`,
        },
        {
          title: "AuthProvider (React Context)",
          code: `// Holds global authentication state
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken')
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};`,
        },
        {
          title: "axiosInstance (HTTP client)",
          code: `// Attaches the JWT on every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers['Authorization'] = \`Bearer \${token}\`;
  return config;
});

// Auto-refreshes an expired token and retries the request
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // refresh token and retry
    }
  }
);`,
        },
      ],
      dataModel: {
        table: "User",
        columns: [
          { field: "id", type: "INTEGER (PK)" },
          { field: "username", type: "VARCHAR(150)" },
          { field: "email", type: "VARCHAR(254)" },
          { field: "password", type: "VARCHAR(128), hashed" },
          { field: "date_joined", type: "DATETIME" },
          { field: "last_login", type: "DATETIME" },
        ],
      },
      securityConfigSnippet: `SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}`,
      architectureTree: [
        {
          name: "NeuroStock/",
          children: [
            {
              name: "backend-drf/",
              comment: "Django REST Framework backend",
              children: [
                {
                  name: "api/",
                  comment: "Main app — predictions",
                  children: [
                    { name: "views.py", comment: "StockPredictionAPIView" },
                    { name: "urls.py", comment: "API routes" },
                    { name: "serializers.py", comment: "Input data validation" },
                    { name: "data_pipeline.py", comment: "Data download and preparation" },
                    { name: "ml_manager.py", comment: "Singleton for model management" },
                    { name: "prediction_engine.py", comment: "Future predictions engine" },
                    { name: "migrations/", comment: "Database migrations" },
                  ],
                },
                {
                  name: "accounts/",
                  comment: "Authentication app",
                  children: [
                    { name: "views.py", comment: "RegisterView, ProtectedView" },
                    { name: "serializers.py", comment: "UserSerializer" },
                    { name: "migrations/" },
                  ],
                },
                {
                  name: "stock_prediction_main/",
                  comment: "Django project configuration",
                  children: [
                    { name: "settings.py", comment: "Main configuration" },
                    { name: "urls.py", comment: "Root URL" },
                    { name: "wsgi.py", comment: "Production WSGI" },
                    { name: "asgi.py", comment: "Async support" },
                  ],
                },
                { name: "stock_prediction_model.keras", comment: "Pre-trained LSTM model" },
                { name: "manage.py", comment: "Django CLI" },
                { name: "requirements.txt", comment: "Python dependencies" },
                { name: "db.sqlite3", comment: "SQLite database" },
              ],
            },
            {
              name: "frontend-react/",
              comment: "React + Vite frontend",
              children: [
                {
                  name: "src/",
                  children: [
                    { name: "App.jsx", comment: "Root component and routes" },
                    { name: "main.jsx", comment: "Entry point" },
                    { name: "PrivateRoute.jsx", comment: "Protected routes" },
                    { name: "PublicRoute.jsx", comment: "Public routes" },
                    {
                      name: "components/",
                      children: [
                        { name: "Main.jsx", comment: "Landing page" },
                        { name: "axiosInstance.js", comment: "Configured HTTP client" },
                        { name: "dashboard/", comment: "Dashboard.jsx — main prediction panel" },
                        { name: "Charts/", comment: "StockChart.jsx" },
                        { name: "Login/", comment: "Login.jsx" },
                        { name: "Register/", comment: "Register.jsx, RegisterForm.jsx" },
                        { name: "Layout/", comment: "Header.jsx, Footer.jsx" },
                        { name: "Hooks/", comment: "AuthProvider.jsx" },
                        { name: "ui/", comment: "PremiumButton, PremiumCard, MetricCard, SkeletonLoader, EmptyState" },
                      ],
                    },
                    { name: "assets/css/", comment: "globals.css, style.css" },
                  ],
                },
                { name: "package.json" },
                { name: "vite.config.js" },
                { name: "tailwind.config.js" },
                { name: "index.html" },
              ],
            },
            {
              name: "Resources_tf/",
              comment: "ML development notebooks",
              children: [{ name: "stock_prediction_using_LSTM.ipynb" }],
            },
            { name: "docs/", comment: "Documentation (es/ and en/)" },
            { name: "env/", comment: "Python virtual environment" },
          ],
        },
      ],
      modelLayers: [
        { title: "Input Layer", detail: "100 timesteps, 1 feature" },
        { title: "LSTM Layer 1", detail: "128 units, tanh, return_sequences" },
        { title: "LSTM Layer 2", detail: "64 units, tanh" },
        { title: "Dense Layer", detail: "25 units" },
        { title: "Output Layer", detail: "1 unit" },
      ],
      modelCodeSnippet: `# CORRECT: scaler fitted ONLY on training data
train_scaler = MinMaxScaler(feature_range=(0, 1))
train_scaler.fit(data_split['train'].values.reshape(-1, 1))

# Transform test data with the training scaler
test_scaled = train_scaler.transform(test_data)`,
      apiExampleRequest: `{
    "ticker": "AAPL",
    "future_days": 30,
    "confidence_level": 0.95
}`,
      apiExampleResponse: `{
    "status": "success",
    "ticker": "AAPL",
    "historical_data": {
        "dates": ["2015-01-02", "..."],
        "close_prices": [27.33, "..."]
    },
    "ma_data": {
        "ma100": [0, "...", 28.5],
        "ma200": [0, "...", 29.1]
    },
    "backtesting": {
        "test_dates": ["2023-01-03", "..."],
        "test_prices": [125.07, "..."],
        "predicted_prices": [124.89, "..."],
        "metrics": { "mse": 12.45, "rmse": 3.53, "r2": 0.9876 }
    },
    "future_predictions": {
        "dates": ["2026-02-25", "..."],
        "predicted_prices": [185.23, "..."],
        "lower_bound": [180.12, "..."],
        "upper_bound": [190.34, "..."],
        "uncertainty": [2.54, "..."],
        "confidence_level": 0.95
    }
}`,
      gettingStarted: {
        steps: [
          {
            key: "backend",
            commands: `python -m venv env

# Windows
.\\env\\Scripts\\Activate.ps1
# Linux/Mac
source env/bin/activate

cd backend-drf
pip install -r requirements.txt

# create backend-drf/.env — see variables below

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin
python manage.py runserver`,
            env: `SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1`,
          },
          {
            key: "frontend",
            commands: `cd frontend-react
npm install

# create frontend-react/.env — see variables below

npm run dev`,
            env: `VITE_BACKEND_BASE_API=http://127.0.0.1:8000/api/v1`,
          },
        ],
      },
    },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
