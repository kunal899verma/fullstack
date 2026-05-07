'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── AI Hierarchy Diagram ──────────────────────────────────────────────────────

function AIHierarchyDiagram() {
  const levels = [
    {
      label: 'Artificial Intelligence',
      sub: 'Machines that behave intelligently',
      color: '#7C3AED',
      examples: 'Chess engines, spam filters, recommendations',
    },
    {
      label: 'Machine Learning',
      sub: 'Systems that learn from data',
      color: '#06B6D4',
      examples: 'Netflix recommendations, fraud detection, email spam',
    },
    {
      label: 'Deep Learning',
      sub: 'Neural networks with many layers',
      color: '#F59E0B',
      examples: 'Image recognition, speech-to-text, translation',
    },
    {
      label: 'Generative AI',
      sub: 'Creates new content',
      color: '#F97316',
      examples: 'ChatGPT, Claude, Midjourney, GitHub Copilot',
    },
  ]

  return (
    <div className="space-y-2 my-4">
      {levels.map((level, i) => (
        <div
          key={level.label}
          className="rounded-xl p-4"
          style={{
            marginLeft: i * 16,
            background: `${level.color}10`,
            border: `1px solid ${level.color}40`,
          }}
        >
          <div className="font-semibold text-[#F5F5F7] text-sm">{level.label}</div>
          <div className="text-xs text-[#A1A1AA] mt-0.5">{level.sub}</div>
          <div className="text-xs mt-1.5" style={{ color: level.color }}>
            Examples: {level.examples}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── AI Timeline ───────────────────────────────────────────────────────────────

function AITimeline() {
  const events = [
    { year: '1950', event: 'Alan Turing — "Can machines think?"', color: '#71717A' },
    { year: '1986', event: 'Backpropagation — Neural nets trainable', color: '#71717A' },
    { year: '2012', event: 'AlexNet — Deep learning revolution starts', color: '#F59E0B' },
    { year: '2017', event: '"Attention Is All You Need" — Transformers born', color: '#7C3AED' },
    { year: '2020', event: 'GPT-3 — Language model scale breakthrough', color: '#7C3AED' },
    { year: '2022', event: 'ChatGPT — AI goes mainstream. Game changer.', color: '#F97316' },
    { year: '2024', event: 'GPT-4o, Claude 3, Gemini — Multimodal era', color: '#EF4444' },
  ]

  return (
    <div className="relative pl-6 my-4 space-y-3">
      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[rgba(255,255,255,0.1)]" />
      {events.map((e) => (
        <div key={e.year} className="relative">
          <div
            className="absolute -left-4 top-1 w-2 h-2 rounded-full"
            style={{ background: e.color }}
          />
          <div className="text-xs font-mono" style={{ color: e.color }}>
            {e.year}
          </div>
          <div className="text-sm text-[#A1A1AA]">{e.event}</div>
        </div>
      ))}
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'AI, ML, DL, GenAI — kaunsa sabse broad (wide) term hai?',
    options: [
      {
        text: 'Generative AI',
        correct: false,
        explanation: 'GenAI sabse narrow term hai — ye AI ka ek specific subset hai jo naya content generate karta hai.',
      },
      {
        text: 'Deep Learning',
        correct: false,
        explanation: 'Deep Learning ML ka ek subset hai — neural networks with many layers. Broad nahi hai ye.',
      },
      {
        text: 'Machine Learning',
        correct: false,
        explanation: 'ML AI ka subset hai — data se learning. Broad hai, lekin broadest nahi.',
      },
      {
        text: 'Artificial Intelligence',
        correct: true,
        explanation: 'Bilkul sahi! AI sabse broad term hai. ML iska subset hai, Deep Learning ML ka subset hai, aur GenAI Deep Learning ka subset hai. Nesting AI → ML → DL → GenAI.',
      },
    ],
  },
  {
    question: 'RLHF (Reinforcement Learning from Human Feedback) kya hai aur ChatGPT/Claude jaise models mein kahan use hota hai?',
    options: [
      {
        text: 'Model ko pre-train karne ki technique — raw internet data se seekhna',
        correct: false,
        explanation: 'Pre-training mein Self-Supervised Learning use hoti hai, RLHF nahi. RLHF fine-tuning phase mein aata hai.',
      },
      {
        text: 'Fine-tuning technique jahan human raters model ke responses ko rank karte hain aur model us feedback se improve karta hai',
        correct: true,
        explanation: 'Sahi! RLHF: humans different responses rank karte hain → reward model train hota hai → LLM ko reward maximize karne ke liye train kiya jaata hai. Ye hi models ko helpful aur safe banata hai.',
      },
      {
        text: 'Image generation ke liye specialized technique',
        correct: false,
        explanation: 'RLHF primarily language models ke fine-tuning mein use hota hai — image generation ke liye alag approaches hain.',
      },
      {
        text: 'Ek hardware optimization technique jo training fast karta hai',
        correct: false,
        explanation: 'RLHF algorithm/training methodology hai, hardware optimization nahi.',
      },
    ],
  },
  {
    question: 'LLM "hallucinate" kyun karta hai — confident wrong answers kyun deta hai?',
    options: [
      {
        text: 'Kyunki training data mein errors the',
        correct: false,
        explanation: 'Partially true ho sakta hai, lekin ye hallucination ka main reason nahi hai. Hallucination LLMs ki fundamental nature se hai.',
      },
      {
        text: 'Kyunki LLM actually "samajhta" nahi — ye next token predict karta hai probability distribution se, understanding nahi karta. High probability path kabhi kabhi factually galat hota hai.',
        correct: true,
        explanation: 'Bilkul sahi! LLM statistical pattern matching karta hai. Ye ek aise text generate karta hai jo plausible lagta hai — lekin factual accuracy guarantee nahi hai. Isliye critical information hamesha verify karni chahiye.',
      },
      {
        text: 'Kyunki internet par wrong information hai',
        correct: false,
        explanation: 'Training data quality matter karta hai, lekin hallucination mainly LLMs ki probabilistic token prediction nature ki wajah se hota hai.',
      },
      {
        text: 'Ye sirf older models mein hota tha — new models hallucinate nahi karte',
        correct: false,
        explanation: 'Hallucination sab LLMs mein hota hai — GPT-4, Claude, Gemini sab. New models zyada accurate hain, lekin hallucination-free nahi. Verification hamesha zaruri hai.',
      },
    ],
  },
  {
    question: 'Supervised aur Unsupervised learning mein kya fundamental fark hai?',
    options: [
      {
        text: 'Supervised sirf images ke liye hai, Unsupervised text ke liye',
        correct: false,
        explanation: 'Data type se ye classification nahi hoti. Dono text, images, tabular data — sab pe kaam karte hain.',
      },
      {
        text: 'Supervised labeled training data use karta hai (input-output pairs), Unsupervised unlabeled data mein patterns khud dhundhta hai',
        correct: true,
        explanation: 'Exactly! Supervised: "ye cat hai, ye dog hai" — labeled examples se seekhna. Unsupervised: "ye data mein groups dhundho" — no labels, model khud patterns find karta hai like clustering.',
      },
      {
        text: 'Supervised zyada accurate hota hai isliye hamesha prefer kiya jaata hai',
        correct: false,
        explanation: 'Dono ke apne use cases hain. Labeled data collect karna expensive hota hai. Unsupervised anomaly detection, customer segmentation jaise cases mein best hai.',
      },
      {
        text: 'Unsupervised sirf exploration ke liye hai, production mein use nahi hota',
        correct: false,
        explanation: 'Unsupervised learning production mein khoob use hota hai — fraud detection (anomaly detection), recommendation systems (clustering), dimensionality reduction.',
      },
    ],
  },
  {
    question: 'Temperature = 0 vs Temperature = 1 mein kya fark hoga LLM output mein?',
    options: [
      {
        text: 'Temperature = 0 output bilkul random hoga, Temperature = 1 deterministic',
        correct: false,
        explanation: 'Ulta hai. Temperature = 0 deterministic hai (hamesha highest probability token choose karta hai), Temperature = 1 zyada random/creative.',
      },
      {
        text: 'Temperature = 0 hamesha same output dega (deterministic), Temperature = 1 varied/creative output dega',
        correct: true,
        explanation: 'Bilkul sahi! Temperature = 0: greedy decoding — hamesha highest probability token. Same input = same output. Code generation ke liye ideal. Temperature = 1: sampling — variation aur creativity. Creative writing ke liye better.',
      },
      {
        text: 'Temperature = 0 fast responses deta hai, Temperature = 1 slow',
        correct: false,
        explanation: 'Temperature inference speed affect nahi karta directly — ye token selection strategy hai, computation speed nahi.',
      },
      {
        text: 'Temperature sirf ChatGPT mein kaam karta hai, Claude mein nahi',
        correct: false,
        explanation: 'Temperature ek standard parameter hai jo sab major LLM APIs mein available hai — OpenAI, Anthropic (Claude), Google Gemini, sab mein.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter1Content() {
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
          AI &amp; ML — Basics Samjho 🧠
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Artificial Intelligence ek tool hai — aur ye tool 2024 mein sabse powerful tool available hai. Samjho kaise kaam karta hai, phir build karo.
        </p>
        <div
          className="rounded-xl p-4 mb-2"
          style={{
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.3)',
          }}
        >
          <p className="text-[#FED7AA] text-sm italic">
            &quot;AI will not replace developers. But developers who use AI will replace those who don&apos;t.&quot; — Har senior engineer 2024 mein
          </p>
        </div>
      </div>

      {/* ConceptCard 1: AI vs ML vs DL vs GenAI */}
      <div id="ai-hierarchy">
        <ConceptCard
          title="AI, ML, DL, GenAI — Nested Concepts"
          emoji="🧠"
          difficulty="beginner"
          whatIsIt="Ye nested subsets hain. AI (broadest) → ML → Deep Learning → Generative AI (narrowest). Jaise: Transport → Vehicle → Car → Sports Car. GenAI AI ka ek specific type hai jo naya content — text, images, code, audio — generate karta hai."
          whenToUse={[
            'Traditional AI (rule-based): jab problem well-defined ho aur rules explicitly code ki ja sakein — chess, scheduling.',
            'Machine Learning: jab patterns data mein hain aur rules manually define karna impossible ho — spam detection, recommendations.',
            'Deep Learning: jab data bahut complex ho — images, audio, video, natural language.',
            'Generative AI: jab naya content create karna ho — text generation, code assistance, image synthesis.',
          ]}
          whyUseIt="Correct AI type choose karna ek developer ka sabse important decision hai. GenAI har problem ke liye best nahi hai — kabhi simple rule-based system ya classic ML better hota hai. Complexity, cost, aur latency sab consider karo."
          howToUse={{
            filename: 'ai-types-guide.ts',
            language: 'typescript',
            code: `// Kaunsa AI type kab use karein — decision guide

// 1. Traditional AI / Rule-based
// Jab: explicit rules likhna possible ho
// Examples: input validation, game engines, scheduling
function isValidEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

// 2. Machine Learning (classic)
// Jab: labeled training data available ho, patterns complex hon
// Examples: spam detection, price prediction, user churn
// (ye typically Python/sklearn/TensorFlow mein hota hai)
// Node.js mein: pre-trained models via ONNX Runtime ya API call

// 3. Deep Learning
// Jab: unstructured data — images, audio, complex sequences
// Examples: face recognition, speech-to-text, translation
// (usually GPU-accelerated, typically via API)

// 4. Generative AI (LLMs)
// Jab: text generation, question answering, code help chahiye
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic();
async function generateContent(prompt: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}`,
            explanation: 'Har AI type ka apna domain hai. GenAI APIs (Claude, OpenAI) ne barriers to entry dramatically kam kar diye hain — ab koi bhi developer AI features ship kar sakta hai without ML expertise.',
          }}
          realWorldScenario="Jab tum ChatGPT se code likhwate ho — GenAI. Netflix recommendation — ML (collaborative filtering). Google Photos faces — Deep Learning (computer vision). Chess engine — Traditional AI (minimax algorithm). Sahi tool sahi problem ke liye."
          commonMistakes={[
            {
              mistake: 'Har problem ke liye GenAI use karna',
              why: 'GenAI expensive hai (API costs), slow hai (latency), aur kabhi kabhi simple rule-based solution zyada reliable hota hai. Over-engineering se avoid karo.',
              fix: 'Pehle simple solution try karo. Regex, simple ML, lookup tables — ye kaafi baar adequate hote hain. GenAI jab genuinely zaruri ho tabhi use karo.',
            },
          ]}
          proTip="GenAI aur traditional ML ka key difference: GenAI probabilistic — same input, different output possible. Traditional ML deterministic — same input, same output. Code ya factual data ke liye lower temperature use karo GenAI mein."
          demo={<AIHierarchyDiagram />}
        />
      </div>

      {/* ConceptCard 2: Types of ML */}
      <div id="ml-types">
        <ConceptCard
          title="ML Ke 3 Main Types"
          emoji="📚"
          difficulty="beginner"
          whatIsIt="Machine Learning teen main categories mein aata hai: (1) Supervised Learning — labeled data se seekhna (teacher ke saath). (2) Unsupervised Learning — unlabeled data mein patterns dhundhna (self-study). (3) Reinforcement Learning — trial and error se seekhna (environment se feedback lekar)."
          whenToUse={[
            'Supervised Learning: jab labeled training data available ho — spam/not-spam, cat/dog classification, price prediction.',
            'Unsupervised Learning: jab labels nahi hain aur patterns discover karne hain — customer segmentation, anomaly detection.',
            'Reinforcement Learning: jab agent ko environment mein act karna ho aur rewards se learn karna ho — games, robotics, LLM fine-tuning (RLHF).',
          ]}
          whyUseIt="Sahi ML type choose karna problem solving efficiency ke liye critical hai. Labeled data collect karna expensive hota hai — agar possible ho toh unsupervised approach try karo. RL complex hai — sirf jab environment clearly defined ho aur reward signal design karna possible ho."
          howToUse={{
            filename: 'ml-types-examples.ts',
            language: 'typescript',
            code: `// ─── 1. Supervised Learning ──────────────────────────────
// Labeled examples se seekhna
// Format: (input features) → (known output/label)

// Example: Email spam detection
interface EmailFeatures {
  subjectLength: number;
  hasLinks: boolean;
  senderReputation: number; // 0-1
}
// Training: { features, label: 'spam' | 'not-spam' }[] de do model ko
// Inference: model new email dekhe aur predict kare

// Node.js mein: ONNX Runtime se pre-trained model load karo
// ya OpenAI/Claude fine-tuned model use karo

// ─── 2. Unsupervised Learning ─────────────────────────────
// No labels — patterns khud dhundho

// Example: Customer segmentation
interface CustomerData {
  purchaseFrequency: number;
  avgOrderValue: number;
  daysSinceLastPurchase: number;
}
// K-means clustering 3 groups dhundh sakta hai:
// Cluster A: High frequency, high value → VIP customers
// Cluster B: Occasional shoppers → nurture campaign
// Cluster C: Churned → win-back campaign

// ─── 3. Reinforcement Learning ───────────────────────────
// Trial and error — reward maximize karo

// Classic example: Game playing
// State: current board position
// Action: move piece
// Reward: +1 win, -1 lose, 0 ongoing
// Agent learns: which actions maximize expected reward

// RLHF (LLMs mein):
// Human raters responses rank karte hain
// Reward model: human preferences seekhta hai
// LLM fine-tuning: reward maximize karna seekhta hai
// Result: helpful, harmless responses`,
            explanation: 'Supervised = teacher se seekhna (labeled data). Unsupervised = khud explore karna (no labels). Reinforcement = environment se feedback lekar improve karna. LLMs pre-training mein self-supervised (next token predict), fine-tuning mein supervised + RLHF use karte hain.',
          }}
          realWorldScenario="Ek e-commerce app mein: product recommendation (Supervised — previous purchases se), customer clustering (Unsupervised — behavior patterns), chatbot fine-tuning (RL/RLHF — human feedback se improve karo). Teeno types real production apps mein milte hain."
          commonMistakes={[
            {
              mistake: 'Supervised learning ko hamesha best assume karna',
              why: 'Labeled data collect karna bahut expensive aur time-consuming hota hai. Kabhi kabhi unsupervised approach se same insight milti hai bina labeling cost ke.',
              fix: 'Pehle data dekhो — labels already available hain? Haan toh supervised. Nahi toh unsupervised explore karo ya semi-supervised (thode labels + bahut unlabeled data).',
            },
          ]}
          proTip="LLMs (ChatGPT, Claude) pre-training mein Self-Supervised Learning use karte hain (next token predict karo — labels khud data se aate hain), fine-tuning mein Supervised + RLHF. Ye combination hi unhe so useful banata hai — massive unsupervised pre-training + targeted supervised improvement."
        />
      </div>

      {/* ConceptCard 3: AI History Timeline */}
      <div id="ai-history">
        <ConceptCard
          title="AI Ki 70-Year Journey"
          emoji="📅"
          difficulty="beginner"
          whatIsIt="AI ki history mein kuch key breakthroughs hain jo samajhne se aaj ke tools ka context milta hai. 2017 ka Transformer paper sabse important breakthrough hai — GPT se Claude sab iski foundation par build hain."
          whenToUse={[
            'Context samajhne ke liye — kyun 2022 mein suddenly AI mainstream hua.',
            'Team ko explain karne ke liye ki LLMs kahan se aaye.',
            'Research paper references samajhne ke liye — "attention", "transformer", "RLHF" kahan se aaya.',
          ]}
          whyUseIt="History samajhne se future direction samajh aata hai. Transformers kyun revolutionary the? Scale kyun matter karta hai? Why now? Ye answers history mein hain."
          howToUse={{
            filename: 'ai-history-notes.ts',
            language: 'typescript',
            code: `// Key AI milestones aur unka significance:

const aiMilestones = [
  {
    year: 1950,
    event: 'Turing Test',
    significance: 'Intelligence ko define karna — can machines think?',
  },
  {
    year: 1986,
    event: 'Backpropagation',
    significance: 'Neural nets ko train karna possible hua — gradient descent',
  },
  {
    year: 2012,
    event: 'AlexNet (ImageNet)',
    significance: 'GPU + deep neural nets = superhuman image recognition',
  },
  {
    year: 2017,
    event: '"Attention Is All You Need"',
    significance: 'Transformers — parallel training, better long-range dependencies. GAME CHANGER.',
  },
  {
    year: 2020,
    event: 'GPT-3 (175B params)',
    significance: 'Scale matters — bigger model = emergent capabilities',
  },
  {
    year: 2022,
    event: 'ChatGPT launch',
    significance: 'RLHF + scale = genuinely useful AI for everyone. 100M users in 2 months.',
  },
  {
    year: 2024,
    event: 'Multimodal era',
    significance: 'Text + Image + Audio — one model, many modalities',
  },
] as const;

// Key insight: 2017 Transformer breakthrough ne sab kuch possible banaya
// Kyunki: parallel training (GPU efficient), self-attention (context samajhna),
// scale karna easy ho gaya`,
            explanation: 'Har milestone ne agla possible banaya. Backprop → neural nets. GPU → deep learning. Transformers → LLMs. RLHF → useful assistants. Ye compounding progress hai — har generation agle ke liye foundation banata hai.',
          }}
          realWorldScenario="2022 mein ChatGPT launch ke baad duniya ne dekha ki AI practically useful ho sakta hai. Developer tools (GitHub Copilot), writing assistants, customer service — sab ek saath transform hua. Ye ab bhi chal raha hai — ye moment mein hum ji rahe hain."
          commonMistakes={[
            {
              mistake: 'Ye sochna ki AI ek sudden breakthrough tha 2022 mein',
              why: 'ChatGPT sudden nahi tha — decades ki research, 2017 ka transformers paper, massive compute investments — sab combine hua. Overnight success was 70 years in the making.',
              fix: 'Foundation samjho: transformers (2017) → GPT-1,2,3 → InstructGPT → ChatGPT. Har step previous par build karta hai.',
            },
          ]}
          proTip='2017 ka "Attention Is All You Need" paper padhna chahiye — ChatGPT se Claude sab iski wajah se exist karte hain. Google Scholar par free mein available hai. Abstract aur conclusion padhna bhi kaafi hai — technical details baad mein.'
          demo={<AITimeline />}
        />
      </div>

      {/* ConceptCard 4: How LLMs Generate Text */}
      <div id="llm-generation">
        <ConceptCard
          title="LLM Kaise Sochta Hai? — Next Token Prediction"
          emoji="💭"
          difficulty="beginner"
          whatIsIt='LLM actually "sochta" nahi — ye next token predict karta hai. "The cat sat on the ___" — har possible word ki probability calculate karta hai, highest probability wala choose karta hai (with some randomness controlled by "temperature"). Ye prediction token by token hota hai jab tak response complete na ho.'
          whenToUse={[
            'Ye samajhna helpful hai jab AI unexpected answer de.',
            'Temperature parameter tune karne ke liye — code vs creative writing.',
            'Hallucination kyun hoti hai — is model se samjho.',
            'Prompt engineering ke liye — AI kaise "sochta" hai ye jaanna better prompts likhne mein help karta hai.',
          ]}
          whyUseIt="LLM ki limitations samajhna realistic expectations set karne mein help karta hai. Ye samajhne se tum better prompts likhoge, hallucination expect karoge aur verify karoge, aur AI ke strengths/weaknesses ko appropriately use karoge."
          howToUse={{
            filename: 'llm-generation-concept.ts',
            language: 'typescript',
            code: `// LLM token prediction — conceptual model

// Input: "Python mein hello world ka code:"
// Tokenization:
const inputTokens = ['Python', ' mein', ' hello', ' world', ' ka', ' code', ':'];

// LLM next token ke liye probability distribution calculate karta hai:
const nextTokenProbabilities: Record<string, number> = {
  '\n': 0.32,         // high — newline common after ":"
  '\n---': 0.28,      // high — code block common (backtick-fenced)
  ' ek': 0.05,        // low
  ' yahan': 0.03,     // low
  // ... thousands of other tokens
};

// Temperature = 0: always pick highest (deterministic)
function greedyDecode(probs: Record<string, number>): string {
  return Object.entries(probs).sort(([, a], [, b]) => b - a)[0][0];
}

// Temperature > 0: sample from distribution (varied)
// Higher temp = more random = more creative (but less accurate)

// Full generation loop:
async function generateResponse(prompt: string): Promise<string> {
  let tokens: string[] = tokenize(prompt);
  let generated = '';

  while (!isComplete(generated)) {
    // Each iteration: predict next token from all previous context
    const nextToken = await predictNextToken(tokens);
    tokens.push(nextToken);
    generated += nextToken;
  }

  return generated;
}

// Key insight: LLM "samajhta" nahi — ye statistical pattern matching hai
// Isliye confident wrong answers (hallucinations) possible hain!
declare function tokenize(text: string): string[];
declare function isComplete(text: string): boolean;
declare function predictNextToken(tokens: string[]): Promise<string>;`,
            explanation: 'Har token ek prediction hai — model ne training mein billions of text se patterns seekhe hain. Ye patterns kaafi powerful hain, lekin ye actual understanding nahi hai. Isliye "trust but verify" approach zaroori hai.',
          }}
          realWorldScenario="Jab Claude tum se code review karta hai — ye token by token response generate karta hai, har token previous context se informed hota hai. Isliye agar tum beech mein context change karo ya contradictory instructions do — output inconsistent ho sakta hai. Context clear rakhna zaroori hai."
          commonMistakes={[
            {
              mistake: "AI 'jaanta' hai ya 'samajhta' hai — ye anthropomorphization hai",
              why: 'LLM statistical pattern matching karta hai. Training data mein jo patterns the, wo reproduce karta hai. Ye understanding nahi hai — isliye confident wrong answers possible hain.',
              fix: 'AI ko "trust but verify" se treat karo. Critical information (medical, legal, financial, factual) hamesha independent sources se verify karo.',
            },
          ]}
          proTip="Temperature = randomness of token selection. temperature=0 → deterministic, same answer always. temperature=1 → creative, varied. Code generation ke liye low temperature (0.1-0.3) better hai. Creative writing ke liye 0.7-1.0 better. Claude API mein default 1.0 hai."
        />
      </div>

      {/* ConceptCard 5: AI Applications for Developers */}
      <div id="ai-applications">
        <ConceptCard
          title="Developer Ke Liye AI Applications"
          emoji="🌍"
          difficulty="beginner"
          whatIsIt="Ye cheezein tum AJ bana sakte ho with APIs — koi ML expertise needed nahi. LLM APIs (OpenAI, Anthropic), embedding APIs, speech APIs — sab available hain. Developer ki value add karna: use cases identify karo, integrate karo, productionize karo."
          whenToUse={[
            'Intelligent Search: semantic search embeddings se — exact keyword match nahi, meaning match.',
            'Customer Support Bot: RAG (Retrieval Augmented Generation) + LLM se.',
            'Content Generation: product descriptions, blog posts, emails at scale.',
            'Code Assistant: code review, documentation, test generation, bug explanation.',
            'Data Analysis: natural language queries on structured data.',
            'Document Processing: PDF/form se information extract karo.',
          ]}
          whyUseIt="AI APIs ne developer productivity dramatically increase ki hai. Features jo pehle 6 months mein build hote the, ab 2 weeks mein ship ho sakte hain. Competitive advantage abhi hai — early mover advantage real hai is space mein."
          howToUse={{
            filename: 'ai-app-examples.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// ─── 1. Customer Support Bot ─────────────────────────────────
async function supportBot(userMessage: string, context: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5', // fast + cheap for support
    max_tokens: 512,
    system: \`You are a helpful customer support agent for NodeMaster.
Answer questions about our Node.js course in Hinglish.
Context about our product: \${context}
If unsure, say "Hum aapko email mein detailed help karenge."\`,
    messages: [{ role: 'user', content: userMessage }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── 2. Document Summary ─────────────────────────────────────
async function summarizeDocument(content: string): Promise<{
  summary: string;
  keyPoints: string[];
  actionItems: string[];
}> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: \`Summarize this document. Respond with valid JSON only.
Schema: { "summary": string, "keyPoints": string[], "actionItems": string[] }

Document:
\${content}\`,
    }],
  });
  const block = response.content[0];
  const text = block.type === 'text' ? block.text : '{}';
  return JSON.parse(text) as { summary: string; keyPoints: string[]; actionItems: string[] };
}

// ─── 3. Code Review ──────────────────────────────────────────
async function reviewCode(code: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: \`Review this code for security, performance, and quality issues.
Format: numbered list. Each item: [SEVERITY: HIGH/MEDIUM/LOW] Issue + Fix.

\\\`\\\`\\\`
\${code}
\\\`\\\`\\\`\`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}`,
            explanation: 'Teen common AI features — customer support, document processing, code review. Sab Claude API se build kiye. Haiku fast/cheap hai repetitive tasks ke liye, Sonnet balanced hai quality work ke liye.',
          }}
          realWorldScenario="ResumeATS jaise platform mein: AI resume parsing (extract skills/experience — structured JSON output), AI job matching (semantic similarity using embeddings), AI feedback (GPT/Claude se improvement suggestions). Teen features = massive value add. Ye sab 2-3 weeks mein ek developer build kar sakta hai."
          commonMistakes={[
            {
              mistake: 'Sab kuch ek saath banana ki koshish karna',
              why: 'Scope creep aur complexity se project stuck ho jaata hai. "AI-powered everything" ek feature nahi hai.',
              fix: 'Ek specific, high-value feature choose karo. Build → Deploy → Measure impact → Learn → Next feature. Iteration kaafi zyada important hai all-at-once se.',
            },
          ]}
          proTip="Shuru karo ek simple feature se: ek chatbot ya search feature. Build → Deploy → Learn → Iterate. Haiku model (claude-haiku-4-5) se start karo — fast aur cheap. Production-ready hone ke baad Sonnet upgrade karo quality ke liye."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 1 Quiz — AI &amp; ML Basics
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye pass ke liye. Sab samjha? Check karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="ai-ml-intro" />
      </div>
    </div>
  )
}
