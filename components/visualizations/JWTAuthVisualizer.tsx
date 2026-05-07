'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FlowType = 'login' | 'auth-request' | 'refresh'

interface Step {
  from: 'client' | 'server' | 'db' | 'internal-server'
  to: 'client' | 'server' | 'db' | 'internal-server'
  label: string
  detail: string
  color: string
  hinglish: string
}

const LOGIN_STEPS: Step[] = [
  {
    from: 'client', to: 'server',
    label: 'POST /auth/login',
    detail: '{ email: "user@example.com", password: "secret123" }',
    color: '#7C3AED',
    hinglish: 'Client server ko credentials bhejta hai — HTTPS encrypted channel pe.',
  },
  {
    from: 'server', to: 'db',
    label: 'SELECT user WHERE email = ?',
    detail: 'Parameterized query — SQL injection se safe',
    color: '#06B6D4',
    hinglish: 'Server DB se user dhundhta hai email ke basis pe.',
  },
  {
    from: 'db', to: 'server',
    label: 'User record returned',
    detail: '{ id: 1, email: "user@example.com", hashedPassword: "$2b$10$..." }',
    color: '#10B981',
    hinglish: 'DB ne hashed password bheja — plain password kabhi store nahi hota!',
  },
  {
    from: 'internal-server', to: 'internal-server',
    label: 'bcrypt.compare(password, hash)',
    detail: 'Timing-safe comparison — brute force se protect karta hai',
    color: '#F59E0B',
    hinglish: 'bcrypt password verify karta hai. Agar match kiya toh aage badhte hain.',
  },
  {
    from: 'internal-server', to: 'internal-server',
    label: "jwt.sign({ userId: 1 }, SECRET, { expiresIn: '15m' })",
    detail: 'Access token: 15min | Refresh token: 7 days',
    color: '#8B5CF6',
    hinglish: 'JWT token sign hota hai — SECRET key se. Ye token tamper-proof hai!',
  },
  {
    from: 'server', to: 'client',
    label: '200 OK { accessToken, refreshToken }',
    detail: 'Tokens response mein milte hain',
    color: '#10B981',
    hinglish: 'Server ne dono tokens bheje — access (15m) aur refresh (7d).',
  },
  {
    from: 'internal-server', to: 'internal-server',
    label: 'Client tokens store karta hai',
    detail: 'accessToken: memory/sessionStorage | refreshToken: httpOnly cookie',
    color: '#06B6D4',
    hinglish: 'Best practice: access token memory mein, refresh token httpOnly cookie mein.',
  },
]

const AUTH_STEPS: Step[] = [
  {
    from: 'client', to: 'server',
    label: 'GET /api/profile',
    detail: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.HMAC...',
    color: '#7C3AED',
    hinglish: 'Client har request mein Authorization header bhejta hai.',
  },
  {
    from: 'internal-server', to: 'internal-server',
    label: 'jwt.verify(token, SECRET)',
    detail: 'Signature verify → decode payload → check expiry',
    color: '#06B6D4',
    hinglish: 'Server token ki signature verify karta hai — DB query ke bina!',
  },
  {
    from: 'internal-server', to: 'internal-server',
    label: 'Token valid! userId = 1',
    detail: '{ userId: 1, iat: 1700000000, exp: 1700000900 }',
    color: '#10B981',
    hinglish: 'Token valid hai, toh req.user set ho gaya — aage proceed!',
  },
  {
    from: 'server', to: 'db',
    label: 'SELECT * FROM users WHERE id = 1',
    detail: 'Sirf is request ke liye — JWT se userId mila',
    color: '#F59E0B',
    hinglish: 'Ab server DB se actual user data fetch karta hai.',
  },
  {
    from: 'db', to: 'server',
    label: 'User data returned',
    detail: '{ id: 1, name: "Test User", email: "user@example.com" }',
    color: '#10B981',
    hinglish: 'DB ne user data bheja!',
  },
  {
    from: 'server', to: 'client',
    label: '200 OK { user data }',
    detail: 'Encrypted over HTTPS — safe!',
    color: '#10B981',
    hinglish: 'Authenticated response client ko mil gaya. JWT flow complete!',
  },
]

