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
          AI Agents & Tool Use — Autonomous AI 🤖
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Single LLM call se aage — agents jo khud sochte hain, tools use karte hain, aur multi-step tasks complete karte hain. Ye AI ka next level hai.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          <p className="text-[#FCA5A5] text-sm italic">
            &quot;Agent wo hai jo sirf jawaab nahi deta — jo kaam karta hai. Research karo, code likho, email bhejo — AI agent ye sab akela kar sakta hai.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: AI Agent Kya Hai */}
      <div id="agent-intro">
        <ConceptCard
          title="AI Agent Kya Hai? — Perception → Reasoning → Action"
          emoji="🤖"
          difficulty="advanced"
          whatIsIt="AI agent ek system hai jo environment ko perceive karta hai, reasoning karta hai, tools use karke actions leta hai, aur results observe karke agle steps decide karta hai — ye cycle repeat hoti hai jab tak task complete na ho. Single LLM call (input → output) se fundamentally alag: agent autonomous multi-step problem solver hai."
          whenToUse={[
            'Research tasks — multiple sources se information gather karo, synthesize karo.',
            'Code generation + testing — write code, run tests, fix errors, repeat.',
            'Data pipeline — fetch data, transform, validate, store — end to end.',
            'Complex customer support — issue diagnose karo, multiple systems check karo, resolve karo.',
            'Content creation pipeline — research → outline → write → edit → format.',
          ]}
          whyUseIt="Agents wo tasks handle karte hain jo ek LLM call se possible nahi — jahan intermediate results pe based next steps depend karte hain. 'Research top 5 Node.js frameworks aur comparison table banao' — agent searches, reads each framework docs, compares, formats output. Ek prompt se ye impossible tha."
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
            explanation: 'Agent loop: task diya → LLM tools decide karta hai → tool execute karo → result wapas diya → LLM next step decide karta hai → repeat until done. stop_reason === "end_turn" matlab LLM ne final answer de diya, aur tool calls nahi chahiye. maxIterations runaway loop se protect karta hai.',
          }}
          realWorldScenario="DevOps agent: 'Production server slow hai — diagnose karo aur fix karo.' Agent: (1) logs check karta hai, (2) CPU/memory metrics query karta hai, (3) slow database queries identify karta hai, (4) index add karta hai, (5) improvement verify karta hai — sab akele bina human intervention ke."
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
          proTip="Claude pe tool calling sabse reliable hai complex agents ke liye — Anthropic ne specifically tool use pe heavy optimization kiya hai. claude-sonnet-4-6 complex multi-step reasoning ke liye best hai, claude-haiku-4-5 simple tool calls ke liye fast aur cheap hai."
        />
      </div>

      {/* Card 2: ReAct Pattern */}
      <div id="react-pattern">
        <ConceptCard
          title="ReAct Pattern — Reason + Act"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="ReAct (Reasoning + Acting) ek prompting pattern hai jisme LLM apni reasoning explicitly likhta hai tool calls se pehle. 'Thought: Maine Mumbai ka weather dhundna chahiye. Action: web_search(Mumbai weather today). Observation: 35°C, sunny. Thought: Ab answer de sakta hoon. Final Answer: Mumbai mein aaj 35°C hai.' Ye chain-of-thought + tool use combination hai."
          whenToUse={[
            'Complex multi-step tasks jahan reasoning explicit hona zaroori hai.',
            'Debugging agent behavior — thoughts dekh ke samjho kyun kuch kiya.',
            'Tasks jahan intermediate decisions matter karte hain — research, analysis.',
            'User ko agent progress dikhana chahte ho (transparency).',
            'Error recovery — agent apni mistake pehchane aur correct kare.',
          ]}
          whyUseIt="ReAct bina explicit reasoning ke agent ek step pe wrong decision le sakta hai aur notice nahi karta. Explicit 'Thought' blocks se: (1) agent reasoning ko verify kar sakte ho, (2) agent apni galti khud pakad sakta hai ('ye approach kaam nahi kar raha, different try karta hoon'), (3) debugging bahut easier ho jaata hai."
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
            explanation: 'ReAct system prompt explicit karta hai thought → action → observation cycle. Claude naturally is pattern ko follow karta hai. Thoughts print karo debugging ke liye — agent ki reasoning transparent ho jaati hai. Production mein thoughts log karo, user ko sirf final answer dikhao.',
          }}
          realWorldScenario="Customer support agent ReAct pattern se: User: 'Mera order kahan hai?' Thought: Order ID dhundna chahiye. Action: get_order_id(user_id). Observation: Order #12345. Thought: Ab tracking check karo. Action: check_tracking(12345). Observation: Out for delivery. Final Answer: 'Aapka order aaj deliver hoga!'"
          commonMistakes={[
            {
              mistake: 'Thought blocks ko production user mein dikhana',
              why: 'Internal reasoning user ke liye confusing ya verbose hoti hai. Raw thoughts often technical jargon contain karte hain.',
              fix: "Thoughts sirf logs mein rakho. User ko sirf 'Final Answer' section dikhao. Progress indicator alag se show karo.",
            },
          ]}
          proTip="Claude ka extended thinking mode ReAct ka supercharged version hai — model internally chain-of-thought karta hai (visible thinking tokens). 'thinking' parameter enable karo complex agent tasks ke liye — significantly better results aate hain."
        />
      </div>

      {/* Card 3: Tool Calling Deep Dive */}
      <div id="tool-calling">
        <ConceptCard
          title="Tool Calling Deep Dive — Definition, Execution, Results"
          emoji="🛠️"
          difficulty="advanced"
          whatIsIt="Tool calling (function calling) mein developer tools define karta hai JSON schema se, LLM decide karta hai kab use karna hai, developer ka code execute karta hai, result wapas LLM ko jaata hai. LLM internet pe nahi jaata, code execute nahi karta — sirf structured JSON generate karta hai. Developer ko execution implement karna padta hai."
          whenToUse={[
            'Real-time data chahiye — weather, stock prices, live search.',
            'Database queries — user-specific data retrieve karo.',
            'External API calls — email send, payment process, notification.',
            'Calculations — math, date operations, unit conversions.',
            'File operations — read/write files, process documents.',
          ]}
          whyUseIt="Tool calling LLM ko real world se connect karta hai. Bina tools ke LLM training data tak limited hai — no real-time info, no user-specific data, no side effects. Tools se: 'current Bitcoin price kya hai?' — LLM price API call kare aur accurate answer de. Knowledge cutoff irrelevant ho jaata hai."
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
            explanation: 'Tool definition: name + description (LLM ko samjhana hai kab use karna hai) + input_schema (what arguments). Tool implementation: actual code jo kaam karta hai. Tool result: JSON string as tool_result message. Description quality matter karta hai — vague description se LLM wrong tool choose karta hai.',
          }}
          realWorldScenario="E-commerce chatbot: User: 'Mera last order cancel karo aur refund initiate karo.' Agent: (1) get_user_orders() call → order ID mila, (2) cancel_order(order_id) → cancelled, (3) initiate_refund(order_id) → refund ID mila, (4) send_email(confirmation) → done. Ek conversation mein 4 tools, zero human support needed."
          commonMistakes={[
            {
              mistake: 'Tool description vague likhna',
              why: "LLM description padh ke decide karta hai kab use karna hai. 'Fetch data' jaise vague description se LLM galat tool choose karega ya bhi confuse hoga.",
              fix: "Specific descriptions likho: 'Fetch a user's order history from the orders database. Use when user asks about their purchases, order status, or delivery.' Examples help.",
            },
          ]}
          proTip="Tool ko test karo tool_choice: { type: 'tool', name: 'tool_name' } se — ye force karta hai LLM ko specific tool use karne ke liye. Development mein helpful hai tool behavior test karne ke liye bina full conversation simulate kiye."
        />
      </div>

      {/* Card 4: Multi-step Agents */}
      <div id="multi-step">
        <ConceptCard
          title="Multi-step Agents — Planning & Error Recovery"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="Multi-step agents complex tasks handle karte hain jo multiple sub-tasks mein break hote hain — planning, execution, error recovery, aur final synthesis. Agent pehle poora plan banata hai, phir execute karta hai, intermediate results check karta hai, aur failures se recover karta hai next steps adjust karke."
          whenToUse={[
            'Research reports — multiple sources, synthesis, formatting.',
            'Code projects — design, implement, test, debug, document.',
            'Data analysis — gather, clean, analyze, visualize, report.',
            'Business workflows — approval chains, notifications, updates.',
            'Travel planning — flights, hotels, activities — end to end.',
          ]}
          whyUseIt="Simple single-step agents often fail on complex tasks — ek tool fail hone pe pure task fail ho jaata hai. Multi-step agents planning se: (1) sub-tasks identify karte hain, (2) dependencies samajhte hain, (3) parallel aur sequential steps organize karte hain, (4) failure pe alternate approach try karte hain."
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
            explanation: 'Planning phase: agent plan banata hai phir execute karta hai. Error recovery: is_error: true se agent ko pata chalta hai step fail hua — wo alternate approach try karta hai. executeWithTimeout: hanging tool calls se protect karta hai. 15 iterations complex tasks ke liye enough hoti hain.',
          }}
          realWorldScenario="Market research agent: 'Top 5 SaaS pricing pages ka analysis karo aur recommendations do.' Agent: (1) competitors identify kare, (2) each page scrape kare (parallel), (3) pricing models analyze kare, (4) comparison table banaye, (5) recommendations write kare. 5 minute ka kaam, agent 20 minutes mein complete karta hai autonomously."
          commonMistakes={[
            {
              mistake: 'Agent ko sensitive operations bina confirmation ke karne dena',
              why: "Agent plan galat ho sakta hai — 'delete old files' agent saari files delete kar sakta hai.",
              fix: 'Destructive operations ke liye human confirmation require karo. Dry-run mode implement karo: plan dikhao, confirm lo, phir execute karo.',
            },
          ]}
          proTip="Parallel tool execution agent ko significantly faster banati hai. Claude ek message mein multiple tool_use blocks return kar sakta hai — in sab ko concurrently execute karo (Promise.all). Sequential vs parallel: research agent 5 websites fetch kare — sequential = 5x latency, parallel = 1x latency."
        />
      </div>

      {/* Card 5: Agent Safety */}
      <div id="agent-safety">
        <ConceptCard
          title="Agent Safety — Guardrails & Human-in-the-Loop"
          emoji="🛡️"
          difficulty="advanced"
          whatIsIt="Autonomous agents powerful hain aur dangerous bhi — galat tool call production database wipe kar sakti hai, wrong email bhej sakti hai, financial transactions execute kar sakti hai. Safety guardrails: max iterations, timeouts, permission scopes, confirmation for destructive ops, cost limits, aur human-in-the-loop (HITL) for critical decisions."
          whenToUse={[
            'Max iterations: hamesha — runaway loops prevent karo.',
            'Timeouts: hamesha — hanging tools prevent karo.',
            'HITL: financial transactions, delete operations, user-affecting changes.',
            'Permission scoping: ek agent sirf uska zaroori access de — least privilege.',
            'Cost limits: production agents pe spend limit set karo.',
          ]}
          whyUseIt="Agent incidents real hain — 'Air Canada agent ne wrong refund policy batayi, court ne airline ko liable maana' (2024). Autonomous agents production mein real consequences hain. Defense in depth: multiple safety layers layero — ek fail ho toh doosra catch kare. Safety cost nahi hai, insurance hai."
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
            explanation: 'SafeAgent class limits track karta hai — iterations, time, cost. requireHumanApproval destructive tools ke liye gate karta hai. auditLog har tool call track karta hai compliance ke liye. Production mein: audit logs searchable database mein rakho (ki agent ne kya kiya, kab, kiske behalf mein).',
          }}
          realWorldScenario="Financial services firm ne agent deploy kiya trade recommendations ke liye. Safety layers: (1) read-only database access, (2) trade execution confirm karo human se, (3) max $10K trade limit, (4) all actions audit logged, (5) 30-second timeout per tool. Zero incidents 6 months mein — safety framework ne potential $200K mistake rok li."
          commonMistakes={[
            {
              mistake: 'Agent ko production database pe direct write access dena',
              why: 'Agent hallucinate kar sakta hai — wrong SQL, wrong user ID, catastrophic data loss possible.',
              fix: 'Start karo read-only access se. Write operations ke liye separate approval layer banao. Staging pe test karo pehle.',
            },
          ]}
          proTip="Anthropic ka Computer Use (beta) aur tool use best practices guide zarur padho before production agent deployment. Especially: tool descriptions carefully likhne se misuse significantly reduce hota hai, aur is_error: true use karo tool failures ke liye taaki agent gracefully recover kare."
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
