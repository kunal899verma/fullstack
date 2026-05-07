'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'LLM observability mein kya track karna zaroori hai?',
    options: [
      {
        text: 'Sirf error rates — baaki sab optional hai',
        correct: false,
        explanation: 'Error rate important hai lekin sirf ye kaafi nahi — latency, token usage, costs, aur response quality bhi monitor karne chahiye.',
      },
      {
        text: 'Prompts, responses, latency, token usage, costs, error rates — complete trace jo debugging aur optimization enable kare',
        correct: true,
        explanation: 'Bilkul sahi! Complete observability: (1) inputs (prompts, model params), (2) outputs (responses, finish reasons), (3) performance (latency, TTFB), (4) costs (token counts, estimated $), (5) errors (types, frequency). LangSmith, Helicone, Braintrust sab ye provide karte hain.',
      },
      {
        text: 'Token count sirf billing ke liye hai — performance monitoring alag hai',
        correct: false,
        explanation: 'Token count performance metric bhi hai — long prompts higher latency cause karte hain. Cost + performance dono ke liye important hai.',
      },
      {
        text: 'Observability sirf enterprise plans mein available hai',
        correct: false,
        explanation: 'LangSmith free tier hai, Helicone free tier hai, Braintrust free tier hai. Small projects bhi observability setup kar sakte hain bina cost ke.',
      },
    ],
  },
  {
    question: 'Prompt caching se kaise cost optimize hoti hai?',
    options: [
      {
        text: 'Response ko cache karta hai — same query same answer',
        correct: false,
        explanation: 'Response caching alag concept hai (semantic caching). Prompt caching specifically input tokens ke liye hai — prefix reuse karta hai.',
      },
      {
        text: 'Repeated long system prompts ya context (documents, examples) ke tokens ko server-side cache karta hai — subsequent requests mein 90% cost + latency reduction',
        correct: true,
        explanation: 'Exactly! Anthropic prompt caching: static system prompt (1000+ tokens) first call pe cache hota hai. Subsequent calls mein wo tokens process nahi hote — 90% input token cost save. RAG context (retrieved docs) bhi cache ho sakta hai same session mein.',
      },
      {
        text: 'Prompt caching sirf same exact prompt pe kaam karta hai — thoda bhi change = no cache',
        correct: false,
        explanation: 'Haan, exact prefix match chahiye — lekin system prompt usually static hota hai. Cache_control: ephemeral 5 minutes, sustained 1 hour TTL. Dynamic parts prompt ke end mein rakho.',
      },
      {
        text: 'Prompt caching sirf Anthropic API mein available hai',
        correct: false,
        explanation: 'OpenAI bhi automatic prompt caching karta hai long repeated prefixes pe (2048+ tokens). Anthropic explicit cache_control syntax use karta hai.',
      },
    ],
  },
  {
    question: 'Rate limiting handle karne ke liye best practice kya hai?',
    options: [
      {
        text: 'Retry immediately — fast retries success chance badhaati hain',
        correct: false,
        explanation: 'Immediate retries rate limit aur badhate hain — thundering herd problem. Ye exactly galat approach hai.',
      },
      {
        text: 'Exponential backoff with jitter — first retry: 1s, second: 2s, third: 4s + random delay. Queue-based processing for high volume.',
        correct: true,
        explanation: 'Bilkul sahi! Exponential backoff: 429 aaye → wait 1s → retry → 429 aaye → wait 2s → retry → 2s → wait 4s. Jitter (random 0-1s) add karo thundering herd prevent karne ke liye. High volume ke liye: BullMQ queue mein jobs daalo, workers rate-limited processing karte hain.',
      },
      {
        text: 'Multiple API keys use karo — rate limits per key hote hain',
        correct: false,
        explanation: 'Multiple keys ToS violation ho sakta hai aur temporary fix hai. Proper backoff + queue architecture sustainable solution hai.',
      },
      {
        text: 'Rate limits hit nahi hote agar production grade API key ho',
        correct: false,
        explanation: 'Sab tier pe rate limits hote hain — tokens per minute, requests per minute. High usage pe limits hit hona normal hai. Graceful handling zaroori hai.',
      },
    ],
  },
  {
    question: 'Model routing (cheap → expensive) strategy kab use karni chahiye?',
    options: [
      {
        text: 'Hamesha most expensive model use karo — quality maximize karo',
        correct: false,
        explanation: 'Expensive model har task ke liye necessary nahi — simple classification task pe GPT-4o overkill + expensive hai.',
      },
      {
        text: 'Simple/routine tasks pe cheap fast model (Haiku), complex reasoning pe expensive model (Sonnet/Opus). Route based on task complexity score.',
        correct: true,
        explanation: 'Exactly! Routing strategy: task analyze karo → complexity score do → cheap model try karo → quality threshold meet? Done. Nahi? Expensive model escalate karo. Result: same quality at 40-70% lower cost. Classification, simple Q&A → Haiku. Complex analysis → Sonnet. Deep reasoning → Opus.',
      },
      {
        text: 'Model routing sirf batch processing mein kaam karta hai',
        correct: false,
        explanation: 'Model routing real-time requests pe bhi kaam karta hai — task type ya complexity se route karo. Batch bhi ho sakta hai, lekin sirf batch nahi.',
      },
      {
        text: 'Routing complexity add karta hai — simple hai sirf ek model use karo',
        correct: false,
        explanation: 'Routing initial complexity add karta hai lekin long-term cost savings significant hain — $1000/month se $400/month possible hai. Investment worth it hai.',
      },
    ],
  },
  {
    question: 'LLM fallback strategy implement karte waqt kya consider karna chahiye?',
    options: [
      {
        text: 'Fallback sirf network errors ke liye hai — model errors pe retry karo',
        correct: false,
        explanation: 'Fallback model errors, rate limits, API outages, content policy violations — multiple failure modes ke liye chahiye.',
      },
      {
        text: 'Primary provider fail hone pe: retry with backoff → fallback to secondary provider → degraded mode (cached/simplified response) → graceful error. Each step logged.',
        correct: true,
        explanation: 'Bilkul sahi! Defense in depth: (1) retry with exponential backoff, (2) alternative model same provider, (3) different provider (Claude → GPT-4), (4) cached similar response, (5) simplified/static response, (6) meaningful error to user. Sab steps logged + alerted.',
      },
      {
        text: 'Fallback always returns same cached response — dynamic responses skip karo',
        correct: false,
        explanation: 'Cached responses fallback mein use ho sakte hain lekin "always cached" poor UX hai. Dynamic fallback (simpler model) better than static cache for most cases.',
      },
      {
        text: 'Fallback setup karna time waste hai — APIs rarely down hote hain',
        correct: false,
        explanation: 'APIs down hote hain — Anthropic, OpenAI dono ke incidents hain. Status pages check karo — monthly incidents normal hain. Production mein fallback essential hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter18Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          AI in Production — Monitor, Optimize, Scale 🚀
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Development mein AI app perfect kaam karta hai. Production mein — hallucinations, high latency, cost overruns, rate limit errors, aur API outages. Ye sab production ke surprises hain. Aaj inhe systematically solve karte hain: observability, cost optimization, latency, rate limits, aur fallback strategies — ek ek real production problem, ek ek solid solution.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <p className="text-[#FDE68A] text-sm italic">
            &quot;Production mein AI ka asli imtihaan hota hai — monitoring ke bina aap blind drive kar rahe ho, aur road pe accidents ho rahe hain.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: LLM Observability */}
      <div id="observability">
        <ConceptCard
          title="LLM Observability — Kya Ho Raha Hai?"
          emoji="🔭"
          difficulty="advanced"
          whatIsIt="LLM observability ka matlab simple hai — har LLM call ka pura trace capture karo. Inputs (prompts, parameters), outputs (responses, finish reason), performance (latency, TTFB), costs (token counts, estimated $), errors (types, frequency). Bina ye jaane: kuch bhi gadbad ho toh pata nahi chalega kyun. Tools: LangSmith (LangChain users ke liye), Helicone (kisi bhi API ke liye, zero code change), Braintrust (evaluation + tracing). Custom logging bhi possible hai — code mein dikhate hain."
          whenToUse={[
            'Production deploy karne se pehle — baseline establish karo.',
            'Cost spike investigate karne ke liye — which prompts expensive hain?',
            'Latency issues debug karne ke liye — kahan time lag raha hai?',
            'Quality regression detect karne ke liye — responses worse ho gaye?',
            'A/B testing different prompts ya models.',
          ]}
          whyUseIt="Real scenario: production mein ek raat API cost suddenly $500 badh gayi. Observability ke bina — 3 din debug karo, kuch pata nahi. Observability ke saath — 15 minute mein exact endpoint aur exact user pattern identify. Cost issue tha: ek endpoint pe users bahut long prompts bhej rahe the. Ek fix: 5 minute. Ye hai observability ka real value — data se problems diagnose karo, assumptions se nahi."
          howToUse={{
            filename: 'llm-observability.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── Custom Observability Logger ──────────────────────────────────
interface LLMTrace {
  traceId: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  estimatedCostUSD: number;
  finishReason: string;
  error?: string;
  metadata: Record<string, string>;
}

function estimateCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing: Record<string, { input: number; output: number }> = {
    'claude-sonnet-4-6': { input: 3, output: 15 },
    'claude-haiku-4-5': { input: 0.25, output: 1.25 },
    'claude-opus-4-5': { input: 15, output: 75 },
  };
  const p = pricing[model] ?? { input: 3, output: 15 };
  return (inputTokens * p.input + outputTokens * p.output) / 1_000_000;
}

async function trackedCall(
  messages: Anthropic.MessageParam[],
  model = 'claude-sonnet-4-6',
  metadata: Record<string, string> = {}
): Promise<{ text: string; trace: LLMTrace }> {
  const traceId = crypto.randomUUID();
  const startTime = Date.now();

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 2048,
      messages,
    });

    const latencyMs = Date.now() - startTime;
    const trace: LLMTrace = {
      traceId,
      model,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      latencyMs,
      estimatedCostUSD: estimateCost(model, response.usage.input_tokens, response.usage.output_tokens),
      finishReason: response.stop_reason ?? 'unknown',
      metadata,
    };

    // Send to your observability platform
    await sendTrace(trace);

    const block = response.content[0];
    return { text: block.type === 'text' ? block.text : '', trace };

  } catch (error) {
    const trace: LLMTrace = {
      traceId, model, inputTokens: 0, outputTokens: 0,
      latencyMs: Date.now() - startTime,
      estimatedCostUSD: 0,
      finishReason: 'error',
      error: error instanceof Error ? error.message : 'Unknown',
      metadata,
    };
    await sendTrace(trace);
    throw error;
  }
}

