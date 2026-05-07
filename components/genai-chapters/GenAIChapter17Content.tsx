'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'Claude vision API mein image pass karne ke kitne tarike hain?',
    options: [
      {
        text: 'Sirf ek — image URL pass karo',
        correct: false,
        explanation: 'Claude multiple formats support karta hai, sirf URL nahi.',
      },
      {
        text: 'Do tarike: URL (direct link) ya base64 encoded image. Dono content array mein image block ke through pass hote hain.',
        correct: true,
        explanation: 'Bilkul sahi! URL: { type: "url", url: "https://..." }. Base64: { type: "base64", media_type: "image/jpeg", data: "..." }. URL simpler hai public images ke liye. Base64 local/private images ke liye.',
      },
      {
        text: 'Sirf base64 — URL support deprecated hai',
        correct: false,
        explanation: 'Dono formats active hain. URL simpler hai public images ke liye, base64 private files ke liye.',
      },
      {
        text: 'File upload API alag se use karna padta hai',
        correct: false,
        explanation: 'Claude ke messages API mein directly image content block daal sakte hain — alag upload step nahi chahiye.',
      },
    ],
  },
  {
    question: 'Whisper API se speech-to-text ke liye kaunse audio formats supported hain?',
    options: [
      {
        text: 'Sirf WAV format',
        correct: false,
        explanation: 'Whisper multiple formats support karta hai, sirf WAV nahi.',
      },
      {
        text: 'MP3, MP4, M4A, WAV, FLAC, OGG, WebM — multiple common formats',
        correct: true,
        explanation: 'Sahi! Whisper bahut formats support karta hai. Max file size: 25MB. Longer audio ke liye: chunks mein split karo ya whisper-large model locally run karo. Most common: MP3, WAV, M4A (iPhone recordings).',
      },
      {
        text: 'Sirf MP3 aur WAV',
        correct: false,
        explanation: 'Whisper M4A, OGG, FLAC, WebM bhi support karta hai. Quite versatile hai format support mein.',
      },
      {
        text: 'Koi bhi format — Whisper automatic conversion karta hai',
        correct: false,
        explanation: 'Whisper specific formats support karta hai (not all formats). Unsupported format pe API error aata hai.',
      },
    ],
  },
  {
    question: 'DALL-E 3 se text-to-image generate karte waqt "prompt enhancement" kya hota hai?',
    options: [
      {
        text: 'User ka prompt translate hota hai English mein',
        correct: false,
        explanation: 'Translation prompt enhancement nahi hai. Enhancement matlab prompt ki detail improve karna hai.',
      },
      {
        text: 'OpenAI GPT-4 se user ka prompt automatically expand aur improve karta hai — better, more detailed image generate hoti hai',
        correct: true,
        explanation: 'Exactly! DALL-E 3 internally GPT-4 use karta hai user ka prompt rewrite karne ke liye — zyada descriptive, specific. "A cat" → "A fluffy orange tabby cat sitting on a wooden windowsill, soft afternoon sunlight, detailed fur texture". Disable karna chahte ho toh: revised_prompt use karo response mein.',
      },
      {
        text: 'Prompt enhancement sirf n > 1 (multiple images) pe hota hai',
        correct: false,
        explanation: 'Prompt enhancement DALL-E 3 mein default ON hai single image ke liye bhi.',
      },
      {
        text: 'Prompt enhancement accuracy reduce karta hai — hamesha disable karo',
        correct: false,
        explanation: 'Prompt enhancement generally better images produce karta hai. Disable karo sirf jab exact user prompt important ho (branding, specific text).',
      },
    ],
  },
  {
    question: 'Multimodal RAG mein images aur text ko ek saath index karna kyun challenging hai?',
    options: [
      {
        text: 'Images store nahi ho sakti vector databases mein',
        correct: false,
        explanation: 'Images ke embeddings store ho sakte hain vector DBs mein — CLIP jaise models image embeddings generate karte hain.',
      },
      {
        text: 'Images aur text alag embedding spaces mein hote hain — text-only models images query nahi kar sakte. Multimodal embeddings ya image captioning se bridge karna padta hai.',
        correct: true,
        explanation: 'Exactly! Text embedding model images nahi samajhta. Solutions: (1) image captioning se text extract karo phir text embed karo, (2) CLIP jaise multimodal models use karo jo image aur text same space mein embed karte hain. Approach 1 simpler, Approach 2 more capable.',
      },
      {
        text: 'Vector databases images store nahi kar sakti — alag storage chahiye',
        correct: false,
        explanation: 'Vector databases image embeddings store kar sakti hain — raw image storage alag hoti hai, lekin embeddings same vector DB mein ja sakte hain.',
      },
      {
        text: 'Multimodal RAG technically impossible hai',
        correct: false,
        explanation: 'Multimodal RAG definitely possible aur production mein use hota hai — GPT-4V, Claude Vision, aur CLIP embeddings se implement kiya ja sakta hai.',
      },
    ],
  },
  {
    question: 'GPT-4o vs DALL-E 3 — dono "image generation" se related hain, lekin kya fundamental difference hai?',
    options: [
      {
        text: 'Dono same hain — sirf alag names hain',
        correct: false,
        explanation: 'Ye completely alag models hain alag architectures ke saath — ek understand/generate karta hai, doosra create karta hai.',
      },
      {
        text: 'GPT-4o images ko understand/analyze karta hai (vision). DALL-E 3 text description se new images create karta hai (generation). Ulta direction.',
        correct: true,
        explanation: 'Bilkul sahi! GPT-4o/Claude Vision: image INPUT → text OUTPUT (kya hai image mein?). DALL-E 3 / Stable Diffusion: text INPUT → image OUTPUT (description se image banao). Vision = understanding, Image Gen = creation. Alag capabilities, alag use cases.',
      },
      {
        text: 'GPT-4o expensive hai, DALL-E 3 free hai',
        correct: false,
        explanation: 'Pricing comparison ye distinction nahi hai. Fundamental difference direction ka hai — understanding vs creation.',
      },
      {
        text: 'DALL-E 3 zyada accurate hai facts mein',
        correct: false,
        explanation: 'Factual accuracy vision models ka domain hai. DALL-E 3 generation model hai — factual accuracy uska metric nahi hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter17Content() {
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
          Multimodal AI — Text, Images, Audio & Beyond 🎨
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          AI sirf text nahi samajhta — images dekh sakta hai, audio sun sakta hai, images generate kar sakta hai. Multimodal AI ka power uthao apne apps mein.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.3)',
          }}
        >
          <p className="text-[#C4B5FD] text-sm italic">
            &quot;2024 mein AI multimodal ho gaya — text, image, audio, video sab ek model. Developers ke liye ye naya superpower hai.&quot;
          </p>
        </div>
      </div>

      {/* Card 1: Vision Models */}
      <div id="vision-models">
        <ConceptCard
          title="Vision Models — Images Ko Samjhna"
          emoji="👁️"
          difficulty="advanced"
          whatIsIt="Vision language models images aur text dono samajhte hain — kya hai image mein describe karo, charts analyze karo, documents extract karo, screenshots se code generate karo. Major models: Claude 3+ (excellent at documents), GPT-4o (fast, multimodal), Google Gemini (native multimodal). Use case: anything that needs 'look at this image and...'"
          whenToUse={[
            'Document processing — receipts, invoices, forms se data extract karo.',
            'Screenshot to code — UI screenshot se HTML/CSS generate karo.',
            'Chart/graph analysis — data visualization samjhao aur insights do.',
            'Product image categorization — e-commerce catalog automation.',
            'Medical imaging assistance — X-ray, MRI analysis support.',
            'Accessibility — image descriptions for visually impaired.',
          ]}
          whyUseIt="Manual document processing: $15/hour * 8 hours = $120/day per person. Vision AI: $0.01-0.05 per document. 1000 invoices/day → $10-50 AI cost vs $120+ human cost. Beyond cost: 24/7 availability, consistent quality, scale instantly. Vision + LLM = powerful document intelligence."
          howToUse={{
            filename: 'vision-basic.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ─── Image from URL ───────────────────────────────────────────────
async function analyzeImageURL(imageUrl: string, question: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'url', url: imageUrl },
        },
        {
          type: 'text',
          text: question,
        },
      ],
    }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── Image from base64 (local file) ──────────────────────────────
