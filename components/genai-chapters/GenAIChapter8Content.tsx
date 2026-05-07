'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const openaiQuiz = [
  {
    question: 'GPT-4o-mini kab use karna chahiye GPT-4o ki jagah?',
    options: [
      { text: 'Hamesha — GPT-4o slow hai', correct: false, explanation: 'GPT-4o sirf slow nahi, significantly better quality deta hai complex tasks mein.' },
      { text: 'Simple tasks, high volume, cost-sensitive scenarios mein', correct: true, explanation: 'Sahi! GPT-4o-mini $0.15/1M tokens (input), GPT-4o $2.5/1M tokens. Simple classification, extraction, routing ke liye mini kaafi hai.' },
      { text: 'Sirf image tasks ke liye', correct: false, explanation: 'Dono vision support karte hain. Model choice task complexity aur cost par depend karta hai.' },
      { text: 'Code generation ke liye hamesha mini better hai', correct: false, explanation: 'Complex code ke liye GPT-4o significantly better hai — mini simpler code ke liye suitable hai.' },
    ],
  },
  {
    question: 'Function calling (tools) ka primary use case kya hai?',
    options: [
      { text: 'JavaScript functions run karna model mein', correct: false, explanation: 'LLM code execute nahi karta — structured data output karta hai jo aap execute karte ho.' },
      { text: 'Model se structured JSON output nikalna aur external systems integrate karna', correct: true, explanation: 'Bilkul sahi! Function calling se model decide karta hai kaunsa function call karna hai, arguments bhejta hai — aap execute karte ho. Reliable structured output aur tool use.' },
      { text: 'Model ko faster banana', correct: false, explanation: 'Function calling speed optimization nahi hai — capability extension hai.' },
      { text: 'Conversation history store karna', correct: false, explanation: 'Conversation history messages array mein manually manage karna padta hai.' },
    ],
  },
  {
    question: 'Streaming (stream: true) kab use karna chahiye?',
    options: [
      { text: 'Hamesha — streaming hamesha fast hoti hai', correct: false, explanation: 'Total latency same rehti hai — perceived latency improve hoti hai (first token fast aata hai).' },
      { text: 'Long responses ke liye — user ko typing effect dikhana chahiye, immediate feedback chahiye', correct: true, explanation: 'Correct! Streaming se first token jaldi milta hai — user blank screen nahi dekhta. Long responses ke liye UX dramatically improve hoti hai.' },
      { text: 'Short one-word answers ke liye', correct: false, explanation: 'Short responses ke liye streaming overhead add karta hai — wait karo complete response ke liye.' },
      { text: 'Sirf backend processing ke liye — UI mein nahi', correct: false, explanation: 'Streaming primarily UI ke liye hai — typing effect. Backend processing mein complete response wait karo.' },
    ],
  },
  {
    question: 'Embeddings API kab use karte hain?',
    options: [
      { text: 'Text ko images mein convert karne ke liye', correct: false, explanation: 'Embeddings numerical vectors hain — image generation different API hai (DALL-E).' },
      { text: 'Semantic search, similarity, aur clustering ke liye — text ko numerical vectors mein convert karo', correct: true, explanation: 'Sahi! Embeddings dense vector representations hain — similar text similar vectors. RAG, semantic search, recommendation systems ke liye essential.' },
      { text: 'Chat responses generate karne ke liye', correct: false, explanation: 'Chat ke liye chat.completions.create() use karo. Embeddings representation ke liye hain.' },
      { text: 'Grammar check karne ke liye', correct: false, explanation: 'Grammar check ke liye chat completion ya fine-tuned model use karo.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter8Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(245,158,11,0.06)',
          border: '1px solid rgba(245,158,11,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          OpenAI API — Complete Developer Guide
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          OpenAI API se GPT-4o, GPT-4o-mini, Embeddings, aur function calling use karo. Is chapter mein practical code ke saath complete guide — setup se leke streaming, function calling, aur embeddings tak.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Production-ready patterns ke saath — error handling, retry logic, cost optimization sab cover karenge.
        </p>
      </div>

      {/* ConceptCard 1: Setup & Models */}
      <div id="setup-models">
        <ConceptCard
          title="Setup & Models — Kaunsa Model Kab?"
          emoji="🤖"
          difficulty="intermediate"
          whatIsIt="OpenAI API se GPT-4o, GPT-4o-mini aur other models use karo. API key chahiye, npm package install karo, aur shuru karo. Model choice quality aur cost ka tradeoff hai — simple tasks ke liye mini, complex ke liye full GPT-4o."
          whenToUse={[
            'GPT-4o-mini — classification, extraction, simple Q&A, high volume',
            'GPT-4o — complex reasoning, code, multi-step tasks, vision',
            'text-embedding-3-small — semantic search, RAG, similarity',
            'DALL-E 3 — image generation',
          ]}
          whyUseIt="Sahi model choose karne se cost 10-20x kam ho sakti hai quality compromise kiye bina. GPT-4o-mini $0.15/1M input tokens vs GPT-4o $2.5/1M tokens. High volume apps mein mini se lakhs ki bachaat. Quality tasks mein GPT-4o better results."
          howToUse={{
            filename: 'openai-setup.ts',
            language: 'typescript',
            code: `// npm install openai
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Never hardcode!
  // Optional configurations:
  // maxRetries: 3,        // Automatic retries on 429/5xx
  // timeout: 30_000,      // 30 second timeout
  // organization: 'org-xxx', // If using org key
})

// Model comparison table:
const MODELS = {
  'gpt-4o': {
    input: 2.50,     // $ per 1M tokens
    output: 10.00,
    context: 128_000,
    strengths: 'Complex reasoning, code, multimodal',
  },
  'gpt-4o-mini': {
    input: 0.150,    // $ per 1M tokens (17x cheaper!)
    output: 0.600,
    context: 128_000,
    strengths: 'Simple tasks, high volume, fast',
  },
  'o1-preview': {
    input: 15.00,    // Premium reasoning model
    output: 60.00,
    context: 128_000,
    strengths: 'Complex math, science, multi-step reasoning',
  },
  'o1-mini': {
    input: 3.00,
    output: 12.00,
    context: 128_000,
    strengths: 'Coding, reasoning, cheaper than o1-preview',
  },
} as const

// Model selection utility
function chooseModel(taskComplexity: 'simple' | 'medium' | 'complex'): string {
  switch (taskComplexity) {
    case 'simple': return 'gpt-4o-mini'
    case 'medium': return 'gpt-4o-mini' // Usually sufficient
    case 'complex': return 'gpt-4o'
  }
}`,
            explanation: 'OPENAI_API_KEY env var mein rakho — never hardcode. maxRetries SDK mein automatic rate limit handling karta hai. Pricing verify karo openai.com/pricing — regularly change hoti hai.',
          }}
          realWorldScenario="Content moderation app: 1M daily posts classify karna tha. GPT-4o par: $2500/day sirf input. GPT-4o-mini par: $150/day. Quality test kiya — 95% accuracy dono par. Mini use kiya — $2350/day saved. Edge cases ke liye sirf GPT-4o route karo — 5% escalation = $125/day extra. Total savings: $2225/day."
          commonMistakes={[
            {
              mistake: 'API key hardcode karna source code mein',
              why: 'GitHub par push hone par bots immediately scan karte hain — key within minutes misused hoti hai.',
              fix: '.env file mein OPENAI_API_KEY=sk-... rakho. .gitignore mein .env add karo. Production mein secret manager use karo.',
            },
            {
              mistake: 'Sab tasks ke liye GPT-4o use karna by default',
              why: 'Unnecessary cost — 17x zyada expensive without quality benefit for simple tasks.',
              fix: 'Task ki complexity judge karo. Simple extraction/classification → mini. Complex reasoning → GPT-4o. Test karo both, compare quality.',
            },
          ]}
          proTip="Structured outputs (response_format: { type: 'json_schema' }) se reliable JSON milta hai — parse errors avoid hote hain. SDK automatically retry karta hai rate limits par — production mein kaafi reliable. Monitor usage: platform.openai.com/usage se daily tracking."
        />
      </div>

      {/* ConceptCard 2: Chat Completions */}
      <div id="chat-completions">
        <ConceptCard
          title="Chat Completions — Messages API"
          emoji="💬"
          difficulty="intermediate"
          whatIsIt="OpenAI chat completions API messages array-based hai — system, user, aur assistant roles se conversation structure banao. Parameters: temperature, max_tokens, top_p, frequency_penalty. Ye LLM apps ka core hai."
          whenToUse={[
            'Conversational AI — chat bots, assistants',
            'Single-turn queries — Q&A, summarization',
            'Instruction following — templates, formatting',
            'Multi-turn conversations — context maintain karo',
          ]}
          whyUseIt="Messages array conversation history maintain karta hai — multi-turn possible hoti hai. System message se persona, constraints, format define karo. Temperature se creativity control. max_tokens se cost control — response length limit karo."
          howToUse={{
            filename: 'chat-completions.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ── Single Turn ────────────────────────────────────────────────────────────
async function askQuestion(question: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful Node.js expert. Explain concepts clearly in simple terms. Use code examples when helpful.',
      },
      {
        role: 'user',
        content: question,
      },
    ],
    temperature: 0.3,      // Factual responses ke liye low temperature
    max_tokens: 1000,      // Cost control
    // top_p: 0.9,          // Alternative to temperature
  })

  return response.choices[0].message.content ?? ''
}

// ── Multi-Turn Conversation ────────────────────────────────────────────────
interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const conversationHistory: Message[] = [
  {
    role: 'system',
    content: 'You are a coding tutor. Be encouraging and explain mistakes kindly.',
  },
]

async function chat(userMessage: string): Promise<string> {
  // User message add karo
  conversationHistory.push({ role: 'user', content: userMessage })

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: conversationHistory,
    temperature: 0.7,
    max_tokens: 800,
  })

  const assistantMessage = response.choices[0].message.content ?? ''

  // Assistant response save karo
  conversationHistory.push({ role: 'assistant', content: assistantMessage })

  // Usage log karo
  const usage = response.usage
  console.log(\`Tokens: prompt=\${usage?.prompt_tokens}, completion=\${usage?.completion_tokens}\`)

  return assistantMessage
}`,
            explanation: 'response.usage se exact token count milta hai — billing accurate track karo. conversationHistory grow karta hai — manage karo context limits ke liye. finish_reason check karo: "stop" = complete, "length" = max_tokens hit, "content_filter" = content policy.',
          }}
          realWorldScenario="Customer support bot daily 10K conversations handle karta hai. System prompt: company tone, response format, escalation rules. Multi-turn context se bot previous messages samajhta hai — baar baar explain nahi karna padta. avg conversation 5-7 turns, 2K tokens — monthly cost: $18 (GPT-4o-mini)."
          commonMistakes={[
            {
              mistake: 'Conversation history unbounded grow karna',
              why: 'Context window limit hit hoti hai — API error. Cost exponentially badhti hai.',
              fix: 'Sliding window ya summarization implement karo. Max N messages rakho ya token count check karo regularly.',
            },
            {
              mistake: 'finish_reason check skip karna',
              why: '"length" finish reason matlab response truncated hai — incomplete output. Silent data loss.',
              fix: 'finish_reason === "length" check karo. max_tokens increase karo ya truncated responses handle karo gracefully.',
            },
          ]}
          proTip="Structured outputs use karo: response_format: { type: 'json_schema', json_schema: { ... } }. Model guaranteed valid JSON deta hai — no parse errors. Zod schema se json_schema generate karo — type-safe responses. Production-grade apps mein structured outputs hamesha prefer karo."
        />
      </div>

      {/* ConceptCard 3: Streaming */}
      <div id="streaming">
        <ConceptCard
          title="Streaming — Real-time Responses"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Streaming se model ka response token-by-token milta hai — complete response wait karne ki zaroorat nahi. ChatGPT jaisi typing effect create karo. SSE (Server-Sent Events) ya WebSocket se frontend tak stream karo."
          whenToUse={[
            'Long responses — user blank screen nahi dekhe',
            'Chat interface — typing indicator effect',
            'Real-time output — code generation, story writing',
            'API timeout avoid karne ke liye — partial responses possible',
          ]}
          whyUseIt="Bina streaming ke: 5 second response ke liye 5 seconds blank screen. Streaming se: first token 0.5 second mein aata hai — user instantly feedback dena start hota hai. Perceived performance drastically improve hoti hai. UX game-changer hai."
          howToUse={{
            filename: 'streaming.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Basic Streaming ────────────────────────────────────────────────────────
const stream = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Explain Node.js event loop' }],
  stream: true,
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
}

// ── Express API — Server-Sent Events ──────────────────────────────────────
import express from 'express'
const app = express()
app.use(express.json())

app.post('/api/chat/stream', async (req, res) => {
  const { message } = req.body

  // SSE headers set karo
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
      stream: true,
    })

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content
      if (delta) {
        // SSE format: "data: {json}\n\n"
        res.write(\`data: \${JSON.stringify({ delta })}\n\n\`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (error) {
    res.write(\`data: \${JSON.stringify({ error: 'Stream failed' })}\n\n\`)
    res.end()
  }
})`,
            explanation: 'SSE (Server-Sent Events) streaming ke liye simple aur effective hai — HTTP connection open rehti hai, server continuously data bhejta hai. WebSocket bidirectional hai — chat ke liye overkill. Client mein EventSource API use karo SSE consume karne ke liye.',
          }}
          realWorldScenario="AI writing assistant mein streaming add karne se user satisfaction 40% badha. Without streaming: 8 second wait, users abandon kar dete the. With streaming: first words 0.8 second mein — users engaged rehte hain. Simple change, massive UX impact."
          commonMistakes={[
            {
              mistake: 'Streaming chunks buffer karna — sab ek saath display karna',
              why: 'Streaming ka point hi khatam — user complete response ke liye wait karta hai.',
              fix: 'Har chunk immediately display karo. React mein: useState + setState on each chunk. Vercel AI SDK useChat hook automatically handle karta hai.',
            },
            {
              mistake: 'Error handling streaming mein skip karna',
              why: 'Stream mid-way fail ho sakta hai — user partial response dekh ke confused hota hai.',
              fix: 'try-catch for await loop mein. Stream end par [DONE] signal bhejo. Client par incomplete streams gracefully handle karo.',
            },
          ]}
          proTip="Vercel AI SDK use karo Next.js mein — streaming automatically handle ho jaati hai. useChat hook streaming responses ek saath manage karta hai. Server-side: createStreamableValue ya streamText. Ye 100+ lines of streaming code 5 lines mein reduce karta hai."
        />
      </div>

      {/* ConceptCard 4: Function Calling */}
      <div id="function-calling">
        <ConceptCard
          title="Function Calling — Tools API"
          emoji="🛠️"
          difficulty="intermediate"
          whatIsIt="Function calling se model decide karta hai kaunsa tool/function call karna hai aur kya arguments dene hain. Reliable structured output aur external system integration ke liye. Model code execute nahi karta — structured JSON output deta hai, aap execute karte ho."
          whenToUse={[
            'External APIs call karna — weather, database, search',
            'Reliable structured JSON output chahiye',
            'AI agent actions define karna',
            'User intent extract karna — slot filling',
          ]}
          whyUseIt="Function calling se model intent structure karta hai — 'Book flight from Delhi to Mumbai tomorrow' → { from: 'DEL', to: 'BOM', date: '2025-05-06' }. Parse errors nahi hote. Multiple tools define karo — model decide karta hai kaunsa use karna hai."
          howToUse={{
            filename: 'function-calling.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ── Tools Define Karo ──────────────────────────────────────────────────────
const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get current weather for a city',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: 'City name, e.g. "Mumbai"',
          },
          unit: {
            type: 'string',
            enum: ['celsius', 'fahrenheit'],
            description: 'Temperature unit',
          },
        },
        required: ['city'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_database',
      description: 'Search products in the database by name or category',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search term' },
          category: {
            type: 'string',
            enum: ['electronics', 'clothing', 'food'],
          },
          max_price: { type: 'number' },
        },
        required: ['query'],
      },
    },
  },
]

