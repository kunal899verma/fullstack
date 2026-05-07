'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Diff Block Component ──────────────────────────────────────────────────────

function DiffBlock({ title, bad, good, badLabel = 'Problem', goodLabel = 'Solution' }: {
  title: string
  bad: string
  good: string
  badLabel?: string
  goodLabel?: string
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-[#A1A1AA]">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <p className="text-xs font-bold text-[#EF4444] uppercase tracking-wide mb-2">{badLabel}</p>
          <pre className="text-xs text-[#FCA5A5] font-mono whitespace-pre-wrap leading-relaxed">{bad}</pre>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <p className="text-xs font-bold text-[#10B981] uppercase tracking-wide mb-2">{goodLabel}</p>
          <pre className="text-xs text-[#6EE7B7] font-mono whitespace-pre-wrap leading-relaxed">{good}</pre>
        </div>
      </div>
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Fine-tuning, RAG, aur prompt engineering mein se kab kya choose karein?',
    options: [
      {
        text: 'Fine-tuning hamesha best hai — model khud seekhta hai',
        correct: false,
        explanation: 'Fine-tuning expensive hai (time + money), dynamic data update nahi kar sakti, aur RAG ya prompt engineering se better nahi hoti for many use cases.',
      },
      {
        text: 'Prompt engineering: style/format/behavior change karna. RAG: latest/private data chahiye. Fine-tuning: consistent specialized task, domain-specific output format.',
        correct: true,
        explanation: 'Bilkul sahi! Decision framework: Pehle prompt engineering try karo (cheapest, fastest). Agar dynamic data chahiye → RAG. Agar consistent specialized behavior chahiye + examples se demonstrate karna possible hai → fine-tuning. Escalate karo zarurat pe.',
      },
      {
        text: 'RAG hamesha better hai — knowledge update karna easy hai',
        correct: false,
        explanation: 'RAG retrieval quality pe depend karta hai — poor retrieval = poor answers. Some tasks (code formatting, specific response style) fine-tuning se better handled hote hain.',
      },
      {
        text: 'Teeno simultaneously use karna chahiye — maximum performance ke liye',
        correct: false,
        explanation: 'Ye overkill hai. Simplest solution jo kaam kare — wo choose karo. Complexity add karo zarurat pe, upfront nahi.',
      },
    ],
  },
  {
    question: 'OpenAI fine-tuning ke liye training data format kya hona chahiye?',
    options: [
      {
        text: 'CSV format — question, answer columns',
        correct: false,
        explanation: 'OpenAI fine-tuning JSONL format use karta hai (JSON Lines), CSV nahi.',
      },
      {
        text: 'JSONL format — har line ek complete JSON object: { "messages": [{"role": "system/user/assistant", "content": "..."}] }',
        correct: true,
        explanation: 'Exactly! JSONL (JSON Lines): har line ek training example. Format: { "messages": [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}] }. Minimum 10 examples, recommended 50-100+ quality examples.',
      },
      {
        text: 'Plain text — input aur output newline se separate karo',
        correct: false,
        explanation: 'Plain text OpenAI fine-tuning ke liye valid format nahi hai. JSONL ke messages array format mein organized examples chahiye.',
      },
      {
        text: 'XML format — <input> aur <output> tags use karo',
        correct: false,
        explanation: 'OpenAI JSONL use karta hai, XML nahi. Fine-tuning API documentation mein exact format specified hai.',
      },
    ],
  },
  {
    question: 'LoRA (Low-Rank Adaptation) kaise kaam karta hai?',
    options: [
      {
        text: 'LoRA poore model ko retrain karta hai lekin faster algorithm se',
        correct: false,
        explanation: 'LoRA full retraining nahi karta — ye original weights freeze karte hain aur sirf small adapter matrices train karte hain. Ye hi LoRA ka point hai.',
      },
      {
        text: 'LoRA original model weights freeze karta hai aur small low-rank matrices (adapters) train karta hai — 100x kam trainable parameters, 100x kam memory',
        correct: true,
        explanation: 'Exactly! Full fine-tuning: 7B model = 7B parameters train karna = 28GB+ GPU RAM. LoRA: original 7B frozen, sirf ~20M adapter parameters train karna = 2GB GPU RAM sufficient. Same task performance, fraction of compute cost.',
      },
      {
        text: 'LoRA model ko quantize karta hai 4-bit mein training ke liye',
        correct: false,
        explanation: 'Quantization QLoRA ka part hai, LoRA ka nahi. LoRA sirf rank decomposition technique hai — separate se quantization nahi karta.',
      },
      {
        text: 'LoRA sirf image generation models ke liye hai',
        correct: false,
        explanation: 'LoRA image models (Stable Diffusion) aur language models (LLaMA, Mistral) dono ke liye use hota hai. Domain-agnostic technique hai.',
      },
    ],
  },
  {
    question: 'QLoRA kya hai aur LoRA se kaise alag hai?',
    options: [
      {
        text: 'QLoRA sirf LoRA ka rebranding hai — koi technical difference nahi',
        correct: false,
        explanation: 'QLoRA = Quantized LoRA. Ye LoRA pe quantization add karta hai — distinct technical improvement hai.',
      },
      {
        text: 'QLoRA = 4-bit quantization + LoRA — model weights 4-bit mein store hote hain (4x less memory), LoRA adapters float16 mein train hote hain. Consumer GPU pe LLaMA-7B fine-tune possible.',
        correct: true,
        explanation: 'Bilkul sahi! QLoRA: base model 4-bit quantize karo (NF4 format) → frozen, LoRA adapters float16/bfloat16 train karo. Result: 7B model Colab free T4 GPU (16GB VRAM) pe fine-tune possible. Iske bina: minimum 40GB VRAM chahiye.',
      },
      {
        text: 'QLoRA faster hai kyunki GPU operations quantized mein fast hote hain',
        correct: false,
        explanation: 'QLoRA ka primary benefit memory reduction hai (GPU VRAM), speed improvement secondary benefit hai. Main use case: consumer-grade GPUs pe large model fine-tuning.',
      },
      {
        text: 'QLoRA sirf Mistral models ke liye hai',
        correct: false,
        explanation: 'QLoRA kisi bhi transformer-based model pe use ho sakta hai — LLaMA, Mistral, Falcon, Phi — model-agnostic technique hai.',
      },
    ],
  },
  {
    question: 'Fine-tuning training data preparation mein sabse important factor kya hai?',
    options: [
      {
        text: 'Zyada data hamesha better — 100K examples ideal hai',
        correct: false,
        explanation: 'Fine-tuning mein quality > quantity. 50 perfect examples 5000 mediocre examples se better results dete hain. Data cleaning critical hai.',
      },
      {
        text: 'Quality over quantity — consistent formatting, accurate examples, diverse scenarios, no hallucinated content. 50-200 high-quality examples often enough.',
        correct: true,
        explanation: 'Exactly! Fine-tuning essentially model ko "learn by example" karta hai. Garib quality examples se model garib behavior seekhta hai. Clean, consistent, accurate, diverse data — ye most important factors hain. Augmentation techniques se limited data expand kar sakte hain.',
      },
      {
        text: 'Data format matter nahi karta — model khud normalize karta hai',
        correct: false,
        explanation: 'Format critical hai. Inconsistent formatting se model confused hota hai — kabhi markdown, kabhi plain text, kabhi JSON. Consistent format throughout dataset.',
      },
      {
        text: 'Training data mein validation examples include nahi karne chahiye',
        correct: false,
        explanation: 'Validation set zaroori hai — training progress monitor karne ke liye, overfitting detect karne ke liye. 10-20% data validation ke liye rakhna best practice hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter16Content() {
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
          Fine-tuning & PEFT — Model Ko Apna Banao 🎯
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Kab fine-tune karo, kab RAG karo, kab prompt engineering karo — decision framework samjho. LoRA, QLoRA, OpenAI fine-tuning — sab cover karte hain.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <p className="text-[#FDE68A] text-sm italic">
            &quot;Fine-tuning last resort hai, pehle option nahi. Pehle prompt engineering, phir RAG, phir fine-tune.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: Decision Framework */}
      <div id="decision-framework">
        <ConceptCard
          title="Kab Fine-tune Karo? — Decision Framework"
          emoji="🤔"
          difficulty="advanced"
          whatIsIt="Fine-tuning, RAG, aur prompt engineering — teeno alag problems solve karte hain. Prompt engineering: behavior/style/format change karna. RAG: latest ya private data chahiye. Fine-tuning: consistent specialized output, domain jargon, specific format jo examples se better sikh sake. Cost + complexity order: PE < RAG < Fine-tuning."
          whenToUse={[
            'Prompt engineering pehle: task sirf instructions se solve hota hai? Use karo.',
            'RAG: dynamic data, company docs, real-time info chahiye? Use karo.',
            'Fine-tuning: specialized domain (legal, medical), very consistent output format, task requires examples not just instructions.',
            'Fine-tuning avoid karo: data less than 50 examples, task dynamic data pe depend karta hai, prompt engineering already kaam karta hai.',
          ]}
          whyUseIt="Fine-tuning expensive hai — data collection, training costs, maintenance. OpenAI fine-tuning: $0.008/1K training tokens + higher inference cost. Self-hosted LoRA: GPU rental + time. Pehle simpler solutions try karo — 80% cases mein prompt engineering ya RAG kaafi hoti hai."
          howToUse={{
            filename: 'fine-tune-decision.ts',
            language: 'typescript',
            code: `// Decision Framework — when to fine-tune

interface TaskAnalysis {
  task: string;
  hasDynamicData: boolean;
  hasPrivateData: boolean;
  requiresConsistentFormat: boolean;
  promptEngineeringWorks: boolean;
  examplesAvailable: number;
}

type Recommendation = 'prompt-engineering' | 'rag' | 'fine-tuning' | 'rag-plus-fine-tuning';

function decideApproach(task: TaskAnalysis): Recommendation {
  // Step 1: Can prompt engineering solve it?
  if (task.promptEngineeringWorks && !task.hasDynamicData) {
    return 'prompt-engineering'; // simplest, cheapest
  }

  // Step 2: Does it need current/private data?
  if (task.hasDynamicData || task.hasPrivateData) {
    if (task.requiresConsistentFormat && task.examplesAvailable >= 50) {
      return 'rag-plus-fine-tuning'; // RAG for data + fine-tune for format
    }
    return 'rag'; // RAG alone
  }

  // Step 3: Specialized task with enough examples?
  if (task.requiresConsistentFormat && task.examplesAvailable >= 50) {
    return 'fine-tuning';
  }

  // Default: improve prompt engineering first
  return 'prompt-engineering';
}

// Examples
const legalDoc = decideApproach({
  task: 'Extract clauses from contracts',
  hasDynamicData: true,
  hasPrivateData: true,
  requiresConsistentFormat: true,
  promptEngineeringWorks: false,
  examplesAvailable: 200,
}); // → 'rag-plus-fine-tuning'

const codeHelper = decideApproach({
  task: 'Explain code in Hinglish',
  hasDynamicData: false,
  hasPrivateData: false,
  requiresConsistentFormat: false,
  promptEngineeringWorks: true,
  examplesAvailable: 0,
}); // → 'prompt-engineering'`,
            explanation: 'Decision tree: (1) Prompt engineering kaam karta hai? → use PE. (2) Dynamic/private data? → RAG. (3) Consistent specialized format + examples? → Fine-tuning. Escalate karo zarurat pe — start simple, add complexity only when proven necessary.',
          }}
          realWorldScenario="Legaltech company ne initially fine-tuning plan kiya contract analysis ke liye. After analysis: contracts dynamic data hain (different every case), fine-tuning static format seekhne ke liye. Decision: RAG for contract retrieval + simple prompt for extraction. Fine-tuning skip kiya. $50K+ cost aur 3 months saved."
          commonMistakes={[
            {
              mistake: 'Fine-tuning pehla option banana',
              why: 'Fine-tuning most complex, expensive, aur time-consuming approach hai. Many teams unnecessarily spend weeks on fine-tuning jab prompt engineering se kaam ho sakta tha.',
              fix: 'Prompt engineering experiment karo 1-2 din. Results suboptimal hain aur dynamic data nahi chahiye? Phir fine-tuning consider karo.',
            },
          ]}
          demo={
            <DiffBlock
              title="Prompt Engineering Limit vs Fine-tuned Model"
              badLabel="Prompt Engineering (generic)"
              goodLabel="Fine-tuned (specialized)"
              bad={`// Legal contract analysis
// Prompt: "Extract key clauses"
// Output (inconsistent):
{
  "clauses": "Various clauses found...",
  // Format varies every time
  // Misses domain jargon
  // Inconsistent structure
}`}
              good={`// Fine-tuned on 500 legal contracts
// Output (consistent, specialized):
{
  "party_a": "Acme Corp",
  "party_b": "Widget Inc",
  "effective_date": "2025-01-01",
  "termination_clause": "Section 8.2",
  "liability_cap": "$500,000",
  "governing_law": "Delaware"
  // Consistent schema every time
  // Domain-specific extraction
}`}
            />
          }
          proTip="OpenAI playground mein 'Fine-tuning' tab pe training data upload karo aur cost estimate dekho before committing. Dataset size, expected training tokens, per-epoch cost — sab upfront calculate karo. Surprise bills se bachao."
        />
      </div>

      {/* Card 2: OpenAI Fine-tuning */}
      <div id="openai-fine-tuning">
        <ConceptCard
          title="OpenAI Fine-tuning — Data, JSONL, Training"
          emoji="🏋️"
          difficulty="advanced"
          whatIsIt="OpenAI managed fine-tuning service deta hai — data upload karo, training run karo, fine-tuned model use karo. Supported models: gpt-4o-mini, gpt-3.5-turbo. Data format: JSONL (JSON Lines). Minimum 10 examples, recommended 50-100+. Training: ek baar, phir fine-tuned model ID se use karo."
          whenToUse={[
            'GPT-4o-mini pe fine-tuning — cost-effective, managed service.',
            'Consistent output format required — medical reports, legal extractions.',
            'Domain-specific language — technical jargon, industry terminology.',
            'Response style — always respond in Hinglish, always use markdown tables.',
            'Classification tasks — consistent categorization without verbose prompts.',
          ]}
          whyUseIt="OpenAI fine-tuning no infrastructure manage karna — API se sab kuch. Fine-tuned gpt-4o-mini often GPT-4o quality pe specific tasks ke liye — much cheaper inference. Shorter prompts bhi possible — fine-tuned model knows the format, no need to re-explain every time."
          howToUse={{
            filename: 'openai-fine-tuning.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';
import * as fs from 'fs';

const openai = new OpenAI();

// ─── Step 1: Prepare training data ───────────────────────────────
interface TrainingExample {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
}

const trainingData: TrainingExample[] = [
  {
    messages: [
      { role: 'system', content: 'You are a Hinglish Node.js tutor.' },
      { role: 'user', content: 'Event loop kya hai?' },
      { role: 'assistant', content: 'Event loop Node.js ka dil hai! Ye single-threaded hone ke bawajood async operations handle karta hai...' },
    ],
  },
  // ... 49 more high-quality examples
];

// Save as JSONL
function saveJSONL(data: TrainingExample[], path: string): void {
  const jsonl = data.map(ex => JSON.stringify(ex)).join('\\n');
  fs.writeFileSync(path, jsonl);
}

// ─── Step 2: Upload training file ─────────────────────────────────
async function uploadTrainingData(filePath: string) {
  const file = fs.createReadStream(filePath);
  const uploadedFile = await openai.files.create({
    file,
    purpose: 'fine-tune',
  });
  console.log('File uploaded:', uploadedFile.id);
  return uploadedFile.id;
}

// ─── Step 3: Create fine-tuning job ───────────────────────────────
async function startFineTuning(fileId: string) {
  const job = await openai.fineTuning.jobs.create({
    training_file: fileId,
    model: 'gpt-4o-mini-2024-07-18',
    hyperparameters: {
      n_epochs: 3,              // training iterations
      batch_size: 'auto',       // let OpenAI optimize
      learning_rate_multiplier: 'auto',
    },
  });
  console.log('Job created:', job.id);
  return job.id;
}

// ─── Step 4: Monitor training ─────────────────────────────────────
async function monitorJob(jobId: string): Promise<string> {
  while (true) {
    const job = await openai.fineTuning.jobs.retrieve(jobId);
    console.log('Status:', job.status, '— Trained:', job.trained_tokens, 'tokens');

    if (job.status === 'succeeded') {
      console.log('Model ready:', job.fine_tuned_model);
      return job.fine_tuned_model!;
    }
    if (job.status === 'failed') {
      throw new Error('Fine-tuning failed: ' + job.error?.message);
    }
    await new Promise(r => setTimeout(r, 30_000)); // check every 30s
  }
}

// ─── Step 5: Use fine-tuned model ─────────────────────────────────
async function useFineTunedModel(modelId: string, prompt: string) {
  const response = await openai.chat.completions.create({
    model: modelId, // e.g., 'ft:gpt-4o-mini:...'
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
}`,
            explanation: 'OpenAI fine-tuning 5 steps: (1) training data JSONL banao, (2) file upload karo, (3) fine-tuning job create karo, (4) training complete hone ka wait karo (30 min - few hours), (5) fine_tuned_model ID use karo. Cost: training tokens + higher inference cost vs base model.',
          }}
          realWorldScenario="Customer service company ne gpt-4o-mini fine-tune kiya 300 resolution examples se. Result: fine-tuned model GPT-4o quality at GPT-4o-mini price for their specific use case. System prompt 500 tokens se 50 tokens ho gaya (no need to re-explain style). Monthly savings: 40%."
          commonMistakes={[
            {
              mistake: 'Bad quality examples training data mein include karna',
              why: 'Fine-tuning model ko "learn from examples" karta hai — galat examples galat behavior seekh ta hai. GIGO: Garbage In, Garbage Out.',
              fix: 'Har training example manually review karo. Quality team se validate karwao. Edge cases include karo. Consistency ensure karo — format, tone, depth sab consistent honi chahiye.',
            },
          ]}
          proTip="Weights & Biases ya OpenAI fine-tuning dashboard se training loss monitor karo. Training loss continuously decrease hona chahiye — plateau ya increase = issue. Validation loss check karo — training loss kam, validation loss badh raha? Overfitting hai — n_epochs kam karo ya zyada data chahiye."
        />
      </div>

      {/* Card 3: LoRA */}
      <div id="lora">
        <ConceptCard
          title="LoRA — Low-Rank Adaptation"
          emoji="🔧"
          difficulty="advanced"
          whatIsIt="LoRA (Low-Rank Adaptation) parameter-efficient fine-tuning technique hai. Original model weights freeze karte hain aur small low-rank matrices (adapters) train karte hain. 7B parameter model ke liye: full fine-tuning = 7B trainable parameters. LoRA ke saath: sirf 10-50M trainable parameters — 100-700x less. Same performance, fraction of compute."
          whenToUse={[
            'Open-source models fine-tune karne hain (LLaMA, Mistral, Phi) — self-hosted.',
            'Consumer GPU pe training — RTX 3090 (24GB) pe 7B model LoRA se possible.',
            'Multiple tasks ke liye alag adapters — base model share karo, adapters swap karo.',
            'Rapid experimentation — adapter train fast hote hain, easily swap karo.',
            'Privacy — data apne server pe rakho, OpenAI ko nahi dena.',
          ]}
          whyUseIt="Full fine-tuning 7B model ke liye: minimum 4x A100 GPUs (4 * $2.5/hour = $10/hour). LoRA: single A100 ya RTX 3090 enough. Training time: hours instead of days. Practical impact: self-hosting possible hai teams ke liye jo OpenAI pe data share nahi kar sakti."
          howToUse={{
            filename: 'lora-training.py',
            language: 'python',
            code: `# LoRA Training with HuggingFace PEFT library
# pip install transformers peft datasets accelerate

from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer
import torch

# ─── 1. Load base model ───────────────────────────────────────────
model_name = "meta-llama/Llama-3.2-3B-Instruct"

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,  # 2x less memory than float32
    device_map="auto",           # auto GPU/CPU placement
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# ─── 2. LoRA Config ───────────────────────────────────────────────
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,              # rank — higher = more parameters, more expressiveness
    lora_alpha=32,     # scaling factor (typically 2x rank)
    lora_dropout=0.1,  # regularization
    target_modules=["q_proj", "v_proj"],  # which layers to add LoRA to
    bias="none"
)

# Wrap model with LoRA
model = get_peft_model(model, lora_config)

# Check trainable params
trainable, total = model.get_nb_trainable_parameters()
print(f"Trainable: {trainable:,} ({100 * trainable / total:.2f}%)")
# Output: Trainable: 5,242,880 (0.15%) — 99.85% frozen!

# ─── 3. Training ─────────────────────────────────────────────────
training_args = TrainingArguments(
    output_dir="./lora-model"
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=2e-4,
    save_steps=100,
    fp16=True,  # mixed precision training
)

trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset,  # your dataset
)
trainer.train()

# ─── 4. Save & Load adapter ───────────────────────────────────────
model.save_pretrained("./my-lora-adapter")
# Load: model = PeftModel.from_pretrained(base_model, "./my-lora-adapter")`,
            explanation: 'LoRA config: r (rank) = adapter matrix size. r=16 typical, r=64 for complex tasks. target_modules: q_proj, v_proj attention layers mein LoRA lagao — usually enough. Trainable parameters: 0.1-1% of total — efficient! Same GPU pe multiple adapters load karo tasks ke liye.',
          }}
          realWorldScenario="Hinglish language model banana tha. LLaMA-3.2-3B base model + 2000 Hinglish conversation examples + LoRA (r=32). Training: RTX 4090 pe 4 ghante. Result: model naturally Hinglish mein respond karta hai bina extensive prompting ke. Cost: $8 electricity + GPU rental. OpenAI fine-tuning se $200+ lagta."
          commonMistakes={[
            {
              mistake: 'r (rank) bahut high set karna',
              why: 'High rank = zyada parameters = overfitting risk + more memory. r=16 most tasks ke liye sufficient hai.',
              fix: 'r=8 ya r=16 se start karo. Only increase agar task complex hai aur quality suboptimal hai. r=64 usually too much for small datasets.',
            },
          ]}
          proTip="Unsloth library LoRA training 2x faster aur 60% less VRAM banati hai compared to vanilla PEFT — specifically optimized kernels. Google Colab free tier pe LLaMA-3.2-1B LoRA fine-tune possible hai Unsloth + QLoRA ke saath. GPU cost: $0 for small models."
        />
      </div>

      {/* Card 4: QLoRA */}
      <div id="qlora">
        <ConceptCard
          title="QLoRA — 4-bit Quantization + LoRA"
          emoji="🗜️"
          difficulty="advanced"
          whatIsIt="QLoRA = Quantized LoRA. Base model ko 4-bit precision mein store karo (NF4 format) — 4x less memory. LoRA adapters float16 mein train karo. Result: 7B model fine-tune karne ke liye VRAM requirement 40GB → 10GB. Google Colab free T4 (16GB) pe 7B model possible. Tim Dettmers et al. 2023 paper."
          whenToUse={[
            'Consumer GPU — RTX 3090 (24GB) pe 13B model fine-tune.',
            'Google Colab free tier — T4 GPU (16GB) pe 7B model.',
            'AWS spot instances — cheaper GPU instances with less VRAM.',
            'Memory constraints — zyada VRAM affordable nahi.',
            'Research experiments — quickly prototype different configs.',
          ]}
          whyUseIt="QLoRA ne LLM fine-tuning democratize kiya — pehle $10K+ GPU setup chahiye tha. Ab Google Colab free tier pe experiment karo. Tradeoff: 4-bit quantization se thoda accuracy loss (1-3%), but usually acceptable. Production ke liye: accuracy benchmark karo, dekhho acceptable hai ya nahi."
          howToUse={{
            filename: 'qlora-training.py',
            language: 'python',
            code: `# QLoRA Training — 7B model on single GPU
# pip install transformers peft datasets accelerate bitsandbytes

from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
import torch

# ─── 4-bit Quantization Config ───────────────────────────────────
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,              # 4-bit quantization
    bnb_4bit_quant_type="nf4",      # NF4 (NormalFloat4) — best for LLMs
    bnb_4bit_compute_dtype=torch.bfloat16,  # compute in bf16
    bnb_4bit_use_double_quant=True,  # double quant for extra memory saving
)

# ─── Load model in 4-bit ─────────────────────────────────────────
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.2-7B-Instruct",
    quantization_config=bnb_config,  # 4-bit!
    device_map="auto"
)

# ─── Prepare for k-bit training ──────────────────────────────────
model = prepare_model_for_kbit_training(model)
# This enables gradient checkpointing, handles quantized layers

# ─── LoRA on top of quantized model ──────────────────────────────
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none"
    task_type="CAUSAL_LM"
)

model = get_peft_model(model, lora_config)

# Memory comparison:
# Full fine-tune 7B: ~56GB VRAM (float32)
# LoRA 7B: ~28GB VRAM (bfloat16)
# QLoRA 7B: ~10GB VRAM (4-bit base + bf16 adapters)
# QLoRA 7B + gradient checkpointing: ~8GB VRAM ✓ (fits T4!)

print("Model ready for QLoRA training on consumer GPU!")`,
            explanation: 'QLoRA: load_in_4bit=True se base model 4-bit mein load hota hai. prepare_model_for_kbit_training se gradient computation setup hota hai. LoRA adapters bfloat16 mein train hote hain. Memory: 7B model 10GB mein — T4 GPU pe comfortable. bitsandbytes library ye sab handle karti hai.',
          }}
          realWorldScenario="Academic researcher ne Mistral-7B pe QLoRA fine-tune kiya medical text classification ke liye — Google Colab free tier pe! 500 labeled examples, 3 epochs, 2 ghante training. Accuracy: 94% on test set vs GPT-4 baseline 91% (GPT-4 cost $0.03/query vs self-hosted $0). Research paper published."
          commonMistakes={[
            {
              mistake: 'bitsandbytes Windows pe install karna',
              why: 'bitsandbytes primarily Linux/Mac ke liye hai. Windows pe issues common hain.',
              fix: 'Google Colab (Linux), RunPod, Lambda Labs — Linux GPU environments use karo. Windows pe: WSL2 ya Docker se Linux environment banao.',
            },
          ]}
          proTip="Unsloth + QLoRA combination: 2x faster training, 60% less VRAM. from unsloth import FastLanguageModel — ek line se optimized model load. Colab free T4 pe: 7B model, 2000 examples, 3 epochs = ~2 hours. Unsloth GitHub pe ready-to-run Colab notebooks hain — duplicate karo aur apna data daal do."
        />
      </div>

      {/* Card 5: Training Data Preparation */}
      <div id="training-data">
        <ConceptCard
          title="Training Data Preparation — Quality Over Quantity"
          emoji="📊"
          difficulty="advanced"
          whatIsIt="Fine-tuning ki quality training data ki quality se directly determine hoti hai. 50 perfect examples 5000 mediocre se better results dete hain. Key principles: consistent formatting, diverse scenarios, accurate outputs, no hallucinations. Data cleaning, augmentation, validation set — sab zaroori steps hain."
          whenToUse={[
            'Data collection: real user interactions, human expert annotations, existing documents.',
            'Data cleaning: remove duplicates, fix inconsistencies, filter low quality.',
            'Augmentation: paraphrase, translate, vary examples — dataset expand karo.',
            'Validation split: 10-20% hold out — training progress measure karo.',
            'Quality review: randomly sample aur manually check — before training run karo.',
          ]}
          whyUseIt="Training data mein ek repeated mistake = model consistently galat behavior seekhta hai. Ek inconsistent format = model confused output deta hai. Data preparation 70% time lena chahiye fine-tuning project mein — model architecture ya hyperparameters se zyada important hai. Ye real-world lesson hai."
          howToUse={{
            filename: 'data-preparation.ts',
            language: 'typescript',
            code: `import * as fs from 'fs';

// ─── Training example interface ───────────────────────────────────
interface TrainingExample {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
}

// ─── Data validation ──────────────────────────────────────────────
function validateExample(example: TrainingExample): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (example.messages.length < 2) issues.push('Too few messages');

  const lastMsg = example.messages[example.messages.length - 1];
  if (lastMsg.role !== 'assistant') issues.push('Last message must be assistant');

  const assistantMsg = example.messages.find(m => m.role === 'assistant');
  if (!assistantMsg) issues.push('No assistant message');
  if (assistantMsg && assistantMsg.content.length < 20) issues.push('Assistant response too short');
  if (assistantMsg && assistantMsg.content.length > 4000) issues.push('Assistant response too long');

  // Check for common quality issues
  const content = assistantMsg?.content ?? '';
  if (content.includes('As an AI language model')) issues.push('Generic AI disclaimer — remove');
  if (content.toLowerCase().includes('i cannot') && content.length < 100) {
    issues.push('Refusal without explanation — improve');
  }

  return { valid: issues.length === 0, issues };
}

// ─── Dataset stats ────────────────────────────────────────────────
function analyzeDataset(examples: TrainingExample[]) {
  const stats = {
    total: examples.length,
    valid: 0,
    invalid: 0,
    avgResponseLength: 0,
    issues: new Map<string, number>(),
  };

  let totalLength = 0;

  for (const ex of examples) {
    const { valid, issues } = validateExample(ex);
    if (valid) stats.valid++;
    else {
      stats.invalid++;
      issues.forEach(issue => {
        stats.issues.set(issue, (stats.issues.get(issue) ?? 0) + 1);
      });
    }

    const assistantMsg = ex.messages.find(m => m.role === 'assistant');
    totalLength += assistantMsg?.content.length ?? 0;
  }

  stats.avgResponseLength = Math.round(totalLength / examples.length);
  return stats;
}

// ─── Save JSONL ───────────────────────────────────────────────────
function saveDataset(examples: TrainingExample[], filePath: string): void {
  const valid = examples.filter(ex => validateExample(ex).valid);
  const jsonl = valid.map(ex => JSON.stringify(ex)).join('\\n');
  fs.writeFileSync(filePath, jsonl, 'utf-8');
  console.log(\`Saved \${valid.length}/\${examples.length} valid examples to \${filePath}\`);
}`,
            explanation: 'Data validation: last message assistant hona chahiye, response reasonable length (20-4000 chars), no generic disclaimers. analyzeDataset se issues identify karo before training. Minimum 50 valid examples — 100+ recommended. Validation split: 80% training, 20% validation.',
          }}
          realWorldScenario="HR tech company ne 1000 training examples collect kiye — 60% poor quality (generic responses, inconsistent format, hallucinated facts). After cleaning: 350 high-quality examples. Fine-tuning result: clean 350 > dirty 1000. Quality review 2 din laga, saved 2 weeks debugging bad model behavior."
          commonMistakes={[
            {
              mistake: 'Poore dataset se test karna — validation set nahi rakhna',
              why: 'Bina validation set ke overfitting detect nahi hoti — model training data memorize karta hai lekin generalize nahi karta.',
              fix: '80/20 split: 80% training, 20% validation. OpenAI fine-tuning API mein validation_file argument hai — use karo. Training loss vs validation loss monitor karo — diverge hone pe overfitting hai.',
            },
          ]}
          proTip="Argilla (open-source) ya LabelStudio human annotation ke liye best tools hain — annotators ko same guidelines dikhate hain, consistency ensure karte hain. GPT-4 se initial drafts generate karo, humans se review + edit — hybrid approach fast aur cost-effective hai quality data collection ke liye."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 16 Quiz — Fine-tuning & PEFT
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Fine-tuning samjhe? Prove karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="fine-tuning" />
      </div>
    </div>
  )
}
