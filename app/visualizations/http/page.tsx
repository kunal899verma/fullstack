import HttpLifecycleVisualizer from '@/components/visualizations/HttpLifecycleVisualizer'
import Link from 'next/link'

export const metadata = {
  title: 'HTTP Request Lifecycle — NodeMaster',
  description:
    'Browser URL type karne se leke response aane tak — DNS, TCP, TLS, Express middleware har step animated dekho.',
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

export default function HttpPage() {
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
            <span className="text-[#A1A1AA]">HTTP Request Lifecycle</span>
          </nav>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🌐</span>
                <h1 className="text-4xl font-bold text-[#F5F5F7] font-display leading-tight">
                  HTTP Request Lifecycle
                </h1>
              </div>
              <p className="text-[#A1A1AA] text-lg ml-[3.75rem]">
                Browser se leke DB response tak — poora journey animated step by step.
              </p>
              <div className="flex items-center gap-3 mt-3 ml-[3.75rem]">
                <Badge color="#10B981">🌱 Beginner</Badge>
                <Badge color="#06B6D4">⏱ 10 min</Badge>
                <Badge color="#71717A">Prerequisites: Basic web concepts</Badge>
              </div>
            </div>

            {/* Quick stage reference */}
            <div
              className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-sm self-end"
              style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider mb-2">
                Request Journey
              </p>
              <div className="flex items-center gap-1.5 text-xs font-mono flex-wrap">
                <span className="text-[#06B6D4]">DNS</span>
                <span className="text-[#71717A]">›</span>
                <span className="text-[#7C3AED]">TCP</span>
                <span className="text-[#71717A]">›</span>
                <span className="text-[#F59E0B]">TLS</span>
                <span className="text-[#71717A]">›</span>
                <span className="text-[#10B981]">Middleware</span>
                <span className="text-[#71717A]">›</span>
                <span className="text-[#EF4444]">Handler</span>
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
          subtitle="Before the visualization, understand the WHY"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mystery card */}
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤷</span>
              <h3 className="font-bold text-[#F59E0B]">Beginner Sochta Hai...</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Jab browser mein{' '}
              <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5 rounded text-xs">
                google.com
              </code>{' '}
              type karte ho aur Enter dabaate ho — sirf ek{' '}
              <strong className="text-[#F5F5F7]">&ldquo;request jaati hai, response aata hai&rdquo;</strong>{' '}
              jaanta hai. Lekin actually{' '}
              <strong className="text-[#F59E0B]">5 alag alag steps</strong> hote hain — sab invisible!
            </p>
            <div
              className="mt-4 rounded-lg p-3 border border-[rgba(245,158,11,0.2)]"
              style={{ background: 'rgba(245,158,11,0.06)' }}
            >
              <p className="text-xs text-[#71717A] font-mono">
                Browser → ??? → ??? → ??? → Server → Response
              </p>
              <p className="text-xs text-[#71717A] mt-1">
                Ye ??? kya hai? Ye lesson sikhata hai.
              </p>
            </div>
          </div>

          {/* Senior dev card */}
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">👨‍💻</span>
              <h3 className="font-bold text-[#10B981]">Senior Dev Jaanta Hai...</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Beginner developers sirf{' '}
              <strong className="text-[#F5F5F7]">&ldquo;request → response&rdquo;</strong> jaante hain.{' '}
              Senior developers{' '}
              <strong className="text-[#10B981]">har step jaante hain</strong> — isliye woh
              performance issues debug kar paate hain.{' '}
              <em className="text-[#A1A1AA]">&ldquo;Ye page slow kyun hai?&rdquo;</em> ka jawab hamesha kisi
              step mein milta hai.
            </p>
            <div className="mt-4 space-y-1.5">
              {[
                { step: 'DNS slow?', fix: 'DNS caching setup karo', color: '#06B6D4' },
                { step: 'TLS slow?', fix: 'TLS session resumption use karo', color: '#F59E0B' },
                { step: 'Middleware slow?', fix: 'Order optimize karo', color: '#10B981' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-2 text-xs">
                  <span style={{ color: item.color }} className="font-mono font-bold">
                    {item.step}
                  </span>
                  <span className="text-[#71717A]">→</span>
                  <span className="text-[#A1A1AA]">{item.fix}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 3. REAL-WORLD ANALOGY ─────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🍽️"
          title="Real-World Analogy — Restaurant Order"
          subtitle="HTTP lifecycle ko ek restaurant order se samjho"
        />
        <div className={glassCard} style={glassCardBg}>
          {/* Flow diagram */}
          <div className="flex items-center justify-between gap-1 flex-wrap mb-6 overflow-x-auto pb-2">
            {[
              { emoji: '👤', label: 'Browser', sub: 'Customer\n(order deta hai)', color: '#06B6D4' },
              { arrow: true },
              { emoji: '📞', label: 'DNS', sub: 'Receptionist\n(table dhundta hai)', color: '#7C3AED' },
              { arrow: true },
              { emoji: '🤝', label: 'TCP', sub: 'Waiter confirm\n(SYN-ACK)', color: '#F59E0B' },
              { arrow: true },
              { emoji: '🔒', label: 'TLS', sub: 'Private menu\n(encrypted)', color: '#EF4444' },
              { arrow: true },
              { emoji: '🏗️', label: 'Middleware', sub: 'Kitchen chain\n(chef stages)', color: '#10B981' },
              { arrow: true },
              { emoji: '👨‍🍳', label: 'Handler', sub: 'Main chef\n(actual dish)', color: '#06B6D4' },
              { arrow: true },
              { emoji: '🍽️', label: 'Response', sub: 'Dish delivered\n(to table)', color: '#7C3AED' },
            ].map((item, i) =>
              'arrow' in item ? (
                <span key={i} className="text-[#71717A] text-lg shrink-0 hidden md:block">
                  →
                </span>
              ) : (
                <div key={i} className="flex flex-col items-center gap-1 text-center min-w-[72px]">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border"
                    style={{
                      background: `${item.color}18`,
                      borderColor: `${item.color}44`,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: item.color }}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#71717A] whitespace-pre-line leading-tight">
                    {item.sub}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Analogy table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[rgba(255,255,255,0.06)] pt-5">
            {[
              {
                http: 'Browser',
                restaurant: 'Customer jo order deta hai',
                detail: 'URL type karna = order dena',
                emoji: '👤',
                color: '#06B6D4',
              },
              {
                http: 'DNS Lookup',
                restaurant: 'Receptionist — "table 4 hai sir"',
                detail: 'www.example.com → 192.168.1.1 IP address dhundta hai',
                emoji: '📞',
                color: '#7C3AED',
              },
              {
                http: 'TCP Handshake',
                restaurant: 'Waiter se confirmation — "ready hain?"',
                detail: '3 messages: SYN → SYN-ACK → ACK. Connection establish.',
                emoji: '🤝',
                color: '#F59E0B',
              },
              {
                http: 'TLS Encryption',
                restaurant: 'Private menu — sirf customer aur waiter dekh sakte',
                detail: 'Certificate verify → encrypted channel banao',
                emoji: '🔒',
                color: '#EF4444',
              },
              {
                http: 'Express Middleware',
                restaurant: 'Kitchen chain — chef → presentation → quality check',
                detail: 'helmet → cors → json → auth — har middleware kuch karta hai',
                emoji: '🏗️',
                color: '#10B981',
              },
              {
                http: 'Route Handler',
                restaurant: 'Main chef jo actual dish banata hai',
                detail: 'Yahan actual business logic hota hai — DB query, etc.',
                emoji: '👨‍🍳',
                color: '#06B6D4',
              },
            ].map((row) => (
              <div
                key={row.http}
                className="flex items-start gap-3 rounded-xl border p-3"
                style={{ background: `${row.color}08`, borderColor: `${row.color}25` }}
              >
                <span className="text-xl shrink-0">{row.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold" style={{ color: row.color }}>
                      {row.http}
                    </span>
                    <span className="text-[#71717A] text-xs">=</span>
                    <span className="text-xs text-[#F5F5F7]">{row.restaurant}</span>
                  </div>
                  <p className="text-xs text-[#71717A]">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. ELEMENT LEGEND ─────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🗺️"
          title="Element Legend — Visualization Mein Kya Kya Dikhega?"
          subtitle="Pehle ye samjho, phir visualization shuru karo"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              symbol: '📦',
              name: 'Animated Packet Box',
              desc: 'HTTP request data. Ye left se right travel karta hai — har stage se guzarta hai.',
              color: '#06B6D4',
            },
            {
              symbol: '🌐',
              name: 'DNS Stage',
              desc: 'IP address lookup. "www.example.com → 192.168.1.1" — ek domain ek IP pe map hota hai.',
              color: '#7C3AED',
            },
            {
              symbol: '🤝',
              name: 'TCP Stage',
              desc: 'Connection establish. 3 messages dikhenge: SYN, SYN-ACK, ACK. Ye handshake hai.',
              color: '#F59E0B',
            },
            {
              symbol: '🔒',
              name: 'TLS Stage',
              desc: 'Encryption handshake. Certificate verify hota hai — HTTPS ki wajah se data encrypted hai.',
              color: '#EF4444',
            },
            {
              symbol: '🏗️',
              name: 'Middleware Stack',
              desc: 'Express middleware — request DOWN jaata hai (top to bottom), response UP aata hai.',
              color: '#10B981',
            },
            {
              symbol: '⏱️',
              name: 'Stage Timer (ms)',
              desc: 'Har stage kitna time leta hai — milliseconds mein. Performance bottleneck yahan dikh jaata hai.',
              color: '#06B6D4',
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
                action: 'Route select karo — "GET /users" se shuru karo',
                detail: 'Dropdown mein simple route se shuru karna best hai beginners ke liye.',
                color: '#06B6D4',
              },
              {
                n: '02',
                action: 'Speed "Slow" pe rakho',
                detail: 'Har stage clearly dikhega — fast mode mein blink ho jaata hai.',
                color: '#06B6D4',
              },
              {
                n: '03',
                action: '"Send Request" dabao',
                detail: 'Packet left se right travel karta hai — DNS, TCP, TLS, Middleware, Handler.',
                color: '#7C3AED',
              },
              {
                n: '04',
                action: 'Har stage pe ruko — expandable detail automatically shows',
                detail: 'Stage highlight hone pe neeche details aate hain — time, kya ho raha hai.',
                color: '#7C3AED',
              },
              {
                n: '05',
                action: 'Express middleware section dhyan se dekho',
                detail:
                  'Request DOWN jaata hai (helmet → cors → json → auth). Response UP aata hai (reverse). Ye middleware stack hai!',
                color: '#10B981',
              },
              {
                n: '06',
                action: '"404 Route" try karo',
                detail:
                  'Kya fark padta hai? DNS aur TCP same hain — sirf handler pe fark aata hai. Response code 404.',
                color: '#EF4444',
              },
              {
                n: '07',
                action: 'Speed normal pe comparison karo',
                detail: 'Fast mode mein real-world feel aata hai — sab kuch ek second mein.',
                color: '#F59E0B',
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
          title="Visualization — HTTP Journey Live Dekho!"
          subtitle="Controls use karo aur har step observe karo"
        />
        <HttpLifecycleVisualizer />
      </Section>

      {/* ── 7. "TRY KARO" EXPERIMENTS ────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🧪"
          title="Try Karo — Ye Experiments Karo!"
          subtitle="In cheezein specifically try karo"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: Slow vs Fast Speed',
              steps: [
                'Speed "Slow" pe set karo',
                'Send Request dabao — har stage clearly dekho',
                'Ab speed "Fast" pe karo',
                'Real-world feel — sab ek second mein!',
              ],
              insight:
                'Slow mode learning ke liye best. Fast mode interview mein impress karne ke liye.',
              color: '#06B6D4',
              emoji: '⚡',
            },
            {
              title: 'Experiment 2: 404 vs 200 Response',
              steps: [
                'GET /users route bhejo (200 OK)',
                'Timer note karo — total time',
                'Ab "GET /nonexistent" try karo',
                'DNS/TCP same, handler pe fark dekho',
              ],
              insight:
                '404 bhi DNS, TCP, TLS sab karta hai — sirf handler mein route nahi milta. Overhead same hai!',
              color: '#EF4444',
              emoji: '🔍',
            },
            {
              title: 'Experiment 3: Middleware Order',
              steps: [
                'Express middleware section pe focus karo',
                'Request DOWN karta hai — 1→2→3→4',
                'Response UP karta hai — 4→3→2→1',
                'Order badla toh security bug! (helmet last = bad)',
              ],
              insight:
                'Express middleware order = critical. helmet pehle hona chahiye security headers ke liye.',
              color: '#10B981',
              emoji: '🏗️',
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
              bold: 'DNS, TCP, TLS har request mein hota hai',
              rest: '— isliye "first request" slow hoti hai (~100-200ms extra). HTTP keep-alive se connection reuse hota hai — subsequent requests faster. CDN se DNS latency reduce hota hai.',
              color: '#06B6D4',
            },
            {
              n: '2',
              bold: 'Express middleware order matters',
              rest: '— helmet → cors → json → auth → route. Order galat toh bugs. helmet pehle = security headers sab responses pe. auth pehle json se = JSON body parse nahi hoga auth mein. Ye real bugs hain.',
              color: '#10B981',
            },
            {
              n: '3',
              bold: 'Total time = sum of all stages',
              rest: '— kisi bhi stage optimize karo performance improve hogi. DNS: ~20ms | TCP: ~5ms | TLS: ~15ms | Middleware: ~2ms | DB query: ~50ms = ~92ms total. Kahan optimize karna hai ab pata hai!',
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
              wrong: 'HTTP request seedha server pe jaati hai',
              right:
                'DNS, TCP, TLS sab pehle hote hain — usually 100-200ms add hoti hai. Isliye pehli request slow hoti hai. Browser caching aur keep-alive se ye reduce hota hai repeated requests pe.',
            },
            {
              wrong: 'Express middleware sab request pe chalti hai',
              right:
                'Sirf woh middleware chalta hai jo route se pehle define ki gayi ho. Order critical hai. Agar auth middleware route ke baad define karo — unauthenticated requests bhi guzar jaayengi!',
            },
            {
              wrong: 'HTTPS sirf login pages ke liye hoti hai',
              right:
                'HTTPS EVERY request ke liye zaroori hai — aaj kal HTTP browsers block karte hain ya "Not Secure" dikhate hain. Google bhi HTTPS sites ko search ranking mein prefer karta hai. No exceptions.',
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
          subtitle="Visualization ka concept actual Node.js/Express code mein kaisa dikhta hai"
        />
        <div className={glassCard} style={glassCardBg}>
          <pre
            className="rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]"
            style={{ background: 'rgba(10,10,15,0.8)' }}
          >
            <code className="text-[#A1A1AA] whitespace-pre">{
`// Express middleware ka actual order — YE ORDER MATTER KARTA HAI!
app.use(helmet());           // Stage 1: Security headers add karo
app.use(cors());             // Stage 2: CORS headers
app.use(express.json());     // Stage 3: JSON body parse karo
app.use(authMiddleware);     // Stage 4: Token verify karo

// Route handler — yahan actual kaam hota hai
app.get('/api/users', async (req, res) => {
  // Yahan pahuncha request 4 middlewares ke baad
  const users = await User.find({});
  res.json(users);
  // Response wapis jaata hai reverse order mein
});

// Response time breakdown (typical):
// DNS: ~20ms | TCP: ~5ms | TLS: ~15ms
// Middleware: ~2ms | DB query: ~50ms | Total: ~92ms`
            }
</code>
          </pre>

          {/* Code annotation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              {
                line: 'app.use(helmet())',
                explain:
                  'Security headers — X-Content-Type, HSTS etc. PEHLE hona chahiye — sab responses pe apply hoga.',
                color: '#10B981',
              },
              {
                line: 'app.use(authMiddleware)',
                explain:
                  'express.json() ke BAAD — taki req.body available ho auth check mein.',
                color: '#7C3AED',
              },
              {
                line: '// ~92ms total',
                explain:
                  'Ye breakdown jaanna = debugging superpower. Kahan optimize karna hai instantly pata lagta hai.',
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
          subtitle="HTTP lifecycle samajh gaye? Ab ye karo"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/http-and-rest-apis"
            className="group block rounded-2xl border border-[rgba(6,182,212,0.3)] p-6 transition-all hover:border-[rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
            style={{ background: 'rgba(6,182,212,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest">
                  Course Chapter
                </span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#06B6D4] transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">HTTP Chapter Padhna</h3>
            <p className="text-sm text-[#A1A1AA]">
              REST APIs banana, HTTP methods samajhna, status codes — complete HTTP guide.
            </p>
          </Link>

          <Link
            href="/visualizations/jwt-auth"
            className="group block rounded-2xl border border-[rgba(124,58,237,0.3)] p-6 transition-all hover:border-[rgba(124,58,237,0.6)] hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]"
            style={{ background: 'rgba(124,58,237,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔐</span>
                <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest">
                  Next Visualization
                </span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#7C3AED] transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">JWT Auth Flow Dekho</h3>
            <p className="text-sm text-[#A1A1AA]">
              Login se leke token refresh tak — JWT authentication ka poora flow animated.
            </p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
