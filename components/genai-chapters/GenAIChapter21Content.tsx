'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Async AI processing kyun zaruri hai synchronous ke bajaye?',
    options: [
      {
        text: 'Async processing hamesha faster hota hai — isliye use karo',
        correct: false,
        explanation: 'Async processing latency add karta hai (queue time). Faster nahi, more reliable aur scalable hai for long-running AI tasks.',
      },
      {
        text: 'LLM calls slow hote hain (1-30 seconds) — synchronous se user wait karta hai, server resources block hote hain, timeouts possible. Async queue mein daalo, webhook pe notify karo.',
        correct: true,
        explanation: 'Exactly! Long-running AI: user request → immediate "processing" response → background job → webhook/polling se result deliver. Benefits: user blocked nahi, server resources free, retries automatic, scale independent.',
      },
      {
        text: 'Async sirf batch jobs ke liye hai — real-time mein use nahi hota',
        correct: false,
        explanation: 'Async real-time features mein bhi use hota hai — streaming notifications, background processing. Real-time matlab instant user feedback, background mein heavy work.',
      },
      {
        text: 'Async processing code complexity se avoid karna chahiye',
        correct: false,
        explanation: 'Complexity is valid concern, lekin BullMQ jaise libraries ye manage karte hain. Production AI ka 80%+ async processing chahiye — avoid karne ki cost zyada hai.',
      },
    ],
  },
  {
    question: 'Semantic caching regular response caching se kaise different hai?',
    options: [
      {
        text: 'Semantic caching zyada expensive hai — isliye avoid karo',
        correct: false,
        explanation: 'Initial embedding cost hota hai lekin cache hits pe significant savings. Net economics typically positive.',
      },
      {
        text: 'Regular caching: exact string match. Semantic caching: similar meaning queries → same cached result. "NodeJS kya hai?" aur "Node.js explain karo" → same cache hit.',
        correct: true,
        explanation: 'Bilkul sahi! Regular cache: exact key match required. Semantic cache: query embed karo, similar embedding dhundho, threshold ke upar? Cache hit. Below threshold: LLM call karo, cache karo. FAQ-type applications mein 40-70% cache hit rate possible hai.',
      },
      {
        text: 'Semantic caching sirf vector databases pe kaam karta hai',
        correct: false,
        explanation: 'Semantic caching in-memory bhi ho sakti hai — embeddings compare karo in-memory. Production pe: Redis + embeddings, ya GPTCache library.',
      },
      {
        text: 'Semantic caching hamesha better hai regular caching se',
        correct: false,
        explanation: 'Semantic caching zyada complex hai — embedding cost, similarity computation. Exact-match queries (structured queries, code) ke liye regular caching faster aur simpler hai.',
      },
    ],
  },
  {
    question: 'BullMQ queue mein AI jobs kyu daalte hain direct API call ki bajaye?',
    options: [
      {
        text: 'BullMQ sirf file processing ke liye hai — AI ke liye unnecessary',
        correct: false,
        explanation: 'BullMQ general-purpose job queue hai — AI calls, file processing, email sending — koi bhi async task ke liye use ho sakta hai.',
      },
      {
        text: 'Rate limiting (automatic), retry on failure, concurrency control, job prioritization, monitoring — sab built-in. AI calls unreliable hoti hain, queue se reliability milti hai.',
        correct: true,
        explanation: 'Exactly! BullMQ benefits for AI: (1) Rate limit: concurrency se API rate limits avoid karo, (2) Retry: API fail? Auto-retry with backoff, (3) Priority: paid users jobs pehle, (4) Monitoring: dashboard se job status, (5) Persistence: server restart pe jobs survive karte hain.',
      },
      {
        text: 'BullMQ sirf Node.js mein kaam karta hai — cross-language nahi',
        correct: false,
        explanation: 'BullMQ Node.js specific hai lekin Redis backend cross-language hai — Python consumers bhi same queue se read kar sakte hain.',
      },
      {
        text: 'Queue mein job daalna security concern hai',
        correct: false,
        explanation: 'Queue itself secure hai agar Redis properly configured hai. Sensitive data queue mein daalne ke liye encrypt karo — lekin queue concept insecure nahi hai.',
      },
    ],
  },
  {
    question: 'Multi-model routing mein "escalation" strategy kya hai?',
    options: [
      {
        text: 'Escalation matlab urgent jobs pehle process karna',
        correct: false,
        explanation: 'Priority queuing se urgent jobs pehle hote hain, escalation alag concept hai — model upgrade karna.',
      },
      {
        text: 'Cheap fast model (Haiku) try karo pehle → quality threshold nahi mili → expensive model (Sonnet/Opus) escalate karo. Cost + quality balance.',
        correct: true,
        explanation: 'Bilkul sahi! Escalation routing: (1) Haiku se generate karo ($0.25/1M), (2) Quality score karo (automated LLM-as-judge ya rule-based), (3) Pass? Return result. Fail? (4) Sonnet pe retry ($3/1M), (5) Still fail? Opus ($15/1M). Most requests Haiku mein resolve → 80%+ cost saving.',
      },
      {
        text: 'Escalation sirf error handling ke liye hai — quality ke liye nahi',
        correct: false,
        explanation: 'Escalation quality routing bhi hai — not just error handling. Quality-based escalation intentional design pattern hai cost optimization ke liye.',
      },
      {
        text: 'Escalation performance issue hai — hamesha expensive model use karo',
        correct: false,
        explanation: 'Escalation ek latency overhead add karta hai (second call) lekin cost saving significant hai. Simple tasks pe latency difference negligible — economics justify karta hai.',
      },
    ],
  },
  {
    question: 'AI microservices architecture mein dedicated AI service ka kya benefit hai?',
    options: [
      {
        text: 'Dedicated service hamesha required hai — monolith mein AI possible nahi',
        correct: false,
        explanation: 'Monolith mein bhi AI integrate ho sakti hai — dedicated service optional optimization hai, requirement nahi.',
      },
      {
        text: 'Independent scaling (AI service heavy compute chahti hai), model swapping without app redeploy, shared rate limit management, centralized caching — team boundaries bhi clear hote hain.',
        correct: true,
        explanation: 'Exactly! Dedicated AI service benefits: (1) Scale independently — AI requests spike hone pe sirf AI service scale karo, (2) Model management centralized, (3) Rate limits ek jagah manage, (4) Caching shared across multiple consumers, (5) Monitoring dedicated AI-specific metrics, (6) Team separation — AI team vs product team.',
      },
      {
        text: 'Dedicated service sirf microservices architecture mein possible hai',
        correct: false,
        explanation: 'Dedicated AI service monolithic apps mein bhi deploy ho sakti hai — sidecar pattern ya separate deployment. Architecture choice alag hai dedicated service choice se.',
      },
      {
        text: 'Dedicated AI service hamesha slower hai — network latency add hoti hai',
        correct: false,
        explanation: 'Network latency add hoti hai (typically <5ms internal network) lekin LLM call latency (1-30s) ke comparison mein negligible hai. Benefits outweigh this cost.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter21Content() {
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
          AI Architecture Patterns — Production Design 🏗️
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          AI features build karna ek baat hai, scalable production architecture banana doosri baat. Async queues, semantic caching, multi-model routing — enterprise patterns sikhо.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm italic">
            &quot;Architecture patterns AI ko production-ready banate hain — reliable, scalable, cost-efficient.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: Async AI Processing */}
      <div id="async-processing">
        <ConceptCard
          title="Async AI Processing — Queue-Based AI Tasks"
          emoji="⏳"
          difficulty="advanced"
          whatIsIt="AI calls slow hoti hain (1-30+ seconds). Synchronous approach: user request → API call → wait → response. Problem: server blocked, user frustrated, timeouts possible. Async approach: user request → immediate 'processing' response → background job → result deliver. BullMQ + Claude pattern."
          whenToUse={[
            'Long AI processing: document analysis, research, code generation.',
            'Batch operations: 100s of items process karna.',
            'Webhook-based results: email report, Slack notification.',
            'Retry-critical: API failures pe automatic retry.',
            'Cost-controlled: rate limit workers se API costs control.',
          ]}
          whyUseIt="Synchronous LLM call pe 30-second response — user bounce karta hai. Async: 'Aapki request process ho rahi hai' → user continues browsing → notification aata hai. UX dramatically better. Backend bhi: queue workers rate-limited kaam karte hain, server threads block nahi hote, retries automatic."
          howToUse={{
            filename: 'async-ai-processing.ts',
            language: 'typescript',
            code: `// npm install bullmq ioredis @anthropic-ai/sdk
import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import Anthropic from '@anthropic-ai/sdk';

const redis = new Redis({ host: 'localhost', port: 6379 });
const claude = new Anthropic();

// ─── Job Types ────────────────────────────────────────────────────
interface AIJobData {
  jobId: string;
  userId: string;
  type: 'document_analysis' | 'code_review' | 'content_generation';
  input: string;
  metadata: Record<string, string>;
}

interface AIJobResult {
  jobId: string;
  output: string;
  tokensUsed: number;
  processingTimeMs: number;
}

// ─── Queue Setup ──────────────────────────────────────────────────
const aiQueue = new Queue<AIJobData>('ai-processing', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,                              // retry 3 times on failure
    backoff: { type: 'exponential', delay: 2000 }, // exponential backoff
    removeOnComplete: 100,                    // keep last 100 completed jobs
    removeOnFail: 50,                         // keep last 50 failed jobs
  },
});

// ─── Worker ───────────────────────────────────────────────────────
const aiWorker = new Worker<AIJobData, AIJobResult>(
  'ai-processing',
  async (job: Job<AIJobData>) => {
    const { jobId, type, input, userId } = job.data;
    const startTime = Date.now();

    console.log(\`Processing job \${jobId} (type: \${type}, user: \${userId})\`);

    // Update progress
    await job.updateProgress(10);

    const systemPrompts: Record<AIJobData['type'], string> = {
      document_analysis: 'Analyze this document thoroughly and extract key insights.',
      code_review: 'Review this code for bugs, security issues, and improvements.',
      content_generation: 'Generate high-quality content based on the input.',
    };

    const response = await claude.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: systemPrompts[type],
      messages: [{ role: 'user', content: input }],
    });

    await job.updateProgress(90);

    const block = response.content[0];
    const output = block.type === 'text' ? block.text : '';

    const result: AIJobResult = {
      jobId,
      output,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
      processingTimeMs: Date.now() - startTime,
    };

    // Notify user (webhook, email, real-time update)
    await notifyUser(userId, result);

    return result;
  },
  {
    connection: redis,
    concurrency: 5,  // 5 parallel AI calls
    limiter: {
      max: 10,       // max 10 jobs per duration
      duration: 1000, // per second
    },
  }
);

// ─── API Endpoint ─────────────────────────────────────────────────
async function submitAIJob(userId: string, type: AIJobData['type'], input: string): Promise<string> {
  const jobId = crypto.randomUUID();

  await aiQueue.add(
    'process',
    { jobId, userId, type, input, metadata: {} },
    { priority: 1 } // 1 = high, 10 = low
  );

  return jobId; // Return immediately, user polls or waits for webhook
}

async function getJobStatus(jobId: string) {
  const job = await aiQueue.getJob(jobId);
  if (!job) return { status: 'not_found' };

  const state = await job.getState();
  const progress = job.progress;
  const result = job.returnvalue;

  return { status: state, progress, result };
}

async function notifyUser(userId: string, result: AIJobResult) {
  // Implement: send websocket message, email, push notification
  console.log(\`Notifying user \${userId}: job \${result.jobId} complete\`);
}`,
            explanation: 'BullMQ: Queue (jobs add karo) + Worker (jobs process karo). Worker concurrency: 5 parallel Claude calls. Limiter: rate limit control. Retry: 3 attempts exponential backoff. Progress tracking: job.updateProgress(). Status check: getJobStatus(). User notification: webhook/websocket/email.',
          }}
          realWorldScenario="Legal document review platform: 100+ page contracts upload karne pe immediate 'processing' response. BullMQ queue: 10 concurrent workers, 3 retries. Progress bar: 10% → 50% → 90% → done. Email notification jab complete. Processing time: 2-5 min. Synchronous: timeout ho jaata (60s limit). Queue-based: 100% success rate."
          commonMistakes={[
            {
              mistake: 'Job data mein poora document store karna queue mein',
              why: 'Redis queue mein large data (PDFs, images) store karna memory issues aur slow performance cause karta hai.',
              fix: 'File/content S3 ya database mein store karo. Queue mein sirf reference (fileId, s3Key) pass karo. Worker reference se content fetch kare.',
            },
          ]}
          proTip="BullMQ Board (npm install @bull-board/express) se visual dashboard milta hai — running, completed, failed jobs sab dekho. Development mein extremely helpful hai. Production mein: metrics export karo Prometheus/Grafana mein. Job success rate, avg processing time, queue depth — sab monitor karo."
        />
      </div>

      {/* Card 2: Event-Driven AI */}
      <div id="event-driven">
        <ConceptCard
          title="Event-Driven AI — Webhooks & Async Callbacks"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Event-driven AI: kuch event trigger hone pe AI automatically kaam kare — new document uploaded → analyze karo, new support ticket → categorize karo, code pushed → review karo. Webhooks, message queues (Redis/RabbitMQ/Kafka), event buses — triggers ke mechanisms."
          whenToUse={[
            'File upload → AI processing: document analysis, image recognition.',
            'New record → AI enrichment: customer signup → persona, lead → score.',
            'Code push → AI review: GitHub webhook → PR review bot.',
            'Schedule-triggered: nightly reports, weekly summaries.',
            'User action → AI reaction: comment posted → sentiment analysis.',
          ]}
          whyUseIt="Polling (periodic check if new data available) vs Event-driven (push notification when data available). Polling: wastes resources, adds latency, doesn't scale. Events: instant reaction, no wasted polls, scales with event volume. Google Calendar, GitHub, Stripe — sab webhooks use karte hain AI processing trigger karne ke liye."
          howToUse={{
            filename: 'event-driven-ai.ts',
            language: 'typescript',
            code: `import express from 'express';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import Anthropic from '@anthropic-ai/sdk';
import crypto from 'crypto';

const app = express();
const redis = new Redis();
const queue = new Queue('ai-events', { connection: redis });
const claude = new Anthropic();

// ─── Webhook Handler ──────────────────────────────────────────────
app.post('/webhooks/github', express.raw({ type: 'application/json' }), async (req, res) => {
  // Verify webhook signature (important for security!)
  const signature = req.headers['x-hub-signature-256'] as string;
  const secret = process.env.GITHUB_WEBHOOK_SECRET!;
  const payload = req.body as Buffer;

  const expectedSig = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return res.status(401).send('Invalid signature');
  }

  const event = JSON.parse(payload.toString()) as {
    action?: string;
    pull_request?: {
      number: number;
      body: string;
      diff_url: string;
    };
    repository?: { full_name: string };
  };

  // Queue AI review for new PRs
  if (event.action === 'opened' && event.pull_request) {
    await queue.add('pr-review', {
      prNumber: event.pull_request.number,
      repo: event.repository?.full_name,
      diffUrl: event.pull_request.diff_url,
    });
    console.log(\`PR #\${event.pull_request.number} queued for AI review\`);
  }

  res.status(200).send('OK');
});

// ─── Document Upload Event ────────────────────────────────────────
app.post('/events/document-uploaded', express.json(), async (req, res) => {
  const { documentId, s3Key, userId, type } = req.body as {
    documentId: string;
    s3Key: string;
    userId: string;
    type: string;
  };

  // Different processing based on document type
  const jobName = type === 'contract' ? 'contract-analysis' : 'general-analysis';

  await queue.add(jobName, { documentId, s3Key, userId }, {
    priority: type === 'contract' ? 1 : 5, // contracts high priority
  });

  res.json({ status: 'queued', documentId });
});

// ─── Event Bus (internal events) ─────────────────────────────────
class AIEventBus {
  private handlers: Map<string, ((data: unknown) => Promise<void>)[]> = new Map();

  on(event: string, handler: (data: unknown) => Promise<void>) {
    if (!this.handlers.has(event)) this.handlers.set(event, []);
    this.handlers.get(event)!.push(handler);
  }

  async emit(event: string, data: unknown) {
    const handlers = this.handlers.get(event) ?? [];
    await Promise.all(handlers.map(h => h(data)));
  }
}

const eventBus = new AIEventBus();

// Register AI handlers
eventBus.on('user.signup', async (data) => {
  const { userId, email } = data as { userId: string; email: string };
  // AI: generate personalized onboarding message
  const message = await claude.messages.create({
    model: 'claude-haiku-4-5', // fast for simple task
    max_tokens: 256,
    messages: [{ role: 'user', content: \`Generate a welcome email for \${email}\` }],
  });
  const block = message.content[0];
  console.log('Welcome email for user', userId, ':', block.type === 'text' ? block.text.slice(0, 50) : '');
});`,
            explanation: 'Webhook: external event → verify signature → queue mein job → process. Event bus: internal events ke liye — signup, upload, action. Queue: immediate response (queued), background processing. Security: webhook signature verify karo timingSafeEqual se (timing attack prevent karo).',
          }}
          realWorldScenario="GitHub PR bot: code push pe webhook → BullMQ queue → Claude review → GitHub comment post. Team ne manual code review time 50% reduce kiya — AI catches obvious issues, humans focus on architecture/logic. Setup: 1 day. Impact: permanent. Event-driven architecture se bot runs automatically on every PR."
          commonMistakes={[
            {
              mistake: 'Webhook signature verify nahi karna',
              why: 'Bina verification ke koi bhi fake webhook bhej sakta hai — malicious requests process ho jaate hain.',
              fix: 'Hamesha X-Hub-Signature-256 ya equivalent verify karo. timingSafeEqual use karo (not ===) — timing attacks prevent karo. Reject invalid signatures 401 se.',
            },
          ]}
          proTip="Webhook delivery reliable nahi hoti — servers down ho sakte hain, timeouts happen. Retry logic implement karo: Svix ya Hookdeck use karo managed webhook delivery ke liye. Automatic retries, delivery logs, dashboard — webhook infrastructure manage karna complicated hai, managed service easy banata hai."
        />
      </div>

      {/* Card 3: AI Caching Patterns */}
      <div id="caching-patterns">
        <ConceptCard
          title="AI Caching Patterns — Semantic Cache"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="AI caching: responses cache karo similar future queries ke liye. Regular cache: exact key match. Semantic cache: similar meaning queries → same cached result. 'Node.js kya hai?' aur 'NodeJS explain karo' same response cache se serve ho sakte hain. GPTCache, Redis + embeddings se implement."
          whenToUse={[
            'FAQ systems: same questions repeatedly asked.',
            'Documentation Q&A: same concepts different phrasings.',
            'Customer support: similar queries, standard answers.',
            'High-traffic endpoints: cost + latency reduce karo.',
            'Consistent answers: policy questions exact same response chahiye.',
          ]}
          whyUseIt="Production FAQ chatbot: 10K queries/day, 70% similar. Without cache: 10K * $0.003 = $30/day = $900/month. With 70% hit rate: 3K * $0.003 = $9/day = $270/month. 70% savings. Latency bhi: cache hit = <10ms vs LLM = 1-3 seconds. UX + cost improvement simultaneously."
          howToUse={{
            filename: 'semantic-cache.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';
import Redis from 'ioredis';
import Anthropic from '@anthropic-ai/sdk';

const openai = new OpenAI();
const redis = new Redis();
const claude = new Anthropic();

// ─── Semantic Cache Implementation ───────────────────────────────
const SIMILARITY_THRESHOLD = 0.92; // 92% similar = cache hit
const CACHE_TTL = 3600; // 1 hour

async function embed(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return res.data[0].embedding;
}

function cosineSim(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

interface CacheEntry {
  query: string;
  response: string;
  embedding: number[];
  timestamp: number;
}

// In production: use Redis with vector search capability
// Or: GPTCache library (Python) / custom implementation
const cacheStore: CacheEntry[] = []; // In-memory for demo

async function semanticCachedQuery(query: string): Promise<{
  response: string;
  cacheHit: boolean;
  similarity?: number;
}> {
  const queryEmbedding = await embed(query);

  // Check cache for similar queries
  let bestMatch: { entry: CacheEntry; similarity: number } | null = null;

  for (const entry of cacheStore) {
    const similarity = cosineSim(queryEmbedding, entry.embedding);
    if (similarity > SIMILARITY_THRESHOLD) {
      if (!bestMatch || similarity > bestMatch.similarity) {
        bestMatch = { entry, similarity };
      }
    }
  }

  if (bestMatch) {
    console.log(\`Cache hit! Similarity: \${bestMatch.similarity.toFixed(3)}\`);
    return { response: bestMatch.entry.response, cacheHit: true, similarity: bestMatch.similarity };
  }

  // Cache miss — call LLM
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: query }],
  });

  const block = response.content[0];
  const responseText = block.type === 'text' ? block.text : '';

  // Cache the result
  cacheStore.push({
    query,
    response: responseText,
    embedding: queryEmbedding,
    timestamp: Date.now(),
  });

  // Evict old entries (TTL)
  const cutoff = Date.now() - CACHE_TTL * 1000;
  cacheStore.splice(0, cacheStore.findIndex(e => e.timestamp > cutoff));

  return { response: responseText, cacheHit: false };
}

// Test
const r1 = await semanticCachedQuery('Node.js kya hai?');
const r2 = await semanticCachedQuery('NodeJS explain karo'); // should hit cache
console.log('Q1 cache hit:', r1.cacheHit); // false
console.log('Q2 cache hit:', r2.cacheHit); // true (similarity ~0.95)`,
            explanation: 'Semantic cache: query embed karo → existing cache entries se compare → similarity threshold check → hit ya miss. Production mein: Redis + RediSearch (vector similarity), ya GPTCache Python library (most mature option), ya Qdrant (vector DB as cache). Threshold: 0.9-0.95 usually good — tune karo false positive rate ke hisaab se.',
          }}
          realWorldScenario="EdTech platform ke AI tutor pe: 60% queries similar variations hain (kaise karo, explain karo, batao — same topic). Semantic cache implement kiya Redis + embeddings se. Result: 58% cache hit rate, $800/month API cost → $340/month. Response time: P50 1.2s → P50 with cache: 0.4s (40ms cache + 360ms overhead). Win-win."
          commonMistakes={[
            {
              mistake: 'Bahut low similarity threshold set karna (< 0.85)',
              why: 'Low threshold pe unrelated queries cache hit kar lete hain — wrong answers users ko milte hain.',
              fix: 'Start 0.95 se, analyze false positives, cautiously lower karo. Better to miss cache than return wrong answer. Domain-specific: technical queries higher threshold chahiye.',
            },
          ]}
          proTip="GPTCache (Python, pip install gptcache) production semantic caching ke liye best library hai — OpenAI drop-in replacement, multiple embedding models support, Redis/Chroma backends. Node.js se: Python GPTCache service deploy karo, REST API expose karo — Node.js se HTTP call karo."
        />
      </div>

      {/* Card 4: Multi-model Routing */}
      <div id="multi-model-routing">
        <ConceptCard
          title="Multi-model Routing — Cost + Quality Balance"
          emoji="🚦"
          difficulty="advanced"
          whatIsIt="Multi-model routing: task complexity assess karo, appropriate model select karo. Simple question → Haiku (fast, cheap). Complex analysis → Sonnet. Deep reasoning → Opus. Escalation strategy: cheap model try karo, quality insufficient? Expensive model pe escalate. 40-70% cost reduction without significant quality loss."
          whenToUse={[
            'Mixed workloads: simple FAQs + complex analysis mix.',
            'Cost-sensitive production: hundreds of thousands of queries/month.',
            'Latency priority: simple tasks fast response chahiye.',
            'Quality-critical tasks: important decisions expensive model pe.',
          ]}
          whyUseIt="Haiku: $0.25/1M input tokens. Sonnet: $3/1M. Opus: $15/1M. 60x price difference. Agar 80% queries Haiku se handle ho sakte hain: $1000/month → $280/month. Quality-based routing: automatic escalation ensure karta hai quality nahi giregi. Cost optimize without manual intervention."
          howToUse={{
            filename: 'model-routing.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── Task Complexity Classifier ───────────────────────────────────
interface TaskAnalysis {
  complexity: 'simple' | 'moderate' | 'complex';
  model: string;
  maxTokens: number;
  reasoning: string;
}

function analyzeTask(query: string): TaskAnalysis {
  const lower = query.toLowerCase();
  const wordCount = query.split(' ').length;

  // Simple: short, factual, direct
  const simpleIndicators = ['what is', 'define', 'when was', 'how many', 'yes or no'];
  const isSimple = wordCount < 30 && simpleIndicators.some(i => lower.includes(i));

  // Complex: multi-step, analysis, comparison
  const complexIndicators = ['analyze', 'compare', 'design', 'architecture', 'debug', 'optimize', 'explain why'];
  const isComplex = wordCount > 100 || complexIndicators.some(i => lower.includes(i));

  if (isSimple) {
    return { complexity: 'simple', model: 'claude-haiku-4-5', maxTokens: 512, reasoning: 'Short factual query' };
  }
  if (isComplex) {
    return { complexity: 'complex', model: 'claude-sonnet-4-6', maxTokens: 4096, reasoning: 'Complex analysis' };
  }
  return { complexity: 'moderate', model: 'claude-haiku-4-5', maxTokens: 1024, reasoning: 'Moderate query' };
}

// ─── Escalation Strategy ──────────────────────────────────────────
async function routedCall(
  query: string,
  qualityThreshold = 0.7
): Promise<{ response: string; model: string; escalated: boolean }> {
  const task = analyzeTask(query);

  // Try assigned model first
  const response = await client.messages.create({
    model: task.model,
    max_tokens: task.maxTokens,
    messages: [{ role: 'user', content: query }],
  });

  const block = response.content[0];
  const responseText = block.type === 'text' ? block.text : '';

  // Quality check (simple heuristics — production: LLM-as-judge)
  const quality = assessQuality(responseText);

  if (quality < qualityThreshold && task.model !== 'claude-sonnet-4-6') {
    console.log(\`Quality \${quality.toFixed(2)} below threshold, escalating to Sonnet...\`);

    const escalated = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: query }],
    });

    const escalatedBlock = escalated.content[0];
    return {
      response: escalatedBlock.type === 'text' ? escalatedBlock.text : '',
      model: 'claude-sonnet-4-6',
      escalated: true,
    };
  }

  return { response: responseText, model: task.model, escalated: false };
}

function assessQuality(response: string): number {
  // Simple heuristics — production: use LLM-as-judge
  if (response.length < 50) return 0.3;  // Too short
  if (response.includes("I don't know") && response.length < 100) return 0.4;
  if (response.split('.').length > 3 && response.length > 200) return 0.8;
  return 0.6;
}

// ─── Routing Metrics ──────────────────────────────────────────────
const routingMetrics = {
  total: 0,
  byModel: { 'claude-haiku-4-5': 0, 'claude-sonnet-4-6': 0 },
  escalated: 0,

  record(model: string, escalated: boolean) {
    this.total++;
    this.byModel[model as keyof typeof this.byModel] = (this.byModel[model as keyof typeof this.byModel] ?? 0) + 1;
    if (escalated) this.escalated++;
  },

  report() {
    console.log(\`Routing: \${this.total} total, \${this.escalated} escalated (\${(this.escalated/this.total*100).toFixed(1)}%)\`);
    console.log('By model:', this.byModel);
  }
};`,
            explanation: 'Task analysis: word count, keywords se complexity classify karo. Model assign karo. Quality check karo. Threshold nahi mili? Escalate karo. Metrics track karo — escalation rate, model distribution. Production mein: LLM-as-judge quality assessment use karo (more accurate than heuristics).',
          }}
          realWorldScenario="Customer support AI: 75% simple questions (order status, basic FAQs) → Haiku. 20% moderate (product troubleshooting) → Haiku with escalation. 5% complex (technical issues, disputes) → Sonnet. Escalation rate: 8%. Monthly savings: $4200 → $1100. Quality: unchanged per customer satisfaction score."
          commonMistakes={[
            {
              mistake: 'Routing classify karna bina validation ke — wrong classification',
              why: 'Simple keyword matching often fails — "analyze ke baare mein explain karo" complex nahi hai lekin keyword match hai.',
              fix: 'Routing classifier ko validate karo ground truth se. LLM-as-classifier use karo: "Is this query simple/moderate/complex?" — meta-call karo. Track escalation rate — too high? Classifier fix karo.',
            },
          ]}
          proTip="RouteLLM (open-source library) production-grade routing implement karta hai trained classifier ke saath — manually rules likhne se better. Paper: 'RouteLLM: Learning to Route LLMs with Preference Data'. Models: Haiku-level quality at 40% of Sonnet cost on their benchmarks. Python library, Node.js se API karo."
        />
      </div>

      {/* Card 5: AI in Microservices */}
      <div id="ai-microservices">
        <ConceptCard
          title="AI in Microservices — Dedicated AI Service"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Dedicated AI service pattern: AI functionality ek separate service mein isolate karo — other services is AI service ko call kare. Benefits: independent scaling, centralized model management, shared rate limits + caching, AI-specific monitoring, team boundary clarity. API gateway se route karo."
          whenToUse={[
            'Multiple services AI chahti hain — centralize karo.',
            'AI resource requirements different hain — GPU/memory alag scale karo.',
            'Team separation — AI team vs product team independent deploy.',
            'Shared caching — multiple services same AI calls se benefit karein.',
            'Compliance — AI calls audit centrally karo.',
          ]}
          whyUseIt="Monolith mein AI: har team apna API key manage karta hai, har service apna rate limiting implement karta hai, caching duplicate hoti hai. Dedicated AI service: ek jagah API keys, ek jagah rate limiting, shared cache, centralized monitoring. Governance bhi easy — ek service ki compliance verify karo."
          howToUse={{
            filename: 'ai-service.ts',
            language: 'typescript',
            code: `import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import rateLimit from 'express-rate-limit';

const app = express();
const redis = new Redis();
const claude = new Anthropic();
const aiQueue = new Queue('ai-requests', { connection: redis });

// ─── Rate Limiting (service-level) ───────────────────────────────
const limiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: 100,         // 100 requests per client per minute
  keyGenerator: (req) => req.headers['x-client-id'] as string || req.ip!,
});

app.use(express.json());
app.use('/api', limiter);

// ─── Service Interface ────────────────────────────────────────────
interface AIRequest {
  type: 'chat' | 'summarize' | 'analyze' | 'extract';
  input: string;
  model?: 'fast' | 'balanced' | 'powerful';
  options?: { maxTokens?: number; temperature?: number };
  clientId: string;
  requestId: string;
}

interface AIResponse {
  requestId: string;
  output: string;
  model: string;
  usage: { inputTokens: number; outputTokens: number; estimatedCostUSD: number };
  latencyMs: number;
}

// ─── Synchronous Endpoint ─────────────────────────────────────────
app.post('/api/ai/generate', async (req, res) => {
  const request = req.body as AIRequest;

  const modelMap = {
    fast: 'claude-haiku-4-5',
    balanced: 'claude-sonnet-4-6',
    powerful: 'claude-sonnet-4-6',
  };
  const model = modelMap[request.model ?? 'balanced'];

  // Check semantic cache
  const cacheKey = \`ai:\${request.type}:\${hashString(request.input)}\`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached) as AIResponse;
    return res.json({ ...parsed, cached: true });
  }

  const startTime = Date.now();
  const response = await claude.messages.create({
    model,
    max_tokens: request.options?.maxTokens ?? 1024,
    messages: [{ role: 'user', content: request.input }],
  });

  const block = response.content[0];
  const output = block.type === 'text' ? block.text : '';
  const inputCost = (response.usage.input_tokens / 1_000_000) * 3;
  const outputCost = (response.usage.output_tokens / 1_000_000) * 15;

  const aiResponse: AIResponse = {
    requestId: request.requestId,
    output,
    model,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      estimatedCostUSD: inputCost + outputCost,
    },
    latencyMs: Date.now() - startTime,
  };

  // Cache successful response
  await redis.setex(cacheKey, 3600, JSON.stringify(aiResponse));

  res.json(aiResponse);
});

// ─── Async Endpoint ───────────────────────────────────────────────
app.post('/api/ai/async', async (req, res) => {
  const request = req.body as AIRequest;
  const job = await aiQueue.add('process', request);
  res.json({ jobId: job.id, status: 'queued' });
});

app.get('/api/ai/job/:id', async (req, res) => {
  const job = await aiQueue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  const state = await job.getState();
  res.json({ status: state, result: job.returnvalue });
});

function hashString(str: string): string {
  return str.slice(0, 50).replace(/\\s/g, '').toLowerCase();
}

app.listen(3001, () => console.log('AI Service running on :3001'));`,
            explanation: 'Dedicated AI service: Express server on port 3001, other services call kare. Rate limiting per client. Semantic cache (Redis). Sync endpoint (fast tasks) + async endpoint (long tasks). Model routing built-in (fast/balanced/powerful). Other services: HTTP call karo — AI internals hidden.',
          }}
          realWorldScenario="E-commerce platform: 5 services sab AI chahte the (product descriptions, customer support, review analysis, search ranking, recommendations). Instead of 5 API key setups: 1 AI service. Benefits: shared cache hit rate 55% (cross-service same queries), centralized cost tracking, ek jagah model upgrade. Dev velocity improved."
          commonMistakes={[
            {
              mistake: 'AI service mein synchronous calls sirf use karna',
              why: 'Long-running AI tasks calling service timeout kar sakti hai. Service mesh mein cascading failures.',
              fix: 'Sync endpoint: <2 second tasks ke liye. Async endpoint + webhook: long tasks ke liye. Service calling AI service ko job ID return karke webhook pe result receive karna chahiye.',
            },
          ]}
          proTip="AI Gateway products available hain — Portkey.ai, Helicone, LiteLLM — ye managed AI service ka kaam karte hain: provider routing, rate limiting, caching, observability, cost tracking. Self-hosted se zyada easy. LiteLLM: open-source, self-host karo, 100+ providers support karta hai uniform OpenAI API se."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 21 Quiz — AI Architecture Patterns
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Architecture samjhe? Test karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="ai-architecture-patterns" />
      </div>
    </div>
  )
}
