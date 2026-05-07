'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Vector database aur traditional SQL database mein fundamental difference kya hai?',
    options: [
      {
        text: 'Vector DB faster hai kyunki ye in-memory hai',
        correct: false,
        explanation: 'Speed ka difference storage type se nahi, similarity search algorithm se hai. SQL bhi in-memory ho sakta hai.',
      },
      {
        text: 'Vector DB high-dimensional vectors store karta hai aur similarity search support karta hai — SQL exact match queries ke liye hai',
        correct: true,
        explanation: 'Bilkul sahi! Vector DB ka core value proposition: "find me things that are semantically similar" — ye SQL se possible nahi. SQL "find exact match" ke liye hai. RAG ke liye vector DB zaruri hai.',
      },
      {
        text: 'Vector DB sirf AI companies use karti hain',
        correct: false,
        explanation: 'Vector DB recommendation systems, semantic search, fraud detection — many use cases mein use hoti hai, sirf AI companies mein nahi.',
      },
      {
        text: 'Vector DB ACID transactions support karta hai, SQL nahi',
        correct: false,
        explanation: 'Ulta sach hai. Traditional SQL databases full ACID compliance dete hain. Most vector DBs eventual consistency pe focus karte hain performance ke liye.',
      },
    ],
  },
  {
    question: 'Pinecone aur pgvector mein se kab kya choose karein?',
    options: [
      {
        text: 'Hamesha Pinecone — managed service hone se koi maintenance nahi',
        correct: false,
        explanation: 'Pinecone great hai lekin har case ke liye best nahi. Agar already PostgreSQL hai, pgvector much simpler integration deta hai.',
      },
      {
        text: 'Pinecone: pure vector search ka core use case, scale, managed. pgvector: already PostgreSQL use kar rahe ho, hybrid SQL+vector queries chahiye',
        correct: true,
        explanation: 'Exactly! pgvector ka biggest advantage: existing PostgreSQL infra mein fit ho jaata hai — no new service, familiar SQL, JOIN with regular tables. Pinecone: dedicated vector search, better performance at massive scale, multi-region.',
      },
      {
        text: 'pgvector hamesha better hai — open source aur free hai',
        correct: false,
        explanation: 'pgvector free hai lekin massive scale pe (100M+ vectors) Pinecone ka managed infrastructure better perform karta hai. Tool choice use case pe depend karta hai.',
      },
      {
        text: 'Dono same hain — sirf API mein difference hai',
        correct: false,
        explanation: 'Architecture fundamentally different hai. pgvector PostgreSQL extension hai, Pinecone dedicated vector database service hai. Performance characteristics aur use cases alag hain.',
      },
    ],
  },
  {
    question: 'HNSW algorithm kya hai aur vector search mein kyun important hai?',
    options: [
      {
        text: 'Hierarchical Node Search Wrapper — ek Python library',
        correct: false,
        explanation: 'HNSW ek algorithm hai, Python library nahi. Aur full form Hierarchical Navigable Small World hai.',
      },
      {
        text: 'Hierarchical Navigable Small World — ANN algorithm jo billion vectors mein millisecond similarity search possible banata hai',
        correct: true,
        explanation: 'Sahi! HNSW graph-based ANN algorithm hai. Billion vectors mein exact nearest neighbor O(N) time lagega — infeasible. HNSW approximate result O(log N) mein deta hai. Pinecone, pgvector, Weaviate sab HNSW use karte hain.',
      },
      {
        text: 'Ek hashing technique jo exact matches dhundhti hai',
        correct: false,
        explanation: 'HNSW approximate nearest neighbors dhundhta hai, exact nahi. Aur ye hashing nahi, graph traversal hai.',
      },
      {
        text: 'HNSW sirf small datasets ke liye hai',
        correct: false,
        explanation: 'Bilkul ulta — HNSW large scale pe (millions to billions of vectors) shine karta hai. Small datasets ke liye brute force bhi acceptable hota hai.',
      },
    ],
  },
  {
    question: 'Embedding "dimensions" kya hote hain aur storage cost pe unka kya impact hai?',
    options: [
      {
        text: 'Dimensions = image ke pixels — zyada dimensions = better image quality',
        correct: false,
        explanation: 'Embeddings images nahi hote. Dimensions = vector ki length (number of float values). Image quality se koi relation nahi.',
      },
      {
        text: 'Dimensions = vector mein numbers ki count. Zyada dimensions: better semantic representation, zyada storage aur compute cost',
        correct: true,
        explanation: 'Exactly! text-embedding-3-small = 1536 dimensions = 1536 float32 values = ~6KB per embedding. 1M documents = ~6GB sirf embeddings ke liye. text-embedding-3-large = 3072 dims = 2x cost. Trade-off: accuracy vs cost.',
      },
      {
        text: 'Dimensions fixed hote hain — sab embedding models same dimensions use karte hain',
        correct: false,
        explanation: 'Dimensions model-specific hote hain. text-embedding-3-small: 1536, text-embedding-3-large: 3072, ada-002: 1536, Cohere embed: 1024. Model choose karte waqt dimensions consider karo.',
      },
      {
        text: 'Zyada dimensions hamesha better hote hain — hamesha largest model choose karo',
        correct: false,
        explanation: 'Diminishing returns hote hain. text-embedding-3-small many tasks pe 3-large ke comparable hai lekin 2x cheaper. Benchmark karo apne task pe before committing to larger model.',
      },
    ],
  },
  {
    question: 'Pinecone mein "namespace" ka kya use hai?',
    options: [
      {
        text: 'Namespace = ek alag Pinecone account — different billing ke liye',
        correct: false,
        explanation: 'Namespace account se alag hai — ye ek index ke andar logical partition hai, alag account nahi.',
      },
      {
        text: 'Namespace = ek index ke andar logical partition — different tenants, data sources, ya environments separate karne ke liye',
        correct: true,
        explanation: 'Bilkul sahi! Ek Pinecone index mein multiple namespaces: "user_123", "user_456" — different users ka data isolated rakhne ke liye. Ya "production" aur "staging" environments. Query namespace-specific hoti hai.',
      },
      {
        text: 'Namespace sirf Pinecone Pro plan mein available hai',
        correct: false,
        explanation: 'Namespaces Pinecone ke free tier mein bhi available hain. Ye core feature hai multi-tenancy ke liye.',
      },
      {
        text: 'Namespace = index ka backup copy',
        correct: false,
        explanation: 'Namespaces backup nahi hain — ye logical data partitions hain same index ke andar. Backup ke liye alag mechanism hai.',
      },
    ],
  },
]