import * as fs from 'fs';
import * as path from 'path';

async function analyzeLocalImage(imagePath: string, question: string): Promise<string> {
  const imageData = fs.readFileSync(imagePath);
  const base64 = imageData.toString('base64');
  const ext = path.extname(imagePath).slice(1).toLowerCase();

  type MediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
  const mediaTypeMap: Record<string, MediaType> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg',
    png: 'image/png', gif: 'image/gif', webp: 'image/webp',
  };
  const mediaType: MediaType = mediaTypeMap[ext] ?? 'image/jpeg';

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: mediaType, data: base64 },
        },
        { type: 'text', text: question },
      ],
    }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// ─── Example usage ────────────────────────────────────────────────
const description = await analyzeImageURL(
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/640px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
  'Is image mein kya hai? Hindi mein batao.'
);
console.log(description);`,
            explanation: 'Claude vision: messages array mein image block (type: "image") aur text block dono dalo. URL ke liye: source.type = "url". Base64 ke liye: source.type = "base64" + media_type + data. Multiple images ek message mein possible — comparison tasks ke liye. claude-opus-4-5 vision ke liye excellent hai.',
          }}
          realWorldScenario="Expense management app ne receipt scanning feature add kiya — user photo click kare, Claude automatically: merchant name, amount, date, category extract kare, expense entry create kare. Manual entry 2 minutes → AI: 5 seconds. User adoption 3x increase. OCR + LLM combination powerful hai."
          commonMistakes={[
            {
              mistake: 'Low resolution images bhejne se poor results',
              why: 'Blurry ya small images mein text readable nahi hota Claude ke liye — extraction fail ya inaccurate.',
              fix: 'Minimum 800x600 pixels, ideally 1200+ for documents. Documents ke liye: high DPI scan. Screenshots ke liye: device native resolution. Image quality directly output quality affect karta hai.',
            },
          ]}
          proTip="Claude ka vision multiple images ek message mein support karta hai — comparison tasks ke liye perfect. 'In dono invoices mein kya differences hain?' — dono images ek message mein bhejo. Before/after comparison, A/B design review, chart series analysis — sab possible."
        />
      </div>

      {/* Card 2: Image Analysis with Claude */}
      <div id="claude-vision">
        <ConceptCard
          title="Claude Vision — Document Analysis Mein Expert"
          emoji="📄"
          difficulty="advanced"
          whatIsIt="Claude vision models especially strong hain complex document analysis mein — multi-column layouts, tables, handwriting, mixed text+images. Use cases: invoice processing, contract review, medical form extraction, research paper analysis. Claude Sonnet/Opus: best for complex documents. Haiku: simple image descriptions, fast."
          whenToUse={[
            'Invoice/receipt processing — structured data extract karo.',
            'Contract review — clauses identify karo, key terms extract karo.',
            'Screenshot analysis — UI debugging, documentation generation.',
            'Chart interpretation — data insights automatically generate karo.',
            'Handwritten notes digitization — reasonably accurate for clean handwriting.',
          ]}
          whyUseIt="Claude document analysis mein GPT-4V se often better hai — especially multi-column PDFs, tables, mixed layouts. Claude hallucination rate lower hai documents pe. 'Document intelligence' use case mein production deployments mein preferred choice hai many enterprises."
          howToUse={{
            filename: 'claude-document-analysis.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';

const client = new Anthropic();

// ─── Invoice Data Extraction ──────────────────────────────────────
interface InvoiceData {
  invoiceNumber: string;
  date: string;
  vendor: string;
  totalAmount: number;
  currency: string;
  lineItems: { description: string; quantity: number; unitPrice: number; total: number }[];
  taxAmount: number;
  dueDate: string;
}

async function extractInvoiceData(imagePath: string): Promise<InvoiceData> {
  const base64 = fs.readFileSync(imagePath).toString('base64');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
        },
        {
          type: 'text',
          text: \`Extract all invoice data from this image.
Return ONLY valid JSON matching this schema:
{
  "invoiceNumber": "string",
  "date": "YYYY-MM-DD",
  "vendor": "string",
  "totalAmount": number,
  "currency": "string",
  "lineItems": [{ "description": "string", "quantity": number, "unitPrice": number, "total": number }],
  "taxAmount": number,
  "dueDate": "YYYY-MM-DD or null"
}
If a field is not visible, use null or 0.\`,
        },
      ],
    }],
  });

  const block = response.content[0];
  const text = block.type === 'text' ? block.text : '{}';

  // Extract JSON from response (in case there's any text around it)
  const jsonMatch = text.match(/\\{[\\s\\S]*\\}/);
  const jsonStr = jsonMatch ? jsonMatch[0] : '{}';
  return JSON.parse(jsonStr) as InvoiceData;
}

// ─── Multi-image Comparison ───────────────────────────────────────
async function compareImages(img1Path: string, img2Path: string, question: string): Promise<string> {
  const [img1, img2] = [img1Path, img2Path].map(p =>
    fs.readFileSync(p).toString('base64')
  );

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: 'image/png', data: img1 } },
        { type: 'image', source: { type: 'base64', media_type: 'image/png', data: img2 } },
        { type: 'text', text: question },
      ],
    }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}`,
            explanation: 'Invoice extraction: structured JSON output force karo prompt se. Claude documents pe excellent hai. Multi-image comparison: ek message mein multiple image blocks — comparison tasks ke liye perfect. JSON parsing: regex se extract karo in case model thoda text add kare JSON ke aagey.',
          }}
          realWorldScenario="Accounting startup ne 50,000 invoices/month process karte waqt Claude vision deploy kiya. Accuracy: 96.5% on structured invoices, 89% on handwritten ones. Cost: $0.012/invoice vs $0.25 manual + software cost. ROI: 95% cost reduction. Edge cases (blurry, unusual layout): human review queue."
          commonMistakes={[
            {
              mistake: 'Vision results bina validation ke database mein save karna',
              why: 'Vision models 96%+ accurate hain lekin 100% nahi — financial data mein 4% error rate significant hai.',
              fix: 'Confidence threshold implement karo — low confidence cases human review ke liye flag karo. Critical fields (amounts) double-check karo rule-based validation se (format, range checks).',
            },
          ]}
          proTip="PDF pe Claude vision use karne ke liye: pdf-lib ya pdfjs-dist se pages ko PNG images mein convert karo, phir each page Claude ke saath process karo. AWS Textract ya Azure Form Recognizer better ho sakte hain pure OCR tasks ke liye — combine karo Claude ke structured extraction ke saath for best results."
        />
      </div>

      {/* Card 3: Speech-to-Text */}
      <div id="speech-to-text">
        <ConceptCard
          title="Speech-to-Text — Whisper API"
          emoji="🎤"
          difficulty="advanced"
          whatIsIt="OpenAI Whisper speech recognition model hai — 99 languages support karta hai, accents handle karta hai, medical/technical terms samajhta hai. API: audio file upload karo, transcript milti hai. Streaming transcription: real-time ke liye. Open-source version: local mein bhi run karo (GPU recommended)."
          whenToUse={[
            'Voice notes to text — meetings, lectures, voice memos.',
            'Customer call transcription — support, sales call analysis.',
            'Podcast/video captioning — automatic subtitles.',
            'Voice commands — hands-free interface.',
            'Multilingual transcription — Hindi, Hinglish, regional accents.',
          ]}
          whyUseIt="Manual transcription: $1-2/minute. Whisper API: $0.006/minute (300x cheaper). Accuracy: 95%+ for clear audio, 85%+ for noisy environments. Hindi aur Hinglish: reasonably good. Combination: Whisper transcript → Claude for summarization, action items, sentiment analysis."
          howToUse={{
            filename: 'whisper-transcription.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';
import * as fs from 'fs';

const openai = new OpenAI();

// ─── Basic Transcription ──────────────────────────────────────────
async function transcribeAudio(audioPath: string): Promise<string> {
  const audioFile = fs.createReadStream(audioPath);

  const transcription = await openai.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-1',
    language: 'hi',        // Hindi — improves accuracy for Hindi content
    // language: 'en',     // English
    // omit language: auto-detect
    response_format: 'text', // or 'json', 'srt', 'vtt'
  });

  return transcription; // returns string when format is 'text'
}

