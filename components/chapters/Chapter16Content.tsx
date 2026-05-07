'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

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
          HTTP request-response model mein server client se pehle baat nahi kar sakta — client poochhe tabhi server jawaab de. WebSocket persistent bidirectional connection hai — server kabhi bhi data push kar sakta hai. Chat, live notifications, collaborative editing — sab WebSocket se possible hota hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socket.IO WebSocket ke upar abstraction hai — automatic fallbacks, rooms, namespaces, reconnection built-in. Real-time features add karna is chapter ke baad aasaan ho jaayega.
        </p>
      </div>

      <div id="http-vs-websocket">
        <ConceptCard
          title="HTTP vs WebSocket — Kab Kaunsa?"
          emoji="🔌"
          difficulty="advanced"
          whatIsIt="HTTP: Request-Response, stateless, half-duplex — client bolta hai, server jawaab deta hai, connection close. WebSocket: Full-duplex, persistent — ek baar connect karo, dono side kabhi bhi message bhej sakte hain. Polling (frequent HTTP requests) vs WebSocket — connection overhead vs real-time push."
          whenToUse={[
            'WebSocket: Chat, collaborative editing, live notifications',
            'WebSocket: Trading platforms, gaming, live sports scores',
            'HTTP polling: Simple status checks, infrequent updates',
            'SSE: One-way server push — live feed, logs — simpler than WebSocket',
          ]}
          whyUseIt="Polling — har 2 seconds HTTP request karo — 30 requests/minute per user. 10,000 users = 300,000 requests/minute. Server hammered. WebSocket — ek persistent connection — update hone par push. Dramatically less overhead, true real-time. Polling fallback rakhna advisable hai WebSocket fail cases ke liye."
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
            explanation: "WebSocket handshake HTTP se start hota hai (Upgrade header), phir TCP connection persist karta hai. wss:// = WebSocket Secure (TLS). Reconnection manual hai native WebSocket mein — Socket.IO automatic handle karta hai. SSE simpler hai server-push only scenarios ke liye.",
          }}
          realWorldScenario="Stock trading app — price updates har 100ms aate hain. 10,000 users. Polling: 10,000 requests/second = server dead. WebSocket: 10,000 persistent connections, server push when price changes — manageable. WebSocket scales differently than HTTP — connection count matters."
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
          proTip="Socket.IO alternative: ws package (low level, lean), tRPC subscriptions, Ably/Pusher (managed WebSocket service). Managed services agar infrastructure manage nahi karna — Pusher, Ably, Supabase Realtime. Scaling WebSocket khud karna complex hai — managed service consider karo production mein."
        />
      </div>

      <div id="socketio-basics">
        <ConceptCard
          title="Socket.IO — Connect, Emit, On"
          emoji="🔌"
          difficulty="advanced"
          whatIsIt="Socket.IO library WebSocket ke upar high-level API deta hai — automatic reconnection, rooms, namespaces, event-based communication, binary support, polling fallback. Server aur client dono libraries available hain. emit() se events bhejo, on() se receive karo. Simple aur powerful."
          whenToUse={[
            'Chat applications — real-time messaging',
            'Live collaboration — Google Docs jaise',
            'Notifications — server-sent real-time alerts',
            'Gaming — multiplayer, real-time state sync',
          ]}
          whyUseIt="Raw WebSocket mein: reconnection, rooms, namespaces manually implement karna padta. Socket.IO ye sab out of the box deta hai. Polling fallback — WebSocket unavailable environments mein bhi kaam karta hai (some corporate firewalls). Event-based API intuitive aur debuggable hai."
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
            explanation: "socket.join() user-specific room mein add karta hai — targeted messaging possible. io.to(room).emit() sab room members ko bhejo. socket.to(room) sender ke alawa sab ko. socket.data authenticated user info store karta hai. io.use() middleware authentication ke liye.",
          }}
          realWorldScenario="Customer support chat — agent aur customer ek room mein. Customer message bheje, agent turant dekhe. Agent reply kare, customer real-time dekhe. Admin panel mein active chats monitor karo. Ek Socket.IO setup se saara real-time functionality milti hai."
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
          proTip={'Socket.IO admin UI (@socket.io/admin-ui) se production monitoring karo — active rooms, connected clients, emitted events sab realtime dashboard mein dikhte hain. Development mein invaluable. io.attach(adminui.instrument(io, { auth: false })).'}
        />
      </div>

      <div id="broadcasting">
        <ConceptCard
          title="Broadcasting — Rooms & Namespaces"
          emoji="📢"
          difficulty="advanced"
          whatIsIt="Broadcasting: Ek message multiple clients ko bhejo. Patterns: io.emit() (sab), io.to(room).emit() (room), socket.broadcast.emit() (sender except), socket.to(room).emit() (room except sender). Rooms logical groupings hain. Namespaces alag communication channels hain — /chat, /admin."
          whenToUse={[
            'Rooms: Chat rooms, game lobbies, document collaboration sessions',
            'Broadcast to all: Global announcements, maintenance alerts',
            'Broadcast except sender: User joined notification to others',
            'Namespaces: Different features alag channels — /chat, /notifications',
          ]}
          whyUseIt="Broadcasting patterns ke bina har client ko individually message karna O(n) loop hoga — Socket.IO internally efficient ho karta hai. Rooms dynamic hain — join/leave easily. Namespaces middleware per namespace allow karte hain — admin namespace alag auth."
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
            explanation: "io.emit() = global broadcast (sabko). socket.broadcast.emit() = everyone except this socket. io.to(room) = room members. Namespaces completely isolated hain — different middleware chains, different event listeners. fetchSockets() room members list deta hai — online count dikhaane ke liye useful.",
          }}
          realWorldScenario="GitHub-like code collaboration: Document namespace se document changes broadcast. Cursor position sirf room members ko (except self). User join/leave notification to room. Admin namespace se active sessions monitor. Sab alag logical concerns, alag channels."
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
          proTip={`Socket.IO mein acknowledgements use karo reliable delivery ke liye: socket.emit('message', data, (response) => { console.log('Delivered:', response) }). Server side: socket.on('message', (data, callback) => { saveMessage(data); callback({ status: 'ok' }) }). Delivery confirmation guarantee milti hai.`}
        />
      </div>

      <div id="scaling-websockets">
        <ConceptCard
          title="Scaling WebSockets — Redis Adapter"
          emoji="📈"
          difficulty="advanced"
          whatIsIt="Single server par WebSockets easy hai. Multiple servers par: Server A ka connected user Server B se message bhejne par directly nahi pahunch sakta. Redis adapter: sab servers Redis pub/sub se communicate karte hain — messages automatically broadcast hote hain sab servers pe. Horizontal scaling possible hoti hai."
          whenToUse={[
            'Multiple Node.js processes (cluster mode)',
            'Multiple servers (horizontal scaling)',
            'Zero-downtime deployments — users reconnect different servers par',
            'High availability — ek server crash hone par doosra serve kare',
          ]}
          whyUseIt="Single server bottleneck hai — CPU cores limit, memory limit, single point of failure. Multiple servers se horizontal scale hota hai. Redis adapter sab servers ko sync rakhta hai — room memberships, broadcasts sab Redis through coordinate hote hain."
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
            explanation: "pubClient publish karta hai (io.emit), subClient subscribe karta hai (dusre servers ke messages). Separate connections zaroori hain — Redis same connection pub+sub allow nahi karta. io.to(room) Redis se propagate hota hai — koi bhi server broadcast kar sakta hai, sab servers deliver karte hain.",
          }}
          realWorldScenario="Chat platform 100,000 concurrent users ke saath — 10 server instances. User A (Server 1) message bheje User B (Server 5) ko — Redis adapter message relay karta hai Server 5 tak jo User B ko deliver karta hai. User perspective — seamless experience."
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
          proTip={`Socket.IO rooms data Redis mein store hoti hain adapter ke saath — room membership persist hoti hai across restarts sirf agar socket explicitly rejoin kare. Reconnect par room rejoin implement karo: socket.on('reconnect', () => socket.join(previousRooms)). State management critical hai real-time apps mein.`}
        />
      </div>

      <div id="sse">
        <ConceptCard
          title="SSE — Server-Sent Events"
          emoji="📡"
          difficulty="advanced"
          whatIsIt="SSE (Server-Sent Events) HTTP connection pe one-way server-to-client streaming hai. text/event-stream content type se server events push karta hai. Browser EventSource API se receive karo. Automatic reconnection built-in. WebSocket se simpler — sirf server → client data chahiye ho tabb perfect. AI chat responses (streaming), live logs, notifications."
          whenToUse={[
            'AI chat streaming — OpenAI response ek baar aane ka wait nahi',
            'Live activity feeds — notifications, transaction updates',
            'Real-time logs streaming — deployment progress, build logs',
            'Simple server push — chat client side nahi chahiye, SSE better',
          ]}
          whyUseIt="SSE over HTTP — CDN friendly, load balancers automatic handle karte hain, no special config needed. WebSocket HTTP upgrade karta hai — firewalls aur proxies issue create karte hain sometimes. SSE simpler protocol — HTTP mein hi rehta hai. Auto-reconnect EventSource se free mein milta hai."
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
            explanation: "event: eventName aur data: payload format SSE standard hai. Double newline (\\n\\n) event end signal hai. : prefix comment hai — heartbeat ke liye use hota hai. EventSource auto-reconnect karta hai connection drop par. flushHeaders() initial headers immediately bhejta hai — buffering se bachata hai.",
          }}
          realWorldScenario="ChatGPT ka streaming response — har token aate hi dikhta hai bina full response ka wait kiye. Ye SSE hai — server tokens generate karta hai, stream mein bhejta hai, browser gradually render karta hai. UX dramatically better hoti hai — user response aana shuru hote dekh sakta hai."
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
          proTip="SSE connection limit browser per domain: 6 connections max. Multiple SSE streams ek page par limit ho jaayengi. Solution: multiplexed SSE — ek connection par sab events. Ya HTTP/2 se limit dramatically increase hota hai (100+ streams). Production mein HTTP/2 enable karo SSE ke saath."
        />
      </div>
    </div>
  )
}
