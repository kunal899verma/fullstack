'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChainNode {
  id: string
  label: string
  type: 'instance' | 'prototype' | 'root' | 'null'
  color: string
  ownProps: { name: string; kind: 'property' | 'method' }[]
  protoLink?: string
}

interface LookupStep {
  nodeId: string
  found: boolean
  propName: string
}

interface Scenario {
  id: number
  name: string
  description: string
  chain: ChainNode[]
  lookupTargets: { name: string; startNodeId: string; label: string }[]
  codeLines: { text: string; color?: string }[]
  classCode: string
}

// ─── Scenarios ────────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    name: 'Class Inheritance',
    description: 'dog instance → Dog.prototype → Animal.prototype → Object.prototype → null',
    classCode: `class Animal {
  breathe() { return 'breathing...'; }
}

class Dog extends Animal {
  constructor(name) {
    super();
    this.name = name;
    this.legs = 4;
  }
  speak() { return 'Woof!'; }
}

const dog = new Dog('Rex');
// Object.getPrototypeOf(dog) === Dog.prototype  ✓
// Object.getPrototypeOf(Dog.prototype) === Animal.prototype  ✓`,
    chain: [
      {
        id: 'dog',
        label: 'dog instance',
        type: 'instance',
        color: '#06B6D4',
        ownProps: [
          { name: 'name', kind: 'property' },
          { name: 'legs', kind: 'property' },
        ],
        protoLink: 'DogProto',
      },
      {
        id: 'DogProto',
        label: 'Dog.prototype',
        type: 'prototype',
        color: '#7C3AED',
        ownProps: [{ name: 'speak()', kind: 'method' }],
        protoLink: 'AnimalProto',
      },
      {
        id: 'AnimalProto',
        label: 'Animal.prototype',
        type: 'prototype',
        color: '#10B981',
        ownProps: [{ name: 'breathe()', kind: 'method' }],
        protoLink: 'ObjProto',
      },
      {
        id: 'ObjProto',
        label: 'Object.prototype',
        type: 'root',
        color: '#F59E0B',
        ownProps: [
          { name: 'toString()', kind: 'method' },
          { name: 'hasOwnProperty()', kind: 'method' },
          { name: 'valueOf()', kind: 'method' },
        ],
        protoLink: 'null',
      },
      {
        id: 'null',
        label: 'null',
        type: 'null',
        color: '#71717A',
        ownProps: [],
      },
    ],
    lookupTargets: [
      { name: 'name', startNodeId: 'dog', label: 'dog.name' },
      { name: 'speak()', startNodeId: 'dog', label: 'dog.speak()' },
      { name: 'breathe()', startNodeId: 'dog', label: 'dog.breathe()' },
      { name: 'toString()', startNodeId: 'dog', label: 'dog.toString()' },
      { name: 'nonExistent', startNodeId: 'dog', label: 'dog.nonExistent' },
    ],
    codeLines: [
      { text: 'const dog = new Dog("Rex");' },
      { text: '' },
      { text: 'dog.name;      // own property ✓', color: '#06B6D4' },
      { text: 'dog.speak();   // Dog.prototype', color: '#7C3AED' },
      { text: 'dog.breathe(); // Animal.prototype', color: '#10B981' },
      { text: 'dog.toString();// Object.prototype', color: '#F59E0B' },
      { text: 'dog.fly;       // undefined (not found)', color: '#EF4444' },
    ],
  },
  {
    id: 2,
    name: 'Simple Object Chain',
    description: 'Plain object literal → Object.prototype → null',
    classCode: `const person = {
  name: 'Rahul',
  greet() { return 'Hello!'; }
};

// person.__proto__ === Object.prototype
// Object.getPrototypeOf(person) === Object.prototype

// Equivalent to:
const person2 = Object.create(Object.prototype);
person2.name = 'Rahul';
person2.greet = function() { return 'Hello!'; };`,
    chain: [
      {
        id: 'person',
        label: 'person object',
        type: 'instance',
        color: '#06B6D4',
        ownProps: [
          { name: 'name', kind: 'property' },
          { name: 'greet()', kind: 'method' },
        ],
        protoLink: 'ObjProto',
      },
      {
        id: 'ObjProto',
        label: 'Object.prototype',
        type: 'root',
        color: '#F59E0B',
        ownProps: [
          { name: 'toString()', kind: 'method' },
          { name: 'hasOwnProperty()', kind: 'method' },
          { name: 'valueOf()', kind: 'method' },
          { name: 'keys()', kind: 'method' },
        ],
        protoLink: 'null',
      },
      {
        id: 'null',
        label: 'null',
        type: 'null',
        color: '#71717A',
        ownProps: [],
      },
    ],
    lookupTargets: [
      { name: 'name', startNodeId: 'person', label: 'person.name' },
      { name: 'greet()', startNodeId: 'person', label: 'person.greet()' },
      { name: 'toString()', startNodeId: 'person', label: 'person.toString()' },
      { name: 'fly', startNodeId: 'person', label: 'person.fly' },
    ],
    codeLines: [
      { text: 'const person = {' },
      { text: "  name: 'Rahul',", color: '#06B6D4' },
      { text: "  greet() { return 'Hello!'; }", color: '#06B6D4' },
      { text: '};' },
      { text: '' },
      { text: "person.name;       // own property", color: '#06B6D4' },
      { text: "person.toString(); // Object.prototype", color: '#F59E0B' },
      { text: "person.fly;        // undefined", color: '#EF4444' },
    ],
  },
  {
    id: 3,
    name: '3-Level Inheritance',
    description: 'GoldenRetriever → Dog → Animal → Object → null',
    classCode: `class Animal {
  breathe() { return 'breathing...'; }
}
class Dog extends Animal {
  speak() { return 'Woof!'; }
}
class GoldenRetriever extends Dog {
  fetch() { return 'Fetching...'; }
}

const buddy = new GoldenRetriever();
// 3 levels of prototype chain!`,
    chain: [
      {
        id: 'buddy',
        label: 'buddy (GoldenRetriever)',
        type: 'instance',
        color: '#EF4444',
        ownProps: [{ name: 'breed', kind: 'property' }],
        protoLink: 'GRProto',
      },
      {
        id: 'GRProto',
        label: 'GoldenRetriever.prototype',
        type: 'prototype',
        color: '#06B6D4',
        ownProps: [{ name: 'fetch()', kind: 'method' }],
        protoLink: 'DogProto',
      },
      {
        id: 'DogProto',
        label: 'Dog.prototype',
        type: 'prototype',
        color: '#7C3AED',
        ownProps: [{ name: 'speak()', kind: 'method' }],
        protoLink: 'AnimalProto',
      },
      {
        id: 'AnimalProto',
        label: 'Animal.prototype',
        type: 'prototype',
        color: '#10B981',
        ownProps: [{ name: 'breathe()', kind: 'method' }],
        protoLink: 'ObjProto',
      },
      {
        id: 'ObjProto',
        label: 'Object.prototype',
        type: 'root',
        color: '#F59E0B',
        ownProps: [
          { name: 'toString()', kind: 'method' },
          { name: 'hasOwnProperty()', kind: 'method' },
        ],
        protoLink: 'null',
      },
      {
        id: 'null',
        label: 'null',
        type: 'null',
        color: '#71717A',
        ownProps: [],
      },
    ],
    lookupTargets: [
      { name: 'fetch()', startNodeId: 'buddy', label: 'buddy.fetch()' },
      { name: 'speak()', startNodeId: 'buddy', label: 'buddy.speak()' },
      { name: 'breathe()', startNodeId: 'buddy', label: 'buddy.breathe()' },
      { name: 'toString()', startNodeId: 'buddy', label: 'buddy.toString()' },
      { name: 'fly', startNodeId: 'buddy', label: 'buddy.fly' },
    ],
    codeLines: [
      { text: 'const buddy = new GoldenRetriever();' },
      { text: '' },
      { text: 'buddy.fetch();    // GoldenRetriever.prototype', color: '#06B6D4' },
      { text: 'buddy.speak();    // Dog.prototype', color: '#7C3AED' },
      { text: 'buddy.breathe();  // Animal.prototype', color: '#10B981' },
      { text: 'buddy.toString(); // Object.prototype', color: '#F59E0B' },
      { text: 'buddy.fly;        // undefined', color: '#EF4444' },
    ],
  },
]

