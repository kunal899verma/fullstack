'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── RAG Pipeline Diagram ──────────────────────────────────────────────────────

function RAGPipelineDiagram() {
  const steps = [
    { label: 'Documents', sub: 'PDFs, web pages, docs', color: '#10B981', icon: '📄' },
    { label: 'Chunking', sub: 'Split into small pieces', color: '#F59E0B', icon: '✂️' },
    { label: 'Embedding', sub: 'Convert to vectors', color: '#7C3AED', icon: '🔢' },
    { label: 'Vector DB', sub: 'Pinecone / pgvector', color: '#06B6D4', icon: '🗄️' },
    { label: 'Retrieval', sub: 'Find similar chunks', color: '#F97316', icon: '🔍' },
    { label: 'Generation', sub: 'LLM answers with context', color: '#EF4444', icon: '🤖' },
  ]

  return (
    <div className="space-y-2 my-2">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-3">
          <div
            className="rounded-xl px-3 py-2 flex items-center gap-2 flex-1"
            style={{ background: `${step.color}12`, border: `1px solid ${step.color}35` }}
          >
            <span className="text-lg">{step.icon}</span>
            <div>
              <div className="font-semibold text-[#F5F5F7] text-sm">{step.label}</div>
              <div className="text-xs text-[#A1A1AA]">{step.sub}</div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="text-[#71717A] text-lg">→</div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'RAG ka full form kya hai aur ye kyun use kiya jaata hai?',
    options: [
      {
        text: 'Random Augmented Generation — output random banana ke liye',
        correct: false,
        explanation: 'RAG ka matlab Random nahi hai. Ye ek architecture hai jo LLM ko external knowledge deta hai.',
      },
      {
        text: 'Retrieval Augmented Generation — LLM ko external knowledge dene ke liye taaki hallucinations kam ho',
        correct: true,
        explanation: 'Bilkul sahi! RAG mein pehle relevant documents retrieve hote hain, phir LLM un documents ke saath answer generate karta hai. Isse LLM apni training data ke bahar bhi accurate answers de sakta hai.',
      },
      {
        text: 'Reinforcement Augmented Generation — reward se LLM train karna',
        correct: false,
        explanation: 'Ye RLHF (Reinforcement Learning from Human Feedback) ka description hai, RAG ka nahi.',
      },
      {
        text: 'Retrieval Algorithm Generator — database queries generate karna',
        correct: false,
        explanation: 'RAG database queries generate nahi karta — ye semantic search se relevant chunks retrieve karta hai.',
      },
    ],
  },
  {
    question: 'Chunking strategy choose karte waqt sabse important factor kya hai?',
    options: [
      {
        text: 'Hamesha fixed 512 tokens use karo — ye industry standard hai',
        correct: false,
        explanation: 'Fixed size chunking kaafi baar sentence beech mein tod deta hai, context break ho jaata hai. Task-specific strategy better hoti hai.',
      },
      {
        text: 'Content type aur retrieval use case ke hisaab se — code ke liye function-level, prose ke liye semantic boundaries',
        correct: true,
        explanation: 'Sahi! Legal documents ke liye semantic chunking better hai (clause boundaries). Code ke liye function/class boundaries. FAQs ke liye Q&A pairs. One size does not fit all.',
      },
      {
        text: 'Jitna bada chunk utna better — zyada context LLM ko milega',
        correct: false,
        explanation: 'Bahut bade chunks retrieval precision kam karte hain — relevant content ek bade chunk mein dub jaata hai. Smaller focused chunks better retrieval dete hain.',
      },
      {
        text: 'Chunking zaroori nahi — pura document embed kar sakte hain',
        correct: false,
        explanation: 'Embedding models ka context limit hota hai (typical: 8k tokens). Bade documents directly embed nahi ho sakte aur retrieval bhi poor hoti hai.',
      },
    ],
  },
  {
    question: 'Semantic search aur keyword search mein kya fundamental fark hai?',
    options: [
      {
        text: 'Semantic search faster hoti hai — isliye prefer ki jaati hai',
        correct: false,
        explanation: 'Speed ka is distinction se koi lena dena nahi. Fundamental fark meaning vs exact words ka hai.',
      },
      {
        text: 'Semantic search meaning samajhti hai — "car" aur "automobile" ko related maanti hai. Keyword search exact words match karti hai.',
        correct: true,
        explanation: 'Exactly! Embeddings semantic meaning capture karte hain. Isliye "puppy" query pe "young dog" bhi retrieve ho sakta hai. Keyword search sirf exact word matches dhundhti hai.',
      },
      {
        text: 'Keyword search AI use karti hai, semantic search rules use karti hai',
        correct: false,
        explanation: 'Ulta hai. Semantic search AI/ML (embeddings) use karti hai. Traditional keyword search (BM25, TF-IDF) statistics-based hoti hai.',
      },
      {
        text: 'Semantic search sirf short queries ke liye kaam karti hai',
        correct: false,
        explanation: 'Semantic search long queries pe bhi kaafi effectively kaam karti hai — meaning-based similarity content length se independent hai.',
      },
    ],
  },
  {
    question: 'RAG evaluation mein "faithfulness" metric kya measure karta hai?',
    options: [
      {
        text: 'LLM ka response user ke sawal se related hai ya nahi',
        correct: false,
        explanation: 'User sawal se relevance "answer relevance" metric measure karta hai, faithfulness nahi.',
      },
      {
        text: 'Retrieved documents sach mein relevant the ya nahi',
        correct: false,
        explanation: 'Retrieved documents ki quality "context precision" ya "context recall" measure karta hai.',
      },
      {
        text: 'LLM ka answer sirf retrieved context se supported hai ya nahi — hallucination detect karna',
        correct: true,
        explanation: 'Exactly! Faithfulness check karta hai ki LLM ne jo answer diya wo retrieved documents mein tha ya hallucinated hai. High faithfulness = LLM ne context pe stick kiya, apni training se fabricate nahi kiya.',
      },
      {
        text: 'LLM response ki length aur detail ka measure',
        correct: false,
        explanation: 'Response length faithfulness se related nahi. Faithfulness factual grounding ke baare mein hai.',
      },
    ],
  },
  {
    question: 'RAG mein "overlap" chunking strategy kyun use ki jaati hai?',
    options: [
      {
        text: 'Storage bachane ke liye — duplicate content rakhne se compression better hoti hai',
        correct: false,
        explanation: 'Overlap storage increase karta hai, decrease nahi. Iska purpose retrieval quality hai.',
      },
      {
        text: 'Chunk boundaries pe context loss avoid karne ke liye — adjacent chunks thoda content share karte hain',
        correct: true,
        explanation: 'Bilkul sahi! Agar ek sentence chunk boundary pe split ho, toh dono chunks mein overlap hone se context preserve hota hai. Typical overlap: 50-200 tokens between adjacent chunks.',
      },
      {
        text: 'Embedding model ka performance improve karna',
        correct: false,
        explanation: 'Overlap embedding model ki performance directly affect nahi karta — ye retrieval context preservation ke liye hai.',
      },
      {
        text: 'Vector database indexing speed badhana',
        correct: false,
        explanation: 'Overlap actually zyada vectors create karta hai, indexing slower hoti hai. Benefit retrieval quality mein hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter11Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          RAG — Retrieval Augmented Generation 🔍
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          LLM ki training data outdated hoti hai aur private documents nahi jaanta. RAG iska solution hai — apna data LLM ko dynamically dedo, accurate answers pao.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm italic">
            &quot;RAG = LLM ki reasoning power + apna data ki accuracy. Dono ka best.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: RAG kya hai */}
      <div id="rag-intro">
        <ConceptCard
          title="RAG Kya Hai?"
          emoji="🔍"
          difficulty="intermediate"
          whatIsIt="Retrieval Augmented Generation (RAG) ek architecture hai jisme LLM ko answer generate karne se pehle relevant documents retrieve karke context mein diye jaate hain. LLM ki knowledge cutoff hoti hai aur private/company data nahi jaanta — RAG ye problem solve karta hai bina fine-tuning ke."
          whenToUse={[
            'Company internal documents pe Q&A — HR policies, product docs, SOPs.',
            'Latest news ya real-time data pe questions — LLM ki knowledge cutoff ke baad ki info.',
            'Domain-specific knowledge bases — legal, medical, technical documentation.',
            'Hallucination reduce karna chahte ho — retrieved context se grounded answers.',
          ]}
          whyUseIt="Fine-tuning se RAG zyada flexible hai — naya data add karo bina model retrain kiye. LLM training expensive hai (thousands of dollars), RAG database update karna sirf vector upsert hai. Aur faithfulness measure kar sakte ho — answer ki grounding verify ho sakti hai."
          howToUse={{
            filename: 'rag-basic.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// Simple RAG flow
async function ragQuery(userQuestion: string, retrievedChunks: string[]): Promise<string> {
  const context = retrievedChunks.join('\\n\\n---\\n\\n');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: \`You are a helpful assistant. Answer ONLY based on the provided context.
If the answer is not in the context, say "Mujhe is topic pe information nahi mili."
Do NOT hallucinate or use outside knowledge.\`,
    messages: [{
      role: 'user',
      content: \`Context:
\${context}

Question: \${userQuestion}\`,
    }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// Usage
const chunks = [
  'NodeMaster course mein 22 GenAI chapters hain.',
  'Course Hinglish mein hai — Hindi + English mix.',
];
const answer = await ragQuery('NodeMaster mein kitne chapters hain?', chunks);
console.log(answer);`,
            explanation: 'Simple RAG: retrieved chunks context mein dedo, LLM sirf us context se answer kare. System prompt mein explicitly bolo ki hallucinate mat karo — "Only from context" constraint crucial hai.',
          }}
          realWorldScenario="Ek law firm apne case documents (thousands of PDFs) pe RAG build karti hai. Lawyer query karta hai: 'Section 302A ke precedents kya hain?' — system relevant case excerpts retrieve karta hai aur Claude un documents se accurate summary deta hai. Bina RAG ke Claude outdated ya fabricated cases bata sakta tha."
          commonMistakes={[
            {
              mistake: 'RAG mein LLM ko bina retrieved context ke hi poochh lena',
              why: 'Context diye bina LLM apni training se hallucinate karega — jo outdated ya wrong ho sakti hai.',
              fix: 'Hamesha relevant retrieved chunks system ya user prompt mein include karo, aur system prompt mein "only from context" instruction do.',
            },
            {
              mistake: 'Retrieved chunks ki quality check nahi karna',
              why: 'Agar retrieval poor hai (wrong chunks retrieve hue), toh LLM ka answer bhi wrong hoga — garbage in, garbage out.',
              fix: 'Retrieval evaluate karo — context precision aur recall metrics measure karo. RAGAS library use kar sakte ho evaluation ke liye.',
            },
          ]}
          proTip="RAG pipeline mein sabse zyada impact chunking strategy ka hota hai — embedding model ya LLM se zyada. Perfect chunking = relevant retrieval = accurate answers. Experiment karo: fixed, semantic, sentence-level — apne data pe evaluate karo."
          demo={<RAGPipelineDiagram />}
        />
      </div>

      {/* Card 2: RAG Pipeline */}
      <div id="rag-pipeline">
        <ConceptCard
          title="RAG Pipeline — Step by Step"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="RAG pipeline 6 steps mein hoti hai: (1) Document Loading, (2) Chunking, (3) Embedding generation, (4) Vector storage, (5) Query-time retrieval, (6) LLM generation with context. Ye pipeline offline (ingestion) aur online (query) — do parts mein hoti hai."
          whenToUse={[
            'Ingestion pipeline (offline): naye documents add hone pe run karo.',
            'Query pipeline (online): user ke har sawal pe run karo — retrieval + generation.',
            'Batch ingestion: pehli baar poora knowledge base index karna.',
            'Incremental updates: naye documents aane pe sirf unhe add karna.',
          ]}
          whyUseIt="Pipeline ko clearly split karna (ingestion vs query) architecture clean rakhta hai. Ingestion slow ho sakti hai (embedding generation takes time) — offline karo. Query pipeline fast honi chahiye — pre-computed embeddings retrieval instant karte hain."
          howToUse={{
            filename: 'rag-pipeline.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';

const openai = new OpenAI();

// ─── INGESTION PIPELINE (offline) ────────────────────────────────
interface Chunk {
  id: string;
  text: string;
  embedding?: number[];
  metadata: Record<string, string>;
}

// Step 1: Load + chunk document
function chunkDocument(text: string, chunkSize = 500, overlap = 50): string[] {
  const words = text.split(' ');
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
    if (i + chunkSize >= words.length) break;
  }
  return chunks;
}

// Step 2: Generate embeddings
async function embedChunks(chunks: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: chunks,
  });
  return response.data.map(d => d.embedding);
}

// ─── QUERY PIPELINE (online) ──────────────────────────────────────
// Step 3: Embed query
async function embedQuery(query: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  return response.data[0].embedding;
}

// Step 4: Cosine similarity (for in-memory demo)
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
}`,
            explanation: 'Ingestion: documents load → chunk → embed → store vector DB mein. Query: user query embed → similar chunks retrieve → LLM ko context + query do → answer generate. Ingestion ek baar, retrieval + generation har query pe.',
          }}
          realWorldScenario="Startup ek customer support bot banata hai apne product documentation pe. Naye docs aane pe ingestion pipeline automatically run hoti hai (CI/CD ke saath). Customer question aane pe — embed, retrieve top 5 chunks, Claude se answer generate karo. Support tickets 60% reduce ho gayi."
          commonMistakes={[
            {
              mistake: 'Query time pe embedding generate karna slow hai — cache karo',
              why: 'Embedding API call latency add karti hai har query pe. Production mein ye noticeable hota hai.',
              fix: 'Common queries ke embeddings cache karo (Redis mein). Semantic caching — similar queries ek hi cached result return kare.',
            },
          ]}
          proTip="OpenAI text-embedding-3-small kaafi zyada bang-for-buck deta hai — cheap, fast, aur dimensions reducible hain (Matryoshka embeddings). Production mein isse start karo, performance compare karke upgrade karo zarurat padne pe."
        />
      </div>

      {/* Card 3: Chunking Strategies */}
      <div id="chunking">
        <ConceptCard
          title="Chunking Strategies"
          emoji="✂️"
          difficulty="intermediate"
          whatIsIt="Chunking matlab documents ko LLM-processable pieces mein todna. Strategy matter karti hai — galat chunking se relevant content miss ho sakta hai ya irrelevant noise aa sakta hai. Main strategies: Fixed size, Semantic, Sentence-level, Recursive, aur Overlap-based chunking."
          whenToUse={[
            'Fixed size chunking: quick prototype, uniform content (articles, blogs).',
            'Semantic chunking: legal/medical docs jahan paragraph boundaries meaningful hain.',
            'Sentence-level: Q&A, customer reviews — har sentence self-contained hoti hai.',
            'Recursive chunking: hierarchical documents — headers → paragraphs → sentences.',
            'Overlap chunking: jab boundary context loss concern ho.',
          ]}
          whyUseIt="Chunking RAG ki sabse important parameter hai. Bahut bade chunks: precise retrieval fails (relevant info ek bade noise chunk mein). Bahut chote chunks: context lost ho jaata hai (ek fact ka surrounding context miss). Sweet spot find karna crucial hai — task-specific experimentation zaroori hai."
          howToUse={{
            filename: 'chunking-strategies.ts',
            language: 'typescript',
            code: `// ─── 1. Fixed Size Chunking ──────────────────────────────────────
function fixedChunk(text: string, size = 500, overlap = 50): string[] {
  const tokens = text.split(/\\s+/); // rough token approximation
  const chunks: string[] = [];
  for (let i = 0; i < tokens.length; i += size - overlap) {
    chunks.push(tokens.slice(i, i + size).join(' '));
    if (i + size >= tokens.length) break;
  }
  return chunks;
}

// ─── 2. Sentence-level Chunking ───────────────────────────────────
function sentenceChunk(text: string, sentencesPerChunk = 3): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
    chunks.push(sentences.slice(i, i + sentencesPerChunk).join(' '));
  }
  return chunks;
}

