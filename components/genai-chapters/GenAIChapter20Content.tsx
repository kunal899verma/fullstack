'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Ollama OpenAI API compatible kyun hai aur ye kya enable karta hai?',
    options: [
      {
        text: 'Ollama OpenAI ka product hai — sirf rebranding hai',
        correct: false,
        explanation: 'Ollama independent open-source project hai, OpenAI ka product nahi. API compatibility deliberately design ki gayi hai migration easy banane ke liye.',
      },
      {
        text: 'Ollama ne apni API design mein OpenAI API ka interface mirror kiya hai — existing OpenAI code mein sirf baseURL aur apiKey change karo, kuch aur nahi',
        correct: true,
        explanation: 'Exactly! Ollama API design: OpenAI compatible. openai npm package use karo, sirf baseURL: "http://localhost:11434/v1" aur apiKey: "ollama" set karo. All existing code — same. Migration: 2 line change, zero rest of codebase change.',
      },
      {
        text: 'Ollama sirf Python ke saath kaam karta hai',
        correct: false,
        explanation: 'Ollama REST API expose karta hai — koi bhi language use kar sakti hai. Node.js/TypeScript mein OpenAI SDK ke saath seamlessly kaam karta hai.',
      },
      {
        text: 'Ollama sirf LLaMA models run kar sakta hai',
        correct: false,
        explanation: 'Ollama multiple models support karta hai: LLaMA 3, Mistral, Phi-3, Gemma, Qwen, Code Llama, Deepseek, aur 100+ more. Model library: ollama.com/library.',
      },
    ],
  },
  {
    question: 'Local LLM use karne ka PRIMARY reason kya hona chahiye?',
    options: [
      {
        text: 'Local LLMs hamesha better quality dete hain — isliye use karo',
        correct: false,
        explanation: 'Quality wise, Claude/GPT-4o jaise frontier models local models se generally better hain (mid-2025 mein). Local ka advantage quality nahi hai.',
      },
      {
        text: 'Privacy requirements (data external server nahi jaana chahiye), offline operation, regulatory compliance (data residency), ya zero API cost — specific use cases ke liye',
        correct: true,
        explanation: 'Bilkul sahi! Local LLM kab: (1) Sensitive data — medical records, financial data jo cloud mein nahi ja sakti, (2) Offline environments — air-gapped systems, remote locations, (3) Regulations — data must stay on-premise, (4) Cost at scale — millions of calls mein GPU amortize ho jaata hai vs per-call API cost.',
      },
      {
        text: 'Internet connection nahi hai toh local — baaki hamesha cloud',
        correct: false,
        explanation: 'Offline ye ek reason hai, lekin privacy aur compliance often zyada important reasons hain production mein.',
      },
      {
        text: 'Local LLMs setup karna itna easy hai ki hamesha prefer karna chahiye',
        correct: false,
        explanation: 'Local setup mein hardware requirements, maintenance, model updates, scaling — sab manage karna padta hai. Cloud APIs complexity hide karte hain. Trade-off carefully consider karo.',
      },
    ],
  },
  {
    question: 'Q4 aur Q8 quantization mein kya tradeoff hai?',
    options: [
      {
        text: 'Q4 aur Q8 mein koi difference nahi — same quality same speed',
        correct: false,
        explanation: 'Significant differences hain — Q4 zyada compressed (less memory, faster) lekin quality thodi kam. Q8 better quality lekin zyada memory.',
      },
      {
        text: 'Q4: 4-bit = zyada compression (2x less RAM than Q8), faster, slightly lower quality. Q8: 8-bit = better quality, more RAM needed, slower. Choose based on hardware.',
        correct: true,
        explanation: 'Exactly! 7B model: Q4 ~4GB RAM, Q8 ~8GB RAM. Quality: Q8 closer to full precision. Speed: Q4 faster inference. Choice: 8GB RAM laptop → Q4. 16GB RAM → Q8. Production server with 32GB → Q8 ya full precision. Quality requirement aur available RAM se decide karo.',
      },
      {
        text: 'Q4 hamesha better hai — isliye Q4 use karo',
        correct: false,
        explanation: 'Q4 memory efficient hai lekin quality loss hoti hai. Quality critical hai aur RAM available hai? Q8 better choice hai.',
      },
      {
        text: 'Quantization sirf image models ke liye hai',
        correct: false,
        explanation: 'Quantization language models, image models, audio models — sab pe applicable hai. Weights ko lower precision mein store karna model-agnostic optimization hai.',
      },
    ],
  },
  {
    question: 'Ollama se local RAG banane ke liye minimum kya chahiye?',
    options: [
      {
        text: 'GPU mandatory hai — CPU pe RAG nahi hota',
        correct: false,
        explanation: 'CPU pe bhi kaam karta hai — slow hoga lekin functional. Small models (1B-3B) CPU pe acceptable speed pe run karte hain.',
      },
      {
        text: 'Ollama (LLM serving) + embedding model (local ya API) + vector DB (ChromaDB ya pgvector) — teeno components se full local RAG possible',
        correct: true,
        explanation: 'Sahi! Local RAG stack: (1) Ollama se LLM run karo (e.g., llama3.2), (2) Embedding model — Ollama ka nomic-embed-text ya OpenAI embeddings, (3) ChromaDB ya pgvector (local vector store). Fully private, offline capable, zero external API calls.',
      },
      {
        text: 'Pinecone zaroori hai local RAG ke liye',
        correct: false,
        explanation: 'Pinecone managed cloud service hai — local RAG ke liye local vector DB use karo: ChromaDB (in-process Python), pgvector (PostgreSQL extension). Zero cloud dependency.',
      },
      {
        text: 'Local RAG pe 100+ documents index nahi ho sakti',
        correct: false,
        explanation: 'Local vector DBs thousands of documents handle kar sakte hain easily. ChromaDB lakhs of vectors manage kar sakta hai local mein. Scale pe Qdrant ya local Weaviate consider karo.',
      },
    ],
  },
  {
    question: 'Kaunsa Ollama model coding tasks ke liye best hai?',
    options: [
      {
        text: 'llama3.2 coding ke liye best hai — largest model isliye best',
        correct: false,
        explanation: 'llama3.2 general purpose hai. Coding ke liye specialized models better perform karte hain.',
      },
      {
        text: 'codellama ya deepseek-coder — coding tasks ke liye specifically trained. Qwen2.5-coder bhi strong option hai.',
        correct: true,
        explanation: 'Bilkul sahi! Coding specialized models: codellama (Meta), deepseek-coder (Deepseek), qwen2.5-coder (Alibaba) — code generation, completion, explanation mein significantly better hain general models se same parameter count pe.',
      },
      {
        text: 'Phi-3 sirf coding ke liye hai',
        correct: false,
        explanation: 'Phi-3 Microsoft ka small general-purpose model hai — coding mein decent lekin specifically coding-only nahi. General tasks pe bhi good.',
      },
      {
        text: 'OpenAI ke models local mein Ollama se run ho sakte hain',
        correct: false,
        explanation: 'OpenAI models (GPT-4, etc.) closed-source hain — locally run nahi ho sakte. Ollama sirf open-source models support karta hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter20Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          Local LLMs — AI Offline Chalao 🖥️
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Privacy chahiye? Cloud costs avoid karna chahte ho? Ollama se LLaMA, Mistral, aur 100+ models apne machine pe chalao — zero API cost, zero data leak.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm italic">
            &quot;Local LLMs matlab apna data apne paas. No API key, no per-token cost, no internet required.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: Why Local LLMs */}
      <div id="why-local">
        <ConceptCard
          title="Local LLMs Kyun? — Privacy, Cost, Control"
          emoji="🔒"
          difficulty="advanced"
          whatIsIt="Local LLMs apne machine ya server pe run hote hain — koi data external API se nahi guzarti. Use cases: sensitive data (medical records, legal docs, financial data), offline environments, regulatory compliance (data residency), high-volume use cases jahan API cost prohibitive ho."
          whenToUse={[
            'Healthcare: patient records AI se process karna — HIPAA compliance.',
            'Legal: confidential client documents — attorney-client privilege.',
            'Enterprise: proprietary source code analyze karna — IP protection.',
            'Education: student data privacy regulations.',
            'High volume: millions of API calls cheaper GPU server se.',
            'Offline: remote locations, air-gapped systems.',
          ]}
          whyUseIt="Cloud AI API trust model: you trust OpenAI/Anthropic with your data. For many use cases ye acceptable hai. But: hospital patient data, law firm client files, defense contractor code — local LLM only option hai. Additionally: ek GPU server pe 100K+ requests/day cost efficient ho sakta hai vs per-token billing."
          howToUse={{
            filename: 'why-local-llm.ts',
            language: 'typescript',
            code: `// When to use local vs cloud LLMs

interface LLMDecision {
  useCase: string;
  dataSensitivity: 'public' | 'internal' | 'confidential' | 'regulated';
  volume: 'low' | 'medium' | 'high'; // requests per day
  qualityRequirement: 'good-enough' | 'high' | 'state-of-the-art';
  budget: 'minimal' | 'moderate' | 'enterprise';
  recommendation: 'cloud-api' | 'local-llm' | 'hybrid';
}

const examples: LLMDecision[] = [
  {
    useCase: 'General chatbot, public data',
    dataSensitivity: 'public',
    volume: 'low',
    qualityRequirement: 'high',
    budget: 'minimal',
    recommendation: 'cloud-api', // Claude/GPT-4 best quality, easy setup
  },
  {
    useCase: 'Hospital patient records analysis',
    dataSensitivity: 'regulated', // HIPAA
    volume: 'medium',
    qualityRequirement: 'high',
    budget: 'enterprise',
    recommendation: 'local-llm', // Data cannot leave hospital network
  },
  {
    useCase: 'Code review for internal codebase',
    dataSensitivity: 'confidential',
    volume: 'high',
    qualityRequirement: 'good-enough',
    budget: 'moderate',
    recommendation: 'hybrid', // Local for code, cloud for complex explanations
  },
  {
    useCase: 'Product description generation (1M/month)',
    dataSensitivity: 'public',
    volume: 'high',
    qualityRequirement: 'good-enough',
    budget: 'minimal',
    recommendation: 'local-llm', // Scale economics favor local GPU
  },
];

// Cost calculation: cloud vs local
function costComparison(monthlyTokens: number) {
  const cloudCost = (monthlyTokens / 1_000_000) * 3; // $3/1M tokens (Sonnet)
  const gpuCost = 0.4 * 24 * 30; // $0.40/hour GPU, 24/7 = $288/month (A10G spot)
  console.log(\`Cloud: $\${cloudCost.toFixed(0)}/month | Local GPU: $\${gpuCost}/month\`);
  // Break-even: ~100M tokens/month
}`,
            explanation: 'Decision factors: data sensitivity (regulated? → local), volume (very high? → local economics better), quality (state-of-the-art needed? → cloud), offline requirement (→ local). Most cases: cloud API easiest. Specific cases: local justified.',
          }}
          realWorldScenario="Mumbai-based legaltech startup: client documents process karna tha — bar association rules kehte hain data India mein rahna chahiye. AWS Mumbai pe Ollama + Mistral deploy kiya. Local model quality 85% of GPT-4 on their tasks. Data compliance ✓, cost $200/month (vs $2000+ API), latency better (local network). Win-win."
          commonMistakes={[
            {
              mistake: 'Local LLM use karna sirf cost save karne ke liye without quality benchmark',
              why: 'Local models generally weaker hain frontier models se. Quality degradation user experience hit karta hai — cost saving erase ho jaata hai churn se.',
              fix: 'Benchmark karo pehle: apne specific use case pe quality test karo local vs cloud. If >90% quality maintained → local justified. Agar significant drop → cost saving worth nahi.',
            },
          ]}
          proTip="Private Cloud option: Azure, AWS, GCP pe managed LLM services hain jo data residency guarantee karte hain — Vertex AI (Google), Azure OpenAI (EU regions), AWS Bedrock. Enterprise ke liye ye middle ground hai: cloud convenience + data residency compliance. Fully self-hosted se zyada managed hain."
        />
      </div>

      {/* Card 2: Ollama Setup */}
      <div id="ollama-setup">
        <ConceptCard
          title="Ollama Setup — Install, Pull, Run"
          emoji="🦙"
          difficulty="advanced"
          whatIsIt="Ollama open-source tool hai local LLM running ke liye — Docker jaise models ke liye. macOS, Linux, Windows support. One command install, one command model pull, one command run. HTTP API expose karta hai, OpenAI API compatible. Models: ollama.com/library pe 100+ available."
          whenToUse={[
            'Local development: fast iteration bina API costs ke.',
            'Privacy-sensitive prototyping: code share kiye bina test karo.',
            'Offline demos: internet unavailable hone pe bhi kaam kare.',
            'Personal productivity tools: private notes assistant, local code helper.',
          ]}
          whyUseIt="Ollama ne local LLM experience democratize kiya — ek command mein LLaMA-3 run hota hai. Docker jitna simple hai. No CUDA setup complexity, no Python environment. macOS pe Metal GPU acceleration built-in. Windows pe DirectML. Linux pe CUDA."
          howToUse={{
            filename: 'ollama-setup.sh',
            language: 'bash',
            code: `# ─── Install Ollama ───────────────────────────────────────────────
# macOS / Linux:
curl -fsSL https://ollama.ai/install.sh | sh

# macOS (Homebrew):
brew install ollama

# Windows: Download from ollama.ai

# ─── Pull & Run Models ────────────────────────────────────────────
# LLaMA 3.2 (small, fast)
ollama pull llama3.2          # 2.0B params, ~1.5GB
ollama pull llama3.2:3b       # 3.2B params, ~2.0GB

# Mistral 7B (good all-rounder)
ollama pull mistral            # 7B params, ~4.1GB

# Phi-3 (small but capable)
ollama pull phi3               # 3.8B params, ~2.3GB

# Coding focused
ollama pull codellama          # 7B coding model
ollama pull deepseek-coder     # Excellent for code

# Run interactively
ollama run llama3.2
# > Hello! How can I help you?
# > Kya main Hinglish mein baat kar sakta hoon?

# ─── Check running models ─────────────────────────────────────────
ollama list    # downloaded models
ollama ps      # currently running
ollama serve   # start server manually (usually auto-starts)

# ─── API is now available ─────────────────────────────────────────
# curl http://localhost:11434/api/generate -d '{"model":"llama3.2","prompt":"Hello!"}'
# OpenAI compatible: http://localhost:11434/v1`,
            explanation: 'Ollama install → pull model → run. Server automatically starts on port 11434. API: /api/generate (Ollama native) aur /v1/chat/completions (OpenAI compatible). Models download hote hain ~/.ollama/models mein. ollama rm model_name se delete karo. Model sizes: 1B ~600MB, 3B ~2GB, 7B ~4GB, 13B ~8GB.',
          }}
          realWorldScenario="Developer conference demo: presenter ne live internet-free demo kiya — local LLaMA 3.2 pe code generation feature. No API costs, no latency spikes, no internet dependency. Audience impressed. Event success. Ollama ne 30-minute setup mein offline demo possible banaya."
          commonMistakes={[
            {
              mistake: 'GPU RAM pe dhyan nahi dena — model RAM exceed karne se crash',
              why: 'Ollama model GPU VRAM mein load karta hai. 8GB VRAM pe 7B Q4 model barely fit hota hai. Exceed karne pe CPU fallback ya crash.',
              fix: 'ollama ps se VRAM usage dekho. Model size guide: 7B Q4 ~4GB VRAM, 13B Q4 ~8GB, 70B Q4 ~40GB. Apne GPU ke hisaab se model choose karo.',
            },
          ]}
          proTip="ollama serve --port 8080 se alag port pe chalao. OLLAMA_NUM_PARALLEL=4 environment variable se parallel requests enable karo (multi-user scenarios). OLLAMA_MAX_LOADED_MODELS=3 se multiple models memory mein rakho. Docker image bhi available hai: docker pull ollama/ollama."
        />
      </div>

      {/* Card 3: Ollama API with Node.js */}
      <div id="ollama-api">
        <ConceptCard
          title="Ollama API — OpenAI SDK Compatible"
          emoji="🔌"
          difficulty="advanced"
          whatIsIt="Ollama ka API OpenAI compatible hai — existing OpenAI SDK code mein sirf baseURL change karo. /v1/chat/completions, /v1/embeddings, streaming — sab support karta hai. Migration cost: 2 lines of code. Benefit: zero API bills, private, offline."
          whenToUse={[
            'Existing OpenAI code ko local mein test karna.',
            'Development environment mein free iteration.',
            'Privacy-sensitive features prototype karna.',
            'OpenAI se migrate karna cost reasons se.',
          ]}
          whyUseIt="2 line migration: baseURL + apiKey change karo, rest sab same. OpenAI SDK (npm) use karo — no new library sikho. Streaming, tool calls, embeddings — sab supported. Production se development tk seamless transition."
          howToUse={{
            filename: 'ollama-nodejs.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';

// ─── Ollama is OpenAI API compatible! ────────────────────────────
const ollama = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama', // any non-empty string works
});

// ─── Basic chat (same as OpenAI) ──────────────────────────────────
async function chatWithOllama(message: string): Promise<string> {
  const response = await ollama.chat.completions.create({
    model: 'llama3.2', // local model name
    messages: [{ role: 'user', content: message }],
  });
  return response.choices[0].message.content ?? '';
}

// ─── Streaming ────────────────────────────────────────────────────
async function streamOllama(prompt: string, onChunk: (text: string) => void) {
  const stream = await ollama.chat.completions.create({
    model: 'llama3.2',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content ?? '';
    if (text) onChunk(text);
  }
}

// ─── Embeddings (with nomic-embed-text) ──────────────────────────
// First: ollama pull nomic-embed-text
async function embedWithOllama(text: string): Promise<number[]> {
  const response = await ollama.embeddings.create({
    model: 'nomic-embed-text', // local embedding model
    input: text,
  });
  return response.data[0].embedding;
}

// ─── Switch between local and cloud ───────────────────────────────
const USE_LOCAL = process.env.USE_LOCAL_LLM === 'true';

function getClient() {
  if (USE_LOCAL) {
    return new OpenAI({ baseURL: 'http://localhost:11434/v1', apiKey: 'ollama' });
  }
  return new OpenAI(); // uses OPENAI_API_KEY
}

const getModel = () => USE_LOCAL ? 'llama3.2' : 'gpt-4o-mini';

async function flexibleChat(message: string): Promise<string> {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: getModel(),
    messages: [{ role: 'user', content: message }],
  });
  return response.choices[0].message.content ?? '';
}

// Usage:
// USE_LOCAL_LLM=true npx ts-node script.ts  → uses Ollama
// npx ts-node script.ts                     → uses OpenAI`,
            explanation: 'Ollama + OpenAI SDK: baseURL aur apiKey change karo — baaki sab same. getClient() factory se environment variable se switch karo. Development: local. Production: cloud. Same codebase, different config. nomic-embed-text: free local embedding model, 768 dimensions, decent quality.',
          }}
          realWorldScenario="Team ne OpenAI se Ollama local dev environment switch kiya. Development mein: zero API costs, instant iteration, no rate limits. CI/CD: lightweight model (phi3) se fast tests. Production: still OpenAI for quality. Monthly savings: $800 (team API costs in dev) → $0. Same codebase, environment variable switch."
          commonMistakes={[
            {
              mistake: 'Model name OpenAI format mein likhna — gpt-4 vs llama3.2',
              why: 'Ollama mein model names different hain. gpt-4 Ollama pe exist nahi karta.',
              fix: 'ollama list se available models check karo. Model names exactly match karni chahiye. Config mein model name environment variable se control karo: MODEL=llama3.2 vs MODEL=gpt-4o.',
            },
          ]}
          proTip="Ollama ke tool calling support bhi aa gaya hai — function calling with local models. Llama 3.1+, Mistral, Qwen models tool calling support karte hain. Anthropic-style tool definitions use karo ya OpenAI format — dono kaam karte hain. Local agents banana ab possible hai bina cloud costs ke."
        />
      </div>

      {/* Card 4: Quantization */}
      <div id="quantization">
        <ConceptCard
          title="Quantization — Quality vs Resource Trade-off"
          emoji="⚖️"
          difficulty="advanced"
          whatIsIt="Quantization: model weights ko lower precision mein store karna. Float32 (full precision) → Float16 (half) → Int8 (Q8) → Int4 (Q4). Lower precision: kam memory, faster inference, thodi quality loss. Ollama models GGUF format mein aate hain jo multiple quantization levels support karta hai."
          whenToUse={[
            'Q4_K_M: default recommendation — good balance quality/speed/memory.',
            'Q8_0: better quality, 2x more RAM. 16GB+ RAM available ho toh.',
            'Full precision (F16): research, maximum quality, lots of RAM.',
            'Q2/Q3: extreme memory constraints — quality significantly worse.',
          ]}
          whyUseIt="7B model full precision: ~14GB VRAM. Q4: ~4GB VRAM. Same model, 3.5x less memory = run karo cheaper GPU pe. Quality loss: Q4 vs full precision usually <5% on most benchmarks — acceptable for production. Smaller models + higher quantization vs larger models + lower quantization — benchmark karo apne task pe."
          howToUse={{
            filename: 'quantization-guide.ts',
            language: 'typescript',
            code: `// ─── Quantization Levels Explained ──────────────────────────────
const quantizationGuide = {
  'Q2_K': { bitsPerWeight: 2, ramFor7B: '2.8GB', quality: '65%', use: 'Extreme memory constraints only' },
  'Q4_0': { bitsPerWeight: 4, ramFor7B: '3.8GB', quality: '85%', use: 'Low memory, acceptable quality' },
  'Q4_K_M': { bitsPerWeight: 4.5, ramFor7B: '4.1GB', quality: '88%', use: 'Best default choice' },
  'Q5_K_M': { bitsPerWeight: 5.5, ramFor7B: '5.0GB', quality: '91%', use: 'Higher quality, medium RAM' },
  'Q6_K': { bitsPerWeight: 6, ramFor7B: '5.5GB', quality: '94%', use: 'Near full quality, more RAM' },
  'Q8_0': { bitsPerWeight: 8, ramFor7B: '7.7GB', quality: '98%', use: 'Best quality within 8-bit' },
  'F16': { bitsPerWeight: 16, ramFor7B: '14GB', quality: '100%', use: 'Full precision, research use' },
} as const;

// ─── How to pull specific quantization ───────────────────────────
// Default (usually Q4_K_M):
// ollama pull mistral

// Specific quantization:
// ollama pull mistral:7b-instruct-q8_0      # Q8
// ollama pull mistral:7b-instruct-q4_K_M    # Q4_K_M

// ─── Benchmark on your task ──────────────────────────────────────
import OpenAI from 'openai';

const ollama = new OpenAI({ baseURL: 'http://localhost:11434/v1', apiKey: 'ollama' });

async function benchmarkQuantization(testCases: string[]): Promise<void> {
  const models = ['llama3.2:1b', 'llama3.2:3b', 'llama3.2'];

  for (const model of models) {
    const start = Date.now();
    let totalTokens = 0;

    for (const prompt of testCases) {
      const response = await ollama.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      });
      totalTokens += response.usage?.completion_tokens ?? 0;
    }

    const elapsed = Date.now() - start;
    console.log(\`\${model}: \${elapsed}ms total, \${Math.round(totalTokens / (elapsed / 1000))} tokens/sec\`);
  }
}

// ─── Model selection by hardware ──────────────────────────────────
function recommendModel(vramGB: number): string {
  if (vramGB >= 48) return 'llama3.1:70b';      // Flagship quality
  if (vramGB >= 24) return 'llama3.1:34b';      // High quality
  if (vramGB >= 16) return 'llama3.1:13b';      // Good quality
  if (vramGB >= 8) return 'llama3.2:7b';        // Decent quality
  if (vramGB >= 4) return 'llama3.2:3b';        // Acceptable
  return 'llama3.2:1b';                          // Minimum viable
}`,
            explanation: 'Q4_K_M = default sweet spot. RAM guide: 8GB laptop → Q4 7B. 16GB → Q8 7B ya Q4 13B. 32GB → F16 7B ya Q4 34B. Benchmarking zaroori hai: quality gap kaafi baar smaller hai theory se practice mein. GGUF format: CPU pe bhi kaam karta hai without GPU.',
          }}
          realWorldScenario="Small team ne on-premise AI server banaya — Dell server, RTX 4090 (24GB VRAM). Choice: llama3.1:13b-Q8 vs llama3.2:7b-F16. Both fit in 24GB. Benchmark: 13B-Q8 better quality on their tasks (code review) by ~8%. 13B-Q8 choose kiya. Same hardware, significantly better quality with right model+quantization combo."
          commonMistakes={[
            {
              mistake: 'Sabse large model choose karna without GPU check',
              why: 'Model VRAM se zyada lene pe: CPU pe fallback (10-50x slower) ya crash. Unusable performance.',
              fix: 'ollama ps se current usage check karo. Model download karne se pehle: expected RAM = model size * 1.1. Available VRAM se compare karo. Conservative rahna better hai.',
            },
          ]}
          proTip="Apple Silicon (M1/M2/M3) pe Ollama excellent hai — unified memory architecture (CPU + GPU same RAM share karte hain). M2 Pro 16GB pe llama3.2:7b comfortably run karta hai 30+ tokens/sec. Mac pe local AI development best experience hai — plug karo, run karo."
        />
      </div>

      {/* Card 5: Local RAG */}
      <div id="local-rag">
        <ConceptCard
          title="Local RAG — ChromaDB + Ollama"
          emoji="📚"
          difficulty="advanced"
          whatIsIt="Local RAG: poora stack local mein — no internet, no API keys, no data leakage. Stack: Ollama (LLM) + nomic-embed-text (embeddings) + ChromaDB ya pgvector (vector store). Private document Q&A system jo company confidential data pe kaam kare bina cloud pe data bheje."
          whenToUse={[
            'Confidential documents: legal, medical, financial.',
            'Offline environments: no reliable internet.',
            'Compliance: data must stay on-premise.',
            'Development: free iteration without API costs.',
          ]}
          whyUseIt="Full stack: ChromaDB Python API, Ollama embeddings (nomic-embed-text, 768 dims), LLaMA 3 responses — sab local. Zero API calls, zero cost beyond hardware. For privacy-critical use cases ye only option hai."
          howToUse={{
            filename: 'local-rag.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';
// ChromaDB JS client: npm install chromadb
import { ChromaClient } from 'chromadb';

// ─── Local setup ──────────────────────────────────────────────────
// 1. Start Ollama: ollama serve
// 2. Pull models: ollama pull llama3.2 && ollama pull nomic-embed-text
// 3. Start ChromaDB: chroma run --host localhost --port 8000
//    Or: pip install chromadb && chroma run

const ollama = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

const chroma = new ChromaClient({ path: 'http://localhost:8000' });

// ─── Local Embedding ──────────────────────────────────────────────
async function localEmbed(text: string): Promise<number[]> {
  const res = await ollama.embeddings.create({
    model: 'nomic-embed-text', // 768 dimensions
    input: text,
  });
  return res.data[0].embedding;
}

// ─── Setup Collection ─────────────────────────────────────────────
async function setupCollection(name = 'local-docs') {
  return await chroma.getOrCreateCollection({ name });
}

// ─── Ingest Document ──────────────────────────────────────────────
async function ingestDocument(text: string, docId: string, metadata: Record<string, string> = {}) {
  const collection = await setupCollection();
  const embedding = await localEmbed(text);

  await collection.add({
    ids: [docId],
    embeddings: [embedding],
    documents: [text],
    metadatas: [metadata],
  });
}

// ─── Query ────────────────────────────────────────────────────────
async function localRAGQuery(question: string): Promise<string> {
  const collection = await setupCollection();
  const queryEmbedding = await localEmbed(question);

  // Retrieve similar chunks
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 5,
  });

  const context = results.documents?.[0]?.filter(Boolean).join('\\n\\n') ?? '';

  if (!context) return 'Koi relevant information nahi mili.';

  // Generate answer with local LLM
  const response = await ollama.chat.completions.create({
    model: 'llama3.2',
    messages: [
      {
        role: 'system',
        content: 'Answer only from the provided context. If answer not in context, say so.',
      },
      {
        role: 'user',
        content: \`Context:\\n\${context}\\n\\nQuestion: \${question}\`,
      },
    ],
    max_tokens: 512,
  });

  return response.choices[0].message.content ?? '';
}

// ─── Demo ─────────────────────────────────────────────────────────
async function demo() {
  await ingestDocument('NodeMaster course mein 22 GenAI chapters hain.', 'doc1');
  await ingestDocument('Ollama se local LLMs bina internet ke chalate hain.', 'doc2');

  const answer = await localRAGQuery('Kitne chapters hain?');
  console.log('Answer:', answer);
  // Zero API calls, zero cost, zero data leakage
}`,
            explanation: 'Local RAG stack: nomic-embed-text (Ollama pe, 768 dims), ChromaDB (in-process vector DB), llama3.2 (local LLM). Chroma JS client direct Python ChromaDB server se connect karta hai. Alternative: pgvector (PostgreSQL) for production local RAG. Fully private, fully local, zero external dependencies.',
          }}
          realWorldScenario="Law firm: attorney-client privileged documents RAG system. Stack: HP server (RTX 3090), Ollama (Mistral 7B), ChromaDB, nomic-embed-text. 50K documents indexed. Latency: 2s per query (acceptable). Privacy: zero data leaves office network. Cost: one-time server $3000 vs $800/month API. ROI in 4 months."
          commonMistakes={[
            {
              mistake: 'ChromaDB ko production mein default in-memory mode pe use karna',
              why: 'Default ChromaDB in-memory hai — restart pe sab data lost. Production ke liye persistent storage configure karo.',
              fix: 'chromadb.Client(Settings(chroma_db_impl="duckdb+parquet", persist_directory="./chromadb")) ya PostgreSQL backend. Restart-safe storage zaroori hai production mein.',
            },
          ]}
          proTip="Qdrant (open-source vector DB) ChromaDB se better hai production local RAG ke liye — Rust-based, fast, GRPC/REST APIs, persistent by default, Docker image available. docker run -p 6333:6333 qdrant/qdrant — production-ready local vector DB in one command. ChromaDB better hai quick prototyping ke liye."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 20 Quiz — Local LLMs
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Local AI samjhe? Prove karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="local-llms" />
      </div>
    </div>
  )
}
