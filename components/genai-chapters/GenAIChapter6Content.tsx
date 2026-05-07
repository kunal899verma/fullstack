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
          Shocking fact: same model ko same question alag prompt se puchho — 10x better answer mil sakta hai. Prompt engineering magic nahi hai — ye ek systematic skill hai. Aur ye skill ek developer ki most important superpower hai AI era mein. Ek junior developer achhe prompts se senior developer jitna output le sakta hai AI se. Aaj ye skill seekhte hain.
        </p>
      </div>

      {/* ConceptCard 1: What is Prompt Engineering */}
      <div id="prompt-engineering-intro">
        <ConceptCard
          title="Prompt Engineering — Art + Science"
          emoji="🎯"
          difficulty="beginner"
          whatIsIt="Prompt engineering = AI ko sahi tarike se instruction dene ki science. Vague prompts = vague outputs — ye guaranteed hai. Ek formula jo works karta hai: Role + Context + Task + Format + Constraints. Role: model ko batao ye kaun hai (senior Node.js architect). Context: relevant background (10 years production experience). Task: exactly kya karna hai. Format: output kaisa hona chahiye (numbered list with severity). Constraints: kya nahi karna (no harsh criticism). Ye sab include karo — output quality dramatic improvement dikhata hai."
          whenToUse={[
            'Har baar jab AI model use karo — chatbot, API, automation.',
            'AI workflows automate karte waqt — consistent output chahiye toh structured prompts zaroori hain.',
            'AI-powered features build karte waqt — system prompts production mein use hote hain.',
            'Team ke liye prompt library banate waqt — reusable templates.',
          ]}
          whyUseIt="Ye skill isliye critical hai: GitHub Copilot, Notion AI, customer support bots — sab ke peeche carefully engineered prompts hain. Ye version-controlled hain, tested hain, production assets hain. Ek developer jo prompts ko seriously leta hai, wo AI se consistently better output leta hai. Aur business mein: better prompts = better products = competitive advantage."
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
            explanation: 'Under the hood: LLM probability distribution se next token predict karta hai. Acha system prompt us distribution ko shape karta hai — model ko specific context mein seedh karta hai. Role (senior Node.js architect) + Context + Task + Format + Constraints = model ke liye clear signal. Vague input = flat distribution = generic output. Specific input = peaked distribution = useful output.',
          }}
          realWorldScenario="Sawaal: GitHub Copilot same Claude/GPT model use karta hai jo tum use karte ho. Phir Copilot better kyun lagta hai coding ke liye? Answer: carefully engineered system prompts — codebase context, user coding style, specific standards, project structure sab inject hota hai. Same model + better prompts = 10x better experience. Ye 'prompt engineering as product engineering' ka best example hai."
          commonMistakes={[
            {
              mistake: 'Vague instructions dena — "write good code"',
              why: '"Good" ke baare mein model ka aur tumhara interpretation alag ho sakta hai. Vague instruction = vague output.',
              fix: 'Specific karo: "Write TypeScript function with error handling, JSDoc comments, and unit tests. Follow SOLID principles. No any types."',
            },
          ]}
          proTip="Yaad karo ye formula: Role + Context + Task + Format + Constraints = Excellent output. 'Senior Node.js architect' vs 'developer' — specificity matter karta hai. 'Review security vulnerabilities' vs 'improve code' — specific task = specific answer. Aur ye bhoolna mat: prompt engineering ek iterative process hai. Pehla draft perfect nahi hoga — test karo, improve karo, version control mein commit karo."
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
          whatIsIt="'Shot' = example. Zero-shot: koi example nahi, sirf instruction — model khud interpret karta hai. One-shot: ek example do — model samajhta hai exact format, style, tone. Few-shot: 2-5 examples — consistency dramatically better. Examples words se zyada powerful hain. 'Casual, punchy product description likho' — ambiguous. Ek example do — model exact match karega. Ye hi shot prompting ki power hai."
          whenToUse={[
            'Zero-shot: simple, clear tasks jahan exact format matter nahi karta.',
            'One-shot: jab ek example se format clear ho jaaye — template-like output chahiye.',
            'Few-shot: complex classification, specific format, jab zero/one-shot consistent nahi de.',
            'Few-shot especially helpful hai jab task unconventional ho ya unusual format chahiye.',
          ]}
          whyUseIt="Customer feedback classification system banana hai? 8-10 specific categories mein? Instructions se describe karna mushkil hai — lekin 3-5 examples deke model ek dum sahi classify karta hai. Ek trained ML model ki cost aur time ke bina. Few-shot prompting = zero ML training + specific behavior. Ye approach production mein extensively use hoti hai."
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
          realWorldScenario="E-commerce mein product review categorization: 12 different categories — packaging, delivery speed, product quality, customer service, pricing, etc. Fine-tuned model banana? Weeks + expensive. Few-shot prompting: 3 examples per category (36 examples total) — consistent categorization milti hai. Startup ne is approach se 2 din mein deploy kiya. ML model ne wahin 3 hafton mein ban kar 78% accuracy di thi. Speed wins."
          commonMistakes={[
            {
              mistake: 'Few-shot examples mein low-quality ya edge cases rakhna',
              why: 'Model examples se patterns seekhta hai. Bad examples → bad output pattern.',
              fix: 'Best, representative examples choose karo. Edge cases deliberately include karo agar model unhe handle karna seekhe. Quality over quantity.',
            },
          ]}
          proTip="Critical insight: few-shot examples ka ORDER matter karta hai! LLMs mein recency bias hota hai — last example sabse zyada influence karta hai output style par. Isliye best/most representative example hamesha LAST mein rakho. Claude typically 3-5 good examples se strong patterns pick kar leta hai. Quality over quantity — 3 excellent examples > 10 mediocre examples."
        />
      </div>

      {/* ConceptCard 3: System Prompts */}
      <div id="system-prompts">
        <ConceptCard
          title="System Prompts — AI Ka Character"
          emoji="🎭"
          difficulty="beginner"
          whatIsIt="System prompt = AI ka character. Ye conversation ka persistent background context hai jo har message ke saath automatically include hota hai. Model ko batata hai: ye kaun hai (Aryan, NodeMaster support agent), kya karna chahiye (Hinglish mein help karo), kya nahi karna chahiye (refund promises mat karo), edge cases kaise handle karo, aur output format kya hona chahiye. Bina system prompt — generic AI. System prompt ke saath — tera specific product assistant."
          whenToUse={[
            'Customer support bot — persona, product knowledge, escalation rules define karo.',
            'Code reviewer — language, style guide, severity levels define karo.',
            'Tutor — subject, difficulty level, explanation style define karo.',
            'Content generator — tone, brand voice, content restrictions define karo.',
          ]}
          whyUseIt="Har AI product ka secret weapon = system prompt. Notion AI, GitHub Copilot, customer service bots — sab ke peeche carefully crafted system prompts hain. Same Claude model use karo — system prompt se usse apna product-specific assistant banao. Ye version controlled hote hain, tested hote hain, aur iteratively improve kiye jaate hain. Prompt engineering = real engineering discipline hai."
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
          realWorldScenario="Ek saas startup mein: Customer support bot bina system prompt ke generic Claude ki tarah respond karta tha — company-specific policies, product details, escalation rules — kuch nahi. 500-word specific system prompt add kiya: tone, constraints, edge cases, product knowledge. Support ticket resolution 60% se 85% ho gayi, customer satisfaction dramatically better. Ek system prompt change — measurable business impact."
          commonMistakes={[
            {
              mistake: 'System prompt mein sirf persona likhna, constraints nahi',
              why: '"You are a helpful assistant" — ye kaafi vague hai. Model nahi jaanta kya allowed hai kya nahi.',
              fix: 'Explicit karo: kya hamesha karna hai, kya kabhi nahi karna hai, edge cases kaise handle karne hain, aur output format kya hona chahiye.',
            },
          ]}
          proTip="Edge cases explicitly handle karo system prompt mein — AI guess nahi karega, tujhe batana padega. Real production systems mein system prompts 500-2000 tokens tak ho sakte hain — ye bilkul theek hai. Anthropic prompt caching se repeated system prompts ka cost 90% kam ho jaata hai. System prompt = code hai — git mein commit karo, review karo, improve karo."
        />
      </div>

      {/* ConceptCard 4: Output Format Control */}
      <div id="output-format">
        <ConceptCard
          title="Output Ko Control Karo"
          emoji="📋"
          difficulty="beginner"
          whatIsIt="Production mein AI output use karna hai toh structured output zaroori hai. Free text parse karna = fragile code = bugs in production. JSON output, markdown, specific schemas — ye sab control ho sakta hai clear instructions se. Magic words: 'Respond ONLY with valid JSON. No explanation before or after. Schema: {...}'. 'ONLY' aur 'No explanation' dono zaroori hain — bina iske model JSON ke baad explanation add kar deta hai aur JSON.parse() crash ho jaata hai."
          whenToUse={[
            'API responses: structured JSON chahiye programmatic parsing ke liye.',
            'Reports: markdown formatting with sections chahiye.',
            'Classifications: specific labels chahiye — fixed set of outputs.',
            'Data extraction: specific fields extract karne hain documents se.',
          ]}
          whyUseIt="Unstructured text parse karna = regex hell = maintenance nightmare. JSON output se directly TypeScript objects — type-safe, predictable, no parsing logic. Production reliability dramatically improve hoti hai. Ye ek common mistake hai: developers AI feature banate hain, unstructured text parse karne ki koshish karte hain, production mein bugs aate hain. Format control pehle se hi karo."
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
          realWorldScenario="E-commerce review pipeline: structured JSON output se directly database insert — sentiment, themes, urgency, recommended action. JSON.parse() — done. No regex, no parsing logic, no bugs. Ye same pipeline text output se banana padta: NLP parsing + regex + edge case handling = weeks of work + ongoing maintenance. Structured output = engineering efficiency."
          commonMistakes={[
            {
              mistake: '"Respond in JSON" likhna bina "ONLY" ke',
              why: 'Model JSON ke baad explanation add kar deta hai. JSON.parse() fail ho jaata hai — runtime error!',
              fix: '"Respond ONLY with valid JSON. No explanation before or after." — "ONLY" aur "No explanation" dono zaroori hain.',
            },
          ]}
          proTip='Production tip: "Respond ONLY with valid JSON. No explanation before or after. Schema: {...}". Claude is very reliable at this. Anthropic ke newer models mein tool use / function calling as JSON extractor bhi available hai — aur bhi reliable, because model explicitly JSON mode mein switch karta hai. Classification ke liye Haiku use karo — simple tasks ke liye Sonnet overkill aur expensive hai.'
        />
      </div>

      {/* ConceptCard 5: Chain-of-Thought */}
      <div id="chain-of-thought">
        <ConceptCard
          title="Chain-of-Thought — Sochne Do"
          emoji="🧩"
          difficulty="intermediate"
          whatIsIt="Shocking finding: magic words 'Let's think step by step' add karne se complex reasoning problems mein accuracy 40-70% improve hoti hai. Ye Chain-of-Thought prompting hai. Bina CoT: model directly answer guess karta hai — intermediate steps skip karta hai. CoT ke saath: model pehle sochta hai, step by step, phir answer deta hai — galti intermediate step mein pakad aati hai. School mein jo teacher ne bola tha 'show your work' — AI ke liye bhi same rule apply hota hai!"
          whenToUse={[
            'Math problems — step-by-step calculation chahiye.',
            'Logic puzzles — deductive reasoning needed.',
            'Code debugging — "walk me through what this code does step by step".',
            'Decision making — "analyze pros and cons before giving recommendation".',
            'Complex analysis — "break this down into components before concluding".',
          ]}
          whyUseIt="CoT sirf accuracy ke liye nahi — transparency ke liye bhi. Reasoning steps visible hone se: galti pakad sakte ho (AI galat step par wrong assumption bana sakta hai), user confidence badhta hai (reasoning dikhta hai), debugging easy hota hai. Complex code debugging, architecture decisions, math problems — ye sab CoT se dramatically better results dete hain. Lekin simple questions par mat use karo — overhead waste hai."
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
          realWorldScenario="Automated code review pipeline mein CoT: Step 1 — code structure samjho aur kya karta hai describe karo. Step 2 — potential security issues identify karo. Step 3 — performance bottlenecks dhundho. Step 4 — severity rate karo. Step 5 — fix suggest karo. Ye systematic approach direct answer se dramatically better reviews deta hai. Aur developer visibility milti hai — review process transparent hai, result blindly accept nahi karna padta."
          commonMistakes={[
            {
              mistake: 'Har task ke liye CoT use karna',
              why: 'CoT zyada tokens generate karta hai — slow aur expensive. "Paris ki capital kya hai?" ke liye CoT unnecessary hai.',
              fix: 'CoT sirf complex reasoning tasks ke liye use karo. Simple factual questions, classifications, short generations — direct answer better hai.',
            },
          ]}
          proTip="Claude ka extended thinking feature API mein available hai — Claude silently reason karta hai answer se pehle, phir final answer deta hai. Complex problems ke liye best. Visible thinking tokens bhi dekh sakte ho — debugging ke liye extremely helpful. Tree of Thoughts (ToT) advanced version hai: multiple reasoning branches explore karo, dead ends se backtrack karo. Complex planning ke liye excellent."
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
          whatIsIt="Shocking realization: prompts code hain. Production mein har API call ek specific prompt use karta hai — wo prompt ek asset hai. Ad-hoc prompts = inconsistent results = frustrated users. Templates: TypeScript functions jo dynamic prompts generate karte hain, type-safe, testable, version-controllable. Code review prompt, bug explanation prompt, API docs prompt — sab reusable templates. Ek baar likho, everywhere use karo, continuously improve karo."
          whenToUse={[
            'Repeated tasks ke liye — code review, bug explanation, documentation generation.',
            'Team workflows mein — consistent prompts ensure consistent output.',
            'Production AI features mein — system prompts aur user prompts template se generate karo.',
            'A/B testing ke liye — alag prompt versions compare karo.',
          ]}
          whyUseIt="Templates kab use karni chahiye? Jab same type ka task baar baar ho — code review, bug explanation, documentation. Templates se consistency ensure hoti hai aur team ke liye shareable hain. Version controlling prompts se track kar sakte ho kaunsa version better tha — git diff prompt changes = measurable improvements. Ye approach professional AI development ka hallmark hai."
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
          realWorldScenario="Engineering team workflow: automated code review pipeline + PR description generator + test generation — sab prompt templates se powered. Har PR par same quality checks automatically. Manual review time 60% kam hua. 50 PRs/week — team kuch hours instead of days mein review karta hai. Prompt templates = force multiplier for engineering productivity."
          commonMistakes={[
            {
              mistake: 'Prompts ko code mein hardcode karna bina version control ke',
              why: 'Prompt changes track nahi hote — kaunsa version better tha? Rollback kaise karo?',
              fix: 'Prompts separate constants mein rakho, git mein commit karo. Changes: git diff se visible. Rollback: git revert se possible.',
            },
          ]}
          proTip="Level up: Prompt A/B testing karo — version 1 vs version 2, same inputs, compare outputs. Measurable quality improvement track karo. Large teams mein shared prompt library banao — separate repo ya monorepo ka prompts/ folder. Prompts ko first-class citizens treat karo: code review, testing, deployment. Ye mindset shift ek developer ko AI-native developer banata hai."
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
