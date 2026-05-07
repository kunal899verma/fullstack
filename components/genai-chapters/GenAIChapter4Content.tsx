'use client'

import React, { useState } from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function TransformerDiagram() {
  const items = [
    { label: 'Input Tokens', sublabel: '"The cat sat" → split into token pieces', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '🔤' },
    { label: 'Embeddings + Positional Encoding', sublabel: 'Tokens → dense vectors + position info', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '📍' },
    { label: 'Multi-Head Attention', sublabel: 'Query × Key → scores → weighted Values — "which words relate?"', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', icon: '👁️' },
    { label: 'Feed Forward Network', sublabel: 'Per-token transformation — adds capacity', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '⚡' },
    { label: 'Output Probabilities', sublabel: 'Softmax over vocabulary — next token prediction', color: '#7C3AED', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.4)', icon: '📤' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Transformer Architecture — Key Components</p>
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

// ── Attention Visualization Demo ──────────────────────────────────────────────

function AttentionDemo() {
  const tokens = ['The', 'cat', 'sat', 'on', 'mat']
  const [selectedToken, setSelectedToken] = useState(1) // "cat" selected

  // Simulated attention weights for "cat"
  const attentionWeights: Record<number, number[]> = {
    0: [0.4, 0.15, 0.1, 0.2, 0.15],  // "The" attention
    1: [0.2, 0.5, 0.1, 0.05, 0.15],   // "cat" attention — high self + "The"
    2: [0.1, 0.4, 0.3, 0.1, 0.1],     // "sat" attends to "cat" heavily
    3: [0.2, 0.1, 0.1, 0.4, 0.2],     // "on" attention
    4: [0.1, 0.15, 0.15, 0.2, 0.4],   // "mat" attention
  }

  const weights = attentionWeights[selectedToken]

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#71717A]">
        Ek token select karo — dekho wo kaunse tokens par &ldquo;attend&rdquo; karta hai
      </p>

      <div className="flex gap-2 flex-wrap">
        {tokens.map((token, i) => (
          <button
            key={i}
            onClick={() => setSelectedToken(i)}
            className="px-3 py-1.5 rounded-lg text-sm font-mono transition-all"
            style={{
              background: selectedToken === i
                ? 'rgba(124,58,237,0.3)'
                : 'rgba(255,255,255,0.05)',
              border: selectedToken === i
                ? '1px solid rgba(124,58,237,0.6)'
                : '1px solid rgba(255,255,255,0.1)',
              color: selectedToken === i ? '#9D5FF0' : '#A1A1AA',
            }}
          >
            {token}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-[#71717A]">
          &ldquo;<span className="text-[#9D5FF0]">{tokens[selectedToken]}</span>&rdquo; in konpe tokens par dhyan deta hai:
        </p>
        {tokens.map((token, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#A1A1AA] w-12">{token}</span>
            <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${weights[i] * 100}%`,
                  background: `rgba(124,58,237,${0.3 + weights[i] * 0.7})`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-[#9D5FF0] w-12 text-right">
              {(weights[i] * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#71717A] mt-2">
        Q (Query) = &ldquo;{tokens[selectedToken]}&rdquo; kya dhundh raha hai | K (Keys) = tokens | V (Values) = attended information
      </p>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const transformerQuiz = [
  {
    question: 'Attention mechanism mein Query, Key, Value ka kya matlab hai?',
    options: [
      { text: 'Database concepts — SQL queries jaisi cheez', correct: false, explanation: 'Database analogy helpful nahi hai — attention mechanism fundamentally alag hai.' },
      { text: 'Q = kya dhundh raha hai, K = kya match karta hai, V = actual information retrieved', correct: true, explanation: 'Bilkul sahi! Email inbox analogy: Q = topic dhundh raha hai, K = email subjects, V = email content. Match hone par V retrieve hota hai.' },
      { text: 'Q = input, K = output, V = hidden state', correct: false, explanation: 'Ye RNN terminology hai — attention mechanism alag concepts use karta hai.' },
      { text: 'Q = question, K = keyword, V = vocabulary', correct: false, explanation: 'Names se confuse mat ho — technical definitions yaad karo.' },
    ],
  },
  {
    question: 'Positional encoding kyun chahiye transformers mein?',
    options: [
      { text: 'Speed ke liye — sequential processing faster hoti hai', correct: false, explanation: 'Transformers parallel process karte hain — speed is issue ka reason nahi.' },
      { text: 'Self-attention ko word order ki information nahi hoti — position explicitly inject karni padti hai', correct: true, explanation: 'Sahi! Self-attention position-agnostic hai — "cat sat" aur "sat cat" same hota bina positional encoding ke. Position information separately add karni padti hai.' },
      { text: 'Memory save karne ke liye', correct: false, explanation: 'Positional encoding memory efficiency ke liye nahi hai.' },
      { text: 'Vocabulary size limit karne ke liye', correct: false, explanation: 'Vocabulary aur positional encoding alag concepts hain.' },
    ],
  },
  {
    question: 'BERT aur GPT mein fundamental architecture difference kya hai?',
    options: [
      { text: 'BERT zyada layers use karta hai', correct: false, explanation: 'Layer count implementation choice hai — architectural difference fundamental hai.' },
      { text: 'BERT encoder-only (bidirectional), GPT decoder-only (causal/autoregressive)', correct: true, explanation: 'Correct! BERT pura context dekh sakta hai (bidirectional). GPT sirf left context dekh sakta hai — next token predict karna natural fit hai.' },
      { text: 'GPT supervised learning use karta hai, BERT unsupervised', correct: false, explanation: 'Dono self-supervised pre-training use karte hain — methods alag hain (masked LM vs next token prediction).' },
      { text: 'BERT sirf English ke liye hai', correct: false, explanation: 'mBERT, XLM-RoBERTa — multilingual BERT models hain.' },
    ],
  },
  {
    question: 'Multi-head attention single-head se kyun better hai?',
    options: [
      { text: 'Speed ke liye — parallel computation', correct: false, explanation: 'Parallelism benefit hai lekin primary reason diversity hai.' },
      { text: 'Alag heads alag types ke relationships dhundh sakte hain — syntax, semantics, coreference', correct: true, explanation: 'Bilkul sahi! Head 1: subject-verb agreement, Head 2: coreference (pronoun → noun), Head 3: positional patterns. Diverse attention.' },
      { text: 'Zyada parameters = hamesha better', correct: false, explanation: 'Parameters increase hota hai, lekin benefit diversity aur specialization se hai.' },
      { text: 'Single head overfitting karta hai', correct: false, explanation: 'Multi-head primarily expressiveness ke liye hai — overfitting primary motivation nahi.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter4Content() {
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
          Transformer Architecture — 8 Google Researchers Ne Duniya Badal Di!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Shocking fact: 2017 mein Google ke 8 researchers ne ek 15-page paper publish kiya — "Attention Is All You Need". Us paper ka ek core idea tha: Attention mechanism. Sirf ek idea. Aur us ek idea ne ChatGPT, Claude, Gemini, GitHub Copilot — sab possible bana diya. Ye GenAI course ka sabse important chapter hai. Samjho isko, aur baaki sab automatically clearer ho jaayega.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Attention mechanism, multi-head attention, positional encoding, BERT vs GPT — aaj ye sab demystify karte hain.
        </p>
      </div>

      <TransformerDiagram />

      {/* ConceptCard 1: RNN Problems */}
      <div id="rnn-problems">
        <ConceptCard
          title="RNN Ki Problem — Kyun Transformers Chahiye?"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Pehle baat karte hain RNNs ki — kyunki Transformers ko samajhne ke liye, pehle ye samajhna zaroori hai ki RNNs kyun fail hue. RNN sequential tha: ek token process karo, phir dusra, phir teesra. Paragraph 100 words ka hai toh 1st word ki information 100 steps travel karni padti thi — signal bahut weak ho jaata tha (vanishing gradients). Aur sequential processing ka matlab tha GPU efficiently use nahi ho sakta tha — slow training. Transformers ne solve kiya: har token directly har dusre token se attend karta hai — O(1) distance. Parallel processing possible — GPUs khush!"
          whenToUse={[
            'RNN limitations samajhne ke liye — historical context',
            'Transformer advantages justify karne ke liye',
            'Sequence modeling decisions — kab RNN, kab Transformer',
            'Time series mein architectural choices',
          ]}
          whyUseIt="Ye history isliye samajhna zaroori hai kyunki Transformer ki design choices clearly justify hoti hain RNN ki failures ke context mein. Attention mechanism = har token, har dusre token se directly communicate kare — koi information bottleneck nahi. Parallel training = GPUs sab tokens simultaneously process kar sakti hain — weeks ki training, days mein possible. Scale karna easy — ye sab RNN se possible nahi tha."
          howToUse={{
            filename: 'rnn-vs-transformer.md',
            language: 'markdown',
            code: `# RNN vs Transformer — Comparison

## RNN (LSTM, GRU)
- Sequential: token 1 → token 2 → token 3 → ...
- Context: hidden state mein carry hota hai
- Problem: Long sequences mein information loss
- Training: Sequential — GPU efficiently use nahi hota
- Use today: Still good for: streaming, very long sequences, edge devices

## Transformer
- Parallel: sab tokens simultaneously process
- Context: Direct attention — har token, har dusre se
- Long range: "The bank [near the river] was [flooded]" — direct connection
- Training: Highly parallelizable — GPUs thrive
- Use today: Language models, vision, audio, multimodal

## Vanishing Gradient Problem (RNN)
[Start] → [T2] → [T3] → ... → [T100] → [End]
  |         |                    |           |
 Long gradient path → signal disappears

## Transformer Solution
         [T1] [T2] [T3] ... [T100]
           |   |   |          |
           +---+---+---...----+
               All attend to all
               Distance = 1 (constant!)`,
            explanation: 'LSTM ne vanishing gradient partially fix kiya — gating mechanism se. Lekin sequential processing bottleneck raha. Transformers ne parallelism enable kiya — ye hi GPU revolution ke saath AI boom ka cause bana.',
          }}
          realWorldScenario="Timeline: Google Translate 2016 mein RNN use karta tha — translations OK the, kuch galat. 2017 mein Transformer paper aaya. 2018 mein BERT: NLP benchmarks dramatically better. 2019 mein GPT-2: coherent paragraphs. 2022 mein ChatGPT: 100M users 2 mahine mein. Ye poora jump ek architectural switch — RNN se Transformer — se aaya. Same data, better architecture = revolutionary results."
          commonMistakes={[
            {
              mistake: 'RNNs completely dead samajhna — ye galat hai',
              why: 'Certain scenarios mein RNNs still useful — streaming inference (token by token), very long sequences, resource-constrained devices.',
              fix: 'Context samjho: LLMs = Transformers. Real-time streaming, edge devices = RNN ya hybrid still relevant. State Space Models (Mamba) latest alternative hain.',
            },
            {
              mistake: 'Attention = RNN ka replacement sirf speed ke liye',
              why: 'Attention fundamentally different information sharing mechanism hai — speed benefit side effect hai.',
              fix: 'Attention long-range dependencies capture karna zyada effectively karta hai — ye primary advantage hai, speed secondary.',
            },
          ]}
          proTip="2024-25 update: RNNs completely dead nahi hain. State Space Models (SSM) — Mamba, S4 — new wave hain. RNN ki efficiency (linear compute) ke saath Transformer quality. Hybrid architectures emerge ho rahe hain. AI field bahut fast move karta hai — today's best might not be tomorrow's. Isliye fundamentals samajhna important hai — architectures change honge, core concepts nahi."
        />
      </div>

      {/* ConceptCard 2: Attention Mechanism */}
      <div id="attention">
        <ConceptCard
          title="Attention Mechanism — Email Inbox Analogy"
          emoji="👁️"
          difficulty="intermediate"
          whatIsIt="Attention mechanism ko samajhne ke liye ek analogy: email inbox. Tu dhundh raha hai 'meeting' ke baare mein (Query). Inbox mein har email ka subject line hai (Keys). Jab 'meeting' match karta hai subject se, tu wo email padhta hai (Value). Attention exactly ye karta hai — Query ko Keys se compare karo, similarity scores nikalo (softmax se probabilities), phir relevant Values ka weighted sum lo. 'Soft' lookup isliye kehte hain kyunki sab Values contribute karti hain — sirf ek nahi, proportional to similarity. Differentiable aur learnable — training mein automatically improve hota hai."
          whenToUse={[
            'Long-range dependencies capture karna — sentence ke pehle aur aakhiri word ka connection',
            'Context-dependent word meanings — bank (river vs financial)',
            'Cross-attention — encoder output se attend karna decoder mein',
            'Vision Transformers — image patches pe attention',
          ]}
          whyUseIt="Attention kyun revolutionary hai? Ek formula — aur sab languages, modalities, tasks. Text, images, audio, video — sab mein attention kaam karta hai. Context-dependent meanings handle karta hai naturally: 'bank' ka matlab river bank ya financial bank — surrounding context se attention automatically resolve karta hai. RNN mein ye 100 steps ka sfar tha, attention mein direct connection. Ye hi LLMs ko coherent paragraphs generate karne deta hai."
          howToUse={{
            filename: 'attention.ts',
            language: 'typescript',
            code: `// Scaled Dot-Product Attention
// Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V

function scaledDotProductAttention(
  Q: number[][], // Query matrix [seq_len, d_k]
  K: number[][], // Key matrix   [seq_len, d_k]
  V: number[][], // Value matrix [seq_len, d_v]
): number[][] {
  const dk = K[0].length // Key dimension

  // Step 1: Q * K^T — similarity scores
  const scores = matMul(Q, transpose(K)) // [seq_len, seq_len]

  // Step 2: Scale karo — large dk se gradients stable rahein
  const scaled = scores.map(row => row.map(s => s / Math.sqrt(dk)))

  // Step 3: Softmax — probabilities mein convert karo (row-wise)
  const attnWeights = scaled.map(row => softmax(row)) // [seq_len, seq_len]

  // Step 4: Weighted sum of Values
  return matMul(attnWeights, V) // [seq_len, d_v]
}

// Email inbox analogy in code:
// Query = "meeting ke baare mein kya hai?"
// Keys  = email subjects: ["Project update", "Meeting tomorrow", "Lunch plans"]
// Values = email bodies (full content)
// Scores = ["Project update" match 0.1, "Meeting tomorrow" 0.8, "Lunch" 0.1]
// Output = 80% "Meeting tomorrow" email + 10% others = relevant context

// Causal/Masked Attention (GPT mein) — future tokens nahi dekhte
function maskedAttention(Q: number[][], K: number[][], V: number[][]) {
  const scores = matMul(Q, transpose(K))
  const n = scores.length

  // Future positions mask karo with -Infinity
  const masked = scores.map((row, i) =>
    row.map((score, j) => j > i ? -Infinity : score)
  )

  const attnWeights = masked.map(row => softmax(row))
  return matMul(attnWeights, V)
}`,
            explanation: 'Under the hood: sqrt(dk) se scale karna zaroori hai — bina iske large dk se dot products bahut large hote hain, softmax extreme (near 0 ya 1) ho jaati hai, gradients disappear. Real implementations GPU par matrix multiplication efficiently karte hain. Flash Attention (2022) memory-efficient implementation hai — 2-4x faster, longer sequences possible. Same math, better implementation.',
          }}
          realWorldScenario="Classic example: 'The animal didn't cross the street because it was too tired.' 'it' kya refer karta hai? Human: obviously 'animal'. RNN: uncertain — too many steps. Attention: 'it' → 'animal' strong connection (semantically similar context), 'street' weak — correct! Coreference resolution automatically hoti hai. Ye type of long-range dependency samajhna hi LLMs ko coherent aur meaningful banata hai."
          commonMistakes={[
            {
              mistake: 'Attention = alignment sirf, not information aggregation',
              why: 'Attention sirf weights nahi — weights se Values ka weighted sum nikalta hai. Values actual information carry karte hain.',
              fix: 'Attention = two-step: (1) relevance scores compute karo, (2) relevant information aggregate karo. Dono steps zaroori hain.',
            },
            {
              mistake: 'Ye sochna ki attention human attention jaisi hai',
              why: 'Ye mathematical operation hai — human cognitive attention se loosely inspired lekin fundamentally different mechanism hai.',
              fix: 'Interpretability research show karta hai attention heads different patterns learn karte hain — kuch interpretable, kuch nahi.',
            },
          ]}
          proTip="Flash Attention (2022, 2023) — ek implementation trick ne LLMs ki training 2-4x faster kar di aur 100K+ token contexts possible banaaye. Standford ka Tri Dao ne likha, sab ne adopt kiya. Concept same hai — I/O aware algorithm sirf memory bandwidth better use karta hai. Ye lesson yaad rakh: core math samjho, implementation optimize hoti rehti hai."
          demo={<AttentionDemo />}
        />
      </div>

      {/* ConceptCard 3: Multi-Head Attention */}
      <div id="multi-head">
        <ConceptCard
          title="Multi-Head Attention"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="Ek attention head ek perspective se dekhta hai. Multi-head attention = h parallel attention heads — sab ek saath alag alag perspectives se dekhte hain. Har head alag projection space mein operate karta hai — different aspects of context. Outputs concatenate hokar final answer milta hai. Head 1: subject-verb agreement. Head 2: coreference (pronoun → noun). Head 3: positional patterns. Head 4: semantic similarity. Ye diversity = rich representations. Aur computational cost? Same as single head — elegant design!"
          whenToUse={[
            'Standard practice hai — always use multi-head over single-head',
            'Head count adjust karo — d_model ke multiple mein rahna chahiye',
            'Interpretability analysis — kaunsa head kya learn karta hai',
            'Pruning — unimportant heads remove karo efficiency ke liye',
          ]}
          whyUseIt="Sochna: agar ek head hi achha tha toh multiple kyun? Kyunki language complex hai — ek sentence mein grammar, semantics, pragmatics, coreference — sab ek saath hain. Ek perspective se ye sab capture nahi hota. Multi-head diversity deta hai — alag heads alag cheezein specialize mein learn karte hain, automatically. GPT-4 reportedly 96 heads hai. Ye explicitly design nahi kiya — training mein emerge kiya."
          howToUse={{
            filename: 'multi-head-attention.ts',
            language: 'typescript',
            code: `// Multi-Head Attention
// MultiHead(Q,K,V) = Concat(head_1,...,head_h) * W_O
// where head_i = Attention(Q*W_Qi, K*W_Ki, V*W_Vi)

interface MultiHeadAttention {
  numHeads: number      // h = 8 or 12 or 16
  modelDim: number      // d_model = 512 or 768 or 1024
  headDim: number       // d_k = d_model / h
}

function multiHeadAttention(
  Q: number[][], K: number[][], V: number[][],
  config: MultiHeadAttention,
  weights: {
    Wq: number[][][], Wk: number[][][], Wv: number[][]
    Wo: number[][]
  }
): number[][] {
  const { numHeads, headDim } = config

  // Each head: project Q, K, V to head_dim
  const headOutputs: number[][][] = []

  for (let h = 0; h < numHeads; h++) {
    // Project to lower dimension
    const Qh = matMul(Q, weights.Wq[h]) // [seq, d_model] → [seq, head_dim]
    const Kh = matMul(K, weights.Wk[h])
    const Vh = matMul(V, weights.Wv[h])

    // Attention for this head
    const headOut = scaledDotProductAttention(Qh, Kh, Vh)
    headOutputs.push(headOut)
  }

  // Concatenate all heads: [seq, h * head_dim] = [seq, d_model]
  const concatenated = concatAlongLastDim(headOutputs)

  // Final projection
  return matMul(concatenated, weights.Wo)
}

// Example configuration (BERT-base):
const bertBaseConfig: MultiHeadAttention = {
  numHeads: 12,           // 12 heads
  modelDim: 768,          // d_model = 768
  headDim: 64,            // 768 / 12 = 64 per head
}`,
            explanation: 'Under the hood: h heads mein d_model split hota hai — total computation single head ke barabar hi rehti hai! ye elegant design hai. GPT-3: 96 attention heads, d_model=12288, har head = 128 dimensions. Ye heads alag alag patterns learn karte hain — explicitly programmed nahi, training se emerge kiya.',
          }}
          realWorldScenario="Fascinating research: Clark et al. (2019) ne BERT ke attention heads analyze kiye. Result? Head 1 coreference links dhundta tha (pronouns → entities automatically). Head 3 syntactic dependencies follow karta tha. Head 8 BOS/EOS tokens par focus karta tha. Koi bhi ye explicitly program nahi kiya — training mein emerge kiya. Model ne khud ye structure discover kiya. Ye 'emergence' AI mein bahut exciting phenomenon hai."
          commonMistakes={[
            {
              mistake: 'Heads independent functions assign karna manually',
              why: 'Heads apne aap specialization learn karte hain — forced specialization often worse performance deta hai.',
              fix: 'Heads freely learn karne do — regularization ya auxiliary losses use karo agar specific behavior encourage karna ho.',
            },
            {
              mistake: 'numHeads ko arbitrary choose karna',
              why: 'd_model / numHeads integer hona chahiye — otherwise head_dim fractional ho jaata hai aur implementation fail karta hai.',
              fix: 'Standard configs follow karo: d_model=512, heads=8 (head_dim=64). d_model=768, heads=12 (head_dim=64).',
            },
          ]}
          proTip="Fun research fact: 'Are Sixteen Heads Really Better than One?' (Michel et al., 2019) — BERT se 20-40% heads prune kiye bina significant quality loss ke. Smaller, faster model. Matlab: not all heads equally important. Attention head pruning inference optimization ke liye useful technique hai — production deployment mein lagta hai."
        />
      </div>

      {/* ConceptCard 4: Positional Encoding */}
      <div id="positional-encoding">
        <ConceptCard
          title="Positional Encoding — Order Matters"
          emoji="📍"
          difficulty="intermediate"
          whatIsIt="Ajeeb problem: self-attention position-agnostic hai — bina extra information ke 'Dog bites man' aur 'Man bites dog' same lag sakte hain model ko. Word order hai hi nahi attention mein naturally. Fix? Positional encoding: har token ke embedding mein position ki information add karo explicitly. Original paper: sinusoidal functions (sin/cos) different frequencies par. Modern models: learned embeddings ya RoPE (Rotary Position Embedding). Simple idea, critical importance."
          whenToUse={[
            'Har transformer mein — mandatory hai',
            'Long sequences ke liye — RoPE, ALiBi better scale karte hain',
            'Variable length inputs ke liye — learned positions fixed seq len hain',
            'Relative positions important hon — relative positional encoding',
          ]}
          whyUseIt="Position kyun matter karta hai? Kyunki 'I love you' aur 'You love I' bilkul different meanings hain — word order = grammar. Bina positional encoding ke model ye fark nahi samjhega. Sinusoidal encoding clever hai — different frequencies se positions uniquely identify hoti hain, aur model relative positions compute kar sakta hai (mathematical property). Learned embeddings often better — directly training mein optimize hote hain. RoPE (LLaMA, Mistral) aur ALiBi modern sota hain."
          howToUse={{
            filename: 'positional-encoding.ts',
            language: 'typescript',
            code: `// Sinusoidal Positional Encoding (original "Attention is All You Need")
// PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
// PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

function sinusoidalPositionalEncoding(
  maxSeqLen: number,
  dModel: number,
): number[][] {
  const pe: number[][] = Array(maxSeqLen)
    .fill(null)
    .map(() => Array(dModel).fill(0))

  for (let pos = 0; pos < maxSeqLen; pos++) {
    for (let i = 0; i < dModel; i += 2) {
      const div = Math.pow(10000, (2 * i) / dModel)

      pe[pos][i] = Math.sin(pos / div)         // Even dimensions: sin
      if (i + 1 < dModel) {
        pe[pos][i + 1] = Math.cos(pos / div)   // Odd dimensions: cos
      }
    }
  }

  return pe
}

// Usage: token embeddings + positional encoding add karo
function addPositionalEncoding(
  tokenEmbeddings: number[][], // [seq_len, d_model]
  pe: number[][],              // [max_seq_len, d_model]
): number[][] {
  return tokenEmbeddings.map((embedding, pos) =>
    embedding.map((val, dim) => val + pe[pos][dim])
  )
}

// RoPE (Rotary Positional Embedding) — modern approach (LLaMA, GPT-NeoX)
// Relative positions directly in attention computation
// Better extrapolation to unseen sequence lengths
// Implementation: rotate Q and K vectors by position angle`,
            explanation: 'Sinusoidal encoding clever hai — different frequencies se positions uniquely identify hote hain. Model relative positions compute kar sakta hai (geometric property). Modern models mostly learned embeddings ya RoPE prefer karte hain.',
          }}
          realWorldScenario="GPT-2 extrapolation problem: 1024 token context par train kiya, 2048 tokens input diye toh — positional encoding out of range, performance dramatically drop. Users frustrated. Fix: RoPE (LLaMA use karta hai) aur ALiBi — better length generalization, 100K+ tokens possible. Sawaal: Claude 200K context kaise possible hai? RoPE + Flash Attention + architectural improvements. Ek engineering breakthrough pe khade hain hum."
          commonMistakes={[
            {
              mistake: 'Positional encoding skip karna small models mein',
              why: 'Bina positional encoding ke, "I love you" aur "You love I" same hain model ke liye — semantic error.',
              fix: 'Positional encoding hamesha add karo — sinusoidal even zero-code hai aur well-established. Hugging Face implementations correct hain.',
            },
            {
              mistake: 'Position embedding max_len sirf training seq len set karna',
              why: 'Inference mein longer sequences aane par positional embedding out of range hoti hai.',
              fix: 'max_len zyada set karo: 2x expected max sequence length. Ya learned positions ki jagah RoPE ya ALiBi use karo — better extrapolation.',
            },
          ]}
          proTip="2024 state-of-the-art: RoPE (Rotary Position Embedding) — LLaMA, Mistral, Qwen, Falcon sab use karte hain. Relative positions naturally handle hote hain, aur longer contexts pe better extrapolate karta hai. ALiBi alternative hai — no explicit positional encoding, sirf attention scores mein linear bias. Fine-tuning karte waqt ye choices matter karti hain — use ahi model ka config check karo."
        />
      </div>

      {/* ConceptCard 5: Encoder vs Decoder */}
      <div id="encoder-decoder">
        <ConceptCard
          title="Encoder vs Decoder — BERT vs GPT"
          emoji="🔀"
          difficulty="intermediate"
          whatIsIt="Transformer mein do types ke architectures hain — aur ye samajhna practical hai. Encoder-only (BERT): puri sentence ek saath dekhta hai — bidirectional, context se word meaning samajhne ke liye best. Decoder-only (GPT, Claude): sirf left context dekhta hai — next token predict karne ke liye natural fit, text generation ke liye. Encoder-Decoder (T5, BART): input process karo (encoder), output generate karo (decoder) — translation, summarization ke liye. 2024 trend: decoder-only dominate karta hai — GPT-4, Claude, LLaMA sab decoder-only hain."
          whenToUse={[
            'Classification, NER, sentence similarity — BERT (encoder)',
            'Text generation, completion, chat — GPT (decoder)',
            'Translation, summarization — T5/BART (encoder-decoder)',
            'Most LLMs today — decoder-only (GPT, Claude, LLaMA)',
          ]}
          whyUseIt="Ye practical decision hai — teri use case ke liye kaunsa architecture? Text generation, chatbot, code assistant = decoder-only (API call karo OpenAI/Anthropic). Sentence embeddings, text classification = encoder-only (BERT, sentence-transformers). Translation, summarization = encoder-decoder (T5). Ek developer ke roop mein tujhe ye choose karna padega — ChatGPT ya BERT kab use karein? Is understanding se informed decision lega."
          howToUse={{
            filename: 'encoder-vs-decoder.md',
            language: 'markdown',
            code: `# Encoder vs Decoder — Architecture Comparison

## Encoder-Only (BERT, RoBERTa, DeBERTa)
Attention: Bidirectional — har token, har doosre token dekh sakta hai
Training: Masked Language Modeling (MLM)
  - Input: "The [MASK] sat on the mat"
  - Target: Predict "cat"
Best for:
  - Text classification (sentiment, topic)
  - Named Entity Recognition (NER)
  - Question Answering (extractive)
  - Sentence embeddings
NOT for: Text generation

## Decoder-Only (GPT, Claude, LLaMA, Mistral)
Attention: Causal — sirf left context (past tokens)
Training: Next Token Prediction (autoregressive)
  - Input: "The cat sat"
  - Target: Predict "on"
Best for:
  - Text generation
  - Instruction following
  - Code generation
  - Chat / conversation

## Encoder-Decoder (T5, BART, mT5)
Encoder: Process input (bidirectional)
Decoder: Generate output (causal, cross-attends to encoder)
Training: Span corruption / denoising
Best for:
  - Machine Translation
  - Summarization
  - Conditional generation (input → output)

## Current Trend (2024-2025)
Decoder-only dominates:
- GPT-4, Claude 3, LLaMA 3, Gemini — all decoder-only
- Reason: Simpler, scales better, versatile
- Instruction tuning + RLHF se classification bhi karo`,
            explanation: 'BERT 2018 mein revolution tha — fine-tuning se NLP benchmarks dominate kiye. GPT-3 2020 mein few-shot learning. GPT-4, Claude — decoder-only at scale ne BERT se better performance achieve ki even classification mein fine-tuning se.',
          }}
          realWorldScenario="Architecture wars ka timeline: 2018-2020 — BERT ne every NLP benchmark dominate kiya, encoder-only king tha. 2020 — GPT-3 ne dikhaaya decoder-only few-shot se classification bhi kar sakta hai. 2022 — ChatGPT, Claude — decoder-only + instruction tuning ne BERT obsolete kar diya most tasks ke liye. Winner: decoder-only. Lesson: architecture + scale + alignment = winning combination."
          commonMistakes={[
            {
              mistake: 'BERT se text generate karna',
              why: 'BERT encoder hai — future tokens nahi dekh sakta, text generation ke liye design nahi hua.',
              fix: 'Text generation ke liye GPT, LLaMA, Claude, Mistral use karo. BERT se embeddings/classification karo.',
            },
            {
              mistake: 'GPT ko classification ke liye fine-tune mat karna — "sirf generation ke liye"',
              why: 'Ye misconception hai — GPT style models classification bhi kar sakte hain. Instruction tuning se versatile ho jaate hain.',
              fix: 'Modern LLMs instruction-following se classification, summarization, extraction — sab karte hain. Few-shot ya fine-tuning se.',
            },
          ]}
          proTip="Practical guide: Text generation/chat = GPT/Claude/LLaMA (decoder-only API). Semantic embeddings = sentence-transformers (BERT-based, Hugging Face par free). RAG pattern = BERT embeddings se retrieve + GPT se generate — hybrid best of both worlds. Each architecture ka optimal use case samajhna developer ki superpower hai — wrong tool = poor results."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 4 Quiz — Transformer Architecture Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — attention, positional encoding, BERT vs GPT test karo!
          </p>
        </div>
        <QuizSection questions={transformerQuiz} chapterSlug="transformers" />
      </div>
    </div>
  )
}
