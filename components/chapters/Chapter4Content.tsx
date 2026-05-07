'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const npmQuiz = [
  {
    question: 'package.json mein ^ (caret) aur ~ (tilde) version range mein kya difference hai?',
    options: [
      {
        text: 'Dono same hain — koi difference nahi',
        correct: false,
        explanation: 'Nahi bhai, ye dono alag hain. ^ minor aur patch updates allow karta hai, ~ sirf patch updates allow karta hai.',
      },
      {
        text: '^ (caret) minor aur patch updates allow karta hai. ~ (tilde) sirf patch updates allow karta hai.',
        correct: true,
        explanation: 'Bilkul sahi! ^1.2.3 ka matlab hai >=1.2.3 <2.0.0 (minor updates ok). ~1.2.3 ka matlab hai >=1.2.3 <1.3.0 (sirf patch updates ok). Critical production deps ke liye exact version use karo.',
      },
      {
        text: '^ latest major version install karta hai, ~ latest minor',
        correct: false,
        explanation: 'Ye galat hai. ^ major version lock rakhta hai (1.x.x range), sirf minor aur patch updates allow karta hai.',
      },
      {
        text: '~ zyada flexible hai kyunki ye major changes allow karta hai',
        correct: false,
        explanation: 'Ulta hai — ~ zyada strict hai. Sirf patch-level updates allow karta hai (~1.2.3 = only 1.2.x updates).',
      },
    ],
  },
  {
    question: 'npm install aur npm ci mein fundamental difference kya hai?',
    options: [
      {
        text: 'npm ci faster hai kyunki ye cache use karta hai',
        correct: false,
        explanation: 'npm ci faster hota hai ek alag reason se — node_modules clean karta hai aur exactly package-lock.json follow karta hai. Cache advantage dono ke paas hoti hai.',
      },
      {
        text: 'npm ci package-lock.json strictly follow karta hai aur node_modules pehle delete karta hai — CI/CD ke liye ideal',
        correct: true,
        explanation: 'Sahi! npm ci reproducible installs ke liye hai: node_modules delete karta hai, package-lock.json se exactly install karta hai, aur agar lock file missing ya outdated hai toh error deta hai. npm install lock file update kar sakta hai.',
      },
      {
        text: 'npm install development dependencies skip karta hai',
        correct: false,
        explanation: 'npm install by default devDependencies bhi install karta hai. Production install ke liye --production flag use karo.',
      },
      {
        text: 'npm ci sirf global packages install karta hai',
        correct: false,
        explanation: 'npm ci local project dependencies install karta hai — global packages nahi. Global ke liye npm install -g use hota hai.',
      },
    ],
  },
  {
    question: 'devDependencies aur dependencies mein kya fark hai?',
    options: [
      {
        text: 'devDependencies faster install hoti hain',
        correct: false,
        explanation: 'Install speed package size aur network par depend karti hai, devDependencies vs dependencies par nahi.',
      },
      {
        text: 'devDependencies sirf development mein chahiye (testing, linting, bundling). dependencies runtime par bhi chahiye.',
        correct: true,
        explanation: 'Correct! Jest, ESLint, TypeScript — devDependencies. Express, lodash, mongoose — dependencies (production mein bhi chahiye). npm install --production se sirf dependencies install hoti hain, devDependencies skip hoti hain.',
      },
      {
        text: 'devDependencies ko gitignore karna chahiye',
        correct: false,
        explanation: 'devDependencies package.json mein listed hain — ye source control mein hona chahiye. node_modules gitignore hota hai, package.json nahi.',
      },
      {
        text: 'Dono same hain — sirf naming convention hai',
        correct: false,
        explanation: 'Nahi, practical difference hai: production deploy mein npm install --omit=dev se devDependencies install nahi hoti — bundle size aur install time kam hota hai.',
      },
    ],
  },
  {
    question: 'npm ci kab use karna chahiye?',
    options: [
      {
        text: 'Jab nayi packages install karni hon',
        correct: false,
        explanation: 'Nayi packages ke liye npm install use karo — woh package.json aur lock file update karta hai. npm ci sirf existing lock file se install karta hai.',
      },
      {
        text: 'CI/CD pipelines mein, Docker builds mein, aur kisi bhi jab reproducible install chahiye',
        correct: true,
        explanation: 'Bilkul sahi! npm ci guarantee karta hai ki same exact versions install hongi jo package-lock.json mein hain. GitHub Actions, Jenkins, Docker builds — hamesha npm ci use karo.',
      },
      {
        text: 'Sirf jab npm install fail ho jaaye',
        correct: false,
        explanation: 'npm ci npm install ka fallback nahi hai — ye ek alag tool hai specifically clean, reproducible installs ke liye.',
      },
      {
        text: 'Global packages update karne ke liye',
        correct: false,
        explanation: 'Global packages ke liye npm update -g use karo. npm ci local project ka clean install karta hai.',
      },
    ],
  },
  {
    question: 'package-lock.json ko .gitignore mein daalna chahiye?',
    options: [
      {
        text: 'Haan, ye auto-generated file hai toh ignore karo',
        correct: false,
        explanation: 'Auto-generated hona ignore karne ka reason nahi hai. package-lock.json reproducible installs ke liye critical hai — ise commit karo!',
      },
      {
        text: 'Nahi! package-lock.json ko commit karo — ye reproducible installs ensure karta hai team mein aur CI/CD mein',
        correct: true,
        explanation: 'Sahi! package-lock.json exact dependency tree record karta hai. Bina iske har install alag versions install kar sakta hai. Hamesha commit karo. node_modules gitignore karo, lock file nahi.',
      },
      {
        text: 'Optional hai — project ke size par depend karta hai',
        correct: false,
        explanation: 'Project size se koi relation nahi. package-lock.json hamesha commit karna chahiye — ye best practice hai, opinion nahi.',
      },
      {
        text: 'Sirf yarn.lock commit karo, package-lock.json nahi',
        correct: false,
        explanation: 'Ek project ek lock file use karo — npm use karte ho toh package-lock.json, yarn use karte ho toh yarn.lock. Dono commit karni chahiye.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter4Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          NPM — Node ka Package Universe
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          2 million+ packages. Duniya ka sabse bada software registry. Sahi use karna seekho — warna dependency hell mein jaaoge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">package.json</code>{' '}
          structure, semantic versioning, lock files, npm scripts, aur{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">npx</code>{' '}
          sab cover karenge — beginner se production-ready tak.
        </p>
      </div>

      {/* ConceptCard 1: package.json */}
      <div id="package-json">
        <ConceptCard
          title="package.json — Tera Project Ka ID Card"
          emoji="🪪"
          difficulty="beginner"
          whatIsIt="package.json tera Node.js project ka identity document hai. Isme project ki saari information hoti hai — naam, version, dependencies, scripts, aur configuration. npm is file ko read karke jaanta hai project ke baare mein. Bina package.json ke, project sirf random files ka dabba hai."
          whenToUse={[
            'Har Node.js project mein — project shuru karte hi banao',
            'Dependencies track karne ke liye — installed packages record rehte hain',
            'npm scripts define karne ke liye — build, test, start commands',
            'Project metadata — name, version, description, license',
            'Node.js version requirements specify karne ke liye (engines field)',
          ]}
          whyUseIt="package.json ke bina: team members alag versions install kar sakte hain, scripts manually run karne padte hain, project metadata kahin nahi hoti. package.json se: npm install ek command mein sab dependencies install kar deta hai, npm run dev se development server start hoti hai, CI/CD tools automatically samjh jaate hain project structure."
          howToUse={{
            filename: 'package.json',
            language: 'json',
            code: `{
  "name": "my-awesome-api",
  "version": "1.2.0",
  "description": "Production-grade REST API for e-commerce",
  "main": "dist/index.js",
  "type": "module",

  "scripts": {
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "test": "jest --coverage",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write src/**/*.ts",
    "db:migrate": "prisma migrate deploy",
    "db:seed": "tsx src/scripts/seed.ts"
  },

  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.4"
  },

  "devDependencies": {
    "typescript": "^5.3.0",
    "jest": "^29.7.0",
    "eslint": "^8.56.0",
    "prettier": "^3.1.0",
    "@types/express": "^4.17.21",
    "tsx": "^4.6.0"
  },

  "peerDependencies": {
    "react": ">=18.0.0"
  },

  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },

  "keywords": ["api", "express", "typescript"],
  "author": "Your Name <you@example.com>",
  "license": "MIT",
  "private": true
}`,
            explanation: 'Ye ek production-ready package.json hai. scripts mein saare common tasks hain. dependencies runtime mein chahiye. devDependencies sirf development mein. engines se Node.js version requirements enforce hoti hain. private: true se accidental npm publish se bachao.',
          }}
          realWorldScenario="Jab tum GitHub se koi project clone karte ho aur npm install run karte ho — npm package.json padh ke sab dependencies install karta hai. Ek command, sab setup. Ye package.json ki power hai — project ki complete dependency map ek file mein."
          commonMistakes={[
            {
              mistake: 'devDependencies mein production libraries dalna (ya ulta)',
              why: 'Express ko devDependencies mein daala toh production deploy mein --omit=dev flag se Express install nahi hogi — app crash karega. Jest ko dependencies mein daala toh production bundle unnecessarily bada hoga.',
              fix: 'Rule: Kya ye package production server par chal rahi application ko chahiye? Yes → dependencies. No (sirf build/test) → devDependencies.',
            },
            {
              mistake: '"private": true bhool jaana public packages mein nahi',
              why: 'Agar "private": true hai aur tum npm publish karte ho, error aayega. Agar "private" field nahi hai ya false hai, accidental publish ho sakta hai.',
              fix: 'Internal projects mein hamesha "private": true rakho. Public npm package hai toh "private" field hataao ya false karo.',
            },
          ]}
          proTip="npm init -y se default package.json banta hai — sabse fast way. Phir manually fields update karo. Ya npm init (without -y) se interactive wizard se customize karo. Pro tip: npm pkg set scripts.dev='tsx watch src/index.ts' se scripts directly CLI se set kar sakte ho."
        />
      </div>

      {/* ConceptCard 2: Semver */}
      <div id="semver">
        <ConceptCard
          title="Semver — Version Numbers Ka Matlab"
          emoji="🔢"
          difficulty="beginner"
          whatIsIt="Semantic Versioning (semver) ek standard hai — MAJOR.MINOR.PATCH format. 2.4.1 mein: 2 major version hai, 4 minor, 1 patch. MAJOR change = breaking changes (API change). MINOR change = new features (backward compatible). PATCH = bug fixes only. npm is standard ko follow karta hai — package updates kab safe hain ye decide karne ke liye."
          whenToUse={[
            'Har npm package publish karte waqt — semver follow karo',
            'Dependencies update karte waqt — kaunsa update safe hai samjhna',
            '^ ya ~ ya exact version decide karte waqt',
            'Changelog likhte waqt — kya changed based on version bump type',
          ]}
          whyUseIt="Semver se ecosystem predictable rehta hai. Agar package v3.0.0 release karti hai (major bump), toh tum samjhte ho ke breaking changes hain — blindly update mat karo. v2.5.0 (minor) mein new features hain lekin existing code break nahi hoga. v2.4.2 (patch) safe update hai — sirf bug fixes."
          howToUse={{
            filename: 'semver-examples.json',
            language: 'json',
            code: `{
  "dependencies": {
    // EXACT version — exactly ye hi install hogi
    "critical-lib": "3.2.1",

    // ^ CARET — minor aur patch updates allow
    // ^3.2.1 = >=3.2.1 <4.0.0
    "express": "^4.18.2",      // 4.x.x milega, 5.x.x nahi

    // ~ TILDE — sirf patch updates allow
    // ~3.2.1 = >=3.2.1 <3.3.0
    "lodash": "~4.17.21",      // 4.17.x milega, 4.18.x nahi

    // * STAR — latest wali bhi (dangerous!)
    "some-package": "*",        // Avoid this!

    // >= — minimum version
    "node-fetch": ">=3.0.0",

    // Range
    "validator": ">=13.0.0 <14.0.0",

    // Latest tag
    "debug": "latest"           // Production mein avoid!
  }
}`,
            explanation: '^4.18.2 (caret) sabse common hai — minor updates allow karta hai jo backward compatible hote hain. ~4.17.21 (tilde) conservative approach — sirf bug fixes. Critical libraries ke liye exact version use karo — surprise breaking changes se bachao.',
          }}
          realWorldScenario="Ek startup mein stripe npm package use ho raha tha. package.json mein ^ tha. Minor update mein stripe ne ek method ka parameter order change kiya (technically minor lekin behavior-breaking). Payments fail hone lage. Lesson: payment libraries ke liye exact version ya ~ use karo — safety first."
          commonMistakes={[
            {
              mistake: '* (star) ya latest tag use karna dependencies mein',
              why: 'npm install har baar latest version install karega — kab breaking changes aa jaayein pata nahi. Production mein sudden failures ho sakte hain.',
              fix: 'Hamesha specific range use karo: ^, ~, ya exact. Deliberate upgrades karo — npm outdated se check karo, npm update se carefully update karo.',
            },
            {
              mistake: 'npm install se automatically latest update ho jaata hai ye sochna',
              why: 'npm install package-lock.json mein locked version install karta hai (agar lock file exist karta hai). Lock file nahi hai toh ^ se latest compatible milega.',
              fix: 'npm update se explicitly update karo. npm outdated se pehle check karo kya outdated hai. Major updates ke liye npm install package@latest use karo.',
            },
          ]}
          proTip="npm install --save-exact ya -E se exact version lock karo: npm install express --save-exact → '4.18.2' instead of '^4.18.2'. Critical dependencies (payment APIs, security libraries) ke liye ye safer hai. Aur hamesha package-lock.json commit karo — ye exact versions record karta hai."
        />

        <div className="mt-6">
          <DiffBlock
            title="^ vs ~ — Kaun Kitna Allow Karta Hai?"
            language="json"
            bad={{
              label: '~ Tilde (Conservative)',
              code: `// ~1.2.3 — sirf patch updates
// Allows: >=1.2.3 <1.3.0

"dependencies": {
  "express": "~4.18.2"
}
// Install hoga: 4.18.2, 4.18.3, 4.18.9
// Nahi milega: 4.19.0 (minor update)
// Nahi milega: 5.0.0 (major update)

// Use karo jab:
// — Core libraries jahan stability critical hai
// — Payment gateways, auth libraries`,
              explanation: '~ zyada strict hai — sirf bug fix updates. Zyada predictable lekin manually minor updates karne padte hain.',
            }}
            good={{
              label: '^ Caret (Recommended)',
              code: `// ^1.2.3 — minor aur patch updates
// Allows: >=1.2.3 <2.0.0

"dependencies": {
  "express": "^4.18.2"
}
// Install hoga: 4.18.2, 4.19.0, 4.99.9
// Nahi milega: 5.0.0 (major update)

// Use karo jab:
// — Most regular dependencies
// — Frameworks jo semver properly follow karte hain
// — Development tools

// Exact version (safest for critical libs):
// "stripe": "14.5.0"`,
              explanation: '^ caret sabse common choice hai — minor updates automatically aate hain (new features, backward compatible). Major version locked rahta hai.',
            }}
          />
        </div>
      </div>

      {/* ConceptCard 3: package-lock.json */}
      <div id="package-lock">
        <ConceptCard
          title="package-lock.json — Reproducible Installs"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="package-lock.json ek auto-generated file hai jo exact dependency tree record karti hai — har package ka exact version, dependencies ki dependencies, aur integrity hash. Ye ensure karta hai ki tumhara code aur team member ka code aur production server — sab same exact packages use karein. Reproducibility ka secret weapon."
          whenToUse={[
            'Hamesha commit karo — project mein shamil karo source control mein',
            'CI/CD pipelines mein npm ci use karo — lock file strictly follow karta hai',
            'Docker builds mein — reproducible container images ke liye',
            'Team onboarding — naya developer aaya, npm ci se exact same environment',
          ]}
          whyUseIt="Sochlo bhai: tumhare laptop par app perfectly kaam kar rahi hai. Production deploy kiya, crash. Kyun? npm install ne slightly alag version install ki (^ ki wajah se latest compatible mili). package-lock.json is problem ko solve karta hai — exact snapshot of your working dependency tree. 'Works on my machine' problem khatam."
          howToUse={{
            filename: 'workflow.sh',
            language: 'bash',
            code: `# Development mein — package.json update karo
npm install express          # Adds to dependencies, updates lock file
npm install jest --save-dev  # Adds to devDependencies
npm uninstall lodash         # Removes from package.json and lock file

# npm install vs npm ci — kab kya use karein:

# npm install:
# - package.json se install karta hai
# - Lock file update kar sakta hai (new packages ya ranges)
# - Development mein use karo jab packages add/remove karo
npm install

# npm ci (clean install):
# - package-lock.json se STRICTLY install karta hai
# - node_modules pehle DELETE karta hai (fresh install)
# - Lock file update NAHI karta
# - Lock file missing ya outdated → ERROR (safe!)
# - CI/CD, Docker, production ke liye
npm ci

# Docker example:
# Dockerfile
# COPY package*.json ./    ← dono copy karo!
# RUN npm ci               ← npm install nahi!

# Lock file update karna:
npm update              # Sab packages update karo (within ranges)
npm update express      # Specific package update karo
npm install express@5   # Major version update (package.json bhi update)

# Outdated packages check karo:
npm outdated
# Package    Current  Wanted  Latest
# express    4.18.2   4.18.2  4.19.0

# Security audit:
npm audit
npm audit fix           # Auto-fix safe issues`,
            explanation: 'npm ci CI/CD mein use karo — reproducible, fast, aur strict. npm install development mein jab package changes karo. Dockerfile mein COPY package*.json ./ (both files!) phir RUN npm ci — production-ready pattern.',
          }}
          realWorldScenario="ek fintech startup ki production deploy mein bank transfer API call fail ho rahi thi. Debug kiya — node-fetch ka 3.x install hua tha jiske saath CommonJS require() kaam nahi karta. package-lock.json commit nahi tha. npm ci hoti toh same version install hoti. Lock file commit karna seek gaye — dobaara nahi hua ye issue."
          commonMistakes={[
            {
              mistake: 'package-lock.json ko .gitignore mein daalna',
              why: 'Lock file ke bina reproducibility guarantee nahi hoti. Har npm install mein slightly alag versions install ho sakti hain — subtle bugs, "works on my machine" issues.',
              fix: 'node_modules gitignore karo (ya folder delete karo), package-lock.json hamesha commit karo. Rule: generated files jo regenerate karna expensive hai unhe commit karo.',
            },
            {
              mistake: 'CI/CD mein npm install use karna npm ci ki jagah',
              why: 'npm install lock file update kar sakta hai agar package.json aur lock file mismatch ho. CI mein lock file silently change ho sakti hai — reproducibility toot jaati hai.',
              fix: 'CI/CD scripts mein hamesha npm ci use karo. Ye faster bhi hai kyunki cache-optimized hai aur existing node_modules check nahi karta.',
            },
          ]}
          proTip="CI/CD mein hamesha npm ci use karo — npm install se faster hai aur lock file strictly follow karta hai. GitHub Actions example: 'run: npm ci' instead of 'run: npm install'. Docker mein bhi: RUN npm ci. Ye ek chhoti si change hai jo reproducibility guarantee karta hai — kabhi bhoolna mat."
        />
      </div>

      {/* ConceptCard 4: npm Scripts */}
      <div id="npm-scripts">
        <ConceptCard
          title="npm Scripts — Tera Build System"
          emoji="⚙️"
          difficulty="beginner"
          whatIsIt="npm scripts package.json ke 'scripts' field mein define hote hain — shell commands jo npm run <name> se execute hote hain. Ye Node.js project ka lightweight build system hai. Makefile ya Gulp jaise complex tools ki zaroorat nahi — npm scripts se hi lint, build, test, deploy sab ho sakta hai."
          whenToUse={[
            'Project start/stop commands — npm start, npm run dev',
            'Build pipeline — TypeScript compile, bundle karna',
            'Testing — npm test (ya npm t shorthand)',
            'Linting aur formatting — code quality enforce karna',
            'Database operations — migrations, seeding',
            'Deployment helpers — Docker build, cloud deploy',
          ]}
          whyUseIt="npm scripts ka fayda: PATH mein node_modules/.bin automatically add hota hai — locally installed tools seedha use kar sakte ho bina npx ke. Pre/post hooks se automation possible hai. Cross-platform (mostly) — Windows aur Unix pe same commands. Team ke liye standard entry points — naya dev jo bhi joined hai wo npm run dev jaanta hai."
          howToUse={{
            filename: 'package.json',
            language: 'json',
            code: `{
  "scripts": {
    // ── Basic Commands ─────────────────────────────────────
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "build": "tsc --project tsconfig.build.json",
    "test": "jest --coverage",
    "test:watch": "jest --watch",

    // ── Pre/Post Hooks — automatically run ────────────────
    "prebuild": "npm run clean",        // build se PEHLE run hoga
    "build": "tsc",
    "postbuild": "npm run copy-assets", // build ke BAAD run hoga

    "pretest": "npm run lint",          // test se pehle lint check

    // ── Chaining Scripts ──────────────────────────────────
    "clean": "rm -rf dist",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write 'src/**/*.ts'",
    "type-check": "tsc --noEmit",

    // Sab ek saath:
    "validate": "npm run lint && npm run type-check && npm test",

    // ── Environment Variables ─────────────────────────────
    "dev:prod": "NODE_ENV=production tsx src/index.ts",
    "start:debug": "NODE_OPTIONS='--inspect' node dist/index.js",

    // ── Database ──────────────────────────────────────────
    "db:migrate": "prisma migrate deploy",
    "db:seed": "tsx src/scripts/seed.ts",
    "db:reset": "prisma migrate reset --force",

    // ── Docker ────────────────────────────────────────────
    "docker:build": "docker build -t my-app .",
    "docker:up": "docker-compose up -d",
    "docker:logs": "docker-compose logs -f app"
  }
}`,
            explanation: 'pre/post hooks magic hain — prebuild automatically build se pehle run hota hai. && se scripts chain karo — agar pehla fail hua toh aagla nahi chalega. npm run validate ek command mein poora quality check karta hai.',
          }}
          realWorldScenario="Production deploy pipeline mein: npm run validate (lint + type-check + test) → npm run build → docker build → deploy. Ye sab npm scripts se orchestrate hota hai. Developer ko sirf commands yaad rakhne hote hain — implementation scripts mein chhupa hota hai. Onboarding new devs ke liye README mein sirf 'npm run dev' likhna kaafi hota hai."
          commonMistakes={[
            {
              mistake: 'globally installed packages par depend karna scripts mein',
              why: 'Agar script mein globally installed eslint use karo aur team member ne globally install nahi kiya, script fail hogi. Ye "works on my machine" bug hai.',
              fix: 'eslint ko devDependencies mein daalo. npm scripts automatically node_modules/.bin PATH mein add karta hai — locally installed tools seedha use hote hain.',
            },
            {
              mistake: 'Scripts mein Windows-incompatible commands use karna (rm -rf, cp, etc.)',
              why: 'rm -rf macOS/Linux mein kaam karta hai, Windows mein nahi (CMD/PowerShell ka syntax alag hai). Cross-platform teams mein issues.',
              fix: '"clean": "rimraf dist" (npm install rimraf as devDependency). rimraf cross-platform hai. Ya shx package use karo Unix commands ke cross-platform versions ke liye.',
            },
          ]}
          proTip="npm run-script -- --flag se flags pass kar sakte ho: npm test -- --verbose --coverage. Double dash (--) ke baad jo bhi hai woh underlying command ko pass hota hai. Aur npm test aur npm start special commands hain — run keyword optional hai: npm test (not npm run test, though both work)."
        />
      </div>

      {/* ConceptCard 5: npx */}
      <div id="npx">
        <ConceptCard
          title="npx — Bina Install Kiye Run Karo"
          emoji="🚀"
          difficulty="beginner"
          whatIsIt="npx ek npm tool hai jo packages ko install kiye bina directly execute karta hai. Node.js 5.2+ ke saath bundled aata hai. Jab tum npx create-react-app my-app likhte ho, npx temporarily create-react-app download karta hai, run karta hai, phir delete kar deta hai. Ek-baar use hone wale tools ke liye perfect."
          whenToUse={[
            'Project scaffolding tools — create-react-app, create-next-app, etc.',
            'One-off scripts jo globally install nahi karne hain',
            'Specific version of a tool temporarily use karna',
            'Locally installed binaries run karna — node_modules/.bin/',
            'Testing agar koi package tere project ke liye useful hai',
          ]}
          whyUseIt="Bina npx ke: npm install -g create-react-app globally install karo, phir create-react-app my-app, phir yaad rakho globally installed tools update karna. Sab outdated ho jaate hain. npx ke saath: npx create-react-app my-app — hamesha latest version run hoti hai. Global namespace pollute nahi hota. Ek command, kaam ho gaya."
          howToUse={{
            filename: 'npx-examples.sh',
            language: 'bash',
            code: `# ── Project Scaffolding ──────────────────────────────────
npx create-react-app my-app --template typescript
npx create-next-app@latest my-next-app
npx create-vite my-vite-app --template react-ts
npx @prisma/cli init

# ── One-off Tools ─────────────────────────────────────────
npx cowsay "Namaste World!"    # Sirf fun ke liye
npx serve .                    # Static file server
npx http-server . -p 8080      # Another static server
npx kill-port 3000             # Port kill karo

# ── Code Generation ───────────────────────────────────────
npx hygen component new --name UserCard
npx openapi-generator-cli generate -i api.yaml -g typescript-axios

# ── Specific Version ──────────────────────────────────────
npx node@18 -e "console.log(process.version)"  # Specific Node version
npx create-next-app@13 my-old-app              # Older version
npx npm@9 install                               # Specific npm version

# ── Locally installed packages ────────────────────────────
# npx pehle node_modules/.bin mein dekhta hai!
npx jest                    # Locally installed jest run karo
npx tsc --version           # Local TypeScript version
npx eslint src/             # Local eslint

# Alternative: npm scripts mein directly use karo
# package.json: { "scripts": { "lint": "eslint src/" } }
# npm run lint  ← ye bhi node_modules/.bin use karta hai`,
            explanation: 'npx locally installed packages pehle check karta hai (node_modules/.bin), phir agar nahi mila toh temporarily download karta hai. create-react-app ya create-next-app jaise scaffolding tools ke liye ideal — hamesha latest version milti hai.',
          }}
          realWorldScenario="Team mein naya project start karna hai. Har developer ke machine par different global tool versions installed hain. npx create-next-app@latest use karo — sab developers same latest version run karein. No 'but I have v12 installed globally' issues. Clean, consistent, reproducible project setup."
          commonMistakes={[
            {
              mistake: 'npx aur npm install ka confusion — dono install karte hain ye sochna',
              why: 'npx temporarily download karta hai (cache mein jaata hai, project mein nahi). npm install project ke node_modules mein permanently install karta hai. Alag tools, alag purposes.',
              fix: 'Project ke runtime mein chahiye → npm install. Ek baar run karna hai → npx. Dev tool jo hamesha use karna hai → devDependencies mein install karo, npx use nahi karo.',
            },
            {
              mistake: 'npx se globally install karna: npx npm install -g something',
              why: 'npx globally install nahi karta — ye temporarily run karta hai. npm install -g se global install hota hai.',
              fix: 'Honestly, zyada tools globally install karna avoid karo. Devt tools project ke devDependencies mein daalo — team consistency ke liye better.',
            },
          ]}
          proTip="npx always latest version run karta hai unless tum version specify karo (npx create-next-app@13). Cached hai toh local cache use karta hai — network hit nahi hoti. --yes flag se prompts skip karo: npx create-next-app@latest my-app --yes --typescript --tailwind. Automation scripts ke liye perfect."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 4 Quiz — NPM Mastery Check
          </h3>
          <p className="text-sm text-[#71717A]">
            Package management ka gyaan pakka hai? 5 questions — 80%+ chahiye!
          </p>
        </div>
        <QuizSection questions={npmQuiz} chapterSlug="npm-and-packages" />
      </div>
    </div>
  )
}
