'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Few-shot prompting mein examples ka ORDER kyun matter karta hai?',
    options: [
      {
        text: 'Order bilkul matter nahi karta — sab examples equally influential hain',
        correct: false,
        explanation: 'Ye galat hai. Research show karta hai ki examples ka order output ko significantly influence karta hai.',
      },
      {
        text: 'Last example sabse zyada influence karta hai — recency bias ki wajah se',
        correct: true,
        explanation: 'Bilkul sahi! LLMs mein recency bias hota hai — context window ke end mein jo examples hain wo output par zyada influence karte hain. Best/most representative example ko last mein rakhna best practice hai.',
      },
      {
        text: 'First example sabse zyada influence karta hai — primacy effect se',
        correct: false,
        explanation: 'Primacy effect humans mein zyada hota hai. LLMs mein recency bias dominant hai — last examples zyada influence karte hain.',
      },
      {
        text: 'Examples ka order model performance affect nahi karta',
        correct: false,
        explanation: 'Research clearly show karta hai ki few-shot example order output quality aur style ko significant impact karta hai.',
      },
    ],
  },
  {
    question: 'System prompt ka main purpose kya hota hai LLM interaction mein?',
    options: [
      {
        text: 'Model ki training improve karna',
        correct: false,
        explanation: 'System prompt inference time par use hota hai, training time par nahi. Training se ye koi connection nahi hai.',
      },
      {
        text: "Model ki conversation ke liye persona, constraints, aur behavior define karna — 'character setting' ki tarah",
        correct: true,
        explanation: "Exactly! System prompt model ko batata hai ye kaun hai, kya karna hai, kya nahi karna hai, aur format kya hona chahiye. Ye conversation ka persistent context hai jo har message ke saath automatically include hota hai.",
      },
      {
        text: 'User ke messages encrypt karna',
        correct: false,
        explanation: 'System prompt encryption se related nahi hai. Ye instructional context hai jo model ke behavior ko guide karta hai.',
      },
      {
        text: 'API costs reduce karna',
        correct: false,
        explanation: 'System prompt actually token count add karta hai — cost thodi badh sakti hai. Prompt caching se cost reduce hoti hai, system prompt se nahi.',
      },
    ],
  },
  {
    question: 'Chain-of-Thought (CoT) prompting kab sabse zyada helpful hota hai?',
    options: [
      {
        text: 'Simple factual questions ke liye — jaise "Paris ki capital kya hai?"',
        correct: false,
        explanation: 'Simple factual questions ke liye CoT unnecessary overhead hai. CoT complex reasoning tasks ke liye designed hai.',
      },
      {
        text: 'Complex reasoning, math problems, multi-step analysis — jahan intermediate steps matter karte hain',
        correct: true,
        explanation: 'Bilkul sahi! CoT se model step-by-step sochta hai — accuracy dramatically improve hoti hai. "Let\'s think step by step" ya explicit steps ask karne se complex tasks mein much better results milte hain.',
      },
      {
        text: 'Image generation ke liye',
        correct: false,
        explanation: 'CoT text-based reasoning ke liye hai. Image generation ke liye alag techniques (like detailed visual descriptions) better kaam karte hain.',
      },
      {
        text: 'Streaming responses ke liye — tokens faster aate hain',
        correct: false,
        explanation: 'CoT actually zyada tokens generate karta hai (reasoning steps include karta hai) — faster nahi, more accurate. Streaming aur CoT alag concepts hain.',
      },
    ],
  },
  {
    question: 'JSON output reliable tarike se kaise get karein Claude/GPT se?',
    options: [
      {
        text: 'Koi special instruction nahi chahiye — model khud JSON deta hai',
        correct: false,
        explanation: 'Without explicit instruction, model conversational text dega. JSON output ke liye explicit instructions aur schema specify karna zaroori hai.',
      },
      {
        text: 'Prompt mein clearly likhna: "Respond ONLY with valid JSON. No explanation. Schema: {...}" — aur schema provide karna',
        correct: true,
        explanation: 'Exactly! Ye approach sabse reliable hai. "ONLY" aur "No explanation" important hai — nahi toh model JSON ke aage-peeche text add kar deta hai. Schema define karna output predictable banata hai.',
      },
      {
        text: 'temperature=0 set karne se automatically JSON milta hai',
        correct: false,
        explanation: 'Temperature se output format control nahi hota — ye randomness control karta hai. Format instruction se output format define hota hai.',
      },
      {
        text: 'JSON output sirf GPT-4 mein kaam karta hai, Claude mein nahi',
        correct: false,
        explanation: 'Claude JSON output mein bahut reliable hai. Anthropic ke docs bhi explicitly mention karte hain ki Claude structured output mein excellent hai.',
      },
    ],
  },
  {
    question: 'Good prompt ka formula kya hai jo is chapter mein bataya gaya?',
    options: [
      {
        text: 'Short + Simple = Best output',
        correct: false,
        explanation: 'Concise prompts kabhi kabhi theek hain, lekin complex tasks ke liye ye kaafi nahi hota. Context aur constraints important hain.',
      },
      {
        text: 'Role + Context + Task + Format + Constraints = Excellent output',
        correct: true,
        explanation: 'Ye formula is chapter ka core lesson hai! Role: model ko batao ye kaun hai. Context: relevant background. Task: kya karna hai. Format: output format. Constraints: kya nahi karna. Ye sab include karne se output quality 10x better hoti hai.',
      },
      {
        text: 'Examples + Question = Best output (sirf few-shot kafi hai)',
        correct: false,
        explanation: 'Few-shot helpful hai, lekin complete formula mein role, context, constraints sab include karna chahiye for complex tasks.',
      },
      {
        text: 'Zyada lamba prompt = hamesha better output',
        correct: false,
        explanation: 'Length quality guarantee nahi karta. Relevant, specific, well-structured prompt better hai — chahe chota ho ya bada. Padding se output worse ho sakta hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter6Content() {
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
          Prompt Engineering 🎯
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          AI se sahi kaam karwana ek skill hai. Ek achha prompt aur ek bura prompt mein 10x output quality ka fark ho sakta hai. Ye chapter mein ye skill systematically seekhte hain.
        </p>
      </div>

      {/* ConceptCard 1: What is Prompt Engineering */}
      <div id="prompt-engineering-intro">
        <ConceptCard
          title="Prompt Engineering — Art + Science"
          emoji="🎯"
          difficulty="beginner"
          whatIsIt="Prompt engineering AI models ko effective instructions dene ki practice hai. Good prompts = clear + specific + contextual + constrained. Vague prompts = vague outputs. Ek achha prompt framework hai: Role + Context + Task + Format + Constraints."
          whenToUse={[
            'Har baar jab AI model use karo — chatbot, API, automation.',
            'AI workflows automate karte waqt — consistent output chahiye toh structured prompts zaroori hain.',
            'AI-powered features build karte waqt — system prompts production mein use hote hain.',
            'Team ke liye prompt library banate waqt — reusable templates.',
          ]}
          whyUseIt="Same model, same question — alag prompt se 10x better answer milta hai. Prompt engineering ek force multiplier hai. Junior developer bhi excellent prompts se senior developer jitna output le sakta hai AI se."
          howToUse={{
            filename: 'prompt-engineering.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ❌ Vague prompt — generic output milega
async function vaguePrompt() {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{ role: 'user', content: 'Code improve karo' }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ✅ Structured prompt — actionable output milega
async function structuredPrompt(code: string) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: 'You are a senior Node.js architect with 10 years of production experience.',
    messages: [{
      role: 'user',
      content: \`Review this Node.js Express route handler for:
1. Security vulnerabilities (focus on SQL injection, auth bypass)
2. Performance issues (N+1 queries, unnecessary awaits)
3. Error handling gaps

Format: numbered list, each item:
[SEVERITY: HIGH/MEDIUM/LOW] Description. Fix suggestion.

Code:
\\\`\\\`\\\`typescript
\${code}
\\\`\\\`\\\`\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}`,
            explanation: 'Formula: Role (senior Node.js architect) + Context (production experience) + Task (code review) + Format (numbered list with severity) + Constraints (3 specific areas). Ye sab include karne se output dramatically better hota hai.',
          }}
          realWorldScenario="GitHub Copilot internally use karta hai carefully engineered system prompts jo codebase context, user preferences, aur specific coding standards include karte hain. Ye hi Copilot ko generic LLM se better banata hai coding tasks mein — same model, better prompts."
          commonMistakes={[
            {
              mistake: 'Vague instructions dena — "write good code"',
              why: '"Good" ke baare mein model ka aur tumhara interpretation alag ho sakta hai. Vague instruction = vague output.',
              fix: 'Specific karo: "Write TypeScript function with error handling, JSDoc comments, and unit tests. Follow SOLID principles. No any types."',
            },
          ]}
          proTip="Good prompt formula: Role + Context + Task + Format + Constraints = Excellent output. Role ke liye specific seniority aur domain specify karo — 'senior Node.js developer' vs just 'developer' — fark padta hai output quality mein."
          demo={
            <DiffBlock
              title="Vague vs Specific Prompt"
              language="text"
              bad={{
                label: '❌ Vague Prompt',
                code: `User: "Code improve karo"

AI: [Generic suggestions about code quality,
     might not address real issues,
     no specific actionable items]`,
                explanation: 'Vague prompt = vague, unhelpful output. Model guess karta hai ki tum kya chahte ho.',
              }}
              good={{
                label: '✅ Specific Prompt',
                code: `User: "Review this Node.js Express route handler for:
1. Security vulnerabilities (SQL injection, auth bypass)
2. Performance issues (N+1 queries, unnecessary awaits)
3. Error handling gaps

Format: numbered list, each item:
[SEVERITY: HIGH/MEDIUM/LOW] Description. Fix suggestion.

Code: [paste code here]"`,
                explanation: 'Specific task + format + constraints = actionable, structured output every time.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 2: Zero/One/Few-Shot */}
      <div id="shot-prompting">
        <ConceptCard
          title="Zero/One/Few-Shot Prompting"
          emoji="🎯"
          difficulty="beginner"
          whatIsIt="Shot prompting mein 'shot' ka matlab hai examples. Zero-shot: koi example nahi — sirf instructions. One-shot: ek example. Few-shot: 2-5 examples. Examples se model samajhta hai exact format aur style jo tum chahte ho — words se zyada examples show karte hain."
          whenToUse={[
            'Zero-shot: simple, clear tasks jahan exact format matter nahi karta.',
            'One-shot: jab ek example se format clear ho jaaye — template-like output chahiye.',
            'Few-shot: complex classification, specific format, jab zero/one-shot consistent nahi de.',
            'Few-shot especially helpful hai jab task unconventional ho ya unusual format chahiye.',
          ]}
          whyUseIt="Examples words se zyada powerful hain. 'Write a product description in a casual, punchy style' — ye instruction ambiguous hai. Ek example de do — model exact tone match karega. Few-shot prompting advanced ML knowledge ke bina powerful customization deta hai."
          howToUse={{
            filename: 'shot-prompting.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// Zero-shot: koi example nahi
async function zeroShot(text: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: \`Classify this customer review as POSITIVE, NEGATIVE, or NEUTRAL.
Only respond with the classification word.

Review: \${text}\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text.trim() : '';
}

// One-shot: ek example
async function oneShot(text: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: \`Classify customer reviews. Format: LABEL | Confidence (high/medium/low) | Key reason

Example:
Review: "Product is great but delivery was slow"
Output: POSITIVE | medium | product praised despite delay

Now classify:
Review: \${text}\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text.trim() : '';
}

// Few-shot: multiple examples for consistency
async function fewShot(text: string): Promise<string> {
  const examples = [
    {
      review: 'Amazing product, fast delivery, will buy again!',
      output: 'POSITIVE | high | enthusiastic recommendation',
    },
    {
      review: 'Packaging was damaged but product itself was fine.',
      output: 'NEUTRAL | medium | mixed experience',
    },
    {
      review: 'Complete waste of money. Stopped working in 2 days.',
      output: 'NEGATIVE | high | product failure',
    },
  ];

  const examplesText = examples
    .map((e) => \`Review: "\${e.review}"\\nOutput: \${e.output}\`)
    .join('\\n\\n');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: \`Classify reviews. Format: LABEL | Confidence | Key reason

\${examplesText}

Review: "\${text}"\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text.trim() : '';
}`,
            explanation: 'Zero-shot quick hai, few-shot consistent. Examples mein: last example sabse zyada influence karta hai (recency bias). Best/most representative example ko last mein rakhna best practice hai.',
          }}
          realWorldScenario="Customer feedback categorization system mein: few-shot prompting se model exact categories mein classify karta hai jo business ne define ki hain. Ek trained ML model ki cost aur complexity ke bina — sirf few examples se consistent categorization milti hai."
          commonMistakes={[
            {
              mistake: 'Few-shot examples mein low-quality ya edge cases rakhna',
              why: 'Model examples se patterns seekhta hai. Bad examples → bad output pattern.',
              fix: 'Best, representative examples choose karo. Edge cases deliberately include karo agar model unhe handle karna seekhe. Quality over quantity.',
            },
          ]}
          proTip="Few-shot examples ka ORDER matter karta hai. Last example sabse zyada influence karta hai — recency bias. Jo output style ya format most important hai, uska example last mein rakho. Claude typically 3-5 examples se strong patterns pick kar leta hai."
        />
      </div>

      {/* ConceptCard 3: System Prompts */}
      <div id="system-prompts">
        <ConceptCard
          title="System Prompts — AI Ka Character"
          emoji="🎭"
          difficulty="beginner"
          whatIsIt="System prompt conversation ka persistent background context hai. Ye model ko batata hai: ye kaun hai (persona), kya karna chahiye (task), kya nahi karna chahiye (restrictions), aur output format kya hona chahiye. Ye har message ke saath automatically include hota hai — user ko baar baar repeat nahi karna padta."
          whenToUse={[
            'Customer support bot — persona, product knowledge, escalation rules define karo.',
            'Code reviewer — language, style guide, severity levels define karo.',
            'Tutor — subject, difficulty level, explanation style define karo.',
            'Content generator — tone, brand voice, content restrictions define karo.',
          ]}
          whyUseIt="System prompts production AI features ka foundation hain. Bina system prompt ke — model generic hai. System prompt se — model tumhara specific use case ke liye tuned hai. Ye hi ChatGPT ko Claude se alag feel deta hai, same underlying model hone ke bawajood."
          howToUse={{
            filename: 'system-prompts.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── Template: Effective System Prompt Structure ──────────────
const systemPromptTemplate = \`
You are [SPECIFIC ROLE] at [CONTEXT/COMPANY].
Your job is to [SPECIFIC TASK].

Guidelines:
- Always [REQUIREMENT 1]
- Always [REQUIREMENT 2]
- Never [RESTRICTION 1]
- Never [RESTRICTION 2]

When asked about [EDGE CASE 1], respond with [SPECIFIC BEHAVIOR].
When asked about [EDGE CASE 2], respond with [SPECIFIC BEHAVIOR].

Response format: [FORMAT INSTRUCTIONS]
\`;

// ─── Real Example 1: Customer Support Bot ───────────────────
const supportSystemPrompt = \`
You are Aryan, a friendly customer support agent at NodeMaster — a Node.js learning platform.
Your job is to help students with course questions, technical issues, and billing queries.

Guidelines:
- Always respond in Hinglish (mix of Hindi and English, friendly tone)
- Always acknowledge the student's frustration if they express any
- Never make promises about refunds or discounts without confirmation
- Never share other students' information
- Never answer questions outside NodeMaster scope

When asked about technical code help, say: "Main aapko general direction de sakta hun,
specific debugging ke liye Discord community zyada helpful hogi."
When asked about billing issues, say: "Ye aage escalate kar raha hun — 24 hours mein
aapko email aayega."

Response format: Conversational, 2-4 sentences, end with helpful offer.
\`;

// ─── Real Example 2: Code Reviewer ──────────────────────────
const codeReviewSystemPrompt = \`
You are a senior TypeScript/Node.js engineer with 10 years of production experience.
Your job is to review code for security, performance, and maintainability.

Guidelines:
- Always check for: SQL injection, XSS, CSRF, auth issues
- Always flag: N+1 queries, missing error handling, memory leaks
- Never suggest rewrites for minor style preferences
- Never be harsh — constructive feedback only

Response format:
## Issues Found
[SEVERITY: HIGH/MEDIUM/LOW] **Issue Title**
- Problem: explanation
- Fix: corrected code snippet

## Overall Assessment
1-2 sentences on overall code quality.
\`;

async function reviewCode(code: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: codeReviewSystemPrompt,
    messages: [{ role: 'user', content: \`Review this code:\\n\\\`\\\`\\\`typescript\\n\${code}\\n\\\`\\\`\\\`\` }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}`,
            explanation: 'System prompt mein edge cases explicitly handle karo. Model guess nahi karega — tum batao. Real examples: support bot mein billing escalation rule, code reviewer mein severity format. Ye specificity hi system prompt ko powerful banati hai.',
          }}
          realWorldScenario="Koi bhi production AI feature — Notion AI, GitHub Copilot, customer support bots — sab ke peeche carefully engineered system prompts hain. Ye prompts version controlled hote hain aur regularly improve kiye jaate hain. Prompt engineering ek real engineering discipline ban gayi hai."
          commonMistakes={[
            {
              mistake: 'System prompt mein sirf persona likhna, constraints nahi',
              why: '"You are a helpful assistant" — ye kaafi vague hai. Model nahi jaanta kya allowed hai kya nahi.',
              fix: 'Explicit karo: kya hamesha karna hai, kya kabhi nahi karna hai, edge cases kaise handle karne hain, aur output format kya hona chahiye.',
            },
          ]}
          proTip="System prompt mein edge cases handle karo explicitly. AI uske baare mein guess nahi karega — batao. Real production systems mein system prompts 500-2000 tokens tak ho sakte hain. Ye fine — prompt caching se cost manage ho sakti hai."
        />
      </div>

      {/* ConceptCard 4: Output Format Control */}
      <div id="output-format">
        <ConceptCard
          title="Output Ko Control Karo"
          emoji="📋"
          difficulty="beginner"
          whatIsIt="AI se consistent, parseable output lena ek critical skill hai. JSON output, markdown, numbered lists, specific schemas — ye sab control kiya ja sakta hai clear format instructions se. Ye production apps ke liye essential hai jahan output programmatically parse karna padta hai."
          whenToUse={[
            'API responses: structured JSON chahiye programmatic parsing ke liye.',
            'Reports: markdown formatting with sections chahiye.',
            'Classifications: specific labels chahiye — fixed set of outputs.',
            'Data extraction: specific fields extract karne hain documents se.',
          ]}
          whyUseIt="Unstructured text production mein parse karna unreliable hai. JSON output se tum directly response ko TypeScript objects mein convert kar sakte ho bina complex parsing ke. Ye reliability aur developer experience dono improve karta hai."
          howToUse={{
            filename: 'output-format-control.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── JSON Output with Schema ─────────────────────────────────
interface ProductAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-1
  keyThemes: string[];
  suggestedAction: string;
  urgency: 'low' | 'medium' | 'high';
}

async function analyzeReview(reviewText: string): Promise<ProductAnalysis> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: \`Analyze this product review. Respond ONLY with valid JSON. No explanation before or after.

Schema:
{
  "sentiment": "positive" | "negative" | "neutral",
  "confidence": number between 0 and 1,
  "keyThemes": string array of main topics mentioned,
  "suggestedAction": string describing recommended business action,
  "urgency": "low" | "medium" | "high"
}

Review: "\${reviewText}"\`,
    }],
  });

  const block = response.content[0];
  const text = block.type === 'text' ? block.text : '{}';
  return JSON.parse(text) as ProductAnalysis;
}

// ─── Markdown Report Format ──────────────────────────────────
async function generateReport(data: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: \`Generate a business report from this data.

Required format (exact markdown):
# Executive Summary
[2-3 sentences]

## Key Findings
- Finding 1
- Finding 2
- Finding 3

## Recommendations
1. [Priority action]
2. [Secondary action]

## Risk Assessment
[1 paragraph]

Data:
\${data}\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── Constrained Classification ──────────────────────────────
async function classifyTicket(ticketText: string): Promise<string> {
  const validCategories = ['billing', 'technical', 'feature-request', 'bug-report', 'general'];
  const response = await client.messages.create({
    model: 'claude-haiku-4-5', // haiku — fast for classification
    max_tokens: 32,
    messages: [{
      role: 'user',
      content: \`Classify this support ticket. Respond with EXACTLY one of: \${validCategories.join(', ')}
No other text.

Ticket: \${ticketText}\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text.trim() : 'general';
}`,
            explanation: 'JSON output ke liye "ONLY valid JSON, no explanation" critical hai. Schema provide karo — model ye precisely follow karega. Classification ke liye Haiku use karo (fast + cheap) — Sonnet overkill hai simple tasks ke liye.',
          }}
          realWorldScenario="E-commerce mein customer reviews automatically classify aur analyze karne ke liye: JSON output se directly database mein insert kar sakte ho. Parse karna simple — JSON.parse(). Unstructured text se same kaam karna 10x complex hota."
          commonMistakes={[
            {
              mistake: '"Respond in JSON" likhna bina "ONLY" ke',
              why: 'Model JSON ke baad explanation add kar deta hai. JSON.parse() fail ho jaata hai — runtime error!',
              fix: '"Respond ONLY with valid JSON. No explanation before or after." — "ONLY" aur "No explanation" dono zaroori hain.',
            },
          ]}
          proTip='JSON output ke liye: "Respond ONLY with valid JSON. No explanation. Schema: {...}". Claude is very reliable at this. Anthropic ke newer models mein structured output (tool use as JSON extractor) bhi available hai — aur bhi reliable approach.'
        />
      </div>

      {/* ConceptCard 5: Chain-of-Thought */}
      <div id="chain-of-thought">
        <ConceptCard
          title="Chain-of-Thought — Sochne Do"
          emoji="🧩"
          difficulty="intermediate"
          whatIsIt={`Jab AI ko complex reasoning task milta hai — seedha answer nahi, step-by-step sochne do. "Let's think step by step" ya explicit steps define karne se accuracy dramatically improve hoti hai. Ye Chain-of-Thought (CoT) prompting hai. Brain ko show-your-work karne do.`}
          whenToUse={[
            'Math problems — step-by-step calculation chahiye.',
            'Logic puzzles — deductive reasoning needed.',
            'Code debugging — "walk me through what this code does step by step".',
            'Decision making — "analyze pros and cons before giving recommendation".',
            'Complex analysis — "break this down into components before concluding".',
          ]}
          whyUseIt="Research show karta hai ki CoT prompting complex tasks mein 40-70% accuracy improve kar sakta hai. Intermediate steps generate karne se model aage ki reasoning mein mistakes kam karta hai. Ye humans ke liye bhi useful hai — reasoning transparent ho jaati hai."
          howToUse={{
            filename: 'chain-of-thought.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── Simple CoT trigger ───────────────────────────────────────
async function withCoT(problem: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: \`\${problem}

Let's think through this step by step before giving the final answer.\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── Structured CoT with explicit steps ──────────────────────
async function structuredCoT(codeToDebug: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: \`Debug this code. Follow these steps exactly:

Step 1: Read the code line by line and describe what it does
Step 2: Identify any logical errors, off-by-one issues, or wrong assumptions
Step 3: Check for edge cases that could cause failures
Step 4: Identify the root cause of the bug
Step 5: Write the corrected code

Code:
\\\`\\\`\\\`typescript
\${codeToDebug}
\\\`\\\`\\\`\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── CoT for decision making ──────────────────────────────────
async function architectureDecision(requirements: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: 'You are a senior software architect. Think through technical decisions carefully.',
    messages: [{
      role: 'user',
      content: \`I need to choose a database for this application.

Requirements: \${requirements}

Please analyze by:
1. List all requirements and their implications for DB choice
2. Consider top 3 database options (PostgreSQL, MongoDB, Redis, etc.)
3. For each: pros, cons, fit with requirements
4. Recommend one with reasoning
5. Mention potential risks of your recommendation\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}`,
            explanation: 'CoT ke liye ya explicit steps provide karo ya "Let\'s think step by step" use karo. Explicit steps zyada reliable hain complex tasks mein. Claude naturally CoT karta hai complex problems par — encourage karna consistency improve karta hai.',
          }}
          realWorldScenario="Code review automation mein: CoT se model pehle code structure samajhta hai, phir potential issues identify karta hai, phir severity rate karta hai, phir fix suggest karta hai. Is systematic approach se much better code reviews milti hain seedhe answer se zyada."
          commonMistakes={[
            {
              mistake: 'Har task ke liye CoT use karna',
              why: 'CoT zyada tokens generate karta hai — slow aur expensive. "Paris ki capital kya hai?" ke liye CoT unnecessary hai.',
              fix: 'CoT sirf complex reasoning tasks ke liye use karo. Simple factual questions, classifications, short generations — direct answer better hai.',
            },
          ]}
          proTip="Claude mein extended thinking feature available hai API mein (betas.messages.create with thinking parameter) — ye Claude ko silently reason karne deta hai answer se pehle. Complex problems ke liye best. Visible thinking tokens bhi dekh sakte ho jo debugging ke liye helpful hain."
          demo={
            <DiffBlock
              title="Without CoT vs With CoT — Complex Problem"
              language="text"
              bad={{
                label: '❌ Without CoT — Direct Answer',
                code: `Prompt: "A store sells apples at 3 for ₹10 and oranges at
2 for ₹15. If I buy 12 apples and 8 oranges, how much
do I pay? Is it cheaper to buy 15 of each?"

AI: "₹100 for the combination. Buying 15 of each
costs ₹125 + ₹112.5 = ₹237.5"
[Often makes arithmetic errors without showing work]`,
                explanation: 'Direct answer without reasoning — errors hide ho jaate hain. Verification impossible.',
              }}
              good={{
                label: '✅ With CoT — Step by Step',
                code: `Prompt: [same] + "Think step by step."

AI: "Let me work through this:

Step 1 — Apple cost:
3 apples = ₹10, so 1 apple = ₹3.33
12 apples = 12 × ₹3.33 = ₹40

Step 2 — Orange cost:
2 oranges = ₹15, so 1 orange = ₹7.50
8 oranges = 8 × ₹7.50 = ₹60

Step 3 — Total: ₹40 + ₹60 = ₹100 ✓

Step 4 — Comparison (15 each):
15 apples = 5 × ₹10 = ₹50
15 oranges = 7.5 × ₹15 = ₹112.50
Total = ₹162.50

So ₹100 < ₹162.50 — original purchase is cheaper."`,
                explanation: 'CoT se intermediate steps visible hain — verification possible, errors caught, reasoning transparent.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 6: Developer Prompt Templates */}
      <div id="prompt-templates">
        <ConceptCard
          title="Ready-to-Use Templates"
          emoji="📝"
          difficulty="intermediate"
          whatIsIt="Reusable prompt templates banao aur version control karo — ye code hai. Template functions TypeScript mein string interpolation se dynamic prompts generate karte hain. Ye templates team ke liye shareable, testable, aur improvable hain."
          whenToUse={[
            'Repeated tasks ke liye — code review, bug explanation, documentation generation.',
            'Team workflows mein — consistent prompts ensure consistent output.',
            'Production AI features mein — system prompts aur user prompts template se generate karo.',
            'A/B testing ke liye — alag prompt versions compare karo.',
          ]}
          whyUseIt="Ad-hoc prompts inconsistent results dete hain. Templates consistency ensure karte hain. Version controlling prompts se tum track kar sakte ho ki kaunse changes output improve karte hain — exactly jaise code improvements track karte ho."
          howToUse={{
            filename: 'prompt-templates.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── Template 1: Code Review ──────────────────────────────────
const codeReviewPrompt = (code: string, language: string = 'TypeScript') => \`
You are a senior software engineer reviewing production code.

Review this \${language} code for:
1. Security vulnerabilities (OWASP Top 10)
2. Performance issues (N+1 queries, unnecessary computations, memory leaks)
3. Code quality (readability, naming, SOLID principles)
4. Missing error handling

Format each issue as:
**[SEVERITY: HIGH/MEDIUM/LOW]** Issue title
- Problem: clear explanation
- Fix: corrected code snippet

Code:
\\\`\\\`\\\`\${language.toLowerCase()}
\${code}
\\\`\\\`\\\`
\`;

// ─── Template 2: Bug Explanation ──────────────────────────────
const bugExplainPrompt = (error: string, context: string) => \`
Explain this error in simple terms, then provide the fix.

Error:
\\\`\\\`\\\`
\${error}
\\\`\\\`\\\`

Context: \${context}

Format your response as:
1. **What went wrong** (simple explanation, no jargon)
2. **Why it happened** (root cause)
3. **Fix** (corrected code with explanation)
4. **Prevention** (how to avoid this in future)
\`;

// ─── Template 3: API Documentation ───────────────────────────
const apiDocPrompt = (endpoint: string, code: string) => \`
Generate clear API documentation for this endpoint.

Endpoint: \${endpoint}
Code:
\\\`\\\`\\\`typescript
\${code}
\\\`\\\`\\\`

Output format (exact markdown):
## \${endpoint}

**Description:** [what it does]

**Authentication:** [required/optional/none]

### Request
\\\`\\\`\\\`json
{
  "param": "type and description"
}
\\\`\\\`\\\`

### Response
\\\`\\\`\\\`json
{
  "field": "type and description"
}
\\\`\\\`\\\`

### Error Codes
| Code | Meaning |
|------|---------|
| 400 | [reason] |
| 401 | [reason] |
\`;

// ─── Using templates ──────────────────────────────────────────
async function runTemplate(prompt: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// Usage:
// const review = await runTemplate(codeReviewPrompt(myCode, 'TypeScript'));
// const bugHelp = await runTemplate(bugExplainPrompt(errorMsg, 'Express route'));
// const docs = await runTemplate(apiDocPrompt('POST /api/users', routeCode));`,
            explanation: 'Templates TypeScript functions hain — type-safe, testable, version-controllable. Input validation add karo templates mein. Prompt ko git mein commit karo jaise code — ye production asset hai.',
          }}
          realWorldScenario="Sequifi jaise platforms mein: automated code review pipeline, PR description generator, test generation — sab prompt templates se powered hain. Har PR par same quality checks run hote hain, consistently. Manual review time drastically kam hota hai."
          commonMistakes={[
            {
              mistake: 'Prompts ko code mein hardcode karna bina version control ke',
              why: 'Prompt changes track nahi hote — kaunsa version better tha? Rollback kaise karo?',
              fix: 'Prompts separate constants mein rakho, git mein commit karo. Changes: git diff se visible. Rollback: git revert se possible.',
            },
          ]}
          proTip="Prompt templates banao aur version control karo jaise code karte ho. Prompts code hain — inhe test karo, review karo, improve karo. Large teams mein prompt library shared repo mein rakho. Prompt versioning aur A/B testing se measurable quality improvements milte hain."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 6 Quiz — Prompt Engineering
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye pass ke liye. Best of luck!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="prompt-engineering-basics" />
      </div>
    </div>
  )
}
