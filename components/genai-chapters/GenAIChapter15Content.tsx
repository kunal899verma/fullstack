'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Vercel AI SDK mein streamText aur generateText mein kya difference hai?',
    options: [
      {
        text: 'Dono same hain — sirf naming convention alag hai',
        correct: false,
        explanation: 'Fundamental difference hai — streaming vs blocking response. Same functionality nahi hai.',
      },
      {
        text: 'streamText real-time token-by-token response deta hai (better UX), generateText poora response wait karta hai (simpler use cases)',
        correct: true,
        explanation: 'Bilkul sahi! streamText: user ko tokens aate hi dikhte hain (ChatGPT-like experience). generateText: poora response aane ka wait karo, phir use karo. Long responses ke liye streamText much better UX deta hai.',
      },
      {
        text: 'generateText faster hai kyunki stream nahi karta',
        correct: false,
        explanation: 'generateText actually slower feel karta hai user ke liye — pura wait karna padta hai. streamText first token jaldi dikhata hai, better perceived performance.',
      },
      {
        text: 'streamText sirf OpenAI ke saath kaam karta hai',
        correct: false,
        explanation: 'Vercel AI SDK provider-agnostic hai — streamText Anthropic, OpenAI, Google, Cohere — sab ke saath kaam karta hai.',
      },
    ],
  },
  {
    question: 'Next.js mein AI route handler mein result.toDataStreamResponse() kyun use karte hain?',
    options: [
      {
        text: 'Response ko JSON format mein convert karta hai',
        correct: false,
        explanation: 'toDataStreamResponse() JSON nahi banata — ye AI SDK specific streaming format banata hai jo useChat hook samajh sake.',
      },
      {
        text: 'AI SDK ka special streaming format banata hai jise useChat/useCompletion hooks automatically handle karte hain — manual stream parsing nahi karni padti',
        correct: true,
        explanation: 'Exactly! toDataStreamResponse() ek special data stream format return karta hai. useChat hook is format ko automatically parse karta hai — tokens, tool calls, metadata sab handle karta hai. Raw text stream return karte toh sab manually parse karna padta.',
      },
      {
        text: 'Response ko compress karta hai faster transfer ke liye',
        correct: false,
        explanation: 'Compression is method ka purpose nahi hai. Ye streaming format standardization ke liye hai.',
      },
      {
        text: 'Edge runtime ke liye required hai',
        correct: false,
        explanation: 'toDataStreamResponse() edge runtime ke liye specific nahi hai — Node.js aur Edge dono pe kaam karta hai.',
      },
    ],
  },
  {
    question: 'useChat hook mein "messages" array kya represent karta hai?',
    options: [
      {
        text: 'Sirf AI ke responses — user messages alag array mein hote hain',
        correct: false,
        explanation: 'messages array mein dono hote hain — user messages aur assistant messages. Full conversation history ek jagah.',
      },
      {
        text: 'Full conversation history — user messages aur assistant responses dono — role: "user" ya "assistant" se identify hote hain',
        correct: true,
        explanation: 'Bilkul sahi! messages array: [{ role: "user", content: "Hello" }, { role: "assistant", content: "Hi!" }, ...]. Ye history automatically route handler ko send hoti hai har request pe taaki LLM conversation context maintain kare.',
      },
      {
        text: 'messages sirf server pe available hota hai, UI mein nahi',
        correct: false,
        explanation: 'Bilkul ulta — messages client-side state hai (useState internally). UI rendering ke liye messages map karo.',
      },
      {
        text: 'messages array hamesha empty hota hai pehle render pe',
        correct: false,
        explanation: 'initialMessages prop se pre-populate kar sakte ho. Agar koi initialMessages nahi diya, toh haan empty hota hai — lekin ye flexible hai.',
      },
    ],
  },
  {
    question: 'AI SDK mein provider setup mein environment variables kyun zaroori hain?',
    options: [
      {
        text: 'Sirf deployment ke liye — development mein hardcode kar sakte hain',
        correct: false,
        explanation: 'API keys kabhi bhi hardcode nahi karne chahiye — development mein bhi .env file use karo. Git history mein sensitive keys expose ho sakte hain.',
      },
      {
        text: 'API keys ko code se separate rakhne ke liye — security, environment-specific config (dev/prod different keys), git mein expose nahi hoti',
        correct: true,
        explanation: 'Exactly! API key code mein = security breach risk. .env.local file git mein nahi jaati (.gitignore). Dev, staging, prod mein alag keys use karo. Vercel deployment mein environment variables dashboard pe set karo — same code, different credentials.',
      },
      {
        text: 'Environment variables Next.js ke liye specific requirement hai, baaki frameworks mein zaruri nahi',
        correct: false,
        explanation: 'Environment variables best practice hai har framework mein — API keys secrets hote hain, code mein hardcode karna kabhi bhi correct nahi hai.',
      },
      {
        text: 'Environment variables sirf server-side accessible hote hain',
        correct: false,
        explanation: 'Next.js mein: NEXT_PUBLIC_ prefix wale variables browser mein bhi accessible hote hain. Bina prefix ke sirf server-side. API keys hamesha without NEXT_PUBLIC_ prefix rakho — browser mein expose mat karo.',
      },
    ],
  },
  {
    question: 'Generative UI (streamUI) regular streaming text se kaise alag hai?',
    options: [
      {
        text: 'streamUI faster hai — isliye prefer karte hain',
        correct: false,
        explanation: 'Speed difference primary distinction nahi hai. Fundamental difference: text vs React components stream karna.',
      },
      {
        text: 'streamUI text ke bajaye React components stream karta hai — AI decide karta hai kaunsa UI component render ho, conditional rendering based on AI output',
        correct: true,
        explanation: 'Bilkul sahi! Regular streaming: text tokens → markdown render. streamUI: AI ek tool call kare toh ek React component render ho, doosra tool call kare toh alag component. "Show me weather" → WeatherCard component render. "Show me chart" → ChartComponent render. Dynamic UI from AI decisions.',
      },
      {
        text: 'streamUI sirf images stream kar sakta hai',
        correct: false,
        explanation: 'streamUI any React component stream kar sakta hai — cards, tables, forms, charts — koi bhi JSX.',
      },
      {
        text: 'streamUI sirf Vercel pe deploy karne pe kaam karta hai',
        correct: false,
        explanation: 'streamUI kisi bhi Node.js/Next.js deployment pe kaam karta hai — Vercel specific nahi hai.',
      },
    ],
  },
]

