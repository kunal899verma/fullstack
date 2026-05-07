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
          MongoDB choose karna — ye decision soch ke karo. MongoDB genuinely powerful hai specific use cases mein: flexible schema, high write throughput, document-oriented data. Lekin ye SQL replace nahi karta — ye complementary tool hai. MongoDB ka aggregation pipeline ek Unix pipe ki tarah hai — documents ek stage se doosri stage mein pass hote hain, har stage transform karta hai. Ye samajhna zaroori hai kyunki yahi MongoDB ka analytics ka answer hai SQL ke GROUP BY ko.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Aur schema design — MongoDB mein embed vs reference ka decision ek baar wrong ho gayi toh refactor karna bahut expensive hai. Is chapter mein sahi patterns seekhenge, aur ye bhi samjhenge ki MongoDB ka $lookup (JOIN equivalent) kyun SQL JOIN se expensive hai.
        </p>
      </div>

      <div id="find-operators">
        <ConceptCard
          title="find() — Documents Dhundho"
          emoji="🔍"
          difficulty="beginner"
          whatIsIt="find() MongoDB ka primary query method hai — filter object pass karo, matching documents milte hain. SQL ke SELECT ... WHERE jaisa. Lekin under the hood difference hai: MongoDB BSON (binary JSON) format mein data store karta hai, query engine document fields pe operate karta hai. Index nahi hai toh collection scan — SQL ke Seq Scan jaisa, slow. findOne() first match pe stop karta hai, find() cursor return karta hai. Projection se sirf zaroori fields fetch karo — bandwidth save karo."
          whenToUse={[
            'Multiple matching documents fetch karne ke liye',
            'Filtered, sorted, projected results ke liye',
          ]}
          whyUseIt="find() ke operators SQL ki WHERE ki tarah hain lekin JSON syntax mein — $gt, $lt, $gte, $lte, $in, $nin, $regex, $or, $and. Complex conditions express karo ek query object mein. Dot notation se nested fields query karo — 'address.city': 'Mumbai'. Ye flexibility MongoDB ki strength hai — deeply nested documents directly query ho sakte hain bina JOIN ke. Lekin $regex use karne se pehle index check karo — bina index regex = collection scan."
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
            explanation: 'find() cursor return karta hai — toArray() se array, for await se streaming. $gte/$lte comparison. Dot notation nested fields ke liye — MongoDB ka ek USP. Projection: 1 = include, 0 = exclude, _id default include hoti hai — explicitly 0 karo agar nahi chahiye. sort/skip/limit cursor pe chain karo — method chaining pattern.',
            filename: 'find-queries.js',
          }}
          realWorldScenario="Admin panel user search: name/email/city se filter karo, pagination ke saath (skip/limit), sirf required fields project karo — _id, name, email, city. Index email aur city pe lagao. Ye ek typical MongoDB API query hai jo fast rahegi indexed fields pe. Unindexed filter fields collection scan karenge — ye performance trap hai jo production mein tabhi dikhta hai jab collection 100k+ documents ho jaata hai."
          commonMistakes={[
            { mistake: '.toArray() bhool jaana', why: 'find() cursor return karta hai — array nahi. Cursor iterate karna padta hai', fix: 'await collection.find({}).toArray() ya for await (const doc of cursor) {}' },
          ]}
          proTip="$regex production mein kabhi bina index ke mat use karo — { name: { $regex: 'rahul', $options: 'i' } } bina index = collection scan. Text search ke liye text index create karo: db.users.createIndex({ name: 'text', bio: 'text' }), phir { $text: { $search: 'rahul' } } — stemming, scoring, multi-field search sab free mein. Large scale ke liye Atlas Search (Elasticsearch-backed) better hai."
        />
      </div>

      <div id="update-operators">
        <ConceptCard
          title="Update Operators — Data Update Karo"
          emoji="✏️"
          difficulty="intermediate"
          whatIsIt="MongoDB update operators — atomic document modifications. $set sirf specified fields update karta hai. $inc atomic counter — concurrency safe. $push array mein element add karta hai. $pull array se remove karta hai. $addToSet duplicate prevent karta hai. Ye sab atomic operations hain — database level pe safe, no race conditions. Pura document fetch + modify + save karne ki zaroorat nahi — engine directly targeted update karta hai."
          whenToUse={[
            'Specific fields update karne ke liye',
            'Arrays mein elements add/remove karne ke liye',
            'Counter increment/decrement ke liye',
          ]}
          whyUseIt="Naive approach: document fetch karo, JavaScript mein modify karo, save karo — teen network round-trips aur race condition risk. Atomic operators se: ek network call, database engine atomically karta hai. $inc views counter — 1000 concurrent requests bhi correct result dete hain kyunki database atomic increment guarantee karta hai. Ye difference hai correctness aur performance dono mein."
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
            explanation: '$set partial update — sirf ye fields change karo, baaki document intact. $inc atomic — SQL ke UPDATE counter = counter + 1 jaisa. $push array append — $slice ke saath bounded array (last N elements rakhna). $addToSet = $push with uniqueness guarantee. findOneAndUpdate atomic read + update — ek round-trip mein updated document wapas milta hai.',
            filename: 'update-operators.js',
          }}
          realWorldScenario="Shopping cart real-time operations: user product add karta hai — $push items array mein, $inc total amount. Product remove karta hai — $pull items se. Quantity change — $inc quantity. Sab atomic, sab ek network call. Concurrent users same cart pe — $inc aur $push atomic hain isliye correct result milta hai. Ye MongoDB embedded document pattern ka power hai."
          commonMistakes={[
            { mistake: 'updateOne bina operator ke — pura document replace ho jaata hai', why: '{ $set: {...} } ki jagah { field: value } likhne se _id ke sirf woh fields bachte hain', fix: 'Hamesha $set/$push etc. operators use karo unless pura document replace karna ho' },
          ]}
          proTip="Multiple documents update karne hain? bulkWrite() use karo — insertOne, updateOne, replaceOne, deleteOne sab batch mein ek network call. 100 individual updateOne calls vs 1 bulkWrite: latency 100x kam. Aur ordered: false option se parallel execution possible — koi ek fail ho toh doosre continue karte hain. Large data migrations ke liye ye essential tool hai."
        />
      </div>

      <div id="aggregation-pipeline">
        <ConceptCard
          title="Aggregation Pipeline — Stages Mein Data Process"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Aggregation pipeline — MongoDB ka SQL GROUP BY + subquery + JOINs ka equivalent. Documents ek stage se doosre mein pass hote hain, har stage transform karta hai. $match → $group → $lookup → $project → $sort — Unix pipe ki tarah. Har stage output ke saath next stage operate karta hai. Important: $match hamesha pehle rakho — early filtering se baad ke stages pe less data process hoti hai. $lookup MongoDB ka JOIN hai — lekin SQL JOIN se expensive hai, isliye schema design important hai."
          whenToUse={[
            'Complex analytics aur reporting',
            'Data transformation aur reshaping',
            'Multi-collection joins ($lookup)',
            'Statistical calculations',
          ]}
          whyUseIt="Application code mein aggregate karna = server se sab data fetch karo, JavaScript mein loop lagao — slow aur memory intensive. MongoDB aggregation pipeline server-side process karta hai — sirf result wapas aata hai. Ek $match se early filtering, phir $group se summarize — network pe sirf final result jaata hai. Pipeline stages MongoDB engine ke andar C++ mein optimized hain, JavaScript loop se 10x+ fast."
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
            explanation: 'Pipeline left to right — output ek stage ka input hai next ka. $match pehle = less data expensive stages pe process hoga. $lookup = JOIN, expensive operation — agar zyada use kar rahe ho schema design reconsider karo. $unwind array ko spread karta hai separate documents mein — $lookup ke array result ke saath common. $project output shape define karta hai — bandwidth optimize karo.',
            filename: 'aggregation.js',
          }}
          realWorldScenario="Dashboard analytics request: 'Top 20 customers this year, unka monthly breakdown, user details saath mein.' SQL mein ye CTEs aur JOINs se hota. MongoDB mein: $match year filter → $group user + month → $lookup user details → $unwind → $project clean output → $sort spend descending → $limit 20. Complex report, ek pipeline. Application mein result render karo, loop mat lagao."
          commonMistakes={[
            { mistake: '$match stage late rakhna', why: 'Saare documents unneeded stages process karte hain — slow', fix: '$match hamesha pipeline mein pehle rakhna — early filtering zyada better hai' },
          ]}
          proTip="Pagination + total count ek query mein: $facet stage — { totalCount: [{$count: 'n'}], data: [{$skip: offset}, {$limit: 10}] }. Do sub-pipelines parallel chalte hain. Ye ek roundtrip save karta hai — separate count query nahi. Aur .explain('executionStats') use karo slow pipelines debug karne ke liye — MongoDB ka EXPLAIN ANALYZE equivalent."
        />
      </div>

      <div id="schema-design">
        <ConceptCard
          title="Schema Design — Embed vs Reference"
          emoji="🗂️"
          difficulty="intermediate"
          whatIsIt="MongoDB schema design ka golden rule: 'Data jo ek saath access hota hai, ek saath store karo.' Embed vs reference — ye decision access pattern pe based hai, not data size. Embed: one-to-few, saath access, child independently query nahi hota. Reference: one-to-many, independent queries, data update frequently hota hai. Galat choice ka matlab hai: ya too many $lookups (slow) ya unbounded array growth (16MB document limit hit!)."
          whenToUse={[
            'Embed: one-to-few, data saath access hota ho, child independent nahi',
            'Reference: one-to-many, data independently query hota ho, large child data',
          ]}
          whyUseIt="Embed ka fayda: ek query mein sab kuch milta hai — no $lookup, no extra roundtrip. Fast reads. Reference ka fayda: data ek jagah, independently update hota hai — consistency better. Tradeoff: embed = fast read, denormalized. Reference = normalized, $lookup needed. Ye SQL ke normalization vs denormalization jaisa hi decision hai — lekin MongoDB mein embed encourage karte hain jab saath access hota ho."
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
            explanation: 'Addresses embed — user ke saath hamesha load hote hain, independently query nahi. Orders reference — independent queries zaroori hain, potentially thousands per user. Hybrid pattern — author reference (author khud change ho sakta hai), comments embed (few, saath read hote hain, independent queries nahi). 16MB limit yaad rakho — unbounded arrays kabhi embed mat karo.',
            filename: 'schema-design.js',
          }}
          realWorldScenario="Medium jaisi blogging platform: post document mein author reference (author profile change ho sakti hai), tags embed karo (simple strings, saath read hote hain), comments — agar < 10 per post toh embed, agar potentially thousands (viral post) toh reference karo separate collection mein. Ye real-world schema decision hai — viral content ke liye unbounded comments embed karna 16MB limit hit kar sakta hai."
          commonMistakes={[
            { mistake: 'Hamesha embed karna — unbounded arrays', why: 'Ek user ke hazaar orders embed karo — document 16MB limit hit karta hai, performance slow', fix: 'Many-side of one-to-many hamesha reference karo — orders, comments, messages' },
          ]}
          proTip={'MongoDB schema design ke liye questions poocho: 1. Ye data kaise access hoga — saath ya independently? 2. Kitna data ho sakta hai — bounded (5 addresses) ya unbounded (orders)? 3. Ye data independently update hoga? Answers embed vs reference decide karte hain. Rule: bounded, saath access, not independent = embed. Unbounded, independent, update frequently = reference. Ye questions pehle, phir schema.'}
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="mongodb-queries" />
    </div>
  )
}