// ── Diagram ───────────────────────────────────────────────────────────────────

function VectorDbDiagram() {
  const items = [
    { label: 'Raw Text', sublabel: 'Document chunk or user query', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '📄' },
    { label: 'Embedding Model', sublabel: 'text-embedding-3-small → 1536 floats', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🧠' },
    { label: 'Dense Vector  [0.2, 0.8, -0.1 ...]', sublabel: 'High-dimensional semantic representation', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', icon: '🔢' },
    { label: 'Vector DB (Pinecone / pgvector)', sublabel: 'HNSW index stores millions of vectors', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '🗄️' },
    { label: 'Cosine Similarity Search', sublabel: 'Query vector vs all stored vectors — O(log N)', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🔍' },
    { label: 'Top-K Results Returned', sublabel: 'Most semantically similar chunks for RAG context', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', icon: '✅' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Vector DB — Semantic Search Flow</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter12Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.06)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          Vector Databases — RAG Ka Production Engine 🗄️
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Chapter 11 mein tumne in-memory cosine similarity se semantic search kiya — 10K documents tak theek tha. Lekin production mein 1M, 10M, 100M documents hote hain. Brute force O(N) search wahan infeasible hai. Vector databases ka kaam yahi hai: ANN (Approximate Nearest Neighbor) algorithms se billions of vectors mein milliseconds mein search karo.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <p className="text-[#FDE68A] text-sm italic">
            &quot;Vector DB wahi hai jo RAG ko production-ready banata hai. In-memory search demo ke liye hai, production ke liye nahi.&quot;
          </p>
        </div>
      </div>

      <VectorDbDiagram />

      {/* Card 1: Why Vector Databases */}
      <div id="why-vector-db">
        <ConceptCard
          title="Vector Databases Kyun? — Semantic vs Keyword"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="Ek simple comparison: SQL database se poochho 'doctor' — sirf exactly 'doctor' likhne wale rows milenge. Vector database se poochho 'doctor' — 'physician', 'medical professional', 'healthcare provider' sab milenge kyunki semantic meaning similar hai. Ye fundamental difference hai. Vector DB ki job: high-dimensional vectors store karo, fast approximate similarity search karo. SQL ki job: exact structured queries. Dono alag problems solve karte hain."
          whenToUse={[
            'RAG systems — document retrieval for LLM context.',
            'Semantic search engines — meaning-based search, not keyword.',
            'Recommendation systems — "similar items" based on content.',
            'Image/audio similarity — same concept, different modality.',
            'Duplicate/near-duplicate detection — same content, different words.',
          ]}
          whyUseIt="In-memory search ka problem: 100K documents = 100K dot products per query = noticeable latency. 1M documents = 1M dot products = seconds. Production mein ye acceptable nahi. Vector DB ka answer: HNSW/IVF indexing se O(N) ko O(log N) banao. Same results (approximate), 100x faster. Ye is chapter ka core insight hai."
          howToUse={{
            filename: 'why-vector-db.ts',
            language: 'typescript',
            code: `// ─── Keyword Search (traditional) ───────────────────────────────
// PROBLEM: exact word match only
const docs = [
  'JavaScript arrays are mutable data structures',
  'Node.js event loop handles asynchronous operations',
  'React components manage UI state',
];

function keywordSearch(query: string, docs: string[]): string[] {
  return docs.filter(doc =>
    query.split(' ').some(word =>
      doc.toLowerCase().includes(word.toLowerCase())
    )
  );
}

// Query: "how to store multiple values in JS"
// Keyword result: [] (nothing matches "store multiple values")
// Semantic result: ["JavaScript arrays are mutable data structures"] ✓

// ─── Why Vector DB? ──────────────────────────────────────────────
// 1. Semantic understanding — meaning not words
// 2. Scale — billions of vectors, millisecond search
// 3. Metadata filtering — combine semantic + structured filters
// 4. Real-time upsert — add new vectors without rebuilding index
// 5. Multi-tenancy — namespaces for different users/tenants

// Popular choices:
// Pinecone: fully managed, best for pure vector search
// pgvector: PostgreSQL extension, SQL + vectors together
// Weaviate: open-source, built-in ML models
// Qdrant: open-source, Rust-based, fast
// Chroma: easy local dev, Python-first`,
            explanation: 'Popular choices: Pinecone (managed, pure vector search, best for scale), pgvector (PostgreSQL extension, SQL + vectors, free), Weaviate (open-source, built-in ML models), Qdrant (open-source, Rust-based, fast), Chroma (local dev, easy setup). Start karo decision: already PostgreSQL hai? pgvector. Pure vector search + managed? Pinecone. Self-hosted? Qdrant.',
          }}
          realWorldScenario="Legal research platform: lawyer searches 'contract breach consequences' — keyword search ne 'remedies for agreement violation' miss kiya (same concept, alag words). Vector DB ne dono retrieve kiye kyunki embedding space mein semantically close hain. Lawyer research time 70% save hua. Ye hai semantic search ka production value."
          commonMistakes={[
            {
              mistake: 'In-memory vector search production mein use karna',
              why: '10K documents tak theek hai, 100K+ pe brute force O(N) search infeasible ho jaati hai. Latency spike karta hai.',
              fix: 'Development mein Chroma ya FAISS use karo (local). Production mein Pinecone ya pgvector — HNSW indexing se O(log N) search.',
            },
          ]}
          proTip="Hybrid search production RAG ka secret weapon hai: semantic similarity + structured metadata filter. 'Find documents semantically similar to my query WHERE date > 2024 AND category = legal AND user_id = 123'. Pinecone aur pgvector dono metadata filtering support karte hain. Pure semantic search se better precision milti hai real applications mein."
        />
      </div>

      {/* Card 2: Embeddings in Practice */}
      <div id="embeddings-practice">
        <ConceptCard
          title="Embeddings in Practice — Dimensions, Cost, Storage"
          emoji="🔢"
          difficulty="intermediate"
          whatIsIt="Practical numbers jaano: text-embedding-3-small ek text le ta hai, 1536 floats ka array return karta hai. Har float 4 bytes = ek embedding 6KB. 1M documents = 6GB sirf embeddings. text-embedding-3-large: 3072 dims = 12GB. Ye storage cost real hai. Matryoshka feature: OpenAI v3 models dimensions reduce kar sakte ho — 256 dims = 1KB per embedding = 1GB for 1M docs. Trade-off: accuracy vs cost."
          whenToUse={[
            'OpenAI text-embedding-3-small: best bang-for-buck, most use cases ke liye.',
            'text-embedding-3-large: accuracy critical ho aur budget available ho.',
            'Voyage AI: Anthropic projects mein better performance deta hai.',
            'Cohere embed-v3: multilingual tasks ke liye strong.',
            'Local embeddings (nomic-embed, all-MiniLM): offline/privacy requirements.',
          ]}
          whyUseIt="Ye decision irreversible jaisi hai — ek baar 1M documents embed kiye toh model change karna = poora corpus re-embed karna = time + cost. Isliye upfront soch ke choose karo. Aur ek warning: generic benchmarks misleading hain. apne domain pe khud benchmark karo — 50-100 representative queries se. Domain-specific accuracy generic scores se bahut alag ho sakti hai."
          howToUse={{
            filename: 'embeddings-practice.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';

const openai = new OpenAI();

// ─── Cost & Storage Calculator ───────────────────────────────────
function calcStorageCost(
  docCount: number,
  dimensions: number = 1536,
  bytesPerFloat: number = 4
): { storageGB: number; costPerMonthUSD: number } {
  const storageBytes = docCount * dimensions * bytesPerFloat;
  const storageGB = storageBytes / (1024 ** 3);
  // Pinecone approximate pricing: ~$0.096/GB/month (starter)
  const costPerMonthUSD = storageGB * 0.096;
  return { storageGB, costPerMonthUSD };
}

// 1M docs, 1536 dims: ~5.7GB, ~$0.55/month storage
console.log(calcStorageCost(1_000_000)); // { storageGB: 5.7, costPerMonthUSD: 0.55 }

// ─── Batch Embedding (efficient) ─────────────────────────────────
async function batchEmbed(texts: string[], batchSize = 100): Promise<number[][]> {
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: batch,
    });
    allEmbeddings.push(...response.data.map(d => d.embedding));
    console.log(\`Embedded \${Math.min(i + batchSize, texts.length)}/\${texts.length}\`);
  }

  return allEmbeddings;
}

// ─── Dimension Reduction (Matryoshka) ────────────────────────────
// text-embedding-3-small supports dimensions param!
async function embedReduced(text: string, dims = 256): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
    dimensions: dims, // 256, 512, 768, 1024, 1536
  });
  return res.data[0].embedding;
}`,
            explanation: 'Batch embedding efficiency: ek API call mein 100 texts vs 100 individual calls — much faster aur cleaner rate limiting. Storage calculator se actual cost estimate karo before committing. Matryoshka (dimensions param): 256 dims se start karo — accuracy benchmark karo, kaafi hain toh rakho, nahi toh badhao. 4x smaller = 4x cheaper storage + faster queries.',
          }}
          realWorldScenario="SaaS company: 10M support tickets embed karne the. Calculation: text-embedding-3-small 1536 dims = 57GB storage. text-embedding-3-large = 114GB. 256-dim Matryoshka = 9.5GB. Benchmark: 256-dim accuracy only 3% lower on their domain queries. Decision: 256-dim use karo — 80% storage saving, 3% accuracy trade-off acceptable. Ye informed engineering decision hai."
          commonMistakes={[
            {
              mistake: 'Embeddings generate karne ke baad model version change karna',
              why: 'Different model versions incompatible embedding spaces generate karte hain. Mixed embeddings = broken similarity search.',
              fix: 'Model version pin karo (e.g., text-embedding-3-small). Change karne pe poora corpus re-embed karo — incremental update possible nahi hai.',
            },
          ]}
          proTip="Claude-based projects ke liye Voyage AI (voyage-3) try karo — Anthropic internally recommend karta hai, Claude ke saath better retrieval quality deta hai. OpenAI projects ke liye text-embedding-3-small default choice hai. Decision rule: embedding model aur LLM ko same company se rakhna often slightly better results deta hai — ek combined system ki tarah optimize hote hain."
        />
      </div>

      {/* Card 3: Pinecone */}
      <div id="pinecone">
        <ConceptCard
          title="Pinecone — Managed Vector Database"
          emoji="🌲"
          difficulty="intermediate"
          whatIsIt="Pinecone ek philosophy hai: vector search ke baare mein mat socho, sirf karo. Koi server setup, koi index tuning, koi scaling worry nahi. API key lo, index banao, upsert karo, query karo. Free tier prototype ke liye kaafi hai. Namespaces se multi-tenancy (user_123 ka data user_456 se isolated), metadata filters se hybrid search. Production pe consistent <100ms latency at any scale."
          whenToUse={[
            'RAG production deployment — koi infrastructure worry nahi.',
            'Multi-tenant apps — different users ka data namespace mein isolate karo.',
            'Hybrid search — vector similarity + metadata filters (date, category, user_id).',
            'Startup — quickly ship karna hai, managed service perfect hai.',
            'Scale chahiye — millions to billions of vectors with consistent latency.',
          ]}
          whyUseIt="Kab Pinecone choose karo? Jab vector search hi core problem hai aur ops overhead afford nahi kar sakte (early stage startup), ya jab massive scale chahiye (50M+ vectors) aur managed infra preferred hai. Kab nahi? Jab already PostgreSQL hai — pgvector free hai aur SQL JOIN with vector search possible hai. Pinecone = vendor lock-in + extra cost, lekin ops simplicity ka fayda real hai."
          howToUse={{
            filename: 'pinecone-rag.ts',
            language: 'typescript',
            code: `import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI();

const index = pc.index('my-rag-index');

// ─── Store document chunk ─────────────────────────────────────────
async function storeChunk(text: string, id: string, metadata: Record<string, string> = {}) {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  await index.upsert([{
    id,
    values: embedding.data[0].embedding,
    metadata: { text, ...metadata },
  }]);
}

// ─── Search similar chunks ────────────────────────────────────────
async function search(query: string, topK = 5, namespace?: string) {
  const qEmbed = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const queryOptions = {
    vector: qEmbed.data[0].embedding,
    topK,
    includeMetadata: true,
  };

  const ns = namespace ? index.namespace(namespace) : index;
  return ns.query(queryOptions);
}

// ─── Complete RAG function ────────────────────────────────────────
async function ragAnswer(question: string, userId: string): Promise<string> {
  // 1. Retrieve relevant chunks for this user's namespace
  const results = await search(question, 5, \`user-\${userId}\`);

  const context = results.matches
    ?.map(m => m.metadata?.text as string)
    .filter(Boolean)
    .join('\\n\\n') ?? '';

  if (!context) return 'Koi relevant information nahi mili.';

  // 2. Generate answer with context
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: 'Answer only from the provided context. If unsure, say so.',
    messages: [{ role: 'user', content: \`Context: \${context}\\n\\nQuestion: \${question}\` }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}`,
            explanation: 'Pinecone workflow: dashboard pe index banao (dimensions specify karo — 1536 for text-embedding-3-small, GALTI mat karo warna re-create karna padega). Upsert: id + values + metadata. Query: vector + topK + includeMetadata: true (warna sirf IDs milte hain, text nahi). Namespace pattern: `user-${userId}` se per-user data isolation.',
          }}
          realWorldScenario="Customer service platform: 500K support articles, namespace per product line. Query time: <80ms P95 globally. Multi-tenant isolation: har customer ka data apne namespace mein. Monthly cost breakdown: Pinecone ~$70 + OpenAI embeddings ~$20 = $90 total. Ye production numbers hain — planning karo accordingly."
          commonMistakes={[
            {
              mistake: 'Index dimensions wrong set karna',
              why: 'Pinecone index create karte waqt dimensions specify karni padti hai. Ye baad mein change nahi ho sakti. Wrong dimensions = upsert fail.',
              fix: 'text-embedding-3-small ke liye dimension: 1536. text-embedding-3-large: 3072. Index create karne se pehle embedding model ka dimension confirm karo.',
            },
          ]}
          proTip="Pinecone index dimensions create karte waqt galat set karo toh index delete karke recreate karna padta hai — poora re-embed. Ye mistake common hai. Always: embedding model ki dimensions confirm karo (text-embedding-3-small = 1536), phir index create karo. Dashboard pe dimensions visible hoti hain after creation — double-check karo."
        />
      </div>

      {/* Card 4: pgvector */}
      <div id="pgvector">
        <ConceptCard
          title="pgvector — PostgreSQL + Vectors"
          emoji="🐘"
          difficulty="intermediate"
          whatIsIt="pgvector ek extension hai PostgreSQL ke liye — CREATE EXTENSION vector; ek command se vector storage aur similarity search enable ho jaata hai. Koi alag service nahi, koi alag billing nahi. SQL ka pura power milta hai vector search ke saath: 'find semantically similar products WHERE price < 1000 AND in_stock = true AND user_id = 123'. Ye JOIN aur filter Pinecone mein nahi hote."
          whenToUse={[
            'Already PostgreSQL hai infrastructure mein — simplest integration.',
            'SQL + vector queries combine karne chahiye (JOINs, filters).',
            'Small to medium scale — upto ~1M vectors with good performance.',
            'Self-hosted chahiye — Supabase, Neon, Railway pe pgvector ready hai.',
            'Cost sensitive — no additional managed service cost.',
          ]}
          whyUseIt="pgvector choose karo jab: already PostgreSQL hai (extra service nahi chahiye), SQL JOIN with vector results chahiye (user data + vector results), self-hosted chahiye (cost sensitive), ya Supabase use kar rahe ho (pgvector free included). Scale: upto 1M vectors pe excellent performance. 10M+ pe Pinecone consider karo. Start here, migrate if needed."
          howToUse={{
            filename: 'pgvector-example.ts',
            language: 'typescript',
            code: `import { Pool } from 'pg';
import OpenAI from 'openai';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const openai = new OpenAI();

// ─── Setup (run once) ─────────────────────────────────────────────
async function setup() {
  await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
  await pool.query(\`
    CREATE TABLE IF NOT EXISTS documents (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      embedding vector(1536),  -- dimension must match model
      metadata JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  \`);
  // HNSW index for fast ANN search
  await pool.query(\`
    CREATE INDEX IF NOT EXISTS documents_embedding_idx
    ON documents USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64)
  \`);
}

// ─── Store document ───────────────────────────────────────────────
async function storeDoc(content: string, metadata: object = {}) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: content,
  });
  const embedding = res.data[0].embedding;

  await pool.query(
    'INSERT INTO documents (content, embedding, metadata) VALUES ($1, $2, $3)',
    [content, JSON.stringify(embedding), JSON.stringify(metadata)]
  );
}

// ─── Semantic search ──────────────────────────────────────────────
async function semanticSearch(query: string, topK = 5) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const queryEmb = JSON.stringify(res.data[0].embedding);

  const result = await pool.query(
    \`SELECT content, metadata, 1 - (embedding <=> $1::vector) AS similarity
     FROM documents
     ORDER BY embedding <=> $1::vector
     LIMIT $2\`,
    [queryEmb, topK]
  );
  return result.rows;
}`,
            explanation: 'pgvector operators: <=> cosine distance (most common for embeddings), <-> L2/Euclidean distance, <#> negative inner product. ORDER BY embedding <=> queryVector se most similar results milte hain. HNSW index critical hai — bina iske sequential scan karta hai (O(N), slow). Supabase pe pgvector free tier mein bhi hai — instant start.',
          }}
          realWorldScenario="Indie developer: personal knowledge base, Supabase free tier pe pgvector. Notes, bookmarks, articles embed kiye — total embedding cost $2. Query time: <50ms for 10K notes. Total infrastructure cost: $0. Pinecone ki zarurat nahi thi. Small to medium projects ke liye pgvector + Supabase is the most cost-effective stack possible."
          commonMistakes={[
            {
              mistake: 'HNSW index banana bhool jana',
              why: 'Bina index ke pgvector sequential scan karta hai — O(N). 100K rows pe 1-2 seconds lag sakti hai. Index ke saath <10ms.',
              fix: "CREATE INDEX USING hnsw karo embedding column pe vector_cosine_ops ke saath. Existing data pe index banana time leta hai — maintenance window mein karo.",
            },
          ]}
          proTip="HNSW index banana bhool gaye? Ye common mistake hai aur painful hoti hai production mein. Create karo: CREATE INDEX USING hnsw (embedding vector_cosine_ops) WITH (m=16, ef_construction=64). Existing data pe index build time leta hai — maintenance window mein karo. After: EXPLAIN ANALYZE query karo — Index Scan dikhna chahiye, Sequential Scan nahi."
        />
      </div>

      {/* Card 5: ANN Algorithms */}
      <div id="ann-algorithms">
        <ConceptCard
          title="ANN Algorithms — HNSW & IVF"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Exact nearest neighbor search: 1M vectors mein har query ke liye 1M dot products — ~100ms at 1536 dims. 100M vectors? 10 seconds. Ye production mein unacceptable hai. ANN ka idea: approximate results dhundo, 99% accuracy maintain karo, but 1000x faster ho jao. HNSW: graph traverse karo (like a map with highways), logarithmic time. IVF: clusters mein organize karo, sirf relevant clusters search karo."
          whenToUse={[
            'HNSW: accuracy priority, memory available — Pinecone, Weaviate default.',
            'IVF: large datasets, memory constrained — FAISS default for large scale.',
            'Brute force (exact): <10K vectors, accuracy critical, latency not urgent.',
            'IVF-PQ: extreme scale (100M+ vectors), memory critical — product quantization.',
          ]}
          whyUseIt="Ye numbers yaad rakhne waale hain: 1M vectors, brute force = ~100ms. HNSW = ~1ms. 100x faster. Approximate results ka accuracy? 98-99% recall@K — ye matlab hai ki 100 mein se 98-99 relevant results sahi hain. 1-2% miss hona RAG ke liye completely acceptable hai. Perfect accuracy ke liye 100x latency pay karna — wrong trade-off."
          howToUse={{
            filename: 'ann-algorithms.ts',
            language: 'typescript',
            code: `// ANN Algorithms — conceptual understanding

// ─── Why ANN? ─────────────────────────────────────────────────────
// Exact search: O(N * D) where D = dimensions
// 1M vectors * 1536 dims = 1.5B operations per query = ~100ms
// HNSW: O(log N) approximately = ~1ms ✓

// ─── HNSW (Hierarchical Navigable Small World) ────────────────────
// How it works:
// - Multi-layer graph structure
// - Top layers: long-range connections (sparse)
// - Bottom layers: short-range connections (dense)
// - Query: start at top, navigate down to find closest

// Key parameters:
// M: number of connections per node (16-64)
//    Higher M = better accuracy, more memory
// ef_construction: size of candidate list during index build (64-200)
//    Higher = better quality index, slower build
// ef_search: candidate list size during query (same or higher than M)
//    Higher = better accuracy, slower query

// pgvector HNSW example:
// CREATE INDEX USING hnsw (embedding vector_cosine_ops)
// WITH (m = 16, ef_construction = 64);
// SET hnsw.ef_search = 40; -- query time setting

// ─── IVF (Inverted File Index) ────────────────────────────────────
// How it works:
// - K-means clustering: partition vectors into N clusters
// - Query: find closest clusters, search only those
// - nprobe: how many clusters to search (accuracy vs speed)

// FAISS (Facebook AI Similarity Search) — most popular IVF:
// import faiss from 'faiss-node'; // Node.js binding
// const index = faiss.IndexFlatL2(1536); // exact (demo)
// const ivfIndex = faiss.IndexIVFFlat(quantizer, 1536, nlist);

// ─── Accuracy vs Speed Trade-off ─────────────────────────────────
const configs = [
  { method: 'Brute Force', recall: 1.0, qps: 10, memory: 'Low' },
  { method: 'IVF (nprobe=10)', recall: 0.95, qps: 500, memory: 'Low' },
  { method: 'HNSW (M=16)', recall: 0.98, qps: 1000, memory: 'High' },
  { method: 'HNSW (M=64)', recall: 0.99, qps: 500, memory: 'Very High' },
] as const;

console.table(configs);`,
            explanation: 'HNSW parameters: m (connections per node — zyada = better accuracy, zyada memory), ef_construction (build quality — zyada = better index, slower build). pgvector pe defaults (m=16, ef_construction=64) kaafi hain most cases ke liye. Pinecone internally HNSW use karta hai, tune karne ki zarurat nahi. Table dekhkar trade-offs samjho: HNSW accuracy-first, IVF memory-efficient.',
          }}
          realWorldScenario="E-commerce: 50M product embeddings. Brute force: 5 seconds per search — unusable. IVF (nlist=1000, nprobe=20): 15ms, 97% recall — good enough for recommendations. HNSW (M=32): 8ms, 99% recall, 2x memory — better for live search. Decision: HNSW main search ke liye, IVF background batch recommendations ke liye. Right tool for right job."
          commonMistakes={[
            {
              mistake: 'ANN parameters default pe chhod dena production mein',
              why: 'Default parameters conservative hote hain. Tune karne se 2-5x latency improvement possible hai without accuracy loss.',
              fix: 'Benchmark karo: recall@K measure karo different parameter settings pe. ef_search badhane se accuracy improve hoti hai at latency cost — sweet spot find karo.',
            },
          ]}
          proTip="ann-benchmarks.com visit karo — ye site different ANN algorithms ka comprehensive comparison deti hai apne dataset type ke hisaab se. Most of the time: Pinecone use karo (internals handle karta hai) ya pgvector HNSW use karo (defaults theek hain). Tuning sirf tab karo jab latency genuinely issue ho — premature optimization avoid karo."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 12 Quiz — Vector Databases
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Vectors samjhe? Test karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="vector-databases" />
      </div>
    </div>
  )
}
