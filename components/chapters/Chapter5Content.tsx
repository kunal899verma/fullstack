'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const fsQuiz = [
  {
    question: 'Production code mein file read karne ka sabse recommended modern approach kya hai?',
    options: [
      {
        text: 'fs.readFileSync() — simple aur direct hai',
        correct: false,
        explanation: 'readFileSync event loop block karta hai — server ke dusre requests wait karte hain. Sirf CLI scripts ya startup initialization mein use karo.',
      },
      {
        text: 'fs.readFile() with callback — traditional async way',
        correct: false,
        explanation: 'Kaam karta hai, lekin callback hell ho sakta hai nested operations mein. Modern code mein promises prefer karo.',
      },
      {
        text: 'fs.promises.readFile() with async/await — modern aur clean',
        correct: true,
        explanation: 'Bilkul sahi! fs.promises.readFile() async/await ke saath perfectly works karta hai — non-blocking, clean code, proper error handling with try/catch. Ye production ka recommended pattern hai.',
      },
      {
        text: 'fetch() API se file padho',
        correct: false,
        explanation: 'fetch() HTTP requests ke liye hai, local file system ke liye nahi. Local files ke liye fs module use karo.',
      },
    ],
  },
  {
    question: 'ENOENT error code ka kya matlab hai?',
    options: [
      {
        text: 'File mein permission nahi hai read karne ki',
        correct: false,
        explanation: 'Permission denied ka error code EACCES hota hai — ENOENT nahi.',
      },
      {
        text: 'File ya directory exist nahi karti — "Error NO ENTry"',
        correct: true,
        explanation: 'Sahi! ENOENT = "Error NO ENTry" — requested file ya directory exist nahi karti. Ye most common fs error hai. Check karo path sahi hai ya file exist karti hai.',
      },
      {
        text: 'File corrupt hai',
        correct: false,
        explanation: 'File corruption ke liye alag errors aate hain. ENOENT specifically "file not found" hai.',
      },
      {
        text: 'Disk full hai',
        correct: false,
        explanation: 'Disk full ke liye ENOSPC error code aata hai (Error NO SPaCe). ENOENT file not found hai.',
      },
    ],
  },
  {
    question: 'Large file (100MB+) line by line efficiently read karne ka best approach kya hai?',
    options: [
      {
        text: 'fs.readFile() se poori file read karo, phir split("\\n")',
        correct: false,
        explanation: '100MB file poori memory mein load hogi — heap overflow ya memory pressure ho sakta hai. Streaming approach use karo.',
      },
      {
        text: 'readline interface with fs.createReadStream() — line by line streaming',
        correct: true,
        explanation: 'Correct! readline module + createReadStream() mein sirf ek line memory mein hoti hai ek time par. 100MB, 1GB — koi fark nahi. Memory constant rehti hai. Ye production pattern hai.',
      },
      {
        text: 'fs.readFileSync() use karo — ye fastest hai',
        correct: false,
        explanation: 'readFileSync blocking hai aur poori file memory mein load karta hai — worst choice for large files.',
      },
      {
        text: 'Worker Thread mein file read karo',
        correct: false,
        explanation: 'Worker threads CPU-bound tasks ke liye hain. I/O ke liye Node.js ka async event loop already optimal hai — streaming approach better hai.',
      },
    ],
  },
  {
    question: 'Atomic file write kaise karte hain Node.js mein?',
    options: [
      {
        text: 'fs.writeFile() directly target file par — ye atomic hai',
        correct: false,
        explanation: 'writeFile atomic nahi hai — agar write ke beech mein crash ho, file corrupt ya partially written ho sakti hai.',
      },
      {
        text: 'fs.appendFile() use karo writeFile ki jagah',
        correct: false,
        explanation: 'appendFile existing file mein data add karta hai — ye atomic write ka solution nahi hai.',
      },
      {
        text: 'Temp file mein likho, phir fs.rename() se atomically move karo target location par',
        correct: true,
        explanation: 'Bilkul sahi! rename() operation OS level par atomic hota hai (same filesystem par). Write temp file → rename to final — agar kuch bhi fail hua, original file safe hai. Ye production pattern hai critical files ke liye.',
      },
      {
        text: 'fs.writeFileSync() use karo — ye atomic hai',
        correct: false,
        explanation: 'writeFileSync synchronous hai (blocking) lekin atomic nahi hai. Crash ke case mein file corrupt ho sakti hai.',
      },
    ],
  },
  {
    question: 'fs.watch() production mein use karne mein kya problem hai?',
    options: [
      {
        text: 'Bahut slow hai — polling interval zyada hai',
        correct: false,
        explanation: 'fs.watch() polling nahi karta — OS file system events use karta hai. Speed issue nahi hai.',
      },
      {
        text: 'Network filesystems par unreliable hai, OS-specific behavior, aur duplicate events aa sakte hain',
        correct: true,
        explanation: 'Sahi! fs.watch() cross-platform aur cross-filesystem inconsistent hai — NFS, SMB, Docker volumes mein kaafi issues hain. Duplicate events aate hain, some events miss hote hain. Production mein chokidar package prefer karo — ye sab handle karta hai.',
      },
      {
        text: 'fs.watch() directories watch nahi kar sakta — sirf files',
        correct: false,
        explanation: 'fs.watch() dono files aur directories watch kar sakta hai. Problem reliability aur cross-platform consistency hai.',
      },
      {
        text: 'Bahut zyada memory use karta hai',
        correct: false,
        explanation: 'Memory usage fs.watch() ki primary problem nahi hai — reliability aur cross-platform inconsistency hai.',
      },
    ],
  },
]

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function FsApproachDiagram() {
  const columns = [
    {
      title: 'Sync',
      icon: '🚫',
      code: 'readFileSync()',
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.08)',
      border: 'rgba(239,68,68,0.25)',
      pros: ['Simple to write', 'No callbacks'],
      cons: ['Blocks Event Loop', 'All other requests wait', 'Never in servers'],
    },
    {
      title: 'Async Callback',
      icon: '📞',
      code: 'readFile(cb)',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.25)',
      pros: ['Non-blocking', 'Legacy compatible'],
      cons: ['Callback hell risk', 'Error handling verbose'],
    },
    {
      title: 'Stream',
      icon: '🌊',
      code: 'createReadStream()',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.08)',
      border: 'rgba(16,185,129,0.25)',
      pros: ['Memory constant', 'Handles huge files', 'Best for > 100MB'],
      cons: ['More setup code'],
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">File System — Visual Overview</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {columns.map((col, i) => (
          <div key={i} className="flex-1 min-w-[130px] rounded-xl p-4" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
            <div className="text-center mb-3">
              <span className="text-2xl">{col.icon}</span>
              <p className="font-bold text-sm mt-1" style={{ color: col.color }}>{col.title}</p>
              <p className="text-[10px] font-mono text-[#71717A] mt-0.5">{col.code}</p>
            </div>
            <div className="space-y-1">
              {col.pros.map((p, j) => (
                <p key={j} className="text-[10px] text-[#10B981] flex gap-1"><span>✓</span><span>{p}</span></p>
              ))}
              {col.cons.map((c, j) => (
                <p key={j} className="text-[10px] text-[#71717A] flex gap-1"><span>✗</span><span>{c}</span></p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter5Content() {
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
          readFileSync server code mein use kiya? Tumne Event Loop murder kar diya!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bhai, ye shocking lagta hai, lekin sach hai. Server request handler mein{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">readFileSync</code>{' '}
          likhna matlab Event Loop ko ek file read hone tak completely freeze karna. Baaki 500 requests wait karengi. Ye ek common beginner mistake hai jo production mein server unresponsive kar deti hai. fs module teen styles mein aata hai — sync (dangerous in servers), callback (old style), aur promises (sahi tarika). Is chapter mein hum sahi tarika seekhenge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">fs</code>{' '}
          module Node.js mein file system ka door hai — read, write, delete, directories, watching — sab kuch. Is chapter mein hum teen API styles, common patterns, production-ready techniques, aur ek critical concept — streaming — cover karenge.
        </p>
      </div>

      <FsApproachDiagram />

      {/* ConceptCard 1: fs module overview */}
      <div id="fs-module-overview">
        <ConceptCard
          title="fs Module — Sync, Async, aur Promises"
          emoji="📁"
          difficulty="beginner"
          whatIsIt="fs module teen personalities mein aata hai — aur har ek ka use case bilkul alag hai! Style 1: Callbacks wala fs — purana, verbose, callback hell possible. Style 2: Synchronous fs — BLOCKING, Event Loop freeze! Sirf startup scripts mein allowed hai. Style 3: fs.promises — modern, async/await ke saath clean, production ke liye sahi. Rule yaad karo: Server mein hamesha fs.promises. CLI scripts aur startup mein sync OK hai. Callbacks legacy code mein hain — naya code mein use mat karo."
          whenToUse={[
            'fs.promises — Production servers, APIs, koi bhi async context',
            'fs callbacks — Legacy code maintain karna, stream-based operations',
            'Synchronous fs — CLI scripts, config load at startup (before server starts), one-time initialization',
            'fs.createReadStream — Large files efficiently process karna',
          ]}
          whyUseIt="Ye comparison dekho — callback style mein teen nested files padhna pyramid of doom! Error handling har jagah duplicate. fs.promises style mein: Promise.all se dono files parallel padho, ek try/catch sab handle karta hai, code linear aur readable. Aur performance bonus: parallel read matlab total time = slowest file ka time, na sum of all files. Ye ek architectural difference hai — readability aur speed dono!"
          howToUse={{
            filename: 'fs-styles.js',
            language: 'javascript',
            code: `import { readFile, writeFile } from 'node:fs/promises'
import { readFileSync, writeFileSync } from 'node:fs'
import fs from 'node:fs'

// ── Style 1: Callbacks (purana, avoid in new code) ────────
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Read error:', err.message)
    return
  }
  console.log('Data:', data)
})

// ── Style 2: fs.promises with async/await (RECOMMENDED) ───
async function readConfig() {
  try {
    const raw = await readFile('./config.json', 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Config file nahi mili — defaults use karein')
      return {}
    }
    throw err  // Dusre errors propagate karo
  }
}

// ── Style 3: Synchronous (sirf startup mein) ──────────────
// App start hone se PEHLE config load karo — ek baar, block OK hai
function loadStartupConfig() {
  try {
    const raw = readFileSync('./startup.json', 'utf8')
    return JSON.parse(raw)
  } catch {
    return { port: 3000 }
  }
}

// Server shuru hone se PEHLE call karo:
const config = loadStartupConfig()  // ✅ Startup mein sync OK hai
startServer(config)                  // Ab server start karo

// ── Style 4: Promises shorthand ───────────────────────────
// fs.promises object bhi available hai:
import { promises as fsp } from 'node:fs'
const content = await fsp.readFile('./file.txt', 'utf8')`,
            explanation: 'node:fs/promises se named imports lo — cleanest approach. Sync sirf startup mein jab server abhi start nahi hua. Production request handling mein hamesha await use karo — event loop free rehta hai.',
          }}
          realWorldScenario="Ek production Express server sochte hain — startup mein SSL certificate padhna hai, templates load karni hain, config file padhni hai. Ye sab server shuru hone SE PEHLE hota hai — koi request abhi nahi aa rahi. Yahan readFileSync bilkul sahi hai! Lekin server start hone ke baad koi bhi readFileSync = danger. User request aaye, file padhi, Event Loop frozen. Rule: Startup mein sync, runtime mein async. Ye distinction production engineers daily use karte hain."
          commonMistakes={[
            {
              mistake: 'Server request handlers mein readFileSync use karna',
              why: 'readFileSync main thread ko block karta hai. Ek request process ho rahi hai — baki sab wait karte hain. High traffic mein server completely unresponsive ho sakta hai.',
              fix: 'Request handlers mein hamesha await readFile() use karo. Sirf server startup code mein readFileSync allowed hai.',
            },
            {
              mistake: "require('fs') aur require('fs/promises') dono mix karna",
              why: 'fs aur fs/promises alag APIs hain — accidentally wrong version call ho sakta hai. Inconsistent error handling patterns bhi ho sakti hain.',
              fix: "import { readFile, writeFile, mkdir } from 'node:fs/promises' — ek consistent import statement. node: prefix use karo built-in modules ke liye — explicit aur clear.",
            },
          ]}
          proTip="node: prefix use karo hamesha — import { readFile } from 'node:fs/promises'. Ye explicitly batata hai ki ye built-in module hai, koi npm package 'fs' nahi. Clearer code, future-proof. Aur ek hidden gem: import { promises as fs } from 'node:fs' se pura promises API ek object mein milta hai — fs.readFile, fs.writeFile, fs.mkdir sab. Ek import, saari zarooraten!"
        />

        <div className="mt-6">
          <DiffBlock
            title="Callback Style vs Promise Style — Readability Difference"
            language="javascript"
            bad={{
              label: 'Callback Style (Avoid)',
              code: `// Callback hell — nested operations
fs.readFile('config.json', 'utf8', (err, configData) => {
  if (err) { return handleError(err) }
  const config = JSON.parse(configData)

  fs.readFile('users.json', 'utf8', (err, usersData) => {
    if (err) { return handleError(err) }
    const users = JSON.parse(usersData)

    fs.writeFile('output.json',
      JSON.stringify({ config, users }),
      (err) => {
        if (err) { return handleError(err) }
        console.log('Done!')
      }
    )
  })
})`,
              explanation: 'Har operation agle ki callback mein — pyramid of doom. Error handling repetitive hai. Hard to read, harder to maintain.',
            }}
            good={{
              label: 'Promise + async/await (Recommended)',
              code: `// Clean async/await — linear flow
import { readFile, writeFile } from 'node:fs/promises'

async function processFiles() {
  try {
    // Parallel reads — dono ek saath!
    const [configRaw, usersRaw] = await Promise.all([
      readFile('config.json', 'utf8'),
      readFile('users.json', 'utf8'),
    ])

    const config = JSON.parse(configRaw)
    const users = JSON.parse(usersRaw)

    await writeFile('output.json',
      JSON.stringify({ config, users }, null, 2)
    )
    console.log('Done!')
  } catch (err) {
    console.error('Error:', err.message)
  }
}`,
              explanation: 'async/await se linear, readable code. Promise.all se dono files parallel padhi gayi — faster! Ek try/catch sab errors handle karta hai.',
            }}
          />
        </div>
      </div>

      {/* ConceptCard 2: Reading Files */}
      <div id="reading-files">
        <ConceptCard
          title="Files Padhna — readFile, readline, aur JSON"
          emoji="📖"
          difficulty="beginner"
          whatIsIt="100MB log file padhni hai — readFile se padho ya stream se? Ye choice production mein critical hai! readFile se padho: 100MB memory instantly use hogi. 10 concurrent requests same file padhen: 1GB+ memory. Docker container OOM crash. Stream se padho: sirf ek chunk memory mein, file kitni bhi badi ho — memory constant rehti hai. Rule: Small files (config, templates) ke liye readFile OK hai. Large files (logs, CSVs, data exports) ke liye hamesha streaming. Aur error handling mein ENOENT (file not found) aur EACCES (permission denied) — ye dono hamesha handle karo!"
          whenToUse={[
            'readFile — small/medium files jo poori memory mein fit ho jaayein',
            'createReadStream + readline — large files (logs, CSVs) jo line by line process honi hain',
            'readFile + JSON.parse — JSON config files load karna',
            'readFile encoding nahi dena — binary data (images, PDFs) ke liye Buffer milta hai',
          ]}
          whyUseIt="for await...of loop ka readline interface ke saath combination — ye modern Node.js ka sab se clean pattern hai large files ke liye. Ye generator-based iteration hai — ek line process karo, agli lo. Memory constant. 1GB file bhi 10-15MB memory mein process ho jaayegi. Aur JSON files ke liye readFile + JSON.parse combo bahut common hai — lekin error handling carefully karo: ENOENT (file nahi) aur SyntaxError (invalid JSON) dono alag cases hain, dono alag handle karo!"
          howToUse={{
            filename: 'reading-examples.js',
            language: 'javascript',
            code: `import { readFile, createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { promises as fs } from 'node:fs'

// ── Text File Read ─────────────────────────────────────────
const text = await fs.readFile('./README.md', 'utf8')
console.log(text.substring(0, 100))

// ── JSON File Read ─────────────────────────────────────────
async function loadJsonConfig(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(\`Config not found: \${filePath} — using defaults\`)
      return {}
    }
    if (err instanceof SyntaxError) {
      throw new Error(\`Invalid JSON in \${filePath}: \${err.message}\`)
    }
    throw err
  }
}

const config = await loadJsonConfig('./config.json')

// ── Binary File Read (no encoding → Buffer) ───────────────
const imageBuffer = await fs.readFile('./photo.jpg')
console.log('Image size:', imageBuffer.length, 'bytes')
console.log('Buffer type:', imageBuffer instanceof Buffer) // true

// ── Large File — Line by Line (Memory Efficient) ──────────
async function processLargeLog(filePath) {
  const fileStream = createReadStream(filePath, { encoding: 'utf8' })

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,  // Windows line endings handle karo
  })

  let lineCount = 0
  let errorCount = 0

  for await (const line of rl) {
    lineCount++
    if (line.includes('ERROR')) {
      errorCount++
      console.log(\`Error on line \${lineCount}:\`, line)
    }
  }

  return { lineCount, errorCount }
}

// 1GB log file bhi efficiently process hogi:
const stats = await processLargeLog('./server.log')
console.log('Total lines:', stats.lineCount)
console.log('Errors found:', stats.errorCount)

// ── Multiple Files Parallel ────────────────────────────────
const [userFile, productFile, orderFile] = await Promise.all([
  fs.readFile('./data/users.json', 'utf8'),
  fs.readFile('./data/products.json', 'utf8'),
  fs.readFile('./data/orders.json', 'utf8'),
])`,
            explanation: 'for await...of loop se readline interface iterate karo — sabse clean aur modern way. Memory constant rehti hai regardless of file size. Binary data ke liye encoding mat do — Buffer milega. Multiple files parallel padho Promise.all se.',
          }}
          realWorldScenario="Ek log analysis service — production servers ki daily logs 500MB+ hoti thi. Developer ne pehle readFile use kiya: memory 500MB+ ho jaati thi, Docker container 512MB limit ke saath crash hota tha. readline + createReadStream pe switch kiya — memory kabhi 15MB se nahi gayi, same file process karna shuru hua. Zero crashes. Streaming ek architectural decision hai jo production reliability guarantee karta hai — sirf syntax change nahi!"
          commonMistakes={[
            {
              mistake: 'Large files ko readFile se poora memory mein load karna',
              why: '100MB file read karna = 100MB heap use hoga. Agar multiple concurrent requests same kaam kar rahi hain, memory pressure se OOM (Out of Memory) crash ho sakta hai.',
              fix: 'Files > 10MB ke liye hamesha streaming approach use karo — createReadStream + readline ya pipe to transform stream.',
            },
            {
              mistake: 'ENOENT error ko handle nahi karna',
              why: 'File nahi mili toh unhandled error crash karega ya promise reject hoga. Production mein ye unexpected crashes cause karta hai.',
              fix: 'Hamesha try/catch mein err.code check karo: ENOENT = file nahi, EACCES = permission denied. Har case mein meaningful response do.',
            },
          ]}
          proTip="Error codes yaad kar lo — production mein chhota lagta hai, bada fark padta hai! ENOENT = file nahi mili. EACCES = permission denied. ENOSPC = disk full. EMFILE = too many open files (file descriptors exhausted). Generic catch mein err.code check karo aur meaningful response do — 'file not found' vs 'internal server error' user experience mein bahut fark hai. Aur EMFILE error aaye toh — tumhara app files band nahi kar raha, file descriptor leak hai. Stream close karo properly — stream.destroy() ya async iteration complete karo!"
        />
      </div>

      {/* ConceptCard 3: Writing Files */}
      <div id="writing-files">
        <ConceptCard
          title="Files Likhna — writeFile, appendFile, aur Atomic Writes"
          emoji="✍️"
          difficulty="beginner"
          whatIsIt="File write karna simple lagta hai — writeFile karo, kaam khatam! Lekin production mein ek silent danger hai: agar directly file mein likhte waqt server crash ho, file partially written ho sakti hai — corrupt data! Ye config files ke saath especially dangerous hai. Solution: Atomic write pattern. Pehle temp file mein likho, phir rename() se move karo. rename() OS level par atomic hai — ya poora hoga ya bilkul nahi. Corrupt file ka risk ZERO. Critical data ke liye ye pattern mandatory hai!"
          whenToUse={[
            'writeFile — nayi file banana ya existing ko completely overwrite karna',
            'appendFile — existing file mein data add karna (logs, audit trails)',
            'Atomic writes (temp + rename) — configs, user data, koi bhi critical file',
            'writeFileSync — sirf startup ya CLI scripts mein',
          ]}
          whyUseIt="Atomic write pattern step by step: Step 1: Same directory mein temp file banao (UUID naam se). Step 2: Temp file mein data likho. Step 3: rename() se target location par move karo — OS atomic operation. Agar Step 2 fail ho? Temp file hatao, original safe. Agar Step 3 fail ho? Temp file hatao, original safe. Kisi bhi point par crash ho — original file kabhi corrupt nahi hogi! rename() same filesystem par OS guarantee deta hai. JSON.stringify(data, null, 2) se human-readable JSON — debugging bahut aasan!"
          howToUse={{
            filename: 'writing-examples.js',
            language: 'javascript',
            code: `import { writeFile, appendFile, rename, mkdir } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import os from 'node:os'

// ── Basic Write ────────────────────────────────────────────
await writeFile('./output.txt', 'Hello, World!', 'utf8')

// ── JSON Write with Formatting ─────────────────────────────
const userData = {
  id: 1,
  name: 'Rahul',
  email: 'rahul@example.com',
  createdAt: new Date().toISOString(),
}

await writeFile(
  './users/user-1.json',
  JSON.stringify(userData, null, 2),  // 2-space indent — readable!
  'utf8'
)

// ── Append (logs, audit trail) ─────────────────────────────
const logEntry = \`[\${new Date().toISOString()}] User 123 logged in\n\`
await appendFile('./logs/access.log', logEntry, 'utf8')

// ── Atomic Write — Critical Files Ke Liye ─────────────────
// Step 1: Temp file mein likho (failure safe)
// Step 2: rename() se atomically move karo
async function atomicWrite(targetPath, content) {
  // Temp file same directory mein (rename atomic hone ke liye)
  const dir = path.dirname(targetPath)
  const tempPath = path.join(dir, \`.\${randomUUID()}.tmp\`)

  try {
    // Pehle temp file mein likho
    await writeFile(tempPath, content, 'utf8')
    // Phir atomically rename karo (OS-level atomic on same filesystem)
    await rename(tempPath, targetPath)
  } catch (err) {
    // Cleanup temp file agar kuch fail hua
    try {
      await import('node:fs/promises').then(fs => fs.unlink(tempPath))
    } catch {
      // Ignore cleanup errors
    }
    throw err
  }
}

// Use karo:
await atomicWrite('./config.json', JSON.stringify(newConfig, null, 2))

// ── Write with Error Handling ──────────────────────────────
async function safeWrite(filePath, content) {
  try {
    // Directory exist karo (recursive create)
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, content, 'utf8')
    return { success: true }
  } catch (err) {
    if (err.code === 'EACCES') {
      return { success: false, error: 'Permission denied' }
    }
    if (err.code === 'ENOSPC') {
      return { success: false, error: 'Disk full' }
    }
    throw err  // Unknown errors rethrow karo
  }
}`,
            explanation: 'Atomic write pattern: temp file mein likho, rename se move karo. rename() same filesystem par atomic hai. JSON.stringify(data, null, 2) human-readable output deta hai. mkdir({ recursive: true }) se directories automatically create hoti hain.',
          }}
          realWorldScenario="User profile update API — atomic writes ka perfect use case. Server 1000 concurrent users ke profiles update kar raha tha. Ek deployment ke dauran mid-write server restart hua — 3 user profiles corrupt ho gayi thi (direct writeFile use tha). Data recovery manually karni padi, users ko compensate karna pada. Atomic write pattern implement kiya — phir kabhi nahi hua. Ek pattern change, data integrity guaranteed!"
          commonMistakes={[
            {
              mistake: 'Write errors handle nahi karna — fire and forget',
              why: 'await writeFile ke baad error aa sakta hai (disk full, permission denied). Agar catch nahi kiya, unhandled promise rejection hoga — Node.js crash kar sakta hai ya silent data loss.',
              fix: 'Hamesha try/catch use karo write operations ke liye. Specific error codes handle karo (ENOSPC, EACCES). Critical writes ke liye atomic pattern use karo.',
            },
            {
              mistake: 'Server code mein writeFileSync use karna',
              why: 'writeFileSync event loop block karta hai write duration ke liye. Large files write karte waqt server completely unresponsive ho jaata hai.',
              fix: 'await writeFile() use karo — async, non-blocking. Sirf CLI one-off scripts ya server startup mein writeFileSync allowed hai.',
            },
          ]}
          proTip="Atomic write ka ek important gotcha — temp file SAME DIRECTORY mein hona chahiye jahan target file hai! Agar temp file alag drive ya filesystem par ho, rename() fail ho jaayega — different filesystems par atomic rename possible nahi. Isliye path.dirname(targetPath) se same directory lo, wahan temp file banao. Ye ek detail hai lekin production mein galat karo toh mysterious failures milti hain — especially Docker volumes aur NFS mounts par!"
        />
      </div>

      {/* ConceptCard 4: Directory Operations */}
      <div id="directory-operations">
        <ConceptCard
          title="Directory Operations — mkdir, readdir, stat"
          emoji="📂"
          difficulty="intermediate"
          whatIsIt="Directories ke saath kaam karna alag hai files se — aur bahut common bhi hai production mein. Upload folder banana, build output check karna, recursive file search karna — ye sab directory operations hain. Node.js mein mkdir({ recursive: true }) ek powerful tool hai — ye nested directories ek command mein banata hai, aur agar already exist kare toh error nahi deta (idempotent!). Idempotent operations production mein gold hain — baar baar call karo, same result. No 'already exists' errors!"
          whenToUse={[
            'Upload directories create karna user uploads ke liye',
            'Build output check karna — dist folder exist karta hai?',
            'Recursive directory structure banana (mkdir recursive)',
            'Directory contents list karna — files aur subdirs',
            'File metadata lena — size, modified date, type',
            'Directory tree walk karna — all files recursively find karna',
          ]}
          whyUseIt="Recursive directory walk — generator function + yield* combination — ye ek elegant pattern hai. Generator se memory efficient iteration hoti hai, yield* se recursive walk clean hota hai. withFileTypes: true — ye ek underappreciated optimization hai. Bina iske har entry ke liye alag stat() call karni padti — N+1 problem! withFileTypes se type info already available hai — ek call, poori directory info. Large directories mein ye performance difference significant hota hai."
          howToUse={{
            filename: 'directory-ops.js',
            language: 'javascript',
            code: `import {
  mkdir, readdir, stat, rm, rename, access
} from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'

// ── Directory Create ───────────────────────────────────────
// recursive: true → nested dirs ek command mein
await mkdir('./uploads/images/2024/01', { recursive: true })
// Agar already exist karta hai → no error (recursive mode)

// ── Check if Exists ────────────────────────────────────────
async function pathExists(p) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

const exists = await pathExists('./uploads')
console.log('Uploads folder exists:', exists)

// ── File/Dir Info ──────────────────────────────────────────
const info = await stat('./package.json')
console.log('Is file:', info.isFile())        // true
console.log('Is directory:', info.isDirectory()) // false
console.log('Size:', info.size, 'bytes')
console.log('Modified:', info.mtime)

// ── List Directory Contents ────────────────────────────────
// withFileTypes: true → DirEnt objects milte hain (type info ke saath)
const entries = await readdir('./src', { withFileTypes: true })
const files = entries.filter(e => e.isFile()).map(e => e.name)
const dirs = entries.filter(e => e.isDirectory()).map(e => e.name)
console.log('Files:', files)
console.log('Subdirs:', dirs)

// ── Recursive Directory Walk ────────────────────────────────
async function* walkDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walkDirectory(fullPath)  // Recurse into subdirectory
    } else {
      yield fullPath
    }
  }
}

// Sab .ts files dhundho:
const tsFiles = []
for await (const filePath of walkDirectory('./src')) {
  if (filePath.endsWith('.ts')) {
    tsFiles.push(filePath)
  }
}
console.log('TypeScript files:', tsFiles)

// ── Delete Directory (recursive) ──────────────────────────
await rm('./dist', { recursive: true, force: true })
// force: true → error nahi agar directory nahi hai

// ── Disk Usage (directory size) ────────────────────────────
async function getDirSize(dir) {
  let totalSize = 0
  for await (const filePath of walkDirectory(dir)) {
    const info = await stat(filePath)
    totalSize += info.size
  }
  return totalSize
}

const sizeBytes = await getDirSize('./node_modules')
console.log(\`node_modules size: \${Math.round(sizeBytes / 1024 / 1024)} MB\`)`,
            explanation: 'Generator function + yield* se elegant recursive directory walk. withFileTypes: true se extra stat() call nahi karna padta — type already entry mein hota hai. mkdir({ recursive: true }) idempotent hai — baar baar call karo, no error.',
          }}
          realWorldScenario="Multi-tenant SaaS app — har user ke liye alag upload directory: uploads/tenant-123/images/, uploads/tenant-123/docs/. User upload karta hai? mkdir({ recursive: true }) se directory ensure karo — agar exist kare toh no-op, nahi toh create. Race condition nahi (recursive mode mein), idempotent hai. Ab naye tenant ke liye onboarding — directory setup ek line. Scale karo 10,000 tenants tak — same code kaam karta hai. Ye production-ready patterns hain!"
          commonMistakes={[
            {
              mistake: 'fs.existsSync() ya exists() use karna file existence check ke liye',
              why: 'fs.exists() deprecated ho chuka hai. existsSync blocking hai. TOCTOU (Time Of Check Time Of Use) race condition bhi possible hai — check aur use ke beech file delete ho sakti hai.',
              fix: "access() use karo ya directly operation try karo with error handling. Better: mkdir({ recursive: true }) use karo — agar exists toh no-op, nahi toh create. 'Try first' pattern safer hai.",
            },
            {
              mistake: 'readdir ke results mein full path assume karna',
              why: 'readdir sirf filenames return karta hai — directory path nahi. path.join(dir, entry.name) karna padta hai full path ke liye.',
              fix: 'const fullPath = path.join(dirPath, filename) — hamesha path.join use karo. withFileTypes: true se DirEnt objects milte hain — isFile() aur isDirectory() methods se type check karo.',
            },
          ]}
          proTip="fs.existsSync() trap se bachna! Ye deprecated method hai aur TOCTOU race condition create karta hai — check karo ki file exist karti hai, phir create karne se pehle doosra process same file bana le. Instead: mkdir({ recursive: true }) use karo — agar exists toh no-op, nahi toh create. 'Try first' pattern hamesha safer hai than 'check then do'. Aur Node.js 22+ mein readdir({ recursive: true }) available hai — apna walk function nahi likhna, built-in use karo!"
        />
      </div>

      {/* ConceptCard 5: File Watching */}
      <div id="file-watching">
        <ConceptCard
          title="File Watching — fs.watch aur Hot Reload"
          emoji="👁️"
          difficulty="intermediate"
          whatIsIt="File watching — ek powerful concept jo bahut developers nahi jaante! fs.watch() se tumhara code OS-level events receive karta hai jab koi file change ho. Polling nahi — event-driven! Ye Kubernetes ConfigMap changes detect karne ke liye, development hot-reload ke liye, automated pipelines ke liye use hota hai. Lekin fs.watch() ke production limitations hain — Docker volumes, NFS mounts, network filesystems par unreliable hai. Production ke liye chokidar package — ye sab handle karta hai aur more. nodemon, Vite, webpack — sab internally chokidar use karte hain!"
          whenToUse={[
            'Development tools — file save hone par auto-restart (nodemon jaise)',
            'Config hot reload — server restart ke bina config changes apply karna',
            'File processing pipelines — nayi file aaye toh automatically process karo',
            'Build systems — source file change hone par re-build trigger karo',
          ]}
          whyUseIt="Debounce — ye concept file watching mein critical hai! Ek file save karne par OS multiple events fire karta hai (rename + change). Bina debounce ke callback baar baar chalegi — unnecessary processing, performance hit. 100ms debounce: pehla event aaya, timer set karo. Doosra event aaya (100ms ke andar)? Timer reset. Jab 100ms tak koi naya event nahi, tab callback chalao — ek baar. Ye pattern file watching mein standard hai — yaad rakhna!"
          howToUse={{
            filename: 'file-watching.js',
            language: 'javascript',
            code: `import { watch, readFile } from 'node:fs/promises'
import { watch as watchCb } from 'node:fs'

// ── fs.watch() — Built-in ──────────────────────────────────
// Simple file watch:
const watcher = watchCb('./config.json', (eventType, filename) => {
  console.log(\`Event: \${eventType}, File: \${filename}\`)
  // eventType: 'rename' ya 'change'
  // Note: duplicate events aa sakte hain — debounce karo!
})

// Cleanup karo jab done ho:
// watcher.close()

// ── fs.promises.watch() — Modern API ──────────────────────
async function watchConfig(configPath, onChange) {
  const watcher = watch(configPath)

  // Debounce — duplicate events handle karo
  let debounceTimer = null

  for await (const { eventType, filename } of watcher) {
    if (eventType === 'change') {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(async () => {
        try {
          const raw = await readFile(configPath, 'utf8')
          const newConfig = JSON.parse(raw)
          await onChange(newConfig)
          console.log('Config reloaded:', new Date().toLocaleTimeString())
        } catch (err) {
          console.error('Config reload failed:', err.message)
        }
      }, 100)  // 100ms debounce
    }
  }
}

// Config hot reload example:
let appConfig = { port: 3000, logLevel: 'info' }

watchConfig('./config.json', async (newConfig) => {
  appConfig = newConfig
  console.log('App config updated — no restart needed!')
})

// ── Directory Watch ────────────────────────────────────────
const dirWatcher = watchCb('./uploads', { recursive: true }, (event, file) => {
  if (event === 'rename' && file) {
    console.log('New file uploaded:', file)
    processUpload(file)
  }
})

// ── chokidar — Production Recommended ─────────────────────
// npm install chokidar
import chokidar from 'chokidar'

const chokidarWatcher = chokidar.watch('./src', {
  ignored: /(^|[/\\\\])\\.../,  // hidden files ignore
  persistent: true,
  ignoreInitial: true,          // existing files par event fire nahi
  awaitWriteFinish: {           // file fully written hone tak wait karo
    stabilityThreshold: 200,
    pollInterval: 100,
  },
})

chokidarWatcher
  .on('add', path => console.log(\`New file: \${path}\`))
  .on('change', path => console.log(\`Changed: \${path}\`))
  .on('unlink', path => console.log(\`Deleted: \${path}\`))
  .on('error', error => console.error(\`Watch error: \${error}\`))`,
            explanation: 'fs.watch() simple cases ke liye kaafi hai. Debounce lagao duplicate events ke liye. Production ya complex watching (network drives, Docker volumes) ke liye chokidar use karo — reliable, cross-platform, aur feature-rich.',
          }}
          realWorldScenario="Kubernetes microservice mein config hot reload — ye ek real production pattern hai! ConfigMap update hota hai, mounted file change hoti hai, chokidar detect karta hai, app new database connection string load karta hai, reconnect karta hai. Zero downtime, koi pod restart nahi. Bina ye pattern ke har config change ke liye pod restart karna padta — downtime. File watching se zero-downtime config updates possible hoti hain. Modern k8s apps mein ye standard hai!"
          commonMistakes={[
            {
              mistake: 'fs.watch() ko Docker volumes aur network filesystems par use karna',
              why: 'Docker volumes, NFS, SMB par fs.watch() ke events reliable nahi hote — miss hote hain ya kabhi fire nahi hote. OS-level inotify/kqueue network drives par consistently kaam nahi karta.',
              fix: 'Docker environments ya network filesystems ke liye chokidar use karo usePolling: true option ke saath. Ye polling-based fallback use karta hai jab native events unreliable hon.',
            },
            {
              mistake: 'Duplicate events handle nahi karna — ek change par multiple callbacks fire hote hain',
              why: 'OS level par ek file save se multiple events aate hain (rename + change). Bina debounce ke callback baar baar fire hogi — performance issue, unnecessary processing.',
              fix: '100-200ms debounce lagao: clearTimeout(timer); timer = setTimeout(handler, 100). Ya chokidar use karo jo awaitWriteFinish option se ye automatically handle karta hai.',
            },
          ]}
          proTip="Docker volumes mein fs.watch() broken hai — ye bahut commonly encountered production bug hai. Container mein app chalao, volume mounted config file change karo — event kabhi nahi aata! Fix: chokidar use karo usePolling: true option ke saath (Docker volumes ke liye). Ye native events ki jagah polling use karta hai — reliable but slightly more CPU. Production Docker environment hai? hamesha chokidar + usePolling: true. Development mein native events. Ye ek line ki config change hai jo production reliability guarantee karti hai!"
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 5 Quiz — File System Mastery
          </h3>
          <p className="text-sm text-[#71717A]">
            fs module ka gyaan solid hai? 5 questions — 80%+ chahiye pass ke liye!
          </p>
        </div>
        <QuizSection questions={fsQuiz} chapterSlug="file-system" />
      </div>
    </div>
  )
}
