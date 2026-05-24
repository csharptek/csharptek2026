const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const BLOGS = [
  {
    slug: 'ai-medical-scribe-azure-openai',
    title: 'Building an AI Medical Scribe on Azure OpenAI',
    meta_title: 'AI Medical Scribe on Azure OpenAI — CSharpTek',
    meta_description: 'How we built a HIPAA-aligned AI medical scribe using Azure OpenAI, real-time transcription, and EHR integration. Lessons from production deployments.',
    excerpt: "Real-time transcription, HIPAA-aligned architecture, and Azure OpenAI — here's how modern AI scribes are replacing manual clinical documentation.",
    category: 'Healthcare AI', category_color: '#1565A8', read_time: '7 min read',
    date: '2025-05-10', icon: '🎙️', tags: ['Azure OpenAI', 'HIPAA', 'Healthcare', 'NLP'],
    body: [
      { type: 'intro', text: "Clinical documentation consumes 30–40% of a physician's day. AI medical scribes built on Azure OpenAI are changing that equation — dramatically. We've deployed this technology across multiple healthcare settings and the results are consistent: faster notes, fewer errors, and physicians who actually go home on time." },
      { type: 'h2', text: 'What an AI Scribe Actually Does' },
      { type: 'p', text: "An AI medical scribe listens to the patient-physician conversation in real time, extracts clinical intent, and generates structured SOAP notes, HPI sections, and assessment plans — ready for physician review and EHR insertion. It's not transcription. It's comprehension." },
      { type: 'h2', text: 'The Azure OpenAI Architecture' },
      { type: 'p', text: "We use Azure OpenAI (GPT-4 Turbo) with Azure Speech Services for real-time audio streaming. The pipeline: audio → Azure Speech SDK → chunked transcript → GPT-4 prompt → structured clinical output → EHR API. All data stays within Azure's HIPAA-eligible services — no data leaves the tenant boundary." },
      { type: 'h2', text: 'Prompt Engineering for Clinical Accuracy' },
      { type: 'p', text: "Generic prompts produce generic notes. We invest significant effort in specialty-specific prompt templates — a cardiology note looks nothing like a psychiatry note. We also inject patient context (age, chief complaint, existing conditions) to improve extraction accuracy." },
      { type: 'h2', text: 'EHR Integration Realities' },
      { type: 'p', text: "FHIR R4 is the standard, but real-world EHR APIs are inconsistent. We've integrated with Epic, Athenahealth, and several smaller systems. Each requires custom mapping. Plan for this — it's where most of the integration time goes." },
      { type: 'h2', text: 'Accuracy and Physician Trust' },
      { type: 'p', text: "Physicians don't trust black boxes. We built a review-and-edit UI that shows confidence scores per section, highlights uncertain extractions, and tracks edit rates over time. As the model learns from corrections, accuracy improves. Most clinicians reach 90%+ accuracy within 2 weeks of use." },
      { type: 'cta', text: "Building a healthcare AI product? We've done this before.", label: 'Talk to Our Team', href: '/contact' }
    ]
  },
  {
    slug: 'vibe-coding-mvp-development',
    title: 'Vibe Coding and the New Era of MVP Development',
    meta_title: 'Vibe Coding & MVP Development in 2025 — CSharpTek',
    meta_description: "Vibe coding is changing how startups build MVPs. AI-assisted development compresses timelines from months to weeks. Here's what it means in practice.",
    excerpt: "AI-assisted development has fundamentally changed what's possible in 4–8 weeks. Vibe coding isn't a shortcut — it's a new development paradigm.",
    category: 'Engineering', category_color: '#FF6B2B', read_time: '5 min read',
    date: '2025-05-02', icon: '🚀', tags: ['MVP', 'AI Development', 'Vibe Coding', 'Startups'],
    body: [
      { type: 'intro', text: "The term \"vibe coding\" gets eye-rolls from traditionalists. But the results don't lie. We've been building production MVPs using AI-assisted development workflows for over a year — and the speed-to-quality ratio has fundamentally shifted." },
      { type: 'h2', text: 'What Vibe Coding Actually Means' },
      { type: 'p', text: "Vibe coding isn't about replacing engineers with AI. It's about compressing the distance between idea and working software. A skilled developer using Claude, Cursor, and modern AI tooling can produce what used to take a team of three in the same time." },
      { type: 'h2', text: 'Our MVP Stack in 2025' },
      { type: 'p', text: "For most MVPs we default to: Next.js 14 (App Router), Railway for hosting, PostgreSQL with Prisma, Clerk for auth, and Stripe for payments. This stack is AI-friendly — every tool has strong documentation that modern LLMs have been trained on." },
      { type: 'h2', text: 'Where Human Judgment Still Dominates' },
      { type: 'p', text: "Architecture decisions, UX judgment, edge case handling, and domain-specific logic still require experienced engineers. AI excels at implementation; humans excel at asking the right questions." },
      { type: 'h2', text: 'Real Timeline: What\'s Achievable' },
      { type: 'p', text: "We've shipped production-ready MVPs in 3 weeks. Typical range is 4–8 weeks depending on complexity. A year ago, comparable scope would take 3–5 months." },
      { type: 'cta', text: "Need an MVP fast? We build them.", label: 'Start Your MVP', href: '/services/mvp-vibe' }
    ]
  },
  {
    slug: 'hipaa-compliant-ai-healthcare-startups',
    title: "HIPAA-Compliant AI for Healthcare Startups: What You Need to Know",
    meta_title: 'HIPAA-Compliant AI for Healthcare Startups — CSharpTek',
    meta_description: "Building AI products for US healthcare? HIPAA compliance isn't optional. Here's the architecture, tooling, and business associate agreements you need.",
    excerpt: "HIPAA compliance for AI isn't just signing a BAA. It's architecture decisions, data flows, access controls, and audit trails — from day one.",
    category: 'Healthcare AI', category_color: '#1565A8', read_time: '8 min read',
    date: '2025-04-22', icon: '🔒', tags: ['HIPAA', 'Healthcare', 'Compliance', 'Azure', 'Security'],
    body: [
      { type: 'intro', text: "Every week, a healthcare startup asks us to add \"HIPAA compliance\" as a feature late in their development cycle. This always ends the same way — expensive rework, delayed launches, and nervous legal teams. HIPAA isn't a feature you bolt on. It's an architecture you build into." },
      { type: 'h2', text: 'What HIPAA Actually Requires for AI Systems' },
      { type: 'p', text: "The Security Rule requires technical safeguards: access controls, audit controls, integrity controls, and transmission security. For AI systems specifically, this means: no PHI in LLM prompts without appropriate controls, encrypted storage, granular role-based access, and complete audit trails." },
      { type: 'h2', text: 'The BAA: Necessary But Not Sufficient' },
      { type: 'p', text: "A Business Associate Agreement with your cloud provider is necessary but not sufficient. The BAA covers the vendor's obligations — it doesn't make your application compliant." },
      { type: 'h2', text: "Azure's HIPAA-Eligible Services" },
      { type: 'p', text: "Azure offers an extensive portfolio of HIPAA-eligible services. For AI workloads: Azure OpenAI (with BAA), Azure AI Speech, Azure Blob Storage, Azure SQL Database, and Azure Key Vault are all eligible." },
      { type: 'h2', text: 'De-identification as a Strategy' },
      { type: 'p', text: "Where possible, de-identify data before sending to AI models. Azure's Text Analytics for Health includes PHI detection and de-identification. Processing de-identified data removes or reduces HIPAA obligations substantially." },
      { type: 'h2', text: 'Audit Logging for AI' },
      { type: 'p', text: "Traditional audit logging captures who accessed a record. AI audit logging must capture more: which model was invoked, what input was sent, what output was returned, and which downstream action was taken." },
      { type: 'cta', text: "Building healthcare AI? We've navigated HIPAA compliance on multiple products.", label: 'Get a Compliance Review', href: '/contact' }
    ]
  },
  {
    slug: 'ai-voice-agents-vs-call-centres',
    title: 'AI Voice Agents vs Traditional Call Centres: An Honest Comparison',
    meta_title: 'AI Voice Agents vs Traditional Call Centres — CSharpTek',
    meta_description: "AI voice agents are disrupting call centres. We break down the real cost savings, capability gaps, and which use cases AI wins vs where humans still win.",
    excerpt: "AI voice agents handle 80% of routine calls at 10% of the cost. But the 20% that still needs humans? Getting that handoff right is everything.",
    category: 'AI Voice', category_color: '#6b2fa0', read_time: '6 min read',
    date: '2025-04-14', icon: '📞', tags: ['Voice AI', 'Call Centre', 'Automation', 'LLM'],
    body: [
      { type: 'intro', text: "The question isn't whether AI voice agents will replace call centres. It's which calls AI handles, which calls escalate to humans, and how you architect the handoff." },
      { type: 'h2', text: 'What AI Voice Agents Do Well' },
      { type: 'p', text: "Appointment scheduling, FAQ responses, order status, simple account inquiries, outbound reminders, and intake collection. These categories represent 60–80% of inbound call volume for most businesses." },
      { type: 'h2', text: 'Where Humans Still Win' },
      { type: 'p', text: "Emotionally complex calls, novel situations outside training data, high-stakes decisions requiring accountability, and any call where the customer explicitly wants a human." },
      { type: 'h2', text: 'The Latency Problem' },
      { type: 'p', text: "Modern architectures using streaming TTS, smaller intent-detection models for routing, and pre-cached responses for common intents have reduced latency to 300–500ms — within human conversational tolerance." },
      { type: 'h2', text: 'Hybrid Architecture: The Only Sensible Approach' },
      { type: 'p', text: "The winning pattern is AI-first with intelligent escalation. AI handles the opening, collects context, resolves simple cases autonomously, and transfers complex cases to human agents with full context pre-loaded." },
      { type: 'cta', text: "Want to see what AI voice looks like for your operation?", label: 'Talk to Our Voice AI Team', href: '/services/ai-voice' }
    ]
  },
  {
    slug: 'how-rag-pipelines-work',
    title: 'How RAG Pipelines Work: A Plain-English Technical Guide',
    meta_title: 'How RAG Pipelines Work — A Technical Guide by CSharpTek',
    meta_description: "Retrieval-Augmented Generation explained clearly. Chunking, embedding, vector search, reranking, and prompt injection — the full RAG stack demystified.",
    excerpt: "RAG lets LLMs answer questions from your private data without fine-tuning. Here's exactly how the pipeline works — from ingestion to response.",
    category: 'AI Engineering', category_color: '#0f7a5a', read_time: '9 min read',
    date: '2025-04-05', icon: '🔍', tags: ['RAG', 'Vector Search', 'LangChain', 'Pinecone', 'Embeddings'],
    body: [
      { type: 'intro', text: "Retrieval-Augmented Generation (RAG) is the most practical pattern for building AI systems that know things GPT-4 doesn't — your product docs, your customer data, your internal knowledge." },
      { type: 'h2', text: 'The Core Idea' },
      { type: 'p', text: "Instead of asking an LLM to answer from its training data alone, RAG retrieves relevant documents from your knowledge base first, then passes them to the LLM as context." },
      { type: 'h2', text: 'Stage 1: Ingestion and Chunking' },
      { type: 'p', text: "Source documents are loaded and split into chunks. Chunk size matters enormously — too small loses context, too large dilutes signal. We typically use 400–800 tokens per chunk with 10–20% overlap." },
      { type: 'h2', text: 'Stage 2: Embedding' },
      { type: 'p', text: "Each chunk is converted to a vector embedding. We use Azure OpenAI's text-embedding-3-large (3,072 dimensions) for production systems." },
      { type: 'h2', text: 'Stage 3: Vector Storage' },
      { type: 'p', text: "Embeddings are stored in a vector database: Pinecone for cloud-managed simplicity, pgvector for PostgreSQL integration, or Qdrant for self-hosted control." },
      { type: 'h2', text: 'Stage 4: Retrieval' },
      { type: 'p', text: "At query time, the user's question is embedded with the same model. A similarity search finds the top-k most semantically similar chunks." },
      { type: 'h2', text: 'Stage 5: Reranking' },
      { type: 'p', text: "A cross-encoder reranker scores retrieved chunks for relevance to the specific query. This two-stage approach dramatically improves precision without sacrificing recall." },
      { type: 'cta', text: "Building a RAG system? We've shipped them across healthcare, legal, and enterprise.", label: 'Discuss Your Use Case', href: '/contact' }
    ]
  },
  {
    slug: 'building-bilingual-ai-middle-east',
    title: 'Building Bilingual AI for the Middle East: Arabic and English',
    meta_title: 'Building Bilingual Arabic-English AI — CSharpTek',
    meta_description: "Building AI products for Saudi Arabia and the UAE? Arabic NLP, RTL UI, cultural context, and local cloud regulations — what we learned from production.",
    excerpt: "Arabic AI isn't English AI translated. RTL layout, dialect variance, cultural context, and local cloud compliance all require specific engineering decisions.",
    category: 'AI Engineering', category_color: '#0f7a5a', read_time: '7 min read',
    date: '2025-03-28', icon: '🌍', tags: ['Arabic AI', 'NLP', 'Middle East', 'Localisation', 'RTL'],
    body: [
      { type: 'intro', text: "We built a bilingual AI medical scribe for the Saudi healthcare market — English and Arabic, simultaneous support, RTL UI, dialect-aware NLP. It was one of the most technically interesting projects we've shipped." },
      { type: 'h2', text: 'Arabic Is Not One Language' },
      { type: 'p', text: "Modern Standard Arabic (MSA) differs substantially from Gulf Arabic, Levantine Arabic, Egyptian Arabic, and other dialects. A medical scribe serving Saudi clinicians needs to understand Gulf dialect speech while producing MSA clinical documentation." },
      { type: 'h2', text: 'GPT-4 and Arabic: Better Than Expected' },
      { type: 'p', text: "GPT-4 Turbo handles MSA extremely well. Our solution: Azure Speech Services for dialect-aware transcription, post-processing to normalise to MSA, then GPT-4 for clinical note generation." },
      { type: 'h2', text: 'RTL UI: More Than Text Direction' },
      { type: 'p', text: "Right-to-left layout isn't just flipping text direction. Date formats, number rendering, icon placement, progress indicators, and form flow all need reconsidering." },
      { type: 'h2', text: 'Saudi Cloud Compliance' },
      { type: 'p', text: "Healthcare data in Saudi Arabia falls under the Health Data Management Regulation (HDMR). Azure's UAE North and Saudi Arabia regions are the relevant deployment targets." },
      { type: 'cta', text: "Building for MENA markets? We have on-ground experience.", label: 'Contact Our Team', href: '/contact' }
    ]
  },
  {
    slug: 'fax-to-ai-healthcare-automation',
    title: "Fax to AI: Automating Healthcare's Most Stubborn Workflow",
    meta_title: 'Fax to AI — Healthcare Automation by CSharpTek',
    meta_description: "Fax machines still process millions of healthcare documents daily. We built an AI system that ingests faxes, extracts clinical data, and routes it intelligently.",
    excerpt: "Healthcare still runs on fax. We built an AI pipeline that turns inbound faxes into structured data, automatic routing, and EHR-ready records.",
    category: 'Healthcare AI', category_color: '#1565A8', read_time: '6 min read',
    date: '2025-03-15', icon: '📠', tags: ['Healthcare', 'Automation', 'OCR', 'Azure', 'Document AI'],
    body: [
      { type: 'intro', text: "In 2025, US healthcare transmits approximately 9 billion faxes annually. We built an AI system that doesn't fight fax culture. It transforms it." },
      { type: 'h2', text: 'The Problem with Healthcare Fax' },
      { type: 'p', text: "Inbound faxes arrive as images. Staff print them, read them, manually re-enter data into EHRs, and route them to appropriate clinicians. This takes 5–15 minutes per fax." },
      { type: 'h2', text: 'The AI Pipeline' },
      { type: 'p', text: "Inbound fax (via eFax API) → Azure Document Intelligence (OCR) → GPT-4 for clinical entity extraction → document classification → routing rules engine → EHR integration. The whole pipeline runs in under 90 seconds." },
      { type: 'h2', text: 'Document Classification at Scale' },
      { type: 'p', text: "Healthcare faxes include: referrals, lab results, prior authorisations, prescription refill requests, medical records, and insurance correspondence — each requiring different downstream handling. Current accuracy is 94%." },
      { type: 'h2', text: 'Human-in-the-Loop Design' },
      { type: 'p', text: "We never route fully autonomously for clinical decisions. The AI extracts and classifies; humans confirm and act. Volume capacity per staff member increased 8x." },
      { type: 'cta', text: "Running a healthcare operation drowning in faxes?", label: 'See the Demo', href: '/contact' }
    ]
  },
  {
    slug: 'ai-in-edtech-2025',
    title: "AI in EdTech: What's Actually Working in 2025",
    meta_title: "AI in EdTech — What's Working in 2025 | CSharpTek",
    meta_description: "Beyond AI tutors and essay detectors — what EdTech AI applications are delivering measurable learning outcomes in 2025?",
    excerpt: "AI tutors get the headlines. Adaptive assessment, automated feedback, and intelligent content curation are where actual learning outcomes are improving.",
    category: 'Education AI', category_color: '#7a5a0a', read_time: '7 min read',
    date: '2025-03-05', icon: '🎓', tags: ['EdTech', 'AI Tutoring', 'Adaptive Learning', 'LMS'],
    body: [
      { type: 'intro', text: "EdTech went through an AI hype cycle in 2023–2024 that produced a lot of AI-wrapped content delivery and very little genuine learning improvement. In 2025, the picture is more nuanced — and more encouraging." },
      { type: 'h2', text: 'Adaptive Assessment: The Quiet Success Story' },
      { type: 'p', text: "AI-powered adaptive assessment has clear evidence behind it. Platforms using this approach report 15–25% improvement in assessment completion rates and better predictive validity for learning outcomes." },
      { type: 'h2', text: 'Automated Writing Feedback That Actually Helps' },
      { type: 'p', text: "GPT-4 class models enable substantive feedback: argument structure, evidence quality, logical consistency, and discipline-specific conventions. When implemented as a formative tool, writing quality improvements are measurable." },
      { type: 'h2', text: 'AI Tutors: Promising but Uneven' },
      { type: 'p', text: "AI tutors work best for procedural subjects with clear right/wrong answers: mathematics, coding, language grammar. Socratic AI for humanities is harder." },
      { type: 'h2', text: "What Isn't Working" },
      { type: 'p', text: "AI essay detectors are unreliable and generating significant fairness concerns. The EdTech AI applications succeeding are those that augment educators, not replace them." },
      { type: 'cta', text: "Building an EdTech product? We've shipped AI learning platforms.", label: 'Talk to Our Team', href: '/industries/education' }
    ]
  },
  {
    slug: 'pet-care-tech-rfid-ai',
    title: 'Pet Care Tech: How RFID and AI Are Modernising Veterinary Operations',
    meta_title: 'Pet Care Tech — RFID and AI in Veterinary Operations | CSharpTek',
    meta_description: "Modern pet care platforms use RFID tracking, AI health monitoring, and cloud-native architecture.",
    excerpt: "From paper registers to cloud-native RFID tracking — how AI and modern tech are transforming vaccination camps, pet clinics, and veterinary workflows.",
    category: 'Pet Care Tech', category_color: '#3a7a0a', read_time: '5 min read',
    date: '2025-02-20', icon: '🐾', tags: ['Pet Care', 'RFID', 'Azure', 'IoT', 'Veterinary'],
    body: [
      { type: 'intro', text: "Vaccination camps across India process thousands of animals annually using paper registers, manual data entry, and phone-based follow-ups. We built a cloud-native platform that replaces this with RFID scanning, real-time dashboards, and AI-powered health trend analysis." },
      { type: 'h2', text: 'The Paper Problem' },
      { type: 'p', text: "Manual processes at vaccination camps create real problems: lost records, incorrect animal identification, missed booster reminders, and no aggregate data for disease surveillance." },
      { type: 'h2', text: 'RFID as the Foundation' },
      { type: 'p', text: "ISO 11784/11785 RFID microchip scanning provides reliable animal identification. The entire intake process drops from 8 minutes to under 2 minutes. Misidentification incidents: effectively zero." },
      { type: 'h2', text: 'Cloud Architecture for Intermittent Connectivity' },
      { type: 'p', text: "Vaccination camps often operate in areas with unreliable internet. We built offline-first: data is captured locally on rugged Android tablets, synced to Azure when connectivity is available." },
      { type: 'h2', text: 'Automated Booster Reminders' },
      { type: 'p', text: "Booster compliance rates improved by 340% in the pilot area within 12 months of deployment." },
      { type: 'cta', text: "Building pet care or veterinary technology?", label: 'See Our Pet Care Work', href: '/industries/petcare' }
    ]
  },
  {
    slug: 'how-to-pick-ai-stack-startup',
    title: 'How to Pick the Right AI Stack for Your Startup',
    meta_title: 'How to Pick the Right AI Stack for Your Startup — CSharpTek',
    meta_description: "Choosing between Azure OpenAI, AWS Bedrock, and open-source LLMs? We break down the decision framework we use for early-stage AI startups.",
    excerpt: "Azure OpenAI vs AWS Bedrock vs open-source. Vector DB options. Orchestration frameworks. Here's the decision framework we apply for AI startups.",
    category: 'AI Engineering', category_color: '#0f7a5a', read_time: '8 min read',
    date: '2025-02-08', icon: '🧠', tags: ['AI Stack', 'Azure OpenAI', 'LangChain', 'Architecture', 'Startups'],
    body: [
      { type: 'intro', text: "The AI tooling landscape evolves so fast that \"what stack should I use\" is a genuinely difficult question in 2025. We've made these decisions across 30+ AI projects in the past two years." },
      { type: 'h2', text: 'Start With Constraints, Not Capabilities' },
      { type: 'p', text: "Most stack debates start with \"which model is best.\" That's the wrong starting point. Start with your constraints: data residency requirements, existing cloud commitments, team familiarity, budget, and latency requirements." },
      { type: 'h2', text: 'Azure OpenAI vs AWS Bedrock vs Direct API' },
      { type: 'p', text: "Azure OpenAI: Best if you have Azure credits, existing Azure infrastructure, or regulated data requirements. AWS Bedrock: Best for AWS-native stacks and multi-model access. Direct API: Best for prototyping and cost-sensitive workloads." },
      { type: 'h2', text: 'Vector Database Decision' },
      { type: 'p', text: "pgvector: Start here if you're already using PostgreSQL. Pinecone: Move here when you need managed scaling. Qdrant: Best self-hosted option." },
      { type: 'h2', text: 'The Stack We Default To' },
      { type: 'p', text: "For a regulated-data AI startup in 2025: Azure OpenAI (GPT-4o), pgvector on Azure PostgreSQL Flexible Server, LangChain for orchestration, Next.js frontend, Railway for deployment." },
      { type: 'cta', text: "Building an AI product and not sure where to start?", label: 'Book a Free Architecture Review', href: '/contact' }
    ]
  }
]