// ─── 3. Recursive Character Chunking (LangChain style) ───────────
function recursiveChunk(text: string, maxSize = 500): string[] {
  const separators = ['\\n\\n', '\\n', '. ', ' '];

  for (const sep of separators) {
    if (text.length <= maxSize) return [text];
    const parts = text.split(sep);
    if (parts.length > 1) {
      const chunks: string[] = [];
      let current = '';
      for (const part of parts) {
        if ((current + sep + part).length > maxSize && current) {
          chunks.push(current.trim());
          current = part;
        } else {
          current = current ? current + sep + part : part;
        }
      }
      if (current) chunks.push(current.trim());
      return chunks.filter(c => c.length > 0);
    }
  }
  return [text];
}

// Best practice: experiment with chunk sizes!
// Eval: does retrieval return the expected chunk for test queries?`,
            explanation: 'Fixed: simple lekin boundary-unaware. Sentence: natural units, good for Q&A. Recursive: smart separator hierarchy, most used in practice. Overlap: boundary context preserve karta hai. LangChain ka RecursiveCharacterTextSplitter recursive approach use karta hai.',
          }}
          realWorldScenario="Code documentation ke liye function-level chunking best hai — ek chunk = ek function + docstring. Legal documents ke liye section-level chunking — ek chunk = ek clause. Medical literature ke liye paragraph-level chunking. Content type ke hisaab se strategy choose karo."
          commonMistakes={[
            {
              mistake: 'Default chunk size blindly use karna (512 tokens) without evaluation',
              why: 'Har document type different optimal chunk size chahta hai. 512 ek starting point hai, optimal nahi.',
              fix: 'Test queries banao aur retrieve karo — kya expected chunks aa rahe hain? Chunk size tune karo retrieval quality ke hisaab se, word count se nahi.',
            },
          ]}
          proTip="LangChain ka RecursiveCharacterTextSplitter production ke liye solid default hai — paragraph → sentence → word hierarchy se split karta hai, sentence middle mein nahi toot-ta. chunk_size=800, chunk_overlap=100 se start karo phir tune karo."
        />
      </div>

      {/* Card 4: Embedding & Semantic Search */}
      <div id="embeddings">
        <ConceptCard
          title="Embedding & Semantic Search"
          emoji="🔢"
          difficulty="intermediate"
          whatIsIt="Embeddings text ko numbers ke arrays mein convert karte hain (vectors) jahan similar meanings similar directions mein hote hain. 'King - Man + Woman ≈ Queen' — ye embeddings ki power hai. Semantic search in vectors ke beech cosine similarity calculate karke works karti hai — exact words match nahi, meaning match."
          whenToUse={[
            'Search engine banao jo "car" search kare aur "automobile" bhi find kare.',
            'Recommendation system — similar content find karo meaning se.',
            'RAG retrieval — user query se relevant document chunks dhundho.',
            'Duplicate detection — same meaning wale different-worded documents.',
            'Clustering — similar topics ke documents group karo.',
          ]}
          whyUseIt="Embeddings semantic meaning capture karte hain jo keyword search kabhi nahi kar sakti. 'Best Node.js framework for beginners' aur 'Easy to learn server framework JavaScript' — keyword overlap kam hai lekin embedding space mein ye close hain. Isse retrieval dramatically better hoti hai real user queries ke liye."
          howToUse={{
            filename: 'embeddings-search.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';

const openai = new OpenAI();

// Generate embedding for a text
async function embed(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small', // 1536 dimensions
    input: text,
  });
  return res.data[0].embedding;
}

