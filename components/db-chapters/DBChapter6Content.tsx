'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'MongoDB mein $match stage kya karta hai aggregation pipeline mein?',
    options: [
      { text: 'Documents ko join karta hai doosri collection se', correct: false, explanation: 'Join ke liye $lookup stage hai.' },
      { text: 'Documents filter karta hai — SQL ka WHERE jaise', correct: true, explanation: 'Sahi! $match pipeline mein pehle aana chahiye — documents early filter karo taaki baaki stages pe less data process ho.' },
      { text: 'Documents group karta hai fields ke hisaab se', correct: false, explanation: 'Grouping ke liye $group stage hai.' },
      { text: 'Documents sort karta hai', correct: false, explanation: 'Sorting ke liye $sort stage hai.' },
    ],
  },
  {
    question: 'MongoDB mein embedding vs referencing — kab embed karo?',
    options: [
      { text: 'Hamesha embed karo — faster hai', correct: false, explanation: 'Documents 16MB limit se bound hain — hamesha embed karna wrong hai.' },
      { text: 'Jab data hamesha saath access hota ho, one-to-few relationship ho, aur child data independently query nahi hota', correct: true, explanation: 'Sahi! User profile mein address embed karo (saath access), lekin orders ko reference karo (independent queries, many-to-many).' },
      { text: 'Sirf small data ke liye embed karo', correct: false, explanation: 'Size ek factor hai lekin access pattern zyada important hai.' },
      { text: 'Jab data update frequently ho', correct: false, explanation: 'Frequently updating data reference karo — ek jagah update karo sab jagah reflect.' },
    ],
  },
  {
    question: '$lookup stage kya karta hai?',
    options: [
      { text: 'Index create karta hai', correct: false, explanation: 'Index createIndex() se banta hai.' },
      { text: 'Doosri collection se documents join karta hai — SQL ka LEFT JOIN jaisa', correct: true, explanation: 'Sahi! $lookup from: "otherCollection" mein documents join karta hai. MongoDB 3.6+ mein complex conditions support karta hai.' },
      { text: 'Documents search karta hai text ke liye', correct: false, explanation: 'Text search ke liye $text operator ya Atlas Search hai.' },
      { text: 'Field values transform karta hai', correct: false, explanation: 'Transform ke liye $project ya $addFields stage hai.' },
    ],
  },
  {
    question: 'MongoDB mein findOne() aur find().limit(1) mein kya fark hai?',
    options: [
      { text: 'findOne() faster hai — first match milte hi stop', correct: true, explanation: 'Sahi! findOne() optimized hai — pehla matching document milne pe immediately return karta hai. find().limit(1) cursor return karta hai, iterate karna padta hai.' },
      { text: 'Koi fark nahi — same results', correct: false, explanation: 'findOne() single document (ya null) return karta hai directly. find() cursor return karta hai.' },
      { text: 'find().limit(1) faster hai', correct: false, explanation: 'findOne() first match pe stop karta hai — zyada efficient.' },
      { text: 'findOne() always first document return karta hai', correct: false, explanation: 'findOne() first matching document return karta hai — insertion order nahi, query filter pe based.' },
    ],
  },
  {
    question: 'MongoDB text index kab use karte hain?',
    options: [
      { text: 'Jab exact string match chahiye', correct: false, explanation: 'Exact match ke liye regular equality query ya index sufficient hai.' },
      { text: 'Jab full-text search chahiye — words across fields search karna ho', correct: true, explanation: 'Sahi! Text index word stemming, stop words, relevance scoring support karta hai — blog search, product search ke liye.' },
      { text: 'Sirf email fields ke liye', correct: false, explanation: 'Text index kisi bhi string field pe lagta hai.' },
      { text: 'Hamesha text index best choice hai', correct: false, explanation: 'Text index heavy hai — sirf full-text search use case ke liye.' },
    ],
  },
]

