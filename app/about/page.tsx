import Link from 'next/link'

export const metadata = {
  title: 'About — NodeMaster',
  description: 'NodeMaster ke baare mein — Hinglish teaching philosophy, When/Why/How/WTF methodology, aur tech stack.',
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TECH_STACK = [
  { name: 'Next.js 14', role: 'Framework', desc: 'App Router, static export', color: '#F5F5F7' },
  { name: 'TypeScript', role: 'Language', desc: 'Type-safe throughout', color: '#3178C6' },
  { name: 'Tailwind CSS', role: 'Styling', desc: 'Utility-first, inline styles', color: '#06B6D4' },
  { name: 'Framer Motion', role: 'Animation', desc: 'Smooth interactions', color: '#7C3AED' },
  { name: 'Sandpack', role: 'Playground', desc: 'In-browser Node.js via WebContainers', color: '#F59E0B' },
  { name: 'react-syntax-highlighter', role: 'Code Display', desc: 'Beautiful code blocks', color: '#10B981' },
  { name: 'Radix UI', role: 'Components', desc: 'Accessible primitives', color: '#A78BFA' },
  { name: 'D3.js', role: 'Visualizations', desc: 'Interactive diagrams', color: '#EF4444' },
  { name: 'Fuse.js', role: 'Search', desc: 'Fuzzy search everywhere', color: '#06B6D4' },
  { name: 'Zustand', role: 'State', desc: 'Lightweight state management', color: '#F59E0B' },
]

const METHODOLOGY_STEPS = [
  {
    label: 'WHEN',
    color: '#7C3AED',
    question: 'Kab use karte hain?',
    description: 'Har concept ke saath hum pehle ye samajhte hain — is feature ki zaroorat kab hoti hai? Kaunse real-world scenarios mein ye kaam aata hai?',
    example: 'Streams: "Jab 1GB file server se client ko bhejna ho"',
  },
  {
    label: 'WHY',
    color: '#06B6D4',
    question: 'Kyun zaroorat hai?',
    description: 'Background samajhna zaroori hai. Streams kyun exist karte hain? Buffer se kya problem thi? History aur motivation se cheez memory mein settle hoti hai.',
    example: 'fs.readFile puree file memory mein load karta hai — 1GB file = 1GB RAM used!',
  },
  {
    label: 'HOW',
    color: '#10B981',
    question: 'Kaise implement karte hain?',
    description: 'Step-by-step implementation. Simple example se shuru karo, complexity badhao. Production patterns aur best practices ke saath.',
    example: 'createReadStream().pipe(res) — sirf memory mein chunk aata hai ek baar mein',
  },
  {
    label: 'WTF',
    color: '#EF4444',
    question: 'Kya WTF moments hain?',
    description: 'Common gotchas, confusing behaviours, aur "ye kyun hota hai?" moments. Ye section senior devs bhi miss kar dete hain — but ab tum nahi karoge.',
    example: 'process.nextTick Promise.then se pehle kyun run hota hai? setImmediate setTimeout(fn,0) se pehle kyun?',
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest mb-3">{label}</p>
      <h2 className="text-3xl font-bold text-[#F5F5F7] mb-3">{title}</h2>
      {subtitle && <p className="text-[#A1A1AA] leading-relaxed">{subtitle}</p>}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── Hero ── */}
      <div className="relative border-b border-[rgba(255,255,255,0.08)] py-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
          style={{ background: '#7C3AED' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
          style={{ background: '#06B6D4' }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-8">
            <Link href="/" className="hover:text-[#F5F5F7] transition-colors">Home</Link>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F5F5F7]">About</span>
          </div>

          <span
            className="text-xs font-mono px-3 py-1.5 rounded-full inline-block mb-6"
            style={{
              background: 'rgba(124,58,237,0.15)',
              color: '#7C3AED',
              border: '1px solid rgba(124,58,237,0.3)',
            }}
          >
            NodeMaster ke baare mein
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-[#F5F5F7] leading-tight mb-6">
            Sach mein samjhao,{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            >
              sikhao nahi
            </span>
          </h1>

          <p className="text-xl text-[#A1A1AA] leading-relaxed">
            NodeMaster ek opinionated learning platform hai jo believe karta hai ki deep understanding
            rote learning se zyada important hai. Aur Hinglish? Ye sirf language nahi — ye ek vibe hai.
          </p>
        </div>
      </div>

      {/* ── Why Hinglish ── */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-[rgba(255,255,255,0.06)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              label="Philosophy"
              title="Ye platform kyun banaya?"
            />
            <div className="space-y-4 text-[#A1A1AA] leading-relaxed">
              <p>
                English mein padha, Hindi mein socha — ye struggle real hai. Jab tum kisi concept ko
                apni language mein samjhate ho, wo memory mein alag hi taraf settle hota hai.
              </p>
              <p>
                NodeMaster Hinglish use karta hai kyunki ye Indian devs ki natural language hai — jab
                hum dosto ko explain karte hain, hum Hinglish hi bolte hain. Toh ye platform bhi wahi
                karta hai.
              </p>
              <p>
                Ye sirf translation nahi — ye genuine Indian developer experience hai, jisme callbacks
                ko &quot;callback waala kaam baad mein karo&quot; se explain kiya jaata hai, formal
                definitions se nahi.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: '🧠', title: 'Deep Understanding', desc: 'Hum Why explain karte hain, sirf How nahi. Event Loop ko memorize mat karo — actually samjho.' },
              { icon: '🎨', title: 'Visual Learning', desc: 'Interactive visualizations jo concepts ko animate karte hain. Dekha hua yaad rehta hai.' },
              { icon: '⚡', title: 'Production Focus', desc: 'Ye platform realistic hai — real-world patterns, common mistakes, aur actual production code.' },
              { icon: '🌊', title: 'Hinglish Style', desc: 'Na pure English, na pure Hindi — wo natural mix jo Indian devs daily bolte hain.' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.06)]"
                style={{ background: 'rgba(26,26,38,0.6)' }}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-[#F5F5F7] mb-1">{item.title}</h4>
                  <p className="text-xs text-[#71717A] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Methodology ── */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-[rgba(255,255,255,0.06)]">
        <SectionHeader
          label="Teaching Methodology"
          title="When / Why / How / WTF"
          subtitle="Har chapter is 4-part framework follow karta hai. Ye accidentally nahi — ye intentional hai."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {METHODOLOGY_STEPS.map((step, i) => (
            <div
              key={step.label}
              className="rounded-2xl border p-6 relative overflow-hidden"
              style={{
                background: 'rgba(26,26,38,0.6)',
                borderColor: `${step.color}25`,
              }}
            >
              {/* Number */}
              <div
                className="absolute top-4 right-4 text-5xl font-black opacity-[0.06]"
                style={{ color: step.color }}
              >
                {i + 1}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-sm font-black font-mono px-3 py-1.5 rounded-lg tracking-widest"
                    style={{
                      background: `${step.color}18`,
                      color: step.color,
                      border: `1px solid ${step.color}33`,
                    }}
                  >
                    {step.label}
                  </span>
                  <span className="text-sm text-[#71717A]">{step.question}</span>
                </div>

                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{step.description}</p>

                <div
                  className="rounded-lg px-3 py-2 text-xs font-mono"
                  style={{
                    background: `${step.color}08`,
                    color: step.color,
                    border: `1px solid ${step.color}15`,
                  }}
                >
                  e.g. {step.example}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-[rgba(255,255,255,0.06)]">
        <SectionHeader
          label="Technology"
          title="Tech Stack"
          subtitle="NodeMaster banane mein ye technologies use hui hain — sab modern, production-grade."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 transition-all duration-200 hover:border-[rgba(255,255,255,0.15)]"
              style={{ background: 'rgba(26,26,38,0.6)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: tech.color }}
                />
                <span className="text-sm font-bold text-[#F5F5F7]">{tech.name}</span>
              </div>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded mb-2 inline-block"
                style={{
                  background: `${tech.color}15`,
                  color: tech.color,
                }}
              >
                {tech.role}
              </span>
              <p className="text-xs text-[#71717A]">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contribute ── */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-[rgba(255,255,255,0.06)]">
        <div
          className="rounded-2xl border border-[rgba(255,255,255,0.1)] p-8 md:p-12 relative overflow-hidden"
          style={{ background: 'rgba(26,26,38,0.8)' }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
            style={{ background: '#7C3AED' }}
          />
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest mb-3">Open Source</p>
            <h2 className="text-2xl font-bold text-[#F5F5F7] mb-4">Contribute karo</h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-6">
              NodeMaster open-source hai. Agar koi typo mili, koi explanation aur better ho sakta hai,
              ya nayi visualization idea hai — GitHub pe PR bhejo. Community ki madad se ye platform
              aur better banta jaayega.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#F5F5F7',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                GitHub pe Dekho →
              </a>
              <span className="flex items-center text-sm text-[#71717A]">
                Issues, PRs, discussions — sab welcome hain
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact ── */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-mono text-[#71717A] uppercase tracking-widest mb-4">Contact</p>
          <h2 className="text-2xl font-bold text-[#F5F5F7] mb-4">Baat karo</h2>
          <p className="text-[#A1A1AA] leading-relaxed mb-6">
            Koi suggestion hai? Collaboration idea? Ya sirf baat karni hai Node.js ke baare mein?
            Email karo — hum padh ke reply karte hain.
          </p>
          <a
            href="mailto:kunal@sequifi.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))',
              color: '#F5F5F7',
              border: '1px solid rgba(124,58,237,0.3)',
            }}
          >
            kunal@sequifi.com
          </a>

          <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
            <p className="text-xs text-[#52525B]">
              Made with purpose for Indian developers who want to truly master Node.js.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
