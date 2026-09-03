import type { Project } from "./projects";

export type ProfessionalId = "thesis" | "verifylead" | "dashboardanalytics";

/** Reuses the exact same shape as a personal Project (and the same ProjectDocs component) — just under its own route and messages namespace. */
export type ProfessionalWork = Omit<Project, "id"> & {
  id: ProfessionalId;
  /** Pending client/employer approval — shown in the carousel but not clickable, no detail route generated */
  locked?: boolean;
};

export const professionalWorks: ProfessionalWork[] = [
  {
    id: "dashboardanalytics",
    locked: true,
    gradient: "linear-gradient(165deg, #101013, #16323b 85%)",
    glow: "#8fc4d8",
    href: "",
    repo: "",
    mode: "dark",
    heroBg: "#0a0f24",
    bodyBg: "#0e1530",
    textPrimary: "#f1f4fc",
    textSecondary: "#8b9bc7",
    accentText: "#8fc4d8",
    pillBg: "#8fc4d814",
    pillBorder: "#8fc4d82e",
    techStack: [],
    hasProblem: false,
  },
  {
    id: "verifylead",
    locked: true,
    gradient: "linear-gradient(165deg, #101013, #3d2f12 85%)",
    glow: "#d9a441",
    href: "",
    repo: "",
    mode: "dark",
    heroBg: "#0a0f24",
    bodyBg: "#0e1530",
    textPrimary: "#f1f4fc",
    textSecondary: "#8b9bc7",
    accentText: "#d9a441",
    pillBg: "#d9a44114",
    pillBorder: "#d9a4412e",
    techStack: [],
    hasProblem: false,
  },
  {
    id: "thesis",
    gradient: "linear-gradient(155deg, #0e2350, #1d4ed8 75%)",
    glow: "#1d4ed8",
    href: "https://primo.utb.edu.co/nde/fulldisplay?vid=57UTB_INST:57UTB_INST_NDE&tab=Everything&offset=0&docid=alma99662932505731&query=cristian%20puentes&context=L&adaptor=Local%20Search%20Engine&lang=es&search_scope=MyInst_and_CI",
    repo: "https://drive.google.com/file/d/18R1Tj280WMxRNXk_l6ICeMgdHoaQD3Vt/view?usp=sharing",
    mode: "dark",
    heroBg: "#0a0f24",
    bodyBg: "#0e1530",
    textPrimary: "#f1f4fc",
    textSecondary: "#8b9bc7",
    accentText: "#5b8def",
    pillBg: "#5b8def14",
    pillBorder: "#5b8def2e",
    techStack: ["Python", "Whisper X", "NLP / n-grams", "TF-IDF", "OpenAI API"],
    hasProblem: true,
    hasStats: true,
    docs: {
      fullStack: [
        { layer: "Whisper X (OpenAI)", tech: "High-precision speech-to-text transcription" },
        { layer: "NLP / n-grams", tech: "Keyword extraction from transcripts and job descriptions" },
        { layer: "TfidfVectorizer", tech: "N-gram vectorization for the vector-space metrics" },
        { layer: "Cosine similarity & Euclidean distance", tech: "Vector-space affinity metrics" },
        { layer: "Matching skills", tech: "Exact skill-overlap scoring" },
        { layer: "UML (IEEE 1471-2000)", tech: "Multi-viewpoint architecture documentation" },
        { layer: "MP4", tech: "Candidate video input format" },
      ],
      architectureDiagram: `flowchart TB
    subgraph presentation["Capa de presentación"]
        UI["Interfaz de usuario<br/>carga de video · resultados"]
    end
    subgraph logic["Capa de lógica de negocio"]
        BL["Orquestación del pipeline<br/>reglas de negocio"]
    end
    subgraph data["Capa de acceso a datos"]
        DS[("Datasets<br/>vacantes · aspirantes")]
    end
    subgraph services["Capa de servicios"]
        SVC["Funcionalidad compartida<br/>reutilizada entre módulos"]
    end

    UI --> BL --> DS
    BL --> SVC`,
      dataFlows: [
        {
          key: "useCases",
          mermaid: `flowchart LR
    Aspirante(["Aspirante"])
    Reclutador(["Reclutador"])
    subgraph system["AI-JobMatch"]
        UC1(("Cargar video"))
        UC2(("Ver informe de compatibilidad"))
    end
    Aspirante --- UC1
    Reclutador --- UC2`,
        },
        {
          key: "components",
          mermaid: `flowchart LR
    Aspirante(["Aspirante"]) -->|"Carga de video"| Presentacion["Módulo de<br/>presentación"]
    Presentacion -->|"Envío de video"| Almacenamiento["Módulo de<br/>almacenamiento"]
    Presentacion -->|"Envío de video"| Transcripcion["Módulo de<br/>transcripción de voz"]
    Transcripcion -->|"Envío de transcripción"| Almacenamiento
    Transcripcion -->|"Envío de transcripción"| Extraccion["Módulo de extracción<br/>de palabras clave"]
    Extraccion -->|"Envío de texto procesado"| Afinidad["Módulo de análisis<br/>de afinidad"]
    Afinidad -->|"Envío de predicción/informe"| Reclutador(["Reclutador"])`,
        },
        {
          key: "sequence",
          mermaid: `sequenceDiagram
    participant Aspirante
    participant Modelo as AI-JobMatch
    participant Reclutador
    Aspirante->>Modelo: Enviar video al modelo
    Modelo->>Modelo: Conversión de video a mp3
    Modelo->>Modelo: Limpieza de datos
    Modelo->>Modelo: Aplicación de n-grams
    Modelo->>Modelo: Vectorización de n-grams
    Modelo->>Modelo: Aplicación de métricas para evaluación
    Modelo->>Reclutador: Output de resultados e información
    Reclutador->>Aspirante: Retroalimentación`,
        },
      ],
      schemaDiagrams: [
        {
          key: "main",
          mermaid: `erDiagram
    VACANTE }o--o{ ASPIRANTE : "afinidad evaluada"

    VACANTE {
        string vacante
        string descripcion_vacante
        string habilidades_requeridas
    }
    ASPIRANTE {
        string id
        string transcripcion
    }`,
        },
      ],
    },
  },
];

export function getProfessionalWork(id: string): ProfessionalWork | undefined {
  return professionalWorks.find((p) => p.id === id);
}
