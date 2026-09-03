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
  demoAccounts?: {
    accounts?: { label: string; email: string; password: string }[];
    /** Optional larger grid of role-specific demo accounts (e.g. every seeded doctor), shown below `accounts` */
    doctors?: { specKey: string; name: string; email: string; password: string }[];
    /** Link to the payment provider's own test-card documentation, shown alongside `stripeCards` */
    stripeDocsUrl?: string;
  };
  /** Full documentation, transcribed verbatim from the project's own GitHub README */
  docs?: {
    fullStack: { layer: string; tech: string }[];
    architectureDiagram?: string;
    schemaDiagrams?: { key: string; mermaid: string }[];
    gettingStarted?: {
      backendCommands: string;
      backendEnv: string;
      frontendCommands: string;
      frontendEnv: string;
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
    demoAccounts: {
      accounts: [{ label: "Patient", email: "patient@example.com", password: "Demo1234!" }],
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
        backendCommands: `cd backend\\CHOHEALT_BACK

python -m venv venv
.\\venv\\Scripts\\Activate.ps1

pip install -r requirements.txt

# create backend\\CHOHEALT_BACK\\.env — see variables below

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin
python manage.py runserver`,
        backendEnv: `SECRET_KEY=
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
        frontendCommands: `cd frontend
npm install
npm run dev`,
        frontendEnv: `NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=`,
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
    demoAccounts: { accounts: [{ label: "Demo", email: "demo@choplanner.local", password: "demo1234" }] },
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
