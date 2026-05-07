'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Demo = 'http' | 'cpu' | null
type Tab = 'visualization' | 'code'

const CLUSTER_CODE = `const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  console.log(\`Master \${process.pid} is running\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Auto-restart!
  });

} else {
  // Workers share TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from worker ' + process.pid);
  }).listen(8000);

  console.log(\`Worker \${process.pid} started\`);
}`

const WORKER_THREADS_CODE = `const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  // Main thread
  const worker = new Worker(__filename, {
    workerData: { num: 1e9 }
  });

  worker.on('message', result => {
    console.log('Result:', result);
  });

  // Main thread remains UNBLOCKED!
  console.log('Main thread free for other work');

} else {
  // Worker thread — CPU-heavy computation
  let sum = 0;
  for (let i = 0; i < workerData.num; i++) {
    sum += i;
  }
  parentPort.postMessage(sum);
}`

interface WorkerState {
  id: number
  status: 'idle' | 'processing' | 'done'
  requestId?: number
}

const WORKER_COUNT = 4

export default function ClusterWorkersVisualizer() {
  const [demo, setDemo] = useState<Demo>(null)
  const [tab, setTab] = useState<Tab>('visualization')
  const [clusterWorkers, setClusterWorkers] = useState<WorkerState[]>(
    Array.from({ length: WORKER_COUNT }, (_, i) => ({ id: i + 1, status: 'idle' }))
  )
  const [threadWorkers, setThreadWorkers] = useState<WorkerState[]>(
    Array.from({ length: WORKER_COUNT }, (_, i) => ({ id: i + 1, status: 'idle' }))
  )
  const [, setClusterRequests] = useState<number[]>([])
  const [mainBlocked, setMainBlocked] = useState(false)
  const [clusterMainFree, setClusterMainFree] = useState(true)
  const [threadMainFree, setThreadMainFree] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-8), msg])
  }, [])

  const reset = () => {
    setDemo(null)
    setClusterWorkers(Array.from({ length: WORKER_COUNT }, (_, i) => ({ id: i + 1, status: 'idle' })))
    setThreadWorkers(Array.from({ length: WORKER_COUNT }, (_, i) => ({ id: i + 1, status: 'idle' })))
    setClusterRequests([])
    setMainBlocked(false)
    setClusterMainFree(true)
    setThreadMainFree(true)
    setLogs([])
  }

  const runHttpDemo = useCallback(async () => {
    reset()
    await new Promise(r => setTimeout(r, 50))
    setDemo('http')
    addLog('Sending 100 HTTP requests...')

    const requests = Array.from({ length: 12 }, (_, i) => i + 1)
    setClusterRequests(requests)

    // Distribute requests round-robin across cluster workers
    for (let i = 0; i < requests.length; i++) {
      const workerId = (i % WORKER_COUNT) + 1
      const reqId = requests[i]
      const fakeMs = Math.floor(Math.random() * 8) + 2 // 2–9ms simulated latency

      await new Promise(r => setTimeout(r, 600))
      addLog(`Request ${reqId} → Worker ${workerId} (~${fakeMs}ms)`)

      setClusterWorkers(prev =>
        prev.map(w => w.id === workerId ? { ...w, status: 'processing', requestId: reqId } : w)
      )
      setThreadWorkers(prev =>
        prev.map(w => w.id === workerId ? { ...w, status: 'processing', requestId: reqId } : w)
      )

      // Complete after delay
      setTimeout(() => {
        setClusterWorkers(prev =>
          prev.map(w => w.id === workerId ? { ...w, status: 'done', requestId: undefined } : w)
        )
        setThreadWorkers(prev =>
          prev.map(w => w.id === workerId ? { ...w, status: 'done', requestId: undefined } : w)
        )
        setTimeout(() => {
          setClusterWorkers(prev =>
            prev.map(w => w.id === workerId ? { ...w, status: 'idle' } : w)
          )
          setThreadWorkers(prev =>
            prev.map(w => w.id === workerId ? { ...w, status: 'idle' } : w)
          )
        }, 600)
      }, 900)
    }
  }, [addLog])

  const runCpuDemo = useCallback(async () => {
    reset()
    await new Promise(r => setTimeout(r, 50))
    setDemo('cpu')
    addLog('Starting CPU-heavy computation...')

    // Without: main thread blocks
    setMainBlocked(true)
    addLog('❌ Without parallelism: Main thread BLOCKED!')
    await new Promise(r => setTimeout(r, 1500))
    setMainBlocked(false)
    addLog('Main thread finally free after 3s...')

    await new Promise(r => setTimeout(r, 500))

    // Cluster: worker handles it
    addLog('✅ Cluster: Worker process takes CPU task')
    setClusterWorkers(prev => prev.map(w => w.id === 1 ? { ...w, status: 'processing' } : w))
    setClusterMainFree(true)

    await new Promise(r => setTimeout(r, 1500))
    setClusterWorkers(prev => prev.map(w => w.id === 1 ? { ...w, status: 'done' } : w))
    addLog('✅ Cluster worker done! Main was free all along.')

    setTimeout(() => {
      setClusterWorkers(prev => prev.map(w => ({ ...w, status: 'idle' })))
    }, 600)

    await new Promise(r => setTimeout(r, 500))

    // Worker threads: thread handles it
    addLog('✅ Worker Thread: Spawning new thread')
    setThreadWorkers(prev => prev.map(w => w.id === 1 ? { ...w, status: 'processing' } : w))
    setThreadMainFree(true)

    await new Promise(r => setTimeout(r, 1200))
    setThreadWorkers(prev => prev.map(w => w.id === 1 ? { ...w, status: 'done' } : w))
    addLog('✅ Worker thread done! Main thread was never blocked.')

    setTimeout(() => {
      setThreadWorkers(prev => prev.map(w => ({ ...w, status: 'idle' })))
    }, 600)
  }, [addLog])

  const workerStatusColor = (status: WorkerState['status']) => {
    if (status === 'processing') return '#F59E0B'
    if (status === 'done') return '#10B981'
    return '#22222F'
  }

  const workerStatusBorder = (status: WorkerState['status']) => {
    if (status === 'processing') return 'border-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.3)]'
    if (status === 'done') return 'border-[#10B981]'
    return 'border-[rgba(255,255,255,0.12)]'
  }

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <div className="flex gap-2 bg-[#12121A] rounded-xl p-1 w-fit">
        {([
          { key: 'visualization', label: 'Visualization' },
          { key: 'code', label: 'Code Examples' },
        ] as { key: Tab; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === key ? 'bg-[#7C3AED] text-white' : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'code' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔵</span>
              <h3 className="text-[#F5F5F7] font-bold">Cluster Module</h3>
              <span className="ml-auto bg-[rgba(124,58,237,0.15)] text-[#7C3AED] text-xs px-2 py-1 rounded-full">Multi-Process</span>
            </div>
            <pre className="bg-[#0A0A0F] rounded-xl p-4 text-xs font-mono text-[#A1A1AA] leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {CLUSTER_CODE}
            </pre>
          </div>
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🟢</span>
              <h3 className="text-[#F5F5F7] font-bold">Worker Threads</h3>
              <span className="ml-auto bg-[rgba(6,182,212,0.15)] text-[#06B6D4] text-xs px-2 py-1 rounded-full">Multi-Thread</span>
            </div>
            <pre className="bg-[#0A0A0F] rounded-xl p-4 text-xs font-mono text-[#A1A1AA] leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {WORKER_THREADS_CODE}
            </pre>
          </div>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-5">
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={runHttpDemo}
                className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                  demo === 'http' ? 'bg-[#06B6D4] text-white' : 'bg-[#1A1A26] border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] hover:text-[#F5F5F7]'
                }`}
              >
                🌐 Send 100 HTTP Requests
              </button>
              <button
                onClick={runCpuDemo}
                className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                  demo === 'cpu' ? 'bg-[#F59E0B] text-black' : 'bg-[#1A1A26] border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] hover:text-[#F5F5F7]'
                }`}
              >
                ⚡ CPU-Heavy Task
              </button>
              <button onClick={reset} className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] hover:text-[#F5F5F7]">
                Reset
              </button>
            </div>
          </div>

          {/* Blocked indicator */}
          <AnimatePresence>
            {mainBlocked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.4)] rounded-2xl p-4 flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="text-2xl"
                >
                  🔄
                </motion.div>
                <div>
                  <div className="text-[#EF4444] font-bold">Main Thread BLOCKED!</div>
                  <div className="text-[#A1A1AA] text-sm">CPU-heavy task — no new requests can be processed for ~3 seconds</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Split visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cluster Mode */}
            <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(124,58,237,0.3)] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span>🔵</span>
                <h3 className="text-[#F5F5F7] font-bold">Cluster Mode</h3>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-[rgba(124,58,237,0.15)] text-[#7C3AED] text-xs px-2 py-1 rounded-full">Multi-Process</span>
                <span className="bg-[rgba(124,58,237,0.1)] text-[#A1A1AA] text-xs px-2 py-1 rounded-full">cluster module</span>
              </div>

              {/* Master process */}
              <div className="bg-[#1A1A26] border border-[#7C3AED] rounded-xl p-3 mb-3 text-center">
                <div className="text-[#7C3AED] font-bold text-sm">Master Process</div>
                <div className="text-[#A1A1AA] text-xs">PID: 1234 | Load Balancer</div>
                <div className={`text-xs mt-1 font-bold ${clusterMainFree ? 'text-[#10B981]' : 'text-[#A1A1AA]'}`}>
                  {clusterMainFree && demo === 'cpu' ? '✅ Main thread FREE!' : 'Routing requests...'}
                </div>
              </div>

              {/* Connecting lines + Workers */}
              <div className="grid grid-cols-2 gap-3">
                {clusterWorkers.map(worker => (
                  <motion.div
                    key={worker.id}
                    className={`rounded-xl border-2 p-3 transition-all ${workerStatusBorder(worker.status)}`}
                    style={{ backgroundColor: `${workerStatusColor(worker.status)}10` }}
                    animate={worker.status === 'processing' ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                    transition={{ repeat: worker.status === 'processing' ? Infinity : 0, duration: 0.6 }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: workerStatusColor(worker.status) }} />
                      <span className="text-[#F5F5F7] text-xs font-bold">Worker {worker.id}</span>
                    </div>
                    <div className="text-[#A1A1AA] text-[10px]">Own Memory</div>
                    <div className="text-[10px] font-bold mt-1" style={{ color: workerStatusColor(worker.status) }}>
                      {worker.status === 'processing' ? `Req #${worker.requestId ?? '...'} ⚙️` :
                       worker.status === 'done' ? 'Done ✓' : 'Idle'}
                    </div>
                    <div className="mt-1 bg-[#0A0A0F] rounded p-1">
                      <div className="text-[#71717A] text-[9px]">RAM: 45MB</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 p-2 bg-[#0A0A0F] rounded-lg">
                <div className="text-[#A1A1AA] text-xs">
                  <span className="text-[#EF4444]">Shared: Nothing</span> — each process independent
                </div>
              </div>
            </div>

            {/* Worker Threads Mode */}
            <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(6,182,212,0.3)] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span>🟢</span>
                <h3 className="text-[#F5F5F7] font-bold">Worker Threads</h3>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-[rgba(6,182,212,0.15)] text-[#06B6D4] text-xs px-2 py-1 rounded-full">Single Process</span>
                <span className="bg-[rgba(6,182,212,0.1)] text-[#A1A1AA] text-xs px-2 py-1 rounded-full">worker_threads</span>
              </div>

              {/* Single process box */}
              <div className="bg-[#1A1A26] border-2 border-[#06B6D4] rounded-xl p-4 mb-3">
                <div className="text-[#06B6D4] font-bold text-sm mb-2 text-center">Single Node.js Process</div>

                {/* Main thread inside */}
                <div className={`rounded-lg border p-2 mb-2 text-center transition-all ${
                  threadMainFree && demo === 'cpu' ? 'border-[#10B981] bg-[rgba(16,185,129,0.1)]' : 'border-[rgba(255,255,255,0.12)]'
                }`}>
                  <div className="text-[#F5F5F7] text-xs font-bold">Main Thread</div>
                  <div className={`text-xs font-bold mt-0.5 ${
                    threadMainFree && demo === 'cpu' ? 'text-[#10B981]' : 'text-[#A1A1AA]'
                  }`}>
                    {threadMainFree && demo === 'cpu' ? '✅ Always Free!' : 'Event Loop'}
                  </div>
                </div>

                {/* Worker threads inside same process */}
                <div className="grid grid-cols-2 gap-2">
                  {threadWorkers.map(worker => (
                    <motion.div
                      key={worker.id}
                      className={`rounded-lg border p-2 transition-all ${workerStatusBorder(worker.status)}`}
                      style={{ backgroundColor: `${workerStatusColor(worker.status)}10` }}
                      animate={worker.status === 'processing' ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                      transition={{ repeat: worker.status === 'processing' ? Infinity : 0, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: workerStatusColor(worker.status) }} />
                        <span className="text-[#F5F5F7] text-[10px] font-bold">Thread {worker.id}</span>
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: workerStatusColor(worker.status) }}>
                        {worker.status === 'processing' ? '⚙️ Working' :
                         worker.status === 'done' ? 'Done ✓' : 'Idle'}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Shared memory indicator */}
                <div className="mt-2 p-2 bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] rounded-lg text-center">
                  <div className="text-[#06B6D4] text-[10px] font-bold">Shared Memory Space</div>
                  <div className="text-[#71717A] text-[9px]">SharedArrayBuffer | Transferable objects</div>
                </div>
              </div>

              <div className="p-2 bg-[#0A0A0F] rounded-lg">
                <div className="text-[#A1A1AA] text-xs">
                  <span className="text-[#10B981]">Can share: ArrayBuffer</span> via transferable
                </div>
              </div>
            </div>
          </div>

          {/* Log panel */}
          {logs.length > 0 && (
            <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-5">
              <h3 className="text-[#F5F5F7] font-bold text-sm mb-3">Activity Log</h3>
              <div className="space-y-1 font-mono text-xs">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div
                      key={`${log}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${
                        log.startsWith('❌') ? 'text-[#EF4444]' :
                        log.startsWith('✅') ? 'text-[#10B981]' :
                        'text-[#A1A1AA]'
                      }`}
                    >
                      <span className="text-[#71717A]">[{new Date().toISOString().slice(11, 19)}]</span> {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Comparison table */}
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
            <h3 className="text-[#F5F5F7] font-bold mb-4">When to Use Which?</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.08)]">
                    <th className="text-left text-[#A1A1AA] py-2 pr-4">Feature</th>
                    <th className="text-left text-[#7C3AED] py-2 pr-4">Cluster</th>
                    <th className="text-left text-[#06B6D4] py-2">Worker Threads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {[
                    ['Memory isolation', '✅ Full', '⚠️ Shared (careful!)'],
                    ['HTTP request handling', '✅ Perfect (round-robin)', '❌ Not ideal'],
                    ['CPU-heavy tasks', '✅ Yes (separate processes)', '✅ Yes (same process)'],
                    ['Memory usage', '❌ High (N × process mem)', '✅ Lower (shared heap)'],
                    ['Communication', '⚠️ IPC (serialization)', '✅ Fast (SharedArrayBuffer)'],
                    ['Crash isolation', '✅ One crash = one worker', '❌ Can affect all threads'],
                    ['Use case', 'Web servers, APIs', 'Image processing, crypto'],
                  ].map(([feat, cluster, worker]) => (
                    <tr key={feat}>
                      <td className="text-[#A1A1AA] py-2 pr-4">{feat}</td>
                      <td className={`py-2 pr-4 font-mono text-xs ${cluster.startsWith('✅') ? 'text-[#10B981]' : cluster.startsWith('❌') ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>{cluster}</td>
                      <td className={`py-2 font-mono text-xs ${worker.startsWith('✅') ? 'text-[#10B981]' : worker.startsWith('❌') ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>{worker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Teaching callout */}
      <div className="bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.3)] rounded-2xl p-5">
        <div className="text-[#7C3AED] font-bold mb-2">💡 Cluster vs Worker Threads</div>
        <p className="text-[#A1A1AA] text-sm leading-relaxed">
          <strong className="text-[#F5F5F7]">Cluster</strong> = multiple separate Node.js processes — har process apni memory rakhta hai.
          HTTP servers ke liye perfect (pm2 cluster mode isi pe based hai).{' '}
          <strong className="text-[#F5F5F7]">Worker Threads</strong> = single process mein multiple threads — memory share kar sakte hain.
          CPU-heavy tasks (image processing, crypto, ML inference) ke liye use karo!
        </p>
      </div>
    </div>
  )
}
