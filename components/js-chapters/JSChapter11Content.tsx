'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const domQuiz: QuizQuestion[] = [
  {
    question: 'querySelector aur getElementById mein kya fark hai?',
    options: [
      { text: 'getElementById sirf ID se dhundta hai; querySelector koi bhi CSS selector accept karta hai', correct: true, explanation: 'Bilkul sahi! getElementById fast hai ID ke liye, lekin querySelector zyada flexible hai — class, attribute, pseudo-class sab kuch.' },
      { text: 'querySelector slow hai isliye use nahi karna chahiye', correct: false, explanation: 'querySelector thoda slower hai, lekin modern apps mein ye difference negligible hai.' },
      { text: 'Dono same kaam karte hain', correct: false, explanation: 'Nahi, dono different selectors accept karte hain.' },
      { text: 'getElementById deprecated ho gaya hai', correct: false, explanation: 'getElementById abhi bhi valid aur widely used hai.' },
    ],
  },
  {
    question: 'innerHTML aur textContent mein security ke lihaz se kya fark hai?',
    options: [
      { text: 'Koi fark nahi, dono same hain', correct: false, explanation: 'Ye ek dangerous assumption hai — dono mein bahut fark hai.' },
      { text: 'innerHTML HTML parse karta hai (XSS risk), textContent sirf text set karta hai (safe)', correct: true, explanation: 'Sahi! User input ko kabhi innerHTML mein mat daalo — XSS attack ho sakta hai. textContent hamesha safer option hai.' },
      { text: 'textContent deprecated hai', correct: false, explanation: 'textContent bilkul valid hai aur user data ke liye preferred hai.' },
      { text: 'innerHTML fast hai isliye use karna chahiye', correct: false, explanation: 'Performance ke liye bhi textContent ya createElement safer aur often equally fast hai.' },
    ],
  },
  {
    question: 'Event delegation kyun use karte hain?',
    options: [
      { text: 'Har element par listener lagane ki jagah ek parent par lagao', correct: true, explanation: 'Bilkul! Event delegation se memory efficient code likhte hain — especially dynamically add hone wale elements ke liye.' },
      { text: 'Events zyada fast fire hote hain', correct: false, explanation: 'Delegation se speed nahi badhti, efficiency badhti hai.' },
      { text: 'Sirf form elements ke liye kaam karta hai', correct: false, explanation: 'Event delegation kisi bhi element ke saath kaam karta hai.' },
      { text: 'removeEventListener required nahi hota', correct: false, explanation: 'Parent listener ko bhi cleanup karna chahiye jab zaroorat ho.' },
    ],
  },
  {
    question: 'classList.toggle() kya karta hai?',
    options: [
      { text: 'Sirf class add karta hai', correct: false, explanation: 'Sirf add nahi — toggle karta hai.' },
      { text: 'Agar class hai toh remove karta hai, nahi hai toh add karta hai', correct: true, explanation: 'Perfect! toggle() dark mode switches aur accordion UI ke liye bahut useful hai.' },
      { text: 'Saari classes remove karta hai', correct: false, explanation: 'Saari classes remove karne ke liye className = "" use karte hain.' },
      { text: 'CSS property set karta hai', correct: false, explanation: 'CSS property ke liye element.style.property use karte hain.' },
    ],
  },
  {
    question: 'Event bubbling kya hota hai?',
    options: [
      { text: 'Event sirf target element par fire hota hai', correct: false, explanation: 'Nahi, bubbling mein event parent elements tak bhi jaata hai.' },
      { text: 'Child element ka event parent elements tak propagate hota hai', correct: true, explanation: 'Sahi! Bubbling ki wajah se event delegation kaam karta hai — parent element pe listener lagao, child events catch hoti hain.' },
      { text: 'Event browser mein loop karta hai', correct: false, explanation: 'Bubbling DOM tree mein upar jaana hai, browser loop nahi.' },
      { text: 'addEventListener ka ek feature jo disable kar sakte hain', correct: false, explanation: 'Aap stopPropagation() se bubbling rok sakte ho, lekin ye default behavior hai.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function JSChapter11Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          DOM Manipulation — Browser Ka DNA
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          DOM (Document Object Model) ek tree structure hai jo browser HTML ko represent karta hai. JavaScript isse manipulate kar sakti hai — elements dhundh sakte ho, content badal sakte ho, events sun sakte ho. Yahi JavaScript ko &ldquo;interactive&rdquo; banata hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum DOM ka complete mastery karenge — selecting, modifying, creating, removing elements aur events — sab kuch production-ready patterns ke saath.
        </p>
      </div>

      {/* ConceptCard 1 */}
      <div id="dom-kya-hai">
        <ConceptCard
          title="DOM Kya Hai?"
          emoji="🌳"
          difficulty="intermediate"
          whatIsIt="DOM (Document Object Model) ek tree hai jismein har HTML element ek node hota hai. Browser HTML parse karke ye tree banata hai — JavaScript isse read aur modify kar sakti hai. Root node document hai, phir html, body, aur baaki elements."
          whenToUse={[
            'Web page ka content dynamically change karna ho',
            'User interactions pe response dena ho',
            'Single Page Applications (SPAs) banate waqt',
            'Form data collect aur validate karna ho',
          ]}
          whyUseIt="DOM manipulation se tum bina page reload ke content update kar sakte ho — yahi modern web apps ka foundation hai. React, Vue sab DOM ke upar hi kaam karte hain (Virtual DOM ke through). Direct DOM manipulation ki understanding bahut zaroori hai."
          howToUse={{
            filename: 'dom-basics.js',
            language: 'javascript',
            code: `// DOM tree structure:
// document
//   └── html
//       ├── head
//       └── body
//           ├── div#app
//           │   ├── h1.title
//           │   └── p.description
//           └── footer

// Nodes ke types:
// 1. Element nodes — <div>, <p>, etc.
// 2. Text nodes — element ke andar ka text
// 3. Comment nodes — <!-- comments -->

// document object — root of DOM
console.log(document.title)        // Page title
console.log(document.URL)          // Current URL
console.log(document.body)         // <body> element
console.log(document.head)         // <head> element

// DOM tree traverse karo:
const body = document.body
console.log(body.children)         // HTMLCollection of children
console.log(body.parentElement)    // <html>
console.log(body.firstElementChild) // First child element
console.log(body.nextElementSibling) // null (body has no sibling)

// Node vs Element:
const div = document.querySelector('div')
console.log(div.childNodes)     // NodeList — includes text nodes!
console.log(div.children)       // HTMLCollection — only element nodes`,
            explanation: 'DOM tree mein har HTML tag ek Element node hai. document se shuru karke kisi bhi element tak pahunch sakte ho. children sirf element nodes deta hai, childNodes sab kuch (text nodes bhi) deta hai.',
          }}
          realWorldScenario="Jab tum kisi e-commerce site par product filter karte ho — price range, category — JavaScript DOM manipulate karta hai: product cards hide/show karta hai, counter update karta hai, URL params change karta hai. Ye sab DOM manipulation hai bina page reload ke."
          commonMistakes={[
            {
              mistake: 'Script head mein daalna bina defer/async ke',
              why: 'HTML parse hone se pehle script run hoti hai — DOM elements exist nahi karte, querySelector null return karta hai.',
              fix: 'Script ko body ke end mein rakho, ya <script defer> use karo, ya DOMContentLoaded event wait karo.',
            },
            {
              mistake: 'childNodes aur children ko confuse karna',
              why: 'childNodes mein text nodes bhi hote hain (whitespace bhi!), children sirf element nodes deta hai.',
              fix: 'Element nodes ke liye hamesha children, firstElementChild, nextElementSibling use karo.',
            },
          ]}
          proTip="Browser DevTools Console mein $() shorthand querySelector ka hai aur $$() querySelectorAll ka. DOM debugging ke liye bahut useful hain. $0 last selected element ko reference karta hai Elements panel mein."
        />
      </div>

      {/* ConceptCard 2 */}
      <div id="selecting-elements">
        <ConceptCard
          title="Elements Select Karna"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="DOM mein elements dhundne ke liye multiple methods hain. querySelector aur querySelectorAll modern CSS selectors support karte hain. getElementById, getElementsByClassName, getElementsByTagName older methods hain lekin abhi bhi fast hain specific cases mein."
          whenToUse={[
            'Single element chahiye — querySelector ya getElementById',
            'Multiple elements chahiye — querySelectorAll ya getElementsByClassName',
            'Dynamic elements jo baad mein add hote hain — parent par select karke',
            'Complex CSS selectors use karne ho — querySelector',
          ]}
          whyUseIt="Correct selection method choose karna performance aur code clarity dono improve karta hai. querySelector zyada flexible hai, getElementById zyada performant hai. querySelectorAll static NodeList return karta hai, getElementsByClassName live HTMLCollection return karta hai — ye difference important hai."
          howToUse={{
            filename: 'selecting.js',
            language: 'javascript',
            code: `// Single element select karo
const byId = document.getElementById('main-title')
const byQuery = document.querySelector('#main-title')  // Same result

// CSS selectors with querySelector
const firstBtn = document.querySelector('.btn')               // First .btn
const submitBtn = document.querySelector('[type="submit"]')   // By attribute
const lastItem = document.querySelector('li:last-child')      // CSS pseudo
const nested = document.querySelector('.card > .title')       // Direct child

// Multiple elements
const allBtns = document.querySelectorAll('.btn')  // Static NodeList
const allLis = document.getElementsByTagName('li') // Live HTMLCollection!

// NodeList ko iterate karo
allBtns.forEach(btn => btn.classList.add('styled'))

// Array mein convert karo agar Array methods chahiye
const btnsArray = Array.from(allBtns)
// ya
const btnsArray2 = [...allBtns]

// Live vs Static collection:
const live = document.getElementsByClassName('item')   // Live — DOM changes reflect hoti hain
const static_ = document.querySelectorAll('.item')    // Static — snapshot

// Scoped query — sirf ek element ke andar dhundho
const container = document.querySelector('.container')
const innerBtn = container.querySelector('.btn')  // .container ke andar ka .btn`,
            explanation: 'querySelector/querySelectorAll modern aur flexible hain — inhe prefer karo. getElementById performance-critical cases mein fastest hai. Live collections (getElementsByClassName) DOM changes auto-reflect karte hain — kabhi kabhi useful, kabhi kabhi dangerous.',
          }}
          realWorldScenario="Jab tum modal component banate ho — button click pe modal show, overlay click pe hide — aap querySelector se modal aur overlay select karte ho, classList se show/hide toggle karte ho. Ye pattern har modern UI mein use hota hai."
          commonMistakes={[
            {
              mistake: 'querySelectorAll ka result directly map() karna',
              why: 'querySelectorAll NodeList return karta hai, Array nahi — NodeList mein map() nahi hota.',
              fix: 'Array.from(nodeList).map() ya [...nodeList].map() use karo.',
            },
            {
              mistake: 'Live collection ko loop mein modify karna',
              why: 'getElementsByClassName live collection hai — element remove karo toh collection shrink ho jaati hai, loop skip karta hai elements.',
              fix: 'querySelectorAll use karo (static) ya loop backwards karo, ya pehle Array.from() karo.',
            },
          ]}
          proTip="closest() method bahut useful hai — element se upar tree mein jaata hai jab tak matching ancestor nahi milta. Event delegation mein event.target.closest('.card') se sahi parent find karo, chahe child element click hoa ho."
        />
      </div>

      {/* ConceptCard 3 */}
      <div id="modifying-dom">
        <ConceptCard
          title="DOM Modify Karna"
          emoji="✏️"
          difficulty="intermediate"
          whatIsIt="Element select karne ke baad usse modify kar sakte ho — content change karo (innerHTML, textContent, innerText), classes manage karo (classList), attributes set karo (setAttribute, dataset), aur inline styles lagao (style property)."
          whenToUse={[
            'Text content dynamically update karna ho',
            'CSS classes toggle karna ho (show/hide, active state)',
            'Attributes change karna ho — src, href, disabled, data-*',
            'Inline styles programmatically apply karne ho',
          ]}
          whyUseIt="DOM modification se tum real-time UI updates kar sakte ho — counter increment, form validation messages, theme switching. classList API classes ke saath kaam ko simple aur readable banata hai. dataset attribute custom data store karta hai elegantly."
          howToUse={{
            filename: 'modifying.js',
            language: 'javascript',
            code: `const el = document.querySelector('.message')

// Content change karo — SAFE way
el.textContent = 'Hello <World>'    // < > as text treat hota hai — safe!
el.innerText = 'Visible text only'  // CSS-aware, hidden text ignore karta hai

// innerHTML — SIRF trusted content ke liye!
el.innerHTML = '<strong>Bold text</strong>'  // HTML parse hota hai
// ❌ KABHI MAT KARO: el.innerHTML = userInput — XSS!

// classList — sabse clean way
el.classList.add('active')
el.classList.remove('hidden')
el.classList.toggle('dark')           // Add if missing, remove if present
el.classList.contains('loading')      // true/false check
el.classList.replace('old', 'new')    // Replace one class

// Attributes
el.setAttribute('disabled', '')
el.getAttribute('data-id')
el.removeAttribute('disabled')
el.hasAttribute('required')          // true/false

// Dataset — data-* attributes
const card = document.querySelector('[data-user-id]')
console.log(card.dataset.userId)     // data-user-id → dataset.userId (camelCase!)
card.dataset.status = 'active'       // Sets data-status="active"

// Inline styles — avoid karo jab possible (prefer classes)
el.style.color = '#7C3AED'
el.style.display = 'none'           // Hide
el.style.cssText = 'color: red; font-weight: bold;'  // Multiple at once

// getComputedStyle — actual applied style
const computed = getComputedStyle(el)
console.log(computed.fontSize)       // "16px" — including inherited styles`,
            explanation: 'textContent user data ke liye safest hai — HTML entities encode karta hai. classList API class management ko clean rakhta hai. dataset camelCase magic karta hai (data-user-id → dataset.userId). Inline styles se bachko — CSS classes prefer karo maintainability ke liye.',
          }}
          realWorldScenario="Dark mode toggle karne ke liye: document.documentElement.classList.toggle('dark') — ek line mein poori site ka theme switch! Ye same pattern loading states, error states, active navigation items sab ke liye kaam karta hai."
          commonMistakes={[
            {
              mistake: 'User input ko innerHTML mein daalna',
              why: 'XSS (Cross-Site Scripting) attack — malicious user <script>steal(cookies)</script> inject kar sakta hai.',
              fix: 'User data ke liye hamesha textContent use karo. HTML banana ho toh createElement + textContent use karo.',
            },
            {
              mistake: 'style.display = "none" se hide karna aur phir "" se show karna',
              why: 'display = "" original value restore karta hai — lekin agar original value kuch aur tha (flex, grid), toh break ho jaata hai.',
              fix: 'CSS class use karo: classList.add("hidden") / classList.remove("hidden"). CSS mein .hidden { display: none }.',
            },
          ]}
          proTip="element.dataset ek bahut clean API hai custom data store karne ke liye. Instead of passing IDs through event handlers, data-id, data-type attributes use karo — event.target.dataset.id se clean access milta hai. Ye pattern React state ki zaroorat bhi reduce karta hai simple cases mein."
        />
      </div>

      {/* ConceptCard 4 */}
      <div id="creating-removing">
        <ConceptCard
          title="Elements Create aur Remove Karna"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="JavaScript se dynamically HTML elements create kar sakte ho (createElement), DOM mein add kar sakte ho (appendChild, insertBefore, insertAdjacentHTML), aur remove kar sakte ho (removeChild, remove, replaceWith). Ye dynamic UIs ke liye fundamental hai."
          whenToUse={[
            'Dynamic list items add karne ho — todo items, comments, notifications',
            'API response se cards render karne ho',
            'Modal, tooltip, dropdown dynamically create karne ho',
            'Old elements ko new se replace karna ho',
          ]}
          whyUseIt="createElement + appendChild pattern XSS-safe hai kyunki tum HTML string parse nahi karte. insertAdjacentHTML convenient hai trusted content ke liye. remove() aur replaceWith() modern aur clean APIs hain — no need to go through parentNode."
          howToUse={{
            filename: 'create-remove.js',
            language: 'javascript',
            code: `// Element create karo
const li = document.createElement('li')
li.className = 'todo-item'
li.textContent = 'Buy groceries'    // Safe — no XSS
li.dataset.id = '123'

// DOM mein add karo
const list = document.querySelector('#todo-list')
list.appendChild(li)               // End mein add
list.prepend(li)                   // Beginning mein add
list.insertBefore(li, list.children[2])  // Specific position

// insertAdjacentHTML — fast aur convenient (trusted content ke liye)
list.insertAdjacentHTML('beforeend', '<li class="item">New Item</li>')
// Positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'

// Multiple elements efficiently add karo — DocumentFragment use karo!
const fragment = document.createDocumentFragment()
const items = ['Apple', 'Banana', 'Cherry']
items.forEach(text => {
  const li = document.createElement('li')
  li.textContent = text
  fragment.appendChild(li)
})
list.appendChild(fragment)  // Ek DOM update — performant!

// Remove karo
const oldItem = document.querySelector('.old-item')
oldItem.remove()                    // Modern way — direct!
// Old way: oldItem.parentNode.removeChild(oldItem)

// Replace karo
const newEl = document.createElement('p')
newEl.textContent = 'Replaced!'
oldItem.replaceWith(newEl)          // oldItem ki jagah newEl

// Clone karo
const clone = li.cloneNode(true)   // true = deep clone (children bhi)
list.appendChild(clone)`,
            explanation: 'DocumentFragment use karo jab multiple elements add karne ho — sirf ek DOM reflow trigger hoti hai. createElement + textContent pattern sabse safe hai user data ke liye. remove() aur replaceWith() modern clean APIs hain — parentNode ke through jaane ki zaroorat nahi.',
          }}
          realWorldScenario="Todo app mein naya item add karna: createElement('li'), textContent set karo, dataset mein ID store karo, list mein append karo. Delete button click pe: event delegation se item ID lo, API call karo, element.remove() karo. Ye exact pattern real-world apps mein use hota hai."
          commonMistakes={[
            {
              mistake: 'Loop mein ek ek karke DOM append karna',
              why: 'Har appendChild ek DOM reflow trigger karta hai — 1000 items add karo toh 1000 reflows — bahut slow.',
              fix: 'DocumentFragment mein sab add karo, phir ek baar appendChild(fragment) karo — sirf ek reflow.',
            },
            {
              mistake: 'innerHTML += content use karna',
              why: 'innerHTML += poora innerHTML read karta hai, phir reparse karta hai — slow aur event listeners destroy karta hai.',
              fix: 'createElement + appendChild ya insertAdjacentHTML use karo.',
            },
          ]}
          proTip="template element use karo reusable HTML patterns ke liye: <template id='card-tpl'>...</template>. JavaScript mein: const clone = document.querySelector('#card-tpl').content.cloneNode(true). Ye Web Components ka foundation hai aur bahut performant hai."
        />
      </div>

      {/* ConceptCard 5 */}
      <div id="events">
        <ConceptCard
          title="Events — Interactivity Ka Dil"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Events user interactions hain — click, keypress, submit, scroll, resize. addEventListener se inhe sun sakte ho. Event object mein information hoti hai — kya hua, kahan hua, kab hua. Event bubbling se parent elements bhi events receive karte hain — event delegation isi par based hai."
          whenToUse={[
            'User click, hover, keyboard input handle karna ho',
            'Form submit karna aur validate karna ho',
            'Dynamic elements ke events handle karne ho — event delegation',
            'Custom events dispatch karne ho — component communication',
          ]}
          whyUseIt="addEventListener proper way hai events handle karne ka — ek element par multiple listeners laga sakte ho, aur removeEventListener se cleanup kar sakte ho. Inline onclick attributes se bachko — separation of concerns violate karta hai. Event delegation se memory efficient code likhte hain."
          howToUse={{
            filename: 'events.js',
            language: 'javascript',
            code: `const btn = document.querySelector('#submit-btn')

// addEventListener — proper way
function handleClick(event) {
  console.log('Clicked!', event.target)    // Element jo click hua
  console.log(event.type)                  // 'click'
  console.log(event.clientX, event.clientY) // Mouse position
  console.log(event.key)                   // Keyboard events mein
}

btn.addEventListener('click', handleClick)
btn.removeEventListener('click', handleClick)  // Cleanup — same function reference!

// Once option — sirf ek baar fire karo
btn.addEventListener('click', handleClick, { once: true })

// Form submit
const form = document.querySelector('#my-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()                       // Page reload rok do!
  const formData = new FormData(form)
  console.log(formData.get('username'))
})

// Event Delegation — parent par listener, child events catch karo
const todoList = document.querySelector('#todo-list')
todoList.addEventListener('click', (e) => {
  // closest() — click kisi bhi child par ho, .delete-btn find karo
  const deleteBtn = e.target.closest('.delete-btn')
  if (!deleteBtn) return

  const item = deleteBtn.closest('.todo-item')
  const id = item.dataset.id
  item.remove()
  // API call: deleteItem(id)
})

// Event Bubbling demo
document.addEventListener('click', (e) => {
  // Har click yahan pahunchta hai (unless stopPropagation karo)
  console.log('Document pe click:', e.target.tagName)
})

// Bubbling rokna
btn.addEventListener('click', (e) => {
  e.stopPropagation()  // Parent elements ko event nahi milega
})

// Custom Events
const customEvent = new CustomEvent('itemAdded', {
  detail: { id: 123, name: 'New Item' },
  bubbles: true,
})
document.dispatchEvent(customEvent)

document.addEventListener('itemAdded', (e) => {
  console.log('Item added:', e.detail)
})`,
            explanation: 'Event delegation powerful pattern hai — dynamically add hone wale elements ke liye perfect. e.target closest() se sahi element find karo. removeEventListener ke liye same function reference chahiye — arrow function inline mat use karo agar cleanup karna ho. Custom events component communication ke liye useful hain.',
          }}
          realWorldScenario="Ek real-time comment section mein: naye comments dynamically add hote hain. Event delegation se parent container par ek hi listener lagao — like button, reply button, delete button sab handle karo. Bina delegation ke 1000 comments mein 3000 event listeners — heavy memory usage."
          commonMistakes={[
            {
              mistake: 'removeEventListener ke liye naya arrow function dena',
              why: 'Arrow function inline doge toh remove nahi hoga — har baar naya function reference banta hai.',
              fix: 'Named function variable mein store karo: const handler = () => {}; btn.addEventListener("click", handler); btn.removeEventListener("click", handler);',
            },
            {
              mistake: 'Form submit par e.preventDefault() bhoolna',
              why: 'Browser page reload karta hai — JavaScript se form data process nahi hoti.',
              fix: 'Hamesha form submit handler mein e.preventDefault() pehli line mein likho.',
            },
          ]}
          proTip="AbortController se event listeners elegantly cleanup karo: const controller = new AbortController(); btn.addEventListener('click', handler, { signal: controller.signal }); baad mein controller.abort() — sab listeners ek saath remove! React useEffect cleanup mein ye pattern perfect hai."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 11 Quiz — DOM Manipulation
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80% pass karna zaroori hai!
          </p>
        </div>
        <QuizSection questions={domQuiz} chapterSlug="dom-manipulation" />
      </div>
    </div>
  )
}
