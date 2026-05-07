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

// ── Diagram ───────────────────────────────────────────────────────────────────

function MultimodalDiagram() {
  const inputs = [
    { label: 'Text Input', sublabel: 'Prompts, instructions, documents', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '📝' },
    { label: 'Image Input', sublabel: 'CLIP, GPT-4V, Claude Vision — visual understanding', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🖼️' },
    { label: 'Audio Input', sublabel: 'Whisper — speech-to-text, any language', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', icon: '🎙️' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Multimodal AI — Inputs → Model → Output</p>
      <div className="max-w-lg mx-auto">
        <div className="space-y-2 mb-3">
          {inputs.map((item, i) => (
            <div key={i} className="rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓ all modalities fused</span></div>
        <div className="rounded-xl px-5 py-4 flex items-center gap-4 my-2" style={{ background: 'rgba(249,115,22,0.15)', border: '2px solid rgba(249,115,22,0.5)' }}>
          <span className="text-2xl">🤖</span>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: '#F97316' }}>Multimodal Model</p>
            <p className="text-xs text-[#71717A] mt-0.5">GPT-4o · Claude 3+ · Gemini — process all inputs together</p>
          </div>
        </div>
        <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>
        <div className="rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }}>
          <span className="text-xl">💬</span>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: '#7C3AED' }}>Text Response</p>
            <p className="text-xs text-[#71717A] mt-0.5">Extracted data, insights, captions, transcripts, analysis</p>
          </div>
        </div>
      </div>
    </div>
  )
}

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
          Ek zamana tha jab AI sirf text samjhta tha. Ab? Claude ek invoice ki photo dekh ke data extract karta hai. Whisper Hindi mein baat sun ke transcript banata hai. DALL-E prompt se image create karta hai. Multimodal matlab AI ke haath aur aankhein bhi mil gayi — developers ke liye naye products banana possible hua hai jo pehle imaginable nahi the.
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.3)',
          }}
        >
          <p className="text-[#C4B5FD] text-sm italic">
            &quot;Multimodal AI ne sirf capabilities nahi badhe — poori product categories create ho gayi. Jo developer ye seekhega, woh products banana shuru karega jo competitors soch bhi nahi rahe.&quot;
          </p>
        </div>
      </div>

      <MultimodalDiagram />

      {/* Card 1: Vision Models */}
      <div id="vision-models">
        <ConceptCard
          title="Vision Models — Images Ko Samjhna"
          emoji="👁️"
          difficulty="advanced"
          whatIsIt="Vision language models — ye AI ki aankhein hain. Image aur text dono ek saath samajhte hain. Practical use: invoice photo se data extract karo, chart analyze karke insights do, screenshot se code generate karo, UI design dekh ke accessibility issues batao. Major models: Claude 3+ documents mein exceptional hai, GPT-4o fast aur multimodal hai, Gemini native multimodal hai. Simple rule: agar kisi kaam ke liye 'is image mein kya hai' sawaal ho — vision model ka kaam hai."
          whenToUse={[
            'Document processing — receipts, invoices, forms se data extract karo.',
            'Screenshot to code — UI screenshot se HTML/CSS generate karo.',
            'Chart/graph analysis — data visualization samjhao aur insights do.',
            'Product image categorization — e-commerce catalog automation.',
            'Medical imaging assistance — X-ray, MRI analysis support.',
            'Accessibility — image descriptions for visually impaired.',
          ]}
          whyUseIt="Numbers dekho: manual document processing $15/hour, 8 hours/day = $120/day per person. Vision AI: $0.01-0.05 per document. 1000 invoices/day — $10-50 AI cost vs $120+ human cost. Aur sirf cost nahi: 24/7 availability, consistent quality, instant scale. Ek developer ek din mein vision feature add kare = ek data entry person replaced. Ye leverage hai."
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
            explanation: 'Pattern simple hai — messages array mein image block (type: "image") aur text block dono dalo. URL ke liye source.type = "url", local file ke liye source.type = "base64" + media_type + data. Ek important baat: multiple images ek hi message mein bhej sakte ho — comparison tasks ke liye perfect. "In dono designs mein kya fark hai?" — dono images, ek call.',
          }}
          realWorldScenario="Expense management app ne receipt scanning feature add kiya — user phone se photo khinchta hai, Claude automatically: merchant name, amount, date, category extract karta hai, expense entry create ho jaati hai. Manual entry: 2 minute. AI: 5 seconds. Ek feature add kiya, user adoption 3x badh gaya. Ye tab hota hai jab right tool right problem pe lagao."
          commonMistakes={[
            {
              mistake: 'Low resolution images bhejne se poor results',
              why: 'Blurry ya small images mein text readable nahi hota Claude ke liye — extraction fail ya inaccurate.',
              fix: 'Minimum 800x600 pixels, ideally 1200+ for documents. Documents ke liye: high DPI scan. Screenshots ke liye: device native resolution. Image quality directly output quality affect karta hai.',
            },
          ]}
          proTip="Ek underrated capability: Claude ke ek message mein multiple images bhej sakte ho. Before/after comparison, A/B design review, invoice comparison, chart series — sab ek call mein. 'In dono screenshots mein UI differences kya hain?' — dono bhejo, ek response. Ye feature log use hi nahi karte, lekin bahut powerful hai."
        />
      </div>

      {/* Card 2: Image Analysis with Claude */}
      <div id="claude-vision">
        <ConceptCard
          title="Claude Vision — Document Analysis Mein Expert"
          emoji="📄"
          difficulty="advanced"
          whatIsIt="Claude ka vision complex documents mein especially strong hai — multi-column PDFs, tables, handwriting, mixed text+images wale documents. Competitors se alag kya hai? Claude hallucination rate documents pe comparatively low hai. Real use cases: invoice processing, contract clause extraction, medical form reading, research paper analysis. Model select karo task ke hisaab se: Sonnet/Opus complex documents ke liye, Haiku simple image descriptions ke liye."
          whenToUse={[
            'Invoice/receipt processing — structured data extract karo.',
            'Contract review — clauses identify karo, key terms extract karo.',
            'Screenshot analysis — UI debugging, documentation generation.',
            'Chart interpretation — data insights automatically generate karo.',
            'Handwritten notes digitization — reasonably accurate for clean handwriting.',
          ]}
          whyUseIt="Ek honest comparison: Claude document analysis mein GPT-4V se often better kaam karta hai — especially multi-column layouts, dense tables, mixed content. Hallucination rate lower hai documents pe — jo financial aur legal use cases mein critical hai. Enterprises document intelligence ke liye production mein Claude prefer karte hain. Benchmark karo apne documents pe — lekin Claude se shuru karo."
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
            explanation: 'Invoice extraction ka key trick: prompt mein exact JSON schema do, "Return ONLY valid JSON" explicitly kaho. Claude documents pe excellent hai lekin strict output format force karo. JSON parsing: regex se extract karo — model kabhi kabhi thoda text add karta hai JSON ke aagey ya baad mein, regex gracefully handle karta hai. Multi-image comparison: ek message mein multiple blocks — 2 images, ek call.',
          }}
          realWorldScenario="Accounting startup: 50,000 invoices/month process karna tha. Claude vision deploy kiya. Results: 96.5% accuracy structured invoices pe, 89% handwritten pe. Cost: $0.012/invoice vs $0.25 manual + software cost — 95% reduction. Edge cases (blurry images, unusual layouts) automatically human review queue mein jaate hain. Ye hybrid approach hai — AI volume handle kare, humans exceptions handle karein."
          commonMistakes={[
            {
              mistake: 'Vision results bina validation ke database mein save karna',
              why: 'Vision models 96%+ accurate hain lekin 100% nahi — financial data mein 4% error rate significant hai.',
              fix: 'Confidence threshold implement karo — low confidence cases human review ke liye flag karo. Critical fields (amounts) double-check karo rule-based validation se (format, range checks).',
            },
          ]}
          proTip="PDF pages directly nahi bhej sakte — pehle PNG mein convert karo (pdf-lib ya pdfjs-dist se), phir each page Claude ko bhejo. Pure OCR tasks ke liye AWS Textract ya Azure Form Recognizer better ho sakte hain. Best combination: Textract se raw text extract karo, Claude se structure aur meaning samjhao. Ek tool sab nahi karta — combine karo."
        />
      </div>

      {/* Card 3: Speech-to-Text */}
      <div id="speech-to-text">
        <ConceptCard
          title="Speech-to-Text — Whisper API"
          emoji="🎤"
          difficulty="advanced"
          whatIsIt="Whisper OpenAI ka speech recognition model hai — 99 languages, accents handle karta hai, medical aur technical terms samajhta hai. API bahut simple hai: audio file upload karo, transcript milti hai. Hinglish? Reasonably well kaam karta hai. Streaming: real-time ke liye. Open-source version bhi available hai — local mein run karo privacy ke liye. Ek powerful combination: Whisper transcript → Claude analysis."
          whenToUse={[
            'Voice notes to text — meetings, lectures, voice memos.',
            'Customer call transcription — support, sales call analysis.',
            'Podcast/video captioning — automatic subtitles.',
            'Voice commands — hands-free interface.',
            'Multilingual transcription — Hindi, Hinglish, regional accents.',
          ]}
          whyUseIt="Numbers: manual transcription $1-2/minute, Whisper API $0.006/minute — 300x cheaper. Accuracy: 95%+ clear audio, 85%+ noisy environments. Hinglish aur Hindi: reasonably good, language parameter set karo. Asli value: Whisper + Claude pipeline — meeting transcript → automatic summary, action items, decisions. Ye ek combination hai jo real productivity impact deta hai."
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
            explanation: 'Whisper API: file stream karo, language explicitly set karo (hi for Hindi — auto-detect kabhi kabhi Hinglish ko English maanta hai). response_format options: text (simple string), srt (timestamps ke saath), verbose_json (word-level timestamps). Large files ke liye 25MB limit hai — ffmpeg se 10-minute chunks mein split karo. Whisper + Claude pipeline: transcript → structured analysis — meetingIntelligence function exactly ye karta hai.',
          }}
          realWorldScenario="Sales team ne call recording feature add kiya. Whisper transcription + Claude analysis: automatic summary, key objections identified, follow-up actions listed. Manager review time: 30 min/call → 5 min/call. Ek bonus: Claude ne 3 months ke calls mein common objection patterns identify kiye — training material improve hua. Revenue 15% badha. Ek feature, multiple downstream benefits — ye AI ka real compounding effect hai."
          commonMistakes={[
            {
              mistake: 'Hindi audio ke liye language parameter nahi dena',
              why: 'Auto-detect sometimes English assume karta hai Hinglish audio ke liye — accuracy drops significantly.',
              fix: 'Hinglish ke liye: language: "hi" set karo. Mixed language audio: language auto-detect better ho sakta hai. Experiment karo apne audio ke saath dono settings pe.',
            },
          ]}
          proTip="Sensitive audio? Local Whisper use karo — openai/whisper Python package ya faster-whisper, free aur offline. GPU pe 10x faster, CPU pe slow lekin kaam karta hai. Accuracy ke liye: large-v3 model best hai. Node.js se: child_process se Python script call karo ya local API expose karo. Privacy-critical audio ke liye cloud API use karna hi nahi chahiye."
        />
      </div>

      {/* Card 4: Text-to-Image */}
      <div id="text-to-image">
        <ConceptCard
          title="Text-to-Image — DALL-E 3 & Stable Diffusion"
          emoji="🎨"
          difficulty="advanced"
          whatIsIt="Text-to-image: natural language description do, model image create karta hai. DALL-E 3: best quality + easiest API, automatic prompt enhancement (GPT-4 internally improve karta hai tumhara prompt). Stable Diffusion: open-source, self-hosted, fine-tunable — GPU cost hi hai. Midjourney: artistic quality mein unmatched, lekin Discord-based. Developers ke liye DALL-E 3 se shuru karo — integration fastest hai."
          whenToUse={[
            'Marketing images — social media, blog thumbnails, ad creatives.',
            'Product visualization — concept designs, packaging mockups.',
            'Educational illustrations — diagrams, concept visualizations.',
            'Game assets — backgrounds, characters, icons (prototype stage).',
            'Personalized content — user-specific avatars, customized images.',
          ]}
          whyUseIt="Cost comparison: stock photo $10-50, custom photo shoot $500-5000, DALL-E 3 $0.04-0.08 per image. Self-hosted Stable Diffusion: ~$0.001 per image (GPU cost). Lekin asli advantage cost se zyada speed hai — prompt change karo, new image seconds mein. Exact scene, style, composition control karo natural language se. Content team ke liye: unlimited iteration, zero photographer schedule."
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
            explanation: 'DALL-E 3 API straightforward hai. Size options: square (1024x1024), landscape (1792x1024), portrait (1024x1792) — use case ke hisaab se. quality: standard vs hd — hd marketing assets ke liye worth it hai extra cost. Ek interesting field: revised_prompt — ye DALL-E ne actually kya prompt use kiya dikhata hai. Isse padh ke prompt engineering seekh sakte ho. style: vivid dramatic hai, natural realistic.',
          }}
          realWorldScenario="Content agency: 20 articles/day, har ek ke liye thumbnail chahiye. Manual design: 30 min/image, designer cost. DALL-E 3: 10 seconds, $0.04/image. 85% images publish-ready bina kisi edit ke. Editor sirf outliers review kare. Total: $0.80/day vs $150+ designer time. Ye automation sirf cost save nahi karta — publishing speed dramatically fast hoti hai."
          commonMistakes={[
            {
              mistake: 'DALL-E se realistic human faces generate karna — copyright/deepfake concerns',
              why: 'Realistic people ki images copyright, consent, aur deepfake issues create kar sakti hain — especially public figures.',
              fix: 'Clearly fictional/stylized characters use karo. Real people ki likeness avoid karo. Terms of Service carefully padho. Generated images mein AI disclosure add karo.',
            },
          ]}
          proTip="Local image generation run karna chahte ho? ComfyUI ya AUTOMATIC1111 WebUI se shuru karo — GUI se easy, no code. Node.js se: local API server expose karo. 2025 mein best open-source models: FLUX.1 realistic ke liye, SDXL versatile tasks ke liye. GPU: RTX 3080+ for decent speed. Privacy aur unlimited generation — local setup ka fayda yahi hai."
        />
      </div>

      {/* Card 5: Multimodal RAG */}
      <div id="multimodal-rag">
        <ConceptCard
          title="Multimodal RAG — Images + Text Together"
          emoji="🔮"
          difficulty="advanced"
          whatIsIt="Regular RAG sirf text documents search karta hai. Technical manuals mein answer ek diagram mein ho? Text RAG fail. Multimodal RAG images bhi index karta hai — diagrams, charts, screenshots sab. Approaches: (1) Image captioning — Claude se caption banao, phir text embed karo. Simple. (2) CLIP embeddings — text aur images same vector space mein, image-to-image search bhi possible. Powerful. (3) Vision LLM at query time — query pe vision model se results interpret karo."
          whenToUse={[
            'Technical documentation — diagrams + text together search karo.',
            'E-commerce — product images + description semantic search.',
            'Medical records — X-rays + clinical notes together.',
            'Legal discovery — documents + photos in same search.',
            'Research papers — figures + text unified retrieval.',
          ]}
          whyUseIt="Ek real problem: engineer ne technical manual mein 'hydraulic pressure settings' search kiya — text RAG kuch relevant paragraphs return kiya lekin actual setting ek diagram mein tha. Multimodal RAG: diagram bhi retrieve hota. E-commerce mein: user photo upload kare, similar products dhundhe — text description se match karo. Enterprise search ka future: sab kuch searchable, format regardless."
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
            explanation: 'Approach 1 (simpler, recommended for most cases): Claude se image caption banao → text embed karo → regular text RAG pipeline. Approach 2 (powerful, complex): CLIP se text + image same embedding space — image-to-image search possible. For most production cases, captioning approach kaafi hai. CLIP tabhi use karo jab image-to-image search genuinely chahiye — unnecessary complexity avoid karo.',
          }}
          realWorldScenario="Architecture firm: floor plans, specifications, construction photos — sab alag jagah stored the. Ek unified multimodal RAG banaya. Ab architect search kare 'kitchen ventilation requirements' — text chunks aur relevant floor plan diagram dono retrieve hote hain. Review time 50% kam hua. Ek system, sab kuch searchable — ye multimodal RAG ka real impact hai."
          commonMistakes={[
            {
              mistake: 'Har image caption generate karna at query time',
              why: 'Query time pe captioning bahut slow hai — 2-5 seconds per image. 1000 images = infeasible.',
              fix: 'Ingestion time pe captions generate karo (offline). Store karo database mein. Query time pe sirf text similarity — fast. Caption quality index at indexing time.',
            },
          ]}
          proTip="Custom code mat likho — LlamaIndex ka MultiModalVectorStoreIndex use karo. Built-in image captioning, CLIP embeddings, multimodal query engine sab handle karta hai. Production vector DB ke liye: Weaviate aur Chroma dono native multimodal embedding support karte hain CLIP integration ke saath — no custom code needed. Library pe trust karo, problem pe focus karo."
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
