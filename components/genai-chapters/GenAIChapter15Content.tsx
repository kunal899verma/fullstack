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
          Vercel AI SDK — Next.js Mein AI Fastest Way ⚡
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          AI SDK se Next.js mein streaming chat, tool calls, aur generative UI banao — boilerplate minimum, production-ready maximum.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm italic">
            &quot;Vercel AI SDK ne Next.js + LLM integration 10x faster banaya. useChat hook ek line mein full streaming chat deta hai.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: AI SDK Overview */}
      <div id="ai-sdk-overview">
        <ConceptCard
          title="AI SDK Overview — streamText, generateText, useChat"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Vercel AI SDK (ai package) Next.js mein LLM integration ke liye designed hai. Core functions: streamText (streaming responses), generateText (complete response wait), generateObject (structured JSON output). React hooks: useChat (full chat interface), useCompletion (simple completion). Provider-agnostic — OpenAI, Anthropic, Google sab same API se."
          whenToUse={[
            'Next.js project mein AI chat feature add karna — fastest way.',
            'Streaming responses chahiye — token-by-token UI update.',
            'Multiple AI providers use karna — switch karo config change se.',
            'Tool calls + UI updates — agent-like features in Next.js.',
            'Generative UI — AI decides kaunsa component render ho.',
          ]}
          whyUseIt="Bina AI SDK ke: streaming manually implement karo, SSE parse karo, tool calls handle karo, error handling implement karo — 200+ lines boilerplate. AI SDK ke saath: streamText → toDataStreamResponse() → useChat — 20 lines, production-ready. Streaming, cancellation, error handling — sab handled."
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
            explanation: 'streamText: streaming ke liye, toDataStreamResponse() se Next.js route handler mein use karo. generateText: simple blocking call. generateObject: Zod schema se typed structured output — JSON parsing + validation automatic. Provider swap: anthropic() → openai() — same code, different model.',
          }}
          realWorldScenario="NodeMaster mein AI tutor feature: user question poochhe, streaming response aaye (ChatGPT-style typing effect), code examples highlighted, quiz questions generate ho. AI SDK se 3 din mein built. Bina SDK: minimum 2 weeks implementation + testing."
          commonMistakes={[
            {
              mistake: 'NEXT_PUBLIC_ prefix API keys pe lagana',
              why: 'NEXT_PUBLIC_ variables browser mein expose ho jaate hain — API key leak ho jaati hai!',
              fix: '.env.local mein: ANTHROPIC_API_KEY=sk-... (no NEXT_PUBLIC_ prefix). Sirf server-side use karo — route handlers mein, page.tsx server components mein.',
            },
          ]}
          proTip="AI SDK ka generateObject Zod schema se Structured Outputs use karta hai (OpenAI) ya JSON mode (Anthropic) — guaranteed valid JSON, no parsing errors. Complex data extraction ke liye game-changer: parse resumes, extract entities, classify content — typed output guaranteed."
        />
      </div>

      {/* Card 2: Provider Setup */}
      <div id="provider-setup">
        <ConceptCard
          title="Provider Setup — Anthropic, OpenAI, Google in Next.js"
          emoji="🔌"
          difficulty="intermediate"
          whatIsIt="AI SDK multiple providers support karta hai — @ai-sdk/anthropic, @ai-sdk/openai, @ai-sdk/google. Sab same Runnable interface implement karte hain — model function call karo aur streamText/generateText mein pass karo. Environment variables se API keys configure karo, code mein hardcode mat karo."
          whenToUse={[
            'Primary provider: Anthropic (Claude) — best for complex reasoning, long context.',
            'Alternative: OpenAI (GPT-4o) — function calling mature, image generation.',
            'Google (Gemini) — multilingual, large context window (1M tokens).',
            'Fallback setup: primary fails → secondary provider automatically use karo.',
            'Cost routing: cheap model first, escalate to expensive if needed.',
          ]}
          whyUseIt="Provider-agnostic code future-proof hai — kal agar Claude ka API down ho toh OpenAI pe fallback possible hai bina code change ke. Different providers different strengths — best model for best task. AI landscape evolving hai — lock-in avoid karo."
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
            explanation: 'Provider import karo (@ai-sdk/anthropic), model function call karo (anthropic("model-id")), streamText/generateText mein pass karo. Sab same interface. MODELS object se easy switching. Fallback: try-catch mein providers loop karo. Environment variables se key automatic pick hoti hai — no config needed.',
          }}
          realWorldScenario="Production AI app: primary = Claude Sonnet (best quality), fallback = GPT-4o (reliability), ultra-fast = Claude Haiku (high volume, simple tasks). Router: task complexity score karo, cheap model try karo, quality threshold nahi mili toh expensive model use karo. 60% cost saving with same quality."
          commonMistakes={[
            {
              mistake: 'Model ID wrong likhna — claude-sonnet-4 instead of claude-sonnet-4-6',
              why: 'Wrong model ID pe runtime error aata hai — build time nahi. Silent failure ho sakti hai.',
              fix: 'Anthropic docs se exact model IDs copy karo. Type-safe enum banao valid model IDs ke liye. Development mein model ID log karo verify karne ke liye.',
            },
          ]}
          proTip="@ai-sdk/anthropic prompt caching support karta hai — system prompt pe cache_control: { type: 'ephemeral' } add karo. Long system prompts (>1000 tokens) pe 90% cost saving possible hai. Next.js mein bhi kaam karta hai — route handler mein system prompt ek baar cache ho jaata hai."
        />
      </div>

      {/* Card 3: Route Handlers */}
      <div id="route-handlers">
        <ConceptCard
          title="Route Handlers — Streaming API Endpoints"
          emoji="🛤️"
          difficulty="intermediate"
          whatIsIt="Next.js App Router mein AI streaming endpoints banao app/api/chat/route.ts mein. POST request → streamText → toDataStreamResponse() → client ko stream. Edge runtime optional — faster cold starts. Tool calls bhi route handler se handle hoti hain."
          whenToUse={[
            'Chat API endpoint — useChat hook ke liye backend.',
            'Streaming text generation — real-time token stream.',
            'Tool-augmented responses — web search, DB queries with streaming.',
            'Multi-turn conversations — message history maintain karna.',
            'Custom AI endpoints — different models, different system prompts.',
          ]}
          whyUseIt="Route handler server-side mein hota hai — API key secure. Client directly Anthropic/OpenAI API nahi call karta. Rate limiting, authentication, logging — sab server-side implement karo. Edge runtime se global low latency possible hai."
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
            explanation: 'Route handler: req.json() se messages parse karo, streamText call karo, toDataStreamResponse() return karo. Tools mein execute function server pe run hota hai (DB queries, API calls safe). onFinish callback se logging, analytics, database saves karo. Edge runtime pe deploy karo global latency ke liye.',
          }}
          realWorldScenario="Edtech platform ne AI tutor route handler banaya: messages history maintain hoti hai, tools mein chapter database query hoti hai, onFinish mein analytics track hoti hai. 50K daily active users, P95 latency 800ms (including streaming first token). Edge runtime deploy se 200ms improvement."
          commonMistakes={[
            {
              mistake: 'Route handler mein try-catch nahi lagana',
              why: 'API failures, rate limits, invalid inputs — unhandled errors se 500 response aata hai bina useful error message ke.',
              fix: "try-catch wrap karo: if (err instanceof Error && err.message.includes('rate limit')) return Response.json({ error: 'Too many requests' }, { status: 429 }). Client ko actionable errors do.",
            },
          ]}
          proTip="maxDuration set karo route handler mein — Vercel free tier pe default 10 seconds, Pro pe 300 seconds. Long streaming responses ke liye: export const maxDuration = 60. Edge runtime pe sirf 30 seconds max hai. Choose based on expected response length."
        />
      </div>

      {/* Card 4: useChat Hook */}
      <div id="use-chat">
        <ConceptCard
          title="useChat — Full Chat Interface in Minutes"
          emoji="💬"
          difficulty="intermediate"
          whatIsIt="useChat React hook poora chat interface manage karta hai — messages state, input handling, streaming, loading states, error handling, form submit — sab automatic. Ek hook, full ChatGPT-like experience. isLoading, error, reload, stop — sab built-in controls."
          whenToUse={[
            'Full chat interface — user messages + AI responses streaming.',
            'Conversation history maintain karna — automatic.',
            'Loading/streaming UI states — built-in.',
            'Tool calls in UI — onToolCall callback se handle karo.',
            'Optimistic UI updates — immediate user message display.',
          ]}
          whyUseIt="Bina useChat ke: useState for messages, useEffect for streaming, manual form handling, loading state management, error handling — 100+ lines. useChat: same UI 10 lines mein. Streaming handling complex hai (SSE parsing, partial JSON) — useChat ye sab handle karta hai."
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
            explanation: 'useChat sab manage karta hai: messages array automatically update hoti hai, streaming text message.content mein aa jaata hai, isLoading streaming ke dauran true hota hai. handleSubmit form ke onSubmit mein lagao. stop() se streaming cancel hoti hai. reload() se last user message retry hota hai.',
          }}
          realWorldScenario="Customer support portal ne useChat se AI first-response feature banaya — user query pe AI streaming response deta hai, human agent background mein review karta hai. 65% queries AI handle karta hai bina human intervention. Integration: 3 din implementation + testing. useChat ka stop button: human agent takeover button."
          commonMistakes={[
            {
              mistake: 'Message content manually string se set karna',
              why: "messages.push({ role: 'assistant', content: '...' }) — ye wrong hai aur streaming ke saath conflict karta hai.",
              fix: "Messages ko manually set karne ke liye setMessages() use karo. Lekin generally useChat automatically handle karta hai — manually set karne ki zarurat rarely hoti hai.",
            },
          ]}
          proTip="useChat mein body prop se extra data route handler ko bhej sakte ho: useChat({ body: { userId: user.id, sessionId: session.id } }). Route handler mein req.json() se ye data bhi milega messages ke saath — per-user system prompts, logging context ke liye useful."
        />
      </div>

      {/* Card 5: Generative UI */}
      <div id="generative-ui">
        <ConceptCard
          title="Generative UI — AI Jo UI Decide Kare"
          emoji="🎨"
          difficulty="intermediate"
          whatIsIt="Generative UI mein AI decide karta hai kaunsa React component render ho. Regular streaming: AI text stream karta hai jo markdown mein render hota hai. Generative UI: AI tool call kare toh specific React component render ho — weather query pe WeatherCard, stock query pe StockChart, product search pe ProductGrid."
          whenToUse={[
            'Rich data display — numbers/charts better hain markdown text se.',
            'Interactive components — forms, buttons based on AI response.',
            'Domain-specific UIs — booking interfaces, product cards, maps.',
            'Context-aware rendering — AI decides data type based on query.',
          ]}
          whyUseIt="User ne 'Mumbai ka weather batao' poochha — text response: '35°C, sunny' boring. Generative UI: animated WeatherCard component with icon, temperature gauge, forecast. Same data, 10x better UX. AI decides relevant component, developer defines components — separation of concerns."
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
            explanation: 'Generative UI pattern: tool execute karta hai data return karta hai → client mein toolInvocations check karo → matching React component render karo. AI ek conversation mein multiple tools use kar sakta hai — mixed text + components possible hai. Tool state: "partial-call" → "call" → "result" — loading states bhi handle karo.',
          }}
          realWorldScenario="Travel planning chatbot: User 'Paris trip plan karo 3 din ke liye' poochhe toh — AI automatically FlightCard, HotelCard, ItineraryTimeline components render karta hai instead of boring text. User ne booking directly UI se kiya. Conversion rate 3x higher vs text-only chatbot."
          commonMistakes={[
            {
              mistake: 'Tool result client pe re-fetch karna',
              why: 'Tool execute karta hai server pe aur result return karta hai — client mein toolInvocations[].result mein already available hai. Re-fetch extra latency aur cost add karta hai.',
              fix: "ti.state === 'result' check karo aur ti.result directly use karo — server ne already data fetch kiya hai execute() mein.",
            },
          ]}
          proTip="AI SDK ka experimental_toDataStream + createStreamableUI combination aur bhi powerful generative UI banata hai — loading skeletons, progressive rendering, partial updates. SDK docs mein 'Generative UI' section dekhо — complete examples with loading states, error boundaries."
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