// ── Agentic Loop with Function Calling ────────────────────────────────────
async function runWithTools(userMessage: string): Promise<string> {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'user', content: userMessage },
  ]

  while (true) {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages,
      tools,
      tool_choice: 'auto', // Model decide karega kab tool use karna hai
    })

    const choice = response.choices[0]

    if (choice.finish_reason === 'stop') {
      return choice.message.content ?? ''
    }

    if (choice.finish_reason === 'tool_calls') {
      messages.push(choice.message) // Model's tool call

      // Tool calls execute karo
      for (const toolCall of choice.message.tool_calls ?? []) {
        const args = JSON.parse(toolCall.function.arguments)
        let result: string

        if (toolCall.function.name === 'get_weather') {
          result = await getWeather(args.city, args.unit)
        } else if (toolCall.function.name === 'search_database') {
          result = await searchDatabase(args)
        } else {
          result = 'Unknown tool'
        }

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: result,
        })
      }
    } else {
      break
    }
  }

  return 'No response generated'
}

// Mock implementations
async function getWeather(city: string, unit = 'celsius'): Promise<string> {
  return JSON.stringify({ city, temp: 32, unit, humidity: 78 })
}
async function searchDatabase(args: { query: string; category?: string }): Promise<string> {
  return JSON.stringify([{ name: args.query, price: 999 }])
}`,
            explanation: 'tool_choice: "auto" se model decide karta hai. "required" se hamesha tool use hoga. Function arguments JSON string hain — parse karo. Parallel tool calls possible hain — ek response mein multiple tools call ho sakte hain.',
          }}
          realWorldScenario="E-commerce AI assistant: 'Show me red Nike shoes under ₹5000' → model automatically search_database({ query: 'Nike shoes', category: 'clothing', max_price: 5000 }) call karta hai. Natural language → structured DB query — no custom NLU needed. Function calling ek line handle karta hai."
          commonMistakes={[
            {
              mistake: 'Tool descriptions vague likhna',
              why: 'Model wrong tool ya wrong parameters use karta hai agar description clear nahi.',
              fix: 'Description mein: what it does, when to use it, what parameters mean, examples. Clear descriptions = better tool selection.',
            },
            {
              mistake: 'Tool errors model ko nahi batana',
              why: 'Tool fail hua lekin model ko pata nahi — wrong information forward karta hai.',
              fix: 'Error bhi tool result mein dalo: { error: "City not found", code: "NOT_FOUND" }. Model error handle karna seekhega.',
            },
          ]}
          proTip="Structured Outputs + Function Calling combination: JSON schema guarantees strict adherence. response_format: { type: 'json_schema' } ke saath tools dono use karo — most reliable structured output. Zod se JSON schema generate karo — zodToJsonSchema library se."
        />
      </div>

      {/* ConceptCard 5: Embeddings */}
      <div id="embeddings">
        <ConceptCard
          title="Embeddings API — Semantic Search"
          emoji="🔢"
          difficulty="intermediate"
          whatIsIt="Embeddings text ko dense numerical vectors mein convert karte hain — similar meaning = similar vectors. text-embedding-3-small se cheap aur effective embeddings milte hain. RAG, semantic search, clustering, aur recommendation systems ke liye essential."
          whenToUse={[
            'Semantic search — keyword nahi, meaning se search',
            'RAG (Retrieval Augmented Generation) — relevant context retrieve',
            'Document clustering — similar documents group karo',
            'Recommendation systems — similar items dhundo',
          ]}
          whyUseIt="Keyword search 'Node event loop' miss karega 'how does Node handle async' — semantically same. Embeddings similarity capture karte hain. text-embedding-3-small: $0.02/1M tokens — extremely cheap. 1536 dimensions (ada-002 se better, cheaper bhi)."
          howToUse={{
            filename: 'embeddings.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ── Embedding Generate Karo ────────────────────────────────────────────────
async function getEmbedding(text: string): Promise<number[]> {
  const response = await client.embeddings.create({
    model: 'text-embedding-3-small', // Cheap: $0.02/1M tokens
    input: text,
    // dimensions: 512, // Reduce dimensions for storage savings (optional)
  })
  return response.data[0].embedding // 1536-dimensional vector
}

// ── Cosine Similarity ─────────────────────────────────────────────────────
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

// ── Simple Semantic Search ────────────────────────────────────────────────
interface Document {
  text: string
  embedding: number[]
  metadata: Record<string, unknown>
}

const documentStore: Document[] = []

async function indexDocument(text: string, metadata = {}): Promise<void> {
  const embedding = await getEmbedding(text)
  documentStore.push({ text, embedding, metadata })
}

async function semanticSearch(query: string, topK = 5): Promise<Document[]> {
  const queryEmbedding = await getEmbedding(query)

  // Har document ke saath similarity calculate karo
  const similarities = documentStore.map(doc => ({
    doc,
    similarity: cosineSimilarity(queryEmbedding, doc.embedding),
  }))

  // Sort by similarity — top K return karo
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map(s => s.doc)
}

// ── Batch Embeddings (Cost Efficient) ─────────────────────────────────────
async function batchGetEmbeddings(texts: string[]): Promise<number[][]> {
  // One API call for multiple texts — much more efficient
  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts, // Array of texts
  })

  return response.data
    .sort((a, b) => a.index - b.index)
    .map(item => item.embedding)
}`,
            explanation: 'text-embedding-3-small ada-002 se better performance, cheaper price. Batch requests use karo — one API call, multiple texts, much faster. Production mein vector database use karo (Pinecone, pgvector, Weaviate) — in-memory search scale nahi karta.',
          }}
          realWorldScenario="Documentation chatbot: 500 pages docs embed kiye (batch, $0.01 total cost). User query embed karo. Top 5 similar sections retrieve karo. GPT-4o-mini ko relevant sections ke saath answer generate karne do. Hallucination minimal — model grounded response deta hai actual docs se."
          commonMistakes={[
            {
              mistake: 'Embeddings in-memory store karna production mein',
              why: 'Server restart se sab embeddings lost. Memory scale nahi karta — 1M documents = GB RAM.',
              fix: 'Vector database use karo: pgvector (PostgreSQL extension, free), Pinecone (managed), Weaviate (open source). Embeddings persist hote hain aur efficient search milti hai.',
            },
            {
              mistake: 'Query aur documents differently embed karna',
              why: 'Agar different models ya preprocessing use karo toh embeddings same space mein nahi hote — similarity meaningless.',
              fix: 'Same model, same preprocessing, same dimensions — query aur documents dono ke liye. Consistency critical hai semantic search accuracy ke liye.',
            },
          ]}
          proTip="Matryoshka embeddings (text-embedding-3-small support karta hai) — dimensions reduce karo without recomputing: 1536 → 512 → 256. Storage aur compute save hota hai. Lower dimensions = slightly lower accuracy. 512 dimensions often sweet spot hai quality vs cost ke liye."
        />
      </div>

      {/* Code Example */}
      <div
        id="streaming-example"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.05)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-4">
          Complete OpenAI Chat with Streaming
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
          <code>{`import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const stream = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Explain Node.js event loop' }],
  stream: true,
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
}`}</code>
        </pre>
        <p className="text-sm text-[#71717A] mt-3">
          stream: true se token-by-token response milta hai — for await loop se process karo. Real-time typing effect ke liye ideal.
        </p>
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 8 Quiz — OpenAI API Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — models, function calling, streaming, embeddings test karo!
          </p>
        </div>
        <QuizSection questions={openaiQuiz} chapterSlug="openai-api" />
      </div>
    </div>
  )
}
