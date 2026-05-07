'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const listsQuiz: QuizQuestion[] = [
  {
    question: 'key prop kyu zaroori hai lists mein?',
    options: [
      { text: 'CSS styling ke liye', correct: false, explanation: 'key styling se related nahi — React internal reconciliation ke liye hai.' },
      { text: 'React ko batata hai kaunsa element kaunsa hai — efficient updates ke liye', correct: true, explanation: 'Sahi! React key se identify karta hai kaunsa element update hua, add hua, ya remove hua — minimal DOM operations.' },
      { text: 'Event handling ke liye', correct: false, explanation: 'key event handling se directly related nahi.' },
      { text: 'Accessibility ke liye', correct: false, explanation: 'key accessibility attribute nahi — internal React optimization ke liye hai.' },
    ],
  },
  {
    question: 'Array index ko key kyon nahi use karna chahiye?',
    options: [
      { text: 'Performance slow hoti hai', correct: false, explanation: 'Performance immediate issue nahi — correctness issue hai.' },
      { text: 'Items reorder ya delete hone pe keys shift ho jaate hain — wrong items update ho sakte hain', correct: true, explanation: 'Bilkul! Delete item 0 — sab indexes shift. React wrong items match karta hai — bugs aur lost state.' },
      { text: 'React index accept nahi karta', correct: false, explanation: 'React index accept karta hai — recommended nahi hai.' },
      { text: 'TypeScript error deta hai', correct: false, explanation: 'TypeScript index as key se error nahi deta.' },
    ],
  },
  {
    question: 'Conditional rendering ke liye && operator ka edge case kya hai?',
    options: [
      { text: 'Koi edge case nahi', correct: false, explanation: 'Ek important edge case hai — 0 wala.' },
      { text: '0 && <Component /> render karta hai "0" ko screen pe — unexpected!', correct: true, explanation: 'Sahi! 0 falsy hai lekin JSX mein render hota hai as text "0". items.length && <List /> — 0 items pe "0" dikhega!' },
      { text: 'null render hota hai string ki tarah', correct: false, explanation: 'null aur undefined JSX mein render nahi hote — sirf 0 wala issue hai.' },
      { text: 'undefined error throw karta hai', correct: false, explanation: 'undefined JSX mein silently nothing render karta hai.' },
    ],
  },
  {
    question: 'React.Fragment kab use karte hain?',
    options: [
      { text: 'Hamesha — div better hai', correct: false, explanation: 'Fragment better hai jab wrapper div DOM mein add nahi karna.' },
      { text: 'Jab multiple elements return karne ho bina extra DOM node ke', correct: true, explanation: 'Bilkul! Fragment (<> </>) DOM mein koi element add nahi karta — sirf grouping ke liye. CSS layouts mein bahut useful.' },
      { text: 'Sirf performance optimization ke liye', correct: false, explanation: 'Fragment primarily DOM cleanliness ke liye, secondary performance benefit.' },
      { text: 'Sirf class components mein', correct: false, explanation: 'Fragment functional aur class dono components mein kaam karta hai.' },
    ],
  },
  {
    question: 'Nested list render karne ka sahi pattern kya hai?',
    options: [
      { text: 'Single map se sab handle karo', correct: false, explanation: 'Nested data ke liye nested map naturally fits.' },
      { text: 'Outer map mein inner map karo — har level ke liye unique key', correct: true, explanation: 'Sahi! Outer items ke liye outer key, inner items ke liye inner key — dono levels unique hone chahiye apne scope mein.' },
      { text: 'Flatten karo pehle, phir single map karo', correct: false, explanation: 'Flatten approach valid hai lekin structure lose hota hai — nested render better hoti hai usually.' },
      { text: 'Nested lists React support nahi karta', correct: false, explanation: 'React nested lists bilkul support karta hai — natural pattern hai.' },
    ],
  },
]

