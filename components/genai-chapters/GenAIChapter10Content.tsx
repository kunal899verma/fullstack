'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const chatAppsQuiz = [
  {
    question: 'Chat app mein messages array ko persist karna kyun zaroori hai?',
    options: [
      { text: 'Ye zaroori nahi — model khud yaad rakhta hai', correct: false, explanation: 'LLMs stateless hain — har request independent hoti hai. Conversation history aap manage karte ho.' },
      { text: 'LLM stateless hai — conversation context manually maintain karna padta hai', correct: true, explanation: 'Bilkul sahi! Har API call independent hai. Previous messages array mein include karo nahin toh model context nahi jaanta.' },
      { text: 'Sirf database ke liye', correct: false, explanation: 'Messages array API request mein bhejna padta hai — DB optional extra step hai.' },
      { text: 'Rate limiting ke liye', correct: false, explanation: 'Messages persistence conversation continuity ke liye hai, rate limiting ke liye nahi.' },
    ],
  },
  {
    question: 'Vercel AI SDK useChat hook kya karta hai?',
    options: [
      { text: 'Sirf UI components deta hai', correct: false, explanation: 'useChat state management + streaming + API calls sab handle karta hai.' },
      { text: 'Messages state, streaming, API calls, aur loading state sab automatically manage karta hai', correct: true, explanation: 'Sahi! useChat se: messages state, input handling, form submit, streaming display, error handling — sab built-in. Boilerplate drastically reduce hoti hai.' },
      { text: 'Sirf TypeScript projects ke liye', correct: false, explanation: 'useChat JavaScript aur TypeScript dono mein use ho sakta hai.' },
      { text: 'Backend server replace karta hai', correct: false, explanation: '/api/chat route still chahiye — useChat sirf client-side hook hai.' },
    ],
  },
  {
    question: 'Context window management mein sliding window approach kya karta hai?',
    options: [
      { text: 'Purani messages delete karta hai permanently', correct: false, explanation: 'DB mein messages store rehti hain — window sirf API request ke liye trim karta hai.' },
      { text: 'Most recent N messages include karta hai API request mein — context limit maintain hoti hai', correct: true, explanation: 'Correct! Purani messages drop hoti hain API request se — context limit stay within. DB mein sab store hota hai for history display.' },
      { text: 'Messages compress karta hai', correct: false, explanation: 'Compression alag approach hai — sliding window simply oldest messages exclude karta hai.' },
      { text: 'Multiple API calls parallel karta hai', correct: false, explanation: 'Sliding window single API call optimization hai — parallelism alag concept hai.' },
    ],
  },
  {
    question: 'System prompt engineering for chat bots mein kya include karna chahiye?',
    options: [
      { text: 'Sirf bot ka naam', correct: false, explanation: 'Naam toh chahiye lekin sirf naam se complete persona nahi banta.' },
      { text: 'Persona, behavior constraints, response format, aur capabilities/limitations clearly define karo', correct: true, explanation: 'Bilkul sahi! Clear system prompt se consistent bot behavior milti hai. Persona + constraints + format + scope sab define karo.' },
      { text: 'Training data include karo', correct: false, explanation: 'Training data system prompt mein nahi hoti — model already trained hai. Few-shot examples dono se alag hain.' },
      { text: 'User ka naam store karo', correct: false, explanation: 'User-specific info system prompt mein nahi — messages mein inject karo ya dynamic interpolation use karo.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter10Content() {
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
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          AI Chat Apps — Ek Complete Chat Interface Banao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Theory se practical: is chapter mein ek complete AI chat application banate hain — Next.js, Vercel AI SDK, streaming UI, context management, aur system prompt engineering ke saath.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          End of chapter par aapke paas production-ready chat app ka foundation hoga — ChatGPT jaisi experience build karne ke liye.
        </p>
      </div>

      {/* ConceptCard 1: Chat App Architecture */}
      <div id="architecture">
        <ConceptCard
          title="Chat App Architecture"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="Chat app mein messages array conversation ka DNA hai — har message role aur content ke saath. LLM stateless hai — conversation history hamesha API request ke saath bhejna padta hai. Architecture: Client (UI) → API route → LLM → stream back."
          whenToUse={[
            'Customer support chatbot banana',
            'AI assistant with conversation memory',
            'Code review bot, document Q&A',
            'Any interactive LLM-powered interface',
          ]}
          whyUseIt="Messages array pattern simple aur powerful hai. Client-side state mein rakho (useChat) ya server-side DB mein persist karo. Streaming se UX excellent — partial responses immediately display. API route separation se backend flexibility milti hai — model switch karo bina frontend change kiye."
          howToUse={{
            filename: 'app/api/chat/route.ts',
            language: 'typescript',
            code: `// Next.js App Router API Route — Chat Endpoint
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge' // Edge runtime — faster globally

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Messages validate karo
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Invalid messages', { status: 400 })
  }

  // Context window management — last 20 messages only
  const recentMessages = messages.slice(-20)

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: \`You are a helpful AI assistant for NodeMaster, a Node.js learning platform.

Your role:
- Answer Node.js, JavaScript, and TypeScript questions
- Explain concepts clearly with examples
- Be encouraging and patient with beginners
- Provide working code snippets when helpful

Constraints:
- Stay focused on Node.js and web development topics
- If unsure, say so — don't hallucinate
- Keep responses concise unless detail is requested
- Use Hinglish if user writes in Hindi/Hinglish\`,
    messages: recentMessages,
    maxTokens: 1000,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}`,
            explanation: 'Edge runtime se cold start minimal aur global distribution. streamText Vercel AI SDK se — automatically streaming response banata hai. recentMessages slice karo — context window management built-in. toDataStreamResponse() useChat hook ke saath compatible format deta hai.',
          }}
          realWorldScenario="NodeMaster platform par ek AI tutor chat implement karna tha. Architecture: Next.js frontend + /api/chat edge route + GPT-4o-mini. 500 concurrent users handle hote hain easily. Average latency: 200ms to first token globally (Edge deployment). Monthly cost: $50 (2M messages at $0.15/1M input tokens approximate)."
          commonMistakes={[
            {
              mistake: 'Messages array client se nahi bheja, sirf latest message bheja',
              why: 'Model conversation history nahi jaanta — har message isolated hoti hai. "Pichle se related" questions ka answer nahi de paata.',
              fix: 'Complete messages array bhejo — system + all previous + latest user message. useChat hook automatically handle karta hai.',
            },
            {
              mistake: 'API route mein authentication nahi',
              why: 'Public API route = anyone abuse kar sakta hai — unlimited API calls, cost explosion.',
              fix: 'NextAuth ya Clerk se authentication add karo. API route mein session check karo. Rate limiting per user implement karo.',
            },
          ]}
          proTip="Persistent conversation storage: Supabase ya PlanetScale mein messages store karo. User ek device par chat shuru kare, dusre par continue kare. Conversation ID se conversations group karo. This is what ChatGPT's conversation history does — simple concept, excellent UX."
        />
      </div>

      {/* ConceptCard 2: Streaming UI */}
      <div id="streaming-ui">
        <ConceptCard
          title="Streaming UI — Typing Effect"
          emoji="⌨️"
          difficulty="intermediate"
          whatIsIt="Streaming UI mein tokens one by one display hote hain — ChatGPT ka typing effect. ReadableStream, Server-Sent Events, ya Vercel AI SDK se implement karo. useChat hook streaming sab automatically handle karta hai."
          whenToUse={[
            'Long responses — blank screen avoid karo',
            'Chat interfaces — natural conversation feel',
            'Live code generation — partial output show karo',
            'Any AI output jahan users wait karte hain',
          ]}
          whyUseIt="Streaming UX: user pehle token 0.5 second mein dekhta hai, engaged rehta hai. Non-streaming: 5-8 second blank screen — users abandon. Psychological impact: typing effect = model 'thinking' feel = more human-like. Conversion rate improve hoti hai."
          howToUse={{
            filename: 'app/chat/page.tsx',
            language: 'typescript',
            code: `'use client'

import { useChat } from 'ai/react'
import { useRef, useEffect } from 'react'

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,            // Streaming rok sakte ho
    reload,          // Last message regenerate karo
  } = useChat({
    api: '/api/chat',
    onError: (err) => console.error('Chat error:', err),
    onFinish: (message) => {
      // Message complete hone par callback
      console.log('Message complete:', message.content.slice(0, 50))
    },
  })

  // Auto-scroll to bottom
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl mb-2">NodeMaster AI Tutor</p>
            <p className="text-sm">Node.js ke baare mein kuch bhi poochho!</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${message.role === 'user' ? 'justify-end' : 'justify-start'}\`}
          >
            <div
              className={\`max-w-[80%] rounded-2xl px-4 py-3 \${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }\`}
            >
              <p className="text-sm font-semibold mb-1">
                {message.role === 'user' ? 'You' : 'AI Tutor'}
              </p>
              {/* Streaming mein content gradually appear hota hai */}
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: \`\${i * 0.15}s\` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Node.js ke baare mein poochho..."
          disabled={isLoading}
          className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none"
        />
        {isLoading ? (
          <button type="button" onClick={stop} className="px-4 py-3 bg-red-500 text-white rounded-xl">
            Stop
          </button>
        ) : (
          <button type="submit" className="px-4 py-3 bg-blue-600 text-white rounded-xl">
            Send
          </button>
        )}
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>
      )}
    </div>
  )
}`,
            explanation: 'useChat hook sab handle karta hai — messages state, streaming, API calls. message.content streaming ke dauran gradually fill hota hai — React automatically re-render karta hai. stop() se streaming mid-way rok sakte ho. bottomRef se auto-scroll works perfectly.',
          }}
          realWorldScenario="Customer service chat widget mein streaming add kiya. Without streaming: average 6 second wait — 45% users abandoned. With streaming: first words 0.6 second, engagement 85%. Conversion rate (issue resolved) 23% improved. Simple change, measurable business impact."
          commonMistakes={[
            {
              mistake: 'Custom streaming implementation without useChat',
              why: 'SSE parsing, state management, error handling — 200+ lines of complex code. Bugs probable.',
              fix: 'useChat use karo — battle-tested, handles edge cases. Custom implementation sirf agar specific requirements hain jo useChat support nahi karta.',
            },
            {
              mistake: 'Code blocks aur markdown streaming mein render nahi karna',
              why: 'Model code ```javascript blocks mein deta hai — plain text mein ugly lagta hai.',
              fix: 'react-markdown + react-syntax-highlighter use karo. message.content ko markdown parse karo. useChat ke saath easily integrate hota hai.',
            },
          ]}
          proTip="AI SDK Core primitives (streamText, streamObject) se custom hooks bana sakte ho. generateText non-streaming hai — batch processing ke liye useful. streamObject se JSON streaming hoti hai — partial JSON updates real-time receive karo. Ye advanced use cases ke liye powerful primitives hain."
        />
      </div>

      {/* ConceptCard 3: Vercel AI SDK */}
      <div id="vercel-ai-sdk">
        <ConceptCard
          title="Vercel AI SDK — useChat Hook"
          emoji="🚀"
          difficulty="intermediate"
          whatIsIt="Vercel AI SDK Next.js mein AI features fastest way se add karne ka tool hai. useChat hook complete chat functionality deta hai — messages, streaming, loading state, error handling. Provider-agnostic — OpenAI, Anthropic, Google sab support."
          whenToUse={[
            'Next.js projects mein AI chat add karna',
            'Streaming responses UI mein',
            'Multiple AI providers support chahiye',
            'Production-ready chat quickly banana',
          ]}
          whyUseIt="Vercel AI SDK boilerplate eliminate karta hai. useChat = complete chat solution in one hook. streamText = server-side streaming. streamObject = structured streaming. Provider switch karo configuration se — code change minimal. Edge runtime optimized."
          howToUse={{
            filename: 'ai-sdk-setup.ts',
            language: 'typescript',
            code: `// Installation
// npm install ai @ai-sdk/openai @ai-sdk/anthropic

// ── API Route Setup ────────────────────────────────────────────────────────
// app/api/chat/route.ts
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'

export async function POST(req: Request) {
  const { messages, model = 'openai' } = await req.json()

  // Provider switch karo easily
  const aiModel = model === 'anthropic'
    ? anthropic('claude-3-5-haiku-20241022')
    : openai('gpt-4o-mini')

  const result = await streamText({
    model: aiModel,
    messages,
    system: 'You are a helpful assistant.',
    maxTokens: 1000,
  })

  return result.toDataStreamResponse()
}

// ── Client Hook ────────────────────────────────────────────────────────────
// components/Chat.tsx
'use client'
import { useChat } from 'ai/react'

export function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setMessages, // Manually messages update karo
    append,      // New message programmatically add karo
  } = useChat({
    api: '/api/chat',

    // Initial messages (conversation history load karo)
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Namaste! Kaise help kar sakta hun?' },
    ],

    // Body extra data bhejo
    body: { userId: 'user-123', model: 'openai' },

    onResponse: (response) => {
      // Response stream start hone par
      console.log('Stream started:', response.status)
    },

    onFinish: (message) => {
      // Message complete hone par — DB mein save karo
      saveMessageToDb(message)
    },

    onError: (error) => {
      console.error('Chat error:', error)
    },
  })

  // Programmatic message — button click se
  const addSystemMessage = () => {
    append({
      role: 'user',
      content: 'Give me a Node.js tip!',
    })
  }

  return <div>{/* Chat UI */}</div>
}

async function saveMessageToDb(message: { id: string; content: string; role: string }) {
  await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(message),
  })
}`,
            explanation: 'body field se extra data API route mein milta hai (req.body). initialMessages se conversation history load hoti hai on mount. append() se programmatic messages add karo — suggestion chips, quick replies ke liye useful.',
          }}
          realWorldScenario="AI tutoring platform 3 different providers test karna chahta tha (OpenAI, Anthropic, Google). Vercel AI SDK se: ek /api/chat route, body mein provider bhejo, same useChat hook client par — A/B test 1 day mein setup. Provider switch zero frontend changes. Quality comparison dashboard mein easily."
          commonMistakes={[
            {
              mistake: 'useChat without api prop',
              why: 'Default api: "/api/chat" assume karta hai — agar route different hai toh 404 error.',
              fix: 'Explicitly api: "/api/your-chat-route" specify karo. Environment-based URL use karo: api: process.env.NEXT_PUBLIC_CHAT_API ?? "/api/chat".',
            },
            {
              mistake: 'Messages directly mutate karna (messages.push)',
              why: 'React state directly mutate karna prohibited — UI update nahi hogi ya crash ho sakta hai.',
              fix: 'setMessages function use karo: setMessages(prev => [...prev, newMessage]). Append hook bhi available hai.',
            },
          ]}
          proTip="useCompletion hook single-turn text completion ke liye — conversation history nahi, sirf prompt → completion. Faster for simple tasks. useAssistant hook OpenAI Assistants API ke saath — threads, file search built-in. Task ke hisaab se right hook choose karo."
        />
      </div>

      {/* ConceptCard 4: Context Window Management */}
      <div id="context-management">
        <ConceptCard
          title="Context Window Management"
          emoji="🪟"
          difficulty="intermediate"
          whatIsIt="Long conversations context window limit hit karti hain — API error ya quality degradation. Strategies: sliding window (recent N messages), conversation summarization, aur hybrid approach. Users ko limit feel nahi hona chahiye."
          whenToUse={[
            'Long conversations — 30+ turns',
            'Document Q&A — large documents',
            'Support tickets — long history',
            'Any chat app going beyond 50K tokens',
          ]}
          whyUseIt="GPT-4o 128K context hai lekin $2.5/1M tokens — long context expensive. Context limit exceed karne par API error. User ka pura conversation history server par hona chahiye (DB), lekin API request mein sirf relevant portion bhejo."
          howToUse={{
            filename: 'context-management.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ── Strategy 1: Sliding Window ────────────────────────────────────────────
function slidingWindow(messages: Message[], maxMessages = 20): Message[] {
  // Always include first message (might be important context)
  // + last N-1 messages (most recent)
  if (messages.length <= maxMessages) return messages

  const firstMessage = messages[0]
  const recentMessages = messages.slice(-(maxMessages - 1))

  return [firstMessage, ...recentMessages]
}

// ── Strategy 2: Token-Based Trimming ─────────────────────────────────────
function trimToTokenLimit(
  messages: Message[],
  maxTokens = 80_000, // Leave room for response
): Message[] {
  const trimmed: Message[] = []
  let tokenCount = 0

  // Reverse iterate — most recent first
  for (let i = messages.length - 1; i >= 0; i--) {
    const estimatedTokens = Math.ceil(messages[i].content.length / 4)
    if (tokenCount + estimatedTokens > maxTokens) break

    trimmed.unshift(messages[i])
    tokenCount += estimatedTokens
  }

  return trimmed
}

// ── Strategy 3: Conversation Summarization ───────────────────────────────
async function summarizeConversation(
  oldMessages: Message[],
): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-3-5-haiku-20241022', // Cheap model for summarization
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: \`Summarize this conversation concisely (key points, decisions, context):

\${oldMessages.map(m => \`\${m.role}: \${m.content}\`).join('\n\n')}\`,
    }],
  })

  return response.content[0].type === 'text' ? response.content[0].text : ''
}

// ── Hybrid Approach (Production Recommended) ──────────────────────────────
async function getContextForAPI(
  allMessages: Message[],
  summarizeAfter = 30,
): Promise<Message[]> {
  if (allMessages.length <= summarizeAfter) {
    return allMessages // Short conversation — sab bhejo
  }

  // Old messages summarize karo
  const oldMessages = allMessages.slice(0, -10)
  const recentMessages = allMessages.slice(-10)

  const summary = await summarizeConversation(oldMessages)

  return [
    {
      role: 'user' as const,
      content: \`[Previous conversation summary: \${summary}]\`,
    },
    {
      role: 'assistant' as const,
      content: 'I understand the conversation context from the summary.',
    },
    ...recentMessages,
  ]
}`,
            explanation: 'Sliding window simplest aur cheapest — no extra API calls. Summarization zyada context preserve karta hai — extra API call. Hybrid: summarize old, keep recent. Tiktoken se exact token count karo estimate ke liye accurate trim.',
          }}
          realWorldScenario="Support chatbot mein users average 45-minute sessions — 80+ messages. Sliding window 20 se recent context OK tha. Lekin pehle reported issues bhul jaata tha. Hybrid: first 5 messages + summary of middle + last 15 — 95% user satisfaction. Context preserved without limit issues."
          commonMistakes={[
            {
              mistake: 'Context trim karna bina user ko bataye',
              why: 'User confusion: "Maine pehle bataya tha..." — bot: "Mujhe nahi pata".',
              fix: 'User ko indicator dikhao ki context trimmed hai: "Purani conversation summarize ho gayi hai..." Ya simply seamlessly handle karo with good summarization.',
            },
            {
              mistake: 'System prompt tokens context budget mein count nahi karna',
              why: 'Long system prompt + conversation = limit hit unexpected. API error.',
              fix: 'Total budget = max_context - system_prompt_tokens - response_buffer. Remaining = conversation ke liye. System prompt optimize karo agar too long.',
            },
          ]}
          proTip="Mem0 ya Zep — conversation memory management libraries hain. Automatically important facts extract karte hain, long-term memory store karte hain, relevant memories retrieve karte hain. Production-grade memory management bina custom implementation ke. Enterprise chat apps ke liye excellent."
        />
      </div>

      {/* ConceptCard 5: System Prompt Engineering */}
      <div id="system-prompts">
        <ConceptCard
          title="System Prompt Engineering for Chat Bots"
          emoji="📋"
          difficulty="intermediate"
          whatIsIt="System prompt chat bot ka DNA hai — persona, behavior, constraints, response format sab define hota hai. Well-crafted system prompt se consistent, high-quality responses milti hain. Poor system prompt = inconsistent, off-brand bot."
          whenToUse={[
            'Customer service bot — company tone aur policies define karo',
            'Educational assistant — explanation style define karo',
            'Domain-specific bot — constraints set karo',
            'Multi-language support — language rules define karo',
          ]}
          whyUseIt="System prompt ek baar likhte hain, har conversation mein apply hota hai. User experience consistent rehta hai — chahe koi bhi agent ho. Persona + constraints + format clearly define karne se off-topic responses, hallucinations, tone mismatches dramatically reduce hote hain."
          howToUse={{
            filename: 'system-prompt-template.ts',
            language: 'typescript',
            code: `// Effective System Prompt Template

const CUSTOMER_SUPPORT_SYSTEM_PROMPT = \`
You are Aria, the customer support AI for ShopEasy, India's leading e-commerce platform.

## Your Persona
- Name: Aria
- Tone: Professional, warm, patient, empathetic
- Language: English and Hinglish (mix Hindi+English naturally if user does)
- Personality: Helpful, solution-focused, never frustrated

## Your Capabilities
- Order status, tracking, delivery updates
- Return and refund initiation
- Payment issue resolution
- Product information and recommendations
- Account management (password reset, profile update)

## Your Constraints
- NEVER make up order information — only what you're provided
- NEVER promise specific compensation without approval
- NEVER discuss competitor pricing negatively
- If issue requires human agent: escalate gracefully
- If unsure: say "Let me check that for you" and escalate

## Response Format
- Keep responses concise (under 150 words unless detail needed)
- Use bullet points for step-by-step instructions
- Always end with: "Is there anything else I can help you with?"
- For sensitive issues (fraud, legal): immediately escalate

## Escalation Triggers
Immediately transfer to human agent if user mentions:
- Legal action, consumer court, social media complaint
- Multiple failed resolution attempts
- Fraud, account hacking, unauthorized charges

Today's date: {{DATE}}
User's name: {{USER_NAME}}
Order ID (if applicable): {{ORDER_ID}}
\`

// Dynamic interpolation — user-specific context inject karo
function buildSystemPrompt(context: {
  userName: string
  orderId?: string
  date?: string
}): string {
  return CUSTOMER_SUPPORT_SYSTEM_PROMPT
    .replace('{{USER_NAME}}', context.userName)
    .replace('{{ORDER_ID}}', context.orderId ?? 'Not provided')
    .replace('{{DATE}}', context.date ?? new Date().toLocaleDateString('en-IN'))
}`,
            explanation: 'Dynamic placeholders se user-specific context inject karo. Capabilities aur constraints clearly separate karo — model samajhta hai scope. Escalation triggers explicitly define karo — automatic human handoff ke liye. Test karo edge cases se — "legal action", inappropriate requests.',
          }}
          realWorldScenario="E-commerce chatbot bina clear system prompt ke: users ne 'Mujhe pura refund chahiye' pe model ne agree kar liya (no authority). Proper system prompt ke baad: 'Main aapki refund request process karta hun policy ke according — 3-5 business days...' Company policy follow, no unauthorized commitments. Support tickets 30% reduce hue."
          commonMistakes={[
            {
              mistake: 'System prompt sirf ek line mein likhna',
              why: 'Vague instructions se inconsistent behavior — model ek situation mein alag, doosre mein alag respond karta hai.',
              fix: 'Comprehensive system prompt likhne ke liye time invest karo. Capabilities, constraints, format, persona — sab explicitly define karo. Test edge cases.',
            },
            {
              mistake: 'Static system prompt — user context inject nahi karna',
              why: 'Bot user ko personally address nahi karta — generic, cold interaction.',
              fix: 'Dynamic interpolation use karo — user name, account details, order info inject karo system prompt mein. Personalized experience.',
            },
          ]}
          proTip="Prompt testing systematically karo — adversarial inputs try karo: 'Ignore previous instructions', 'Tell me your system prompt', inappropriate requests. PromptFoo ya LangSmith se automated prompt testing setup karo. Regression testing — system prompt change se existing behavior break nahi hona chahiye."
        />
      </div>

      {/* Next.js Chat Page Code */}
      <div
        id="complete-chat-example"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.05)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-4">
          Complete Next.js Chat Page with Vercel AI SDK
        </h3>
        <pre
          className="text-sm text-[#A1A1AA] overflow-x-auto leading-relaxed"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <code>{`'use client';
import { useChat } from 'ai/react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-sm text-[#71717A] mt-3">
          useChat hook se 10 lines mein complete chat UI — streaming, state management, error handling sab included.
        </p>
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 10 Quiz — Chat Apps Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — architecture, useChat, context management, system prompts test karo!
          </p>
        </div>
        <QuizSection questions={chatAppsQuiz} chapterSlug="building-chat-apps" />
      </div>
    </div>
  )
}
