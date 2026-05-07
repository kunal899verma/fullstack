'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Claude models mein kaunsa fastest aur cheapest option hai high-volume tasks ke liye?',
    options: [
      {
        text: 'claude-opus-4-5 — most powerful = best for everything',
        correct: false,
        explanation: 'Opus sabse powerful hai lekin sabse expensive aur slow bhi. High-volume, simple tasks ke liye over-engineering hai.',
      },
      {
        text: 'claude-sonnet-4-6 — balanced option sab ke liye',
        correct: false,
        explanation: 'Sonnet balanced hai quality tasks ke liye, lekin Haiku fast/cheap classification ya simple tasks ke liye better fit hai.',
      },
      {
        text: 'claude-haiku-4-5 — fastest aur cheapest, high-volume simple tasks ke liye ideal',
        correct: true,
        explanation: 'Bilkul sahi! Haiku fastest aur cheapest hai. Customer support routing, classification, simple Q&A, spam detection — ye sab Haiku se perfectly handle hote hain. Sonnet/Opus complex analysis ke liye bachao.',
      },
      {
        text: 'Sab models same speed par run karte hain, sirf quality alag hoti hai',
        correct: false,
        explanation: 'Nahi — speed aur cost dramatically different hain. Haiku sub-second responses deta hai, Opus slower hai. Appropriate model selection cost aur latency dono impact karta hai.',
      },
    ],
  },
  {
    question: 'Streaming kab use karna chahiye apni application mein?',
    options: [
      {
        text: 'Kabhi nahi — streaming se code complex hota hai, normal API better hai',
        correct: false,
        explanation: 'Streaming user experience dramatically improve karta hai long responses ke liye. UX benefit code complexity se zyada valuable hai.',
      },
      {
        text: 'Jab response long hoga aur user ko real-time feedback chahiye — jaise chatbots, long-form content generation',
        correct: true,
        explanation: 'Exactly! Streaming se user perceived latency dramatically kam hoti hai. 10 second response vs token-by-token streaming — second option zyada natural feel deta hai. Chatbots, code generation, long summaries — sab streaming se better hote hain.',
      },
      {
        text: 'Sirf real-time applications mein — regular web apps ke liye nahi',
        correct: false,
        explanation: 'Regular web apps bhi streaming benefit lete hain — koi bhi long AI response streaming se better UX deta hai, real-time dedicated apps ki zaroorat nahi.',
      },
      {
        text: 'Streaming sirf frontend applications mein kaam karta hai, Node.js mein nahi',
        correct: false,
        explanation: 'Claude SDK Node.js mein streaming fully support karta hai — for await...of loop se chunks process karo. Backend streaming output ko frontend tak pipe bhi kar sakte ho.',
      },
    ],
  },
  {
    question: 'Tool use (function calling) ke response mein stop_reason kya hota hai jab Claude tool call karna chahta ho?',
    options: [
      {
        text: '"end_turn" — normal response ki tarah',
        correct: false,
        explanation: '"end_turn" tab hota hai jab Claude apna response complete karta hai bina tool call ke. Tool use ke liye alag stop_reason hota hai.',
      },
      {
        text: '"tool_use" — Claude ne tool call kiya, tumhe tool execute karna hai aur result return karna hai',
        correct: true,
        explanation: 'Sahi! stop_reason === "tool_use" matlab Claude ek ya zyada tools call karna chahta hai. Tum tool execute karo, result tool_result message mein Claude ko wapas do, aur Claude final response generate karta hai.',
      },
      {
        text: '"function_call" — OpenAI style naming',
        correct: false,
        explanation: 'OpenAI "function_call" use karta tha (older) ya "tool_calls". Anthropic Claude API mein stop_reason "tool_use" hota hai — naming alag hai.',
      },
      {
        text: '"max_tokens" — Claude always runs out of tokens for tools',
        correct: false,
        explanation: '"max_tokens" stop_reason tab hota hai jab response max_tokens limit hit karta hai. Tool use ke liye explicitly "tool_use" hota hai.',
      },
    ],
  },
  {
    question: 'Prompt caching ka TTL (Time To Live) kitna hai Anthropic mein?',
    options: [
      {
        text: '30 seconds — bahut short',
        correct: false,
        explanation: '30 seconds bahut short hoga — typical request processing time mein cache expire ho jaata.',
      },
      {
        text: '5 minutes (300 seconds) — cache valid rehta hai is duration ke liye',
        correct: true,
        explanation: 'Bilkul sahi! Anthropic ka prompt cache 5 minutes ka TTL hai. Isi wajah se NodeMaster jaise tools 5 minute window ke andar prompts schedule karte hain — cache warm rehta hai, cost save hoti hai.',
      },
      {
        text: '24 hours — cache permanent hai session ke liye',
        correct: false,
        explanation: 'Cache permanent nahi hai — 5 minute TTL hai. Iske baad cache expire ho jaata hai aur next request mein cache_creation_input_tokens charge hote hain (full price).',
      },
      {
        text: 'Cache ka koi TTL nahi — hamesha available rehta hai',
        correct: false,
        explanation: 'Cache ephemeral hai — 5 minute ke baad expire. Isliye high-frequency use cases mein caching sabse zyada beneficial hai.',
      },
    ],
  },
  {
    question: 'Context window limit kyun matter karta hai production applications mein?',
    options: [
      {
        text: 'Sirf performance ke liye — longer context = slower response',
        correct: false,
        explanation: 'Performance matter karta hai, lekin ye poori picture nahi hai. Cost aur conversation management bhi critical factors hain.',
      },
      {
        text: 'Kyunki context window limit se zyada tokens send nahi ho sakte, cost scale hoti hai tokens ke saath, aur long conversations mein history manage karni padti hai',
        correct: true,
        explanation: 'Exactly! Teen reasons: (1) Hard limit — limit exceed karne par error. (2) Cost — har token ka price hai. (3) Management — lamba conversation = expensive. Isliye summarization strategies zaroori hain production mein.',
      },
      {
        text: 'Context window sirf Claude mein issue hai, GPT-4 mein nahi',
        correct: false,
        explanation: 'Sab LLMs ka context window limit hota hai — OpenAI, Anthropic, Google sab ke. Ye fundamental architecture constraint hai.',
      },
      {
        text: 'Context window limit matter nahi karta — models automatically summarize karte hain',
        correct: false,
        explanation: 'Models khud automatically summarize nahi karte — ye tumhara kaam hai. Limit exceed karne par API error throw karta hai. Production apps mein manual conversation management zaroori hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter9Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          Claude API — LLM Jo Actually Sunti Hai 🤖
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          GPT ke baare mein toh sab jaante hain — lekin ye chapter Claude ke baare mein hai. Aur ek secret: Claude complex instructions follow karne mein aur long context handle karne mein bahut better hai. 200K token context window, strong instruction following, hallucination kam — ye features production mein matter karte hain. Teen tiers: Haiku (fast + cheap, routing/classification), Sonnet (balanced, roz ka kaam), Opus (most powerful, complex reasoning). Sahi tier choose karna = sahi cost + quality equation.
        </p>
        <div
          className="rounded-xl p-4 mb-2"
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.3)',
          }}
        >
          <p className="text-[#C4B5FD] text-sm">
            📦 Install:{' '}
            <code className="bg-[#22222F] px-2 py-0.5 rounded text-xs">
              npm install @anthropic-ai/sdk
            </code>{' '}
            | API keys: console.anthropic.com
          </p>
        </div>
      </div>

      {/* ConceptCard 1: Setup & First Call */}
      <div id="claude-setup">
        <ConceptCard
          title="Claude API Setup"
          emoji="🔑"
          difficulty="beginner"
          whatIsIt="5 minute mein pehli Claude call — npm install @anthropic-ai/sdk, API key env var mein rakho, aur client banao. Lekin suno — client initialization se zyada important hai model selection. Teen tiers understand karo pehle: Haiku fastest aur cheapest hai (use karo routing, classification, simple Q&A ke liye — thousands of requests handle karo cheaply). Sonnet most use cases ke liye best balance hai. Opus sirf complex reasoning ke liye — expensive hai, wisely use karo."
          whenToUse={[
            'claude-haiku-4-5: High-volume tasks — classification, simple Q&A, customer support routing. Fastest aur cheapest.',
            'claude-sonnet-4-6: Most production use cases — code review, content generation, analysis. Best quality/cost ratio.',
            'claude-opus-4-5: Complex reasoning, nuanced analysis, highest quality needed. Use sparingly — most expensive.',
          ]}
          whyUseIt="Claude ka differentiation kya hai? Ek: 200K token context window — poori book ek baar mein analyze karo. Do: instruction following bahut tight hai — complex, multi-step instructions exactly follow karta hai. Teen: hallucination less frequent hai tricky questions pe. Ye teen cheezein production mein matter karti hain. Aur ek free tip: Anthropic Console mein Workbench feature hai — wahan prompts test karo pehle, bina ek line code likhe. Time bachao."
          howToUse={{
            filename: 'claude-setup.ts',
            language: 'typescript',
            code: `// npm install @anthropic-ai/sdk
// .env mein: ANTHROPIC_API_KEY=sk-ant-...

import Anthropic from '@anthropic-ai/sdk';

// ─── Client initialization ────────────────────────────────────
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // reads from env by default
  // Optional: custom retry config
  maxRetries: 3,
  timeout: 30_000, // 30 seconds
});

// ─── Simplest possible call ───────────────────────────────────
async function firstCall(): Promise<void> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5',    // fast + cheap for testing
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: 'Node.js aur Deno mein kya fark hai? 3 points mein batao.',
      },
    ],
  });

  // Response structure
  console.log(response.id);          // msg_01ABC... — unique ID
  console.log(response.model);       // claude-haiku-4-5
  console.log(response.stop_reason); // 'end_turn' | 'max_tokens' | 'tool_use'
  console.log(response.usage);       // { input_tokens: 23, output_tokens: 89 }

  const block = response.content[0];
  if (block.type === 'text') {
    console.log(block.text);         // actual response text
  }
}

// ─── Model selection guide ────────────────────────────────────
type ClaudeModel = 'claude-haiku-4-5' | 'claude-sonnet-4-6' | 'claude-opus-4-5';

function chooseModel(task: string): ClaudeModel {
  const complexTasks = ['architecture review', 'legal analysis', 'research'];
  const simpleTasks = ['classification', 'routing', 'simple Q&A'];

  if (simpleTasks.some(t => task.includes(t))) return 'claude-haiku-4-5';
  if (complexTasks.some(t => task.includes(t))) return 'claude-opus-4-5';
  return 'claude-sonnet-4-6'; // default — good for most cases
}

void firstCall();`,
            explanation: 'Client ek baar initialize karo — singleton pattern use karo, har request pe naya client mat banao. response.usage hamesha log karo — ye hi billing ka basis hai, monitoring ke bina costs surprise de sakti hai. stop_reason critical hai: "end_turn" = normal completion, "max_tokens" = response cut ho gayi (bad!), "tool_use" = agent loop continue karo.',
          }}
          realWorldScenario="Ek production app mein teen models simultaneously: Haiku customer support routing ke liye (10K+ requests/day, super cheap), Sonnet content generation ke liye (quality matters, moderate cost), Opus daily complex business analysis ke liye (ek baar, expensive theek hai). Ye 'right tool for right job' mentality hai — ek hi model sab kuch kare ye beginner thinking hai."
          commonMistakes={[
            {
              mistake: 'API key ko code mein hardcode karna',
              why: 'Git mein commit ho jaata hai — security breach! API key compromise hone par charges tumhare account par aayenge.',
              fix: 'ANTHROPIC_API_KEY environment variable mein rakho. .env file use karo locally, production mein secrets manager (Vercel env, AWS Secrets Manager). .env file gitignore mein rakho hamesha.',
            },
            {
              mistake: 'max_tokens set nahi karna',
              why: 'Bina limit ke model bahut lamba response de sakta hai — unexpected costs aur slow responses.',
              fix: 'Hamesha appropriate max_tokens set karo. Simple tasks: 256-512. Normal responses: 1024-2048. Long documents: 4096+.',
            },
          ]}
          proTip="Anthropic Console ka Workbench feature ek hidden gem hai — prompts test karo bina ek line code likhe. Model comparison karo side by side, temperature tune karo, system prompts iterate karo. Ye habit banao: pehle Workbench mein experiment, phir code mein implement. Production se pehle 10 edge cases test karo wahan — bugs pehle pakdo."
        />
      </div>

      {/* ConceptCard 2: Messages API */}
      <div id="messages-api">
        <ConceptCard
          title="Messages API — Complete Guide"
          emoji="💬"
          difficulty="intermediate"
          whatIsIt="Ek fundamental truth yaad karo: Claude stateless hai. Iska matlab — wo pichla kuch nahi jaanta. Har request mein poori conversation history bhejo — warna model naya conversation samajhega. Messages API mein conversation history ek array hai jahan user aur assistant alternately baat karte hain. System prompt ek baar define karo — Claude ki permanent identity ban jaati hai har conversation mein."
          whenToUse={[
            'Single-turn: ek question, ek answer — simple use cases.',
            'Multi-turn: chatbot, tutoring system, interactive assistant — conversation history maintain karo.',
            'System prompt: character, constraints, format define karo persistent context ke saath.',
            'Temperature control: code (0.1) vs creative (0.9) — appropriate randomness.',
          ]}
          whyUseIt="SDK seedha REST API se zyada samjhdar hai — TypeScript types deta hai, automatic retries karta hai rate limits pe, streaming helpers built-in hain. Multi-modal (images + text), tool use, streaming, prompt caching — sab ye ek API se milta hai. Aur parameters samjho: temperature 0 = deterministic code output, temperature 0.9 = creative writing. Ye tuning production quality decide karta hai."
          howToUse={{
            filename: 'messages-api.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── All parameters explained ─────────────────────────────────
async function completeExample(): Promise<void> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',          // which Claude to use
    max_tokens: 2048,                    // max output tokens (required)
    temperature: 0.7,                   // 0 = deterministic, 1 = creative
    system: 'You are a helpful Node.js tutor. Explain in Hinglish.', // persistent context
    messages: [                         // conversation history
      { role: 'user', content: 'Event loop kya hai?' },
      { role: 'assistant', content: 'Event loop Node.js ka dil hai...' },
      { role: 'user', content: 'Aur promises ka kya?' }, // latest message
    ],
    // Optional parameters:
    // top_p: 0.95,          // nucleus sampling
    // top_k: 40,            // top-k sampling
    // stop_sequences: ['\n\nUser:'], // stop on these strings
  });

  console.log(response.stop_reason);    // 'end_turn' | 'max_tokens' | 'tool_use'
  console.log(response.usage.input_tokens);  // tokens in (billed)
  console.log(response.usage.output_tokens); // tokens out (billed, higher rate)
}

