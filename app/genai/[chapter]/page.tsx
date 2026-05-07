import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, BookOpen, ArrowLeft, Brain } from 'lucide-react'
import { genaiChapters, genaiDifficultyConfig } from '@/lib/genai-chapters'
import TableOfContents, { type TocItem } from '@/components/learn/TableOfContents'
import GenAIChapter1Content from '@/components/genai-chapters/GenAIChapter1Content'
import GenAIChapter2Content from '@/components/genai-chapters/GenAIChapter2Content'
import GenAIChapter3Content from '@/components/genai-chapters/GenAIChapter3Content'
import GenAIChapter4Content from '@/components/genai-chapters/GenAIChapter4Content'
import GenAIChapter5Content from '@/components/genai-chapters/GenAIChapter5Content'
import GenAIChapter6Content from '@/components/genai-chapters/GenAIChapter6Content'
import GenAIChapter7Content from '@/components/genai-chapters/GenAIChapter7Content'
import GenAIChapter8Content from '@/components/genai-chapters/GenAIChapter8Content'
import GenAIChapter9Content from '@/components/genai-chapters/GenAIChapter9Content'
import GenAIChapter10Content from '@/components/genai-chapters/GenAIChapter10Content'
import GenAIChapter11Content from '@/components/genai-chapters/GenAIChapter11Content'
import GenAIChapter12Content from '@/components/genai-chapters/GenAIChapter12Content'
import GenAIChapter13Content from '@/components/genai-chapters/GenAIChapter13Content'
import GenAIChapter14Content from '@/components/genai-chapters/GenAIChapter14Content'
import GenAIChapter15Content from '@/components/genai-chapters/GenAIChapter15Content'
import GenAIChapter16Content from '@/components/genai-chapters/GenAIChapter16Content'
import GenAIChapter17Content from '@/components/genai-chapters/GenAIChapter17Content'
import GenAIChapter18Content from '@/components/genai-chapters/GenAIChapter18Content'
import GenAIChapter19Content from '@/components/genai-chapters/GenAIChapter19Content'
import GenAIChapter20Content from '@/components/genai-chapters/GenAIChapter20Content'
import GenAIChapter21Content from '@/components/genai-chapters/GenAIChapter21Content'
import GenAIChapter22Content from '@/components/genai-chapters/GenAIChapter22Content'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return genaiChapters.map((chapter) => ({
    chapter: chapter.slug,
  }))
}

// ── TOC data per chapter ──────────────────────────────────────────────────────

