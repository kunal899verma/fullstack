'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function Chapter10Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Buffers & Binary Data — Raw Bytes Ka Duniya
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Node.js streams mein, file system mein, network packets mein — sab kuch ultimately bytes hain. Buffer Node.js ka raw memory representation hai. Images, audio files, encrypted data, network protocols — ye sab Buffer ke through handle hote hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          JavaScript mein strings Unicode hoti hain — binary data ke liye Buffer ya TypedArrays chahiye. Jab bhi binary protocol implement karo ya binary file process karo, Buffer tumhara tool hai.
        </p>
      </div>

      <div id="what-is-buffer">
        <ConceptCard
          title="Buffer Kya Hai?"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="Buffer ek fixed-size raw memory allocation hai — JavaScript heap ke bahar. Ye raw bytes store karta hai — 0 se 255 tak ke integers (unsigned 8-bit). String ke jaisa nahi — no encoding, no character concept, sirf bytes. Node.js ne browser JavaScript mein missing binary data handling add kiya — Buffer se."
          whenToUse={[
            'Binary file read/write karna — images, videos, PDFs',
            'Network protocols — TCP packets, binary protocols (gRPC, MessagePack)',
            'Encryption/hashing — crypto module Buffer use karta hai',
            'Streams — readable/writable streams data Buffer mein aata-jaata hai',
          ]}
          whyUseIt="JavaScript strings Unicode mein hoti hain — binary data accurately represent nahi kar sakti. Buffer V8 heap ke bahar allocate hoti hai — garbage collection pressure nahi. Large binary data efficient handle hoti hai. Node.js core modules (fs, net, crypto) Buffer return/accept karte hain."
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
            explanation: "Buffer Node.js 4+ se globally available hai — import ki zaroorat nahi. length property bytes count hai, string length nahi — multi-byte characters alag count karenge. TypedArray view same memory share karta hai Buffer ke saath — zero-copy operations possible hain.",
          }}
          realWorldScenario="Image upload API mein — client multipart form se image bhejta hai, server Buffer mein receive karta hai, magic bytes se file type validate karta hai (JPEG: FF D8 FF, PNG: 89 50 4E 47), phir S3/Cloudinary pe upload karta hai. Sab kuch Buffer operations mein."
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
          proTip="Buffer JavaScript TypedArray ke saath interoperable hai: Buffer.from(arrayBuffer) ya buffer.buffer se underlying ArrayBuffer access karo. WebAssembly ke saath kaam karte waqt ya SharedArrayBuffer use karte waqt ye conversions common hain."
        />
      </div>

      <div id="buffer-creation">
        <ConceptCard
          title="Buffer Creation — alloc, allocUnsafe, from"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="Teen primary ways: Buffer.alloc(size, fill?) — zero-initialized ya custom fill. Buffer.allocUnsafe(size) — fast lekin garbage data ho sakti hai, use karo jab turant overwrite karoge. Buffer.from(source) — string, array, ArrayBuffer ya Buffer se create. Sahi method choose karna security aur performance dono affect karta hai."
          whenToUse={[
            'alloc: Initialization required — default, safe choice',
            'allocUnsafe: Performance critical code jahan immediately write karoge',
            'from(string, encoding): Text ko bytes mein convert karna',
            'from(array): Raw byte values se Buffer',
          ]}
          whyUseIt="Buffer creation method choice security implications rakhti hai. alloc vs allocUnsafe fark sirf initialization ka hai — allocUnsafe 5-10x faster ho sakta hai large allocations mein. Production code mein sensitive contexts mein hamesha alloc use karo."
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
            explanation: "Buffer.from(buffer) deep copy karta hai — same memory share nahi hoti. Buffer.from(arrayBuffer) slice reference karta hai — same memory share hoti hai. Hex format mein each byte 2 characters: 'ff' = 255. Encoding parameter important hai — wrong encoding = garbled text.",
          }}
          realWorldScenario="JWT token decode karne ke liye: token split karo '.', Buffer.from(part, 'base64url') se decode karo, toString('utf8') se JSON string lo, JSON.parse karo. Sab Buffer operations chain mein."
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
          proTip="Performance critical code mein Buffer pool use karo: Buffer.allocUnsafeSlow() pool ke bahar allocate karta hai (larger buffers ke liye), pooled allocation Buffer.allocUnsafe() se faster hai chhote buffers ke liye. Buffer.poolSize (default 8KB) se pool size tune karo."
        />
      </div>

      <div id="buffer-encoding">
        <ConceptCard
          title="Buffer Encodings — utf8, hex, base64, binary"
          emoji="🔤"
          difficulty="intermediate"
          whatIsIt="Buffer encoding specify karta hai ki bytes ko string kaise represent karein ya string ko bytes mein kaise convert karein. Common encodings: utf8 (default, text), hex (debug, network), base64 (images, APIs), latin1/binary (legacy). Wrong encoding = data corruption."
          whenToUse={[
            'utf8: Text data — hamesha default — JSON, HTML, plain text',
            'base64: Binary data as text — email attachments, data URIs, JWT tokens',
            'hex: Debugging, checksums, cryptographic hashes',
            'latin1/binary: Legacy protocols, ISO-8859-1 systems',
          ]}
          whyUseIt="Different contexts alag encodings use karte hain. HTTP APIs base64 images accept karte hain. JWT tokens base64url encoded hote hain. SHA-256 hashes hex representation mein share hote hain. Wrong encoding se data loss ya corruption hoti hai."
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
            explanation: "UTF-8 mein emoji aur non-ASCII characters multiple bytes lete hain — string.length !== buffer.length. Base64 encoding 4/3 ratio add karta hai — 3 bytes = 4 base64 chars. Base64URL URL-safe version hai (no + / = chars). hex encoding 2 chars per byte = double size.",
          }}
          realWorldScenario="S3 pre-signed URL se image upload karne ke baad — image buffer read karo, base64 encode karo, OpenAI API ko bhejo image analysis ke liye. API base64 strings accept karta hai raw bytes nahi. Encoding conversion seamless hona chahiye."
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
          proTip="Buffer.byteLength(string, encoding) se string ke exact bytes count karo before allocation: const len = Buffer.byteLength(text, 'utf8'); const buf = Buffer.allocUnsafe(len); buf.write(text, 'utf8'). Ye efficient hai — pre-calculate size, avoid reallocation."
        />
      </div>

      <div id="buffer-operations">
        <ConceptCard
          title="Buffer Operations — Read, Write, Compare, Slice"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="Buffer mein data read aur write karne ke multiple methods hain — indexed access, readUInt8/writeUInt8, readInt32BE/LE (big-endian/little-endian). compare se buffers compare karo. copy se data transfer karo. subarray/slice se views create karo (same memory). concat se multiple buffers join karo."
          whenToUse={[
            'Binary protocol implement karna — fixed format data structures',
            'Network data parse karna — TCP stream, UDP packets',
            'File format handling — parse image headers, binary file formats',
            'Performance-sensitive data processing — zero-copy operations',
          ]}
          whyUseIt="Low-level binary manipulation sirf Buffer se possible hai JavaScript mein. Big-endian/little-endian byte order network protocols mein critical hai. copy aur subarray se memory-efficient operations possible hain — no unnecessary allocation."
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
            explanation: "BE = Big-Endian (most significant byte first — network byte order). LE = Little-Endian (least significant byte first — x86 processors). TCP/IP BE use karta hai. subarray same memory share karta hai — efficient lekin modify karne se original change hota hai. copy independent copy banata hai.",
          }}
          realWorldScenario="Binary message protocol implement karna: first 2 bytes message length, next byte message type, remaining bytes payload. readUInt16BE(0) length, readUInt8(2) type, subarray(3, 3+length) payload — zero-copy payload extraction. Efficient binary parsing."
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
          proTip={'Node.js mein Buffer.from(string) internals — 8192 bytes ka pre-allocated pool hota hai. Chhote buffers is pool se slice karte hain — very fast allocation. Bade buffers (> poolSize/2 = 4096 bytes) directly allocate hote hain. allocUnsafe(< 4096) pool se, allocUnsafeSlow() direct — performance profiling mein useful distinction.'}
        />
      </div>

      <div id="buffer-vs-stream">
        <ConceptCard
          title="Buffer vs Stream — Kab Kya Use Karein"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Buffer: poora data ek jagah memory mein. Stream: data chunks mein process karo — chunk by chunk. Buffer simple hai lekin large files ke liye memory problem. Stream memory efficient hai lekin complex code. 1MB file — Buffer theek hai. 1GB file — Stream mandatory hai. Binary protocols — Buffer. Large file processing — Stream."
          whenToUse={[
            'Buffer: Small to medium files (<100MB), complete data ek baar chahiye, random access',
            'Stream: Large files (>100MB), network data, real-time processing, piping',
            'Buffer: Binary protocol parsing — complete packet ek baar parse',
            'Stream: Video encoding, log processing, file transformation',
          ]}
          whyUseIt="Node.js mein default 1.5GB memory limit hai per process. 2GB file Buffer mein load karna = crash. Stream se wo same file 50MB memory mein process hoti hai — chunk by chunk. Memory efficiency critical hai server applications mein jahan many concurrent operations hoti hain."
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
            explanation: "highWaterMark stream buffer size control karta hai — kitne bytes memory mein ek baar rakhein. pipe() backpressure automatically handle karta hai — fast writer slow reader ko overwhelm nahi karta. Buffer.concat(chunks) final assembly efficient hai — ek baar join karo, baar baar concat nahi.",
          }}
          realWorldScenario="Video transcoding service — 4K video 8GB ka. Buffer mein load? Server crash. Stream se: input stream read, FFmpeg transform stream, output stream write. Memory 100MB se kam use hoti hai. Thousands of concurrent transcoding jobs possible without memory issues."
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
          proTip={'Node.js 16+ mein stream/promises API use karo: import { pipeline } from "stream/promises"; await pipeline(readStream, transformStream, writeStream). Error handling automatic, cleaner code, no manual event listeners. Old pipe() ke saath error handling manual aur tricky tha.'}
        />
      </div>
    </div>
  )
}
