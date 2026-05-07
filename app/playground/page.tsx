'use client'

import { useState, useCallback, useEffect } from 'react'
import { Sandpack, defaultDark } from '@codesandbox/sandpack-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Example {
  id: string
  title: string
  code: string
}

interface Category {
  name: string
  examples: Example[]
}

// ─── Examples Library ─────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    name: 'Basics',
    examples: [
      {
        id: 'hello-world',
        title: 'Hello World',
        code: `// Hello World — Node.js ka pehla kadam
console.log('Hello, World!');
console.log('NodeMaster Playground mein welcome ho!');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
`,
      },
      {
        id: 'variables-types',
        title: 'Variables & Types',
        code: `// Variables aur Types in JavaScript/Node.js

// Primitive types
const name = 'Rahul';          // string
const age = 25;                // number
const isActive = true;         // boolean
const nothing = null;          // null
let undef;                     // undefined
const sym = Symbol('id');      // symbol

// Type checking
console.log(typeof name, '->', name);
console.log(typeof age, '->', age);
console.log(typeof isActive, '->', isActive);
console.log(typeof nothing, '->', nothing);   // "object" - JS ka famous bug!
console.log(typeof undef, '->', undef);

// Objects
const user = {
  id: 1,
  name: 'Priya',
  scores: [95, 87, 92],
  address: { city: 'Mumbai', pin: '400001' },
};

console.log('\\nUser object:', JSON.stringify(user, null, 2));

// Arrays
const nums = [1, 2, 3, 4, 5];
console.log('\\nArray methods:');
console.log('map:', nums.map(n => n * 2));
console.log('filter:', nums.filter(n => n % 2 === 0));
console.log('reduce (sum):', nums.reduce((acc, n) => acc + n, 0));
`,
      },
      {
        id: 'arrow-functions',
        title: 'Arrow Functions',
        code: `// Arrow Functions — Modern JavaScript

// Traditional function
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Arrow function — same kaam
const greetArrow = (name) => 'Hello, ' + name + '!';

// Short one-liner
const double = n => n * 2;
const add = (a, b) => a + b;

// Multi-line arrow
const processUser = (user) => {
  const { name, age } = user;
  const isAdult = age >= 18;
  return { name, age, isAdult, greeting: greetArrow(name) };
};

console.log(greet('Rahul'));
console.log(greetArrow('Priya'));
console.log('Double 7:', double(7));
console.log('Add 3+4:', add(3, 4));
console.log('Processed:', processUser({ name: 'Amit', age: 22 }));

// Higher-order functions
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = numbers
  .filter(n => n % 2 === 0)   // even numbers
  .map(n => n ** 2)            // square them
  .reduce((sum, n) => sum + n, 0); // sum

console.log('\\nEven squares sum:', result);
`,
      },
      {
        id: 'destructuring',
        title: 'Destructuring',
        code: `// Destructuring — data extract karne ka shortcut

// Object destructuring
const user = {
  id: 1,
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  address: {
    city: 'Delhi',
    pin: '110001',
  },
  scores: [90, 85, 92],
};

const { id, name, email } = user;
console.log('Basic:', id, name, email);

// Rename while destructuring
const { name: userName, email: userEmail } = user;
console.log('Renamed:', userName, userEmail);

// Default values
const { role = 'user', status = 'active' } = user;
console.log('With defaults:', role, status);

// Nested destructuring
const { address: { city, pin } } = user;
console.log('Nested:', city, pin);

// Array destructuring
const [firstScore, secondScore, ...rest] = user.scores;
console.log('\\nArray destructuring:');
console.log('First:', firstScore, 'Second:', secondScore, 'Rest:', rest);

// Function param destructuring
function displayUser({ name, email, address: { city } = {} }) {
  console.log(\`\${name} (\${email}) from \${city}\`);
}

displayUser(user);

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log('\\nSwapped:', a, b);
`,
      },
    ],
  },
  {
    name: 'Async',
    examples: [
      {
        id: 'callbacks',
        title: 'Callbacks',
        code: `// Callbacks — Node.js ka purana tarika async handle karne ka

// Simple callback
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id > 0) {
      callback(null, { id, name: 'User ' + id, email: 'user' + id + '@example.com' });
    } else {
      callback(new Error('Invalid user ID'));
    }
  }, 500);
}

// Node.js callback convention: (error, result)
fetchUser(1, (err, user) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log('User fetched:', user);
});

// Callback Hell — iska naam hi daraaney wala hai
fetchUser(1, (err, user) => {
  if (err) return console.error(err.message);
  console.log('\\nStep 1 - User:', user.name);

  // Nested callback
  fetchUser(2, (err, friend) => {
    if (err) return console.error(err.message);
    console.log('Step 2 - Friend:', friend.name);

    // Another nested callback
    fetchUser(3, (err, another) => {
      if (err) return console.error(err.message);
      console.log('Step 3 - Another:', another.name);
      console.log('\\nYe hai Callback Hell! Promises se better solution milega.');
    });
  });
});
`,
      },
      {
        id: 'promises',
        title: 'Promises',
        code: `// Promises ka basics — callbacks se better

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: 'API response from ' + url, status: 200 });
      } else {
        reject(new Error('URL required hai!'));
      }
    }, 1000);
  });
}

// .then() .catch() syntax
fetchData('https://api.example.com/users')
  .then(result => {
    console.log('Result:', result);
    return fetchData('https://api.example.com/posts');  // chaining
  })
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(err => {
    console.error('Error:', err.message);
  })
  .finally(() => {
    console.log('\\nHamesha chalega — success ya failure dono mein');
  });

// Promise.all — parallel requests
async function main() {
  try {
    const [r1, r2, r3] = await Promise.all([
      fetchData('url1'),
      fetchData('url2'),
      fetchData('url3'),
    ]);
    console.log('\\nParallel results:');
    console.log(r1.data);
    console.log(r2.data);
    console.log(r3.data);

    // Promise.race — jo pehle aaya
    const fastest = await Promise.race([
      fetchData('fast'),
      fetchData('slow'),
    ]);
    console.log('\\nFastest:', fastest.data);
  } catch (err) {
    console.error('Error in main:', err.message);
  }
}

main();
`,
      },
      {
        id: 'async-await',
        title: 'async/await',
        code: `// async/await — Promises ka clean syntax

// Simulate async operations
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchUser(id) {
  await delay(300);
  if (id <= 0) throw new Error('Invalid ID: ' + id);
  return { id, name: 'User ' + id, score: Math.floor(Math.random() * 100) };
}

async function fetchPosts(userId) {
  await delay(200);
  return [
    { id: 1, title: 'Post by user ' + userId, views: 1200 },
    { id: 2, title: 'Another post', views: 800 },
  ];
}

// Sequential — ek ke baad ek
async function sequential() {
  console.log('Sequential start...');
  const start = Date.now();

  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id);

  console.log('User:', user);
  console.log('Posts:', posts);
  console.log('Time:', Date.now() - start, 'ms (slow - sequential)');
}

// Parallel — saath mein
async function parallel() {
  console.log('\\nParallel start...');
  const start = Date.now();

  const [user, extraPosts] = await Promise.all([
    fetchUser(2),
    fetchPosts(99),
  ]);

  console.log('User:', user);
  console.log('Posts:', extraPosts.length, 'posts');
  console.log('Time:', Date.now() - start, 'ms (fast - parallel!)');
}

// Error handling
async function withErrorHandling() {
  try {
    const user = await fetchUser(-1);  // will throw
    console.log(user);
  } catch (err) {
    console.error('\\nCaught error:', err.message);
  }
}

// Run all
(async () => {
  await sequential();
  await parallel();
  await withErrorHandling();
})();
`,
      },
      {
        id: 'promise-all',
        title: 'Promise.all',
        code: `// Promise combinators — sabko samjho

const delay = (ms, val) => new Promise(r => setTimeout(() => r(val), ms));
const failAfter = (ms, msg) => new Promise((_, rej) => setTimeout(() => rej(new Error(msg)), ms));

async function demo() {
  // Promise.all — sab resolve hone chahiye
  console.log('--- Promise.all ---');
  try {
    const results = await Promise.all([
      delay(100, 'User data'),
      delay(200, 'Post data'),
      delay(150, 'Comment data'),
    ]);
    console.log('All resolved:', results);
  } catch (e) {
    console.error('One failed, all fail:', e.message);
  }

  // Promise.allSettled — sab ka result, chahe fail ho
  console.log('\\n--- Promise.allSettled ---');
  const settled = await Promise.allSettled([
    delay(100, 'Success 1'),
    failAfter(150, 'Failed!'),
    delay(200, 'Success 2'),
  ]);
  settled.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(\`  [\${i}] fulfilled:\`, result.value);
    } else {
      console.log(\`  [\${i}] rejected:\`, result.reason.message);
    }
  });

  // Promise.race — jo pehle aaya
  console.log('\\n--- Promise.race ---');
  const fastest = await Promise.race([
    delay(300, 'Slow'),
    delay(100, 'Fast!'),
    delay(200, 'Medium'),
  ]);
  console.log('Race winner:', fastest);

  // Promise.any — pehla success
  console.log('\\n--- Promise.any ---');
  const first = await Promise.any([
    failAfter(50, 'Fail 1'),
    delay(100, 'First success!'),
    delay(200, 'Second success'),
  ]);
  console.log('Any winner:', first);
}

demo();
`,
      },
    ],
  },
  {
    name: 'Core Modules',
    examples: [
      {
        id: 'eventemitter',
        title: 'EventEmitter',
        code: `// EventEmitter — Node.js ka backbone
const { EventEmitter } = require('events');

// Basic usage
class OrderSystem extends EventEmitter {
  constructor() {
    super();
    this.orders = [];
  }

  placeOrder(item, qty) {
    const order = {
      id: Date.now(),
      item,
      qty,
      status: 'placed',
      timestamp: new Date().toISOString(),
    };
    this.orders.push(order);
    this.emit('order:placed', order);

    // Simulate processing
    setTimeout(() => {
      order.status = 'processing';
      this.emit('order:processing', order);
    }, 500);

    setTimeout(() => {
      order.status = 'delivered';
      this.emit('order:delivered', order);
    }, 1000);
  }
}

const orderSystem = new OrderSystem();

// Event listeners
orderSystem.on('order:placed', (order) => {
  console.log(\`Order placed: #\${order.id} — \${order.qty}x \${order.item}\`);
});

orderSystem.on('order:processing', (order) => {
  console.log(\`Processing order: #\${order.id}\`);
});

orderSystem.on('order:delivered', (order) => {
  console.log(\`Delivered: #\${order.id} — Status: \${order.status}\`);
  console.log('Total orders:', orderSystem.orders.length);
});

// One-time listener
orderSystem.once('order:placed', () => {
  console.log('(First order ke liye special message!)');
});

// Place orders
orderSystem.placeOrder('Laptop', 1);
setTimeout(() => orderSystem.placeOrder('Mouse', 2), 200);
`,
      },
      {
        id: 'path-utils',
        title: 'Path Utilities',
        code: `// path module — file paths handle karna
const path = require('path');

// Current file info
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// path.join — paths join karo safely
const filePath = path.join(__dirname, 'data', 'users.json');
console.log('\\njoin:', filePath);

// path.resolve — absolute path banao
const resolved = path.resolve('relative', 'path', 'file.txt');
console.log('resolve:', resolved);

// path.basename — filename nikalo
const file1 = path.basename('/home/user/documents/report.pdf');
const file2 = path.basename('/home/user/documents/report.pdf', '.pdf');
console.log('\\nbasename:', file1);
console.log('basename (no ext):', file2);

// path.dirname — directory nikalo
const dir = path.dirname('/home/user/documents/report.pdf');
console.log('dirname:', dir);

// path.extname — extension nikalo
const ext1 = path.extname('index.html');
const ext2 = path.extname('archive.tar.gz');
console.log('\\nextname .html:', ext1);
console.log('extname .gz:', ext2);

// path.parse — sab kuch parse karo
const parsed = path.parse('/home/user/documents/report.pdf');
console.log('\\nparse:', JSON.stringify(parsed, null, 2));

// path.format — parse ka ulta
const formatted = path.format({
  dir: '/home/user/documents',
  name: 'report',
  ext: '.pdf',
});
console.log('format:', formatted);

// path.sep — OS-specific separator
console.log('\\nSeparator:', JSON.stringify(path.sep));
console.log('Delimiter:', JSON.stringify(path.delimiter));
`,
      },
      {
        id: 'http-server',
        title: 'http.createServer',
        code: `// http module — basic web server

const http = require('http');
const url = require('url');

const PORT = 3000;

// Simple routes
const routes = {
  'GET /': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'NodeMaster HTTP Server!',
      timestamp: new Date().toISOString(),
      node: process.version,
    }));
  },

  'GET /hello': (req, res) => {
    const parsed = url.parse(req.url, true);
    const name = parsed.query.name || 'World';
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(\`Hello, \${name}! Node.js server se greetings.\`);
  },

  'GET /health': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    }));
  },
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  const routeKey = \`\${req.method} \${parsed.pathname}\`;
  const handler = routes[routeKey];

  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found', path: req.url }));
  }

  console.log(\`[\${req.method}] \${req.url} — \${res.statusCode}\`);
});

server.listen(PORT, () => {
  console.log(\`HTTP server running at http://localhost:\${PORT}\`);
  console.log('Routes:', Object.keys(routes).join(', '));
});
`,
      },
    ],
  },
  {
    name: 'Express',
    examples: [
      {
        id: 'express-basic',
        title: 'Basic Express Server',
        code: `const express = require('express');
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: 'Rahul', email: 'rahul@example.com' },
  { id: 2, name: 'Priya', email: 'priya@example.com' },
  { id: 3, name: 'Amit', email: 'amit@example.com' },
];

// GET all users
app.get('/api/users', (req, res) => {
  const { search } = req.query;
  let result = users;
  if (search) {
    result = users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  res.json({ success: true, users: result, total: result.length });
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, user });
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name aur email required hain' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, user: newUser });
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = { ...users[idx], ...req.body };
  res.json({ success: true, user: users[idx] });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const [deleted] = users.splice(idx, 1);
  res.json({ success: true, deleted });
});

app.listen(3000, () => console.log('Express server running on port 3000'));
`,
      },
      {
        id: 'express-middleware',
        title: 'Middleware',
        code: `const express = require('express');
const app = express();

// ─── Custom Middleware ─────────────────────────────────────────────────────

// Logger middleware
function logger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const color = res.statusCode < 400 ? '\\x1b[32m' : '\\x1b[31m';
    console.log(\`\${color}[\${timestamp}] \${req.method} \${req.url} \${res.statusCode} \${duration}ms\x1b[0m\`);
  });

  next();
}

// Auth middleware
function requireAuth(req, res, next) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token || token !== 'secret-token-123') {
    return res.status(401).json({ error: 'Unauthorized — valid token chahiye!' });
  }
  req.user = { id: 1, name: 'Authenticated User' };
  next();
}

// Rate limiter (simple)
const requestCounts = new Map();
function rateLimit(maxRequests, windowMs) {
  return (req, res, next) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;
    const requests = (requestCounts.get(ip) || []).filter(t => t > windowStart);

    if (requests.length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests! Thoda ruk.' });
    }

    requests.push(now);
    requestCounts.set(ip, requests);
    next();
  };
}

// Apply middleware
app.use(express.json());
app.use(logger);
app.use(rateLimit(10, 60000)); // 10 req/min

// Public routes
app.get('/public', (req, res) => {
  res.json({ message: 'Ye public route hai, koi bhi access kar sakta hai' });
});

// Protected routes
app.get('/private', requireAuth, (req, res) => {
  res.json({
    message: 'Ye private route hai!',
    user: req.user,
    secret: '42 is the answer'
  });
});

// Error middleware (4 params!)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Server with middleware running!');
  console.log('Try: GET /public (no auth needed)');
  console.log('Try: GET /private with Authorization: Bearer secret-token-123');
});
`,
      },
    ],
  },
  {
    name: 'Streams',
    examples: [
      {
        id: 'readable-stream',
        title: 'Readable Stream',
        code: `// Readable Stream — data ko chunks mein padhna
const { Readable, Transform, pipeline } = require('stream');

// Custom Readable Stream — data generate karta hai
class CounterStream extends Readable {
  constructor(opts = {}) {
    super({ objectMode: true, ...opts });
    this.count = 0;
    this.max = opts.max || 5;
  }

  _read() {
    if (this.count < this.max) {
      this.count++;
      const data = {
        id: this.count,
        value: Math.random().toFixed(4),
        timestamp: Date.now(),
      };
      console.log('Pushing chunk:', this.count);
      this.push(data);
    } else {
      console.log('Stream mein aur data nahi!');
      this.push(null); // signal end
    }
  }
}

// Consume the stream
const counter = new CounterStream({ max: 5 });

counter.on('data', (chunk) => {
  console.log('Received chunk:', JSON.stringify(chunk));
});

counter.on('end', () => {
  console.log('\\nStream khatam! Sab chunks aa gaye.');
});

counter.on('error', (err) => {
  console.error('Stream error:', err.message);
});

// Reading with async iteration (modern way)
async function readAll() {
  const stream2 = new CounterStream({ max: 3 });
  console.log('\\n--- Async iteration ---');
  for await (const chunk of stream2) {
    console.log('Async chunk:', chunk.id, '=', chunk.value);
  }
  console.log('Done!');
}

readAll();
`,
      },
      {
        id: 'transform-stream',
        title: 'Transform Stream',
        code: `// Transform Stream — data transform karo on-the-fly
const { Transform, Readable, pipeline } = require('stream');
const { promisify } = require('util');

const pipelineAsync = promisify(pipeline);

// Transform: JSON to uppercase values
class UppercaseTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    // Transform each object
    const transformed = {
      ...chunk,
      name: chunk.name?.toUpperCase(),
      processed: true,
      processedAt: new Date().toISOString(),
    };
    callback(null, transformed);
  }

  _flush(callback) {
    // Final chunk — stream khatam hone se pehle
    this.push({ type: 'summary', message: 'Sab transform ho gaya!' });
    callback();
  }
}

// Filter transform — condition-based filtering
class FilterTransform extends Transform {
  constructor(predicate) {
    super({ objectMode: true });
    this.predicate = predicate;
  }

  _transform(chunk, encoding, callback) {
    if (this.predicate(chunk)) {
      callback(null, chunk); // pass through
    } else {
      callback(); // drop it
    }
  }
}

// Source data
const users = [
  { id: 1, name: 'rahul', age: 25, active: true },
  { id: 2, name: 'priya', age: 17, active: true },
  { id: 3, name: 'amit', age: 30, active: false },
  { id: 4, name: 'neha', age: 22, active: true },
  { id: 5, name: 'raj', age: 15, active: true },
];

// Create source readable
const source = Readable.from(users);
const uppercase = new UppercaseTransform();
const adults = new FilterTransform(u => typeof u.age === 'number' && u.age >= 18 && u.type !== 'summary');

// Process pipeline
(async () => {
  for await (const user of source.pipe(uppercase).pipe(adults)) {
    console.log('Processed:', JSON.stringify(user));
  }
  console.log('Pipeline complete!');
})();
`,
      },
    ],
  },
]

