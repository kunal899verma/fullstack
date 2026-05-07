import Link from 'next/link'
import NeuralNetworkVisualizer from '@/components/visualizations/NeuralNetworkVisualizer'

export const metadata = {
  title: 'Neural Network Forward Pass — NodeMaster GenAI',
  description:
    'Neural network forward pass ka interactive visualization. Dekho weights, ReLU, aur softmax kaise kaam karte hain.',
}

export default function GenAINeuralNetworkPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── SECTION 1: Header ── */}
      <div className="border-b border-[rgba(255,255,255,0.08)] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-6">
            <Link href="/visualizations" className="hover:text-[#F5F5F7] transition-colors">
              ← Visualizations
            </Link>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F97316]">GenAI</span>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F5F5F7]">Neural Network</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">🧠</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Neural Network Forward Pass
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            GPT-4 mein 1.7 trillion parameters hain. Ek parameter = ek weight in a neural network. Ye visualization ek tiny network ka forward pass live dikhata hai.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#F97316', borderColor: 'rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.08)' }}
            >
              🤖 GenAI
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.08)' }}
            >
              ✨ Beginner
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#A1A1AA', borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              🕐 ~12 minutes
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 2: Pehle Samjho ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(249,115,22,0.06)', borderColor: 'rgba(249,115,22,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold" style={{ color: '#F97316' }}>
              Pehle Samjho — Parameter Kya Hota Hai?
            </h2>
          </div>
          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#F97316' }}>
                GPT-4 ke 1.7 trillion parameters hain.
              </span>{' '}
              Ye number sunke intimidating lagta hai — lekin ek &ldquo;parameter&rdquo; simply ek number hai: ek connection ka weight. Ye visualization dikhata hai what ONE forward pass looks like in a tiny network — same math jo billions of parameters pe chalti hai.
            </p>
            <p className="text-base leading-relaxed">
              Input values enter karo, weights multiply hote hain, ReLU activation apply hoti hai, aur softmax final probabilities deta hai. Ye cycle ek GPT response ke liye lakho baar repeat hoti hai.
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-[rgba(249,115,22,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#F97316' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'Basic Algebra', href: '/genai/ai-ml-intro' },
                { label: 'What is ML?', href: '/genai/ai-ml-intro' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                  style={{ color: '#F97316', borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.06)' }}
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 3: Analogy ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🏭</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#F59E0B' }}>
                Real World Analogy — Pipeline Factory
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Neural network ko factory pipeline ki tarah socho</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📦', step: 'Input Layer', desc: 'Raw materials — pixels, text embeddings, sensor data', color: '#06B6D4' },
              { icon: '⚙️', step: 'Hidden Layer 1', desc: 'Processing stage 1 — lo-level features extract karo', color: '#7C3AED' },
              { icon: '🔧', step: 'Hidden Layer 2', desc: 'Processing stage 2 — hi-level features combine karo', color: '#F97316' },
              { icon: '🎁', step: 'Output Layer', desc: 'Final product — class probabilities (Cat vs Dog)', color: '#10B981' },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border p-3 text-center" style={{ background: `${s.color}08`, borderColor: `${s.color}25` }}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-xs font-semibold mb-1" style={{ color: s.color }}>{s.step}</div>
                <p className="text-[10px] text-[#71717A] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              <span className="text-[#F59E0B] font-semibold">Weights = Factory settings.</span> Training = factory ko adjust karna taaki sahi product nikle. GPT training = 1.7 trillion settings adjust karna over millions of examples.
            </p>
          </div>
        </div>

        {/* ── SECTION 4: Legend ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🎨</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Visualization Legend</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Har element ka meaning</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { color: '#06B6D4', label: 'Cyan Neurons — Input Layer', desc: 'Raw input values (0-1). In this example: simplified pixel values (R, G, B channels).' },
              { color: '#7C3AED', label: 'Purple Neurons — Hidden Layer 1', desc: 'First transformation. ReLU applied — negative values become 0. lo-level features.' },
              { color: '#F97316', label: 'Orange Neurons — Hidden Layer 2', desc: 'Second transformation. Higher-level feature combinations. Another ReLU here.' },
              { color: '#10B981', label: 'Green Neurons — Output Layer', desc: 'Final classification. Softmax converts raw scores to probabilities summing to 1.' },
              { color: '#7C3AED', label: 'Purple Connections', desc: 'Positive weights — amplify signal. Thickness shows magnitude when "Show Weights" is ON.' },
              { color: '#EF4444', label: 'Red Connections', desc: 'Negative weights — suppress signal. Both types learned during training.' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0" style={{ background: item.color }} />
                <div>
                  <div className="text-sm font-semibold text-[#F5F5F7]">{item.label}</div>
                  <div className="text-xs text-[#71717A] mt-1 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 5: Kaise Use Karein ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Step by Step</h2>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { step: 1, icon: '▶️', color: '#7C3AED', title: '"Forward Pass" button dabao', desc: 'Animation layer by layer chalegi — cyan input se green output tak. Medium speed pe start karo.' },
              { step: 2, icon: '👁️', color: '#06B6D4', title: 'Layer activation dekho', desc: 'Har layer ke neurons brightness se values show karte hain. Dimmer = value 0 near. Brighter = higher activation.' },
              { step: 3, icon: '🎚️', color: '#F97316', title: 'Input sliders change karo', desc: 'Pixel 1, 2, 3 sliders move karo. Immediately output probabilities change hote hain. Inputs = outputs determine karte hain.' },
              { step: 4, icon: '🔢', color: '#F59E0B', title: '"Show Weights" toggle karo', desc: 'Connection lines pe weight values aate hain. Purple = positive, red = negative. Ye sab learned parameters hain.' },
              { step: 5, icon: '🎲', color: '#10B981', title: '"Randomize Weights" button dabao', desc: 'Sab connections ke weights random ho jaate hain. Forward pass run karo — notice karo ki same input pe output change ho jaata hai.' },
              { step: 6, icon: '⏱️', color: '#7C3AED', title: 'Speed change karo', desc: 'Slow pe layer-by-layer clearly dekhna slow. Fast pe production feel.' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${item.color}20`, color: item.color, border: `1.5px solid ${item.color}50` }}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.icon}</span>
                    <span className="font-semibold text-[#F5F5F7] text-sm">{item.title}</span>
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── SECTION 6: VISUALIZATION ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">neural-network-visualizer.tsx</span>
            <span
              className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
            >
              GenAI
            </span>
          </div>
          <div className="p-6">
            <NeuralNetworkVisualizer />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Experiments ── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Try Karo Ye Experiments</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
                title: 'Weights Matter',
                setup: ['Forward pass run karo', '"Randomize Weights" dabao', 'Same inputs, alag output dekho'],
                insight: 'Same input values, completely different output. Weights hi model ka "knowledge" hain — training mein ye weights optimize hote hain to minimize error.',
              },
              {
                num: '02', color: '#F97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.25)',
                title: 'Input Sensitivity',
                setup: ['Pixel 1 = 1.0, Pixel 2 = 0, Pixel 3 = 0 karo', 'Forward pass run karo', 'Phir Pixel 1 = 0 karo aur compare'],
                insight: 'Sirf ek input change karne se output dramatically shift ho sakta hai. Ye neural networks ki sensitivity hai — adversarial examples isi pe based hain.',
              },
              {
                num: '03', color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.25)',
                title: 'Dead Neurons',
                setup: ['"Show Weights" ON karo', 'Forward pass slow speed pe run karo', 'Dekho kuch neurons dim rehte hain'],
                insight: 'ReLU negative values ko 0 kar deta hai — ye "dead neurons" hain. Agar weight initialization galat ho to training mein ye neurons permanently dead ho sakte hain.',
              },
            ].map((exp) => (
              <div
                key={exp.num}
                className="rounded-2xl border p-5 flex flex-col"
                style={{ background: exp.bg, borderColor: exp.border }}
              >
                <div className="text-4xl font-black mb-3 opacity-25 select-none" style={{ color: exp.color }}>{exp.num}</div>
                <h3 className="text-base font-bold mb-3" style={{ color: exp.color }}>{exp.title}</h3>
                <div className="mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-2">Setup</p>
                  <ol className="space-y-1">
                    {exp.setup.map((s, i) => (
                      <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                        <span style={{ color: exp.color }}>{i + 1}.</span>{s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-auto p-3 rounded-lg" style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: exp.color }}>Key Insight</p>
                  <p className="text-xs text-[#F5F5F7] leading-relaxed">{exp.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 8: Key Takeaways ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#F59E0B' }}>
                Key Takeaways — Neural Networks Ke Fundamentals
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { num: '1', heading: 'Weights = Model ka Knowledge', body: 'Training process mein weights optimize hote hain to minimize prediction error. GPT ka "knowledge" 1.7T weights mein encoded hai — har weight ek learned pattern ka part.' },
              { num: '2', heading: 'Layers = Feature Hierarchy', body: 'Early layers simple features (edges, curves) detect karte hain. Later layers complex combinations (eyes, faces) represent karte hain. Depth = abstraction.' },
              { num: '3', heading: 'More Parameters = More Capacity', body: 'Zyada parameters = zyada complex patterns learn kar sakte hain. Lekin zyada data bhi chahiye nahi to overfitting. GPT-4 itna bada hai kyunki language bahut complex hai.' },
              { num: '4', heading: 'Inference Is Just Math', body: 'Jab ChatGPT response deta hai — ye sirf matrix multiplications, ReLU activations, aur softmax hai. No magic, just math at massive scale. Same operations jo tumne yahan dekhe.' },
            ].map((point) => (
              <div
                key={point.num}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}
                >
                  {point.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#F5F5F7] mb-1">{point.heading}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 9: Misconceptions ── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚫</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Common Confusion</h2>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                wrong: 'Neural network neurons biological neurons ki tarah hain',
                right: 'Sirf naam same hai — inspiration tha, implementation bilkul different hai. Biological neurons electrochemical, artificial neurons sirf mathematical functions (weighted sum + activation).',
              },
              {
                wrong: 'Deep network = always better',
                right: 'Depth increase karne se training harder ho jaati hai (vanishing gradients). Modern architectures (ResNets, Transformers) skip connections use karte hain is problem se bachne ke liye.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
                  <span className="text-lg flex-shrink-0">❌</span>
                  <p className="text-sm text-[#F5F5F7] font-medium">&quot;{item.wrong}&quot;</p>
                </div>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(16,185,129,0.06)' }}>
                  <span className="text-lg flex-shrink-0">✅</span>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 10: Code Reference ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Same Network — PyTorch mein</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Visualization wala network agar PyTorch mein likho</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">classifier.py</span>
            </div>
            <div className="p-5 overflow-x-auto" style={{ background: '#0D0D15' }}>
              <pre className="text-sm font-mono leading-7">
                {[
                  { text: 'import torch.nn as nn', color: '#71717A' },
                  { text: '', color: '' },
                  { text: 'class ImageClassifier(nn.Module):', color: '#F5F5F7' },
                  { text: '    def __init__(self):', color: '#F5F5F7' },
                  { text: '        super().__init__()', color: '#F5F5F7' },
                  { text: '        self.network = nn.Sequential(', color: '#F5F5F7' },
                  { text: '            nn.Linear(3, 4),    # Input → Hidden 1', color: '#06B6D4' },
                  { text: '            nn.ReLU(),           # Activation', color: '#7C3AED' },
                  { text: '            nn.Linear(4, 3),    # Hidden 1 → Hidden 2', color: '#7C3AED' },
                  { text: '            nn.ReLU(),           # Activation', color: '#7C3AED' },
                  { text: '            nn.Linear(3, 2),    # Hidden 2 → Output', color: '#F97316' },
                  { text: '            nn.Softmax(dim=1)   # Probabilities', color: '#10B981' },
                  { text: '        )', color: '#F5F5F7' },
                  { text: '', color: '' },
                  { text: '    def forward(self, x):', color: '#F5F5F7' },
                  { text: '        return self.network(x)  # forward pass', color: '#F59E0B' },
                ].map((line, i) => (
                  <div key={i} style={{ color: line.color || '#F5F5F7' }}>{line.text || ' '}</div>
                ))}
              </pre>
            </div>
          </div>
        </div>

        {/* ── SECTION 11: Agla Step ── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚀</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Agla Step — Aage Kya Seekhein?</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/visualizations/genai-attention', icon: '👁️', label: 'Attention Mechanism Dekho', desc: 'Neural networks ka core — transformer attention heatmap', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.3)' },
              { href: '/visualizations/genai-tokens', icon: '🎲', label: 'Token Sampling Dekho', desc: 'Neural network output → token sampling pipeline', color: '#F97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
                style={{ background: item.bg, borderColor: item.border }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${item.color}15` }}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-[#F5F5F7]">{item.label}</div>
                  <div className="text-sm text-[#A1A1AA] mt-0.5">{item.desc}</div>
                </div>
                <span className="ml-auto text-[#71717A]">→</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
