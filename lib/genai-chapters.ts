export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface GenAIChapter {
  number: number
  slug: string
  title: string
  subtitle: string
  difficulty: Difficulty
  estimatedMinutes: number
  phase: 1 | 2 | 3 | 4
  topics: string[]
  conceptCount: number
  visualization?: string
}

export const genaiChapters: GenAIChapter[] = [
  // Phase 1: AI/ML Foundations (Ch 1-5)
  { number: 1, slug: 'ai-ml-intro', title: 'AI & ML — Basics Samjho', subtitle: 'Artificial Intelligence kya hai, kaise kaam karta hai', difficulty: 'beginner', estimatedMinutes: 35, phase: 1, topics: ['AI vs ML vs DL', 'Types of learning', 'AI history', 'Real applications', 'How AI thinks'], conceptCount: 6 },
  { number: 2, slug: 'neural-networks', title: 'Neural Networks — Brain Ki Copy', subtitle: 'Neurons, layers, weights, activation functions', difficulty: 'beginner', estimatedMinutes: 55, phase: 1, topics: ['Perceptron', 'Hidden layers', 'Activation functions', 'Forward pass', 'Backpropagation', 'Gradient descent'], conceptCount: 7, visualization: 'neural-network' },
  { number: 3, slug: 'ml-fundamentals', title: 'ML Fundamentals', subtitle: 'Training, validation, overfitting, underfitting', difficulty: 'beginner', estimatedMinutes: 50, phase: 1, topics: ['Training/validation/test split', 'Loss functions', 'Overfitting', 'Regularization', 'Feature engineering', 'Model evaluation'], conceptCount: 7 },
  { number: 4, slug: 'transformers', title: 'Transformer Architecture', subtitle: 'Attention mechanism — the revolution', difficulty: 'intermediate', estimatedMinutes: 70, phase: 1, topics: ['Attention mechanism', 'Self-attention', 'Multi-head attention', 'Positional encoding', 'Encoder-Decoder', 'BERT vs GPT'], conceptCount: 8, visualization: 'transformer-attention' },
  { number: 5, slug: 'llm-how-they-work', title: 'LLMs — Kaise Kaam Karte Hain?', subtitle: 'GPT, Claude, Llama — inside story', difficulty: 'intermediate', estimatedMinutes: 65, phase: 1, topics: ['Tokenization', 'Embeddings', 'Pre-training', 'RLHF', 'Context window', 'Temperature & sampling'], conceptCount: 8 },

  // Phase 2: Prompt Engineering (Ch 6-9)
  { number: 6, slug: 'prompt-engineering-basics', title: 'Prompt Engineering — Basics', subtitle: 'AI se sahi output nikalna — art aur science', difficulty: 'beginner', estimatedMinutes: 50, phase: 2, topics: ['Zero-shot', 'Few-shot', 'System prompts', 'Role prompting', 'Output formatting', 'Common mistakes'], conceptCount: 7 },
  { number: 7, slug: 'advanced-prompting', title: 'Advanced Prompting Techniques', subtitle: 'Chain-of-thought, ReAct, Tree-of-thought', difficulty: 'intermediate', estimatedMinutes: 60, phase: 2, topics: ['Chain-of-thought', 'Self-consistency', 'ReAct pattern', 'Prompt chaining', 'Prompt injection defense', 'Evaluation'], conceptCount: 8 },
  { number: 8, slug: 'openai-api', title: 'OpenAI API — Complete Guide', subtitle: 'GPT-4, vision, function calling, embeddings', difficulty: 'intermediate', estimatedMinutes: 70, phase: 2, topics: ['Chat completions', 'Streaming', 'Function calling', 'Vision API', 'Embeddings API', 'Rate limits', 'Cost optimization'], conceptCount: 9 },
  { number: 9, slug: 'claude-api', title: 'Claude API — Anthropic', subtitle: 'Claude ke saath build karo — streaming, tools, caching', difficulty: 'intermediate', estimatedMinutes: 70, phase: 2, topics: ['Messages API', 'Streaming', 'Tool use', 'Prompt caching', 'Vision', 'System prompts', 'Extended thinking'], conceptCount: 9 },

  // Phase 3: Building AI Apps (Ch 10-16)
  { number: 10, slug: 'building-chat-apps', title: 'AI Chat Apps Banana', subtitle: 'Full chat interface build karo', difficulty: 'intermediate', estimatedMinutes: 75, phase: 3, topics: ['Chat UI', 'Streaming responses', 'Message history', 'System prompts', 'Context management', 'Next.js + AI SDK'], conceptCount: 8 },
  { number: 11, slug: 'rag-systems', title: 'RAG — Retrieval Augmented Generation', subtitle: 'AI ko apna data se baat karalo', difficulty: 'intermediate', estimatedMinutes: 80, phase: 3, topics: ['RAG architecture', 'Chunking strategies', 'Embedding generation', 'Similarity search', 'Reranking', 'Evaluation'], conceptCount: 9, visualization: 'rag-pipeline' },
  { number: 12, slug: 'vector-databases', title: 'Vector Databases', subtitle: 'Semantic search ka engine', difficulty: 'intermediate', estimatedMinutes: 65, phase: 3, topics: ['Vector embeddings', 'FAISS', 'Pinecone', 'Weaviate', 'pgvector', 'ANN algorithms'], conceptCount: 7 },
  { number: 13, slug: 'ai-agents', title: 'AI Agents & Tool Use', subtitle: 'AI jo apne aap kaam kare — autonomous agents', difficulty: 'advanced', estimatedMinutes: 80, phase: 3, topics: ['ReAct pattern', 'Tool calling', 'Multi-step reasoning', 'Memory systems', 'Multi-agent', 'Safety'], conceptCount: 9, visualization: 'ai-agent-loop' },
  { number: 14, slug: 'langchain-llamaindex', title: 'LangChain & LlamaIndex', subtitle: 'AI application frameworks', difficulty: 'advanced', estimatedMinutes: 70, phase: 3, topics: ['LangChain chains', 'LangChain agents', 'LlamaIndex indexing', 'Document loaders', 'Output parsers', 'Callbacks'], conceptCount: 8 },
  { number: 15, slug: 'vercel-ai-sdk', title: 'Vercel AI SDK', subtitle: 'Next.js mein AI integrate karo fastest way', difficulty: 'intermediate', estimatedMinutes: 55, phase: 3, topics: ['useChat', 'useCompletion', 'Streaming', 'Tool calls in Next.js', 'AI SDK providers', 'Edge runtime'], conceptCount: 7 },
  { number: 16, slug: 'fine-tuning', title: 'Fine-tuning & PEFT', subtitle: 'Model ko apne data pe train karo', difficulty: 'advanced', estimatedMinutes: 75, phase: 3, topics: ['When to fine-tune', 'OpenAI fine-tuning', 'LoRA & QLoRA', 'PEFT techniques', 'Training data prep', 'Evaluation'], conceptCount: 8 },

  // Phase 4: Production & Advanced (Ch 17-22)
  { number: 17, slug: 'multimodal-ai', title: 'Multimodal AI', subtitle: 'Text, images, audio, video — sab kuch AI ke liye', difficulty: 'advanced', estimatedMinutes: 65, phase: 4, topics: ['Vision models', 'DALL-E / Stable Diffusion', 'Whisper (speech)', 'Video AI', 'Multimodal RAG'], conceptCount: 7 },
  { number: 18, slug: 'ai-production', title: 'AI in Production', subtitle: 'Monitoring, cost, latency, reliability', difficulty: 'advanced', estimatedMinutes: 70, phase: 4, topics: ['LLM observability', 'LangSmith', 'Cost tracking', 'Caching strategies', 'Rate limiting', 'Fallback strategies'], conceptCount: 8 },
  { number: 19, slug: 'ai-safety-ethics', title: 'AI Safety & Ethics', subtitle: 'Responsible AI banana', difficulty: 'intermediate', estimatedMinutes: 50, phase: 4, topics: ['Hallucinations', 'Bias in AI', 'Prompt injection', 'Content filtering', 'GDPR & AI', 'Responsible AI principles'], conceptCount: 7 },
  { number: 20, slug: 'local-llms', title: 'Local LLMs — Run Offline', subtitle: 'Ollama, llama.cpp — privacy-first AI', difficulty: 'advanced', estimatedMinutes: 55, phase: 4, topics: ['Ollama setup', 'Llama 3', 'Mistral', 'Quantization', 'Local RAG', 'Performance tuning'], conceptCount: 7 },
  { number: 21, slug: 'ai-architecture-patterns', title: 'AI Architecture Patterns', subtitle: 'Production AI systems design karo', difficulty: 'advanced', estimatedMinutes: 70, phase: 4, topics: ['Event-driven AI', 'Async processing', 'Queue-based AI', 'Streaming architectures', 'Cost optimization patterns'], conceptCount: 8 },
  { number: 22, slug: 'ai-future', title: 'Future of AI & Staying Current', subtitle: 'Trends, learning path, community', difficulty: 'intermediate', estimatedMinutes: 40, phase: 4, topics: ['AI trends 2025', 'Papers to read', 'Communities', 'Career in AI', 'Building in public', 'Keep learning'], conceptCount: 5 },
]

export const genaiPhases = [
  { number: 1 as const, name: 'Foundations', color: '#10B981', chapters: genaiChapters.filter(c => c.phase === 1) },
  { number: 2 as const, name: 'Prompt Engineering', color: '#F59E0B', chapters: genaiChapters.filter(c => c.phase === 2) },
  { number: 3 as const, name: 'Building AI Apps', color: '#7C3AED', chapters: genaiChapters.filter(c => c.phase === 3) },
  { number: 4 as const, name: 'Production & Advanced', color: '#EF4444', chapters: genaiChapters.filter(c => c.phase === 4) },
]

export const genaiDifficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bg: string; border: string }
> = {
  beginner: {
    label: 'Beginner',
    color: 'text-[#10B981]',
    bg: 'bg-[rgba(16,185,129,0.12)]',
    border: 'border-[rgba(16,185,129,0.3)]',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-[#F59E0B]',
    bg: 'bg-[rgba(245,158,11,0.12)]',
    border: 'border-[rgba(245,158,11,0.3)]',
  },
  advanced: {
    label: 'Advanced',
    color: 'text-[#7C3AED]',
    bg: 'bg-[rgba(124,58,237,0.12)]',
    border: 'border-[rgba(124,58,237,0.3)]',
  },
}
