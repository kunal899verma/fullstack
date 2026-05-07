'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, Copy, Check, Star, Filter, Code2, Zap } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Track = 'javascript' | 'react' | 'nodejs' | 'genai' | 'typescript' | 'databases' | 'system-design' | 'coding'
type Difficulty = 'beginner' | 'intermediate' | 'advanced'
type Priority = 'must-know' | 'important' | 'good-to-know'

interface Question {
  id: number
  track: Track
  difficulty: Difficulty
  priority: Priority
  question: string
  answer: string
  tags: string[]
}

// ── Questions Data ────────────────────────────────────────────────────────────

const questions: Question[] = [
  // ── JavaScript ──────────────────────────────────────────────────────────────
  {
    id: 1, track: 'javascript', difficulty: 'beginner', priority: 'must-know',
    question: 'var, let, const mein kya fark hai?',
    answer: `var: function-scoped, hoisted, re-declarable (avoid karo!)
let: block-scoped, re-assignable, TDZ (Temporal Dead Zone)
const: block-scoped, cannot be reassigned (but object properties can change)

\`\`\`js
var x = 1; var x = 2;        // OK (bad practice)
let y = 1; let y = 2;        // SyntaxError
const obj = {}; obj.a = 1;   // OK — reference same hai
const z = 1; z = 2;          // TypeError — reassignment

// RULE: const by default → let jab reassignment chahiye → var kabhi nahi
\`\`\``,
    tags: ['variables', 'scope', 'es6']
  },
  {
    id: 2, track: 'javascript', difficulty: 'beginner', priority: 'must-know',
    question: '== aur === mein kya fark hai?',
    answer: `== (loose): type coercion karta hai pehle
=== (strict): type AND value dono check — no coercion

\`\`\`js
5 == '5'           // true  (coercion)
5 === '5'          // false (different types)
null == undefined  // true  (special case)
null === undefined // false
0 == false         // true
0 === false        // false

// RULE: Hamesha === use karo
// Exception: null check — if (x == null) catches both null + undefined
\`\`\``,
    tags: ['operators', 'type-coercion']
  },
  {
    id: 3, track: 'javascript', difficulty: 'beginner', priority: 'must-know',
    question: 'Closure kya hai? Practical example do.',
    answer: `Closure = function jo apne outer scope ke variables yaad rakhta hai, even after outer function complete ho chuki.

\`\`\`js
function makeCounter() {
  let count = 0;  // private variable — bahar se access nahi
  return {
    increment() { count++; },
    get() { return count; }
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
console.log(counter.get()); // 2
// count directly accessible nahi — encapsulated!
\`\`\`

Use cases: private variables, function factories, memoization, event handlers with state.`,
    tags: ['closures', 'scope', 'functions']
  },
  {
    id: 4, track: 'javascript', difficulty: 'beginner', priority: 'must-know',
    question: 'Hoisting kya hai? var, let, function ke liye kaise different hai?',
    answer: `Hoisting = JS declarations ko scope ke top pe conceptually move karta hai before execution.

\`\`\`js
// var: hoisted + initialized to undefined
console.log(x); // undefined (not error!)
var x = 5;

// let/const: hoisted but NOT initialized (TDZ — Temporal Dead Zone)
console.log(y); // ReferenceError!
let y = 5;

// Function declaration: fully hoisted (name + body)
greet(); // "Hello" — works!
function greet() { console.log('Hello'); }

// Function expression: NOT hoisted
sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log('Bye'); };
\`\`\``,
    tags: ['hoisting', 'var', 'tdz']
  },
  {
    id: 5, track: 'javascript', difficulty: 'beginner', priority: 'must-know',
    question: 'Arrow function aur regular function mein 4 key differences kya hain?',
    answer: `1. this binding: Arrow = lexical (outer scope). Regular = call site se.
2. arguments object: Regular ke paas hai. Arrow ke paas nahi.
3. Constructor: Regular new ke saath. Arrow nahi.
4. Syntax: Arrow shorter.

\`\`\`js
const obj = {
  name: 'NodeMaster',
  regular: function() { console.log(this.name); }, // 'NodeMaster'
  arrow: () => { console.log(this.name); }          // undefined (lexical)
};

// Use arrow for: callbacks, array methods
[1,2,3].map(n => n * 2);

// Use regular for: methods, constructors, when you need 'this'
class Person { greet() { return \`Hi \${this.name}\`; } }
\`\`\``,
    tags: ['arrow-functions', 'this', 'es6']
  },
  {
    id: 6, track: 'javascript', difficulty: 'beginner', priority: 'must-know',
    question: 'map, filter, reduce explain karo with examples.',
    answer: `The "Big Three" functional array methods — non-mutating, return new array/value.

\`\`\`js
const nums = [1, 2, 3, 4, 5];

// map: transform each → same length array
const doubled = nums.map(n => n * 2);     // [2, 4, 6, 8, 10]

// filter: keep matching items
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce: accumulate to single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

// Chain them
const users = [{name:'Rahul', age:25}, {name:'Priya', age:17}];
const adultNames = users
  .filter(u => u.age >= 18)
  .map(u => u.name);  // ['Rahul']

// reduce for grouping
const grouped = users.reduce((acc, u) => {
  const key = u.age >= 18 ? 'adults' : 'minors';
  return { ...acc, [key]: [...(acc[key] || []), u] };
}, {});
\`\`\``,
    tags: ['arrays', 'map', 'filter', 'reduce']
  },
  {
    id: 7, track: 'javascript', difficulty: 'intermediate', priority: 'must-know',
    question: 'Event loop: microtask vs macrotask execution order.',
    answer: `Priority order (fixed):
1. Sync code (Call Stack)
2. process.nextTick() [Node.js only — highest priority]
3. Microtasks: Promise.then(), queueMicrotask()
4. Macrotasks: setTimeout, setInterval, I/O

\`\`\`js
console.log('1 - sync');
setTimeout(() => console.log('4 - macrotask'), 0);
Promise.resolve().then(() => console.log('3 - microtask'));
console.log('2 - sync');
// Output: 1, 2, 3, 4

// Key rule: ALL microtasks complete before NEXT macrotask starts
// So 10 chained .then() callbacks run before a single setTimeout
\`\`\`

Interview question: ye output kya hai?
setTimeout(fn1, 0); Promise.resolve().then(fn2); console.log('sync');
Answer: sync → fn2 → fn1`,
    tags: ['event-loop', 'microtask', 'macrotask', 'async']
  },
  {
    id: 8, track: 'javascript', difficulty: 'intermediate', priority: 'must-know',
    question: 'Promise.all, race, allSettled, any mein kya fark hai?',
    answer: `\`\`\`js
// Promise.all — parallel, FAIL FAST
// Sab fulfill → array of results. Koi bhi reject → immediately rejects.
const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);
// Use: independent parallel calls jab sab zaroori hain

// Promise.race — pehla settle karo (success ya error)
const result = await Promise.race([fetchAPI(), timeout(5000)]);
// Use: timeout implementation

// Promise.allSettled — sab ka wait, koi fail bhi ho to continue
const results = await Promise.allSettled([api1(), api2(), api3()]);
results.forEach(r => {
  if (r.status === 'fulfilled') use(r.value);
  else log('Failed:', r.reason);
});
// Use: dashboard widgets — ek fail ho to baaki show karo

// Promise.any — pehla SUCCESSFUL (ES2021)
const fastest = await Promise.any([cdn1(), cdn2(), cdn3()]);
// Use: multiple fallback sources — jo pehle kaam kare
// All reject → AggregateError
\`\`\``,
    tags: ['promises', 'parallel', 'async']
  },
  {
    id: 9, track: 'javascript', difficulty: 'intermediate', priority: 'must-know',
    question: 'Debounce aur Throttle implement karo. Kab kaunsa use karein?',
    answer: `Debounce: N ms ki inactivity ke baad execute (wait for quiet)
Throttle: At most once per N ms (rate limit)

\`\`\`js
// Debounce
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Use: search input, window resize handler
const search = debounce(callAPI, 300); // waits 300ms after last keystroke

// Throttle
function throttle(fn, interval) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      return fn.apply(this, args);
    }
  };
}
// Use: scroll/mousemove events, button spam prevention
const onScroll = throttle(handleScroll, 100); // max once per 100ms
\`\`\``,
    tags: ['performance', 'debounce', 'throttle']
  },
  {
    id: 10, track: 'javascript', difficulty: 'intermediate', priority: 'must-know',
    question: 'this keyword ke 4 binding rules kya hain?',
    answer: `Priority order (high to low):
1. new binding: new Fn() → this = new object
2. Explicit: fn.call/apply/bind(obj) → this = obj
3. Implicit: obj.method() → this = obj
4. Default: standalone fn() → this = global (undefined in strict mode)

\`\`\`js
function sayName() { console.log(this.name); }

const user = { name: 'Rahul', sayName };
user.sayName();              // 'Rahul' (implicit)
sayName.call({ name: 'A' }); // 'A' (explicit)

// Common pitfall
const obj = {
  name: 'Test',
  getData() {
    setTimeout(function() {
      console.log(this.name); // undefined! default binding in callback
    }, 0);
    setTimeout(() => {
      console.log(this.name); // 'Test' — arrow lexical this
    }, 0);
  }
};
\`\`\``,
    tags: ['this', 'binding', 'call', 'apply', 'bind']
  },
  {
    id: 11, track: 'javascript', difficulty: 'intermediate', priority: 'important',
    question: 'Prototype chain explain karo. instanceof kaise kaam karta hai?',
    answer: `JavaScript prototype-based inheritance use karta hai. Har object ke paas [[Prototype]] link hoti hai.

\`\`\`js
const animal = { breathe() { return 'breathing'; } };
const dog = Object.create(animal); // animal is prototype
dog.bark = function() { return 'woof'; };

dog.bark();    // found on dog itself
dog.breathe(); // not on dog → check animal prototype → found!

// Property lookup: obj → obj.__proto__ → obj.__proto__.__proto__ → null

// instanceof
class Dog extends Animal {} // Dog.prototype's [[Prototype]] = Animal.prototype
const d = new Dog();
d instanceof Dog;    // true: d.__proto__ === Dog.prototype
d instanceof Animal; // true: d.__proto__.__proto__ === Animal.prototype
\`\`\``,
    tags: ['prototype', 'inheritance', 'oop']
  },
  {
    id: 12, track: 'javascript', difficulty: 'advanced', priority: 'important',
    question: 'Generator functions kya hain? Practical use case batao.',
    answer: `Generator = function jo pause/resume ho sakti hai via yield.

\`\`\`js
function* counter(start = 0) {
  while (true) {
    yield start++;    // pause here, return value
  }
}

const gen = counter(5);
gen.next(); // { value: 5, done: false }
gen.next(); // { value: 6, done: false }
gen.next(); // { value: 7, done: false }

// Practical: infinite sequence, lazy evaluation
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
Array.from({ length: 8 }, () => fib.next().value);
// [0, 1, 1, 2, 3, 5, 8, 13]

// Async generators for streaming
async function* streamChunks(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield new TextDecoder().decode(value);
  }
}
\`\`\``,
    tags: ['generators', 'iterators', 'advanced']
  },
  {
    id: 13, track: 'javascript', difficulty: 'advanced', priority: 'important',
    question: 'TypeScript: Generics explain karo with practical examples.',
    answer: `Generics = type parameters — functions/classes ko type-safe but flexible banate hain.

\`\`\`ts
// Without generics — lose type info
function identity(arg: any): any { return arg; }

// With generics — type preserved
function identity<T>(arg: T): T { return arg; }
const s = identity('hello'); // TypeScript knows: string
const n = identity(42);      // TypeScript knows: number

// Generic function
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: 'Rahul', age: 25 };
getProperty(user, 'name'); // string
getProperty(user, 'invalid'); // TypeScript Error!

// Utility types
type Partial<T> = { [K in keyof T]?: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Common pattern: API response wrapper
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
\`\`\``,
    tags: ['typescript', 'generics', 'types']
  },
  // ── React ────────────────────────────────────────────────────────────────────
  {
    id: 14, track: 'react', difficulty: 'beginner', priority: 'must-know',
    question: 'Virtual DOM kya hai? React reconciliation kaise kaam karta hai?',
    answer: `Virtual DOM = React ka in-memory lightweight representation of real DOM.

Process:
1. State change → React new VDOM tree banata hai
2. Diff algorithm compare karta hai old vs new VDOM
3. Sirf changed parts real DOM mein update hote hain (minimal writes)

\`\`\`
State Change
    ↓
New Virtual DOM
    ↓
Diff with Old VDOM (Reconciliation)
    ↓
Patch: Minimal Real DOM Updates
\`\`\`

Reconciliation rules:
- Different element type → destroy old, create new
- Same element type → update only changed attributes
- Lists: key prop se efficient matching

Misconception: VDOM always faster nahi — benefit hai developer experience aur predictability.`,
    tags: ['virtual-dom', 'reconciliation', 'react-internals']
  },
  {
    id: 15, track: 'react', difficulty: 'beginner', priority: 'must-know',
    question: 'useState hook — state directly mutate karna kyun wrong hai?',
    answer: `React state change detect karta hai only when setState with NEW reference call hoti hai.

\`\`\`jsx
// WRONG — direct mutation
const [user, setUser] = useState({ name: 'Rahul', age: 25 });
user.age = 26;       // Same object reference!
setUser(user);       // React: "same object, no re-render needed"
                     // Bug: UI won't update!

// CORRECT — new object
setUser({ ...user, age: 26 }); // new object reference → re-render

// Array mutation examples
const [items, setItems] = useState([1, 2, 3]);

// WRONG
items.push(4);       // mutates original
setItems(items);     // same ref, no re-render

// CORRECT
setItems([...items, 4]);         // add item
setItems(items.filter(i => i !== 2)); // remove item
setItems(items.map(i => i === 2 ? 20 : i)); // update item

// Functional update (for async/batched updates)
setCount(prev => prev + 1); // safe
\`\`\``,
    tags: ['useState', 'immutability', 'state']
  },
  {
    id: 16, track: 'react', difficulty: 'intermediate', priority: 'must-know',
    question: 'useEffect dependency array ke 3 forms aur cleanup function.',
    answer: `\`\`\`jsx
// 1. No array — EVERY render ke baad
useEffect(() => { console.log('every render'); });

// 2. Empty [] — ONCE (on mount only)
useEffect(() => {
  fetchData(); // componentDidMount
  return () => cleanup(); // componentWillUnmount
}, []);

// 3. With deps — when dep changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Cleanup — memory leaks se bachao!
useEffect(() => {
  const handler = (e) => setScrollY(e.target.scrollY);
  window.addEventListener('scroll', handler);

  return () => {
    window.removeEventListener('scroll', handler); // cleanup!
  };
}, []);

// Common bug: object as dep → infinite loop
const [data, setData] = useState({ id: 1 });
useEffect(() => {
  fetch(data); // runs every render!
}, [data]); // new object reference every render!

// Fix: use primitive
useEffect(() => {
  fetch(data.id);
}, [data.id]); // stable primitive
\`\`\``,
    tags: ['useEffect', 'lifecycle', 'cleanup', 'deps']
  },
  {
    id: 17, track: 'react', difficulty: 'intermediate', priority: 'must-know',
    question: 'Props vs State — kab kaunsa? Lifting state up kab karein?',
    answer: `Props = parent se child data. State = component ka own internal data.

\`\`\`jsx
// Props: readonly, parent owns
function UserCard({ name, email }) { // receive from parent
  return <div>{name}</div>;
}

// State: mutable, component owns
function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// Lifting state up: multiple components share same data
// WRONG: each has own state — out of sync
function App() {
  return (
    <>
      <Input />   {/* has own 'value' state */}
      <Preview /> {/* different 'value' state */}
    </>
  );
}

// CORRECT: lift to common ancestor
function App() {
  const [value, setValue] = useState(''); // shared state
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  );
}
\`\`\``,
    tags: ['props', 'state', 'lifting-state', 'data-flow']
  },
  {
    id: 18, track: 'react', difficulty: 'intermediate', priority: 'must-know',
    question: 'React mein unnecessary re-renders kaise rokein?',
    answer: `Re-render triggers: state change, parent re-render, context change.

\`\`\`jsx
// Problem: parent re-render = all children re-render
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <HeavyComponent /> {/* re-renders every time! */}
    </>
  );
}

// Fix 1: React.memo — skip if props unchanged
const HeavyComponent = React.memo(function Heavy({ data }) {
  return <div>{/* expensive */}</div>;
});

// Fix 2: useMemo — expensive computed values
const sorted = useMemo(() =>
  largeArray.sort((a, b) => a - b), [largeArray]
);

// Fix 3: useCallback — stable function refs for memo'd children
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // stable reference

// Fix 4: State colocation — move state close to where it's used
\`\`\`

Profiler se pehle measure karo — premature optimization avoid karo.`,
    tags: ['performance', 'react-memo', 'useMemo', 're-renders']
  },
  {
    id: 19, track: 'react', difficulty: 'intermediate', priority: 'must-know',
    question: 'useRef ke 3 use cases kya hain?',
    answer: `useRef = mutable container jo re-render trigger nahi karta.

\`\`\`jsx
// 1. DOM access — focus, scroll, measure
function AutoFocus() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus(); // direct DOM access
  }, []);
  return <input ref={inputRef} />;
}

// 2. Mutable value — re-render nahi chahiye
function Timer() {
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);
  };
  const stop = () => clearInterval(intervalRef.current);

  return <div><button onClick={start}>Start</button><button onClick={stop}>Stop</button></div>;
}

// 3. Previous value tracking
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; }); // runs after render
  return ref.current; // returns previous render's value
}

// Key diff: useState re-render triggers, useRef doesn't
\`\`\``,
    tags: ['useRef', 'dom', 'hooks']
  },
  {
    id: 20, track: 'react', difficulty: 'advanced', priority: 'important',
    question: 'Context API vs Zustand vs Redux — kab kaunsa?',
    answer: `\`\`\`
Context API:
✅ Simple global state (theme, auth, language)
✅ No extra dependency
❌ Performance issues with frequent updates (all consumers re-render)
❌ No devtools, no middleware

Zustand:
✅ Simple API, minimal boilerplate
✅ Selective re-renders (subscribe to specific state slices)
✅ Middleware support (persist, devtools, immer)
✅ Small bundle size
❌ Not as structured as Redux for large teams

Redux Toolkit:
✅ Predictable, structured
✅ Excellent devtools (time travel)
✅ Middleware ecosystem
✅ Best for large teams/apps
❌ More boilerplate
❌ Learning curve
\`\`\`

\`\`\`js
// Zustand — simplest
const useStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

const user = useStore(state => state.user); // selective subscribe
\`\`\`

Rule: Context for simple/slow-changing state. Zustand for medium apps. Redux for large team apps.`,
    tags: ['state-management', 'context', 'zustand', 'redux']
  },
  // ── Node.js ──────────────────────────────────────────────────────────────────
  {
    id: 21, track: 'nodejs', difficulty: 'beginner', priority: 'must-know',
    question: 'Node.js single-threaded hai phir concurrent requests kaise handle karta hai?',
    answer: `Single thread = JS execution thread. Concurrency async I/O + event loop se aati hai.

\`\`\`
Request 1 → Event Loop ne receive kiya
DB Query start → libuv background mein (non-blocking!)
Request 2 → Event Loop free tha, receive kiya
Request 3 → same
DB Result 1 → callback queue → event loop process kiya
\`\`\`

Analogy: Waiter (event loop) 100 tables serve karta hai — order leta hai, kitchen (I/O) ko deta hai, dusre tables serve karta hai. Kitchen ka wait nahi karta.

\`\`\`js
// Non-blocking — event loop free rehta hai doosre requests ke liye
app.get('/users', async (req, res) => {
  const users = await db.find({}); // libuv handles I/O
  res.json(users);
  // Jab DB query chal rahi hai: 100+ aur requests simultaneously handle hote hain!
});
\`\`\`

BUT: CPU-heavy sync code (heavy loops, large JSON.parse) BLOCKS thread. Solution: Worker Threads.`,
    tags: ['event-loop', 'concurrency', 'non-blocking', 'libuv']
  },
  {
    id: 22, track: 'nodejs', difficulty: 'beginner', priority: 'must-know',
    question: 'CommonJS vs ES Modules — key differences aur kab kaunsa?',
    answer: `\`\`\`js
// CommonJS (Node.js default, .js files without "type": "module")
const express = require('express');
module.exports = { myFn };
exports.helper = function() {};

// ES Modules (.mjs ya "type":"module" in package.json)
import express from 'express';
export function myFn() {}
export default class MyClass {}
\`\`\`

Key differences:
| Feature | CJS | ESM |
|---------|-----|-----|
| Loading | Synchronous | Async |
| Tree-shaking | No | Yes |
| __dirname | Available | Not available (use import.meta.url) |
| Top-level await | No | Yes |
| Browser native | No | Yes |

When to use: New projects → ESM. Legacy → CJS. Full-stack shared code → ESM.

\`\`\`json
// package.json
{ "type": "module" }  // .js = ESM
// No "type" field → .js = CJS (default)
\`\`\``,
    tags: ['modules', 'commonjs', 'esm', 'import']
  },
  {
    id: 23, track: 'nodejs', difficulty: 'intermediate', priority: 'must-know',
    question: 'Express middleware chain — next() kab aur kaise call karein?',
    answer: `Middleware = function(req, res, next). Request enter → chain se guzarta hai → response.

\`\`\`js
// Basic middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // ZAROOR call karo, warna request hang
});

// Middleware order matters!
app.use(helmet());       // 1st: security headers
app.use(cors());         // 2nd: CORS
app.use(express.json()); // 3rd: parse body
app.use(authMiddleware); // 4th: auth check
app.get('/data', handler); // 5th: route

// Error middleware — 4 params (MUST be 4)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

// Skip to error handler
function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return next(new Error('Unauthorized')); // pass error
  }
  next(); // continue normal flow
}
\`\`\``,
    tags: ['express', 'middleware', 'error-handling']
  },
  {
    id: 24, track: 'nodejs', difficulty: 'intermediate', priority: 'must-know',
    question: 'JWT authentication — access + refresh token pattern implement karo.',
    answer: `\`\`\`js
// Sign tokens
const access = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '15m' } // short-lived!
);
const refresh = jwt.sign(
  { userId: user.id },
  process.env.REFRESH_SECRET,
  { expiresIn: '7d' }
);

// Auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return res.status(401).json({ error: 'TOKEN_EXPIRED' });
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Refresh endpoint
app.post('/auth/refresh', (req, res) => {
  const decoded = jwt.verify(req.body.refreshToken, process.env.REFRESH_SECRET);
  const newAccess = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ accessToken: newAccess });
});
\`\`\``,
    tags: ['jwt', 'auth', 'tokens', 'security']
  },
  {
    id: 25, track: 'nodejs', difficulty: 'intermediate', priority: 'must-know',
    question: 'N+1 problem kya hai? Kaise detect aur fix karein?',
    answer: `N+1 = 1 query for list + 1 query per item = N+1 total queries. Silent performance killer.

\`\`\`js
// PROBLEM: 101 queries for 100 posts
const posts = await Post.find({});      // Query 1
for (const post of posts) {
  post.author = await User.findById(post.authorId); // 100 queries!
}

// FIX 1: Mongoose populate (2 queries)
const posts = await Post.find({}).populate('author');

// FIX 2: SQL JOIN (1 query)
const posts = await db.query(\`
  SELECT posts.*, users.name, users.email
  FROM posts JOIN users ON posts.author_id = users.id
\`);

// FIX 3: Manual batching
const posts = await Post.find({});
const authorIds = [...new Set(posts.map(p => p.authorId))];
const authors = await User.find({ _id: { \$in: authorIds } });
const authorMap = Object.fromEntries(authors.map(a => [a.id, a]));
posts.forEach(p => p.author = authorMap[p.authorId]);
\`\`\`

Detect: Enable query logging → mongoose.set('debug', true)`,
    tags: ['database', 'n+1', 'performance', 'sql']
  },
  {
    id: 26, track: 'nodejs', difficulty: 'intermediate', priority: 'important',
    question: 'Node.js streams kya hain? Backpressure kaise handle karein?',
    answer: `Streams = chunked data processing — puri file memory mein load karne ki zaroorat nahi.

\`\`\`js
// WITHOUT streams: 10GB file = 10GB RAM usage
const data = fs.readFileSync('huge.file'); // BOOM

// WITH streams: constant memory
const readable = fs.createReadStream('huge.file');
const writable = fs.createWriteStream('output.file');

// pipe() automatically handles backpressure!
readable.pipe(writable);

// Transform stream (process while streaming)
const { Transform } = require('stream');
const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

fs.createReadStream('input.txt')
  .pipe(uppercase)    // transform
  .pipe(fs.createWriteStream('output.txt')); // write

// Backpressure: consumer slow? producer pause!
// pipe() handles this automatically
// Manual: check write() return value
const ok = writable.write(chunk);
if (!ok) readable.pause(); // backpressure!
writable.once('drain', () => readable.resume());
\`\`\``,
    tags: ['streams', 'backpressure', 'memory', 'performance']
  },
  {
    id: 27, track: 'nodejs', difficulty: 'advanced', priority: 'important',
    question: 'Worker Threads vs Cluster — kab kaunsa use karein?',
    answer: `\`\`\`
Cluster:
- Multiple Node processes
- Each has own memory (no sharing)
- Best for: HTTP servers (distribute connections)
- IPC: slower (serialization needed)

Worker Threads:
- Threads within same process
- SharedArrayBuffer possible
- Best for: CPU-heavy tasks (image processing, crypto, ML)
- Transfer: ArrayBuffer without copy (fast)
\`\`\`

\`\`\`js
// Cluster — distribute HTTP load across CPU cores
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
} else {
  app.listen(3000); // each worker handles connections
}

// Worker Thread — CPU-heavy task off main thread
const { Worker } = require('worker_threads');

function runHeavyTask(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-task.js', { workerData: data });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

app.get('/compute', async (req, res) => {
  const result = await runHeavyTask(req.body); // doesn't block event loop!
  res.json(result);
});
\`\`\``,
    tags: ['cluster', 'worker-threads', 'scaling', 'cpu']
  },
  // ── GenAI ────────────────────────────────────────────────────────────────────
  {
    id: 28, track: 'genai', difficulty: 'beginner', priority: 'must-know',
    question: 'LLM kya hai? Kaise "generate" karta hai text?',
    answer: `LLM = Large Language Model. Massive text data pe trained neural network jo next token predict karta hai.

\`\`\`
Input: "Node.js ek"
Token probabilities (simplified):
  "JavaScript" → 35%
  "runtime"    → 28%
  "framework"  → 20%
  "server"     → 17%

With temperature=0.7 → sample from top tokens → "runtime"
Next token prediction from "Node.js ek runtime":
  "environment" → 40%, "hai" → 30%, "for" → 30%
Continues until max_tokens or stop sequence.
\`\`\`

Key insight: LLM "predict" karta hai, "think" nahi karta. Sophisticated statistical pattern matching hai. Isliye hallucinations possible hain — confident wrong answers.

Temperature:
- 0.0 → deterministic (same answer always) — code generation ke liye
- 0.7 → creative variety — writing ke liye
- 1.0+ → highly random`,
    tags: ['llm', 'tokens', 'temperature', 'ai-basics']
  },
  {
    id: 29, track: 'genai', difficulty: 'beginner', priority: 'must-know',
    question: 'RAG (Retrieval Augmented Generation) kya hai? Kab use karein?',
    answer: `RAG = LLM ko query time pe relevant documents se augment karna.

When to use RAG:
- Company-specific knowledge (internal docs, products)
- Real-time/recent data (news, prices)
- Large document corpus (legal, technical)
- When fine-tuning too expensive/slow

\`\`\`
Index Phase:
Documents → Split into chunks → Embed → Store in Vector DB

Query Phase:
User Question → Embed → Similarity Search → Top K chunks
                                              ↓
                              LLM (question + chunks) → Answer
\`\`\`

\`\`\`js
async function ragQuery(question) {
  // 1. Embed question
  const qVector = await embed(question);

  // 2. Find similar chunks
  const chunks = await vectorDB.search(qVector, { topK: 5 });

  // 3. Augmented prompt
  const context = chunks.map(c => c.text).join('\\n\\n');
  const prompt = \`Context:\\n\${context}\\n\\nQuestion: \${question}\`;

  // 4. Generate with context
  return await llm.generate(prompt);
}
\`\`\``,
    tags: ['rag', 'vector-db', 'embeddings', 'retrieval']
  },
  {
    id: 30, track: 'genai', difficulty: 'beginner', priority: 'must-know',
    question: 'Prompt engineering ke top 5 techniques.',
    answer: `\`\`\`
1. BE SPECIFIC — vague prompts → vague answers
❌ "Code improve karo"
✅ "Review this Express handler for: (1) SQL injection, (2) missing auth.
    Return JSON: [{ severity, issue, fix }]"

2. ROLE + CONTEXT
"You are a senior Node.js security engineer. Review for OWASP Top 10..."

3. FEW-SHOT EXAMPLES
"Examples:
Input: user_id=1 → Output: { valid: true }
Input: user_id=abc → Output: { valid: false, error: 'not a number' }
Now process: user_id=99"

4. CHAIN-OF-THOUGHT
"Think step by step:" — dramatically improves reasoning
"Let's work through this systematically:"

5. CONSTRAIN OUTPUT FORMAT
"Respond ONLY with valid JSON. No explanation:
{ 'status': 'pass'|'fail', 'score': 0-100, 'issues': [...] }"
\`\`\`

Template: Role + Context + Task + Output Format + Constraints = Best results`,
    tags: ['prompt-engineering', 'few-shot', 'chain-of-thought']
  },
  {
    id: 31, track: 'genai', difficulty: 'intermediate', priority: 'must-know',
    question: 'Claude API — streaming response kaise implement karein?',
    answer: `\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Method 1: Stream events
const stream = client.messages.stream({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Explain Node.js event loop' }],
});

for await (const event of stream) {
  if (event.type === 'content_block_delta')
    process.stdout.write(event.delta.text ?? '');
}

const final = await stream.finalMessage();
console.log('Usage:', final.usage);

// Method 2: Vercel AI SDK (Next.js)
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: 'You are a helpful Node.js tutor.',
    messages,
  });
  return result.toDataStreamResponse();
}
\`\`\`

Why streaming: first token 200-400ms mein. Without: 3-5 second blank screen.`,
    tags: ['claude-api', 'streaming', 'anthropic']
  },
  {
    id: 32, track: 'genai', difficulty: 'intermediate', priority: 'important',
    question: 'Fine-tuning vs RAG vs Prompt Engineering — kab kaunsa?',
    answer: `\`\`\`
Prompt Engineering:
✅ Fast iteration (minutes)
✅ No cost, no training
✅ Works for most cases
❌ Limited by context window
❌ Inconsistent for very specific formats
When: Default first choice. Always try this first.

RAG:
✅ Up-to-date knowledge
✅ Source citations
✅ Large knowledge bases
✅ No model retraining
❌ Retrieval quality matters
❌ Added latency
When: Company docs, real-time data, large corpora

Fine-tuning:
✅ Consistent output format
✅ Domain-specific style
✅ Reduce prompt length (bake instructions in)
❌ Expensive (time + money)
❌ Knowledge cutoff
❌ Can forget other capabilities
When: Very specific format/style needed, high volume (amortize cost)
\`\`\`

Decision tree: Prompt first → RAG if knowledge needed → Fine-tune if format/style consistency required at scale.`,
    tags: ['fine-tuning', 'rag', 'prompt-engineering', 'decision']
  },
  // ── Coding Challenges ────────────────────────────────────────────────────────
  {
    id: 33, track: 'coding', difficulty: 'intermediate', priority: 'must-know',
    question: 'Implement Promise.all from scratch.',
    answer: `\`\`\`js
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);

    const results = new Array(promises.length);
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // handle non-Promise values
        .then(value => {
          results[index] = value;
          if (++completed === promises.length) resolve(results);
        })
        .catch(reject); // any rejection → reject immediately
    });
  });
}

// Test
const p1 = Promise.resolve(1);
const p2 = new Promise(res => setTimeout(() => res(2), 100));
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]

// Reject case
myPromiseAll([p1, Promise.reject('err'), p3])
  .catch(console.log); // 'err'
\`\`\``,
    tags: ['promises', 'implementation', 'async', 'interview']
  },
  {
    id: 34, track: 'coding', difficulty: 'intermediate', priority: 'must-know',
    question: 'Deep clone implement karo (without JSON.parse/stringify).',
    answer: `\`\`\`js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj);
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  if (obj instanceof Map)
    return new Map([...obj].map(([k, v]) => [deepClone(k), deepClone(v)]));
  if (obj instanceof Set)
    return new Set([...obj].map(v => deepClone(v)));

  const clone = Object.create(Object.getPrototypeOf(obj));
  for (const key of Object.keys(obj))
    clone[key] = deepClone(obj[key]);
  return clone;
}

// Production code: use structuredClone (Node 17+)
const clone = structuredClone(original);
// Handles: Date, Map, Set, RegExp, ArrayBuffer, circular references!
// Does NOT handle: functions, class instances with methods
\`\`\``,
    tags: ['deep-clone', 'objects', 'recursion']
  },
  {
    id: 35, track: 'coding', difficulty: 'intermediate', priority: 'must-know',
    question: 'LRU Cache implement karo.',
    answer: `LRU = Least Recently Used. Capacity bharne par oldest/least-used item remove karo.

\`\`\`js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // insertion order preserve karta hai
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      // Remove LRU: first inserted (Map iteration order)
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

// Test
const lru = new LRUCache(2);
lru.put(1, 1); lru.put(2, 2);
lru.get(1);    // 1, now [2,1] in order
lru.put(3, 3); // evicts 2, [1,3]
lru.get(2);    // -1 (evicted)
\`\`\``,
    tags: ['data-structures', 'lru', 'map', 'cache']
  },
  {
    id: 36, track: 'coding', difficulty: 'intermediate', priority: 'must-know',
    question: 'Two Sum — O(n) solution implement karo.',
    answer: `\`\`\`js
// O(n) — HashMap approach
function twoSum(nums, target) {
  const seen = new Map(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}

// Test
twoSum([2, 7, 11, 15], 9);  // [0, 1]  (2+7=9)
twoSum([3, 2, 4], 6);        // [1, 2]  (2+4=6)
twoSum([3, 3], 6);            // [0, 1]

// Key insight:
// Brute force O(n²): har pair check karo
// HashMap O(n): har num ke liye check karo "target - num pehle aaya tha?"
// Ek pass mein dono kaam — search + insert
\`\`\``,
    tags: ['arrays', 'hashmap', 'algorithm', 'interview']
  },
  {
    id: 37, track: 'coding', difficulty: 'intermediate', priority: 'important',
    question: 'EventEmitter class implement karo from scratch.',
    answer: `\`\`\`js
class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(event, listener) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(listener);
    return this; // chaining
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, wrapper); // self-remove
    };
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    if (!this._events[event]) return false;
    this._events[event].forEach(fn => fn.apply(this, args));
    return true;
  }

  off(event, listener) {
    if (!this._events[event]) return this;
    this._events[event] = this._events[event].filter(fn => fn !== listener);
    return this;
  }

  removeAllListeners(event) {
    if (event) delete this._events[event];
    else this._events = {};
    return this;
  }
}

// Test
const emitter = new EventEmitter();
emitter.on('data', (msg) => console.log('got:', msg));
emitter.once('connect', () => console.log('connected!'));
emitter.emit('data', 'hello'); // got: hello
emitter.emit('connect');       // connected!
emitter.emit('connect');       // nothing (once removed itself)
\`\`\``,
    tags: ['events', 'pub-sub', 'implementation', 'design-patterns']
  },
  {
    id: 38, track: 'coding', difficulty: 'intermediate', priority: 'important',
    question: 'Memoize function implement karo.',
    answer: `\`\`\`js
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args); // simple key (careful with objects)

    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveCalc = (n) => {
  console.log('Computing...');
  return n * n;
};

const memoized = memoize(expensiveCalc);
memoized(5);  // Computing... 25
memoized(5);  // Cache hit! 25 (no computation!)
memoized(6);  // Computing... 36

// With WeakMap for object args (prevents memory leaks)
function memoizeWithLimit(fn, maxSize = 100) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    if (cache.size >= maxSize) cache.delete(cache.keys().next().value); // LRU evict
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
\`\`\``,
    tags: ['memoization', 'optimization', 'closures', 'cache']
  },
  {
    id: 39, track: 'coding', difficulty: 'intermediate', priority: 'important',
    question: 'Flatten nested array implement karo (multiple approaches).',
    answer: `\`\`\`js
// 1. Recursive with reduce
function flatten(arr) {
  return arr.reduce((flat, item) =>
    Array.isArray(item) ? flat.concat(flatten(item)) : flat.concat(item),
  []);
}

// 2. Iterative with stack (avoids stack overflow for deep nesting)
function flattenIterative(arr) {
  const result = [];
  const stack = [...arr];
  while (stack.length) {
    const item = stack.shift();
    Array.isArray(item) ? stack.unshift(...item) : result.push(item);
  }
  return result;
}

// 3. With depth control
function flattenDepth(arr, depth = Infinity) {
  return arr.reduce((flat, item) =>
    (Array.isArray(item) && depth > 0)
      ? flat.concat(flattenDepth(item, depth - 1))
      : flat.concat(item),
  []);
}

// 4. Native (production code — know implementation for interviews)
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// Tests
flatten([1, [2, [3, [4]], 5]]); // [1, 2, 3, 4, 5]
flattenDepth([1, [2, [3]]], 1); // [1, 2, [3]]
\`\`\``,
    tags: ['arrays', 'recursion', 'flatten', 'algorithm']
  },
  {
    id: 40, track: 'coding', difficulty: 'advanced', priority: 'important',
    question: 'Async queue with concurrency limit implement karo.',
    answer: `\`\`\`js
class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }

  run() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;

      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this.run(); // process next
        });
    }
  }
}

// Usage
const queue = new AsyncQueue(3); // max 3 concurrent

const tasks = Array.from({ length: 10 }, (_, i) =>
  () => new Promise(res => setTimeout(() => {
    console.log(\`Task \${i} done\`);
    res(i);
  }, Math.random() * 1000))
);

// Runs 3 at a time, queues the rest
Promise.all(tasks.map(t => queue.add(t)));
\`\`\``,
    tags: ['async', 'concurrency', 'queue', 'advanced']
  },

  // ── TypeScript ─────────────────────────────────────────────────────────────
  {
    id: 41, track: 'typescript' as Track, difficulty: 'beginner', priority: 'must-know',
    question: 'type alias aur interface mein kya fark hai? Kab kya use karo?',
    answer: `Dono object shapes define karte hain — lekin key differences hain:

\`\`\`ts
// interface: extends, declaration merging, implements
interface User { id: number; name: string }
interface Admin extends User { role: 'admin' }

// type: unions, tuples, mapped types, primitives
type ID = string | number
type Coords = [number, number]
type Readonly<T> = { readonly [K in keyof T]: T[K] }

// Declaration merging — sirf interface mein
interface Window { myApp: App }  // extend existing type
interface Window { analytics: Analytics }  // auto-merged!

// Rule of thumb:
// Object shapes → interface (extends, implements)
// Unions/tuples/complex types → type alias
\`\`\`

**Practical rule:** Object shapes ke liye interface prefer karo (declaration merging ka fayda milta hai library types extend karte waqt). Complex/computed types ke liye type.`,
    tags: ['typescript', 'interface', 'type-alias']
  },
  {
    id: 42, track: 'typescript' as Track, difficulty: 'beginner', priority: 'must-know',
    question: 'any vs unknown vs never — teeno mein kya fark hai?',
    answer: `Teeno alag situations ke liye hain:

\`\`\`ts
// any: type checking OFF — escape hatch (avoid!)
const x: any = 'hello'
x.toUpperCase()  // No error — dangerous
x.nonexistent()  // Also no error — TypeScript asleep hai

// unknown: type-safe any — check karo pehle
const y: unknown = 'hello'
// y.toUpperCase()  ❌ Error — narrow karo pehle
if (typeof y === 'string') y.toUpperCase()  // ✅

// never: value kabhi exist nahi karega
// Exhaustive checks ke liye:
function assertNever(x: never): never {
  throw new Error('Unexpected: ' + x)
}
type Shape = 'circle' | 'rect'
function area(s: Shape) {
  if (s === 'circle') return 1
  if (s === 'rect') return 2
  return assertNever(s)  // compile error if Shape extended
}
\`\`\`

**Rule:** never use any. unknown use karo external data ke liye (JSON.parse, API responses). never use karo exhaustive type checks ke liye.`,
    tags: ['typescript', 'any', 'unknown', 'never']
  },
  {
    id: 43, track: 'typescript' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'TypeScript Generics kya hain? Real-world example do.',
    answer: `Generic ek type parameter hai — function/class ko kisi bhi type ke saath type-safe banata hai bina any ke.

\`\`\`ts
// Without generics — any use karna padega (unsafe)
function first(arr: any[]): any { return arr[0] }

// With generics — type preserved!
function first<T>(arr: T[]): T { return arr[0] }
const n = first([1, 2, 3])    // n: number ✅
const s = first(['a', 'b'])   // s: string ✅

// Generic constraint
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length  // TS knows .length exists
}

// Real-world: API response wrapper
interface ApiResponse<T> {
  data: T
  status: number
  error: string | null
}

async function fetchUser(): Promise<ApiResponse<User>> {
  const res = await fetch('/api/user')
  return res.json()
}
// response.data is User — fully typed!

// Built-in generics you use daily:
// Array<T>, Promise<T>, useState<T>(), Record<K,V>
\`\`\``,
    tags: ['typescript', 'generics', 'types']
  },
  {
    id: 44, track: 'typescript' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'Type narrowing aur type guards kaise kaam karte hain?',
    answer: `Type narrowing = TypeScript ko prove karo ki value ek specific type hai — phir woh type ke operations allow karta hai.

\`\`\`ts
// typeof narrowing
function process(input: string | number) {
  if (typeof input === 'string') {
    return input.toUpperCase()  // string operations OK
  }
  return input.toFixed(2)  // number operations OK
}

// instanceof narrowing
function handle(err: Error | string) {
  if (err instanceof Error) {
    console.log(err.message)  // Error properties available
  }
}

// Custom type predicate — "x is SomeType"
interface Cat { meow(): void }
interface Dog { bark(): void }

function isCat(pet: Cat | Dog): pet is Cat {
  return 'meow' in pet
}

const pet: Cat | Dog = getCat()
if (isCat(pet)) {
  pet.meow()  // TypeScript knows it's Cat here
}

// Discriminated union — cleanest pattern
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; w: number; h: number }

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2
    case 'rect': return s.w * s.h  // TypeScript auto-narrows
  }
}
\`\`\``,
    tags: ['typescript', 'type-guards', 'narrowing', 'discriminated-unions']
  },
  {
    id: 45, track: 'typescript' as Track, difficulty: 'intermediate', priority: 'important',
    question: 'Built-in Utility Types kaunse hain? Top 6 explain karo.',
    answer: `TypeScript mein common type transformations ke liye built-in utility types hain:

\`\`\`ts
interface User {
  id: number; name: string; email: string; password: string; role: 'admin' | 'user'
}

// Partial<T> — saari properties optional
type UpdateUserDto = Partial<Omit<User, 'id'>>
// { name?: string; email?: string; password?: string; role?: ... }

// Pick<T, K> — sirf kuch properties lo
type UserPreview = Pick<User, 'id' | 'name'>

// Omit<T, K> — kuch properties hata do (API response)
type PublicUser = Omit<User, 'password'>

// Required<T> — saari properties required (validate karo)
type RequiredConfig = Required<Partial<Config>>

// Record<K, V> — key-value map
type UserCache = Record<string, User>
const cache: UserCache = {}

// ReturnType<T> — function return type derive karo
async function getUser(id: number): Promise<User> { ... }
type GetUserReturn = Awaited<ReturnType<typeof getUser>>  // User

// Real composition:
type CreateUserDto = Omit<User, 'id'>  // no id needed
type UpdateUserDto = Partial<CreateUserDto>  // all optional
type UserResponse = Omit<User, 'password'>  // safe to send
\`\`\``,
    tags: ['typescript', 'utility-types', 'Partial', 'Omit', 'Pick']
  },
  {
    id: 46, track: 'typescript' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'TypeScript ke saath Express API kaise type karte hain?',
    answer: `Express request/response generic parameters se type kar sakte ho — wrong body structure compile time pe pakad jaata hai.

\`\`\`ts
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

// Request<Params, ResponseBody, RequestBody, QueryParams>
interface CreateUserBody { name: string; email: string }
interface UserParams { id: string }

// Typed route handler
app.post('/users',
  async (req: Request<{}, {}, CreateUserBody>, res: Response) => {
    const { name, email } = req.body  // fully typed!
    const user = await userService.create({ name, email })
    res.status(201).json(user)
  }
)

// Zod + TypeScript — BEST approach (runtime + compile-time)
const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})
type CreateUserDto = z.infer<typeof CreateUserSchema>  // derive type!

function validate<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) return res.status(400).json(result.error.flatten())
    req.body = result.data
    next()
  }
}

app.post('/users', validate(CreateUserSchema), handler)
\`\`\``,
    tags: ['typescript', 'express', 'zod', 'validation']
  },
  {
    id: 47, track: 'typescript' as Track, difficulty: 'advanced', priority: 'important',
    question: 'Conditional types aur mapped types kya hain?',
    answer: `Advanced TypeScript — type level programming ke liye.

\`\`\`ts
// Conditional type: T extends U ? X : Y
type IsArray<T> = T extends any[] ? true : false
type A = IsArray<string[]>  // true
type B = IsArray<number>    // false

// infer — conditional type ke andar type extract karo
type Unwrap<T> = T extends Promise<infer U> ? U : T
type C = Unwrap<Promise<string>>  // string
type D = Unwrap<number>           // number (unchanged)

// NonNullable — built-in conditional type
type NonNullable<T> = T extends null | undefined ? never : T

// Mapped type: object ke har property ko transform karo
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type Optional<T> = { [K in keyof T]?: T[K] }
type Nullable<T> = { [K in keyof T]: T[K] | null }

// Practical: API response builder
type ApiResponse<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K]
}  // Dates ko strings mein convert (JSON serialization ke liye)

// Template literal types (TypeScript 4.1+)
type EventName = \`on\${Capitalize<string>}\`
// 'onClick', 'onChange' etc. — 'click' nahi!
\`\`\``,
    tags: ['typescript', 'conditional-types', 'mapped-types', 'advanced']
  },
  {
    id: 48, track: 'typescript' as Track, difficulty: 'advanced', priority: 'good-to-know',
    question: 'satisfies operator aur branded types kab use karte hain?',
    answer: `Dono TypeScript 4.9+ ke powerful patterns hain.

\`\`\`ts
// satisfies: type check + narrow type preserve
type Config = { theme: 'light' | 'dark'; lang: string }

const config = {
  theme: 'dark',
  lang: 'en'
} satisfies Config

config.theme  // type: 'dark' (narrow!) — not 'light' | 'dark'
// as Config se theme type wide ho jaata — satisfies zyada precise hai

// Branded types: structurally same types mix nahi ho sakti
type Brand<T, B> = T & { readonly _brand: B }
type UserId = Brand<string, 'UserId'>
type ProductId = Brand<string, 'ProductId'>

function getUser(id: UserId): User { ... }
function deleteProduct(id: ProductId): void { ... }

const uid = 'user_1' as UserId
const pid = 'prod_1' as ProductId

getUser(uid)      // ✅
// getUser(pid)   // ❌ TypeScript error — ProductId ≠ UserId
// deleteProduct('prod_1')  // ❌ plain string nahi chalta

// Real use case: form field IDs, order IDs, user IDs
// Accidentally mixing IDs → production data corruption
// Branded types compile time pe prevent karte hain
\`\`\``,
    tags: ['typescript', 'satisfies', 'branded-types', 'advanced']
  },

  // ── Databases ──────────────────────────────────────────────────────────────
  {
    id: 49, track: 'databases' as Track, difficulty: 'beginner', priority: 'must-know',
    question: 'SQL vs NoSQL — kab kaunsa choose karo? 2025 mein practical answer.',
    answer: `Sab cases mein PostgreSQL se shuru karo — genuinely NoSQL chahiye tabhi switch karo.

\`\`\`
SQL (PostgreSQL): Use when —
✅ Structured, relational data (users → orders → products)
✅ ACID transactions zaroori (banking, e-commerce, billing)
✅ Complex queries, joins, aggregations
✅ Strong consistency required
✅ Default choice for most web apps

NoSQL — specific use cases:
📦 MongoDB: Flexible/variable schema (product catalogs, CMS)
⚡ Redis: Caching, sessions, real-time counters, queues
📊 Cassandra/DynamoDB: Massive write throughput (IoT, logs)
🔍 Elasticsearch: Full-text search, log analytics

2025 reality:
- PostgreSQL has JSONB columns → flexible schema
- PostgreSQL has full-text search → Elastic sometimes not needed
- Single Postgres instance handles millions of users easily
- Start with Postgres, add Redis for caching when needed
- MongoDB rarely justified unless specific flexible-schema need
\`\`\``,
    tags: ['databases', 'sql', 'nosql', 'postgresql', 'mongodb']
  },
  {
    id: 50, track: 'databases' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'Database index kya hai? B-tree vs Hash. Kab use karo?',
    answer: `Index ek data structure hai jo queries fast karta hai — full table scan ki jagah direct jump.

\`\`\`sql
-- Without index: 1M rows scan karo
SELECT * FROM users WHERE email = 'test@example.com'  -- 500ms

-- With index: directly jump karo
CREATE INDEX idx_users_email ON users(email)
SELECT * FROM users WHERE email = 'test@example.com'  -- 1ms

-- Index types:
-- B-tree (default): sorted tree — range queries, equality, ORDER BY
-- Best for: =, <, >, BETWEEN, LIKE 'prefix%', ORDER BY
CREATE INDEX idx_age ON users(age)  -- B-tree

-- Hash: exact equality only — slightly faster for =
-- Best for: = only (no range queries!)
CREATE INDEX idx_email_hash ON users USING HASH (email)

-- Composite index (column order matters!):
CREATE INDEX idx_user_status ON orders(user_id, status)
-- Can use for: WHERE user_id = ?
-- Can use for: WHERE user_id = ? AND status = ?
-- CANNOT use for: WHERE status = ? (leading column missing!)

-- Index cost: slows down writes (INSERT/UPDATE/DELETE)
-- Add indexes on: WHERE columns, JOIN keys, ORDER BY columns
-- Avoid: low-cardinality columns (gender: M/F — useless index)
\`\`\``,
    tags: ['databases', 'indexes', 'btree', 'performance']
  },
  {
    id: 51, track: 'databases' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'N+1 problem kya hai? Kaise detect aur fix karo?',
    answer: `N+1 = 1 query for list + N queries for each item's related data. Silent performance killer.

\`\`\`js
// ❌ N+1 problem — 1 + N queries
const posts = await Post.findAll()  // 1 query: 100 posts
for (const post of posts) {
  post.author = await User.findById(post.authorId)  // 100 queries!
}
// Total: 101 queries — disaster on production!

// ✅ Fix 1: JOIN (SQL)
const posts = await Post.findAll({
  include: [{ model: User, as: 'author' }]  // 1 JOIN query
})

// ✅ Fix 2: DataLoader (batching) — for GraphQL especially
const userLoader = new DataLoader(async (ids) => {
  const users = await User.findAll({ where: { id: ids } })
  return ids.map(id => users.find(u => u.id === id))
})
// All authorIds batched into 1 query: WHERE id IN (1,2,3...)

// ✅ Fix 3: Prisma mein include
const posts = await prisma.post.findMany({
  include: { author: { select: { name: true, email: true } } }
})

// Detect N+1: npm install sequelize-logger / prisma.$on('query')
// Count queries per request — more than 5 = investigate
\`\`\``,
    tags: ['databases', 'n+1', 'orm', 'performance', 'optimization']
  },
  {
    id: 52, track: 'databases' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'Database transactions aur ACID properties explain karo.',
    answer: `Transaction = ek ya zyada operations jo sab succeed karein ya sab fail — no partial state.

\`\`\`
ACID Properties:
A — Atomicity: Ya sab ho ya kuch nahi
    Bank transfer: debit + credit dono ho, ya dono na ho

C — Consistency: Valid state se valid state — constraints respect karo
    Foreign key, CHECK constraints, custom business rules

I — Isolation: Concurrent transactions ek doosre ko affect na karein
    Levels: READ COMMITTED (default) → SERIALIZABLE (strictest)

D — Durability: Committed data crash ke baad bhi survive kare
    WAL (Write-Ahead Log) ensure karta hai

Real code:
\`\`\`

\`\`\`js
// Node.js + pg
const client = await pool.connect()
try {
  await client.query('BEGIN')

  await client.query(
    'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
    [amount, fromId]
  )
  await client.query(
    'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
    [amount, toId]
  )

  await client.query('COMMIT')  // success — both changes permanent
} catch (err) {
  await client.query('ROLLBACK')  // failure — both changes undone
  throw err
} finally {
  client.release()  // MUST release!
}

// Prisma — cleaner syntax
await prisma.$transaction([
  prisma.account.update({ where: {id: fromId}, data: {balance: {decrement: amount}} }),
  prisma.account.update({ where: {id: toId}, data: {balance: {increment: amount}} }),
])
\`\`\``,
    tags: ['databases', 'transactions', 'acid', 'postgresql', 'prisma']
  },
  {
    id: 53, track: 'databases' as Track, difficulty: 'intermediate', priority: 'important',
    question: 'Connection pooling kya hai? Pool size kaise decide karo?',
    answer: `Database connection banane mein ~100ms lagta hai. Pooling pre-made connections reuse karta hai.

\`\`\`js
// pg (node-postgres) pool setup
import { Pool } from 'pg'

const pool = new Pool({
  max: 20,                    // max connections
  idleTimeoutMillis: 30000,   // 30s baad idle connection close
  connectionTimeoutMillis: 2000,  // 2s mein connection na mile → fail
})

// Pool size formula (PostgreSQL wiki):
// optimal = (CPU cores × 2) + effective_spindle_count
// 8-core server → (8×2) + 1 = 17 connections

// Common mistake: pool size = 100 (WAY too many)
// More connections = more context switching = SLOWER
// pg-bouncer lagao if you need 1000+ app connections

// Monitoring
pool.on('error', (err) => console.error('Pool error:', err))
setInterval(() => {
  console.log({
    total: pool.totalCount,   // total connections
    idle: pool.idleCount,     // waiting connections
    waiting: pool.waitingCount  // requests waiting for connection
  })
}, 60_000)
\`\`\`

**Signs of pool exhaustion:** requests timing out, slow responses, "too many clients" error. Fix: increase pool, optimize query time, or use pg-bouncer.`,
    tags: ['databases', 'connection-pooling', 'postgresql', 'performance']
  },
  {
    id: 54, track: 'databases' as Track, difficulty: 'intermediate', priority: 'important',
    question: 'Prisma aur Mongoose mein kya fark hai? Kab kaunsa use karo?',
    answer: `Dono ORM/ODM hain lekin fundamentally alag databases ke liye hain.

\`\`\`
Prisma (PostgreSQL/MySQL/SQLite):
✅ Type-safe queries — auto-generated from schema
✅ Schema-first (prisma.schema file)
✅ Migrations built-in (prisma migrate)
✅ Full TypeScript support — zero type assertions needed
✅ Introspection — existing DB se schema generate
❌ Runtime overhead slightly more than raw SQL

Mongoose (MongoDB):
✅ Schema + validation layer for MongoDB
✅ Middleware hooks (pre/post save, find, etc.)
✅ Population (document references resolve)
✅ Virtual fields, instance methods, statics
❌ No built-in migrations
❌ TypeScript support manageable but more verbose

\`\`\`

\`\`\`ts
// Prisma — schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[]
}

// Query — fully typed, no type assertions
const user = await prisma.user.findUnique({
  where: { email: 'test@example.com' },
  include: { posts: true }  // TypeScript knows post type!
})

// Mongoose
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true }
})
const User = model('User', UserSchema)
const user = await User.findOne({ email }).populate('posts')
\`\`\`

**Rule:** PostgreSQL project → Prisma. MongoDB project → Mongoose.`,
    tags: ['databases', 'prisma', 'mongoose', 'orm', 'odm']
  },
  {
    id: 55, track: 'databases' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'Redis ke top 5 use cases Node.js mein kaunse hain?',
    answer: `Redis in-memory store hai — sub-millisecond reads/writes. PostgreSQL complement karta hai, replace nahi.

\`\`\`js
import { createClient } from 'redis'
const redis = await createClient({ url: process.env.REDIS_URL }).connect()

// 1. DB Query Caching (cache-aside pattern)
async function getUser(id: number) {
  const cached = await redis.get(\`user:\${id}\`)
  if (cached) return JSON.parse(cached)
  const user = await db.getUser(id)
  await redis.setEx(\`user:\${id}\`, 3600, JSON.stringify(user))  // 1hr TTL
  return user
}

// 2. Session Storage
await redis.setEx(\`session:\${sessionId}\`, 86400, JSON.stringify(sessionData))

// 3. Rate Limiting
async function rateLimit(ip: string) {
  const key = \`rate:\${ip}:\${Math.floor(Date.now() / 60000)}\`
  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, 60)
  return count <= 100  // 100 req/min
}

// 4. Job Queues (BullMQ uses Redis)
import { Queue } from 'bullmq'
const emailQueue = new Queue('emails', { connection: redis })
await emailQueue.add('welcome', { userId: 1, email: 'test@test.com' })

// 5. Pub/Sub (real-time events)
const sub = redis.duplicate()
await sub.subscribe('notifications', (message) => {
  io.to(message.userId).emit('notification', message)
})
\`\`\``,
    tags: ['redis', 'caching', 'sessions', 'rate-limiting', 'queues']
  },
  {
    id: 56, track: 'databases' as Track, difficulty: 'advanced', priority: 'important',
    question: 'EXPLAIN ANALYZE se slow query kaise optimize karo?',
    answer: `Slow query optimize karna structured process hai — guess mat karo, measure karo.

\`\`\`sql
-- Step 1: Run EXPLAIN ANALYZE
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id;

-- Output samajhno:
-- Seq Scan: Full table scan — index nahi! ADD INDEX
-- Index Scan: Index use ho raha — good
-- Hash Join: Large tables — generally OK
-- Nested Loop: Small inner table — good; large — investigate
-- cost=0.00..500.50: estimated cost
-- actual time=1.2..45.6: REAL milliseconds
-- rows=1000: actual rows

-- Step 2: Add missing index
CREATE INDEX idx_users_created ON users(created_at)
-- Re-run EXPLAIN — Seq Scan gone, Index Scan aayega

-- Step 3: Composite index for multiple conditions
CREATE INDEX idx_orders_user_status ON orders(user_id, status)
-- WHERE user_id = ? AND status = ? — both covered

-- Step 4: Avoid common anti-patterns
-- ❌ Function on indexed column (breaks index!)
WHERE DATE(created_at) = '2024-01-01'
-- ✅ Range query instead
WHERE created_at >= '2024-01-01' AND created_at < '2024-01-02'
\`\`\`

**Process:** EXPLAIN → find Seq Scan on large tables → add index → verify improvement.`,
    tags: ['databases', 'explain', 'query-optimization', 'indexes', 'postgresql']
  },

  // ── System Design ──────────────────────────────────────────────────────────
  {
    id: 57, track: 'system-design' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'Rate limiting design karo — token bucket algorithm explain karo.',
    answer: `Rate limiting = per user/IP requests cap karo — prevent abuse, fair usage ensure karo.

\`\`\`
Algorithms:
1. Fixed Window: 100 req/minute — simple but boundary burst possible
2. Sliding Window: Last 60s ke requests count — more accurate
3. Token Bucket: Tokens bucket mein add hote hain (rate), use karo per request
4. Leaky Bucket: Fixed rate se "leak" — output rate constant

Token Bucket (most used):
- Bucket capacity: 100 tokens
- Refill rate: 10 tokens/second
- Per request: 1 token consume
- No tokens → 429 Too Many Requests

\`\`\`

\`\`\`js
// Redis-based token bucket
async function tokenBucketRateLimit(userId: string, capacity = 100, refillRate = 10) {
  const now = Date.now()
  const key = \`rate:bucket:\${userId}\`

  const script = \`
    local tokens = tonumber(redis.call('hget', KEYS[1], 'tokens') or ARGV[1])
    local lastRefill = tonumber(redis.call('hget', KEYS[1], 'ts') or ARGV[2])
    local now = tonumber(ARGV[2])
    local rate = tonumber(ARGV[3])
    local capacity = tonumber(ARGV[1])
    tokens = math.min(capacity, tokens + (now - lastRefill) / 1000 * rate)
    if tokens < 1 then return 0 end
    redis.call('hmset', KEYS[1], 'tokens', tokens - 1, 'ts', now)
    redis.call('expire', KEYS[1], 3600)
    return 1
  \`

  const allowed = await redis.eval(script, 1, key, capacity, now, refillRate)
  return allowed === 1
}

// Express middleware
app.use(async (req, res, next) => {
  const allowed = await tokenBucketRateLimit(req.ip)
  if (!allowed) return res.status(429).json({
    error: 'Too many requests', retryAfter: 1
  })
  next()
})
\`\`\``,
    tags: ['system-design', 'rate-limiting', 'redis', 'token-bucket']
  },
  {
    id: 58, track: 'system-design' as Track, difficulty: 'intermediate', priority: 'must-know',
    question: 'Caching strategies kaunsi hain? Cache invalidation kaise karo?',
    answer: `Caching — stale data ka risk vs performance gain ka tradeoff.

\`\`\`
Cache Strategies:

1. Cache-Aside (Lazy Loading) — most common
   Read: cache check → miss → DB fetch → cache set
   Write: DB update → cache delete (lazy re-population)
   ✅ Only cache what's needed
   ❌ Cache miss = 2 trips (cache + DB)

2. Write-Through
   Write: DB update + cache update simultaneously
   ✅ Cache always fresh
   ❌ Write latency higher, cache pollution

3. Write-Behind (Write-Back)
   Write: cache update → async DB flush
   ✅ Fastest writes
   ❌ Data loss risk if cache fails before DB flush

4. Read-Through
   Read: always through cache layer → cache fetches from DB
   ✅ Transparent to application
   ❌ Cache miss = cold start

Cache Invalidation strategies:
- TTL-based: auto-expire after N seconds (simple, eventual consistency)
- Event-based: user updated → cache.del('user:' + id)
- Tag-based: product updated → invalidate all product-tagged cache
\`\`\`

\`\`\`js
// Cache stampede prevention (thundering herd)
async function getWithLock<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)

  const lock = await redis.set(\`lock:\${key}\`, '1', { NX: true, EX: 5 })
  if (!lock) {
    await new Promise(r => setTimeout(r, 100))
    return getWithLock(key, fetchFn)
  }

  const data = await fetchFn()
  await redis.setEx(key, 300, JSON.stringify(data))
  await redis.del(\`lock:\${key}\`)
  return data
}
\`\`\``,
    tags: ['system-design', 'caching', 'redis', 'cache-aside', 'invalidation']
  },
  {
    id: 59, track: 'system-design' as Track, difficulty: 'advanced', priority: 'must-know',
    question: 'Database scaling — read replicas vs sharding vs partitioning?',
    answer: `Different problems, different solutions:

\`\`\`
Vertical Scaling (scale up):
- Bigger server: 16 → 64GB RAM, more CPUs
- Simple, no code change
- Limit: one machine can only be so big, expensive

Read Replicas (horizontal read scaling):
- Primary: all writes
- Replicas: read queries (90% of traffic usually)
- Replication lag: 10ms-1s — stale reads possible
- Use case: dashboards, reports, search queries
- Code: route reads to replica, writes to primary

Sharding (horizontal write scaling):
- Data split across multiple DBs by shard key
- User ID shard: users 1-1M → Shard 1, 1M-2M → Shard 2
- ✅ Unlimited horizontal scale
- ❌ Cross-shard queries complex, resharding painful
- Use case: truly massive scale (Twitter, WhatsApp level)

Table Partitioning (within one DB):
- orders table → partition by month/year
- Old partitions archived, recent data fast
- ✅ No application changes needed
- Use case: time-series data, logs, events

2025 practical advice:
1. Start single Postgres instance (handles millions easily)
2. Add read replica when reads bottleneck (~10k QPS)
3. Table partitioning for large append-only tables
4. Sharding only if truly at Google/Meta scale
5. Consider managed solutions (Supabase, PlanetScale, Neon)
\`\`\``,
    tags: ['system-design', 'database', 'scaling', 'sharding', 'replicas']
  },
  {
    id: 60, track: 'system-design' as Track, difficulty: 'intermediate', priority: 'important',
    question: 'REST API design best practices — 10 rules jo interview mein zaroor poochhe jaate hain.',
    answer: `\`\`\`
1. Nouns, not verbs in URLs
   ❌ GET /getUsers, POST /createUser
   ✅ GET /users, POST /users

2. HTTP methods semantics:
   GET /users — list all
   GET /users/:id — get one
   POST /users — create
   PUT /users/:id — full replace
   PATCH /users/:id — partial update
   DELETE /users/:id — delete

3. Consistent error responses:
   { "error": "User not found", "code": "USER_NOT_FOUND", "status": 404 }

4. Pagination always for lists:
   GET /posts?page=2&limit=20&sortBy=createdAt&order=desc
   Response: { data: [], total: 500, page: 2, totalPages: 25 }

5. Versioning:
   /api/v1/users — URL versioning (most common)
   /api/v2/users — breaking change? new version!

6. Idempotency:
   PUT/DELETE multiple calls = same result (safe to retry)
   POST = each call creates new resource

7. Filter/search via query params:
   GET /users?status=active&role=admin

8. Nested resources max 2 levels:
   ✅ /users/:id/orders
   ❌ /users/:id/orders/:orderId/items/:itemId/reviews

9. Rate limiting headers:
   X-RateLimit-Limit: 100
   X-RateLimit-Remaining: 87
   X-RateLimit-Reset: 1706745600

10. Always return consistent JSON:
    ✅ Always { data: ... } on success
    ✅ Always { error: ..., code: ... } on failure
\`\`\``,
    tags: ['system-design', 'rest-api', 'best-practices', 'http']
  },
  {
    id: 61, track: 'system-design' as Track, difficulty: 'advanced', priority: 'important',
    question: 'Microservices vs Monolith — kab split karo?',
    answer: `Martin Fowler ka rule: "Don't start with microservices. Start with a monolith."

\`\`\`
Monolith — Start here:
✅ Simple deployment (one app, one DB)
✅ No network latency between "services"
✅ Easier debugging (one codebase)
✅ ACID transactions trivial
✅ Team can move fast early
❌ Scales as one unit
❌ Large codebase gets messy
❌ One bug can take down everything

Microservices — Graduate to when:
✅ Independent scaling needed (payments team ≠ search team)
✅ Different tech stacks for different problems
✅ Large teams can deploy independently
✅ Fault isolation (cart down ≠ checkout down)
❌ Network calls instead of function calls (latency)
❌ Distributed transactions are HARD
❌ Observability complexity (tracing across services)
❌ Need service mesh, API gateway, service discovery

Signals you're ready to split:
1. Team > 50 engineers
2. Clear domain boundaries (payments, auth, catalog)
3. One module's deploy blocks everything else
4. Clear performance bottleneck in specific domain

Practical 2025 approach:
1. Start monolith
2. Module-based architecture (clear boundaries)
3. Extract services one at a time when pain is clear
4. Strangler fig pattern — incremental extraction
\`\`\``,
    tags: ['system-design', 'microservices', 'monolith', 'architecture']
  },
]