// Cosine similarity — closer to 1.0 = more similar
function cosineSim(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// In-memory semantic search (demo — use vector DB for production)
interface Document {
  id: string;
  text: string;
  embedding: number[];
}

async function semanticSearch(query: string, docs: Document[], topK = 3): Promise<Document[]> {
  const queryEmb = await embed(query);

  return docs
    .map(doc => ({ doc, score: cosineSim(queryEmb, doc.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ doc }) => doc);
}

// text-embedding-3-small dimensions: 1536
// text-embedding-3-large dimensions: 3072 (more accurate, 2x cost)
// text-embedding-ada-002: legacy, 1536 dims (less accurate than v3)`,
            explanation: 'Embed karo → cosine similarity calculate karo → top-K closest vectors return karo. Vector DB (Pinecone, pgvector) ye computation billion documents mein milliseconds mein karte hain using ANN algorithms. In-memory sirf small demos ke liye theek hai.',
          }}
          realWorldScenario="E-learning platform pe student search karta hai 'arrays kaisa banate hain JavaScript mein' — semantic search 'JavaScript Array creation tutorial' aur 'Array data structure in JS' dono retrieve karta hai, bhale hi exact words match na hon. Click-through rate 3x improve hua keyword search se."
          commonMistakes={[
            {
              mistake: 'Query aur documents ko alag models se embed karna',
              why: 'Embedding models trained hote hain consistent embedding space mein. Alag models ka embedding space incompatible hota hai — similarity scores meaningless ho jaate hain.',
              fix: 'Hamesha same embedding model use karo ingestion aur query time pe. Model upgrade karne pe poora database re-embed karo.',
            },
          ]}
          proTip="Matryoshka Representation Learning — text-embedding-3-small dimensions reduce kar sakte ho (1536 → 256) storage aur speed ke liye, accuracy thodi kam hogi. Production mein: full dimensions ke saath start karo, performance bottleneck pe truncate karo aur measure karo quality trade-off."
        />
      </div>

      {/* Card 5: RAG Evaluation */}
      <div id="rag-eval">
        <ConceptCard
          title="RAG Evaluation — Kitna Acha Kaam Kar Raha Hai?"
          emoji="📊"
          difficulty="intermediate"
          whatIsIt="RAG system evaluate karna zaroori hai — retrieval aur generation dono separately measure karo. Key metrics: Faithfulness (answer context se grounded hai?), Answer Relevance (answer sawal se relevant hai?), Context Precision (retrieved chunks relevant the?), Context Recall (sahi chunks retrieve hue?). RAGAS framework ye sab automate karta hai."
          whenToUse={[
            'Production deploy se pehle — baseline establish karo.',
            'Chunking strategy change karne pe — kya retrieval improve hua?',
            'Embedding model upgrade karne pe — quality comparison.',
            'Prompt engineering changes pe — faithfulness improve hua?',
            'A/B testing different RAG configurations.',
          ]}
          whyUseIt="Bina evaluation ke RAG 'feel' se tune karna expensive guess-work hai. Metrics se data-driven decisions possible hain — kya chunking strategy A se B better retrieve ho raha hai? Kya model hallucinate kar raha hai? Systematic improvement ke liye systematic measurement zaroori hai."
          howToUse={{
            filename: 'rag-evaluation.ts',
            language: 'typescript',
            code: `// RAG evaluation framework — simple implementation
interface RAGEvalResult {
  faithfulness: number;      // 0-1: answer grounded in context?
  answerRelevance: number;   // 0-1: answer answers the question?
  contextPrecision: number;  // 0-1: retrieved chunks relevant?
}

// Faithfulness check using LLM as judge
async function checkFaithfulness(
  question: string,
  answer: string,
  context: string[],
  llmJudge: (prompt: string) => Promise<string>
): Promise<number> {
  const prompt = \`Given this context and answer, rate how much the answer
is supported by the context on a scale of 0.0 to 1.0.

Context: \${context.join('\\n')}
Answer: \${answer}

Respond with ONLY a number between 0.0 and 1.0.\`;

  const score = parseFloat(await llmJudge(prompt));
  return isNaN(score) ? 0 : Math.max(0, Math.min(1, score));
}

// Test set banao
const testSet = [
  {
    question: 'NodeMaster mein kitne chapters hain?',
    groundTruth: '22 GenAI chapters hain NodeMaster mein.',
    expectedContext: 'NodeMaster course mein 22 chapters hain',
  },
];

// RAGAS library use karo production mein:
// pip install ragas (Python)
// Ya use LangSmith for tracing + evaluation
console.log('Evaluation complete. Faithfulness:', 0.92);`,
            explanation: 'RAG evaluation ke liye test set banao (question + expected answer + expected context). LLM-as-judge approach: Claude ko judge banao faithfulness check karne ke liye. RAGAS Python library iska full framework deti hai. Node.js mein LangSmith + custom evaluators use kar sakte ho.',
          }}
          realWorldScenario="EdTech company ne RAG chatbot build kiya. Before evaluation: 40% answers hallucinated content contain karte the. After evaluation + iteration: faithfulness 0.89 ho gayi. Key insight: chunk size 256 → 512 tokens karne se context precision 0.65 → 0.82 ho gayi. Data-driven improvement."
          commonMistakes={[
            {
              mistake: 'Sirf vibe check se RAG quality judge karna',
              why: 'Human spot-checking se systematic issues miss ho jaate hain. 100 queries mein 40% hallucination eye test se nahi pakdegi.',
              fix: 'Minimum 50-100 test questions banao representative use cases se. Automatic evaluation har deployment pe run karo CI/CD mein.',
            },
          ]}
          proTip="RAGAS (Python) RAG evaluation ke liye best open-source framework hai. Ye faithfulness, answer relevance, context precision, context recall — sab automatically LLM-as-judge se evaluate karta hai. Node.js project ke liye: evaluation script Python mein likh lo aur CI/CD mein run karo."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 11 Quiz — RAG Systems
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye pass ke liye. RAG samjha? Prove karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="rag-systems" />
      </div>
    </div>
  )
}
