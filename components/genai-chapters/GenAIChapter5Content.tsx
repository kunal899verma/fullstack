'use client'

import React, { useState } from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function LlmInferenceDiagram() {
  const items = [
    { label: 'Input Text', sublabel: 'Your prompt — system + user messages', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '💬' },
    { label: 'Tokenizer', sublabel: 'Text → token IDs (~4 chars per token in English)', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '✂️' },
    { label: 'Transformer Blocks (N layers)', sublabel: 'Attention + FFN — repeated N times, context processed', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', icon: '🔁' },
    { label: 'Logits → Sampling', sublabel: 'Temperature / top-p applied — pick next token', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '🎲' },
    { label: 'Next Token → Repeat', sublabel: 'Append token, feed back in — until EOS or max_tokens', color: '#7C3AED', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.4)', icon: '🔄' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">LLM Inference Pipeline</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Token Estimator Demo ──────────────────────────────────────────────────────

function TokenEstimatorDemo() {
  const [text, setText] = useState('Hello! Node.js event loop kya hai?')
  const estimated = Math.ceil(text.length / 4)
  const cost4oMini = (estimated / 1_000_000) * 0.15 // $0.15/1M tokens input
  const cost4o = (estimated / 1_000_000) * 2.5 // $2.5/1M tokens input

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#71717A]">Text likho — token estimate aur cost dekho</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-24 rounded-xl text-sm text-[#F5F5F7] p-3 resize-none outline-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'monospace',
        }}
        placeholder="Koi bhi text likho..."
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}>
          <p className="text-2xl font-display font-bold text-[#9D5FF0]">{estimated}</p>
          <p className="text-xs text-[#71717A]">Estimated Tokens</p>
          <p className="text-[10px] text-[#71717A] mt-0.5">{text.length} chars ÷ 4</p>
        </div>
        <div className="rounded-xl p-3 space-y-1" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <p className="text-xs text-[#71717A] mb-1">API Cost (Input)</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#A1A1AA]">GPT-4o-mini</span>
            <span className="text-xs font-mono text-[#10B981]">${cost4oMini.toFixed(6)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#A1A1AA]">GPT-4o</span>
            <span className="text-xs font-mono text-[#10B981]">${cost4o.toFixed(6)}</span>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-[#71717A]">
        Note: Actual token count tiktoken se check karo — ye rough estimate hai (1 token ≈ 4 chars English)
      </p>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const llmQuiz = [
  {
    question: 'Tokenization mein ek token average kitne characters ka hota hai English mein?',
    options: [
      { text: '1 character = 1 token', correct: false, explanation: 'Character-level tokenization inefficient hai — vocabulary too large.' },
      { text: 'Approximately 4 characters per token (English mein)', correct: true, explanation: 'Sahi! BPE tokenization se roughly 4 chars/token English mein. Code aur non-English languages vary karte hain.' },
      { text: '1 word = 1 token hamesha', correct: false, explanation: 'Common words 1 token, rare words multiple tokens. "antidisestablishmentarianism" = 7 tokens.' },
      { text: '10 characters per token', correct: false, explanation: 'Too high — 4 chars/token approximate estimate hai.' },
    ],
  },
  {
    question: 'RLHF (Reinforcement Learning from Human Feedback) kyun important hai?',
    options: [
      { text: 'Model ko faster train karta hai', correct: false, explanation: 'RLHF speed ke liye nahi — alignment ke liye hai.' },
      { text: 'Model ko human preferences ke saath align karta hai — helpful, harmless, honest banana', correct: true, explanation: 'Bilkul sahi! Pre-training sirf next token predict karta hai — RLHF se model helpful aur safe responses dena seekhta hai.' },
      { text: 'Sirf code generation ke liye use hota hai', correct: false, explanation: 'RLHF general purpose alignment technique hai — language, code, reasoning sab ke liye.' },
      { text: 'Context window badhata hai', correct: false, explanation: 'Context window architectural decision hai — RLHF alignment technique hai.' },
    ],
  },
  {
    question: 'Temperature = 0 kya karta hai sampling mein?',
    options: [
      { text: 'Random output deta hai', correct: false, explanation: 'Temperature 0 = deterministic, high temperature = more random.' },
      { text: 'Greedy decoding — hamesha most probable token select hota hai', correct: true, explanation: 'Correct! Temperature 0 = argmax. Deterministic, reproducible, lekin creative nahi. Code generation ke liye ideal.' },
      { text: 'Model crash ho jaata hai', correct: false, explanation: 'Temperature 0 valid setting hai — sirf greedy decoding karta hai.' },
      { text: 'Context window clear ho jaata hai', correct: false, explanation: 'Temperature sampling ka parameter hai — context se independent.' },
    ],
  },
  {
    question: 'KV Cache kya karta hai?',
    options: [
      { text: 'Model weights compress karta hai', correct: false, explanation: 'KV cache inference optimization hai, model compression nahi.' },
      { text: 'Previous tokens ke Key-Value pairs cache karta hai — attention recompute avoid karta hai', correct: true, explanation: 'Sahi! Bina KV cache ke har new token ke liye sab previous tokens recompute karna padta. Cache se O(n) → O(1) per step. 128K context zyada expensive kyunki larger KV cache.' },
      { text: 'Training loss save karta hai', correct: false, explanation: 'KV cache inference-time optimization hai, training nahi.' },
      { text: 'Vocabulary cache karta hai', correct: false, explanation: 'KV cache attention computation ke Keys aur Values cache karta hai.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter5Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          LLMs — Demystify Karte Hain!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bhai, LLM koi &apos;intelligent being&apos; nahi hai. Ye ek bahut bada next-word predictor hai — seriously. Training mein 1 trillion+ words dekhe hain, toh iska pattern matching BAHUT sharp hai. Intelligence jaisa lagta hai — actually statistics hai. Ye samajhna liberating hai — AI se realistic expectations set kar sakta hai, better prompts likh sakta hai, aur aaj woh mistakes avoid kar sakta hai jo non-technical log karte hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Tokenization, pre-training, RLHF, context window, sampling — ye sab andar kya hota hai, practical perspective se. Ye concepts seedhe API use mein help karenge — token costs estimate karo, temperature set karo, context limits samjho.
        </p>
      </div>

      <LlmInferenceDiagram />

      {/* ConceptCard 1: Tokenization */}
      <div id="tokenization">
        <ConceptCard
          title="Tokenization — Words Nahi, Tokens Hain"
          emoji="🔤"
          difficulty="intermediate"
          whatIsIt="Shocking fact: LLM text ko words mein nahi padhta — tokens mein. Token kya hai? Roughly 4 characters (English mein). 'Hello' = 1 token. 'antidisestablishmentarianism' = 7 tokens! '1234567890' = 4 tokens. Aur Hindi/Chinese mein per character zyada tokens lagte hain. Ye important kyun hai? Kyunki API billing tokens per hoti hai — characters nahi, words nahi — TOKENS. Galat estimate = budget surprise. BPE (Byte Pair Encoding) se common subwords tokens ban jaate hain — ye subword tokenization hai."
          whenToUse={[
            'API costs estimate karne ke liye — token count = billing unit',
            'Context window limits check karne ke liye',
            'Tokenization bugs debug karne ke liye — special characters',
            'Model capabilities samajhne ke liye — kya efficient process hota hai',
          ]}
          whyUseIt="Practical kyun zaroori hai? Budget control. 1000 words ≠ 1000 tokens — generally 1000 words ≈ 1300-1500 tokens. Code aur special characters zyada tokens lete hain. System prompts bhi count hote hain — har API call mein. Ek startup ne ek baar document summarization app banaya bina token estimate kiye — daily 1000 requests, cost 3x expected tha. tiktoken library use karo exact count ke liye before production deployment."
          howToUse={{
            filename: 'tokenization-demo.js',
            language: 'javascript',
            code: `// Tokens are not words!
// "Hello world" might be: ["Hello", " world"] = 2 tokens
// "antidisestablishmentarianism" = 7 tokens
// "1234567890" = 4 tokens (numbers split oddly)
// Code is tokenized differently — important for code models

// Average: 1 token ≈ 4 characters (English)
// API costs are per token — estimate your costs!
function estimateTokens(text) {
  return Math.ceil(text.length / 4); // rough estimate
}

// Actual tokenization dekho — tiktoken library (OpenAI)
// npm install tiktoken
import { encoding_for_model } from 'tiktoken'

const enc = encoding_for_model('gpt-4o-mini')

const examples = [
  'Hello world',                     // 2 tokens
  'antidisestablishmentarianism',    // 7 tokens
  '1234567890',                      // 4 tokens
  'const x = require("express")',    // ~7 tokens
  'नमस्ते दुनिया',                    // ~8 tokens (Hindi more per char)
]

for (const text of examples) {
  const tokens = enc.encode(text)
  console.log(\`"\${text}" = \${tokens.length} tokens\`)
}

// Important for context limits:
// GPT-4o context: 128K tokens ≈ 512K chars ≈ 100K words
// claude-3-5-sonnet: 200K tokens
// Estimate context usage before API call!`,
            explanation: 'tiktoken exact token count deta hai — production mein use karo cost control ke liye. Estimate function quick check ke liye. System prompts bhi tokens count karte hain — long system prompts costly hain.',
          }}
          realWorldScenario="Real case: Startup document summarization app bana raha tha. Documents average 10K words the — 12.5K tokens estimate kiya. GPT-4o par daily 1000 requests = 12.5M tokens = $31.25/day sirf input. tiktoken se actual count nikala — 14K tokens average (code snippets zyada tokens lete hain). Monthly budget 12% zyada tha. Aur ye sirf input — output tokens alag billing. Token counting = financial planning. Tools use karo."
          commonMistakes={[
            {
              mistake: 'Characters = tokens assume karna',
              why: 'Ek Hindi character multiple tokens ho sakta hai. Code symbols bhi alag tokenize hote hain. Cost miscalculation hoti hai.',
              fix: 'tiktoken ya tokenizer.js use karo exact count ke liye. Rough estimate: English 4 chars/token, Hindi/Chinese 1-2 chars/token.',
            },
            {
              mistake: 'System prompt tokens ignore karna cost calculation mein',
              why: 'Har API call mein system prompt bhi include hota hai — billiable tokens mein count hota hai.',
              fix: 'Total tokens = system_prompt_tokens + conversation_tokens + response_tokens. System prompt optimize karo agar cost concern hai.',
            },
          ]}
          proTip="Money-saving tip: Anthropic prompt caching se 90% cost reduction ho sakti hai repeated system prompts par! Ek baar cache karo, baar baar use karo — sirf 10% cost. Token counting tools: platform.openai.com/tokenizer (visual), tiktoken library (programmatic). Context window efficiently use karo — unnecessary repetition avoid karo, concise system prompts likho. Token economy = better products at lower cost."
          demo={<TokenEstimatorDemo />}
        />
      </div>

      {/* ConceptCard 2: Pre-training */}
      <div id="pretraining">
        <ConceptCard
          title="Pre-training — Trillion Words Se Seekhna"
          emoji="🏋️"
          difficulty="intermediate"
          whatIsIt="Imagine karo: tujhe 1 trillion words padhne ko kaha jaaye — Wikipedia, GitHub, Reddit, news, books, scientific papers — sab kuch. Aur ek task: 'next word predict karo'. Bas itna. LLM pre-training exactly yahi hai. Self-supervised learning — labels khud text se aate hain, koi manual annotation nahi. Lekin is simple task se model ne implicitly seekha: grammar, facts, reasoning, code syntax, translation, math — sab kuch. Scale se emergence hoti hai — capabilities jo explicitly design nahi ki gayi, khud aati hain."
          whenToUse={[
            'LLM capabilities source samajhne ke liye',
            'Fine-tuning vs prompting decision karne ke liye',
            'Model limitations samajhne ke liye — knowledge cutoff, biases',
            'Foundation model choose karne ke liye',
          ]}
          whyUseIt="Ye samajhna kyun zaroori hai? Kyunki pre-trained model aur fine-tuned model mein fundamental difference hai. Pre-trained model sirf text complete karta hai — instructions follow nahi karta. RLHF ke baad helpful assistant banta hai. Knowledge cutoff = training data ka last date — model ko baad ki koi baat nahi pata. Real-time info chahiye toh RAG use karo. Ye limitations samajhna AI ko properly use karne ke liye must hai."
          howToUse={{
            filename: 'pretraining-intuition.md',
            language: 'markdown',
            code: `# LLM Pre-training — What Happens

## Data
- Common Crawl (web pages) — TB scale
- Books (BookCorpus, Gutenberg)
- Wikipedia, GitHub, arXiv, StackOverflow
- Total: Trillions of tokens

## Training Objective: Next Token Prediction
Input:  "The cat sat on the"
Target: "mat"

Input:  "def fibonacci(n):"
Target: "    if n <= 1:"

Simple objective → complex capabilities emerge!

## What Models Learn (Implicitly)
- Grammar + syntax (obvious)
- World facts: "Paris is the capital of France"
- Reasoning: "If A → B, A is true, then B is true"
- Code: syntax, patterns, algorithms
- Math: step-by-step problem solving
- Translation, summarization, QA (emergent)

## Scale Laws (Chinchilla)
More parameters + More data = Better model
Optimal: ~20 tokens per parameter
- 7B model: ~140B tokens
- 70B model: ~1.4T tokens

## Knowledge Cutoff
Training data has a cutoff date:
- Model doesn't know events after cutoff
- GPT-4: April 2023 (at time of release)
- Claude 3.5 Sonnet: April 2024
- Always check for time-sensitive queries`,
            explanation: 'Emergent abilities: certain capabilities suddenly appear at scale — not present in smaller models. GPT-3 scale par few-shot learning emerged unexpectedly. Ye scaling laws aur emergent phenomena AI research ke hot topics hain.',
          }}
          realWorldScenario="GPT-3 (2020) — 175B parameters par train kiya. Researchers surprised the: model few-shot learning karta hai bina fine-tuning ke! Sirf 3 examples prompt mein do — naaya task solve karta hai. Explicitly programmed nahi tha — scale se emerge kiya. Ye 'emergent abilities' research mein bahut documented hain: certain capabilities small models mein nahi hoti, large models mein suddenly aati hain. Scale = unexpected superpowers."
          commonMistakes={[
            {
              mistake: 'Pre-trained model ko production-ready samajhna',
              why: 'Pre-trained model next token predict karta hai — not follow instructions. Raw model harmful content bhi generate kar sakta hai.',
              fix: 'Fine-tuning (instruction tuning) + RLHF zaroori hai helpful assistant banane ke liye. OpenAI/Anthropic API already fine-tuned models provide karte hain.',
            },
            {
              mistake: 'Knowledge cutoff ignore karna time-sensitive tasks mein',
              why: 'Model training ke baad ki events nahi jaanta — confident wrong answers de sakta hai.',
              fix: 'RAG (Retrieval Augmented Generation) use karo recent information ke liye. Explicitly note karo user ko: "My knowledge is current as of [date]".',
            },
          ]}
          proTip="Chinchilla paper (2022) ne scaling laws define kiye: optimal training = ~20 tokens per parameter. Matlab 7B model ke liye ~140B tokens optimal. Bahut zyada data ya bahut kam data dono suboptimal. Data quality equally important — garbage in at trillion scale = confidently garbage out. Model size aur data size dono matter karte hain — ek neglect mat karo."
        />
      </div>

      {/* ConceptCard 3: RLHF */}
      <div id="rlhf">
        <ConceptCard
          title="RLHF — Human Feedback Se Seekhna"
          emoji="🤝"
          difficulty="intermediate"
          whatIsIt="Sawaal: pre-trained GPT-3 ko directly ChatGPT kyu nahi bol sakte? Kyunki pre-trained model instruction follow nahi karta — sirf text complete karta hai. Aur harmful content bhi generate kar sakta hai. RLHF ne ye fix kiya. Process: (1) Human demonstrators good responses likhte hain — SFT. (2) Human raters alag responses rank karte hain — reward model train hoti hai. (3) RL se LLM optimize hoti hai — high reward responses zyada likely banao. Result: helpful, harmless, honest assistant. Ye hi ChatGPT ko ChatGPT banata hai."
          whenToUse={[
            'LLMs instruction follow kyun karte hain samajhne ke liye',
            'Why models refuse harmful requests — alignment samajho',
            'Fine-tuning vs RLHF decision karne ke liye',
            'AI safety aur alignment concepts ke foundation',
          ]}
          whyUseIt="Ye samajhna kyun zaroori hai? Kyunki jab Claude refuse karta hai kuch karne se — ye RLHF hai. Jab ChatGPT instructions follow karta hai step by step — ye RLHF hai. Jab model helpful tone mein baat karta hai — RLHF. Ye restriction nahi hai — ye alignment hai. Aur DPO (simpler alternative) ne ye aur accessible banaya — LLaMA 3, Mistral use karte hain. Community level par bhi fine-tuning possible hai."
          howToUse={{
            filename: 'rlhf-process.md',
            language: 'markdown',
            code: `# RLHF Pipeline — Step by Step

## Phase 1: Supervised Fine-Tuning (SFT)
- Human demonstrators examples likhte hain
- "User: How to make pasta? Assistant: [good response]"
- Model in-distribution behavior seekhta hai
- Result: Model instructions follow karna seekhta hai

## Phase 2: Reward Model Training
- Human raters: multiple responses ko rank karte hain
  Response A vs Response B — kaunsa better?
- Reward model train hoti hai: good response = high score
- Model human preferences predict karna seekhti hai

## Phase 3: RL Fine-tuning (PPO)
- Language model (policy) responses generate karta hai
- Reward model score deta hai
- PPO (Proximal Policy Optimization) policy update karta hai
  → High reward responses zyada likely hone chahiye
- KL divergence constraint: original model se bahut dur mat jao
  (prevents reward hacking / collapse)

## Result: Aligned Model
- Follows instructions ✅
- Refuses harmful requests ✅
- Prefers helpful responses ✅
- Honest about limitations ✅

## Alternatives to RLHF
- DPO (Direct Preference Optimization): Simpler, no RL needed
  Llama 3, Mistral use DPO
- RLAIF: AI feedback — Claude evaluating Claude
  (Constitutional AI — Anthropic's approach)`,
            explanation: 'RLHF complex aur expensive hai — human labelers + RL training. DPO simpler alternative hai. Constitutional AI (Anthropic) ek AI model se dusre ko guide karta hai — scale par more feasible. Ye all alignment techniques hain.',
          }}
          realWorldScenario="December 2022: GPT-3.5-turbo (pre-trained) + SFT + RLHF = ChatGPT. GPT-3 raw ko 'How to make a bomb?' bol do — instructions de deta tha. ChatGPT ne refuse kiya, helpful alternative explain kiya. Ye RLHF ka direct result hai. Lekin RLHF sirf safety nahi — ChatGPT GPT-3 se zyada helpful bhi hai, coherent bhi, instructions-following bhi. Alignment = better assistant, not just safe assistant."
          commonMistakes={[
            {
              mistake: 'RLHF = censorship samajhna',
              why: 'RLHF primarily helpfulness ke liye hai — harmful content refuse karna ek dimension hai.',
              fix: 'RLHF aligned model zyada helpful, coherent, honest hota hai. Harmful content avoidance side effect hai, primary goal nahi.',
            },
            {
              mistake: 'Reward hacking: model reward maximize karne ke liye cheats',
              why: 'Model responses zyada long ya sycophantic ban sakti hain — reward model ko fool karne ke liye. Goodhart\'s Law: measure becomes target.',
              fix: 'KL divergence penalty, diverse evaluators, held-out test sets. RLHF ongoing research area hai — perfect alignment unsolved problem.',
            },
          ]}
          proTip="DPO (Direct Preference Optimization) — RLHF ka simpler alternative. No reward model, no RL loop — preferences directly fine-tuning loss mein. LLaMA 3, Mistral instruction models DPO use karte hain. Matlab: ek developer/small team bhi aligned fine-tuned models bana sakta hai — democratization of alignment. Constitutional AI (Anthropic) aur bhi interesting: ek AI se dusre AI ko guide karo."
        />
      </div>

      {/* ConceptCard 4: Context Window */}
      <div id="context-window">
        <ConceptCard
          title="Context Window — Model Ki Memory"
          emoji="🪟"
          difficulty="intermediate"
          whatIsIt="Context window = LLM ki short-term memory. Ye woh maximum tokens hain jo model ek saath dekh sakta hai — system prompt + conversation history + response sab milake. Session khatam = sab bhool jaata hai. 128K tokens (GPT-4o) ≈ 100 pages text. Claude 3.5 Sonnet = 200K tokens ≈ ek poori novel! Lekin zyada context = zyada cost kyunki KV cache badi hoti hai. Context efficient use karo — space = money."
          whenToUse={[
            'Long documents process karne se pehle — fits in context?',
            'API costs estimate karne ke liye — context size × cost per token',
            'Conversation history manage karne ke liye — sliding window',
            'RAG vs long context — tradeoffs evaluate karo',
          ]}
          whyUseIt="Context window management = production AI apps mein ek real engineering challenge hai. System prompt + conversation history + user documents — sab ek limited space mein compete karte hain. Long conversation? History trim karna padega. Long document? Chunk karna padega ya RAG use karna padega. Ye sirf theory nahi — ek chatbot banate waqt tujhe ye decisions lene hi padenge."
          howToUse={{
            filename: 'context-management.ts',
            language: 'typescript',
            code: `// Context Window Management

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4) // Rough estimate
}

function estimateMessagesTokens(messages: Message[]): number {
  return messages.reduce((sum, msg) => {
    return sum + estimateTokens(msg.content) + 4 // Overhead per message
  }, 0)
}

const MAX_CONTEXT_TOKENS = 100_000 // Safety buffer below actual limit
const SYSTEM_PROMPT = "You are a helpful coding assistant..."

// ── Strategy 1: Sliding Window ────────────────────────────────────────────
function slidingWindowMessages(
  history: Message[],
  systemPrompt: string,
): Message[] {
  const systemTokens = estimateTokens(systemPrompt)
  const available = MAX_CONTEXT_TOKENS - systemTokens - 2000 // Buffer for response

  // Most recent messages prefer karo
  const selected: Message[] = []
  let usedTokens = 0

  // Reverse iterate — recent first
  for (let i = history.length - 1; i >= 0; i--) {
    const msgTokens = estimateTokens(history[i].content)
    if (usedTokens + msgTokens > available) break
    selected.unshift(history[i])
    usedTokens += msgTokens
  }

  return [{ role: 'system', content: systemPrompt }, ...selected]
}

// ── Strategy 2: Conversation Summarization ────────────────────────────────
async function summarizeOldMessages(
  oldMessages: Message[],
  openai: OpenAI,
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Cheap model for summarization
    messages: [
      {
        role: 'user',
        content: \`Summarize this conversation briefly:\n\${
          oldMessages.map(m => \`\${m.role}: \${m.content}\`).join('\\n')
        }\`,
      },
    ],
    max_tokens: 500,
  })
  return response.choices[0].message.content ?? ''
}`,
            explanation: 'Sliding window simplest hai — recent messages prefer karo. Summarization context preserve karta hai lekin extra API call karna padta hai. RAG se context window efficiently use karo — sirf relevant documents inject karo.',
          }}
          realWorldScenario="Customer service chatbot 8 ghante ka session handle karta hai — 200+ messages possible! GPT-4o 128K limit hit hoti, error aata. Solution: har 50 messages par pichle 40 ko summarize karo (cheap Haiku model se), recent 10 keep karo. Summary + recent = effective context without hitting limits. Ye sliding window + summarization approach real production mein use hoti hai. Context = engineering problem."
          commonMistakes={[
            {
              mistake: 'Context window = model ki memory samajhna',
              why: 'Context window sirf current session hai — session end, sab bhool. Persistent memory ke liye external DB chahiye.',
              fix: 'Long-term memory ke liye: conversation summaries DB mein store karo, vector embeddings se relevant past conversations retrieve karo.',
            },
            {
              mistake: '128K context available hai toh har cheez daal do — cost ignore karna',
              why: 'Long context = proportionally higher cost. 128K token request = 32x more expensive than 4K.',
              fix: 'Context efficiently use karo. RAG se only relevant chunks inject karo. Unnecessary repetition avoid karo. Summarization use karo older content ke liye.',
            },
          ]}
          proTip="Research finding: 'Lost in the Middle' — LLMs context ke beginning aur end ko better attend karte hain, middle information miss hoti hai! Practical impact: RAG mein most relevant chunk ko beginning ya end par rakho — middle mein mat daalo. Long context mein critical information = sandwich karo (beginning + end). Ye subtle lekin measurable quality improvement deta hai."
        />
      </div>

      {/* ConceptCard 5: Sampling */}
      <div id="sampling">
        <ConceptCard
          title="Temperature, Top-k, Top-p — Sampling Strategies"
          emoji="🎲"
          difficulty="intermediate"
          whatIsIt="LLM next token ke liye probability distribution output karta hai — 'mat' 40%, 'floor' 25%, 'couch' 20%, 'roof' 10%... Temperature ye distribution control karta hai. Temperature 0 = robot: hamesha highest probability token chuno, deterministic, same input same output hamesha. Temperature 2 = drunk robot: distribution flatten ho jaati hai, low probability tokens bhi choose ho sakte hain — creative lekin unpredictable. Top-p (nucleus sampling): cumulative 90% probability tak tokens consider karo — adaptive cutoff. Task ke hisaab se tune karo."
          whenToUse={[
            'Code generation — temperature 0 ya 0.1 (deterministic)',
            'Creative writing — temperature 0.7-1.0 (creative)',
            'Factual Q&A — temperature 0-0.3 (accurate)',
            'Brainstorming — temperature 0.8-1.2 (diverse ideas)',
          ]}
          whyUseIt="Ye practical skill hai — production mein temperature wrong set karna = bad user experience. Code generation: temperature 0 (ek deterministic sahi answer chahiye). Creative writing: 0.7-0.9 (variety chahiye). Factual Q&A: 0.2-0.3 (accurate, slight flexibility). Brainstorming: 0.8-1.0 (diverse ideas). Same model + different temperature = completely different persona. Ek dial se sab control. Lekin: temperature aur top_p ek saath mat change karo — dono randomness control karte hain, unexpected interactions hoti hain."
          howToUse={{
            filename: 'sampling-strategies.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai'

const openai = new OpenAI()

// ── Temperature Examples ────────────────────────────────────────────────────

// Code generation — deterministic chahiye
async function generateCode(prompt: string) {
  return openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0,       // Most deterministic
    max_tokens: 1000,
  })
}

// Creative writing — variety chahiye
async function generateCreativeStory(prompt: string) {
  return openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.9,     // More creative/random
    top_p: 0.95,          // Top 95% probability mass
    max_tokens: 2000,
  })
}

// Factual Q&A — accurate chahiye
async function answerFactualQuestion(question: string) {
  return openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: question }],
    temperature: 0.2,     // Mostly deterministic lekin slightly flexible
    max_tokens: 500,
  })
}

// ── Understanding Sampling ────────────────────────────────────────────────
// Vocabulary probabilities (simplified example):
// "The dog sat on the ___"
// "mat"   → 40%
// "floor" → 25%
// "couch" → 20%
// "roof"  → 10%
// other   → 5%

// Temperature = 0: Always "mat" (greedy)
// Temperature = 0.5: "mat" mostly, sometimes "floor"
// Temperature = 1.0: Original distribution
// Temperature = 2.0: More uniform — "roof" bhi possible!

// Top-k = 2: Sirf top 2 tokens consider karo ("mat", "floor")
// Top-p = 0.7: 70% cumulative probability tak tokens consider karo`,
            explanation: 'Temperature logits ko scale karta hai softmax se pehle. Low temperature: confident peak, high temperature: flat distribution. Top-p (nucleus sampling) adaptive hai — agar model confident hai, vocabulary smaller hoti hai. OpenAI: either temperature OR top_p change, not both.',
          }}
          realWorldScenario="Ek app mein different features ke liye different temperatures: Code autocomplete = temperature 0 (deterministic, reproducible). Customer support chatbot = temperature 0.7 (warm, slightly varied tone). Poetry generator = temperature 1.2 (creative, unexpected rhymes). Marketing tagline generator = temperature 0.9 (multiple varied options). Same Claude model, same API — sirf ek parameter change. Ye power samajh le."
          commonMistakes={[
            {
              mistake: 'Temperature aur top_p dono adjust karna ek saath',
              why: 'Dono randomness control karte hain — ek saath change karne se unpredictable interaction hoti hai.',
              fix: 'OpenAI recommendation: ek hi change karo. Temperature adjust karo primarily. Top_p sirf agar temperature tuning kaafi na ho.',
            },
            {
              mistake: 'High temperature se better creativity samajhna',
              why: 'Too high temperature = random gibberish. Creativity aur randomness same nahi hain.',
              fix: '0.7-0.9 range se shuru karo creative tasks ke liye. 1.0+ sirf agar 0.9 kaafi creative nahi laga. Test karo multiple times — quality check karo.',
            },
          ]}
          proTip="Production reliability tips: OpenAI mein seed parameter se same temperature ke saath reproducible outputs — testing aur debugging ke liye gold. System prompt + low temperature + few-shot examples = most reliable outputs. Ye triple combination hallucinations significantly reduce karta hai. Yaad rakh: Temperature 0 = robot (reliable). Temperature 2 = drunk robot (creative lekin unreliable). Apna use case dekho, choose karo."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 5 Quiz — LLM Internals Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — tokenization, RLHF, context, sampling test karo!
          </p>
        </div>
        <QuizSection questions={llmQuiz} chapterSlug="llm-how-they-work" />
      </div>
    </div>
  )
}
