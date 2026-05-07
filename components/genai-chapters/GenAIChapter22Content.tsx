'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: '2025 mein AI ka sabse important trend kaunsa hai jo developers ko affect karta hai?',
    options: [
      {
        text: 'AI ki speed improve ho rahi hai — faster responses',
        correct: false,
        explanation: 'Speed improvement ho raha hai lekin ye sabse important trend nahi hai for developers. Agents aur reasoning capabilities zyada impactful hain.',
      },
      {
        text: 'Agentic AI — autonomous multi-step task completion. Models jo sirf answer nahi dete, computer use karte hain, code run karte hain, tasks complete karte hain.',
        correct: true,
        explanation: 'Bilkul sahi! 2025 ka defining trend: AI agents. Claude computer use, GPT-4o with tools, Gemini agents — models jo autonomous work karte hain. Developer impact: app design shift, human-in-the-loop patterns, async workflows — sab rethink karne pad rahe hain.',
      },
      {
        text: 'AI cheaper ho rahi hai — cost reduction main trend hai',
        correct: false,
        explanation: 'Prices fall kar rahi hain lekin ye sirf secondary trend hai. Capabilities — especially agentic — main trend hai jo developer work fundamentally change kar raha hai.',
      },
      {
        text: 'AI multilingual ho gayi — regional languages main trend hai',
        correct: false,
        explanation: 'Multilingual improvements ho rahe hain lekin 2025 ka defining trend agentic AI aur reasoning (o1-style, Claude extended thinking) capabilities hain.',
      },
    ],
  },
  {
    question: '"Attention Is All You Need" paper kyun important hai?',
    options: [
      {
        text: 'Ye paper ChatGPT create karne ke steps batata hai',
        correct: false,
        explanation: 'ChatGPT 2022 mein launch hua, ye paper 2017 ka hai — aur directly ChatGPT create karne ke steps nahi batata.',
      },
      {
        text: 'Ye paper Transformer architecture introduce kiya — sab modern LLMs (GPT, Claude, Gemini, LLaMA) isi architecture pe based hain. Without this paper: no ChatGPT, no Claude.',
        correct: true,
        explanation: 'Exactly! 2017, Google Brain team ka paper. Transformer: self-attention mechanism, parallel training, better long-range dependencies. RNNs replace kiye. GPT-1 2018 mein transformer pe. Chain: Transformers → GPT-1,2,3 → InstructGPT → ChatGPT. Foundation paper of the AI revolution.',
      },
      {
        text: 'Ye paper machine learning ko Python mein implement karna batata hai',
        correct: false,
        explanation: 'Ye research paper hai — Python tutorial nahi. Mathematical formulation of attention mechanism aur transformer architecture.',
      },
      {
        text: 'Ye paper 2023 ka hai — recent development',
        correct: false,
        explanation: 'Vaswani et al. 2017 paper hai — 8 saal purana. Phir bhi foundation hai sab modern LLMs ka. Timeless impact.',
      },
    ],
  },
  {
    question: 'AI career mein "ML Engineer" aur "AI Product Engineer" mein kya key difference hai?',
    options: [
      {
        text: 'ML Engineer zyada paisa kamata hai — isliye better choice hai',
        correct: false,
        explanation: 'Salary comparison career choice ka basis nahi hona chahiye. Kya genuinely interesting lagta hai — wo explore karo.',
      },
      {
        text: 'ML Engineer: model training, architecture, research, math. AI Product Engineer: APIs use karo, AI features ship karo, user-facing products build karo — software engineering skills focus.',
        correct: true,
        explanation: 'Bilkul sahi! ML Engineer: deep math (linear algebra, calculus, stats), PyTorch/TensorFlow, training infrastructure, research papers. AI Product Engineer: LLM APIs, prompt engineering, RAG, production deployment, user experience — zyada accessible path for software developers. Node.js developers ke liye AI Product Engineer path natural hai.',
      },
      {
        text: 'ML Engineer sirf big tech companies mein hote hain — startups mein nahi',
        correct: false,
        explanation: 'ML Engineers startups mein bhi hote hain. Distinction career focus pe hai, company size pe nahi.',
      },
      {
        text: 'Dono same kaam karte hain — different titles',
        correct: false,
        explanation: 'Fundamentally different roles hain — ML Engineer research-focused, math-heavy. AI Product Engineer product-focused, API-driven. Skills overlap karte hain lekin core focus alag hai.',
      },
    ],
  },
  {
    question: 'Building in public kya hai aur ye AI developers ke liye kyun valuable hai?',
    options: [
      {
        text: 'Building in public matlab open source karna — GitHub pe code publish karo',
        correct: false,
        explanation: 'Open source building in public ka subset ho sakta hai lekin sirf code publish karna nahi hai ye. Journey, learnings, failures sab share karna hai.',
      },
      {
        text: 'Apni AI project journey publicly share karna — Twitter/X, LinkedIn, blog — progress, learnings, failures, insights. Community build hoti hai, opportunities aate hain, accountability milti hai.',
        correct: true,
        explanation: 'Exactly! Building in public: project progress share karo, interesting learnings tweet karo, failures honesty se discuss karo. Benefits: (1) Network build hota hai, (2) Feedback milti hai, (3) Opportunities aate hain (jobs, investors, collaborators), (4) Accountability — public commitment follow-through force karta hai.',
      },
      {
        text: 'Building in public risky hai — competitors ideas steal kar sakte hain',
        correct: false,
        explanation: 'Idea theft minimal concern hai — execution matters, not idea. Building in public ke benefits (network, feedback, opportunities) risk se bahut outweigh karte hain.',
      },
      {
        text: 'Building in public sirf successful projects ke liye hai',
        correct: false,
        explanation: 'Failed projects ke learnings often more valuable hain! "Maine ye try kiya, ye kaam nahi kiya" — community ke liye genuinely helpful content hai. Failures share karo.',
      },
    ],
  },
  {
    question: 'AI learning ke liye best resources kaunse hain 2025 mein?',
    options: [
      {
        text: 'Sirf YouTube videos — text resources outdated hain',
        correct: false,
        explanation: 'YouTube valuable hai lekin sirf video se learning incomplete hai. Diverse resources: docs, papers, communities, hands-on projects — sab important hain.',
      },
      {
        text: 'Official docs (Anthropic, OpenAI), Hugging Face community + papers, practical building (best teacher), Twitter/X AI researchers — combination approach',
        correct: true,
        explanation: 'Bilkul sahi! Fastest learning path: (1) Official docs — accurate, up-to-date. (2) Build something — hands-on best teacher. (3) Paper summaries (not full papers usually) — concepts samjho. (4) AI Twitter/X — practitioners share real insights. (5) Discord communities — questions ka fast answer. Theory + practice combination win karta hai.',
      },
      {
        text: 'Sirf academic papers padhna chahiye — real knowledge wahan hai',
        correct: false,
        explanation: 'Papers important hain lekin majority developers ke liye full papers padhna required nahi. Summaries, blog posts, implementations — zyada practical hain.',
      },
      {
        text: 'Ek resource kaafi hai — ek comprehensive course karo aur done',
        correct: false,
        explanation: 'AI field rapidly evolving hai — sirf ek course se nahi chalega. Continuous learning, diverse sources, aur practical building — long-term success ke liye zaruri hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter22Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(249,115,22,0.06)',
          border: '1px solid rgba(249,115,22,0.2)',
        }}
      >
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          Future of AI & What&apos;s Next — Aage Ka Raasta 🚀
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          22 chapters complete kiye — foundations se production patterns tak. Ab aage ka raasta kya hai? AI field mein sikhna kabhi nahi rukta — aaj ka state-of-the-art kal ka baseline ho jaata hai. Trends track karo, sahi papers pado, community mein active raho, building in public karo, career strategically build karo. Ye final chapter tumhara long-term learning roadmap hai.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.3)',
          }}
        >
          <p className="text-[#6EE7B7] text-sm italic">
            &quot;AI mein sabse dangerous cheez ye hai ki sikhna band karo. Jo log current rehenge, unhe opportunities milti rahegi — jo ruk jaayenge, wo peeche reh jaayenge.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: AI Trends 2025 */}
      <div id="ai-trends">
        <ConceptCard
          title="AI Trends 2025 — Aaj Ka Landscape"
          emoji="📈"
          difficulty="intermediate"
          whatIsIt="2025 mein AI ka pace insane hai — ek saal pehle jo impossible lagta tha wo ab standard hai. Major trends: (1) Agentic AI — models jo sirf answer nahi dete, kaam karte hain. (2) Reasoning models — o1/o3-style extended thinking, complex problems. (3) Multimodal native — text, image, audio ek model mein. (4) Smaller specialized models — frontier quality compact size mein. (5) Edge AI — on-device inference. Developer impact: apps ki architecture fundamentally rethink karni padegi."
          whenToUse={[
            'Agents: tasks jo multiple steps aur tools chahte hain — research, coding, data processing.',
            'Reasoning models: math, logic, complex problem-solving — extended thinking enable karo.',
            'Multimodal: documents + images + audio — unified pipeline.',
            'Smaller models: privacy, latency, cost — on-premise ya mobile.',
            'Edge AI: mobile apps, IoT — server-independent inference.',
          ]}
          whyUseIt="Trend awareness sirf curiosity ki baat nahi — competitive advantage hai. Ek saal pehle 100K context window naya tha, ab 1M standard hai. Agents pehle unreliable the, ab production mein hain. Jo developer pehle adopt karta hai wo 6 months ahead hota hai. Hamesha ek sawaal socho: 'Ye naya capability hai — apne product mein kaise use kar sakta hoon?' Ye mindset hi differentiator hai."
          howToUse={{
            filename: 'ai-trends-2025.ts',
            language: 'typescript',
            code: `// AI Trends 2025 — Developer Perspective

const trends2025 = {
  agenticAI: {
    description: 'Models that take autonomous multi-step actions',
    examples: ['Claude computer use', 'GPT-4o Operator', 'Gemini agents'],
    developerImpact: 'Rethink app design — async workflows, human-in-the-loop, safety layers',
    howToStart: 'Claude tool calling se start karo — Chapter 13 concepts apply karo',
  },

  reasoningModels: {
    description: 'Extended "thinking" before answering — better at math, logic, code',
    examples: ['OpenAI o1/o3', 'Claude extended thinking', 'Gemini thinking'],
    developerImpact: 'Complex tasks better solved — use for debugging, analysis, architecture',
    howToStart: \`Claude pe: messages.create({ thinking: { type: 'enabled', budget_tokens: 5000 } })\`,
  },

  smallerModels: {
    description: 'Frontier quality in 1B-8B parameter models',
    examples: ['Phi-4 (3.8B)', 'Gemma 3 (9B)', 'LLaMA 3.2 (3B)', 'Qwen 2.5'],
    developerImpact: 'Local inference feasible, mobile AI possible, lower costs',
    howToStart: 'Ollama se locally test karo (Chapter 20). Compare quality with frontier.',
  },

  multimodalNative: {
    description: 'Text + image + audio + video — one model handles all',
    examples: ['GPT-4o (omni)', 'Gemini 1.5 Pro', 'Claude 3.5'],
    developerImpact: 'Unified AI pipeline — no separate models per modality',
    howToStart: 'Claude Vision (Chapter 17) se image analysis add karo existing apps mein',
  },

  longContext: {
    description: 'Context windows growing: 200K → 1M → unlimited?',
    examples: ['Claude 200K context', 'Gemini 1M context', 'Jamba 1M'],
    developerImpact: 'Entire codebases, legal documents, books — one prompt',
    howToStart: 'Large context se: document chunking kabhi kabhi unnecessary ho jaata hai',
  },
} as const;

// ─── Staying current strategy ─────────────────────────────────────
const learningStrategy = {
  daily: ['AI Twitter/X (Andrej Karpathy, Yann LeCun, Anthropic team)', 'Hacker News AI posts'],
  weekly: ['Anthropic/OpenAI blog posts', 'Papers With Code highlights', 'New model releases'],
  monthly: ['One new AI paper read (summary ok)', 'Build one small AI experiment', 'Join one AI hackathon'],
  quarterly: ['Evaluate new models on your use cases', 'Update tech stack if warranted'],
};

console.log('Stay current plan:', learningStrategy);`,
            explanation: 'trends2025 object mein har trend ke saath developerImpact aur howToStart hai — practical starting points. Ye information sirf jaanna kaafi nahi — experiment karo. Agents: Claude tool calling se start karo. Reasoning: Claude extended thinking enable karo aur complex problem solve karo. Small models: Ollama se local test karo. learningStrategy: daily, weekly, monthly, quarterly cadence — ye sustainable hai.',
          }}
          realWorldScenario="2024 early: Claude tool calling launch hua. Ek developer ne us hafte agent banaya — 6 months baad competitors wahi cheez build kar rahe the. 2024 late: Claude computer use launch hua. Developers jo immediately explore kiya: unhe new product category mili. First mover advantage AI mein real hai — trends track karna distraction nahi, investment hai. Ye stories har major launch ke baad repeat hoti hain."
          commonMistakes={[
            {
              mistake: 'Har naya AI tool pe jump karna bina evaluation ke',
              why: 'AI hype cycle mein bahut noise hai. Sab trend follow karne se focus lost ho jaata hai, kuch bhi ship nahi hota.',
              fix: 'Filter: kya ye trend apne current product ya use case pe relevant hai? Nahi? Note karo, later explore karo. Haan? Small experiment karo pehle. Prove it works for your case, then invest.',
            },
          ]}
          proTip="Social media noise se bachna ho toh: Anthropic aur OpenAI newsletters directly subscribe karo — important releases inbox mein aate hain, scroll karne ki zarurat nahi. Discord servers join karo: Anthropic Developer Discord pe Anthropic engineers real time pe answer dete hain. Signal-to-noise ratio maintain karo — quality sources, limited quantity."
        />
      </div>

      {/* Card 2: Papers to Read */}
      <div id="papers">
        <ConceptCard
          title="Papers to Read — AI Ka Foundation"
          emoji="📄"
          difficulty="intermediate"
          whatIsIt="AI mein key papers padhna context deta hai — cheezein kaise kaam karti hain, limitations kyun hain, future kyun woh direction mein ja raha hai. Must-read list: 'Attention Is All You Need' (2017) — sab modern LLMs isi architecture pe. GPT-3 paper — scale kyun matter karta hai. InstructGPT — RLHF se helpful AI kaise. Constitutional AI (Anthropic) — Claude ki safety foundation. RAG paper — retrieval augmentation ka origin. Ye papers samjho, aur sab kuch zyada clearly click karega."
          whenToUse={[
            'Concept samajhna hai depth mein — papers best source hain.',
            'Interview preparation — research papers concepts samjhao.',
            'New field explore karna hai — seminal papers fast onboarding.',
            'Building on cutting edge — latest arxiv papers.',
          ]}
          whyUseIt="Papers padhna kyon zaruri hai? (1) 'What' se aage 'Why' samjho — limitations bhi clear hoti hain. (2) Future direction predict kar sako — papers trends se pehle aate hain. (3) Technical discussions mein credibility — paper reference kar sako. (4) Interviews mein differentiate karo — 'Transformer architecture Vaswani et al. 2017 mein introduce hua tha' — ye candidate alag dikha. Full paper zaruri nahi — abstract, intro, conclusion usually kaafi hai."
          howToUse={{
            filename: 'papers-to-read.ts',
            language: 'typescript',
            code: `// Essential AI Papers — Developer Reading List

const essentialPapers = [
  {
    title: 'Attention Is All You Need',
    authors: 'Vaswani et al., Google Brain',
    year: 2017,
    link: 'arxiv.org/abs/1706.03762',
    why: 'Transformer architecture — every modern LLM is based on this. THE foundational paper.',
    difficulty: 'intermediate',
    readTime: 'Abstract + intro = 20 min. Full paper = 2 hours.',
  },
  {
    title: 'Language Models are Few-Shot Learners (GPT-3)',
    authors: 'Brown et al., OpenAI',
    year: 2020,
    link: 'arxiv.org/abs/2005.14165',
    why: 'Scale matters. Emergent capabilities. Why large models are qualitatively different.',
    difficulty: 'intermediate',
    readTime: 'Key sections: 30-60 min.',
  },
  {
    title: 'Training language models to follow instructions (InstructGPT)',
    authors: 'Ouyang et al., OpenAI',
    year: 2022,
    link: 'arxiv.org/abs/2203.02155',
    why: 'RLHF technique jo ChatGPT ko helpful banata hai. Why models actually useful hote hain.',
    difficulty: 'intermediate',
    readTime: '1 hour for key concepts.',
  },
  {
    title: 'Constitutional AI',
    authors: 'Bai et al., Anthropic',
    year: 2022,
    link: 'arxiv.org/abs/2212.08073',
    why: 'Claude ki safety technique. AI ko safe aur helpful dono banane ka approach.',
    difficulty: 'intermediate',
    readTime: 'Key sections: 45 min.',
  },
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    authors: 'Lewis et al., Facebook AI',
    year: 2020,
    link: 'arxiv.org/abs/2005.11401',
    why: 'Original RAG paper. Concept jo entire industry mein standard ban gaya.',
    difficulty: 'intermediate',
    readTime: '30-45 min for core ideas.',
  },
  {
    title: 'ReAct: Synergizing Reasoning and Acting',
    authors: 'Yao et al., Princeton/Google',
    year: 2022,
    link: 'arxiv.org/abs/2210.03629',
    why: 'ReAct agent pattern — agents jo reason + act karte hain. Agentic AI foundation.',
    difficulty: 'beginner-friendly',
    readTime: '20-30 min.',
  },
] as const;

// ─── How to read AI papers effectively ───────────────────────────
const readingStrategy = {
  step1: 'Abstract padhо — kya problem solve kiya? Main contribution?',
  step2: 'Introduction padhо — context aur motivation.',
  step3: 'Figures aur tables dekhо — results visually samjho.',
  step4: 'Conclusion padhо — limitations aur future work.',
  step5: 'Only if needed: full method section padhо.',
  tools: [
    'paperswithcode.com — implementation aur benchmarks',
    'semanticscholar.org — citations, related work',
    'huggingface.co/papers — community summaries',
    'arxiv.org — original papers',
  ],
};

// ai.googleblog.com, anthropic.com/research, openai.com/blog — stay updated`,
            explanation: 'readingStrategy efficient hai: abstract (kya hai?) → intro (context) → figures (results visually) → conclusion (limitations, future work). Ye 4 sections 80% value dete hain. Full method section sirf tab pado jab implement karna ho. essentialPapers list mein readTime estimate hai har paper ke liye — realistic expectation set karo. Papers With Code: har paper ke saath implementation link — code dekh ke samajhna easy hota hai.',
          }}
          realWorldScenario="AI startup interview: interviewer ne ReAct paper reference kiya. Candidate A paper jaanta tha — connected ReAct to practical agent implementation, explained limitations, discussed real use case. Candidate B sirf 'haan, agents jaanta hoon' level tha. Offer: Candidate A. Papers depth create karte hain jo surface knowledge nahi de sakti. 6 papers, 20 min each — ye investment career mein dikh ta hai."
          commonMistakes={[
            {
              mistake: 'Every paper fully read karne ki koshish karna',
              why: 'Full papers mein bahut math hoti hai jo practitioners ko rarely need hoti hai. Full reading ke chakkar mein kuch nahi padha jaata.',
              fix: 'Abstract + conclusion strategy — 20 min per paper, 10 papers = solid foundation. Math section sirf jab implement karna ho. Blog posts aur YouTube explanations papers se pehle karo.',
            },
          ]}
          proTip="Andrej Karpathy ka 'Neural Networks: Zero to Hero' YouTube series — ex-OpenAI director, transformers literally scratch se code mein build karte hain. Sikhne ke baad attention mechanism genuinely samajh aata hai, surface level nahi. 'Let's build GPT from scratch' video specifically — ek din invest karo, concepts lifetime ke liye clear ho jaate hain. Best free AI education resource available hai ye."
        />
      </div>

      {/* Card 3: Communities */}
      <div id="communities">
        <ConceptCard
          title="Communities to Join — Network Build Karo"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="Community ek multiplier hai — alone sikhne se 5-10x faster learning hoti hai sahi community mein. Questions fast answer milte hain. Latest news pehle milti hai. Collaborators milte hain. Opportunities aate hain. Key communities: Hugging Face Discord (largest ML community), Anthropic Developer Discord (direct team access), Latent Space Discord (high signal practitioners), AI Twitter/X (researchers aur builders), local AI meetups."
          whenToUse={[
            'Specific technical question: Stack Overflow, Hugging Face forums.',
            'Latest news: AI Twitter/X, newsletters.',
            'Collaboration: Discord servers, local meetups.',
            'Career opportunities: LinkedIn AI groups, Twitter.',
            'Competitions: Kaggle, AI hackathons.',
          ]}
          whyUseIt="Alone learning vs community learning: community mein ek hafte mein wo seekhoge jo alone 3 mahine mein seekhte. Real practitioners real insights share karte hain — textbook knowledge nahi, production mein kya kaam kiya/nahi kiya. 'Maine ye try kiya, fail hua kyunki...' — ye information kisi course mein nahi milti. Network effect: ek Discord introduction se job, project, ya co-founder mil sakta hai. Ye real hai."
          howToUse={{
            filename: 'communities-guide.ts',
            language: 'typescript',
            code: `// AI Communities — Where to Find Your Tribe

const communities = {
  discord: [
    {
      name: 'Anthropic Developer Discord',
      link: 'discord.gg/anthropic',
      why: 'Direct feedback from Anthropic team, early feature announcements, Claude-specific help',
      activity: 'High — very active community',
    },
    {
      name: 'Hugging Face Discord',
      link: 'huggingface.co/join/discord',
      why: 'Open source models, research papers, model sharing — largest ML community',
      activity: 'Very high',
    },
    {
      name: 'LangChain Discord',
      link: 'discord.gg/langchain',
      why: 'LangChain specific help, agent building, RAG discussions',
      activity: 'High',
    },
    {
      name: 'Latent Space Discord',
      link: 'latent.space/discord',
      why: 'AI practitioners — engineers at OpenAI, Anthropic, startups. High signal.',
      activity: 'Medium — quality > quantity',
    },
  ],

  twitter: [
    '@AnthropicAI — Official Claude updates',
    '@OpenAI — Official OpenAI news',
    '@karpathy — Andrej Karpathy, ex-OpenAI, deep technical insights',
    '@ylecun — Yann LeCun, Meta AI, debates aur research',
    '@swyx — swyx, AI engineering perspectives, building in public',
    '@goodside — Riley Goodside, prompt engineering master',
    '@simonw — Simon Willison, practical AI building, Django creator',
  ],

  newsletters: [
    { name: 'The Batch (deeplearning.ai)', frequency: 'weekly', focus: 'Research + industry' },
    { name: 'AI Breakfast', frequency: 'daily', focus: 'Quick news digest' },
    { name: 'Latent Space', frequency: 'irregular', focus: 'Deep technical dives' },
    { name: 'Import AI (Jack Clark)', frequency: 'weekly', focus: 'Research focus' },
  ],

  platforms: [
    'Kaggle — competitions, datasets, notebooks',
    'Papers With Code — papers + implementations',
    'Hugging Face — models, datasets, spaces',
    'GitHub — open source projects, follow researchers',
    'Arxiv.org — latest research (overwhelming but valuable)',
  ],

  localMeetups: [
    'ai.meta.com/events (Meta AI events)',
    'meetup.com (search "AI" or "machine learning" in your city)',
    'Google ML Developer Groups',
    'local hackathons — ETHGlobal, buildspace, etc.',
  ],
};

// Action plan:
// Week 1: Join 2-3 Discord servers. Follow 10 people on Twitter.
// Week 2: Introduce yourself in Discord. Share one thing you built.
// Month 1: Attend one local meetup or online event.
// Ongoing: Share learnings publicly — 1 post per week minimum.`,
            explanation: 'Engagement strategy: pehle lurk karo (observe what people discuss), phir questions poocho (specific, thoughtful questions), phir share karo apni learnings. Quality > quantity: 2-3 active communities better than 10 passive ones. Twitter/X: researchers + practitioners follow karo — @karpathy, @simonw, @swyx. Discord: introduce yourself — connections visibility se hote hain. Action plan code mein dekho: Week 1, Week 2, Month 1 steps.',
          }}
          realWorldScenario="Developer ne Anthropic Discord mein join kiya, Claude API ke baare mein detailed thoughtful question poocha. Anthropic engineer ne personally answer diya, extra context share kiya. 3 months baad: same developer ne Anthropic job apply kiya — hiring manager Discord history dekh chuka tha, conversation yaad tha. Community presence compounds. Ek genuine interaction ne career connection banaya. Ye accidental nahi tha — visibility ka result tha."
          commonMistakes={[
            {
              mistake: 'Community mein sirf consume karna — never contribute',
              why: 'Pure consumers invisible hote hain — no connections built, no opportunities. Network effect building mein time lagta hai.',
              fix: 'Give before you take: answer questions (even basic ones), share learnings, celebrate others\' work. Reciprocity community mein natural hai — contributors attract contributors.',
            },
          ]}
          proTip="Swyx ka 'Learn in Public' philosophy: jo seekh raho wo publicly share karo — bhale hi basic lage. Blog post likho, tweet karo, Discord mein question poocho — sab public. Result: unexpected connections, opportunities, aur knowledge retention better hoti hai (teaching solidifies learning). Shuru karo 'maine aaj ye seekha' se — audience baad mein aayegi."
        />
      </div>

      {/* Card 4: Career Paths */}
      <div id="career-paths">
        <ConceptCard
          title="Career in AI — Paths aur Opportunities"
          emoji="💼"
          difficulty="intermediate"
          whatIsIt="AI mein career paths alag hain — aur koi bhi background se possible hai. ML Engineer: models train karo, architectures design karo, research karo — math heavy, PyTorch world. AI Product Engineer: LLM APIs se features build karo, user-facing products ship karo — software engineering skills focus. AI Prompt Engineer: prompting, evaluation — communication heavy. AI Researcher: academia ya big tech — PhD often needed. Node.js developers ke liye natural path: AI Product Engineer. Ye chapter wahi cover karta hai."
          whenToUse={[
            'AI Product Engineer: existing software + AI features add karna.',
            'ML Engineer: new model architectures, training at scale.',
            'Prompt Engineer: large-scale prompt optimization, evaluation.',
            'AI Entrepreneur: AI-powered startup build karna.',
          ]}
          whyUseIt="Supply-demand gap: companies AI features chahti hain, skilled developers kam hain. AI Product Engineer San Francisco startup: $150K-250K+ (2025). India mein: Bengaluru AI startups 30-80 LPA experienced ke liye. Timing: abhi market peak pe hai — pehle se zyada demand, zyada supply nahi. Node.js developers ke liye: existing skills directly transferable hain. Sirf AI layer add karo, koi naya foundation nahi seekhna."
          howToUse={{
            filename: 'ai-career-paths.ts',
            language: 'typescript',
            code: `// AI Career Paths — Honest Guide

const careerPaths = {
  aiProductEngineer: {
    description: 'Build AI-powered products using LLM APIs, RAG, agents',
    requiredSkills: [
      'Node.js / Python (one of them)',
      'LLM APIs (Anthropic, OpenAI)',
      'RAG systems',
      'Vector databases',
      'Prompt engineering',
      'System design',
    ],
    niceToHave: ['React/Next.js', 'TypeScript', 'Cloud (AWS/GCP/Azure)', 'DevOps basics'],
    mathRequired: 'Minimal — conceptual understanding only',
    timeToEntryLevel: '3-6 months with focused learning',
    salaryRange: 'India: 20-80 LPA | US: $120-250K',
    bestFor: 'Software developers transitioning to AI. NodeMaster graduates!',
  },

  mlEngineer: {
    description: 'Train models, design architectures, ML infrastructure',
    requiredSkills: [
      'Python (mandatory)',
      'PyTorch / TensorFlow',
      'Linear algebra, calculus, statistics',
      'Distributed training',
      'GPU programming (CUDA basics)',
      'Experiment tracking (MLflow, W&B)',
    ],
    mathRequired: 'High — linear algebra, calculus, probability',
    timeToEntryLevel: '1-2 years (strong CS background helps)',
    salaryRange: 'India: 40-120 LPA | US: $150-350K',
    bestFor: 'CS engineers who love math and want to build foundation models',
  },

  promptEngineer: {
    description: 'Optimize prompts, build evaluation systems, AI QA',
    requiredSkills: ['Writing', 'Logical thinking', 'LLM understanding', 'Python/JS basics'],
    mathRequired: 'Very low',
    timeToEntryLevel: '1-3 months',
    salaryRange: 'India: 15-40 LPA | US: $80-180K',
    bestFor: 'Writers, researchers, non-tech backgrounds entering AI',
  },

  // ─── 12-month skill building plan ───────────────────────────────
  aiProductEngineerPath: {
    month1_3: 'NodeMaster GenAI track complete (done!). Build 3 projects.',
    month4_6: 'Deploy ek real product. Users se feedback. Iterate.',
    month7_9: 'Advanced: agents, fine-tuning experiments, multimodal.',
    month10_12: 'Portfolio: 3 shipped projects. Open source contribution. Job applications.',

    portfolioProjects: [
      'RAG system for your niche (hobby, industry)',
      'AI-powered automation tool (something you use daily)',
      'Multi-agent system (research assistant, code reviewer)',
    ],
  },
};

console.log('Best path for Node.js devs:', careerPaths.aiProductEngineer.bestFor);`,
            explanation: 'careerPaths object mein do paths detail mein hain: aiProductEngineer aur mlEngineer. Key difference: math requirement (minimal vs high), timeToEntryLevel (3-6 months vs 1-2 years). aiProductEngineerPath: 4-phase 12-month roadmap — GenAI track complete (done!), 3 projects build karo, deploy karo, portfolio banao, apply karo. portfolioProjects mein 3 specific ideas hain — ye actually build karo.',
          }}
          realWorldScenario="NodeMaster student Rohan: 3 saal Node.js developer. GenAI track complete kiya. 3 projects build kiye aur ship kiye — RAG document system, AI code reviewer, multi-agent research tool. Sab GitHub pe public. 3 months baad: AI startup se offer — 45 LPA (18 se). Kya change hua? Resume mein words nahi — shipped projects. Interviewer ne GitHub dekha, real code dekha, problems samji. AI Product Engineer path works — ye proof hai."
          commonMistakes={[
            {
              mistake: 'Jobs apply karne se pehle ek saal aur sikhne ki koshish karna',
              why: '"Job ke liye ready nahi hoon" feeling kabhi nahi jaati. Over-preparation is real.',
              fix: 'Ship karo pehle. 2-3 AI projects deployed? Apply karo. Real feedback se zyada seekhoge interviews aur jobs mein courses se. Action zyada important hai preparation se.',
            },
          ]}
          proTip="Job boards: ai-jobs.net, Anthropic careers, OpenAI careers. Startups ke liye: Hacker News 'Who is Hiring' monthly thread (goldmine hai), Y Combinator jobs, Wellfound. LinkedIn: 'AI Engineer' ya 'AI Product Engineer' search karo, company size se filter karo — startups se shuru karo, entry easier hai. Pehla AI job startups se lo, experience build karo, phir big tech ya apna startup."
        />
      </div>

      {/* Card 5: Building in Public */}
      <div id="building-in-public">
        <ConceptCard
          title="Building in Public — Share Karo, Network Banao"
          emoji="🌟"
          difficulty="intermediate"
          whatIsIt="Building in public: apni journey publicly share karna — progress, learnings, failures, insights. Perfect results show karna nahi hai goal — journey share karna hai. Medium: Twitter/X, LinkedIn, blog, YouTube — koi bhi. Goal: authentic community build karo, feedback pao, opportunities create karo. Ye strategy compound karti hai — har post audience grow karta hai, audience opportunities laati hai."
          whenToUse={[
            'Project start karo → announce karo publicly.',
            'Interesting learning aaya → tweet karo.',
            'Problem solve ki → blog post ya thread.',
            'Failure aayi → share karo honestly (most valuable content!).',
            'Milestone complete hua → celebrate publicly.',
          ]}
          whyUseIt="Building in public compound karta hai — slow at first, then exponential. Year 1: koi nahi dekh raha (normal hai). Year 2: 1000 followers, recognition start. Year 3: opportunities seedha aane lagte hain. Swyx, Pieter Levels, Sahil Lavingia — sab ne isi path se empires banaye. Process replicable hai — lekin patience chahiye. Consistent posting > viral moments."
          howToUse={{
            filename: 'building-in-public.ts',
            language: 'typescript',
            code: `// Building in Public — Practical Playbook

const buildingInPublicGuide = {
  // What to share
  contentIdeas: [
    // Technical learnings
    'Kya maine aaj seekha Node.js + AI ke baare mein',
    'Bug fix journey — 3 ghante ki debugging, final solve',
    'Library comparison — LangChain vs raw API, mere experience se',
    'Architecture decision — kyun ye chose, alternatives kya the',

    // Project updates
    'Week in review — kya build kiya, kya stuck tha',
    'Metrics — users, revenue, API costs — honest numbers',
    'Failed experiment — kya try kiya, kyun kaam nahi kiya',
    'User feedback — interesting feedback, how I responded',

    // Community value
    'Resource share — ye paper/blog helpful tha',
    'Question — stuck hoon, koi help kar sakta hai?',
    'Opinion — AI mein ye trend ke baare mein meri thoughts',
  ],

  // Posting strategy
  platforms: {
    twitter: 'Quick thoughts, threads for detailed topics, engage with community',
    linkedin: 'Professional achievements, longer form insights, career updates',
    github: 'Code public rakho, README mein project story likho',
    blog: 'Detailed tutorials, long-form insights, SEO benefits',
    youtube: 'Build along videos, demo recordings — high engagement',
  },

  // Consistency > perfection
  weeklyCommitment: {
    minimum: '1 post / week — literally anything learned',
    recommended: '3-5 posts / week — mix of learnings + updates',
    advanced: 'Daily updates — separate audience for this format',
    warning: 'Burnout real hai — sustainable pace choose karo',
  },

  // Sample first post
  firstPost: \`"Main AI features Node.js apps mein add karna seekh raha hoon.
NodeMaster GenAI track start kiya aaj.

Today's learning: LLM APIs surprisingly simple hain!
5 lines of code se Claude se bat kar sakte hain.

Next milestone: ek working chatbot ship karna 2 weeks mein.

Follow kar lo journey ke liye! 🚀 #buildinginpublic #AI #NodeJS"\`,

  // Metrics to track
  trackThese: [
    'Followers growth (weekly)',
    'Post engagement (likes, comments, shares)',
    'Opportunities from posts (mentions, DMs, job offers)',
    'Code contributions from community',
  ],
};

// ─── Notable builders to follow for inspiration ───────────────────
const notableBuilders = [
  { name: 'Pieter Levels (@levelsio)', why: 'Building in public pioneer, 12 startups in 12 months' },
  { name: 'swyx (@swyx)', why: 'Learn in public concept, AI engineering insights' },
  { name: 'Simon Willison (@simonw)', why: 'LLMs + practical building, daily updates' },
  { name: 'Andrej Karpathy (@karpathy)', why: 'Deep technical, accessible explanations' },
];

console.log('Start today:', buildingInPublicGuide.firstPost);`,
            explanation: 'contentIdeas dekho — varied content mix: technical learnings, project updates, failed experiments, opinion pieces. Sab valuable hai. weeklyCommitment: minimum 1 post/week — sustainable pace chose karo. firstPost template ready hai — copy karo, customize karo, post karo aaj. trackThese metrics monthly check karo — growth visibility deta hai aur motivation maintain karta hai. Consistency > virality.',
          }}
          realWorldScenario="Priya: backend developer, NodeMaster complete kiya. Building in public start kiya — weekly AI learnings tweets. Month 3: 500 followers. Month 6: 2000 followers, 2 consulting inquiries. Month 9: AI newsletter 500 subscribers. CTO DM: 'Maine tumhara kaam 6 months se follow kiya hai, join karna chahoge?' Year 1: own AI consulting practice. Consistency compounded. Sirf posts nahi, visibility ne career create kiya."
          commonMistakes={[
            {
              mistake: 'Wait karna jab tak "perfect" project nahi bana',
              why: 'Perfect kabhi nahi aata. Waiting = missed compounding. Early awkward posts teach you what resonates.',
              fix: 'Ship imperfect, learn fast. "Working prototype" share karo. Community finishing touches mein help karta hai. Done > perfect.',
            },
          ]}
          proTip="Hashnode ya Dev.to pe free blog shuru karo — built-in audience, SEO benefits, developer community. Ek detailed post (1000+ words) per week: 6 months mein solid online presence. Same content cross-post karo — LinkedIn article, Twitter thread, Dev.to post. Ek piece of content, multiple platforms = maximum reach per unit effort. Content strategy ye hai."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 22 Quiz — Future of AI
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Journey complete karo! 🎉
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="ai-future" />
      </div>

      {/* Final celebration */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.12))',
          border: '1px solid rgba(124,58,237,0.3)',
        }}
      >
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-display font-bold text-[#F5F5F7] mb-3">
          NodeMaster GenAI Track — Complete!
        </h2>
        <p className="text-[#A1A1AA] text-lg mb-4 max-w-2xl mx-auto">
          22 chapters, AI/ML foundations se production patterns tak — tumne poora GenAI track complete kiya. Ab build karo, ship karo, aur community ko share karo.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Chapters', value: '22' },
            { label: 'Concepts', value: '100+' },
            { label: 'Code Examples', value: '50+' },
            { label: 'Quizzes', value: '110+' },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="text-2xl font-bold text-[#7C3AED]">{stat.value}</div>
              <div className="text-xs text-[#71717A]">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#71717A]">
          Ab apna pehla AI project build karo. Phir dusra. Phir teesra. Har project seekhne ka best tariqa hai.
        </p>
      </div>
    </div>
  )
}
