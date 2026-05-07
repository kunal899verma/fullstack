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
        <p className="text-[#A1A1AA] text-lg mb-4">
          Sunо bhai — ChatGPT ek bahut fancy autocomplete hai. Seriously. Ye next word predict karta hai, baar baar, jab tak tera poora jawab na ban jaaye. Isme koi jaadu nahi hai — sirf statistics hai, bahut badi scale par. Aaj hum AI/ML ka pura hierarchy samjhenge — zero se hero. Aur ye sab ek baar samajh gaye, toh koi bhi AI tool tujhe confuse nahi kar payega.
        </p>
        <div
          className="rounded-xl p-4 mb-2"
          style={{
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.3)',
          }}
        >
          <p className="text-[#FED7AA] text-sm italic">
            &quot;AI replace nahi karega developers ko. Lekin woh developers jo AI use karte hain, zaroor replace karenge unhe jo nahi karte.&quot; — Har senior engineer aaj kal
          </p>
        </div>
      </div>

      {/* ConceptCard 1: AI vs ML vs DL vs GenAI */}
      <div id="ai-hierarchy">
        <ConceptCard
          title="AI, ML, DL, GenAI — Nested Concepts"
          emoji="🧠"
          difficulty="beginner"
          whatIsIt="Shocking opener: ChatGPT, Claude, Midjourney — ye sab GenAI hain. GenAI ek bahut specific concept hai. Lekin bahut log AI, ML, Deep Learning ko ek hi cheez samajhte hain — ye galat hai. Ye nested subsets hain: AI (broadest) → ML → Deep Learning → Generative AI (narrowest). Sochो jaise: Transport → Vehicle → Car → Sports Car. GenAI AI ka ek specific type hai jo naya content — text, images, code, audio — generate karta hai. Baki AI hain jaise spam filters, chess engines — wo GenAI nahi hain."
          whenToUse={[
            'Traditional AI (rule-based): jab problem well-defined ho aur rules explicitly code ki ja sakein — chess, scheduling.',
            'Machine Learning: jab patterns data mein hain aur rules manually define karna impossible ho — spam detection, recommendations.',
            'Deep Learning: jab data bahut complex ho — images, audio, video, natural language.',
            'Generative AI: jab naya content create karna ho — text generation, code assistance, image synthesis.',
          ]}
          whyUseIt="Yaar, ye samajhna kyun zaroori hai? Kyunki agar tu har problem ke liye GenAI use karega toh teri API bill dekh ke aankhein phat jaayengi! Aur kabhi kabhi ek simple regex hi kaafi hota hai. Sahi tool sahi problem ke liye — ye decision hi tujhe baaki developers se alag karega. GenAI bahut powerful hai, lekin mehnga bhi hai. Complexity, cost, aur latency — teeno consider karo."
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
            explanation: 'Under the hood: GenAI ek probability distribution hai next token ke upar. Har AI type ka apna domain hai. GenAI APIs (Claude, OpenAI) ne barriers to entry dramatically kam kar diye hain — ab koi bhi developer AI features ship kar sakta hai bina ML PhD ke. Code likho, API call karo, ship karo.',
          }}
          realWorldScenario="Sawaal: Jab tum ChatGPT se code likhwate ho — kaunsa AI type hai? GenAI. Netflix recommendation — ML (collaborative filtering). Google Photos faces recognize karta hai — Deep Learning (computer vision). Chess engine Stockfish — Traditional AI (minimax algorithm). Ek app mein charon types ek saath ho sakte hain! Sahi tool sahi problem ke liye — ye professional developer ka hallmark hai."
          commonMistakes={[
            {
              mistake: 'Har problem ke liye GenAI use karna',
              why: 'GenAI expensive hai (API costs), slow hai (latency), aur kabhi kabhi simple rule-based solution zyada reliable hota hai. Over-engineering se avoid karo.',
              fix: 'Pehle simple solution try karo. Regex, simple ML, lookup tables — ye kaafi baar adequate hote hain. GenAI jab genuinely zaruri ho tabhi use karo.',
            },
          ]}
          proTip="Yaad rakho ye phrase: Temperature 0 = robot, Temperature 2 = drunk robot. GenAI probabilistic hai — same input, different output possible (temperature ke hisaab se). Traditional ML deterministic hai — same input, same output hamesha. Code generate karwana hai? Temperature low rakho. Kavita likhwani hai? Thoda upar karo."
          demo={<AIHierarchyDiagram />}
        />
      </div>

      {/* ConceptCard 2: Types of ML */}
      <div id="ml-types">
        <ConceptCard
          title="ML Ke 3 Main Types"
          emoji="📚"
          difficulty="beginner"
          whatIsIt="Bhai, ML ka matlab hai machine khud seekhti hai data se — tu explicitly rules nahi likhta. Teen types hain: (1) Supervised Learning — teacher ke saath padhna, labeled examples deke. Jaise 'ye spam hai, ye nahi' — model seekhta hai. (2) Unsupervised Learning — self-study, koi labels nahi. Model khud groups dhundhta hai data mein. (3) Reinforcement Learning — trial and error, reward se seekhna. Game khelo, galti karo, better bano. Ye teeno alag-alag use cases ke liye hain."
          whenToUse={[
            'Supervised Learning: jab labeled training data available ho — spam/not-spam, cat/dog classification, price prediction.',
            'Unsupervised Learning: jab labels nahi hain aur patterns discover karne hain — customer segmentation, anomaly detection.',
            'Reinforcement Learning: jab agent ko environment mein act karna ho aur rewards se learn karna ho — games, robotics, LLM fine-tuning (RLHF).',
          ]}
          whyUseIt="Sahi ML type choose karna isliye zaroori hai kyunki labeled data collect karna bahut expensive aur time-consuming hota hai. Ek label lagane mein 30 second lage — 1 lakh examples ke liye kitna time? Bahut zyada. Agar possible ho toh unsupervised approach pehle try karo. RL toh aur bhi complex hai — sirf jab environment clearly defined ho aur reward signal design karna possible ho. Matlab: pehle simple, phir complex."
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
            explanation: 'Under the hood samjho: LLMs pre-training mein self-supervised learning use karte hain — "next token predict karo" — labels automatically text se aate hain. Fine-tuning mein supervised + RLHF use hota hai. Supervised = teacher se seekhna. Unsupervised = khud explore. Reinforcement = reward se improve karo.',
          }}
          realWorldScenario="Sawaal: ChatGPT kis type ka ML hai? Mostly self-supervised pre-training (unsupervised family) + RLHF (RL family). Ek e-commerce app mein: product recommendation (Supervised — previous purchases se), customer clustering (Unsupervised — behavior patterns dhundo), chatbot fine-tuning (RL/RLHF — human feedback se improve karo). Teeno types ek hi production app mein milte hain — real world mein sab mix hota hai."
          commonMistakes={[
            {
              mistake: 'Supervised learning ko hamesha best assume karna',
              why: 'Labeled data collect karna bahut expensive aur time-consuming hota hai. Kabhi kabhi unsupervised approach se same insight milti hai bina labeling cost ke.',
              fix: 'Pehle data dekhो — labels already available hain? Haan toh supervised. Nahi toh unsupervised explore karo ya semi-supervised (thode labels + bahut unlabeled data).',
            },
          ]}
          proTip="LLMs ka secret sauce: pre-training mein Self-Supervised Learning (next token predict karo — labels khud text se aate hain — koi labeling cost nahi!), fine-tuning mein Supervised + RLHF. Ye combination — massive unsupervised pre-training + targeted human feedback — hi ChatGPT aur Claude ko itna useful banata hai. Trillion words pada, phir insaan ne polish kiya."
        />
      </div>

      {/* ConceptCard 3: AI History Timeline */}
      <div id="ai-history">
        <ConceptCard
          title="AI Ki 70-Year Journey"
          emoji="📅"
          difficulty="beginner"
          whatIsIt="Shocking fact: ChatGPT ek raat mein nahi bana — ye 70 saal ki mehnat ka result hai. Lekin ek ek breakthrough samajhna zaroori hai, warna ye sab magic lagti hai. 2017 ka 'Attention Is All You Need' paper — ye ek paper ne sab badal diya. GPT-1 se GPT-4 tak, Claude se Gemini tak — sab isi ek paper ki foundation par khade hain. History samajhne se future direction samajh aata hai."
          whenToUse={[
            'Context samajhne ke liye — kyun 2022 mein suddenly AI mainstream hua.',
            'Team ko explain karne ke liye ki LLMs kahan se aaye.',
            'Research paper references samajhne ke liye — "attention", "transformer", "RLHF" kahan se aaya.',
          ]}
          whyUseIt="Yaar, history boring lagti hai — lekin ye samajhna critical hai. Kyunki tab tujhe pata chalega: Transformers kyun sab se alag hain? Scale kyun matter karta hai? Kya ye AI hype hai ya genuinely new era? Ye sab sawaalon ke jawab history mein hain. Aur ek developer ke roop mein, context samajhna better decisions lene mein help karta hai."
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
          realWorldScenario="2022 mein ChatGPT launch ke baad 100 million users 2 mahine mein — kisi bhi platform ne itni tezi se grow nahi kiya. Developer tools (GitHub Copilot), writing assistants, customer service — sab ek saath transform hua. Ye 'overnight success' 70 saal ki compounding research ka result tha. Hum abhi bhi is transformation ke beech mein hain — ye moment live kar rahe hain hum."
          commonMistakes={[
            {
              mistake: 'Ye sochna ki AI ek sudden breakthrough tha 2022 mein',
              why: 'ChatGPT sudden nahi tha — decades ki research, 2017 ka transformers paper, massive compute investments — sab combine hua. Overnight success was 70 years in the making.',
              fix: 'Foundation samjho: transformers (2017) → GPT-1,2,3 → InstructGPT → ChatGPT. Har step previous par build karta hai.',
            },
          ]}
          proTip='Pro tip: 2017 ka "Attention Is All You Need" paper padhna chahiye — sirf 15 pages hai, Google Scholar par free mein available hai. ChatGPT se Claude tak, sab iski foundation par hain. Abstract aur conclusion padhna bhi kaafi hai. Technical details baad mein aayenge — lekin ye milestone samajhna must hai ek AI developer ke liye.'
          demo={<AITimeline />}
        />
      </div>

      {/* ConceptCard 4: How LLMs Generate Text */}
      <div id="llm-generation">
        <ConceptCard
          title="LLM Kaise Sochta Hai? — Next Token Prediction"
          emoji="💭"
          difficulty="beginner"
          whatIsIt='Shocking opener: LLM koi "intelligent being" nahi hai — ye ek bahut bada next-word predictor hai. Seriously. "The cat sat on the ___" — model har possible word ki probability calculate karta hai aur sampling karta hai us distribution se. Ye prediction token by token hota hai, jab tak response complete na ho. Temperature = randomness ka dial. Temperature 0 = robot (hamesha most likely word). Temperature 2 = drunk robot (kuch bhi bol sakta hai). Magic nahi, pure statistics hai.'
          whenToUse={[
            'Ye samajhna helpful hai jab AI unexpected answer de.',
            'Temperature parameter tune karne ke liye — code vs creative writing.',
            'Hallucination kyun hoti hai — is model se samjho.',
            'Prompt engineering ke liye — AI kaise "sochta" hai ye jaanna better prompts likhne mein help karta hai.',
          ]}
          whyUseIt="Ye samajhna isliye zaroori hai bhai: agar tu sochta hai LLM 'sochta' hai, toh jab wo confident galat jawab de, tu believe kar lega. Hallucinations isliye hoti hain kyunki model next token predict karta hai — accuracy guarantee nahi. Ye samajhne se tu better prompts likhega, hallucinations expect karega aur verify karega, aur AI ko sahi jagah sahi tarike se use karega."
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
            explanation: 'Under the hood: har token ek prediction hai probability distribution se. Model ne training mein 1 trillion+ words dekhe hain, toh iska pattern matching BAHUT sharp hai — intelligence jaisa lagta hai, lekin actually statistics hai. Isliye "trust but verify" approach hamesha follow karo.',
          }}
          realWorldScenario="Sawaal: LLM 'thinking' kaise karta hai? Bilkul nahi karta — ye token generate karta hai, ek ek karke. Jab Claude code review karta hai, wo token by token response generate kar raha hai, har naaya token saare previous context se inform hota hai. Context window = LLM ki short-term memory. Session khatam, sab bhool jaata hai. Isliye context clear rakhna bahut zaroori hai."
          commonMistakes={[
            {
              mistake: "AI 'jaanta' hai ya 'samajhta' hai — ye anthropomorphization hai",
              why: 'LLM statistical pattern matching karta hai. Training data mein jo patterns the, wo reproduce karta hai. Ye understanding nahi hai — isliye confident wrong answers possible hain.',
              fix: 'AI ko "trust but verify" se treat karo. Critical information (medical, legal, financial, factual) hamesha independent sources se verify karo.',
            },
          ]}
          proTip="Yaad karo: Temperature 0 = robot (hamesha same output, predictable). Temperature 2 = drunk robot (creative lekin unreliable). Code generation ke liye temperature 0-0.3 ideal hai — ek sahi answer chahiye. Creative writing ke liye 0.7-1.0 better hai. Context window = LLM ki short-term memory — session khatam, sab gone. Claude API mein default temperature 1.0 hai."
        />
      </div>

      {/* ConceptCard 5: AI Applications for Developers */}
      <div id="ai-applications">
        <ConceptCard
          title="Developer Ke Liye AI Applications"
          emoji="🌍"
          difficulty="beginner"
          whatIsIt="Shocking reality check: tune ek API call se AI features ship kar sakta hai aaj — koi ML expertise nahi chahiye. LLM APIs (OpenAI, Anthropic), embedding APIs, speech APIs — sab available hain, buss credit card chahiye. Developer ki actual value yahan hai: sahi use cases identify karo, properly integrate karo, production mein reliable banao. Tools hain — inhe use karo."
          whenToUse={[
            'Intelligent Search: semantic search embeddings se — exact keyword match nahi, meaning match.',
            'Customer Support Bot: RAG (Retrieval Augmented Generation) + LLM se.',
            'Content Generation: product descriptions, blog posts, emails at scale.',
            'Code Assistant: code review, documentation, test generation, bug explanation.',
            'Data Analysis: natural language queries on structured data.',
            'Document Processing: PDF/form se information extract karo.',
          ]}
          whyUseIt="Yaar, ye serious hai — AI APIs ne developer productivity ke rules badal diye hain. Features jo pehle 6 mahine mein build hote the, ab 2 hafte mein ship ho sakte hain. Smart search, document analysis, code review, customer support — sab kuch. Competitive advantage abhi hai — is space mein early mover advantage real hai. Jo aaj seekhega, wo kal lead karega."
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
            explanation: 'Teen real-world AI features — customer support, document processing, code review. Sab Claude API se build kiye, koi ML training nahi. Haiku = fast aur cheap, simple repetitive tasks ke liye perfect. Sonnet = balanced, quality work ke liye. Production mein model choice = cost vs quality ka balance.',
          }}
          realWorldScenario="ResumeATS jaise platform ke baare mein sochte hain: AI resume parsing (skills/experience extract karo — structured JSON output), AI job matching (semantic similarity using embeddings), AI feedback (Claude se improvement suggestions). Teen features, massive value add, aur ek developer 2-3 weeks mein build kar sakta hai. Pehle ye cheez possible hi nahi thi — ab hai. Isliye ye skills seekhna zaroori hai."
          commonMistakes={[
            {
              mistake: 'Sab kuch ek saath banana ki koshish karna',
              why: 'Scope creep aur complexity se project stuck ho jaata hai. "AI-powered everything" ek feature nahi hai.',
              fix: 'Ek specific, high-value feature choose karo. Build → Deploy → Measure impact → Learn → Next feature. Iteration kaafi zyada important hai all-at-once se.',
            },
          ]}
          proTip="Pro tip: ek cheez ek baar. Ek simple feature se shuru karo — ek chatbot ya search feature. Build karo, deploy karo, users se feedback lo, iterate karo. 'AI-powered everything' ek feature nahi hai. Haiku model (claude-haiku-4-5) se start karo — fast aur cheap. Jab production-ready ho, phir Sonnet pe upgrade karo quality ke liye. Complexity baad mein aayegi."
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
