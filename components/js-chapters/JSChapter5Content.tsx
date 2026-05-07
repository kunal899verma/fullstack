'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: 'Array.from() ka kya use hai?',
    options: [
      { text: 'Array copy karne ke liye', correct: false, explanation: 'Copy ke liye [...arr] ya arr.slice() zyada common hai.' },
      { text: 'Array-like ya iterable objects ko real array mein convert karna', correct: true, explanation: 'Sahi! Array.from(nodeList), Array.from("hello"), Array.from({length: 5}, (_, i) => i) — sab possible hai.' },
      { text: 'Array mein elements add karne ke liye', correct: false, explanation: 'Elements add karne ke liye push() ya spread use karo.' },
      { text: 'Array sort karne ke liye', correct: false, explanation: 'Sort ke liye .sort() method hai.' },
    ],
  },
  {
    question: 'reduce() method mein accumulator kya hota hai?',
    options: [
      { text: 'Current element ka index', correct: false, explanation: 'Index reduce ka third argument hota hai, accumulator pehla.' },
      { text: 'Previous iteration ka return value jo agly iteration mein pass hota hai', correct: true, explanation: 'Bilkul! Accumulator running total/result hai — reduce ka core concept.' },
      { text: 'Original array ka reference', correct: false, explanation: 'Original array reduce ka fourth argument hota hai.' },
      { text: 'Current element ki value', correct: false, explanation: 'Current element reduce ka second argument (currentValue) hota hai.' },
    ],
  },
  {
    question: 'map() aur forEach() mein kya main farq hai?',
    options: [
      { text: 'map() tez hai forEach() se', correct: false, explanation: 'Performance difference negligible hai — semantic difference zyada important hai.' },
      { text: 'map() new array return karta hai, forEach() kuch return nahi karta', correct: true, explanation: 'Sahi! map() transformed array return karta hai, forEach() sirf side effects ke liye hai — undefined return karta hai.' },
      { text: 'forEach() immutable hai', correct: false, explanation: 'forEach immutability guarantee nahi karta — callback ke andar mutate kar sakte ho.' },
      { text: 'map() sirf numbers ke saath kaam karta hai', correct: false, explanation: 'map() kisi bhi type ke array ke saath kaam karta hai.' },
    ],
  },
  {
    question: 'filter() method kya return karta hai jab koi element condition pass na kare?',
    options: [
      { text: 'null', correct: false, explanation: 'null nahi — ek array return hota hai, empty ya partial.' },
      { text: 'Empty array []', correct: true, explanation: 'Sahi! filter() hamesha array return karta hai — agar koi element condition pass na kare toh empty array [].' },
      { text: 'undefined', correct: false, explanation: 'undefined nahi — hamesha array return hota hai.' },
      { text: 'false', correct: false, explanation: 'false nahi — filter hamesha array return karta hai.' },
    ],
  },
  {
    question: 'flat() aur flatMap() mein kya farq hai?',
    options: [
      { text: 'Koi farq nahi', correct: false, explanation: 'Bahut important farq hai!' },
      { text: 'flat() nested arrays ko flatten karta hai, flatMap() map + single-level flatten karta hai', correct: true, explanation: 'Bilkul! flat(depth) nested arrays flatten karta hai. flatMap() = map() + flat(1) — ek step mein transform aur flatten.' },
      { text: 'flatMap() sirf numbers ke liye hai', correct: false, explanation: 'flatMap() kisi bhi type ke array ke saath kaam karta hai.' },
      { text: 'flat() remove karta hai duplicates', correct: false, explanation: 'flat() sirf nested arrays ko flatten karta hai — duplicates remove karne ke liye Set use karo.' },
    ],
  },
]

// ── Diagram ───────────────────────────────────────────────────────────────────

