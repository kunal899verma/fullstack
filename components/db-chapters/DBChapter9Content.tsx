'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'Mongoose populate aur MongoDB $lookup mein kya basic fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same kaam karte hain', correct: false, explanation: 'Performance aur flexibility mein significant differences hain.' },
      { text: 'populate: application-level join (multiple queries); $lookup: database-level join (single aggregation pipeline)', correct: true, explanation: 'Sahi! populate multiple queries fire karta hai (N+1 risk hai). $lookup single pipeline query hai — better for complex joins aur large datasets.' },
      { text: '$lookup sirf SQL databases ke liye hai', correct: false, explanation: '$lookup MongoDB aggregation pipeline ka stage hai — MongoDB ke liye hi hai.' },
      { text: 'populate faster hai hamesha', correct: false, explanation: 'Populate small datasets ke liye convenient hai. $lookup large datasets aur complex joins ke liye zyada efficient ho sakta hai.' },
    ],
  },
  {
    question: 'pre(\'save\') hook ka sabse common use case kya hai?',
    options: [
      { text: 'Database connection establish karna', correct: false, explanation: 'Connection hooks alag hain — pre(\'save\') document lifecycle ke liye hai.' },
      { text: 'Password hash karna save hone se pehle', correct: true, explanation: 'Bilkul! Pre-save hook mein bcrypt se password hash karo. this.isModified(\'password\') check karo — sirf password change hone par hash karo.' },
      { text: 'Query results cache karna', correct: false, explanation: 'Caching alag layer hai — pre(\'save\') document save se pehle fire hota hai.' },
      { text: 'Index create karna', correct: false, explanation: 'Indexes schema definition mein ya ensureIndexes() se create hote hain — hook se nahi.' },
    ],
  },
  {
    question: 'lean() method kyun use karte hain Mongoose mein?',
    options: [
      { text: 'Lean documents mein methods aur virtuals available hote hain', correct: false, explanation: 'Lean documents plain JS objects hain — methods aur virtuals accessible nahi hote. Ye ek limitation hai.' },
      { text: 'Plain JavaScript objects return karne ke liye — Mongoose document overhead remove hota hai, faster aur less memory', correct: true, explanation: 'Sahi! Lean documents plain POJOs hain — no Mongoose overhead. Read-only operations (API responses) ke liye perfect. 3-5x faster ho sakta hai.' },
      { text: 'lean() se queries automatically cache hoti hain', correct: false, explanation: 'lean() caching se unrelated hai — sirf return type change karta hai.' },
      { text: 'lean() validation enable karta hai', correct: false, explanation: 'lean() documents pe validation nahi hoti — plain objects hain.' },
    ],
  },
  {
    question: 'Virtual field kya hota hai Mongoose mein?',
    options: [
      { text: 'Field jo MongoDB mein store hoti hai lekin encrypted form mein', correct: false, explanation: 'Virtual MongoDB mein store nahi hoti — ye iska defining characteristic hai.' },
      { text: 'Computed property jo DB mein save nahi hoti — other fields se calculate hoti hai', correct: true, explanation: 'Bilkul! virtual(\'fullName\').get(() => this.firstName + \' \' + this.lastName). Database mein firstName aur lastName save hain — fullName on-the-fly compute hota hai.' },
      { text: 'Temporary field jo sirf test mein use hoti hai', correct: false, explanation: 'Virtuals production code mein regularly use hoti hain — computed properties ke liye.' },
      { text: 'Required field jo default value ke saath aati hai', correct: false, explanation: 'Default values @default() se set hoti hain — virtual alag concept hai.' },
    ],
  },
]

