'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Stream Types Visual ───────────────────────────────────────────────────────

function StreamTypesDiagram() {
  const types = [
    {
      label: 'Readable',
      sublabel: 'Data source — sirf padhte hain',
      example: 'fs.createReadStream, http.IncomingMessage',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.12)',
      border: 'rgba(6,182,212,0.35)',
      icon: '📖',
    },
    {
      label: 'Writable',
      sublabel: 'Data sink — sirf likhte hain',
      example: 'fs.createWriteStream, http.ServerResponse',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.12)',
      border: 'rgba(16,185,129,0.35)',
      icon: '✍️',
    },
    {
      label: 'Duplex',
      sublabel: 'Read + Write dono',
      example: 'net.Socket, TCP connections',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.12)',
      border: 'rgba(245,158,11,0.35)',
      icon: '↔️',
    },
    {
      label: 'Transform',
      sublabel: 'Read + Write + data modify',
      example: 'zlib.createGzip(), crypto streams',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.12)',
      border: 'rgba(124,58,237,0.35)',
      icon: '⚙️',
    },
  ]

  return (
    <div className="my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        Node.js Stream Types — Char Prakar
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((t, i) => (
          <div
            key={i}
            className="rounded-xl px-4 py-3"
            style={{ background: t.bg, border: `1px solid ${t.border}` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{t.icon}</span>
              <p className="font-bold text-sm" style={{ color: t.color }}>{t.label}</p>
            </div>
            <p className="text-xs text-[#A1A1AA] mb-1">{t.sublabel}</p>
            <p className="text-xs text-[#52525B] font-mono">{t.example}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Backpressure Visual ───────────────────────────────────────────────────────

function BackpressureVisual() {
  return (
    <div className="my-4 rounded-xl p-4" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-3 text-center">
        Backpressure — Overflow se Bachao
      </p>
      <div className="flex items-center justify-center gap-2 flex-wrap text-center">
        <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
          <p className="text-xs font-bold text-[#06B6D4]">Fast Producer</p>
          <p className="text-xs text-[#71717A]">10 MB/s</p>
        </div>
        <div className="text-[#EF4444] text-lg font-bold">→→→</div>
        <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <p className="text-xs font-bold text-[#EF4444]">Buffer (Full!)</p>
          <p className="text-xs text-[#71717A]">Overflow risk</p>
        </div>
        <div className="text-[#EF4444] text-lg font-bold">→→→</div>
        <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
          <p className="text-xs font-bold text-[#10B981]">Slow Consumer</p>
          <p className="text-xs text-[#71717A]">2 MB/s</p>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs text-[#A1A1AA]">
          Solution: <span className="text-[#7C3AED] font-semibold">pipe()</span> — producer ko automatically pause/resume karta hai consumer ki speed ke hisaab se
        </span>
      </div>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const streamsQuiz = [
  {
    question: 'Streams ka sabse bada advantage kya hai large files ke saath?',
    options: [
      {
        text: 'Streams files ko faster read karte hain',
        correct: false,
        explanation: 'Speed mein fark nahi hota itna — advantage memory usage mein hai. 10GB file ko 10GB RAM ki zarurat nahi, sirf kuch KB per chunk.',
      },
      {
        text: 'Streams memory efficient hain — poori file memory mein load kiye bina chunk by chunk process karte hain',
        correct: true,
        explanation: 'Bilkul sahi! 10GB file ko buffer mein load karo — 10GB RAM chahiye. Stream karo — sirf chunk size (64KB by default) memory mein. Ye hi streams ka magic hai.',
      },
      {
        text: 'Streams sirf network requests ke liye hain',
        correct: false,
        explanation: 'Streams files, network, stdin/stdout, HTTP responses — sab ke liye hain. Ye ek general-purpose data flow abstraction hai.',
      },
      {
        text: 'Streams syntax simple karte hain',
        correct: false,
        explanation: 'Streams ka primary benefit memory efficiency hai, syntax simplification nahi. Actually streams thode complex hote hain basic file I/O se.',
      },
    ],
  },
  {
    question: 'fs.createReadStream ka default chunk size (highWaterMark) kya hai?',
    options: [
      {
        text: '1 MB',
        correct: false,
        explanation: 'Default 64KB hai, 1MB nahi. highWaterMark option se change kar sakte ho apni needs ke hisaab se.',
      },
      {
        text: '64 KB',
        correct: true,
        explanation: 'Sahi! Default highWaterMark 64 * 1024 = 65,536 bytes = 64KB hai. Ek baar mein ye itna data read karke event emit karta hai.',
      },
      {
        text: '4 KB',
        correct: false,
        explanation: 'Galat — 64KB hai default. 4KB bahut chhota hoga — zyada events, zyada overhead.',
      },
      {
        text: '1 KB',
        correct: false,
        explanation: 'Galat — 64KB hai. 1KB se zyada frequent events aate, performance suffer karta.',
      },
    ],
  },
  {
    question: 'Transform stream kya karta hai?',
    options: [
      {
        text: 'Sirf data padhta hai, kuch nahi karta',
        correct: false,
        explanation: 'Sirf padhne ke liye Readable stream hai. Transform stream data read karta hai, modify karta hai, aur result write karta hai.',
      },
      {
        text: 'Data read karta hai, modify karta hai (transform), aur modified data write karta hai',
        correct: true,
        explanation: 'Bilkul sahi! Transform = Duplex where output depends on input. Examples: compression (zlib), encryption (crypto), CSV parsing — sab Transform streams hain.',
      },
      {
        text: 'Data ko disk par save karta hai',
        correct: false,
        explanation: 'Disk mein save karna Writable stream ka kaam hai. Transform stream data ko modify karta hai as it flows through.',
      },
      {
        text: 'Multiple streams merge karta hai',
        correct: false,
        explanation: 'Multiple streams merge karne ke liye alag patterns hain. Transform stream ek stream ka data modify karta hai.',
      },
    ],
  },
  {
    question: 'Backpressure kya hai aur kyon zaroori hai?',
    options: [
      {
        text: 'Server pe bahut zyada traffic aane ka naam hai',
        correct: false,
        explanation: 'Ye server load ka concept nahi hai. Backpressure stream mein fast producer aur slow consumer ke beech balance maintain karta hai.',
      },
      {
        text: 'Mechanism jo fast producer ko slow consumer ke saath sync karta hai — buffer overflow rokta hai',
        correct: true,
        explanation: 'Sahi! Fast readable stream agar slow writable se pipe karo bina backpressure ke — buffer overflow hoga, memory crash hogi. Backpressure producer ko pause karta hai jab consumer busy ho.',
      },
      {
        text: 'Network latency reduce karne ka technique',
        correct: false,
        explanation: 'Backpressure network latency se related nahi. Ye memory management ka concept hai — stream buffers overflow rokta hai.',
      },
      {
        text: 'Error handling mechanism hai streams mein',
        correct: false,
        explanation: 'Errors ke liye streams mein "error" event hota hai. Backpressure alag hai — producer-consumer speed mismatch handle karta hai.',
      },
    ],
  },
  {
    question: 'pipe() method kyun prefer karte hain manual stream piping ke upar?',
    options: [
      {
        text: 'pipe() faster hai kyunki ye C mein likha hai',
        correct: false,
        explanation: 'Speed difference negligible hai. pipe() ka main benefit backpressure automatic handling aur cleanup hai.',
      },
      {
        text: 'pipe() automatically backpressure handle karta hai aur stream errors pe cleanup karta hai',
        correct: true,
        explanation: 'Bilkul sahi! pipe() automatically writable stream ke buffer full hone par readable ko pause karta hai. Manual piping mein ye sab khud handle karna padta hai — bug-prone hai.',
      },
      {
        text: 'pipe() sirf file streams ke liye hai',
        correct: false,
        explanation: 'pipe() kisi bhi Readable aur Writable stream ke beech kaam karta hai — files, HTTP, custom streams sab ke liye.',
      },
      {
        text: 'pipe() syntax simple hai, koi technical benefit nahi',
        correct: false,
        explanation: 'Syntax simplicity ek benefit hai, lekin main technical benefit backpressure automatic handling hai — ye production code mein bahut zaroori hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter9Content() {
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
          Memory ka dushman kya hai? Buffer.
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Imagine karo ek 10GB video file padhna. Buffer mein load karo — 10GB RAM chahiye, app crash. Stream karo — sirf kuch KB ek time. Ye hi streams ka magic hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Node.js mein almost sabhi I/O streams hain —{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">fs.createReadStream</code>,{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">http.IncomingMessage</code>,{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">process.stdin</code>{' '}
          — sab Streams hain. Inhe samajhna Node.js ka true mastery hai.
        </p>
      </div>

      {/* Stream Types Diagram */}
      <div id="stream-types">
        <StreamTypesDiagram />
      </div>

      {/* ConceptCard 1: Stream Kya Hai */}
      <div id="what-is-stream">
        <ConceptCard
          title="Streams — Chunk By Chunk"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Stream ek abstract interface hai continuous data flow ke liye. Data ek saath nahi, chunks mein flow karta hai — jaise paani naali mein. Buffer mein memory mein sab load karne ke bajay, data tukdo mein process hota hai. Four types hain: Readable (source), Writable (sink), Duplex (dono), Transform (modify karte hue)."
          whenToUse={[
            'Large files — CSV, logs, video, audio — chunk by chunk process karo',
            'HTTP responses jahan data bade hain — streaming response bhejo',
            'Real-time data — database records, live feeds, sensor data',
            'File compression/decompression — stream through gzip',
            'Jab memory constraint ho — avoid loading everything at once',
          ]}
          whyUseIt="Memory efficiency sabse bada reason hai. 1GB file ko buffer mein load — 1GB RAM. Stream karo — sirf 64KB at a time. Faster time-to-first-byte bhi milti hai — user pehla chunk immediately dekh sakta hai, baaki load hote rehta hai. Production apps mein ye life-saver hai."
          howToUse={{
            filename: 'stream-intro.js',
            language: 'javascript',
            code: `const fs = require('fs')

// Memory usage check karne ke liye
function logMemory(label) {
  const mb = process.memoryUsage().heapUsed / 1024 / 1024
  console.log(\`[\${label}] Memory: \${mb.toFixed(2)} MB\`)
}

// ❌ Buffer approach — sab ek saath load
logMemory('Before read')
const data = fs.readFileSync('large-file.csv') // Blocking + memory hungry
logMemory('After readFileSync') // Bahut zyada memory!

// ✅ Stream approach — chunk by chunk
logMemory('Before stream')
const readStream = fs.createReadStream('large-file.csv', {
  highWaterMark: 64 * 1024, // 64KB chunks (default)
  encoding: 'utf8',
})

readStream.on('data', (chunk) => {
  // Har 64KB chunk yahan aata hai
  console.log('Chunk size:', chunk.length, 'bytes')
  // Process karo — memory constant rehti hai!
})

readStream.on('end', () => {
  logMemory('After stream') // Memory almost same!
  console.log('File completely read!')
})

readStream.on('error', (err) => {
  console.error('Stream error:', err.message)
})`,
            explanation: 'readFileSync poori file memory mein load karta hai. createReadStream chunks mein laata hai — memory constant rehti hai chahe file kitni bhi badi ho. highWaterMark se chunk size control karo.',
          }}
          realWorldScenario="Log processing service mein roz 5GB log files analyze karni thi. readFile se approach crash kar rahi thi on small servers. createReadStream se — 30MB memory, same result. Production mein stream use karo, buffer nahi."
          commonMistakes={[
            {
              mistake: 'Large files ke liye fs.readFile ya fs.readFileSync use karna',
              why: 'readFile poori file memory mein load karta hai — large files pe OutOfMemory crash hota hai.',
              fix: 'fs.createReadStream use karo large files ke liye. "Large" = generally 10MB se zyada jo HTTP response ya processing mein use ho.',
            },
            {
              mistake: 'Stream errors handle na karna',
              why: 'Stream error event handle na karo toh Node.js default behavior: uncaught exception — app crash!',
              fix: 'Hamesha .on("error", handler) lagao. pipe() use karo — wo automatically error propagate karta hai.',
            },
          ]}
          proTip="Almost sabhi Node.js I/O streams hain — fs.createReadStream, http.IncomingMessage, process.stdin, process.stdout — sab Stream interface implement karte hain. Ek baar Stream API samajh lo, ye sab automatically samajh aate hain."
        />
      </div>

      {/* ConceptCard 2: Readable Stream */}
      <div id="readable-stream">
        <ConceptCard
          title="Readable Stream — Data Padhna"
          emoji="📖"
          difficulty="intermediate"
          whatIsIt="Readable Stream data ka source hai — file, HTTP request, stdin, database cursor. Data do modes mein flow karta hai: Flowing mode (events emit hote hain automatically) aur Paused mode (tum manually .read() call karte ho). pipe() use karne par automatically flowing mode mein aa jaata hai."
          whenToUse={[
            'Large files padhna — logs, CSV, JSON, video chunks',
            'HTTP request body padhna — file upload handling',
            'Database result sets stream karna',
            'stdin se input lena — CLI tools mein',
            'Custom data sources — database cursors, API pagination',
          ]}
          whyUseIt="Readable streams memory efficient hain aur composable hain — pipe karo kisi bhi Writable ya Transform ke saath. data event se chunks milte hain, end event se pata chalta hai sab aa gaya. Error event se errors handle hote hain."
          howToUse={{
            filename: 'readable-stream.js',
            language: 'javascript',
            code: `const fs = require('fs')
const readline = require('readline')

// Basic Readable stream — file padhna
const stream = fs.createReadStream('data.json', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024, // 64KB per chunk
})

stream
  .on('data', (chunk) => {
    process.stdout.write(\`Chunk received: \${chunk.length} bytes\\n\`)
  })
  .on('end', () => console.log('File padhna complete!'))
  .on('error', (err) => console.error('Error:', err.message))

// Large file line-by-line — readline module ke saath
async function processLargeCSV(filePath) {
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Windows line endings handle karo
  })

  let lineCount = 0
  for await (const line of rl) {
    // Har line process karo — memory constant!
    const fields = line.split(',')
    await processCSVRow(fields)
    lineCount++

    if (lineCount % 10000 === 0) {
      console.log(\`Processed \${lineCount} lines...\`)
    }
  }
  console.log(\`Done! Total: \${lineCount} lines\`)
}

// Custom Readable stream
const { Readable } = require('stream')

const customReadable = new Readable({
  read(size) {
    // Push data when consumer is ready
    this.push('Hello ')
    this.push('World!')
    this.push(null) // null = stream end
  }
})

customReadable.pipe(process.stdout) // "Hello World!"`,
            explanation: 'for await...of se readline interface async iterable ki tarah use karo — clean line-by-line processing. Custom Readable mein _read() override karo aur push() se data do. null push karo stream end karne ke liye.',
          }}
          realWorldScenario="CSV import feature: user 500MB CSV upload karta hai. Streaming process karo — har 1000 rows ek batch DB mein insert. Progress track karo. Memory 50MB se nahi badha. Bina streaming ke — 500MB RAM ek user se, 10 concurrent users = crash."
          commonMistakes={[
            {
              mistake: 'data event mein synchronous heavy processing karna',
              why: 'Synchronous heavy work main thread block karta hai — stream buffer overflow ho sakta hai (backpressure ignore hota hai).',
              fix: 'Heavy processing ke liye async karo — await use karo ya setImmediate. Ya stream pause/resume pattern use karo.',
            },
            {
              mistake: 'Stream end event ke bina incomplete data process karna',
              why: 'Sirf data event sun ke complete data process assume mat karo — file reading incomplete ho sakti hai.',
              fix: 'end event ka wait karo complete processing ke liye. finish event Writable streams mein use hota hai.',
            },
          ]}
          proTip="createReadStream ka highWaterMark option se chunk size control karo. Default 64KB hai. Network streaming ke liye chhota chunk (16KB) better responsiveness deta hai. Local file processing ke liye bada chunk (256KB+) throughput improve karta hai."
          demo={
            <DiffBlock
              title="fs.readFile (Buffer) vs fs.createReadStream"
              language="javascript"
              bad={{
                label: 'readFile — Sab Memory Mein',
                code: `const fs = require('fs')

// ❌ Poori 1GB file memory mein!
fs.readFile('huge-log.txt', 'utf8', (err, data) => {
  if (err) throw err
  // 1GB data ek variable mein
  const lines = data.split('\\n')
  lines.forEach(line => processLine(line))
  // Memory: ~1GB minimum!
})`,
                explanation: 'fs.readFile poori file ek baar mein memory mein load karta hai. 1GB file = 1GB RAM minimum. Large files pe OutOfMemory crash.',
              }}
              good={{
                label: 'createReadStream — Chunk by Chunk',
                code: `const fs = require('fs')
const readline = require('readline')

// ✅ Ek line at a time — memory constant!
const rl = readline.createInterface({
  input: fs.createReadStream('huge-log.txt'),
})

for await (const line of rl) {
  await processLine(line)
}
// Memory: ~64KB regardless of file size!`,
                explanation: 'Stream karo — memory sirf current chunk ka hai. 1GB file bhi 64KB se process hoti hai. Production ke liye ye hi sahi tarika hai.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 3: Writable Stream */}
      <div id="writable-stream">
        <ConceptCard
          title="Writable Stream — Data Likhna"
          emoji="✍️"
          difficulty="intermediate"
          whatIsIt="Writable Stream data ka destination hai — file, HTTP response, stdout, database. write() method se data push karte ho. write() ek boolean return karta hai — false matlab buffer full hai, ruko! finish event tab emit hota hai jab sab data flush ho jaata hai."
          whenToUse={[
            'Large files likhna — logs, reports, exports',
            'HTTP response body bhejna — streaming JSON ya HTML',
            'Database mein bulk insert via stream',
            'stdout/stderr pe output karna',
            'Custom output destinations — email, Slack, monitoring systems',
          ]}
          whyUseIt="Writable streams ko producer se connect karo pipe() se — automatic backpressure milti hai. write() ka return value check karo — false aane par padhna band karo jab tak drain event na aaye. Ye manual implementation bahut tedious hai, isliye pipe() use karo."
          howToUse={{
            filename: 'writable-stream.js',
            language: 'javascript',
            code: `const fs = require('fs')
const { Writable } = require('stream')

// Basic Writable — file mein likhna
const writeStream = fs.createWriteStream('output.txt', {
  encoding: 'utf8',
  flags: 'a', // append mode
})

// write() ka return value important hai!
const canContinue = writeStream.write('Hello, World!\\n')

if (!canContinue) {
  // Buffer full hai — drain event ka wait karo
  writeStream.once('drain', () => {
    console.log('Buffer drain ho gaya, continue karo')
    // Abhi aur data likh sakte ho
  })
}

writeStream.end('Last line.\\n') // stream close karo

writeStream.on('finish', () => console.log('Sab kuch likh diya!'))
writeStream.on('error', (err) => console.error('Write error:', err))

// Custom Writable stream
class CollectorStream extends Writable {
  constructor() {
    super()
    this.collected = []
  }

  _write(chunk, encoding, callback) {
    // chunk process karo
    this.collected.push(chunk.toString())
    callback() // zaroori — next chunk ke liye ready signal
  }

  _final(callback) {
    // Stream end hone par final cleanup
    console.log(\`Collected \${this.collected.length} chunks\`)
    callback()
  }
}

const collector = new CollectorStream()
readable.pipe(collector)
collector.on('finish', () => {
  console.log('All data:', collector.collected.join(''))
})`,
            explanation: '_write() mein callback() call karna ZAROORI hai — ye Node.js ko batata hai ki next chunk accept karne ke liye ready ho. Callback mein error pass karo agar processing fail ho.',
          }}
          realWorldScenario="Report generation: database se 100K records stream karo, CSV format mein transform karo, file mein stream karo. Teen streams ek pipe chain mein — zero buffering of complete data. 100K records bhi 50MB memory mein process hote hain."
          commonMistakes={[
            {
              mistake: '_write() mein callback() na call karna',
              why: 'Bina callback ke stream next chunk send nahi karega — stream hang ho jaayega silently.',
              fix: 'Hamesha callback() call karo _write() ke end mein. Error aaye toh callback(err) karo.',
            },
            {
              mistake: 'write() ka return value ignore karna',
              why: 'write() false return kare aur tum ignore karo — buffer overflow hoga, memory leak ya crash.',
              fix: 'write() ka return value check karo. false pe writing band karo, drain event par resume karo. Ya pipe() use karo jo ye automatically handle karta hai.',
            },
          ]}
          proTip="write() return value ko monitor karo agar bina pipe() ke manually write kar rahe ho. Zyada easier approach: hamesha pipe() use karo — ye backpressure, drain events, error propagation sab automatically handle karta hai."
        />
      </div>

      {/* ConceptCard 4: Transform Stream */}
      <div id="transform-stream">
        <ConceptCard
          title="Transform Stream — Process Karte Jao"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="Transform Stream ek Duplex stream hai jahan output input par depend karta hai — data flow karta hai, transform hota hai, aur output milta hai. Common built-in transforms: zlib.createGzip() compression ke liye, crypto streams encryption ke liye. Tum custom transforms bhi bana sakte ho."
          whenToUse={[
            'File compression — readable.pipe(gzip).pipe(writeStream)',
            'Encryption/decryption — data as it flows through',
            'Data format conversion — JSON to CSV, XML to JSON',
            'Text processing — uppercase, lowercase, filtering lines',
            'Protocol encoding — Base64, URL encoding',
          ]}
          whyUseIt="Transform streams composable hain — pipe chain mein kisi bhi jagah laga do. Data ek end se enter hota hai, dusre end se transformed hokar nikalta hai. Memory efficient hai kyunki data chunk by chunk transform hota hai, poora memory mein nahi aata."
          howToUse={{
            filename: 'transform-stream.js',
            language: 'javascript',
            code: `const { Transform } = require('stream')
const fs = require('fs')
const zlib = require('zlib')
const crypto = require('crypto')

// Custom Transform — text uppercase karo
class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // chunk ko transform karo
    const upperCased = chunk.toString().toUpperCase()
    this.push(upperCased) // transformed data push karo
    callback() // ready for next chunk
  }
}

// Use karna
const upper = new UpperCaseTransform()
process.stdin.pipe(upper).pipe(process.stdout)
// Input: "hello world" → Output: "HELLO WORLD"

// Built-in transforms — file compress karo
const compress = fs.createReadStream('big-file.txt')
  .pipe(zlib.createGzip())         // compress
  .pipe(fs.createWriteStream('big-file.txt.gz'))

compress.on('finish', () => console.log('File compressed!'))

// Multi-step transform chain
// Read → Encrypt → Compress → Write
fs.createReadStream('sensitive-data.txt')
  .pipe(crypto.createCipher('aes-256-cbc', 'secret-key'))
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('secured.dat'))

// CSV Line Filter Transform
class LineFilterTransform extends Transform {
  constructor(filterFn) {
    super()
    this.filterFn = filterFn
    this.buffer = ''
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString()
    const lines = this.buffer.split('\\n')
    this.buffer = lines.pop() // Last incomplete line save karo

    lines
      .filter(this.filterFn)
      .forEach(line => this.push(line + '\\n'))

    callback()
  }

  _flush(callback) {
    if (this.buffer) this.push(this.buffer)
    callback()
  }
}

// Sirf error lines filter karo logs mein
const errorFilter = new LineFilterTransform(line => line.includes('ERROR'))
fs.createReadStream('app.log')
  .pipe(errorFilter)
  .pipe(fs.createWriteStream('errors-only.log'))`,
            explanation: '_transform() mein input chunk process karo, this.push() se transformed data output mein daalo, callback() call karo. _flush() mein remaining buffered data handle karo — jab stream end ho aur kuch baki ho.',
          }}
          realWorldScenario="Log analysis pipeline: 10GB access logs → filter 4xx/5xx errors → extract IP + timestamp → aggregate by IP → sorted report file. Char Transform streams chained — ek bhi line poori memory mein nahi aati. Output ek sorted CSV file."
          commonMistakes={[
            {
              mistake: '_transform() mein this.push() na karna',
              why: 'Bina push() ke transform output nahi deta — data consume hota hai lekin koi output nahi milta downstream ko.',
              fix: 'Har _transform() call mein this.push() zaroor karo (ya multiple push() if needed). Agar koi output nahi dena (filter case) — sirf callback() call karo.',
            },
            {
              mistake: '_flush() implement na karna jab buffering ho',
              why: 'Agar _transform() mein data buffer kar rahe ho (jaise line splitting) — last incomplete chunk _flush() mein process karna hota hai.',
              fix: '_flush() override karo aur remaining buffer data push karo, phir callback() call karo.',
            },
          ]}
          proTip="zlib module ka createGzip() / createGunzip() powerful built-in Transform hain. Aaj bhi production mein log compression ke liye widely use hote hain: file.pipe(zlib.createGzip()).pipe(gz). Bina custom code ke acha compression milta hai."
        />
      </div>

      {/* ConceptCard 5: Backpressure */}
      <div id="backpressure">
        <ConceptCard
          title="Backpressure — Overflow Mat Karo"
          emoji="🛑"
          difficulty="advanced"
          whatIsIt="Backpressure ek mechanism hai jo fast producer ko slow consumer ke saath sync karta hai. Agar Writable stream ka buffer full ho — Readable stream ko pause karna chahiye. Bina backpressure ke, data buffer mein stack hota rehta hai — eventually memory crash. pipe() ye automatically handle karta hai!"
          whenToUse={[
            'Jab bhi Readable ko Writable se connect karo — hamesha backpressure consider karo',
            'Custom piping implement karo toh drain event handle karo',
            'High-throughput data processing — logs, media, large exports',
            'Producer consumer speed mismatch ho — network vs disk speed',
          ]}
          whyUseIt="Backpressure Node.js streams ka safety valve hai. Fast network read slow disk write se faster ho sakti hai — bina backpressure ke buffer unlimited grow karta hai — OutOfMemory. pipe() ye sab automatically handle karta hai — manual piping mein ye sab likhna padta hai."
          howToUse={{
            filename: 'backpressure.js',
            language: 'javascript',
            code: `const fs = require('fs')
const { pipeline } = require('stream/promises')

// ✅ pipe() — automatic backpressure
// Ye sab automatically handle karta hai!
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'))

// ✅ pipeline() — modern approach with proper error handling
async function copyFile(src, dest) {
  await pipeline(
    fs.createReadStream(src),
    fs.createWriteStream(dest),
  )
  console.log('Copy complete with proper cleanup!')
}

// ❌ Manual piping WITHOUT backpressure — dangerous!
const readable = fs.createReadStream('huge.txt')
const writable = fs.createWriteStream('output.txt')

readable.on('data', (chunk) => {
  // ❌ write() ka return value ignore — backpressure missing!
  writable.write(chunk) // Buffer overflow risk!
})

// ✅ Manual piping WITH backpressure — correct way
readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk)
  if (!canContinue) {
    readable.pause() // Buffer full — producer pause karo
    writable.once('drain', () => {
      readable.resume() // Buffer drained — resume karo
    })
  }
})

readable.on('end', () => writable.end())

// pipe() ka ye sab automatically karta hai internally!
// Isliye hamesha pipe() ya pipeline() prefer karo`,
            explanation: 'write() false return kare toh readable.pause() karo. drain event aane par readable.resume(). pipe() ye sab internally karta hai. pipeline() (from stream/promises) proper async handling aur cleanup deta hai.',
          }}
          realWorldScenario="Video streaming service mein: disk se video read karo (fast SSD), network par bhejo (variable speed). Slow network connection pe bina backpressure ke — disk se data bahut fast aata hai, network buffer full hota hai — crash. pipe() se: network slow ho toh disk read automatically pause."
          commonMistakes={[
            {
              mistake: 'Manual piping mein write() return value ignore karna',
              why: 'Buffer silently grow karta rehta hai jab tak OutOfMemory crash nahi hoti. Bahut subtle bug hai — sirf high-load ya slow consumers ke saath dikhta hai.',
              fix: 'write() ka return value check karo. False pe readable.pause(). drain pe readable.resume(). Ya simply — pipe() use karo!',
            },
            {
              mistake: 'pipe() mein error events handle na karna',
              why: 'pipe() error events automatically propagate nahi karta. Agar readable ya writable mein error aaye — stream silently fail ho sakti hai.',
              fix: 'pipeline() function use karo (require("stream/promises")) — ye proper error handling aur cleanup karta hai. Ya manually error events handle karo.',
            },
          ]}
          proTip="stream/promises mein pipeline() function use karo — ye pipe() se better hai. Automatic cleanup karta hai agar koi error aaye. Syntax: await pipeline(readable, transform, writable). Ye production-ready approach hai streams ke liye."
          demo={
            <BackpressureVisual />
          }
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 9 Quiz — Streams Check
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — streams ka concept pakad liya? Dekho!
          </p>
        </div>
        <QuizSection questions={streamsQuiz} chapterSlug="streams" />
      </div>
    </div>
  )
}