function ArrayMethodsDiagram() {
  const categories = [
    {
      label: 'Mutating Methods',
      sublabel: 'push / pop / splice / sort / reverse',
      note: '⚠️ Changes the original array',
      color: '#F97316',
      bg: 'rgba(249,115,22,0.1)',
      border: 'rgba(249,115,22,0.3)',
      icon: '✏️',
    },
    {
      label: 'Non-Mutating',
      sublabel: 'map / filter / reduce / slice',
      note: '✅ Returns a new array — original safe',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      icon: '🔥',
    },
    {
      label: 'Search Methods',
      sublabel: 'find / some / every / includes',
      note: '🔍 Returns value or boolean — no new array',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '🔎',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Array Methods — 3 Categories</p>
      <div className="max-w-lg mx-auto grid grid-cols-3 gap-3">
        {categories.map((item, i) => (
          <div key={i} className="rounded-xl px-4 py-4 flex flex-col gap-2" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
            <span className="text-xl text-center">{item.icon}</span>
            <p className="font-bold text-sm text-center" style={{ color: item.color }}>{item.label}</p>
            <code className="text-xs text-[#A1A1AA] text-center block leading-relaxed">{item.sublabel}</code>
            <p className="text-xs text-[#71717A] text-center mt-1">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter5Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Arrays — map, filter, reduce Seekh Lo, Code Ka Tarika Badal Jaayega
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          <strong className="text-[#F5F5F7]">Ye shocking hai</strong> — ek junior developer for loop likhta hai data transform karne ke liye. Ek senior developer <code className="text-[#06B6D4]">.filter().map().reduce()</code> likh ke baat khatam karta hai. Dono ek hi kaam karte hain — lekin senior code padhna, samajhna, maintain karna aasaan hai. Arrays JavaScript ka sabse used data structure hai, aur inke methods sikhna programming mindset hi shift kar deta hai — imperative se declarative!
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#06B6D4] font-semibold">Is chapter mein:</span> Array creation, mutating methods, THE BIG THREE (map/filter/reduce), search methods, advanced methods — flat, flatMap, chaining. Imperative se declarative style ki journey!
          </p>
        </div>
      </div>

      <ArrayMethodsDiagram />

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
      >
        <p className="text-sm font-bold text-[#F59E0B] mb-1">Ab Sawaal Ye Aata Hai — new Array(3) aur [3] mein kya fark?</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <code className="text-[#06B6D4]">new Array(3)</code> = <strong className="text-[#F5F5F7]">[empty × 3]</strong> — teen empty slots wala array! <br/>
          <code className="text-[#06B6D4]">[3]</code> = <strong className="text-[#F5F5F7]">[3]</strong> — value 3 wala array! <br/>
          Yahi trap hai bhai. Isliye hamesha array literal <code className="text-[#F59E0B]">[]</code> prefer karo. <code className="text-[#06B6D4]">Array.from({'{'} length: 5 {'}'}, (_, i) =&gt; i)</code> se initialized array banao — ye powerful pattern hai!
        </p>
      </div>

      {/* Card 1: Array Creation */}
      <div id="array-creation">
        <ConceptCard
          title="Array Creation &amp; Basics — Ye Sab Tarike Kyon?"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Arrays ordered collections hain — ek hi variable mein multiple values store karo. JavaScript arrays dynamic hain — size change ho sakta hai, mixed types store ho sakte hain. Heap mein store hote hain aur reference se access hote hain. Creation ke multiple ways hain: literal [], Array.from(), spread operator. Array ka har element 0-indexed hai — pehla element index 0, last element arr.at(-1) se access karo (ES2022 ka clean syntax)."
          whenToUse={[
            'Literal []: hamesha prefer karo — simple, readable, fast',
            'Array.from(): DOM NodeLists, strings, Set, Map, ya custom iterables convert karne ke liye',
            'Array.from({length: n}, fn): fixed size array with initial values',
            'Spread [...arr]: copy karna, merge karna, iterable ko array mein convert karna',
          ]}
          whyUseIt="Array literal [] fastest aur most readable hai. Array.from() power mein hai jab non-array iterables ko array mein convert karna ho. Array.from({length: 5}, (_, i) => i) ek concise way hai initialized arrays banane ka — loops ki zaroorat nahi. Spread operator shallow copy ke liye perfect hai."
          howToUse={{
            filename: 'array-creation.js',
            language: 'javascript',
            code: `// 1. Array literal — preferred way
const fruits = ['aam', 'kela', 'seb']
const mixed = [1, 'hello', true, null, { id: 1 }]

// 2. Array.from() — iterable to array
const fromString = Array.from('hello')  // ['h','e','l','l','o']
const fromSet = Array.from(new Set([1, 2, 2, 3]))  // [1, 2, 3]

// Array.from with map function — most powerful form
const squares = Array.from({ length: 5 }, (_, i) => (i + 1) ** 2)
// [1, 4, 9, 16, 25]

const range = Array.from({ length: 10 }, (_, i) => i)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 3. Spread — copy aur merge
const original = [1, 2, 3]
const copy = [...original]       // shallow copy
const merged = [...original, 4, 5, ...['a', 'b']]

// 4. Basic operations
const arr = ['a', 'b', 'c', 'd', 'e']
arr.length        // 5
arr[0]            // 'a' — first element
arr[arr.length-1] // 'e' — last element
arr.at(-1)        // 'e' — modern way (ES2022)
arr.at(-2)        // 'd'

// Destructuring
const [first, second, ...rest] = arr
// first='a', second='b', rest=['c','d','e']

// Checking if array
Array.isArray(arr)   // true
Array.isArray('arr') // false`,
            explanation: 'Array.from({length: n}, fn) ek powerful pattern hai — DOM elements banane se leke test data generate karne tak. arr.at(-1) last element ke liye neat modern syntax hai — index calculation se better. Array.isArray() se type check karo — typeof [] === "object" misleading hota hai.',
          }}
          realWorldScenario="DOM mein: Array.from(document.querySelectorAll('.item')) NodeList ko real array mein convert karta hai taaki map/filter use ho sake. Test data: Array.from({length: 100}, (_, i) => ({ id: i, name: \`User \${i}\` })) — 100 fake users ek line mein. Ye patterns daily frontend aur Node.js mein use hote hain."
          commonMistakes={[
            {
              mistake: "new Array(3) aur [3] ko same samajhna",
              why: 'new Array(3) creates [empty × 3] — 3 empty slots. [3] creates [3] — array with value 3.',
              fix: 'Array literal always prefer karo. new Array(n) sirf fixed-size initialization ke liye use karo Array.from ke saath.',
            },
            {
              mistake: 'Array ko object ki tarah treat karna — arr.push ke baad arr[100] = value',
              why: 'JS arrays sparse ho sakte hain — arr[100] = 5 se length 101 ho jaati hai, bich ke slots empty hote hain.',
              fix: 'Sparse arrays avoid karo. Sequential indices maintain karo. Custom properties array par mat add karo.',
            },
          ]}
          proTip="Array.from() ka second argument map function hai — Array.from aur map ek saath: Array.from(new Set(arr), x => x.toUpperCase()) — deduplicate aur transform ek line mein!"
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
      >
        <p className="text-sm font-bold text-[#EF4444] mb-1">Mutation Trap — React Mein Yahi Sabse Bada Bug Hai</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">sort() aur reverse() original array mutate karte hain!</strong> Agar tum kisi function mein received array sort karo bina copy ke — caller ka array bhi change ho jaata hai. React state mein direct mutation = React detect nahi karta = UI update nahi hota. Rule: <code className="text-[#F59E0B]">const sorted = [...arr].sort()</code> — pehle copy, phir sort!
        </p>
      </div>

      {/* Card 2: Mutating Methods */}
      <div id="mutating-methods">
        <ConceptCard
          title="Mutating Methods — In-Place Modify Ka Khel"
          emoji="✏️"
          difficulty="beginner"
          whatIsIt="Mutating methods original array ko modify karte hain — push, pop, shift, unshift, splice, reverse, sort, fill. Ye sab in-place modify karte hain. Ye critical samajhna hai ki kaunse methods mutate karte hain aur kaunse nahi — shared arrays mein mutation unexpected bugs ka biggest source hai. ES2023 mein non-mutating alternatives aaye: toSorted(), toReversed(), toSpliced() — ye use karo production mein!"
          whenToUse={[
            'push/pop: stack implementation — LIFO (Last In First Out)',
            'shift/unshift: queue implementation — FIFO (First In First Out)',
            'splice: specific position pe insert, delete, ya replace karna',
            'sort: in-place sorting — compare function mat bhulo!',
          ]}
          whyUseIt="Mutating methods performance-wise efficient hain — new array create nahi hoti. Stack aur queue data structures ke liye natural fit. splice bohot powerful hai — ek method se insert, delete, replace sab karo. Lekin shared state mein mutation bugs banata hai — function ke andar received array mutate karna anti-pattern hai."
          howToUse={{
            filename: 'mutating.js',
            language: 'javascript',
            code: `const arr = [1, 2, 3, 4, 5]

// push/pop — end par add/remove
arr.push(6, 7)     // arr = [1,2,3,4,5,6,7], returns 7 (new length)
arr.pop()          // arr = [1,2,3,4,5,6], returns 7 (removed element)

// unshift/shift — start par add/remove
arr.unshift(0)     // arr = [0,1,2,3,4,5,6], returns 7 (new length)
arr.shift()        // arr = [1,2,3,4,5,6], returns 0 (removed element)

// splice — powerful! (start, deleteCount, ...itemsToInsert)
const letters = ['a', 'b', 'c', 'd', 'e']
letters.splice(2, 0, 'X')     // insert at index 2: ['a','b','X','c','d','e']
letters.splice(1, 2)          // remove 2 from index 1: ['a','X','d','e']
letters.splice(1, 1, 'Y', 'Z')// replace: ['a','Y','Z','d','e']

// sort — mutates! Use with compare function
const nums = [10, 2, 30, 4, 20]
nums.sort()                   // ['10','2','20','30','4'] — string sort! WRONG
nums.sort((a, b) => a - b)    // [2, 4, 10, 20, 30] — numeric sort

const users = [
  { name: 'Zahir', age: 25 },
  { name: 'Aman', age: 30 },
  { name: 'Priya', age: 20 },
]
users.sort((a, b) => a.age - b.age)  // Sort by age ascending

// reverse — mutates original!
const reversed = [1, 2, 3].reverse()  // [3, 2, 1]

// Safe reverse (non-mutating):
const safeReversed = [...arr].reverse()

// fill — fill with value
new Array(5).fill(0)          // [0, 0, 0, 0, 0]
[1,2,3,4,5].fill(0, 2, 4)   // [1, 2, 0, 0, 5]`,
            explanation: 'sort() bina compare function ke string sort karta hai — numbers ke liye hamesha (a, b) => a - b lagao. reverse() aur sort() mutate karte hain — agar original preserve karna hai toh pehle spread copy banao. splice ka return value removed elements ka array hota hai.',
          }}
          realWorldScenario="Chat app mein: messages.push(newMessage) — new message add karo. Undo feature: actions.pop() — last action remove karo. Admin panel mein user list sort karna: users.sort((a, b) => b.createdAt - a.createdAt) — newest first. Queue processing: while (queue.length) { const task = queue.shift(); process(task); }."
          commonMistakes={[
            {
              mistake: "arr.sort() bina compare function ke numbers sort karna",
              why: '[10, 2, 1].sort() = [1, 10, 2] — string lexicographic comparison karta hai!',
              fix: 'Numbers ke liye: arr.sort((a, b) => a - b). Descending: arr.sort((a, b) => b - a).',
            },
            {
              mistake: 'Function argument array ko mutate karna',
              why: 'JavaScript objects/arrays pass by reference hain — function ke andar mutate kiya toh caller ka data bhi change ho jaata hai.',
              fix: 'Copy pehle: const sorted = [...arr].sort(). Ya spread/slice se copy banao.',
            },
          ]}
          proTip="ES2023 mein non-mutating alternatives aaye: toSorted(), toReversed(), toSpliced() — original array unchanged rehta hai! Production code mein zyada safe hain. Check browser/Node.js support before using."
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <p className="text-sm font-bold text-[#10B981] mb-1">map, filter, reduce — Teen Sawaal Ka Jawab</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">map</strong> — &quot;har element ko transform karna hai?&quot; Use map. <br/>
          <strong className="text-[#F5F5F7]">filter</strong> — &quot;kuch elements nikaalne hain?&quot; Use filter. <br/>
          <strong className="text-[#F5F5F7]">reduce</strong> — &quot;array se ek value banana hai?&quot; Use reduce. <br/>
          Teeno milake: <code className="text-[#06B6D4]">.filter().map().reduce()</code> — data pipeline! Initial value hamesha dena reduce ko — warna empty array pe crash.
        </p>
      </div>

      {/* Card 3: Big Three */}
      <div id="map-filter-reduce">
        <ConceptCard
          title="map, filter, reduce — The Big Three"
          emoji="🔥"
          difficulty="beginner"
          whatIsIt="map, filter, reduce — teen methods jo array programming ko completely transform karte hain. map: har element transform karo — same length array return, original unchanged. filter: condition pass karne wale elements rakhho — chhota ya same length array return. reduce: array ko kisi bhi single value mein reduce karo — number, string, object, another array. Ye teeno pure functions hain — original array nahi badlate, chainable hain, declarative hain. Ye magic nahi, ye functional programming ka science hai — sikhne ke baad for loops ki zaroorat 80% kam ho jaati hai!"
          whenToUse={[
            'map: data transform karna — API response ko UI format mein convert karna',
            'filter: subset nikalna — active users, in-stock items, recent orders',
            'reduce: aggregation — sum, average, grouping, flattening, counting',
            'Chain: filter().map().reduce() — complex transformations ek pipeline mein',
          ]}
          whyUseIt="Ye methods for loops se infinitely more readable hain. Intent clearly express hota hai — map matlab transform, filter matlab select, reduce matlab aggregate. Pure functions hain — original array mutate nahi karte. Chainable hain — complex data pipelines ek expression mein. Functional programming ka gateway."
          howToUse={{
            filename: 'big-three.js',
            language: 'javascript',
            code: `const orders = [
  { id: 1, product: 'Laptop', price: 50000, qty: 1, status: 'delivered' },
  { id: 2, product: 'Mouse', price: 1500, qty: 2, status: 'pending' },
  { id: 3, product: 'Keyboard', price: 3000, qty: 1, status: 'delivered' },
  { id: 4, product: 'Monitor', price: 20000, qty: 1, status: 'cancelled' },
]

// map — transform each element
const orderSummaries = orders.map(order => ({
  id: order.id,
  item: order.product,
  total: order.price * order.qty,
}))
// [{id:1, item:'Laptop', total:50000}, ...]

// filter — keep only matching elements
const deliveredOrders = orders.filter(o => o.status === 'delivered')
// [Laptop order, Keyboard order]

// reduce — aggregate to single value
const totalRevenue = orders
  .filter(o => o.status !== 'cancelled')
  .reduce((sum, order) => sum + order.price * order.qty, 0)
// 56500

// reduce — group by status (most powerful use)
const grouped = orders.reduce((acc, order) => {
  const key = order.status
  if (!acc[key]) acc[key] = []
  acc[key].push(order)
  return acc
}, {})
// { delivered: [...], pending: [...], cancelled: [...] }

// reduce — count occurrences
const statusCount = orders.reduce((acc, order) => {
  acc[order.status] = (acc[order.status] || 0) + 1
  return acc
}, {})
// { delivered: 2, pending: 1, cancelled: 1 }

// Chaining — complex pipeline
const topProducts = orders
  .filter(o => o.status === 'delivered')
  .map(o => ({ ...o, total: o.price * o.qty }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 5)  // top 5`,
            explanation: 'reduce initial value hamesha provide karo (second argument) — warna first element initial value banta hai jo unexpected behavior de sakta hai. Group by pattern (reduce ke saath) bohot common hai — object as accumulator. Chaining se readable data pipelines banao.',
          }}
          realWorldScenario="E-commerce dashboard: filter se active products, map se UI display format, reduce se revenue totals. Analytics: events filter karo (type === 'purchase'), map karo (revenue extract karo), reduce se sum — ek pipeline mein analytics. Node.js API: DB rows filter/transform/aggregate — SQL ki jagah in-memory processing."
          commonMistakes={[
            {
              mistake: 'reduce mein initial value miss karna',
              why: '[].reduce((acc, x) => acc + x) — empty array pe TypeError! Initial value nahi hai toh first element use hota hai.',
              fix: 'Hamesha initial value do: [].reduce((acc, x) => acc + x, 0) — safe even for empty arrays.',
            },
            {
              mistake: 'map ke andar side effects — console.log, API calls',
              why: 'map pure transformation ke liye hai — side effects ke liye forEach use karo.',
              fix: 'Side effects ke liye forEach, data transform ke liye map. Alag concerns, alag tools.',
            },
          ]}
          proTip="reduce se kuch bhi bana sakte ho — flat karo, group karo, count karo, zip karo, pipeline banao. Lekin jab reduce complex ho jaaye toh for...of loop zyada readable hota hai. Readability > cleverness!"
          demo={
            <DiffBlock
              title="Imperative for Loop vs Declarative map/filter/reduce"
              language="javascript"
              bad={{
                code: `// Imperative — steps batao kaise karna hai
const activeUsers = []
for (let i = 0; i < users.length; i++) {
  if (users[i].isActive) {
    activeUsers.push({
      id: users[i].id,
      displayName: users[i].name.toUpperCase(),
    })
  }
}`,
                label: 'Imperative — Low-level Steps',
                explanation: 'Kaise karna hai bataya — mental overhead zyada',
              }}
              good={{
                code: `// Declarative — kya karna hai batao
const activeUsers = users
  .filter(user => user.isActive)
  .map(user => ({
    id: user.id,
    displayName: user.name.toUpperCase(),
  }))`,
                label: 'Declarative — Intent Crystal Clear',
                explanation: 'Filter karo active, map karo display format — seedha readable',
              }}
            />
          }
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-sm font-bold text-[#7C3AED] mb-1">includes vs indexOf — NaN Ka Surprise</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ab sawaal ye aata hai</strong> — <code className="text-[#06B6D4]">[1, NaN, 3].indexOf(NaN)</code> kya return karta hai? <strong className="text-[#F59E0B]">-1</strong>! Kyunki <code className="text-[#06B6D4]">NaN === NaN</code> is false! Lekin <code className="text-[#06B6D4]">[1, NaN, 3].includes(NaN)</code> return karta hai <strong className="text-[#F59E0B]">true</strong> — includes SameValueZero algorithm use karta hai. Aur objects ke liye: <code className="text-[#06B6D4]">indexOf</code> reference dhundta hai — <code className="text-[#06B6D4]">find()</code> use karo!
        </p>
      </div>

      {/* Card 4: Search Methods */}
      <div id="search-methods">
        <ConceptCard
          title="Search Methods — find, some, every, includes"
          emoji="🔍"
          difficulty="beginner"
          whatIsIt="Array search methods elements dhundne aur check karne ke liye hain. find() pehla matching element return karta hai (ya undefined — handle karna mat bhulo!). findIndex() pehla matching index return karta hai. some() check karta hai koi ek element condition satisfy karta hai — short-circuit karta hai. every() check karta hai sab elements condition satisfy karte hain. includes() primitive value check ke liye, indexOf se better NaN handling ke saath."
          whenToUse={[
            'find(): ek specific object dhundna — user by id, product by sku',
            'some(): validation — kya koi element valid hai, koi error toh nahi',
            'every(): batch validation — sab items valid hain?',
            'includes(): simple existence check — tags mein value hai?',
          ]}
          whyUseIt="Ye methods filter/map se zyada readable hain simple search operations ke liye. some() aur every() short-circuit karte hain — pehla match milte hi stop. find() pura array scan nahi karta zaroor — efficient. indexOf vs includes: includes NaN bhi dhundh sakta hai, indexOf nahi."
          howToUse={{
            filename: 'search.js',
            language: 'javascript',
            code: `const users = [
  { id: 1, name: 'Rahul', role: 'admin', active: true },
  { id: 2, name: 'Priya', role: 'user', active: false },
  { id: 3, name: 'Aman', role: 'user', active: true },
]

// find — pehla matching element (ya undefined)
const adminUser = users.find(u => u.role === 'admin')
// { id: 1, name: 'Rahul', ... }

const notFound = users.find(u => u.role === 'superuser')
// undefined — handle this!

// findIndex — element ka index (ya -1)
const adminIndex = users.findIndex(u => u.role === 'admin')  // 0
const notFoundIdx = users.findIndex(u => u.id === 99)        // -1

// some — kya koi element condition satisfy karta hai?
const hasAdmin = users.some(u => u.role === 'admin')         // true
const hasInactive = users.some(u => !u.active)               // true
const hasRoot = users.some(u => u.role === 'root')           // false

// every — kya sab condition satisfy karte hain?
const allActive = users.every(u => u.active)                 // false
const allHaveId = users.every(u => u.id !== undefined)       // true

// includes — simple value check (for primitives)
const roles = ['admin', 'user', 'moderator']
roles.includes('admin')     // true
roles.includes('superuser') // false

// indexOf vs includes — NaN edge case
const nums = [1, NaN, 3]
nums.indexOf(NaN)   // -1 — NaN === NaN is false!
nums.includes(NaN)  // true — uses SameValueZero algorithm

// findLast / findLastIndex (ES2023)
const lastActive = users.findLast(u => u.active)
// Starts from end — { id: 3, name: 'Aman', ... }`,
            explanation: 'find undefined return karta hai jab nahi milta — optional chaining se safely use karo: users.find(...)?.name. some() aur every() short-circuit karte hain — efficient. includes() NaN ke liye sahi hai indexOf ke unlike.',
          }}
          realWorldScenario="Shopping cart: cart.some(item => item.outOfStock) se checkout disable karo. Form validation: requiredFields.every(field => formData[field]?.trim() !== '') — sab required fields bhare hain? User management: users.find(u => u.email === loginEmail) — login karne wala user dhundho. Permissions: user.roles.includes('admin')."
          commonMistakes={[
            {
              mistake: 'find() ka result bina null check ke use karna',
              why: 'find() undefined return karta hai agar nahi mila — undefined.property → TypeError.',
              fix: 'const user = users.find(...); if (user) { use(user) }. Ya optional chaining: users.find(...)?.name.',
            },
            {
              mistake: 'indexOf se object dhundna',
              why: '[{id:1}].indexOf({id:1}) = -1 — objects reference se compare hote hain, value se nahi.',
              fix: 'Objects dhundne ke liye find() use karo with condition: arr.find(x => x.id === 1).',
            },
          ]}
          proTip="findIndex ke result ko check karo before use: const idx = arr.findIndex(...); if (idx !== -1) { arr.splice(idx, 1); } — yeh pattern element dhundke remove karne ka common idiom hai."
        />
      </div>

      {/* Card 5: Advanced Array Methods */}
      <div id="advanced-arrays">
        <ConceptCard
          title="Advanced Array Methods — flat, flatMap &amp; Chaining"
          emoji="🚀"
          difficulty="beginner"
          whatIsIt="flat() nested arrays ko flatten karta hai — ek level ya specified depth tak. flatMap() map + flat(1) combine karta hai — ek element se multiple elements generate karo aur flatten karo ek step mein. Array chaining multiple methods ek pipeline mein combine karta hai — readable data transformations. flatMap ek powerful trick deta hai: empty array return karo element exclude karne ke liye — filter aur map ek saath!"
          whenToUse={[
            'flat(): nested API responses flatten karne ke liye',
            'flatMap(): ek element se multiple elements generate karna — expand karna',
            'Method chaining: step-by-step data transformation pipeline',
            'Array.from + map: indexed arrays banane ke liye',
          ]}
          whyUseIt="flatMap() ek common pattern solve karta hai: ek array element se 0 ya multiple elements generate karna. Chaining se complex transformations readable pipelines mein convert hoti hain — intermediate variables ki zaroorat nahi. Ye patterns data-heavy applications mein — dashboards, reports, feeds — daily use hote hain."
          howToUse={{
            filename: 'advanced-arrays.js',
            language: 'javascript',
            code: `// flat() — nested arrays flatten karo
const nested = [1, [2, 3], [4, [5, 6]]]
nested.flat()    // [1, 2, 3, 4, [5, 6]] — 1 level
nested.flat(2)   // [1, 2, 3, 4, 5, 6] — 2 levels
nested.flat(Infinity) // Completely flat

// Real use case: API returns nested categories
const categories = [
  { name: 'Electronics', subItems: ['Phones', 'Laptops'] },
  { name: 'Clothing', subItems: ['Shirts', 'Pants', 'Shoes'] },
]
const allItems = categories.map(c => c.subItems).flat()
// ['Phones', 'Laptops', 'Shirts', 'Pants', 'Shoes']

// flatMap() — map + flat(1) in one step
const sameResult = categories.flatMap(c => c.subItems)
// Same result, more efficient

// flatMap — conditional inclusion (filter + map in one)
const data = [1, -2, 3, -4, 5]
const positiveDoubled = data.flatMap(x => x > 0 ? [x * 2] : [])
// [2, 6, 10] — negative numbers excluded

// Method chaining — data pipeline
const sales = [
  { month: 'Jan', rep: 'Rahul', amount: 15000 },
  { month: 'Jan', rep: 'Priya', amount: 22000 },
  { month: 'Feb', rep: 'Rahul', amount: 18000 },
  { month: 'Feb', rep: 'Priya', amount: 12000 },
  { month: 'Jan', rep: 'Aman', amount: 9000 },
]

const janTopReps = sales
  .filter(s => s.month === 'Jan')        // only January
  .sort((a, b) => b.amount - a.amount)  // sort by amount desc
  .slice(0, 2)                          // top 2
  .map(s => ({ rep: s.rep, sale: s.amount })) // clean output

// Unique values with Set + Array.from
const tags = ['js', 'node', 'js', 'react', 'node', 'ts']
const uniqueTags = [...new Set(tags)]  // ['js', 'node', 'react', 'ts']`,
            explanation: 'flatMap conditional mapping ke liye powerful hai — empty array return karo exclude karne ke liye, single-element array return karo include karne ke liye, multi-element array return karo expand karne ke liye. Method chaining readable pipelines banata hai — intermediate lets ki zaroorat nahi.',
          }}
          realWorldScenario="Blog platform mein: posts.flatMap(post => post.tags) — har post ke tags collect karo ek flat list mein. E-commerce: categories.flatMap(cat => cat.products).filter(p => p.inStock).sort((a,b) => a.price - b.price) — sab in-stock products sorted. Social media feed: combine aur process multiple sources ki posts."
          commonMistakes={[
            {
              mistake: 'flat() Infinity ke saath performance issue',
              why: 'Bahut deeply nested aur large arrays pe flat(Infinity) slow ho sakta hai.',
              fix: 'Known depth pe flat() use karo ya recursive flatten implement karo early termination ke saath.',
            },
            {
              mistake: 'Chaining ke andar impure operations — side effects',
              why: 'Chain ke beech mein console.log, API calls — debugging confusing ho jaata hai.',
              fix: 'Chain pure rakhho. Debug ke liye temporary variable use karo ya tap pattern: .map(x => { console.log(x); return x; }).',
            },
          ]}
          proTip="flatMap empty array return karo elements ko filter karne ke liye — filter + map ek step mein: arr.flatMap(x => shouldInclude(x) ? [transform(x)] : []). Ye powerful pattern hai jab transform aur filter dono ho!"
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 5 Quiz — Arrays Ka Asli Test
          </h3>
          <p className="text-sm text-[#71717A]">map, filter, reduce — ye teeno clear hain? 5 sawaal, 80%+ chahiye clear karne ke liye!</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="arrays" />
      </div>
    </div>
  )
}
