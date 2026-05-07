'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const capstoneQuiz: QuizQuestion[] = [
  {
    question: 'Modular JS architecture ka main benefit kya hai?',
    options: [
      { text: 'Code fast run hota hai', correct: false, explanation: 'Modularity performance se direct related nahi.' },
      { text: 'Separation of concerns — features independently develop, test, maintain ho sakte hain', correct: true, explanation: 'Sahi! Modules loose coupling aur high cohesion ensure karte hain — scalable codebase.' },
      { text: 'Less code likhna padta hai', correct: false, explanation: 'Modularity code amount reduce nahi karta necessarily.' },
      { text: 'Browser compatibility automatic hoti hai', correct: false, explanation: 'Browser compatibility alag concern hai.' },
    ],
  },
  {
    question: 'Vite aur Webpack mein kya fundamental fark hai?',
    options: [
      { text: 'Vite sirf Vue ke liye hai', correct: false, explanation: 'Vite React, Vue, Svelte sab ke liye kaam karta hai.' },
      { text: 'Vite dev mein native ESM use karta hai — no bundling; Webpack sab kuch bundle karta hai', correct: true, explanation: 'Bilkul! Vite dev server instant start deta hai — ESM natively serve karta hai. Webpack har change pe re-bundle karta hai.' },
      { text: 'Webpack production ke liye better hai hamesha', correct: false, explanation: 'Vite production mein Rollup use karta hai — excellent output.' },
      { text: 'Vite TypeScript support nahi karta', correct: false, explanation: 'Vite TypeScript first-class support deta hai.' },
    ],
  },
  {
    question: 'ESLint aur Prettier mein kya role division hai?',
    options: [
      { text: 'Dono same kaam karte hain', correct: false, explanation: 'Alag concerns — overlap aur conflict bhi ho sakta hai.' },
      { text: 'ESLint: code quality aur bugs; Prettier: formatting aur style', correct: true, explanation: 'Sahi! ESLint unused variables, potential bugs catch karta hai. Prettier indentation, quotes, semicolons format karta hai.' },
      { text: 'ESLint sirf TypeScript ke liye hai', correct: false, explanation: 'ESLint JavaScript aur TypeScript dono ke liye kaam karta hai.' },
      { text: 'Prettier bugs dhundta hai', correct: false, explanation: 'Prettier purely formatter hai — logic nahi samjhta.' },
    ],
  },
  {
    question: 'Code splitting se kya faida hota hai?',
    options: [
      { text: 'Server side rendering faster hoti hai', correct: false, explanation: 'Code splitting primarily client-side bundle size ke baare mein hai.' },
      { text: 'Initial bundle size kam hoti hai — sirf zaroorat ka code load hota hai', correct: true, explanation: 'Bilkul! Dynamic import() se routes/features lazily load hote hain — first load fast, perceived performance better.' },
      { text: 'Database queries fast hoti hain', correct: false, explanation: 'Code splitting frontend optimization hai.' },
      { text: 'SEO automatically improve hoti hai', correct: false, explanation: 'SEO ke liye SSR/SSG bhi zaroori hai — sirf code splitting kaafi nahi.' },
    ],
  },
  {
    question: 'Environment variables production mein kaise handle karna chahiye?',
    options: [
      { text: 'Source code mein hardcode karo', correct: false, explanation: 'Never! Secrets source code mein — security breach.' },
      { text: 'Deployment platform ke env vars se inject karo — Vercel, Railway, Heroku settings', correct: true, explanation: 'Sahi! .env files local development ke liye, production mein platform settings ya secrets manager se inject karo.' },
      { text: '.env file git mein commit karo', correct: false, explanation: 'Kabhi nahi! .env file .gitignore mein honi chahiye hamesha.' },
      { text: 'Frontend mein directly use karo secret keys', correct: false, explanation: 'Frontend mein koi bhi variable public hota hai — secret keys kabhi client side mat bhejo.' },
    ],
  },
]

