import Link from 'next/link'
import RAGPipelineVisualizer from '@/components/visualizations/RAGPipelineVisualizer'

export const metadata = {
  title: 'RAG Pipeline Visualizer — NodeMaster GenAI',
  description:
    'Retrieval Augmented Generation ka complete animated pipeline. Samjho indexing aur query phases kaise kaam karte hain.',
}

export default function GenAIRAGPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── SECTION 1: Header ── */}
      <div className="border-b border-[rgba(255,255,255,0.08)] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-6">
            <Link href="/visualizations" className="hover:text-[#F5F5F7] transition-colors">
              ← Visualizations
            </Link>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F97316]">GenAI</span>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F5F5F7]">RAG Pipeline</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">📚</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              RAG Pipeline Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Retrieval Augmented Generation — dekho kaise LLMs apni knowledge limit cross karte hain real-time document retrieval se.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#F97316', borderColor: 'rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.08)' }}
            >
              🤖 GenAI
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.08)' }}
            >
              ⚡ Intermediate
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#A1A1AA', borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              🕐 ~12 minutes
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 2: Pehle Samjho ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(249,115,22,0.06)', borderColor: 'rgba(249,115,22,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold" style={{ color: '#F97316' }}>
              Pehle Samjho — LLMs Kyun Fail Karte Hain?
            </h2>
          </div>
          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#F97316' }}>
                LLMs ko tumhari company ke docs, tumhara codebase, ya training cutoff ke baad ki koi bhi information nahi pata.
              </span>{' '}
              RAG is problem ko solve karta hai — query time pe relevant information retrieve karke LLM ko context deta hai. Aise hi ChatGPT Plugins, Perplexity, aur AI customer support bots kaam karte hain.
            </p>
            <p className="text-base leading-relaxed">
              RAG ke bina LLM &ldquo;hallucinate&rdquo; karta hai — confident lekin galat answers deta hai. RAG ke saath LLM actual documents pe grounded hota hai — verifiable aur accurate.
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-[rgba(249,115,22,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#F97316' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'Vector Embeddings', href: '/genai/vector-databases' },
                { label: 'Cosine Similarity', href: '/genai/vector-databases' },
                { label: 'LLM Basics', href: '/genai/llm-how-they-work' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                  style={{ color: '#F97316', borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.06)' }}
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 3: Analogy ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(6,182,212,0.06)', borderColor: 'rgba(6,182,212,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">📚</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#06B6D4' }}>
                Real World Analogy — Open Book Exam
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">RAG ko open book exam ki tarah socho</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '🧠', title: 'Fine-Tuning (Closed Book)',
                desc: 'Model ne sab memorize kar liya training mein. Fast inference, lekin outdated knowledge aur hallucination risk. Expensive to update.',
                color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.2)',
              },
              {
                icon: '📖', title: 'RAG (Open Book Exam)',
                desc: 'Model textbook dekhta hai jab chahiye. Dynamic, updated, verifiable. Thoda slower lekin zyada accurate aur maintainable.',
                color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.2)',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border p-4" style={{ background: card.bg, borderColor: card.border }}>
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="font-semibold mb-1" style={{ color: card.color }}>{card.title}</div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              <span className="text-[#06B6D4] font-semibold">RAG ka fayda:</span> Dynamic knowledge jo real-time update ho sakti hai, bina model re-training ke. Company docs, customer data, live APIs — sab RAG se accessible hai.
            </p>
          </div>
        </div>

        {/* ── SECTION 4: Two-Phase Legend ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🎨</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Do Phases — Index + Query</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">RAG do stages mein kaam karta hai</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Index Phase */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider font-mono">Phase 1: Indexing (Once)</p>
              </div>
              {[
                { icon: '📄', step: 'Documents', desc: 'Raw text files, PDFs, code, HTML', color: '#06B6D4' },
                { icon: '✂️', step: 'Chunking', desc: 'Docs ko 200-500 token ke pieces mein tod do', color: '#F59E0B' },
                { icon: '🔢', step: 'Embedding', desc: 'Har chunk ko high-dimensional vector bana do', color: '#7C3AED' },
                { icon: '💾', step: 'Vector DB', desc: 'Vectors store karo (Pinecone, Weaviate, pgvector)', color: '#10B981' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: `${s.color}08` }}>
                  <span className="text-xl flex-shrink-0">{s.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: s.color }}>{s.step}</p>
                    <p className="text-[10px] text-[#71717A]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Query Phase */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                <p className="text-sm font-semibold text-[#F97316] uppercase tracking-wider font-mono">Phase 2: Query (Each Request)</p>
              </div>
              {[
                { icon: '❓', step: 'User Question', desc: 'User ka query text', color: '#F5F5F7' },
                { icon: '🔢', step: 'Embed Question', desc: 'Question ko bhi vector banao (same model)', color: '#7C3AED' },
                { icon: '🔍', step: 'Similarity Search', desc: 'Cosine similarity se closest vectors dhundo', color: '#06B6D4' },
                { icon: '📋', step: 'Retrieved Chunks', desc: 'Top-K most relevant text pieces', color: '#F97316' },
                { icon: '🤖', step: 'LLM + Context', desc: 'Question + chunks → LLM ko bhejo', color: '#F59E0B' },
                { icon: '💬', step: 'Grounded Answer', desc: 'Documents pe based, accurate response', color: '#10B981' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: `${s.color}08` }}>
                  <span className="text-xl flex-shrink-0">{s.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: s.color }}>{s.step}</p>
                    <p className="text-[10px] text-[#71717A]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 5: Kaise Use Karein ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Step by Step</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Visualization ke saath in steps pe chalo</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { step: 1, icon: '📄', color: '#06B6D4', title: '"Index Documents" button dabao', desc: 'Pehle indexing phase run karo. Dekho Documents → Chunker → Embedder → Vector DB ka animation. Har step ruko aur process samjho.' },
              { step: 2, icon: '✂️', color: '#F59E0B', title: 'Chunks appear hone dekho', desc: 'Chunking step pe coloured cards dikhenge — ye text pieces hain. Embedding step pe ye numbers ban jaate hain (vectors).' },
              { step: 3, icon: '❓', color: '#F97316', title: 'Question select karo dropdown se', desc: 'Teen pre-set questions hain. "What is Node.js?" se shuru karo.' },
              { step: 4, icon: '🔍', color: '#7C3AED', title: '"Ask Question" button dabao', desc: 'Query phase run hogi. Similarity search step pe score bars dikhenge — highest score = most relevant chunk.' },
              { step: 5, icon: '🎚️', color: '#F97316', title: 'Top-K change karo', desc: 'Slider se Top-K badlo — dekho alag questions ke liye alag chunks retrieve hote hain.' },
              { step: 6, icon: '🔄', color: '#10B981', title: 'Sab teen questions try karo', desc: 'Har question pe different chunks retrieve honge — dekho retrieval kitna context-aware hai.' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${item.color}20`, color: item.color, border: `1.5px solid ${item.color}50` }}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.icon}</span>
                    <span className="font-semibold text-[#F5F5F7] text-sm">{item.title}</span>
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── SECTION 6: VISUALIZATION ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">rag-pipeline-visualizer.tsx</span>
            <span
              className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
            >
              GenAI
            </span>
          </div>
          <div className="p-6">
            <RAGPipelineVisualizer />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Experiments ── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Try Karo Ye Experiments</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">RAG ke key concepts ko practically samjho</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
                title: 'Retrieval Relevance',
                setup: ['"What is Node.js?" question select karo', 'Index then Query run karo', 'Top chunks dekho — Node.js chunks rank higher'],
                insight: 'Semantic similarity se related content retrieve hota hai — exact keyword matching nahi. "V8 engine" mention bhi "Node.js" query se match hoga.',
              },
              {
                num: '02', color: '#F97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.25)',
                title: 'Top-K Ka Impact',
                setup: ['K=1 pe query run karo', 'K=5 pe same query run karo', 'LLM ko alag context milega'],
                insight: 'Low K = zyada precise lekin incomplete. High K = zyada context lekin noise bhi. 3-5 commonly used hai production mein.',
              },
              {
                num: '03', color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.25)',
                title: 'Domain Specificity',
                setup: ['"What is backpressure?" select karo', 'Query run karo', 'Backpressure chunks rank karo'],
                insight: 'Har question apne domain-specific chunks retrieve karta hai. RAG ki power: ek LLM multiple domains cover kar sakta hai alag knowledge bases se.',
              },
            ].map((exp) => (
              <div
                key={exp.num}
                className="rounded-2xl border p-5 flex flex-col"
                style={{ background: exp.bg, borderColor: exp.border }}
              >
                <div className="text-4xl font-black mb-3 opacity-25 select-none" style={{ color: exp.color }}>{exp.num}</div>
                <h3 className="text-base font-bold mb-3" style={{ color: exp.color }}>{exp.title}</h3>
                <div className="mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-2">Setup</p>
                  <ol className="space-y-1">
                    {exp.setup.map((s, i) => (
                      <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                        <span style={{ color: exp.color }}>{i + 1}.</span>{s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-auto p-3 rounded-lg" style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: exp.color }}>Key Insight</p>
                  <p className="text-xs text-[#F5F5F7] leading-relaxed">{exp.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 8: Key Takeaways ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(6,182,212,0.06)', borderColor: 'rgba(6,182,212,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#06B6D4' }}>
                Key Takeaways — RAG Production Mein Use Karo
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { num: '1', heading: 'RAG for Dynamic Knowledge', body: 'Jab bhi knowledge frequently update ho — company docs, product catalog, news — RAG fine-tuning se better hai. Fine-tuning static hai, RAG dynamic.' },
              { num: '2', heading: 'Chunking Strategy Matters', body: 'Chunks bahut chhote = context lost. Bahut bade = retrieval quality kharab. 200-500 tokens with overlap (20-50 tokens) — ye golden rule hai.' },
              { num: '3', heading: 'Retrieval Quality = Answer Quality', body: 'Garbage in, garbage out. Agar wrong chunks retrieve hue to LLM ka answer bhi wrong hoga. Embedding model choice aur chunking strategy sabse important hai.' },
              { num: '4', heading: 'RAG vs Fine-Tuning', body: 'RAG = dynamic knowledge, fine-tuning = style/behavior. Production mein often dono use hote hain: fine-tuned model + RAG for knowledge.' },
            ].map((point) => (
              <div
                key={point.num}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: 'rgba(6,182,212,0.2)', color: '#06B6D4' }}
                >
                  {point.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#F5F5F7] mb-1">{point.heading}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 9: Misconceptions ── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚫</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Common Confusion — Galat Fehmiyan</h2>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                wrong: 'RAG se LLM apni knowledge forget kar deta hai',
                right: 'RAG additional context add karta hai — LLM ki original knowledge replace nahi hoti. LLM dono use karta hai: apni knowledge + retrieved chunks.',
              },
              {
                wrong: 'Jitne zyada chunks retrieve karein utna better',
                right: 'Zyada chunks = zyada tokens = expensive + slow + context window overflow risk. Quality over quantity. Top 3-5 highly relevant chunks usually kaafi hain.',
              },
              {
                wrong: 'RAG sirf chatbots ke liye hai',
                right: 'RAG har us use case mein useful hai jahan dynamic knowledge chahiye: code generation with latest APIs, legal document analysis, customer support, medical diagnosis support.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
                  <span className="text-lg flex-shrink-0">❌</span>
                  <p className="text-sm text-[#F5F5F7] font-medium">&quot;{item.wrong}&quot;</p>
                </div>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(16,185,129,0.06)' }}>
                  <span className="text-lg flex-shrink-0">✅</span>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 10: Code Reference ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Simple RAG — Node.js mein</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">OpenAI embeddings + in-memory vector search</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">simple-rag.js</span>
            </div>
            <div className="p-5 overflow-x-auto" style={{ background: '#0D0D15' }}>
              <pre className="text-sm font-mono leading-7">
                {[
                  { text: '// 1. INDEX PHASE', color: '#06B6D4' },
                  { text: 'async function indexDocuments(docs) {', color: '#F5F5F7' },
                  { text: '  const chunks = docs.flatMap(chunkText);    // split docs', color: '#F59E0B' },
                  { text: '  const embeddings = await embedAll(chunks);  // vectorize', color: '#7C3AED' },
                  { text: '  return chunks.map((c, i) => ({', color: '#F5F5F7' },
                  { text: '    text: c, vector: embeddings[i]', color: '#F5F5F7' },
                  { text: '  }));  // store in vectorDB', color: '#10B981' },
                  { text: '}', color: '#F5F5F7' },
                  { text: '', color: '' },
                  { text: '// 2. QUERY PHASE', color: '#F97316' },
                  { text: 'async function ragQuery(question, vectorDB) {', color: '#F5F5F7' },
                  { text: '  const qVec = await embed(question);         // embed question', color: '#7C3AED' },
                  { text: '  const topK = vectorDB                        // similarity search', color: '#06B6D4' },
                  { text: "    .map(c => ({ ...c, score: cosine(c.vector, qVec) }))", color: '#F5F5F7' },
                  { text: '    .sort((a,b) => b.score - a.score).slice(0, 5);', color: '#F5F5F7' },
                  { text: '', color: '' },
                  { text: '  return llm.complete(`Context:\\n${topK.map(c=>c.text).join("\\n")}\\n\\nQ: ${question}`);', color: '#10B981' },
                  { text: '}', color: '#F5F5F7' },
                ].map((line, i) => (
                  <div key={i} style={{ color: line.color || '#F5F5F7' }}>{line.text || ' '}</div>
                ))}
              </pre>
            </div>
          </div>
        </div>

        {/* ── SECTION 11: Agla Step ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚀</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Agla Step — Aage Kya Seekhein?</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/visualizations/genai-tokens', icon: '🎲', label: 'Token Sampling Dekho', desc: 'LLM next token kaise choose karta hai — temperature, top-k, top-p', color: '#F97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
              { href: '/visualizations/genai-attention', icon: '👁️', label: 'Attention Mechanism Dekho', desc: 'Transformer attention heatmap — tokens ke beech relationships', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.3)' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
                style={{ background: item.bg, borderColor: item.border }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${item.color}15` }}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-[#F5F5F7]">{item.label}</div>
                  <div className="text-sm text-[#A1A1AA] mt-0.5">{item.desc}</div>
                </div>
                <span className="ml-auto text-[#71717A]">→</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
