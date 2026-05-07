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
          AI feature banana easy hai. Scalable, reliable, cost-efficient AI system banana — ye alag kaam hai. Jo log sirf features banate hain unka system production mein toot jaata hai. Jo log architecture patterns sikhte hain unka system scale pe bhi kaam karta hai. Async queues, semantic caching, multi-model routing, dedicated AI service — ye enterprise-grade patterns hain, aaj sikhte hain.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm italic">
            &quot;Code likhna skill hai. Architecture sochna craft hai. AI features ship karo — lekin sahi architecture ke saath, warna scale pe regret hoga.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: Async AI Processing */}
      <div id="async-processing">
        <ConceptCard
          title="Async AI Processing — Queue-Based AI Tasks"
          emoji="⏳"
          difficulty="advanced"
          whatIsIt="AI calls 1 se 30+ seconds le sakti hain. Synchronous approach: user request kare, server block ho, user wait kare, timeout ho — aur sab fail. Async approach: user request kare, immediate 'aapki request process ho rahi hai' response mile, background mein kaam ho, result deliver ho jab ready ho. BullMQ + Claude = ye pattern implement karta hai."
          whenToUse={[
            'Long AI processing: document analysis, research, code generation.',
            'Batch operations: 100s of items process karna.',
            'Webhook-based results: email report, Slack notification.',
            'Retry-critical: API failures pe automatic retry.',
            'Cost-controlled: rate limit workers se API costs control.',
          ]}
          whyUseIt="30-second synchronous response: user bounce karta hai, server threads block hote hain, timeout fail hoti hai. Async: user ko immediate response, continues browsing, notification aata hai jab done. UX dramatically better. Backend bhi cleaner: queue workers rate-controlled kaam karte hain, server resources free, automatic retries, dead letter queue for failures. Ye professional engineering hai."
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
            explanation: 'BullMQ two parts: Queue (jobs add karo) + Worker (jobs process karo). defaultJobOptions mein: 3 attempts, exponential backoff 2s, last 100 completed jobs rakho. Worker: concurrency 5 parallel calls, limiter 10/second. job.updateProgress() se real-time progress tracking. submitAIJob immediately jobId return karta hai — user ye ID se status poll kare ya webhook wait kare. notifyUser: websocket, email, push notification — implement as needed.',
          }}
          realWorldScenario="Legal document review platform: 100+ page contracts. Synchronous approach try kiya — 60-second timeout hit karta tha. Switch to async BullMQ queue: immediate 'processing' response, 10 concurrent workers, 3 auto-retries. Progress bar: 10% → 50% → 90% → done. Email notification on completion. Processing time: 2-5 minutes. Synchronous: 100% timeout failures. Queue-based: 100% success rate. Architecture change ne product ship kiya."
          commonMistakes={[
            {
              mistake: 'Job data mein poora document store karna queue mein',
              why: 'Redis queue mein large data (PDFs, images) store karna memory issues aur slow performance cause karta hai.',
              fix: 'File/content S3 ya database mein store karo. Queue mein sirf reference (fileId, s3Key) pass karo. Worker reference se content fetch kare.',
            },
          ]}
          proTip="@bull-board/express install karo — ek line se visual dashboard milta hai running, completed, failed jobs ka. Development mein bahut helpful hai. Production mein: BullMQ metrics Prometheus pe export karo, Grafana mein dashboard banao. Queue depth, success rate, average processing time — ye metrics AI product ki health tell karte hain."
        />
      </div>

      {/* Card 2: Event-Driven AI */}
      <div id="event-driven">
        <ConceptCard
          title="Event-Driven AI — Webhooks & Async Callbacks"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Event-driven AI: kuch hota hai → AI automatically react karta hai. New document uploaded → automatically analyze karo. New support ticket → automatically categorize karo. Code pushed → automatically review karo. User signed up → personalized onboarding generate karo. Triggers: webhooks (external events), message queues (Redis/Kafka), event bus (internal events). Ye reactive architecture hai — AI background mein kaam karta hai, users interact karte rehte hain."
          whenToUse={[
            'File upload → AI processing: document analysis, image recognition.',
            'New record → AI enrichment: customer signup → persona, lead → score.',
            'Code push → AI review: GitHub webhook → PR review bot.',
            'Schedule-triggered: nightly reports, weekly summaries.',
            'User action → AI reaction: comment posted → sentiment analysis.',
          ]}
          whyUseIt="Polling vs Events — ek important distinction. Polling: 'kuch naya aaya?' har 30 seconds check karo — wasted resources, added latency, nahi scale. Event-driven: kuch hota hai toh push notification — instant reaction, zero wasted polls, naturally scales. GitHub, Stripe, Slack — sab webhooks pe rely karte hain. AI ke liye event-driven matlab: AI reactive hai, proactive nahi — sahi architecture."
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
            explanation: 'GitHub webhook handler: signature verify karo (timingSafeEqual — timing attacks prevent karne ke liye), payload parse karo, queue mein job daalo — immediate 200 OK return karo. Event bus: internal events ke liye — signup, upload, action. AIEventBus.on() se handlers register karo, emit() se fire karo. Security critical: webhook bina signature verification ke koi bhi fake kar sakta hai.',
          }}
          realWorldScenario="GitHub PR review bot: code push webhook → BullMQ queue → Claude code review → GitHub comment automatically. Team ne manual review time 50% reduce kiya — AI obvious issues pakdta hai, humans architecture aur business logic pe focus karte hain. Setup: 1 din ka kaam. Impact: har PR pe permanently. Event-driven architecture ka beauty: ek baar set karo, forever run karo."
          commonMistakes={[
            {
              mistake: 'Webhook signature verify nahi karna',
              why: 'Bina verification ke koi bhi fake webhook bhej sakta hai — malicious requests process ho jaate hain.',
              fix: 'Hamesha X-Hub-Signature-256 ya equivalent verify karo. timingSafeEqual use karo (not ===) — timing attacks prevent karo. Reject invalid signatures 401 se.',
            },
          ]}
          proTip="Webhook delivery unreliable hai — tumhara server down tha toh event miss ho jaata hai. Ye production mein real problem hai. Svix ya Hookdeck use karo — managed webhook delivery: automatic retries, delivery logs, dashboard. Webhook infrastructure manage karna complicated hai. Managed service use karo, apna kaam karo — ye sahi tradeoff hai."
        />
      </div>

      {/* Card 3: AI Caching Patterns */}
      <div id="caching-patterns">
        <ConceptCard
          title="AI Caching Patterns — Semantic Cache"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Regular response cache: exact string match chahiye — ek character alag toh miss. Semantic cache: similar meaning queries → same cached result. 'Node.js kya hai?' aur 'NodeJS explain karo' dono same cache hit kar sakte hain — meaning similar hai. Implementation: query embed karo, existing cache entries se cosine similarity compare karo, threshold pe hit. GPTCache library ya Redis + embeddings se implement karo."
          whenToUse={[
            'FAQ systems: same questions repeatedly asked.',
            'Documentation Q&A: same concepts different phrasings.',
            'Customer support: similar queries, standard answers.',
            'High-traffic endpoints: cost + latency reduce karo.',
            'Consistent answers: policy questions exact same response chahiye.',
          ]}
          whyUseIt="Numbers dekho: 10K queries/day, 70% similar — without cache $900/month. With 70% semantic cache hit: $270/month. 70% savings. Lekin asli bonus: cache hit latency 10ms vs LLM call 1-3 seconds. UX aur cost dono simultaneously improve. FAQ-type applications mein semantic cache ROI clearly positive hoti hai — implement karo."
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
            explanation: 'semanticCachedQuery flow: embed karo → cacheStore scan karo → cosineSim > SIMILARITY_THRESHOLD? Cache hit. Nahi? LLM call karo, result cache karo, stale entries evict karo. SIMILARITY_THRESHOLD 0.92 — tune karo apne domain ke hisaab se. In-memory demo hai — production mein Redis + RediSearch (vector similarity support hai), ya Qdrant as cache, ya GPTCache Python library (most mature). False positives log karo aur threshold adjust karo.',
          }}
          realWorldScenario="EdTech AI tutor: 60% queries similar variations thi — 'kaise karo', 'explain karo', 'batao' — same topic, alag phrasing. Redis + embeddings se semantic cache implement kiya. 58% cache hit rate mila. API cost: $800/month → $340/month. Response P50: 1.2s → 0.4s (cache overhead sirf 40ms). Cost aur speed dono simultaneously improve — ye architecture win hai."
          commonMistakes={[
            {
              mistake: 'Bahut low similarity threshold set karna (< 0.85)',
              why: 'Low threshold pe unrelated queries cache hit kar lete hain — wrong answers users ko milte hain.',
              fix: 'Start 0.95 se, analyze false positives, cautiously lower karo. Better to miss cache than return wrong answer. Domain-specific: technical queries higher threshold chahiye.',
            },
          ]}
          proTip="Production semantic caching ke liye GPTCache (Python) best mature option hai — OpenAI drop-in replacement, multiple embedding models, Redis/Chroma backends. Node.js se: GPTCache ko separate Python microservice ke roop mein deploy karo, REST API expose karo, Node.js se HTTP call karo. Ek service extra hogi lekin caching logic battle-tested hogi."
        />
      </div>

      {/* Card 4: Multi-model Routing */}
      <div id="multi-model-routing">
        <ConceptCard
          title="Multi-model Routing — Cost + Quality Balance"
          emoji="🚦"
          difficulty="advanced"
          whatIsIt="Multi-model routing: task complexity assess karo, appropriate model select karo. Simple factual question → Haiku (fast, cheap). Complex analysis → Sonnet. Escalation strategy: pehle cheap model try karo, quality threshold nahi mili → expensive model pe escalate. Result: most requests Haiku se handle, kuch Sonnet se — 40-70% cost reduction without significant quality loss."
          whenToUse={[
            'Mixed workloads: simple FAQs + complex analysis mix.',
            'Cost-sensitive production: hundreds of thousands of queries/month.',
            'Latency priority: simple tasks fast response chahiye.',
            'Quality-critical tasks: important decisions expensive model pe.',
          ]}
          whyUseIt="Price gap dekho: Haiku $0.25/1M tokens, Sonnet $3/1M, Opus $15/1M — 60x difference. Agar 80% queries Haiku se handle ho sakte hain: $1000/month → $280/month. Quality-based escalation: automatic — model decide karta hai upgrade karna hai ya nahi. Cost optimize ho without manual intervention. Ye ki architecture pattern automatically intelligent cost management karta hai."
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
            explanation: 'analyzeTask function: word count + keyword indicators se complexity classify karo. Model select karo. Haiku try karo, assessQuality run karo (heuristic-based). Threshold nahi mili? Sonnet pe escalate. routingMetrics: escalation rate track karo. High escalation rate (>20%) = classifier fix karo. Production mein: LLM-as-judge quality assessment zyada accurate hai heuristics se — Haiku se answer generate karo, phir Haiku se quality rate karo.',
          }}
          realWorldScenario="Customer support AI: 75% simple queries (order status, FAQs) → Haiku direct. 20% moderate (troubleshooting) → Haiku with escalation path. 5% complex (disputes, technical issues) → Sonnet. Overall escalation rate: 8%. Monthly cost: $4,200 → $1,100. Customer satisfaction score: unchanged. 74% cost reduction, zero quality impact — ye routing ka ROI hai."
          commonMistakes={[
            {
              mistake: 'Routing classify karna bina validation ke — wrong classification',
              why: 'Simple keyword matching often fails — "analyze ke baare mein explain karo" complex nahi hai lekin keyword match hai.',
              fix: 'Routing classifier ko validate karo ground truth se. LLM-as-classifier use karo: "Is this query simple/moderate/complex?" — meta-call karo. Track escalation rate — too high? Classifier fix karo.',
            },
          ]}
          proTip="RouteLLM open-source library manually rules likhne se better trained classifier provide karta hai — production-grade routing. Paper: 'RouteLLM: Learning to Route LLMs with Preference Data'. Result: Haiku-level quality at 40% of Sonnet cost on their benchmarks. Python library hai — Node.js se API karo ya Python service deploy karo. Manual heuristics se start karo, RouteLLM pe upgrade karo jab scale karo."
        />
      </div>

      {/* Card 5: AI in Microservices */}
      <div id="ai-microservices">
        <ConceptCard
          title="AI in Microservices — Dedicated AI Service"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Dedicated AI service pattern: AI functionality ek separate microservice mein isolate karo — baki services is AI service ko HTTP call kare. Benefits: independent scaling (AI heavy compute chahta hai), centralized model management (model change karo bina app redeploy ke), shared rate limiting + caching across all consumers, AI-specific monitoring, team boundary clarity. Ye pattern jab multiple services AI chahti hain tab especially valuable hai."
          whenToUse={[
            'Multiple services AI chahti hain — centralize karo.',
            'AI resource requirements different hain — GPU/memory alag scale karo.',
            'Team separation — AI team vs product team independent deploy.',
            'Shared caching — multiple services same AI calls se benefit karein.',
            'Compliance — AI calls audit centrally karo.',
          ]}
          whyUseIt="Monolith mein AI imagine karo: har team apna API key manage karta hai, har service apna retry logic likhta hai, caching duplicate hoti hai — ye mess hai. Dedicated AI service: ek jagah API keys, ek rate limiting, shared cache (cross-service cache hits!), centralized monitoring, ek jagah compliance. Governance clear: AI team AI service manage kare, product teams consume karein."
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
            explanation: 'AI service port 3001 pe: rate limiting per client (keyGenerator: x-client-id header), Redis semantic cache (hash-based), sync endpoint fast tasks ke liye, async endpoint long tasks ke liye. AIRequest interface: type, model (fast/balanced/powerful), options. Consumers sirf HTTP call karte hain — AI internals, model names, caching sab hidden. Model upgrade karo? Sirf AI service redeploy.',
          }}
          realWorldScenario="E-commerce platform: 5 services AI chahti thi — product descriptions, customer support, review analysis, search ranking, recommendations. 5 alag API key setups ke bajaye: 1 dedicated AI service. Results: shared cache hit rate 55% (different services same queries karte hain), centralized cost tracking, ek model upgrade se sab services benefit. Dev velocity improved — AI features add karna fast hua. Architecture investment: 1 sprint. Benefit: ongoing."
          commonMistakes={[
            {
              mistake: 'AI service mein synchronous calls sirf use karna',
              why: 'Long-running AI tasks calling service timeout kar sakti hai. Service mesh mein cascading failures.',
              fix: 'Sync endpoint: <2 second tasks ke liye. Async endpoint + webhook: long tasks ke liye. Service calling AI service ko job ID return karke webhook pe result receive karna chahiye.',
            },
          ]}
          proTip="Khud AI service banana nahi chahte? LiteLLM use karo — open-source AI gateway, 100+ providers uniform OpenAI API se. Self-host karo, Docker pe chalao. Portkey.ai aur Helicone managed options hain — provider routing, rate limiting, caching, observability sab built-in. Ye tools AI service ka kaam karte hain bina code likhe. Evaluate karo apni requirements ke saath."
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
