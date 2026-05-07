'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function Chapter17Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Worker Threads & Clustering — True Parallelism
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Node.js single-threaded hai — ek CPU core use karta hai. Modern servers 64+ cores hain. Multi-core power use karne ke liye: Worker Threads (threads within process) aur Cluster module (multiple processes). PM2 production mein process management karta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye sab CPU-bound tasks ke liye hai — image processing, encryption, ML inference. I/O-bound tasks ke liye ye zaroori nahi — libuv already concurrent handle karta hai.
        </p>
      </div>

      <div id="cpu-vs-io">
        <ConceptCard
          title="CPU-bound vs I/O-bound — Event Loop Blocking"
          emoji="⚖️"
          difficulty="advanced"
          whatIsIt="I/O-bound: File read, DB query, API call — mostly waiting. Node.js excellent hai — libuv async handling. CPU-bound: Image resize, encryption, JSON parsing of huge files, ML inference — actual computation. Main thread block ho jaata hai — other requests wait karte hain. 1 slow CPU task = server unresponsive."
          whenToUse={[
            'CPU-bound identify karo: profiler se, ya task 100ms+ CPU use kare',
            'Worker Threads: CPU-bound computation alag thread mein',
            'Cluster: HTTP server har core par replicate karo',
            'I/O-bound? Kuch nahi karo — libuv handles it',
          ]}
          whyUseIt="Event loop ek single thread par run karta hai. CPU-bound task us thread ko block karta hai — koi aur callback execute nahi hota — server appears frozen to other users. Worker threads alag threads mein run karte hain — main event loop unblocked rehta hai."
          howToUse={{
            filename: 'cpu-vs-io.js',
            language: 'javascript',
            code: `// I/O-bound — Event loop block nahi hota
// libuv thread pool par ho jaata hai
app.get('/file', async (req, res) => {
  const data = await fs.promises.readFile('large-file.txt')  // Non-blocking!
  // Main thread free raha — dusre requests serve hote rahe
  res.send(data)
})

// CPU-bound — EVENT LOOP BLOCK KARTA HAI!
app.get('/compute', (req, res) => {
  // ❌ BAD — main thread block
  const result = heavyCryptoOperation(req.body)  // 500ms block
  // Saare requests is 500ms mein wait karte hain!
  res.json({ result })
})

// Kaise pata chalega CPU block hai?
function detectBlock() {
  let lastTime = Date.now()

  setInterval(() => {
    const now = Date.now()
    const delay = now - lastTime - 1000  // Expected: ~0ms extra
    if (delay > 50) {
      console.warn(\`Event loop blocked for \${delay}ms!\`)
    }
    lastTime = now
  }, 1000)
}

// CPU-bound task examples:
// - crypto.pbkdf2Sync (use async version!)
// - Sharp image resize (has its own thread pool)
// - Parsing 100MB JSON
// - Complex regex on large strings
// - ML inference (TensorFlow.js CPU mode)
// - Fibonacci(50) aur similar pure compute`,
            explanation: "Event loop monitoring — setInterval agar late fire hota hai toh event loop blocked hai. Delay 50ms+ = problem. Production monitoring tools (Clinic.js) visually dikhate hain blocking events. libuv thread pool CPU-bound tasks ke liye nahi hai — sirf file I/O, DNS, crypto ke liye.",
          }}
          realWorldScenario="Image upload API — Sharp se resize karo. Sharp internally worker threads use karta hai — main thread unblocked. Lekin agar khud Buffer manipulation ya custom image processing karo main thread par — 100 concurrent uploads = 100 users wait karte hain. Worker Thread solution."
          commonMistakes={[
            {
              mistake: 'Sab tasks Worker Threads mein daalna',
              why: 'Worker Thread overhead hai — thread creation, message passing, serialization. Simple/fast tasks ke liye overhead benefit se zyada.',
              fix: 'Profile karo — 100ms+ CPU time wale tasks Worker Thread candidates hain. Simple DB queries, small transforms — main thread par theek hain.',
            },
            {
              mistake: 'Synchronous crypto functions main thread par',
              why: 'crypto.pbkdf2Sync bcrypt se slower alternative hai aur main thread block karta hai.',
              fix: 'Hamesha async versions: crypto.pbkdf2() (callback), util.promisify(crypto.pbkdf2) — libuv thread pool par run hota hai.',
            },
          ]}
          proTip="Clinic.js install karo: npm install -g clinic. clinic doctor -- node server.js se production-grade analysis milti hai — flame graphs, event loop lag, I/O patterns. Jab app slow ho toh pehle diagnose karo, phir Worker Threads/Cluster decide karo."
        />
      </div>

      <div id="worker-threads">
        <ConceptCard
          title="Worker Threads — True Parallel Computation"
          emoji="🧵"
          difficulty="advanced"
          whatIsIt="Worker Threads (worker_threads module) actual OS threads hain — alag V8 instance, alag event loop, alag memory. Main thread aur workers message passing se communicate karte hain (MessageChannel, parentPort). SharedArrayBuffer se shared memory possible hai — zero-copy operations."
          whenToUse={[
            'CPU-bound computation — image processing, video encoding, ML',
            'Large data transformation — parsing huge JSON, CSV processing',
            'Cryptographic operations — mining, heavy hashing',
            'WASM modules jo CPU intensive hain',
          ]}
          whyUseIt="Worker Threads true parallelism dete hain — multiple CPU cores simultaneously use hote hain. Main thread event loop unblocked rehta hai. Child processes (cluster) se lighter hai — shared memory possible hai. V8 isolates mein run karte hain — crash isolation bhi hota hai."
          howToUse={{
            filename: 'worker.ts',
            language: 'typescript',
            code: `// worker.ts — worker script
import { parentPort, workerData, isMainThread } from 'worker_threads'

if (!isMainThread) {
  // Worker mein run ho raha hai
  const { numbers } = workerData as { numbers: number[] }

  // CPU-intensive computation
  const result = numbers.reduce((sum, n) => {
    // Simulate heavy computation
    let local = 0
    for (let i = 0; i < n; i++) local += Math.sqrt(i)
    return sum + local
  }, 0)

  // Result main thread ko bhejo
  parentPort?.postMessage({ result, threadId: workerData.threadId })
}

// main.ts — main thread
import { Worker, isMainThread } from 'worker_threads'
import path from 'path'

function runWorker(numbers: number[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
      workerData: { numbers },
    })

    worker.on('message', (msg: { result: number }) => resolve(msg.result))
    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker exited with code \${code}\`))
    })
  })
}

// Worker Pool — N workers maintain karo
class WorkerPool {
  private workers: Worker[] = []
  private queue: Array<{ resolve: (value: unknown) => void; reject: (err: Error) => void; data: unknown }> = []
  private availableWorkers: Worker[] = []

  constructor(private workerScript: string, private poolSize: number) {
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript)
      this.setupWorker(worker)
    }
  }

  private setupWorker(worker: Worker) {
    this.availableWorkers.push(worker)
    worker.on('message', (result) => {
      this.availableWorkers.push(worker)
      const next = this.queue.shift()
      if (next) this.processTask(worker, next)
      // Resolve current task
    })
  }

  run(data: unknown): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const task = { resolve, reject, data }
      const worker = this.availableWorkers.pop()
      if (worker) this.processTask(worker, task)
      else this.queue.push(task)
    })
  }

  private processTask(worker: Worker, task: typeof this.queue[0]) {
    worker.postMessage(task.data)
  }
}`,
            explanation: "Worker Pool pattern — N workers maintain karo, task aane par available worker use karo. Har task ke liye new worker create karna expensive hai — pooling reuse karta hai. workerData initial data pass karta hai. MessageChannel do workers ke beech direct communication deta hai.",
          }}
          realWorldScenario="Image upload service — har upload ke liye: thumbnail generate karo (200x200), webp convert karo, blur hash calculate karo. Teen Worker Threads pool mein — teen CPUs parallel kaam karte hain. 10,000 uploads per hour efficiently handled without blocking API."
          commonMistakes={[
            {
              mistake: 'Non-serializable data workers mein pass karna',
              why: "Worker threads message passing structured clone algorithm use karta hai — functions, class instances, sockets — non-serializable hain. Error: 'could not be cloned'.",
              fix: 'Sirf plain objects, arrays, primitives, TypedArrays pass karo. Complex objects ke liye serialize karo (JSON) ya SharedArrayBuffer use karo.',
            },
            {
              mistake: 'Workers terminate karna bhool jaana',
              why: 'Workers resources use karte hain — CPU polling, memory. Unused workers terminate nahi kiye toh resource leak.',
              fix: "Pool mein workers jab pool teardown ho tabb terminate karo: worker.terminate(). Exit events listen karo. graceful shutdown implement karo.",
            },
          ]}
          proTip="workerpool npm package Worker Pool professionally implement karta hai — manual pool mein bahut edge cases hain. Piscina bhi excellent choice hai — fastest Node.js worker pool library. Production mein battle-tested library use karo, khud Pool implement karne ki koshish mat karo pehli baar."
        />
      </div>

      <div id="cluster-module">
        <ConceptCard
          title="Cluster Module — Multi-Process Scaling"
          emoji="🌐"
          difficulty="advanced"
          whatIsIt="Node.js cluster module master process + N worker processes banata hai. Master network connections accept karta hai aur workers mein distribute karta hai. Har worker alag Node.js process hai — crash isolation, separate memory. CPU cores full use hoti hain. Worker threads se alag — separate processes, no shared memory."
          whenToUse={[
            'HTTP server jisko multiple CPU cores use karna ho',
            'Worker processes alag memory space mein isolate karna ho (crash safety)',
            'Zero-downtime deployment — rolling restart of workers',
            'Production servers jahan PM2 nahi hai',
          ]}
          whyUseIt="Single process Node.js ek CPU core use karta hai. 8-core server mein 7 cores waste. Cluster se 8 workers = 8 cores fully utilized. Crash isolation: ek worker crash kare toh master notice karta hai aur naya spawn karta hai — app available rehti hai. PM2 isse aur better manage karta hai."
          howToUse={{
            filename: 'cluster.ts',
            language: 'typescript',
            code: `import cluster from 'cluster'
import os from 'os'
import http from 'http'

const numCPUs = os.cpus().length

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`)
  console.log(\`Starting \${numCPUs} workers...\`)

  // CPU count ke hisaab se workers fork karo
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  // Worker crash par restart karo
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died (code: \${code}, signal: \${signal})\`)
    console.log('Starting a new worker...')
    cluster.fork()  // Automatic restart
  })

  // Worker-Master communication
  cluster.on('message', (worker, message) => {
    if (message.type === 'increment-counter') {
      // Master global state manage karta hai
      globalCounter++
      // Sab workers ko broadcast karo
      for (const w of Object.values(cluster.workers ?? {})) {
        w?.send({ type: 'counter-update', value: globalCounter })
      }
    }
  })

} else {
  // Worker — actual HTTP server
  const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end(\`Hello from Worker \${process.pid}\n\`)
  })

  server.listen(3000, () => {
    console.log(\`Worker \${process.pid} started on port 3000\`)
  })

  // Master se message receive karo
  process.on('message', (msg: { type: string; value: number }) => {
    if (msg.type === 'counter-update') {
      console.log('Global counter:', msg.value)
    }
  })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    server.close(() => process.exit(0))
  })
}`,
            explanation: "Primary process (master) sirf fork aur IPC karta hai — no direct request handling. Workers HTTP requests handle karte hain. OS round-robin load balancing karta hai workers mein (usually). IPC (Inter-Process Communication) — process.send() aur process.on('message') se master-worker communication. Shared state master mein rakho.",
          }}
          realWorldScenario="8-core production server — bina cluster: 1 core use, 7 idle. Cluster se 8 workers — sab cores busy. Throughput theoretically 8x better. Real-world 5-7x improvement hoti hai overhead ke baad. PM2 ise aur better manage karta hai production mein."
          commonMistakes={[
            {
              mistake: 'Workers mein shared in-memory state rakhna',
              why: 'Har worker alag process hai — memory share nahi hoti. Worker A mein counter 5 hoga, Worker B mein 0. Inconsistent state.',
              fix: 'Shared state Redis mein rakho. Ya master process state manage kare aur IPC se workers ko update kare. Database bhi consistent state deta hai.',
            },
            {
              mistake: 'Cluster development mein use karna',
              why: 'Multiple processes debugging complex banata hai. Hot reload nahi kaam karta properly. Unnecessary overhead development mein.',
              fix: 'Development mein single process use karo. Production mein cluster ya PM2 use karo. NODE_ENV check karo: if (process.env.NODE_ENV === "production") { cluster... }.',
            },
          ]}
          proTip={'throng npm package cluster setup simplify karta hai: const throng = require("throng"); throng({ start: startServer, workers: os.cpus().length }). One-liner cluster setup. PM2 se bhi aur simpler hai development-friendly tool ke roop mein.'}
        />
      </div>

      <div id="pm2">
        <ConceptCard
          title="PM2 — Production Process Manager"
          emoji="🔧"
          difficulty="advanced"
          whatIsIt="PM2 (Process Manager 2) Node.js apps ke liye production process manager hai. Cluster mode automatically — ek command se multi-core. Auto-restart on crash. Zero-downtime reload (rolling restart). Log management. Monitoring dashboard. Startup scripts (systemd/upstart). Production Node.js app ke liye standard tool."
          whenToUse={[
            'Production Node.js deployment — hamesha PM2 ya similar',
            'Zero-downtime deployment — new code deploy bina downtime ke',
            'Crash recovery — app crash kare toh automatically restart',
            'Multi-app management — multiple Node.js services ek machine par',
          ]}
          whyUseIt="node server.js production mein run karna — crash hone par app down. PM2 restart karta hai automatically. Cluster mode ek line se: pm2 start app.js -i max. Log rotation. Process monitoring. Startup integration — server reboot hone par app automatic start hota hai."
          howToUse={{
            filename: 'ecosystem.config.cjs',
            language: 'javascript',
            code: `// ecosystem.config.cjs — PM2 configuration
module.exports = {
  apps: [
    {
      name: 'api-server',
      script: 'dist/server.js',
      instances: 'max',              // CPU count ke equal
      exec_mode: 'cluster',          // Cluster mode
      autorestart: true,             // Crash par restart
      watch: false,                  // Production mein false
      max_memory_restart: '500M',    // Memory limit par restart
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Logging
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // Graceful shutdown
      kill_timeout: 3000,            // 3s graceful shutdown timeout
      wait_ready: true,              // process.send('ready') ka wait
      listen_timeout: 10000,
    }
  ]
}

// PM2 Commands:
// pm2 start ecosystem.config.cjs --env production
// pm2 list                     — running processes
// pm2 logs api-server          — live logs
// pm2 monit                    — dashboard
// pm2 reload api-server        — zero-downtime reload
// pm2 restart api-server       — restart (brief downtime)
// pm2 stop api-server          — stop
// pm2 delete api-server        — remove from list

// Startup — system reboot par auto-start
// pm2 startup                  — startup command generate
// pm2 save                     — current process list save`,
            explanation: "instances: 'max' = CPU cores count workers. exec_mode: 'cluster' = cluster mode. max_memory_restart memory leak se protect karta hai — process restart karo. wait_ready: true ke saath app ko process.send('ready') call karna padega jab fully started ho — readiness signal. pm2 reload zero-downtime rolling restart karta hai.",
          }}
          realWorldScenario="Startup API server 4-core VPS par: PM2 cluster mode se 4 workers. 1 worker crash kare — PM2 immediately restart kare. New code deploy: npm run build → pm2 reload — zero downtime, users unaffected. Production standard practice worldwide."
          commonMistakes={[
            {
              mistake: 'pm2 save bhoolna startup script ke baad',
              why: 'pm2 startup systemd unit create karta hai lekin pm2 save nahi kiya toh current apps list save nahi hoti — reboot par empty PM2.',
              fix: 'Hamesha: pm2 startup → pm2 start/restart → pm2 save. Ye sequence ensure karta hai reboot recovery.',
            },
            {
              mistake: 'watch: true production mein',
              why: 'Production mein file system changes (logs, temp files) par PM2 restart karta hai — chaotic restarts.',
              fix: 'watch: false production mein hamesha. Development mein watch useful hai. Production code changes deploy ke through happen karo (pm2 reload).',
            },
          ]}
          proTip="PM2 Plus (cloud dashboard) se remote monitoring karo. Ya open-source alternative: Keymetrics. Production mein hamesha pm2 logs --lines 100 se recent logs check karo. pm2 monit real-time CPU/Memory graph deta hai har worker ke liye — performance monitoring basic hai."
        />
      </div>

      <div id="shared-array-buffer">
        <ConceptCard
          title="SharedArrayBuffer — Shared Memory"
          emoji="🔗"
          difficulty="advanced"
          whatIsIt="SharedArrayBuffer multiple Worker Threads ke beech shared memory deta hai — zero-copy data sharing. Normal postMessage data serialize (copy) karta hai — large data expensive. SharedArrayBuffer same memory block share karta hai — no copying. Atomics API concurrent access ke liye atomic operations provide karta hai — race conditions prevent."
          whenToUse={[
            'Large data share karna workers mein — copy overhead avoid karo',
            'High-frequency updates between workers — gaming, simulations',
            'Lock-free concurrent algorithms — Atomics with wait/notify',
            'Image/video processing pipelines — large buffers share karo',
          ]}
          whyUseIt="1GB image buffer har worker ko copy karna impractical hai. SharedArrayBuffer se ek allocation, sab workers access karte hain. Atomics ensure karte hain ke concurrent reads/writes safe hain. WASM modules ke saath especially useful — shared memory WASM heap."
          howToUse={{
            filename: 'shared-memory.ts',
            language: 'typescript',
            code: `// SharedArrayBuffer — server headers zaroori hain:
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Embedder-Policy: require-corp

import { Worker, isMainThread, workerData, parentPort } from 'worker_threads'

if (isMainThread) {
  // Shared memory create karo — 4 Int32 values (16 bytes)
  const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 4)
  const sharedArray = new Int32Array(sharedBuffer)

  // Initial values set karo
  Atomics.store(sharedArray, 0, 100)  // Counter start: 100

  // Multiple workers create karo — same buffer share
  const workers = Array.from({ length: 4 }, () =>
    new Worker(__filename, { workerData: { sharedBuffer } })
  )

  // Sab workers finish hone ka wait karo
  let done = 0
  workers.forEach(worker => {
    worker.on('message', () => {
      done++
      if (done === workers.length) {
        // Final value — atomic operations ensure consistency
        console.log('Final counter:', Atomics.load(sharedArray, 0))
      }
    })
  })

} else {
  // Worker thread
  const sharedArray = new Int32Array(workerData.sharedBuffer)

  // Atomic operations — thread-safe
  for (let i = 0; i < 1000; i++) {
    Atomics.add(sharedArray, 0, 1)  // Atomic increment — race condition free
  }

  // Atomics.wait — wait karo condition ke liye
  // Atomics.notify — doosre threads ko notify karo

  parentPort?.postMessage('done')
}

// Transferable objects — zero-copy transfer (ownership transfer)
const buffer = new ArrayBuffer(1024 * 1024)  // 1MB
worker.postMessage({ buffer }, [buffer])  // Transfer ownership
// Main thread mein buffer ab inaccessible hai`,
            explanation: "Atomics.add() atomic hai — concurrent workers same location par add karte hain bina race condition ke. Compare-and-swap (CAS) lock-free algorithms ke liye: Atomics.compareExchange(). wait/notify mutex implement karne ke liye. Transferable objects (ArrayBuffer) ownership transfer karte hain — zero-copy lekin source inaccessible ho jaata hai.",
          }}
          realWorldScenario="Game server — 1000 entities ki position update karna har tick. SharedArrayBuffer mein positions store karo — worker threads parallel physics calculations karte hain shared buffer par. Final state main thread read karta hai — sab workers se sync hota hai Atomics se. High-frequency, low-latency update pipeline."
          commonMistakes={[
            {
              mistake: 'SharedArrayBuffer mein non-atomic reads/writes mix karna',
              why: 'Direct array[i] = value bina Atomics ke concurrent access mein data race create karta hai — undefined behavior.',
              fix: 'Hamesha Atomics operations use karo concurrent access ke liye. Single-threaded access ke baad hi direct indexing safe hai.',
            },
            {
              mistake: 'Browser mein SharedArrayBuffer use karna without COOP/COEP headers',
              why: 'Spectre vulnerability ke baad browsers ne SharedArrayBuffer restrict kar diya — COOP/COEP headers required.',
              fix: "Server se headers bhejo: Cross-Origin-Opener-Policy: same-origin aur Cross-Origin-Embedder-Policy: require-corp. Node.js mein ye restriction nahi hai.",
            },
          ]}
          proTip="Comlink library (from Surma, Google) Worker Threads ke liye RPC-like API deta hai — complex message passing hide karta hai. const worker = wrap(new Worker(...)). Worker ke functions async functions ki tarah use karo. Complex Worker communication dramatically simpler ho jaati hai."
        />
      </div>
    </div>
  )
}
