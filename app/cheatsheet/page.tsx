'use client'

import { useState, useMemo } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('bash', bash)

// ─── Types ────────────────────────────────────────────────────────────────────

interface Section {
  id: string
  title: string
  emoji: string
  accent: string
  content: React.ReactNode
}

// ─── Code Block ───────────────────────────────────────────────────────────────

function CodeBlock({ code, lang = 'javascript' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0D0D14] border-b border-[rgba(255,255,255,0.06)]">
        <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-widest">{lang}</span>
        <button
          onClick={handleCopy}
          className="text-[10px] font-mono px-2 py-0.5 rounded transition-all duration-150 opacity-0 group-hover:opacity-100"
          style={{
            background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
            color: copied ? '#10B981' : '#71717A',
            border: copied ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#0A0A0F',
          fontSize: '0.75rem',
          lineHeight: '1.6',
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}

// ─── Sections Data ────────────────────────────────────────────────────────────

const coreConceptsCards = [
  {
    title: 'Event Loop',
    color: '#7C3AED',
    points: [
      'Single-threaded, non-blocking I/O',
      '6 phases: timers → pending → idle → poll → check → close',
      'Microtasks (Promise, nextTick) run between phases',
      'process.nextTick > Promise.then > setTimeout',
    ],
  },
  {
    title: 'Async/Await',
    color: '#06B6D4',
    points: [
      'Syntactic sugar over Promises',
      'async function hamesha Promise return karta hai',
      'await sirf async function ke andar kaam karta hai',
      'try/catch se errors handle karo',
    ],
  },
  {
    title: 'Callbacks',
    color: '#F59E0B',
    points: [
      'Node.js convention: (err, result)',
      'Hamesha error pehle check karo',
      'Callback hell se bachne ke liye Promises use karo',
      'callbackify() util se convert kar sakte ho',
    ],
  },
  {
    title: 'Streams',
    color: '#10B981',
    points: [
      '4 types: Readable, Writable, Duplex, Transform',
      'Large files ke liye memory efficient',
      'pipe() se connect karo streams ko',
      'Backpressure automatically handle hota hai',
    ],
  },
  {
    title: 'Buffers',
    color: '#EF4444',
    points: [
      'Raw binary data store karta hai',
      'Buffer.from(), Buffer.alloc(), Buffer.allocUnsafe()',
      'toString("utf8") se string mein convert karo',
      'Streams ke saath automatically use hota hai',
    ],
  },
  {
    title: 'Modules',
    color: '#7C3AED',
    points: [
      'CommonJS: require() / module.exports',
      'ESM: import / export (type: "module")',
      '__dirname aur __filename CommonJS mein hi milega',
      'node_modules se pehle ./relative paths check hote hain',
    ],
  },
]

// ─── Section Components ───────────────────────────────────────────────────────

function CoreConceptsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {coreConceptsCards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl p-4 border border-[rgba(255,255,255,0.08)]"
          style={{ background: 'rgba(26,26,38,0.6)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: card.color }}
            />
            <h4 className="text-sm font-bold" style={{ color: card.color }}>
              {card.title}
            </h4>
          </div>
          <ul className="space-y-1.5">
            {card.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#A1A1AA] leading-relaxed">
                <span className="text-[#52525B] mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function CommandsSection() {
  return (
    <div className="space-y-4">
      <CodeBlock lang="bash" code={`# Project setup
npm init -y
npm install express
npm install -D nodemon typescript ts-node @types/node
npm run dev
npm run build

# Package management
npm install          # install all dependencies
npm ci               # clean install (CI mein use karo)
npm update           # all packages update karo
npm outdated         # kaunse outdated hain
npm audit fix        # security issues fix karo
npm list --depth=0   # installed packages

# nvm — Node version management
nvm install 20       # Node 20 install karo
nvm use 20           # use Node 20
nvm list             # installed versions
nvm alias default 20 # default set karo
nvm current          # current version

# Debugging
node --inspect app.js         # Chrome DevTools se debug
node --inspect-brk app.js     # Break at first line
node --prof app.js            # CPU profiling
node --trace-warnings app.js  # Trace warnings

# Useful flags
node -e "console.log(process.version)"   # run inline code
node -p "process.env.PATH"               # run + print
node --env-file=.env app.js              # load .env (v20+)`} />
    </div>
  )
}

function FsSection() {
  return (
    <CodeBlock code={`const fs = require('fs');
const path = require('path');

// ─── READ ──────────────────────────────────────────────
// Callback style
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise style (prefer this!)
const data = await fs.promises.readFile('file.txt', 'utf8');

// Sync (only at startup/config, never in request handlers!)
const config = fs.readFileSync('config.json', 'utf8');

// ─── WRITE ─────────────────────────────────────────────
fs.writeFile('out.txt', 'content', (err) => { ... });
await fs.promises.writeFile('out.txt', data);

// Append
await fs.promises.appendFile('log.txt', 'new line\\n');

// ─── DELETE / RENAME ───────────────────────────────────
await fs.promises.unlink('file.txt');      // delete
await fs.promises.rename('old.txt', 'new.txt');

// ─── DIRECTORY ─────────────────────────────────────────
await fs.promises.mkdir('dir', { recursive: true });
const files = await fs.promises.readdir('dir');
await fs.promises.rmdir('dir', { recursive: true });

// ─── CHECK EXISTS ──────────────────────────────────────
fs.existsSync('path')               // sync ok at startup
await fs.promises.access('path')    // async, throws if not found

// ─── WATCH ─────────────────────────────────────────────
fs.watch('file.txt', (event, filename) => {
  console.log(event, filename);  // 'change' or 'rename'
});

// ─── STATS ─────────────────────────────────────────────
const stat = await fs.promises.stat('file.txt');
console.log(stat.size, stat.mtime, stat.isDirectory());`} />
  )
}

function PathSection() {
  return (
    <CodeBlock code={`const path = require('path');

path.join(__dirname, 'data', 'file.txt')  // → /abs/path/data/file.txt
path.resolve('relative/path')             // → absolute path from cwd
path.resolve(__dirname, '../config')      // → parent dir + config

path.basename('/dir/file.txt')            // → 'file.txt'
path.basename('/dir/file.txt', '.txt')    // → 'file'  (no extension)
path.extname('archive.tar.gz')            // → '.gz'
path.dirname('/dir/file.txt')            // → '/dir'

// Parse everything at once
const p = path.parse('/home/user/file.txt');
// → { root: '/', dir: '/home/user', base: 'file.txt',
//     ext: '.txt', name: 'file' }

// Format back
path.format({ dir: '/home', name: 'app', ext: '.js' })  // → '/home/app.js'

// Normalize & check
path.normalize('/foo/../bar/baz')         // → '/bar/baz'
path.isAbsolute('/foo/bar')               // → true
path.relative('/data', '/data/osx/file') // → 'osx/file'

// OS separators
path.sep        // '/' on unix, '\\' on windows
path.delimiter  // ':' on unix, ';' on windows`} />
  )
}

function HttpSection() {
  return (
    <CodeBlock code={`const http = require('http');
const https = require('https');

// ─── BASIC SERVER ──────────────────────────────────────
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'NodeMaster',
  });
  res.end(JSON.stringify({ hello: 'world' }));
});
server.listen(3000, () => console.log('Listening on :3000'));

// ─── REQUEST OBJECT ────────────────────────────────────
req.method     // 'GET', 'POST', etc.
req.url        // '/path?query=value'
req.headers    // { 'content-type': 'application/json', ... }
req.socket.remoteAddress  // client IP

// ─── RESPONSE OBJECT ───────────────────────────────────
res.statusCode = 404;
res.setHeader('Content-Type', 'text/html');
res.write('<p>chunk</p>');  // stream data
res.end('done');            // must call end!

// ─── MAKE HTTP REQUEST ─────────────────────────────────
// Modern way — use fetch (node 18+)
const response = await fetch('https://api.example.com/data');
const json = await response.json();

// Or http.get for older node
http.get('http://api.example.com', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
});`} />
  )
}

function ExpressSection() {
  return (
    <div className="space-y-4">
      <CodeBlock code={`const express = require('express');
const app = express();
const router = express.Router();

// ─── MIDDLEWARE ────────────────────────────────────────
app.use(express.json())                               // parse JSON body
app.use(express.urlencoded({ extended: true }))       // parse form data
app.use(cors({ origin: process.env.ALLOWED_ORIGIN })) // CORS
app.use(helmet())                                     // security headers
app.use(morgan('combined'))                           // logging
app.use(compression())                                // gzip
app.use(express.static('public'))                     // static files

// ─── ROUTES ────────────────────────────────────────────
router.get('/', handler)
router.post('/', handler)
router.put('/:id', handler)
router.patch('/:id', handler)
router.delete('/:id', handler)
router.all('/any', handler)                           // all HTTP methods

// Route params, query, body
req.params.id        // /users/:id → req.params.id
req.query.page       // /users?page=2 → req.query.page
req.body.name        // POST body field
req.headers['x-api-key']

// ─── ASYNC WRAPPER ─────────────────────────────────────
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json({ users });
}));

// ─── ERROR HANDLER (last middleware, 4 params!) ────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ─── MOUNT ROUTER ──────────────────────────────────────
app.use('/api/users', router);
app.listen(process.env.PORT || 3000);`} />
    </div>
  )
}

function AsyncPatternsSection() {
  return (
    <div className="space-y-4">
      <CodeBlock code={`// ─── SEQUENTIAL vs PARALLEL ───────────────────────────

// Sequential (slow — one at a time)
const user = await getUser(id);
const posts = await getPosts(user.id);  // waits for getUser
const comments = await getComments();   // waits for getPosts

// Parallel (fast — all at once!)
const [user, posts, comments] = await Promise.all([
  getUser(id),
  getPosts(id),    // all 3 start simultaneously
  getComments(),
]);

// ─── ERROR HANDLING PATTERNS ───────────────────────────

// try/catch (most common)
try {
  const data = await riskyOperation();
} catch (err) {
  console.error(err.message);
}

// await-to-js pattern
const [err, result] = await to(promise);
if (err) return res.status(500).json({ error: err.message });

// ─── TIMEOUT PATTERN ───────────────────────────────────
const withTimeout = (promise, ms, msg = 'Timeout') =>
  Promise.race([
    promise,
    new Promise((_, rej) =>
      setTimeout(() => rej(new Error(msg)), ms)
    ),
  ]);

const data = await withTimeout(fetchData(), 5000, 'API slow hai!');

// ─── RETRY PATTERN ─────────────────────────────────────
async function retry(fn, attempts = 3, delay = 1000) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
}

const data = await retry(() => fetchFromAPI(), 3, 500);

// ─── THROTTLE / BATCH ──────────────────────────────────
// Process in batches of 5 (avoid overwhelming APIs)
const BATCH_SIZE = 5;
for (let i = 0; i < items.length; i += BATCH_SIZE) {
  const batch = items.slice(i, i + BATCH_SIZE);
  await Promise.all(batch.map(item => process(item)));
}`} />
    </div>
  )
}

function EnvSection() {
  return (
    <div className="space-y-4">
      <CodeBlock lang="bash" code={`# .env file
DATABASE_URL=mongodb://localhost:27017/mydb
REDIS_URL=redis://localhost:6379
JWT_SECRET=super-secret-key-min-32-chars-long
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
ALLOWED_ORIGIN=http://localhost:3000
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...`} />
      <CodeBlock code={`// dotenv setup (file ke top mein, sabse pehle)
require('dotenv').config();           // CommonJS
import 'dotenv/config';               // ESM (v16+)

// Node v20+ — native .env support
// node --env-file=.env app.js

// Usage
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// Type-safe config object (best practice)
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    url: process.env.DATABASE_URL,
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
} as const;

// Validate required env vars at startup
function validateEnv() {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error('Missing env vars: ' + missing.join(', '));
  }
}

validateEnv(); // fail fast!`} />
    </div>
  )
}

function ErrorHandlingSection() {
  return (
    <CodeBlock code={`// ─── CUSTOM ERROR CLASS ───────────────────────────────
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;  // expected errors
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(\`\${resource} nahi mila\`, 404);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

// ─── ASYNC HANDLER WRAPPER ─────────────────────────────
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ─── EXPRESS ERROR MIDDLEWARE ──────────────────────────
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Unexpected errors
  console.error('Unexpected error:', err);
  res.status(500).json({
    success: false,
    error: 'Something went wrong',
  });
});

// ─── PROCESS LEVEL ─────────────────────────────────────
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);  // must exit!
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});`} />
  )
}

function PerformanceSection() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          {
            title: 'Cluster Module',
            tip: 'All CPU cores utilize karo — Master + Worker processes',
            color: '#7C3AED',
          },
          {
            title: 'Streaming',
            tip: 'Large files stream karo — readFileSync kabhi use mat karo large files ke liye',
            color: '#06B6D4',
          },
          {
            title: 'Caching',
            tip: 'Redis mein expensive queries cache karo — DB load kam karo',
            color: '#F59E0B',
          },
          {
            title: 'Compression',
            tip: 'app.use(compression()) — response size ~70% tak kam ho jaata hai',
            color: '#10B981',
          },
          {
            title: 'Connection Pooling',
            tip: 'DB connections pool karo — har request pe naya connection mat banao',
            color: '#EF4444',
          },
          {
            title: 'setImmediate vs setTimeout',
            tip: 'setImmediate runs in check phase (faster), setTimeout(fn,0) in timers phase',
            color: '#7C3AED',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg p-3 border border-[rgba(255,255,255,0.06)]"
            style={{ background: 'rgba(26,26,38,0.4)' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
              <span className="text-xs font-semibold" style={{ color: item.color }}>
                {item.title}
              </span>
            </div>
            <p className="text-xs text-[#71717A] leading-relaxed">{item.tip}</p>
          </div>
        ))}
      </div>
      <CodeBlock code={`// Cluster module — all cores use karo
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(\`Master \${process.pid} running, forking \${numCPUs} workers\`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', (worker) => {
    console.log('Worker died, forking new one...');
    cluster.fork();
  });
} else {
  require('./app');  // each worker runs the app
}

// Buffer performance
Buffer.alloc(1024)         // safe — zeros fill karta hai
Buffer.allocUnsafe(1024)   // faster — but uninitialized memory!

// Stream large files (never readFileSync for large files!)
import { createReadStream, createWriteStream } from 'fs';
createReadStream('large.csv').pipe(createWriteStream('out.csv'));`} />
    </div>
  )
}

function SecuritySection() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { check: 'Input validation (Joi / Zod)', done: true },
          { check: 'helmet() for HTTP security headers', done: true },
          { check: 'Rate limiting (express-rate-limit)', done: true },
          { check: 'req.body validation — never trust blindly', done: true },
          { check: 'bcrypt for passwords (saltRounds: 10+)', done: true },
          { check: 'JWT secret from environment variable', done: true },
          { check: 'HTTPS in production', done: true },
          { check: 'Parameterized queries (no SQL injection)', done: true },
          { check: 'HTML sanitize karo if rendering user content (XSS)', done: true },
          { check: 'CORS: explicit allowlist, not wildcard *', done: true },
          { check: 'npm audit — regular security checks', done: true },
          { check: 'Secrets kabhi commit mat karo (.gitignore)', done: true },
        ].map(({ check }) => (
          <div
            key={check}
            className="flex items-start gap-2.5 p-2.5 rounded-lg"
            style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)' }}
          >
            <span className="text-[#10B981] text-sm mt-0.5 flex-shrink-0">✓</span>
            <span className="text-xs text-[#A1A1AA] leading-relaxed">{check}</span>
          </div>
        ))}
      </div>
      <CodeBlock code={`// Helmet — security headers auto-set karta hai
const helmet = require('helmet');
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // per IP
  message: { error: 'Too many requests' },
  standardHeaders: true,
});
app.use('/api', limiter);

// Zod validation
const { z } = require('zod');
const UserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(0).max(150),
});

app.post('/users', (req, res) => {
  const result = UserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }
  // result.data is type-safe!
});

// bcrypt
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 12);   // store this
const match = await bcrypt.compare(plain, hash); // verify`} />
    </div>
  )
}