const REFRESH_STEPS: Step[] = [
  {
    from: 'client', to: 'server',
    label: 'POST /auth/refresh',
    detail: 'Cookie: refreshToken=eyJ... (httpOnly)',
    color: '#F59E0B',
    hinglish: 'Access token expire ho gaya — refresh token se naya lo.',
  },
  {
    from: 'internal-server', to: 'internal-server',
    label: 'jwt.verify(refreshToken, REFRESH_SECRET)',
    detail: 'Refresh token ka alag secret hota hai!',
    color: '#06B6D4',
    hinglish: 'Server refresh token verify karta hai — separate secret se.',
  },
  {
    from: 'server', to: 'db',
    label: 'Check refresh token in whitelist',
    detail: 'SELECT * FROM refresh_tokens WHERE token = ?',
    color: '#7C3AED',
    hinglish: 'Token revoke hua to nahi? DB mein check karo!',
  },
  {
    from: 'db', to: 'server',
    label: 'Token valid, not revoked',
    detail: '{ userId: 1, valid: true }',
    color: '#10B981',
    hinglish: 'Token valid hai aur revoke nahi hua.',
  },
  {
    from: 'internal-server', to: 'internal-server',
    label: "jwt.sign({ userId: 1 }, SECRET, { expiresIn: '15m' })",
    detail: 'Fresh access token generate hoga',
    color: '#8B5CF6',
    hinglish: 'Naya access token sign ho gaya!',
  },
  {
    from: 'server', to: 'client',
    label: '200 OK { newAccessToken }',
    detail: 'Client ko naya access token mila!',
    color: '#10B981',
    hinglish: 'Seamless refresh! User ko logout nahi karna pada.',
  },
]

const FLOW_STEPS: Record<FlowType, Step[]> = {
  login: LOGIN_STEPS,
  'auth-request': AUTH_STEPS,
  refresh: REFRESH_STEPS,
}

// Approximate timings for each step label
const STEP_TIMINGS: Record<string, string> = {
  'POST /auth/login': '~1ms',
  'SELECT user WHERE email = ?': '~200ms',
  'User record returned': '~200ms',
  'bcrypt.compare(password, hash)': '~100ms',
  "jwt.sign({ userId: 1 }, SECRET, { expiresIn: '15m' })": '~5ms',
  '200 OK { accessToken, refreshToken }': '~1ms',
  'Client tokens store karta hai': '<1ms',
  'GET /api/profile': '~1ms',
  'jwt.verify(token, SECRET)': '~1ms',
  'Token valid! userId = 1': '<1ms',
  'SELECT * FROM users WHERE id = 1': '~50ms',
  'User data returned': '~50ms',
  '200 OK { user data }': '~1ms',
  'POST /auth/refresh': '~1ms',
  'jwt.verify(refreshToken, REFRESH_SECRET)': '~1ms',
  'Check refresh token in whitelist': '~50ms',
  'Token valid, not revoked': '~50ms',
  '200 OK { newAccessToken }': '~1ms',
}

const JWT_TOKEN = {
  header: { alg: 'HS256', typ: 'JWT' },
  payload: { userId: 1, email: 'test@test.com', iat: 1700000000, exp: 1700000900 },
  signature: 'HMACSHA256(base64(header) + "." + base64(payload), secret)',
}