async function sendTrace(trace: LLMTrace): Promise<void> {
  // Option 1: Send to your logging service
  console.log('[LLM_TRACE]', JSON.stringify(trace));

  // Option 2: Helicone (header-based, no code change needed)
  // Just add baseURL: 'https://oai.helicone.ai/v1' + Helicone-Auth header

  // Option 3: LangSmith (for LangChain users)
  // LANGCHAIN_TRACING_V2=true in env

  // Option 4: DataDog, CloudWatch, etc.
  // await datadogClient.sendMetrics([...]);
}`,
            explanation: 'trackedCall function mein dekho kya track ho raha hai: traceId se har call unique identify hoti hai, latency milliseconds mein, token counts, estimated cost USD mein, finish reason (stop, length, content_filter). sendTrace function apni platform ko data bhejta hai. Helicone: sirf baseURL change karo — automatic tracing, zero extra code. Production alert setup: cost > $X/hour aur latency P99 > Y ms pe alert lagao.',
          }}
          realWorldScenario="SaaS company ko ek month $2000 unexpected API bill aaya. LLM observability dashboard khola — 15 minute mein find kiya: ek endpoint pe kuch users bahut long prompts bhej rahe the, context manipulation attempt tha. Fix: prompt length validation + truncation add kiya. Next month bill: $400. 80% cost reduction — sirf ek issue fix karne se. Observability ne wo issue visible banaya jo otherwise invisible tha."
          commonMistakes={[
            {
              mistake: 'Prompts log nahi karna — privacy concern se',
              why: 'Bina prompt logging ke debugging impossible hai. Koi issue identify nahi kar sakte.',
              fix: 'PII redaction karo pehle, phir log karo. Name, email, phone numbers remove karo logs se. Full prompt log karo internal systems mein (encrypted, restricted access). Compliance requirements follow karo.',
            },
          ]}
          proTip="Sabse fast observability setup: Helicone. baseURL ko unke proxy se replace karo, Helicone-Auth header add karo — bas. Automatic: costs, latency, tokens, requests per user, error rates — sab track. Free tier: 100K requests/month. Zero additional code. Shuru karne ke liye ye fastest path hai — literally 2 line change."
        />
      </div>

      {/* Card 2: Cost Optimization */}
      <div id="cost-optimization">
        <ConceptCard
          title="Cost Optimization — Smart Spending"
          emoji="💰"
          difficulty="advanced"
          whatIsIt="LLM costs bina soche-samjhe use karo toh $1K/month easily ho jaata hai — aur 10K users pe scale karo toh $10K. Lekin har rupya zaruri nahi jaata. Paanch powerful levers hain: (1) Prompt caching — static system prompts server-side cache hote hain, 90% token cost save. (2) Model routing — simple tasks pe cheap model, complex pe expensive. (3) Response caching — same queries pe LLM call hi nahi. (4) Batching — multiple items ek call mein. (5) Prompt optimization — shorter prompts, same quality."
          whenToUse={[
            'Prompt caching: long static system prompts ya repeated context (RAG docs).',
            'Batching: classification, labeling tasks — 100 items ek batch mein.',
            'Model routing: simple tasks → Haiku, complex → Sonnet, deep reasoning → Opus.',
            'Response caching: FAQs, common queries — same answers cache karo.',
            'Token reduction: remove unnecessary context, concise prompts.',
          ]}
          whyUseIt="Numbers se baat karte hain: 10K users/day, 500 tokens/request, $3/1M tokens = $450/month. Optimizations combine karo: prompt caching 50% reduce karta hai, model routing 30%, response caching 20% — combined effect: $450 → ~$100/month. 78% savings. Ek baar implement karo, har month automatically bachta hai. Cost engineering AI product ki profitability decide karti hai."
          howToUse={{
            filename: 'cost-optimization.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── 1. Prompt Caching ────────────────────────────────────────────
const SYSTEM_PROMPT = \`You are NodeMaster AI tutor...
[Very long system prompt - 2000+ tokens describing curriculum,
teaching style, Hinglish guidelines, etc.]
Actual content goes here...\`;

async function cachedCall(userMessage: string) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' }, // cache this for 5 minutes
      },
    ],
    messages: [{ role: 'user', content: userMessage }],
  });

  // First call: full cost. Subsequent calls: 90% cheaper for system prompt tokens!
  console.log('Cache read:', response.usage.cache_read_input_tokens);
  console.log('Cache write:', response.usage.cache_creation_input_tokens);
  return response;
}

// ─── 2. Model Routing ─────────────────────────────────────────────
type TaskType = 'simple' | 'moderate' | 'complex';

function classifyTask(userMessage: string): TaskType {
  const complexKeywords = ['analyze', 'compare', 'debug', 'architecture', 'design'];
  const simpleKeywords = ['what is', 'define', 'explain briefly', 'yes or no'];

  const lower = userMessage.toLowerCase();
  if (complexKeywords.some(k => lower.includes(k))) return 'complex';
  if (simpleKeywords.some(k => lower.includes(k))) return 'simple';
  if (userMessage.length < 50) return 'simple';
  return 'moderate';
}

function selectModel(taskType: TaskType): string {
  switch (taskType) {
    case 'simple': return 'claude-haiku-4-5';       // $0.25/1M input
    case 'moderate': return 'claude-sonnet-4-6';     // $3/1M input
    case 'complex': return 'claude-sonnet-4-6';      // best quality
  }
}

// ─── 3. Response Caching ──────────────────────────────────────────
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_TTL = 3600_000; // 1 hour

async function cachedResponse(prompt: string, model: string): Promise<string> {
  const cacheKey = \`\${model}:\${prompt}\`;
  const cached = responseCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Cache hit! Saved API call.');
    return cached.response;
  }

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const block = response.content[0];
  const text = block.type === 'text' ? block.text : '';
  responseCache.set(cacheKey, { response: text, timestamp: Date.now() });
  return text;
}

// ─── 4. Batch Processing ──────────────────────────────────────────
async function batchClassify(items: string[], batchSize = 20): Promise<string[]> {
  const results: string[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchPrompt = batch.map((item, idx) => \`\${idx + 1}. \${item}\`).join('\\n');

    const response = await client.messages.create({
      model: 'claude-haiku-4-5', // cheap + fast for batch
      max_tokens: 512,
      messages: [{
        role: 'user',
        content: \`Classify each item as positive/negative/neutral. Return comma-separated.\\n\${batchPrompt}\`,
      }],
    });

    const block = response.content[0];
    const classifications = block.type === 'text' ? block.text.split(',') : [];
    results.push(...classifications);
  }
  return results;
}`,
            explanation: 'Prompt caching: cache_control: { type: "ephemeral" } system prompt pe lagao — 5-minute TTL. Response mein cache_read_input_tokens check karo — ye batata hai kitne tokens cache se aaye. Model routing: task type se model choose karo — simpleIndicators aur complexIndicators keyword lists customize karo apne domain ke hisaab se. Response cache: Map in-memory hai — production mein Redis use karo. Batch: many items ek call = far fewer API calls.',
          }}
          realWorldScenario="EdTech platform: 50K students, 100 queries/day = 5M queries/month. Before optimization: $15K/month. Optimization plan: prompt caching for long system prompt (50% save), model routing Haiku for simple FAQs (30% save), response cache repeated questions (15% save). After: $3,750/month. 75% reduction = $135K annual savings. Ye ek engineering sprint tha — 2 weeks ka kaam, lifetime benefit."
          commonMistakes={[
            {
              mistake: 'Prompt caching cached system prompt ke baad dynamic content add karna',
              why: 'Cache prefix match hona chahiye — dynamic content cache ke baad aa sakti hai, lekin cached content mein nahi.',
              fix: 'Cached static content system prompt ke beginning mein rakho. Dynamic parts (user-specific data, current date) end mein rakho. Cache prefix unchanged rehna chahiye.',
            },
          ]}
          proTip="Anthropic Batch API try karo — non-real-time tasks pe 50% cost savings. Classification, data extraction, bulk content generation — results hours baad milte hain, lekin cost half. Real-time chahiye? Skip karo. Nahi chahiye? Batch API no-brainer hai. Raat ko batch run karo, subah results ready. Ek habit banao: har naya AI feature ship karne se pehle cost estimate karo, phir decide karo kahan optimization lagani hai."
        />
      </div>

      {/* Card 3: Latency Optimization */}
      <div id="latency">
        <ConceptCard
          title="Latency Optimization — Fast Responses"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="LLM latency do parts mein hai: Time to First Token (TTFB) aur generation time. Users 200ms tolerate karte hain, 2 seconds pe frustration start hoti hai. Key insight: streaming se perceived latency dramatically improve hoti hai — same backend speed, user 10x better experience. Optimization strategies: streaming (TTFB minimize karo), parallel calls (independent calls simultaneously), prompt caching (faster start), smaller models jab possible."
          whenToUse={[
            'Streaming: sab user-facing chat applications mein — hamesha.',
            'Parallel calls: independent data pieces simultaneously analyze karo.',
            'Prompt caching: long repeated contexts — TTFB improve hoti hai.',
            'Model downgrades: latency critical hai, quality tradeoff acceptable.',
            'Edge runtime: globally distributed users ke liye.',
          ]}
          whyUseIt="P99 users — wo log jo slowest experience lete hain — churn karte hain. Streaming ka magic: user first token 200ms mein dekhe, pura response 3 seconds baad aaye — perceived as fast. Non-streaming same backend: 3 second blank screen — perceived as slow aur broken. Same model, same speed, but streaming = dramatically better UX. Ye psychological fact hai, engineering se zyada important hai."
          howToUse={{
            filename: 'latency-optimization.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── 1. Streaming — First Token Fast ─────────────────────────────
async function streamingResponse(prompt: string, onChunk: (text: string) => void) {
  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  // Process chunks as they arrive
  stream.on('text', (text) => {
    onChunk(text); // Update UI immediately
  });

  const finalMessage = await stream.finalMessage();
  return finalMessage;
}

// ─── 2. Parallel Calls — Don't Wait Unnecessarily ────────────────
async function analyzeCodeParallel(code: string) {
  // These are independent — run simultaneously!
  const [bugs, improvements, security] = await Promise.all([
    client.messages.create({
      model: 'claude-haiku-4-5', // fast for parallel tasks
      max_tokens: 512,
      messages: [{ role: 'user', content: \`Find bugs in: \${code}\` }],
    }),
    client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      messages: [{ role: 'user', content: \`Suggest improvements for: \${code}\` }],
    }),
    client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      messages: [{ role: 'user', content: \`Check security issues in: \${code}\` }],
    }),
  ]);

  // Sequential: 3 calls * 800ms = 2400ms
  // Parallel: max(800ms, 800ms, 800ms) = 800ms — 3x faster!

  return {
    bugs: bugs.content[0].type === 'text' ? bugs.content[0].text : '',
    improvements: improvements.content[0].type === 'text' ? improvements.content[0].text : '',
    security: security.content[0].type === 'text' ? security.content[0].text : '',
  };
}

// ─── 3. Timeout + Fallback ────────────────────────────────────────
async function callWithTimeout(
  prompt: string,
  timeoutMs = 5000
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }, { signal: controller.signal });

    clearTimeout(timeoutId);
    const block = response.content[0];
    return block.type === 'text' ? block.text : '';
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      // Fallback to faster, smaller model
      const fast = await client.messages.create({
        model: 'claude-haiku-4-5', // 3x faster
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }],
      });
      const block = fast.content[0];
      return block.type === 'text' ? block.text : '';
    }
    throw error;
  }
}`,
            explanation: '.stream() method + on("text") callback — har token milte hi onChunk function call hoti hai, UI update karo wahan. Parallel calls: Promise.all se independent calls simultaneously — 3x+ latency improvement bina quality compromise ke. Timeout + fallback: AbortController se timeout set karo, timeout pe faster model pe fallback karo. Ye production-grade pattern hai — Sonnet prefer karo, timeout pe Haiku fallback.',
          }}
          realWorldScenario="Code review tool: pehle sequential calls — bugs, phir improvements, phir security = 2.4 seconds. Parallel calls: 800ms. Streaming add kiya — user pehla result 150ms mein dekh raha hai. Perceived latency: 2400ms se 150ms. Same models, same quality, 16x better experience. User satisfaction score +40%. Teen changes, ek din ka kaam — aur product completely alag feel karta hai."
          commonMistakes={[
            {
              mistake: 'Streaming frontend mein implement nahi karna',
              why: 'Backend streaming response bhejta hai lekin frontend buffer karta hai — user experience same rahta hai non-streaming se.',
              fix: 'Frontend mein streaming consume karo: React Server Components streaming, useChat hook, EventSource, ya ReadableStream manual parsing. vercel/ai SDK ye automatically handle karta hai.',
            },
          ]}
          proTip="Ek common misconception: zyada max_tokens speed improve karta hai. Nahi karta. max_tokens ceiling hai, target nahi — model done hone pe stop karta hai. Lekin unnecessarily high max_tokens model ko aur generate karne ka signal deta hai. Agar tumhara response typically 200 tokens hai, max_tokens: 400-500 set karo, 4096 nahi. Measured, not assumed."
        />
      </div>

      {/* Card 4: Rate Limits & Retries */}
      <div id="rate-limits">
        <ConceptCard
          title="Rate Limits & Retries — Graceful Handling"
          emoji="🔄"
          difficulty="advanced"
          whatIsIt="Koi bhi LLM API use karo — rate limits inevitable hain. Requests Per Minute (RPM), Tokens Per Minute (TPM) — dono pe limits. 429 Too Many Requests — ye production mein zarur aayega. Question ye nahi ki aayega ya nahi, question ye hai ki handle kaise karoge. Exponential backoff with jitter, queue-based processing, token budget manager — ye sab production-grade handling hai. Unhandled 429 = user crash. Handled = seamless retry."
          whenToUse={[
            'Any production LLM integration — rate limits inevitable hain.',
            'High-volume batch processing — queue se control karo throughput.',
            'Multiple users simultaneously — per-user rate limiting.',
            'Burst traffic — queue absorb kare spikes.',
            'Cost control — rate limits doubles as spend control.',
          ]}
          whyUseIt="Unhandled rate limit: 429 → crash → user error page → support ticket → churn. Handled: 429 → wait → retry → success → user kuch notice bhi nahi karta. Same technical event, completely different user experience. BullMQ jaise queue systems AI tasks ke liye exactly ye karte hain — automatic retry, concurrency control, dead letter queue for persistent failures."
          howToUse={{
            filename: 'rate-limit-handling.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── Exponential Backoff with Jitter ─────────────────────────────
async function callWithRetry(
  messages: Anthropic.MessageParam[],
  maxRetries = 5
): Promise<Anthropic.Message> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages,
      });
    } catch (error) {
      lastError = error as Error;
      const status = (error as { status?: number }).status;

      // Don't retry client errors (4xx except 429)
      if (status && status >= 400 && status !== 429 && status !== 503) {
        throw error;
      }

      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s, 8s + random jitter
        const baseDelay = Math.pow(2, attempt) * 1000;
        const jitter = Math.random() * 1000;
        const delay = baseDelay + jitter;
        console.log(\`Rate limited. Retry \${attempt + 1}/\${maxRetries} in \${Math.round(delay)}ms\`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  throw lastError!;
}

// ─── Token Budget Manager ─────────────────────────────────────────
class TokenBudgetManager {
  private usedTokens = 0;
  private windowStart = Date.now();
  private readonly TPM_LIMIT: number;

  constructor(tpmLimit = 100_000) {
    this.TPM_LIMIT = tpmLimit;
  }

  async checkAndWait(estimatedTokens: number): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.windowStart;

    if (elapsed >= 60_000) {
      // New minute window
      this.usedTokens = 0;
      this.windowStart = now;
    }

    if (this.usedTokens + estimatedTokens > this.TPM_LIMIT) {
      const waitMs = 60_000 - elapsed;
      console.log(\`Token budget exceeded. Waiting \${waitMs}ms for new window.\`);
      await new Promise(r => setTimeout(r, waitMs + 100));
      this.usedTokens = 0;
      this.windowStart = Date.now();
    }

    this.usedTokens += estimatedTokens;
  }
}

// ─── BullMQ Queue (for high volume) ──────────────────────────────
// npm install bullmq ioredis
// const { Queue, Worker } = require('bullmq');
// const aiQueue = new Queue('ai-jobs', { connection: redisConfig });
//
// async function queueJob(prompt: string) {
//   await aiQueue.add('llm-call', { prompt }, {
//     attempts: 3,
//     backoff: { type: 'exponential', delay: 2000 },
//   });
// }
//
// const worker = new Worker('ai-jobs', async (job) => {
//   return callWithRetry([{ role: 'user', content: job.data.prompt }]);
// }, { connection: redisConfig, concurrency: 5 }); // 5 parallel workers`,
            explanation: 'Exponential backoff: attempt 0 = 1s + jitter, 1 = 2s + jitter, 2 = 4s... Jitter (random 0-1s) critical hai — bina jitter ke sab clients same time pe retry karte hain, thundering herd. 4xx errors (except 429, 503) retry mat karo — client error hai, retry se kuch nahi hoga. TokenBudgetManager: proactive limit management — limits approach hone se pehle slow down karo. BullMQ production-grade queue hai high volume ke liye.',
          }}
          realWorldScenario="Data pipeline: 10K documents process karne the ek raat mein. Naive implementation: sab ek saath bhejo → rate limit → fail → manual re-run. Waste. BullMQ queue ke saath: 10 concurrent workers, exponential backoff, 3 retry attempts. Result: 10K documents 45 minutes mein done, zero failures, rate limits ke andar. Ek baar sahi architecture karo — phir worry khatam."
          commonMistakes={[
            {
              mistake: 'Retry-After header ignore karna',
              why: 'API response mein Retry-After header exact wait time deta hai. Ignore karna aur fixed delay use karna suboptimal hai.',
              fix: "const retryAfter = error.headers?.['retry-after']; if (retryAfter) await sleep(parseInt(retryAfter) * 1000). API ki hint use karo apni guess se better hai.",
            },
          ]}
          proTip="API response headers mein X-RateLimit-* headers check karo — remaining requests, remaining tokens, reset time. Ye headers use karo proactive throttling ke liye — limit approach hone se pehle slow down karo, hit hone ke baad nahi. Proactive throttling reactive retry se far better hai. Retry-After header: API ye exactly batata hai kitna wait karo — apni guess se better hai."
        />
      </div>

      {/* Card 5: Fallback Strategies */}
      <div id="fallbacks">
        <ConceptCard
          title="Fallback Strategies — Reliability Engineering"
          emoji="🛡️"
          difficulty="advanced"
          whatIsIt="Production AI fail hoti hai — ye fact hai, question ye hai ki kab. API outages, rate limits, model degradation, network timeouts — sab real hain. Fallback strategies ka goal simple hai: user ko pata nahi chalna chahiye ki primary system fail hua. Defense in depth: retry → alternate model → alternate provider → cached response → graceful degraded response → meaningful error. Har layer fail hone ka ek fallback."
          whenToUse={[
            'Business-critical features — chat support, real-time analysis.',
            'High traffic periods — Black Friday, product launches.',
            'New model deployments — canary releases with fallback.',
            'Cost management — expensive primary → cheap fallback.',
            'SLA requirements — 99.9% uptime guarantee.',
          ]}
          whyUseIt="Anthropic SLA: 99.9% uptime = 8.7 hours downtime/year. 1000 users * 10 queries/hour = 8,700 failed requests in that downtime. With fallback: sab automatically OpenAI redirect. Users kuch notice nahi karte. Without fallback: 8,700 errors, support tickets, negative reviews, churn. Fallback banane ka investment: 1 day engineering. Value: 8,700 preserved user sessions. Math clear hai."
          howToUse={{
            filename: 'fallback-strategies.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

const claude = new Anthropic();
const openai = new OpenAI();

// ─── Multi-provider Fallback ──────────────────────────────────────
async function resilientCall(prompt: string): Promise<string> {
  const providers = [
    async () => {
      const res = await claude.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
      const block = res.content[0];
      return block.type === 'text' ? block.text : '';
    },
    async () => {
      const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
      });
      return res.choices[0].message.content ?? '';
    },
  ];

  for (const provider of providers) {
    try {
      return await Promise.race([
        provider(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 10_000)
        ),
      ]);
    } catch (err) {
      console.warn('Provider failed, trying next:', (err as Error).message);
    }
  }
  throw new Error('All providers failed');
}

// ─── Semantic Cache Fallback ──────────────────────────────────────
const responseStore = new Map<string, string>(); // simplified

async function withSemanticFallback(query: string): Promise<string> {
  // Try live API first
  try {
    const response = await resilientCall(query);
    responseStore.set(query, response); // cache successful response
    return response;
  } catch {
    console.warn('Live API failed, checking cache...');
  }

  // Fallback 1: exact cache match
  if (responseStore.has(query)) {
    console.log('Returning cached response');
    return responseStore.get(query)!;
  }

  // Fallback 2: degraded mode
  return getDegradedResponse(query);
}

function getDegradedResponse(query: string): string {
  // Rule-based fallback for common queries
  const lower = query.toLowerCase();
  if (lower.includes('what is') && lower.includes('node')) {
    return 'Node.js ek JavaScript runtime hai jo V8 engine pe built hai. [Cached response — live AI temporarily unavailable]';
  }
  return 'AI tutor temporarily unavailable. Please try again in a few minutes. [Maintenance mode]';
}

// ─── Circuit Breaker Pattern ──────────────────────────────────────
class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private readonly threshold = 5,
    private readonly timeout = 60_000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit open — service unavailable');
      }
    }

    try {
      const result = await fn();
      this.failures = 0;
      this.state = 'closed';
      return result;
    } catch (err) {
      this.failures++;
      this.lastFailure = Date.now();
      if (this.failures >= this.threshold) {
        this.state = 'open';
        console.error(\`Circuit opened after \${this.failures} failures\`);
      }
      throw err;
    }
  }
}`,
            explanation: 'Multi-provider: providers array mein order se try karo, har ek pe timeout. Promise.race timeout ke saath: provider ya timeout — jo pehle resolve kare. Semantic cache fallback: API fail → exact cache check → degraded static response. Circuit breaker: N failures → open circuit → retry ke sab bandh → T seconds baad half-open → test karo. Circuit breaker cascading failures prevent karta hai — ek failing service poore system ko slow nahi karne deta.',
          }}
          realWorldScenario="AI writing tool: Claude primary, GPT-4o fallback set tha. Ek Friday evening Anthropic incident — 2 hours partial outage. Fallback automatically activate hua. Users GPT-4o pe seamlessly redirect ho gaye. User-visible errors: 0. Support tickets: 0. Developer ne subah dashboard mein incident notice kiya — tab pata chala raat kuch hua tha. Without fallback: 2 hours of failures, angry emails, potential churn. Fallback ki value exactly aise moments mein hai."
          commonMistakes={[
            {
              mistake: 'Fallback response aur primary response undetectable banana',
              why: 'Different models different quality, tone, format mein respond karte hain. Users notice karte hain sudden change.',
              fix: 'User ko transparently batao: "Currently using backup AI service". Quality expectations set karo. Critical workflows ke liye fallback disable karo — error better than wrong answer.',
            },
          ]}
          proTip="status.anthropic.com aur status.openai.com bookmark karo aur subscribe karo. PagerDuty ya similar se integrate karo — incident pe automatic alert aaye. Lekin proactive failover reactive se better hai — AI pe incident report aane se pehle hi health check pe route change ho. Proactive system: monitor → detect degradation → auto-route before users notice."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 18 Quiz — AI in Production
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Production AI samjhe? Prove karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="ai-production" />
      </div>
    </div>
  )
}