export default function DBChapter6Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          MongoDB Queries & Aggregation Pipeline
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          MongoDB NoSQL database hai jahan data JSON documents mein store hota hai. Powerful query operators, aggregation pipeline, aur flexible schema design — ye MongoDB ke main strengths hain.
        </p>
      </div>

      <div id="find-operators">
        <ConceptCard
          title="find() — Documents Dhundho"
          emoji="🔍"
          difficulty="beginner"
          whatIsIt="find() MongoDB ka primary query method hai — filter object pass karo, matching documents milte hain. SQL ka SELECT ... WHERE ki tarah."
          whenToUse={[
            'Multiple matching documents fetch karne ke liye',
            'Filtered, sorted, projected results ke liye',
          ]}
          whyUseIt="find() flexible query operators support karta hai — $gt, $lt, $in, $regex — complex conditions express kar sakte ho ek query mein."
          howToUse={{
            code: `const db = mongoose.connection.db  // ya native driver

// Basic find — saare documents
const users = await db.collection('users').find({}).toArray()

// Equality filter
const active = await db.collection('users').find({ status: 'active' }).toArray()

// Comparison operators
const adults = await db.collection('users').find({
  age: { $gte: 18, $lte: 65 }
}).toArray()

// $in operator
const premiumUsers = await db.collection('users').find({
  plan: { $in: ['pro', 'enterprise'] }
}).toArray()

// Nested field — dot notation
const indiaUsers = await db.collection('users').find({
  'address.country': 'India'
}).toArray()

// $or / $and
const filteredUsers = await db.collection('users').find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 65 } }
  ]
}).toArray()

// Projection — sirf kuch fields (1=include, 0=exclude)
const names = await db.collection('users')
  .find({ status: 'active' })
  .project({ name: 1, email: 1, _id: 0 })
  .sort({ name: 1 })
  .skip(20)
  .limit(10)
  .toArray()

// findOne — single document
const user = await db.collection('users').findOne({ email: 'test@example.com' })`,
            language: 'javascript',
            explanation: 'find() cursor return karta hai — toArray() se array milta hai. $gte/$lte comparison operators. Dot notation nested fields ke liye. Project se bandwidth save hoti hai.',
            filename: 'find-queries.js',
          }}
          realWorldScenario="User search API: name/email/city se filter, pagination (skip/limit), sirf required fields project karo — fast aur bandwidth efficient query."
          commonMistakes={[
            { mistake: '.toArray() bhool jaana', why: 'find() cursor return karta hai — array nahi. Cursor iterate karna padta hai', fix: 'await collection.find({}).toArray() ya for await (const doc of cursor) {}' },
          ]}
          proTip="$regex use karne se pehle index check karo — bina index ke regex queries bahut slow hoti hain. Full-text search ke liye text index zyada efficient hai."
        />
      </div>

      <div id="update-operators">
        <ConceptCard
          title="Update Operators — Data Update Karo"
          emoji="✏️"
          difficulty="intermediate"
          whatIsIt="MongoDB update operators se existing documents modify kar sakte ho — $set, $push, $pull, $inc, $addToSet. Pura document replace nahi karna padta."
          whenToUse={[
            'Specific fields update karne ke liye',
            'Arrays mein elements add/remove karne ke liye',
            'Counter increment/decrement ke liye',
          ]}
          whyUseIt="$set se sirf required fields update hote hain — pura document fetch + modify + save karne ki zaroorat nahi. Atomic operations hain."
          howToUse={{
            code: `// $set — fields update karo
await db.collection('users').updateOne(
  { _id: userId },
  { $set: { name: 'Rahul Kumar', updatedAt: new Date() } }
)

// $inc — counter increment
await db.collection('products').updateOne(
  { _id: productId },
  { $inc: { views: 1, stock: -1 } }  // views + 1, stock - 1
)

// $push — array mein element add karo
await db.collection('users').updateOne(
  { _id: userId },
  {
    $push: {
      orders: {
        $each: [newOrder1, newOrder2],  // multiple push
        $slice: -10,  // sirf last 10 orders rakhna
      }
    }
  }
)

// $addToSet — duplicate add nahi hoga
await db.collection('users').updateOne(
  { _id: userId },
  { $addToSet: { tags: 'premium' } }
)

// $pull — array se remove karo
await db.collection('users').updateOne(
  { _id: userId },
  { $pull: { blockedUsers: targetUserId } }
)

// $unset — field delete karo
await db.collection('users').updateOne(
  { _id: userId },
  { $unset: { temporaryToken: '' } }
)

// updateMany — multiple documents
await db.collection('users').updateMany(
  { plan: 'free', createdAt: { $lt: cutoffDate } },
  { $set: { status: 'inactive' } }
)

// findOneAndUpdate — update + return updated doc
const updated = await db.collection('users').findOneAndUpdate(
  { _id: userId },
  { $set: { lastLogin: new Date() } },
  { returnDocument: 'after' }  // updated document return karo
)`,
            language: 'javascript',
            explanation: '$set fields update karta hai. $inc atomic counter. $push/$pull array modify. $addToSet duplicate prevent. findOneAndUpdate atomically update + return — race conditions avoid karta hai.',
            filename: 'update-operators.js',
          }}
          realWorldScenario="Shopping cart: $push product add karo, $pull product remove karo, $inc quantity update karo — sab atomic operations without fetching full document first."
          commonMistakes={[
            { mistake: 'updateOne bina operator ke — pura document replace ho jaata hai', why: '{ $set: {...} } ki jagah { field: value } likhne se _id ke sirf woh fields bachte hain', fix: 'Hamesha $set/$push etc. operators use karo unless pura document replace karna ho' },
          ]}
          proTip="bulkWrite() se multiple operations ek network round-trip mein — insertOne, updateOne, deleteOne sab batch mein. Large updates ke liye performance significantly better."
        />
      </div>

      <div id="aggregation-pipeline">
        <ConceptCard
          title="Aggregation Pipeline — Stages Mein Data Process"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Aggregation pipeline documents ek stage se doosre stage mein pass karta hai — each stage transforms the data. $match → $group → $project → $sort — like a Unix pipe."
          whenToUse={[
            'Complex analytics aur reporting',
            'Data transformation aur reshaping',
            'Multi-collection joins ($lookup)',
            'Statistical calculations',
          ]}
          whyUseIt="Application code mein aggregate karne se zyada efficient — MongoDB engine optimized operations karta hai. Large datasets pe server-side processing."
          howToUse={{
            code: `// Sales analytics pipeline
const result = await db.collection('orders').aggregate([
  // Stage 1: Filter — sirf delivered orders
  { $match: { status: 'delivered', createdAt: { $gte: new Date('2024-01-01') } } },

  // Stage 2: Group by month + user
  { $group: {
    _id: {
      month: { $month: '$createdAt' },
      userId: '$userId'
    },
    totalSpent: { $sum: '$amount' },
    orderCount: { $sum: 1 },
    avgOrder: { $avg: '$amount' }
  }},

  // Stage 3: Join user details
  { $lookup: {
    from: 'users',
    localField: '_id.userId',
    foreignField: '_id',
    as: 'user',
    pipeline: [{ $project: { name: 1, email: 1 } }]  // only these fields
  }},

  // Stage 4: Flatten user array
  { $unwind: '$user' },

  // Stage 5: Reshape output
  { $project: {
    _id: 0,
    month: '$_id.month',
    userName: '$user.name',
    totalSpent: 1,
    orderCount: 1,
    avgOrder: { $round: ['$avgOrder', 2] }
  }},

  // Stage 6: Sort by spend
  { $sort: { totalSpent: -1 } },

  // Stage 7: Limit
  { $limit: 20 }
]).toArray()`,
            language: 'javascript',
            explanation: 'Pipeline stages left to right process. $match early karo — less data later stages pe. $lookup collections join karta hai. $unwind array ko separate documents mein. $project output shape define karta hai.',
            filename: 'aggregation.js',
          }}
          realWorldScenario="Dashboard analytics: monthly top customers, product performance — complex reporting ek aggregation pipeline mein. Application code mein koi loops nahi."
          commonMistakes={[
            { mistake: '$match stage late rakhna', why: 'Saare documents unneeded stages process karte hain — slow', fix: '$match hamesha pipeline mein pehle rakhna — early filtering zyada better hai' },
          ]}
          proTip="$facet stage se multiple aggregation results ek query mein — { totalCount: [{$count: 'n'}], data: [{$skip: 0}, {$limit: 10}] }. Pagination + count ek request mein."
        />
      </div>

      <div id="schema-design">
        <ConceptCard
          title="Schema Design — Embed vs Reference"
          emoji="🗂️"
          difficulty="intermediate"
          whatIsIt="MongoDB mein related data embed (ek document mein) ya reference (alag collection + _id) karo. Sahi choice access pattern pe depend karta hai."
          whenToUse={[
            'Embed: one-to-few, data saath access hota ho, child independent nahi',
            'Reference: one-to-many, data independently query hota ho, large child data',
          ]}
          whyUseIt="Embed se joins nahi karne padte — faster reads. Reference se data independently update hota hai — consistency better."
          howToUse={{
            code: `// EMBED — User ke saath address (saath hi access hota hai)
{
  _id: ObjectId("..."),
  name: "Rahul",
  email: "rahul@example.com",
  addresses: [            // embedded array — small, accessed with user
    { type: "home", street: "123 MG Road", city: "Bangalore" },
    { type: "work", street: "456 IT Park", city: "Bangalore" }
  ],
  preferences: {          // embedded object — always with user
    theme: "dark",
    language: "en",
    notifications: true
  }
}

// REFERENCE — Orders separately (many, independent queries)
// users collection
{ _id: ObjectId("u1"), name: "Rahul" }

// orders collection
{ _id: ObjectId("o1"), userId: ObjectId("u1"), amount: 1999 }
{ _id: ObjectId("o2"), userId: ObjectId("u1"), amount: 3499 }

// Populate with Mongoose
const user = await User.findById(userId).populate('orders')
// ya aggregation $lookup use karo

// HYBRID — Post with author ref + comments embedded
{
  _id: ObjectId("p1"),
  title: "Node.js Tips",
  authorId: ObjectId("u1"),   // reference — author independently exists
  comments: [                  // embedded — few, always with post
    { userId: ObjectId("u2"), text: "Great post!", date: new Date() }
  ],
  tags: ["nodejs", "javascript"]  // embedded primitive array
}`,
            language: 'javascript',
            explanation: 'Addresses embed kiye — saath hi access hote hain. Orders reference kiye — independently query hote hain, many per user. Hybrid: author reference, comments embed.',
            filename: 'schema-design.js',
          }}
          realWorldScenario="Blog application: posts mein author reference rakho (author data changes), comments embed karo agar few per post (saath read hote hain), tags embed karo (simple strings)."
          commonMistakes={[
            { mistake: 'Hamesha embed karna — unbounded arrays', why: 'Ek user ke hazaar orders embed karo — document 16MB limit hit karta hai, performance slow', fix: 'Many-side of one-to-many hamesha reference karo — orders, comments, messages' },
          ]}
          proTip={'Access pattern ek hi rule hai: "Data jo ek saath access hota hai, ek saath store karo." Ye MongoDB schema design ka golden rule hai.'}
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="mongodb-queries" />
    </div>
  )
}