export default function JWTAuthVisualizer() {
  const [flow, setFlow] = useState<FlowType>('login')
  const [currentStep, setCurrentStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [expandedJWT, setExpandedJWT] = useState<'header' | 'payload' | 'signature' | null>(null)
  const steps = FLOW_STEPS[flow]

  const resetFlow = () => {
    setCurrentStep(-1)
    setPlaying(false)
  }

  const handlePlay = async () => {
    if (playing) { resetFlow(); return }
    setPlaying(true)
    setCurrentStep(-1)

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 300))
      setCurrentStep(i)
      await new Promise(r => setTimeout(r, 2500))
    }
    setPlaying(false)
  }

  const handleFlowChange = (f: FlowType) => {
    resetFlow()
    setFlow(f)
  }

  const stepNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1)
  }
  const stepPrev = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1)
  }

  return (
    <div className="space-y-6">
      {/* Flow tabs */}
      <div className="flex gap-2 bg-[#12121A] rounded-xl p-1 w-fit">
        {([
          { key: 'login', label: '🔐 Login Flow' },
          { key: 'auth-request', label: '✅ Authenticated Request' },
          { key: 'refresh', label: '🔄 Token Refresh' },
        ] as { key: FlowType; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleFlowChange(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              flow === key ? 'bg-[#7C3AED] text-white' : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sequence Diagram */}
        <div className="xl:col-span-2 bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
          {/* Actor Headers */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Client/Browser', icon: '🌐', color: '#7C3AED' },
              { label: 'Server/Express', icon: '⚙️', color: '#06B6D4' },
              { label: 'Database', icon: '🗄️', color: '#10B981' },
            ].map(({ label, icon, color }) => (
              <div
                key={label}
                className="flex flex-col items-center p-3 rounded-xl border-2 bg-[#1A1A26]"
                style={{ borderColor: color }}
              >
                <span className="text-2xl mb-1">{icon}</span>
                <span className="text-[#F5F5F7] text-sm font-bold text-center">{label}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <StepRow
                key={i}
                step={step}
                index={i}
                isActive={currentStep === i}
                isDone={currentStep > i}
                onClick={() => setCurrentStep(currentStep === i ? -1 : i)}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 mt-6 flex-wrap">
            {/* Step controls — prominent for beginners */}
            <button
              onClick={stepPrev}
              disabled={currentStep <= 0}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm border-2 transition-all disabled:opacity-30"
              style={{ borderColor: 'rgba(16,185,129,0.5)', color: '#10B981', background: 'rgba(16,185,129,0.1)' }}
              title="Go to previous step"
            >
              ← Prev
            </button>
            <button
              onClick={stepNext}
              disabled={currentStep >= steps.length - 1}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm border-2 transition-all disabled:opacity-30"
              style={{ borderColor: 'rgba(16,185,129,0.6)', color: '#10B981', background: 'rgba(16,185,129,0.15)' }}
              title="Best for beginners — step one at a time"
            >
              Next Step →
            </button>
            <span className="text-[10px] text-[#71717A] hidden sm:block">← Use these to go step-by-step</span>
            <div className="flex-1" />
            <button
              onClick={handlePlay}
              className={`px-4 py-2 rounded-lg font-semibold text-sm text-white transition-all ${
                playing ? 'bg-[#EF4444] hover:bg-[#DC2626]' : 'bg-[#7C3AED] hover:bg-[#6D28D9]'
              }`}
            >
              {playing ? '⏹ Stop' : '▶ Auto-play'}
            </button>
            <button onClick={resetFlow} className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] text-sm text-[#A1A1AA] hover:text-[#F5F5F7]">
              Reset
            </button>
          </div>

          {/* Active step hinglish explanation */}
          <AnimatePresence mode="wait">
            {currentStep >= 0 && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 p-4 bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.3)] rounded-xl"
              >
                <div className="text-[#7C3AED] text-xs font-bold mb-1">Step {currentStep + 1} — Explanation</div>
                <p className="text-[#A1A1AA] text-sm">{steps[currentStep].hinglish}</p>
                <div className="mt-2 bg-[#0A0A0F] rounded-lg p-2">
                  <code className="text-[#06B6D4] text-xs font-mono">{steps[currentStep].detail}</code>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* JWT Anatomy Panel */}
        <div className="space-y-4">
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-5">
            <h3 className="text-[#F5F5F7] font-bold mb-4">JWT Token Anatomy</h3>
            <p className="text-[#A1A1AA] text-xs mb-3">Click each part to decode:</p>

            {/* Token display */}
            <div className="font-mono text-xs break-all leading-relaxed mb-4 bg-[#0A0A0F] p-3 rounded-lg">
              <button
                onClick={() => setExpandedJWT(expandedJWT === 'header' ? null : 'header')}
                className="text-[#EF4444] hover:text-[#F87171] underline"
              >
                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
              </button>
              <span className="text-[#A1A1AA]">.</span>
              <button
                onClick={() => setExpandedJWT(expandedJWT === 'payload' ? null : 'payload')}
                className="text-[#7C3AED] hover:text-[#8B5CF6] underline"
              >
                eyJ1c2VySWQiOjEsImVtYWlsIjoiLi4uIn0
              </button>
              <span className="text-[#A1A1AA]">.</span>
              <button
                onClick={() => setExpandedJWT(expandedJWT === 'signature' ? null : 'signature')}
                className="text-[#06B6D4] hover:text-[#22D3EE] underline"
              >
                SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
              </button>
            </div>

            {/* Expanded part */}
            <AnimatePresence mode="wait">
              {expandedJWT && (
                <motion.div
                  key={expandedJWT}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`rounded-xl p-4 border ${
                    expandedJWT === 'header' ? 'border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.08)]' :
                    expandedJWT === 'payload' ? 'border-[rgba(124,58,237,0.4)] bg-[rgba(124,58,237,0.08)]' :
                    'border-[rgba(6,182,212,0.4)] bg-[rgba(6,182,212,0.08)]'
                  }`}>
                    <div className={`text-xs font-bold uppercase mb-2 ${
                      expandedJWT === 'header' ? 'text-[#EF4444]' :
                      expandedJWT === 'payload' ? 'text-[#7C3AED]' :
                      'text-[#06B6D4]'
                    }`}>
                      {expandedJWT === 'header' ? 'Header (Algorithm)' :
                       expandedJWT === 'payload' ? 'Payload (Claims)' :
                       'Signature (Verification)'}
                    </div>
                    <pre className="text-[#F5F5F7] text-xs font-mono whitespace-pre-wrap">
                      {expandedJWT === 'header'
                        ? JSON.stringify(JWT_TOKEN.header, null, 2)
                        : expandedJWT === 'payload'
                        ? JSON.stringify(JWT_TOKEN.payload, null, 2)
                        : JWT_TOKEN.signature}
                    </pre>
                    {expandedJWT === 'payload' && (
                      <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
                        <div className="text-[#A1A1AA] text-xs">
                          <span className="text-[#F59E0B]">iat</span> = issued at •{' '}
                          <span className="text-[#EF4444]">exp</span> = expires at (15 min)
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              {[
                { color: '#EF4444', label: 'Header', desc: 'Algorithm & token type' },
                { color: '#7C3AED', label: 'Payload', desc: 'User data (claims)' },
                { color: '#06B6D4', label: 'Signature', desc: 'Tamper-proof seal' },
              ].map(({ color, label, desc }) => (
                <div key={label} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[#F5F5F7] font-mono">{label}</span>
                  <span className="text-[#71717A]">— {desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security note */}
          <div className="bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.3)] rounded-2xl p-4">
            <div className="text-[#10B981] font-bold text-sm mb-2">🔒 Security Tips</div>
            <ul className="text-[#A1A1AA] text-xs space-y-1">
              <li>• Refresh token = httpOnly cookie</li>
              <li>• Access token = short-lived (15m)</li>
              <li>• JWT payload is NOT encrypted</li>
              <li>• Never store SECRET in frontend</li>
              <li>• Use RS256 in production</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepRow({
  step, index, isActive, isDone, onClick,
}: {
  step: Step
  index: number
  isActive: boolean
  isDone: boolean
  onClick: () => void
}) {
  const isInternal = step.from === 'internal-server'

  // Determine arrow direction & position
  const arrowStyle = (() => {
    if (isInternal) return 'center'
    if (step.from === 'client' && step.to === 'server') return 'left-to-center'
    if (step.from === 'server' && step.to === 'client') return 'center-to-left'
    if (step.from === 'server' && step.to === 'db') return 'center-to-right'
    if (step.from === 'db' && step.to === 'server') return 'right-to-center'
    return 'left-to-center'
  })()

  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left transition-all rounded-xl p-3 border ${
        isActive
          ? 'border-[rgba(124,58,237,0.5)] bg-[rgba(124,58,237,0.1)]'
          : isDone
          ? 'border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)]'
          : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
      }`}
      animate={isActive ? { x: [0, 2, 0] } : {}}
      transition={{ repeat: Infinity, duration: 0.6 }}
    >
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Left column (Client) */}
        <div className="flex justify-center">
          {(arrowStyle === 'left-to-center' || arrowStyle === 'center-to-left') && !isInternal && (
            <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg ${isActive ? 'opacity-100' : 'opacity-60'}`}
              style={{ backgroundColor: `${step.color}20`, color: step.color }}>
              {arrowStyle === 'center-to-left' && '← '}
              {step.from === 'client' ? step.label : ''}
              {arrowStyle === 'left-to-center' && ' →'}
            </div>
          )}
        </div>

        {/* Center column (Server) */}
        <div className="flex justify-center">
          {isInternal ? (
            <div className={`text-xs px-3 py-1.5 rounded-lg border font-mono max-w-full truncate ${isActive ? 'opacity-100' : 'opacity-60'}`}
              style={{
                backgroundColor: `${step.color}15`,
                borderColor: `${step.color}40`,
                color: step.color,
              }}>
              {step.label}
            </div>
          ) : (
            <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg ${isActive ? 'opacity-100' : 'opacity-60'}`}
              style={{ backgroundColor: `${step.color}20`, color: step.color }}>
              {arrowStyle === 'right-to-center' && '← '}
              {(arrowStyle === 'left-to-center' || arrowStyle === 'center-to-right') ? '' : ''}
              {(arrowStyle !== 'left-to-center' && arrowStyle !== 'right-to-center') ? step.label : step.label}
              {arrowStyle === 'center-to-right' && ' →'}
            </div>
          )}
        </div>

        {/* Right column (DB) */}
        <div className="flex justify-center">
          {(arrowStyle === 'center-to-right' || arrowStyle === 'right-to-center') && (
            <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg ${isActive ? 'opacity-100' : 'opacity-60'}`}
              style={{ backgroundColor: `${step.color}20`, color: step.color }}>
              {step.label}
            </div>
          )}
        </div>
      </div>

      {/* Step number + timing badge */}
      <div className="flex items-center gap-2 mt-1">
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
          isDone ? 'bg-[#10B981] text-white' : isActive ? 'bg-[#7C3AED] text-white' : 'bg-[#1A1A26] text-[#71717A]'
        }`}>
          {isDone ? '✓' : index + 1}
        </span>
        <span className="text-[#71717A] text-xs truncate flex-1">{step.detail}</span>
        {STEP_TIMINGS[step.label] && (
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
            style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}33` }}
          >
            {STEP_TIMINGS[step.label]}
          </span>
        )}
      </div>
    </motion.button>
  )
}
