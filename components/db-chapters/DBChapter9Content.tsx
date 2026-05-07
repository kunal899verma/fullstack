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
          Mongoose MongoDB ke liye most popular ODM (Object-Document Mapper) hai Node.js mein. Schema validation, model methods, lifecycle hooks (pre/post), virtual properties, aur populate — ye sab raw MongoDB driver se bahut zyada powerful abstraction deta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein Mongoose ke advanced features explore karenge — TypeScript ke saath proper type definitions, pre-save hooks se password hashing, virtual fields, populate optimizations, aur lean() performance technique. Real production patterns jo daily use hote hain.
        </p>
      </div>

      <div id="mongoose-schema">
        <ConceptCard
          title="Schema Definition — MongoDB Ka Structure"
          emoji="🍃"
          difficulty="intermediate"
          whatIsIt="Mongoose Schema MongoDB documents ka structure define karta hai — field types, validators, defaults, aur behavior. String, Number, Boolean, Date, ObjectId, Array, Mixed — ye built-in types hain. required, min/max, minlength/maxlength, enum, match, unique — validation options. Schema TypeScript interface ke saath combine karo type-safety ke liye."
          whenToUse={[
            'MongoDB ke saath Node.js apps — Mongoose standard choice hai',
            'Schema validation MongoDB level pe chahiye',
            'Document lifecycle hooks — password hash, slug generate',
            'Computed properties — virtual fields',
          ]}
          whyUseIt="Raw MongoDB driver koi schema enforcement nahi karta — invalid documents save ho sakte hain. Mongoose schema validation application level pe enforce karta hai, before save. TypeScript + Mongoose = type-safe MongoDB access. timestamps: true se createdAt/updatedAt automatic hoti hain — manually set karne ki zaroorat nahi."
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
            explanation: "select: false password ko default queries se hide karta hai — explicit .select('+password') se override karo jab chahiye. InferSchemaType se schema se TypeScript type auto-generate hoti hai — DRY. isModified('password') check karo — sirf tab hash karo jab actual change ho, har update pe nahi. next() error ke saath call karo to propagate errors.",
          }}
          realWorldScenario="Auth system mein User model: register karo toh pre-save password hash. Login karo toh .select('+password') se password laao, comparePassword se verify karo. Failed login mein loginAttempts increment, threshold pe account lock (lockedUntil set). isLocked virtual se current lock status check karo."
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
          proTip="Mongoose discriminators se inheritance implement karo — base schema extend karo different document types ke liye. UserSchema base hai, AdminSchema aur ModeratorSchema discriminators hain. Ek collection mein multiple types — __t field se type track hota hai. Shared queries parent model pe chalaao."
        />
      </div>

      <div id="mongoose-methods">
        <ConceptCard
          title="Instance Methods & Statics — Business Logic Encapsulation"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="Instance methods document (single record) pe kaam karte hain — this document hai. Static methods model (collection) pe kaam karte hain — this Model hai. Methods mein business logic encapsulate karo — controller mein nahi. Instance: comparePassword, generateToken, getPublicProfile. Statics: findByEmail, findActiveUsers, getStats."
          whenToUse={[
            'Password comparison — instance method',
            'JWT token generate karna — instance method',
            'Email se user dhundna — static method',
            'Complex queries jo bar bar repeat hoti hain — static method',
          ]}
          whyUseIt="Methods se business logic model mein rahti hai — DRY principle. Controller thin rehta hai. Testing easy hoti hai — model unit test karo independently. Method signature clearly communicates intent — user.comparePassword() zyada readable hai than authUtils.comparePassword(user, password). Reuse across controllers."
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
            explanation: "Instance methods this = document — specific record pe operate. Statics this = Model — collection pe operate. findByCredentials static mein sab auth logic encapsulated — controller sirf call karta hai. generateAuthToken instance method — user.generateAuthToken(). Separation of concerns clear hai.",
          }}
          realWorldScenario="E-commerce app mein Product model: static findLowStock() — inventory management ke liye. instance method calculateDiscount() — pricing logic. static getTopSelling(limit) — dashboard ke liye. Controller sirf model methods call karta hai — business logic model mein, controller routing mein. Testability excellent hai."
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
          proTip="Mongoose mein query helpers define karo reusable query chains ke liye: userSchema.query.active = function() { return this.where({ isVerified: true, lockedUntil: null }) }. Usage: User.find().active().sort({ createdAt: -1 }) — readable chainable queries. DRY query logic."
        />
      </div>

      <div id="mongoose-virtuals-hooks">
        <ConceptCard
          title="Virtuals — Computed Fields & populate"
          emoji="✨"
          difficulty="intermediate"
          whatIsIt="Virtual fields MongoDB mein store nahi hoti — on-the-fly compute hoti hain. firstName + lastName = fullName. age compute from birthDate. Virtuals toJSON/toObject configuration se JSON responses mein include hoti hain. populate() ObjectId references ko actual documents se replace karta hai — multiple queries automatically handle hoti hain (application-level join)."
          whenToUse={[
            'Computed properties — fullName, age, isExpired',
            'Formatted data — formattedDate, displayPrice',
            'Referenced documents fetch karna — post.author, comment.user',
            'URL generation — avatar URL, profile link',
          ]}
          whyUseIt="Virtuals DB storage bachate hain — compute karo query time par. Data always consistent — firstName change karo, fullName automatically update. populate() manual $lookup se simple — Mongoose handle karta hai. select option se sirf needed fields populate karo — bandwidth optimize."
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
            explanation: "toJSON: { virtuals: true } ensure karta hai JSON.stringify (res.json) mein virtuals include hon. lean() se populate karo toh populated documents bhi plain objects hain. lean() ke saath virtuals nahi milte — agar computed fields chahiye toh lean mat use karo. select() se bandwidth optimize karo populate mein bhi.",
          }}
          realWorldScenario="Blog API: GET /posts mein Post.find().populate('author', 'name avatar').lean() — fast API response. Author ke name/avatar se full user object nahi chahiye — select se limit karo. Virtual 'readTime' calculate karo content.length se — DB storage waste nahi. Average read time dikhao bina storing kiye."
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
          proTip="Mongoose mein virtuals set karo bhi (getter + setter): schema.virtual('fullName').get(fn).set(function(name) { const [f, l] = name.split(' '); this.firstName = f; this.lastName = l; }). Virtual assignment se underlying fields update hoti hain — convenient API for callers jo fullName set karna chahte hain."
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
