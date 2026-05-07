import NPlusOneVisualizer from '@/components/visualizations/NPlusOneVisualizer'
import Link from 'next/link'

export const metadata = {
  title: 'N+1 Query Problem — NodeMaster',
  description:
    '100 posts ke liye 101 DB queries? Ye silent performance killer hai. N+1 problem samjho aur fix karo.',
}

// ─── Reusable style atoms ────────────────────────────────────────────────────
const glassCard =
  'rounded-2xl border border-[rgba(255,255,255,0.08)] p-5' as const
const glassCardBg = { background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }

function Badge({
  children,
  color = '#7C3AED',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {children}
    </span>
  )
}

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</section>
  )
}

function SectionHeading({
  emoji,
  title,
  subtitle,
}: {
  emoji: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-xl font-bold text-[#F5F5F7]">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-[#71717A] ml-11">{subtitle}</p>}
    </div>
  )
}

export default function NPlusOnePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── 1. HEADER ─────────────────────────────────────────────────────── */}
      <header className="border-b border-[rgba(255,255,255,0.08)] py-8 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#71717A] mb-5">
            <Link href="/" className="hover:text-[#F5F5F7] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/visualizations" className="hover:text-[#F5F5F7] transition-colors">
              Visualizations
            </Link>
            <span>/</span>
            <span className="text-[#A1A1AA]">N+1 Query Problem</span>
          </nav>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🗃️</span>
                <h1 className="text-4xl font-bold text-[#F5F5F7] font-display leading-tight">
                  N+1 Query Problem
                </h1>
              </div>
              <p className="text-[#A1A1AA] text-lg ml-[3.75rem]">
                Silent performance killer — code sahi lagta hai, database overload ho jaata hai.
              </p>
              <div className="flex items-center gap-3 mt-3 ml-[3.75rem]">
                <Badge color="#F59E0B">⚡ Intermediate</Badge>
                <Badge color="#06B6D4">⏱ 8 min</Badge>
                <Badge color="#71717A">Prerequisites: Basic SQL/MongoDB, ORM concepts</Badge>
              </div>
            </div>

            {/* Quick formula */}
            <div
              className="rounded-xl border border-[rgba(255,255,255,0.08)] px-5 py-4 text-sm self-end"
              style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider mb-2">
                The Formula
              </p>
              <div className="font-mono text-base">
                <span className="text-[#EF4444]">1</span>
                <span className="text-[#71717A]"> (list query) + </span>
                <span className="text-[#EF4444]">N</span>
                <span className="text-[#71717A]"> (per item) = </span>
                <span className="text-[#EF4444] font-bold">N+1</span>
              </div>
              <p className="text-[10px] text-[#71717A] mt-1 font-mono">
                100 posts → 101 queries 😱
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. "PEHLE SAMJHO" HOOK ────────────────────────────────────────── */}
      <Section className="pt-10 pb-6">
        <SectionHeading
          emoji="🧠"
          title="Pehle Samjho — Ye Kyun Zaroori Hai?"
          subtitle="Ye problem real production mein aati hai — aur beginners ko pata bhi nahi chalta"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Silent killer card */}
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">😴</span>
              <h3 className="font-bold text-[#EF4444]">Silent Performance Killer</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Database queries ki wajah se app slow hai?{' '}
              <strong className="text-[#F5F5F7]">90% cases mein N+1 problem hoti hai.</strong>{' '}
              Code bilkul sahi lagta hai — koi error nahi, koi warning nahi. Lekin 100 posts fetch
              karne par{' '}
              <strong className="text-[#EF4444]">101 DB queries fire ho jaati hain!</strong>
            </p>
            <div
              className="mt-4 rounded-lg p-3 border border-[rgba(239,68,68,0.2)] font-mono text-xs"
              style={{ background: 'rgba(239,68,68,0.06)' }}
            >
              <p className="text-[#71717A]">{'// Ye code BILKUL sahi lagta hai...'}</p>
              <p className="text-[#EF4444]">{'const posts = await Post.find({});'}</p>
              <p className="text-[#EF4444]">{'for (const post of posts) {'}</p>
              <p className="text-[#EF4444]">{'  post.author = await User.findById(post.authorId);'}</p>
              <p className="text-[#EF4444]">{'}'}</p>
              <p className="text-[#71717A] mt-1">{'// ...lekin 100 posts = 101 queries! 💥'}</p>
            </div>
          </div>

          {/* Real impact card */}
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📉</span>
              <h3 className="font-bold text-[#F59E0B]">Real Production Impact</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Real production mein iska asar devastating hai:
            </p>
            <div className="mt-3 space-y-2">
              {[
                { before: '50ms', after: '500ms', label: 'Response time', bad: true },
                { before: '10 queries', after: '1,010 queries', label: '10 users same time', bad: true },
                { before: 'Normal load', after: 'DB overload', label: 'Under traffic', bad: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg p-2.5 border border-[rgba(245,158,11,0.15)]"
                  style={{ background: 'rgba(245,158,11,0.06)' }}
                >
                  <div className="text-xs">
                    <span className="text-[#10B981] font-mono">{item.before}</span>
                    <span className="text-[#71717A] mx-2">→</span>
                    <span className="text-[#EF4444] font-mono font-bold">{item.after}</span>
                  </div>
                  <span className="text-[#71717A] text-xs">{item.label}</span>
                </div>
              ))}
            </div>
            <p
              className="mt-4 text-xs text-[#A1A1AA] rounded-lg p-2.5 border border-[rgba(239,68,68,0.15)] leading-relaxed"
              style={{ background: 'rgba(239,68,68,0.05)' }}
            >
              💸 Users drop off → Revenue loss. Early detect karo, early fix karo.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 3. REAL-WORLD ANALOGY ─────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="📚"
          title="Real-World Analogy — Library Mein 100 Books"
          subtitle="N+1 ko ek story se samjho — ye mental model kabhi nahi bhoolega"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* N+1 way */}
            <div
              className="rounded-xl border p-5"
              style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.25)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">😓</span>
                <h3 className="font-bold text-[#EF4444]">N+1 Way — Inefficient</h3>
              </div>

              {/* Story */}
              <div className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
                <p>
                  Library mein 100 books ki list chahiye{' '}
                  <strong className="text-[#F5F5F7]">with author details</strong>.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] shrink-0 font-mono text-xs mt-0.5">Trip 1:</span>
                    <span>Catalog se sab books ki list lo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] shrink-0 font-mono text-xs mt-0.5">Trip 2:</span>
                    <span>Book #1 ke author ko separately shelf se dhundho</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] shrink-0 font-mono text-xs mt-0.5">Trip 3:</span>
                    <span>Book #2 ke author ko separately shelf se dhundho</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#71717A] shrink-0 font-mono text-xs mt-0.5">...</span>
                    <span className="text-[#71717A]">yahi karte raho 100 books tak</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] shrink-0 font-mono text-xs mt-0.5">Trip 101:</span>
                    <span>Book #100 ka author!</span>
                  </div>
                </div>
                <div
                  className="rounded-lg p-2.5 border border-[rgba(239,68,68,0.3)] text-center"
                  style={{ background: 'rgba(239,68,68,0.1)' }}
                >
                  <span className="font-mono font-bold text-[#EF4444] text-lg">101 trips!</span>
                  <p className="text-xs text-[#71717A] mt-0.5">Bakwaas kaafi zyada hai</p>
                </div>
              </div>
            </div>

            {/* Optimized way */}
            <div
              className="rounded-xl border p-5"
              style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.25)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">😎</span>
                <h3 className="font-bold text-[#10B981]">JOIN Way — Optimized</h3>
              </div>

              {/* Story */}
              <div className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
                <p>
                  Same task — 100 books with authors. Lekin{' '}
                  <strong className="text-[#F5F5F7]">smart librarian</strong> ek kaam karta hai:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#10B981] shrink-0 font-mono text-xs mt-0.5">Trip 1:</span>
                    <span>
                      &quot;Mujhe sab books chahiye{' '}
                      <strong className="text-[#F5F5F7]">WITH their authors</strong>&quot; — ek hi
                      request mein sab!
                    </span>
                  </div>
                  <div
                    className="rounded-lg p-2.5 border border-[rgba(16,185,129,0.2)] font-mono text-xs"
                    style={{ background: 'rgba(16,185,129,0.08)' }}
                  >
                    <span className="text-[#71717A]">SELECT books.*, authors.* </span>
                    <br />
                    <span className="text-[#71717A]">FROM books </span>
                    <br />
                    <span className="text-[#10B981]">JOIN authors</span>
                    <span className="text-[#71717A]"> ON books.author_id = authors.id</span>
                  </div>
                  <p className="text-[#A1A1AA]">
                    Librarian ek baar jaata hai — sab books aur authors ek saath le aata hai!
                  </p>
                </div>
                <div
                  className="rounded-lg p-2.5 border border-[rgba(16,185,129,0.3)] text-center"
                  style={{ background: 'rgba(16,185,129,0.1)' }}
                >
                  <span className="font-mono font-bold text-[#10B981] text-lg">1 trip!</span>
                  <p className="text-xs text-[#71717A] mt-0.5">100x faster ⚡</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div
            className="mt-5 rounded-xl p-4 border border-[rgba(124,58,237,0.25)]"
            style={{ background: 'rgba(124,58,237,0.07)' }}
          >
            <p className="text-sm text-[#F5F5F7] font-medium">
              💡 <strong>Database mein bhi wahi hota hai:</strong> ORM ke saath{' '}
              <code className="text-[#7C3AED] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-xs">
                .populate()
              </code>{' '}
              ya{' '}
              <code className="text-[#7C3AED] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-xs">
                include: {'{author: true}'}
              </code>{' '}
              bolo — ek hi query mein sab aa jaata hai. Bina is ke — N+1!
            </p>
          </div>
        </div>
      </Section>

      {/* ── 4. ELEMENT LEGEND ─────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🗺️"
          title="Element Legend — Visualization Mein Kya Kya Dikhega?"
          subtitle="Dono sides ka fark samjho pehle"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              symbol: '🔴',
              name: 'Left Side (Red Tinted)',
              desc: 'Naive / inefficient code. Ye woh tarika hai jo beginners likhte hain — loop ke andar DB call.',
              color: '#EF4444',
            },
            {
              symbol: '🟢',
              name: 'Right Side (Green Tinted)',
              desc: 'Optimized code. JOIN ya populate — ek hi query mein sab data. Senior devs ye karte hain.',
              color: '#10B981',
            },
            {
              symbol: '➡️',
              name: 'DB Arrows',
              desc: 'Har arrow = 1 DB query. Left pe N+1 arrows hain. Right pe sirf 1. Count karo — fark dekho.',
              color: '#06B6D4',
            },
            {
              symbol: '🔢',
              name: 'Query Counter',
              desc: 'Total queries + estimated time. Ye number N ke saath badtha jaata hai — N slider badhao dekho.',
              color: '#F59E0B',
            },
            {
              symbol: '🔴',
              name: 'DB Icon (Glowing Red)',
              desc: 'Overloaded database. Left side mein DB itni requests se overload ho jaata hai.',
              color: '#EF4444',
            },
            {
              symbol: '🎚️',
              name: 'N Slider',
              desc: 'Records ki number. N=10 toh 11 queries. N=100 toh 101 queries. Badhaao aur dekho!',
              color: '#7C3AED',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-3 rounded-xl border p-3"
              style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}
            >
              <span className="text-2xl mt-0.5 shrink-0">{item.symbol}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: item.color }}>
                  {item.name}
                </p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. STEP-BY-STEP INSTRUCTIONS ─────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="📋"
          title="Step-by-Step — Exactly Kya Karna Hai?"
          subtitle="Ye steps follow karo visualization mein"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="space-y-4">
            {[
              {
                n: '01',
                action: 'N slider pe 10 dekho (default)',
                detail: 'Left counter: 11 queries. Right counter: 1 query. Already 11x fark!',
                color: '#06B6D4',
              },
              {
                n: '02',
                action: '"Run Both" dabao',
                detail:
                  'Dono sides simultaneously animate hongi. Left pe ek ek arrow — right pe ek hi arrow.',
                color: '#7C3AED',
              },
              {
                n: '03',
                action: 'Left side observe karo',
                detail:
                  'Arrows ek ek karke DB ko hit karti hain — slow, sequential. Ye N+1 problem hai.',
                color: '#EF4444',
              },
              {
                n: '04',
                action: 'Right side compare karo',
                detail: 'Ek hi arrow — sab data ek saath aata hai. Much faster!',
                color: '#10B981',
              },
              {
                n: '05',
                action: 'N = 50 try karo',
                detail: '51 queries vs 1! Timer compare karo — left bahut slow ho jaata hai.',
                color: '#F59E0B',
              },
              {
                n: '06',
                action: 'N = 100 try karo',
                detail: 'Difference aur dramatic ho jaata hai. 101 queries! DB icon red glow karta hai.',
                color: '#EF4444',
              },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold shrink-0"
                  style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}
                >
                  {step.n}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-[#F5F5F7]">{step.action}</p>
                  <p className="text-sm text-[#71717A] mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 6. THE VISUALIZATION ──────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🎮"
          title="Visualization — N+1 vs Optimized Live Dekho!"
          subtitle="N slider badhao aur dono sides ka fark observe karo"
        />
        <NPlusOneVisualizer />
      </Section>

      {/* ── 7. "TRY KARO" EXPERIMENTS ────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🧪"
          title="Try Karo — Ye Experiments Karo!"
          subtitle="Specific cheezein try karo — concept crystal clear ho jaayega"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: N Badhaate Jao',
              steps: [
                'N = 10 se shuru karo (11 vs 1)',
                'N = 50 karo (51 vs 1)',
                'N = 100 karo (101 vs 1)',
                'Timer aur query count compare karo',
              ],
              insight:
                'N+1 queries linearly badti hain — N double karo, time double hota hai. JOIN: always 1.',
              color: '#EF4444',
              emoji: '📈',
            },
            {
              title: 'Experiment 2: Sirf Left Side Chalaao',
              steps: [
                'Left side ka "Run" dabao',
                'Timer note karo',
                'Ab right side ka "Run" dabao',
                'Speed comparison clearly dikhai deta hai',
              ],
              insight:
                'Same data, same result — sirf query count different. JOIN koi data miss nahi karta.',
              color: '#10B981',
              emoji: '⚖️',
            },
            {
              title: 'Experiment 3: N = 1000 (Extreme)',
              steps: [
                'Agar slider allow kare — N = 1000 try karo',
                '1001 queries observe karo!',
                'Real DB yahan timeout ya crash kar sakta hai',
                'Production mein actually aisa hota hai',
              ],
              insight:
                'N=1000 pe — 1001 DB round trips! Network latency bhi add karo — app 10 second slow ho sakti hai.',
              color: '#F59E0B',
              emoji: '💥',
            },
          ].map((exp) => (
            <div
              key={exp.title}
              className={`${glassCard} border`}
              style={{ ...glassCardBg, borderColor: `${exp.color}40` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{exp.emoji}</span>
                <h3 className="font-bold text-sm" style={{ color: exp.color }}>
                  {exp.title}
                </h3>
              </div>
              <ol className="space-y-2 mb-4">
                {exp.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#A1A1AA]">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: `${exp.color}25`, color: exp.color }}
                    >
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <div
                className="rounded-lg p-2.5 text-xs text-[#A1A1AA] leading-relaxed border"
                style={{ background: `${exp.color}08`, borderColor: `${exp.color}25` }}
              >
                💡 {exp.insight}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 8. KEY TAKEAWAYS ──────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🎯"
          title="Key Takeaways — Ye 3 Cheezein Yaad Rakhna!"
          subtitle="Ye page band karne ke baad bhi ye yaad rahega"
        />
        <div className="space-y-4">
          {[
            {
              n: '1',
              bold: 'N+1 = 1 query for list + 1 per item = N+1 total',
              rest: '— 100 items = 101 queries! Simple rule: loop ke andar DB call = N+1 ka red flag. Ye rule yaad rakho aur code review mein dhundho.',
              color: '#EF4444',
            },
            {
              n: '2',
              bold: 'Fix: JOIN ya populate()',
              rest: '— ek hi query mein sab lo. Mongoose: .populate(\'author\'). Prisma: include: {author: true}. Manual: WHERE _id IN [...ids]. Teeno approaches efficient hain.',
              color: '#10B981',
            },
            {
              n: '3',
              bold: 'Detect: Query logging enable karo',
              rest: '— mongoose.set(\'debug\', true) ya Prisma logs enable karo. Agar "same query 100 baar" dikh raha hai — N+1 hai. Early detection = easy fix.',
              color: '#F59E0B',
            },
          ].map((t) => (
            <div
              key={t.n}
              className="flex items-start gap-4 rounded-2xl border p-5"
              style={{ background: `${t.color}08`, borderColor: `${t.color}30` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                style={{ background: `${t.color}25`, color: t.color }}
              >
                {t.n}
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed pt-1.5">
                <strong className="text-[#F5F5F7]">{t.bold}</strong> {t.rest}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 9. COMMON CONFUSION ───────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🤔"
          title="Common Confusion — Ye Galat Hai!"
          subtitle="Beginners ye mistakes karte hain — tum mat karna"
        />
        <div className="space-y-4">
          {[
            {
              wrong: 'Mera code sahi lag raha hai — N+1 nahi ho sakta',
              right:
                'for loop ke andar await = N+1. Simple rule: loop ke andar DB call = red flag. Code kaa "sahi lagna" koi guarantee nahi — query logs check karo. mongoose.set(\'debug\', true) se saaf dikh jaata hai.',
            },
            {
              wrong: 'ORM automatically optimize karta hai',
              right:
                'Mongoose populate, Prisma include manually specify karna padta hai. Auto-optimize nahi hota. ORM sirf JS/SQL bridge hai — optimization tumhare haath mein hai. DataLoader jaise tools manually lagane padte hain.',
            },
            {
              wrong: 'Ye sirf zyada data pe problem hai',
              right:
                '10 items pe bhi 11 queries — koi bhi scale pe inefficient hai. Small datasets pe slow nahi dikhta, isliye catch nahi hota. Production pe traffic badhta hai → queries explode. Early fix karo — bad habit na bano.',
            },
          ].map((item, i) => (
            <div key={i} className={glassCard} style={glassCardBg}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-lg shrink-0 mt-0.5">❌</span>
                <p className="text-sm text-[#EF4444] font-medium leading-relaxed">
                  &quot;{item.wrong}&quot;
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg shrink-0 mt-0.5">✅</span>
                <p className="text-sm text-[#10B981] leading-relaxed">{item.right}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 10. CODE CONNECTION ───────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="💻"
          title="Code Connection — Problem aur Fix Dono Dekho"
          subtitle="Visualization ka concept actual code mein kaisa dikhta hai"
        />
        <div className={glassCard} style={glassCardBg}>
          <pre
            className="rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]"
            style={{ background: 'rgba(10,10,15,0.8)' }}
          >
            <code className="text-[#A1A1AA] whitespace-pre">{
`// N+1 Problem — 101 queries for 100 posts
const posts = await Post.find({});     // Query 1
for (const post of posts) {
  post.author = await User.findById(   // Queries 2 to 101!
    post.authorId
  );
}

// Fix 1: Mongoose populate (2 queries total)
const posts = await Post.find({})
  .populate('author');  // JOIN-like — fast

// Fix 2: Prisma include (1 query with actual JOIN)
const posts = await prisma.post.findMany({
  include: { author: true }  // 1 query!
});

// Fix 3: Manual batching (2 queries)
const posts = await Post.find({});
const ids = posts.map(p => p.authorId);
const authors = await User.find({
  _id: { $in: ids }  // 1 query for ALL authors
});`
            }
</code>
          </pre>

          {/* Code annotation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              {
                line: '.populate("author")',
                explain:
                  'Mongoose ka easiest fix. Internally 2 queries karta hai — lekin N+1 se bahut better.',
                color: '#10B981',
              },
              {
                line: 'include: { author: true }',
                explain: 'Prisma actual SQL JOIN karta hai — ek hi query mein sab. Most efficient.',
                color: '#06B6D4',
              },
              {
                line: '_id: { $in: ids }',
                explain:
                  'Manual batching — sab IDs ek saath bhejo. ORM use nahi karte? Ye approach use karo.',
                color: '#F59E0B',
              },
            ].map((item) => (
              <div
                key={item.line}
                className="rounded-xl p-3 border"
                style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}
              >
                <code className="text-xs font-mono" style={{ color: item.color }}>
                  {item.line}
                </code>
                <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">{item.explain}</p>
              </div>
            ))}
          </div>

          {/* Detect callout */}
          <div
            className="mt-4 rounded-xl p-4 border border-[rgba(124,58,237,0.25)]"
            style={{ background: 'rgba(124,58,237,0.07)' }}
          >
            <p className="text-sm text-[#F5F5F7] font-medium mb-1">
              🔍 N+1 Detect Kaise Karo?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {[
                {
                  label: 'Mongoose',
                  code: "mongoose.set('debug', true)",
                  desc: 'Console mein har query print hogi',
                },
                {
                  label: 'Prisma',
                  code: 'log: [\'query\']',
                  desc: 'Prisma client options mein — all queries logged',
                },
              ].map((d) => (
                <div key={d.label} className="rounded-lg p-2.5 border border-[rgba(124,58,237,0.2)]" style={{ background: 'rgba(124,58,237,0.05)' }}>
                  <span className="text-xs font-bold text-[#7C3AED]">{d.label}:</span>
                  <code className="block text-xs font-mono text-[#A1A1AA] mt-0.5">{d.code}</code>
                  <p className="text-xs text-[#71717A] mt-1">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 11. NEXT STEPS ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-16">
        <SectionHeading
          emoji="🚀"
          title="Next Steps — Aage Kya Seekhna Hai?"
          subtitle="N+1 samajh gaye? Ab ye karo"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/databases-and-orms"
            className="group block rounded-2xl border border-[rgba(16,185,129,0.3)] p-6 transition-all hover:border-[rgba(16,185,129,0.6)] hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]"
            style={{ background: 'rgba(16,185,129,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <span className="text-xs font-mono text-[#10B981] uppercase tracking-widest">
                  Course Chapter
                </span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#10B981] transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Databases Chapter Padhna</h3>
            <p className="text-sm text-[#A1A1AA]">
              MongoDB, Prisma, Mongoose — complete guide with indexing, relations, aur query optimization.
            </p>
          </Link>

          <Link
            href="/course/caching-redis"
            className="group block rounded-2xl border border-[rgba(245,158,11,0.3)] p-6 transition-all hover:border-[rgba(245,158,11,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]"
            style={{ background: 'rgba(245,158,11,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest">
                  Next Level
                </span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#F59E0B] transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Caching Strategies Seekho</h3>
            <p className="text-sm text-[#A1A1AA]">
              Redis caching se DB queries aur kam karo. N+1 fix kiya — ab cache se aur speed badhao.
            </p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