const chapter1Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'ai-vs-ml', title: 'AI vs ML vs DL vs GenAI', level: 1 },
  { id: 'ml-types', title: 'Types of Machine Learning', level: 1 },
  { id: 'ai-history', title: 'AI Ki Timeline', level: 1 },
  { id: 'how-ai-knows', title: 'AI Ko Kaise Pata Hota Hai?', level: 1 },
  { id: 'real-applications', title: 'Real World Applications', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter2Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'perceptron', title: 'Perceptron', level: 1 },
  { id: 'nn-layers', title: 'Neural Network Layers', level: 1 },
  { id: 'activations', title: 'Activation Functions', level: 1 },
  { id: 'backpropagation', title: 'Backpropagation', level: 1 },
  { id: 'universal-approximation', title: 'Universal Approximation', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter3Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'training-data', title: 'Training Data', level: 1 },
  { id: 'loss-functions', title: 'Loss Functions', level: 1 },
  { id: 'overfitting', title: 'Overfitting vs Underfitting', level: 1 },
  { id: 'regularization', title: 'Regularization', level: 1 },
  { id: 'evaluation', title: 'Model Evaluation', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter4Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'rnn-problems', title: 'RNN Ki Problem', level: 1 },
  { id: 'attention', title: 'Attention Mechanism', level: 1 },
  { id: 'multi-head', title: 'Multi-Head Attention', level: 1 },
  { id: 'positional-encoding', title: 'Positional Encoding', level: 1 },
  { id: 'encoder-decoder', title: 'Encoder vs Decoder', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter5Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'tokenization', title: 'Tokenization', level: 1 },
  { id: 'pretraining', title: 'Pre-training', level: 1 },
  { id: 'rlhf', title: 'RLHF', level: 1 },
  { id: 'context-window', title: 'Context Window', level: 1 },
  { id: 'sampling', title: 'Temperature & Sampling', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter7Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'chain-of-thought', title: 'Chain-of-Thought', level: 1 },
  { id: 'self-consistency', title: 'Self-Consistency', level: 1 },
  { id: 'react-pattern', title: 'ReAct Pattern', level: 1 },
  { id: 'prompt-chaining', title: 'Prompt Chaining', level: 1 },
  { id: 'prompt-injection', title: 'Prompt Injection Defense', level: 1 },
  { id: 'cot-comparison', title: 'CoT Comparison', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter8Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'setup-models', title: 'Setup & Models', level: 1 },
  { id: 'chat-completions', title: 'Chat Completions', level: 1 },
  { id: 'streaming', title: 'Streaming', level: 1 },
  { id: 'function-calling', title: 'Function Calling', level: 1 },
  { id: 'embeddings', title: 'Embeddings API', level: 1 },
  { id: 'streaming-example', title: 'Streaming Example', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter10Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'architecture', title: 'Chat App Architecture', level: 1 },
  { id: 'streaming-ui', title: 'Streaming UI', level: 1 },
  { id: 'vercel-ai-sdk', title: 'Vercel AI SDK', level: 1 },
  { id: 'context-management', title: 'Context Management', level: 1 },
  { id: 'system-prompts', title: 'System Prompt Engineering', level: 1 },
  { id: 'complete-chat-example', title: 'Complete Example', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter6Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'what-is-pe', title: 'Prompt Engineering Kya Hai?', level: 1 },
  { id: 'zero-few-shot', title: 'Zero-Shot vs Few-Shot', level: 1 },
  { id: 'system-prompts', title: 'System Prompts', level: 1 },
  { id: 'output-formatting', title: 'Output Formatting', level: 1 },
  { id: 'common-mistakes', title: 'Common Mistakes', level: 1 },
  { id: 'dev-templates', title: 'Developer Templates', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter9Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'api-setup', title: 'Claude API Setup', level: 1 },
  { id: 'messages-api', title: 'Messages API Deep Dive', level: 1 },
  { id: 'streaming', title: 'Streaming Responses', level: 1 },
  { id: 'tool-use', title: 'Tool Use — Function Calling', level: 1 },
  { id: 'prompt-caching', title: 'Prompt Caching', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter11Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'rag-intro', title: 'RAG Kya Hai?', level: 1 },
  { id: 'rag-pipeline', title: 'RAG Pipeline — Step by Step', level: 1 },
  { id: 'chunking', title: 'Chunking Strategies', level: 1 },
  { id: 'embeddings', title: 'Embedding & Semantic Search', level: 1 },
  { id: 'rag-eval', title: 'RAG Evaluation', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter12Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'why-vector-db', title: 'Vector Databases Kyun?', level: 1 },
  { id: 'embeddings-practice', title: 'Embeddings in Practice', level: 1 },
  { id: 'pinecone', title: 'Pinecone', level: 1 },
  { id: 'pgvector', title: 'pgvector', level: 1 },
  { id: 'ann-algorithms', title: 'ANN Algorithms', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter13Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'agent-intro', title: 'AI Agent Kya Hai?', level: 1 },
  { id: 'react-pattern', title: 'ReAct Pattern', level: 1 },
  { id: 'tool-calling', title: 'Tool Calling Deep Dive', level: 1 },
  { id: 'multi-step', title: 'Multi-step Agents', level: 1 },
  { id: 'agent-safety', title: 'Agent Safety', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter14Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'langchain-overview', title: 'LangChain Overview', level: 1 },
  { id: 'lcel', title: 'LangChain LCEL', level: 1 },
  { id: 'llamaindex', title: 'LlamaIndex', level: 1 },
  { id: 'document-loaders', title: 'Document Loaders', level: 1 },
  { id: 'when-not-to-use', title: 'When NOT to Use Frameworks', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter15Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'ai-sdk-overview', title: 'AI SDK Overview', level: 1 },
  { id: 'provider-setup', title: 'Provider Setup', level: 1 },
  { id: 'route-handlers', title: 'Route Handlers', level: 1 },
  { id: 'use-chat', title: 'useChat Hook', level: 1 },
  { id: 'generative-ui', title: 'Generative UI', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter16Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'decision-framework', title: 'Decision Framework', level: 1 },
  { id: 'openai-fine-tuning', title: 'OpenAI Fine-tuning', level: 1 },
  { id: 'lora', title: 'LoRA', level: 1 },
  { id: 'qlora', title: 'QLoRA', level: 1 },
  { id: 'training-data', title: 'Training Data Prep', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter17Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'vision-models', title: 'Vision Models', level: 1 },
  { id: 'claude-vision', title: 'Claude Vision', level: 1 },
  { id: 'speech-to-text', title: 'Speech-to-Text', level: 1 },
  { id: 'text-to-image', title: 'Text-to-Image', level: 1 },
  { id: 'multimodal-rag', title: 'Multimodal RAG', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter18Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'observability', title: 'LLM Observability', level: 1 },
  { id: 'cost-optimization', title: 'Cost Optimization', level: 1 },
  { id: 'latency', title: 'Latency Optimization', level: 1 },
  { id: 'rate-limits', title: 'Rate Limits & Retries', level: 1 },
  { id: 'fallbacks', title: 'Fallback Strategies', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter19Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'hallucinations', title: 'Hallucinations', level: 1 },
  { id: 'prompt-injection', title: 'Prompt Injection', level: 1 },
  { id: 'bias', title: 'Bias in AI', level: 1 },
  { id: 'content-moderation', title: 'Content Moderation', level: 1 },
  { id: 'gdpr-ai', title: 'GDPR & AI', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter20Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'why-local', title: 'Why Local LLMs?', level: 1 },
  { id: 'ollama-setup', title: 'Ollama Setup', level: 1 },
  { id: 'ollama-api', title: 'Ollama API', level: 1 },
  { id: 'quantization', title: 'Quantization', level: 1 },
  { id: 'local-rag', title: 'Local RAG', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter21Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'async-processing', title: 'Async AI Processing', level: 1 },
  { id: 'event-driven', title: 'Event-Driven AI', level: 1 },
  { id: 'caching-patterns', title: 'AI Caching Patterns', level: 1 },
  { id: 'multi-model-routing', title: 'Multi-model Routing', level: 1 },
  { id: 'ai-microservices', title: 'AI in Microservices', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter22Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'ai-trends', title: 'AI Trends 2025', level: 1 },
  { id: 'papers', title: 'Papers to Read', level: 1 },
  { id: 'communities', title: 'Communities', level: 1 },
  { id: 'career-paths', title: 'Career Paths', level: 1 },
  { id: 'building-in-public', title: 'Building in Public', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

function getTocForSlug(slug: string): TocItem[] {
  if (slug === 'ai-ml-intro') return chapter1Toc
  if (slug === 'neural-networks') return chapter2Toc
  if (slug === 'ml-fundamentals') return chapter3Toc
  if (slug === 'transformers') return chapter4Toc
  if (slug === 'llm-how-they-work') return chapter5Toc
  if (slug === 'prompt-engineering-basics') return chapter6Toc
  if (slug === 'advanced-prompting') return chapter7Toc
  if (slug === 'openai-api') return chapter8Toc
  if (slug === 'claude-api') return chapter9Toc
  if (slug === 'building-chat-apps') return chapter10Toc
  if (slug === 'rag-systems') return chapter11Toc
  if (slug === 'vector-databases') return chapter12Toc
  if (slug === 'ai-agents') return chapter13Toc
  if (slug === 'langchain-llamaindex') return chapter14Toc
  if (slug === 'vercel-ai-sdk') return chapter15Toc
  if (slug === 'fine-tuning') return chapter16Toc
  if (slug === 'multimodal-ai') return chapter17Toc
  if (slug === 'ai-production') return chapter18Toc
  if (slug === 'ai-safety-ethics') return chapter19Toc
  if (slug === 'local-llms') return chapter20Toc
  if (slug === 'ai-architecture-patterns') return chapter21Toc
  if (slug === 'ai-future') return chapter22Toc
  return []
}

// ── Page params ───────────────────────────────────────────────────────────────

interface PageProps {
  params: { chapter: string }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DiffBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  const cfg = genaiDifficultyConfig[difficulty]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  )
}

