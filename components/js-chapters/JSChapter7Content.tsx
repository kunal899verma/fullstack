'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: 'JavaScript strings immutable kyun hain?',
    options: [
      { text: 'Performance reasons ke liye — baar baar copy nahi banti', correct: false, explanation: 'Partial reasoning — immutability safety ke liye bhi hai, sirf performance nahi.' },
      { text: 'String ke characters modify nahi ho sakte — methods hamesha new string return karte hain', correct: true, explanation: 'Bilkul sahi! str[0] = "X" kuch nahi karta, str.toUpperCase() new string return karta hai — original unchanged.' },
      { text: 'Strings objects nahi hain isliye', correct: false, explanation: 'Strings primitive hain lekin object wrapper (String) bhi hai. Immutability alag concept hai.' },
      { text: 'JavaScript mein strings exist nahi karti — sirf char arrays hain', correct: false, explanation: "JavaScript mein strings first-class citizens hain — 'hello'.length = 5." },
    ],
  },
  {
    question: 'slice() aur substring() mein negative index ka behavior kya hai?',
    options: [
      { text: 'Dono same tarike se handle karte hain', correct: false, explanation: 'Important difference hai! Negative indices dono alag handle karte hain.' },
      { text: 'slice(-3) last 3 chars; substring(-3) treats negative as 0', correct: true, explanation: 'Sahi! slice negative indices support karta hai (end se count), substring negative ko 0 maanta hai.' },
      { text: 'substring negative indices better handle karta hai', correct: false, explanation: 'Ulta hai — slice negative indices ke saath zyada intuitive hai.' },
      { text: 'Dono TypeError throw karte hain negative indices pe', correct: false, explanation: 'Koi error nahi — alag behavior hai dono ka.' },
    ],
  },
  {
    question: 'Template literal ka tagged template kya karta hai?',
    options: [
      { text: 'Template ko HTML escape karta hai automatically', correct: false, explanation: 'Auto-escaping default nahi hota — tagged template custom processing allow karta hai.' },
      { text: 'Function ko template literal ke parts process karne deta hai — strings aur expressions separately', correct: true, explanation: 'Bilkul! tag`hello ${name}` calls tag(strings, ...values) — powerful custom processing.' },
      { text: 'Template ko faster banata hai evaluation mein', correct: false, explanation: 'Performance ke liye nahi — custom string processing ke liye hai.' },
      { text: 'Multiline strings banana ke liye use hota hai', correct: false, explanation: 'Multiline template literal bina tag ke bhi kaam karta hai.' },
    ],
  },
  {
    question: 'String.prototype.replace() pehle match ke baad ruk jaata hai. Sab replace karne ke liye kya use karo?',
    options: [
      { text: 'replaceAll() ya replace() with global regex (/pattern/g)', correct: true, explanation: 'Sahi! replaceAll() (ES2021) ya replace(/pattern/g, replacement) — dono sab occurrences replace karte hain.' },
      { text: 'Sirf replaceAll() kaam karta hai — regex kaam nahi karta', correct: false, explanation: 'replace() global flag (/g) ke saath bhi sab replace karta hai.' },
      { text: 'split() aur join() use karo', correct: false, explanation: 'split/join kaam karta hai lekin replaceAll ya /g regex zyada clean hai.' },
      { text: 'map() use karo string pe', correct: false, explanation: 'String pe directly map() nahi hota — pehle split karna padega.' },
    ],
  },
  {
    question: 'Regular expression mein /g flag ka kya matlab hai?',
    options: [
      { text: 'Case-insensitive matching', correct: false, explanation: 'Case-insensitive ke liye /i flag hai.' },
      { text: 'Global — string mein sab matches dhundho, sirf pehla nahi', correct: true, explanation: 'Bilkul! /g without flag: pehla match. /g with flag: sab matches. match() ke saath array of all matches milta hai.' },
      { text: 'Greedy matching enable karta hai', correct: false, explanation: 'Greedy default behavior hai regex mein — /g flag global search ke liye hai.' },
      { text: 'Multiline mode enable karta hai', correct: false, explanation: 'Multiline ke liye /m flag hai.' },
    ],
  },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter7Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Strings & Template Literals — Text Ka Duniya
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Strings har JavaScript application mein hain — user names, API responses, HTML generation, file paths, error messages. Strings ki basics clear honi chahiye aur modern template literals ka full power aana chahiye. Template literals ne string manipulation ka tarika hi badal diya hai!
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#06B6D4] font-semibold">Is chapter mein:</span> String immutability, essential methods, template literals (tagged templates bhi!), manipulation methods (replace, trim, pad), aur regex basics — test, match, replace.
          </p>
        </div>
      </div>

      {/* Card 1: String Basics */}
      <div id="string-basics">
        <ConceptCard
          title="String Creation & Immutability"
          emoji="📝"
          difficulty="beginner"
          whatIsIt="Strings JavaScript mein primitive values hain — immutable, indexed, iterable. Teen ways se create karo: single quotes, double quotes, ya backtick template literals. String ke characters index se access hote hain — str[0]. length property total length deta hai. Strings immutable hain — koi bhi method original string nahi badalta, hamesha new string return karta hai."
          whenToUse={[
            'String primitive: user input, names, emails, messages store karne ke liye',
            'String indexing [i]: specific character access, parsing',
            'str.at(-1): last character elegantly — str[str.length-1] se better',
            'for...of: string iterate karna character by character',
          ]}
          whyUseIt="Immutability samajhna bugs prevent karta hai — str.toUpperCase() original nahi badalta! String methods hamesha new string return karte hain. typeof operator strings ke saath 'string' return karta hai. String wrapper object (new String()) kabhi mat use karo — primitive ko prefer karo hamesha."
          howToUse={{
            filename: 'strings.js',
            language: 'javascript',
            code: `// String creation
const single = 'Hello, World!'
const double = "Hello, World!"
const template = \`Hello, \${'World'}!\`

// Immutability — methods new string return karte hain
let str = 'hello'
str.toUpperCase()  // 'HELLO' — new string
console.log(str)   // still 'hello' — unchanged!
str = str.toUpperCase()  // reassign karni padegi

// Indexing
const name = 'Rahul'
name[0]          // 'R'
name[name.length - 1]  // 'l'
name.at(-1)      // 'l' — modern way (ES2022)
name.at(-2)      // 'u'

// length
'hello'.length   // 5
''.length        // 0
'Rahul'.length   // 5

// Iterate characters
for (const char of 'hello') {
  console.log(char)  // h, e, l, l, o
}

// String to array
const chars = [...'hello']  // ['h', 'e', 'l', 'l', 'o']

// typeof
typeof 'hello'     // 'string'
typeof new String('hello')  // 'object' — avoid!

// Escape characters
const multiline = 'Line 1\\nLine 2\\nLine 3'
const tab = 'Col 1\\tCol 2'
const quote = 'It\\'s a string'

// Unicode
const emoji = '\\u{1F600}'  // 😀
emoji.length  // 2 — emoji are 2 chars in JS (UTF-16 surrogate pairs)`,
            explanation: 'Strings immutable hain — har method new string return karta hai. at() method negative indices support karta hai — at(-1) last character. Emoji aur some unicode characters length 2 report karte hain kyunki UTF-16 mein 2 code units use karte hain. Array.from("string") emoji-safe iteration ke liye better hai.',
          }}
          realWorldScenario="User input validation: const clean = input.trim().toLowerCase() — whitespace remove, normalize case. Email masking: email.slice(0, 2) + stars + email.slice(email.indexOf('@')). URL slugs: title.toLowerCase().replace spaces with hyphens. Password length: validate minimum 8 chars."
          commonMistakes={[
            {
              mistake: "str.toUpperCase() karke str same value expect karna",
              why: 'Strings immutable hain — str.toUpperCase() new string return karta hai, str unchanged rehta hai.',
              fix: 'str = str.toUpperCase() — reassign karo agar store karna hai.',
            },
            {
              mistake: "emoji string ke liye str.length use karna accurate character count ke liye",
              why: "'😀'.length = 2 — emoji UTF-16 surrogate pair hai, 2 code units leta hai.",
              fix: '[...str].length ya Array.from(str).length use karo emoji-safe character count ke liye.',
            },
          ]}
          proTip="String.raw`Hello\\nWorld` — raw string literal, escape sequences process nahi hote. Template tag ke roop mein use hota hai. Useful for regex patterns, Windows file paths, ya LaTeX."
        />
      </div>

      {/* Card 2: Essential Methods */}
      <div id="string-methods">
        <ConceptCard
          title="Essential String Methods"
          emoji="🔧"
          difficulty="beginner"
          whatIsIt="JavaScript strings ke paas rich methods hain. slice(start, end): substring nikalo, negative indices support. indexOf/lastIndexOf: position dhundho. includes/startsWith/endsWith: presence check — readable boolean returns. split(separator): string ko array mein todo. Joining arrays: arr.join(separator). Ye sab non-mutating hain."
          whenToUse={[
            'slice(): substring extract karna — email domain, file extension, path components',
            'includes(): simple presence check — case-sensitive by default',
            'startsWith/endsWith: URL/path validation, file type checking',
            'split/join: CSV parsing, URL path splitting, word processing',
          ]}
          whyUseIt="includes() indexOf(x) !== -1 se zyada readable hai — intent clear hai. startsWith/endsWith prefix/suffix checks ke liye designed hain — much cleaner than slice. split aur join combo powerful text processing enable karta hai. Ye methods daily string manipulation ke tools hain."
          howToUse={{
            filename: 'string-methods.js',
            language: 'javascript',
            code: `const str = 'Hello, World! Welcome to JavaScript.'

// slice(start, end) — end exclusive
str.slice(7, 12)    // 'World'
str.slice(-11)      // 'JavaScript.'
str.slice(0, -1)    // Remove last char

// substring — similar but no negative indices
str.substring(7, 12)  // 'World'

// indexOf / lastIndexOf
str.indexOf('o')      // 4 — first occurrence
str.lastIndexOf('o')  // 28 — last occurrence
str.indexOf('xyz')    // -1 — not found

// includes, startsWith, endsWith
str.includes('World')       // true
str.includes('world')       // false — case sensitive!
str.startsWith('Hello')     // true
str.endsWith('.')           // true
str.startsWith('World', 7)  // true — start from index 7

// Case methods
'hello WORLD'.toLowerCase()  // 'hello world'
'hello WORLD'.toUpperCase()  // 'HELLO WORLD'
'hello world'.toLocaleUpperCase('tr-TR')  // Turkish uppercase

// split — string to array
'one,two,three'.split(',')    // ['one', 'two', 'three']
'Hello'.split('')             // ['H','e','l','l','o']
'a  b  c'.split(/\\s+/)       // ['a', 'b', 'c'] — regex split

// join — array to string
['one', 'two', 'three'].join(' - ')  // 'one - two - three'
['a', 'b', 'c'].join('')             // 'abc'

// Practical: extract email domain
const email = 'rahul@example.com'
const domain = email.slice(email.indexOf('@') + 1)  // 'example.com'
const [username, host] = email.split('@')            // destructure!

// Count occurrences
const text = 'banana'
const count = text.split('a').length - 1  // 3 — count 'a's`,
            explanation: 'includes() zyada readable hai indexOf !== -1 se. slice negative indices support karta hai (end se count), substring nahi. split regex ke saath powerful — multiple whitespace split. join se array ko koi bhi separator ke saath string banao.',
          }}
          realWorldScenario="CSV processing: rows.map(row => row.split(',')). URL parsing: path.split('/').filter(Boolean). HTML generation: tags.map(t => \`<span>\${t}</span>\`).join('\\n'). File extension: filename.slice(filename.lastIndexOf('.')). Email domain: email.slice(email.indexOf('@') + 1)."
          commonMistakes={[
            {
              mistake: "str.includes() case-sensitive hai — 'hello'.includes('Hello') = false",
              why: 'Case-insensitive check ke liye lowercase compare karna padega.',
              fix: "str.toLowerCase().includes('hello') ya regex: /hello/i.test(str).",
            },
            {
              mistake: "split ke baad empty strings — 'a,,b'.split(',') = ['a', '', 'b']",
              why: 'Consecutive separators empty strings produce karte hain.',
              fix: ".split(',').filter(Boolean) — falsy values (empty strings) remove karo.",
            },
          ]}
          proTip="str.split('').reverse().join('') — string reverse karo! Palindrome check: str === str.split('').reverse().join('').toLowerCase(). Simple aur readable."
        />
      </div>

      {/* Card 3: Template Literals */}
      <div id="template-literals">
        <ConceptCard
          title="Template Literals — Backtick Magic"
          emoji="✨"
          difficulty="beginner"
          whatIsIt="Template literals backtick (`) use karte hain. Features: ${expression} interpolation — koi bhi JavaScript expression. Multiline strings natively — no \\n needed. Tagged templates — function se template process karo. Raw strings — String.raw. Template literals ne string concatenation ko almost obsolete bana diya hai modern JavaScript mein."
          whenToUse={[
            'Hamesha string concatenation ki jagah template literals prefer karo',
            'Multiline strings: SQL queries, HTML templates, multiline messages',
            'Expression embedding: calculations, ternary, function calls directly',
            'Tagged templates: SQL injection safe queries, i18n, styled-components CSS',
          ]}
          whyUseIt="Concatenation (+) se template literals infinitely more readable hain. Multiline natively support — \\n ki zaroorat nahi. Expression embedding powerful hai — conditional rendering, computed values directly string mein. Tagged templates framework-level features enable karte hain — styled-components CSS-in-JS is based on tagged templates!"
          howToUse={{
            filename: 'template-literals.js',
            language: 'javascript',
            code: `const name = 'Rahul'
const age = 25
const city = 'Mumbai'

// Old concatenation — ugly!
const old = 'Hello, ' + name + '! You are ' + age + ' years old from ' + city + '.'

// Template literal — clean!
const modern = \`Hello, \${name}! You are \${age} years old from \${city}.\`

// Expressions — kuch bhi!
const math = \`Square root of 2 is \${Math.sqrt(2).toFixed(4)}\`
const conditional = \`User is \${age >= 18 ? 'adult' : 'minor'}\`
const functionCall = \`Uppercase: \${name.toUpperCase()}\`
const computed = \`Total: ₹\${(1000 * 1.18).toFixed(2)}\`

// Multiline — newlines preserved!
const address = \`
  Rahul Kumar
  123, MG Road
  Mumbai - 400001
  Maharashtra, India
\`.trim()

// SQL query with template
const userId = 42
// ⚠️ NEVER do this with user input — SQL injection risk!
// const query = \`SELECT * FROM users WHERE id = \${userId}\`

// Multiline HTML template
const card = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
    <p>City: \${city}</p>
  </div>
\`

// Tagged templates — custom processing
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1]
    return result + (value ? \`<mark>\${value}</mark>\` : '') + str
  })
}

const highlighted = highlight\`Hello \${name}, you are \${age} years old!\`
// 'Hello <mark>Rahul</mark>, you are <mark>25</mark> years old!'

// Raw strings — escape sequences not processed
const path = String.raw\`C:\\Users\\Rahul\\Documents\`
// 'C:\\Users\\Rahul\\Documents' — backslashes literal`,
            explanation: 'Tagged templates powerful custom processing enable karte hain — styled-components, graphql tags, sql tags sab isi pe based hain. Tag function ko strings array (template parts) aur values (interpolated expressions) milti hain. String.raw backlash escape nahi karta.',
          }}
          realWorldScenario="Styled-components: const Button = styled.button`background: ${props => props.primary ? 'blue' : 'white'}`— yahi tagged template! Apollo GraphQL: const GET_USER = gql`query { user(id: ${id}) }`. i18n: t`Hello ${user.name}, you have ${count} messages`. Ye real framework features hain."
          commonMistakes={[
            {
              mistake: 'User input ko directly SQL template mein interpolate karna',
              why: 'SQL injection vulnerability — attacker malicious SQL inject kar sakta hai.',
              fix: 'Hamesha parameterized queries use karo: db.query("SELECT * FROM users WHERE id = ?", [userId]). Ya sql tagged template library.',
            },
            {
              mistake: 'Template mein undefined values ko handle nahi karna',
              why: '`Hello ${user.name}` — user undefined hone par "Hello undefined" print hoga!',
              fix: '`Hello ${user?.name ?? "Guest"}` — optional chaining + nullish coalescing.',
            },
          ]}
          proTip="styled-components CSS-in-JS template literals pe based hai — component styling JavaScript variables aur logic se combine hoti hai. gql`` Apollo ke saath GraphQL queries type-safe banata hai. Ye tagged template literals ki real-world power hai!"
        />
      </div>

      {/* Card 4: String Manipulation */}
      <div id="string-manipulation">
        <ConceptCard
          title="String Manipulation — replace, trim, pad"
          emoji="✂️"
          difficulty="beginner"
          whatIsIt="String manipulation methods: replace/replaceAll pattern-based replacement. trim/trimStart/trimEnd whitespace removal. padStart/padEnd padding add karna. repeat string repeat karna. Ye sab non-mutating hain — new string return karte hain. replace() with regex powerful patterns enable karta hai — groups, flags, replacer functions."
          whenToUse={[
            'trim(): user input sanitize karna — spaces hata do before validation',
            'padStart: time format (09:05), ID padding, table alignment',
            'replace/replaceAll: text transformation, sanitization, URL slugs',
            'repeat: string pattern generate karna, loading bars, dividers',
          ]}
          whyUseIt="trim() is vital for user input — 'hello ' aur 'hello' alag compare karte hain, whitespace bugs produce karta hai. padStart/padEnd formatting ke liye useful — time display (09:05 not 9:5), progress bars, aligned output. replaceAll ES2021 mein aaya — replace(/pattern/g) se cleaner."
          howToUse={{
            filename: 'manipulation.js',
            language: 'javascript',
            code: `// trim — whitespace remove
'  hello  '.trim()       // 'hello'
'  hello  '.trimStart()  // 'hello  '
'  hello  '.trimEnd()    // '  hello'

// ⭐ Always trim user input before validation
const email = userInput.trim().toLowerCase()

// replace — pehla match sirf
'hello world'.replace('o', '0')      // 'hell0 world'
'hello world'.replace(/o/g, '0')     // 'hell0 w0rld' — global!

// replaceAll (ES2021)
'hello world'.replaceAll('o', '0')   // 'hell0 w0rld'

// replace with function — powerful!
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\\w\\s-]/g, '')   // Remove special chars
    .replace(/[\\s_]+/g, '-')    // Spaces to hyphens
    .replace(/-+/g, '-')        // Multiple hyphens to one

slugify('Hello, World! This is a Test.')
// 'hello-world-this-is-a-test'

// padStart / padEnd — padding
'5'.padStart(3, '0')     // '005' — time/id formatting
'42'.padStart(5, '0')    // '00042'
'Hello'.padEnd(10, '.')  // 'Hello.....'

// Practical: time format
const formatTime = (h, m) =>
  \`\${String(h).padStart(2, '0')}:\${String(m).padStart(2, '0')}\`
formatTime(9, 5)   // '09:05'
formatTime(14, 30) // '14:30'

// repeat
'ha'.repeat(3)  // 'hahaha'
'='.repeat(50)  // divider line

// Progress bar
const progress = (percent) => {
  const filled = Math.floor(percent / 2)
  const empty = 50 - filled
  return \`[\${'█'.repeat(filled)}\${'░'.repeat(empty)}] \${percent}%\`
}
progress(60)  // [██████████████████████████████░░░░░░░░░░░░░░░░░░░░] 60%`,
            explanation: 'replace() ek argument function bhi leta hai — matched string, captured groups aur position deta hai — complex transforms enable karta hai. padStart number formatting ke liye essential hai. slugify function real URL generation example hai — multiple chain kiya replacement.',
          }}
          realWorldScenario="Input sanitization: form.email = input.trim().toLowerCase(). API slug generation: product.slug = slugify(product.name). CLI output formatting: console.log(name.padEnd(20) + score.toString().padStart(5)). ID generation: id.toString().padStart(8, '0')."
          commonMistakes={[
            {
              mistake: 'User input trim karna bhool jaana',
              why: '"rahul@example.com " aur "rahul@example.com" — trailing space se email validation fail, comparison fail.',
              fix: 'Hamesha input process karne se pehle .trim() lagao. Form validation mein standard practice hai.',
            },
            {
              mistake: 'replace() global replace expect karna bina /g flag ke',
              why: "'hello world'.replace('l', 'L') = 'heLlo world' — sirf pehla match!",
              fix: "replaceAll() ya replace(/l/g, 'L') use karo global replacement ke liye.",
            },
          ]}
          proTip="replace() ka replacer function powerful pattern hai: str.replace(/\\$(\\d+)/g, (match, n) => args[n]) — positional template replacement. Ya: str.replace(/({\\w+})/g, (_, key) => data[key]) — named template replacement. Flexible string templating!"
        />
      </div>

      {/* Card 5: Regular Expressions */}
      <div id="regex-basics">
        <ConceptCard
          title="Regular Expressions — Pattern Matching"
          emoji="🎯"
          difficulty="beginner"
          whatIsIt="Regular expressions (regex) string patterns define karte hain — find karo, test karo, replace karo. Syntax: /pattern/flags. Common flags: g (global), i (case-insensitive), m (multiline). Methods: regex.test(str) — boolean, str.match(regex) — array of matches, str.replace(regex, replacement). Regex powerful hai lekin initially complex lagta hai — basics se shuru karo."
          whenToUse={[
            'Email/phone/URL validation — test() se',
            'Pattern-based search aur replace — /pattern/g ke saath replace()',
            'String parsing — groups se data extract karna',
            'Input sanitization — unwanted characters remove karna',
          ]}
          whyUseIt="Regex complex string validation aur manipulation ek line mein karta hai jo otherwise dozens of lines leta. Email validation, phone formatting, password strength check, URL parsing — sab regex se efficiently hota hai. Test karne ke liye regex101.com best tool hai."
          howToUse={{
            filename: 'regex.js',
            language: 'javascript',
            code: `// regex.test() — boolean check
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
emailRegex.test('rahul@example.com')  // true
emailRegex.test('not-an-email')       // false

const phoneRegex = /^[6-9]\\d{9}$/  // Indian mobile
phoneRegex.test('9876543210')  // true
phoneRegex.test('1234567890')  // false

// str.match() — array of matches
const text = 'Prices: ₹1000, ₹2500, ₹750'
const prices = text.match(/₹\\d+/g)
// ['₹1000', '₹2500', '₹750']

// match without /g — first match with details
const result = 'hello world'.match(/w(\\w+)/)
// ['world', 'orld', index: 6, ...]
// result[0] = full match, result[1] = first capture group

// Named capture groups
const dateStr = '2024-01-15'
const dateMatch = dateStr.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/)
const { year, month, day } = dateMatch?.groups ?? {}
// year='2024', month='01', day='15'

// str.replace() with regex
// Remove all non-digits
'Phone: (91) 98765-43210'.replace(/\\D/g, '')  // '919876543210'

// Replace with capture group reference
'2024-01-15'.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, '$3/$2/$1')
// '15/01/2024' — DD/MM/YYYY format

// Common patterns
const patterns = {
  email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
  url: /^https?:\\/\\/[^\\s]+$/,
  indian_mobile: /^[6-9]\\d{9}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  strong_password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,}$/,
}`,
            explanation: 'regex.test() fastest hai boolean check ke liye. match() /g ke saath all matches deta hai. Named capture groups (?<name>...) code readable banate hain — result.groups.year vs result[1]. \\D "not a digit" hai — \\d + negative.',
          }}
          realWorldScenario="Form validation: email, mobile, PAN number, Aadhaar masking. User input sanitization: username.replace(/[^a-zA-Z0-9_]/g, ''). Log parsing: '2024-01-15 ERROR: Database connection failed'.match(/(?<date>\\d{4}-\\d{2}-\\d{2}) (?<level>\\w+): (?<message>.+)/). URL slug: title.replace(/[^\\w\\s]/g, '').replace(/\\s+/g, '-')."
          commonMistakes={[
            {
              mistake: 'Regex object reuse karna stateful flags ke saath',
              why: 'const r = /pattern/g; r.test(str) multiple times — lastIndex track karta hai, unexpected false deta hai.',
              fix: '/pattern/g.test(str) — har call mein fresh regex literal use karo ya r.lastIndex = 0 reset karo.',
            },
            {
              mistake: 'Complex email validation ke liye simple regex — ya bahut complex regex',
              why: 'Perfect email regex bahut complex hai. Simple one-liner real emails reject kar sakta hai.',
              fix: 'Basic format check regex se karo, real validation email confirmation bhejo. Ya zod/yup library use karo.',
            },
          ]}
          proTip="regex101.com — best regex debugger! Real-time matching, explanation, reference. Development mein essential tool hai. Named capture groups (?<year>\\d{4}) code maintenance ke liye much better hain positional groups se."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 7 Quiz — Strings & Template Literals
          </h3>
          <p className="text-sm text-[#71717A]">5 questions — 80%+ chahiye clear karne ke liye!</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="strings-template-literals" />
      </div>
    </div>
  )
}
