'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function HttpLifecycleDiagram() {
  const steps = [
    { label: 'Client', sublabel: 'Browser / Mobile App', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '💻' },
    { label: 'DNS Lookup', sublabel: 'api.example.com → 1.2.3.4', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🔍' },
    { label: 'TCP Connect', sublabel: '3-way handshake (SYN, SYN-ACK, ACK)', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🤝' },
    { label: 'HTTP Request', sublabel: 'GET /api/users → Headers + Body sent', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '📤' },
    { label: 'Server Processing', sublabel: 'Middleware → Route Handler → DB Query', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '⚙️' },
    { label: 'HTTP Response', sublabel: '200 OK → Headers + JSON body', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '📥' },
    { label: 'Client Renders', sublabel: 'Browser parses response, updates UI', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🖥️' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">HTTP Module & REST APIs — Visual Overview</p>
      <div className="max-w-lg mx-auto space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: step.bg, border: `1px solid ${step.border}` }}>
              <span className="text-lg">{step.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: step.color }}>{step.label}</p>
                <p className="text-[10px] text-[#71717A] mt-0.5">{step.sublabel}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-0.5">
                <span className="text-[#71717A] text-xs">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Chapter11Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Express use karte ho? Theek hai. Lekin agar http module nahi jaante toh Express ek black box hai tumhare liye.
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Har Express developer ko ek baar raw http server likhna chahiye — sirf ek baar. Uske baad req.body, req.params, res.json() sab "magic" nahi lagta — logical lagta hai. Foundation clear rehne par debugging easy hoti hai, performance bottlenecks samajh mein aate hain, aur tum sirf framework ke "happy path" se zyada kar sakte ho.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          REST (Representational State Transfer) architectural style hai jo modern APIs define karta hai. HTTP verbs, status codes, resource-based URLs — ye sab REST ke pillars hain. Stripe API, GitHub API, sab isi pattern follow karte hain.
        </p>
      </div>

      <HttpLifecycleDiagram />

      <div id="http-basics">
        <ConceptCard
          title="http Module Basics — createServer"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="Node.js ka built-in http module se bina kisi framework ke HTTP server banana possible hai — no npm install, no dependencies. Shocking baat ye hai — Express, Fastify, Koa sab internally is hi http module ke upar build hain. Ye samajhna zaroori hai kyunki Express sirf http ke upar convenience layer hai. Direct http use karne se maximum control milta hai. Ab sawaal ye aata hai — aur Express se kya milta hai jo raw http mein nahi? Routing, middleware chain, body parsing — sab tumhe manually banana padta hai. Tab Express ki value samajh aati hai."
          whenToUse={[
            'HTTP fundamentals samajhna — how web servers actually work',
            'Ultra-minimal server — no framework overhead',
            'Custom HTTP behavior implement karna jo frameworks allow nahi karte',
            'Internal microservices jahan full Express overhead nahi chahiye',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki http module samajhna Express samajhne se pehle zaroori hai. Express sirf http ke upar convenience layer hai. Direct http use karne se maximum control milta hai — streaming, custom protocols, edge cases. Debugging bhi easier hota hai foundation clear rehne par."
          howToUse={{
            filename: 'http-server.js',
            language: 'javascript',
            code: `const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  // Request information
  console.log(req.method)   // 'GET', 'POST', etc.
  console.log(req.url)      // '/api/users?page=1'
  console.log(req.headers)  // { 'content-type': 'application/json', ... }

  // URL parse karo
  const parsedUrl = url.parse(req.url, true)
  const pathname = parsedUrl.pathname   // '/api/users'
  const query = parsedUrl.query         // { page: '1' }

  // Basic routing
  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Namaste, Node.js!</h1>')

  } else if (req.method === 'GET' && pathname === '/api/users') {
    const users = [{ id: 1, name: 'Rahul' }, { id: 2, name: 'Priya' }]
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users))

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  }
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

// HTTP client (outgoing requests)
const https = require('https')
https.get('https://api.github.com/users/octocat', { headers: { 'User-Agent': 'Node.js' } }, (res) => {
  let data = ''
  res.on('data', chunk => { data += chunk })
  res.on('end', () => console.log(JSON.parse(data).name))
})`,
            explanation: "Under the hood trace: createServer() ek TCP server banata hai port par. Har incoming connection ke liye — HTTP parsing hoti hai (method, URL, headers). Callback call hota hai req aur res ke saath. req = IncomingMessage (Readable stream hai — body read karne ke liye event listen karo). res = ServerResponse (Writable stream hai — writeHead se headers, end() se body). req.url sirf path hai, full URL nahi.",
          }}
          realWorldScenario="Ye raw http server simplistic hai — Express ise 100x better banata hai. Lekin ek baar raw server likhne ke baad Express middleware chain, req.params, res.json() — sab magical nahi lagte, logical lagte hain. Ye foundation exercise hai — ek din zaroor karo."
          commonMistakes={[
            {
              mistake: "res.end() ko bhool jaana — server request hang karta rehta hai",
              why: "Agar res.end() call nahi hua toh browser infinitely wait karta hai — timeout error aata hai. Memory leak bhi hota hai.",
              fix: "Hamesha res.end() call karo — ya res.json(), res.send() (Express mein) jo internally end() call karte hain. Error paths mein bhi.",
            },
            {
              mistake: "POST body ke liye req.body use karna",
              why: "Pure http module mein req.body exist nahi karta — Express middleware (body-parser) add karta hai ye. Raw http mein body stream se manually padhni padti hai.",
              fix: "let body = ''; req.on('data', chunk => body += chunk); req.on('end', () => { const parsed = JSON.parse(body); /* process */ });",
            },
          ]}
          proTip={`http2 module se HTTP/2 server banao — multiplexing, server push, header compression. HTTP/2 much faster hai modern browsers ke saath. const http2 = require('http2'); http2.createSecureServer({ key, cert }, handler). TLS required hai HTTP/2 ke liye. Ye next level gatekeeper hai web performance ka.`}
        />
      </div>

      <div className="rounded-xl p-4 my-4" style={{background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)'}}>
        <p className="text-sm font-bold text-[#F59E0B] mb-2">🤔 Sawaal: Express mein req.body automatically kahan se aata hai?</p>
        <p className="text-sm text-[#A1A1AA]">Bilkul sahi sawaal — ye samajhna zaroori hai! Raw http mein body stream se manually padhni padti hai — data aur end events sun ke. Express mein body-parser middleware (ya express.json()) ye sab pehle se kar deta hai. Middleware chain mein body-parser pehle chalta hai, req.body populate karta hai, phir tumhara route handler chalta hai. Magic nahi — middleware architecture hai.</p>
      </div>

      <div id="request-handling">
        <ConceptCard
          title="Request Handling — URL, Headers, Body"
          emoji="📨"
          difficulty="intermediate"
          whatIsIt="HTTP request ek envelope hai — teen parts: URL (path + query string — kahan jaana hai), Headers (metadata envelope ke upar — content-type, authorization, cookies), Body (andar ka content — POST/PUT data). Ye shocking hai — Node.js mein req.body automatically nahi milta raw http mein! Body ek stream hai — chunks mein aati hai. Tumhe manually collect karni padti hai. Aur body size limit nahi lagayi toh DDOS attack mein attacker 1GB body bhej sakta hai — server crash. Ye security gatekeeper tumhara zimma hai."
          whenToUse={[
            'REST API develop karna — sab request parts handle karne padte hain',
            'Authentication — Authorization header padhna',
            'File upload — multipart body parse karna',
            'Query parameters — pagination, filtering, sorting',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki HTTP ek protocol hai — request structure fixed hai. Ye structure samajhne se debugging easy hoti hai, security better hoti hai (header injection, body size limits), aur performance optimize karna possible hota hai."
          howToUse={{
            filename: 'request-handling.js',
            language: 'javascript',
            code: `const http = require('http')

const server = http.createServer(async (req, res) => {
  // URL parse — new URL (modern approach)
  const baseUrl = \`http://\${req.headers.host}\`
  const parsedUrl = new URL(req.url, baseUrl)

  const pathname = parsedUrl.pathname                    // '/api/products'
  const page = parsedUrl.searchParams.get('page') ?? '1' // '1'
  const limit = parsedUrl.searchParams.get('limit') ?? '10'

  // Headers read
  const contentType = req.headers['content-type']        // 'application/json'
  const authHeader = req.headers['authorization']        // 'Bearer token123'
  const token = authHeader?.replace('Bearer ', '')

  // Body read — stream se collect karo
  async function readBody(request) {
    return new Promise((resolve, reject) => {
      let body = ''
      let size = 0
      const MAX_SIZE = 1024 * 1024  // 1MB limit

      request.on('data', chunk => {
        size += chunk.length
        if (size > MAX_SIZE) {
          reject(new Error('Request body too large'))
          request.destroy()
          return
        }
        body += chunk.toString()
      })

      request.on('end', () => {
        try {
          resolve(contentType?.includes('application/json')
            ? JSON.parse(body)
            : body)
        } catch {
          reject(new Error('Invalid JSON'))
        }
      })

      request.on('error', reject)
    })
  }

  if (req.method === 'POST') {
    const body = await readBody(req)
    console.log('Received:', body)
    res.writeHead(201)
    res.end(JSON.stringify({ created: true }))
  }
})`,
            explanation: "Step-by-step trace: new URL() modern URL parsing hai — searchParams.get() automatically URL decode karta hai. Body read karne ke liye: data event mein chunks collect karo, size counter maintain karo (security!), end event mein join karo. Content-Type check karo body parse karne se pehle — JSON only if application/json. Authorization header se Bearer prefix hatao token nikalne ke liye.",
          }}
          realWorldScenario="Express req.body automatically populated kyun hota hai — internally body-parser middleware yahi body collection logic karta hai. Express req.params URL pattern matching se populate hota hai. Framework magic nahi, code abstraction hai. Ye samajhna debug skills dramatically improve karta hai."
          commonMistakes={[
            {
              mistake: 'Body size limit nahi lagana',
              why: 'Attacker 1GB body bhej sakta hai — server crash ya OOM kill. DoS attack easily possible.',
              fix: 'Body collection mein size counter aur MAX_SIZE limit lagao. Express mein: express.json({ limit: "1mb" }). Nginx level par bhi limit lagao.',
            },
            {
              mistake: 'URL decode nahi karna path parameters',
              why: 'Encoded URL /api/search?q=hello%20world — bina decode ke "hello%20world" milega nahi "hello world".',
              fix: "decodeURIComponent() use karo ya new URL() jo automatically decode karta hai. searchParams.get() decoded value return karta hai.",
            },
          ]}
          proTip="Request ID middleware add karo — har incoming request ko unique ID assign karo aur response header mein bhejo: const requestId = crypto.randomUUID(); res.setHeader('X-Request-ID', requestId). Ye distributed systems mein request tracing ke liye invaluable hai — logs mein same ID dhundho. Ye observability ka gatekeeper hai."
        />
      </div>

      <div id="response-handling">
        <ConceptCard
          title="Response Handling — Status Codes, Headers, Data"
          emoji="📤"
          difficulty="intermediate"
          whatIsIt="HTTP response ek letter hai — teen parts: Status line (200 OK tumne sab theek kiya, 404 Not Found tum kho gaye, 500 mujhe nahi pata kya hua), Response headers (metadata — Content-Type, CORS, Cache-Control), Response body (asli content). Aur ye shocking hai — agar tum sab errors 200 mein return karo toh monitoring tools, load balancers, CDN sab blind ho jaate hain. Sahi status code ek professional developer ki pehchan hai — ye secret handshake hai clients aur servers ke beech."
          whenToUse={[
            'REST API responses — proper status codes with meaningful messages',
            'File download — Content-Disposition header',
            'CORS — cross-origin requests allow karna',
            'Caching — Cache-Control headers set karna',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki correct status codes API usability improve karte hain — client automatically understand karta hai response type. Wrong codes (sab 200 return karna) se debugging nightmare banta hai. Proper headers se caching, security, CORS sab automatically better hota hai."
          howToUse={{
            filename: 'response-handling.js',
            language: 'javascript',
            code: `function sendJSON(res, statusCode, data) {
  const body = JSON.stringify(data)
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',                // Sensitive data cache nahi
  })
  res.end(body)
}

// Success responses
sendJSON(res, 200, { users: [] })             // OK — GET success
sendJSON(res, 201, { id: '123' })             // Created — POST success
res.writeHead(204); res.end()                  // No Content — DELETE success

// Error responses
sendJSON(res, 400, {
  error: 'BAD_REQUEST',
  message: 'Email field required',
  field: 'email',
})
sendJSON(res, 401, { error: 'UNAUTHORIZED', message: 'Token invalid' })
sendJSON(res, 403, { error: 'FORBIDDEN', message: 'Admin only' })
sendJSON(res, 404, { error: 'NOT_FOUND', message: 'User not found' })
sendJSON(res, 422, { error: 'VALIDATION_ERROR', errors: [{ field: 'age', message: 'Must be number' }] })
sendJSON(res, 429, { error: 'RATE_LIMITED', retryAfter: 60 })
sendJSON(res, 500, { error: 'INTERNAL_ERROR', message: 'Something went wrong' })

// File download
res.writeHead(200, {
  'Content-Type': 'application/pdf',
  'Content-Disposition': 'attachment; filename="report.pdf"',
  'Content-Length': fileBuffer.length,
})
res.end(fileBuffer)

// CORS headers
res.setHeader('Access-Control-Allow-Origin', 'https://myapp.com')
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')`,
            explanation: "Content-Length header important hai — browser accurately buffer kar sakta hai. Buffer.byteLength() use karo string.length nahi — multi-byte chars ke saath length alag hoti hai. Cache-Control sensitive API responses ke liye no-store use karo. CORS preflight OPTIONS method bhi handle karna padta hai warna browser block karega.",
          }}
          realWorldScenario="Payment API ka proper error response: 402 Payment Required payment failure par, 422 Unprocessable Entity validation errors ke liye with field-level details, 503 Service Unavailable maintenance mein — ye Stripe ka actual behavior hai. Professional APIs sahi codes use karte hain — ye unka trust signal hai."
          commonMistakes={[
            {
              mistake: 'Sab errors 500 return karna',
              why: 'Client ko pata nahi chaleta ki error client-side hai ya server-side. Retry logic, error messages sab wrong hote hain.',
              fix: 'Validation errors — 400/422. Auth errors — 401/403. Not found — 404. Rate limiting — 429. Server errors only — 500. Specific codes = better DX.',
            },
            {
              mistake: 'Error messages mein stack traces expose karna',
              why: 'Stack traces mein file paths, library versions, internal logic dikhai deta hai — security risk.',
              fix: 'Production mein: { error: "INTERNAL_ERROR", message: "Something went wrong" }. Development mein stack trace log karo server side. Client ko nahi bhejo.',
            },
          ]}
          proTip={`HTTP streaming responses ke liye — res.write() se chunks bhejo, sab khatam hone par res.end(). Server-Sent Events bhi isi se implement hota hai: res.writeHead(200, { 'Content-Type': 'text/event-stream' }); res.write('data: {json}\\n\\n'). Real-time updates without WebSocket. Ye streaming ka gatekeeper hai.`}
        />
      </div>

      <div className="rounded-xl p-4 my-4" style={{background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)'}}>
        <p className="text-sm font-bold text-[#F59E0B] mb-2">🤔 Sawaal: 401 Unauthorized aur 403 Forbidden mein kya fark hai practically?</p>
        <p className="text-sm text-[#A1A1AA]">Ye trust issues wala fark hai! 401 = "Main tumhe jaanta nahi — login karo pehle." 403 = "Main tumhe jaanta hoon lekin tumhare paas permission nahi — admin area mein nahi ja sakte." Client code isi distinction par depend karta hai — 401 milne par login page par redirect karo, 403 milne par "Access Denied" message dikhao. Galat code use karo toh UX break hota hai.</p>
      </div>

      <div id="rest-principles">
        <ConceptCard
          title="REST Principles — Resources & Methods"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="Ye shocking hai — bahut saare developers REST APIs banate hain lekin REST follow nahi karte. /api/getUsers, /api/createPost, /api/deleteProduct — ye REST nahi hai, ye RPC hai. REST mein URLs resources represent karte hain (nouns), aur HTTP methods actions (verbs). Ab sawaal ye aata hai — kab REST use karein aur kab GraphQL ya gRPC? Public APIs, mobile apps, third-party integrations — REST widely understood hai. Microservices ke beech high-performance — gRPC. Flexible data fetching — GraphQL. REST stateless hai — server client session nahi rakhta — ye horizontal scaling easy banata hai."
          whenToUse={[
            'Public APIs banana — REST widely understood hai',
            'Mobile apps ke saath communicate karna',
            'Microservices ke beech communication',
            'Third-party integrations — REST webhooks, callbacks',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki REST stateless hai — server client session nahi rakhta. Har request self-contained hoti hai. Ye horizontal scaling easy banata hai — koi bhi server koi bhi request handle kar sakta hai. HTTP caching built-in hai GET requests ke liye — CDN automatic kaam karta hai."
          howToUse={{
            filename: 'rest-api.js',
            language: 'javascript',
            code: `// REST resource design

// Users resource
// GET    /users          → list all users
// POST   /users          → create new user
// GET    /users/:id      → get user by id
// PUT    /users/:id      → replace user completely
// PATCH  /users/:id      → partial update
// DELETE /users/:id      → delete user

// Nested resources
// GET    /users/:id/posts         → user ke posts
// POST   /users/:id/posts         → user ka new post
// GET    /users/:id/posts/:postId → specific post

// Query parameters — filtering, sorting, pagination
// GET /products?category=electronics&price_max=5000&sort=price&order=asc&page=2&limit=20

// Response format consistency
const listResponse = {
  data: [{ id: '1', name: 'Laptop' }],
  meta: {
    total: 150,
    page: 2,
    limit: 20,
    totalPages: 8,
  }
}

const singleResponse = {
  data: { id: '1', name: 'Laptop', price: 49999 }
}

const errorResponse = {
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    details: [
      { field: 'email', message: 'Invalid email format' },
      { field: 'age', message: 'Must be 18 or older' }
    ]
  }
}

// Versioning
// URL versioning (most common): /api/v1/users, /api/v2/users
// Header versioning: Accept: application/vnd.myapi.v2+json`,
            explanation: "Resource plural nouns use karo — /users not /user or /getUsers. Verbs URLs mein nahi hote — HTTP method hi action hai. Nested resources 2 levels tak rakhو — zyada deep hona confusing hota hai. Consistent response format (data, meta, error) API DX dramatically improve karta hai — ek baar pattern samjho, har endpoint predictable ho.",
          }}
          realWorldScenario="Stripe API REST ka perfect example hai — /v1/customers, /v1/payments, /v1/subscriptions. Har resource predictable URLs, proper status codes, consistent error format. Developers ek resource samajhte hain toh doosre bhi similar feel karte hain — low cognitive load. Ye professional API design ka standard hai."
          commonMistakes={[
            {
              mistake: 'Action verbs URLs mein use karna',
              why: '/api/getUsers, /api/createPost, /api/deleteProduct — REST nahi, RPC hai. URLs resources represent karte hain, actions HTTP methods se.',
              fix: 'GET /users, POST /posts, DELETE /products/:id. Agar koi action resource mein fit nahi ho toh: POST /orders/:id/cancel (sub-resource action).',
            },
            {
              mistake: 'PATCH aur PUT confuse karna',
              why: 'PUT entire resource replace karta hai — missing fields null/default ho jaate hain. PATCH sirf provided fields update karta hai.',
              fix: "PUT ke saath poora object send karo. PATCH ke saath sirf { 'name': 'New Name' } — sirf update fields. Most APIs PATCH prefer karte hain partial updates ke liye.",
            },
          ]}
          proTip={`HATEOAS (Hypermedia as the Engine of Application State) REST ka advanced level hai — response mein related links include karo: { data: user, links: { self: '/users/1', posts: '/users/1/posts', delete: '/users/1' } }. Client hardcode nahi karta URLs — API itself guide karta hai. GitHub API iska perfect example hai. Ye API self-documentation ka gatekeeper hai.`}
        />
      </div>

      <div id="http-status-codes">
        <ConceptCard
          title="HTTP Status Codes — Sahi Code Sahi Jagah"
          emoji="🔢"
          difficulty="intermediate"
          whatIsIt="Ye ek shocking real story hai — ek company ke API monitoring dashboard pe suddenly 5xx rate 2% se 15% ho gayi. Alert trigger hua, engineers immediately on call. Lekin ye tabhi possible tha kyunki proper HTTP status codes use kiye gaye the. Agar sab 200 return karte toh alert kabhi nahi aata. Status codes 3-digit numbers hain jo response type indicate karte hain. 5 categories: 1xx (informational), 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error). Sahi code use karna professional API ka trust signal hai."
          whenToUse={[
            '200 OK — GET, successful response with body',
            '201 Created — POST success, new resource created',
            '204 No Content — DELETE success, no body',
            '400 Bad Request — invalid input, missing required fields',
            '401 Unauthorized — not authenticated (login karo)',
            '403 Forbidden — authenticated lekin permission nahi',
            '404 Not Found — resource exist nahi karta',
            '429 Too Many Requests — rate limited',
            '500 Internal Server Error — server mein kuch toot gaya',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki sahi status codes se clients ko exactly pata chalta hai kya hua. Monitoring alerts trigger hote hain sahi codes se — 5xx alerts configure ho. Load balancers retry decisions 5xx par karte hain. SEO crawlers 301 vs 302 se permanent vs temporary redirect samajhte hain. Logging meaningful hoti hai."
          howToUse={{
            filename: 'status-codes.js',
            language: 'javascript',
            code: `// 2xx — Success
// 200 OK: Standard success
res.writeHead(200); res.end(JSON.stringify(data))

// 201 Created: Resource banaya
res.writeHead(201, { 'Location': '/api/users/123' })
res.end(JSON.stringify(newUser))

// 204 No Content: Success, koi body nahi
res.writeHead(204); res.end()

// 206 Partial Content: Range request (video streaming)
res.writeHead(206, {
  'Content-Range': 'bytes 0-1023/10000',
  'Accept-Ranges': 'bytes',
})

// 3xx — Redirects
// 301 Permanent Redirect: URL change ho gayi
res.writeHead(301, { 'Location': 'https://newdomain.com/path' })
res.end()

// 302 Temporary Redirect
res.writeHead(302, { 'Location': '/login' })
res.end()

// 4xx — Client Errors
// 400: Validation errors
// 401: Authentication required (WWW-Authenticate header bhejo)
res.writeHead(401, { 'WWW-Authenticate': 'Bearer realm="api"' })

// 403: Forbidden — authenticated lekin access denied
// 404: Not found
// 405: Method Not Allowed (GET route par POST request)
res.writeHead(405, { 'Allow': 'GET, HEAD' })

// 409: Conflict — duplicate entry
// 410: Gone — permanently deleted (unlike 404 which is "never existed")
// 422: Unprocessable Entity — valid syntax, invalid semantics
// 429: Rate Limited
res.writeHead(429, { 'Retry-After': '60' })

// 5xx — Server Errors
// 500: Internal Server Error
// 502: Bad Gateway — upstream service failed
// 503: Service Unavailable — maintenance mode
// 504: Gateway Timeout — upstream timeout`,
            explanation: "Ye distinctions yaad rakho: 401 vs 403 — 401 = identity nahi pata (login karo), 403 = pata hai kaun ho lekin permission nahi (trust issues!). 404 vs 410: 404 = nahi mila (ho sakta hai kabhi tha), 410 = tha lekin permanently delete ho gaya. 422 vs 400: 400 = malformed request, 422 = valid format lekin invalid data (age = -5). Retry-After header 429 ke saath — client ko bata do kitni der baad retry kare.",
          }}
          realWorldScenario="API monitoring dashboard: 5xx rate suddenly 2% se 15% ho gayi — immediate alert. 4xx rate increase hua — client code mein kuch change? 200 rate normal. Ye sab sirf isliye possible hai kyunki proper status codes use kiye hain. Ye observability ka backbone hai."
          commonMistakes={[
            {
              mistake: 'Authentication error par 403 return karna',
              why: '403 Forbidden — tum karo ho jaante hain lekin permission nahi. Authentication fail hone par 401 chahiye — client ko pata ho login karna hai.',
              fix: '401 Unauthorized = not authenticated. 403 Forbidden = authenticated but no permission. Client logic isi distinction par depend karta hai.',
            },
            {
              mistake: 'Error responses 200 mein return karna — { success: false, error: "..." }',
              why: 'HTTP clients, monitoring, load balancers sab status codes par rely karte hain. 200 mein error = broken contract.',
              fix: 'Errors ke liye appropriate 4xx/5xx codes use karo. success field optional hai lekin status code mandatory hai.',
            },
          ]}
          proTip="httpstatuses.com bookmark karo — har status code ka exact meaning, use case, example. RFC 9110 official spec hai. MDN HTTP status codes page bhi excellent resource hai. HTTP/2 aur HTTP/3 same status codes use karte hain — ye stable standard hai. Ye codes tumhara common language hai clients ke saath — gatekeeper of communication."
        />
      </div>
    </div>
  )
}
