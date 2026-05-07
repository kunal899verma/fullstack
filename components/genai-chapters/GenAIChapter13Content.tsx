'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'AI agent aur regular LLM call mein kya fundamental difference hai?',
    options: [
      {
        text: 'Agent faster hota hai — parallel processing karta hai',
        correct: false,
        explanation: 'Speed agents ka defining feature nahi hai. Agents generally slower hote hain kyunki multiple steps hote hain.',
      },
      {
        text: 'Agent autonomous decisions lete hain aur tools use karke multi-step tasks complete karte hain — LLM sirf ek input ko ek response deta hai',
        correct: true,
        explanation: 'Exactly! Single LLM call: input → output. Agent: perceive → reason → act → observe → repeat. Agent khud decide karta hai kaunsa tool use kare, output kya ho, aur kab stop karna hai.',
      },
      {
        text: 'Agent hamesha GPT-4 use karta hai, regular LLM calls koi bhi model use karte hain',
        correct: false,
        explanation: 'Agent koi bhi LLM use kar sakta hai — Claude, GPT, Gemini. Model choice agent architecture se alag hai.',
      },
      {
        text: 'Agent sirf coding tasks ke liye hota hai',
        correct: false,
        explanation: 'Agents research, customer service, data analysis, content creation — many domains mein use hote hain. Coding sirf ek use case hai.',
      },
    ],
  },
  {
    question: 'ReAct pattern kya hai aur ye kyun effective hai?',
    options: [
      {
        text: 'React.js framework ka AI version — UI components generate karta hai',
        correct: false,
        explanation: 'ReAct aur React.js bilkul alag hain. ReAct ek agent prompting pattern hai, JavaScript framework nahi.',
      },
      {
        text: 'Reason → Act → Observe cycle — agent pehle sochta hai, phir tool use karta hai, phir result dekhta hai aur next step decide karta hai',
        correct: true,
        explanation: 'Bilkul sahi! ReAct (Reasoning + Acting) pattern mein: Thought → Action (web_search) → Observation (results) → Thought → Final Answer. Ye chain-of-thought + tool use combine karta hai.',
      },
      {
        text: 'ReAct sirf error handling ke liye use hota hai — React to errors',
        correct: false,
        explanation: 'ReAct error handling nahi hai — ye reasoning + action interleaving pattern hai multi-step problem solving ke liye.',
      },
      {
        text: 'ReAct pattern sirf OpenAI models ke saath kaam karta hai',
        correct: false,
        explanation: 'ReAct prompting technique hai — kisi bhi capable LLM ke saath kaam karta hai. Claude, GPT, Gemini sab ReAct-style prompting support karte hain.',
      },
    ],
  },
  {
    question: 'Tool calling (function calling) mein LLM kya actually karta hai?',
    options: [
      {
        text: 'LLM khud functions execute karta hai aur results return karta hai',
        correct: false,
        explanation: 'LLM functions execute NAHI karta — ye JSON output generate karta hai jisme batata hai kaunsa function call karna hai. Actual execution developer ka code karta hai.',
      },
      {
        text: 'LLM ek structured JSON output generate karta hai jisme function name aur arguments hote hain — developer ka code actual function execute karta hai aur result wapas LLM ko deta hai',
        correct: true,
        explanation: 'Exactly! Tool calling flow: LLM → "call get_weather(city=Mumbai)" (JSON) → developer code get_weather() call karta hai → result LLM ko return → LLM final answer generate karta hai. LLM sirf JSON generate karta hai, real world mein kuch nahi karta.',
      },
      {
        text: 'Tool calling sirf API calls ke liye hai — local functions call nahi ho sakti',
        correct: false,
        explanation: 'Tool calling kisi bhi function ke liye hai — API calls, database queries, calculations, file operations — koi bhi function jo tum define karo.',
      },
      {
        text: 'Tool calling mein LLM internet access karta hai directly',
        correct: false,
        explanation: 'LLM internet access nahi karta directly. Agar web search tool hai toh tum (developer) us function ko implement karte ho — LLM sirf tool call request karta hai.',
      },
    ],
  },
  {
    question: 'Agent safety ke liye "max iterations" limit kyun zaroori hai?',
    options: [
      {
        text: 'Server ko overload hone se bachata hai',
        correct: false,
        explanation: 'Server load bhi matter karta hai lekin max iterations ka primary reason agent ke infinite loops aur runaway costs hai.',
      },
      {
        text: 'Agent ko infinite loop mein fasne se bachata hai — tool calls chain hoti hain, ek mistake se agent kabhi na khatam hone wala loop mein ja sakta hai',
        correct: true,
        explanation: 'Sahi! Ek agent loop mein: search → find more links → search each link → find more → ... Without max_iterations limit ye kabhi nahi rukega. Exponential tool calls = exponential cost. Limit: 10-20 iterations typically enough hai complex tasks ke liye.',
      },
      {
        text: 'Max iterations sirf debugging ke liye hai, production mein zaruri nahi',
        correct: false,
        explanation: 'Production mein aur bhi zaroori hai. Development mein manually stop kar sakte ho, production mein agent independently run karta hai — max_iterations hard safeguard hai.',
      },
      {
        text: 'Max iterations API rate limits ke barabar hona chahiye',
        correct: false,
        explanation: 'Max iterations apni business logic pe based honi chahiye — kitne steps mein task complete hona chahiye. Rate limits alag concern hain.',
      },
    ],
  },
  {
    question: 'Multi-step agent mein "planning" step kyun important hai?',
    options: [
      {
        text: 'Planning se agent faster ho jaata hai',
        correct: false,
        explanation: 'Planning actually agent ko thoda slower banata hai (extra tokens). Benefit speed nahi, quality aur reliability hai.',
      },
      {
        text: 'Planning se agent pehle poori strategy sochta hai — blindly ek tool pe ek tool use karne ki bajaye structured approach hoti hai, errors aur dead-ends kam hote hain',
        correct: true,
        explanation: 'Bilkul sahi! Bina planning ke agent reactive hai — ek step karo, phir dekho. Planning ke saath: "Main yaha ek market research report banana chahta hoon. Steps: 1. Competitors dhundho 2. Pricing compare karo 3. Report structure karo." Ye approach fewer mistakes aur better outcomes deti hai.',
      },
      {
        text: 'Planning step sirf user ko progress dikhane ke liye hai (UI purpose)',
        correct: false,
        explanation: 'Planning primarily quality improvement ke liye hai, UI ke liye nahi. Haan, plan show karna good UX hai, lekin benefit reasoning quality mein hai.',
      },
      {
        text: 'Planning GPT-4 specific feature hai — dusre models plan nahi bana sakte',
        correct: false,
        explanation: 'Planning ek prompting technique hai — kisi bhi capable LLM se kaam liya ja sakta hai. Claude pe bhi equally effective hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter13Content() {
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
          AI Agents — LLM + Tools = Autonomous Worker 🤖
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          AI Agent kya hai? Simple definition: ek LLM jisko tools diye gaye hain. Tools = functions jo wo call kar sakta hai. Decide karna ki kaunsa tool use karein — ye LLM ka kaam. Execute karna — ye tumhara code karta hai. Ye simple loop — perceive → reason → act → observe → repeat — AI automation ka core hai. Single LLM call? Input → output. Agent? Goal batao, wo khud sochta hai, tools use karta hai, task complete karta hai.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          <p className="text-[#FCA5A5] text-sm italic">
            &quot;Agent wo hai jo sirf jawaab nahi deta — jo kaam karta hai. Aur kaam karte karte khud decide karta hai next step kya hai.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: AI Agent Kya Hai */}
      <div id="agent-intro">
        <ConceptCard
          title="AI Agent Kya Hai? — Perception → Reasoning → Action"
          emoji="🤖"
          difficulty="advanced"
          whatIsIt="Agent loop itna simple hai ki aashcharya hoga: (1) task do, (2) LLM tools decide karta hai, (3) tumhara code execute karta hai, (4) results wapas LLM ko, (5) repeat until done. Ye hi poora agent hai. Magic nahi — sirf ek while loop with LLM calls aur tool execution. Lekin is simple loop se complex multi-step automation possible ho jaati hai jo single LLM call se impossible thi."
          whenToUse={[
            'Research tasks — multiple sources se information gather karo, synthesize karo.',
            'Code generation + testing — write code, run tests, fix errors, repeat.',
            'Data pipeline — fetch data, transform, validate, store — end to end.',
            'Complex customer support — issue diagnose karo, multiple systems check karo, resolve karo.',
            'Content creation pipeline — research → outline → write → edit → format.',
          ]}
          whyUseIt="'Top 5 Node.js frameworks ka comparison table banao' — single prompt se nahi hoga accurately. Agent kya karta hai: search karo frameworks, har ek ke docs read karo, pricing check karo, GitHub stars dekho, comparison compile karo. Har step pichle step ke results pe depend karta hai. Ye sequential reasoning + tool use = agent's core use case hai."
          howToUse={{
            filename: 'basic-agent.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── Tool definitions ─────────────────────────────────────────────
const tools: Anthropic.Tool[] = [
  {
    name: 'web_search',
    description: 'Search the web for current information',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: { type: 'string', description: 'Search query' },
      },
      required: ['query'],
    },
  },
  {
    name: 'calculate',
    description: 'Perform mathematical calculations',
    input_schema: {
      type: 'object' as const,
      properties: {
        expression: { type: 'string', description: 'Math expression to evaluate' },
      },
      required: ['expression'],
    },
  },
];

// ─── Tool executor (developer implements these) ───────────────────
async function executeTool(name: string, input: Record<string, string>): Promise<string> {
  if (name === 'web_search') {
    // Real: call search API (Tavily, Serper, etc.)
    return \`Search results for "\${input.query}": [mock results]\`;
  }
  if (name === 'calculate') {
    try {
      // Safe eval — use mathjs in production
      return String(Function(\`return \${input.expression}\`)());
    } catch {
      return 'Calculation error';
    }
  }
  return 'Unknown tool';
}

// ─── Simple agent loop ────────────────────────────────────────────
async function runAgent(task: string, maxIterations = 10): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: task },
  ];

  for (let i = 0; i < maxIterations; i++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools,
      messages,
    });

    // If no tool calls, agent is done
    if (response.stop_reason === 'end_turn') {
      const textBlock = response.content.find(b => b.type === 'text');
      return textBlock?.type === 'text' ? textBlock.text : 'Done';
    }

    // Process tool calls
    messages.push({ role: 'assistant', content: response.content });

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type === 'tool_use') {
        const result = await executeTool(block.name, block.input as Record<string, string>);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: result,
        });
      }
    }

    messages.push({ role: 'user', content: toolResults });
  }

  return 'Max iterations reached — task may be incomplete';
}`,
            explanation: 'Agent loop pattern: response le, stop_reason check karo. "end_turn" = LLM done, final answer hai. "tool_use" = tools execute karo, results wapas bhejo, loop continue karo. Tool implementations real honi chahiye (search API, DB query, etc.) — ye mock sirf demonstration ke liye hai. maxIterations: 10-20 typical tasks ke liye kaafi hai.',
          }}
          realWorldScenario="DevOps agent real example: 'Production server slow hai.' Agent ka loop: (1) logs fetch karo → nginx timeouts dikhte hain, (2) DB metrics query karo → slow queries hain, (3) EXPLAIN ANALYZE run karo → missing index, (4) index create karo, (5) performance verify karo → latency 80% better. Sab akele. Human ne sirf task diya, agent ne sab kiya."
          commonMistakes={[
            {
              mistake: 'Agent ko maxIterations limit ke bina run karna',
              why: 'Ek tool call wrong result de sakta hai jisse agent loop mein ja sakta hai — infinite API calls = unexpected costs.',
              fix: 'Hamesha maxIterations set karo (10-20). Timeout bhi add karo (60-120 seconds). Cost monitoring pe alert lagao.',
            },
            {
              mistake: 'Agent ko production system access directly dena bina confirmation ke',
              why: 'Agent galti kar sakta hai — database delete, wrong email bhej sakta hai. Autonomous action irreversible ho sakta hai.',
              fix: 'Human-in-the-loop: destructive operations pe confirm karo. Staging environment pe pehle test karo. Read-only access se start karo, gradually write access do.',
            },
          ]}
          proTip="Agents ke liye Claude Sonnet best choice hai — Anthropic ne tool use specifically optimize kiya hai. Haiku simple routing ke liye theek hai lekin complex multi-step reasoning mein Sonnet dramatically better hai. Claude ka extended thinking mode agent tasks mein exceptional results deta hai — enable karo agar complex reasoning required hai."
        />
      </div>

      {/* Card 2: ReAct Pattern */}
      <div id="react-pattern">
        <ConceptCard
          title="ReAct Pattern — Reason + Act"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="ReAct = Reasoning + Acting. Ye prompting pattern hai jisme model explicitly sochta hai pehle, phir action leta hai, phir observation karta hai. Format: Thought (kya karna chahiye) → Action (tool call) → Observation (result) → Thought (next step decide karo) → ... → Final Answer. ChatGPT aur Claude.ai internally yahi karte hain. Explicitly prompt karo toh reasoning transparent ho jaata hai — debugging ke liye invaluable."
          whenToUse={[
            'Complex multi-step tasks jahan reasoning explicit hona zaroori hai.',
            'Debugging agent behavior — thoughts dekh ke samjho kyun kuch kiya.',
            'Tasks jahan intermediate decisions matter karte hain — research, analysis.',
            'User ko agent progress dikhana chahte ho (transparency).',
            'Error recovery — agent apni mistake pehchane aur correct kare.',
          ]}
          whyUseIt="Bina ReAct ke agent blind hai — ek wrong tool call se agent spiral karta hai. ReAct se: (1) har step pe reasoning dekhte ho — 'kyon ye kiya?', (2) agent khud galti pakad sakta hai aur course correct kar sakta hai, (3) bugs fix karna simple ho jaata hai (reasoning trace dekho, fault dhundo). Production agents ke liye thought logging ka audit trail bhi valuable hai."
          howToUse={{
            filename: 'react-agent.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const REACT_SYSTEM_PROMPT = \`You are a helpful research assistant. Use the ReAct pattern:

For each step, write:
Thought: [your reasoning about what to do next]
Action: [tool_name(arguments)]
Observation: [result of the action]
... (repeat as needed)
Final Answer: [your complete answer]

Always think before acting. If a tool fails, try a different approach.\`;

async function reactAgent(question: string): Promise<void> {
  const tools: Anthropic.Tool[] = [{
    name: 'search',
    description: 'Search for information online',
    input_schema: {
      type: 'object' as const,
      properties: { query: { type: 'string' } },
      required: ['query'],
    },
  }];

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: question },
  ];

  let iterations = 0;
  const MAX = 8;

  while (iterations < MAX) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: REACT_SYSTEM_PROMPT,
      tools,
      messages,
    });

    // Print agent's thoughts
    for (const block of response.content) {
      if (block.type === 'text') {
        console.log('\\n--- Agent ---');
        console.log(block.text);
      }
    }

    if (response.stop_reason === 'end_turn') break;

    messages.push({ role: 'assistant', content: response.content });

    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type === 'tool_use') {
        const input = block.input as { query?: string };
        const result = \`[Search results for: \${input.query ?? ''}]\`;
        console.log(\`\\nObservation: \${result}\`);
        results.push({ type: 'tool_result', tool_use_id: block.id, content: result });
      }
    }

    messages.push({ role: 'user', content: results });
    iterations++;
  }
}

// Usage
await reactAgent('Node.js aur Deno mein 2025 mein kya differences hain?');`,
            explanation: 'REACT_SYSTEM_PROMPT format explicitly define karta hai thinking structure. Claude naturally follow karta hai. Development mein: thoughts console pe print karo — reasoning step by step dikhti hai. Production mein: thoughts structured logs mein store karo (debugging ke liye), user ko sirf Final Answer dikhao (clean UX ke liye). Ye separation important hai.',
          }}
          realWorldScenario="Customer support agent ReAct trace: User: 'Mera order kahan hai?' → Thought: 'Pehle order ID dhundna hai.' → Action: get_order_id(userId) → Observation: #12345 → Thought: 'Ab tracking check karo.' → Action: check_tracking(12345) → Observation: Out for delivery → Thought: 'Answer dene ke liye kaafi hai.' → Final Answer: 'Aapka order aaj deliver hoga!' — Human-readable reasoning trace = debuggable, trustworthy agent."
          commonMistakes={[
            {
              mistake: 'Thought blocks ko production user mein dikhana',
              why: 'Internal reasoning user ke liye confusing ya verbose hoti hai. Raw thoughts often technical jargon contain karte hain.',
              fix: "Thoughts sirf logs mein rakho. User ko sirf 'Final Answer' section dikhao. Progress indicator alag se show karo.",
            },
          ]}
          proTip="Claude ka extended thinking (beta) ReAct ka supercharged version hai — model internally deep chain-of-thought karta hai. Thinking tokens visible hote hain. Complex multi-step tasks pe enable karo: significantly better reasoning quality aati hai. Thoda expensive hai (thinking tokens bhi charge hote hain) lekin complex agents ke liye ROI positive hai."
        />
      </div>

      {/* Card 3: Tool Calling Deep Dive */}
      <div id="tool-calling">
        <ConceptCard
          title="Tool Calling Deep Dive — Definition, Execution, Results"
          emoji="🛠️"
          difficulty="advanced"
          whatIsIt="Tool calling ka ek critical misconception clear karo: LLM functions execute NAHI karta. LLM sirf JSON output deta hai — 'main get_weather call karna chahta hoon, {city: Mumbai} ke saath'. Tumhara code actual API call karta hai, result lo, wapas LLM ko do. LLM JSON generator hai, executor nahi. Ye distinction matter karta hai security ke liye — LLM ko sensitive operations direct access nahi do."
          whenToUse={[
            'Real-time data chahiye — weather, stock prices, live search.',
            'Database queries — user-specific data retrieve karo.',
            'External API calls — email send, payment process, notification.',
            'Calculations — math, date operations, unit conversions.',
            'File operations — read/write files, process documents.',
          ]}
          whyUseIt="Tool calling se LLM ki limitations solve hoti hain: training cutoff (live data chahiye toh search tool do), user-specific data (database query tool do), calculations (math tool do), file operations (file tool do). Effectively tum decide karte ho LLM ki capabilities ko extend karna — apna tool box tum define karte ho. LLM decide karta hai kab use karna hai."
          howToUse={{
            filename: 'tool-calling-deep-dive.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── Tool Definitions ─────────────────────────────────────────────
const tools: Anthropic.Tool[] = [
  {
    name: 'get_user_orders',
    description: 'Fetch a user\'s order history from database',
    input_schema: {
      type: 'object' as const,
      properties: {
        user_id: { type: 'string', description: 'User ID to fetch orders for' },
        limit: { type: 'number', description: 'Max orders to return (default 10)' },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'send_email',
    description: 'Send an email to a user',
    input_schema: {
      type: 'object' as const,
      properties: {
        to: { type: 'string', description: 'Recipient email address' },
        subject: { type: 'string', description: 'Email subject' },
        body: { type: 'string', description: 'Email body in plain text' },
      },
      required: ['to', 'subject', 'body'],
    },
  },
];

// ─── Tool Implementations ─────────────────────────────────────────
interface Order { id: string; product: string; status: string; date: string }
interface EmailResult { sent: boolean; messageId: string }

const toolImplementations: Record<string, (input: Record<string, unknown>) => Promise<string>> = {
  get_user_orders: async (input) => {
    const { user_id, limit = 10 } = input as { user_id: string; limit?: number };
    // Real: query your database
    const orders: Order[] = [
      { id: 'ORD-001', product: 'NodeMaster Pro', status: 'delivered', date: '2025-04-01' },
      { id: 'ORD-002', product: 'GenAI Course', status: 'processing', date: '2025-05-01' },
    ].slice(0, limit);
    return JSON.stringify(orders);
  },
  send_email: async (input) => {
    const { to, subject, body } = input as { to: string; subject: string; body: string };
    // Real: use SendGrid, Resend, etc.
    const result: EmailResult = { sent: true, messageId: \`msg_\${Date.now()}\` };
    console.log(\`Email sent to \${to}: \${subject}\`);
    return JSON.stringify(result);
  },
};

// ─── Run with tools ───────────────────────────────────────────────
async function runWithTools(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage },
  ];

  for (let i = 0; i < 10; i++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      tools,
      messages,
    });

    if (response.stop_reason === 'end_turn') {
      const text = response.content.find(b => b.type === 'text');
      return text?.type === 'text' ? text.text : '';
    }

    messages.push({ role: 'assistant', content: response.content });

    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type === 'tool_use') {
        const impl = toolImplementations[block.name];
        const result = impl
          ? await impl(block.input as Record<string, unknown>)
          : 'Tool not found';
        results.push({ type: 'tool_result', tool_use_id: block.id, content: result });
      }
    }
    messages.push({ role: 'user', content: results });
  }

  return 'Task incomplete after max iterations';
}`,
            explanation: 'Tool definition ke teen parts: name (function name), description (LLM ye padhta hai kab call karna hai — zyada detail = better selection), input_schema (Zod/JSON schema se parameters define). Tool result: JSON string as tool_result. Dispatcher pattern: ek function jo tool name se appropriate implementation call kare — clean, maintainable. Vague description = wrong tool selection = bad agent.',
          }}
          realWorldScenario="E-commerce: User bolta hai 'Last order cancel karo aur refund do.' Agent: (1) get_user_orders() → order #12345 mila, (2) cancel_order(12345) → cancelled, (3) initiate_refund(12345) → refund ID #REF789, (4) send_email(confirmation) → done. Ek conversation, 4 tool calls, zero human support needed. Customer satisfaction instant. Support team free hua higher value problems ke liye."
          commonMistakes={[
            {
              mistake: 'Tool description vague likhna',
              why: "LLM description padh ke decide karta hai kab use karna hai. 'Fetch data' jaise vague description se LLM galat tool choose karega ya bhi confuse hoga.",
              fix: "Specific descriptions likho: 'Fetch a user's order history from the orders database. Use when user asks about their purchases, order status, or delivery.' Examples help.",
            },
          ]}
          proTip="Tool description mein ek 'When to use' sentence add karo: 'Use this when user asks about order status, cancellation, or tracking.' Ye Claude ko exact signal deta hai. Development trick: tool_choice: { type: 'tool', name: 'tool_name' } se force karo specific tool test karne ke liye — full conversation simulate karne ki zarurat nahi."
        />
      </div>

      {/* Card 4: Multi-step Agents */}
      <div id="multi-step">
        <ConceptCard
          title="Multi-step Agents — Planning & Error Recovery"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="Simple agent: ek task, ek ya do tools. Multi-step agent: complex goal, 10-15 tools, multiple iterations, intermediate results pe decisions. Planning ek game changer hai — agent pehle poora roadmap banata hai, phir execute karta hai. Planning ke bina: reactive, error-prone. Planning ke saath: structured, fewer dead-ends, better outcomes. Ye maturity level hai agentic systems mein."
          whenToUse={[
            'Research reports — multiple sources, synthesis, formatting.',
            'Code projects — design, implement, test, debug, document.',
            'Data analysis — gather, clean, analyze, visualize, report.',
            'Business workflows — approval chains, notifications, updates.',
            'Travel planning — flights, hotels, activities — end to end.',
          ]}
          whyUseIt="Bina planning ke agent ek wrong turn pe stuck ho jaata hai — koi recovery plan nahi. Planning ke saath agent upfront sochta hai: 'ye task ke liye 5 steps hain, step 3 step 2 pe depend karta hai, step 4 aur 5 parallel ho sakte hain.' Errors aate hain? Agent alternate approach try karta hai — is_error: true flag se agent ko signal milta hai ki kuch galat hua, wo recover kare."
          howToUse={{
            filename: 'multi-step-agent.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── Planning prompt ──────────────────────────────────────────────
const PLANNING_SYSTEM = \`You are an expert planner. Given a task, create a detailed plan.

Format your plan as:
PLAN:
1. [Step description] - Tool: [tool_name] - Dependencies: [none/step N]
2. ...

Then execute each step, verifying success before proceeding.
If a step fails: (1) note the error, (2) try an alternate approach, (3) continue.\`;

// ─── Agent with planning ──────────────────────────────────────────
async function planAndExecute(task: string, tools: Anthropic.Tool[]): Promise<string> {
  const messages: Anthropic.MessageParam[] = [{
    role: 'user',
    content: \`Task: \${task}\\n\\nFirst, create a plan. Then execute it step by step.\`,
  }];

  let finalResult = '';

  for (let iteration = 0; iteration < 15; iteration++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: PLANNING_SYSTEM,
      tools,
      messages,
    });

    // Collect text outputs
    const textBlocks = response.content.filter(b => b.type === 'text');
    if (textBlocks.length > 0) {
      finalResult = textBlocks.map(b => b.type === 'text' ? b.text : '').join('\\n');
    }

    if (response.stop_reason === 'end_turn') break;

    messages.push({ role: 'assistant', content: response.content });

    // Execute tool calls
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type === 'tool_use') {
        try {
          const result = await executeWithTimeout(block.name, block.input as Record<string, unknown>, 30_000);
          toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: result });
        } catch (err) {
          // Error recovery: tell agent what failed
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: \`Error: \${err instanceof Error ? err.message : 'Unknown error'}. Try an alternative approach.\`,
            is_error: true,
          });
        }
      }
    }

    messages.push({ role: 'user', content: toolResults });
  }

  return finalResult;
}

async function executeWithTimeout(
  name: string,
  input: Record<string, unknown>,
  timeoutMs: number
): Promise<string> {
  return Promise.race([
    Promise.resolve(\`Result of \${name}(\${JSON.stringify(input)})\`),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Tool timeout')), timeoutMs)
    ),
  ]);
}`,
            explanation: 'PLANNING_SYSTEM prompt agent ko structure deta hai: pehle plan banao, phir execute karo. is_error: true flag critical hai — tool failure ka signal Claude ko milta hai, wo alternate approach try karta hai. executeWithTimeout: external APIs hang ho sakte hain — 30 second timeout hard limit hai. 15 iterations complex tasks ke liye usually enough hai.',
          }}
          realWorldScenario="Market research task: 'Top 5 SaaS pricing pages ka analysis, recommendations ke saath.' Agent plan karta hai, execute karta hai: competitors identify → pages scrape (parallel, 5x faster) → pricing models analyze → comparison table → recommendations. 20 minute ka autonomous kaam. Human ne sirf task diya — agent ne poora research kiya."
          commonMistakes={[
            {
              mistake: 'Agent ko sensitive operations bina confirmation ke karne dena',
              why: "Agent plan galat ho sakta hai — 'delete old files' agent saari files delete kar sakta hai.",
              fix: 'Destructive operations ke liye human confirmation require karo. Dry-run mode implement karo: plan dikhao, confirm lo, phir execute karo.',
            },
          ]}
          proTip="Parallel tool execution ka power: Claude ek message mein multiple tool_use blocks return kar sakta hai. Unhe Promise.all se simultaneously execute karo. 5 websites fetch karna: sequential = 5x latency. Parallel = 1x latency. Simple optimization, massive impact. Production agents mein hamesha check karo ki konse tool calls parallel ho sakte hain."
        />
      </div>

      {/* Card 5: Agent Safety */}
      <div id="agent-safety">
        <ConceptCard
          title="Agent Safety — Guardrails & Human-in-the-Loop"
          emoji="🛡️"
          difficulty="advanced"
          whatIsIt="Agents powerful hain — aur isliye dangerous bhi. Ek real incident: Air Canada ka support bot ne wrong refund policy batayi, court ne airline ko liable maana (2024). Autonomous agents real consequences hain. Defense in depth: max iterations (infinite loop prevent), timeouts (hanging tools block karo), permission scoping (least privilege), confirmation for destructive ops (human-in-the-loop), cost limits (unexpected bills se bachao), audit logs (kya hua track karo)."
          whenToUse={[
            'Max iterations: hamesha — runaway loops prevent karo.',
            'Timeouts: hamesha — hanging tools prevent karo.',
            'HITL: financial transactions, delete operations, user-affecting changes.',
            'Permission scoping: ek agent sirf uska zaroori access de — least privilege.',
            'Cost limits: production agents pe spend limit set karo.',
          ]}
          whyUseIt="Safety cost nahi hai — ye insurance hai. Production agent deployment ke liye checklist: max iterations set karo (hamesha), timeouts har tool pe, destructive operations ke liye HITL confirm karo, read-only se start karo (write access gradual do), audit logs production mein mandatory hain (compliance + debugging). Ye checklist follow karo, incidents avoid karo."
          howToUse={{
            filename: 'agent-safety.ts',
            language: 'typescript',
            code: `// ─── Agent Safety Framework ──────────────────────────────────────

interface AgentConfig {
  maxIterations: number;
  timeoutMs: number;
  maxCostUSD: number;
  requireConfirmation: string[]; // tool names needing human approval
  readOnlyMode: boolean;
}

const SAFE_CONFIG: AgentConfig = {
  maxIterations: 12,
  timeoutMs: 120_000,       // 2 minutes total
  maxCostUSD: 1.00,         // hard cost limit
  requireConfirmation: ['delete_record', 'send_email', 'process_payment'],
  readOnlyMode: false,
};

class SafeAgent {
  private iterations = 0;
  private estimatedCostUSD = 0;
  private startTime = Date.now();

  async checkLimits(): Promise<void> {
    if (this.iterations >= SAFE_CONFIG.maxIterations) {
      throw new Error(\`Max iterations (\${SAFE_CONFIG.maxIterations}) reached\`);
    }
    if (Date.now() - this.startTime > SAFE_CONFIG.timeoutMs) {
      throw new Error('Agent timeout exceeded');
    }
    if (this.estimatedCostUSD > SAFE_CONFIG.maxCostUSD) {
      throw new Error(\`Cost limit $\${SAFE_CONFIG.maxCostUSD} exceeded\`);
    }
  }

  async requireHumanApproval(toolName: string, input: unknown): Promise<boolean> {
    if (!SAFE_CONFIG.requireConfirmation.includes(toolName)) return true;

    // In production: send to UI for human approval, wait for response
    console.log(\`\\n⚠️  HUMAN APPROVAL REQUIRED\\nTool: \${toolName}\\nInput: \${JSON.stringify(input, null, 2)}\`);

    // Demo: auto-approve in test, require real approval in prod
    const isTestEnv = process.env.NODE_ENV === 'test';
    if (!isTestEnv) {
      // Real: wait for webhook/polling response from UI
      throw new Error('Awaiting human approval — not implemented in this demo');
    }
    return true; // auto-approve in test
  }

  trackCost(inputTokens: number, outputTokens: number, model: string): void {
    // Claude Sonnet pricing (approximate)
    const inputCost = (inputTokens / 1_000_000) * 3;
    const outputCost = (outputTokens / 1_000_000) * 15;
    this.estimatedCostUSD += inputCost + outputCost;
    console.log(\`Cost so far: $\${this.estimatedCostUSD.toFixed(4)}\`);
  }
}

// ─── Audit logging ────────────────────────────────────────────────
interface AuditEntry {
  timestamp: string;
  agentId: string;
  action: string;
  toolName?: string;
  input?: unknown;
  result?: string;
  userId: string;
}

function auditLog(entry: Omit<AuditEntry, 'timestamp'>): void {
  const logEntry: AuditEntry = { ...entry, timestamp: new Date().toISOString() };
  // Send to your logging service (DataDog, CloudWatch, etc.)
  console.log('[AUDIT]', JSON.stringify(logEntry));
}`,
            explanation: 'SafeAgent class: iterations, elapsed time, aur estimated cost track karta hai — limit exceed hone pe throw karta hai. requireHumanApproval: dangerous tools ke liye human confirmation wait karta hai (production mein webhook/WebSocket se implement karo). auditLog: compliance ke liye critical — every tool call, kab, kiske behalf mein, kya result. Ye logs searchable database mein rakho.',
          }}
          realWorldScenario="Financial services firm: trade recommendation agent. Safety layers: read-only DB access, trade execution ke liye human confirm, max $10K per trade limit, all actions audit logged, 30-second timeout per tool. Result: zero incidents 6 months mein. Ek near-miss tha — agent wrong price pe trade suggest kiya, human ne catch kiya. HITL ne $200K potential loss roka."
          commonMistakes={[
            {
              mistake: 'Agent ko production database pe direct write access dena',
              why: 'Agent hallucinate kar sakta hai — wrong SQL, wrong user ID, catastrophic data loss possible.',
              fix: 'Start karo read-only access se. Write operations ke liye separate approval layer banao. Staging pe test karo pehle.',
            },
          ]}
          proTip="Anthropic ka 'Building effective agents' guide ek must-read hai production deployment se pehle. Key insights: tool descriptions carefully likhne se misuse aur errors significantly reduce hoti hai, is_error: true flagging se agent gracefully recover karta hai, aur simple agents often better perform karte hain complex ones se. Less is more in agent design."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 13 Quiz — AI Agents & Tool Use
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Agents samjhe? Prove karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="ai-agents" />
      </div>
    </div>
  )
}
