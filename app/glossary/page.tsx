'use client'

import { useState, useMemo, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface GlossaryTerm {
  term: string
  pronunciation?: string
  definition: string
  related: string[]
  chapter?: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Async/Await',
    pronunciation: 'async-await',
    definition: 'Promises ko write karne ka ek cleaner syntax. async function hamesha Promise return karta hai, await usse unwrap karta hai. try/catch se error handle hota hai — bilkul synchronous code jaisa lagta hai.',
    related: ['Promise', 'Callback', 'Event Loop'],
    chapter: 6,
  },
  {
    term: 'Backpressure',
    definition: 'Jab Writable stream, Readable stream se data lene ki speed se slow ho, toh Readable khud pause kar leta hai. Ye memory overflow rokta hai — Node.js streams mein automatically handle hota hai.',
    related: ['Stream', 'Pipe', 'Readable Stream', 'Writable Stream'],
    chapter: 10,
  },
  {
    term: 'bcrypt',
    pronunciation: 'bee-crypt',
    definition: 'Password hashing ke liye industry-standard algorithm. Passwords ko kabhi plain text mein store mat karo — bcrypt ke saath hash karo. saltRounds: 10 minimum recommended hai production mein.',
    related: ['JWT', 'Security', 'Authentication'],
    chapter: 18,
  },
  {
    term: 'Buffer',
    definition: 'Raw binary data ko memory mein store karne ka Node.js way. Streams aur file I/O mein use hota hai. Buffer.from(), Buffer.alloc() se create hota hai. toString("utf8") se string mein convert karo.',
    related: ['Stream', 'fs Module', 'Encoding'],
    chapter: 9,
  },
  {
    term: 'Callback',
    pronunciation: 'call-back',
    definition: 'Function jo dusre function ko pass kiya jaata hai aur baad mein call hota hai. Node.js convention: pehla argument hamesha error hota hai — (err, result). Callback Hell tab hota hai jab bahut zyada nested callbacks ho jaate hain.',
    related: ['Promise', 'Async/Await', 'Event Loop'],
    chapter: 5,
  },
  {
    term: 'CDN',
    pronunciation: 'C-D-N',
    definition: 'Content Delivery Network — static files (images, CSS, JS) ko duniya bhar ke servers pe distribute karta hai. User ke paas jo server closest ho wahan se content deliver hota hai. Latency drastically kam hoti hai.',
    related: ['Reverse Proxy', 'Load Balancer', 'Performance'],
    chapter: 22,
  },
  {
    term: 'CI/CD',
    pronunciation: 'C-I C-D',
    definition: 'Continuous Integration / Continuous Deployment. Code push karte hi automatically tests run hote hain (CI), aur successful hone par automatically deploy hota hai (CD). GitHub Actions, Jenkins, CircleCI common tools hain.',
    related: ['Docker', 'PM2', 'Environment Variable'],
    chapter: 23,
  },
  {
    term: 'Cluster',
    definition: 'Node.js module jo multiple processes (workers) banata hai — ek per CPU core. Master process load distribute karta hai workers mein. Isse single-threaded Node.js bhi multi-core servers ka poora faayda utha sakta hai.',
    related: ['Worker Thread', 'Process', 'Scaling'],
    chapter: 21,
  },
  {
    term: 'CommonJS',
    pronunciation: 'common-J-S',
    definition: 'Node.js ka purana module system. require() se import karo, module.exports se export karo. __dirname aur __filename sirf CommonJS mein available hain. Abhi bhi most popular hai, par ESM aa raha hai.',
    related: ['ESM', 'Module', 'require'],
    chapter: 3,
  },
  {
    term: 'CORS',
    pronunciation: 'cors',
    definition: 'Cross-Origin Resource Sharing — browser ek domain se dusre domain ke API call karne pe block karta hai by default. Server specific headers set karta hai (Access-Control-Allow-Origin) permission dene ke liye. Wildcard * kabhi production mein mat use karo.',
    related: ['HTTP', 'Security', 'Helmet'],
    chapter: 15,
  },
  {
    term: 'Docker',
    pronunciation: 'docker',
    definition: 'Application ko container mein pack karo — sab dependencies samet. "Mere machine pe toh kaam karta tha" problem khatam. Dockerfile mein steps likhte hain, docker build se image banta hai, docker run se container chalta hai.',
    related: ['CI/CD', 'PM2', 'Environment Variable'],
    chapter: 23,
  },
  {
    term: 'Environment Variable',
    definition: 'Process ke environment mein stored configuration values — database URL, API keys, port number etc. process.env.KEY_NAME se access hoti hain. Secrets kabhi code mein hardcode mat karo — .env file mein rakho aur .gitignore mein daalo.',
    related: ['dotenv', 'Config', 'Security'],
    chapter: 4,
  },
  {
    term: 'ESM',
    pronunciation: 'E-S-M',
    definition: 'ECMAScript Modules — JavaScript ka modern module system. import/export syntax use hota hai. package.json mein "type": "module" set karna padta hai. __dirname aur __filename directly available nahi hote — import.meta.url use karo.',
    related: ['CommonJS', 'Module', 'import'],
    chapter: 3,
  },
  {
    term: 'Event Loop',
    definition: 'Node.js ka dil — single thread pe async code chalane ka mechanism. 6 phases hain: timers, pending callbacks, idle/prepare, poll, check, close. Microtasks (Promise, nextTick) phases ke beech chalte hain.',
    related: ['Microtask', 'Macrotask', 'process.nextTick', 'setImmediate'],
    chapter: 6,
  },
  {
    term: 'EventEmitter',
    pronunciation: 'event-emitter',
    definition: 'Node.js ka observer pattern implementation. on() se listener register karo, emit() se event trigger karo. once() sirf ek baar fire hota hai. Streams, HTTP server, aur bahut saare Node.js modules EventEmitter se extend karte hain.',
    related: ['Stream', 'Observer Pattern', 'Event Loop'],
    chapter: 8,
  },
  {
    term: 'Helmet',
    pronunciation: 'helmet',
    definition: 'Express middleware jo automatically 11+ HTTP security headers set karta hai — Content-Security-Policy, X-Frame-Options, etc. app.use(helmet()) ek line mein bahut saari vulnerabilities close ho jaati hain.',
    related: ['CORS', 'Security', 'Rate Limiting'],
    chapter: 15,
  },
  {
    term: 'HTTP',
    pronunciation: 'H-T-T-P',
    definition: 'HyperText Transfer Protocol — client aur server ke beech communication ka rule. Request-Response cycle. Methods: GET, POST, PUT, PATCH, DELETE. Status codes: 2xx success, 4xx client error, 5xx server error.',
    related: ['REST', 'Express', 'CORS'],
    chapter: 11,
  },
  {
    term: 'JWT',
    pronunciation: 'J-W-T',
    definition: 'JSON Web Token — stateless authentication ke liye. Header.Payload.Signature teen parts hote hain. Server JWT sign karta hai, client har request mein Authorization header mein bhejta hai. Secret kabhi expose mat karo!',
    related: ['bcrypt', 'Authentication', 'CORS'],
    chapter: 18,
  },
  {
    term: 'libuv',
    pronunciation: 'lib-U-V',
    definition: 'Node.js ke andar C library jo Event Loop, Thread Pool, aur OS-level async I/O handle karta hai. File I/O, DNS lookups, aur crypto operations Thread Pool mein 4 threads pe chalte hain by default. Invisible hero.',
    related: ['Event Loop', 'V8', 'Thread Pool'],
    chapter: 2,
  },
  {
    term: 'Load Balancer',
    definition: 'Multiple server instances mein incoming requests distribute karta hai. Round-robin, least connections, IP hash — different algorithms hain. Nginx, HAProxy, aur cloud load balancers (AWS ALB) popular options hain.',
    related: ['Cluster', 'Reverse Proxy', 'CDN', 'Scaling'],
    chapter: 22,
  },
  {
    term: 'Macrotask',
    pronunciation: 'macro-task',
    definition: 'Event Loop ki main queue ka task — setTimeout, setInterval, I/O callbacks. Microtasks ke baad chalte hain. Ek Macrotask complete hone ke baad, saari pending Microtasks pehle run hoti hain phir agla Macrotask.',
    related: ['Microtask', 'Event Loop', 'setTimeout'],
    chapter: 6,
  },
  {
    term: 'Microtask',
    pronunciation: 'micro-task',
    definition: 'High priority async task — Promise.then(), process.nextTick(), queueMicrotask(). Macrotasks se pehle, Event Loop phase ke end mein chalti hain. process.nextTick sabse pehle, phir Promise callbacks.',
    related: ['Macrotask', 'Event Loop', 'process.nextTick'],
    chapter: 6,
  },
  {
    term: 'Middleware',
    definition: 'Express mein function jo request aur response ke beech mein kaam karta hai. (req, res, next) signature hota hai. next() call karo toh agla middleware chalega. Error middleware ke 4 params hote hain: (err, req, res, next).',
    related: ['Express', 'HTTP', 'REST'],
    chapter: 12,
  },
  {
    term: 'Module',
    definition: 'Code ko reusable units mein organize karne ka tarika. Node.js mein CommonJS (require) ya ESM (import) use hota hai. Built-in modules: fs, path, http, events, stream. node_modules se third-party packages import hote hain.',
    related: ['CommonJS', 'ESM', 'NPM'],
    chapter: 3,
  },
  {
    term: 'Mongoose',
    pronunciation: 'mon-goose',
    definition: 'MongoDB ke liye elegant ODM (Object Document Mapper). Schema define karo, Model banao, CRUD operations karo. Validation, middleware hooks (pre/post save), virtual fields — sab kuch milta hai. mongoose.connect() se DB se connect karo.',
    related: ['MongoDB', 'Prisma', 'Database'],
    chapter: 16,
  },
  {
    term: 'NPM',
    pronunciation: 'N-P-M',
    definition: 'Node Package Manager — JavaScript packages install karne ka tool. npm install, npm run, npm init, npm publish. package.json mein dependencies list hoti hai. node_modules folder mein actual code hota hai.',
    related: ['package.json', 'Module', 'yarn'],
    chapter: 3,
  },
  {
    term: 'package.json',
    pronunciation: 'package-dot-json',
    definition: 'Project ki identity file. Name, version, dependencies, devDependencies, scripts — sab kuch yahan hota hai. npm init -y se generate hota hai. scripts mein commands define karo jo npm run se chalein.',
    related: ['NPM', 'Module', 'Environment Variable'],
    chapter: 3,
  },
  {
    term: 'Pipe',
    definition: 'Readable stream ka output directly Writable stream mein connect karta hai. readableStream.pipe(writableStream). Backpressure automatically handle hota hai. Pipeline multiple streams chain karne ke liye use hoti hai.',
    related: ['Stream', 'Backpressure', 'Transform Stream'],
    chapter: 10,
  },
  {
    term: 'PM2',
    pronunciation: 'P-M-2',
    definition: 'Production process manager for Node.js. Auto-restart on crash, log management, cluster mode, monitoring. pm2 start app.js, pm2 list, pm2 logs, pm2 restart. Startup script bhi generate kar sakta hai.',
    related: ['Cluster', 'Docker', 'CI/CD'],
    chapter: 22,
  },
  {
    term: 'Prisma',
    definition: 'Modern TypeScript ORM — PostgreSQL, MySQL, SQLite, MongoDB support. Schema-first approach: schema.prisma mein define karo, prisma generate se type-safe client milta hai. Migrations bhi handle karta hai.',
    related: ['Mongoose', 'Database', 'TypeScript'],
    chapter: 16,
  },
  {
    term: 'process.nextTick',
    pronunciation: 'process-next-tick',
    definition: 'Current Event Loop iteration ke bilkul end mein, next phase se pehle callback run karta hai. Microtasks mein sabse high priority. Promise.then se bhi pehle. Infinite nextTick loop Event Loop ko starve kar sakta hai — careful!',
    related: ['setImmediate', 'Microtask', 'Event Loop'],
    chapter: 6,
  },
  {
    term: 'Promise',
    definition: 'Async operation ka future value represent karta hai. 3 states: pending, fulfilled, rejected. .then() se success handle karo, .catch() se error. Promise.all parallel mein chalao, Promise.race jo pehle aaye uska result lo.',
    related: ['Async/Await', 'Callback', 'Event Loop'],
    chapter: 6,
  },
  {
    term: 'Rate Limiting',
    definition: 'Ek IP address ya user kitni requests ek time window mein kar sakta hai — uski limit lagana. DDoS attacks aur brute force se protection. express-rate-limit popular middleware hai. windowMs aur max set karo.',
    related: ['Helmet', 'Security', 'CORS'],
    chapter: 15,
  },
  {
    term: 'Redis',
    pronunciation: 'red-is',
    definition: 'In-memory data store — caching, sessions, pub/sub, queues ke liye. Bahut fast — data RAM mein hota hai. String, Hash, List, Set, Sorted Set data structures support karta hai. ioredis Node.js client popular hai.',
    related: ['Caching', 'Session', 'Bull'],
    chapter: 19,
  },
  {
    term: 'REPL',
    pronunciation: 'repl',
    definition: 'Read-Eval-Print Loop — interactive Node.js shell. Terminal mein node type karo aur REPL shuru ho jaata hai. JavaScript code directly run karo, experiment karo. .help, .exit, .load helpful REPL commands hain.',
    related: ['Node.js', 'Console'],
    chapter: 1,
  },
  {
    term: 'REST',
    pronunciation: 'rest',
    definition: 'Representational State Transfer — API design ka architectural style. Stateless, client-server, uniform interface principles. HTTP methods se CRUD operations map hote hain: GET=read, POST=create, PUT/PATCH=update, DELETE=delete.',
    related: ['HTTP', 'Express', 'JSON'],
    chapter: 13,
  },
  {
    term: 'Reverse Proxy',
    definition: 'Client ke saamne server ki taraf se kaam karne wala server. Nginx popular reverse proxy hai Node.js ke saamne. SSL termination, load balancing, caching, request routing — sab handle karta hai.',
    related: ['Load Balancer', 'CDN', 'Nginx'],
    chapter: 22,
  },
  {
    term: 'setImmediate',
    pronunciation: 'set-immediate',
    definition: 'Event Loop ke check phase mein callback run karta hai — current I/O events ke baad, setTimeout(fn,0) se typically pehle. I/O callbacks ke andar setTimeout(fn,0) se setImmediate hamesha pehle chalega.',
    related: ['setTimeout', 'process.nextTick', 'Macrotask'],
    chapter: 6,
  },
  {
    term: 'setTimeout',
    pronunciation: 'set-timeout',
    definition: 'Event Loop ke timers phase mein callback schedule karta hai. setTimeout(fn, 0) ka matlab ye nahi ki immediately chalega — minimum 1ms (ya zyada) delay hoga. process.nextTick aur Promises isse pehle chalenge.',
    related: ['setImmediate', 'process.nextTick', 'Macrotask'],
    chapter: 6,
  },
  {
    term: 'Socket.io',
    definition: 'WebSocket ke upar abstraction — bidirectional, event-based real-time communication. Rooms, namespaces, broadcasting — built-in features. Auto-reconnection, fallback to long-polling. Chat apps, live notifications ke liye perfect.',
    related: ['WebSocket', 'EventEmitter', 'HTTP'],
    chapter: 20,
  },
  {
    term: 'Stream',
    definition: 'Data ko chunks mein process karne ka tarika — poora data ek saath memory mein load karne ki zaroorat nahi. 4 types: Readable, Writable, Duplex (dono), Transform (modify karta hai). Large file processing ke liye must-know.',
    related: ['Buffer', 'Pipe', 'Backpressure', 'EventEmitter'],
    chapter: 10,
  },
  {
    term: 'TLS',
    pronunciation: 'T-L-S',
    definition: 'Transport Layer Security — HTTPS ka backbone. Data ko encrypt karta hai client aur server ke beech. SSL ka modern version. Certificate aur private key ki zaroorat hoti hai. Let\'s Encrypt se free certificates milte hain.',
    related: ['HTTPS', 'Security', 'Reverse Proxy'],
    chapter: 15,
  },
  {
    term: 'Transform Stream',
    definition: 'Duplex stream jo data ko read karte waqt transform karta hai — compress karna, encrypt karna, parse karna. zlib.createGzip() ek Transform stream hai. _transform() method implement karna padta hai.',
    related: ['Stream', 'Pipe', 'Buffer'],
    chapter: 10,
  },
  {
    term: 'V8',
    pronunciation: 'V-eight',
    definition: "Google ka JavaScript engine — Chrome aur Node.js dono mein use hota hai. JIT compilation se JavaScript ko machine code mein compile karta hai. Memory management (Garbage Collection) bhi V8 handle karta hai. Node.js ka 'engine' literally.",
    related: ['libuv', 'Event Loop', 'Node.js Internals'],
    chapter: 2,
  },
  {
    term: 'WebSocket',
    definition: 'HTTP ke upar full-duplex communication protocol. Ek baar connection establish hone ke baad, server bhi client ko data push kar sakta hai bina request ke. ws Node.js library se implement karo. Real-time features ke liye essential.',
    related: ['Socket.io', 'HTTP', 'EventEmitter'],
    chapter: 20,
  },
  {
    term: 'Worker Thread',
    definition: 'Node.js mein true multi-threading! CPU-intensive tasks (image processing, crypto) ke liye. worker_threads module se create hote hain. Main thread aur worker thread SharedArrayBuffer se data share kar sakte hain.',
    related: ['Cluster', 'libuv', 'Process'],
    chapter: 21,
  },

  // ── JavaScript Terms ────────────────────────────────────────────────────────
  {
    term: 'Closure',
    pronunciation: 'clo-zhure',
    definition: 'Function jo apne outer scope ke variables yaad rakhta hai — even after outer function return ho jaaye. Private variables banane ka JavaScript ka primary mechanism. Counter, memoization, event handlers mein commonly used.',
    related: ['Scope', 'Hoisting', 'IIFE', 'Function'],
  },
  {
    term: 'Hoisting',
    definition: 'JavaScript ka behavior jisme var declarations aur function declarations ko scope ke top pe conceptually move kiya jaata hai before execution. var: hoisted + initialized to undefined. let/const: hoisted but TDZ (Temporal Dead Zone) mein. Function declarations fully hoisted hote hain.',
    related: ['Closure', 'Scope', 'var', 'let/const'],
  },
  {
    term: 'Prototype',
    pronunciation: 'pro-to-type',
    definition: 'JavaScript ka inheritance mechanism. Har object ek prototype chain follow karta hai. Property milti nahi toh prototype check hota hai, phir prototype ka prototype — Object.prototype tak. __proto__ property ya Object.getPrototypeOf() se access hota hai.',
    related: ['Class', 'Inheritance', 'Object'],
  },
  {
    term: 'Scope',
    definition: 'Variable kahan accessible hai — ye define karta hai scope. Global scope (poori file), Function scope (function ke andar), Block scope (let/const ke saath {}). JavaScript lexical scoping follow karta hai — inner functions outer scope ke variables access kar sakte hain.',
    related: ['Closure', 'Hoisting', 'var', 'let/const'],
  },
  {
    term: 'IIFE',
    pronunciation: 'iffy',
    definition: 'Immediately Invoked Function Expression — banate hi execute ho jaata hai. (function() { ... })(). Global namespace pollution rokne ke liye use hota tha ES6 se pehle. Aajkal ES modules ne replace kar diya hai.',
    related: ['Closure', 'Scope', 'Module'],
  },
  {
    term: 'Memoization',
    pronunciation: 'memo-i-zay-shun',
    definition: 'Expensive function calls ke results cache karna — same inputs ke liye cached result return karna. Pure functions ke saath kaam karta hai. React mein useMemo/useCallback, general code mein Map ya WeakMap se implement karo.',
    related: ['Cache', 'Performance', 'Pure Function'],
  },
  {
    term: 'Immutability',
    pronunciation: 'im-myu-tuh-bil-ity',
    definition: 'Data create hone ke baad change nahi karna — instead naya value create karo. React state updates mein zaroori (direct mutation re-render nahi trigger karta). Object.freeze(), spread operator (...), Immer library se implement karo.',
    related: ['React', 'Redux', 'State'],
  },
  {
    term: 'Currying',
    pronunciation: 'curry-ing',
    definition: 'Multiple arguments wali function ko single argument functions ki chain mein convert karna. add(2)(3) instead of add(2, 3). Partial application enable karta hai — reusable specialized functions banao. Functional programming ka core concept.',
    related: ['Higher-Order Function', 'Closure', 'Functional Programming'],
  },
  {
    term: 'Higher-Order Function',
    definition: 'Function jo ek ya zyada functions input mein leve ya output mein function return kare. Examples: map(), filter(), reduce(), setTimeout(). JavaScript mein functions first-class citizens hain — ye possible hai.',
    related: ['Currying', 'Closure', 'Callback', 'Functional Programming'],
  },
  {
    term: 'Debounce',
    pronunciation: 'dee-bounce',
    definition: 'Rapid events (keystrokes, window resize) ke liye — last event ke N milliseconds baad function execute karo. Search input mein: user type karna band kare tabhi API call karo. Lodash ka _.debounce widely used hai.',
    related: ['Throttle', 'Performance', 'Event'],
  },
  {
    term: 'Throttle',
    definition: 'Function ko N milliseconds mein sirf ek baar execute hone do — chahe kitni bhi baar call hue. Scroll events, resize handlers ke liye. Debounce: last event ke baad wait. Throttle: fixed interval mein max ek baar.',
    related: ['Debounce', 'Performance', 'Event'],
  },
  {
    term: 'Pure Function',
    definition: 'Function jo same inputs pe hamesha same output de aur koi side effects na kare. State change nahi karta, external data modify nahi karta. Testing easy hoti hai, predictable behavior. Functional programming ka foundation.',
    related: ['Immutability', 'Higher-Order Function', 'Memoization'],
  },

  // ── React Terms ─────────────────────────────────────────────────────────────
  {
    term: 'Hook',
    definition: 'React 16.8 mein introduce hua — functional components mein state aur lifecycle features use karne ka way. useState, useEffect, useRef, useMemo, useCallback, useContext. Rules: sirf top level mein call karo, sirf React functions mein. Custom hooks se logic reuse karo.',
    related: ['useState', 'useEffect', 'React', 'Component'],
  },
  {
    term: 'Reconciliation',
    pronunciation: 'rec-on-sil-ee-ay-shun',
    definition: 'React ka process jisme Virtual DOM aur actual DOM compare hota hai — diff algorithm. Changed parts efficiently update hote hain. key prop is process mein help karta hai — same key = same element reuse.',
    related: ['Virtual DOM', 'React', 'key prop', 'Diffing'],
  },
  {
    term: 'JSX',
    pronunciation: 'J-S-X',
    definition: 'JavaScript XML — HTML-like syntax jo JavaScript mein React elements banata hai. Babel compile karke React.createElement() calls mein convert karta hai. className (not class), htmlFor (not for) use karo. {expression} se JavaScript embed karo.',
    related: ['React', 'Component', 'Virtual DOM'],
  },
  {
    term: 'Hydration',
    definition: 'Server-side rendered HTML ko React interactive banana — event handlers attach karna. Next.js SSR mein: server HTML bhejta hai (fast first paint), phir React hydrate karta hai (interactive banata hai). Mismatch hone pe errors aate hain.',
    related: ['SSR', 'Next.js', 'React', 'Server Components'],
  },
  {
    term: 'Prop Drilling',
    definition: 'Data ko har intermediate component ke through pass karna — chahe unhe zaroorat na ho. Problem: deeply nested components mein messy code. Solutions: Context API, Zustand, Redux, component composition.',
    related: ['Context API', 'React', 'State Management', 'Props'],
  },
  {
    term: 'Side Effect',
    definition: 'Function ka koi bhi kaam jo pure output ke alawa ho — API calls, DOM changes, subscriptions, localStorage. React mein useEffect se manage karo. Cleanup function return karo subscriptions/timers ke liye — memory leaks rokne ke liye.',
    related: ['useEffect', 'Hook', 'Pure Function', 'React'],
  },
  {
    term: 'Server Component',
    definition: 'Next.js App Router mein: server pe render hone wala React component — client JavaScript bundle mein nahi jaata. DB directly access kar sakte ho. Async/await directly use hota hai. "use client" directive se Client Component banao.',
    related: ['Next.js', 'Hydration', 'React', 'SSR'],
  },
  {
    term: 'Controlled Component',
    definition: 'Form element jiska value React state se control hota hai. onChange se state update karo, value prop se render karo — React is the "single source of truth". Uncontrolled: DOM khud state manage karta hai (useRef se read karo).',
    related: ['useState', 'React', 'Form', 'Hook'],
  },

  // ── TypeScript Terms ────────────────────────────────────────────────────────
  {
    term: 'Type Guard',
    definition: 'Runtime check jo TypeScript ko batata hai ki value ek specific type hai — phir TypeScript us type ke operations allow karta hai. typeof, instanceof, in operator, ya custom predicate (function isCat(x): x is Cat). Type narrowing ka mechanism.',
    related: ['Type Narrowing', 'Discriminated Union', 'TypeScript'],
  },
  {
    term: 'Type Narrowing',
    definition: 'TypeScript ka process jisme broad type (string | number) ko narrow type (string) mein convert kiya jaata hai — control flow ke through. if/switch/typeof checks ke baad TypeScript automatically type narrow kar deta hai.',
    related: ['Type Guard', 'Union Type', 'TypeScript', 'Discriminated Union'],
  },
  {
    term: 'Discriminated Union',
    definition: 'Union type jisme har member ka ek common "discriminant" field hota hai — kind, type, tag. Switch statement mein TypeScript automatically narrow karta hai. Type-safe state machines aur variants ke liye powerful pattern.',
    related: ['Union Type', 'Type Narrowing', 'TypeScript', 'Type Guard'],
  },
  {
    term: 'Declaration Merging',
    definition: 'TypeScript feature jisme same naam ki multiple interface declarations automatically merge ho jaati hain. Express Request mein custom properties add karna iska common use case hai — bina original types modify kiye extend karo.',
    related: ['Interface', 'TypeScript', 'Module Augmentation'],
  },
  {
    term: 'Generic',
    definition: 'TypeScript mein type parameter — function ya class ko kisi bhi type ke saath type-safe banata hai bina any ke. Array<T>, Promise<T>, useState<T>() sab generics hain. T ek placeholder hai jo call time pe actual type se fill hota hai.',
    related: ['TypeScript', 'Type Alias', 'Interface', 'Utility Types'],
  },
  {
    term: 'Utility Types',
    definition: 'TypeScript ke built-in generic types jo common transformations karte hain. Partial<T> — saari optional. Omit<T, K> — fields hata do. Pick<T, K> — sirf kuch fields rakho. Record<K, V> — key-value map. ReturnType<T> — function return type.',
    related: ['Generic', 'TypeScript', 'Mapped Types'],
  },
  {
    term: 'Mapped Types',
    definition: 'TypeScript ka type-level loop — object ke har property ko transform karo. { [K in keyof T]: T[K] } template. Readonly<T>, Partial<T> isi se banate hain. Conditional types ke saath combine karo complex transformations ke liye.',
    related: ['Generic', 'TypeScript', 'Utility Types', 'Conditional Types'],
  },

  // ── Database Terms ──────────────────────────────────────────────────────────
  {
    term: 'ACID',
    pronunciation: 'A-C-I-D',
    definition: 'Database transaction properties: Atomicity (ya sab ya kuch nahi), Consistency (valid state to valid state), Isolation (concurrent transactions independent), Durability (committed data permanent). Relational databases (PostgreSQL) ye guarantee karte hain.',
    related: ['Transaction', 'PostgreSQL', 'Connection Pool', 'Isolation Level'],
  },
  {
    term: 'Foreign Key',
    definition: 'Ek table ka column jo doosri table ke primary key ko reference karta hai — referential integrity enforce karta hai. ON DELETE CASCADE: parent delete ho toh children bhi. ON DELETE SET NULL: child ka FK NULL ho jaata hai. Orphan records prevent karta hai.',
    related: ['ACID', 'Transaction', 'ORM', 'Database'],
  },
  {
    term: 'ORM',
    pronunciation: 'O-R-M',
    definition: 'Object-Relational Mapper — database tables ko JavaScript objects mein map karta hai. Prisma, TypeORM, Sequelize popular hain. Raw SQL ki jagah JS/TS methods se query karo. Type safety milti hai Prisma se — auto-generated types from schema.',
    related: ['Prisma', 'Database', 'Migration', 'Foreign Key'],
  },
  {
    term: 'Migration',
    definition: 'Database schema changes ko versioned, reversible scripts mein track karna. ALTER TABLE, CREATE INDEX jaise changes — team mein sab ka same schema. Prisma migrate dev, Knex, Flyway common tools. production mein migrate deploy use karo.',
    related: ['ORM', 'Prisma', 'Database', 'Schema'],
  },
  {
    term: 'Index (Database)',
    definition: 'Database table pe data structure jo queries fast banata hai — full table scan ki jagah direct jump. B-tree (default) range queries ke liye. Hash exact equality ke liye. Composite index: multiple columns. Tradeoff: reads fast, writes slightly slow.',
    related: ['Query Optimization', 'PostgreSQL', 'N+1 Problem', 'EXPLAIN'],
  },
  {
    term: 'Query Plan',
    definition: 'Database ka plan ki query kaise execute karegi — kaunse indexes use honge, kaunsa join algorithm. EXPLAIN ANALYZE se dekho. Seq Scan = full table scan (slow for large tables). Index Scan = fast. actual time vs estimated rows compare karo.',
    related: ['Index (Database)', 'PostgreSQL', 'Query Optimization'],
  },

  // ── DevOps/Architecture Terms ────────────────────────────────────────────────
  {
    term: 'Webhook',
    pronunciation: 'web-hook',
    definition: 'HTTP callback — event hone pe ek service doosri service ko HTTP request bhejti hai. GitHub ke code push pe Vercel deploy trigger karna webhook se hota hai. Poll karne ki jagah push — zyada efficient. Payload verify karo HMAC signature se.',
    related: ['HTTP', 'API', 'CI/CD', 'Event'],
  },
  {
    term: 'Container',
    definition: 'Application aur uski saari dependencies ko ek isolated environment mein package karna — Docker container. VM se hafif hai — OS kernel share karta hai. "Works on my machine" problem solve karta hai. Docker image se multiple containers run karo.',
    related: ['Docker', 'Microservice', 'CI/CD', 'Deployment'],
  },
  {
    term: 'Microservice',
    definition: 'Application ko small, independent services mein divide karna — har service ek specific business capability ke liye. Independent deployment, scaling, technology stack. Complexity zyada hai monolith se. Start with monolith, extract when pain is clear.',
    related: ['API Gateway', 'Monolith', 'Container', 'Message Queue'],
  },
  {
    term: 'API Gateway',
    definition: 'Single entry point jo multiple backend services ke aage baithta hai — routing, rate limiting, auth, SSL termination. Clients ek hi endpoint se baat karte hain. Kong, AWS API Gateway, Nginx common tools. Microservices architecture mein essential.',
    related: ['Microservice', 'Reverse Proxy', 'Rate Limiting', 'Load Balancer'],
  },
  {
    term: 'Monorepo',
    pronunciation: 'mono-ree-poh',
    definition: 'Multiple projects/packages ek hi git repository mein. Code sharing easy hota hai. Turborepo, Nx, Lerna popular tools. Tradeoff: large repo size, complex CI setup. Frontend + backend + shared types ek jagah — consistency easy.',
    related: ['CI/CD', 'npm', 'Microservice'],
  },
  {
    term: 'CAP Theorem',
    definition: 'Distributed systems mein Consistency, Availability, Partition Tolerance — teeno ek saath possible nahi. Network partition hone pe ya C ya A choose karo. PostgreSQL: CP (consistency prefer). Cassandra: AP (availability prefer). Basis hai database selection ka.',
    related: ['Database', 'Microservice', 'Redis', 'ACID'],
  },
  {
    term: 'Tree Shaking',
    definition: 'Build process mein unused JavaScript code ko bundle se hata dena — jaise dead branches tree se shake karke hataate hain. ES modules ke saath work karta hai (static imports). Webpack, Rollup, Vite automatically karte hain. Bundle size kam hoti hai.',
    related: ['ESM', 'npm', 'Performance', 'Bundle'],
  },
  {
    term: 'Dependency Injection',
    definition: 'Class ko uski dependencies khud banane ki jagah bahar se inject karna — constructor ya method parameters se. Testing easy hoti hai (mock inject karo). NestJS, InversifyJS common DI containers. Loose coupling promote karta hai.',
    related: ['ORM', 'Microservice', 'Testing', 'Repository Pattern'],
  },
  {
    term: 'Race Condition',
    definition: 'Bug jab multiple concurrent operations same shared state access/modify karein — aur result execution order pe depend kare. Example: two requests simultaneously check inventory (both see 1 item), both buy — negative stock! Locks ya atomic operations se prevent karo.',
    related: ['ACID', 'Transaction', 'Async/Await', 'Concurrency'],
  },
  {
    term: 'Idempotent',
    pronunciation: 'eye-dem-poe-tent',
    definition: 'Operation jo multiple baar execute karo lekin result same rahe. HTTP GET, PUT, DELETE idempotent hain. POST nahi (har call new resource create karta hai). Retries aur distributed systems mein important — safely retry kar sako without side effects.',
    related: ['REST', 'HTTP', 'API', 'Webhook'],
  },
  {
    term: 'Singleton',
    definition: 'Design pattern jisme ek class ka sirf ek instance exist kare poori application mein. Database connection pool, logger, config object. JavaScript mein module caching natural singleton ban jaata hai. Testing mein problematic ho sakta hai — prefer dependency injection.',
    related: ['Design Pattern', 'Dependency Injection', 'Module'],
  },
  {
    term: 'Factory Pattern',
    definition: 'Object creation logic ko encapsulate karna — caller ko concrete class pata nahi honi chahiye. createUser() factory se User ya AdminUser return hota hai based on input. Flexibility: implementation change karo bina caller code change kiye.',
    related: ['Design Pattern', 'Singleton', 'Dependency Injection'],
  },
]