// ── Track Config ──────────────────────────────────────────────────────────────

const trackConfig = {
  javascript:    { label: 'JavaScript',    color: '#F7DF1E', bg: 'rgba(247,223,30,0.12)',  border: 'rgba(247,223,30,0.3)',  text: '#F7DF1E' },
  react:         { label: 'React.js',      color: '#06B6D4', bg: 'rgba(6,182,212,0.12)',   border: 'rgba(6,182,212,0.3)',   text: '#06B6D4' },
  nodejs:        { label: 'Node.js',       color: '#10B981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  text: '#10B981' },
  genai:         { label: 'GenAI',         color: '#F97316', bg: 'rgba(249,115,22,0.12)',  border: 'rgba(249,115,22,0.3)',  text: '#F97316' },
  typescript:    { label: 'TypeScript',    color: '#3178C6', bg: 'rgba(49,120,198,0.12)',  border: 'rgba(49,120,198,0.3)',  text: '#3178C6' },
  databases:     { label: 'Databases',     color: '#FF6B35', bg: 'rgba(255,107,53,0.12)',  border: 'rgba(255,107,53,0.3)',  text: '#FF6B35' },
  'system-design': { label: 'System Design', color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#8B5CF6' },
  coding:        { label: 'Coding',        color: '#7C3AED', bg: 'rgba(124,58,237,0.12)',  border: 'rgba(124,58,237,0.3)',  text: '#7C3AED' },
}

const difficultyConfig = {
  beginner:     { label: 'Beginner',     color: 'text-[#10B981]', bg: 'bg-[rgba(16,185,129,0.1)]'  },
  intermediate: { label: 'Intermediate', color: 'text-[#F59E0B]', bg: 'bg-[rgba(245,158,11,0.1)]' },
  advanced:     { label: 'Advanced',     color: 'text-[#7C3AED]', bg: 'bg-[rgba(124,58,237,0.1)]' },
}

// ── Code Block Renderer ───────────────────────────────────────────────────────

function renderAnswer(text: string) {
  const parts = text.split(/(```[\s\S]*?```)/g)
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const lines = part.split('\n')
      const code = lines.slice(1, -1).join('\n')
      return (
        <pre key={i} className="mt-3 rounded-xl overflow-x-auto text-xs leading-relaxed" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
          <code className="font-mono text-[#A1A1AA]">{code}</code>
        </pre>
      )
    }
    return (
      <p key={i} className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-wrap">{part}</p>
    )
  })
}

