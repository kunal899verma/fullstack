'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const mlFundamentalsQuiz = [
  {
    question: 'Validation set ka kya kaam hai?',
    options: [
      { text: 'Final model test karna — production performance estimate', correct: false, explanation: 'Final test ke liye test set use hota hai — validation set hyperparameter tuning ke liye.' },
      { text: 'Hyperparameter tuning aur overfitting detect karne ke liye', correct: true, explanation: 'Bilkul sahi! Validation set par performance dekho — agar train good lekin val poor toh overfitting hai. Hyperparameters tune karo val set se.' },
      { text: 'Training data badhane ke liye', correct: false, explanation: 'Validation set training mein use nahi hota — sirf evaluation ke liye.' },
      { text: 'Model architecture decide karne ke liye', correct: false, explanation: 'Architecture choice experience aur experimentation se — val set performance guide karta hai lekin architecture zyada factors depend karta hai.' },
    ],
  },
  {
    question: 'Overfitting ko identify karne ka sabse clear sign kya hai?',
    options: [
      { text: 'Training loss increase hona', correct: false, explanation: 'Training loss increase usually learning rate ya architecture issue hai, overfitting nahi.' },
      { text: 'Training loss low, validation loss high — bada gap', correct: true, explanation: 'Sahi! Ye classic overfitting sign hai. Model training data memorize kar raha hai, generalize nahi kar raha.' },
      { text: 'Training bahut slow hona', correct: false, explanation: 'Slow training hardware ya architecture issue ho sakta hai — overfitting alag cheez hai.' },
      { text: 'Model accuracy 100% ho jaana', correct: false, explanation: 'High training accuracy overfitting indicator ho sakta hai, lekin val set comparison zaroori hai.' },
    ],
  },
  {
    question: 'F1 score kab use karna chahiye accuracy ki jagah?',
    options: [
      { text: 'Jab training fast hona chahiye', correct: false, explanation: 'F1 score evaluation metric hai, training speed se related nahi.' },
      { text: 'Imbalanced datasets mein — jahan ek class rare hai', correct: true, explanation: 'Bilkul sahi! 99% negative, 1% positive data mein: sirf negative predict karo = 99% accuracy lekin 0% recall. F1 both precision aur recall balance karta hai.' },
      { text: 'Regression problems ke liye', correct: false, explanation: 'F1 classification metric hai — regression ke liye MSE, RMSE, MAE use karo.' },
      { text: 'Large datasets ke liye hamesha', correct: false, explanation: 'Dataset size se F1 vs accuracy choice independent hai — class imbalance matter karta hai.' },
    ],
  },
  {
    question: 'Dropout regularization kaise kaam karta hai?',
    options: [
      { text: 'Training data reduce karta hai randomly', correct: false, explanation: 'Dropout neurons drop karta hai, data nahi. Training data wahi rehta hai.' },
      { text: 'Training mein random neurons ko temporarily disable karta hai — co-adaptation reduce karta hai', correct: true, explanation: 'Correct! Dropout se neurons independent features seekhte hain — koi bhi pair par depend nahi kar sakte. Ensemble effect create hota hai.' },
      { text: 'Weights zero karta hai', correct: false, explanation: 'Dropout neurons disable karta hai, weights zero nahi karta. L1 regularization weights zero karta hai.' },
      { text: 'Learning rate adjust karta hai', correct: false, explanation: 'Learning rate scheduling alag technique hai — dropout regularization technique hai.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function GenAIChapter3Content() {
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
          ML Fundamentals — Garbage In, Garbage Out!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Shocking reality: duniya ka best model bhi bekar data par train karoge toh bekar output dega. "Garbage in, garbage out" — ye ML ka sabse important lesson hai. Is chapter mein hum training data, loss functions, overfitting, regularization, aur evaluation metrics cover karenge. Ye concepts itne important hain ki ChatGPT se lekar kisi bhi simple spam classifier tak — sab mein yahi apply hote hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye foundations samajhne ke baad tune har ML project mein better decisions lega — chahe simple regression ho ya GPT fine-tuning.
        </p>
      </div>

      {/* ConceptCard 1: Training Data */}
      <div id="training-data">
        <ConceptCard
          title="Training Data — Garbage In, Garbage Out"
          emoji="📊"
          difficulty="beginner"
          whatIsIt="Ek shocking lekin sach baat: ML mein data > algorithm. Ek simple model excellent data par > ek complex model bad data par. Features (inputs), labels (expected outputs), aur train/val/test split — ye sab decide karte hain ki tera model production mein accha karega ya nahi. 70% train / 15% validation / 15% test — golden ratio hai ye. Aur ek critical rule: test set sirf ek baar use karo — final evaluation ke liye. Baar baar dekhne se tum khud bias ho jaate ho."
          whenToUse={[
            'Dataset collect karo — quality aur quantity dono matter karte hain',
            'Features engineer karo — raw data se useful representations banao',
            'Train/val/test split karo — generalization measure karo',
            'Data imbalance handle karo — oversampling, undersampling',
          ]}
          whyUseIt="Ye samajhna critical kyun hai? Kyunki data split galat kiya toh model overfit ho sakta hai test set par — production mein fail hoga. Validation set = hyperparameter tuning ke liye. Test set = ek baar, final evaluation — Kaggle competitions bhi isliye public + private leaderboard rakhte hain. Data leakage ka matlab: future information training mein aa gayi — model unrealistically good lagega, production mein disaster. Time-series data mein ye common mistake hai."
          howToUse={{
            filename: 'data-split.ts',
            language: 'typescript',
            code: `// Train/Val/Test Split — Best Practices

interface Dataset {
  features: number[][]
  labels: number[]
}

function splitDataset(
  data: Dataset,
  trainRatio = 0.7,
  valRatio = 0.15,
  // testRatio = 0.15 (remaining)
  seed = 42 // Reproducibility ke liye
): { train: Dataset; val: Dataset; test: Dataset } {
  // Shuffle deterministically
  const indices = data.features.map((_, i) => i)
  // Fisher-Yates shuffle with seed
  const shuffled = shuffleWithSeed(indices, seed)

  const n = shuffled.length
  const trainEnd = Math.floor(n * trainRatio)
  const valEnd = trainEnd + Math.floor(n * valRatio)

  const split = (idxs: number[]): Dataset => ({
    features: idxs.map(i => data.features[i]),
    labels: idxs.map(i => data.labels[i]),
  })

  return {
    train: split(shuffled.slice(0, trainEnd)),      // 70%
    val: split(shuffled.slice(trainEnd, valEnd)),    // 15%
    test: split(shuffled.slice(valEnd)),             // 15%
  }
}

// Feature Engineering Example
function engineerFeatures(rawData: {
  text: string
  timestamp: Date
  userId: string
}): number[] {
  return [
    rawData.text.length,                          // Text length
    rawData.text.split(' ').length,               // Word count
    rawData.timestamp.getHours(),                 // Hour of day
    rawData.timestamp.getDay(),                   // Day of week
    hashUserId(rawData.userId) % 100,             // User bucket
    hasLinks(rawData.text) ? 1 : 0,               // Binary feature
  ]
}`,
            explanation: 'Under the hood: seed fix karo shuffle mein — reproducibility ke liye zaroori hai. Ek hafte baad same results mile. Test set ek baar — ye ironclad rule hai. Baar baar test set dekhke optimize karna = test set par overfit karna = production fail. Time-series mein temporal split karo — future ka data training mein nahi jaana chahiye.',
          }}
          realWorldScenario="Real incident: Fraud detection model 99% accurate tha test set par. Production mein 30% false positives — disaster. Root cause: test set mein latest data tha, training mein old data tha — future information leak ho gayi training mein. Sawaal: ye kaise fix hota? Time-based split: train = first 70% timestamps, test = last 15%. Ye ek data split mistake thi — millions ka loss hua. Ye concepts sirf theory nahi hain."
          commonMistakes={[
            {
              mistake: 'Test set par repeatedly evaluate karna model select karne ke liye',
              why: 'Baar baar test set dekh ke optimistically bias ho jaate hain — model actually uss test set ke liye overfit ho jaata hai.',
              fix: 'Validation set par select karo, test set sirf final evaluation ke liye — ek baar. Kaggle competition mein bhi ye leaderboard overfitting ka karan hai.',
            },
            {
              mistake: 'Random shuffle time-series data mein',
              why: 'Future information training mein jaati hai — data leakage. Model unrealistically good performance dikhata hai.',
              fix: 'Time-series mein temporal split karo: train = first 70% timestamps, val = next 15%, test = last 15%.',
            },
          ]}
          proTip="Small datasets ke liye cross-validation use karo — k-fold CV se better estimate milta hai generalization ka. 5-fold: data 5 parts mein split, har baar ek part validation, baaki train. 5 baar train karo, average accuracy lo. Expensive hai lekin small data mein bahut reliable estimate deta hai. K = 10 commonly used hai — balance of accuracy aur compute cost."
        />
      </div>

      {/* ConceptCard 2: Loss Functions */}
      <div id="loss-functions">
        <ConceptCard
          title="Loss Functions — Galti Measure Karo"
          emoji="📉"
          difficulty="beginner"
          whatIsIt="Loss function model ka compass hai — ye batata hai ki model kitna galat hai. Gradient descent is compass se guide hoke weights update karta hai. Sahi loss function choose karna bahut zaroori hai — galat choose kiya toh model galat direction mein optimize karega. MSE regression ke liye (squared error — outliers pe sensitive). MAE outlier-robust alternative. Binary cross-entropy binary classification ke liye. Categorical cross-entropy multi-class ke liye. Accuracy loss function nahi hai — wo evaluation metric hai."
          whenToUse={[
            'Regression (continuous output) — MSE, MAE, Huber Loss',
            'Binary classification — Binary Cross-Entropy',
            'Multi-class classification — Categorical Cross-Entropy',
            'Generative models — KL Divergence, perceptual loss',
          ]}
          whyUseIt="Galat loss function choose kiya toh model technically 'train' hoga — loss reduce hoga — lekin galat cheez optimize karega. Example: classification mein MSE use kiya toh probabilities sahi nahi niklengi, predictions unreliable hongi. Accuracy as loss use ki toh backprop work hi nahi karega — accuracy differentiable nahi hai! Training aur evaluation metrics same nahi hote. Ye distinction bahut important hai."
          howToUse={{
            filename: 'loss-functions.ts',
            language: 'typescript',
            code: `// Loss Functions — Implementation

// ── Regression Losses ──────────────────────────────────────────────────────

// MSE (Mean Squared Error) — Regression standard
// Outliers ke sensitive, differentiable everywhere
function mse(predicted: number[], actual: number[]): number {
  const n = predicted.length
  return predicted.reduce((sum, pred, i) => {
    return sum + (pred - actual[i]) ** 2
  }, 0) / n
}

// MAE (Mean Absolute Error) — Outlier robust
// Differentiable nahi at 0, but practical
function mae(predicted: number[], actual: number[]): number {
  const n = predicted.length
  return predicted.reduce((sum, pred, i) => {
    return sum + Math.abs(pred - actual[i])
  }, 0) / n
}

// ── Classification Losses ──────────────────────────────────────────────────

// Binary Cross-Entropy — Binary classification (0 ya 1)
// y * log(p) + (1-y) * log(1-p)
function binaryCrossEntropy(
  predicted: number[], // Sigmoid outputs (0-1)
  actual: number[],    // Binary labels (0 or 1)
): number {
  const eps = 1e-7 // Avoid log(0)
  return -predicted.reduce((sum, p, i) => {
    const y = actual[i]
    return sum + (y * Math.log(p + eps) + (1 - y) * Math.log(1 - p + eps))
  }, 0) / predicted.length
}

// Categorical Cross-Entropy — Multi-class
// -sum(actual * log(predicted)) — khud calculate karo ya framework use karo
function categoricalCrossEntropy(
  predicted: number[][], // Softmax outputs
  actual: number[][],    // One-hot encoded labels
): number {
  const eps = 1e-7
  return -actual.reduce((sum, oneHot, i) => {
    return sum + oneHot.reduce((s, y, j) => {
      return s + y * Math.log(predicted[i][j] + eps)
    }, 0)
  }, 0) / actual.length
}`,
            explanation: 'MSE squared error hai — outliers heavily penalize hote hain. MAE absolute — outliers less impact. Regression mein typically MSE ya Huber Loss. Classification mein cross-entropy — probabilistic interpretation chahiye hota hai.',
          }}
          realWorldScenario="Real case: House price prediction mein MSE use kiya. Mumbai mein ek ₹10Cr outlier property ne puri training dominate ki — model consistently overestimate karta tha average homes. MAE pe switch kiya (absolute error, squared nahi) — outlier ka impact kam hua, predictions zyada balanced ho gayi. Loss function choice = practical results par direct impact. Ye sirf math nahi hai."
          commonMistakes={[
            {
              mistake: 'Accuracy as loss function use karna',
              why: 'Accuracy differentiable nahi hai — gradient flow nahi hota. Backprop work nahi karega.',
              fix: 'Training loss: cross-entropy (differentiable). Evaluation metric: accuracy. Dono alag cheez hain.',
            },
            {
              mistake: 'MSE classification mein use karna',
              why: 'MSE regression ke liye design hua — classification mein probabilities sahi nahi nikle, training unstable hoti hai.',
              fix: 'Classification ke liye cross-entropy use karo — probabilistic interpretation better hai aur gradients smoother hain.',
            },
          ]}
          proTip="Advanced tip: Custom loss functions banao business requirements ke liye — medical diagnosis mein false negative (cancer miss karna) false positive se zyada costly hai. Ye cost difference loss function mein encode karo. PyTorch mein autograd se custom losses differentiable rehti hain — sirf differentiable operations use karo. Focal Loss imbalanced datasets ke liye excellent hai — rare class par zyada focus, common class par kam."
        />
      </div>

      {/* ConceptCard 3: Overfitting vs Underfitting */}
      <div id="overfitting">
        <ConceptCard
          title="Overfitting vs Underfitting"
          emoji="📈"
          difficulty="beginner"
          whatIsIt="Shocking scenario: tera model 99.5% training accuracy deta hai. Tu excited hai. Production mein 62% accuracy — disaster. Ye overfitting hai. Model training data memorize kar gaya — generalize nahi kiya. Ulta bhi hota hai — underfitting: model bahut simple hai, patterns hi nahi seekhe. Training accuracy bhi low, validation bhi low. Sweet spot: training aur validation dono acche, gap chhota. Ye bias-variance tradeoff hai aur learning curves se clearly diagnose hota hai."
          whenToUse={[
            'Training aur validation loss plot karo — diagnose karo',
            'Model too complex? Regularization add karo — overfitting fix',
            'Model too simple? Complexity increase karo — underfitting fix',
            'Learning curves se training data ka impact dekho',
          ]}
          whyUseIt="Diagnosis pehle, treatment baad mein — yahi doctor karta hai, yahi data scientist karta hai. Training low + validation low = underfitting (complexity badho). Training high + validation low, bada gap = overfitting (regularization, more data). Dono treatments bilkul alag hain — galat treatment se problem aur badh sakti hai. Learning curves tensorboard par plot karo — real-time monitor karo."
          howToUse={{
            filename: 'bias-variance.md',
            language: 'markdown',
            code: `# Overfitting vs Underfitting Diagnosis

## Learning Curves (Training vs Validation Loss)

### Overfitting
Training Loss:    ↘️↘️↘️ (very low)
Validation Loss:  ↘️↗️↗️ (decreases then increases)
Gap:              LARGE → Model memorizing

Solutions:
- More training data
- Regularization (L1, L2, Dropout)
- Simpler model (fewer parameters)
- Early stopping
- Data augmentation

### Underfitting
Training Loss:    ↘️— (plateaus high)
Validation Loss:  ↘️— (similar to training, both high)
Gap:              SMALL → Both are bad

Solutions:
- More complex model (more layers/neurons)
- Better features (feature engineering)
- Train longer (more epochs)
- Less regularization
- Different architecture

### Just Right (Goldilocks Zone)
Training Loss:    ↘️↘️↘️ (converges well)
Validation Loss:  ↘️↘️↘️ (follows training closely)
Gap:              SMALL → Good generalization

## Bias-Variance Tradeoff
High Bias (Underfitting):  Simple model, misses patterns
High Variance (Overfitting): Complex model, memorizes noise
Sweet Spot: Enough complexity to learn, not so much to memorize`,
            explanation: 'Learning curves hamesha plot karo — tensorboard ya wandb se real-time monitor. Val loss increase hone lage toh early stopping trigger karo. Test set sirf ek baar — val set se diagnose karo regularly.',
          }}
          realWorldScenario="Real case: Image classifier — 99.5% training accuracy, 62% validation accuracy. Severe overfitting. Jaanch patal: sirf 10K distinct images the, 50K labels (same images multiple baar). Solutions: Data augmentation (flip, rotate, crop → 85K effective images), Dropout 0.5 hidden layers mein, L2 regularization. Result: 94% training, 91% validation — 3% gap, good generalization. Ek problem, teen solutions — systematic approach."
          commonMistakes={[
            {
              mistake: 'Training accuracy dekh ke satisfied ho jaana',
              why: 'High training accuracy = overfit ho sakta hai. Validation accuracy important hai — actual generalization indicator.',
              fix: 'Hamesha training aur validation curves dono plot karo. Gap < 5% generally acceptable.',
            },
            {
              mistake: 'Regularization sab problems ka solution samajhna',
              why: 'Underfitting mein regularization aur badha doge toh aur bura hoga. Diagnosis pehle.',
              fix: 'Pehle diagnose karo: big gap = overfitting (regularize). Both high = underfitting (complexity badho). Then treat.',
            },
          ]}
          proTip="Mathematics: total error = bias² + variance + irreducible noise. Irreducible noise ko control nahi kar sakte. Model complexity badho: bias ↓ lekin variance ↑. Regularization: variance ↓ slight bias ↑. Goal = balance. Yaad rakhne wala shortcut: Training-Val gap bada = overfitting (variance problem). Both high = underfitting (bias problem). Validation set par optimize karo — wo tera guide hai."
        />
      </div>

      {/* ConceptCard 4: Regularization */}
      <div id="regularization">
        <ConceptCard
          title="Regularization — Overfitting Se Bachao"
          emoji="🎛️"
          difficulty="beginner"
          whatIsIt="Model overfit ho raha hai — ab kya? Regularization! Ye techniques model ko training data memorize karne se rokti hain. L1 (Lasso) — weights sparse banata hai, kuch zero ho jaate hain (implicit feature selection). L2 (Ridge / Weight Decay) — weights large hone se rokta hai, smooth model. Dropout — training mein random neurons temporarily off karo — model depend nahi kar sakta kisi specific neuron par. Early Stopping — jab validation loss badhne lage, toh rok do — seedha simple!"
          whenToUse={[
            'Training-validation gap bada ho — overfitting hai',
            'Small dataset par complex model train karna',
            'Production deployment se pehle — generalization ensure karo',
            'Neural networks mein — dropout almost always helpful hai',
          ]}
          whyUseIt="Real production mein regularization almost always zaroori hoti hai — enough data ke bina complex models overfit ho jaate hain. L2 weight decay Neural Networks mein standard hai — AdamW optimizer (Adam + weight decay) use karo by default. Dropout 0.2-0.5 hidden layers mein. Early Stopping simplest aur often most effective — patience = 10 epochs start karo. Ye combination usually kaam karta hai."
          howToUse={{
            filename: 'regularization.ts',
            language: 'typescript',
            code: `// ── L2 Regularization (Weight Decay) ──────────────────────────────────────
// Loss += lambda * sum(weights^2)
// Large weights penalize hote hain — smooth model

function l2Loss(weights: number[][], lambda = 0.01): number {
  return lambda * weights.flat().reduce((sum, w) => sum + w * w, 0)
}

// PyTorch mein: optimizer = Adam(model.parameters(), weight_decay=0.01)

// ── L1 Regularization (Lasso) ──────────────────────────────────────────────
// Loss += lambda * sum(|weights|)
// Sparse weights — some weights become exactly 0 (feature selection)

function l1Loss(weights: number[][], lambda = 0.01): number {
  return lambda * weights.flat().reduce((sum, w) => sum + Math.abs(w), 0)
}

// ── Dropout ────────────────────────────────────────────────────────────────
// Training mein neurons randomly disable — co-adaptation reduce karo
// Inference mein: all neurons active, weights scale karo

function dropout(activations: number[], rate = 0.5, training = true): number[] {
  if (!training) return activations.map(a => a) // Inference: no dropout

  // Scale to keep expected values same
  const scale = 1 / (1 - rate)
  return activations.map(a => {
    if (Math.random() < rate) return 0 // Drop!
    return a * scale // Scale remaining
  })
}

// ── Early Stopping ─────────────────────────────────────────────────────────
class EarlyStopping {
  private bestLoss = Infinity
  private patience: number
  private counter = 0

  constructor(patience = 10) {
    this.patience = patience
  }

  step(valLoss: number): boolean {
    if (valLoss < this.bestLoss) {
      this.bestLoss = valLoss
      this.counter = 0
      return false // Continue training
    }

    this.counter++
    return this.counter >= this.patience // Stop!
  }
}`,
            explanation: 'Dropout rate 0.2-0.5 common hai. Lower rate for input layers, higher for middle. Inference mein dropout off hota hai — frameworks automatically handle karte hain (model.eval() PyTorch mein). Early stopping patience = kitne epochs improvement ka wait karo.',
          }}
          realWorldScenario="Text sentiment model, 10K reviews: 95% training, 71% validation accuracy — severe overfitting. Steps: Dropout 0.3 add kiya hidden layers mein + Early stopping (patience=5). Training 85% par automatically ruka — validation 87%! Dropout alone ne 12% validation improvement diya. Early stopping ne training time bhi save kiya. Simple techniques, dramatic improvement."
          commonMistakes={[
            {
              mistake: 'Test time mein dropout on rakhna',
              why: 'Random dropout se inference nondeterministic ho jaata hai — same input, alag output. Inconsistent predictions.',
              fix: 'model.eval() call karo inference se pehle (PyTorch). Ye automatically dropout disable karta hai aur weights appropriately scale karta hai.',
            },
            {
              mistake: 'Lambda (regularization strength) too high',
              why: 'High lambda = underfitting — model weights zero ke kaafi paas aa jaate hain, capacity khatam.',
              fix: 'Small se shuru karo: 1e-4, 1e-3. Validation performance ke hisaab se tune karo. Grid search ya Bayesian optimization use karo.',
            },
          ]}
          proTip="Hidden gem: Batch Normalization bhi regularization effect deta hai — training stabilize karta hai aur overfitting reduce karta hai. Most modern networks BatchNorm + mild Dropout use karte hain together. Lekin sabse powerful regularization technique hai: more diverse data (data augmentation). More unique examples = model ko memorize karna impossible. Data augmentation pehle try karo — har regularization trick se pehle."
        />
      </div>

      {/* ConceptCard 5: Model Evaluation */}
      <div id="evaluation">
        <ConceptCard
          title="Model Evaluation — Sahi Metrics Choose Karo"
          emoji="📏"
          difficulty="beginner"
          whatIsIt="Shocking scenario: 99% negative, 1% positive data mein model sirf 'negative' predict kare — 99% accuracy milegi! Completely useless model. Accuracy lie karti hai imbalanced data mein. Precision: predicted positive mein kitne sach mein positive. Recall: actual positive mein kitne caught kiye. F1: dono ka harmonic mean. AUC-ROC: threshold-independent overall quality. Business context decide karta hai kaun important hai — medical mein recall, spam filter mein precision."
          whenToUse={[
            'Imbalanced classes — F1, AUC-ROC accuracy se better',
            'False positive vs false negative cost alag ho — precision vs recall prioritize karo',
            'Ranking/retrieval tasks — NDCG, MAP',
            'Regression — RMSE, MAE, MAPE',
          ]}
          whyUseIt="Metrics choice = business decision, math nahi. Medical diagnosis: false negative (cancer miss karna) catastrophic — recall maximize karo, precision thodi kam bhi chalegi. Spam filter: false positive (important email spam mein jaana) annoying — precision zyada important. HR resume screening: pehle broad net (high recall), phir manually filter. Har use case ka alag optimal point hai precision-recall curve par — business samjho, phir metrics choose karo."
          howToUse={{
            filename: 'evaluation-metrics.ts',
            language: 'typescript',
            code: `// Evaluation Metrics — Classification

interface Metrics {
  accuracy: number
  precision: number
  recall: number
  f1: number
}

function computeMetrics(
  predictions: number[], // 0 or 1
  actuals: number[],     // 0 or 1
): Metrics {
  let tp = 0, fp = 0, tn = 0, fn = 0

  for (let i = 0; i < predictions.length; i++) {
    const pred = predictions[i]
    const actual = actuals[i]

    if (pred === 1 && actual === 1) tp++ // Correct positive
    if (pred === 1 && actual === 0) fp++ // False alarm
    if (pred === 0 && actual === 0) tn++ // Correct negative
    if (pred === 0 && actual === 1) fn++ // Missed positive
  }

  const accuracy = (tp + tn) / (tp + fp + tn + fn)

  // Precision: predicted positive mein kitne actual positive?
  const precision = tp / (tp + fp) || 0

  // Recall (Sensitivity): actual positive mein kitne correctly identified?
  const recall = tp / (tp + fn) || 0

  // F1: Precision aur Recall ka harmonic mean
  const f1 = precision + recall > 0
    ? 2 * (precision * recall) / (precision + recall)
    : 0

  return { accuracy, precision, recall, f1 }
}

// Confusion Matrix
function confusionMatrix(preds: number[], actuals: number[]): number[][] {
  // [[TN, FP], [FN, TP]]
  return [[
    preds.filter((p, i) => p === 0 && actuals[i] === 0).length, // TN
    preds.filter((p, i) => p === 1 && actuals[i] === 0).length, // FP
  ], [
    preds.filter((p, i) => p === 0 && actuals[i] === 1).length, // FN
    preds.filter((p, i) => p === 1 && actuals[i] === 1).length, // TP
  ]]
}`,
            explanation: 'Precision = sahi positive predictions / all positive predictions. Recall = sahi positive predictions / all actual positives. F1 = harmonic mean — dono balance karta hai. Threshold adjust karo precision-recall tradeoff ke liye.',
          }}
          realWorldScenario="COVID rapid test: 99% accuracy claim kiya jab 1% population infected tha. Ek infected patient pakda = 99 false alarms! Precision = 1% — useless practically! Lekin recall = 99% — almost koi infected nahi chhoota. Medical domain: recall critical (false negative = miss). Spam filter: precision critical (false positive = important email spam mein). Sawaal: tera use case kya demand karta hai? Pehle ye samjho, phir model evaluate karo."
          commonMistakes={[
            {
              mistake: 'Single metric optimize karna — recall ya precision mein se ek',
              why: 'Extreme optimization: recall = 1 (predict everything positive). Precision = 1 (predict only when 100% sure, miss many). Both useless extremes.',
              fix: 'F1 dono balance karta hai. Ya business requirements ke hisaab se threshold tune karo — ROC curve plot karo aur operating point select karo.',
            },
            {
              mistake: 'Imbalanced data mein accuracy report karna',
              why: '99% negative, 1% positive dataset mein: sirf "No" predict karo = 99% accuracy. Completely useless model.',
              fix: 'Imbalanced data mein F1, AUC-ROC, precision-recall curve report karo. Class weights adjust karo ya resampling use karo.',
            },
          ]}
          proTip="Must-know: ROC curve plot karo — different decision thresholds par TPR vs FPR. AUC-ROC = 0.5 random classifier jaisa, 1.0 perfect. Threshold-independent overall quality metric hai. Imbalanced data ke liye Precision-Recall curve better — AUC-PR use karo ROC se zyada informative hai. scikit-learn: roc_auc_score(), f1_score(), classification_report() — ye functions use karo hamesha model evaluate karte waqt."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 3 Quiz — ML Fundamentals Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — data split, loss functions, overfitting, evaluation test karo!
          </p>
        </div>
        <QuizSection questions={mlFundamentalsQuiz} chapterSlug="ml-fundamentals" />
      </div>
    </div>
  )
}