// ─── Alphabet list ────────────────────────────────────────────────────────────

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// ─── Term Card ────────────────────────────────────────────────────────────────

function TermCard({ term }: { term: GlossaryTerm }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = `${term.term}: ${term.definition}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div
      className="group relative rounded-2xl border border-[rgba(255,255,255,0.08)] p-5 transition-all duration-200 hover:border-[rgba(124,58,237,0.3)]"
      style={{ background: 'rgba(26,26,38,0.6)', backdropFilter: 'blur(8px)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base font-bold text-[#F5F5F7] leading-tight">{term.term}</h3>
          {term.pronunciation && (
            <p className="text-xs font-mono text-[#71717A] mt-0.5">/{term.pronunciation}/</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {term.chapter && (
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(124,58,237,0.12)',
                color: '#A78BFA',
                border: '1px solid rgba(124,58,237,0.25)',
              }}
            >
              Ch.{term.chapter}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 text-[10px] font-mono px-2 py-0.5 rounded transition-all duration-150"
            style={{
              background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
              color: copied ? '#10B981' : '#71717A',
              border: copied ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Definition */}
      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{term.definition}</p>

      {/* Related terms */}
      {term.related.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {term.related.map((rel) => (
            <span
              key={rel}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md"
              style={{
                background: 'rgba(6,182,212,0.08)',
                color: '#67E8F9',
                border: '1px solid rgba(6,182,212,0.2)',
              }}
            >
              {rel}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let terms = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term))
    if (search.trim()) {
      const q = search.toLowerCase()
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.related.some((r) => r.toLowerCase().includes(q))
      )
    }
    if (activeLetter) {
      terms = terms.filter((t) => t.term[0].toUpperCase() === activeLetter)
    }
    return terms
  }, [search, activeLetter])

  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {}
    filtered.forEach((term) => {
      const letter = term.term[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(term)
    })
    return groups
  }, [filtered])

  const availableLetters = useMemo(() => {
    return new Set(GLOSSARY_TERMS.map((t) => t.term[0].toUpperCase()))
  }, [])

  const handleLetterClick = useCallback((letter: string) => {
    setActiveLetter((prev) => (prev === letter ? null : letter))
    setSearch('')
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setActiveLetter(null)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* ── Hero ── */}
      <div className="relative border-b border-[rgba(255,255,255,0.08)] py-14 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/3 w-96 h-64 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ background: '#7C3AED' }}
        />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest mb-4">
            Node.js Dictionary
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-2 leading-tight">
            Glossary
          </h1>
          <p className="text-lg text-[#A1A1AA] mb-2">
            Node.js ke {GLOSSARY_TERMS.length} important terms — Hinglish mein samjhaaya
          </p>
          <p className="text-sm text-[#71717A]">
            Jaldi samajh aaye tere ko 😄
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mt-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52525B] text-lg">🔍</span>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search terms, definitions..."
              className="w-full pl-11 pr-5 py-3.5 text-base rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(26,26,38,0.8)] text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors"
              style={{ backdropFilter: 'blur(8px)' }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#F5F5F7] transition-colors text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Alphabet Tabs ── */}
      <div className="sticky top-0 z-30 border-b border-[rgba(255,255,255,0.06)]"
        style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex flex-wrap gap-1 justify-center">
            {ALPHABET.map((letter) => {
              const hasTerms = availableLetters.has(letter)
              const isActive = activeLetter === letter
              return (
                <button
                  key={letter}
                  onClick={() => hasTerms && handleLetterClick(letter)}
                  disabled={!hasTerms}
                  className="w-7 h-7 text-xs font-mono font-bold rounded transition-all duration-150"
                  style={{
                    background: isActive ? 'rgba(124,58,237,0.25)' : hasTerms ? 'rgba(255,255,255,0.04)' : 'transparent',
                    color: isActive ? '#A78BFA' : hasTerms ? '#A1A1AA' : '#3F3F46',
                    border: isActive ? '1px solid rgba(124,58,237,0.4)' : hasTerms ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                    cursor: hasTerms ? 'pointer' : 'default',
                  }}
                >
                  {letter}
                </button>
              )
            })}
            {activeLetter && (
              <button
                onClick={() => setActiveLetter(null)}
                className="px-3 h-7 text-xs font-mono rounded transition-all duration-150"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  color: '#EF4444',
                  border: '1px solid rgba(239,68,68,0.25)',
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#71717A]">
            <span className="text-[#F5F5F7] font-semibold">{filtered.length}</span> terms
            {search && <span className="ml-1">for &quot;{search}&quot;</span>}
            {activeLetter && <span className="ml-1">starting with &apos;{activeLetter}&apos;</span>}
          </p>
          {(search || activeLetter) && (
            <button
              onClick={() => { setSearch(''); setActiveLetter(null) }}
              className="text-xs text-[#71717A] hover:text-[#F5F5F7] transition-colors"
            >
              Show all →
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🤔</p>
            <p className="text-[#71717A] text-lg">Ye term abhi glossary mein nahi hai</p>
            <p className="text-[#52525B] text-sm mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, terms]) => (
                <div key={letter} id={`letter-${letter}`}>
                  {/* Letter header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold font-mono flex-shrink-0"
                      style={{
                        background: 'rgba(124,58,237,0.15)',
                        color: '#7C3AED',
                        border: '1px solid rgba(124,58,237,0.25)',
                      }}
                    >
                      {letter}
                    </div>
                    <div
                      className="flex-1 h-px"
                      style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.3), transparent)' }}
                    />
                    <span className="text-xs text-[#52525B] font-mono">{terms.length} terms</span>
                  </div>

                  {/* Terms grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {terms.map((term) => (
                      <TermCard key={term.term} term={term} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
