'use client'

import React, { useState } from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function NeuralNetworkDiagram() {
  const items = [
    { label: 'Input Layer', sublabel: 'Raw features — pixels, numbers, text tokens', color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', icon: '📥' },
    { label: 'Hidden Layer 1', sublabel: 'Weights + ReLU activation — simple patterns', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '⚙️' },
    { label: 'Hidden Layer 2', sublabel: 'Higher-level features — combines previous', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', icon: '🔧' },
    { label: 'Output Layer', sublabel: 'Prediction — class probabilities via softmax', color: '#F97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.4)', icon: '📤' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Neural Network — Forward Pass</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓ forward pass &nbsp;|&nbsp; ↑ backprop</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Neuron Visualization Demo ─────────────────────────────────────────────────

function NeuronDemo() {
  const [inputs, setInputs] = useState([0.5, 0.8, 0.3])
  const weights = [0.6, -0.4, 0.9]
  const bias = 0.1

  const weightedSum = inputs.reduce((sum, inp, i) => sum + inp * weights[i], bias)
  const relu = Math.max(0, weightedSum)
  const sigmoid = 1 / (1 + Math.exp(-weightedSum))

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#71717A] mb-3">Inputs adjust karo — dekho output kaise change hota hai</p>

      {/* Input sliders */}
      <div className="space-y-3">
        {inputs.map((inp, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-[#71717A] w-16">Input {i + 1}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={inp}
              onChange={(e) => {
                const newInputs = [...inputs]
                newInputs[i] = parseFloat(e.target.value)
                setInputs(newInputs)
              }}
              className="flex-1 accent-purple-500"
            />
            <span className="text-xs font-mono text-[#9D5FF0] w-10 text-right">{inp.toFixed(1)}</span>
            <span className="text-xs text-[#71717A] w-20">× w{i + 1}={weights[i]}</span>
          </div>
        ))}
      </div>

      {/* Computation */}
      <div
        className="rounded-xl p-3 mt-4"
        style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-xs text-[#71717A] mb-2">Computation:</p>
        <p className="text-xs font-mono text-[#A1A1AA]">
          Sum = {inputs.map((inp, i) => `(${inp.toFixed(1)} × ${weights[i]})`).join(' + ')} + {bias} = <span className="text-[#9D5FF0]">{weightedSum.toFixed(3)}</span>
        </p>
        <div className="flex gap-4 mt-2">
          <span className="text-xs font-mono">ReLU: <span className="text-[#10B981]">{relu.toFixed(3)}</span></span>
          <span className="text-xs font-mono">Sigmoid: <span className="text-[#06B6D4]">{sigmoid.toFixed(3)}</span></span>
        </div>
      </div>

      {/* Visual neuron */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex flex-col gap-2">
          {inputs.map((inp, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
                style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#9D5FF0' }}
              >
                {inp.toFixed(1)}
              </div>
              <div className="h-px w-8" style={{ background: `rgba(124,58,237,${0.3 + inp * 0.7})` }} />
            </div>
          ))}
        </div>

        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: 'rgba(6,182,212,0.2)', border: '2px solid rgba(6,182,212,0.5)', color: '#06B6D4' }}
        >
          σ
        </div>

        <div className="flex items-center gap-2">
          <div className="h-px w-8" style={{ background: 'rgba(16,185,129,0.5)' }} />
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
            style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', color: '#10B981' }}
          >
            {relu.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const neuralNetworkQuiz = [
  {
    question: 'Backpropagation kya karta hai?',
    options: [
      { text: 'Network ka architecture decide karta hai', correct: false, explanation: 'Architecture design karne ka kaam developer karta hai — backprop learning ke liye hai.' },
      { text: 'Error ko output se input ki taraf propagate karta hai aur weights update karta hai', correct: true, explanation: 'Bilkul sahi! Backprop chain rule use karta hai — har weight ka contribution error mein calculate hota hai aur gradient descent se weights update hote hain.' },
      { text: 'Input data normalize karta hai', correct: false, explanation: 'Normalization preprocessing step hai — backprop training step hai.' },
      { text: 'Model ko deploy karta hai', correct: false, explanation: 'Backprop training mein hota hai — deployment alag step hai.' },
    ],
  },
  {
    question: 'ReLU activation function kya karta hai?',
    options: [
      { text: '0 aur 1 ke beech output compress karta hai', correct: false, explanation: 'Ye sigmoid ka kaam hai — ReLU negative values ko 0 karta hai.' },
      { text: 'Negative values ko 0 karta hai, positive values waise hi rehte hain', correct: true, explanation: 'Sahi! ReLU = max(0, x). Simple lekin effective — vanishing gradient problem solve karta hai.' },
      { text: 'Output ko -1 se 1 ke beech rakhta hai', correct: false, explanation: 'Tanh -1 se 1 ke beech rakhta hai, ReLU nahi.' },
      { text: 'Probabilities output karta hai', correct: false, explanation: 'Probabilities ke liye softmax use hota hai (final layer mein classification ke liye).' },
    ],
  },
  {
    question: 'Deep network (more layers) kyun better hota hai shallow se?',
    options: [
      { text: 'Zyada parameters se hamesha better performance', correct: false, explanation: 'Overfitting ho sakta hai zyada parameters se — depth ki wajah nahi.' },
      { text: 'Hierarchical features seekhta hai — simple features combine hokar complex patterns bante hain', correct: true, explanation: 'Bilkul sahi! Pehli layers edges seekhti hain, phir shapes, phir objects — hierarchical representation.' },
      { text: 'Training fast hoti hai', correct: false, explanation: 'Deep networks typically slow train hote hain — batch normalization, skip connections se help milti hai.' },
      { text: 'Less data chahiye', correct: false, explanation: 'Deep networks typically MORE data chahiye — shallow networks less data par bhi kaam kar sakte hain.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter2Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Neural Networks — Brain Ki Copy? Nahi Bhai, Math Hai!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Shocking opener: GPT-4 mein 1.8 trillion parameters hain. Har parameter ek weight hai — ek number. Literally numbers ka ek bahut bada collection hai — aur usse intelligent conversation aata hai. Jaadu? Nahi — mathematics. Neural networks brain se loosely inspired hain, lekin fundamentally ye sirf weighted sums aur non-linear functions hain. Billions of them. Is chapter mein perceptron se shuru karke deep networks tak samjhenge — koi magic nahi, pure science.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          GPT-4, DALL-E, Claude — sab neural networks hain. Inke andar kya hota hai — aaj demystify karte hain.
        </p>
      </div>

      <NeuralNetworkDiagram />

      {/* ConceptCard 1: Perceptron */}
      <div id="perceptron">
        <ConceptCard
          title="Perceptron — Ek Neuron Ka Model"
          emoji="🧬"
          difficulty="beginner"
          whatIsIt="Ek perceptron = ek neuron. Ye GPT-4 ka sabse chhota building block hai. Kaam kya karta hai? Inputs lो, weights se multiply karo, sab add karo, bias add karo, phir activation function lagao — aur output do. Bas itna. Yahi basic building block hai sab neural networks ka. Billions of ye simple units milke extraordinary cheezein karte hain. Ye samajh aaya toh pura neural network samajh aayega."
          whenToUse={[
            'Neural networks ke fundamentals samajhne ke liye',
            'Simple binary classification problems ke liye',
            'Logistic regression se connection samajhne ke liye',
            'Deep learning journey ka starting point',
          ]}
          whyUseIt="Kyun samajhna zaroori hai? Kyunki perceptron = foundation. Billions of perceptrons milke GPT jaisi models banti hain. Ek ek concept clear karo: Weights = importance of each input (training mein learn hoti hai). Bias = threshold shift karna. Activation = non-linearity — bina iske network sirf ek straight line draw kar sakta tha, kuch nahi. Ye concepts chain karke poora deep learning samajh aayega."
          howToUse={{
            filename: 'perceptron.ts',
            language: 'typescript',
            code: `// Simple Perceptron — step by step

function perceptron(inputs: number[], weights: number[], bias: number): number {
  // Step 1: Weighted sum calculate karo
  const weightedSum = inputs.reduce(
    (sum, input, i) => sum + input * weights[i],
    bias // Bias add karo
  )

  // Step 2: Activation function apply karo
  return relu(weightedSum) // ya sigmoid, tanh
}

// Activation functions
const relu = (x: number) => Math.max(0, x)
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))
const tanh = (x: number) => Math.tanh(x)

// Example: Spam detector
const inputs = [0.8, 0.2, 0.9] // [has_links, known_sender, caps_ratio]
const weights = [0.7, -0.5, 0.6] // Learned weights
const bias = -0.3

const output = perceptron(inputs, weights, bias)
console.log('Spam probability:', sigmoid(output).toFixed(3))
// 0 = not spam, 1 = spam`,
            explanation: 'Under the hood: ye single neuron spam detect karta hai. Weight[-0.5 for known_sender] negative hai — known sender hoga toh spam probability kam hogi. Training mein gradient descent ye weights adjust karta hai automatically jab tak predictions sahi na hon. Tu manually kuch nahi likhta — model khud seekhta hai.',
          }}
          realWorldScenario="Sawaal: brain aur neural network mein kya fark hai? Human brain mein ~86 billion neurons hain, har ek thousands of connections ke saath. GPT-4 mein approximately 1.8 trillion parameters hain — ye sab mathematical weights ka collection hai, actual neurons nahi. Ek single perceptron: useless. Billions of them, properly trained: extraordinary pattern matching jo intelligence jaisa lagta hai. Magic nahi — scale hai."
          commonMistakes={[
            {
              mistake: 'Perceptron ko "actual brain" samajhna',
              why: 'Biological neurons much more complex hain. Perceptron mathematical abstraction hai — loosely inspired by biology.',
              fix: 'Neural network = mathematical function approximation, not brain simulation. Ye distinction important hai expectations set karne ke liye.',
            },
            {
              mistake: 'Bias term ignore karna',
              why: 'Bina bias ke, decision boundary hamesha origin se guzregi — many problems solvable nahi honge.',
              fix: 'Bias ek additional learnable parameter hai — threshold shift karta hai. Hamesha include karo.',
            },
          ]}
          proTip="Historical fun fact: perceptron linear classifier hai — XOR problem solve nahi kar sakta. Is ek limitation ne 1960s mein 'AI winter' laaya — researchers ne fund pull kar liya. Phir 1980s mein multi-layer perceptrons (MLP) aaye aur fix kiya — non-linear decision boundaries possible hue. Ek mathematical limitation ne decades ki progress rok di. Tab se hum seekhte hain: hamesha limitations samjho."
          demo={<NeuronDemo />}
        />
      </div>

      {/* ConceptCard 2: Neural Network Layers */}
      <div id="nn-layers">
        <ConceptCard
          title="Neural Network Layers"
          emoji="🏗️"
          difficulty="beginner"
          whatIsIt="Ek single perceptron limited hai — milao inhe, magic hoti hai. Neural network mein teen types ki layers hain: Input layer (raw data aata hai), Hidden layers (yahan magic hoti hai — patterns learn hote hain), Output layer (final prediction). Feedforward pass mein data left se right flow karta hai, layer by layer. Har layer pehli layer ke upar build karti hai — pehle simple patterns, phir complex. Ye hierarchical learning hi deep learning ko powerful banata hai."
          whenToUse={[
            'Classification problems — image kya hai, sentiment positive ya negative',
            'Regression — house price predict karna',
            'Pattern recognition — handwriting recognition',
            'Feature extraction — images se features nikalna',
          ]}
          whyUseIt="Hidden layers kyun powerful hain? Ye abstraction create karte hain — raw pixels se faces samajhna directly impossible hai. Lekin layers mein: Layer 1 edges detect karta hai (simple). Layer 2 shapes — aankhein, naak, muh. Layer 3 faces. Layer 4 specific identities. Ye hierarchy AUTOMATICALLY training mein aati hai — tune manually nahi likhna. Ye hi 'deep' learning ka magic hai. Depth = more abstract, more powerful representations."
          howToUse={{
            filename: 'neural-network.ts',
            language: 'typescript',
            code: `// Simple 3-layer network (conceptually)
// Input → Hidden → Output

interface Layer {
  weights: number[][]  // [outputNeurons][inputNeurons]
  biases: number[]     // [outputNeurons]
}

function forwardPass(input: number[], layers: Layer[]): number[] {
  let activation = input

  for (const layer of layers) {
    const nextActivation: number[] = []

    for (let j = 0; j < layer.weights.length; j++) {
      // Neuron j ka weighted sum
      const sum = layer.weights[j].reduce(
        (acc, weight, i) => acc + weight * activation[i],
        layer.biases[j]
      )
      nextActivation.push(Math.max(0, sum)) // ReLU
    }

    activation = nextActivation
  }

  return activation
}

// Example: Image classifier
// Input: 784 pixels (28x28 image)
// Hidden 1: 128 neurons
// Hidden 2: 64 neurons
// Output: 10 neurons (digits 0-9)
const network: Layer[] = [
  { weights: Array(128).fill(Array(784).fill(0.01)), biases: Array(128).fill(0) },
  { weights: Array(64).fill(Array(128).fill(0.01)), biases: Array(64).fill(0) },
  { weights: Array(10).fill(Array(64).fill(0.01)), biases: Array(10).fill(0) },
]`,
            explanation: 'Under the hood: ye simplified forward pass hai — real frameworks (TensorFlow, PyTorch) matrix multiplication GPU par karte hain, thousands of times faster. 784→128→64→10 architecture ek digit image ko 10-class probability vector mein map karta hai. Output: [0.01, ..., 0.95, ...] — highest probability wala digit answer hai.',
          }}
          realWorldScenario="Sawaal: Google Photos faces kaise pehchanta hai? Input layer raw pixels (millions). Early hidden layers: edges, corners detect karte hain. Middle layers: aankhein, naak, muh shapes. Deep layers: specific faces. Output layer: person ki identity. Ye hierarchy automatically learn hoti hai training se — tune manually describe nahi karna 'aankhein aisi hoti hain'."
          commonMistakes={[
            {
              mistake: 'Too many hidden layers bina data ke — deep network shallow se worse ho sakta hai',
              why: 'Vanishing gradients, overfitting, training instability — deep networks ko zyada data aur careful tuning chahiye.',
              fix: 'Simple se shuru karo — 1-2 hidden layers. Complexity add karo jab performance plateau ho jaaye. Regularization use karo.',
            },
            {
              mistake: 'Output layer activation function galat choose karna',
              why: 'Binary classification mein sigmoid, multi-class mein softmax, regression mein linear — galat activation se training fail hoti hai.',
              fix: 'Task ke hisaab se activation choose karo: binary = sigmoid, multi-class = softmax, regression = none (linear).',
            },
          ]}
          proTip="Pro tip: Universal Approximation Theorem kahta hai — ek single hidden layer (enough neurons ke saath) koi bhi function approximate kar sakti hai. Toh phir depth kyun? Depth se same approximation zyada efficiently hoti hai, hierarchical features learn hoti hain, aur generalization better hoti hai. Width vs depth trade-off — practical mein: deep thin networks > shallow wide networks. Modern LLMs 96+ layers deep hain!"
        />
      </div>

      {/* ConceptCard 3: Activation Functions */}
      <div id="activations">
        <ConceptCard
          title="Activation Functions — Non-Linearity"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="Shocking fact: bina activation function ke, 100 layers ka neural network bhi sirf ek straight line draw kar sakta hai. Ek bhi line! Kisi bhi complex problem ko solve karne ke liye non-linearity chahiye — aur activation functions wahi dete hain. ReLU sabse popular hai hidden layers ke liye: max(0, x) — negative values zero ho jaate hain, positive waise hi rahte hain. Simple? Haan. Powerful? Bilkul. Sigmoid output 0-1 ke beech rakhta hai — probabilities ke liye. Softmax multiple class probabilities ke liye."
          whenToUse={[
            'ReLU — default choice, hidden layers ke liye',
            'Sigmoid — binary output (0-1 probability)',
            'Softmax — multi-class output (probabilities sum to 1)',
            'Tanh — -1 to 1 range chahiye ho (RNN mein)',
          ]}
          whyUseIt="Bhai, activation choice matter karta hai — seriously. Hidden layers mein sigmoid use kiya toh training hi fail ho sakti hai (vanishing gradients). ReLU ne ye problem solve kiya. GPT-4 GELU use karta hai — ReLU se smoother, better performance language tasks mein. Tujhe ML scientist nahi banna — lekin basic intuition samajhna zaroori hai: ReLU = default choice hidden layers ke liye. Baaki sab specific cases ke liye."
          howToUse={{
            filename: 'activations.ts',
            language: 'typescript',
            code: `// Activation Functions — Implementation & When to Use

// ReLU (Rectified Linear Unit) — Most Common
// f(x) = max(0, x)
// Pros: Simple, no vanishing gradient for positive values
// Cons: "Dying ReLU" — neuron can get stuck at 0
const relu = (x: number) => Math.max(0, x)

// Leaky ReLU — ReLU ka fix
// f(x) = x if x > 0, else 0.01x
const leakyRelu = (x: number) => x > 0 ? x : 0.01 * x

// Sigmoid — Binary classification output
// f(x) = 1 / (1 + e^-x)  → Range: (0, 1)
// Cons: Vanishing gradient, outputs not zero-centered
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))

// Tanh — Zero-centered alternative to sigmoid
// f(x) = tanh(x)  → Range: (-1, 1)
const tanh = (x: number) => Math.tanh(x)

// Softmax — Multi-class output (probabilities)
// Each output = e^xi / sum(e^x)
function softmax(outputs: number[]): number[] {
  const max = Math.max(...outputs) // Numerical stability
  const exps = outputs.map(x => Math.exp(x - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map(e => e / sum)
}

// Example: 3-class classification
const logits = [2.0, 1.0, 0.5]
const probs = softmax(logits)
// [0.659, 0.242, 0.099] — sum = 1.0
console.log('Probabilities:', probs.map(p => p.toFixed(3)))`,
            explanation: 'Hidden layers mein ReLU use karo (ya GELU for Transformers). Binary classification output: sigmoid. Multi-class: softmax. Regression output: no activation (linear). Ye rules of thumb hain — empirically test karo.',
          }}
          realWorldScenario="Sawaal: GPT-4 konsa activation use karta hai? GELU — Gaussian Error Linear Unit. ReLU se smoother, language tasks mein better performance. BERT bhi GELU use karta hai. Sigmoid aur Tanh hidden layers mein? Avoid karo — 2024 mein ye 1990s practice hai. Output layer mein: binary = sigmoid, multi-class = softmax, regression = kuch nahi (linear). Ye rules yaad rakh."
          commonMistakes={[
            {
              mistake: 'Sigmoid hidden layers mein use karna',
              why: 'Vanishing gradient problem severe hota hai — deep networks train nahi ho paate. 1990s practice hai — avoid karo.',
              fix: 'Hidden layers mein ReLU ya GELU use karo. Sigmoid sirf binary output layer ke liye.',
            },
            {
              mistake: 'Output layer par wrong activation',
              why: 'ReLU output layer par regression ke liye OK hai (positive outputs), lekin classification ke liye wrong — probabilities nahi milti.',
              fix: 'Binary: sigmoid. Multi-class: softmax. Regression: no activation. Ye mistakes training loss mein weird behavior cause karte hain.',
            },
          ]}
          proTip="'Dying ReLU' problem: ek neuron permanently 0 output dene lagta hai — stuck! Fix: Leaky ReLU (0.01x for negative values, zero nahi) ya He initialization. Batch Normalization se training stable hoti hai aur ye issues kam hote hain. Pro rule: hidden layers = ReLU (ya GELU for transformers). Output layer = task ke hisaab se (sigmoid/softmax/linear). Ye combination 90% cases mein kaam karta hai."
        />
      </div>

      {/* ConceptCard 4: Backpropagation */}
      <div id="backpropagation">
        <ConceptCard
          title="Backpropagation — Kaise Seekhte Hain Networks?"
          emoji="🔄"
          difficulty="beginner"
          whatIsIt="Backpropagation — ye wo algorithm hai jisne neural networks ko actually trainable banaya. Bina backprop ke, no deep learning, no ChatGPT, no kuch nahi. Kaam kaise karta hai? Forward pass mein network prediction karta hai. Phir error calculate hota hai (kitna galat tha?). Phir backprop error backwards propagate karta hai — har weight ka contribution error mein calculate karta hai (chain rule se). Gradient descent phir weights update karta hai — thoda thoda improve karte raho. Ye loop lakho baar repeat hota hai — training."
          whenToUse={[
            'Neural network training — hamesha yahi use hota hai',
            'Gradient understanding ke liye — kaunsa weight kitna responsible hai error mein',
            'Custom loss functions design karte waqt — differentiable honi chahiye',
            'Optimization algorithms understand karne ke liye — Adam, SGD',
          ]}
          whyUseIt="Backprop kyun samajhna zaroori hai? Kyunki agar tujhe pata nahi ki network kaise seekhta hai, toh jab training fail ho toh tu blind hoga. Learning rate bahut high — gradients explode. Too low — bahut slow learning. Loss curve dekh ke diagnose karna aata hai. PyTorch/TensorFlow automatically backprop compute karte hain (autograd) — loss.backward() ek call mein sab gradients calculate. Tu sirf architecture design kar aur data de."
          howToUse={{
            filename: 'backprop-intuition.ts',
            language: 'typescript',
            code: `// Backpropagation — Intuition with Simple Example

// Forward Pass: prediction karo
function forwardPass(x: number, w: number, b: number): number {
  return w * x + b // Simple linear neuron (no activation for clarity)
}

// Loss Function: MSE (Mean Squared Error)
function mse(predicted: number, actual: number): number {
  return (predicted - actual) ** 2
}

// Backward Pass: gradients calculate karo
function backwardPass(
  x: number,
  w: number,
  predicted: number,
  actual: number,
): { dw: number; db: number } {
  // dLoss/dPredicted
  const dLoss = 2 * (predicted - actual) // Derivative of MSE

  // Chain rule:
  // dLoss/dw = dLoss/dPredicted * dPredicted/dw
  const dw = dLoss * x // dPredicted/dw = x

  // dLoss/db = dLoss/dPredicted * dPredicted/db
  const db = dLoss * 1 // dPredicted/db = 1

  return { dw, db }
}

// Training Loop (Gradient Descent)
function trainStep(
  x: number,
  actual: number,
  w: number,
  b: number,
  learningRate: number = 0.01,
): { w: number; b: number; loss: number } {
  const predicted = forwardPass(x, w, b)
  const loss = mse(predicted, actual)

  const { dw, db } = backwardPass(x, w, predicted, actual)

  // Update weights — move opposite to gradient
  const newW = w - learningRate * dw
  const newB = b - learningRate * db

  return { w: newW, b: newB, loss }
}

// Training simulation
let w = Math.random(), b = Math.random()
for (let epoch = 0; epoch < 100; epoch++) {
  const result = trainStep(2.0, 5.0, w, b) // x=2, target=5
  w = result.w
  b = result.b
  if (epoch % 10 === 0) console.log(\`Epoch \${epoch}: loss=\${result.loss.toFixed(4)}\`)
}`,
            explanation: 'Under the hood: ye simplified single-neuron example hai. Real networks mein thousands of layers, millions of weights — same chain rule, matrix operations. PyTorch mein: loss.backward() ek call se sab gradients compute ho jaate hain (autograd magic). Tu sirf loss define kar — backprop automatically hota hai.',
          }}
          realWorldScenario="ChatGPT training mein backprop kaise kaam kiya? Model response generate karta tha → human rater ne score diya → reward model train hui → backprop se policy weights update hue (RLHF). Ye loop billions of baar repeat hua — thousands of GPUs par weeks tak. Gradient descent slowly, steadily model ko better banata gaya. Tab jaake ChatGPT bana jo humne December 2022 mein dekha."
          commonMistakes={[
            {
              mistake: 'Learning rate bahut high rakhna',
              why: 'High LR = gradients overshoot — loss oscillate karta hai, converge nahi hota ya diverge hota hai.',
              fix: 'Small LR se shuru karo (0.001 ya 0.0001). LR scheduler use karo — gradually reduce karo. Adam optimizer LR automatically adapt karta hai.',
            },
            {
              mistake: 'Non-differentiable operations use karna computation graph mein',
              why: 'Backprop ko gradients chahiye — agar operation differentiable nahi toh gradient flow nahi hota.',
              fix: 'Differentiable approximations use karo. PyTorch/TensorFlow built-in operations hamesha differentiable hain — custom ops carefully banao.',
            },
          ]}
          proTip="Practical tips: Gradient clipping use karo — if gradient > threshold, scale down. Exploding gradients se training crash hoti hai. clip_grad_norm_ (PyTorch) must use karo. Vanishing gradients ke liye: residual connections (ResNet style), batch normalization, He/Xavier initialization. Adam optimizer use karo by default — ye LR automatically adapt karta hai, manually tune nahi karna padta."
        />
      </div>

      {/* ConceptCard 5: Universal Approximation */}
      <div id="universal-approximation">
        <ConceptCard
          title="Universal Approximation — Kyun Depth Matters?"
          emoji="∞"
          difficulty="beginner"
          whatIsIt="Shocking theorem: mathematically prove kiya gaya hai ki ek single hidden layer (enough neurons ke saath) koi bhi continuous function approximate kar sakti hai. Toh deep networks (many layers) kyun? Kyunki same approximation depth se much more efficiently hoti hai — zyada chhote network mein, better generalization ke saath. GPT-4 ne 96+ layers isliye nahi banaye ki koi fancy tha — ye mathematically optimal choice hai complex language modeling ke liye."
          whenToUse={[
            'Network architecture choose karte waqt — width vs depth',
            'Why deep learning works samajhne ke liye',
            'Capacity vs generalization trade-off analyze karne ke liye',
            'Transfer learning ka foundation samajhne ke liye',
          ]}
          whyUseIt="Ye samajhna kyun zaroori hai? Agar tujhe pata hai ki deep networks theoretically powerful hain, toh architecture design karte time better decisions lega. Width vs depth: deep thin networks shallow wide networks se better generalize karte hain. Ye intuition se kaafi important hai — bahut zyada wide shallow network overfitting ke liye prone hoti hai. Hierarchical features = better representations = better generalization."
          howToUse={{
            filename: 'depth-vs-width.md',
            language: 'markdown',
            code: `# Depth vs Width — Practical Guide

## Universal Approximation Theorem
- 1 hidden layer + enough neurons = koi bhi function approximate ho sakta hai
- BUT: ek bahut wide layer efficient nahi hai
- Depth → hierarchical representations → better generalization

## Shallow vs Deep Networks

### Shallow (1-2 hidden layers)
- Simple problems: tabular data, small datasets
- Interpretability better
- Faster training
- Example: Spam detection with hand-crafted features

### Deep (3+ hidden layers)
- Complex problems: images, text, audio
- Raw data directly → predictions
- More data needed
- Example: Image classification, language models

## Why Depth Works
Input Image → Layer 1 (edges) → Layer 2 (shapes)
→ Layer 3 (parts) → Layer 4 (objects) → Output

Each layer builds on previous:
- More abstract representations
- Reusable features (transfer learning!)
- Exponentially expressive with depth

## Practical Architecture Tips
1. Start: 2-3 hidden layers, 64-256 neurons
2. Add depth if underfitting
3. Add regularization (dropout) if overfitting
4. Batch normalization between layers
5. Skip connections (ResNet) for very deep networks (>10 layers)`,
            explanation: 'Under the hood: VGG (16 layers), ResNet (152 layers), GPT-4 (96+ transformer blocks) — depth ne AI revolution kiya. Par depth ke saath training challenges aate hain — vanishing gradients, training instability. Residual connections, batch normalization, careful initialization ne ye sab solve kiya. Aaj ye techniques standard practice hain.',
          }}
          realWorldScenario="2015 mein Microsoft ke researchers ne ResNet banaya — 152 layers ka network. Pehle itna deep koi bhi train nahi kar paya tha. Secret kya tha? Residual (skip) connections — gradient directly deep layers tak pohunch sakta tha, bina vanish hue. Ye ek simple idea tha: x + F(x). Is ek idea ne modern deep learning ka darwaza khola. Simple ideas, revolutionary impact."
          commonMistakes={[
            {
              mistake: 'Network itna deep banana ki training fail ho jaaye',
              why: 'Vanishing/exploding gradients se deep networks train nahi hote bina special techniques ke.',
              fix: 'Batch normalization, residual connections, careful initialization. PyTorch/TensorFlow best practices follow karo — premade architectures use karo starting point ke roop mein.',
            },
            {
              mistake: 'Theorem ko misread karna — "big network = guaranteed success"',
              why: 'Theorem existence guarantee karta hai, lekin practically training mein find karna hard hai. Optimization landscape complex hai.',
              fix: 'Architecture + data quality + training recipe sab matter karte hain. Theorem theoretical bound hai, practical guide nahi.',
            },
          ]}
          proTip="Sabse important pro tip: scratch se train mat karo! Transfer learning use karo — pre-trained deep networks (BERT, ResNet) fine-tune karo apne task ke liye. ImageNet par trained ResNet tere custom image classifier ke liye bhi kaam karega — because hierarchical features universal hain. Ek developer ke roop mein, ye depth ki power practically use karne ka sabse smart tarika hai bina billions of parameters train kiye."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 2 Quiz — Neural Networks Check
          </h3>
          <p className="text-sm text-[#71717A]">
            3 questions — perceptron, backprop, activation functions test karo!
          </p>
        </div>
        <QuizSection questions={neuralNetworkQuiz} chapterSlug="neural-networks" />
      </div>
    </div>
  )
}