export default function JSChapter20Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          JS Capstone — Production-Ready JavaScript
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          20 chapters cover karne ke baad — ye capstone hai. Real-world JavaScript project mein kya chahiye: proper architecture, build tools, code quality tools, performance optimization, aur deployment. Ye sab milake production-grade application banate hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum end-to-end project setup cover karenge — jo aap template ki tarah use kar sako har naye project mein.
        </p>
      </div>

      <div id="project-architecture">
        <ConceptCard
          title="Project Architecture — Modular Design"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Good project architecture loose coupling aur high cohesion ensure karta hai. Features mein organize karo (feature-based) ya layers mein (layered architecture). Barrel files (index.js) clean imports dete hain. Dependency direction — outer layers inner layers pe depend karte hain, not vice versa. SOLID principles guide karte hain."
          whenToUse={[
            'Naya project start karte waqt — upfront structure decide karo',
            'Growing codebase — files disorganized ho rahe hain',
            'Team mein new developers add hone pe — onboarding ease',
            'Features independently develop ya deploy karne ho',
          ]}
          whyUseIt="Good architecture se features add karna easy hota hai — sahi jagah pata hoti hai. Bugs dhundna fast — responsibility clear hai. Tests likhna easy — dependencies manageable. Team collaboration smooth — parallel development possible. Technical debt avoid hota hai."
          howToUse={{
            filename: 'project-structure.txt',
            language: 'bash',
            code: `# Feature-based structure (recommended for large apps)
src/
  features/
    auth/
      components/    # UI components
      hooks/         # Custom hooks
      api.ts         # API calls
      store.ts       # State management
      types.ts       # TypeScript types
      index.ts       # Public API (barrel file)
    products/
      components/
      hooks/
      api.ts
      store.ts
      types.ts
      index.ts
    cart/
      ...
  shared/
    components/    # Reusable UI components
    hooks/         # Shared hooks
    utils/         # Pure utility functions
    types/         # Shared types
    constants/     # App-wide constants
    lib/           # Third-party integrations
  app/
    router.ts      # Routing configuration
    store.ts       # Root store
    App.tsx        # Root component
  assets/
    images/
    fonts/
  styles/
    globals.css
    theme.css

# Layered architecture (Node.js API)
src/
  controllers/    # HTTP request/response
  services/       # Business logic
  repositories/   # Data access
  models/         # Data types/schemas
  middleware/     # Express middleware
  utils/          # Helpers
  config/         # Configuration
  types/          # TypeScript types

# Barrel files — clean imports
# features/auth/index.ts
export { LoginForm } from './components/LoginForm'
export { useAuth } from './hooks/useAuth'
export { authApi } from './api'
export type { User, AuthState } from './types'

# Consumer:
import { LoginForm, useAuth } from '@/features/auth'
# Not: import { LoginForm } from '@/features/auth/components/LoginForm'`,
            explanation: 'Feature-based structure large apps ke liye — related code ek saath. Barrel files (index.ts) internal structure hide karte hain — public API clean. Layered architecture backend APIs ke liye — each layer single responsibility. Circular dependencies avoid karo — dependency graph tree honi chahiye.',
          }}
          realWorldScenario="E-commerce app: features/cart, features/products, features/checkout, features/auth — har feature apna state, components, API calls manage karta hai. Team A cart kaam kare, Team B checkout — minimal conflicts. Feature flags se features independently deploy karo."
          commonMistakes={[
            {
              mistake: 'Sab kuch utils/ mein daalna',
              why: 'utils/ god folder ban jaata hai — kuch bhi dhundna mushkil.',
              fix: 'utils sirf pure, generic utilities ke liye. Domain-specific logic feature folder mein. Specific names: formatters/, validators/, converters/.',
            },
            {
              mistake: 'Layers ke beech circular dependencies',
              why: 'service → repository → service — circular import, Node.js undefined exports de sakta hai.',
              fix: 'Dependency direction enforce karo — controllers → services → repositories. Shared types alag layer mein.',
            },
          ]}
          proTip="eslint-plugin-import se import boundaries enforce karo. no-restricted-imports rule se features apne boundaries mein rakho. Module Federation (Webpack 5) ya Native Federation se micro-frontend architecture — independent deployment per feature."
        />
      </div>

      <div id="build-tools">
        <ConceptCard
          title="Build Tools — Vite, esbuild, Bundling"
          emoji="⚙️"
          difficulty="advanced"
          whatIsIt="Build tools source code ko production-ready bundle mein transform karte hain. Vite (dev + Rollup build) — fast HMR, native ESM dev server. esbuild — Go mein likha, 100x faster than Webpack. Bundling concepts: tree shaking, code splitting, minification, source maps. tsup library packages bundle karta hai."
          whenToUse={[
            'Frontend app: Vite — zero config, fast, modern',
            'Library publish karna: tsup ya Rollup',
            'Node.js production: esbuild ya tsc',
            'Legacy app: Webpack (migration path Vite mein)',
          ]}
          whyUseIt="Vite dev server HMR instant hai — change karo, browser update. Production build Rollup use karta hai — excellent tree shaking. esbuild Go mein hai — Webpack se 100x faster build. Bundle analyzer se unnecessarily large dependencies dhundo. Source maps production debugging enable karte hain."
          howToUse={{
            filename: 'build-setup.ts',
            language: 'typescript',
            code: `// ── VITE CONFIGURATION ───────────────────────────────────────────
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  // Path aliases — clean imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@features': resolve(__dirname, './src/features'),
      '@shared': resolve(__dirname, './src/shared'),
    },
  },

  // Build optimizations
  build: {
    target: 'es2022',
    sourcemap: true,  // Production debugging

    rollupOptions: {
      output: {
        // Manual code splitting
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash-es', 'date-fns'],
        },
      },
    },
  },

  // Dev server
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})

// ── TSUP — Library bundling ───────────────────────────────────────
// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],        // Both formats
  dts: true,                      // TypeScript declarations
  sourcemap: true,
  clean: true,
  minify: false,                  // Library — consumers minify
  external: ['react', 'react-dom'],  // Peer deps
})

// ── ESBUILD — Node.js fast build ─────────────────────────────────
// build.js
import { build } from 'esbuild'

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: 'dist/index.js',
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['pg', 'redis', 'express'],  // Don't bundle node_modules
})

// ── BUNDLE ANALYSIS ───────────────────────────────────────────────
// npm install --save-dev rollup-plugin-visualizer
// vite.config.ts:
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  react(),
  visualizer({
    open: true,           // Browser mein auto-open
    gzipSize: true,
    filename: 'stats.html',
  }),
]

// vite build — stats.html generate hoga — pie chart of bundle`,
            explanation: 'Vite zero-config React setup ke liye best. Path aliases se @/components/Button readable import. manualChunks se vendor code alag chunk — browser cache karta hai. tsup library publish ke liye — CJS aur ESM dono. esbuild Node.js backend ke liye — fast. Visualizer se bundle analyze karo.',
          }}
          realWorldScenario="React app ki initial bundle 2MB thi — slow load. Visualizer se pata chala: moment.js 280KB, unused icon library 400KB. moment.js → date-fns replace kiya (tree-shakeable), icon library → specific icons import. Bundle 800KB tak aaya — 60% reduction."
          commonMistakes={[
            {
              mistake: 'Library ko bundle mein include karna (lodash, react)',
              why: 'Bundle size bahut bada — users already yahi download kar chuke hain dusri sites se.',
              fix: 'external: ["react", "lodash"] — peer dependencies bundle mein mat daalo. Library consumers ke paas honi chahiye.',
            },
            {
              mistake: 'Source maps production mein disable karna',
              why: 'Production bug debug karna impossible — minified code mein stack traces useless.',
              fix: 'sourcemap: true production mein bhi. Source maps hosting — Sentry automatically upload kar sakta hai.',
            },
          ]}
          proTip="Bun build bhi excellent hai — Zig mein likha, esbuild se bhi faster. TurboPack Vercel ka bundler hai — Next.js mein built-in. PWA ke liye: vite-plugin-pwa se service worker auto-generate. Module Federation production-level micro-frontend ke liye."
        />
      </div>

      <div id="code-quality">
        <ConceptCard
          title="Code Quality — ESLint, Prettier, Git Hooks"
          emoji="✨"
          difficulty="advanced"
          whatIsIt="Code quality tools ensure karte hain ki codebase consistent aur bug-free rahe. ESLint bugs aur anti-patterns catch karta hai. Prettier formatting automate karta hai — tabs vs spaces war khatam. Husky pre-commit hooks se commit hone se pehle checks run karo. lint-staged sirf changed files pe run karo — fast."
          whenToUse={[
            'Naya project setup — day 1 se configure karo',
            'Team mein coding standards enforce karne ko',
            'Pre-commit checks — bad code commit nahi hoga',
            'CI/CD pipeline mein quality gates',
          ]}
          whyUseIt="Consistent code style cognitive load reduce karta hai — sirf logic pe focus. ESLint console.log forgetting, undefined variables, React hook violations catch karta hai. Pre-commit hooks ensure karte hain ki broken code main branch pe nahi jaata. Prettier discussions end karta hai — auto-format."
          howToUse={{
            filename: '.eslintrc.json',
            language: 'json',
            code: `// ── ESLINT CONFIGURATION ─────────────────────────────────────────
// .eslintrc.json
{
  "root": true,
  "env": { "browser": true, "es2022": true, "node": true },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"  // Prettier conflicts disable karo
  ],
  "plugins": ["@typescript-eslint", "react-hooks", "import"],
  "rules": {
    "no-console": "warn",          // console.log remind karo remove karne
    "no-unused-vars": "off",       // TypeScript version use
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-circular-dependency": "error"
  }
}

// ── PRETTIER CONFIGURATION ────────────────────────────────────────
// .prettierrc
{
  "semi": false,           // No semicolons (your preference)
  "singleQuote": true,     // Single quotes
  "tabWidth": 2,
  "trailingComma": "es5",  // Trailing commas where valid
  "printWidth": 100,
  "arrowParens": "avoid"   // x => x instead of (x) => x
}

// ── HUSKY + LINT-STAGED ───────────────────────────────────────────
// package.json scripts:
// "prepare": "husky install"

// .husky/pre-commit:
// npx lint-staged

// package.json lint-staged config:
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}

// ── COMPLETE PACKAGE.JSON SCRIPTS ────────────────────────────────
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "prepare": "husky install"
  }
}`,
            explanation: 'eslint:recommended + @typescript-eslint/recommended strong base. prettier extends karo last — Prettier ke saath conflict wale ESLint rules disable. lint-staged sirf changed files pe run — fast. pre-commit hook: lint, format, type-check — bad code nahi jaata. CI mein same checks independently run karo.',
          }}
          realWorldScenario="Team mein ek developer tabs, doosra spaces use karta tha — PR reviews mein formatting changes. Prettier setup kiya — ab sab kuch auto-format. Merge conflicts purely logic related — no formatting noise. ESLint se unused imports, missing deps in useEffect automatically caught."
          commonMistakes={[
            {
              mistake: 'Prettier aur ESLint formatting rules conflict karna',
              why: 'ESLint indent rule 2 spaces, Prettier 4 spaces — constant conflicts.',
              fix: 'eslint-config-prettier install karo aur extends array mein last rakho — Prettier ke saath conflicting rules disable karta hai.',
            },
            {
              mistake: 'Pre-commit hooks skip karna --no-verify se',
              why: 'Hooks bypass karne ki habit — quality gates khatam.',
              fix: 'CI mein bhi same checks run karo — commit pe nahi toh CI fail. No escape.',
            },
          ]}
          proTip="commitlint se commit messages enforce karo: feat:, fix:, chore:, docs: prefixes. Conventional commits se CHANGELOG auto-generate hoti hai. semantic-release se version bump aur npm publish automatic. Changesets monorepo mein package versioning manage karta hai."
        />
      </div>

      <div id="performance-checklist">
        <ConceptCard
          title="Performance Checklist — Ship Fast Code"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Production JavaScript performance ke liye: lazy loading (route-based code splitting), tree shaking (unused code eliminate), image optimization, caching strategies, bundle size monitoring, Core Web Vitals tracking. Performance budget set karo — bundle X KB se zyada nahi, LCP < 2.5s."
          whenToUse={[
            'Pre-launch performance audit',
            'Core Web Vitals poor hain — improve karo',
            'Bundle size 500KB+ cross ho raha hai',
            'Users slow experience report kar rahe hain',
          ]}
          whyUseIt="Performance directly revenue affect karta hai — 100ms delay = 1% conversion drop (Amazon research). Core Web Vitals Google ranking factor hain. First Contentful Paint < 1.8s, LCP < 2.5s, CLS < 0.1 — targets hain. Performance budget CI se enforce karo — regression alert."
          howToUse={{
            filename: 'performance.ts',
            language: 'typescript',
            code: `// ── CODE SPLITTING — Dynamic imports ─────────────────────────────

// React lazy loading
import { lazy, Suspense } from 'react'

// ❌ Static import — always in bundle
import HeavyChart from './HeavyChart'

// ✅ Lazy — load when rendered
const HeavyChart = lazy(() => import('./HeavyChart'))
const AdminPanel = lazy(() => import('./AdminPanel'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyChart />
    </Suspense>
  )
}

// Route-based splitting (React Router):
const routes = [
  { path: '/', element: lazy(() => import('./pages/Home')) },
  { path: '/dashboard', element: lazy(() => import('./pages/Dashboard')) },
  { path: '/admin', element: lazy(() => import('./pages/Admin')) },
]

// ── TREE SHAKING — Named imports ─────────────────────────────────
// ❌ Lodash — imports everything!
import _ from 'lodash'
_.debounce(fn, 300)

// ✅ Lodash-es — tree-shakeable
import { debounce } from 'lodash-es'
debounce(fn, 300)

// ✅ Even better — custom implementation
function debounce(fn, delay) { /* small, no dependency */ }

// ── IMAGE OPTIMIZATION ────────────────────────────────────────────
// Next.js Image component
import Image from 'next/image'
<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority  // Above fold — eager load
  loading="lazy"  // Below fold
/>

// ── CACHING STRATEGIES ────────────────────────────────────────────
// HTTP Cache headers (server-side):
// Static assets — long cache + content hash
// Cache-Control: public, max-age=31536000, immutable  (1 year)
// app.ab12cd.js  // Content hash in filename

// API responses — shorter cache
// Cache-Control: public, max-age=60, stale-while-revalidate=300

// Service Worker caching:
const CACHE_NAME = 'v1'
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()))
        return response
      })
    })
  )
})

// ── PERFORMANCE BUDGET ────────────────────────────────────────────
// vite.config.ts — build warnings
build: {
  chunkSizeWarningLimit: 500,  // 500KB warn
  rollupOptions: {
    output: {
      manualChunks: (id) => {
        if (id.includes('node_modules')) return 'vendor'
      }
    }
  }
}

// bundlesize package.json config:
{
  "bundlesize": [
    { "path": "./dist/assets/*.js", "maxSize": "200 kB" },
    { "path": "./dist/assets/*.css", "maxSize": "50 kB" }
  ]
}`,
            explanation: 'React.lazy + Suspense — route components lazily load. Named imports tree shaking enable karte hain — lodash-es lodash se better. Content hash filenames cache invalidation handle karte hain. bundlesize CI mein bundle regression prevent karta hai. Service worker caching offline support aur speed dono.',
          }}
          realWorldScenario="Dashboard app: 500KB initial bundle tha. Lazy load kiya chart libraries — sirf dashboard page pe. moment.js hata ke date-fns ke liye — 150KB save. Vendor chunk alag — React repeat download nahi hota next visit. Result: 320KB initial bundle, LCP 1.8s se 0.9s."
          commonMistakes={[
            {
              mistake: 'Lazy load karna components jo immediately visible hain (above fold)',
              why: 'Hero section, navbar — lazy load se delay, layout shift, bad UX.',
              fix: 'Above fold content eager load. Below fold, routes, modals — lazy load. Suspense fallback meaningful ho.',
            },
            {
              mistake: 'Bundle size monitor nahi karna over time',
              why: 'Dheere dheere dependencies add hoti hain — ek din bundle 2x ho jaata hai bina pata chale.',
              fix: 'bundlesize ya bundle-buddy CI mein setup karo. PRs mein bundle size change dikhao. Performance budget set karo.',
            },
          ]}
          proTip="Partytown library third-party scripts (analytics, chat widgets) web worker mein run karta hai — main thread free. OffscreenCanvas heavy canvas operations worker mein. preload/prefetch hints — kritische resources pehle se load karo. Resource hints: <link rel='preconnect' href='https://fonts.googleapis.com'>."
        />
      </div>

      <div id="deployment">
        <ConceptCard
          title="Deployment — Code Ko Duniya Mein Bhejo"
          emoji="🌍"
          difficulty="advanced"
          whatIsIt="Production deployment mein: static hosting (Vercel, Netlify), CDN distribution, environment variables secure management, CI/CD pipelines, health checks, rollback strategy. Containerization (Docker) portable deployments deta hai. Edge functions — CDN pe code run karo, global latency."
          whenToUse={[
            'Frontend apps — Vercel, Netlify — zero config',
            'Full-stack Node.js — Railway, Render, AWS',
            'Enterprise — Docker + Kubernetes',
            'Edge computing — Cloudflare Workers, Vercel Edge',
          ]}
          whyUseIt="Proper deployment se zero-downtime updates, easy rollbacks, environment isolation milti hai. CDN se assets globally fast serve hote hain. Environment variables se secrets safe rehti hain. CI/CD se manual deploy errors eliminate. Health checks se broken deployments automatically detect aur rollback."
          howToUse={{
            filename: '.github/workflows/deploy.yml',
            language: 'yaml',
            code: `# ── GITHUB ACTIONS CI/CD PIPELINE ────────────────────────────────
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test -- --coverage --ci
      - run: npm run build

  deploy:
    needs: quality
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

# ── DOCKER — Production Node.js ────────────────────────────────────
# Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

# Dependencies layer (cached separately)
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build layer
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image — smallest possible
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

USER nodejs
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]

# .env.example — commit this, NOT .env!
# DATABASE_URL=postgresql://user:password@host:5432/dbname
# JWT_SECRET=your-super-secret-key
# API_KEY=your-third-party-api-key
# NODE_ENV=production`,
            explanation: 'CI/CD pipeline: quality checks (lint, type-check, test) → build → deploy. Sirf main branch deploy. Docker multi-stage build — production image minimal. HEALTHCHECK se deployment health verify. Secrets GitHub Secrets mein — never in code. .env.example commit karo, .env kabhi nahi.',
          }}
          realWorldScenario="Naya feature push kiya — GitHub Actions automatically tests run kare, build kare, Vercel pe preview deploy kare. PR merge karo — production automatically update ho. Agar tests fail toh deploy nahi hota. Zero manual steps, zero human error."
          commonMistakes={[
            {
              mistake: '.env file git mein commit karna',
              why: 'All secrets exposed — API keys, DB passwords, JWT secrets. Critical security breach.',
              fix: '.gitignore mein .env* (sabhi env files). .env.example commit karo without real values. Production pe platform environment variables use karo.',
            },
            {
              mistake: 'No health check endpoint',
              why: 'Deployment succeed dikhega lekin app actually broken ho — no detection.',
              fix: 'GET /health endpoint implement karo — DB connection check, critical services check. Return 200 if healthy, 500 otherwise. Container HEALTHCHECK.',
            },
          ]}
          proTip="Vercel aur Netlify preview deployments har PR ke liye automatic banate hain — QA easy. Feature flags (LaunchDarkly, Unleash) se code deploy karo pehle, feature enable karo baad mein — zero-downtime gradual rollout. Blue-green deployment — dono versions live, traffic gradually shift karo."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 20 Quiz — JS Capstone
          </h3>
          <p className="text-sm text-[#71717A]">
            Final JavaScript quiz — production developer bano!
          </p>
        </div>
        <QuizSection questions={capstoneQuiz} chapterSlug="js-capstone" />
      </div>
    </div>
  )
}