// ─── Multi-turn conversation pattern ─────────────────────────
const conversationHistory: Anthropic.MessageParam[] = [];

async function chat(userMessage: string): Promise<string> {
  // Add user message to history
  conversationHistory.push({
    role: 'user',
    content: userMessage,
  });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: 'You are a helpful Node.js tutor. Explain concepts in Hinglish. Use code examples.',
    messages: conversationHistory, // send FULL history every time
  });

  // Extract text response
  const block = response.content[0];
  const replyText = block.type === 'text' ? block.text : '';

  // Add assistant response to history for next turn
  conversationHistory.push({
    role: 'assistant',
    content: replyText,
  });

  return replyText;
}

// Usage — Claude remembers context!
async function tutorialSession(): Promise<void> {
  const r1 = await chat('Event loop kya hai?');
  console.log('Claude:', r1);

  const r2 = await chat('Aur promises ka kya?');       // remembers event loop context
  console.log('Claude:', r2);

  const r3 = await chat('Dono mein kya relationship hai?'); // cross-references both
  console.log('Claude:', r3);
}

void tutorialSession();`,
            explanation: 'Model stateless hai — ye fundamental rule hai. Har API call ek naya conversation hai unless tum poori history bhejte ho. conversationHistory array manually maintain karo. SDK system prompt separately handle karta hai — messages array mein mat dalo. Temperature ke baare mein: code reviews/analysis = 0.1 (consistent), explanations = 0.7 (natural), creative = 0.9.',
          }}
          realWorldScenario="NodeMaster ka tutoring chatbot exactly yahi pattern use karta hai: student 'event loop kya hai' poochhta hai → Claude explain karta hai → student 'phir promises ka kya' poochhta hai → Claude pichla context se relate karta hai → student 'dono mein kya relationship' poochhta hai → Claude cross-reference karta hai. Ye natural learning flow sirf isliye possible hai kyunki poori history har request mein hai."
          commonMistakes={[
            {
              mistake: 'Conversation history manage nahi karna',
              why: 'Bina history ke har message naya conversation hota hai — Claude pichla context nahi jaanta. Multi-turn experience toot jaata hai.',
              fix: 'MessageParam[] array maintain karo. User message add karo → API call → assistant response add karo. Ye cycle har turn par repeat karo.',
            },
            {
              mistake: 'Context window limit ignore karna long conversations mein',
              why: 'Bahut lamba conversation history → 200K token limit exceed → API error.',
              fix: 'Periodically old messages summarize karo: summarize oldest N messages → single summary message se replace karo. Context window manage rakhna production app ka responsibility hai.',
            },
          ]}
          proTip="200K tokens kaafi bade lagte hain — lekin production mein conversations grow karte hain. Ek hour ki support chat = 50-80 messages = easily 40K+ tokens. Summarization strategy implement karo: oldest N messages ko ek crisp summary mein convert karo aur replace karo. Cost + performance dono optimize hoti hai. Long conversations ke liye ye production must-have hai."
        />
      </div>

      {/* ConceptCard 3: Streaming */}
      <div id="streaming">
        <ConceptCard
          title="Streaming — Real-time Responses"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Claude.ai use kiya hai? Wo typing effect jahan response letter by letter appear hota hai — wo streaming hai. Model ek saath poora response generate nahi karta — tokens generate karta hai aur tum instantly display karte ho. Ye sirf UI trick nahi hai — ye genuinely UX improve karta hai. 10 second blank screen vs tokens immediately dikhna — dono mein same total time hai lekin second one vastly better feels."
          whenToUse={[
            'Chatbots — natural typing effect.',
            'Long-form content generation — user dekh sakta hai progress.',
            'Code generation — user pehle kuch dekhe phir rest aaye.',
            'Any response > 2-3 seconds — streaming se UX better hoti hai.',
          ]}
          whyUseIt="UX research ka ek clear finding: users streaming responses ko 40% faster feel karte hain even when total time same hai. Kyun? Kyunki progress dikha — brain engaged rehta hai. Blank screen = anxiety. Streaming content = progress. NodeMaster jaise platform pe ye directly impacts student retention. Ek feature, measurable business impact."
          howToUse={{
            filename: 'claude-streaming.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── Node.js Streaming ────────────────────────────────────────
async function streamToConsole(): Promise<void> {
  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Node.js performance ke 5 tips batao.' }],
  });

  process.stdout.write('Claude: ');

  // Token-by-token processing
  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      process.stdout.write(chunk.delta.text); // real-time output
    }
  }

  process.stdout.write('\n');

  // Final message with usage stats
  const finalMessage = await stream.finalMessage();
  console.log('\nUsage:', finalMessage.usage);
  console.log('Stop reason:', finalMessage.stop_reason);
}

// ─── Next.js API Route — SSE Streaming ───────────────────────
// app/api/chat/route.ts
export async function POST(request: Request): Promise<Response> {
  const { message } = await request.json() as { message: string };

  const anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = anthropicClient.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: 'You are a helpful Node.js tutor.',
          messages: [{ role: 'user', content: message }],
        });

        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            // SSE format: "data: {text}\n\n"
            const data = \`data: \${JSON.stringify({ text: chunk.delta.text })}\n\n\`;
            controller.enqueue(encoder.encode(data));
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

void streamToConsole();`,
            explanation: 'client.messages.stream() ek async iterable return karta hai — for await loop se process karo. Chunk type hamesha check karo: "content_block_delta" aur delta.type "text_delta" — tabhi text content hai. finalMessage() streaming complete hone ke baad full usage stats deta hai — billing track karne ke liye zaroori. Next.js mein: SSE format use karo (Content-Type: text/event-stream).',
          }}
          realWorldScenario="NodeMaster ka AI tutor exactly yahi pattern use karta hai — student question poochhta hai, response character by character appear hota hai. Ye feel ChatGPT jaisi hai. Internally ye sirf SSE + async iteration hai — lekin user experience dramatically better lagti hai. Users is experience ko zyada 'alive' feel karte hain."
          commonMistakes={[
            {
              mistake: 'Streaming error handling nahi karna',
              why: 'Network interruption, API errors — streaming loop beech mein break ho sakta hai. Bina try-catch ke unhandled promise rejection milega.',
              fix: 'try-catch se stream loop wrap karo. Stream errors gracefully handle karo — user ko partial response ya retry option do.',
            },
          ]}
          proTip="Agar Next.js use kar rahe ho toh Vercel AI SDK (npm install ai) install karo aur useChat hook use karo — streaming automatically handle hoti hai client side. Backend mein Claude SDK se stream karo (toDataStreamResponse()), frontend mein useChat consume karo. Ye 2024-2025 ka production-grade chatbot stack hai — minimal boilerplate, maximum features."
          demo={
            <DiffBlock
              title="Non-Streaming vs Streaming UX"
              language="typescript"
              bad={{
                label: '❌ Non-Streaming — User Waits',
                code: `// User experience:
// [Spinner for 8-10 seconds]
// [Entire response appears at once]
// User doesn't know if anything is happening

const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: prompt }],
});
// Waits for FULL response — then shows everything`,
                explanation: 'Long wait → poor UX → users abandon. No progress feedback.',
              }}
              good={{
                label: '✅ Streaming — Instant Feedback',
                code: `// User experience:
// [Text starts appearing immediately]
// [Token by token — like real typing]
// [User can read while rest loads]

const stream = client.messages.stream({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: prompt }],
});

for await (const chunk of stream) {
  if (chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta') {
    displayToken(chunk.delta.text); // real-time!
  }
}`,
                explanation: 'First token in ~300ms — perceived as instant. Same total time, 10x better UX.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 4: Tool Use */}
      <div id="tool-use">
        <ConceptCard
          title="Tool Use — AI Ko Real World Access Do"
          emoji="🔧"
          difficulty="advanced"
          whatIsIt="Claude ka sabse bada limitation kya hai? Static knowledge — training cutoff ke baad ki koi baat nahi jaanta. Tool use ye problem solve karta hai. Tum tools define karo (functions), Claude decide karta hai kab use karna hai, tum execute karte ho, result wapas bhejo, Claude final answer deta hai. Claude code execute nahi karta — wo sirf JSON generate karta hai ki 'ye function yahan arguments se call karo'. Tumhara code actually kaam karta hai. Ye AI agents ka foundation hai."
          whenToUse={[
            'Database search — user query se relevant records dhundho.',
            'API calls — weather, stock prices, external services.',
            'File operations — read, write, process files.',
            'Calculations — accurate math, date parsing.',
            'Agentic workflows — Claude multiple tools use karke complex task complete kare.',
          ]}
          whyUseIt="Bina tools ke Claude ek brilliant person hai jo room mein band hai — sab jaanta hai lekin bahar nahi dekh sakta. Tools se wo phone utha sakta hai, internet dekh sakta hai, database query kar sakta hai. 'Bitcoin ka aaj ka price kya hai?' — bina tools ke Claude galat number bata dega (training cutoff). Tool use se Claude actually price API call karta hai aur accurate answer deta hai. Ye AI ko genuinely useful banata hai."
          howToUse={{
            filename: 'tool-use.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── Define tools ─────────────────────────────────────────────
const tools: Anthropic.Tool[] = [
  {
    name: 'search_database',
    description: 'Search the product database by keyword. Returns matching products.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'Search query — product name, category, or description',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return (default: 10, max: 50)',
        },
        maxPrice: {
          type: 'number',
          description: 'Filter products under this price in USD',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_product_details',
    description: 'Get detailed information about a specific product by ID.',
    input_schema: {
      type: 'object' as const,
      properties: {
        productId: {
          type: 'string',
          description: 'The unique product identifier',
        },
      },
      required: ['productId'],
    },
  },
];

// ─── Mock implementations ─────────────────────────────────────
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

async function searchDatabase(args: {
  query: string;
  limit?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  // Real implementation: DB query
  return [
    { id: 'p1', name: 'Node.js Course', price: 29, description: 'Complete Node.js' },
    { id: 'p2', name: 'TypeScript Guide', price: 19, description: 'TS mastery' },
  ].filter(p => !args.maxPrice || p.price <= args.maxPrice);
}

async function getProductDetails(args: { productId: string }): Promise<Product | null> {
  const products: Record<string, Product> = {
    p1: { id: 'p1', name: 'Node.js Course', price: 29, description: 'Complete Node.js with TypeScript' },
  };
  return products[args.productId] ?? null;
}

// ─── Tool execution dispatcher ────────────────────────────────
async function executeTool(
  name: string,
  input: Record<string, unknown>
): Promise<unknown> {
  switch (name) {
    case 'search_database':
      return searchDatabase(input as { query: string; limit?: number; maxPrice?: number });
    case 'get_product_details':
      return getProductDetails(input as { productId: string });
    default:
      throw new Error(\`Unknown tool: \${name}\`);
  }
}

// ─── Agentic loop ─────────────────────────────────────────────
async function agentLoop(userQuery: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userQuery },
  ];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      tools,
      messages,
    });

    // No tool use — final answer mil gayi
    if (response.stop_reason === 'end_turn') {
      const block = response.content[0];
      return block.type === 'text' ? block.text : '';
    }

    // Tool use — execute aur wapas do
    if (response.stop_reason === 'tool_use') {
      // Add Claude's response (including tool_use blocks) to history
      messages.push({ role: 'assistant', content: response.content });

      // Execute all requested tools
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === 'tool_use') {
          const result = await executeTool(
            block.name,
            block.input as Record<string, unknown>
          );
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(result),
          });
        }
      }

      // Return tool results to Claude
      messages.push({ role: 'user', content: toolResults });
      // Loop continues — Claude will use results to respond
    }
  }
}

// Usage
async function main(): Promise<void> {
  const answer = await agentLoop('Find me Node.js books under $50');
  console.log(answer);
}

void main();`,
            explanation: 'Agentic loop ka pattern: stop_reason check karo — "tool_use"? → tools execute karo → results wapas bhejo → loop continue. "end_turn"? → done. Multiple tools ek hi response mein possible hain — parallel execution se time bachta hai. maxIterations hamesha set karo — ek wrong tool call infinite loop create kar sakta hai aur API costs explode ho sakte hain.',
          }}
          realWorldScenario="E-commerce chatbot: user bolta hai 'Mujhe Node.js books under $50 chahiye' → Claude search_database({ query: 'Node.js books', maxPrice: 50 }) call karta hai → real-time inventory milti hai → Claude formatted recommendation deta hai. Pure LLM se better kyun? Kyunki real-time data use ho raha hai, training cutoff se nahi. Ye hai tool use ka actual production value."
          commonMistakes={[
            {
              mistake: 'Tool use response mein sirf text content check karna',
              why: 'Tool use response mein content array mein text_block aur tool_use_block dono ho sakte hain. Sirf text check karne se tool calls miss ho jaate hain.',
              fix: 'response.content array iterate karo. block.type check karo — "text" ya "tool_use". stop_reason bhi check karo — "tool_use" matlab loop continue karo.',
            },
          ]}
          proTip="Tool descriptions mein ek powerful trick: 'Use when...' sentence add karo. 'Use when user asks about current inventory or product availability' — ye Claude ko exactly batata hai kab tool call karna hai. Vague descriptions = wrong tool selection = bad responses. Tool description quality = agent intelligence. Aur Sonnet/Opus use karo tool calling ke liye — Haiku complex scenarios mein less reliable hai."
        />
      </div>

      {/* ConceptCard 5: Prompt Caching */}
      <div id="prompt-caching">
        <ConceptCard
          title="Prompt Caching — 90% Cost Reduce"
          emoji="💰"
          difficulty="intermediate"
          whatIsIt="Ye feature sirf Anthropic ke paas hai — aur isko samjho toh cost dramatically kam ho sakti hai. Prompt caching matlab: ek large prompt section (1024+ tokens) Anthropic ke servers pe 5 minute ke liye cache ho jaata hai. Cache hit pe: 90% cost reduction — seriously, 90%. Agar tumhare paas 10K token ka system prompt hai jo har request mein repeat hota hai, toh caching se 90% input cost bachti hai."
          whenToUse={[
            'Large system prompts (1000+ tokens) jo har request mein repeat hote hain.',
            'Document analysis — ek bada document baar baar different questions ke liye.',
            'RAG (Retrieval Augmented Generation) — retrieved context jo similar queries share karte hain.',
            'Few-shot examples — lamba examples section jo fixed rahta hai.',
          ]}
          whyUseIt="Calculate karo: 10K token system prompt × 1000 requests/day = 10M tokens/day sirf system prompt ke liye. Sonnet pe ye $30/day hai. Caching se same data sirf pehli baar charge hota hai (full price), phir har cache hit pe 90% discount. Effective cost drops to ~$3/day. Monthly: $900 ki jagah $90. Ye real money hai. TTL 5 minute hai — frequent requests mein hamesha cache warm rehta hai."
          howToUse={{
            filename: 'prompt-caching.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── Caching a large system prompt ───────────────────────────
const largeDocumentContent = \`
[Imagine 5000+ words of product documentation here]
Node.js Complete Guide: Module system, Event loop, Streams,
HTTP, Express, Authentication, Databases, Testing, Deployment...
[This repeats across many user questions]
\`;

async function queryWithCaching(userQuestion: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: largeDocumentContent,
        cache_control: { type: 'ephemeral' }, // Cache this! 5 minute TTL
      },
      {
        type: 'text',
        // This part NOT cached — changes per request
        text: 'Answer the user\'s question based on the documentation above. Be concise.',
      },
    ],
    messages: [{ role: 'user', content: userQuestion }],
  });

  // Check cache performance
  const usage = response.usage;
  console.log('Input tokens:', usage.input_tokens);
  console.log('Cache read tokens:', (usage as Anthropic.Usage & { cache_read_input_tokens?: number }).cache_read_input_tokens ?? 0);
  console.log('Cache creation tokens:', (usage as Anthropic.Usage & { cache_creation_input_tokens?: number }).cache_creation_input_tokens ?? 0);
  // cache_read = cached hits (cheap!) — ~10% of normal cost
  // cache_creation = first time caching (normal price)

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── Caching in conversation with large context ───────────────
async function cachedConversation(
  systemContext: string,
  conversationHistory: Anthropic.MessageParam[],
  newUserMessage: string
): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: systemContext,
        cache_control: { type: 'ephemeral' }, // Cache stable context
      },
    ],
    messages: [
      ...conversationHistory,
      { role: 'user', content: newUserMessage },
    ],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── RAG with caching ─────────────────────────────────────────
async function ragWithCaching(
  retrievedDocuments: string[],
  userQuery: string
): Promise<string> {
  const docsContext = retrievedDocuments.join('\n\n---\n\n');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: \`You are a knowledgeable assistant. Answer questions based on the provided documents.

DOCUMENTS:
\${docsContext}\`,
        cache_control: { type: 'ephemeral' }, // Cache retrieved docs
      },
    ],
    messages: [{ role: 'user', content: userQuery }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

async function main(): Promise<void> {
  // First call — cache created (normal price)
  const r1 = await queryWithCaching('Event loop kya hai?');
  console.log(r1);

  // Second call within 5 min — cache hit (90% cheaper!)
  const r2 = await queryWithCaching('Streams explain karo');
  console.log(r2);
}

void main();`,
            explanation: 'cache_control: { type: "ephemeral" } mark karo us text block pe jo repeat hoga. Pehli request: cache_creation_input_tokens dekhoge (full price + 25% premium for caching). Baad ki requests: cache_read_input_tokens — sirf 10% cost. Net savings massive hai. Minimum 1024 tokens chahiye Sonnet pe cache eligible hone ke liye — chote content cache nahi hoga.',
          }}
          realWorldScenario="NodeMaster jaise platform pe: course documentation (50K tokens) cache karo, thousands of student questions same content se answer ho — 90% cost saving guaranteed. Bina caching ke ye 10x expensive hoga. Ye exactly wahi hai jo Claude API ko production apps mein economically viable banata hai — bina caching ke large language models expensive ho jaate hain at scale."
          commonMistakes={[
            {
              mistake: 'Chote content ko cache karne ki koshish karna',
              why: 'Claude Sonnet par minimum 1024 tokens chahiye cache eligible hone ke liye. Chota content cache nahi hoga — silently non-cached response milega.',
              fix: 'cache_creation_input_tokens monitor karo — agar 0 hai toh content cache nahi hua (too short). Large system prompts aur documents ke liye hi cache use karo.',
            },
          ]}
          proTip="Cache hit rate monitor karo: cache_read_tokens / (cache_read_tokens + cache_creation_tokens). Agar hit rate low hai, toh ya requests kaafi frequent nahi hain (5 min TTL miss ho raha hai), ya content below 1024 token threshold hai. Production debugging tip: cache_creation_input_tokens pehli request mein 0 se zyada hona chahiye — agar 0 hai toh cache nahi hua."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 9 Quiz — Claude API
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye pass ke liye. Claude API master ban gaye ho?
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="claude-api" />
      </div>
    </div>
  )
}
