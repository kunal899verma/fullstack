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
          OpenAI API — Andar Se Samjho, Bahar Se Use Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Suno — 90% developers OpenAI API ko ek black box ki tarah treat karte hain. Request bhejo, response lo, done. Lekin kya tumhe pata hai ki GPT-4o aur GPT-4o-mini ka cost difference 17x hai? Ya ki bina streaming ke tumhare users 8 second blank screen dekhte hain? Ye sab jaanna zaroori hai production mein.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein sirf "how to call" nahi — "kyon call karo, kab karo, kitne mein karo" — ye sab samjhenge. Setup se leke streaming, function calling, embeddings tak — production-ready patterns ke saath.
        </p>
      </div>

      {/* ConceptCard 1: Setup & Models */}
      <div id="setup-models">
        <ConceptCard
          title="Setup & Models — Kaunsa Model Kab?"
          emoji="🤖"
          difficulty="intermediate"
          whatIsIt="Ek sawaal karo khud se — pichli baar jab tumne GPT use kiya, kaunsa model choose kiya? Default? Toh shayad tumne unnecessarily 17x zyada pay kiya. OpenAI ke paas multiple models hain aur har ek ka alag purpose hai. API key lo, npm package install karo — lekin model choice ke baare mein sochna shuru karo pehle. Simple tasks pe GPT-4o use karna waise hai jaisa auto-rickshaw ke liye helicopter book karo."
          whenToUse={[
            'GPT-4o-mini — classification, extraction, simple Q&A, high volume',
            'GPT-4o — complex reasoning, code, multi-step tasks, vision',
            'text-embedding-3-small — semantic search, RAG, similarity',
            'DALL-E 3 — image generation',
          ]}
          whyUseIt="Socho — ek content moderation app jo din mein 1M posts process karta hai. GPT-4o pe: $2500/day sirf input tokens ke liye. GPT-4o-mini pe: $150/day. Quality compare kiya — 95% accuracy dono mein same. Mini use karo — $2350/day bachate ho. Ye production mindset hai. Model selection ek engineering decision hai, not a vibe check."
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
            explanation: 'OPENAI_API_KEY environment variable mein rakho — kabhi hardcode mat karo, warna GitHub bots minute mein key misuse kar lete hain. maxRetries SDK automatic retry handle karta hai rate limits pe. Model choice karte waqt openai.com/pricing check karo — pricing kabhi bhi change ho sakti hai.',
          }}
          realWorldScenario="Production mein ek SaaS tool 1M daily posts moderate karta tha GPT-4o se — $2500/day bill aa raha tha. Team ne GPT-4o-mini test kiya same prompts se — 95% accuracy same nikli. Mini pe shift kiya: $150/day. Sirf complex edge cases GPT-4o pe route kiye (5% traffic). Total cost: $275/day. Ye decision ek engineer ne liya jo numbers jaanta tha — tumhe bhi janana chahiye."
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
          proTip="Structured outputs (response_format: { type: 'json_schema' }) use karo jab bhi JSON chahiye — model guaranteed valid JSON deta hai, parse errors zero. Production mein: platform.openai.com/usage pe daily monitoring set karo, suddenly bade bills se bachao. SDK automatic retry rate limits pe karta hai — ye production mein lifesaver hai."
        />
      </div>

      {/* ConceptCard 2: Chat Completions */}
      <div id="chat-completions">
        <ConceptCard
          title="Chat Completions — Messages API"
          emoji="💬"
          difficulty="intermediate"
          whatIsIt="Ye LLM apps ka dil hai — messages array. Har message ka ek role hota hai: system (bot ka DNA), user (banda kya bola), assistant (bot ne kya bola). Har API call mein poori history bhejni padti hai — model stateless hai, ye yaad rakhna. Parameters: temperature (0 = robot jaisa consistent, 1 = creative chaos), max_tokens (cost control ka sabse simple tool), frequency_penalty (repetition rokna)."
          whenToUse={[
            'Conversational AI — chat bots, assistants',
            'Single-turn queries — Q&A, summarization',
            'Instruction following — templates, formatting',
            'Multi-turn conversations — context maintain karo',
          ]}
          whyUseIt="Bina messages array ke model ko koi context nahi hota — har request naya hai. Multi-turn conversation sirf tab possible hai jab puri history bhejo. System message ek baar likhte hain, poori conversation pe apply hota hai — ye efficiency hai. Temperature faktically important hai: code generation ke liye 0.2 rakho (consistent output), creative writing ke liye 0.9 (variety chahiye). max_tokens set nahi kiya? Model 4000 tokens ka essay likh dega jab 100 chahiye tha — cost double."
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
            explanation: 'response.usage se exact token count milta hai — ye billing ka basis hai, hamesha log karo. conversationHistory unbounded grow karta hai — context limits ke liye manage karo warna API error aayega. finish_reason hamesha check karo: "stop" = complete response, "length" = max_tokens hit ho gayi (response truncated hai!), "content_filter" = content policy violation.',
          }}
          realWorldScenario="Ek customer support bot daily 10K conversations handle karta hai. System prompt mein company tone, response format, escalation triggers define hain. Multi-turn context ka fayda: user ko baar baar order ID nahi batani padti — bot pichle turn se jaanta hai. Average 5-7 turns, 2K tokens/conversation = monthly cost sirf $18 GPT-4o-mini pe. Ye production engineering hai — har rupee matter karta hai."
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
          proTip="Ek power move: response_format: { type: 'json_schema', json_schema: {...} } — model guaranteed valid JSON deta hai, kabhi parse error nahi aayega. Zod se JSON schema generate karo (zodToJsonSchema library) — type-safe responses guaranteed. Production apps mein ye pattern adopt karo, JSON.parse try-catch se chutkara milega."
        />
      </div>

      {/* ConceptCard 3: Streaming */}
      <div id="streaming">
        <ConceptCard
          title="Streaming — Real-time Responses"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Ek simple sawaal: jab ChatGPT type karta hua lagta hai, wo actually type nahi kar raha — wo tokens stream kar raha hai. Streaming matlab response ek dum se nahi aata — token by token aata hai, aur tum usi waqt display karte ho. stream: true — bas itna karo, aur tumhara app ChatGPT jaisa feel karne lagega. SSE (Server-Sent Events) se frontend tak stream bhejo — ye HTTP connection open rakhti hai aur server continuously data push karta hai."
          whenToUse={[
            'Long responses — user blank screen nahi dekhe',
            'Chat interface — typing indicator effect',
            'Real-time output — code generation, story writing',
            'API timeout avoid karne ke liye — partial responses possible',
          ]}
          whyUseIt="Ye production ka number ek UX lesson hai: bina streaming ke users 5-8 second blank screen dekhte hain aur tab tak 40-50% log page abandon kar dete hain. Streaming se first token 500ms mein aata hai — user samajhta hai ki kuch ho raha hai. Total time same hai lekin perceived speed dramatically better hai. Ye psychological hai, engineering nahi — lekin results real hain."
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
            explanation: 'SSE (Server-Sent Events) streaming ke liye best choice hai — HTTP connection open rakhti hai, server continuously data push karta hai, client side EventSource API se consume karo. WebSocket bidirectional hai (client bhi data bhej sakta hai) — chatbot ke liye overkill. Content-Type: text/event-stream aur format "data: {json}\\n\\n" — ye SSE ka standard format hai.',
          }}
          realWorldScenario="Ek AI writing tool mein streaming add kiya — ek din ka kaam. Without streaming: 8 second blank screen, 45% users page close kar dete the. With streaming: first words 0.8 second mein aate hain, users engage rehte hain. User satisfaction 40% improve hua. Sirf stream: true add kiya — koi algorithm change nahi, koi model upgrade nahi. Ye UX engineering hai."
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
          proTip="Next.js use kar rahe ho? Vercel AI SDK install karo (npm install ai) — useChat hook streaming automatically handle karta hai, SSE parsing, state management sab included. 100+ lines ka boilerplate 5 lines mein ban jaata hai. Ye developers ka time bachata hai, business ka paisa bachata hai."
        />
      </div>

      {/* ConceptCard 4: Function Calling */}
      <div id="function-calling">
        <ConceptCard
          title="Function Calling — Tools API"
          emoji="🛠️"
          difficulty="intermediate"
          whatIsIt="Ek misconception clear karo: model function execute NAHI karta. Ye sirf JSON output deta hai — 'main ye function call karna chahta hoon, ye arguments ke saath'. Tumhara code actually execute karta hai. Isliye isko 'tool calling' bhi bolte hain. Benefit kya hai? User 'Mumbai ka weather batao' bolta hai — model automatically get_weather({city: 'Mumbai'}) JSON generate karta hai. Tumne city manually parse nahi ki, NLP nahi likhi, bas model ne kar di."
          whenToUse={[
            'External APIs call karna — weather, database, search',
            'Reliable structured JSON output chahiye',
            'AI agent actions define karna',
            'User intent extract karna — slot filling',
          ]}
          whyUseIt="Pehle ke zamane mein natural language se structured data nikalna ek alag NLP pipeline tha — regex, entity extraction, custom classifiers. Function calling ne ye sab obsolete kar diya. 'Book flight from Delhi to Mumbai tomorrow for 2 people' → model khud { from: 'DEL', to: 'BOM', date: '2025-05-06', passengers: 2 } generate karta hai. No parsing errors. Aur multiple tools define karo — model khud decide karta hai kaunsa relevant hai. Ye AI ka real power hai."
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
            explanation: 'tool_choice: "auto" se model decide karta hai kab tool use karna hai. "required" set karo toh model ko hamesha koi tool use karna padega. Arguments JSON string hain — JSON.parse karo pehle. Ek important feature: parallel tool calls — model ek hi response mein multiple tools call kar sakta hai. Weather + traffic + hotels sab ek baar mein.',
          }}
          realWorldScenario="Ek e-commerce chatbot: user bolta hai 'red Nike shoes under ₹5000 dikhao'. Model automatically search_database({ query: 'Nike shoes', color: 'red', max_price: 5000 }) JSON generate karta hai. Koi custom NLU pipeline nahi, koi regex nahi, koi entity extractor nahi. Pehle ye same feature banane mein 2 sprint lagte the. Function calling se 2 ghante. Production mein ye hai asli time-to-market advantage."
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
          proTip="Tool descriptions likho jaise tum ek junior developer ko explain kar rahe ho — exact, specific, examples ke saath. 'Fetch data' jaisi vague description se model galat tool choose karega. 'Get current weather for a city — use when user asks about weather, temperature, or climate' — ye clear hai. Description quality = tool selection accuracy."
        />
      </div>

      {/* ConceptCard 5: Embeddings */}
      <div id="embeddings">
        <ConceptCard
          title="Embeddings API — Semantic Search"
          emoji="🔢"
          difficulty="intermediate"
          whatIsIt="Ek powerful concept samjho: 'king - man + woman = queen'. Ye magic nahi hai — ye embeddings hain. Text ko numbers ke ek array mein convert karo (vector), aur similar meaning wale texts ke vectors numerically close hote hain. text-embedding-3-small ek text le leta hai aur 1536 numbers ka array deta hai. In numbers ko compare karo — jo vectors closest hain wo semantically most similar hain. RAG ka pura foundation yahi hai."
          whenToUse={[
            'Semantic search — keyword nahi, meaning se search',
            'RAG (Retrieval Augmented Generation) — relevant context retrieve',
            'Document clustering — similar documents group karo',
            'Recommendation systems — similar items dhundo',
          ]}
          whyUseIt="Keyword search ka problem samjho: user search karta hai 'Node event loop' — tumhara docs mein hai 'how does Node handle asynchronous operations'. Keyword match nahi hua, result nahi aaya — frustrated user. Embedding search mein dono ke vectors similar hote hain (same concept hai) — result milta hai. Aur price? text-embedding-3-small sirf $0.02/1M tokens — practically free compared to LLM calls."
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
            explanation: 'text-embedding-3-small: ada-002 se better performance aur cheaper price — default choice hai. Batch requests ka fayda uthaao: ek API call mein 100 texts embed karo (much faster vs individual calls). Production mein vector database use karo (Pinecone, pgvector) — in-memory search 10K documents tak theek hai, uske baad O(N) slow ho jaati hai.',
          }}
          realWorldScenario="Company ne apne 500 page documentation pe chatbot banaya. Step 1: sab pages embed kiye — batch mein, total cost $0.01 (seriously!). Step 2: user query aai, embed karo, top 5 similar sections retrieve karo. Step 3: GPT-4o-mini ko relevant sections ke saath answer generate karne do. Hallucination almost zero — model apni imagination se nahi, actual docs se bol raha hai. Ye RAG ka magic hai, aur ye sab embeddings se possible hai."
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
          proTip="Matryoshka embeddings — text-embedding-3-small ka ek chhupa hua feature. dimensions parameter set karo: 1536 ki jagah 256 use karo. Storage 6x kam, compute 6x fast, accuracy sirf thodi si kam (often unnoticeable). 1M documents ke liye ye difference 57GB vs 9.5GB storage hai. Pehle full dimensions se start karo, performance issues pe truncate karo."
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