export default function ReactChapter6Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.06)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Lists & Conditional Rendering — Dynamic UI
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Real apps mein data dynamic hota hai — lists render karo, conditions pe content show/hide karo. React mein ye JavaScript se hota hai — map() lists ke liye, ternary/&& conditions ke liye. Key prop list performance aur correctness ke liye critical hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum .map() se lists, key prop gotchas, conditional rendering patterns, aur complex data structures cover karenge.
        </p>
      </div>

      <div id="rendering-lists">
        <ConceptCard
          title="Lists Render Karna — map() Ka Sahi Use"
          emoji="📋"
          difficulty="beginner"
          whatIsIt="React mein lists JavaScript array.map() se render hoti hain — har item ke liye JSX return karo. Array of JSX elements React render karta hai. map() pure function — original array mutate nahi karta, new array return karta hai. Every rendered list item ko unique key prop chahiye."
          whenToUse={[
            'Array data se UI elements banana — products, users, todos',
            'Dynamic content — API se aaya data render karna',
            'Repetitive UI — similar structure, different data',
            'Search results, filtered lists',
          ]}
          whyUseIt="map() declarative approach — kya render karna hai ye batao, React figure out karta hai kaise. Array transform karo JSX elements mein — natural fit. filter + map chaining se complex queries possible. Pure function — original data safe."
          howToUse={{
            filename: 'RenderLists.tsx',
            language: 'tsx',
            code: `interface Product {
  id: string
  name: string
  price: number
  category: string
  inStock: boolean
}

const products: Product[] = [
  { id: '1', name: 'Laptop', price: 50000, category: 'Electronics', inStock: true },
  { id: '2', name: 'Mouse', price: 1500, category: 'Electronics', inStock: true },
  { id: '3', name: 'Desk', price: 8000, category: 'Furniture', inStock: false },
]

// ── BASIC MAP ─────────────────────────────────────────────────────
function ProductList() {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} — ₹{product.price}
        </li>
      ))}
    </ul>
  )
}

// ── WITH COMPONENT ────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>₹{product.price.toLocaleString('en-IN')}</p>
      <span>{product.category}</span>
      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
    </div>
  )
}

function ProductGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// ── FILTER + MAP ──────────────────────────────────────────────────
function ElectronicsInStock() {
  const available = products
    .filter(p => p.category === 'Electronics' && p.inStock)
    .map(p => <ProductCard key={p.id} product={p} />)

  if (available.length === 0) {
    return <p>Koi electronics available nahi</p>
  }

  return <div>{available}</div>
}

// ── VARIABLE APPROACH — Readable ──────────────────────────────────
function ProductListReadable() {
  const productItems = products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))

  return (
    <section>
      <h2>Products ({products.length})</h2>
      <div className="grid">{productItems}</div>
    </section>
  )
}`,
            explanation: 'map() array ko JSX array mein convert karta hai. Har element ke liye key prop required. filter().map() chain se subset render karo. Variable mein store karo agar JSX complex ho — readability better. Component extract karo agar item complex ho — ProductCard.',
          }}
          realWorldScenario="E-commerce product listing: API se products array fetch karo, filter karo category/price, sort karo, phir map karo ProductCard components. Each card gets key=product.id. Pagination — slice(page * limit, (page+1) * limit) phir map."
          commonMistakes={[
            {
              mistake: 'forEach use karna map ki jagah',
              why: 'forEach returns undefined — JSX array nahi milti. React kuch render nahi karta.',
              fix: 'map use karo — return value use karta hai. Har callback mein JSX return karo.',
            },
            {
              mistake: 'Key prop component ke andar set karna',
              why: 'Key outer element (map ka direct return) pe hona chahiye, nahi inner component ke root pe.',
              fix: 'products.map(p => <ProductCard key={p.id} product={p} />) — key map ka direct child element pe.',
            },
          ]}
          proTip="Long lists ke liye react-window ya react-virtualized — sirf visible items render karo. 10,000 items list without virtualization — slow aur memory heavy. Virtualization se 60fps smooth scrolling even with million items. Tailwind CSS mein grid-cols-{n} se responsive grids."
        />
      </div>

      <div id="key-prop">
        <ConceptCard
          title="key Prop — React Ka Hidden Magic"
          emoji="🗝️"
          difficulty="beginner"
          whatIsIt="key prop React ko batata hai list items ko kaise identify karo — reordering, add, delete pe efficient updates. Key stable, unique within list honi chahiye. Index as key — items reorder ya delete hone pe wrong behavior. String ya number key acceptable — object nahi."
          whenToUse={[
            'Hamesha .map() mein — no exception',
            'Stable IDs — database IDs best',
            'Content-based keys — agar ID nahi, unique content use karo',
            'crypto.randomUUID() — agar really koi ID nahi (render ke bahar generate karo!)',
          ]}
          whyUseIt="Key se React reconciliation sahi hoti hai — element kahan move hua, kaunsa add hua, kaunsa delete hua. Wrong key (index) se inputs ke saath bug: delete item 0 — React thinks item 0 is still there, input value wrong item mein shift. State bhi wrong item mein rehti hai."
          howToUse={{
            filename: 'KeyProp.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

// ── KEY BEST PRACTICES ────────────────────────────────────────────

interface Todo {
  id: string  // Always have stable IDs!
  text: string
  done: boolean
}

// ✅ Database ID as key — perfect
function GoodList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>  // Stable, unique ID
      ))}
    </ul>
  )
}