// ── Diagram ───────────────────────────────────────────────────────────────────

function AiSdkDiagram() {
  const items = [
    { label: 'Your Next.js App (UI)', sublabel: 'React components with chat/completion state', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '🖥️' },
    { label: 'useChat / useCompletion Hooks', sublabel: 'messages, input, handleSubmit — all managed', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🪝' },
    { label: 'streamText / generateText', sublabel: 'Route handler — provider-agnostic AI calls', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', icon: '⚡' },
    { label: 'AI Provider (OpenAI / Anthropic / Gemini)', sublabel: 'Swap with one config line — same SDK code', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '🤖' },
    { label: 'Streaming Tokens Back', sublabel: 'toDataStreamResponse() → useChat parses automatically', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🌊' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Vercel AI SDK — Provider-Agnostic Stack</p>
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

export default function GenAIChapter15Content() {
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
          Vercel AI SDK — Next.js Mein AI Ka Fastest Path ⚡
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Ek honest comparison: Vercel AI SDK se streaming chat implement karo — 20 lines. Bina SDK ke same feature — 200+ lines, SSE manually handle karo, chunk assembly karo, state manage karo, error handling implement karo. SDK ye sab already karta hai, battle-tested hai, aur provider-agnostic hai. OpenAI, Anthropic, Google — same code, config change karo.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm italic">
            &quot;Vercel AI SDK ne Next.js + LLM integration 10x faster banaya. useChat hook ek line mein full streaming chat deta hai — genuinely.&quot;
          </p>
        </div>
      </div>

      <AiSdkDiagram />

      {/* Card 1: AI SDK Overview */}
      <div id="ai-sdk-overview">
        <ConceptCard
          title="AI SDK Overview — streamText, generateText, useChat"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="AI SDK ke teen core functions samjho: streamText (tokens stream karo, ChatGPT jaisa feel), generateText (poora response wait karo, simpler use cases), generateObject (Zod schema se validated JSON output — parse errors zero). React hooks: useChat (full chat — messages, streaming, loading, errors sab), useCompletion (simple single turn). Provider function: anthropic('model-id') ya openai('model-id') — dono same interface implement karte hain."
          whenToUse={[
            'Next.js project mein AI chat feature add karna — fastest way.',
            'Streaming responses chahiye — token-by-token UI update.',
            'Multiple AI providers use karna — switch karo config change se.',
            'Tool calls + UI updates — agent-like features in Next.js.',
            'Generative UI — AI decides kaunsa component render ho.',
          ]}
          whyUseIt="Ye SDK sirf Next.js ke liye nahi — Node.js, Svelte, Nuxt sab support karta hai. Lekin Next.js ke saath best experience milta hai kyunki Vercel ne specifically App Router ke liye optimize kiya hai. generateObject ka power: Zod schema do, typed structured output guaranteed. Complex data extraction, classification, entity extraction — JSON.parse nahi karna padta, types guaranteed hote hain."
          howToUse={{
            filename: 'ai-sdk-basics.ts',
            language: 'typescript',
            code: `import { streamText, generateText, generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// ─── 1. streamText — streaming response ──────────────────────────
async function streamExample() {
  const result = await streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: 'You are a helpful Node.js tutor.',
    messages: [{ role: 'user', content: 'Express middleware kya hota hai?' }],
  });

  // Print tokens as they arrive
  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }
  console.log('\\n---');
  console.log('Total tokens:', (await result.usage).totalTokens);
}

// ─── 2. generateText — complete response ─────────────────────────
async function generateExample() {
  const { text, usage } = await generateText({
    model: openai('gpt-4o'), // swap providers easily!
    prompt: 'Node.js kya hai ek line mein?',
  });
  console.log(text);
  console.log('Tokens used:', usage.totalTokens);
}

// ─── 3. generateObject — structured JSON output ──────────────────
async function structuredExample() {
  const { object } = await generateObject({
    model: anthropic('claude-sonnet-4-6'),
    schema: z.object({
      title: z.string(),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
      topics: z.array(z.string()),
      estimatedMinutes: z.number(),
    }),
    prompt: 'Create a course chapter about Node.js streams.',
  });

  console.log(object.title);   // Validated, typed!
  console.log(object.topics);  // string[] guaranteed
}`,
            explanation: 'streamText: real-time tokens ke liye, toDataStreamResponse() return karo Next.js route handler mein. generateText: blocking call, poori response ek saath. generateObject game-changer hai: Zod schema do → model guaranteed valid JSON deta hai → TypeScript types automatic. Provider swap: anthropic("model") → openai("model") — ek line change, baki code unchanged.',
          }}
          realWorldScenario="NodeMaster ka AI tutor feature: streaming response (ChatGPT-style), code highlighted, quiz generation. AI SDK se 3 din mein built aur deployed. Estimate bina SDK: streaming implementation (3 days) + SSE handling (2 days) + state management (2 days) + testing (3 days) = 10 days minimum. SDK ne 7 days bachaye — wo 7 days kuch naya build karne mein gaye."
          commonMistakes={[
            {
              mistake: 'NEXT_PUBLIC_ prefix API keys pe lagana',
              why: 'NEXT_PUBLIC_ variables browser mein expose ho jaate hain — API key leak ho jaati hai!',
              fix: '.env.local mein: ANTHROPIC_API_KEY=sk-... (no NEXT_PUBLIC_ prefix). Sirf server-side use karo — route handlers mein, page.tsx server components mein.',
            },
          ]}
          proTip="generateObject ka Zod schema validation production mein invaluable hai. Agar model slightly different format de toh SDK retry karta hai — tumhara code kabhi invalid JSON nahi dekhega. Resume parsing, entity extraction, classification — sab use cases mein ye pattern adopt karo. JSON.parse try-catch se permanent chutkara."
        />
      </div>

      {/* Card 2: Provider Setup */}
      <div id="provider-setup">
        <ConceptCard
          title="Provider Setup — Anthropic, OpenAI, Google in Next.js"
          emoji="🔌"
          difficulty="intermediate"
          whatIsIt="Provider setup one time kaam hai: npm install @ai-sdk/anthropic @ai-sdk/openai @ai-sdk/google. Keys environment variables mein (.env.local). Phir model function call karo — anthropic('claude-sonnet-4-6') ya openai('gpt-4o'). Dono same interface — streamText mein pass karo, baki code same. Ek MODELS object banao — sab provider choices ek jagah, easy switching."
          whenToUse={[
            'Primary provider: Anthropic (Claude) — best for complex reasoning, long context.',
            'Alternative: OpenAI (GPT-4o) — function calling mature, image generation.',
            'Google (Gemini) — multilingual, large context window (1M tokens).',
            'Fallback setup: primary fails → secondary provider automatically use karo.',
            'Cost routing: cheap model first, escalate to expensive if needed.',
          ]}
          whyUseIt="AI landscape rapidly evolve ho raha hai — ek provider lock-in ek bad idea hai. Provider-agnostic code se: kal better model aaye → switch karo, ek provider down ho → fallback, A/B test providers → config change se. Ye flexibility long-term competitive advantage hai. Fallback pattern especially important hai production mein — primary fail kare toh secondary automatically use karo."
          howToUse={{
            filename: 'provider-setup.ts',
            language: 'typescript',
            code: `// package.json dependencies:
// "ai": "^4.0.0"
// "@ai-sdk/anthropic": "^1.0.0"
// "@ai-sdk/openai": "^1.0.0"
// "@ai-sdk/google": "^1.0.0"

// .env.local
// ANTHROPIC_API_KEY=sk-ant-...
// OPENAI_API_KEY=sk-...
// GOOGLE_GENERATIVE_AI_API_KEY=...

import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// ─── Model configurations ─────────────────────────────────────────
const MODELS = {
  fast: anthropic('claude-haiku-4-5'),        // fast + cheap
  balanced: anthropic('claude-sonnet-4-6'),    // balanced
  powerful: anthropic('claude-opus-4-5'),      // most capable
  gpt4: openai('gpt-4o'),                     // OpenAI
  gemini: google('gemini-2.0-flash-001'),     // Google
} as const;

type ModelKey = keyof typeof MODELS;

// ─── Provider factory ─────────────────────────────────────────────
function getModel(key: ModelKey = 'balanced') {
  return MODELS[key];
}

// ─── Usage ───────────────────────────────────────────────────────
async function generateWithProvider(
  prompt: string,
  provider: ModelKey = 'balanced'
) {
  const result = await streamText({
    model: getModel(provider),
    prompt,
    maxTokens: 1024,
  });
  return result;
}

// ─── Fallback setup ───────────────────────────────────────────────
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';

async function generateWithFallback(prompt: string) {
  // Try Claude first, fallback to GPT-4
  for (const modelKey of ['balanced', 'gpt4'] as const) {
    try {
      const { text } = await import('ai').then(({ generateText }) =>
        generateText({ model: getModel(modelKey), prompt })
      );
      return text;
    } catch (err) {
      console.warn(\`\${modelKey} failed, trying next...\`, err);
    }
  }
  throw new Error('All providers failed');
}`,
            explanation: 'MODELS object pattern: sab providers ek jagah defined. getModel(key) function se consistent access. Fallback loop: primary fail → next try → all fail toh throw. Environment variables automatic read hote hain (SDK internally process.env check karta hai) — no explicit config needed. Model IDs exact hone chahiye — runtime error aata hai wrong ID pe, build time nahi.',
          }}
          realWorldScenario="Production app: primary = Claude Sonnet (best quality), fallback = GPT-4o (reliability insurance), high-volume simple tasks = Claude Haiku. Smart router: task complexity score karo, Haiku try karo, quality threshold miss ho toh Sonnet escalate karo. Result: 60% cost saving with same quality. Ye intelligent routing hai — possible sirf provider-agnostic architecture se."
          commonMistakes={[
            {
              mistake: 'Model ID wrong likhna — claude-sonnet-4 instead of claude-sonnet-4-6',
              why: 'Wrong model ID pe runtime error aata hai — build time nahi. Silent failure ho sakti hai.',
              fix: 'Anthropic docs se exact model IDs copy karo. Type-safe enum banao valid model IDs ke liye. Development mein model ID log karo verify karne ke liye.',
            },
          ]}
          proTip="@ai-sdk/anthropic prompt caching support karta hai — system: [{ type: 'text', text: largeSystemPrompt, providerOptions: { anthropic: { cacheControl: { type: 'ephemeral' } } } }] syntax se enable karo. 1000+ token system prompts pe 90% cost saving. Next.js route handler mein ye hit hoga kyunki same process mein multiple requests handle hoti hain — cache warm rehta hai."
        />
      </div>

      {/* Card 3: Route Handlers */}
      <div id="route-handlers">
        <ConceptCard
          title="Route Handlers — Streaming API Endpoints"
          emoji="🛤️"
          difficulty="intermediate"
          whatIsIt="Route handler pattern: POST request aata hai (messages + extra data), streamText call karo, toDataStreamResponse() return karo. Itna simple hai. Tools inline define karo (Zod schema + execute function) — Claude decide karta hai kab call karna hai, SDK automatically execute karta hai. onFinish callback se analytics, logging, DB saves karo asynchronously."
          whenToUse={[
            'Chat API endpoint — useChat hook ke liye backend.',
            'Streaming text generation — real-time token stream.',
            'Tool-augmented responses — web search, DB queries with streaming.',
            'Multi-turn conversations — message history maintain karna.',
            'Custom AI endpoints — different models, different system prompts.',
          ]}
          whyUseIt="Route handler ka core benefit: API key server-side rehta hai. Client never directly LLM API call karta — ye critical security principle hai. NEXT_PUBLIC_ prefix wala env var browser mein visible hota hai — API keys KABHI NEXT_PUBLIC_ nahi hone chahiye. Rate limiting, auth, logging sab server-side implement karo — proper control milta hai."
          howToUse={{
            filename: 'app/api/chat/route.ts',
            language: 'typescript',
            code: `// app/api/chat/route.ts
import { streamText, tool } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json() as {
    messages: { role: 'user' | 'assistant'; content: string }[]
  };

  const result = await streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: \`You are a helpful Node.js tutor teaching in Hinglish.
Explain concepts clearly, give code examples, encourage students.\`,
    messages,
    maxTokens: 2048,
    // ── Optional: tools ──────────────────────────────────────
    tools: {
      getChapterInfo: tool({
        description: 'Get information about a specific NodeMaster chapter',
        parameters: z.object({
          chapterNumber: z.number().describe('Chapter number 1-22'),
        }),
        execute: async ({ chapterNumber }) => {
          // Real: query your database
          return {
            title: \`Chapter \${chapterNumber}\`,
            difficulty: 'intermediate',
            topics: ['RAG', 'Vector DB', 'Embeddings'],
          };
        },
      }),
    },
    // ── Optional: callbacks ───────────────────────────────────
    onFinish: async ({ text, usage, finishReason }) => {
      console.log('Generation complete:', {
        chars: text.length,
        tokens: usage.totalTokens,
        reason: finishReason,
      });
      // Save to database, update analytics, etc.
    },
  });

  return result.toDataStreamResponse();
}

// ── Edge Runtime (optional, faster cold start) ────────────────────
// export const runtime = 'edge';
// export const maxDuration = 30; // seconds`,
            explanation: 'Pattern breakdown: req.json() se messages + any extra body data parse karo. streamText ke tool execute functions server pe run hote hain — DB access, API calls safe hain. onFinish mein analytics aur logging — non-blocking, after stream complete. maxDuration export: Vercel free tier 10s default, Pro 300s — long responses ke liye explicitly set karo.',
          }}
          realWorldScenario="Edtech platform: AI tutor route handler. Messages history, chapter DB query tool, onFinish mein analytics. 50K daily active users, P95 latency 800ms first token. Edge runtime se 200ms improvement (global distribution). Simple optimization: export const runtime = 'edge' — ek line, 20% latency improvement globally."
          commonMistakes={[
            {
              mistake: 'Route handler mein try-catch nahi lagana',
              why: 'API failures, rate limits, invalid inputs — unhandled errors se 500 response aata hai bina useful error message ke.',
              fix: "try-catch wrap karo: if (err instanceof Error && err.message.includes('rate limit')) return Response.json({ error: 'Too many requests' }, { status: 429 }). Client ko actionable errors do.",
            },
          ]}
          proTip="Vercel deployment pe maxDuration hamesha explicitly set karo: export const maxDuration = 60 (Node.js runtime), export const maxDuration = 30 (Edge runtime max). Free tier default 10 seconds — long responses timeout ho jaate hain silently. User ko stream mid-way cut off milti hai — confusing experience. Explicit set karo, surprises avoid karo."
        />
      </div>

      {/* Card 4: useChat Hook */}
      <div id="use-chat">
        <ConceptCard
          title="useChat — Full Chat Interface in Minutes"
          emoji="💬"
          difficulty="intermediate"
          whatIsIt="useChat ek single hook hai jo poora chat experience manage karta hai. Ek baar samjho kya andar hai: messages (full conversation state), input + handleInputChange (controlled input), handleSubmit (form submit + API call), isLoading (streaming indicator), error (error state), reload (last message retry), stop (streaming cancel). Ye sab manually implement karo = 150+ lines. useChat use karo = 5 lines."
          whenToUse={[
            'Full chat interface — user messages + AI responses streaming.',
            'Conversation history maintain karna — automatic.',
            'Loading/streaming UI states — built-in.',
            'Tool calls in UI — onToolCall callback se handle karo.',
            'Optimistic UI updates — immediate user message display.',
          ]}
          whyUseIt="Streaming handling genuinely complex hai internals mein: SSE stream parse karo, chunk assembly karo, partial JSON handle karo, cancellation implement karo, retry logic karo, error states manage karo. useChat ne ye sab battle-tested banaya hai. Tum sirf UI par focus karo — messages map karo, form render karo, done. Abstraction ka ye maximum value hai."
          howToUse={{
            filename: 'components/ChatInterface.tsx',
            language: 'typescript',
            code: `'use client'

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';

export default function ChatInterface() {
  const {
    messages,         // all messages (user + assistant)
    input,            // current input value
    handleInputChange, // onChange handler
    handleSubmit,     // form submit handler
    isLoading,        // true while streaming
    error,            // error if any
    reload,           // retry last message
    stop,             // stop streaming
    setMessages,      // manually control messages
  } = useChat({
    api: '/api/chat',          // your route handler
    initialMessages: [],       // optional: pre-loaded messages
    onFinish: (message) => {   // called when streaming completes
      console.log('Done:', message.content.length, 'chars');
    },
    onError: (err) => {        // error handler
      console.error('Chat error:', err.message);
    },
  });

  // Auto-scroll to bottom
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.role === 'user' ? 'justify-end' : 'justify-start'}\`}
          >
            <div
              className={\`max-w-[80%] rounded-2xl px-4 py-2 text-sm \${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }\`}
            >
              {message.content}
              {message.role === 'assistant' && isLoading && (
                <span className="inline-block w-1 h-4 bg-current animate-pulse ml-1" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 p-3 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
          Error: {error.message}
          <button onClick={reload} className="ml-2 underline">Retry</button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Kuch poochho..."
          disabled={isLoading}
          className="flex-1 bg-gray-800 rounded-xl px-4 py-2 text-sm text-white outline-none"
        />
        {isLoading ? (
          <button type="button" onClick={stop}
            className="px-4 py-2 bg-red-600 rounded-xl text-sm text-white">
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()}
            className="px-4 py-2 bg-purple-600 rounded-xl text-sm text-white disabled:opacity-50">
            Send
          </button>
        )}
      </form>
    </div>
  );
}`,
            explanation: 'useChat internals: streaming ke dauran message.content gradually update hoti hai — React automatically re-render karta hai (no extra code). isLoading true hota hai submit se leke stream complete hone tak. stop() AbortController se streaming cancel karta hai — mid-way rukna possible. reload() last user message re-submit karta hai — error recovery ke liye. bottomRef + useEffect auto-scroll implement karta hai.',
          }}
          realWorldScenario="Customer support portal: AI first-response feature. User query aata hai, AI streaming response deta hai, human agent background mein review karta hai. Agar AI se resolved — done. Agar nahi — human agent stop() click karta hai, takeover karta hai. 65% queries AI handle karta hai bina human intervention. Total implementation: 3 din. useChat ke stop() button ka ye ek elegant production use case hai."
          commonMistakes={[
            {
              mistake: 'Message content manually string se set karna',
              why: "messages.push({ role: 'assistant', content: '...' }) — ye wrong hai aur streaming ke saath conflict karta hai.",
              fix: "Messages ko manually set karne ke liye setMessages() use karo. Lekin generally useChat automatically handle karta hai — manually set karne ki zarurat rarely hoti hai.",
            },
          ]}
          proTip="useChat body prop powerful hai: useChat({ body: { userId: user.id, sessionId: session.id, preferredModel: 'claude' } }). Route handler mein ye sab req.json() mein milega — per-user system prompts, A/B testing, analytics context ke liye. Ye pattern se client side logic server mein move karo — more secure, more flexible."
        />
      </div>

      {/* Card 5: Generative UI */}
      <div id="generative-ui">
        <ConceptCard
          title="Generative UI — AI Jo UI Decide Kare"
          emoji="🎨"
          difficulty="intermediate"
          whatIsIt="Generative UI — next level concept. Regular chat: AI text deta hai → markdown render hota hai. Generative UI: AI tool call kare toh specific React component render ho. 'Mumbai ka weather batao' → AI showWeather tool call karta hai → WeatherCard component render hota hai. 'Products dhikao' → ProductGrid component. AI decides which component, developer defines components. Separation of concerns at its finest."
          whenToUse={[
            'Rich data display — numbers/charts better hain markdown text se.',
            'Interactive components — forms, buttons based on AI response.',
            'Domain-specific UIs — booking interfaces, product cards, maps.',
            'Context-aware rendering — AI decides data type based on query.',
          ]}
          whyUseIt="UX difference dramatic hai: '35°C, sunny' text vs animated WeatherCard with temperature gauge, humidity, forecast chart. Same data, 10x better experience. Users interact karte hain components se — booking cards mein directly book karo, product cards mein add to cart karo. Static text se ye possible nahi. Generative UI chat ko application-like feel deta hai."
          howToUse={{
            filename: 'app/api/ui-chat/route.ts',
            language: 'typescript',
            code: `// app/api/ui-chat/route.ts — Generative UI Route
import { streamText, tool } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json() as {
    messages: { role: 'user' | 'assistant'; content: string }[]
  };

  const result = await streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: 'You are a helpful assistant. Use tools to show rich UI when appropriate.',
    messages,
    tools: {
      showWeather: tool({
        description: 'Show weather information for a city',
        parameters: z.object({
          city: z.string(),
          temp: z.number(),
          condition: z.string(),
          humidity: z.number(),
        }),
        execute: async ({ city, temp, condition, humidity }) => ({
          city, temp, condition, humidity, // returned to client
        }),
      }),
      showProductCard: tool({
        description: 'Show a product card with details',
        parameters: z.object({
          name: z.string(),
          price: z.number(),
          rating: z.number(),
          inStock: z.boolean(),
        }),
        execute: async (product) => product,
      }),
    },
  });

  return result.toDataStreamResponse();
}

// ─── Client Component ─────────────────────────────────────────────
// 'use client'
// import { useChat } from 'ai/react';
//
// function WeatherCard({ city, temp, condition }: {...}) {
//   return <div className="...">...</div>;
// }
//
// export default function GenerativeChat() {
//   const { messages } = useChat({ api: '/api/ui-chat' });
//
//   return messages.map(msg => {
//     // Render tool invocations as components
//     if (msg.toolInvocations) {
//       return msg.toolInvocations.map(ti => {
//         if (ti.toolName === 'showWeather' && ti.state === 'result') {
//           return <WeatherCard key={ti.toolCallId} {...ti.result} />;
//         }
//         return null;
//       });
//     }
//     return <div key={msg.id}>{msg.content}</div>;
//   });
// }`,
            explanation: 'Generative UI client pattern: messages iterate karo, toolInvocations check karo. ti.state === "result" check karo pehle (execute function complete hona chahiye). ti.result mein data milega — directly component props mein pass karo. Mixed text + components ek conversation mein possible hai. Tool state lifecycle: "partial-call" (loading) → "call" (executing) → "result" (done) — sab states pe UI handle karo.',
          }}
          realWorldScenario="Travel chatbot: 'Paris 3 din ka trip plan karo' → AI FlightCard (book button ke saath), HotelCard (availability + price), ItineraryTimeline render karta hai. User ne FlightCard se directly book kiya — UI mein hi. Conversion rate 3x higher vs text-only chatbot. Ye generative UI ka commercial value hai — engagement → conversion."
          commonMistakes={[
            {
              mistake: 'Tool result client pe re-fetch karna',
              why: 'Tool execute karta hai server pe aur result return karta hai — client mein toolInvocations[].result mein already available hai. Re-fetch extra latency aur cost add karta hai.',
              fix: "ti.state === 'result' check karo aur ti.result directly use karo — server ne already data fetch kiya hai execute() mein.",
            },
          ]}
          proTip="Loading states implement karo Generative UI mein: ti.state === 'call' pe skeleton component show karo, ti.state === 'result' pe actual component render karo. Isse users ko instant feedback milta hai ki kuch ho raha hai. Skeleton → actual component transition smooth feel karta hai. AI SDK docs mein 'Generative UI' section mein complete examples hain — zarur padhna."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 15 Quiz — Vercel AI SDK
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. AI SDK samjhe? Test karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="vercel-ai-sdk" />
      </div>
    </div>
  )
}
