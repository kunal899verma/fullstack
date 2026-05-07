import Link from 'next/link'
import PromptQualityVisualizer from '@/components/visualizations/PromptQualityVisualizer'

export const metadata = {
  title: 'Prompt Quality Visualizer — NodeMaster GenAI',
  description:
    'Bad vs Good prompts ka side-by-side comparison. Dekho kyun specific prompts 10x better results dete hain.',
}

export default function GenAIPromptsPage() {
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
            <span className="text-[#F5F5F7]">Prompt Quality</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">✍️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Prompt Quality Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Same AI model. Same intelligence. Sirf prompt ka fark — aur results 10x better ya 10x worse ho jaate hain.
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
              style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.08)' }}
            >
              ✨ Beginner
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#A1A1AA', borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              🕐 ~10 minutes
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
              Pehle Samjho — Prompt Engineering Kyun Zaroori Hai?
            </h2>
          </div>
          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#F97316' }}>
                Same AI model. 10x better results. Sirf prompt ka fark.
              </span>{' '}
              Ye visualization dikhata hai exactly why specific prompts vague prompts ko dominate karte hain — aur tumhe reusable templates deta hai jo tumhara daily work dramatically improve kar sakte hain.
            </p>
            <p className="text-base leading-relaxed">
              Ek developer jo prompt engineering jaanta hai wo same AI tools se 5x faster kaam karta hai doosre developers ke mukable. Ye skill gap 2025 mein real aur growing hai.
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-[rgba(249,115,22,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#F97316' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'LLM Basics', href: '/genai/llm-how-they-work' },
                { label: 'ChatGPT / Claude use karna', href: '/genai/prompt-engineering-basics' },
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
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🍽️</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>
                Real World Analogy — Restaurant Order
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Prompt ko restaurant order ki tarah socho</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '😕', title: 'Vague Order (Bad Prompt)',
                desc: '"Kuch achha khilao." — Waiter confused, chef frustrated. Result: jo milega, lo. Generic aur unsatisfying.',
                code: '"Review my code"',
                color: '#EF4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)',
              },
              {
                icon: '😍', title: 'Specific Order (Good Prompt)',
                desc: '"Palak Paneer, medium spice, extra naan, no onions, dahi ki side mein." — Crystal clear. Perfect result every time.',
                code: '"Review for SQL injection, error handling, N+1 — JSON format"',
                color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border p-4" style={{ background: card.bg, borderColor: card.border }}>
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="font-semibold mb-1" style={{ color: card.color }}>{card.title}</div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-2">{card.desc}</p>
                <code
                  className="text-[10px] font-mono px-2 py-1 rounded block"
                  style={{ background: `${card.color}12`, color: card.color }}
                >
                  {card.code}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 4: 6 Principles Legend ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🎨</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">6 Prompt Improvement Principles</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Ye rules yaad rakh lo — har prompt mein apply karo</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { num: '1', icon: '🎯', label: 'Specificity', color: '#F97316', desc: 'Jitna specific, utna better. "Node.js Express route handler" > "code". Har qualifier result improve karta hai.' },
              { num: '2', icon: '📐', label: 'Format Definition', color: '#7C3AED', desc: '"Return JSON array", "use markdown", "max 3 paragraphs" — output format specify karo. Model exactly waise hi dega.' },
              { num: '3', icon: '🧑‍🤝‍🧑', label: 'Audience/Context', color: '#06B6D4', desc: '"Explain to a junior dev", "assume senior Python background" — audience ke level pe response adjust hota hai.' },
              { num: '4', icon: '📏', label: 'Length Constraints', color: '#F59E0B', desc: '"Under 150 words", "max 3 examples", "one code snippet only" — constraints focus create karte hain.' },
              { num: '5', icon: '🔢', label: 'Numbered Tasks', color: '#10B981', desc: '"(1) Explain, (2) Fix, (3) Prevent" — numbered tasks ensure model hara ek point cover karta hai.' },
              { num: '6', icon: '🚫', label: 'Negative Constraints', color: '#EF4444', desc: '"No guessing", "no markdown", "no hedging language" — what NOT to do equally important hai.' },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}25` }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${item.color}20`, color: item.color }}
                >
                  {item.num}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span>{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: item.color }}>{item.label}</span>
                  </div>
                  <p className="text-xs text-[#71717A] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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
            </div>
          </div>
          <div className="space-y-3">
            {[
              { step: 1, icon: '🔍', color: '#F97316', title: '"Code Review" scenario se shuru karo', desc: 'Pehla tab already selected hai. Bad aur Good prompt dono padhna — seriously compare karo in terms of clarity.' },
              { step: 2, icon: '👁️', color: '#7C3AED', title: '"Show response" toggle karo dono pe', desc: 'Pehle bad prompt ka simulated response dekho — generic aur unhelpful. Phir good prompt ka — structured aur actionable.' },
              { step: 3, icon: '✅', color: '#10B981', title: '"Why this works" annotations padhna', desc: 'Har green annotation ek specific improvement explain karta hai. Ye principles yaad rakho — ye reusable hain.' },
              { step: 4, icon: '🔄', color: '#06B6D4', title: 'Sab 5 scenarios go through karo', desc: 'Code Review → Explanation → Data Extraction → Debugging → System Prompt. Har domain ka alag pattern hai.' },
              { step: 5, icon: '📝', color: '#F59E0B', title: 'Good prompts ko template ki tarah save karo', desc: 'Good prompts mein {placeholders} add karo aur reuse karo. Ye templates tumhare toolkit ka part bano dete hain.' },
              { step: 6, icon: '🎯', color: '#EF4444', title: 'System Prompt scenario zaroor dekho', desc: '"You are a helpful assistant" vs structured system prompt — ye fark production AI apps mein most important hai.' },
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
            <span className="ml-2 text-sm text-[#71717A] font-mono">prompt-quality-visualizer.tsx</span>
            <span
              className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
            >
              GenAI
            </span>
          </div>
          <div className="p-6">
            <PromptQualityVisualizer />
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
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', color: '#F97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.25)',
                title: 'Format Power',
                setup: ['"Data Extraction" scenario dekho', 'Bad prompt: "Get the emails"', 'Good prompt: JSON array with exact format'],
                insight: 'Format specification alone output ko 100% consistent bana deta hai. JSON format specify karo aur model hamesha parseable response dega.',
              },
              {
                num: '02', color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.25)',
                title: 'Context Magic',
                setup: ['"Explanation" scenario dekho', 'Bad: "Explain async"', 'Good: audience + analogy + length'],
                insight: 'Target audience specify karna response ki depth aur vocabulary completely change kar deta hai. "Explain to senior dev" vs "to student" — totally different explanations.',
              },
              {
                num: '03', color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.25)',
                title: 'System Prompt Impact',
                setup: ['"System Prompt" scenario (tab 5) dekho', 'Generic vs structured system prompt', 'Response style compare karo'],
                insight: 'System prompt = AI ka personality aur behavior baseline set karta hai. Production apps mein ye sabse important configuration hai — generic system prompts generic apps banate hain.',
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
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>
                Key Takeaways — Prompt Engineering Rules
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { num: '1', heading: 'Specificity Multiplies Quality', body: 'Har additional specific detail response quality improve karta hai. "Review my Node.js Express route for SQL injection, missing error handling, aur N+1 queries. JSON format." — ye ek prompt hai, ye ek result hai.' },
              { num: '2', heading: 'Constraints Create Focus', body: 'Length limits, negative constraints ("no markdown"), aur format rules — ye sab model ko channel karte hain exact output mein. Constraints reduce ambiguity.' },
              { num: '3', heading: 'System Prompt = AI Personality', body: 'Production apps mein system prompt sabse important configuration hai. Generic system prompt = generic app. Specific, well-crafted system prompt = specialized, reliable AI tool.' },
              { num: '4', heading: 'Templates Multiply ROI', body: 'Good prompts ko templates mein convert karo — {variable} placeholders ke saath. Ek well-crafted template 100+ uses mein consistent quality deta hai. Ye compound karta hai.' },
            ].map((point) => (
              <div
                key={point.num}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981' }}
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
              <h2 className="text-xl font-bold text-[#F5F5F7]">Common Confusion</h2>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                wrong: 'Longer prompt hamesha better hota hai',
                right: 'Quality over quantity. Ek focused 50-word prompt ek rambling 500-word prompt se better results deta hai. Relevant specifics add karo, irrelevant background nahi.',
              },
              {
                wrong: '"Please" aur polite language model ko better results dete hain',
                right: 'Models politeness process nahi karte — sirf content. Direct aur clear language zyada effective hai. "Please explain" aur "Explain" — same result.',
              },
              {
                wrong: 'Prompt engineering sirf ChatGPT users ke liye hai',
                right: 'Ye skill API users ke liye sabse valuable hai — automated pipelines, production systems, code generation tools. Business value yahan hai, casual use mein nahi.',
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

        {/* ── SECTION 10: Reusable Templates ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Reusable Prompt Templates</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Copy karo aur customize karo — ye templates daily use mein immediately valuable hain</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Code Review Template',
                color: '#06B6D4',
                prompt: 'Review this {language} {context} for:\n(1) Security vulnerabilities\n(2) Missing error handling\n(3) Performance issues\n\nFormat: JSON array [{severity, issue, fix}]\n\nCode:\n{paste code here}',
              },
              {
                title: 'Explanation Template',
                color: '#7C3AED',
                prompt: 'Explain {concept} to a developer who knows {prerequisite} but not {target_concept}.\nUse one real-world analogy and one code example.\nMax {word_count} words.',
              },
              {
                title: 'System Prompt Template',
                color: '#F97316',
                prompt: 'You are a {role} with {years} years of experience in {domain}.\nYou answer concisely (max {n} paragraphs).\nYou include code examples when relevant.\nYou admit uncertainty rather than guessing.\nYou prefer {technology_preferences}.',
              },
            ].map((t) => (
              <div key={t.title} className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div
                  className="flex items-center gap-2 px-4 py-2"
                  style={{ background: `${t.color}12`, borderBottom: `1px solid ${t.color}25` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                  <span className="text-xs font-mono font-semibold" style={{ color: t.color }}>{t.title}</span>
                </div>
                <div className="p-4 overflow-x-auto" style={{ background: '#0D0D15' }}>
                  <pre className="text-xs font-mono text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">{t.prompt}</pre>
                </div>
              </div>
            ))}
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
              { href: '/visualizations/genai-rag', icon: '📚', label: 'RAG Pipeline Dekho', desc: 'Prompts + retrieved context = next level AI apps', color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.3)' },
              { href: '/visualizations/genai-tokens', icon: '🎲', label: 'Token Sampling Dekho', desc: 'Samjho model output kaise generate hota hai', color: '#F97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
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