// ❌ Index as key — problematic
function BadList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>  // Index shifts on delete!
      ))}
    </ul>
  )
}

// ── DEMONSTRATION — Index key bug ────────────────────────────────
function KeyBugDemo() {
  const [items, setItems] = useState([
    { id: 'a', label: 'Item A' },
    { id: 'b', label: 'Item B' },
    { id: 'c', label: 'Item C' },
  ])

  return (
    <div>
      <h3>Delete first item aur input values dekho</h3>
      <button onClick={() => setItems(prev => prev.slice(1))}>
        Delete First Item
      </button>

      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        <div>
          <h4>❌ Index Key (Bug!)</h4>
          {items.map((item, index) => (
            <div key={index}>    {/* Index key — wrong! */}
              <span>{item.label}: </span>
              <input placeholder="Type something..." />
              {/* Input value stays when item deleted — mismatched! */}
            </div>
          ))}
        </div>

        <div>
          <h4>✅ ID Key (Correct)</h4>
          {items.map(item => (
            <div key={item.id}>  {/* Stable ID — correct! */}
              <span>{item.label}: </span>
              <input placeholder="Type something..." />
              {/* Input correctly associated with item */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── KEY TO FORCE RE-MOUNT ─────────────────────────────────────────
// Pro technique: key change se component unmount + remount
function UserProfile({ userId }: { userId: string }) {
  const [data, setData] = useState(null)

  // Naya userId pe component fresh mount hoga
  // State reset, effects re-run — clean slate!
  return (
    <ProfileInner key={userId} userId={userId} />
  )
}`,
            explanation: 'key stable unique string honi chahiye apne parent mein. Database IDs perfect hain. Index tab okay hai jab list static hai (never reorder, delete, insert in middle). key change se React component unmount + remount karta hai — state reset technique.',
          }}
          realWorldScenario="Chat app: messages array mein message.id as key. Naya message aane pe sirf naya item DOM mein add hota hai — poora list re-render nahi. Delete pe specific item remove hota hai. Bina key ya wrong key — React inefficiently sab re-render karta hai."
          commonMistakes={[
            {
              mistake: 'Math.random() ya Date.now() as key render mein',
              why: 'Har render pe naya key — React har bar unmount + remount karta hai! Performance destroy.',
              fix: 'Keys stable honi chahiye across renders. IDs generate karo data creation pe — render mein nahi.',
            },
            {
              mistake: 'Key globally unique honi chahiye samajhna',
              why: 'Key sirf siblings mein unique honi chahiye — same key alag lists mein okay hai.',
              fix: 'Key uniqueness scope: apne parent ke siblings ke beech. Global uniqueness zaroorat nahi.',
            },
          ]}
          proTip="key change karna forced re-mount technique hai — jab prop change pe full reset chahiye (not just update). const [resetKey, setResetKey] = useState(0); <FormComponent key={resetKey} />; <button onClick={() => setResetKey(k => k+1)}>Reset Form</button>. Clean unmount + fresh mount — all state and effects reset."
        />
      </div>

      <div id="conditional-rendering">
        <ConceptCard
          title="Conditional Rendering — Show/Hide Logic"
          emoji="🔀"
          difficulty="beginner"
          whatIsIt="React mein conditional rendering JavaScript se hoti hai — ternary operator, && operator, if/else, switch. Null ya undefined return karo — kuch render nahi hoga. Early return pattern se deeply nested conditionals avoid karo. Ternary se A ya B, && se A ya nothing."
          whenToUse={[
            'Loading state — spinner show karo',
            'Error state — error message show karo',
            'Empty state — no data message',
            'Authentication — login/dashboard show',
          ]}
          whyUseIt="Conditional rendering se dynamic UIs banate hain — same component different states pe different UI. Loading, error, empty, success — sab different experience. if/else ya ternary — whatever readable hai. React null render nahi karta — conditional return safe."
          howToUse={{
            filename: 'ConditionalRendering.tsx',
            language: 'tsx',
            code: `interface User {
  name: string
  role: 'admin' | 'user'
}

// ── TERNARY — A or B ──────────────────────────────────────────────
function UserGreeting({ user }: { user: User | null }) {
  return (
    <div>
      {user !== null ? (
        <h2>Namaste, {user.name}!</h2>
      ) : (
        <h2>Please login karo</h2>
      )}
    </div>
  )
}

// ── && — Show or Nothing ─────────────────────────────────────────
function AdminPanel({ user }: { user: User }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {/* Only render if admin */}
      {user.role === 'admin' && (
        <button>Admin Settings</button>
      )}

      {/* ❌ DANGEROUS — 0 renders as "0"! */}
      {/* {items.length && <List items={items} />} */}

      {/* ✅ Correct — boolean convert karo */}
      {items.length > 0 && <List items={items} />}
      {/* ya */}
      {!!items.length && <List items={items} />}
    </div>
  )
}

// ── EARLY RETURN — Cleaner for multiple states ────────────────────
function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!user) return <NotFound />

  // Main content — no nesting!
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// ── SWITCH — Multiple variants ────────────────────────────────────
type Status = 'loading' | 'error' | 'empty' | 'success'

function StatusDisplay({ status, data }: { status: Status; data?: string[] }) {
  switch (status) {
    case 'loading': return <div>Loading...</div>
    case 'error': return <div>Error aaya!</div>
    case 'empty': return <div>Koi data nahi</div>
    case 'success': return <ul>{data?.map(d => <li key={d}>{d}</li>)}</ul>
  }
}

// ── OBJECT MAP — Cleaner switch ────────────────────────────────────
const statusComponents: Record<Status, React.ReactNode> = {
  loading: <Spinner />,
  error: <ErrorMessage error={new Error('Failed')} />,
  empty: <EmptyState />,
  success: <div>Success!</div>,
}

function StatusDisplayV2({ status }: { status: Status }) {
  return statusComponents[status] ?? null
}

// ── RENDER NOTHING ────────────────────────────────────────────────
function ConditionalWrapper({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null  // Nothing rendered
  return <div>{children}</div>
}`,
            explanation: 'Ternary A ya B. && A ya nothing (0 bug aware!). Early return cleaner for multi-state. Null return karo — nothing rendered. Object map elegant switch replacement. JSX mein if/else nahi — ternary ya && ya function call.',
          }}
          realWorldScenario="API data fetching: loading → spinner, error → error card with retry button, empty → empty state illustration with CTA, success → content. Early return pattern se code flat aur readable — nested ternaries avoid karo."
          commonMistakes={[
            {
              mistake: 'items.length && <List /> — "0" renders on screen',
              why: 'items.length = 0 — 0 is falsy lekin JSX mein render hota hai as "0". Unexpected text.',
              fix: 'items.length > 0 && <List /> ya !!items.length && <List />.',
            },
            {
              mistake: 'Deeply nested ternaries',
              why: 'cond1 ? A : cond2 ? B : cond3 ? C : D — unreadable, hard to debug.',
              fix: 'Early return pattern ya separate component/function. Switch ya object map.',
            },
          ]}
          proTip="Skeleton loading better UX deta hai spinner se — actual content shape ke placeholder dono. react-loading-skeleton library se easy. Suspense (React 18) ke saath better loading states — fallback prop pe Skeleton component. Error boundaries async errors catch karte hain."
        />
      </div>

      <div id="rendering-nothing">
        <ConceptCard
          title="Null, Undefined, Fragments — Render Control"
          emoji="🔵"
          difficulty="beginner"
          whatIsIt="JSX mein null aur undefined kuch render nahi karte. 0 aur '' render hote hain — aware raho. Fragments (<> </>) multiple elements group karte hain bina DOM node ke. React.Fragment key prop support karta hai (short syntax nahi). Boolean values render nahi hote."
          whenToUse={[
            'Component kuch render nahi kare — null return karo',
            'Multiple elements bina wrapper div — Fragment',
            'Table rows, flex children — Fragment zaroori',
            'key prop ke saath — React.Fragment',
          ]}
          whyUseIt="Null return se component invisible hota hai — CSS display:none se alag (DOM mein nahi). Fragment se CSS layout maintain hota hai — extra div flex/grid break nahi karta. Boolean expressions cleanup — true/false render nahi hote."
          howToUse={{
            filename: 'Fragments.tsx',
            language: 'tsx',
            code: `import { Fragment } from 'react'

// ── NULL — Render nothing ─────────────────────────────────────────
function ConditionalBanner({ showBanner }: { showBanner: boolean }) {
  if (!showBanner) return null  // Component completely absent from DOM!

  return (
    <div className="banner">
      Special offer aaj tak!
    </div>
  )
}

// ── FRAGMENTS — No extra DOM node ────────────────────────────────
// Short syntax — no key prop
function NameParts({ firstName, lastName }: { firstName: string; lastName: string }) {
  return (
    <>
      <span>{firstName}</span>
      <span>{lastName}</span>
    </>
  )
}

// React.Fragment — with key prop (in lists)
function Glossary({ items }: { items: { term: string; description: string }[] }) {
  return (
    <dl>
      {items.map(item => (
        <Fragment key={item.term}>  {/* Key prop support! */}
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

// ── TABLE ROWS — Fragment essential ──────────────────────────────
function TableRow({ user }: { user: { name: string; email: string; role: string } }) {
  return (
    <>  {/* Fragment — tr ke andar div nahi hoga */}
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </>
  )
}

function UserTable({ users }: { users: { id: string; name: string; email: string; role: string }[] }) {
  return (
    <table>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <TableRow user={user} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ── VALUES THAT DO/DON'T RENDER ────────────────────────────────────
function RenderingDemo() {
  return (
    <div>
      {null}          {/* Nothing */}
      {undefined}     {/* Nothing */}
      {false}         {/* Nothing */}
      {true}          {/* Nothing! Boolean = nothing */}
      {0}             {/* "0" RENDERS! Careful */}
      {''}            {/* Empty string — nothing visible */}
      {NaN}           {/* "NaN" RENDERS! */}
      {0n}            {/* "0" renders — BigInt */}
    </div>
  )
}`,
            explanation: 'null, undefined, false, true — kuch render nahi hote. 0, NaN, "" render hote hain (caution!). Fragment DOM mein koi element add nahi karta. React.Fragment key prop support karta hai — short syntax <> </> nahi. Table, flex, grid layouts mein Fragment zaroori.',
          }}
          realWorldScenario="Navigation bar: admin links sirf admins ke liye. {user.isAdmin && <Fragment><AdminLink /><ManageUsersLink /></Fragment>}. Multiple links ek condition se — Fragment ke andar. Ek DOM node add nahi hota — nav layout clean rehta hai."
          commonMistakes={[
            {
              mistake: 'display: none CSS vs null return confuse karna',
              why: 'display:none element DOM mein rahta hai — space occupy nahi karta but accessible tree mein hai. null component DOM mein nahi.',
              fix: 'Completely absent — null return karo. Visibility toggle with animation — CSS ya class use karo.',
            },
            {
              mistake: '<></> use karna jab key prop chahiye list mein',
              why: 'Short syntax key prop accept nahi karta — React warning.',
              fix: 'import { Fragment } from "react"; <Fragment key={item.id}>...</Fragment>',
            },
          ]}
          proTip="Portal se content render karo DOM tree ke bahar — dialog, toast, tooltip parent overflow hide se bachne ke liye. ReactDOM.createPortal(<Modal />, document.body) — Modal body mein render hota hai lekin React tree mein parent ka child hai — events correctly bubble."
        />
      </div>

      <div id="nested-lists">
        <ConceptCard
          title="Nested Lists — Complex Data Structures"
          emoji="🌳"
          difficulty="beginner"
          whatIsIt="Nested data ke liye nested map — categories with products, departments with employees, comments with replies. Each level ko unique key chahiye apne siblings mein. Recursive components tree-like data handle karte hain elegantly. Flat data se nested structure build karna — parent-child relationships."
          whenToUse={[
            'Category → Products hierarchy',
            'Department → Team → Employee',
            'Comments with nested replies',
            'File system tree — folders and files',
          ]}
          whyUseIt="Nested map naturally hierarchical data represent karta hai. Recursive components unlimited depth handle karte hain. Key uniqueness sirf sibling level pe — different parent ke same keys okay hain. Complex data structures elegantly render hoti hain readable code mein."
          howToUse={{
            filename: 'NestedLists.tsx',
            language: 'tsx',
            code: `interface Category {
  id: string
  name: string
  products: Product[]
}

interface Product {
  id: string
  name: string
  price: number
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    products: [
      { id: 'laptop', name: 'Laptop', price: 50000 },
      { id: 'phone', name: 'Phone', price: 30000 },
    ],
  },
  {
    id: 'furniture',
    name: 'Furniture',
    products: [
      { id: 'desk', name: 'Desk', price: 8000 },
      { id: 'chair', name: 'Chair', price: 5000 },
    ],
  },
]

// ── NESTED MAP ────────────────────────────────────────────────────
function CatalogView() {
  return (
    <div>
      {categories.map(category => (
        <section key={category.id}>  {/* Outer key — category.id */}
          <h2>{category.name}</h2>
          <ul>
            {category.products.map(product => (
              <li key={product.id}>  {/* Inner key — product.id */}
                {product.name} — ₹{product.price}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

// ── RECURSIVE COMPONENT — File tree ──────────────────────────────
interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
}

function FileTree({ nodes, depth = 0 }: { nodes: FileNode[]; depth?: number }) {
  return (
    <ul style={{ paddingLeft: depth * 16 + 'px' }}>
      {nodes.map(node => (
        <li key={node.id}>
          <span>{node.type === 'folder' ? '📁' : '📄'} {node.name}</span>

          {/* Recursive call for children */}
          {node.type === 'folder' && node.children && node.children.length > 0 && (
            <FileTree nodes={node.children} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  )
}

// ── COMMENTS WITH REPLIES ─────────────────────────────────────────
interface Comment {
  id: string
  author: string
  text: string
  replies: Comment[]
}

function CommentThread({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <strong>{comment.author}</strong>
          <p>{comment.text}</p>

          {comment.replies.length > 0 && (
            <div className="replies ml-8 border-l-2 pl-4">
              <CommentThread comments={comment.replies} />  {/* Recursive! */}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}`,
            explanation: 'Nested map — outer category key, inner product key. Keys unique hone chahiye apne level pe — electronics category mein laptop key, furniture mein bhi laptop ho sakta hai (alag parent). Recursive component unlimited depth handle karta hai — FileTree calls itself for children.',
          }}
          realWorldScenario="E-commerce navigation: categories → subcategories → brands ka mega menu. Nested map se 3-level hierarchy render karo. Recursive FileTree se code editors mein file explorer. Comments section nested replies support karta hai — Reddit-style threading."
          commonMistakes={[
            {
              mistake: 'Recursive component mein base case bhoolna',
              why: 'Infinite recursion — stack overflow, browser crash.',
              fix: 'Base case check karo: if (!nodes || nodes.length === 0) return null. Ya depth limit lagao.',
            },
            {
              mistake: 'Nested lists mein outer key bhoolna',
              why: 'React warning: list item ke bina key. Performance degradation.',
              fix: 'Har map() ke direct return pe key prop — outer aur inner dono.',
            },
          ]}
          proTip="Flat data normalize karo jab possible — parent_id se tree build karo on render. Database mein flat better hai — queries efficient. Frontend pe tree structure build karo: const tree = buildTree(flatData). Normalizr ya immer compatible nested-to-flat conversion libraries available hain."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 6 Quiz — Lists & Conditional Rendering
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — dynamic UI master karo!
          </p>
        </div>
        <QuizSection questions={listsQuiz} chapterSlug="lists-conditional" />
      </div>
    </div>
  )
}
