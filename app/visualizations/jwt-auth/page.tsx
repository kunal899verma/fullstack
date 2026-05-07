import JWTAuthVisualizer from '@/components/visualizations/JWTAuthVisualizer'
import Link from 'next/link'

export const metadata = {
  title: 'JWT Authentication Visualizer — NodeMaster',
  description:
    'Login se leke authenticated API call tak — JWT auth ka har step animated aur explained.',
}

// ─── Small reusable primitives ────────────────────────────────────────────────

function Badge({
  children,
  color = '#7C3AED',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}33`,
      }}
    >
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-3">
      {children}
    </p>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JWTAuthPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">

      {/* ── Back nav ── */}
      <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/visualizations"
            className="text-[#A1A1AA] text-sm hover:text-[#F5F5F7] flex items-center gap-1.5 transition-colors w-fit"
          >
            ← Sab Visualizations
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative border-b border-[rgba(255,255,255,0.08)] py-14 px-6 overflow-hidden">
        {/* Glow blobs */}
        <div
          className="absolute top-0 left-1/3 w-96 h-64 rounded-full blur-3xl pointer-events-none opacity-[0.07]"
          style={{ background: '#EF4444' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-48 rounded-full blur-3xl pointer-events-none opacity-[0.05]"
          style={{ background: '#7C3AED' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge color="#F59E0B">Intermediate</Badge>
            <Badge color="#06B6D4">12 min</Badge>
            <Badge color="#EF4444">Security Track</Badge>
          </div>

          <h1 className="text-5xl font-bold font-display leading-tight mb-3">
            🔐 JWT Authentication{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #EF4444, #7C3AED)' }}
            >
              Visualizer
            </span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl">
            Login se leke authenticated API call tak — har step animated, har concept explained.
            Sirf dekhna nahi, <em>samajhna</em> hai.
          </p>
        </div>
      </div>

      {/* ── Lesson body ── */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — PEHLE SAMJHO (Hook)
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Pehle Samjho — Concept ka Hook</SectionLabel>
          <div
            className="rounded-2xl border p-7"
            style={{
              background: 'rgba(245,158,11,0.06)',
              borderColor: 'rgba(245,158,11,0.25)',
            }}
          >
            <p className="text-lg font-semibold text-[#F5F5F7] mb-3">
              Authentication kaise kaam karti hai?
            </p>
            <p className="text-[#A1A1AA] leading-relaxed mb-4">
              &quot;Username + Password dena&quot; toh jaante ho, lekin uske baad kya hota hai? Server ne
              verify kar liya — ab kaise jaanegaa ki agle request mein bhi tum wahi logged-in user
              ho? Baar baar DB check? Nahi — ye slow aur scale nahi karta.
            </p>
            <div
              className="rounded-xl p-5 border"
              style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' }}
            >
              <p className="text-[#F59E0B] font-semibold mb-1">JWT kya hai?</p>
              <p className="text-[#A1A1AA] leading-relaxed">
                JWT (JSON Web Token) ek encoded string hai jo prove karta hai &quot;main logged in hun&quot;
                — bina har baar DB check kiye. Ye ek{' '}
                <strong className="text-[#F5F5F7]">concert wristband</strong> ki tarah hai — ek
                baar verify karo, phir sab jagah repeatedly use karo.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — CONCERT WRISTBAND ANALOGY
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Real-World Analogy — Concert Wristband 🎫</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            JWT ke steps ko concert ke steps se map karo — ye mental model kabhi nahi bhoolega:
          </p>

          {/* Horizontal story */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              {
                emoji: '🎟️',
                label: 'Login',
                real: 'Username + Password',
                analogy: 'Gate pe ticket dikhao',
                color: '#7C3AED',
              },
              {
                emoji: '🎫',
                label: 'JWT Issue',
                real: 'Server signs token',
                analogy: 'Wristband milta hai',
                color: '#06B6D4',
              },
              {
                emoji: '🚪',
                label: 'Auth Request',
                real: 'Token header mein bhejo',
                analogy: 'Wristband dikhao baaki jaga',
                color: '#10B981',
              },
              {
                emoji: '⏰',
                label: 'Expiry',
                real: 'Access token: 15 min',
                analogy: 'Wristband midnight pe expire',
                color: '#F59E0B',
              },
              {
                emoji: '🔄',
                label: 'Refresh',
                real: 'Refresh token → naya access',
                analogy: 'Backstage pass — re-enter karo',
                color: '#EF4444',
              },
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-2 relative">
                {/* Connector line */}
                {i < 4 && (
                  <div
                    className="hidden md:block absolute top-8 left-[60%] w-full h-px opacity-30"
                    style={{ background: step.color }}
                  />
                )}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl relative z-10"
                  style={{
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}33`,
                  }}
                >
                  {step.emoji}
                </div>
                <p className="text-xs font-mono font-bold text-center" style={{ color: step.color }}>
                  {step.label}
                </p>
                <p className="text-[10px] text-[#A1A1AA] text-center leading-tight">{step.real}</p>
                <p className="text-[10px] text-[#71717A] text-center leading-tight italic">
                  {step.analogy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — JWT TOKEN ANATOMY
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>JWT Token Anatomy — Teen Parts</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Ek JWT token hamesha <strong className="text-[#F5F5F7]">dot (.) se separated teen parts</strong> mein
            hota hai. Har part alag cheez carry karta hai:
          </p>

          {/* Token display */}
          <div
            className="rounded-xl p-5 mb-6 font-mono text-sm leading-relaxed break-all"
            style={{ background: '#12121A', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-[#06B6D4] font-bold">eyJhbGciOiJIUzI1NiJ9</span>
            <span className="text-[#71717A]">.</span>
            <span className="text-[#7C3AED] font-bold">eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSJ9</span>
            <span className="text-[#71717A]">.</span>
            <span className="text-[#F59E0B] font-bold">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
          </div>

          {/* Three part cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                color: '#06B6D4',
                label: 'HEADER',
                emoji: '🔵',
                title: 'Algorithm Info',
                content: 'Ye token kis algorithm se sign hua — e.g. HS256 (HMAC-SHA256)',
                decoded: '{ "alg": "HS256", "typ": "JWT" }',
                note: 'Ye sirf batata hai algorithm — koi sensitive info nahi',
              },
              {
                color: '#7C3AED',
                label: 'PAYLOAD',
                emoji: '🟣',
                title: 'Your Data (Claims)',
                content: 'userId, email, role, expiry — jo bhi server store karna chahta hai',
                decoded: '{ "userId": 1, "email": "user@test.com", "exp": 1234567890 }',
                note: '⚠️ NEVER password ya sensitive data yahan daalo!',
              },
              {
                color: '#F59E0B',
                label: 'SIGNATURE',
                emoji: '🟠',
                title: 'Tamper-Proof Seal',
                content: 'HMAC(header + payload, SECRET_KEY) — ye verify karta hai ki token modify nahi hua',
                decoded: 'HMACSHA256(base64(header) + "." + base64(payload), SECRET)',
                note: 'Sirf server ke paas SECRET hai — isliye forge nahi ho sakta',
              },
            ].map((part) => (
              <div
                key={part.label}
                className="rounded-xl p-5"
                style={{
                  background: `${part.color}08`,
                  border: `1px solid ${part.color}25`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{part.emoji}</span>
                  <span
                    className="text-xs font-mono font-bold tracking-widest"
                    style={{ color: part.color }}
                  >
                    {part.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#F5F5F7] mb-2">{part.title}</p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">{part.content}</p>
                <div
                  className="rounded-lg p-3 font-mono text-[10px] text-[#71717A] mb-3 break-all"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  {part.decoded}
                </div>
                <p className="text-[11px]" style={{ color: part.color }}>
                  {part.note}
                </p>
              </div>
            ))}
          </div>

          {/* Critical callout */}
          <div
            className="rounded-xl border p-5 flex gap-4"
            style={{
              background: 'rgba(239,68,68,0.06)',
              borderColor: 'rgba(239,68,68,0.25)',
            }}
          >
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <p className="text-[#EF4444] font-semibold mb-1">Important: Encode ≠ Encrypt</p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Payload <strong className="text-[#F5F5F7]">encode hoti hai</strong> (base64), encrypt
                nahi! Koi bhi{' '}
                <code
                  className="px-1.5 py-0.5 rounded text-[#EF4444] text-xs"
                  style={{ background: 'rgba(239,68,68,0.1)' }}
                >
                  atob()
                </code>{' '}
                se decode kar sakta hai. Sirf{' '}
                <strong className="text-[#F5F5F7]">signature verify hoti hai</strong> — data secret
                nahi hota. Isliye password, bank info — kabhi payload mein mat daalo.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — 3 FLOWS PREVIEW
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>3 Flows — Visualization mein kya dekhoge</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Visualization mein teen tabs hain. Play karne se pehle samjho inme kya hoga:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                title: 'Login Flow',
                color: '#7C3AED',
                desc: 'User credentials → server verify karta hai → JWT signs → client ko bhejta hai',
                key: 'DB hit hota hai — sirf ek baar login pe',
              },
              {
                num: '02',
                title: 'Authenticated Request',
                color: '#06B6D4',
                desc: 'Client token bhejta hai → server verify karta hai → data return karta hai',
                key: 'NO DB call — server sirf signature verify karta hai',
              },
              {
                num: '03',
                title: 'Token Refresh',
                color: '#10B981',
                desc: 'Access token expire → refresh token se naya access token lo → seamless',
                key: 'User ko pata nahi chalta — transparent refresh',
              },
            ].map((flow) => (
              <div
                key={flow.num}
                className="rounded-xl p-5"
                style={{
                  background: `${flow.color}08`,
                  border: `1px solid ${flow.color}25`,
                }}
              >
                <div
                  className="text-3xl font-mono font-black mb-3 opacity-30"
                  style={{ color: flow.color }}
                >
                  {flow.num}
                </div>
                <p className="font-semibold text-[#F5F5F7] mb-2">{flow.title}</p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">{flow.desc}</p>
                <div
                  className="rounded-lg px-3 py-2 text-xs"
                  style={{ background: `${flow.color}12`, color: flow.color }}
                >
                  Key insight: {flow.key}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — STEP-BY-STEP INSTRUCTIONS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Step-by-Step Instructions — Visualization Use Karo</SectionLabel>
          <div
            className="rounded-2xl border p-7"
            style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-[#F5F5F7] font-semibold mb-5">
              Ye order follow karo — maximum samajh milegi:
            </p>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  text: 'Speed "Slow" pe rakho',
                  detail: 'Critical hai — fast speed pe arrows miss ho jaate hain. Slow mode mein har step clearly visible hota hai.',
                  color: '#F59E0B',
                },
                {
                  step: 2,
                  text: '"Login Flow" tab select karo',
                  detail: 'Pehle login flow samjho — ye baaki dono ka base hai.',
                  color: '#7C3AED',
                },
                {
                  step: 3,
                  text: '"▶ Play" dabao aur har arrow follow karo',
                  detail: 'Notice karo: password bcrypt se compare hota hai, plain text nahi.',
                  color: '#06B6D4',
                },
                {
                  step: 4,
                  text: 'JWT anatomy expand karo',
                  detail: 'Header + payload decode dekho — samjho ki payload publicly readable hai.',
                  color: '#10B981',
                },
                {
                  step: 5,
                  text: '"Authenticated Request" flow try karo',
                  detail: 'Dhyan se dekho — is baar DB call NAHI hoti! Sirf signature verify hoti hai.',
                  color: '#EF4444',
                },
                {
                  step: 6,
                  text: '"Token Refresh" flow dekho',
                  detail: '15 min baad automatically hota hai — user ko seamless experience milta hai.',
                  color: '#7C3AED',
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#F5F5F7] mb-0.5">{item.text}</p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — THE VISUALIZATION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Interactive Visualization</SectionLabel>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(239,68,68,0.2)' }}
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-3"
              style={{
                background: '#12121A',
                borderColor: 'rgba(239,68,68,0.15)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-xs font-mono text-[#A1A1AA]">JWT Auth Flow — Live Visualization</span>
            </div>
            <div
              className="p-2 md:p-4"
              style={{ background: '#0A0A0F' }}
            >
              <JWTAuthVisualizer />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 8 — EXPERIMENTS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Try Karo — 2 Experiments</SectionLabel>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Experiment 1 */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'rgba(6,182,212,0.05)',
                borderColor: 'rgba(6,182,212,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4' }}
                >
                  Experiment 1
                </span>
                <span className="text-sm font-semibold text-[#F5F5F7]">JWT vs Sessions</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: 'JWT (Stateless)',
                    text: 'Server kuch store nahi karta. Token mein hi sab info hai.',
                    color: '#06B6D4',
                  },
                  {
                    label: 'Sessions (Stateful)',
                    text: 'Session ID DB/Redis mein store hota hai. Har request pe lookup.',
                    color: '#7C3AED',
                  },
                  {
                    label: 'JWT better for',
                    text: 'Microservices, mobile apps, distributed systems — no shared state needed.',
                    color: '#10B981',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: item.color }}>
                        {item.label}
                      </p>
                      <p className="text-xs text-[#A1A1AA]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiment 2 */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'rgba(16,185,129,0.05)',
                borderColor: 'rgba(16,185,129,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}
                >
                  Experiment 2
                </span>
                <span className="text-sm font-semibold text-[#F5F5F7]">Token Expiry Scenario</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: 'Token Refresh Flow dekho',
                    text: 'Notice karo — ye user ke liye completely transparent hai.',
                    color: '#10B981',
                  },
                  {
                    label: 'Frontend ka kaam',
                    text: '401 response aaye → automatically refresh token use karo → retry request.',
                    color: '#06B6D4',
                  },
                  {
                    label: 'Security balance',
                    text: 'Short access token (15m) = security. Long refresh token (7d) = UX.',
                    color: '#F59E0B',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: item.color }}>
                        {item.label}
                      </p>
                      <p className="text-xs text-[#A1A1AA]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 9 — KEY TAKEAWAYS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Key Takeaways — Ye 3 Cheezein Yaad Rakho</SectionLabel>
          <div className="space-y-4">
            {[
              {
                num: '01',
                color: '#7C3AED',
                heading: 'JWT = Stateless auth',
                body: 'Server kuch store nahi karta. Token mein hi sab hai — userId, email, expiry. Isliye koi bhi server request verify kar sakta hai bina centralized DB ke.',
              },
              {
                num: '02',
                color: '#06B6D4',
                heading: 'Access token: 15m | Refresh token: 7d',
                body: 'Short access token compromise hone pe damage limited. Long refresh token se UX smooth. Dono ka combination security aur convenience ka balance hai.',
              },
              {
                num: '03',
                color: '#EF4444',
                heading: 'Payload PUBLIC hai — SECRET mat daalo',
                body: 'user.id, user.role — OK. password, credit card, PIN — NEVER. Payload sirf encoded hai, encrypted nahi. Anyone can decode it.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex gap-5 rounded-xl p-5"
                style={{ background: '#12121A', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span
                  className="text-2xl font-mono font-black opacity-40 flex-shrink-0 mt-0.5"
                  style={{ color: item.color }}
                >
                  {item.num}
                </span>
                <div>
                  <p className="font-semibold text-[#F5F5F7] mb-1">{item.heading}</p>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 10 — COMMON CONFUSION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Common Confusion — Myths Clear Karo</SectionLabel>
          <div className="space-y-4">
            {[
              {
                wrong: 'JWT "encrypt" hoti hai — data safe hai',
                right: 'JWT "encode" hoti hai (base64) — koi bhi decode kar sakta hai. Sirf signature verify hoti hai. Sensitive data mat daalo.',
              },
              {
                wrong: 'JWT kabhi expire nahi hoti agar store karo',
                right: 'JWT mein exp (expiry) hoti hai. Server verify karta hai. Purani token invalid ho jaati hai — chahe stored ho.',
              },
              {
                wrong: 'JWT always better hai Sessions se',
                right: 'JWT: microservices/mobile ke liye best. Sessions: simple web apps ke liye better. Context pe depend karta hai — koi universal winner nahi.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="px-5 py-3 flex items-start gap-3"
                  style={{ background: 'rgba(239,68,68,0.08)' }}
                >
                  <span className="text-[#EF4444] font-bold flex-shrink-0">❌</span>
                  <p className="text-sm text-[#EF4444]">{item.wrong}</p>
                </div>
                <div
                  className="px-5 py-3 flex items-start gap-3"
                  style={{ background: 'rgba(16,185,129,0.06)' }}
                >
                  <span className="text-[#10B981] font-bold flex-shrink-0">✅</span>
                  <p className="text-sm text-[#A1A1AA]">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 11 — CODE CONNECTION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Code Connection — Real Implementation</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Visualization mein jo dekha, wahi code mein kaise likhte hain:
          </p>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-3"
              style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-xs font-mono text-[#71717A]">jwt-auth.js</span>
            </div>
            <pre
              className="p-6 text-sm font-mono leading-relaxed overflow-x-auto"
              style={{ background: '#0D0D14', color: '#A1A1AA' }}
            >
              <code>{`// 1. Login — token generate karo
const token = jwt.sign(
  { userId: user.id, email: user.email }, // payload (PUBLIC!)
  process.env.JWT_SECRET,                  // SECRET — env variable
  { expiresIn: '15m' }                     // short lived!
);

// 2. Auth middleware — har protected route pe
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next(); // verified! continue
  } catch(e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// 3. Protected route
app.get('/api/me', auth, (req, res) => {
  // req.user set hai — no DB call needed!
  res.json({ userId: req.user.userId });
});`}</code>
            </pre>
          </div>

          {/* Code annotations */}
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            {[
              { color: '#7C3AED', label: 'jwt.sign()', note: 'Payload + SECRET = signed token. SECRET kabhi expose mat karo.' },
              { color: '#06B6D4', label: 'jwt.verify()', note: 'Signature check karta hai + expiry check karta hai automatically.' },
              { color: '#10B981', label: 'req.user', note: 'Verified user data — bina DB call ke har request mein available.' },
            ].map((ann) => (
              <div
                key={ann.label}
                className="rounded-lg p-3"
                style={{ background: `${ann.color}08`, border: `1px solid ${ann.color}20` }}
              >
                <code className="text-xs font-mono font-bold" style={{ color: ann.color }}>
                  {ann.label}
                </code>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">{ann.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 12 — NEXT STEPS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Next Steps — Aage Kya Seekho</SectionLabel>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: '🔐',
                title: 'Authentication Chapter',
                desc: 'JWT implementation se leke OAuth tak — complete authentication module',
                href: '/course/authentication-jwt',
                color: '#EF4444',
                label: 'Chapter dekho →',
              },
              {
                icon: '🛡️',
                title: 'Security Chapter',
                desc: 'Rate limiting, helmet.js, CORS, SQL injection — Node.js security complete guide',
                href: '/course/security',
                color: '#7C3AED',
                label: 'Chapter dekho →',
              },
            ].map((next) => (
              <Link
                key={next.title}
                href={next.href}
                className="group flex gap-4 rounded-xl p-5 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: `${next.color}08`,
                  border: `1px solid ${next.color}20`,
                }}
              >
                <span className="text-3xl flex-shrink-0">{next.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[#F5F5F7] mb-1">{next.title}</p>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">{next.desc}</p>
                  <span
                    className="text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: next.color }}
                  >
                    {next.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to all */}
          <div className="mt-6 text-center">
            <Link
              href="/visualizations"
              className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
            >
              ← Sab visualizations dekho
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
