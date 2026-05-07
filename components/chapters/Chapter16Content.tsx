'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function WsVsHttpDiagram() {
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">WebSockets — Visual Overview</p>
      <div className="max-w-xl mx-auto flex gap-3 flex-wrap">
        {/* HTTP side */}
        <div className="flex-1 min-w-[160px] rounded-xl p-4" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)' }}>
          <p className="text-xs font-bold text-[#F59E0B] text-center mb-3">HTTP (Request-Response)</p>
          <div className="space-y-1.5">
            {[
              { from: 'Client', to: 'Server', label: 'GET /data', color: '#F59E0B' },
              { from: 'Server', to: 'Client', label: '200 OK { data }', color: '#F59E0B' },
              { from: '—', to: '—', label: 'Connection closed', color: '#52525B' },
              { from: 'Client', to: 'Server', label: 'GET /data (again)', color: '#F59E0B' },
              { from: 'Server', to: 'Client', label: '200 OK { data }', color: '#F59E0B' },
              { from: '—', to: '—', label: 'Connection closed', color: '#52525B' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#52525B] w-10 text-right shrink-0">{row.from}</span>
                <span className="text-[10px]" style={{ color: row.color }}>→</span>
                <span className="text-[10px] font-mono" style={{ color: row.color }}>{row.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#71717A] text-center mt-3">New connection per request</p>
        </div>
        {/* WebSocket side */}
        <div className="flex-1 min-w-[160px] rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}>
          <p className="text-xs font-bold text-[#10B981] text-center mb-3">WebSocket (Persistent)</p>
          <div className="space-y-1.5">
            {[
              { msg: 'HTTP Upgrade handshake', color: '#7C3AED', both: true },
              { msg: '⟷  Connection open', color: '#10B981', both: true },
              { from: 'Client', to: 'Server', label: 'message: "ping"', color: '#10B981' },
              { from: 'Server', to: 'Client', label: 'message: "pong"', color: '#10B981' },
              { from: 'Server', to: 'Client', label: 'push: live update', color: '#06B6D4' },
              { from: 'Client', to: 'Server', label: 'message: "chat msg"', color: '#10B981' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {row.both ? (
                  <span className="text-[10px] font-mono" style={{ color: row.color }}>{row.msg}</span>
                ) : (
                  <>
                    <span className="text-[10px] text-[#52525B] w-10 text-right shrink-0">{row.from}</span>
                    <span className="text-[10px]" style={{ color: row.color }}>→</span>
                    <span className="text-[10px] font-mono" style={{ color: row.color }}>{row.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#71717A] text-center mt-3">Single connection, bidirectional</p>
        </div>
      </div>
    </div>
  )
}

export default function Chapter16Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          WebSockets & Real-time — Live Features Banao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Kya aap jaante ho ki WhatsApp messages real-time kaam karte hain? Ye HTTP se possible nahi hai. HTTP model mein server kabhi bhi client se pehle baat nahi kar sakta — client poochhe, server jawaab de. One-way street. WebSocket ek highway hai — dono direction mein ek saath traffic. Server kabhi bhi data push kar sakta hai bina client ke poochhe.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socket.IO WebSocket ke upar ek smart abstraction hai — automatic fallbacks, rooms, namespaces, reconnection sab built-in. Real-time features add karna is chapter ke baad simple ho jaayega. Aur scaling WebSockets — multiple servers mein — Redis adapter se possible hai.
        </p>
      </div>

      <WsVsHttpDiagram />

      <div id="http-vs-websocket">
        <ConceptCard
          title="HTTP vs WebSocket — Kab Kaunsa?"
          emoji="🔌"
          difficulty="advanced"
          whatIsIt="HTTP socho walkie-talkie ki tarah — ek baar bolo, jawab suno, over. WebSocket socho phone call ki tarah — line open hai, dono side kabhi bhi bol sakte hain. HTTP polling — har 2 seconds ek HTTP request — walkie talkie pe har 2 seconds 'koi update?' bol ke check karna. WebSocket — phone call open hai, update aate hi instantly suna lo. Polling inefficient hai, WebSocket real-time hai."
          whenToUse={[
            'WebSocket: Chat, collaborative editing, live notifications',
            'WebSocket: Trading platforms, gaming, live sports scores',
            'HTTP polling: Simple status checks, infrequent updates',
            'SSE: One-way server push — live feed, logs — simpler than WebSocket',
          ]}
          whyUseIt="Ab sawaal ye aata hai — polling itna bad kyun hai? Math karo: 10,000 users, har 2 seconds ek request = 5 requests/second/user = 50,000 requests/second total. 90% empty responses — koi update nahi tha. Sirf overhead. WebSocket: 10,000 persistent connections — server push karo sirf jab actual update ho. Infrastructure cost dramatically kam, true real-time experience. SSE (Server-Sent Events) consider karo agar sirf server-to-client data chahiye — simpler, HTTP-based."
          howToUse={{
            filename: 'ws-comparison.ts',
            language: 'typescript',
            code: `// ❌ Polling approach — inefficient
function pollForUpdates() {
  setInterval(async () => {
    const res = await fetch('/api/notifications')
    const data = await res.json()
    if (data.hasNew) updateUI(data.notifications)
  }, 2000)  // Har 2 seconds — unnecessary load
}

// ❌ Long polling — slightly better
async function longPoll() {
  while (true) {
    const res = await fetch('/api/notifications/wait')  // Server 30s tak wait karta hai
    const data = await res.json()
    updateUI(data)  // Response aane par immediately next request
  }
}

// ✅ WebSocket — true real-time
const ws = new WebSocket('wss://api.myapp.com/ws')

ws.onopen = () => {
  console.log('Connected!')
  ws.send(JSON.stringify({ type: 'subscribe', channel: 'notifications' }))
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  updateUI(data)  // Server push — instant!
}

ws.onerror = (err) => console.error('WebSocket error:', err)

ws.onclose = (event) => {
  console.log('Disconnected:', event.code, event.reason)
  // Reconnect logic
  setTimeout(connectWebSocket, 1000 * Math.min(reconnectAttempts++, 30))
}

// WebSocket vs SSE decision:
// Bidirectional needed? → WebSocket
// Server → Client only? → SSE (simpler, HTTP based)
// Automatic reconnect, EventSource API → SSE
// Binary data, custom protocols → WebSocket`,
            explanation: "Under the hood: WebSocket handshake HTTP se start hota hai — GET request with Upgrade: websocket header. Server 101 Switching Protocols respond karta hai. Same TCP connection ab WebSocket protocol use karta hai. wss:// = TLS encrypted WebSocket. Reconnection native WebSocket mein manual hai — exponential backoff implement karo. SSE simpler hai server-push only ke liye — HTTP long connection hai, browser EventSource API auto-reconnect karta hai.",
          }}
          realWorldScenario="Stock trading app: price har 100ms update hoti hai. 10,000 users. Polling at 1 second interval: 10,000 requests/second — server overwhelmed. WebSocket: 10,000 persistent connections open, server sirf tab push kare jab price change ho — manageable. Real difference: WebSocket ke saath 1 server handle karta hai, polling ke saath 10 servers chahiye. Ye cost difference hai."
          commonMistakes={[
            {
              mistake: 'WebSocket har jagah use karna HTTP ki jagah',
              why: 'WebSocket persistent connections overhead hai — koi real-time requirement nahi toh HTTP better. Cache, load balancer, CDN sab HTTP ke saath better work karte hain.',
              fix: 'Real-time requirement analyze karo. User action ke baad response chahiye? HTTP theek hai. Server initiative se data push? WebSocket/SSE.',
            },
            {
              mistake: 'WebSocket reconnection handle nahi karna',
              why: 'Network briefly drop ho — WebSocket dead — user ko pata nahi — stale state. Frustrating UX.',
              fix: 'Exponential backoff se reconnect karo. Reconnect hone par state sync karo. Socket.IO automatic reconnect handle karta hai.',
            },
          ]}
          proTip="WebSocket infrastructure manage karna complex hai — scaling, reconnection, sticky sessions. Agar real-time features chahiye lekin infrastructure pain nahi — Pusher, Ably, Supabase Realtime managed services hain. Per-connection billing. Khud scale karna sirf tab jab control chahiye ya cost bahut zyada ho. ws package Socket.IO se lighter hai agar abstraction ki zaroorat nahi. Pehle simple shuru karo, optimize later."
        />
      </div>

      <div id="socketio-basics">
        <ConceptCard
          title="Socket.IO — Connect, Emit, On"
          emoji="🔌"
          difficulty="advanced"
          whatIsIt="Socket.IO socho ek enhanced phone system ki tarah — sirf calling nahi, conference rooms bhi (socket rooms), different departments ke liye alag lines bhi (namespaces), automatic redial agar call drop ho (reconnection), aur purana fallback system bhi agar modern line nahi hoti (polling fallback). Raw WebSocket se Socket.IO mein shift karo: 50 lines of manual reconnection code gone, rooms gone, namespace gone — sab built-in."
          whenToUse={[
            'Chat applications — real-time messaging',
            'Live collaboration — Google Docs jaise',
            'Notifications — server-sent real-time alerts',
            'Gaming — multiplayer, real-time state sync',
          ]}
          whyUseIt="Ab sawaal ye aata hai — Socket.IO overhead hai, raw ws use karein? Trade-off samjho: ws smaller bundle, faster, lekin reconnection, rooms, namespaces sab manually implement. Socket.IO overhead hai lekin ye all problems already solved karta hai. Corporate firewalls kabhi kabhi WebSocket block karte hain — Socket.IO polling fallback pe automatically switch karta hai. Event-based API (emit/on) debugging mein bohot helpful hai — named events clearly intent show karte hain."
          howToUse={{
            filename: 'socketio-server.ts',
            language: 'typescript',
            code: `import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import express from 'express'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 60000,   // 60s timeout
  pingInterval: 25000,  // 25s ping
})

// Authentication middleware
io.use(async (socket: Socket, next) => {
  const token = socket.handshake.auth.token as string
  try {
    const payload = verifyAccessToken(token)
    socket.data.userId = payload.userId
    next()
  } catch {
    next(new Error('Authentication failed'))
  }
})

io.on('connection', (socket: Socket) => {
  const userId = socket.data.userId as string
  console.log(\`User \${userId} connected: \${socket.id}\`)

  // User apne room mein join karo
  socket.join(\`user:\${userId}\`)

  // Event handlers
  socket.on('join:room', (roomId: string) => {
    socket.join(roomId)
    socket.to(roomId).emit('user:joined', { userId, socketId: socket.id })
  })

  socket.on('message:send', async (data: { roomId: string; text: string }) => {
    // DB mein save karo
    const message = await saveMessage(userId, data.roomId, data.text)

    // Room mein sab ko bhejo
    io.to(data.roomId).emit('message:new', message)
  })

  socket.on('disconnect', (reason) => {
    console.log(\`User \${userId} disconnected: \${reason}\`)
    socket.to(\`user:\${userId}\`).emit('user:offline', { userId })
  })
})

httpServer.listen(3001)

// Server se client ko directly bhejo
function notifyUser(userId: string, event: string, data: unknown) {
  io.to(\`user:\${userId}\`).emit(event, data)
}`,
            explanation: "Under the hood: socket.join() Socket.IO ke internal room map mein socket ID add karta hai. io.to(room).emit() sab connected sockets ko iterate karte hue message deliver karta hai. socket.data server-side metadata storage hai — JWT se extracted userId store karo, request pe access karo. io.use() middleware chain — authentication, rate limiting sab yahan. socket.handshake.auth se connection-time credentials access karo.",
          }}
          realWorldScenario="Customer support chat step-by-step: Customer connect kare — room mein join karo (ticket:123). Agent connect kare — same room join karo. Customer message bheje — socket.on('message:send') fire hota hai — DB mein save karo — io.to('ticket:123').emit('message:new') — agent turant dekhe. Agent reply kare — same flow. Admin panel alag namespace mein — /admin — sab active chats monitor kare. Ek setup, complete real-time experience."
          commonMistakes={[
            {
              mistake: 'Socket.IO HTTP server ke saath properly integrate nahi karna',
              why: 'Express app par directly Socket.IO lagane se CORS issues aate hain, upgrade nahi hota properly.',
              fix: 'httpServer = createServer(expressApp); io = new Server(httpServer). Socket.IO HTTP server par attach karo, Express app par nahi.',
            },
            {
              mistake: 'Connection par baar baar event listeners add karna',
              why: 'Reconnection par naye listeners add hote rehte hain — duplicate events, memory leak.',
              fix: 'Listeners sirf ek baar add karo (io.on("connection") block mein andar). Socket.IO reconnection par same socket reuse karta hai.',
            },
          ]}
          proTip={'Socket.IO admin UI (@socket.io/admin-ui) ek powerful monitoring tool hai — active rooms, connected clients, emitted events sab real-time dashboard mein. Development debugging ke liye invaluable. Production mein auth: { type: "basic", username, password } lagao — unsecured admin UI dangerous hai. Room membership dekho, stuck connections identify karo, events trace karo.'}
        />
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-[#A78BFA] font-semibold mb-2">🤔 Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socket.IO connect kar liya, basic emit/on samajh gaya — lekin real apps mein complexity hai. Chat room mein message bhejo toh sirf room mein log sunein — global nahi. User join ho toh sirf room mein announce karo — sender ko nahi batana. Ye sab broadcasting patterns hain — aur inhe galat use karna ek common bug hai.
        </p>
      </div>

      <div id="broadcasting">
        <ConceptCard
          title="Broadcasting — Rooms & Namespaces"
          emoji="📢"
          difficulty="advanced"
          whatIsIt="Broadcasting ke 4 flavors hain — aur inhe confuse karna bugs create karta hai. io.emit(): announcement mic — har koi sunta hai (global). io.to(room).emit(): classroom mein bolna — sirf room mein jo hain. socket.broadcast.emit(): baaki sabko bolna — khud ko chhodkar sab suno. socket.to(room).emit(): room mein — lekin khud ko nahi. Namespaces completely separate channels hain — different auth, different logic, different rooms."
          whenToUse={[
            'Rooms: Chat rooms, game lobbies, document collaboration sessions',
            'Broadcast to all: Global announcements, maintenance alerts',
            'Broadcast except sender: User joined notification to others',
            'Namespaces: Different features alag channels — /chat, /notifications',
          ]}
          whyUseIt="Ab sawaal ye aata hai — 'user:joined' notification bhejte waqt sender ko bhi bhejein? User khud toh joined hua — woh jaanta hai. socket.broadcast.emit() ya socket.to(room) sender ko skip karta hai — correct UX. Privacy concern: io.emit() global broadcast hai — har room ke har user ko message milta hai. Always use io.to(roomId) — scoped broadcast. Namespaces alag middleware allow karte hain — /admin namespace pe admin auth lagao, /chat pe user auth."
          howToUse={{
            filename: 'broadcasting.ts',
            language: 'typescript',
            code: `// Broadcasting patterns
io.on('connection', (socket) => {

  // 1. Sab connected clients ko (sender bhi)
  io.emit('announcement', { message: 'Server maintenance in 30 min' })

  // 2. Specific room ko
  io.to('room:general').emit('newMessage', messageData)

  // 3. Sender ko chhodkar sab ko
  socket.broadcast.emit('userJoined', { userId: socket.data.userId })

  // 4. Room mein — sender chhodkar
  socket.to('room:general').emit('userJoined', { userId: socket.data.userId })

  // 5. Multiple rooms
  io.to('room:a').to('room:b').emit('notification', data)

  // 6. Specific socket ID ko (private message)
  io.to(targetSocketId).emit('privateMessage', data)
})

// Namespaces — feature separation
const chatNs = io.of('/chat')
const adminNs = io.of('/admin')

chatNs.use(chatMiddleware)
adminNs.use(adminAuthMiddleware)

chatNs.on('connection', (socket) => {
  socket.on('message', (data) => {
    chatNs.to(data.room).emit('newMessage', data)
  })
})

adminNs.on('connection', (socket) => {
  // Admin-only events
  socket.on('kickUser', (userId: string) => {
    io.to(\`user:\${userId}\`).emit('kicked')
    io.in(\`user:\${userId}\`).disconnectSockets(true)
  })
})

// Client namespace connect
// const chatSocket = io('/chat')
// const adminSocket = io('/admin')

// Dynamic rooms — ek socket multiple rooms mein
socket.join(['room:general', 'room:tech', \`user:\${userId}\`])

// Room members list
const roomSockets = await io.in('room:general').fetchSockets()
console.log(\`\${roomSockets.length} users in room:general\`)`,
            explanation: "Under the hood: Rooms socket IDs ke sets hain — join karo = Set mein add, leave = remove. io.to(room).emit() internally room ke sab socket IDs iterate karta hai aur message deliver karta hai. Namespaces completely isolated hain — alag event listeners, alag middleware, alag rooms. fetchSockets() room mein connected sockets ki list deta hai — online user count ke liye. io.in(room).disconnectSockets() — sab users ek saath kick out.",
          }}
          realWorldScenario="Google Docs-like collaboration: /document namespace — real-time character insertions broadcast to room (except sender). Cursor position update: socket.to(docRoom) — sender ko nahi (usne khud move kiya). User joins: socket.broadcast.emit() to room — sab dekhein. /admin namespace — managers active document sessions monitor karein alag auth se. Har concern cleanly separated."
          commonMistakes={[
            {
              mistake: 'Room mein sab ko bhejne ke bajaye io.emit() use karna',
              why: 'io.emit() har connected client ko bhejta hai — unrelated rooms ke users bhi receive karte hain. Privacy issue.',
              fix: 'io.to(roomId).emit() use karo sirf room members ke liye. User-specific ke liye io.to(socket.id).emit() ya user room.',
            },
            {
              mistake: 'socket.id rely karna user identification ke liye',
              why: 'socket.id reconnection par change hota hai — temporary identifier hai, not stable user ID.',
              fix: 'socket.data.userId use karo (JWT se authenticate karo connection par). User room pattern: socket.join(`user:${userId}`).',
            },
          ]}
          proTip={`Socket.IO acknowledgements ek powerful feature hai — reliable delivery guarantee ke liye. socket.emit('message', data, (ack) => { if (ack.status === 'ok') markDelivered() }). Server: socket.on('message', (data, callback) => { saveMessage(data).then(() => callback({ status: 'ok' })) }). Fire-and-forget nahi — confirmation milti hai. Critical messages ke liye — chat delivery receipts, order confirmations — ye pattern use karo.`}
        />
      </div>

      <div id="scaling-websockets">
        <ConceptCard
          title="Scaling WebSockets — Redis Adapter"
          emoji="📈"
          difficulty="advanced"
          whatIsIt="Ek server par WebSockets simple hai. Lekin do servers par ek surprising problem: User A Server 1 se connected, User B Server 2 se connected. User A message bheje User B ko — Server 1 ne Server 2 ko kaise bataya? Ye island problem hai — servers ek doosre se isolated hain. Redis adapter bridge kaam karta hai: sab servers Redis pub/sub se connected — ek server broadcast kare, Redis baaki sab servers ko notify kare, sab servers apne connected users ko deliver karein."
          whenToUse={[
            'Multiple Node.js processes (cluster mode)',
            'Multiple servers (horizontal scaling)',
            'Zero-downtime deployments — users reconnect different servers par',
            'High availability — ek server crash hone par doosra serve kare',
          ]}
          whyUseIt="Ab sawaal ye aata hai — Redis adapter ke saath performance pe kya impact padta hai? Har emit ek Redis pub/sub operation hai — thoda latency add hota hai. Lekin ye trade-off worth it hai kyunki horizontal scaling possible hoti hai — ek server pe 10,000 WebSocket connections limit hai, 10 servers ke saath 100,000. Aur ek server crash karne pe baaki serve karte rehte hain. Redis ek baar bottleneck nahi — Redis cluster bhi scale kar sakte hain."
          howToUse={{
            filename: 'redis-adapter.ts',
            language: 'typescript',
            code: `import { createServer } from 'http'
import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'

async function createSocketServer() {
  const httpServer = createServer(expressApp)

  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL },
  })

  // Redis adapter — multiple servers sync karo
  const pubClient = createClient({ url: process.env.REDIS_URL })
  const subClient = pubClient.duplicate()  // Separate connection for subscriptions

  await Promise.all([pubClient.connect(), subClient.connect()])

  io.adapter(createAdapter(pubClient, subClient))

  console.log('Socket.IO with Redis adapter ready')

  io.on('connection', (socket) => {
    // Room join — Redis mein propagated hoti hai
    socket.join(\`user:\${socket.data.userId}\`)

    socket.on('message', async (data) => {
      // Ye emit sab servers ke connected clients ko jaayega
      io.to(data.roomId).emit('newMessage', data)
      // Redis pub/sub internally message route karta hai
    })
  })

  return { io, httpServer }
}

// Emit from outside (e.g., API route → Socket event)
import { emitToUsers } from './socket-emitter'

async function sendNotification(userId: string, notification: Notification) {
  await db.notification.create({ data: notification })
  // Emit to user — Redis adapter ensure karta hai sahi server tak pahunche
  io.to(\`user:\${userId}\`).emit('notification:new', notification)
}

// PM2 cluster mode ke saath
// pm2 start server.js -i max  // CPU count instances
// Redis adapter sab instances sync karta hai`,
            explanation: "Under the hood: pubClient publish karta hai (io.emit → Redis PUBLISH). subClient subscribe karta hai (Redis SUBSCRIBE → incoming messages handle karo). Dono alag connections zaroori hain — Redis protocol mein SUBSCRIBE mode mein sirf subscribe commands allowed hain, PUBLISH nahi. io.to(room) internally Redis pub/sub se propagate hota hai — koi bhi server broadcast kar sakta hai, sab servers apne room members ko deliver karte hain. Connection flow: Server A emit → Redis → Server B/C/D receive → apne users ko deliver.",
          }}
          realWorldScenario="Chat platform 100,000 concurrent users: 10 servers — 10,000 users each. User A (Server 1) message bheje User B (Server 5) ko: 1) Server 1 Redis pe PUBLISH kare. 2) Server 5 Redis se message receive kare. 3) Server 5 User B ko deliver kare. User A aur B: lag free messaging. Ek server crash kare? 9,000 users reconnect — remaining 9 servers serve karte hain. Horizontal scaling working."
          commonMistakes={[
            {
              mistake: 'Pub aur sub ke liye same Redis client use karna',
              why: 'Redis mein jab connection SUBSCRIBE mode mein hota hai toh sirf subscribe commands accept hote hain — PUBLISH nahi.',
              fix: 'Hamesha two separate clients — pubClient aur subClient = pubClient.duplicate(). Redis adapter documentation clearly ye state karta hai.',
            },
            {
              mistake: 'Sticky sessions configure nahi karna load balancer par',
              why: 'HTTP polling fallback (when WS unavailable) — multiple HTTP requests same server par jaane chahiye. Different servers = session lost.',
              fix: 'Nginx ip_hash ya cookie-based sticky sessions configure karo. WebSocket preferred raho — avoid polling fallback. Redis adapter WS mode mein sticky sessions ki zaroorat nahi.',
            },
          ]}
          proTip={`Socket.IO Redis adapter ke saath ek important subtlety: room membership persist nahi hoti server restart ke baad — Redis mein sirf pub/sub hota hai, room state memory mein hoti hai. Reconnect par client ko explicitly room rejoin karna padta hai. Pattern: client reconnect event pe server ko active rooms bhejo, server rejoin kare. State management real-time apps mein critical hai — ye carefully design karo pehle se.`}
        />
      </div>

      <div id="sse">
        <ConceptCard
          title="SSE — Server-Sent Events"
          emoji="📡"
          difficulty="advanced"
          whatIsIt="SSE socho ek radio broadcast ki tarah — radio station (server) continuously emit karta hai, listeners (clients) sun te hain. Koi reverse communication nahi. WebSocket phone call tha — bidirectional. SSE radio — one way, simple. ChatGPT streaming responses SSE se implement hote hain — server har token generate karte hi push karta hai, user gradually text appear hote dekhta hai. HTTP pe kaam karta hai — CDN friendly, proxy friendly, load balancer friendly."
          whenToUse={[
            'AI chat streaming — OpenAI response ek baar aane ka wait nahi',
            'Live activity feeds — notifications, transaction updates',
            'Real-time logs streaming — deployment progress, build logs',
            'Simple server push — chat client side nahi chahiye, SSE better',
          ]}
          whyUseIt="Ab sawaal ye aata hai — SSE ya WebSocket? Decision tree: Bidirectional chahiye? → WebSocket. Sirf server → client? → SSE. SSE ke advantages: HTTP pe kaam karta hai — CDN, load balancers sab automatically handle karte hain. Browser EventSource API built-in auto-reconnect karta hai — ye free mein milta hai. WebSocket ke liye reverse proxy special config chahiye. SSE ke liye — kuch extra nahi. Simplicity wins jab bidirectionality nahi chahiye."
          howToUse={{
            filename: 'sse-server.ts',
            language: 'typescript',
            code: `import { Request, Response } from 'express'

// SSE endpoint
app.get('/api/stream/notifications', authenticate, (req: Request & { userId?: string }, res: Response) => {
  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')  // Nginx buffering disable
  res.flushHeaders()  // Headers immediately bhejo

  // Helper function
  const sendEvent = (event: string, data: unknown) => {
    res.write(\`event: \${event}\n\`)
    res.write(\`data: \${JSON.stringify(data)}\n\n\`)  // Double newline = event end
  }

  // Initial connection confirm
  sendEvent('connected', { timestamp: Date.now() })

  // Periodic heartbeat — connection alive rakho
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n')  // Comment line — client ignore karta hai
  }, 30000)

  // Notification stream
  const unsubscribe = notificationBus.subscribe(req.userId!, (notification) => {
    sendEvent('notification', notification)
  })

  // Client disconnect hone par cleanup
  req.on('close', () => {
    clearInterval(heartbeat)
    unsubscribe()
    console.log(\`SSE connection closed for user \${req.userId}\`)
  })
})

// OpenAI streaming with SSE
app.post('/api/chat', authenticate, async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.flushHeaders()

  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: req.body.messages,
    stream: true,
  })

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content ?? ''
    if (text) res.write(\`data: \${JSON.stringify({ text })}\n\n\`)
  }

  res.write('data: [DONE]\n\n')
  res.end()
})

// Client side
const source = new EventSource('/api/stream/notifications')
source.addEventListener('notification', (e) => {
  const notif = JSON.parse(e.data)
  showNotification(notif)
})`,
            explanation: "Under the hood: SSE format specific hai — event: eventName\\ndata: payload\\n\\n (double newline = event end). : comment line hai — heartbeat ke liye use hota hai, proxy connections alive rakhne ke liye. flushHeaders() immediately headers flush karta hai — warna Nginx/Express buffer karte hain aur client ko kuch nahi milta. req.on('close') client disconnect detect karta hai — cleanup zaroori hai warna memory leak (intervals, subscriptions). OpenAI streaming: for await chunk yield karo, SSE se push karo.",
          }}
          realWorldScenario="ChatGPT streaming step-by-step: User message bheje. Server OpenAI API ko call kare stream:true ke saath. OpenAI har token pe yield kare. Server SSE ke through har token client ko push kare — res.write('data: ...'). Browser gradually token by token render kare. Without SSE: full response wait karo (5-10 seconds silent), phir suddenly sab dikhao. With SSE: response immediately shuru hota hai — UX dramatically better. Ye wahi pattern hai jo ChatGPT, Claude use karte hain."
          commonMistakes={[
            {
              mistake: 'Nginx buffering disable nahi karna',
              why: 'Nginx by default responses buffer karta hai — SSE chunks accumulate hote hain, client ko late ya batched milte hain — real-time feel lost.',
              fix: "X-Accel-Buffering: no header set karo. Nginx config mein bhi: proxy_buffering off; FastAPI / Node.js dono ke liye yahi fix hai.",
            },
            {
              mistake: 'SSE mein client authentication handle nahi karna',
              why: 'EventSource cookies support karta hai lekin custom headers nahi — Bearer token pass karna mushkil.',
              fix: "URL mein token pass karo (short-lived): /api/stream?token=xxx. Ya cookie-based auth use karo (EventSource automatic cookies bhejta hai). Ya WebSocket use karo agar bidirectional auth needed.",
            },
          ]}
          proTip="SSE ki ek hidden gotcha: browser per domain sirf 6 HTTP connections rakhta hai (HTTP/1.1). Multiple SSE streams ek page pe tabs across bhi count hoti hain — sab SSE connections ek domain se. Solution 1: Multiplexed SSE — ek connection pe sab events merge karo. Solution 2: HTTP/2 enable karo — 100+ streams possible. Production mein hamesha HTTP/2 use karo SSE ke saath. Nginx config mein listen 443 ssl http2 add karo."
        />
      </div>
    </div>
  )
}
