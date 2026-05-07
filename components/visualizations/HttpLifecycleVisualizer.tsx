'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Speed = 'slow' | 'normal' | 'fast'
type Route = 'GET /users' | 'POST /users' | 'GET /users/:id' | 'Invalid (404)'

const SPEED_MULTIPLIER: Record<Speed, number> = { slow: 3, normal: 1.5, fast: 0.6 }

interface Stage {
  id: string
  label: string
  icon: string
  duration: number
  detail: {
    title: string
    data: string
    code: string
    time: string
  }
}

const STAGES: Stage[] = [
  {
    id: 'browser',
    label: 'Browser',
    icon: '🌐',
    duration: 0,
    detail: {
      title: 'HTTP Request',
      data: 'GET /api/users HTTP/1.1\nHost: api.example.com\nAccept: application/json\nAuthorization: Bearer <token>',
      code: 'fetch("/api/users", {\n  headers: { Authorization: `Bearer ${token}` }\n})',
      time: '0ms',
    },
  },
  {
    id: 'dns',
    label: 'DNS Lookup',
    icon: '🔍',
    duration: 20,
    detail: {
      title: 'DNS Resolution',
      data: 'api.example.com → 192.168.1.1',
      code: '// Browser queries DNS resolver\n// Cache miss → authoritative DNS\n// TTL: 300s',
      time: '~20ms',
    },
  },
  {
    id: 'tcp',
    label: 'TCP',
    icon: '🤝',
    duration: 5,
    detail: {
      title: 'TCP 3-Way Handshake',
      data: 'Client → Server: SYN\nServer → Client: SYN-ACK\nClient → Server: ACK',
      code: '// Establishes reliable connection\n// SYN → SYN-ACK → ACK\n// Connection ready for data',
      time: '~5ms',
    },
  },
  {
    id: 'tls',
    label: 'TLS',
    icon: '🔐',
    duration: 10,
    detail: {
      title: 'TLS 1.3 Handshake',
      data: 'ClientHello → ServerHello\nCertificate verification\nSession keys established',
      code: '// TLS 1.3 reduces to 1-RTT\n// Certificate: Let\'s Encrypt\n// Cipher: AES-256-GCM',
      time: '~10ms',
    },
  },
  {
    id: 'express',
    label: 'Express',
    icon: '⚙️',
    duration: 5,
    detail: {
      title: 'Express Middleware Chain',
      data: 'Request → helmet → cors → json → auth → route',
      code: 'app.use(helmet())\napp.use(cors())\napp.use(express.json())\napp.use(authMiddleware)',
      time: '~2ms',
    },
  },
  {
    id: 'handler',
    label: 'Route Handler',
    icon: '📋',
    duration: 100,
    detail: {
      title: 'Route Handler Execution',
      data: 'Query → DB → JSON serialization',
      code: 'app.get("/api/users", async (req, res) => {\n  const users = await User.findAll()\n  res.json(users)\n})',
      time: '~100ms',
    },
  },
  {
    id: 'response',
    label: 'Response',
    icon: '✅',
    duration: 0,
    detail: {
      title: 'HTTP Response Sent',
      data: 'HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 1842',
      code: 'res.status(200).json({\n  data: users,\n  total: users.length\n})',
      time: '145ms total',
    },
  },
]

const MIDDLEWARES = ['helmet()', 'cors()', 'express.json()', 'authMiddleware', 'Route Handler']

const ROUTE_CONFIGS: Record<Route, { method: string; path: string; status: number; color: string }> = {
  'GET /users': { method: 'GET', path: '/api/users', status: 200, color: '#10B981' },
  'POST /users': { method: 'POST', path: '/api/users', status: 201, color: '#7C3AED' },
  'GET /users/:id': { method: 'GET', path: '/api/users/42', status: 200, color: '#06B6D4' },
  'Invalid (404)': { method: 'GET', path: '/api/invalid', status: 404, color: '#EF4444' },
}