// Flatten all examples for easy lookup
const ALL_EXAMPLES: Example[] = CATEGORIES.flatMap(cat =>
  cat.examples.map(ex => ({ ...ex }))
)

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const [activeExample, setActiveExample] = useState<Example>(ALL_EXAMPLES[0])
  const [currentCode, setCurrentCode] = useState<string>(ALL_EXAMPLES[0].code)
  const [shareLabel, setShareLabel] = useState<string>('Share')

  // Decode shared code from URL hash on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (!hash.startsWith('#code=')) return
    try {
      const encoded = hash.slice('#code='.length)
      const decoded = decodeURIComponent(escape(atob(encoded)))
      setCurrentCode(decoded)
      setActiveExample({ id: 'shared', title: 'Shared Code', code: decoded })
    } catch {
      // malformed hash — silently ignore
    }
  }, [])

  const handleExampleSelect = useCallback((example: Example) => {
    setActiveExample(example)
    setCurrentCode(example.code)
  }, [])

  const handleShare = useCallback(() => {
    const encoded = btoa(unescape(encodeURIComponent(currentCode)))
    const url = `${window.location.origin}/playground#code=${encoded}`
    navigator.clipboard.writeText(url).then(() => {
      setShareLabel('Copied!')
      setTimeout(() => setShareLabel('Share'), 2000)
    })
  }, [currentCode])

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
      {/* ── Header ── */}
      <div className="flex-shrink-0 border-b border-[rgba(255,255,255,0.08)] bg-[#0A0A0F] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎮</span>
              <h1 className="text-lg font-bold text-[#F5F5F7]">Playground</h1>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[#71717A] text-sm">/</span>
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  color: '#7C3AED',
                  border: '1px solid rgba(124,58,237,0.3)',
                }}
              >
                {activeExample.title}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#71717A] hidden md:block">
              Node.js in-browser via WebContainers
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: shareLabel === 'Copied!' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
                color: shareLabel === 'Copied!' ? '#10B981' : '#A1A1AA',
                border: shareLabel === 'Copied!' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {shareLabel === 'Copied!' ? '✓' : '↗'} {shareLabel}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 57px)' }}>

        {/* ── Left sidebar: Examples ── */}
        <div
          className="w-56 flex-shrink-0 border-r border-[rgba(255,255,255,0.08)] overflow-y-auto"
          style={{ background: '#0D0D14' }}
        >
          <div className="p-3">
            <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest mb-3 px-1">
              Examples
            </p>
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="mb-4">
                <p className="text-[10px] font-semibold text-[#52525B] uppercase tracking-wider mb-1.5 px-2">
                  {cat.name}
                </p>
                <div className="space-y-0.5">
                  {cat.examples.map((example) => {
                    const isActive = activeExample.id === example.id
                    return (
                      <button
                        key={example.id}
                        onClick={() => handleExampleSelect(example)}
                        className="w-full text-left text-xs px-2 py-1.5 rounded-md transition-all duration-150 font-mono"
                        style={{
                          background: isActive ? 'rgba(124,58,237,0.2)' : 'transparent',
                          color: isActive ? '#A78BFA' : '#71717A',
                          border: isActive ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
                        }}
                      >
                        {isActive && <span className="mr-1.5">›</span>}
                        {example.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main: Sandpack Editor ── */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <Sandpack
            key={activeExample.id}
            template="node"
            theme={defaultDark}
            files={{
              '/index.js': {
                code: activeExample.code,
                active: true,
              },
            }}
            options={{
              showConsole: true,
              showConsoleButton: true,
              showLineNumbers: true,
              showNavigator: false,
              showTabs: false,
              editorHeight: '100%',
              editorWidthPercentage: 70,
              autorun: false,
              externalResources: [],
            }}
            customSetup={{
              dependencies: {
                express: '4.18.2',
              },
            }}
          />
        </div>

        {/* ── Right sidebar: Shortcuts ── */}
        <div
          className="w-44 flex-shrink-0 border-l border-[rgba(255,255,255,0.08)] overflow-y-auto hidden lg:block"
          style={{ background: '#0D0D14' }}
        >
          <div className="p-3">
            <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest mb-3 px-1">
              Shortcuts
            </p>

            <div className="space-y-3">
              {[
                { keys: ['Ctrl', 'Enter'], label: 'Run code' },
                { keys: ['Ctrl', 'S'], label: 'Save' },
                { keys: ['Ctrl', 'Z'], label: 'Undo' },
                { keys: ['Ctrl', '/'], label: 'Toggle comment' },
                { keys: ['Alt', '↑/↓'], label: 'Move line' },
                { keys: ['Ctrl', 'D'], label: 'Select next' },
              ].map(({ keys, label }) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    {keys.map((k, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <kbd
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: '#A1A1AA',
                          }}
                        >
                          {k}
                        </kbd>
                        {i < keys.length - 1 && <span className="text-[#52525B] text-[9px]">+</span>}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#52525B]">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest mb-3">
                Console Tips
              </p>
              <div className="space-y-2">
                {[
                  'console.log() — output dekho',
                  'console.error() — errors',
                  'console.table() — arrays/objects',
                  'console.time() — timing',
                ].map((tip) => (
                  <p key={tip} className="text-[10px] text-[#52525B] leading-relaxed">
                    {tip}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest mb-2">
                Node Version
              </p>
              <span
                className="text-[10px] font-mono px-2 py-1 rounded"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  color: '#10B981',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                v20 LTS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
