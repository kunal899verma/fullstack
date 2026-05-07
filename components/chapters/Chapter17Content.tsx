'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function CpuUtilDiagram() {
  const cores = Array.from({ length: 8 }, (_, i) => i)
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Worker Threads — Visual Overview</p>
      <div className="max-w-xl mx-auto flex gap-4 flex-wrap justify-center">
        {/* Without workers */}
        <div className="flex-1 min-w-[160px] rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <p className="text-xs font-bold text-[#EF4444] text-center mb-3">Without Worker Threads</p>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {cores.map((i) => (
              <div
                key={i}
                className="rounded-md h-8 flex items-center justify-center text-[10px] font-bold"
                style={i === 0
                  ? { background: 'rgba(239,68,68,0.4)', border: '1px solid rgba(239,68,68,0.6)', color: '#EF4444' }
                  : { background: 'rgba(63,63,70,0.4)', border: '1px solid rgba(63,63,70,0.6)', color: '#52525B' }
                }
              >
                {i === 0 ? '🔥' : '💤'}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#71717A] text-center">1 core busy, 7 idle</p>
          <p className="text-[10px] text-[#EF4444] text-center mt-1">CPU utilization: ~12%</p>
        </div>
        {/* With workers */}
        <div className="flex-1 min-w-[160px] rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}>
          <p className="text-xs font-bold text-[#10B981] text-center mb-3">With Worker Threads</p>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {cores.map((i) => (
              <div
                key={i}
                className="rounded-md h-8 flex items-center justify-center text-[10px] font-bold"
                style={{ background: 'rgba(16,185,129,0.3)', border: '1px solid rgba(16,185,129,0.5)', color: '#10B981' }}
              >
                ⚡
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#71717A] text-center">All 8 cores working</p>
          <p className="text-[10px] text-[#10B981] text-center mt-1">CPU utilization: ~100%</p>
        </div>
      </div>
      <p className="text-[10px] text-[#52525B] text-center mt-3">Worker Threads only help CPU-bound tasks — I/O is already handled concurrently by libuv</p>
    </div>
  )
}

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
          Kya aap jaante ho ki ek simple for loop Node.js server ko completely freeze kar sakti hai? Sirf ek heavy computation — ek fibonacci(50), ek large JSON parse — aur tumhara pura server 500ms tak kisi aur request ka jawab nahi deta. Single-threaded hone ki ye cost hai. Aur agar server 64-core machine pe run ho — 63 cores idle hain!
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Worker Threads aur Cluster module is problem ka solution hain. Lekin samajhna zaroori hai — ye sirf CPU-bound tasks ke liye hai. I/O-bound tasks (DB queries, API calls, file reads) ke liye ye zaroorat hi nahi — libuv pehle se concurrent handle karta hai. Galat jagah apply karo to overhead add hoga, benefit nahi.
        </p>
      </div>

      <CpuUtilDiagram />

      <div id="cpu-vs-io">
        <ConceptCard
          title="CPU-bound vs I/O-bound — Event Loop Blocking"
          emoji="⚖️"
          difficulty="advanced"
          whatIsIt="Surprise output pehle: server pe 100 concurrent requests aaye. 99 requests DB query kar rahe hain (I/O-bound, fast). 1 request fibonacci(45) calculate kar raha hai (CPU-bound, 500ms). Result: sab 100 requests 500ms delay hongi — woh 1 CPU task ne poora event loop hold kar liya. I/O-bound tasks libuv thread pool pe jaate hain — event loop free rehta hai. CPU-bound tasks main thread pe run karte hain — event loop block hota hai. 1 bure task ka punishment sab bhogti hain."
          whenToUse={[
            'CPU-bound identify karo: profiler se, ya task 100ms+ CPU use kare',
            'Worker Threads: CPU-bound computation alag thread mein',
            'Cluster: HTTP server har core par replicate karo',
            'I/O-bound? Kuch nahi karo — libuv handles it',
          ]}
          whyUseIt="Ab sawaal ye aata hai — kaise pata chalega ki event loop block ho raha hai? setInterval trick: ek interval 1 second pe set karo. Agar ye late fire hota hai (100ms+), event loop blocked hai. Clinic.js tool professionally ye diagnose karta hai — flame graphs, blocking events visualize karta hai. Pehle diagnose karo, phir Worker Threads ya Cluster decide karo. Problem bina diagnosis ke solve karna — andhere mein kaam karna hai."
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
            explanation: "Under the hood: Event loop monitoring — setInterval expected 1000ms pe fire ho, actual 1500ms pe fire hua = 500ms block. Ye real measurement hai. Delay 50ms+ = significant problem. libuv thread pool (default 4 threads) CPU-bound tasks ke liye nahi hai — sirf fs, dns, crypto ke liye. Worker threads alag V8 isolates hain — alag heap, alag event loop. Main thread se completely independent.",
          }}
          realWorldScenario="Image upload API: 100 concurrent uploads. Option A — main thread pe resize karo: 1 resize at a time, 99 requests wait karte hain = queue backup. Option B — Sharp library (internally worker threads use karti hai): concurrent resizes, main thread free. Option C — custom image processing main thread pe: same problem as A. Lesson: jo libraries CPU-bound kaam karte hain unke internals dekho — usually already worker threads use karte hain."
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
          proTip="Clinic.js ek free tool hai jo Node.js performance diagnosis ke liye hai — npm install -g clinic. clinic doctor -- node server.js run karo aur HTTP requests bhejo — flame graphs, event loop lag, I/O patterns visualize hote hain. Kabhi bhi guess mat karo ki problem CPU-bound hai ya I/O-bound — measure karo. Clinic.js sach bol deta hai. Phir decide karo Worker Threads ya Cluster — ya dono zaroori hain."
        />
      </div>

      <div id="worker-threads">
        <ConceptCard
          title="Worker Threads — True Parallel Computation"
          emoji="🧵"
          difficulty="advanced"
          whatIsIt="Worker Threads socho alag brain cells ki tarah — main brain (main thread) ek cell se kaam karta hai. Worker Thread ek naya brain cell hai — alag V8 instance, alag event loop, alag memory. Dono coordinate karte hain message passing se — ek dum messages telephone ki tarah. SharedArrayBuffer se dono cells ek shared whiteboard use kar sakte hain — zero-copy, fast. Under the hood: actual OS threads hain — CPU scheduler inhe different cores pe run kar sakta hai."
          whenToUse={[
            'CPU-bound computation — image processing, video encoding, ML',
            'Large data transformation — parsing huge JSON, CSV processing',
            'Cryptographic operations — mining, heavy hashing',
            'WASM modules jo CPU intensive hain',
          ]}
          whyUseIt="Ab sawaal ye aata hai — har task ke liye naya Worker Thread banao? Overhead hai: thread creation, V8 startup, initial compilation — ~50-100ms. Worker Pool pattern ye solve karta hai — N threads pehle se ready rakho, task aaya to available thread use karo, done hone par wapas pool mein. Pool size = CPU core count (CPU-bound tasks ke liye). Thread creation baar baar karna mana hai — pool always reuse karo."
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
            explanation: "Under the hood: Worker Pool step-by-step: 1) N workers startup pe create karo. 2) Task aaya — availableWorkers se pop karo. 3) Worker ko postMessage karo (structured clone algorithm se data serialize/copy). 4) Worker process kare, result postMessage se main thread ko bheje. 5) Main thread result receive kare, worker wapas available pool mein. Queue: agar koi worker available nahi — task queue mein push karo, worker free hone par pick karo.",
          }}
          realWorldScenario="Image upload service on 8-core server: 8 Worker Thread pool. Upload request aaya — thumbnail (200x200), WebP convert, blur hash calculate — teen CPU operations. Worker Thread pool se 3 workers parallel run karte hain — 3 CPU cores simultaneously kaam karte hain. Main thread: API requests handle karta rehta hai — unblocked. 10,000 uploads per hour — efficiently handled without main thread ever freezing."
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
          proTip="Khud Worker Pool mat likho — Piscina library use karo (fastest Node.js worker pool). Manual pool implementation mein bahut edge cases hain: worker crash handling, queue backpressure, idle worker timeout, graceful shutdown. Piscina ye sab professionally handle karta hai. npm install piscina — ek import, simple API. Production mein battle-tested code use karo, khud invent mat karo."
        />
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-[#A78BFA] font-semibold mb-2">🤔 Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Worker Threads CPU-bound kaam alag thread mein karte hain — same process ke andar. Lekin agar HTTP server khud scale karna ho? 8-core server pe ek Node.js process sirf 1 core use karta hai — baaki 7 idle. Cluster module ye problem solve karta hai — multiple processes, same port, OS load balance karta hai. Worker Threads aur Cluster alag problems solve karte hain — dono ek saath use ho sakte hain.
        </p>
      </div>

      <div id="cluster-module">
        <ConceptCard
          title="Cluster Module — Multi-Process Scaling"
          emoji="🌐"
          difficulty="advanced"
          whatIsIt="Cluster socho ek franchise ki tarah — ek brand (master process), multiple outlets (worker processes). Har outlet alag building mein hai — crash isolation. Ek outlet aag lage (crash), baaki chal te rehte hain. Master traffic route karta hai — OS round-robin load balancing. Har worker completely alag process hai — alag memory, alag V8 — Worker Threads se fundamental difference: no shared memory, more isolation."
          whenToUse={[
            'HTTP server jisko multiple CPU cores use karna ho',
            'Worker processes alag memory space mein isolate karna ho (crash safety)',
            'Zero-downtime deployment — rolling restart of workers',
            'Production servers jahan PM2 nahi hai',
          ]}
          whyUseIt="Ab sawaal ye aata hai — Worker Threads bhi CPU use karte hain, Cluster bhi — kab kaunsa? Worker Threads: same process, shared memory, CPU-bound tasks offload karna. Cluster: multiple processes, HTTP server scale karna, full CPU utilization, crash isolation. Real production use case: Cluster se N HTTP servers (N = CPU cores), aur agar CPU-bound work hai toh har worker process ke andar Worker Thread pool bhi. Dono ek saath use kar sakte hain."
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
            explanation: "Under the hood: Primary process (master) HTTP request handle nahi karta — sirf fork, restart aur IPC. Workers sab HTTP handle karte hain. OS round-robin load balance karta hai (Linux SO_REUSEPORT). IPC (Inter-Process Communication): process.send() aur process.on('message') — serialize karna padta hai (structured clone). Shared state problem: Worker A mein counter 5, Worker B mein 0 — alag memory. Solution: Redis shared state ke liye ya master mein centralize karo aur IPC se broadcast karo.",
          }}
          realWorldScenario="8-core production server benchmark: Without cluster — 1,000 req/sec (1 core). With 8 workers cluster — 6,500 req/sec (overhead ke baad 6.5x improvement, theoretically 8x). Real-world aisa hi hota hai — overhead hai IPC, OS scheduling. Ek worker crash kare — master immediately naya spawn kare — downtime sirf us ek worker ka briefly (milliseconds). PM2 ye sab aur better manage karta hai."
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
          proTip={'Manual cluster code likhne ki jagah PM2 use karo — ye sab automatically manage karta hai. Ya agar container environment hai (Docker/Kubernetes) toh Cluster nahi chahiye — containers replicate karo, ek process per container pattern better hai. Kubernetes pe horizontal pod autoscaling Cluster se zyada flexible hai. Bare metal ya single VPS pe — PM2 cluster mode perfect choice.'}
        />
      </div>

      <div id="pm2">
        <ConceptCard
          title="PM2 — Production Process Manager"
          emoji="🔧"
          difficulty="advanced"
          whatIsIt="node server.js production mein run karna aise hai jaise bina seat belt ke drive karna — crash hoga, koi nahi bachayega. PM2 seat belt + airbag + crash detection + auto-restart sab ek saath hai. Crash hone par automatically restart, zero-downtime rolling reload for new deployments, log management, startup script (server reboot pe app auto-start), real-time monitoring dashboard — ye sab PM2 deta hai. Production Node.js apps ke liye de facto standard tool."
          whenToUse={[
            'Production Node.js deployment — hamesha PM2 ya similar',
            'Zero-downtime deployment — new code deploy bina downtime ke',
            'Crash recovery — app crash kare toh automatically restart',
            'Multi-app management — multiple Node.js services ek machine par',
          ]}
          whyUseIt="Ab sawaal ye aata hai — Docker/Kubernetes use karte hain toh PM2 zaroori nahi kya? Correct — containers replicate karte hain at infrastructure level. Lekin bare metal VPS pe ya traditional deployment pe PM2 essential hai. pm2 reload zero-downtime deployment karta hai — ek ek worker restart karta hai, traffic baaki serve karte hain. pm2 monit real-time CPU/memory graph deta hai. Production mein visibility bahut important hai."
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
            explanation: "Under the hood: instances: 'max' = os.cpus().length workers. exec_mode: 'cluster' = Node.js cluster module internally use karta hai. max_memory_restart memory leak se protect karta hai — process 500MB pe automatically restart hoga. wait_ready: true ke saath PM2 process.send('ready') ka wait karta hai — app fully initialized hone ke baad hi traffic milta hai (graceful startup). pm2 reload: old worker stop (existing connections khatam hone tak wait) → new worker start → repeat per worker = zero downtime.",
          }}
          realWorldScenario="4-core VPS pe startup API: PM2 cluster mode — 4 workers. 2 AM pe memory leak se ek worker crash kare — PM2 immediately detect kare aur restart kare — users ko pata nahi chala. 10 AM pe naya code deploy karna — npm run build → pm2 reload — 4 workers ek ek restart hote hain, traffic seamless serve hoti hai. Ye zero-downtime deployment free mein milti hai PM2 se."
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
          proTip="PM2 sequence yaad rakho — ye critical hai: pm2 startup (systemd unit create karo) → pm2 start ecosystem.config.cjs --env production → pm2 save (current process list save karo). Ye sequence miss karo — server reboot hone par PM2 empty startup karta hai. pm2 logs --lines 200 se recent logs immediately check karo kuch bhi diagnose karne se pehle. pm2 monit — real-time CPU/memory har worker ke liye — production debugging ka pehla tool."
        />
      </div>

      <div id="shared-array-buffer">
        <ConceptCard
          title="SharedArrayBuffer — Shared Memory"
          emoji="🔗"
          difficulty="advanced"
          whatIsIt="Kya aap jaante ho ki 1GB image buffer Worker Thread ko bhejne mein regular postMessage se 1 second+ lag sakta hai? Reason: structured clone algorithm poora buffer copy karta hai — main thread → worker thread ek complete copy. SharedArrayBuffer ek shared whiteboard hai — dono threads same memory block access karte hain, koi copying nahi. Atomics API concurrent access safe banati hai — race conditions prevent. Zero-copy = dramatically faster for large data."
          whenToUse={[
            'Large data share karna workers mein — copy overhead avoid karo',
            'High-frequency updates between workers — gaming, simulations',
            'Lock-free concurrent algorithms — Atomics with wait/notify',
            'Image/video processing pipelines — large buffers share karo',
          ]}
          whyUseIt="Ab sawaal ye aata hai — agar SharedArrayBuffer itna fast hai toh hamesha use karein? Complexity: Atomics ka sahih use karna advanced hai — deadlocks, live locks possible hain. Regular postMessage zyada cases mein kaafi hai. SharedArrayBuffer sirf jab: large data (10MB+) share karna ho, high-frequency updates (gaming, simulations) ho, ya WASM integration ho. Premature optimization avoid karo — pehle simple approach, phir profile, phir optimize."
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
            explanation: "Under the hood: Atomics.add() CPU-level atomic instruction use karta hai — lock-free. Concurrent workers same address par add karte hain, koi race condition nahi — CPU guarantee karta hai. Atomics.compareExchange() CAS (Compare-and-Swap) implement karta hai — lock-free algorithms ka building block. Atomics.wait() thread ko block karta hai condition ke liye. Transferable objects (ArrayBuffer) ownership transfer karte hain — source inaccessible ho jaata hai (detached). Zero-copy is used for ownership transfer, SharedArrayBuffer for concurrent access.",
          }}
          realWorldScenario="Game server 60fps tick (16ms): 1000 entities — position, velocity, collision update. Regular postMessage: 1000 entities serialize karo → worker bhejo → worker deserialize → calculate → serialize → main thread → deserialize = 5+ copy operations per tick. SharedArrayBuffer: positions Float64Array mein shared memory pe. Workers directly read/write karte hain Atomics se. Main thread direct read karta hai — zero copying. 60fps smooth gameplay possible."
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
          proTip="Comlink library (by Surma, Google) Worker Threads communication dramatically simple banata hai — postMessage/onmessage ki bajaye RPC-style API. const result = await wrap(new Worker(...)).heavyFunction(data). Ye generator aur Proxy use karta hai internally — worker functions async functions ki tarah feel karte hain. Complex message passing completely hidden. Learning ke liye raw API samjho, production mein Comlink ya Piscina use karo."
        />
      </div>
    </div>
  )
}