// ── Question Card ─────────────────────────────────────────────────────────────

function QuestionCard({ q, practiceMode }: { q: Question; practiceMode: boolean }) {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const tc = trackConfig[q.track]
  const dc = difficultyConfig[q.difficulty]

  const copyQ = () => {
    navigator.clipboard.writeText(`Q: ${q.question}\n\nA: ${q.answer}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Question header */}
      <button
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
          {/* Priority */}
          {q.priority === 'must-know' && <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] shrink-0" />}
          {/* Track badge */}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
            style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text }}>
            {tc.label}
          </span>
          {/* Difficulty */}
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${dc.color} ${dc.bg}`}>
            {dc.label}
          </span>
          {/* Question text */}
          <span className="text-sm font-medium text-[#F5F5F7] leading-snug">{q.question}</span>
        </div>
        <div className="shrink-0 text-[#71717A] mt-0.5">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
              {practiceMode && !revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#9D5FF0' }}
                >
                  👁 Answer Reveal Karo
                </button>
              ) : (
                <div>
                  {renderAnswer(q.answer)}
                  {/* Tags + Copy */}
                  <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {q.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] text-[#71717A]"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button onClick={copyQ} className="flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors">
                      {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function QuestionsPage() {
  const [search, setSearch] = useState('')
  const [activeTrack, setActiveTrack] = useState<Track | 'all'>('all')
  const [activeDiff, setActiveDiff] = useState<Difficulty | 'all'>('all')
  const [mustKnowOnly, setMustKnowOnly] = useState(false)
  const [practiceMode, setPracticeMode] = useState(false)

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (activeTrack !== 'all' && q.track !== activeTrack) return false
      if (activeDiff !== 'all' && q.difficulty !== activeDiff) return false
      if (mustKnowOnly && q.priority !== 'must-know') return false
      if (search) {
        const s = search.toLowerCase()
        return q.question.toLowerCase().includes(s) ||
          q.answer.toLowerCase().includes(s) ||
          q.tags.some(t => t.includes(s))
      }
      return true
    })
  }, [search, activeTrack, activeDiff, mustKnowOnly])

  const mustKnowList = questions.filter(q => q.priority === 'must-know').slice(0, 10)

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.08)] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold text-[#F5F5F7]">Interview Prep</h1>
          </div>
          <p className="text-[#A1A1AA] text-lg mb-6">
            JS, React, Node.js, GenAI — sabse important questions aur answers. Hinglish mein, code ke saath.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { n: questions.length, label: 'Total Questions' },
              { n: questions.filter(q => q.priority === 'must-know').length, label: 'Must-Know' },
              { n: Object.keys(trackConfig).length, label: 'Tracks' },
              { n: questions.filter(q => q.track === 'coding').length, label: 'Coding Challenges' },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{n}+</div>
                <div className="text-xs text-[#71717A]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Top 10 Must-Know */}
        <div className="mb-10 rounded-2xl p-5"
          style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            <h2 className="font-bold text-[#F59E0B] text-sm uppercase tracking-wide">Top Must-Know Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {mustKnowList.map((q, i) => (
              <button key={q.id}
                onClick={() => {
                  setActiveTrack(q.track)
                  setSearch(q.question.split(' ').slice(0, 3).join(' '))
                }}
                className="text-left text-xs text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors p-2 rounded-lg hover:bg-[rgba(255,255,255,0.04)] flex items-center gap-2">
                <span className="text-[#71717A] font-mono w-5 shrink-0">{i + 1}.</span>
                <span className="truncate">{q.question}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type="text"
              placeholder="Search questions, answers, tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-[#F5F5F7] placeholder-[#71717A] focus:outline-none transition-all"
              style={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Track filter */}
            {(['all', ...Object.keys(trackConfig)] as const).map(t => (
              <button key={t}
                onClick={() => setActiveTrack(t as Track | 'all')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: activeTrack === t ? (t === 'all' ? 'rgba(124,58,237,0.2)' : trackConfig[t as Track].bg) : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeTrack === t ? (t === 'all' ? 'rgba(124,58,237,0.5)' : trackConfig[t as Track].border) : 'rgba(255,255,255,0.1)'}`,
                  color: activeTrack === t ? (t === 'all' ? '#9D5FF0' : trackConfig[t as Track].text) : '#71717A',
                }}>
                {t === 'all' ? 'All' : trackConfig[t as Track].label}
              </button>
            ))}

            <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />

            {/* Difficulty filter */}
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
              <button key={d}
                onClick={() => setActiveDiff(d)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: activeDiff === d ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeDiff === d ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                  color: activeDiff === d ? '#F5F5F7' : '#71717A',
                }}>
                {d === 'all' ? 'All Levels' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}

            <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />

            {/* Toggles */}
            <button onClick={() => setMustKnowOnly(m => !m)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: mustKnowOnly ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${mustKnowOnly ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: mustKnowOnly ? '#F59E0B' : '#71717A',
              }}>
              <Star className="w-3 h-3" /> Must-Know Only
            </button>

            <button onClick={() => setPracticeMode(m => !m)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: practiceMode ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${practiceMode ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: practiceMode ? '#9D5FF0' : '#71717A',
              }}>
              <Code2 className="w-3 h-3" /> Practice Mode
            </button>
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#71717A]">
              <span className="text-[#A1A1AA] font-semibold">{filtered.length}</span> questions
              {practiceMode && <span className="ml-2 text-[#7C3AED]">• Practice mode: answers hidden until revealed</span>}
            </p>
            {search && (
              <button onClick={() => setSearch('')} className="text-xs text-[#71717A] hover:text-[#A1A1AA]">
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="w-8 h-8 text-[#71717A] mx-auto mb-3" />
              <p className="text-[#71717A]">Koi question nahi mila. Filters change karo.</p>
            </div>
          ) : (
            filtered.map(q => (
              <QuestionCard key={q.id} q={q} practiceMode={practiceMode} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
