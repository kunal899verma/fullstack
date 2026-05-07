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
          Fine-tuning sunke lagta hai bahut powerful tool hai. Hai — lekin bahut baar overkill bhi hai. 90% cases mein better prompting + RAG + few-shot se kaam ho jaata hai. Fine-tuning tabhi karo jab ye sab fail ho jaaye. Aaj sahi decision framework seekhte hain — aur jab zarurat ho tab LoRA, QLoRA, OpenAI fine-tuning bhi.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <p className="text-[#FDE68A] text-sm italic">
            &quot;Fine-tuning last resort hai, prompt engineering first. Seedha fine-tuning pe jump karna — ye sabse common aur sabse expensive galti hai.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: Decision Framework */}
      <div id="decision-framework">
        <ConceptCard
          title="Kab Fine-tune Karo? — Decision Framework"
          emoji="🤔"
          difficulty="advanced"
          whatIsIt="Yahan ek real baat karte hain. Fine-tuning, RAG, aur prompt engineering — teeno alag cheezein hain, alag problems solve karte hain. Prompt engineering: model ke behavior, tone, format ko instructions se change karna. RAG: dynamic ya private data chahiye jab. Fine-tuning: consistent specialized output jab examples se demonstrate karna ho — legal extraction, medical coding. Order of cost aur complexity: PE < RAG < Fine-tuning. Aur usi order mein try karo."
          whenToUse={[
            'Prompt engineering pehle: task sirf instructions se solve hota hai? Use karo.',
            'RAG: dynamic data, company docs, real-time info chahiye? Use karo.',
            'Fine-tuning: specialized domain (legal, medical), very consistent output format, task requires examples not just instructions.',
            'Fine-tuning avoid karo: data less than 50 examples, task dynamic data pe depend karta hai, prompt engineering already kaam karta hai.',
          ]}
          whyUseIt="Fine-tuning ki real cost samjho — sirf training cost nahi, data collection, annotation, maintenance, aur broken workflows bhi. OpenAI fine-tuning: $0.008/1K training tokens + inference cost jo base model se zyada hoti hai. Self-hosted LoRA: GPU rental + time + expertise. Ab honestly socho — 80% cases mein better prompt engineering ya RAG se kaam ho jaata hai. Fine-tuning tab justify hota hai jab baaki sab genuinely fail ho jaaye."
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
            explanation: 'Ye decision tree ek principle follow karta hai — simplest solution pehle. Prompt engineering kaam karta hai? Bas karo, wahi best hai. Dynamic ya private data chahiye? RAG. Consistent specialized format chahiye aur kuch aur kaam nahi kiya? Tab fine-tuning. Har step pe prove karo ki agle level ki zarurat hai — upfront complexity add mat karo.',
          }}
          realWorldScenario="Ek legaltech company ne contract analysis ke liye seedha fine-tuning plan bana liya tha — 3 months ka roadmap, GPU budget approved. Phir kisi ne question kiya: 'Pehle RAG try kiya?' Nahi kiya tha. RAG implement kiya — 2 hafte mein. Result: contract retrieval ke liye RAG, extraction ke liye simple structured prompt. Fine-tuning ki zarurat hi nahi padi. Saved: $50K+ training cost + 3 months engineering time. Lesson: decision framework mein seedha fine-tuning pe jump karna sबसे expensive shortcut hai."
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
          proTip="Commit karne se pehle OpenAI playground mein 'Fine-tuning' tab kholo — training data upload karo, cost estimate dekho. Dataset size, training tokens, per-epoch cost — sab upfront dikhaata hai. Surprise bill se bachne ka yahi tarika hai. Aur ek aur baat: fine-tuning ka faisla karne se pehle ek din prompt engineering experiments run karo. Agar wo 80% result deta hai — bas kaafi hai production ke liye."
        />
      </div>

      {/* Card 2: OpenAI Fine-tuning */}
      <div id="openai-fine-tuning">
        <ConceptCard
          title="OpenAI Fine-tuning — Data, JSONL, Training"
          emoji="🏋️"
          difficulty="advanced"
          whatIsIt="OpenAI ka managed fine-tuning service: tumhara kaam sirf data banana aur upload karna hai — baaki sab unka server handle karta hai. Supported models: gpt-4o-mini, gpt-3.5-turbo. Format: JSONL (JSON Lines), ek line ek training example. Minimum 10 examples, lekin seriously — 50-100 quality examples se shuru karo. Training ke baad ek fine_tuned_model ID milti hai, wohi tumhara custom model hai. No infrastructure, no GPU, no headache."
          whenToUse={[
            'GPT-4o-mini pe fine-tuning — cost-effective, managed service.',
            'Consistent output format required — medical reports, legal extractions.',
            'Domain-specific language — technical jargon, industry terminology.',
            'Response style — always respond in Hinglish, always use markdown tables.',
            'Classification tasks — consistent categorization without verbose prompts.',
          ]}
          whyUseIt="Suno ye carefully — fine-tuned gpt-4o-mini tumhare specific task pe GPT-4o jaisi quality de sakta hai, GPT-4o-mini ki price pe. Ye magic nahi, ye specialization hai. Aur ek bonus: system prompt 500 tokens se ghat ke 50 tokens ho jaata hai — fine-tuned model format already jaanta hai, baar baar explain karne ki zarurat nahi. Infrastructure zero. Sab kuch OpenAI API se. Ye convenience real hai."
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
            explanation: 'Ye 5-step process clean hai — JSONL banao, upload karo, job create karo, training ka wait karo (30 min se few hours), aur fine_tuned_model ID se call karo. Ek important baat: training status check karte waqt while(true) loop mein sleep(30s) use kiya hai — webhook-based notification zyada production-grade hoti hai, lekin small scripts ke liye polling theek hai. Cost: training tokens + inference cost jo base model se thoda zyada hoti hai.',
          }}
          realWorldScenario="Customer service company — 300 resolution examples, gpt-4o-mini fine-tune kiya. Pehle sochte the GPT-4o chahiye quality ke liye. Fine-tune ke baad? Unka specific task pe fine-tuned mini ne GPT-4o ko match kiya — at one-tenth the inference cost. System prompt 500 tokens tha, ab 50 tokens hai — model format jaanta hai. Monthly API cost: 40% neeche. Ye real ROI hai fine-tuning ka, jab sahi jagah use ho."
          commonMistakes={[
            {
              mistake: 'Bad quality examples training data mein include karna',
              why: 'Fine-tuning model ko "learn from examples" karta hai — galat examples galat behavior seekh ta hai. GIGO: Garbage In, Garbage Out.',
              fix: 'Har training example manually review karo. Quality team se validate karwao. Edge cases include karo. Consistency ensure karo — format, tone, depth sab consistent honi chahiye.',
            },
          ]}
          proTip="Training loss graph dhyan se dekho — continuously decrease hona chahiye. Plateau ya spike = kuch gadbad hai data ya hyperparameters mein. Ab asli red flag: training loss gir raha hai lekin validation loss badh raha hai? Overfitting ho rahi hai — model training data memorize kar raha hai, generalize nahi. Fix: n_epochs kam karo, ya zyada diverse data chahiye. Weights & Biases ya OpenAI dashboard dono ye clearly dikhate hain."
        />
      </div>

      {/* Card 3: LoRA */}
      <div id="lora">
        <ConceptCard
          title="LoRA — Low-Rank Adaptation"
          emoji="🔧"
          difficulty="advanced"
          whatIsIt="LoRA ka idea genius hai — seedha seedha samjhao toh: full fine-tuning mein poore model ke weights change hote hain, 7B model = 7B trainable parameters, bahut GPU RAM chahiye. LoRA kehta hai: original weights freeze karo, unke saath sirf chhoti low-rank matrices (adapters) attach karo aur unhe train karo. Result: 7B model mein sirf 10-50M trainable parameters — 100-700x less. Kaam same, cost fraction. Ye parameter-efficient fine-tuning hai."
          whenToUse={[
            'Open-source models fine-tune karne hain (LLaMA, Mistral, Phi) — self-hosted.',
            'Consumer GPU pe training — RTX 3090 (24GB) pe 7B model LoRA se possible.',
            'Multiple tasks ke liye alag adapters — base model share karo, adapters swap karo.',
            'Rapid experimentation — adapter train fast hote hain, easily swap karo.',
            'Privacy — data apne server pe rakho, OpenAI ko nahi dena.',
          ]}
          whyUseIt="Full fine-tuning 7B model ke liye minimum 4x A100 GPUs = $10/hour. LoRA ke saath: single A100 ya RTX 3090 enough. Training time: days se hours. Practical impact — sensitive data wali companies jo OpenAI ko data share nahi kar sakti, wo apna model khud train kar sakti hain. Privacy + cost + control — teeno milte hain LoRA se."
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
            explanation: 'r (rank) matlab adapter matrix ka size — r=16 zyatar tasks ke liye theek hai, r=64 complex ke liye. target_modules: q_proj, v_proj pe LoRA lagana usually kaafi hota hai. Output mein dekho trainable parameters: 0.15% — matlab 99.85% model frozen hai. Ye efficiency hai. Ek base model pe multiple adapters bana sakte ho — alag tasks ke liye alag adapters, swap karo on the fly.',
          }}
          realWorldScenario="Ek team Hinglish AI tutor banana chahti thi. LLaMA-3.2-3B base model liya, 2000 Hinglish conversation examples banaye, LoRA r=32 se train kiya — RTX 4090 pe 4 ghante mein done. Result: model bina heavy prompting ke naturally Hinglish mein respond karta hai. Total cost: $8 electricity + GPU rental. OpenAI ke through same cheez karte? $200+ training + ongoing higher inference cost. LoRA ne khud apne servers pe ye possible banaya."
          commonMistakes={[
            {
              mistake: 'r (rank) bahut high set karna',
              why: 'High rank = zyada parameters = overfitting risk + more memory. r=16 most tasks ke liye sufficient hai.',
              fix: 'r=8 ya r=16 se start karo. Only increase agar task complex hai aur quality suboptimal hai. r=64 usually too much for small datasets.',
            },
          ]}
          proTip="Unsloth library try karo — vanilla PEFT se 2x faster training, 60% less VRAM. Specially optimized kernels hain. Matlab Google Colab free tier pe bhi LLaMA-3.2-1B LoRA fine-tune ho sakta hai. GPU cost: zero. Unsloth ke GitHub pe ready-made Colab notebooks hain — duplicate karo, apna data dalo, run karo. Pehle experiment ke liye perfect starting point hai."
        />
      </div>

      {/* Card 4: QLoRA */}
      <div id="qlora">
        <ConceptCard
          title="QLoRA — 4-bit Quantization + LoRA"
          emoji="🗜️"
          difficulty="advanced"
          whatIsIt="QLoRA = Quantized LoRA — ye LoRA ka power-up hai. Base model ko 4-bit precision (NF4 format) mein store karo, 4x less memory. LoRA adapters float16 mein train karo as usual. Combine karo toh: 7B model fine-tune karne ke liye VRAM 40GB se ghat ke 10GB ho jaati hai. Google Colab free T4 GPU (16GB VRAM) pe 7B model ka fine-tuning — ye QLoRA ne possible banaya. Tim Dettmers et al. 2023 paper — ek game-changer."
          whenToUse={[
            'Consumer GPU — RTX 3090 (24GB) pe 13B model fine-tune.',
            'Google Colab free tier — T4 GPU (16GB) pe 7B model.',
            'AWS spot instances — cheaper GPU instances with less VRAM.',
            'Memory constraints — zyada VRAM affordable nahi.',
            'Research experiments — quickly prototype different configs.',
          ]}
          whyUseIt="QLoRA ne LLM fine-tuning democratize kiya — literally. Pehle $10K+ GPU setup chahiye tha. Ab Google Colab free tier pe experiment karo. Haan, 4-bit quantization se thoda accuracy loss hota hai (1-3%), lekin zyatar production use cases mein ye acceptable hai. Production ke liye? Benchmark karo — apne specific task pe quality compare karo full precision se. Phir decide karo tradeoff worth hai ya nahi."
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
            explanation: 'BitsAndBytesConfig: load_in_4bit=True — base model NF4 format mein load hota hai, 4x kam memory. prepare_model_for_kbit_training zaruri hai — gradient checkpointing aur quantized layer handling setup karta hai. LoRA adapters upar se bfloat16 mein train hote hain. Final memory: 7B model ~10GB — T4 GPU pe aaram se fit. Comments mein memory comparison dekho — numbers real hain.',
          }}
          realWorldScenario="Ek academic researcher ne Mistral-7B pe QLoRA fine-tune kiya — medical text classification ke liye, Google Colab free tier pe. 500 labeled examples, 3 epochs, 2 ghante training. Accuracy: 94% test set pe. GPT-4 baseline? 91% — aur $0.03/query cost tha. Self-hosted after QLoRA: effectively $0/query (GPU amortized). Research paper publish hua. Ye story repeat hoti hai — sahi tool sahi jagah."
          commonMistakes={[
            {
              mistake: 'bitsandbytes Windows pe install karna',
              why: 'bitsandbytes primarily Linux/Mac ke liye hai. Windows pe issues common hain.',
              fix: 'Google Colab (Linux), RunPod, Lambda Labs — Linux GPU environments use karo. Windows pe: WSL2 ya Docker se Linux environment banao.',
            },
          ]}
          proTip="Unsloth + QLoRA = best combo for beginners. from unsloth import FastLanguageModel — ek line mein optimized model. Colab free T4 pe: 7B model, 2000 examples, 3 epochs = ~2 ghante. Unsloth GitHub kholo, Colab notebook duplicate karo, apna data replace karo — itna hi kaam hai. Pehle QLoRA experiment ke liye koi better starting point nahi hai."
        />
      </div>

      {/* Card 5: Training Data Preparation */}
      <div id="training-data">
        <ConceptCard
          title="Training Data Preparation — Quality Over Quantity"
          emoji="📊"
          difficulty="advanced"
          whatIsIt="Ye sunlo carefully — fine-tuning mein sabse zyada important cheez model architecture ya hyperparameters nahi hai, training data quality hai. 50 perfect examples 5000 mediocre se better results dete hain. GIGO principle: Garbage In, Garbage Out. Key principles: consistent formatting, diverse real scenarios, accurate outputs, zero hallucinated content. Data cleaning, augmentation, aur validation split — ye optional nahi hain."
          whenToUse={[
            'Data collection: real user interactions, human expert annotations, existing documents.',
            'Data cleaning: remove duplicates, fix inconsistencies, filter low quality.',
            'Augmentation: paraphrase, translate, vary examples — dataset expand karo.',
            'Validation split: 10-20% hold out — training progress measure karo.',
            'Quality review: randomly sample aur manually check — before training run karo.',
          ]}
          whyUseIt="Ek repeated mistake training data mein = model consistently wahi galti karta hai inference mein. Ek inconsistent format = model kabhi markdown, kabhi plain text, kabhi JSON — confused output. Real-world truth: data preparation 70% time leni chahiye ek fine-tuning project mein. Model architecture ya hyperparameter tuning pe nahi. Ye teams jo fast ship karte hain unka secret hai."
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
            explanation: 'validateExample function practical rules check karta hai — last message assistant hona chahiye, response reasonable length (20-4000 chars), generic disclaimers nahi hone chahiye. analyzeDataset se training se pehle issues identify karo. Minimum 50 valid examples — 100+ recommended. 80/20 split: 80% training, 20% validation. Ye code actual quality gate hai — is step ko skip mat karo.',
          }}
          realWorldScenario="HR tech company ne 1000 training examples collect kiye. Training shuru karne se pehle kisi ne audit kiya — 60% poor quality tha: generic responses, inconsistent format, kuch mein hallucinated facts. After cleaning: 350 high-quality examples rahi. Fine-tuning result: clean 350 examples ne dirty 1000 se better model diya. Data review mein 2 din lage. Baad mein bad model behavior debug karne mein 2 hafte nahi lage. Do the math."
          commonMistakes={[
            {
              mistake: 'Poore dataset se test karna — validation set nahi rakhna',
              why: 'Bina validation set ke overfitting detect nahi hoti — model training data memorize karta hai lekin generalize nahi karta.',
              fix: '80/20 split: 80% training, 20% validation. OpenAI fine-tuning API mein validation_file argument hai — use karo. Training loss vs validation loss monitor karo — diverge hone pe overfitting hai.',
            },
          ]}
          proTip="Annotation team ke liye Argilla ya LabelStudio use karo — sab annotators ko same guidelines milti hain, consistency ensure hoti hai. Ek smart hack: GPT-4 se initial drafts generate karo, humans se review + edit karo. Ye hybrid approach pure human annotation se 3x fast hai aur pure AI se zyada accurate hai. Quality data collection ka yahi sahi tarika hai production mein."
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
