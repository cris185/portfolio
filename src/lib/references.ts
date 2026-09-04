export interface Reference {
  id: string;
  name: string;
  /** Their own headline/tagline, quoted as they wrote it (not translated) */
  role: string;
  photo: string;
  linkedin: string;
  portfolio?: string;
}

export const references: Reference[] = [
  {
    id: "hernan-zuluaga",
    name: "Hernán Zuluaga",
    role: "Fullstack Developer | Machine Learning | Azure Cloud & API Development",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/hernan-zuluaga.jpg",
    linkedin: "https://www.linkedin.com/in/hernan-zuluaga/",
  },
  {
    id: "owen-tovar",
    name: "Owen Tovar",
    role: "Computer Engineer | Azure AI Engineer | NLP | Data Scientist | Python | ETL | Automation | SQL | Big Query | Redshift | Looker Studio",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/owen-tovar.jpg",
    linkedin: "https://www.linkedin.com/in/otp7/",
  },
  {
    id: "elias-jimenez",
    name: "Elías Jiménez",
    role: "Technical Lead Full Stack Developer — TypeScript, JavaScript, Next.js, React.js, Express.js, MongoDB, Node.js",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/elias-jimenez.jpg",
    linkedin: "https://www.linkedin.com/in/elias-jimenez-diz-9394a1263/",
  },
  {
    id: "reinaldo-orozco",
    name: "Reinaldo Orozco",
    role: "Full Stack Engineer · React · Next.js · Node.js · TypeScript | 5+ yrs building scalable products | Now engineering AI/LLM agent environments (MCP)",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/reinaldo-orozco.jpg",
    linkedin: "https://www.linkedin.com/in/reiorozco/",
  },
  {
    id: "santiago-rivera",
    name: "Santiago Rivera",
    role: "Ingeniero de IA Generativa | Automatización de Procesos | Desarrollador Fullstack JS/TS",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/santiago-rivera.jpg",
    linkedin: "https://www.linkedin.com/in/santiago-rivera-10abvc/",
  },
  {
    id: "alejandro-alvarez",
    name: "Alejandro Álvarez",
    role: "AI Engineer | Production LLM, Multi-Agent & Agentic Systems (RAG, MCP, n8n) on AWS Bedrock | Generative AI + Full-Stack",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/alejandro-alvarez.jpg",
    linkedin: "https://www.linkedin.com/in/alejou343/",
    portfolio: "https://portfolio-six-pi-32.vercel.app/",
  },
  {
    id: "luis-miguel-alvarez",
    name: "Luis Miguel Álvarez",
    role: "AI Engineer | TypeScript | AWS | Docker | Claude Code",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/luis-miguel-alvarez.jpg",
    linkedin: "https://www.linkedin.com/in/luis-miguel-alvarez-aba3332b5/",
    portfolio: "https://www.luismidev0.com/",
  },
  {
    id: "sebastian-machado",
    name: "Sebastián Machado",
    role: "Fullstack Developer | Tech Lead",
    photo: "https://minio-api.cristianpuentes.com/portfolio-media/references/sebastian-machado.jpg",
    linkedin: "https://www.linkedin.com/in/sebastian-machado-89a476192/",
    portfolio: "https://portfolio-umber-five-71.vercel.app/?lang=es#experience",
  },
];