'use client'

import React, { useState } from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

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
          Transformer Architecture — The Revolution
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          2017 mein &ldquo;Attention is All You Need&rdquo; paper ne AI change kar diya. Transformers ne RNNs replace kiye aur GPT, BERT, Claude jaisi models possible banayi. Is chapter mein attention mechanism, multi-head attention, positional encoding, aur BERT vs GPT samjhenge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye shayad GenAI course ka sabse important chapter hai — sab large language models yahi foundation use karte hain.
        </p>
      </div>

      {/* ConceptCard 1: RNN Problems */}
      <div id="rnn-problems">
        <ConceptCard
          title="RNN Ki Problem — Kyun Transformers Chahiye?"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="RNNs (Recurrent Neural Networks) sequential tha — ek token process karo, phir dusra. Long sequences mein vanishing gradients — early tokens ki information 'bhool' jaate the. Parallel training impossible tha — slow. Transformers ne ye sab fix kiya."
          whenToUse={[
            'RNN limitations samajhne ke liye — historical context',
            'Transformer advantages justify karne ke liye',
            'Sequence modeling decisions — kab RNN, kab Transformer',
            'Time series mein architectural choices',
          ]}
          whyUseIt="RNN mein: paragraph 100 words ka hai, 1st word ka context 100 steps travel karna padta hai — signal weak hota jaata hai. Transformer mein: har token directly har dusre token se attend kar sakta hai — O(1) distance. Parallel training possible — GPUs efficiently use hote hain."
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
          realWorldScenario="Google Translate 2016 mein RNN use karta tha — translations OK the. 2017 mein Transformer-based BERT: quality dramatically better. 2019 mein GPT-2: coherent paragraphs. Ye jump RNN → Transformer switch se aaya. Same idea, different architecture — revolutionary difference."
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
          proTip="State Space Models (SSM) — Mamba, S4 — new wave hain. RNN efficiency ke saath Transformer quality. Research area rapidly evolving hai. 2024-25 mein hybrid architectures emerge ho rahe hain — Transformer + SSM. AI field bahut fast move karta hai."
        />
      </div>

      {/* ConceptCard 2: Attention Mechanism */}
      <div id="attention">
        <ConceptCard
          title="Attention Mechanism — Email Inbox Analogy"
          emoji="👁️"
          difficulty="intermediate"
          whatIsIt="Attention mechanism: current token (Query) dusre tokens (Keys) se compare karta hai, similarity calculate karta hai, aur weighted sum of Values nikalta hai. Har token decide karta hai ki dusre tokens kitne relevant hain. 'Soft' lookup — differentiable aur learnable."
          whenToUse={[
            'Long-range dependencies capture karna — sentence ke pehle aur aakhiri word ka connection',
            'Context-dependent word meanings — bank (river vs financial)',
            'Cross-attention — encoder output se attend karna decoder mein',
            'Vision Transformers — image patches pe attention',
          ]}
          whyUseIt="Attention mathematically elegant hai — ek formula se sab languages, modalities, tasks. Email inbox analogy: Query = 'meeting' ke baare mein dhundh raha hun. Keys = subject lines. Values = email bodies. Match hone par relevant emails read karo — context se word meaning decide hota hai."
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
            explanation: 'Scaling by sqrt(dk) zaroori hai — large dk se dot products large ho jaate hain, softmax extreme ho jaati hai, gradients disappear. Real implementations matrix multiplication GPU par efficiently karte hain — Flash Attention memory-efficient implementation hai.',
          }}
          realWorldScenario="'The animal didn't cross the street because it was too tired' — 'it' kya refer karta hai? Human: clearly 'animal'. RNN: uncertain. Attention: 'it' → 'animal' strong connection, 'street' weak — correct reference resolution. Coreference resolution natural hoti hai attention se."
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
          proTip="Flash Attention (2022, 2023) memory-efficient attention implementation hai — I/O aware algorithm. Training 2-4x faster, longer sequences possible. All major frameworks ne adopt kiya. Ye implementation detail hai — concept same hai."
          demo={<AttentionDemo />}
        />
      </div>

      {/* ConceptCard 3: Multi-Head Attention */}
      <div id="multi-head">
        <ConceptCard
          title="Multi-Head Attention"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="Multi-head attention mein h parallel attention heads hote hain — har head alag projection space mein operate karta hai. Sab heads ke outputs concatenate hokar final output milta hai. Alag heads alag types ke relationships learn karte hain."
          whenToUse={[
            'Standard practice hai — always use multi-head over single-head',
            'Head count adjust karo — d_model ke multiple mein rahna chahiye',
            'Interpretability analysis — kaunsa head kya learn karta hai',
            'Pruning — unimportant heads remove karo efficiency ke liye',
          ]}
          whyUseIt="Single attention head ek perspective se dekhta hai. Multiple heads: Head 1 subject-verb relations, Head 2 pronouns → nouns, Head 3 positional patterns, Head 4 semantic similarity. Diverse perspectives se rich representations banate hain. GPT-4 reportedly 96 heads hai."
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
            explanation: 'h heads mein d_model split hota hai — total computation same rehti hai single head ke barabar. Computational cost multiply nahi hoti — ye elegant design hai. GPT-3: 96 attention heads, d_model=12288. Cada head 128 dimensions.',
          }}
          realWorldScenario="Research (Clark et al., 2019) ne BERT ke attention heads analyze kiye — Head 1 coreference links dhundta tha (pronouns → entities), Head 3 syntactic dependencies follow karta tha, Head 8 BOS/EOS tokens pe focus karta tha. Emergent behavior — explicitly program nahi kiya gaya."
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
          proTip="Attention head pruning — unimportant heads remove karo inference ke liye. Research shows 20-40% heads prunable bina significant quality loss ke. Smaller, faster model milta hai. 'Are Sixteen Heads Really Better than One?' (Michel et al., 2019) — interesting read."
        />
      </div>

      {/* ConceptCard 4: Positional Encoding */}
      <div id="positional-encoding">
        <ConceptCard
          title="Positional Encoding — Order Matters"
          emoji="📍"
          difficulty="intermediate"
          whatIsIt="Self-attention position-agnostic hai — bina extra information ke 'cat sat' aur 'sat cat' same lagenge. Positional encoding sequence mein position ki information inject karta hai — sinusoidal ya learned embeddings through."
          whenToUse={[
            'Har transformer mein — mandatory hai',
            'Long sequences ke liye — RoPE, ALiBi better scale karte hain',
            'Variable length inputs ke liye — learned positions fixed seq len hain',
            'Relative positions important hon — relative positional encoding',
          ]}
          whyUseIt="Language order-dependent hai — 'dog bites man' vs 'man bites dog'. Vision mein spatial position important hai. Positional encoding se model position samajhta hai. Sinusoidal encoding fixed mathematical function hai — koi training nahi chahiye. Learned position embeddings better performance dete hain often."
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
          realWorldScenario="GPT extrapolation problem: 1024 token context par train kiya, phir 2048 tokens input diye — positional encoding out-of-range. Performance drop. ALiBi (Attention with Linear Biases) positional bias attention scores par directly add karta hai — better length generalization. LLaMA RoPE use karta hai — 100K+ tokens possible."
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
          proTip="RoPE (Rotary Position Embedding) current sota hai — LLaMA, Mistral, Qwen sab use karte hain. Relative positions naturally handle hote hain. ALiBi explicit positional encoding skip karta hai — attention scores mein linear bias add karta hai. Ye topics LLM fine-tuning ke liye relevant hain."
        />
      </div>

      {/* ConceptCard 5: Encoder vs Decoder */}
      <div id="encoder-decoder">
        <ConceptCard
          title="Encoder vs Decoder — BERT vs GPT"
          emoji="🔀"
          difficulty="intermediate"
          whatIsIt="Transformer mein Encoder (BERT-style) aur Decoder (GPT-style) components hain. Encoder bidirectional — pura context dekhta hai. Decoder causal/autoregressive — sirf left context (past tokens). T5 encoder-decoder architecture use karta hai. Task se decide hota hai kaunsa architecture."
          whenToUse={[
            'Classification, NER, sentence similarity — BERT (encoder)',
            'Text generation, completion, chat — GPT (decoder)',
            'Translation, summarization — T5/BART (encoder-decoder)',
            'Most LLMs today — decoder-only (GPT, Claude, LLaMA)',
          ]}
          whyUseIt="Decoder-only models (GPT, Claude, LLaMA) text generation ke liye natural hain — next token predict karo, repeat. Encoder models classification ke liye efficient. Decoder-only trend hai recent models mein — simpler architecture, scales better, versatile."
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
          realWorldScenario="2018-2020: BERT ne every NLP benchmark dominate kiya. 2020+: GPT-3 showed decoder-only can do classification too with few-shot. 2022+: ChatGPT, Claude — decoder-only aur instruction tuning ne BERT obsolete kar diya most tasks ke liye. Architecture wars: BERT won 2018-2021, GPT-style winning 2022+."
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
          proTip="Sentence-transformers library (BERT-based) excellent embeddings deta hai semantic search ke liye. GPT-style API calls text generation ke liye. Hybrid: GPT generate kare, BERT embedding se retrieve karo (RAG pattern). Each architecture ka optimal use case hai."
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