// ─── Chain Node Component ─────────────────────────────────────────────────────

function ChainNodeCard({
  node,
  lookupStep,
  isSearching,
  speed,
  animDelay,
}: {
  node: ChainNode
  lookupStep: LookupStep | null
  isSearching: boolean
  speed: number
  animDelay: number
}) {
  const isActive = lookupStep?.nodeId === node.id
  const isFound = isActive && lookupStep?.found
  const isMiss = isActive && !lookupStep?.found

  return (
    <motion.div
      className="rounded-xl border-2 p-4 relative"
      animate={{
        borderColor: isFound
          ? '#10B981'
          : isMiss
          ? '#7C3AED'
          : isSearching
          ? `${node.color}50`
          : `${node.color}30`,
        background: isFound
          ? 'rgba(16,185,129,0.12)'
          : isMiss
          ? 'rgba(124,58,237,0.1)'
          : `${node.color}06`,
        boxShadow: isActive ? `0 0 20px ${isFound ? '#10B981' : '#7C3AED'}40` : 'none',
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.3, delay: animDelay / speed }}
    >
      {/* Node type badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: node.color }} />
        <span className="font-mono text-sm font-bold" style={{ color: node.color }}>
          {node.label}
        </span>
        {isFound && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.2)] text-[#10B981]"
          >
            ✓ Found!
          </motion.span>
        )}
        {isMiss && lookupStep && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-[rgba(124,58,237,0.2)] text-[#7C3AED]"
          >
            → checking...
          </motion.span>
        )}
      </div>

      {/* Own properties */}
      {node.ownProps.length === 0 ? (
        <div className="text-xs text-[#71717A] italic">
          {node.type === 'null' ? 'End of chain' : 'No own properties'}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {node.ownProps.map((prop) => (
            <span
              key={prop.name}
              className="text-xs font-mono px-2 py-0.5 rounded-lg border"
              style={{
                background: prop.kind === 'method' ? `${node.color}15` : 'rgba(255,255,255,0.05)',
                borderColor: prop.kind === 'method' ? `${node.color}40` : 'rgba(255,255,255,0.1)',
                color: prop.kind === 'method' ? node.color : '#A1A1AA',
              }}
            >
              {prop.name}
            </span>
          ))}
        </div>
      )}

      {/* Proto link arrow */}
      {node.protoLink && (
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#71717A]">
          <span>[[Prototype]] →</span>
          <span style={{ color: node.color }}>next level</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PrototypeChainVisualizer() {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [lookupSteps, setLookupSteps] = useState<LookupStep[]>([])
  const [lookingFor, setLookingFor] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [speed, setSpeed] = useState(0.5)

  const scenario = SCENARIOS[scenarioIdx]

  const reset = useCallback(() => {
    setLookupSteps([])
    setLookingFor(null)
    setIsSearching(false)
  }, [])

  const handleLookup = useCallback(
    (propName: string, startNodeId: string) => {
      reset()
      setLookingFor(propName)
      setIsSearching(true)

      const chain = scenario.chain
      const startIdx = chain.findIndex((n) => n.id === startNodeId)
      if (startIdx === -1) return

      const stepsToAnimate: LookupStep[] = []
      for (let i = startIdx; i < chain.length; i++) {
        const node = chain[i]
        if (node.type === 'null') break
        const found = node.ownProps.some((p) => p.name === propName)
        stepsToAnimate.push({ nodeId: node.id, found, propName })
        if (found) break
      }

      const delay = 500 / speed
      stepsToAnimate.forEach((step, i) => {
        setTimeout(() => {
          setLookupSteps((prev) => [...prev, step])
          if (i === stepsToAnimate.length - 1) {
            setTimeout(() => setIsSearching(false), delay)
          }
        }, i * delay)
      })
    },
    [scenario.chain, speed, reset]
  )

  const lastStep = lookupSteps[lookupSteps.length - 1]
  const found = lastStep?.found ?? false
  const notFound = !found && lookupSteps.length > 0 && !isSearching

  return (
    <div className="w-full text-[#F5F5F7]">
      {/* Controls row */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Scenario selector */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex-1"
          style={{ background: 'rgba(26,26,38,0.8)' }}
        >
          <label className="block text-xs font-mono text-[#A1A1AA] mb-2 uppercase tracking-wider">
            Scenario
          </label>
          <select
            value={scenarioIdx}
            onChange={(e) => { setScenarioIdx(Number(e.target.value)); reset() }}
            className="w-full bg-[#12121A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#7C3AED] transition-colors"
          >
            {SCENARIOS.map((sc, i) => (
              <option key={sc.id} value={i}>{i + 1}. {sc.name}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-[#71717A]">{scenario.description}</p>
        </div>

        {/* Speed */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 min-w-[200px]"
          style={{ background: 'rgba(26,26,38,0.8)' }}
        >
          <div className="flex justify-between text-xs text-[#A1A1AA] mb-2">
            <span>Lookup Speed</span>
            <span className="font-mono text-[#7C3AED]">{speed}x</span>
          </div>
          <input
            type="range" min={0.25} max={3} step={0.25} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #7C3AED ${((speed - 0.25) / 2.75) * 100}%, #22222F ${((speed - 0.25) / 2.75) * 100}%)` }}
          />
          <div className="flex justify-between text-[10px] text-[#71717A] mt-1">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[55%_45%] gap-4 min-h-[600px]">

        {/* ── LEFT: Prototype chain visualization ── */}
        <div className="flex flex-col gap-3">
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] p-5"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Prototype Chain
              </span>
              <button
                onClick={reset}
                className="text-xs text-[#71717A] hover:text-[#F5F5F7] transition-colors"
              >
                ↺ Reset
              </button>
            </div>

            {/* Chain nodes */}
            <div className="space-y-0">
              {scenario.chain.map((node, i) => (
                <div key={node.id}>
                  <ChainNodeCard
                    node={node}
                    lookupStep={lookupSteps.find((s) => s.nodeId === node.id) ?? null}
                    isSearching={isSearching}
                    speed={speed}
                    animDelay={i * 0.05}
                  />
                  {/* Arrow connector */}
                  {i < scenario.chain.length - 1 && (
                    <div className="flex flex-col items-start ml-4 my-1">
                      <div className="w-0.5 h-4" style={{ background: node.color + '40' }} />
                      <div className="flex items-center gap-1">
                        <div className="w-0.5 h-4" style={{ background: node.color + '40' }} />
                        <span
                          className="text-[10px] font-mono"
                          style={{ color: node.color + '80' }}
                        >
                          [[Prototype]]
                        </span>
                      </div>
                      <span className="text-sm" style={{ color: node.color + '60' }}>↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lookup result */}
          <AnimatePresence>
            {(found || notFound) && lastStep && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-xl border-2 px-4 py-3"
                style={{
                  background: found ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  borderColor: found ? '#10B981' : '#EF4444',
                }}
              >
                {found ? (
                  <p className="text-sm font-mono" style={{ color: '#10B981' }}>
                    ✓ Found <strong>{lastStep.propName}</strong> in{' '}
                    {scenario.chain.find((n) => n.id === lastStep.nodeId)?.label}
                  </p>
                ) : (
                  <p className="text-sm font-mono" style={{ color: '#EF4444' }}>
                    ✗ <strong>{lastStep.propName}</strong> not found anywhere in chain →{' '}
                    <strong>undefined</strong>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Lookup buttons + Code ── */}
        <div className="flex flex-col gap-4">
          {/* Property lookup buttons */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
              Find Property (click to trace lookup)
            </p>
            <div className="flex flex-col gap-2">
              {scenario.lookupTargets.map((target) => (
                <motion.button
                  key={target.label}
                  onClick={() => handleLookup(target.name, target.startNodeId)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono border-2 transition-all text-left"
                  style={{
                    background:
                      lookingFor === target.name ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                    borderColor:
                      lookingFor === target.name ? '#7C3AED' : 'rgba(255,255,255,0.1)',
                    color: lookingFor === target.name ? '#7C3AED' : '#A1A1AA',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-[#71717A]">🔍</span>
                  {target.label}
                  {target.name === 'nonExistent' || target.name === 'fly' ? (
                    <span className="ml-auto text-[10px] text-[#EF4444]">not found</span>
                  ) : (
                    <span className="ml-auto text-[10px] text-[#71717A]">→ found</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Code reference */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs font-mono text-[#A1A1AA]">prototype.js</span>
            </div>
            <div className="p-4">
              <pre className="text-xs font-mono leading-6">
                {scenario.codeLines.map((line, i) =>
                  line.text === '' ? (
                    <div key={i}>&nbsp;</div>
                  ) : (
                    <div key={i} style={{ color: line.color ?? '#A1A1AA' }}>
                      {line.text}
                    </div>
                  )
                )}
              </pre>
            </div>
          </div>

          {/* Class code */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Class Code
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(124,58,237,0.2)', color: '#7C3AED' }}
              >
                Object.getPrototypeOf()
              </span>
            </div>
            <div className="p-4 overflow-auto max-h-[180px]">
              <pre className="text-xs font-mono leading-6 text-[#A1A1AA]">
                {scenario.classCode}
              </pre>
            </div>
          </div>

          {/* Legend */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { color: '#06B6D4', label: 'Instance (own props)' },
                { color: '#7C3AED', label: 'Prototype (shared methods)' },
                { color: '#F59E0B', label: 'Object.prototype (root)' },
                { color: '#10B981', label: 'Found in chain' },
                { color: '#EF4444', label: 'undefined (not found)' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-[10px] font-mono text-[#A1A1AA]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
