'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Diff Block Component ──────────────────────────────────────────────────────

function DiffBlock({ title, bad, good, badLabel = 'Without Framework', goodLabel = 'With LangChain' }: {
  title: string
  bad: string
  good: string
  badLabel?: string
  goodLabel?: string
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-[#A1A1AA]">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <p className="text-xs font-bold text-[#EF4444] uppercase tracking-wide mb-2">{badLabel}</p>
          <pre className="text-xs text-[#FCA5A5] font-mono whitespace-pre-wrap leading-relaxed">{bad}</pre>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <p className="text-xs font-bold text-[#10B981] uppercase tracking-wide mb-2">{goodLabel}</p>
          <pre className="text-xs text-[#6EE7B7] font-mono whitespace-pre-wrap leading-relaxed">{good}</pre>
        </div>
      </div>
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'LangChain use karne ka main benefit kya hai?',
    options: [
      {
        text: 'LangChain fastest AI library hai — raw API se 10x fast',
        correct: false,
        explanation: 'LangChain speed optimize karne ke liye nahi hai — generally raw API se thoda slow hota hai abstraction overhead ki wajah se.',
      },
      {
        text: 'LangChain pre-built components deta hai — chains, agents, memory, document loaders — complex AI apps faster build hote hain',
        correct: true,
        explanation: 'Bilkul sahi! LangChain ka value proposition: don\'t reinvent the wheel. PDF loader, vector store integration, ReAct agent, conversation memory — sab pre-built hai. Complex apps ke liye developer productivity dramatically increase hoti hai.',
      },
      {
        text: 'LangChain sirf OpenAI ke saath kaam karta hai',
        correct: false,
        explanation: 'LangChain model-agnostic hai — OpenAI, Anthropic, Google, Cohere, Ollama — sab support karta hai same interface se.',
      },
      {
        text: 'LangChain hamesha better hai raw API se',
        correct: false,
        explanation: 'Simple use cases mein raw API better hoti hai — less complexity, easier debugging, no abstraction overhead. LangChain complex multi-step workflows mein shine karta hai.',
      },
    ],
  },
  {
    question: 'LCEL (LangChain Expression Language) mein | (pipe) operator kya karta hai?',
    options: [
      {
        text: '| OR operator hai — ek ya doosra run karo',
        correct: false,
        explanation: 'LCEL mein | OR nahi hai — ye pipe operator hai jo ek component ka output doosre ka input banata hai, Unix pipes ki tarah.',
      },
      {
        text: '| pipe operator hai — ek component ka output automatically doosre ka input ban jaata hai — chain compose karna easy ho jaata hai',
        correct: true,
        explanation: 'Exactly! LCEL: prompt | llm | output_parser. Prompt ka output LLM ka input, LLM ka output parser ka input. Ye Unix pipes ki tarah kaam karta hai. Complex chains ek readable line mein ban jaate hain.',
      },
      {
        text: '| parallel execution karta hai — dono sides simultaneously run hote hain',
        correct: false,
        explanation: 'Parallel execution ke liye RunnableParallel use hota hai. Simple | sequential pipeline hai — left se right execute hota hai.',
      },
      {
        text: '| sirf Python LangChain mein hai, JS mein nahi',
        correct: false,
        explanation: 'LangChain JS (langchain) mein bhi pipe() method hai jo same functionality deta hai. .pipe() method chaining se same result milta hai.',
      },
    ],
  },
  {
    question: 'LlamaIndex aur LangChain mein kya primary difference hai?',
    options: [
      {
        text: 'LlamaIndex free hai, LangChain paid hai',
        correct: false,
        explanation: 'Dono open-source hain. Pricing inka differentiator nahi hai.',
      },
      {
        text: 'LlamaIndex document indexing aur query engines pe focused hai (RAG-first), LangChain general AI application framework hai (chains, agents, memory)',
        correct: true,
        explanation: 'Sahi! LlamaIndex RAG aur document Q&A ke liye specialized hai — document loading, indexing, query engines, response synthesis. LangChain broader — chatbots, agents, pipelines, memory management sab cover karta hai. RAG ke liye LlamaIndex often simpler hai.',
      },
      {
        text: 'LangChain Python only hai, LlamaIndex JavaScript only hai',
        correct: false,
        explanation: 'Dono Python aur JavaScript/TypeScript mein available hain. LangChain.js aur LlamaIndex.TS dono mature libraries hain.',
      },
      {
        text: 'LlamaIndex sirf LLaMA models ke liye hai',
        correct: false,
        explanation: 'LlamaIndex sirf LLaMA model ke liye nahi hai — naam misleading hai. OpenAI, Anthropic, Gemini — sab support karta hai. Document indexing pe focused hai, specific model pe nahi.',
      },
    ],
  },
  {
    question: 'LangChain frameworks kabhi NOT use karna chahiye?',
    options: [
      {
        text: 'Kabhi nahi — LangChain hamesha better choice hai',
        correct: false,
        explanation: 'Ye sach nahi hai. Simple single LLM call ke liye LangChain overkill hai — unnecessary complexity add karta hai.',
      },
      {
        text: 'Simple LLM calls ke liye, jab ek prompt → ek response chahiye, ya jab debugging/visibility critical ho',
        correct: true,
        explanation: 'Exactly! LangChain abstraction hide karta hai — debugging mushkil ho jaata hai. Simple use cases mein raw API simpler aur faster hai. Rule of thumb: 3 se kam components mein — raw API. Complex multi-step workflows mein — LangChain consider karo.',
      },
      {
        text: 'Production apps ke liye — LangChain sirf prototyping ke liye hai',
        correct: false,
        explanation: 'LangChain production mein widely used hai — Notion, Replit, many enterprise apps use karte hain. Production readiness issue nahi hai.',
      },
      {
        text: 'Free tier OpenAI use kar rahe ho toh — LangChain paid hai',
        correct: false,
        explanation: 'LangChain library use karna free hai. LangSmith (monitoring platform) ka paid tier hai, lekin library itself free open-source hai.',
      },
    ],
  },
  {
    question: 'Document loaders ka primary purpose kya hai LangChain/LlamaIndex mein?',
    options: [
      {
        text: 'Documents ko internet pe upload karna',
        correct: false,
        explanation: 'Document loaders documents upload nahi karte — ye load karte hain various sources se processing ke liye.',
      },
      {
        text: 'Various sources (PDFs, URLs, databases, APIs) se content extract karna aur ek unified Document format mein convert karna',
        correct: true,
        explanation: 'Bilkul sahi! Document loaders standardize karte hain — PDF loader, CSV loader, YouTube transcript loader, Notion loader — sab same Document interface return karte hain. Iske baad chunking, embedding, storage pipeline same hoti hai regardless of source.',
      },
      {
        text: 'Documents ko compress karna API costs kam karne ke liye',
        correct: false,
        explanation: 'Document loaders compression nahi karte — ye extraction aur normalization ke liye hain.',
      },
      {
        text: 'Document loaders sirf PDF files ke liye hain',
        correct: false,
        explanation: 'LangChain 100+ document loaders hai — PDF, Word, PowerPoint, CSV, JSON, HTML, YouTube, Notion, Confluence, databases, APIs — almost every source ka loader available hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter14Content() {
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
          LangChain & LlamaIndex — AI Frameworks 🦜
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          AI apps build karne ke liye pre-built building blocks. Chains, agents, memory, RAG — sab pre-made. Kab use karo, kab skip karo — ye samjho.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <p className="text-[#FDE68A] text-sm italic">
            &quot;LangChain se jaldi ship karo, baad mein raw API pe migrate karo jab performance matter kare.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: LangChain Overview */}
      <div id="langchain-overview">
        <ConceptCard
          title="LangChain Overview — Kab Use Karo?"
          emoji="🦜"
          difficulty="advanced"
          whatIsIt="LangChain ek framework hai AI applications build karne ke liye — chains (multiple LLM calls sequence), agents (tool-using autonomous systems), memory (conversation history), document loaders (PDFs, URLs, databases), output parsers, aur vector store integrations — sab pre-built. Model-agnostic: OpenAI, Anthropic, Google — sab support."
          whenToUse={[
            'Complex RAG systems — document loaders, chunkers, vector stores — sab integrated.',
            'Multi-step chains — prompt → LLM → parser → next LLM — LCEL se clean.',
            'Agents with tools — pre-built ReAct agents, tool wrappers.',
            'Rapid prototyping — quickly test different LLM providers, models.',
            'Team project — standard patterns, consistent code structure.',
          ]}
          whyUseIt="Ek RAG system scratch se banao: document loading, chunking, embedding, vector DB integration, retrieval, generation, evaluation — sab khud implement karo. Ya LangChain use karo aur 80% code pre-built hai. Time-to-market matter karta hai — LangChain production-proven patterns deta hai."
          howToUse={{
            filename: 'langchain-overview.ts',
            language: 'typescript',
            code: `// LangChain core concepts — quick overview
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

// ─── 1. Model (any LLM) ───────────────────────────────────────────
const claude = new ChatAnthropic({ model: 'claude-sonnet-4-6' });
const gpt4 = new ChatOpenAI({ model: 'gpt-4o' });
// Same interface — swap anytime!

// ─── 2. Prompt Templates ─────────────────────────────────────────
const codeReviewPrompt = PromptTemplate.fromTemplate(\`
You are an expert code reviewer. Review this {language} code:
{code}

Provide: 1. Issues found 2. Improvements 3. Security concerns
\`);

// ─── 3. Output Parser ────────────────────────────────────────────
const parser = new StringOutputParser();

// ─── 4. Chain (LCEL) ─────────────────────────────────────────────
const reviewChain = codeReviewPrompt.pipe(claude).pipe(parser);

// Use it
const review = await reviewChain.invoke({
  language: 'TypeScript',
  code: 'const user = req.body; db.query("SELECT * FROM users WHERE id=" + user.id)',
});
console.log(review);

// ─── 5. Streaming ────────────────────────────────────────────────
const stream = await reviewChain.stream({ language: 'TypeScript', code: '...' });
for await (const chunk of stream) {
  process.stdout.write(chunk);
}

// ─── When NOT to use LangChain ───────────────────────────────────
// Simple: skip LangChain, use raw API
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic();
const simple = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 512,
  messages: [{ role: 'user', content: 'Hello!' }],
});`,
            explanation: 'LangChain main value: (1) model swapping easy — claude to GPT ek line change, (2) LCEL chains composable hain, (3) huge ecosystem — 100+ integrations. Main downside: abstraction layer debugging mushkil banati hai. Error messages LangChain-specific hote hain, underlying API errors hide ho jaate hain.',
          }}
          realWorldScenario="Startup ne LangChain se RAG system 2 hafte mein ship kiya — document loaders, Pinecone integration, ConversationalRetrievalChain sab pre-built. 6 months baad performance issues aaye — critical path mein raw API pe migrate kiya, boilerplate LangChain mein rakha. Hybrid approach works."
          commonMistakes={[
            {
              mistake: 'Simple single LLM call ke liye LangChain import karna',
              why: 'LangChain adds 100+ MB dependencies, slower imports, extra abstraction for zero benefit on simple tasks.',
              fix: 'Decide karo upfront: 3 se kam LLM calls aur simple pipeline? Raw API. Complex chains, agents, RAG? LangChain consider karo.',
            },
          ]}
          demo={
            <DiffBlock
              title="Simple LLM Call — Framework vs Raw API"
              badLabel="With LangChain (overkill)"
              goodLabel="Raw API (simpler)"
              bad={`import { ChatAnthropic } from '@langchain/anthropic';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';

const llm = new ChatAnthropic({ model: 'claude-sonnet-4-6' });
const prompt = PromptTemplate.fromTemplate('{input}');
const parser = new StringOutputParser();
const chain = prompt.pipe(llm).pipe(parser);
const result = await chain.invoke({ input: 'Hello!' });`}
              good={`import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 512,
  messages: [{ role: 'user', content: 'Hello!' }],
});
const text = response.content[0];
const result = text.type === 'text' ? text.text : '';`}
            />
          }
          proTip="LangSmith (LangChain ka monitoring tool) production mein essential hai agar LangChain use kar rahe ho — prompt tracing, latency, token usage, error tracking. Free tier kaafi hai small projects ke liye. LANGCHAIN_TRACING_V2=true environment variable se enable karo."
        />
      </div>

      {/* Card 2: LCEL */}
      <div id="lcel">
        <ConceptCard
          title="LangChain LCEL — Composable Chains"
          emoji="🔗"
          difficulty="advanced"
          whatIsIt="LCEL (LangChain Expression Language) LangChain ka modern chain composition system hai. Pipe operator (|) se components chain karo: prompt | llm | parser. Runnable interface — sab components same API: invoke(), stream(), batch(). Async, streaming, parallel execution — sab built-in."
          whenToUse={[
            'Multiple LLM calls chain karne hain — first call ka output second ka input.',
            'Conditional routing — output based on result alag path lo.',
            'Parallel execution — multiple chains simultaneously run karo.',
            'Streaming — real-time token streaming to UI.',
            'Batch processing — many inputs efficiently process karo.',
          ]}
          whyUseIt="LCEL ke bina: manually outputs pass karo, error handling manually, streaming separately implement karo, batch separately. LCEL se: sab automatic. Parallel branches, fallbacks, retry — sab built-in. Code readable rahta hai complex workflows mein bhi."
          howToUse={{
            filename: 'lcel-chains.ts',
            language: 'typescript',
            code: `import { ChatAnthropic } from '@langchain/anthropic';
import { PromptTemplate, ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser, JsonOutputParser } from '@langchain/core/output_parsers';
import { RunnableParallel, RunnableLambda } from '@langchain/core/runnables';

const llm = new ChatAnthropic({ model: 'claude-sonnet-4-6' });

// ─── 1. Simple Chain ─────────────────────────────────────────────
const simpleChain = PromptTemplate.fromTemplate('Summarize: {text}')
  .pipe(llm)
  .pipe(new StringOutputParser());

// ─── 2. JSON Output Chain ────────────────────────────────────────
interface Sentiment { sentiment: string; score: number; reason: string }

const sentimentChain = ChatPromptTemplate.fromTemplate(\`
Analyze sentiment of: {text}
Return JSON: {{ "sentiment": "positive|negative|neutral", "score": 0-1, "reason": "..." }}
\`).pipe(llm).pipe(new JsonOutputParser<Sentiment>());

// ─── 3. Parallel Chains ──────────────────────────────────────────
const parallelChain = RunnableParallel.from({
  summary: simpleChain,
  sentiment: sentimentChain,
});

const result = await parallelChain.invoke({ text: 'NodeMaster bahut accha course hai!' });
// result: { summary: "...", sentiment: { sentiment: "positive", score: 0.9, ... } }

// ─── 4. Conditional Routing ──────────────────────────────────────
const routingChain = simpleChain.pipe(
  RunnableLambda.from(async (summary: string) => {
    if (summary.length > 500) {
      return await simpleChain.invoke({ text: summary }); // re-summarize
    }
    return summary;
  })
);

// ─── 5. Fallback (if primary fails, use backup) ──────────────────
const primaryLLM = new ChatAnthropic({ model: 'claude-opus-4-5' });
const backupLLM = new ChatAnthropic({ model: 'claude-haiku-4-5' });
const reliableChain = primaryLLM.withFallbacks({ fallbacks: [backupLLM] });`,
            explanation: 'LCEL: pipe() se chain karo, RunnableParallel se parallel karo, withFallbacks se reliability badao. invoke() ek input ke liye, stream() streaming ke liye, batch() multiple inputs ke liye. Sab same interface — composability LCEL ka superpower hai.',
          }}
          realWorldScenario="News article processing pipeline: parallel mein summary + sentiment + keyword extraction — sab ek invoke() call mein. Pehle sequential the (3 API calls, 3x latency). Parallel ke baad 60% faster. LCEL ki wajah se ek readable chain mein sab fit ho gaya."
          commonMistakes={[
            {
              mistake: 'LCEL chains ki type safety ignore karna',
              why: 'TypeScript mein LCEL chain types complex ho sakte hain. Runtime errors type checking miss karne se aate hain.',
              fix: 'JsonOutputParser mein generic type use karo: new JsonOutputParser<MyType>(). Zod schema validate karo output pe for extra safety.',
            },
          ]}
          proTip="LCEL ka .withRetry() method API failures pe automatic retry karta hai exponential backoff se. Production mein zaroori hai: const reliableChain = chain.withRetry({ stopAfterAttempt: 3 }). Rate limits, network issues — sab handle hote hain."
        />
      </div>

      {/* Card 3: LlamaIndex */}
      <div id="llamaindex">
        <ConceptCard
          title="LlamaIndex — Document Indexing & Query Engines"
          emoji="🦙"
          difficulty="advanced"
          whatIsIt="LlamaIndex RAG aur document Q&A ke liye specialized framework hai. Core workflow: documents load karo → index banao (chunking + embedding automatically) → query engine se query karo → response synthesis. LangChain se simpler hai RAG ke liye — ek unified API, kam boilerplate."
          whenToUse={[
            'Document Q&A system — PDFs, websites, databases pe chat.',
            'Knowledge base search — company docs, product documentation.',
            'RAG applications — LlamaIndex ka main use case.',
            'Multi-document reasoning — cross-document synthesis.',
            'Structured + unstructured data combine karna.',
          ]}
          whyUseIt="LlamaIndex RAG ke liye opinionated hai — good defaults, less configuration. LangChain more flexible lekin more configuration. Simple RAG ke liye: LlamaIndex 50% less code. Advanced customization chahiye? LangChain zyada options deta hai. Dono great tools, use case pe choose karo."
          howToUse={{
            filename: 'llamaindex-rag.ts',
            language: 'typescript',
            code: `import { Document, VectorStoreIndex, SimpleDirectoryReader } from 'llamaindex';

// ─── Simple RAG with LlamaIndex ──────────────────────────────────

// Step 1: Load documents
async function loadAndIndex() {
  // Load from directory
  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData({ directoryPath: './docs' });

  // Or create documents manually
  const manualDocs = [
    new Document({ text: 'NodeMaster has 22 GenAI chapters.', id_: 'doc1' }),
    new Document({ text: 'Hinglish mein padhao — Hindi + English mix.', id_: 'doc2' }),
  ];

  // Step 2: Create index (automatically chunks + embeds + stores)
  const index = await VectorStoreIndex.fromDocuments([...documents, ...manualDocs]);

  return index;
}

// Step 3: Query
async function queryDocs() {
  const index = await loadAndIndex();

  // Simple query engine
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({
    query: 'NodeMaster mein kitne chapters hain?',
  });

  console.log('Answer:', response.toString());
  // Source nodes bhi available hain
  response.sourceNodes?.forEach(node => {
    console.log('Source:', node.node.getText().slice(0, 100));
  });
}

// ─── Chat Engine (conversation memory) ───────────────────────────
async function chatMode() {
  const index = await loadAndIndex();
  const chatEngine = index.asChatEngine();

  const response1 = await chatEngine.chat({ message: 'Course ke baare mein batao?' });
  console.log(response1.toString());

  const response2 = await chatEngine.chat({ message: 'Kitne chapters hain?' });
  // Chat engine conversation history maintain karta hai
  console.log(response2.toString());
}`,
            explanation: 'LlamaIndex automatically handles: chunking (NodeParser), embedding (OpenAI by default), storage (in-memory), retrieval, response synthesis. Ek VectorStoreIndex.fromDocuments() call sab kuch karta hai. asQueryEngine() simple Q&A, asChatEngine() conversation with memory.',
          }}
          realWorldScenario="Developer relations team ne company documentation (200+ markdown files) pe chat interface banaya. LlamaIndex se: SimpleDirectoryReader → VectorStoreIndex → ChatEngine — 2 ghante mein working prototype. LangChain se same kaam 1 din leta. Simplicity wins for straightforward RAG."
          commonMistakes={[
            {
              mistake: 'Large documents bina chunking configuration ke index karna',
              why: 'Default chunk size har document type ke liye optimal nahi — code files, legal docs, FAQs ke liye alag chunking chahiye.',
              fix: 'SentenceSplitter ya CodeSplitter explicitly configure karo: const splitter = new SentenceSplitter({ chunkSize: 1024, chunkOverlap: 100 }). Document type ke hisaab se tune karo.',
            },
          ]}
          proTip="LlamaIndex ka SubQuestionQueryEngine complex questions handle karta hai — 'Compare NodeMaster aur other Node.js courses' jaise question ko sub-questions mein todhta hai, multiple sources query karta hai, aur synthesize karta hai. Complex RAG ke liye very powerful pattern hai."
        />
      </div>

      {/* Card 4: Document Loaders */}
      <div id="document-loaders">
        <ConceptCard
          title="Document Loaders — PDFs, Web, CSV, Databases"
          emoji="📂"
          difficulty="advanced"
          whatIsIt="Document loaders various sources se content extract karke ek unified Document format mein convert karte hain jo RAG pipelines mein use ho sakti hai. LangChain mein 100+ loaders hain — PDFs (PyPDF), websites (Cheerio), YouTube transcripts, Notion, Confluence, databases, APIs. Same interface, different sources."
          whenToUse={[
            'Company documentation (PDFs, Word, PowerPoint) index karna.',
            'Website content extract karna — crawling, specific page scraping.',
            'Database records — SQL se documents banao indexing ke liye.',
            'APIs — REST APIs se data fetch karo aur Document banao.',
            'YouTube transcripts — video content searchable banao.',
          ]}
          whyUseIt="Document loading manually implement karna: PDF parsing library, charset handling, metadata extraction, error handling — ek din ka kaam. LangChain loader: 5 lines. Plus: same chunking, embedding, storage pipeline regardless of source — normalize once, use everywhere."
          howToUse={{
            filename: 'document-loaders.ts',
            language: 'typescript',
            code: `import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

// ─── 1. PDF Loader ───────────────────────────────────────────────
async function loadPDF(filePath: string) {
  const loader = new PDFLoader(filePath, {
    splitPages: true,  // each page = separate document
  });
  const docs = await loader.load();
  // docs[0].pageContent = text, docs[0].metadata.page = page number
  return docs;
}

// ─── 2. Web Scraper ──────────────────────────────────────────────
async function loadWebpage(url: string) {
  const loader = new CheerioWebBaseLoader(url, {
    selector: 'main, article, .content',  // extract specific elements
  });
  const docs = await loader.load();
  return docs;
}

// ─── 3. CSV Loader ───────────────────────────────────────────────
async function loadCSV(filePath: string) {
  const loader = new CSVLoader(filePath, {
    column: 'description',  // which column to use as content
  });
  const docs = await loader.load();
  return docs;
}

// ─── 4. Custom Database Loader ───────────────────────────────────
import { BaseDocumentLoader } from '@langchain/core/document_loaders/base';
import { Document } from '@langchain/core/documents';
import { Pool } from 'pg';

class PostgresLoader extends BaseDocumentLoader {
  constructor(private pool: Pool, private query: string) {
    super();
  }

  async load(): Promise<Document[]> {
    const { rows } = await this.pool.query(this.query);
    return rows.map(row => new Document({
      pageContent: \`\${row.title}\\n\${row.description}\`,
      metadata: { id: row.id, source: 'postgres', table: 'products' },
    }));
  }
}

// ─── 5. Split all loaded docs ────────────────────────────────────
async function loadAndSplit(source: 'pdf' | 'web', path: string) {
  const docs = source === 'pdf' ? await loadPDF(path) : await loadWebpage(path);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  return splitter.splitDocuments(docs);
}`,
            explanation: 'LangChain loaders sab Document format return karte hain: { pageContent: string, metadata: object }. Metadata valuable hai — source file, page number, URL — agar retrieved chunk ka source cite karna ho. Custom loader: BaseDocumentLoader extend karo, load() implement karo — database, proprietary APIs ke liye.',
          }}
          realWorldScenario="HR department ne employee handbook (PDF), leave policy (SharePoint), benefits page (intranet website) — sab ek RAG system mein index kiya. Teen loaders, same pipeline. Employee query: 'Maternity leave kitni hoti hai?' — relevant sections sab teen sources se retrieve hote hain."
          commonMistakes={[
            {
              mistake: 'PDF se images aur tables ignore karna',
              why: 'PDFLoader default text-only extract karta hai — images mein important diagrams, tables mein critical data miss ho sakti hai.',
              fix: 'Complex PDFs ke liye: PyMuPDF loader (better formatting), ya vision model se images process karo separately, ya Azure Document Intelligence use karo structured extraction ke liye.',
            },
          ]}
          proTip="Unstructured.io library LangChain mein integrate hoti hai — ye PDF, Word, PowerPoint, Email, HTML, images (OCR) sab handle karta hai ek API se. Production mein complex document types ke liye best choice. Cloud API aur open-source dono versions available hain."
        />
      </div>

      {/* Card 5: When NOT to Use Frameworks */}
      <div id="when-not-to-use">
        <ConceptCard
          title="Framework Ka Sahi Use — Abstraction vs Simplicity"
          emoji="⚖️"
          difficulty="advanced"
          whatIsIt="LangChain aur LlamaIndex powerful hain lekin every use case ke liye best nahi. Simple use cases mein raw API simpler, faster, aur easier to debug hoti hai. Complex workflows mein frameworks save karte hain time. Decision: abstraction cost (complexity, debugging difficulty) vs benefit (pre-built components, patterns)."
          whenToUse={[
            'Use framework: 5+ components chain karne hain, multiple document sources, agents with tools.',
            'Use raw API: single/few LLM calls, simple prompts, learning/understanding internals.',
            'Use framework: rapid prototyping jab time-to-market priority ho.',
            'Use raw API: performance critical path, debugging zaroori ho, minimal dependencies.',
            'Hybrid: framework for complex parts, raw API for simple high-volume calls.',
          ]}
          whyUseIt="Over-engineering real cost hai — complex dependencies, harder debugging, framework upgrade breaks, team learning curve. Under-engineering bhi real cost hai — reinventing wheels, bugs in retry logic, missing battle-tested patterns. Right tool for right job — ye judgment develop karna ek skill hai."
          howToUse={{
            filename: 'framework-vs-raw.ts',
            language: 'typescript',
            code: `// ─── Decision Guide ──────────────────────────────────────────────

interface UseCaseAnalysis {
  description: string;
  components: number;
  recommendation: 'raw-api' | 'langchain' | 'llamaindex';
  reason: string;
}

const useCases: UseCaseAnalysis[] = [
  {
    description: 'Simple chatbot — one system prompt, conversation history',
    components: 1,
    recommendation: 'raw-api',
    reason: 'LangChain overkill. 20 lines raw API vs 50+ lines LangChain.'
  },
  {
    description: 'PDF Q&A system with semantic search',
    components: 5, // loader + splitter + embedder + vector store + retriever
    recommendation: 'llamaindex',
    reason: 'LlamaIndex handles all 5 steps with minimal config.'
  },
  {
    description: 'Multi-agent research system with web search, code execution',
    components: 10, // multiple agents, tools, memory, coordination
    recommendation: 'langchain',
    reason: 'Complex enough to justify LangChain\'s agent infrastructure.'
  },
  {
    description: 'Classification endpoint — 1000 requests/minute',
    components: 1,
    recommendation: 'raw-api',
    reason: 'High volume = every ms counts. LangChain overhead real hai.'
  },
];

// ─── Migration path ───────────────────────────────────────────────
// Start: LangChain (fast prototype)
// Profile: identify bottlenecks
// Migrate: hot paths to raw API
// Keep: LangChain for complex orchestration parts

// Real world pattern:
// - LangChain for: agent orchestration, document loading, complex chains
// - Raw Anthropic SDK for: high-volume simple calls, streaming endpoints
// - LlamaIndex for: RAG-specific parts of the system`,
            explanation: 'Component count heuristic: 1-2 components = raw API. 3-5 components = maybe framework. 5+ complex components = framework justified. Performance profiling karo before migrating — premature optimization avoid karo. LangChain internals raw API use karte hain — overhead minimal hai correctly used frameworks mein.',
          }}
          realWorldScenario="AI writing tool: LangChain se started, 6 months later performance issues. Profiling: simple grammar check (80% of requests) slow tha LangChain overhead se. Solution: grammar check → raw Anthropic SDK. Complex outline generation (20% requests) → LangChain rakha. 40% overall latency improvement, minimal code change."
          commonMistakes={[
            {
              mistake: 'Framework mein all-in karna bina performance benchmark ke',
              why: 'High-volume production aayi toh framework overhead noticeable ho sakta hai. Pehle measure karo, phir optimize.',
              fix: 'Baseline benchmark karo: raw API vs framework, same task, 100 iterations. Difference 10ms se kam hai? Framework theek hai. Zyada hai? Hot path pe raw API consider karo.',
            },
          ]}
          demo={
            <DiffBlock
              title="RAG Implementation — Raw API vs LlamaIndex"
              badLabel="Raw API (more code)"
              goodLabel="LlamaIndex (simpler for RAG)"
              bad={`// Manual RAG — 50+ lines
const chunks = splitText(docs, 1000, 100);
const embeddings = await batchEmbed(chunks);
await vectorDB.upsert(embeddings);
const queryEmb = await embed(userQuery);
const similar = await vectorDB.query(queryEmb, 5);
const context = similar.map(s => s.text).join('\\n');
const answer = await llm.complete(context + userQuery);`}
              good={`// LlamaIndex — 5 lines
const docs = await new SimpleDirectoryReader()
  .loadData({ directoryPath: './docs' });
const index = await VectorStoreIndex
  .fromDocuments(docs);
const engine = index.asQueryEngine();
const response = await engine.query({
  query: userQuery
});`}
            />
          }
          proTip="LangChain community mein 100+ integration packages hain (@langchain/community) — Google Drive, Notion, Slack, Salesforce loaders. Apna loader banana shuru karne se pehle check karo — likely already exist karta hai. npm search @langchain/community karo aur docs dekho available integrations."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 14 Quiz — LangChain & LlamaIndex
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Frameworks samjhe? Check karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="langchain-llamaindex" />
      </div>
    </div>
  )
}
