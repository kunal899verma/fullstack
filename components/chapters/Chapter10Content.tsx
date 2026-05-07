'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function BufferMemoryDiagram() {
  const bytes = [
    { hex: '0x48', dec: 72, char: 'H' },
    { hex: '0x65', dec: 101, char: 'e' },
    { hex: '0x6C', dec: 108, char: 'l' },
    { hex: '0x6C', dec: 108, char: 'l' },
    { hex: '0x6F', dec: 111, char: 'o' },
  ]
  const encodings = [
    { name: 'utf8', example: '"Hello"', desc: 'Text data — always default', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
    { name: 'hex', example: '"48656c6c6f"', desc: 'Debug, hashes, checksums', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
    { name: 'base64', example: '"SGVsbG8="', desc: 'APIs, email, JWT tokens', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Buffers & Binary — Visual Overview</p>
      <div className="max-w-lg mx-auto">
        <p className="text-[10px] text-[#71717A] text-center mb-2 uppercase tracking-widest">Raw memory layout</p>
        <div className="flex justify-center gap-1.5 mb-3 flex-wrap">
          {bytes.map((b, i) => (
            <div key={i} className="rounded-lg px-2.5 py-2 text-center" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <p className="text-[10px] font-mono font-bold text-[#10B981]">{b.hex}</p>
              <p className="text-[10px] text-[#71717A]">{b.dec}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="h-px flex-1" style={{ background: 'rgba(16,185,129,0.3)' }} />
          <p className="text-[10px] text-[#71717A] px-2">decoded as</p>
          <div className="h-px flex-1" style={{ background: 'rgba(16,185,129,0.3)' }} />
        </div>
        <div className="flex justify-center gap-1 mb-5">
          {bytes.map((b, i) => (
            <div key={i} className="rounded-lg w-9 h-9 flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)' }}>
              <p className="text-base font-bold font-mono text-[#06B6D4]">{b.char}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#71717A] text-center mb-3 uppercase tracking-widest">same bytes, different encoding output</p>
        <div className="space-y-2">
          {encodings.map((enc, i) => (
            <div key={i} className="rounded-xl px-4 py-2.5 flex items-center gap-3" style={{ background: enc.bg, border: `1px solid ${enc.border}` }}>
              <p className="font-bold text-sm font-mono w-16" style={{ color: enc.color }}>{enc.name}</p>
              <p className="text-xs font-mono text-[#A1A1AA] flex-1">{enc.example}</p>
              <p className="text-[10px] text-[#71717A]">{enc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Chapter10Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          JavaScript strings Unicode mein hoti hain — lekin computer sirf 0 aur 1 jaanta hai. Buffer woh gap fill karta hai.
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Image upload karo, encrypted data bhejo, network packet parse karo — sab kuch ultimately bytes hain. Buffer Node.js ka raw memory representation hai — V8 heap ke bahar. Ye concept tab samajh aata hai jab pehli baar koi image corrupt hoti hai kyunki galat encoding use ki. Tab realization hoti hai — binary data strings se bilkul alag hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          JavaScript mein strings Unicode hoti hain — binary data ke liye Buffer ya TypedArrays chahiye. Jab bhi binary protocol implement karo ya binary file process karo, Buffer tumhara sabse close tool hai.
        </p>
      </div>

      <BufferMemoryDiagram />

      <div id="what-is-buffer">
        <ConceptCard
          title="Buffer Kya Hai?"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="Pehle shocking baat — Buffer JavaScript heap ke bahar allocate hota hai. V8 garbage collector isko touch nahi karta directly. Ye ek fixed-size raw memory allocation hai jo 0 se 255 tak ke integers (unsigned 8-bit bytes) store karta hai. String ke jaisa bilkul nahi — no encoding, no character concept, sirf bytes. Ab sawaal ye aata hai — JavaScript mein strings hoti hain na, Buffer kyun chahiye? Kyunki strings Unicode mein hain — binary data accurately represent nahi kar sakti. JPEG image ka byte 0xD8 string mein rakhoge toh data corrupt ho sakta hai — Buffer mein rakhoge toh safe."
          whenToUse={[
            'Binary file read/write karna — images, videos, PDFs',
            'Network protocols — TCP packets, binary protocols (gRPC, MessagePack)',
            'Encryption/hashing — crypto module Buffer use karta hai',
            'Streams — readable/writable streams data Buffer mein aata-jaata hai',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki JavaScript strings Unicode mein hoti hain — binary data accurately represent nahi kar sakti. Buffer V8 heap ke bahar allocate hoti hai — garbage collection pressure nahi. Large binary data efficient handle hoti hai. Node.js core modules (fs, net, crypto) Buffer return/accept karte hain."
          howToUse={{
            filename: 'buffer-basics.js',
            language: 'javascript',
            code: `// Buffer size
console.log(Buffer.poolSize)  // 8192 bytes — default pool size

// Buffer information
const buf = Buffer.alloc(10)
console.log(buf.length)       // 10 — fixed size, change nahi hoti
console.log(buf.byteOffset)   // Underlying ArrayBuffer mein offset
console.log(buf.buffer)       // Underlying ArrayBuffer

// TypedArray view — Buffer ArrayBuffer ke upar hai
const int32View = new Int32Array(buf.buffer)
console.log(int32View)        // Same memory, different view

// Buffer se string aur back
const str = 'Hello, Duniya!'
const encoded = Buffer.from(str, 'utf8')
const decoded = encoded.toString('utf8')
console.log(str === decoded)  // true

// Binary data example — image file signature check
const imageBuffer = Buffer.from([0xFF, 0xD8, 0xFF])  // JPEG magic bytes
const isJPEG = imageBuffer[0] === 0xFF && imageBuffer[1] === 0xD8
console.log('Is JPEG:', isJPEG)  // true`,
            explanation: "Under the hood: Buffer ek TypedArray (Uint8Array) hai jo Node.js ne extend kiya hai extra methods add karne ke liye. Same underlying ArrayBuffer share hota hai. Buffer.poolSize (8192 bytes) ek pre-allocated pool hai — chhote buffers is pool se slice karte hain, bahut fast allocation. Bade buffers directly allocate hote hain. Ye hi Buffer ka performance secret hai.",
          }}
          realWorldScenario="Image upload API mein — client multipart form se image bhejta hai, server Buffer mein receive karta hai, magic bytes se file type validate karta hai (JPEG: FF D8 FF, PNG: 89 50 4E 47), phir S3/Cloudinary pe upload karta hai. Sab kuch Buffer operations mein. Galat encoding use karo — image corrupt hogi."
          commonMistakes={[
            {
              mistake: 'Buffer(size) ya new Buffer() use karna',
              why: 'Deprecated aur unsafe — uninitialized memory se data leak ho sakta hai. Security vulnerability.',
              fix: 'Hamesha Buffer.alloc(size) (zero-filled) ya Buffer.allocUnsafe(size) (uninitialized, faster for overwriting) ya Buffer.from() use karo.',
            },
            {
              mistake: 'Buffer.allocUnsafe ko sensitive data ke liye use karna',
              why: 'allocUnsafe memory initialize nahi karta — purani data (passwords, keys) leak ho sakti hai agar poora buffer use nahi kiya.',
              fix: 'Sensitive data ke liye Buffer.alloc() use karo — zero fills. allocUnsafe sirf jab immediately overwrite karne wale ho — performance critical code.',
            },
          ]}
          proTip="Buffer JavaScript TypedArray ke saath interoperable hai: Buffer.from(arrayBuffer) ya buffer.buffer se underlying ArrayBuffer access karo. WebAssembly ke saath kaam karte waqt ya SharedArrayBuffer use karte waqt ye conversions common hain. Ye interoperability Node.js ka powerful feature hai."
        />
      </div>

      <div className="rounded-xl p-4 my-4" style={{background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)'}}>
        <p className="text-sm font-bold text-[#F59E0B] mb-2">🤔 Sawaal: Buffer aur String mein kya fundamental fark hai?</p>
        <p className="text-sm text-[#A1A1AA]">Ye samajhna zaroori hai! String — Unicode characters ka sequence, variable bytes per character (emoji = 4 bytes lekin length = 1). Buffer — raw bytes ka sequence, har index ek byte (0-255). String.length characters count karta hai. Buffer.length bytes count karta hai. Isliye 'Hello' ka Buffer.from('Hello').length = 5, lekin 'Namaste 🙏'.length = 9 characters lekin Buffer.from('Namaste 🙏').length = 13 bytes!</p>
      </div>

      <div id="buffer-creation">
        <ConceptCard
          title="Buffer Creation — alloc, allocUnsafe, from"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="Pehle galti karo aur new Buffer() use karo — Node.js warning dega. Ye deprecated hai aur security risk hai kyunki memory uninitialized hoti hai. Teen sahi tarike hain: Buffer.alloc(size, fill?) — zero-initialized ya custom fill (safe, thoda slow). Buffer.allocUnsafe(size) — fast lekin garbage data ho sakti hai, use karo jab turant overwrite karoge (speed ke liye, sensitive data ke liye never). Buffer.from(source) — string, array, ArrayBuffer ya Buffer se create. Sahi method choose karna security aur performance dono affect karta hai."
          whenToUse={[
            'alloc: Initialization required — default, safe choice',
            'allocUnsafe: Performance critical code jahan immediately write karoge',
            'from(string, encoding): Text ko bytes mein convert karna',
            'from(array): Raw byte values se Buffer',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki Buffer creation method choice security implications rakhti hai. alloc vs allocUnsafe fark sirf initialization ka hai — allocUnsafe 5-10x faster ho sakta hai large allocations mein. Production code mein sensitive contexts mein hamesha alloc use karo."
          howToUse={{
            filename: 'buffer-creation.js',
            language: 'javascript',
            code: `// 1. Buffer.alloc — safe, zero-filled
const safeBuffer = Buffer.alloc(10)         // 10 zero bytes
console.log(safeBuffer)                      // <Buffer 00 00 00 00 00 00 00 00 00 00>

const filledBuffer = Buffer.alloc(10, 0xAB) // Custom fill value
console.log(filledBuffer)                   // <Buffer ab ab ab ab ab ab ab ab ab ab>

// 2. Buffer.allocUnsafe — fast, random content
const fastBuffer = Buffer.allocUnsafe(10)
console.log(fastBuffer)                     // <Buffer ?? ?? ?? ...> random bytes!
// Use sirf jab immediately write karoge:
fastBuffer.fill(0)                          // Fill explicitly if needed

// 3. Buffer.from — existing data se
// From string
const strBuf = Buffer.from('Namaste', 'utf8')
console.log(strBuf)                         // <Buffer 4e 61 6d 61 73 74 65>

// From byte array
const arrBuf = Buffer.from([72, 101, 108, 108, 111])
console.log(arrBuf.toString())              // "Hello"

// From hex string
const hexBuf = Buffer.from('deadbeef', 'hex')
console.log(hexBuf)                         // <Buffer de ad be ef>

// From another Buffer (copy)
const original = Buffer.from('Hello')
const copy = Buffer.from(original)
copy[0] = 0x4A                              // 'J'
console.log(original.toString())            // "Hello" — untouched
console.log(copy.toString())                // "Jello"`,
            explanation: "Step-by-step trace: Buffer.alloc(10) — 10 bytes ke liye memory allocate hoti hai, sab 0x00 se initialize hoti hai. Buffer.allocUnsafe(10) — 10 bytes allocate hote hain bina initialization ke — previous memory content wahi rehta hai. Buffer.from(another) — deep copy karta hai, same memory share nahi hoti. Buffer.from(arrayBuffer) — slice reference, same memory share hoti hai.",
          }}
          realWorldScenario="JWT token decode karne ke liye: token split karo '.', Buffer.from(part, 'base64url') se decode karo, toString('utf8') se JSON string lo, JSON.parse karo. Sab Buffer operations chain mein. Galat encoding specify karo toh JSON parse fail hoga — silent bug."
          commonMistakes={[
            {
              mistake: 'Encoding specify nahi karna Buffer.from(string) mein',
              why: 'Default utf8 hai — agar base64 ya hex data pass karo bina encoding ke toh wrong bytes create honge.',
              fix: "Hamesha encoding specify karo: Buffer.from(data, 'base64'), Buffer.from(data, 'hex'), Buffer.from(data, 'utf8').",
            },
            {
              mistake: 'Buffer.from(arrayBuffer) ke baad ArrayBuffer modify karna',
              why: 'Same underlying memory share hoti hai — ek change karne par doosra bhi change ho jaata hai — unexpected bugs.',
              fix: 'Independent copy chahiye toh: Buffer.from(new Uint8Array(arrayBuffer)) ya Buffer.from(buffer) use karo.',
            },
          ]}
          proTip="Performance critical code mein Buffer pool use karo: Buffer.allocUnsafeSlow() pool ke bahar allocate karta hai (larger buffers ke liye), pooled allocation Buffer.allocUnsafe() se faster hai chhote buffers ke liye. Buffer.poolSize (default 8KB) se pool size tune karo — ye tumhara performance gatekeeper hai."
        />
      </div>

      <div id="buffer-encoding">
        <ConceptCard
          title="Buffer Encodings — utf8, hex, base64, binary"
          emoji="🔤"
          difficulty="intermediate"
          whatIsIt="Ye shocking hai — same bytes, alag encoding, completely different output. 0x48 0x65 0x6C 0x6C 0x6F — utf8 mein 'Hello', hex mein '48656c6c6f', base64 mein 'SGVsbG8='. Ab sawaal ye aata hai — kab kaunsa use karein? utf8 (default): text data — hamesha. hex: debugging, checksums, cryptographic hashes. base64: binary data as text — email attachments, data URIs, JWT tokens. latin1/binary: legacy protocols. Wrong encoding use karo — data corruption. Production mein ye ek common bug source hai."
          whenToUse={[
            'utf8: Text data — hamesha default — JSON, HTML, plain text',
            'base64: Binary data as text — email attachments, data URIs, JWT tokens',
            'hex: Debugging, checksums, cryptographic hashes',
            'latin1/binary: Legacy protocols, ISO-8859-1 systems',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki different contexts alag encodings use karte hain. HTTP APIs base64 images accept karte hain. JWT tokens base64url encoded hote hain. SHA-256 hashes hex representation mein share hote hain. Wrong encoding se data loss ya corruption hoti hai."
          howToUse={{
            filename: 'buffer-encodings.js',
            language: 'javascript',
            code: `const text = 'Hello, World! 🌍'

// UTF-8 encoding (default)
const utf8Buf = Buffer.from(text, 'utf8')
console.log(utf8Buf.length)          // 18 bytes (emoji 4 bytes)
console.log(utf8Buf.toString('utf8')) // 'Hello, World! 🌍'

// Hex encoding — debug ke liye
const hexStr = utf8Buf.toString('hex')
console.log(hexStr)  // '48656c6c6f2c...'
const fromHex = Buffer.from(hexStr, 'hex')
console.log(fromHex.toString())  // 'Hello, World! 🌍'

// Base64 — API, email, JWT ke liye
const b64 = utf8Buf.toString('base64')
console.log(b64)  // 'SGVsbG8sIFdvcmxkISDwn4yN'
const fromB64 = Buffer.from(b64, 'base64')
console.log(fromB64.toString())  // 'Hello, World! 🌍'

// Base64URL — JWT tokens ('+' → '-', '/' → '_', '=' removed)
const b64url = utf8Buf.toString('base64url')
console.log(b64url)  // No + / = characters

// Practical: Image to base64 for API
const fs = require('fs')
const imageBuffer = fs.readFileSync('photo.jpg')
const base64Image = imageBuffer.toString('base64')
const dataUrl = \`data:image/jpeg;base64,\${base64Image}\`
// HTML mein: <img src="{dataUrl}" />

// Crypto hash as hex
const crypto = require('crypto')
const hash = crypto.createHash('sha256').update('password').digest('hex')
console.log(hash)  // 64 char hex string`,
            explanation: "Under the hood trace: UTF-8 mein emoji aur non-ASCII characters multiple bytes lete hain — 'Hello 🌍' = 9 chars lekin 13 bytes. Base64 encoding 4/3 ratio add karta hai — 3 bytes = 4 base64 chars, isliye base64 size 33% bada hota hai. Base64URL URL-safe version hai — '+' ko '-' se aur '/' ko '_' se replace karta hai, padding '=' remove karta hai.",
          }}
          realWorldScenario="S3 pre-signed URL se image upload karne ke baad — image buffer read karo, base64 encode karo, OpenAI API ko bhejo image analysis ke liye. API base64 strings accept karta hai raw bytes nahi. Encoding conversion seamless hona chahiye — galat encoding = 'Invalid image format' error."
          commonMistakes={[
            {
              mistake: "Binary data ko 'utf8' string mein store karna",
              why: "Binary data often invalid UTF-8 sequences contain karta hai — toString('utf8') data corrupt kar deta hai.",
              fix: "Binary data ke liye 'base64', 'hex', ya 'latin1' use karo. latin1 byte-perfect hai (each byte one char) lekin readability km.",
            },
            {
              mistake: "base64 aur base64url confuse karna",
              why: "base64 '+', '/', '=' use karta hai jo URL mein escape karne padte hain. JWT tokens base64url use karta hai — same characters nahi.",
              fix: "JWT decode karne ke liye: Buffer.from(token, 'base64url'). Agar atob() use kar rahe ho browser mein toh replace karo '+' → '+' aur '-' → '+' pehle. Node.js mein Buffer.from(str, 'base64url') directly kaam karta hai.",
            },
          ]}
          proTip="Buffer.byteLength(string, encoding) se string ke exact bytes count karo before allocation: const len = Buffer.byteLength(text, 'utf8'); const buf = Buffer.allocUnsafe(len); buf.write(text, 'utf8'). Ye efficient hai — pre-calculate size, avoid reallocation. Ye performance optimization ka gatekeeper hai."
        />
      </div>

      <div className="rounded-xl p-4 my-4" style={{background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)'}}>
        <p className="text-sm font-bold text-[#F59E0B] mb-2">🤔 Sawaal: base64 aur base64url mein practically kab fark padta hai?</p>
        <p className="text-sm text-[#A1A1AA]">Real mein fark padta hai JWT tokens mein! JWT header.payload.signature format hai — teen base64url-encoded parts hain. Agar regular base64 use karo URL mein toh '+' encode hota hai '%2B', '/' encode hota hai '%2F' — URL routing break ho sakta hai. base64url safe hai URLs ke liye. Node.js 14.18+ mein Buffer.from(str, 'base64url') direct support hai — purane versions mein manually replace karo.</p>
      </div>

      <div id="buffer-operations">
        <ConceptCard
          title="Buffer Operations — Read, Write, Compare, Slice"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="Buffer mein data read aur write karne ke multiple methods hain — indexed access, readUInt8/writeUInt8, readInt32BE/LE. Aur ye BE aur LE ka kya chakkar hai? BE = Big-Endian (most significant byte first — network byte order, jaise TCP/IP). LE = Little-Endian (least significant byte first — x86 processors). Wrong byte order se binary protocols fail ho jaate hain silently — bytes sahi hain lekin galat order mein hain. compare se buffers compare karo. subarray se views create karo — same memory, zero-copy."
          whenToUse={[
            'Binary protocol implement karna — fixed format data structures',
            'Network data parse karna — TCP stream, UDP packets',
            'File format handling — parse image headers, binary file formats',
            'Performance-sensitive data processing — zero-copy operations',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki low-level binary manipulation sirf Buffer se possible hai JavaScript mein. Big-endian/little-endian byte order network protocols mein critical hai. copy aur subarray se memory-efficient operations possible hain — no unnecessary allocation."
          howToUse={{
            filename: 'buffer-operations.js',
            language: 'javascript',
            code: `// Indexed access
const buf = Buffer.alloc(4)
buf[0] = 0xFF
buf[1] = 0x00
buf[2] = 0xAB
buf[3] = 0xCD
console.log(buf)  // <Buffer ff 00 ab cd>

// Typed read/write — network protocols ke liye
const packet = Buffer.alloc(10)
packet.writeUInt8(1, 0)          // version = 1 at offset 0
packet.writeUInt16BE(1024, 1)    // port = 1024 at offset 1, Big-Endian
packet.writeUInt32LE(Date.now() % 0xFFFFFFFF, 3)  // timestamp, Little-Endian
packet.writeFloatBE(3.14, 7)     // float at offset 7

const version = packet.readUInt8(0)       // 1
const port = packet.readUInt16BE(1)       // 1024
const timestamp = packet.readUInt32LE(3)
console.log({ version, port, timestamp })

// Buffer compare
const a = Buffer.from('ABC')
const b = Buffer.from('ABD')
console.log(Buffer.compare(a, b))  // -1 (a < b lexicographically)
console.log(a.equals(b))           // false
console.log(a.equals(Buffer.from('ABC')))  // true

// subarray — same memory, no copy (zero-copy view)
const main = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8])
const view = main.subarray(2, 6)  // [3, 4, 5, 6]
view[0] = 99
console.log(main)   // <Buffer 01 02 63 04 05 06 07 08> — original changed!

// concat — multiple buffers join
const parts = [Buffer.from('Hello'), Buffer.from(', '), Buffer.from('World')]
const joined = Buffer.concat(parts)
console.log(joined.toString())  // 'Hello, World'`,
            explanation: "Step-by-step trace: writeUInt16BE(1024, 1) — 1024 = 0x0400. BE mein: offset 1 = 0x04, offset 2 = 0x00. LE hota toh: offset 1 = 0x00, offset 2 = 0x04. Network protocols hamesha BE use karte hain (network byte order). subarray same memory reference karta hai — efficient lekin modify karne se original change hota hai — ye side effect yaad rakho.",
          }}
          realWorldScenario="Binary message protocol implement karna: first 2 bytes message length, next byte message type, remaining bytes payload. readUInt16BE(0) length, readUInt8(2) type, subarray(3, 3+length) payload — zero-copy payload extraction. Efficient binary parsing. TCP socket se data receive karo aur parse karo — ye real-world use case hai."
          commonMistakes={[
            {
              mistake: 'subarray aur slice confuse karna — thinking both copy',
              why: 'subarray same underlying memory reference karta hai — changes propagate. Purana slice() bhi same tha. Agar independent copy chahiye toh Buffer.from() use karo.',
              fix: 'Zero-copy view: buf.subarray(start, end). Independent copy: Buffer.from(buf.subarray(start, end)). Use case decide karo pehle.',
            },
            {
              mistake: 'Buffer bounds check nahi karna',
              why: 'Out-of-bounds access undefined returns karta hai — silently wrong data process hoti hai. Binary protocol parsing mein dangerous.',
              fix: 'Read karne se pehle offset + size < buffer.length check karo. Production code mein try-catch ya explicit bounds check karo.',
            },
          ]}
          proTip={'Node.js mein Buffer.from(string) internals — 8192 bytes ka pre-allocated pool hota hai. Chhote buffers is pool se slice karte hain — very fast allocation. Bade buffers (> poolSize/2 = 4096 bytes) directly allocate hote hain. allocUnsafe(< 4096) pool se, allocUnsafeSlow() direct — performance profiling mein useful distinction. Ye pool Buffer ka hidden power hai.'}
        />
      </div>

      <div id="buffer-vs-stream">
        <ConceptCard
          title="Buffer vs Stream — Kab Kya Use Karein"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Ye fundamental architecture decision hai. Buffer: poora data ek jagah memory mein — simple, random access, lekin memory hungry. Stream: data chunks mein process karo — thoda complex, lekin memory efficient. Ab sawaal ye aata hai — line kahan draw karein? Practical rule: 100MB se chhota aur complete data ek baar chahiye — Buffer theek hai. 100MB se bada, network data, real-time processing, piping — Stream mandatory hai. Binary protocols — Buffer (complete packet ek baar parse). Video encoding, log processing — Stream. Node.js mein default 1.5GB memory limit hai — 2GB file Buffer mein = crash guaranteed."
          whenToUse={[
            'Buffer: Small to medium files (<100MB), complete data ek baar chahiye, random access',
            'Stream: Large files (>100MB), network data, real-time processing, piping',
            'Buffer: Binary protocol parsing — complete packet ek baar parse',
            'Stream: Video encoding, log processing, file transformation',
          ]}
          whyUseIt="Bhai, ye samajhna zaroori hai kyunki Node.js mein default 1.5GB memory limit hai per process. 2GB file Buffer mein load karna = crash. Stream se wo same file 50MB memory mein process hoti hai — chunk by chunk. Memory efficiency critical hai server applications mein jahan many concurrent operations hoti hain."
          howToUse={{
            filename: 'buffer-vs-stream.js',
            language: 'javascript',
            code: `const fs = require('fs')
const { Transform } = require('stream')

// ❌ BUFFER approach — large files ke liye memory problem
async function badWay(inputFile, outputFile) {
  const data = await fs.promises.readFile(inputFile)    // Poora file RAM mein!
  const processed = processData(data)                   // Large buffer process
  await fs.promises.writeFile(outputFile, processed)
}

// ✅ STREAM approach — memory efficient
function goodWay(inputFile, outputFile) {
  const readStream = fs.createReadStream(inputFile, { highWaterMark: 64 * 1024 })  // 64KB chunks
  const writeStream = fs.createWriteStream(outputFile)

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      // chunk is Buffer — process 64KB at a time
      const processed = processChunk(chunk)
      callback(null, processed)
    }
  })

  // Pipe: read → transform → write (backpressure automatic)
  readStream.pipe(transformStream).pipe(writeStream)

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
}

// Collecting stream into Buffer — jab zaroorat ho
async function streamToBuffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

// Buffer to stream
const { Readable } = require('stream')
function bufferToStream(buffer) {
  return Readable.from(buffer)
}`,
            explanation: "highWaterMark stream buffer size control karta hai — kitne bytes memory mein ek baar rakhein. pipe() backpressure automatically handle karta hai — fast writer slow reader ko overwhelm nahi karta. Buffer.concat(chunks) final assembly efficient hai — ek baar join karo, baar baar concat nahi. streamToBuffer() pattern use karo jab streaming API se Buffer chahiye — test mein ya legacy code mein.",
          }}
          realWorldScenario="Video transcoding service — 4K video 8GB ka. Buffer mein load? Server crash. Stream se: input stream read, FFmpeg transform stream, output stream write. Memory 100MB se kam use hoti hai. Thousands of concurrent transcoding jobs possible without memory issues. Ye architecture decision ek company ke infrastructure cost determine karta hai."
          commonMistakes={[
            {
              mistake: 'Stream data ko string mein concatenate karna',
              why: "let data = ''; stream.on('data', chunk => data += chunk.toString()) — large streams mein slow aur memory inefficient hai.",
              fix: "const chunks = []; stream.on('data', c => chunks.push(c)); stream.on('end', () => Buffer.concat(chunks)) — Buffer array collect karo, end par join karo.",
            },
            {
              mistake: "highWaterMark bahut small ya bahut large rakhna",
              why: 'Too small — many system calls, overhead. Too large — memory waste, slow backpressure response.',
              fix: 'Default 16KB most cases ke liye theek hai. Network streams mein 64KB common hai. Disk I/O ke liye 1MB. Profile karo, tune karo.',
            },
          ]}
          proTip={'Node.js 16+ mein stream/promises API use karo: import { pipeline } from "stream/promises"; await pipeline(readStream, transformStream, writeStream). Error handling automatic, cleaner code, no manual event listeners. Old pipe() ke saath error handling manual aur tricky tha. pipeline() = production-ready streams ka gatekeeper.'}
        />
      </div>
    </div>
  )
}