async function migrate() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  try {
    // Run schema migration
    const sql = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf8')
    await pool.query(sql)
    console.log('✓ Schema migration complete')

    // Seed default author
    const authorRes = await pool.query(
      `INSERT INTO blog_authors (name, role, bio)
       VALUES ('CSharpTek Team', 'AI Engineering Team', 'AI-first software development across healthcare, education, wellness and more.')
       ON CONFLICT DO NOTHING RETURNING id`
    )

    let authorId
    if (authorRes.rows.length > 0) {
      authorId = authorRes.rows[0].id
    } else {
      const existing = await pool.query('SELECT id FROM blog_authors LIMIT 1')
      authorId = existing.rows[0]?.id
    }

    // Seed blog posts
    for (const blog of BLOGS) {
      const existing = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [blog.slug])
      if (existing.rows.length > 0) {
        console.log(`  - Skipping existing: ${blog.slug}`)
        continue
      }

      await pool.query(
        `INSERT INTO blog_posts
          (slug, title, meta_title, meta_description, excerpt, category, category_color,
           read_time, icon, tags, body, author_id, status, published_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'published',$13)`,
        [
          blog.slug, blog.title, blog.meta_title, blog.meta_description,
          blog.excerpt, blog.category, blog.category_color, blog.read_time,
          blog.icon, blog.tags, JSON.stringify(blog.body), authorId,
          new Date(blog.date)
        ]
      )
      console.log(`  ✓ Seeded: ${blog.slug}`)
    }

    console.log('✓ Seed complete')
  } catch (e) {
    console.error('Migration/seed error:', e.message)
  } finally {
    await pool.end()
  }
}

migrate()
