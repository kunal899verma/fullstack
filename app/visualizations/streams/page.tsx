import StreamFlowVisualizer from '@/components/visualizations/StreamFlowVisualizer'
import Link from 'next/link'

export const metadata = {
  title: 'Node.js Streams & Backpressure — NodeMaster',
  description:
    'Large files bina memory crash ke process karo. Streams aur backpressure ka poora concept samjho — animated visualization ke saath.',
}

// ─── Reusable style atoms ────────────────────────────────────────────────────
const glassCard =
  'rounded-2xl border border-[rgba(255,255,255,0.08)] p-5' as const
const glassCardBg = { background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }

// ─── Tiny badge component (inline) ──────────────────────────────────────────
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

// ─── Section wrapper ─────────────────────────────────────────────────────────
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

// ─── Section heading ─────────────────────────────────────────────────────────
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

export default function StreamsPage() {
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
            <span className="text-[#A1A1AA]">Streams & Backpressure</span>
          </nav>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🚰</span>
                <h1 className="text-4xl font-bold text-[#F5F5F7] font-display leading-tight">
                  Node.js Streams &amp; Backpressure
                </h1>
              </div>
              <p className="text-[#A1A1AA] text-lg ml-[3.75rem]">
                Large files bina memory crash ke process karo — chunk by chunk.
              </p>
              <div className="flex items-center gap-3 mt-3 ml-[3.75rem]">
                <Badge color="#F59E0B">⚡ Intermediate</Badge>
                <Badge color="#06B6D4">⏱ 12 min</Badge>
                <Badge color="#71717A">Prerequisites: Basic Node.js, async/await</Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. "PEHLE SAMJHO" HOOK ────────────────────────────────────────── */}
      <Section className="pt-10 pb-6">
        <SectionHeading
          emoji="🧠"
          title="Pehle Samjho — Ye Kyun Zaroori Hai?"
          subtitle="Before the visualization, understand WHY this exists"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Problem card */}
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">😱</span>
              <h3 className="font-bold text-[#EF4444]">Problem: Memory Crash</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Maan lo tumhe <strong className="text-[#F5F5F7]">10GB video file</strong> process karni hai.{' '}
              <code className="text-[#EF4444] bg-[rgba(239,68,68,0.1)] px-1.5 py-0.5 rounded text-xs">
                fs.readFileSync()
              </code>{' '}
              ya{' '}
              <code className="text-[#EF4444] bg-[rgba(239,68,68,0.1)] px-1.5 py-0.5 rounded text-xs">
                fs.readFile()
              </code>{' '}
              se karo toh{' '}
              <strong className="text-[#EF4444]">10GB RAM chahiye</strong> — server crash.
              Ye approach sirf small files ke liye kaam karta hai.
            </p>
            <div
              className="mt-4 rounded-lg p-3 border border-[rgba(239,68,68,0.2)] font-mono text-xs"
              style={{ background: 'rgba(239,68,68,0.06)' }}
            >
              <p className="text-[#71717A]">{'// ❌ BAD — 10GB file = 10GB RAM!'}</p>
              <p className="text-[#EF4444]">{`const data = fs.readFileSync('video.mp4');`}</p>
              <p className="text-[#71717A] mt-1">{'// Server OUT OF MEMORY → crash 💥'}</p>
            </div>
          </div>

          {/* Solution card */}
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✅</span>
              <h3 className="font-bold text-[#10B981]">Solution: Streams</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              <code className="text-[#10B981] bg-[rgba(16,185,129,0.1)] px-1.5 py-0.5 rounded text-xs">
                fs.createReadStream()
              </code>{' '}
              se karo — sirf{' '}
              <strong className="text-[#10B981]">64KB at a time</strong> memory mein aata hai.
              10GB file bhi smooth process hoti hai. Ye hi streams ki zaroorat hai!
            </p>
            <div
              className="mt-4 rounded-lg p-3 border border-[rgba(16,185,129,0.2)] font-mono text-xs"
              style={{ background: 'rgba(16,185,129,0.06)' }}
            >
              <p className="text-[#71717A]">{'// ✅ GOOD — constant ~64KB memory!'}</p>
              <p className="text-[#10B981]">{`const stream = fs.createReadStream('video.mp4');`}</p>
              <p className="text-[#10B981]">{`stream.pipe(fs.createWriteStream('out.mp4'));`}</p>
              <p className="text-[#71717A] mt-1">{'// Memory stable, no crash 🎉'}</p>
            </div>
          </div>
        </div>

        {/* Backpressure callout */}
        <div
          className="mt-5 rounded-2xl border border-[rgba(124,58,237,0.3)] p-5"
          style={{ background: 'rgba(124,58,237,0.07)' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div>
              <h3 className="font-bold text-[#7C3AED] mb-1">Backpressure Kya Hai?</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Agar <strong className="text-[#F5F5F7]">consumer (writer) slow hai</strong> aur{' '}
                <strong className="text-[#F5F5F7]">producer (reader) fast</strong>, kya hoga? Buffer overflow → memory
                crash. Streams ka backpressure mechanism automatically speed match karta hai.{' '}
                <code className="text-[#7C3AED] bg-[rgba(124,58,237,0.1)] px-1.5 py-0.5 rounded text-xs">
                  .pipe()
                </code>{' '}
                ye sab automatically handle karta hai — manually kuch nahi karna!
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 3. REAL-WORLD ANALOGY ─────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🚰"
          title="Real-World Analogy — Water Pipe"
          subtitle="Streams ko ek relatable cheez se samjho"
        />
        <div className={`${glassCard}`} style={glassCardBg}>
          {/* Horizontal diagram */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-6">
            {[
              { emoji: '🚰', label: 'Source', sub: 'File / Network\n(Readable Stream)', color: '#06B6D4' },
              { emoji: '══➤', label: '', sub: '', color: '#71717A', isArrow: true },
              { emoji: '🔧', label: 'Valve', sub: 'Backpressure\nMechanism', color: '#F59E0B' },
              { emoji: '══➤', label: '', sub: '', color: '#71717A', isArrow: true },
              { emoji: '⚙️', label: 'Transform', sub: 'Optional step\n(compress, encrypt)', color: '#7C3AED' },
              { emoji: '══➤', label: '', sub: '', color: '#71717A', isArrow: true },
              { emoji: '🪣', label: 'Destination', sub: 'File Write /\nHTTP Response', color: '#10B981' },
            ].map((item, i) =>
              item.isArrow ? (
                <span key={i} className="text-2xl text-[#71717A] hidden sm:block">
                  ══➤
                </span>
              ) : (
                <div key={i} className="flex flex-col items-center gap-1 text-center min-w-[80px]">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border"
                    style={{
                      background: `${item.color}18`,
                      borderColor: `${item.color}44`,
                      boxShadow: `0 0 16px ${item.color}22`,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <span className="text-xs font-bold" style={{ color: item.color }}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#71717A] whitespace-pre-line leading-tight">
                    {item.sub}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Analogy explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border-t border-[rgba(255,255,255,0.06)] pt-5">
            {[
              {
                emoji: '🚰',
                who: 'Source (Well/Tap)',
                is: 'File ya Network',
                color: '#06B6D4',
              },
              {
                emoji: '🔧',
                who: 'Valve (Backpressure)',
                is: 'Speed balancer — agar tank bhar raha ho, automatically source rok deta hai',
                color: '#F59E0B',
              },
              {
                emoji: '⚙️',
                who: 'Pipe (Transform)',
                is: 'Data modify karta hai — uppercase, compress, encrypt',
                color: '#7C3AED',
              },
              {
                emoji: '🪣',
                who: 'Tank (Destination)',
                is: 'Final consumer — file write, HTTP response',
                color: '#10B981',
              },
            ].map((item) => (
              <div
                key={item.who}
                className="rounded-xl p-3 border"
                style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-xs font-bold" style={{ color: item.color }}>
                    {item.who}
                  </span>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.is}</p>
              </div>
            ))}
          </div>

          <p
            className="mt-4 text-sm text-[#F5F5F7] font-medium rounded-xl p-3 border border-[rgba(245,158,11,0.2)]"
            style={{ background: 'rgba(245,158,11,0.06)' }}
          >
            💡 <strong>Key insight:</strong> Agar tank (destination) bhar raha ho → valve (backpressure) automatically
            band ho jaata hai → source (readable) ruk jaata hai. Buffer overflow nahi hoti!
          </p>
        </div>
      </Section>

      {/* ── 4. ELEMENT LEGEND ─────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🗺️"
          title="Element Legend — Visualization Mein Kya Kya Hai?"
          subtitle="Visualization shuru karne se pehle ye samjho"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              symbol: '📄',
              name: 'Source Box',
              desc: 'File ya network ka data producer. Yahan se data start hota hai.',
              color: '#06B6D4',
            },
            {
              symbol: '⚙️',
              name: 'Transform Box',
              desc: 'Data ko modify karta hai — uppercase, compress, encrypt. Optional step.',
              color: '#7C3AED',
            },
            {
              symbol: '💾',
              name: 'Destination Box',
              desc: 'Final consumer — file write ya HTTP response. Yahan data end hota hai.',
              color: '#10B981',
            },
            {
              symbol: '🟦',
              name: 'Animated Blue Dots',
              desc: 'Data chunks flowing hain. Har dot ek 64KB chunk represent karta hai.',
              color: '#06B6D4',
            },
            {
              symbol: '🟡',
              name: 'Amber Buffer Bar',
              desc: 'Buffer kitna full hai. Jitna bhar raha hai — backpressure trigger ke karib.',
              color: '#F59E0B',
            },
            {
              symbol: '🔴',
              name: 'Red Alert',
              desc: 'Buffer overflow ya backpressure trigger! Source ko ruk jaana chahiye.',
              color: '#EF4444',
            },
            {
              symbol: '↩️',
              name: 'Backward Arrow',
              desc: 'Backpressure signal upstream ja raha hai — "rok jao, main bhar gaya!"',
              color: '#F59E0B',
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
          title="Step-by-Step — Kya Karna Hai?"
          subtitle="Follow karo ye steps visualization mein"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="space-y-4">
            {[
              {
                n: '01',
                action: '"With Backpressure" mode select karo',
                detail: 'Default hai ye. Right side ka toggle dhundho.',
                color: '#06B6D4',
              },
              {
                n: '02',
                action: '"Start" button dabao',
                detail: 'Data chunks left se right flow karte hain — blue dots dekho.',
                color: '#7C3AED',
              },
              {
                n: '03',
                action: 'Source speed badhaao',
                detail: 'Source slider right pe karo — dots zyada fast aane lagte hain.',
                color: '#F59E0B',
              },
              {
                n: '04',
                action: 'Destination speed ghataao',
                detail: 'Destination slider left pe karo — consumer slow ho jaata hai.',
                color: '#F59E0B',
              },
              {
                n: '05',
                action: 'Buffer bar dekho',
                detail:
                  'Amber bar fill hoti hai. Jab bhar jaati hai — backpressure trigger! Source automatically ruk jaata hai.',
                color: '#EF4444',
              },
              {
                n: '06',
                action: '"No Backpressure" mode try karo',
                detail:
                  'Buffer overflow hoti hai. Red alert aata hai. Real apps mein ye crash hota hai.',
                color: '#EF4444',
              },
              {
                n: '07',
                action: 'Compare karo',
                detail:
                  'With vs Without backpressure — memory usage ka fark clearly dikhai deta hai.',
                color: '#10B981',
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
          title="Visualization — Khelo Aur Seekho!"
          subtitle="Neeche diye gaye controls use karo"
        />
        <StreamFlowVisualizer />
      </Section>

      {/* ── 7. "TRY KARO" EXPERIMENTS ────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🧪"
          title="Try Karo — Ye Experiments Karo!"
          subtitle="Specific cheezein click/adjust karo ye samjhne ke liye"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: Speed Mismatch',
              steps: [
                'Source speed: MAX pe karo',
                'Destination speed: MIN pe karo',
                'Buffer bar dekho — red zone mein jaata hai',
                'Backpressure signal observe karo (backward arrow)',
              ],
              insight: 'Real life mein: Fast network → slow disk write. Backpressure saves memory.',
              color: '#EF4444',
              emoji: '🔴',
            },
            {
              title: 'Experiment 2: Perfect Balance',
              steps: [
                'Source aur destination same speed pe rakho',
                'Buffer bar observe karo — stable rehta hai',
                'Koi backpressure trigger nahi hota',
                'Ye ideal scenario hai',
              ],
              insight: 'Real life mein: Streaming video — download speed = playback speed. No buffering.',
              color: '#10B981',
              emoji: '🟢',
            },
            {
              title: 'Experiment 3: No Backpressure',
              steps: [
                '"Without Backpressure" mode select karo',
                'Source speed MAX pe karo',
                'Buffer overflow dekho',
                'Red crash indicator observe karo',
              ],
              insight:
                'Real life mein: Manual stream handling galat karna. App crash hoti hai production mein.',
              color: '#F59E0B',
              emoji: '🟡',
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
              bold: 'Stream = chunk by chunk processing',
              rest: '— puri file memory mein load nahi hoti. 10GB file bhi constant ~64KB memory mein process hoti hai. Server kabhi crash nahi hoga large files se.',
              color: '#06B6D4',
            },
            {
              n: '2',
              bold: '.pipe() automatically backpressure handle karta hai',
              rest: '— manually kuch nahi karna. Jo log manual stream handling karte hain aur .pipe() nahi use karte, unhe bugs milte hain. Simple rakho.',
              color: '#7C3AED',
            },
            {
              n: '3',
              bold: 'readFile vs createReadStream:',
              rest: 'Small files (< 1MB) → readFile() OK. Large files (1MB+) → ALWAYS stream. HTTP upload/download → ALWAYS stream. Ye rule thumb hai.',
              color: '#10B981',
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
              wrong: 'Streams bahut complex hain — simple apps mein zaroorat nahi',
              right:
                'HTTP responses, file uploads, database queries — sab already streams use karte hain Node.js mein. Express ka req/res bhi ek stream hai! Tum already use kar rahe ho.',
            },
            {
              wrong: 'Backpressure manually handle karna padta hai',
              right:
                '.pipe() automatically handle karta hai. Manual handling sirf advanced custom implementations ke liye hai — jaise koi custom Transform stream banana. Normal cases mein .pipe() ya pipeline() use karo.',
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
          title="Code Connection — Real Code Dekho"
          subtitle="Visualization ka concept actual Node.js code mein kaisa dikhta hai"
        />
        <div className={glassCard} style={glassCardBg}>
          <pre
            className="rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]"
            style={{ background: 'rgba(10,10,15,0.8)' }}
          >
            <code className="text-[#A1A1AA] whitespace-pre">{
`// Without streams — 10GB file = 10GB RAM crash!
const data = fs.readFileSync('video.mp4'); // BAD for large files

// With streams — constant ~64KB memory usage
const readable = fs.createReadStream('input.mp4');
const writable = fs.createWriteStream('output.mp4');
readable.pipe(writable); // backpressure automatic!

// Transform stream pipeline (Node 10+)
const { pipeline } = require('stream/promises');
await pipeline(
  fs.createReadStream('input.txt'),   // Source
  new UppercaseTransform(),            // Transform
  fs.createWriteStream('output.txt')  // Destination
); // auto cleanup + error handling`
            }
</code>
          </pre>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              {
                line: 'readable.pipe(writable)',
                explain: 'Ye ek line backpressure handle karti hai. Bas itna kafi hai!',
                color: '#06B6D4',
              },
              {
                line: 'new UppercaseTransform()',
                explain:
                  'Transform stream banao kisi bhi data transformation ke liye.',
                color: '#7C3AED',
              },
              {
                line: 'await pipeline(...)',
                explain:
                  'pipeline() auto-cleanup karta hai aur errors properly handle karta hai.',
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
        </div>
      </Section>

      {/* ── 11. NEXT STEPS ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-16">
        <SectionHeading
          emoji="🚀"
          title="Next Steps — Aage Kya Seekhna Hai?"
          subtitle="Streams samajh gaye? Ab ye karo"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/streams"
            className="group block rounded-2xl border border-[rgba(124,58,237,0.3)] p-6 transition-all hover:border-[rgba(124,58,237,0.6)] hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]"
            style={{ background: 'rgba(124,58,237,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest">
                  Course Chapter
                </span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#7C3AED] transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Streams Chapter Padhna</h3>
            <p className="text-sm text-[#A1A1AA]">
              Complete theory — Readable, Writable, Transform, Duplex streams. Real projects mein kaise use karo.
            </p>
          </Link>

          <Link
            href="/visualizations/http"
            className="group block rounded-2xl border border-[rgba(6,182,212,0.3)] p-6 transition-all hover:border-[rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
            style={{ background: 'rgba(6,182,212,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest">
                  Next Visualization
                </span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#06B6D4] transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">HTTP Lifecycle Dekho</h3>
            <p className="text-sm text-[#A1A1AA]">
              Browser se server tak — DNS, TCP, TLS, Express middleware — har step animated dekho.
            </p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
