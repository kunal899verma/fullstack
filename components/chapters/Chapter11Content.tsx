'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function Chapter11Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          HTTP Module & REST APIs — Server Banao From Scratch
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Node.js ka built-in http module se bina kisi framework ke HTTP server banana possible hai. Ye samajhna zaroori hai kyunki Express, Fastify — sab yahi internally use karte hain. Foundation samajhoge toh frameworks bhi clearly samajh aayenge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          REST (Representational State Transfer) architectural style hai jo modern APIs define karta hai. HTTP verbs, status codes, resource-based URLs — ye sab REST ke pillars hain.
        </p>
      </div>

      <div id="http-basics">
        <ConceptCard
          title="http Module Basics — createServer"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="Node.js ka http module built-in HTTP server aur client functionality deta hai — no install needed. http.createServer() ek server instance return karta hai. Har incoming request ke liye callback call hota hai request aur response objects ke saath. Low-level lekin powerful — sab kuch manually control karo."
          whenToUse={[
            'HTTP fundamentals samajhna — how web servers actually work',
            'Ultra-minimal server — no framework overhead',
            'Custom HTTP behavior implement karna jo frameworks allow nahi karte',
            'Internal microservices jahan full Express overhead nahi chahiye',
          ]}
          whyUseIt="http module samajhna Express samajhne se pehle zaroori hai — Express sirf http ke upar convenience layer hai. Direct http use karne se maximum control milta hai — streaming, custom protocols, edge cases. Debugging bhi easier hota hai foundation clear rehne par."
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
            explanation: "createServer callback har request par call hota hai. req IncomingMessage hai — stream implement karta hai, body read karne ke liye event listen karo. res ServerResponse hai — writeHead se status + headers, end() se body. url.parse deprecated hai Node 11+ mein — new URL(req.url, 'http://localhost') prefer karo.",
          }}
          realWorldScenario="Ye raw http server simplistic hai — Express ise 100x better banata hai. Lekin ek baar raw server likhne ke baad Express middleware chain, req.params, res.json() — sab magical nahi lagte, logical lagte hain. Foundation sabse important hai."
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
          proTip={`http2 module se HTTP/2 server banao — multiplexing, server push, header compression. HTTP/2 much faster hai modern browsers ke saath. const http2 = require('http2'); http2.createSecureServer({ key, cert }, handler). TLS required hai HTTP/2 ke liye.`}
        />
      </div>

      <div id="request-handling">
        <ConceptCard
          title="Request Handling — URL, Headers, Body"
          emoji="📨"
          difficulty="intermediate"
          whatIsIt="HTTP request mein teen main parts: URL (path + query string), Headers (metadata — content-type, authorization, cookies), Body (POST/PUT data). Node.js mein URL parse karna, headers read karna, aur body stream se collect karna — ye teeno samajhna API development ke liye fundamental hai."
          whenToUse={[
            'REST API develop karna — sab request parts handle karne padte hain',
            'Authentication — Authorization header padhna',
            'File upload — multipart body parse karna',
            'Query parameters — pagination, filtering, sorting',
          ]}
          whyUseIt="HTTP ek protocol hai — request structure fixed hai. Ye structure samajhne se debugging easy hoti hai, security better hoti hai (header injection, body size limits), aur performance optimize karna possible hota hai."
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
            explanation: "new URL() modern URL parsing hai — searchParams built-in. Body size limit DDOS protection ke liye zaroori hai — bina limit ke attacker huge payload bhej sakta hai. Content-Type check karo body parse karne se pehle — JSON only if application/json. Authorization header Bearer prefix hata ke token nikalo.",
          }}
          realWorldScenario="Express req.body automatically populated kyun hota hai — internally body-parser middleware yahi body collection logic karta hai. Express req.params URL pattern matching se populate hota hai. Framework magic nahi, code abstraction hai."
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
          proTip="Request ID middleware add karo — har incoming request ko unique ID assign karo aur response header mein bhejo: const requestId = crypto.randomUUID(); res.setHeader('X-Request-ID', requestId). Ye distributed systems mein request tracing ke liye invaluable hai — logs mein same ID dhundho."
        />
      </div>

      <div id="response-handling">
        <ConceptCard
          title="Response Handling — Status Codes, Headers, Data"
          emoji="📤"
          difficulty="intermediate"
          whatIsIt="HTTP response mein: Status line (200 OK, 404 Not Found), Response headers (Content-Type, CORS, Cache-Control), Response body (JSON, HTML, file bytes). Sahi status codes aur headers send karna professional API design ka hallmark hai — clients correctly respond kar paate hain."
          whenToUse={[
            'REST API responses — proper status codes with meaningful messages',
            'File download — Content-Disposition header',
            'CORS — cross-origin requests allow karna',
            'Caching — Cache-Control headers set karna',
          ]}
          whyUseIt="Correct status codes API usability improve karte hain — client automatically understand karta hai response type. Wrong codes (sab 200 return karna) se debugging nightmare banta hai. Proper headers se caching, security, CORS sab automatically better hota hai."
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
            explanation: "Content-Length header important hai — browser accurately buffer kar sakta hai. Buffer.byteLength() use karo string.length nahi — multi-byte chars ke saath length alag hoti hai. Cache-Control sensitive API responses ke liye no-store use karo. CORS preflight OPTIONS method bhi handle karna padta hai.",
          }}
          realWorldScenario="Payment API ka proper error response: 402 Payment Required payment failure par, 422 Unprocessable Entity validation errors ke liye with field-level details, 503 Service Unavailable maintenance mein — ye Stripe ka actual behavior hai. Professional APIs sahi codes use karte hain."
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
          proTip={`HTTP streaming responses ke liye — res.write() se chunks bhejo, sab khatam hone par res.end(). Server-Sent Events bhi isi se implement hota hai: res.writeHead(200, { 'Content-Type': 'text/event-stream' }); res.write('data: {json}\\n\\n'). Real-time updates without WebSocket.`}
        />
      </div>

      <div id="rest-principles">
        <ConceptCard
          title="REST Principles — Resources & Methods"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="REST (Representational State Transfer) 6 constraints define karta hai: Stateless (server client state nahi rakhta), Client-Server, Cacheable, Uniform Interface, Layered System, Code on Demand (optional). Practical REST: resources as URLs (/users, /products), HTTP methods as actions (GET read, POST create, PUT/PATCH update, DELETE delete)."
          whenToUse={[
            'Public APIs banana — REST widely understood hai',
            'Mobile apps ke saath communicate karna',
            'Microservices ke beech communication',
            'Third-party integrations — REST webhooks, callbacks',
          ]}
          whyUseIt="REST stateless hai — server client session nahi rakhta. Har request self-contained hoti hai. Ye horizontal scaling easy banata hai — koi bhi server koi bhi request handle kar sakta hai. HTTP caching built-in hai GET requests ke liye — CDN automatic kaam karta hai."
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
            explanation: "Resource plural nouns use karo — /users not /user or /getUsers. Verbs URLs mein nahi hote — HTTP method hi action hai. Nested resources 2 levels tak rakhो — zyada deep hona confusing hota hai. Consistent response format (data, meta, error) API DX dramatically improve karta hai.",
          }}
          realWorldScenario="Stripe API REST ka perfect example hai — /v1/customers, /v1/payments, /v1/subscriptions. Har resource predictable URLs, proper status codes, consistent error format. Developers ek resource samajhte hain toh doosre bhi similar feel karte hain — low cognitive load."
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
          proTip={`HATEOAS (Hypermedia as the Engine of Application State) REST ka advanced level hai — response mein related links include karo: { data: user, links: { self: '/users/1', posts: '/users/1/posts', delete: '/users/1' } }. Client hardcode nahi karta URLs — API itself guide karta hai. GitHub API iska perfect example hai.`}
        />
      </div>

      <div id="http-status-codes">
        <ConceptCard
          title="HTTP Status Codes — Sahi Code Sahi Jagah"
          emoji="🔢"
          difficulty="intermediate"
          whatIsIt="HTTP status codes 3-digit numbers hain jo response type indicate karte hain. 5 categories: 1xx (informational), 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error). Sahi code use karna professional API ka sign hai — clients aur monitoring tools dono isse depend karte hain."
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
          whyUseIt="Sahi status codes se: clients know karo exactly kya hua. Monitoring alerts trigger hote hain sahi codes se — 5xx alerts configure ho. Load balancers retry decisions 5xx par karte hain. SEO crawlers 301 vs 302 se permanent vs temporary redirect samajhte hain. Logging meaningful hoti hai."
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
            explanation: "401 vs 403 important distinction: 401 = tumhara identity nahi pata (login karo), 403 = pata hai kaun ho lekin permission nahi (access denied). 404 vs 410: 404 = nahi mila, 410 = tha lekin permanently delete ho gaya. Retry-After header 429 ke saath — client ko bata do kitni der baad retry kare.",
          }}
          realWorldScenario="API monitoring dashboard: 5xx rate suddenly 2% se 15% ho gayi — immediate alert. 4xx rate increase hua — client code mein kuch change? 200 rate normal. Ye sab sirf isliye possible hai kyunki proper status codes use kiye hain."
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
          proTip="httpstatuses.com bookmark karo — har status code ka exact meaning, use case, example. RFC 9110 official spec hai. MDN HTTP status codes page bhi excellent resource hai. HTTP/2 aur HTTP/3 same status codes use karte hain — ye stable standard hai."
        />
      </div>
    </div>
  )
}