// ── Coming Soon ───────────────────────────────────────────────────────────────

function ComingSoon({ slug }: { slug: string }) {
  const chapter = genaiChapters.find(c => c.slug === slug)
  if (!chapter) return null

  const phaseColors = ['#10B981', '#F59E0B', '#7C3AED', '#EF4444']
  const phaseColor = phaseColors[chapter.phase - 1]

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4">
      <div
        className="text-8xl md:text-9xl font-display font-bold mb-4 leading-none select-none"
        style={{
          background: `linear-gradient(135deg, ${phaseColor}, ${phaseColor}55)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {String(chapter.number).padStart(2, '0')}
      </div>

      <h1 className="text-3xl font-display font-bold text-[#F5F5F7] mb-2">{chapter.title}</h1>
      <p className="text-[#71717A] text-base mb-6 max-w-md">{chapter.subtitle}</p>

      <div className="flex items-center gap-3 flex-wrap justify-center mb-8">
        <DiffBadge difficulty={chapter.difficulty} />
        <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
          <Clock className="w-4 h-4" />
          {chapter.estimatedMinutes} min
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
          <BookOpen className="w-4 h-4" />
          {chapter.conceptCount} concepts
        </span>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-10 max-w-lg">
        {chapter.topics.map(topic => (
          <span
            key={topic}
            className="px-3 py-1 rounded-full text-xs font-medium text-[#A1A1AA] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]"
          >
            {topic}
          </span>
        ))}
      </div>

      <div
        className="rounded-2xl px-8 py-5 mb-8 max-w-sm"
        style={{
          background: `${phaseColor}10`,
          border: `1px solid ${phaseColor}30`,
        }}
      >
        <p className="text-2xl mb-2">🚀</p>
        <p className="font-semibold text-[#F5F5F7] mb-1">Ye chapter jald aa raha hai!</p>
        <p className="text-sm text-[#71717A]">
          Hum isse carefully craft kar rahe hain. Abhi ke liye available chapters padho.
        </p>
      </div>

      <Link
        href="/genai"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.3)',
          color: '#EF4444',
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        GenAI Track Par Wapas Jao
      </Link>
    </div>
  )
}

// ── Right sidebar ─────────────────────────────────────────────────────────────

function RightSidebar({ chapterNumber }: { chapterNumber: number }) {
  const idx = genaiChapters.findIndex(c => c.number === chapterNumber)
  const prev = idx > 0 ? genaiChapters[idx - 1] : null
  const next = idx < genaiChapters.length - 1 ? genaiChapters[idx + 1] : null
  const current = genaiChapters[idx]

  return (
    <aside className="w-56 shrink-0 hidden xl:flex flex-col sticky top-24 self-start gap-4">
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'rgba(18,18,26,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-3">Quick Nav</p>
        <div className="space-y-2">
          {prev && (
            <Link
              href={`/genai/${prev.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/genai/${next.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <span className="truncate">{next.title}</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      <div
        className="rounded-2xl p-4"
        style={{
          background: 'rgba(18,18,26,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-2">In this chapter</p>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#EF4444]" />
          <span className="text-xs text-[#A1A1AA]">{current?.conceptCount} concepts</span>
        </div>
      </div>
    </aside>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function GenAIChapterPage({ params }: PageProps) {
  const { chapter: slug } = params

  const chapter = genaiChapters.find(c => c.slug === slug)
  if (!chapter) notFound()

  const hasContent = (
    slug === 'ai-ml-intro' ||
    slug === 'neural-networks' ||
    slug === 'ml-fundamentals' ||
    slug === 'transformers' ||
    slug === 'llm-how-they-work' ||
    slug === 'prompt-engineering-basics' ||
    slug === 'advanced-prompting' ||
    slug === 'openai-api' ||
    slug === 'claude-api' ||
    slug === 'building-chat-apps' ||
    slug === 'rag-systems' ||
    slug === 'vector-databases' ||
    slug === 'ai-agents' ||
    slug === 'langchain-llamaindex' ||
    slug === 'vercel-ai-sdk' ||
    slug === 'fine-tuning' ||
    slug === 'multimodal-ai' ||
    slug === 'ai-production' ||
    slug === 'ai-safety-ethics' ||
    slug === 'local-llms' ||
    slug === 'ai-architecture-patterns' ||
    slug === 'ai-future'
  )

  const toc = getTocForSlug(slug)

  const chapterIdx = genaiChapters.findIndex(c => c.slug === slug)
  const prevChapter = chapterIdx > 0 ? genaiChapters[chapterIdx - 1] : null
  const nextChapter = chapterIdx < genaiChapters.length - 1 ? genaiChapters[chapterIdx + 1] : null

  const phaseColors = ['#10B981', '#F59E0B', '#7C3AED', '#EF4444']
  const phaseColor = phaseColors[chapter.phase - 1]

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Chapter header */}
      <div
        className="relative py-10 md:py-14 overflow-hidden"
        style={{ background: '#12121A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${phaseColor}18 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 text-xs text-[#71717A]">
            <Link href="/" className="hover:text-[#A1A1AA] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/genai" className="hover:text-[#A1A1AA] transition-colors">GenAI Track</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#A1A1AA]">Chapter {chapter.number}</span>
          </div>

          {/* Chapter number badge */}
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{
              background: `${phaseColor}18`,
              border: `1px solid ${phaseColor}35`,
              color: phaseColor,
            }}
          >
            Chapter {String(chapter.number).padStart(2, '0')} &middot; Phase {chapter.phase}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#F5F5F7] mb-3 tracking-tight max-w-3xl">
            {chapter.title}
          </h1>
          <p className="text-base md:text-lg text-[#A1A1AA] mb-5 max-w-2xl">{chapter.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <DiffBadge difficulty={chapter.difficulty} />
            <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
              <Clock className="w-4 h-4" />
              {chapter.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
              <BookOpen className="w-4 h-4" />
              {chapter.conceptCount} concepts
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {hasContent ? (
          <div className="flex gap-8">
            {/* Left TOC */}
            <aside className="w-64 shrink-0 hidden lg:block">
              <TableOfContents items={toc} />
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 max-w-3xl">
              {slug === 'ai-ml-intro' && <GenAIChapter1Content />}
              {slug === 'neural-networks' && <GenAIChapter2Content />}
              {slug === 'ml-fundamentals' && <GenAIChapter3Content />}
              {slug === 'transformers' && <GenAIChapter4Content />}
              {slug === 'llm-how-they-work' && <GenAIChapter5Content />}
              {slug === 'prompt-engineering-basics' && <GenAIChapter6Content />}
              {slug === 'advanced-prompting' && <GenAIChapter7Content />}
              {slug === 'openai-api' && <GenAIChapter8Content />}
              {slug === 'claude-api' && <GenAIChapter9Content />}
              {slug === 'building-chat-apps' && <GenAIChapter10Content />}
              {slug === 'rag-systems' && <GenAIChapter11Content />}
              {slug === 'vector-databases' && <GenAIChapter12Content />}
              {slug === 'ai-agents' && <GenAIChapter13Content />}
              {slug === 'langchain-llamaindex' && <GenAIChapter14Content />}
              {slug === 'vercel-ai-sdk' && <GenAIChapter15Content />}
              {slug === 'fine-tuning' && <GenAIChapter16Content />}
              {slug === 'multimodal-ai' && <GenAIChapter17Content />}
              {slug === 'ai-production' && <GenAIChapter18Content />}
              {slug === 'ai-safety-ethics' && <GenAIChapter19Content />}
              {slug === 'local-llms' && <GenAIChapter20Content />}
              {slug === 'ai-architecture-patterns' && <GenAIChapter21Content />}
              {slug === 'ai-future' && <GenAIChapter22Content />}

              {/* Bottom nav */}
              <div className="mt-12 flex gap-4">
                {prevChapter && (
                  <Link
                    href={`/genai/${prevChapter.slug}`}
                    className="flex-1 flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:-translate-x-0.5 group"
                    style={{
                      background: 'rgba(26,26,38,0.8)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 text-[#71717A] shrink-0 group-hover:text-[#A1A1AA] transition-colors" />
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Pichla Chapter</p>
                      <p className="text-sm font-semibold text-[#F5F5F7] leading-tight">{prevChapter.title}</p>
                    </div>
                  </Link>
                )}
                {nextChapter && (
                  <Link
                    href={`/genai/${nextChapter.slug}`}
                    className="flex-1 flex items-center justify-end gap-3 rounded-2xl p-4 transition-all duration-200 hover:translate-x-0.5 group text-right"
                    style={{
                      background: 'rgba(26,26,38,0.8)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Agla Chapter</p>
                      <p className="text-sm font-semibold text-[#F5F5F7] leading-tight">{nextChapter.title}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#71717A] shrink-0 group-hover:text-[#A1A1AA] transition-colors" />
                  </Link>
                )}
              </div>
            </main>

            {/* Right sidebar */}
            <RightSidebar chapterNumber={chapter.number} />
          </div>
        ) : (
          <ComingSoon slug={slug} />
        )}
      </div>
    </div>
  )
}
