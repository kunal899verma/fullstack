import Link from 'next/link'
import AttentionVisualizer from '@/components/visualizations/AttentionVisualizer'

export const metadata = {
  title: 'Attention Mechanism Visualizer — NodeMaster GenAI',
  description:
    'Transformer attention ka interactive heatmap. Dekho kaise tokens ek dusre pe dhyan dete hain.',
}

export default function GenAIAttentionPage() {
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
            <span className="text-[#F5F5F7]">Attention Mechanism</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">👁️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Attention Mechanism Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Transformer attention — wo mechanism jo GPT ko possible banaya. Dekho har token kaise har doosre token pe &ldquo;dhyan&rdquo; deta hai.
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
              style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.08)' }}
            >
              ⚡ Intermediate
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
          style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
              Pehle Samjho — Attention Ne Sab Badal Diya
            </h2>
          </div>
          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#7C3AED' }}>
                Attention literally woh mechanism hai jisne GPT possible banaya.
              </span>{' '}
              Transformers se pehle, RNN models context bhool jaate the — long sentences mein pehle ke words ka influence weak ho jaata tha. Attention ne ye fix kiya: har token simultaneously har doosre token ko dekh sakta hai.
            </p>
            <p className="text-base leading-relaxed">
              Isliye GPT-4 100K+ tokens ka context handle karta hai. Isliye &ldquo;it&rdquo; ko pata chalta hai ki woh sentence mein konse noun ko refer kar raha hai. Ye sab attention ki wajah se hai.
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-[rgba(124,58,237,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#7C3AED' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'Neural Networks Basics', href: '/visualizations/genai-neural-network' },
                { label: 'Matrix Multiplication', href: '/genai/ai-ml-intro' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                  style={{ color: '#7C3AED', borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.06)' }}
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
          style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🏫</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Classroom
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Attention ko classroom ki tarah socho</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '😰', title: 'RNN (Old Models)',
                desc: 'Ek student sirf apne neighbor se whisper kar sakta hai. Long sentences mein message distort ho jaata hai — pehle ka context lost.',
                color: '#EF4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)',
              },
              {
                icon: '🙋', title: 'Transformer Attention',
                desc: 'Har student simultaneously har doosre student se question pooch sakta hai. Context kabhi lost nahi hota — full sentence always visible.',
                color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.2)',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border p-4" style={{ background: card.bg, borderColor: card.border }}>
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="font-semibold mb-1" style={{ color: card.color }}>{card.title}</div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              <span className="text-[#7C3AED] font-semibold">Multi-Head Attention:</span> Multiple &ldquo;classrooms&rdquo; simultaneously — ek group pronoun resolution seekhta hai, dusra subject-verb agreement, teesra positional patterns. Sab parallel.
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
              <p className="text-sm text-[#A1A1AA] mt-1">Heatmap aur arcs ka kya matlab hai</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '🟣', label: 'Bright Purple Cell', color: '#7C3AED',
                desc: 'High attention weight — row token is paying strong attention to column token.',
                detail: 'Cell value = probability (0-1). Row = who\'s asking. Column = who\'s being attended to.',
              },
              {
                icon: '⬛', label: 'Dark Cell', color: '#4A2080',
                desc: 'Low attention weight — minimal relationship between these two tokens.',
                detail: 'Black = ~0% attention. Most cells are dark — only a few strong connections.',
              },
              {
                icon: '〰️', label: 'Thick Arc', color: '#7C3AED',
                desc: 'Strong attention connection between tokens — thick line = high weight.',
                detail: 'Arc thickness proportional to attention weight. Click token to see all its arcs.',
              },
              {
                icon: '💡', label: 'Selected Row', color: '#F97316',
                desc: 'When you click a token, its row is highlighted — shows all tokens it attends to.',
                detail: 'Percentage bar chart shows exact distribution of attention across all tokens.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                />
                <div>
                  <div className="text-sm font-semibold text-[#F5F5F7]">{item.label}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: item.color }}>{item.desc}</div>
                  <div className="text-xs text-[#71717A] mt-1 leading-relaxed">{item.detail}</div>
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
              { step: 1, icon: '🔍', color: '#7C3AED', title: '"Pronoun Resolution" scenario select karo', desc: 'Default scenario "Pronoun Resolution" hai. Sentence: "The cat chased it quickly."' },
              { step: 2, icon: '👆', color: '#F97316', title: '"it" token pe click karo', desc: 'Heatmap mein "it" ki row highlight hogi. Right panel mein percentage breakdown dikhega.' },
              { step: 3, icon: '👁️', color: '#06B6D4', title: 'Attention arcs dekho', desc: '"it" sabse zyada "cat" pe attend karta hai — kyunki "it" "cat" ko refer kar raha hai. Arc thickness dekho.' },
              { step: 4, icon: '🔄', color: '#F59E0B', title: 'Doosre tokens bhi click karo', desc: 'Har token ka alag attention pattern hoga. "chased" verb subject pe attend karta hai, articles function words pe.' },
              { step: 5, icon: '🧠', color: '#7C3AED', title: 'Heads switch karo', desc: 'Head 1, 2, 3 switch karo — har head alag linguistic phenomenon pe focus karta hai.' },
              { step: 6, icon: '📊', color: '#10B981', title: '"Subject-Verb Agreement" try karo', desc: '"The dogs run very fast." mein — "run" verb "dogs" subject pe strongly attend karta hai.' },
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
            <span className="ml-2 text-sm text-[#71717A] font-mono">attention-visualizer.tsx</span>
            <span
              className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
            >
              GenAI
            </span>
          </div>
          <div className="p-6">
            <AttentionVisualizer />
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
              <p className="text-sm text-[#A1A1AA] mt-1">Attention ke fascinating patterns dhundho</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.25)',
                title: 'Pronoun Resolution',
                setup: ['"Pronoun Resolution" scenario', '"it" token click karo', '"cat" pe kitna attention hai dekho'],
                insight: '"it" token "cat" pe 65%+ attention deta hai — model ne automatically pronoun reference seekha hai, bina explicit annotation ke.',
              },
              {
                num: '02', color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
                title: 'Multi-Head Diversity',
                setup: ['Koi bhi scenario select karo', 'Head 1 → Head 2 → Head 3 switch karo', 'Same token, alag patterns'],
                insight: 'Har head alag linguistic pattern seekhta hai. Head 1: semantic, Head 2: positional, Head 3: syntactic. Ye diversity power of transformers hai.',
              },
              {
                num: '03', color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)',
                title: 'Self-Attention',
                setup: ['"Subject-Verb Agreement" scenario', '"The" article click karo', 'Self-attention circle dekho'],
                insight: 'Articles aur function words often apne aap pe high attention dete hain. Ye tokens positional markers ki tarah kaam karte hain sentence structure mein.',
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
          style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Key Takeaways — Attention Ki Power
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { num: '1', heading: 'Attention = Parallelism', body: 'RNN ek ek token process karta tha — O(n) sequential. Attention sab tokens simultaneously process karta hai — GPU pe massively parallel. Isliye GPT training feasible hai.' },
              { num: '2', heading: 'Multi-Head = Multiple Perspectives', body: 'Ek head se sirf ek type ka relationship learn hota. Multiple heads (96 in GPT-4) different linguistic, semantic, aur positional patterns simultaneously sikhate hain.' },
              { num: '3', heading: 'Q, K, V — Query, Key, Value', body: 'Q (query) = "main kya dhundh raha hun?", K (key) = "mujh mein kya hai?", V (value) = "agar match ho to main kya contribute karun?". Dot product se similarity compute hoti hai.' },
              { num: '4', heading: 'Attention is Interpretable', body: 'Visualization possible hai kyunki attention weights explicit numbers hain. Ye transformers ko partially interpretable banata hai — RNNs ke hidden states ki tarah opaque nahi.' },
            ].map((point) => (
              <div
                key={point.num}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.2)', color: '#7C3AED' }}
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
                wrong: 'Attention model ko "understand" karne deta hai',
                right: 'Attention sirf token relationships ke weights hai — mathematical operation. Model kuch "samajhta" nahi, sirf pattern matching karta hai. Interpretability bahut limited hai.',
              },
              {
                wrong: 'Zyada heads hamesha better hote hain',
                right: 'Diminishing returns hote hain. GPT-2 ke 12 heads bhi remarkable tha. Quality of training data aur model size zyada important factors hain.',
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
              <h2 className="text-xl font-bold text-[#F5F5F7]">Attention Formula — Simplified</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Vaswani et al. 2017 — &ldquo;Attention is All You Need&rdquo;</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">attention.py (pseudocode)</span>
            </div>
            <div className="p-5 overflow-x-auto" style={{ background: '#0D0D15' }}>
              <pre className="text-sm font-mono leading-7">
                {[
                  { text: '# Scaled Dot-Product Attention', color: '#71717A' },
                  { text: 'def attention(Q, K, V, d_k):', color: '#F5F5F7' },
                  { text: '    scores = Q @ K.T / sqrt(d_k)  # similarity', color: '#F97316' },
                  { text: '    weights = softmax(scores)       # normalize 0-1', color: '#7C3AED' },
                  { text: '    return weights @ V              # weighted sum', color: '#10B981' },
                  { text: '', color: '' },
                  { text: '# Multi-Head Attention', color: '#71717A' },
                  { text: 'def multi_head_attention(x, num_heads=8):', color: '#F5F5F7' },
                  { text: '    heads = []', color: '#F5F5F7' },
                  { text: '    for i in range(num_heads):', color: '#F5F5F7' },
                  { text: '        Q = x @ W_Q[i]  # different projection per head', color: '#F97316' },
                  { text: '        K = x @ W_K[i]', color: '#06B6D4' },
                  { text: '        V = x @ W_V[i]', color: '#7C3AED' },
                  { text: '        heads.append(attention(Q, K, V, d_k))', color: '#F5F5F7' },
                  { text: '    return concat(heads) @ W_O  # combine all heads', color: '#10B981' },
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
              { href: '/visualizations/genai-neural-network', icon: '🧠', label: 'Neural Network Dekho', desc: 'Forward pass, weights, ReLU — building blocks of transformers', color: '#F97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
              { href: '/visualizations/genai-tokens', icon: '🎲', label: 'Token Sampling Dekho', desc: 'Temperature, top-k, top-p — LLM generation parameters', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)' },
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