function MongooseLayersDiagram() {
  const items = [
    { label: 'Your Application Code', sublabel: 'Models, controllers, business logic · TypeScript types', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', border: 'rgba(255,107,53,0.3)', icon: '💻' },
    { label: 'Mongoose ODM', sublabel: 'Schema · Validation · Hooks (pre/post save) · Virtuals · Methods', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '🍃' },
    { label: 'MongoDB Node.js Driver', sublabel: 'Connection pool · BSON serialization · Raw operations', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '🔌' },
    { label: 'MongoDB', sublabel: 'Document storage · BSON format · Indexes · Replication', color: '#FF6B35', bg: 'rgba(255,107,53,0.08)', border: 'rgba(255,107,53,0.25)', icon: '🗄️' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Mongoose Architecture Layers</p>
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
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DBChapter9Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Mongoose ODM — MongoDB Ka TypeScript-Friendly Interface
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          MongoDB ki sabse badi weakness kya hai? Schema enforcement nahi hai. Ek developer ne (name: "Rahul") save kiya, doosre ne (naam: "Priya") — dono valid documents. Application code mein ab dono cases handle karo. Ye nightmare hai scale pe. Mongoose ye problem solve karta hai — application level pe schema enforce karta hai, save hone se pehle validate karta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein Mongoose ke production patterns seekhenge — TypeScript ke saath proper type definitions, pre-save hooks se automatic password hashing (bhoolne ka chance nahi), virtual fields (DB mein store nahi, compute hoga), populate vs $lookup trade-offs, aur lean() se 3-5x performance boost. Ye sab real apps mein daily use hone waale patterns hain.
        </p>
      </div>

      <MongooseLayersDiagram />

      <div id="mongoose-schema">
        <ConceptCard
          title="Schema Definition — MongoDB Ka Structure"
          emoji="🍃"
          difficulty="intermediate"
          whatIsIt="Mongoose Schema ek contract hai aapke application aur MongoDB ke beech. Bina schema ke MongoDB koi bhi document accept karta hai — invalid data, missing fields, wrong types, sab silently store ho jaata hai. Schema ke saath: save karne se pehle Mongoose validate karta hai — required fields missing? Error. Email format wrong? Error. Under the hood: Mongoose validation JavaScript level pe hoti hai before MongoDB write. select: false password ko default queries se completely hide karta hai — security feature. timestamps: true automatic createdAt/updatedAt fields add karta hai — manually set karne ki zaroorat nahi."
          whenToUse={[
            'MongoDB ke saath Node.js apps — Mongoose standard choice hai',
            'Schema validation MongoDB level pe chahiye',
            'Document lifecycle hooks — password hash, slug generate',
            'Computed properties — virtual fields',
          ]}
          whyUseIt="Sawaal: pre('save') hook mein arrow function use kiya — kya problem hai? Arrow function 'this' context bind nahi karta — this.isModified() undefined hoga, runtime error. Hamesha regular function use karo hooks mein. InferSchemaType magic feature hai — schema se TypeScript type auto-generate hoti hai, alag interface define nahi karna padta. DRY principle: schema change karo, types automatically update. mongoose.models.User || mongoose.model() pattern Next.js mein essential hai — hot reload pe model already define hota hai, OverwriteModelError prevent karta hai."
          howToUse={{
            filename: 'models/User.ts',
            language: 'typescript',
            code: `import mongoose, { Document, Model, Schema, InferSchemaType } from 'mongoose'
import bcrypt from 'bcrypt'

// ── TypeScript Interfaces ────────────────────────────────────────────

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
  getPublicProfile(): Pick<IUser, 'id' | 'name' | 'email' | 'role' | 'avatar'>
}

interface IUserStatics {
  findByEmail(email: string): Promise<(IUser & IUserMethods) | null>
}

type UserModel = Model<IUser, object, IUserMethods> & IUserStatics

// ── Schema Definition ────────────────────────────────────────────────

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,  // Default queries mein password nahi aayega — security!
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin', 'moderator'],
        message: '{VALUE} is not a valid role'
      },
      default: 'user',
    },
    avatar: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  {
    timestamps: true,           // createdAt, updatedAt automatic
    toJSON: { virtuals: true }, // JSON mein virtuals include karo
    toObject: { virtuals: true },
  }
)

// ── Indexes ──────────────────────────────────────────────────────────

userSchema.index({ role: 1, createdAt: -1 })     // Admin queries
userSchema.index({ isVerified: 1 })               // Unverified users query

// ── Type from Schema ─────────────────────────────────────────────────

type IUser = InferSchemaType<typeof userSchema>   // Auto-infer TypeScript type!

// ── Virtuals ─────────────────────────────────────────────────────────

userSchema.virtual('isLocked').get(function() {
  return this.lockedUntil ? this.lockedUntil > new Date() : false
})

// ── Pre Hooks ────────────────────────────────────────────────────────

userSchema.pre('save', async function(next) {
  // Sirf password modify hua ho toh hash karo
  if (!this.isModified('password')) return next()
  try {
    this.password = await bcrypt.hash(this.password, 12)
    next()
  } catch (err) {
    next(err as Error)
  }
})

// ── Instance Methods ─────────────────────────────────────────────────

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    avatar: this.avatar,
  }
}

// ── Static Methods ───────────────────────────────────────────────────

userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() })
}

// ── Export Model ─────────────────────────────────────────────────────

export const User = (
  mongoose.models.User as UserModel
) || mongoose.model<IUser, UserModel>('User', userSchema)`,
            explanation: "select: false critical security feature hai — GET /users API me password kabhi nahi aayega, bhool hi nahi sakte. Login ke liye .select('+password') explicitly override karo. isModified('password') check karo — agar user ka naam update hua toh password dobara hash nahi hona chahiye, sirf password change pe. next(err) se error propagate karo — Mongoose middleware error handling ke liye ye pattern hai. InferSchemaType = DRY ka perfect example — schema ek jagah, TypeScript types automatically milti hain.",
          }}
          realWorldScenario="Auth system ka full flow Mongoose ke saath: register request aata hai, User.create() call hoti hai, pre('save') hook automatically password hash karta hai — developer ne explicitly hash nahi kiya, hook ne kiya. Login: .select('+password') se password laao (warna null milega), comparePassword method se bcrypt compare. 5 failed attempts? incrementLoginAttempts method call, lockedUntil set. Next login attempt: isLocked virtual check karo — true hai toh error. Ye sab logic User model mein encapsulated hai — controller thin, model smart."
          commonMistakes={[
            {
              mistake: 'Arrow function pre hooks mein use karna',
              why: "Arrow functions 'this' context bind nahi karte — this.isModified() undefined hoga. Pre-save hook mein 'this' document hai.",
              fix: "Hamesha regular function use karo hooks mein: userSchema.pre('save', function(next) { ... }). Arrow functions kabhi nahi hooks mein.",
            },
            {
              mistake: 'mongoose.model() every request call karna',
              why: 'Next.js / hot reload mein model already defined hota hai — OverwriteModelError throw hota hai.',
              fix: 'mongoose.models.User || mongoose.model(\'User\', schema) pattern use karo — existing model check karo pehle.',
            },
          ]}
          proTip="Mongoose discriminators se polymorphism implement karo — UserSchema base hai, AdminSchema aur ModeratorSchema extend karte hain. MongoDB mein ek hi 'users' collection, __t field type track karta hai. User.find() — sab milenge. Admin.find() — sirf admins. Shared queries parent model pe, type-specific queries child models pe. Ye pattern ek collection mein multiple entity types store karne ka clean tarika hai."
        />
      </div>

      <div id="mongoose-methods">
        <ConceptCard
          title="Instance Methods & Statics — Business Logic Encapsulation"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="Instance methods aur statics ek design principle follow karte hain: business logic model mein rahni chahiye, controller mein nahi. Instance method: this = document — ek specific user ke context mein kaam karo. comparePassword, generateAuthToken, incrementLoginAttempts — ye sab specific user ke liye operations hain. Static method: this = Model — collection level operations. findByEmail, getActivityStats — ye puri collection pe operate karte hain. Under the hood: Mongoose ye methods prototype pe add karta hai — har document instance ko ye methods automatically milte hain."
          whenToUse={[
            'Password comparison — instance method',
            'JWT token generate karna — instance method',
            'Email se user dhundna — static method',
            'Complex queries jo bar bar repeat hoti hain — static method',
          ]}
          whyUseIt="Controller mein seedha bcrypt.compare() likhna ek baar theek lagta hai. Phir doosri jagah chahiye — duplicate. Phir password reset flow mein chahiye — third copy. Ek change karo toh teeno jagah update karo. Bugs guaranteed. user.comparePassword() ek jagah logic, sab jagah reuse — DRY principle. findByCredentials static mein sab auth logic — controller sirf call karta hai. Testing: User model ko independently unit test karo — HTTP request simulate karne ki zaroorat nahi. Thin controller, fat model — maintainable architecture."
          howToUse={{
            filename: 'models/methods-example.ts',
            language: 'typescript',
            code: `import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// ── Instance Methods ─────────────────────────────────────────────────

// JWT token generate karo
userSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
}

// Password reset token generate karo
userSchema.methods.generatePasswordResetToken = function(): string {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000)  // 10 min

  return resetToken  // Unhashed token user ko bhejo — hashed DB mein
}

// Account lock karo
userSchema.methods.incrementLoginAttempts = async function(): Promise<void> {
  const MAX_ATTEMPTS = 5
  const LOCK_TIME = 2 * 60 * 60 * 1000  // 2 hours

  this.loginAttempts += 1

  if (this.loginAttempts >= MAX_ATTEMPTS) {
    this.lockedUntil = new Date(Date.now() + LOCK_TIME)
  }

  await this.save()
}

// Reset attempts on successful login
userSchema.methods.resetLoginAttempts = async function(): Promise<void> {
  this.loginAttempts = 0
  this.lockedUntil = undefined
  await this.save()
}

// ── Static Methods ───────────────────────────────────────────────────

// Email se user find karo (with password — auth ke liye)
userSchema.statics.findByCredentials = async function(
  email: string,
  password: string
) {
  // Password explicitly select karo (select: false override)
  const user = await this.findOne({ email }).select('+password')
  if (!user) throw new Error('Invalid credentials')

  if (user.isLocked) throw new Error('Account locked. Try again later.')

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    await user.incrementLoginAttempts()
    throw new Error('Invalid credentials')
  }

  await user.resetLoginAttempts()
  return user
}

// Active users stats
userSchema.statics.getActivityStats = async function() {
  return this.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        verified: { $sum: { $cond: ['$isVerified', 1, 0] } }
      }
    }
  ])
}

// ── Usage in Controller ──────────────────────────────────────────────

// Thin controller — business logic model mein hai
export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const user = await User.findByCredentials(email, password)
  const token = user.generateAuthToken()
  res.json({ token, user: user.getPublicProfile() })
}`,
            explanation: "findByCredentials: email se user fetch, isLocked check, password verify, loginAttempts reset — sab logic ek jagah. Controller mein sirf: const user = await User.findByCredentials(email, password). Clean. generateAuthToken: user.generateAuthToken() — this ke through user ki ID, email, role automatically available. Token generation encapsulated. Separation of concerns: controller routing ke liye, model business rules ke liye. Test karo model independently — jest se User.findByCredentials mock karo bina HTTP server ke.",
          }}
          realWorldScenario="E-commerce Product model real example: Product.findLowStock() static — inventory dashboard ke liye, restock alerts. product.calculateDiscount(coupon) instance method — pricing logic ek jagah. Product.getTopSelling(limit) static — homepage aur admin ke liye same method. Controller mein? Sirf: const products = await Product.findLowStock(). Kisi new developer ne code dekha — instantly samjha. Testing: Product.findLowStock() ko mock karo, controller test fast chalega bina DB ke."
          commonMistakes={[
            {
              mistake: 'Methods mein async operations await nahi karna',
              why: 'Mongoose methods async ho sakte hain — await missing = unhandled promise, save incomplete.',
              fix: 'Methods async declare karo. Caller bhi await kare: await user.incrementLoginAttempts(). Error handling proper karo.',
            },
            {
              mistake: 'Controller mein direct DB operations aur model mein bhi',
              why: 'Logic scattered — controller mein kuch, model mein kuch. Maintenance nightmare, duplicate code.',
              fix: 'Strict rule: DB queries sirf model mein (statics/methods). Controller sirf model call kare aur response send kare.',
            },
          ]}
          proTip="Query helpers ek underused feature hai — reusable query conditions banao: userSchema.query.active = function() { return this.where({ isVerified: true, lockedUntil: null }) }. Aur phir: User.find().active().sort({ createdAt: -1 }).lean(). Readable, chainable, DRY. Har jagah { isVerified: true, lockedUntil: null } copy-paste karne ki zaroorat nahi — .active() likhdo. Condition change karni ho? Ek jagah update."
        />
      </div>

      <div id="mongoose-virtuals-hooks">
        <ConceptCard
          title="Virtuals — Computed Fields & populate"
          emoji="✨"
          difficulty="intermediate"
          whatIsIt="Virtual field ek computed property hai — MongoDB mein save nahi hoti, har access pe calculate hoti hai. firstName aur lastName store karo, fullName virtual se compute karo — DB storage zero extra, consistency guaranteed. Under the hood: getter function hai jo this (document) ke properties use karta hai. populate() application-level join hai — ObjectId ko actual document se replace karta hai. Pehle post fetch karo (1 query), phir Mongoose authorId ke corresponding User fetch karta hai (1 query) — dono queries Mongoose automatically fire karta hai. $lookup database-level single query mein karta hai — large scale pe zyada efficient ho sakta hai."
          whenToUse={[
            'Computed properties — fullName, age, isExpired',
            'Formatted data — formattedDate, displayPrice',
            'Referenced documents fetch karna — post.author, comment.user',
            'URL generation — avatar URL, profile link',
          ]}
          whyUseIt="Sawaal: lean() use kiya, lekin virtual 'fullName' undefined aa raha hai — kyun? lean() plain JavaScript object return karta hai, Mongoose Document nahi — virtuals accessible nahi hote. Rule: lean() sirf read-only API responses ke liye jahan methods aur virtuals chahiye nahi. Auth, save, methods call karne ke liye lean mat use karo. toJSON: { virtuals: true } zaroori hai — warna res.json() mein virtuals appear nahi honge, lekin document.fullName direct access pe milega. Dono option lagao: toJSON aur toObject."
          howToUse={{
            filename: 'models/virtuals-populate.ts',
            language: 'typescript',
            code: `// ── Virtuals ─────────────────────────────────────────────────────────

const profileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date },
  avatarKey: { type: String },  // S3 key
}, {
  toJSON: { virtuals: true },    // JSON response mein virtuals include karo
  toObject: { virtuals: true },
})

// Computed virtual — getter
profileSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`
})

// Age compute karo from birthDate
profileSchema.virtual('age').get(function() {
  if (!this.birthDate) return null
  const today = new Date()
  const birth = new Date(this.birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
})

// Avatar URL — S3 key se full URL
profileSchema.virtual('avatarUrl').get(function() {
  if (!this.avatarKey) return null
  return \`https://cdn.example.com/KEY\`
})

// ── populate — Referenced Documents ──────────────────────────────────

const postSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // populate ke liye model name
    required: true,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

// Basic populate
const post = await Post.findById(postId)
  .populate('authorId', 'name email avatar')  // Sirf ye fields
  .populate('tags', 'name slug')

// Access karo:
// post.authorId.name — authorId ab User document hai!

// Nested populate — comments ke andar user bhi
const postWithComments = await Post.findById(postId)
  .populate({
    path: 'comments',
    populate: {
      path: 'authorId',
      select: 'name avatar'
    },
    options: { limit: 50, sort: { createdAt: 1 } }
  })

// Conditional populate — agar published post hai toh author bhi chahiye
const posts = await Post.find({ published: true })
  .select('title slug createdAt authorId')
  .populate('authorId', 'name avatar')
  .lean()   // Plain JS objects — methods/virtuals nahi
  .limit(20)

// ── lean() — Performance Optimization ───────────────────────────────

// Without lean — Mongoose documents (heavy)
const heavyDocs = await User.find({ role: 'user' })
// Each doc has: save(), validate(), schema methods, tracking state...

// With lean — plain JS objects (light)
const lightDocs = await User.find({ role: 'user' }).lean()
// Plain POJO — no Mongoose overhead
// 3-5x faster, significantly less memory
// Methods/virtuals NOT available — read-only operations ke liye

// API responses ke liye lean perfect:
const apiResponse = await Post.find({ published: true })
  .populate('authorId', 'name avatar')
  .select('title slug excerpt createdAt')
  .sort({ createdAt: -1 })
  .limit(20)
  .lean()  // Fast, safe for JSON serialization

return res.json({ posts: apiResponse })`,
            explanation: "toJSON: { virtuals: true } aur toObject: { virtuals: true } dono lagao — pehla res.json() ke liye, doosra direct property access ke liye. lean() ke saath populate karo toh populated documents bhi plain objects hain — methods nahi milenge. API response ke liye lean perfect hai: plain POJO, JSON serialization fast, no Mongoose overhead. Business logic ke liye lean avoid karo. populate mein select karo — 'name email avatar' — puri User document mat fetch karo, sirf jo chahiye.",
          }}
          realWorldScenario="Blog API GET /posts: Post.find({ published: true }).populate('authorId', 'name avatar').lean().limit(20) — yahi production-ready code hai. lean() se 3-5x faster response, no Mongoose overhead. populate se author details milti hain, select se sirf name aur avatar (poora User document nahi). Virtual 'readTime': content.split(' ').length / 200 — average reading speed se minutes calculate karo, DB mein store nahi karna, har content change pe automatically correct."
          commonMistakes={[
            {
              mistake: 'Deep nested populate without limits',
              why: 'Post populate karo, author populate karo, author ke posts populate karo — exponential queries. N+1 ka Mongoose version.',
              fix: 'Sirf zaroori level populate karo. Alternatives: MongoDB aggregation $lookup se zyada control. Separate API calls for deep nesting.',
            },
            {
              mistake: 'lean() use karna aur phir methods call karna',
              why: 'lean() plain JS object return karta hai — Mongoose methods available nahi hote. user.comparePassword() Error: not a function.',
              fix: 'lean() sirf jab methods/virtuals zaroorat nahi — pure read operations. Auth, modify operations ke liye lean mat use karo.',
            },
          ]}
          proTip="Virtual getter ke saath setter bhi define karo — user.fullName = 'Rahul Sharma' set karo, automatically firstName aur lastName update ho jaate hain. DX (developer experience) excellent hoti hai — caller ko firstName/lastName alag-alag set karne ki zaroorat nahi. API: ek field accept karo, DB mein properly split hokar store. Ye pattern external APIs ke saath bhi useful hai jab incoming data format alag ho."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 9 Quiz — Mongoose ODM
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — Mongoose master karo!
          </p>
        </div>
        <QuizSection questions={quiz} chapterSlug="db-mongoose-odm" />
      </div>
    </div>
  )
}