// ─── With timestamps (SRT format) ─────────────────────────────────
async function transcribeWithTimestamps(audioPath: string): Promise<string> {
  const audioFile = fs.createReadStream(audioPath);

  const transcription = await openai.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-1',
    response_format: 'srt', // SubRip format with timestamps
  });

  return transcription; // SRT format string
}

// ─── Verbose JSON (word-level timestamps) ─────────────────────────
async function transcribeVerbose(audioPath: string) {
  const audioFile = fs.createReadStream(audioPath);

  const transcription = await openai.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['word', 'segment'],
  });

  return transcription; // includes words with start/end times
}

// ─── Large audio — split into chunks ──────────────────────────────
// Whisper limit: 25MB per file
// For longer audio: split into 10-minute chunks

// ─── Meeting summarization pipeline ──────────────────────────────
import Anthropic from '@anthropic-ai/sdk';
const claude = new Anthropic();

async function meetingIntelligence(audioPath: string) {
  // Step 1: Transcribe
  const transcript = await transcribeAudio(audioPath);

  // Step 2: Analyze with Claude
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: \`Meeting transcript analyze karo. Return JSON:
{
  "summary": "2-3 line summary",
  "keyDecisions": ["decision 1", ...],
  "actionItems": [{ "task": "...", "owner": "...", "deadline": "..." }],
  "nextSteps": ["step 1", ...]
}

Transcript:
\${transcript}\`,
    }],
  });

  const block = response.content[0];
  return block.type === 'text' ? JSON.parse(block.text) : {};
}`,
            explanation: 'Whisper API: createReadStream se file stream karo, openai.audio.transcriptions.create() call karo. language specify karo better accuracy ke liye (hi for Hindi). response_format: text, json, srt, vtt. Large files: ffmpeg se chunks mein split karo (10 min each). Whisper + Claude = meeting intelligence pipeline.',
          }}
          realWorldScenario="Sales team ne call recording feature add kiya — Whisper transcription + Claude analysis se: automatic summary, key objections, follow-up actions. Manager review time 30 min/call → 5 min/call. Coaching insights: common objections patterns identify kiye, training improved. Revenue +15%."
          commonMistakes={[
            {
              mistake: 'Hindi audio ke liye language parameter nahi dena',
              why: 'Auto-detect sometimes English assume karta hai Hinglish audio ke liye — accuracy drops significantly.',
              fix: 'Hinglish ke liye: language: "hi" set karo. Mixed language audio: language auto-detect better ho sakta hai. Experiment karo apne audio ke saath dono settings pe.',
            },
          ]}
          proTip="Local Whisper (openai/whisper Python package ya faster-whisper) free hai aur offline kaam karta hai — privacy-sensitive audio ke liye ideal. GPU: 10x faster transcription. CPU: slow lekin kaam karta hai. medium ya large-v3 model best accuracy deta hai. Node.js se: child_process se Python script call karo."
        />
      </div>

      {/* Card 4: Text-to-Image */}
      <div id="text-to-image">
        <ConceptCard
          title="Text-to-Image — DALL-E 3 & Stable Diffusion"
          emoji="🎨"
          difficulty="advanced"
          whatIsIt="Text-to-image models natural language description se images generate karte hain. DALL-E 3 (OpenAI): best quality, easy API, prompt enhancement automatic. Stable Diffusion: open-source, self-hosted, fine-tunable, free (GPU cost only). Midjourney: best artistic quality, Discord-based. Use case: product mockups, marketing assets, content creation."
          whenToUse={[
            'Marketing images — social media, blog thumbnails, ad creatives.',
            'Product visualization — concept designs, packaging mockups.',
            'Educational illustrations — diagrams, concept visualizations.',
            'Game assets — backgrounds, characters, icons (prototype stage).',
            'Personalized content — user-specific avatars, customized images.',
          ]}
          whyUseIt="Stock photo: $10-50/image. Custom photo shoot: $500-5000. DALL-E 3: $0.04-0.08/image. Stable Diffusion (self-hosted): ~$0.001/image (GPU cost). Iteration speed: text prompt change karo, new image seconds mein. Creative control: exact scene, style, composition specify karo in natural language."
          howToUse={{
            filename: 'dalle-generation.ts',
            language: 'typescript',
            code: `import OpenAI from 'openai';

const openai = new OpenAI();

// ─── DALL-E 3 Image Generation ────────────────────────────────────
async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,                     // DALL-E 3 supports n=1 only
    size: '1024x1024',        // '1024x1024', '1792x1024', '1024x1792'
    quality: 'standard',      // 'standard' or 'hd' (2x cost)
    style: 'vivid',           // 'vivid' (dramatic) or 'natural' (realistic)
    response_format: 'url',   // 'url' or 'b64_json'
  });

  const imageUrl = response.data[0].url!;
  const revisedPrompt = response.data[0].revised_prompt; // what DALL-E actually used
  console.log('Revised prompt:', revisedPrompt);
  return imageUrl;
}

// ─── Prompt Engineering for Images ───────────────────────────────
function buildPrompt(subject: string, style: string, details: string): string {
  return \`\${subject}. Style: \${style}. Details: \${details}.
High quality, professional, detailed.\`;
}

// Example prompts that work well:
const examples = [
  buildPrompt(
    'A modern Node.js application dashboard',
    'clean minimal UI design, dark theme',
    'showing real-time metrics, charts, blue accent colors'
  ),
  buildPrompt(
    'Indian software developer working late night',
    'realistic photography, cinematic lighting',
    'multiple monitors, coffee cup, Mumbai skyline visible'
  ),
];

// ─── DALL-E 2 Editing (image + mask) ─────────────────────────────
async function editImage(imagePath: string, maskPath: string, prompt: string): Promise<string> {
  const imageStream = require('fs').createReadStream(imagePath);
  const maskStream = require('fs').createReadStream(maskPath);

  const response = await openai.images.edit({
    image: imageStream,
    mask: maskStream,    // transparent areas will be filled
    prompt,
    n: 1,
    size: '1024x1024',
    model: 'dall-e-2',  // edit only works with DALL-E 2
  });

  return response.data[0].url!;
}

// ─── Download generated image ─────────────────────────────────────
async function downloadImage(url: string, savePath: string): Promise<void> {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(url);
  const buffer = await res.buffer();
  require('fs').writeFileSync(savePath, buffer);
}`,
            explanation: 'DALL-E 3: simple API, best quality, prompt enhancement auto (GPT-4 se improve karta hai prompt). size options: square (1024x1024), landscape (1792x1024), portrait (1024x1792). quality: hd for marketing assets worth extra cost. revised_prompt: DALL-E ne actually kya prompt use kiya — interesting learning.',
          }}
          realWorldScenario="Content agency ne DALL-E 3 se blog thumbnail automation kiya — article title se automatic thumbnail generate karta hai. Manual design: 30 min/image. DALL-E 3: 10 seconds, $0.04. Quality: 85% publish-ready without human edit. Editor review sirf outliers ke liye. 20 articles/day = $0.80/day vs $150 designer time."
          commonMistakes={[
            {
              mistake: 'DALL-E se realistic human faces generate karna — copyright/deepfake concerns',
              why: 'Realistic people ki images copyright, consent, aur deepfake issues create kar sakti hain — especially public figures.',
              fix: 'Clearly fictional/stylized characters use karo. Real people ki likeness avoid karo. Terms of Service carefully padho. Generated images mein AI disclosure add karo.',
            },
          ]}
          proTip="Stable Diffusion locally run karna chahte ho? ComfyUI ya AUTOMATIC1111 WebUI use karo — GUI se easy. Node.js se API: stable-diffusion.cpp ya local API server. Best open-source model 2025: FLUX.1 (realistic), SDXL (versatile), Stable Cascade (quality). GPU: RTX 3080+ recommended for good speed."
        />
      </div>

      {/* Card 5: Multimodal RAG */}
      <div id="multimodal-rag">
        <ConceptCard
          title="Multimodal RAG — Images + Text Together"
          emoji="🔮"
          difficulty="advanced"
          whatIsIt="Multimodal RAG text documents ke saath images bhi index karta hai — diagrams, charts, photos, screenshots. User text query kare aur relevant images retrieve hon, ya image upload kare aur similar content dhundhe. Approaches: (1) Image captioning → text embed, (2) CLIP multimodal embeddings (same space for text+image), (3) Vision LLM at query time."
          whenToUse={[
            'Technical documentation — diagrams + text together search karo.',
            'E-commerce — product images + description semantic search.',
            'Medical records — X-rays + clinical notes together.',
            'Legal discovery — documents + photos in same search.',
            'Research papers — figures + text unified retrieval.',
          ]}
          whyUseIt="Text-only RAG technical manuals mein fail karta hai jab answer ek diagram mein hai. Multimodal RAG diagram bhi retrieve kar sakta hai. E-commerce: user 'blue casual shirt like this photo' search kare — image + text hybrid search. Future of enterprise search: everything searchable, regardless of format."
          howToUse={{
            filename: 'multimodal-rag.ts',
            language: 'typescript',
            code: `import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import * as fs from 'fs';

const claude = new Anthropic();
const openai = new OpenAI();

// ─── Approach 1: Image Captioning → Text Embedding ────────────────
interface MultimodalDocument {
  id: string;
  type: 'text' | 'image';
  content: string;       // text content or file path
  caption?: string;      // for images: auto-generated caption
  embedding?: number[];
}

// Step 1: Generate caption for image
async function captionImage(imagePath: string): Promise<string> {
  const base64 = fs.readFileSync(imagePath).toString('base64');

  const response = await claude.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
        },
        {
          type: 'text',
          text: 'Describe this image in detail for search purposes. Include: main subject, colors, text visible, layout, context. Be specific and thorough.',
        },
      ],
    }],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// Step 2: Embed caption as text
async function embedDocument(doc: MultimodalDocument): Promise<number[]> {
  const textToEmbed = doc.type === 'image' ? (doc.caption ?? '') : doc.content;

  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: textToEmbed,
  });
  return res.data[0].embedding;
}

// ─── Approach 2: CLIP Embeddings (text + image same space) ────────
// Using @xenova/transformers (local CLIP)
// Note: requires ~600MB model download
async function clipEmbed(input: string | Buffer): Promise<number[]> {
  // In real implementation:
  // const { pipeline } = await import('@xenova/transformers');
  // const extractor = await pipeline('feature-extraction', 'Xenova/clip-vit-base-patch32');
  // return extractor(input, { pooling: 'mean', normalize: true });
  console.log('CLIP embedding for:', typeof input === 'string' ? input : 'image buffer');
  return new Array(512).fill(0); // mock 512-dim CLIP embedding
}

// ─── Multimodal Query ─────────────────────────────────────────────
async function multimodalSearch(
  query: string | string, // text or image path
  documents: MultimodalDocument[],
  topK = 3
): Promise<MultimodalDocument[]> {
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const qVec = queryEmbedding.data[0].embedding;

  // Cosine similarity
  const scored = documents
    .filter(d => d.embedding)
    .map(d => ({
      doc: d,
      score: cosineSim(qVec, d.embedding!),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map(s => s.doc);
}

function cosineSim(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}`,
            explanation: 'Approach 1 (simpler): image caption generate karo → text embed karo → regular text RAG. Approach 2 (powerful): CLIP se text + image same embedding space mein — image-to-image ya text-to-image search possible. For most production cases, captioning approach simpler aur sufficient hai.',
          }}
          realWorldScenario="Architecture firm ne building documentation system banaya — floor plans (images), specifications (PDFs), photos (JPEG) sab ek system mein. Architect search kare 'kitchen ventilation requirements' — text chunks + relevant diagram images retrieve hote hain. Review time 50% kam hua."
          commonMistakes={[
            {
              mistake: 'Har image caption generate karna at query time',
              why: 'Query time pe captioning bahut slow hai — 2-5 seconds per image. 1000 images = infeasible.',
              fix: 'Ingestion time pe captions generate karo (offline). Store karo database mein. Query time pe sirf text similarity — fast. Caption quality index at indexing time.',
            },
          ]}
          proTip="LlamaIndex ka MultiModalVectorStoreIndex multimodal RAG ko significantly simplify karta hai — built-in image captioning, CLIP embeddings, aur multimodal query engine. Production mein: Weaviate aur Chroma native multimodal embedding support karte hain via CLIP integration — no custom code needed."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 17 Quiz — Multimodal AI
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye. Multimodal samjha? Check karo!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="multimodal-ai" />
      </div>
    </div>
  )
}
