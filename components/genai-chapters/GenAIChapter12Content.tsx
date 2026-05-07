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
          Vector Databases — Semantic Search Ka Engine 🗄️
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          RAG ka dil vector database hai. Billions of embeddings mein milliseconds mein similar content dhundho — Pinecone, pgvector, aur ANN algorithms samjho.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <p className="text-[#FDE68A] text-sm italic">
            &quot;Vector DB wahi hai jo RAG ko production-ready banata hai. In-memory cosine similarity sirf demos ke liye hai.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: Why Vector Databases */}
      <div id="why-vector-db">
        <ConceptCard
          title="Vector Databases Kyun? — Semantic vs Keyword"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="Traditional databases exact match ke liye hain — 'find rows where name = John'. Vector databases semantic similarity ke liye hain — 'find documents whose meaning is closest to this query'. Embeddings (high-dimensional vectors) store karte hain aur approximate nearest neighbor search karte hain milliseconds mein, even billions of vectors mein."
          whenToUse={[
            'RAG systems — document retrieval for LLM context.',
            'Semantic search engines — meaning-based search, not keyword.',
            'Recommendation systems — "similar items" based on content.',
            'Image/audio similarity — same concept, different modality.',
            'Duplicate/near-duplicate detection — same content, different words.',
          ]}
          whyUseIt="Keyword search 'doctor' query pe 'physician' ya 'medical professional' nahi dhundh sakti. Vector DB ye dhundh sakti hai kyunki embeddings semantic meaning capture karte hain. Production RAG ke liye vector DB zaroori hai — in-memory cosine similarity millions of vectors pe infeasible ho jaati hai."
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
            explanation: 'Keyword search: fast, exact. Semantic search: meaning-based, handles synonyms, paraphrases, multilingual. For RAG: semantic retrieval is non-negotiable. User queries rarely match document text exactly — semantic understanding fills this gap.',
          }}
          realWorldScenario="Legal research platform: lawyer searches 'contract breach consequences' — keyword search misses 'remedies for agreement violation'. Vector DB retrieves both because embedding space mein ye close hain. Lawyer time 70% save hua relevant case law dhundne mein."
          commonMistakes={[
            {
              mistake: 'In-memory vector search production mein use karna',
              why: '10K documents tak theek hai, 100K+ pe brute force O(N) search infeasible ho jaati hai. Latency spike karta hai.',
              fix: 'Development mein Chroma ya FAISS use karo (local). Production mein Pinecone ya pgvector — HNSW indexing se O(log N) search.',
            },
          ]}
          proTip="Hybrid search — vector similarity + keyword filtering combination — often best results deta hai. Pinecone metadata filters support karta hai: semantic search + filter by date, category, user_id. Ye production RAG mein common pattern hai."
        />
      </div>

      {/* Card 2: Embeddings in Practice */}
      <div id="embeddings-practice">
        <ConceptCard
          title="Embeddings in Practice — Dimensions, Cost, Storage"
          emoji="🔢"
          difficulty="intermediate"
          whatIsIt="Embedding ek text ko float numbers ka array mein convert karta hai — ye array semantic meaning represent karta hai. OpenAI text-embedding-3-small: 1536 dimensions. text-embedding-3-large: 3072 dimensions. Anthropic, Cohere, Voyage — sab ke apne embedding models hain. Dimensions, cost, accuracy — teen factors mein balance karna hai."
          whenToUse={[
            'OpenAI text-embedding-3-small: best bang-for-buck, most use cases ke liye.',
            'text-embedding-3-large: accuracy critical ho aur budget available ho.',
            'Voyage AI: Anthropic projects mein better performance deta hai.',
            'Cohere embed-v3: multilingual tasks ke liye strong.',
            'Local embeddings (nomic-embed, all-MiniLM): offline/privacy requirements.',
          ]}
          whyUseIt="Embedding model choice long-term impact karta hai — ek baar embed kiya toh poora database us model pe dependent ho jaata hai. Model change karna = poora corpus re-embed karna. Isliye upfront soch ke choose karo. Benchmark apne specific domain pe — generic benchmarks misleading ho sakte hain."
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
            explanation: 'Batch embedding ek API call mein 100 texts embed karna zyada efficient hai vs ek ek. Matryoshka embeddings: OpenAI v3 models truncated dimensions support karte hain — 256 dims se start karo, accuracy check karo, zarurat pe badhao. 4x smaller = 4x cheaper storage.',
          }}
          realWorldScenario="SaaS company 10M customer support tickets embed karna chahti hai. text-embedding-3-small se: 10M * 1536 * 4 bytes = ~57GB. text-embedding-3-large (3072 dims): ~114GB. 256-dim Matryoshka: ~9.5GB, 80% cost saving. Benchmark pe 256-dim performance only 3% drop — easy decision."
          commonMistakes={[
            {
              mistake: 'Embeddings generate karne ke baad model version change karna',
              why: 'Different model versions incompatible embedding spaces generate karte hain. Mixed embeddings = broken similarity search.',
              fix: 'Model version pin karo (e.g., text-embedding-3-small). Change karne pe poora corpus re-embed karo — incremental update possible nahi hai.',
            },
          ]}
          proTip="Voyage AI (voyage-3) Anthropic documents pe Claude ke saath best results deta hai — Anthropic ne bhi internally recommend kiya hai. OpenAI projects ke liye text-embedding-3-small. Apne domain pe both benchmark karo — 5-10 point difference real hota hai production mein."
        />
      </div>

      {/* Card 3: Pinecone */}
      <div id="pinecone">
        <ConceptCard
          title="Pinecone — Managed Vector Database"
          emoji="🌲"
          difficulty="intermediate"
          whatIsIt="Pinecone sabse popular managed vector database service hai. Koi infrastructure manage nahi karna — upsert karo, query karo. Serverless tier free mein available hai. Namespaces se multi-tenancy, metadata filters se hybrid search — production-ready vector DB without ops overhead."
          whenToUse={[
            'RAG production deployment — koi infrastructure worry nahi.',
            'Multi-tenant apps — different users ka data namespace mein isolate karo.',
            'Hybrid search — vector similarity + metadata filters (date, category, user_id).',
            'Startup — quickly ship karna hai, managed service perfect hai.',
            'Scale chahiye — millions to billions of vectors with consistent latency.',
          ]}
          whyUseIt="Pinecone ops burden zero karta hai — no indexing tuning, no server management, automatic scaling. Free tier kaafi hai prototyping ke liye. Production latency consistently under 100ms even at scale. tradeoff: vendor lock-in aur cost zyada hoti hai self-hosted vs pgvector."
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
            explanation: 'Pinecone workflow: index create karo (dashboard ya API) → upsert vectors → query. Namespaces multi-tenant isolation ke liye perfect hain. Metadata store karo (text, source, date) aur filter karo queries mein. includeMetadata: true se original text bhi retrieve hoti hai.',
          }}
          realWorldScenario="Customer service platform ne Pinecone pe 500K support articles embed kiye (namespace per product line). Query time: <80ms P95. Multi-tenant: har customer ka data apne namespace mein. Monthly cost: Pinecone ~$70 + OpenAI embeddings ~$20 = $90 total for 500K vectors."
          commonMistakes={[
            {
              mistake: 'Index dimensions wrong set karna',
              why: 'Pinecone index create karte waqt dimensions specify karni padti hai. Ye baad mein change nahi ho sakti. Wrong dimensions = upsert fail.',
              fix: 'text-embedding-3-small ke liye dimension: 1536. text-embedding-3-large: 3072. Index create karne se pehle embedding model ka dimension confirm karo.',
            },
          ]}
          proTip="Pinecone serverless tier mein index pe pods nahi lagte — pay per use model hai. Prototype se production tak same API. Starter se Production mein migrate karna: new index create karo, data re-upsert karo — live migration supported hai via index copy feature."
        />
      </div>

      {/* Card 4: pgvector */}
      <div id="pgvector">
        <ConceptCard
          title="pgvector — PostgreSQL + Vectors"
          emoji="🐘"
          difficulty="intermediate"
          whatIsIt="pgvector PostgreSQL ka extension hai jo vector storage aur similarity search enable karta hai. Agar already PostgreSQL use kar rahe ho — pgvector add karo, alag service nahi chahiye. SQL queries ke saath vector search combine kar sakte ho: 'find similar products for user WHERE price < 1000 AND in_stock = true'."
          whenToUse={[
            'Already PostgreSQL hai infrastructure mein — simplest integration.',
            'SQL + vector queries combine karne chahiye (JOINs, filters).',
            'Small to medium scale — upto ~1M vectors with good performance.',
            'Self-hosted chahiye — Supabase, Neon, Railway pe pgvector ready hai.',
            'Cost sensitive — no additional managed service cost.',
          ]}
          whyUseIt="pgvector ka biggest advantage: existing PostgreSQL stack ke saath integrate hota hai. User table ke saath JOIN, transaction support, familiar SQL. Pinecone mein ek alag service manage karna hota hai. Supabase pe pgvector free hai — startup ke liye perfect starting point."
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
            explanation: 'pgvector operators: <=> cosine distance, <-> L2 distance, <#> inner product. HNSW index dramatically speeds up search. Supabase pe pgvector built-in hai — free tier mein bhi. SQL + vector combination powerful hai: JOIN with users table, filter by date, combine semantic + structured search.',
          }}
          realWorldScenario="Indie developer ne personal knowledge base banaya Supabase pe (pgvector free tier). Notes, bookmarks, articles embed kiye. Query: 'React performance optimization tips' — relevant notes milliseconds mein. Total cost: $0 (Supabase free tier). Pinecone ki zarurat nahi thi is scale pe."
          commonMistakes={[
            {
              mistake: 'HNSW index banana bhool jana',
              why: 'Bina index ke pgvector sequential scan karta hai — O(N). 100K rows pe 1-2 seconds lag sakti hai. Index ke saath <10ms.',
              fix: "CREATE INDEX USING hnsw karo embedding column pe vector_cosine_ops ke saath. Existing data pe index banana time leta hai — maintenance window mein karo.",
            },
          ]}
          proTip="Supabase pe pgvector ke liye: supabase-js library mein direct vector search support hai. Neon PostgreSQL bhi pgvector support karta hai serverless mode mein. Production scale (1M+ vectors) pe Pinecone consider karo — pgvector upto 1M pe solid hai, uske baad HNSW memory hungry ho jaata hai."
        />
      </div>

      {/* Card 5: ANN Algorithms */}
      <div id="ann-algorithms">
        <ConceptCard
          title="ANN Algorithms — HNSW & IVF"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Approximate Nearest Neighbor (ANN) algorithms billion vectors mein exact search (O(N)) ke bajaye fast approximate search (O(log N)) karte hain. HNSW (Hierarchical Navigable Small World): graph-based, high accuracy, higher memory. IVF (Inverted File Index): cluster-based, lower memory, slight accuracy drop. Both far faster than brute force."
          whenToUse={[
            'HNSW: accuracy priority, memory available — Pinecone, Weaviate default.',
            'IVF: large datasets, memory constrained — FAISS default for large scale.',
            'Brute force (exact): <10K vectors, accuracy critical, latency not urgent.',
            'IVF-PQ: extreme scale (100M+ vectors), memory critical — product quantization.',
          ]}
          whyUseIt="1M vectors ka exact nearest neighbor search: brute force = 1M dot products = ~100ms. HNSW: ~1ms. At production scale, ye difference 100x latency ya cost mein translates karta hai. Approximate results 99%+ accuracy maintain karte hain — practical difference negligible."
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
            explanation: 'HNSW: graph navigate karke approximate NN dhundho. IVF: clusters mein partition, relevant clusters search karo. Trade-off: accuracy vs speed vs memory. Production mein: Pinecone HNSW use karta hai by default — tune karna nahi padta. pgvector pe HNSW manually configure karo.',
          }}
          realWorldScenario="Large e-commerce platform: 50M product embeddings. Brute force: 5 seconds per search — unusable. IVF (nlist=1000, nprobe=20): 15ms, 97% recall. HNSW (M=32): 8ms, 99% recall, 2x memory. Decision: HNSW for flagship search (accuracy important), IVF for batch recommendations (throughput important)."
          commonMistakes={[
            {
              mistake: 'ANN parameters default pe chhod dena production mein',
              why: 'Default parameters conservative hote hain. Tune karne se 2-5x latency improvement possible hai without accuracy loss.',
              fix: 'Benchmark karo: recall@K measure karo different parameter settings pe. ef_search badhane se accuracy improve hoti hai at latency cost — sweet spot find karo.',
            },
          ]}
          proTip="ann-benchmarks.com par different algorithms ka comprehensive benchmark hai — dataset type, dimensions, accuracy, speed sab pe. Apne use case ke closest dataset dekho aur decide karo. Pinecone use kar rahe ho toh internals worry mat karo — ye automatically optimize karta hai."
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
