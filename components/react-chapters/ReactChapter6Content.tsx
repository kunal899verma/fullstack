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
          Ab real apps banate hain — dynamic data, dynamic UI. Products array hai — render karo. User logged in hai ya nahi — different UI. Data load ho raha hai — spinner dikhao. React mein ye sab JavaScript se hota hai — koi special template syntax nahi. .map() lists ke liye, ternary/&& conditions ke liye. Aur key prop — ye sirf warning ki baat nahi, ye correctness ki baat hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein .map() patterns, key prop ke real gotchas, conditional rendering ke saare patterns, aur complex nested data structures cover karenge.
        </p>
      </div>

      <div id="rendering-lists">
        <ConceptCard
          title="Lists Render Karna — map() Ka Sahi Use"
          emoji="📋"
          difficulty="beginner"
          whatIsIt="React mein lists .map() se render hoti hain — ye JavaScript ka map(), koi React-specific function nahi. Array leke JSX array return karo. React JSX arrays ko render kar sakta hai. map() pure function hai — original array safe, naya array return. Har item ke liye key prop mandatory hai — warning sirf nahi, actual reconciliation issue hoti hai bina key ke."
          whenToUse={[
            'Array data se UI elements banana — products, users, todos',
            'Dynamic content — API se aaya data render karna',
            'Repetitive UI — similar structure, different data',
            'Search results, filtered lists',
          ]}
          whyUseIt="Koi Angular-jaise ngFor directive nahi, koi Vue-jaise v-for nahi — sirf JavaScript ka .map(). Ye React ka beauty hai — JavaScript hi template engine hai. filter().map() chaining se complex queries: in-stock electronics sort by price — ek expression. Data transform karo, UI describe karo — React render karta hai. Pure function — original array untouched."
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
            explanation: 'map() array ko JSX array mein convert karta hai — React JSX arrays render karta hai. Key prop har element pe required. filter().map() chain natural hai — pehle filter, phir convert. Complex map ke liye: variable mein store karo, ya component extract karo. ProductCard component extract karna map ko readable banata hai aur component reusable.',
          }}
          realWorldScenario="Meesho ya Flipkart listing page — API se products array aata hai. Filter karo (category, price range, rating), sort karo (price low to high), paginate karo (slice), phir map karo ProductCard components mein. Sab JavaScript array methods — filter, sort, slice, map — chain karo. Ye JS knowledge directly React mein use hoti hai."
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
          proTip="forEach use karna map ki jagah — ye nahin chalega. forEach undefined return karta hai — JSX array nahi milti, kuch render nahi hoga. Koi error nahi, sirf blank screen. Hamesha map use karo aur har item mein JSX return karo. Ye common mistake beginners karte hain aur dhundna mushkil hota hai."
        />
      </div>

      <div id="key-prop">
        <ConceptCard
          title="key Prop — React Ka Hidden Magic"
          emoji="🗝️"
          difficulty="beginner"
          whatIsIt="Key prop React ke reconciliation algorithm ke liye hai. Jab list update hoti hai — items add/remove/reorder — React ko jaanna chahiye kaunsa element kaunsa hai. Key se React track karta hai — 'ye wahi item hai jo pehle tha, sirf position badli.' Bina key ya wrong key — React assume karta hai poori list change hui, everything re-render. Index as key — items delete/reorder hone pe wrong items update hote hain, input state galat elements se bind hoti hai."
          whenToUse={[
            'Hamesha .map() mein — no exception',
            'Stable IDs — database IDs best',
            'Content-based keys — agar ID nahi, unique content use karo',
            'crypto.randomUUID() — agar really koi ID nahi (render ke bahar generate karo!)',
          ]}
          whyUseIt="Index key ka bug demonstrate karo — 3 items, har item mein input box. Item A, B, C. Input A mein 'hello' type karo. Ab Item A delete karo — B ab index 0 pe aa gaya. React old key 0 se match karta hai — sochta hai A abhi bhi hai, sirf content change hua. Input A ka text B mein shift ho jaata hai. User ne B mein kuch type nahi kiya tha — but A ka text wahan hai. Ye invisible bug hai production mein."
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
            explanation: 'Best key = database ID. Hamesha stable, unique. Index sirf static lists ke liye okay hai — add/remove/reorder kabhi nahi hoga. Key globally unique honi zaroori nahi — sirf siblings mein unique hona chahiye. Key change technique — <Component key={resetId} /> — component completely remount hota hai, state reset. Ye intentional use case hai.',
          }}
          realWorldScenario="WhatsApp Web jaise chat app — messages array mein message.id as key. Naya message aane pe? Sirf wahi ek item DOM mein add hota hai — 100 purane messages? Untouched. Delete pe? Sirf wahi specific item remove. Bina proper key ya index key se — React poori list re-render karta hai unnecessarily. Performance aur correctness dono suffer karte hain."
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
          proTip="Math.random() ya Date.now() as key — kabhi mat karo render ke andar. Ye values har render pe change hoti hain — React har baar component unmount + remount karta hai. Performance destroy, state lost, effects re-run. Keys stable honi chahiye across renders. IDs generate karo data creation pe — render function ke bahar. Ye mistake dhundna bahut mushkil hai."
        />
      </div>

      <div id="conditional-rendering">
        <ConceptCard
          title="Conditional Rendering — Show/Hide Logic"
          emoji="🔀"
          difficulty="beginner"
          whatIsIt="Conditional rendering React mein pure JavaScript hai — koi ngIf nahi, koi v-show nahi. Ternary operator, &&, early return, switch — ye sab JavaScript constructs hain jo JSX mein kaam karte hain. Null ya undefined return karo — kuch render nahi hoga, DOM mein koi trace nahi. Ye CSS display:none se alag hai — null mein element DOM mein hi nahi hota."
          whenToUse={[
            'Loading state — spinner show karo',
            'Error state — error message show karo',
            'Empty state — no data message',
            'Authentication — login/dashboard show',
          ]}
          whyUseIt="Ye chapter pehle JSX chapter mein touch kiya tha — ab detail mein jaate hain. Ek component ek nahi, kai states handle karta hai: loading, error, empty, success. Har state ka alag UI. Early return pattern se multiple states cleanly handle karo — no deep nesting. Ternary do options ke liye clean hai. && optional element ke liye — 0 wala bug aware raho. Pattern choose karo readability ke hisaab se."
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
            explanation: 'Ternary = 2 options. && = 1 option ya nothing (0 bug — items.length > 0 use karo). Early return = multiple states cleanly. Object map = elegant switch replacement. JSX mein if/else directly nahi — function body mein use karo ya ternary/&&. Display:none vs null — null DOM mein element nahi banata, display:none element banata hai but hide karta hai.',
          }}
          realWorldScenario="Dashboard widget — data fetch karo: loading hone pe skeleton loader dikhao, error pe error card with retry button, data empty pe illustration with 'Add your first item' CTA, data hai pe actual content. Ye chaar states ek typical component mein. Early return se pehle teen states handle karo, main JSX clean rehta hai — 0 nesting."
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
          proTip="Deeply nested ternaries — avoid karo. cond1 ? A : cond2 ? B : cond3 ? C : D — padhna mushkil, debug karna aur mushkil. Early return pattern ya object map use karo. Agar ternary ke andar ternary likhna pad raha hai — time hai function ya component extract karne ka. Readable code > clever code."
        />
      </div>

      <div id="rendering-nothing">
        <ConceptCard
          title="Null, Undefined, Fragments — Render Control"
          emoji="🔵"
          difficulty="beginner"
          whatIsIt="Ye sab values ka rendering behavior yaad karo: null, undefined, false, true — kuch render nahi hota (DOM empty). 0, '' (empty string), NaN — ye render hote hain! Ye React ka important gotcha hai. Fragment multiple elements group karta hai bina DOM node ke. React.Fragment key prop support karta hai — <> shorthand nahi. Ye distinctions real code mein matter karte hain."
          whenToUse={[
            'Component kuch render nahi kare — null return karo',
            'Multiple elements bina wrapper div — Fragment',
            'Table rows, flex children — Fragment zaroori',
            'key prop ke saath — React.Fragment',
          ]}
          whyUseIt="Null return se component DOM mein exist hi nahi karta — CSS display:none se fundamentally alag hai. display:none element DOM mein rehta hai, accessible tree mein rehta hai. null mein component poori tarah absent. Fragment se CSS layout intact rehta hai — extra div flex/grid break nahi karta. Table pe div invalid HTML — Fragment zaroori."
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
            explanation: 'Ye table yaad karo — null/undefined/false/true: DOM mein kuch nahi. 0/NaN/"": render hote hain. Fragment: DOM transparent, React tree mein group. React.Fragment key: lists mein multiple elements pair ke liye. Table cells ke andar <> </> — valid HTML, koi wrapper div nahi. Ye sab subtle lekin important distinctions hain.',
          }}
          realWorldScenario="Admin navigation bar — {user.isAdmin && <Fragment><AdminLink /><ManageUsersLink /><AuditLogsLink /></Fragment>}. Teen admin links ek condition se — Fragment mein wrap karo, ek bhi DOM node add nahi hota. Nav layout CSS intact. Non-admin users ko ye links DOM mein bhi nahi dikhte — null equivalent behavior. Clean, accessible, correct."
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
          proTip="<></> mein key prop dene ki koshish mat karo — ye syntax accept nahi karta. List mein multiple elements return karne hain? import {Fragment} from 'react' aur <Fragment key={item.id}>...</Fragment>. Ye distinction — <> vs Fragment — production code mein matter karta hai jab lists mein paired elements return karne hote hain."
        />
      </div>

      <div id="nested-lists">
        <ConceptCard
          title="Nested Lists — Complex Data Structures"
          emoji="🌳"
          difficulty="beginner"
          whatIsIt="Real data hierarchical hoti hai — categories mein products, departments mein teams mein employees, comments mein replies. Nested map naturally fit karta hai — outer level ek map, inner level doosra map. Key uniqueness rule: sirf siblings mein unique hona chahiye — alag parents ke same keys fine hain. Recursive components se unlimited depth handle karo — component khud ko call karta hai children ke liye."
          whenToUse={[
            'Category → Products hierarchy',
            'Department → Team → Employee',
            'Comments with nested replies',
            'File system tree — folders and files',
          ]}
          whyUseIt="Nested map code ki structure actual data ki structure mirror karta hai — readability naturally aati hai. Recursive component ka power — data ka depth runtime pe decide hota hai, compile time pe nahi. File tree, org chart, comment threads — sab unlimited depth. Base case hamesha define karo — infinite recursion se stack overflow."
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
            explanation: 'Outer map: category.id as key. Inner map: product.id as key. Dono apne siblings mein unique hain — alag categories ke same product IDs? Fine, alag parents hain. FileTree component khud ko call karta hai children ke saath — depth prop se indentation. Base case: nodes.length === 0 ya children undefined — recursion stop.',
          }}
          realWorldScenario="VSCode jaise editor mein file explorer — folders ke andar folders, files. Ye recursive tree structure hai. FileTree component ek bar likhte hain — koi bhi depth ka folder structure handle kar sakta hai. Reddit-style comment threads bhi same pattern — comment mein replies, replies mein replies. Ek component, infinite depth."
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
          proTip="Recursive component mein base case bhoolna — stack overflow guarantee hai. Browser crash. Hamesha pehle: if (!nodes || nodes.length === 0) return null. Ya depth limit lagao: if (depth > 10) return null (protection). Ye defense programming hai — data unexpected depth pe bhi app crash nahi karegi."
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