export default function HttpLifecycleVisualizer() {
  const [activeStage, setActiveStage] = useState<number>(-1)
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const [animating, setAnimating] = useState(false)
  const [speed, setSpeed] = useState<Speed>('slow')
  const [route, setRoute] = useState<Route>('GET /users')
  const [packetX, setPacketX] = useState(0)
  const [showMiddleware, setShowMiddleware] = useState(false)
  const [middlewareStep, setMiddlewareStep] = useState(-1)
  const [responseTravel, setResponseTravel] = useState(false)
  const abortRef = useRef(false)

  const routeConfig = ROUTE_CONFIGS[route]

  const sleep = (ms: number) =>
    new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        if (abortRef.current) reject(new Error('aborted'))
        else resolve()
      }, ms * SPEED_MULTIPLIER[speed])
      return timer
    })

  const reset = () => {
    abortRef.current = true
    setTimeout(() => {
      abortRef.current = false
      setActiveStage(-1)
      setCompleted(new Set())
      setAnimating(false)
      setPacketX(0)
      setShowMiddleware(false)
      setMiddlewareStep(-1)
      setResponseTravel(false)
    }, 100)
  }

  const handleSendRequest = async () => {
    reset()
    await new Promise(r => setTimeout(r, 150))
    setAnimating(true)
    abortRef.current = false

    try {
      for (let i = 0; i < STAGES.length; i++) {
        setActiveStage(i)
        setPacketX((i / (STAGES.length - 1)) * 100)

        if (STAGES[i].id === 'express') {
          setShowMiddleware(true)
          for (let m = 0; m < MIDDLEWARES.length; m++) {
            setMiddlewareStep(m)
            await sleep(300)
          }
          setShowMiddleware(false)
          setMiddlewareStep(-1)
        }

        if (STAGES[i].duration > 0) {
          await sleep(STAGES[i].duration * 3)
        } else {
          await sleep(400)
        }

        if (route === 'Invalid (404)' && i === STAGES.length - 2) {
          setCompleted(prev => new Set(Array.from(prev).concat(i)))
          setActiveStage(STAGES.length - 1)
          await sleep(400)
          break
        }

        setCompleted(prev => new Set(Array.from(prev).concat(i)))
      }

      setResponseTravel(true)
      await sleep(500)
    } catch {
      // aborted
    } finally {
      setAnimating(false)
    }
  }

  const activeStageData = activeStage >= 0 ? STAGES[activeStage] : null

  return (
    <div className="space-y-6">
      {/* Stage Timeline */}
      <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
        <h3 className="text-[#F5F5F7] font-bold mb-6">HTTP Request Lifecycle</h3>

        {/* Stage Boxes */}
        <div className="relative">
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center flex-shrink-0">
                <motion.div
                  onClick={() => setActiveStage(activeStage === i ? -1 : i)}
                  className={`w-[90px] flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    completed.has(i)
                      ? 'border-[#10B981] bg-[rgba(16,185,129,0.1)]'
                      : activeStage === i
                      ? 'border-[#7C3AED] bg-[rgba(124,58,237,0.15)]'
                      : 'border-[rgba(255,255,255,0.12)] bg-[#1A1A26]'
                  }`}
                  animate={activeStage === i && animating ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  <span className="text-xl mb-1">{stage.icon}</span>
                  <span className="text-[#F5F5F7] text-xs font-semibold text-center leading-tight">{stage.label}</span>
                  {stage.duration > 0 && (
                    <span className="text-[#A1A1AA] text-[10px] mt-1">~{stage.duration}ms</span>
                  )}
                  {completed.has(i) && (
                    <span className="text-[#10B981] text-xs mt-1">✓</span>
                  )}
                </motion.div>
                {i < STAGES.length - 1 && (
                  <div className="w-8 flex items-center justify-center relative flex-shrink-0">
                    <div className={`h-0.5 w-full transition-colors ${
                      completed.has(i) ? 'bg-[#10B981]' : 'bg-[rgba(255,255,255,0.12)]'
                    }`} />
                    {completed.has(i) && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute text-[#10B981] text-xs"
                      >
                        →
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Travelling Packet */}
          {animating && (
            <div className="relative h-6 mt-2">
              <motion.div
                className="absolute top-0 w-8 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-lg"
                style={{ backgroundColor: routeConfig.color }}
                animate={{ left: `${packetX}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {routeConfig.method.slice(0, 3)}
              </motion.div>
            </div>
          )}

          {/* Response packet travelling back */}
          {responseTravel && (
            <div className="relative h-6 mt-1">
              <motion.div
                className="absolute top-0 w-10 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: routeConfig.status === 200 || routeConfig.status === 201 ? '#10B981' : '#EF4444' }}
                initial={{ left: '100%' }}
                animate={{ left: '0%' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                {routeConfig.status}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Middleware Chain (when express stage active) */}
      <AnimatePresence>
        {showMiddleware && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(124,58,237,0.4)] rounded-2xl p-6"
          >
            <h3 className="text-[#7C3AED] font-bold mb-4">Express Middleware Pipeline</h3>
            <div className="flex gap-6">
              {/* Request going down */}
              <div className="flex-1">
                <div className="text-[#06B6D4] text-xs font-bold mb-2 text-center">REQUEST ↓</div>
                <div className="space-y-2">
                  {MIDDLEWARES.map((mw, i) => (
                    <motion.div
                      key={mw}
                      className={`p-3 rounded-lg border text-sm font-mono transition-all ${
                        middlewareStep === i
                          ? 'border-[#7C3AED] bg-[rgba(124,58,237,0.2)] text-[#F5F5F7]'
                          : middlewareStep > i
                          ? 'border-[#10B981] bg-[rgba(16,185,129,0.1)] text-[#10B981]'
                          : 'border-[rgba(255,255,255,0.08)] text-[#71717A]'
                      }`}
                      animate={middlewareStep === i ? { x: [0, 4, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      {middlewareStep > i && '✓ '}{mw}
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Response going up */}
              <div className="flex-1">
                <div className="text-[#F59E0B] text-xs font-bold mb-2 text-center">RESPONSE ↑</div>
                <div className="space-y-2">
                  {[...MIDDLEWARES].reverse().map((mw) => (
                    <div
                      key={`res-${mw}`}
                      className="p-3 rounded-lg border border-[rgba(255,255,255,0.06)] text-[#71717A] text-sm font-mono"
                    >
                      {mw}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Panel + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Stage Detail */}
        <div className="lg:col-span-2 bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
          {activeStageData ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeStageData.icon}</span>
                  <div>
                    <h3 className="text-[#F5F5F7] font-bold text-lg">{activeStageData.detail.title}</h3>
                    <span className="text-[#06B6D4] text-sm font-mono">{activeStageData.detail.time}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[#A1A1AA] text-xs font-semibold uppercase tracking-wider mb-2">Data</div>
                    <pre className="bg-[#0A0A0F] rounded-lg p-3 text-[#06B6D4] text-xs font-mono whitespace-pre-wrap leading-relaxed">
                      {activeStageData.detail.data}
                    </pre>
                  </div>
                  <div>
                    <div className="text-[#A1A1AA] text-xs font-semibold uppercase tracking-wider mb-2">Code</div>
                    <pre className="bg-[#0A0A0F] rounded-lg p-3 text-[#10B981] text-xs font-mono whitespace-pre-wrap leading-relaxed">
                      {activeStageData.detail.code}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex items-center justify-center h-32 text-[#A1A1AA]">
              Click a stage or press &quot;Send Request&quot; to see details
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6 space-y-4">
          <h3 className="text-[#F5F5F7] font-bold">Controls</h3>

          <div>
            <div className="text-[#A1A1AA] text-xs font-semibold mb-2">Route</div>
            <div className="space-y-1">
              {(Object.keys(ROUTE_CONFIGS) as Route[]).map(r => (
                <button
                  key={r}
                  onClick={() => { reset(); setRoute(r) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    route === r
                      ? 'bg-[rgba(124,58,237,0.2)] border border-[#7C3AED] text-[#F5F5F7]'
                      : 'text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <span className="font-mono text-xs" style={{ color: ROUTE_CONFIGS[r].color }}>
                    [{ROUTE_CONFIGS[r].method}]
                  </span>{' '}
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[#A1A1AA] text-xs font-semibold mb-2">Speed</div>
            <div className="flex gap-1">
              {(['slow', 'normal', 'fast'] as Speed[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    speed === s
                      ? 'bg-[#7C3AED] text-white'
                      : 'bg-[#1A1A26] text-[#A1A1AA] hover:text-[#F5F5F7]'
                  }`}
                  title={s === 'slow' ? '🐢 Best for beginners' : undefined}
                >
                  {s === 'slow' ? '🐢 slow' : s}
                </button>
              ))}
            </div>
            <div className="mt-1 text-[10px] text-[#71717A]">Beginner: use 🐢 slow mode</div>
          </div>

          {/* Stage timing reference */}
          <div className="bg-[#0A0A0F] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
            <div className="text-[#A1A1AA] text-[10px] font-semibold uppercase tracking-wider mb-2">Stage Timings</div>
            <div className="space-y-1">
              {STAGES.filter(s => s.duration > 0).map(s => (
                <div key={s.id} className="flex items-center justify-between text-[10px]">
                  <span className="text-[#71717A]">{s.icon} {s.label}</span>
                  <span className="font-mono text-[#06B6D4]">{s.detail.time}</span>
                </div>
              ))}
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[#71717A]">Total</span>
                <span className="font-mono text-[#10B981]">~145ms</span>
              </div>
            </div>
          </div>

          <button
            onClick={animating ? reset : handleSendRequest}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              animating
                ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
                : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
            }`}
          >
            {animating ? '⏹ Stop' : '▶ Send Request'}
          </button>

          {responseTravel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-3 rounded-lg text-center font-bold ${
                routeConfig.status < 400
                  ? 'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-[#10B981]'
                  : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[#EF4444]'
              }`}
            >
              HTTP {routeConfig.status} {routeConfig.status < 400 ? 'OK' : 'NOT FOUND'}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
