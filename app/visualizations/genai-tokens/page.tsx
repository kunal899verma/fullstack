import Link from 'next/link'
import TokenSamplingVisualizer from '@/components/visualizations/TokenSamplingVisualizer'

export const metadata = {
  title: 'Token Sampling Visualizer — NodeMaster GenAI',
  description:
    'Temperature, Top-K, Top-P ka interactive visualization. Samjho LLMs next token kaise choose karte hain.',
}

export default function GenAITokensPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── SECTION 1: Breadcrumb + Header ──────────────────────────────── */}
      <div className="border-b border-[rgba(255,255,255,0.08)] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-6">
            <Link href="/visualizations" className="hover:text-[#F5F5F7] transition-colors">
              ← Visualizations
            </Link>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F97316]">GenAI</span>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F5F5F7]">Token Sampling</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">🎲</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Token Sampling Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Temperature, Top-K, Top-P — teen parameters jo control karte hain ki LLM next word kaise choose karta hai.
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
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#7C3AED', borderColor: 'rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.08)' }}
            >
              🎯 Interactive
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
              Pehle Samjho — Ye Kyun Important Hai?
            </h2>
          </div>
          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#F97316' }}>
                ChatGPT same question ko alag-alag answers kyun deta hai?
              </span>{' '}
              Temperature. Kabhi unexpected word kyun choose karta hai? Top-P sampling. Ye teen parameters — Temperature, Top-K, Top-P — literally control karte hain LLM generation ka har ek token.
            </p>
            <p className="text-base leading-relaxed">
              Jab tum{' '}
              <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}>
                temperature=0
              </code>{' '}
              set karte ho API mein — model hamesha same answer deta hai. Jab{' '}
              <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}>
                temperature=1.5
              </code>{' '}
              karte ho — creative lekin kabhi kabhi galat bhi. Ye visualization ye sab{' '}
              <span className="font-semibold">visually dekhne deta hai.</span>
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-[rgba(249,115,22,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#F97316' }}>
              Prerequisites
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'What is an LLM?', href: '/genai/llm-how-they-work' },
                { label: 'Probability Basics', href: '/genai/ml-fundamentals' },
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

        {/* ── SECTION 3: Real World Analogy ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🎯</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Dart Board
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Temperature ko dart board ki tarah socho
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🎯', label: 'Temperature = 0', color: '#06B6D4',
                desc: 'Expert dart player — hamesha bullseye. Same throw, same result. Deterministic.',
                bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.2)',
              },
              {
                icon: '🎲', label: 'Temperature = 1', color: '#F97316',
                desc: 'Average player — mostly center pe, kabhi kabhi thoda off. Natural distribution.',
                bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.2)',
              },
              {
                icon: '🤪', label: 'Temperature = 2', color: '#EF4444',
                desc: 'Drunk player — dart board ke kisi bhi corner pe ja sakta hai! Very creative/random.',
                bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)',
              },
            ].map((card) => (
              <div key={card.label} className="rounded-xl border p-4" style={{ background: card.bg, borderColor: card.border }}>
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: card.color }}>{card.label}</div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              <span className="text-[#7C3AED] font-semibold">Top-K</span> = dart board pe sirf K sections valid hain, baaki blocked.{' '}
              <span className="text-[#F59E0B] font-semibold">Top-P</span> = total probability budget — ek cumulative limit pe valid sections decide hoti hain.
            </p>
          </div>
        </div>

        {/* ── SECTION 4: Color Legend ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🎨</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Parameter Legend</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Har parameter ka kya role hai</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                color: '#F97316', icon: '🌡️', label: 'Temperature',
                range: '0.0 → 2.0',
                effect: 'Controls randomness. Low = deterministic, high = creative/chaotic.',
                use: 'Creative writing: 0.8–1.2. Code generation: 0.1–0.4. Factual QA: 0.0–0.3',
              },
              {
                color: '#06B6D4', icon: '🎯', label: 'Top-K',
                range: '1 → vocab size',
                effect: 'Limits candidates to K highest probability tokens.',
                use: 'K=1 = greedy decoding. K=40–50 = common production setting.',
              },
              {
                color: '#F59E0B', icon: '💰', label: 'Top-P (Nucleus)',
                range: '0.0 → 1.0',
                effect: 'Cumulative probability cutoff — dynamic candidate selection.',
                use: 'P=0.9 = very common. P=1.0 = disabled. P=0.5 = very conservative.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border p-4"
                style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.label}</span>
                </div>
                <div className="text-[10px] font-mono mb-2" style={{ color: item.color }}>{item.range}</div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-2">{item.effect}</p>
                <div className="p-2 rounded-lg text-[10px] text-[#71717A]" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {item.use}
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
              <p className="text-sm text-[#A1A1AA] mt-1">Visualization ko in steps ke saath explore karo</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { step: 1, icon: '🌡️', color: '#F97316', title: 'Temperature tab kholo', desc: 'Default Temperature tab open hai. Slider bilkul left (0) pe le jao. Dekho — sirf "runtime" bar 100% ho jaati hai, baaki sab zero.' },
              { step: 2, icon: '🎚️', color: '#F97316', title: 'Temperature badhao', desc: 'Slider dheere dheere right move karo. Dekho bars kaise gradually normalize hoti hain — sab tokens ka chance badhta hai.' },
              { step: 3, icon: '🎲', color: '#7C3AED', title: 'Sample button dabao', desc: 'Har baar dabane pe alag token select hoga (temp > 0 pe). Baar baar dabao — dekho randomness kaise kaam karta hai.' },
              { step: 4, icon: '🎯', color: '#06B6D4', title: 'Top-K tab try karo', desc: 'K=1 karo — sirf top token. K=3 karo — 5 grey, 3 active. Dekho fade-out effect.' },
              { step: 5, icon: '💰', color: '#F59E0B', title: 'Top-P tab explore karo', desc: 'Bar chart ke bottom pe cumulative probability bar dikhti hai. P=0.5 pe sirf top 2 tokens qualify karenge.' },
              { step: 6, icon: '🔄', color: '#10B981', title: 'Combinations try karo', desc: 'Real APIs usually Temperature + Top-P dono use karte hain. T=0.7 + P=0.9 = very common production setting.' },
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
                <div className="flex-1 min-w-0">
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

      {/* ── SECTION 6: THE VISUALIZATION ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="px-6 py-4 border-b flex items-center gap-3"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">token-sampling-visualizer.tsx</span>
            <span
              className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
            >
              GenAI
            </span>
          </div>
          <div className="p-6">
            <TokenSamplingVisualizer />
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
              <p className="text-sm text-[#A1A1AA] mt-1">Teen key experiments jo sab concepts clear kar denge</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
                title: 'Greedy Decoding',
                setup: ['Temperature = 0 karo', 'Sample dabao 10 baar', 'Notice: HAMESHA "runtime" select hoga'],
                insight: 'Temperature=0 = deterministic. Same input, same output — always. ChatGPT test mode ka ye setting hai.',
              },
              {
                num: '02', color: '#F97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.25)',
                title: 'Creative vs Safe',
                setup: ['T=0.3 pe sample karo 5 baar', 'T=1.5 pe sample karo 5 baar', 'Compare distribution'],
                insight: 'Low temp = "safe" tokens. High temp = surprises. Creative writing ke liye higher, code ke liye lower.',
              },
              {
                num: '03', color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)',
                title: 'Top-K Greedy',
                setup: ['Top-K tab pe jao', 'K=1 karo', 'Sample dabao — always same result'],
                insight: 'K=1 temperature ki parwah kiye bina greedy decoding deta hai. ChatGPT defaults mein ye mode use nahi hota.',
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
          style={{ background: 'rgba(249,115,22,0.06)', borderColor: 'rgba(249,115,22,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#F97316' }}>
                Key Takeaways — Real API Mein Kaise Use Karo
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Ye rules yaad rakh lo production mein</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { num: '1', heading: 'Determinism chahiye? → Temperature = 0', body: 'Testing, CI, structured output — jahan bhi same answer chahiye, temperature=0 karo. Ye greedy decoding hai.' },
              { num: '2', heading: 'Quality balance → Top-P = 0.9', body: 'Top-P 0.9 sabse common production setting hai. Ye low-probability tokens ko filter karta hai bina deterministic hue.' },
              { num: '3', heading: 'Creative writing → T=0.8–1.2', body: 'Storytelling, poetry, brainstorming — higher temperature se interesting choices aate hain. Par 1.5+ se incoherence bhi aa sakti hai.' },
              { num: '4', heading: 'Code generation → T=0.1–0.4', body: 'Code mein creativity nahi chahiye — correctness chahiye. Low temperature se predictable, valid syntax milti hai.' },
            ].map((point) => (
              <div
                key={point.num}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: 'rgba(249,115,22,0.2)', color: '#F97316' }}
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

        {/* ── SECTION 9: Common Misconceptions ── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚫</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Common Confusion — Galat Fehmiyan</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Ye misconceptions bahut common hain</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                wrong: 'Temperature badhane se model zyada "intelligent" ho jaata hai',
                right: 'Temperature sirf randomness control karta hai — intelligence nahi. High temp pe model galat aur incoherent bhi ho sakta hai.',
              },
              {
                wrong: 'Top-P aur Top-K same cheez hain',
                right: 'Top-K fixed number of candidates hai. Top-P dynamic hai — probability mass ke basis pe candidates badh-ghaat sakte hain. Real scenarios mein Top-P more adaptive hai.',
              },
              {
                wrong: 'Temperature=0 matlab model kuch naya nahi soch sakta',
                right: 'Temperature=0 sirf next-token selection ko deterministic banata hai. Model ki knowledge aur capabilities same rehti hain. Different inputs pe different outputs aate hain.',
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
              <h2 className="text-xl font-bold text-[#F5F5F7]">Real API Mein Kaise Set Karo</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">OpenAI aur Anthropic dono mein same parameters</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">sampling-params.js</span>
            </div>
            <div className="p-5 overflow-x-auto" style={{ background: '#0D0D15' }}>
              <pre className="text-sm font-mono leading-7">
                {[
                  { text: '// OpenAI SDK', color: '#71717A' },
                  { text: 'const response = await openai.chat.completions.create({', color: '#F5F5F7' },
                  { text: "  model: 'gpt-4o',", color: '#F5F5F7' },
                  { text: "  messages: [{ role: 'user', content: 'Node.js is a' }],", color: '#F5F5F7' },
                  { text: '  temperature: 0.7,   // 0=deterministic, 1=default, 2=chaotic', color: '#F97316' },
                  { text: '  top_p: 0.9,         // nucleus sampling — most common setting', color: '#F59E0B' },
                  { text: '  // top_k not exposed in OpenAI API directly', color: '#71717A' },
                  { text: '});', color: '#F5F5F7' },
                  { text: '', color: '' },
                  { text: '// Anthropic SDK', color: '#71717A' },
                  { text: 'const response = await anthropic.messages.create({', color: '#F5F5F7' },
                  { text: "  model: 'claude-sonnet-4-5',", color: '#F5F5F7' },
                  { text: '  temperature: 0.7,   // same semantics', color: '#F97316' },
                  { text: '  top_p: 0.9,', color: '#F59E0B' },
                  { text: '  top_k: 40,          // Anthropic exposes top_k!', color: '#06B6D4' },
                  { text: '});', color: '#F5F5F7' },
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
              <p className="text-sm text-[#A1A1AA] mt-1">Tokens samajh gaye? Ab in topics pe jao.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/genai/llm-how-they-work', icon: '🧠', label: 'LLMs Kaise Kaam Karte Hain', desc: 'Transformer architecture, training, aur inference ka deep dive', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.3)' },
              { href: '/visualizations/genai-attention', icon: '👁️', label: 'Attention Mechanism Dekho', desc: 'Transformers mein attention heatmap — token relationships live', color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.3)' },
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
                  <div className="font-bold text-[#F5F5F7] group-hover:transition-colors" style={{ color: undefined }}>
                    {item.label}
                  </div>
                  <div className="text-sm text-[#A1A1AA] mt-0.5">{item.desc}</div>
                </div>
                <span className="ml-auto text-[#71717A] transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