function PackagesSection() {
  const packages = [
    { name: 'express', category: 'Web Framework', desc: 'Minimal, flexible web framework — most popular' },
    { name: 'fastify', category: 'Web Framework', desc: 'Faster than Express, schema-based validation built-in' },
    { name: 'mongoose', category: 'ORM/ODM', desc: 'MongoDB ke liye elegant ODM with validation' },
    { name: 'prisma', category: 'ORM', desc: 'Type-safe ORM — SQL databases ke liye best' },
    { name: 'ioredis', category: 'Cache', desc: 'Redis client — caching, sessions, pub/sub' },
    { name: 'zod', category: 'Validation', desc: 'TypeScript-first schema validation — superb DX' },
    { name: 'joi', category: 'Validation', desc: 'Powerful schema validation — battle-tested' },
    { name: 'bcrypt', category: 'Security', desc: 'Password hashing — saltRounds: 10 minimum' },
    { name: 'jsonwebtoken', category: 'Auth', desc: 'JWT sign aur verify karo' },
    { name: 'winston', category: 'Logging', desc: 'Production logging — multiple transports' },
    { name: 'pino', category: 'Logging', desc: 'Extremely fast JSON logger' },
    { name: 'jest', category: 'Testing', desc: 'Testing framework — snapshot, mock, coverage' },
    { name: 'supertest', category: 'Testing', desc: 'HTTP assertions for Express routes' },
    { name: 'dotenv', category: 'Config', desc: '.env file load karo (v20+ mein built-in)' },
    { name: 'helmet', category: 'Security', desc: 'HTTP security headers automatically set karo' },
    { name: 'cors', category: 'Security', desc: 'CORS middleware — origin whitelist manage karo' },
    { name: 'express-rate-limit', category: 'Security', desc: 'Rate limiting — DDoS protection' },
    { name: 'bull / bullmq', category: 'Queue', desc: 'Redis-based job queues — background processing' },
    { name: 'socket.io', category: 'Realtime', desc: 'WebSocket abstraction — rooms, namespaces' },
    { name: 'multer', category: 'Upload', desc: 'File upload middleware — multipart/form-data' },
  ]

  const categoryColors: Record<string, string> = {
    'Web Framework': '#7C3AED',
    'ORM/ODM': '#06B6D4',
    ORM: '#06B6D4',
    Cache: '#F59E0B',
    Validation: '#10B981',
    Security: '#EF4444',
    Auth: '#EF4444',
    Logging: '#A1A1AA',
    Testing: '#7C3AED',
    Config: '#71717A',
    Queue: '#F59E0B',
    Realtime: '#06B6D4',
    Upload: '#10B981',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className="flex items-start gap-3 p-3 rounded-lg border border-[rgba(255,255,255,0.06)]"
          style={{ background: 'rgba(26,26,38,0.4)' }}
        >
          <div className="flex-shrink-0 mt-0.5">
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{
                background: `${categoryColors[pkg.category] || '#71717A'}18`,
                color: categoryColors[pkg.category] || '#71717A',
                border: `1px solid ${categoryColors[pkg.category] || '#71717A'}33`,
              }}
            >
              {pkg.category}
            </span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#F5F5F7]">{pkg.name}</span>
            <p className="text-xs text-[#71717A] mt-0.5">{pkg.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── JavaScript Section ──────────────────────────────────────────────────────

function JavaScriptSection() {
  return (
    <div className="space-y-5">
      <CodeBlock lang="javascript" code={`// ── Closures ──────────────────────────────────────────────────
function makeCounter() {
  let count = 0
  return {
    inc() { count++ },
    get() { return count },
  }
}
const c = makeCounter()
c.inc(); c.inc()
console.log(c.get()) // 2 — count is private!

// ── Destructuring ─────────────────────────────────────────────
const { name, age = 18 } = user          // object + default
const [first, , third] = [1, 2, 3]       // array, skip 2nd
const { address: { city } } = user        // nested

// ── Spread / Rest ─────────────────────────────────────────────
const merged = { ...defaults, ...overrides }
const copy   = [...originalArray]
function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }

// ── Optional Chaining & Nullish Coalescing ────────────────────
const city = user?.address?.city          // undefined if any null
const port = process.env.PORT ?? 3000     // fallback if null/undefined

// ── Template Literals ─────────────────────────────────────────
const msg = \`Hello \${name}, you are \${age} years old\`
const html = \`
  <div class="card">
    <h2>\${title}</h2>
  </div>
\`

// ── Array Methods ─────────────────────────────────────────────
const nums = [1, 2, 3, 4, 5]
nums.map(n => n * 2)           // [2,4,6,8,10] — transform
nums.filter(n => n % 2 === 0)  // [2,4] — filter
nums.reduce((sum, n) => sum + n, 0) // 15 — accumulate
nums.find(n => n > 3)          // 4 — first match
nums.some(n => n > 4)          // true — any match
nums.every(n => n > 0)         // true — all match
nums.flat()                    // flatten one level
[...new Set(nums)]             // remove duplicates

// ── Prototype & Classes ───────────────────────────────────────
class Animal {
  constructor(name) { this.name = name }
  speak() { return \`\${this.name} speaks\` }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks\` }
}

// ── this Binding Rules ────────────────────────────────────────
// 1. Default: global/undefined (strict mode)
// 2. Implicit: obj.method() → this = obj
// 3. Explicit: fn.call(ctx) / fn.apply(ctx) / fn.bind(ctx)
// 4. Arrow: lexical — inherits outer this (no own this)
const obj = {
  value: 42,
  arrow: () => console.log(this),     // ❌ outer this
  regular() { console.log(this) },    // ✅ obj
}

// ── Event Loop Order ──────────────────────────────────────────
// 1. Synchronous code
// 2. process.nextTick()
// 3. Promise callbacks (microtask queue)
// 4. setTimeout/setInterval (macrotask queue)
// 5. I/O callbacks
console.log('1')
setTimeout(() => console.log('4'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('2')
// Output: 1 → 2 → 3 → 4`} />
    </div>
  )
}

// ─── TypeScript Section ───────────────────────────────────────────────────────

function TypeScriptSection() {
  return (
    <div className="space-y-5">
      <CodeBlock lang="javascript" code={`// ── Basic Types ──────────────────────────────────────────────
let name: string = 'Rahul'
let age: number = 25
let active: boolean = true
let ids: number[] = [1, 2, 3]
let pair: [string, number] = ['Alice', 30]  // tuple

// any: skip type checking (avoid!)
// unknown: type-safe any — check before use
// never: value can never exist (exhaustive checks)
// void: function returns nothing

// ── Type vs Interface ─────────────────────────────────────────
interface User {
  id: number
  name: string
  email?: string       // optional
  readonly role: 'admin' | 'user'
}

type ID = string | number    // union — only with type
type Status = 'active' | 'inactive' | 'pending'

// ── Generics ──────────────────────────────────────────────────
function identity<T>(arg: T): T { return arg }
const n = identity(42)         // T inferred as number

interface ApiResponse<T> {
  data: T
  status: number
  error: string | null
}

// ── Utility Types ─────────────────────────────────────────────
type PartialUser    = Partial<User>            // all optional
type RequiredUser   = Required<User>           // all required
type PublicUser     = Omit<User, 'password'>   // remove fields
type UserPreview    = Pick<User, 'id' | 'name'> // keep fields
type UserCache      = Record<string, User>     // key-value map
type FnReturn       = ReturnType<typeof getUser> // infer return

// ── Type Narrowing ────────────────────────────────────────────
function process(val: string | number) {
  if (typeof val === 'string') return val.toUpperCase()
  return val.toFixed(2)
}

// Custom type predicate
function isUser(x: unknown): x is User {
  return typeof x === 'object' && x !== null && 'id' in x
}

// Discriminated union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; w: number; h: number }

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2
    case 'rect':   return s.w * s.h
  }
}

// ── tsconfig essentials ───────────────────────────────────────
// {
//   "strict": true,           ← enable all safety checks
//   "target": "ES2022",       ← output JS version
//   "module": "commonjs",     ← Node.js modules
//   "outDir": "./dist",       ← compiled output
//   "esModuleInterop": true,  ← import express from 'express'
//   "paths": { "@/*": ["src/*"] }  ← path aliases
// }`} />
    </div>
  )
}

// ─── React Section ────────────────────────────────────────────────────────────

function ReactSection() {
  return (
    <div className="space-y-5">
      <CodeBlock lang="javascript" code={`// ── useState ─────────────────────────────────────────────────
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)

// Functional update (safe when new state depends on old)
setCount(prev => prev + 1)

// Object update — spread required (state is immutable!)
setUser(prev => ({ ...prev, name: 'Rahul' }))

// ── useEffect ────────────────────────────────────────────────
useEffect(() => {
  const sub = subscribe(userId)
  return () => sub.unsubscribe()  // cleanup!
}, [userId])  // re-run when userId changes

// [] = run once on mount
// [dep] = run when dep changes
// no array = run every render (usually wrong!)

// ── useRef ────────────────────────────────────────────────────
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()           // DOM access

const prevCount = useRef(count)     // mutable value (no re-render)
useEffect(() => { prevCount.current = count }, [count])

// ── useMemo / useCallback ─────────────────────────────────────
const sorted = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]  // only recompute when items changes
)

const handleClick = useCallback((id: number) => {
  onSelect(id)
}, [onSelect])  // stable reference for child props

// ── Context ───────────────────────────────────────────────────
const ThemeCtx = createContext<'light' | 'dark'>('light')

function App() {
  return (
    <ThemeCtx.Provider value="dark">
      <Child />
    </ThemeCtx.Provider>
  )
}
function Child() {
  const theme = useContext(ThemeCtx)  // 'dark'
}

// ── Custom Hook ───────────────────────────────────────────────
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

// ── Performance ───────────────────────────────────────────────
// React.memo — skip re-render if props unchanged
const ExpensiveChild = React.memo(({ name }: { name: string }) => (
  <div>{name}</div>
))

// Key rule: stable keys for lists (not index!)
{items.map(item => <Item key={item.id} {...item} />)}

// Code splitting
const LazyPage = React.lazy(() => import('./HeavyPage'))
// wrap in <Suspense fallback={<Spinner />}>`} />
    </div>
  )
}

// ─── SQL Section ─────────────────────────────────────────────────────────────

function SQLSection() {
  return (
    <div className="space-y-5">
      <CodeBlock lang="javascript" code={`-- ── CRUD Basics ──────────────────────────────────────────────
SELECT id, name, email FROM users WHERE active = true
  ORDER BY created_at DESC LIMIT 20 OFFSET 40;

INSERT INTO users (name, email, role)
  VALUES ('Rahul', 'r@example.com', 'user') RETURNING *;

UPDATE users SET name = 'Kumar', updated_at = NOW()
  WHERE id = 42;

DELETE FROM users WHERE id = 42;  -- ⚠️ always WHERE!

-- ── JOINs ─────────────────────────────────────────────────────
-- INNER: only matching rows
SELECT u.name, o.total
FROM users u INNER JOIN orders o ON u.id = o.user_id;

-- LEFT: all users even without orders (NULL for no match)
SELECT u.name, COUNT(o.id) AS order_count
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- ── Aggregations ──────────────────────────────────────────────
SELECT
  category,
  COUNT(*) AS total,
  AVG(price) AS avg_price,
  SUM(stock) AS total_stock
FROM products
GROUP BY category
HAVING COUNT(*) > 5       -- filter AFTER grouping
ORDER BY total DESC;

-- ── Indexes ────────────────────────────────────────────────────
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- Composite: column order matters! Most selective first.
-- EXPLAIN ANALYZE SELECT ... -- check if index is used

-- ── Transactions ──────────────────────────────────────────────
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;   -- both or ROLLBACK if error

-- ── CTEs (Common Table Expressions) ───────────────────────────
WITH high_value AS (
  SELECT user_id, SUM(total) AS spent
  FROM orders GROUP BY user_id HAVING SUM(total) > 10000
)
SELECT u.name, hv.spent
FROM users u INNER JOIN high_value hv ON u.id = hv.user_id;

-- ── Window Functions ──────────────────────────────────────────
SELECT name, salary,
  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank,
  SUM(salary) OVER (PARTITION BY dept) AS dept_total
FROM employees;

-- ── JSONB (PostgreSQL) ────────────────────────────────────────
ALTER TABLE products ADD COLUMN attrs JSONB;
SELECT name FROM products WHERE attrs ->> 'brand' = 'Apple';
CREATE INDEX idx_attrs ON products USING GIN(attrs);`} />
    </div>
  )
}

// ─── MongoDB Section ─────────────────────────────────────────────────────────

function MongoDBSection() {
  return (
    <div className="space-y-5">
      <CodeBlock lang="javascript" code={`// ── Mongoose Schema ──────────────────────────────────────────
import mongoose, { Schema, model, InferSchemaType } from 'mongoose'

const userSchema = new Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  age:       { type: Number, min: 0, max: 120 },
  createdAt: { type: Date, default: Date.now },
})

type UserType = InferSchemaType<typeof userSchema>
const User = model('User', userSchema)

// ── CRUD ──────────────────────────────────────────────────────
// Create
const user = await User.create({ name: 'Rahul', email: 'r@ex.com' })

// Read
const users  = await User.find({ role: 'admin' }).select('name email').lean()
const one    = await User.findById(id)
const active = await User.find({ age: { $gte: 18, $lte: 65 } })

// Update
await User.updateOne({ _id: id }, { $set: { name: 'Kumar' } })
await User.findByIdAndUpdate(id, { $inc: { loginCount: 1 } }, { new: true })

// Delete
await User.deleteOne({ _id: id })   // hard delete
await User.findByIdAndUpdate(id, { deletedAt: new Date() })  // soft delete

// ── Query Operators ───────────────────────────────────────────
await User.find({
  $or:  [{ age: { $lt: 18 } }, { age: { $gt: 65 } }],
  name: { $regex: /^rahul/i },
  plan: { $in: ['pro', 'enterprise'] },
})

// ── Update Operators ──────────────────────────────────────────
$set:      { field: value }           // set field
$inc:      { views: 1, stock: -1 }    // increment
$push:     { tags: 'new-tag' }        // array add
$pull:     { tags: 'old-tag' }        // array remove
$addToSet: { tags: 'unique-tag' }     // add if not exists
$unset:    { tempToken: '' }          // delete field

// ── Aggregation Pipeline ──────────────────────────────────────
await Order.aggregate([
  { $match: { status: 'delivered', createdAt: { $gte: startDate } } },
  { $group: { _id: '$userId', total: { $sum: '$amount' }, count: { $sum: 1 } } },
  { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
  { $unwind: '$user' },
  { $project: { userName: '$user.name', total: 1, count: 1 } },
  { $sort: { total: -1 } },
  { $limit: 10 },
])

// ── Populate ──────────────────────────────────────────────────
const post = await Post.findById(id)
  .populate('author', 'name avatar')
  .populate({ path: 'comments', options: { limit: 10, sort: { createdAt: -1 } } })

// ── Indexes ───────────────────────────────────────────────────
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ name: 'text', bio: 'text' })   // full-text
postSchema.index({ userId: 1, createdAt: -1 })     // compound

// ── Pre/Post Hooks ────────────────────────────────────────────
userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 12)
})`} />
    </div>
  )
}

// ─── All sections data ────────────────────────────────────────────────────────

function buildSections(): Section[] {
  return [
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      emoji: '🧠',
      accent: '#7C3AED',
      content: <CoreConceptsSection />,
    },
    {
      id: 'commands',
      title: 'Essential Commands',
      emoji: '⌨️',
      accent: '#06B6D4',
      content: <CommandsSection />,
    },
    {
      id: 'fs-module',
      title: 'fs Module',
      emoji: '📁',
      accent: '#F59E0B',
      content: <FsSection />,
    },
    {
      id: 'path-module',
      title: 'path Module',
      emoji: '🗂️',
      accent: '#10B981',
      content: <PathSection />,
    },
    {
      id: 'http-module',
      title: 'http Module',
      emoji: '🌐',
      accent: '#06B6D4',
      content: <HttpSection />,
    },
    {
      id: 'express',
      title: 'Express.js Patterns',
      emoji: '⚡',
      accent: '#7C3AED',
      content: <ExpressSection />,
    },
    {
      id: 'async',
      title: 'Async Patterns',
      emoji: '⏱️',
      accent: '#10B981',
      content: <AsyncPatternsSection />,
    },
    {
      id: 'env',
      title: 'Environment & Config',
      emoji: '🔧',
      accent: '#F59E0B',
      content: <EnvSection />,
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      emoji: '🚨',
      accent: '#EF4444',
      content: <ErrorHandlingSection />,
    },
    {
      id: 'performance',
      title: 'Performance Tips',
      emoji: '🚀',
      accent: '#7C3AED',
      content: <PerformanceSection />,
    },
    {
      id: 'security',
      title: 'Security Checklist',
      emoji: '🔐',
      accent: '#10B981',
      content: <SecuritySection />,
    },
    {
      id: 'packages',
      title: 'Useful npm Packages',
      emoji: '📦',
      accent: '#06B6D4',
      content: <PackagesSection />,
    },
    {
      id: 'javascript',
      title: 'JavaScript Essentials',
      emoji: '🟡',
      accent: '#F7DF1E',
      content: <JavaScriptSection />,
    },
    {
      id: 'typescript',
      title: 'TypeScript Quick Ref',
      emoji: '🔷',
      accent: '#3178C6',
      content: <TypeScriptSection />,
    },
    {
      id: 'react',
      title: 'React Patterns',
      emoji: '⚛️',
      accent: '#06B6D4',
      content: <ReactSection />,
    },
    {
      id: 'sql',
      title: 'SQL Reference',
      emoji: '🗄️',
      accent: '#FF6B35',
      content: <SQLSection />,
    },
    {
      id: 'mongodb',
      title: 'MongoDB & Mongoose',
      emoji: '🍃',
      accent: '#10B981',
      content: <MongoDBSection />,
    },
  ]
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CheatsheetPage() {
  const [search, setSearch] = useState('')
  const sections = useMemo(() => buildSections(), [])

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections
    const q = search.toLowerCase()
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
    )
  }, [search, sections])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* ── Sticky Header ── */}
      <div
        className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.08)] print:hidden"
        style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">📋</span>
              <div>
                <h1 className="text-base font-bold text-[#F5F5F7] leading-none">Node.js Cheatsheet</h1>
                <p className="text-xs text-[#71717A] mt-0.5">Quick reference — print-ready</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B] text-sm">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sections..."
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[rgba(124,58,237,0.5)]"
                />
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  color: '#A78BFA',
                  border: '1px solid rgba(124,58,237,0.3)',
                }}
              >
                🖨️ Print
              </button>
            </div>
          </div>
          {/* Section jump nav */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="flex-shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: '#71717A',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {s.emoji} {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[#71717A]">
              &quot;{search}&quot; ke liye koi section nahi mila
            </p>
          </div>
        ) : (
          filteredSections.map((section) => (
            <section key={section.id} id={section.id}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                  style={{ background: `${section.accent}18`, border: `1px solid ${section.accent}33` }}
                >
                  {section.emoji}
                </div>
                <h2 className="text-xl font-bold text-[#F5F5F7]">{section.title}</h2>
                <div
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(90deg, ${section.accent}33, transparent)` }}
                />
              </div>
              {/* Section content */}
              {section.content}
            </section>
          ))
        )}

        {/* Footer */}
        <div
          className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-6 text-center print:hidden"
          style={{ background: 'rgba(26,26,38,0.6)' }}
        >
          <p className="text-sm text-[#71717A]">
            NodeMaster Cheatsheet — kunal@sequifi.com &bull;{' '}
            <span className="text-[#A1A1AA]">Ye sirf quick reference hai, course mein depth se padho!</span>
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .print\\:hidden { display: none !important; }
          pre, code { background: #f5f5f5 !important; color: #333 !important; }
          * { -webkit-print-color-adjust: exact; color-adjust: exact; }
        }
      `}</style>
    </div>
  )
}
