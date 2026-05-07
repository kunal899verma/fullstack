'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const dockerQuiz = [
  {
    question: 'Multi-stage Docker build kyun use karte hain?',
    options: [
      { text: 'Development aur production dono mein same image use karne ke liye', correct: false, explanation: 'Multi-stage builds production image ko lean banate hain — dev tools include nahi hote.' },
      { text: 'Production image size minimize karne ke liye — build tools final image mein nahi jaate', correct: true, explanation: 'Sahi! Builder stage mein TypeScript compile karo, final stage mein sirf compiled JS aur node_modules — image 10x smaller.' },
      { text: 'Docker Compose ke liye zaroori hai', correct: false, explanation: 'Multi-stage builds Docker Compose se independent hain.' },
      { text: 'Multiple operating systems support karne ke liye', correct: false, explanation: 'Multi-platform builds alag concept hai — multi-stage builds layer optimization ke liye hain.' },
    ],
  },
  {
    question: '.dockerignore kya karta hai?',
    options: [
      { text: 'Container mein files delete karta hai', correct: false, explanation: '.dockerignore COPY context se files exclude karta hai — container run mein kuch delete nahi karta.' },
      { text: 'Docker build context se files exclude karta hai — node_modules, .git, .env', correct: true, explanation: 'Correct! .dockerignore bina build context slow aur large hota hai. node_modules especially important hai exclude karne ke liye.' },
      { text: 'Sirf security ke liye hai', correct: false, explanation: 'Performance benefit bhi hai — build context size smaller, faster uploads.' },
      { text: '.gitignore se automatically sync hota hai', correct: false, explanation: '.dockerignore alag file hai — manually maintain karna padta hai.' },
    ],
  },
  {
    question: 'Docker Compose mein volumes kyun use karte hain development mein?',
    options: [
      { text: 'Production deployment ke liye', correct: false, explanation: 'Development volumes hot-reload ke liye hain — production mein built image use hoti hai.' },
      { text: 'Host code changes container mein reflect hone ke liye — code rebuild na karna pade', correct: true, explanation: 'Bilkul sahi! Volume mount karo host directory ko — file save hote hi container mein visible, server auto-restart kare nodemon se.' },
      { text: 'Database data backup ke liye sirf', correct: false, explanation: 'DB persistence ke liye bhi use hota hai, lekin development mein hot-reload primary use case hai.' },
      { text: 'Security improve karne ke liye', correct: false, explanation: 'Volumes security concern nahi hain primarily.' },
    ],
  },
  {
    question: 'NODE_ENV=production set karne se kya hota hai?',
    options: [
      { text: 'Kuch nahi — sirf convention hai', correct: false, explanation: 'NODE_ENV production behavior affect karta hai — Express ne bhi check karta hai.' },
      { text: 'Dev dependencies install nahi hoti, Express production mode mein behave karta hai', correct: true, explanation: 'Sahi! npm ci --only=production se devDependencies skip. Express error details hide karta hai, views cache karta hai.' },
      { text: 'App automatically HTTPS use karta hai', correct: false, explanation: 'HTTPS NODE_ENV se automatic nahi hota — explicitly configure karna padta hai.' },
      { text: 'Docker build automatically optimize hota hai', correct: false, explanation: 'Docker optimization alag hai — Dockerfile likhna padta hai manually.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter22Content() {
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
          Docker — "Works On My Machine" Ka Ant!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          &ldquo;Mere machine par toh chal raha tha!&rdquo; — ye chhah shabd tumne sune honge ya khud bole honge. Node.js version mismatch, missing native dependencies, alag OS configurations — production server pe app crash. <strong className="text-[#F5F5F7]">Docker ne ye excuse hamesha ke liye band kar diya.</strong>
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Docker ek shipping container ki tarah hai. Same container — developer laptop, CI server, AWS EC2, kahi bhi — same behavior. Dockerfile app ka recipe hai, image ek sealed package hai, container ek running instance hai. Is chapter mein production-ready Dockerfile likhna, Docker Compose se full stack local chalana, GitHub Actions CI/CD, Nginx reverse proxy, aur zero-downtime deployment master karenge.
        </p>
      </div>

      {/* ConceptCard 1: Docker for Node.js */}
      <div id="dockerfile">
        <ConceptCard
          title="Docker for Node.js"
          emoji="🐳"
          difficulty="advanced"
          whatIsIt="Docker container ek sealed lunch box hai — ander food (app), plate (runtime), napkin (dependencies) — sab kuch. Kisi ko bhi do — woh exactly wahi milega jo tumne pack kiya. Dockerfile recipe hai — step by step instructions: kaunsa base image, kaunsi files copy karo, kya install karo, kaise run karo. Docker image ek snapshot hai — immutable, versioned. Container ek running instance hai — ek image se hazaron containers."
          whenToUse={[
            'App deploy karna hai — server par consistent, reproducible environment chahiye',
            'Team mein development standardize karna — docker compose up, sab ready',
            'Multiple Node.js versions different projects ke liye — containers isolate karte hain',
            'Microservices — har service ka alag container, alag lifecycle',
          ]}
          whyUseIt="Bina Docker ke horror story: server par Node 16 hai, app ko Node 20 chahiye, package manager alag hai, native module compile nahi ho raha, deployment team DevOps se argue kar raha hai. Docker ke baad: Dockerfile mein FROM node:20-alpine — everywhere same. Developer machine pe test karo, CI pe same image build hogi, production pe same image run hogi. Immutable infrastructure — no snowflake servers. Rollback? Purani image tag, ek command."
          howToUse={{
            filename: 'Dockerfile',
            language: 'dockerfile',
            code: `# ── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Package files pehle copy karo — layer caching ke liye
COPY package*.json ./

# Only production dependencies
RUN npm ci --only=production

# ── Stage 2: Production Image ────────────────────────────────────────────────
FROM node:20-alpine

# Security: non-root user
WORKDIR /app

# Builder se node_modules copy karo
COPY --from=builder /app/node_modules ./node_modules

# Source code copy karo
COPY . .

# Security: root se nahi chalana
USER node

# Port expose karo (documentation only — publish separately)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# App start karo
CMD ["node", "src/index.js"]`,
            explanation: 'Multi-stage build trace karo: Stage 1 (builder) — full Node.js + npm + all tools, npm ci run karo, dependencies install. Stage 2 (production) — fresh alpine, builder se sirf node_modules copy karo, source code copy karo. Dev tools? Nahi gaye. TypeScript compiler? Nahi gaya. Final image sirf jo runtime chahiye. USER node — root se nahi chalana. HEALTHCHECK — Docker khud monitor karta hai, unhealthy container restart karta hai.',
          }}
          realWorldScenario="Startup ka Node.js API pehla image 850MB tha — ECR pe push 8 minute, EC2 pe pull 3 minute. Multi-stage alpine Dockerfile: 95MB! Deploy time 90 second. ECR storage cost 90% kam, data transfer cost 90% kam. Rollback? Purani image tag — docker pull, docker run — 30 second. Ek Dockerfile rewrite ne deploy workflow completely change kar diya."
          commonMistakes={[
            {
              mistake: 'node_modules host se container mein COPY karna',
              why: 'Host machine ke node_modules platform-specific hote hain — Linux container mein native modules crash kar sakte hain.',
              fix: '.dockerignore mein node_modules add karo. Container mein npm ci se fresh install — correct platform ke liye.',
            },
            {
              mistake: 'Secrets Dockerfile mein ya image mein',
              why: 'Docker image layers immutable hain — secret image mein hamesha rehta hai even agar baad mein remove karo.',
              fix: 'Environment variables runtime par inject karo — docker run -e SECRET=value ya docker-compose.yml environment section.',
            },
          ]}
          proTip="Layer caching — ye Docker ka sabse underused superpower hai. Order matter karta hai: pehle package.json copy karo, npm ci run karo, phir src copy karo. Kyun? Agar sirf source code change hai, Docker package.json + npm ci layers cache se lega — rebuild nahi hoga. Build time 3 minute se 20 second. Ek simple reordering se CI pipeline 9x faster. Ye magic nahi — ye understanding hai."
        />
      </div>

      {/* ConceptCard 2: Docker Compose */}
      <div id="docker-compose">
        <ConceptCard
          title="Docker Compose — Multi-Service Setup"
          emoji="🎻"
          difficulty="advanced"
          whatIsIt="Docker Compose ek conductor hai — multiple musicians (containers) ko ek saath direct karta hai. Node.js app + MongoDB + Redis + Nginx — sab alag containers, sab ek network mein, ek YAML file se manage. docker compose up ek command se poori orchestra ready. docker compose down se sab clean. Developer ka dream: koi manual setup nahi, koi 'README par 15 steps install karo' nahi."
          whenToUse={[
            'Development environment — Node + DB + Redis + everything locally, ek command mein',
            'Integration testing — real services ke saath test karo, mock nahi',
            'Small single-server production deployments',
            'Demo environments — client ko dikhao, pure environment spin up karo',
          ]}
          whyUseIt="Naya developer join kiya. Bina Docker Compose: README padho, Node install karo, MongoDB install karo, Redis install karo, environment variables set karo — 2 ghante. Docker Compose ke saath: git clone, docker compose up — 10 minutes. Sab kuch version controlled, sab kuch reproducible. Team mein 'works on my machine' problem permanently solved. Environment drift banda — har developer same exact environment chalata hai."
          howToUse={{
            filename: 'docker-compose.yml',
            language: 'yaml',
            code: `version: '3.9'

services:
  # ── Node.js App ─────────────────────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev  # Dev Dockerfile (with nodemon)
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-secret-only
    volumes:
      - .:/app               # Hot reload — host code → container
      - /app/node_modules    # node_modules is container se
    depends_on:
      mongo:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

  # ── MongoDB ─────────────────────────────────────────────────────────────
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"        # Local access ke liye
    volumes:
      - mongo_data:/data/db  # Data persist karo
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      retries: 5

  # ── Redis ────────────────────────────────────────────────────────────────
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 3

  # ── Mongo Express (DB UI) ────────────────────────────────────────────────
  mongo-express:
    image: mongo-express:latest
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo
    depends_on:
      - mongo

volumes:
  mongo_data:
  redis_data:`,
            explanation: 'Step by step usage: docker compose up -d — background mein start. docker compose logs -f app — logs tail karo. docker compose ps — running containers dekho. File change? App container mein hot reload (volumes mount ki wajah se). DB schema change? docker compose down -v — volumes bhi delete. docker compose up phir — fresh DB. One important trick: volumes: /app/node_modules (anonymous volume) — host ke node_modules container ke node_modules override na karein.',
          }}
          realWorldScenario="8 developers ki team — har kisi ke machine par alag environment tha. 'Node version mismatch', 'Redis nahi hai mere machine par', 'MongoDB version different' — roz ki problems. Docker Compose add kiya. Pehle din: docker compose up — sab live. Naya developer join kiya, 10 minutes mein full stack running. Integration bugs 80% reduce — kyunki environment production se match karta tha. Sabse zyada savings: onboarding time 2 days se 30 minutes."
          commonMistakes={[
            {
              mistake: 'Production mein docker compose use karna without proper setup',
              why: 'Docker Compose single machine ke liye hai — no high availability, no rolling updates, no auto-healing.',
              fix: 'Production ke liye Kubernetes, ECS, ya Docker Swarm use karo. Compose sirf development ya small single-server deployments ke liye.',
            },
            {
              mistake: 'Volume mount karna node_modules ke liye galat tarike se',
              why: 'volumes: .:/app bind mount sabse pehle hota hai — host ka khaali node_modules container ke node_modules override kar deta hai.',
              fix: 'Anonymous volume use karo: - /app/node_modules — ye container ke node_modules protect karta hai host se.',
            },
          ]}
          proTip="Profiles feature use karo — profiles: [tools] set karo mongo-express, pgadmin jaisi optional services par. docker compose up sirf core services start karega. docker compose --profile tools up se tools bhi. RAM save hoti hai, startup fast hota hai. Aur ek shortcut: docker compose watch (newer feature) se hot reload bhi Compose level par manage hoti hai — volumes manually configure nahi karne padte."
        />
      </div>

      {/* ConceptCard 3: GitHub Actions */}
      <div id="github-actions">
        <ConceptCard
          title="GitHub Actions CI/CD"
          emoji="⚙️"
          difficulty="advanced"
          whatIsIt="GitHub Actions ek robot hai jo tumhare liye kaam karta hai — code push hone par automatically jagta hai, tests run karta hai, Docker image build karta hai, server par deploy karta hai. Sab kuch YAML file mein define hai — .github/workflows/deploy.yml. Ye CI/CD (Continuous Integration / Continuous Deployment) hai — code merge karo, deployment automatically ho jaata hai, zero manual SSH karo."
          whenToUse={[
            'Har PR par tests automatically run karo — broken code main mein nahi jaana chahiye',
            'Main branch push hone par production deploy karo — push = deploy',
            'Docker image build aur registry push automate karo — manual docker build khatam',
            'Staging aur production alag-alag environments — same pipeline, different targets',
          ]}
          whyUseIt="Manual deployment ki kahani: Developer SSH karta hai server par, git pull, npm install, pm2 restart — 15 minutes. Teen baar mein ek baar kuch galat hota hai — wrong branch pull, npm install fail, downtime. GitHub Actions se: code push karo, chai peeyo, 5 minutes mein production live. Audit trail milti hai — kaun ne kab kya deploy kiya. Rollback? Purani commit pe workflow manually trigger. Ye speed + reliability + visibility — teeno saath."
          howToUse={{
            filename: '.github/workflows/deploy.yml',
            language: 'yaml',
            code: `name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # ── Job 1: Test ────────────────────────────────────────────────────────
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  # ── Job 2: Build & Push Docker Image ───────────────────────────────────
  build:
    needs: test         # Test pass hone ke baad hi
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'  # Sirf main branch par
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build & Push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest,\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # ── Job 3: Deploy to Production ─────────────────────────────────────────
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production    # GitHub environment protection rules

    steps:
      - name: Deploy to Server
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull ghcr.io/\${{ github.repository }}:latest
            docker stop myapp || true
            docker rm myapp || true
            docker run -d --name myapp \\
              -p 3000:3000 \\
              -e DATABASE_URL=\$DATABASE_URL \\
              --restart unless-stopped \\
              ghcr.io/\${{ github.repository }}:latest`,
            explanation: 'Pipeline trace karo: push to main → test job starts → npm ci, lint, test → pass? build job starts (needs: test) → Docker image build → GHCR push → deploy job starts (needs: build) → SSH to server → docker pull latest → docker stop old → docker run new. Har step fail hone par pipeline rukti hai — broken code production nahi jaata. cache-from/to: type=gha se Docker layers GitHub cache mein store — repeat builds 3 min se 20 sec.',
          }}
          realWorldScenario="Team mein manual deployment tha. Developer SSH karta tha, git pull, npm install, pm2 restart — 15 minute process. Week mein 2-3 errors — wrong branch, partial npm install. GitHub Actions pipeline: push to main, chai peeyo, 4 minute mein production live, full audit log, zero human errors. Developer ne itna time bacha liya ki usne usi time mein ek naya feature build kar diya. CI/CD ek multiplier hai — team output badhta hai bina headcount badhaye."
          commonMistakes={[
            {
              mistake: 'Secrets directly workflow YAML mein likhna',
              why: 'YAML file git mein hai — secrets permanently exposed ho jaate hain.',
              fix: 'GitHub Settings → Secrets and variables → Actions → New secret. Workflow mein ${{ secrets.SECRET_NAME }} se use karo.',
            },
            {
              mistake: 'Deploy job mein test skip karna speed ke liye',
              why: 'Broken code production mein jaata hai — downtime, angry users.',
              fix: 'needs: test aur needs: build always rakho deploy job mein. "Fast" deployment broken deployment se better nahi hai.',
            },
          ]}
          proTip="GitHub Environments set karo — Settings → Environments → production → Required reviewers. Ab production deploy hone se pehle designated reviewer approve karega. Ye one extra step bahut badi mistakes rokta hai. Deployment branches restrict karo — sirf main branch se production deploy ho sake. Ye maturity hai — speed aur safety dono."
        />
      </div>

      {/* Akshay-style Q&A interlude */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <p className="text-[#F5F5F7] font-semibold mb-2">Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          "App Docker mein hai, CI/CD set ho gayi — toh kya seedha port 3000 internet pe expose karein?" Bilkul nahi! Node.js ko directly internet pe expose karna risky hai — root access chahiye port 80 ke liye, SSL certificate manage karna mushkil hai, static files serve karna inefficient hai. Nginx — ek proven, battle-tested reverse proxy — aage rakho. Node.js ko shield karo.
        </p>
      </div>

      {/* ConceptCard 4: Nginx */}
      <div id="nginx">
        <ConceptCard
          title="Nginx Reverse Proxy"
          emoji="🌐"
          difficulty="advanced"
          whatIsIt="Nginx ek bouncer cum traffic cop hai — internet aur Node.js ke beech. HTTP port 80 par request aaya? Nginx leta hai, HTTPS par redirect karta hai. HTTPS par aaya? SSL decrypt karta hai, Node.js ko plain HTTP forward karta hai. Static file maanga? Nginx seedha disk se deta hai — Node.js tak request jaati hi nahi. Multiple Node instances hain? Nginx load balance karta hai — ek simple upstream block mein."
          whenToUse={[
            'Production mein Node.js serve karna — SSL termination aur HTTP/2 ke saath',
            'Multiple Node.js instances ke beech load balancing',
            'Static files (images, CSS, JS) serve karna — Node.js ke 10x fast',
            'WebSocket proxying — real-time apps ke liye Upgrade headers set karna zaroori',
          ]}
          whyUseIt="Node.js ko seedha port 80 pe chalana: root access chahiye (security risk), ek hi instance (no load balancing), SSL certificates manually manage karo. Nginx ke saath: non-root user, battle-tested SSL (certbot ek command), gzip compression automatic, static files C language ki speed pe serve. Nginx ek C-written, 20+ saal battle-tested tool hai — Node.js uske liye sirf ek upstream server hai."
          howToUse={{
            filename: 'nginx.conf',
            language: 'nginx',
            code: `# /etc/nginx/sites-available/myapp

upstream node_app {
    # Multiple Node instances — load balancing
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;  # Optional: PM2 cluster ports
    keepalive 64;
}

server {
    listen 80;
    server_name api.myapp.com;

    # HTTP → HTTPS redirect
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.myapp.com;

    # SSL — Let's Encrypt (certbot ne configure kiya)
    ssl_certificate /etc/letsencrypt/live/api.myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.myapp.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain application/json application/javascript text/css;

    # Static files — Node.js bypass karo
    location /static/ {
        alias /var/www/myapp/public/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Node.js app proxy
    location / {
        proxy_pass http://node_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;      # WebSocket
        proxy_set_header Connection 'upgrade';       # WebSocket
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }
}`,
            explanation: 'Config trace karo: listen 80 → return 301 https → SSL terminated → proxy_pass upstream. upstream block mein multiple servers — round-robin load balancing automatic. proxy_set_header X-Forwarded-For — Node.js mein req.ip real client IP dega nahi toh Nginx ka IP milega. WebSocket ke liye Upgrade + Connection headers critical — bina inke WebSocket connection upgrade nahi hoga.',
          }}
          realWorldScenario="Production Node.js app seedha port 3000 par — no SSL, no compression. Users HTTP pe the — insecure. Nginx add kiya: certbot --nginx se free Let's Encrypt SSL, gzip compression se JSON responses 70% smaller, static /public/ folder Nginx se serve — Node.js tak request nahi. API server load 40% down. Performance up, security up, cost down. Nginx ek investment hai jo immediately pays off."
          commonMistakes={[
            {
              mistake: 'proxy_set_header Host set nahi karna',
              why: 'Node.js ko pata nahi chalta ki request kahan se aayi — virtual hosting, redirects, aur CORS galat kaam karte hain.',
              fix: 'proxy_set_header Host $host; hamesha set karo. X-Forwarded-For bhi set karo real IP ke liye.',
            },
            {
              mistake: 'nginx -t test skip karna config change ke baad',
              why: 'Galat Nginx config se service restart nahi hogi — downtime.',
              fix: 'nginx -t se test karo pehle. Sab OK hone par sudo systemctl reload nginx — no downtime.',
            },
          ]}
          proTip="certbot --nginx -d api.myapp.com — ye command SSL install karta hai, Nginx config update karta hai, auto-renewal cron job set karta hai. Free SSL, ek command. Baad mein ssllabs.com pe check karo — A+ grade target karo. nginx -t hamesha config test karo badlav ke baad — galat config se service restart nahi hogi, downtime hoga. Test first, reload second."
        />
      </div>

      {/* ConceptCard 5: Zero-Downtime Deployment */}
      <div id="zero-downtime">
        <ConceptCard
          title="Zero-Downtime Deployment"
          emoji="🔄"
          difficulty="advanced"
          whatIsIt="Zero-downtime deployment — sochte hain ye kya hai? Simple: app update karo, user ko feel hi na ho. PM2 cluster mode ke 4 instances hain — reload command pe ek ek karke restart hote hain, always at least 3 instances alive. Blue-green deployment alag strategy hai — do complete environments (blue aur green), traffic switch karo — instant rollback possible hai. Kubernetes natively rolling update karta hai."
          whenToUse={[
            'Production app 24/7 available rehni chahiye — koi maintenance window acceptable nahi',
            'Frequent deployments karo — din mein 10 baar deploy karo bina downtime ke',
            'Critical applications — banking, healthcare, e-commerce — ek second ka downtime unacceptable',
            'Kisi bhi production app ke liye — downtime = revenue loss + user frustration',
          ]}
          whyUseIt="Calculation karo: app 5 minutes per deployment neeche jaati hai, din mein 2 deployments, 20 users active har minute — 200 users frustrate per day. Week mein 1400. Month mein? Ye revenue hai jo tumse door jaata hai. PM2 cluster + reload: zero users frustrate. Ye feature nahi — ye professional responsibility hai."
          howToUse={{
            filename: 'pm2.config.js',
            language: 'javascript',
            code: `// pm2.config.js
module.exports = {
  apps: [
    {
      name: 'myapp',
      script: 'src/index.js',

      // Cluster mode — CPU cores ke hisaab se instances
      instances: 'max', // ya specific number: 4
      exec_mode: 'cluster',

      // Zero-downtime reload
      wait_ready: true,        // process.send('ready') ka wait karo
      listen_timeout: 3000,    // 3s mein ready signal chahiye

      // Auto-restart on memory limit
      max_memory_restart: '500M',

      // Environment variables
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // Graceful shutdown
      kill_timeout: 5000, // 5s mein graceful shutdown
    },
  ],
}

// src/index.js mein:
// const server = app.listen(PORT, () => {
//   process.send?.('ready') // PM2 ko batao ready hoon
// })
//
// process.on('SIGINT', () => {
//   server.close(() => process.exit(0)) // Graceful shutdown
// })

// Deploy command:
// pm2 reload myapp --update-env  ← zero-downtime rolling restart

// Blue-Green with Nginx (manual):
// 1. Green (current) port 3000 par chal rahi hai
// 2. Blue (new) port 3001 par start karo aur test karo
// 3. Nginx config update: proxy_pass port 3001 par
// 4. nginx reload — instant traffic switch
// 5. Green band karo
// Rollback: nginx config revert, reload`,
            explanation: 'PM2 cluster mode trace karo: 4 instances chal rahi hain. pm2 reload myapp command. Instance 1 ko SIGINT milta hai. wait_ready: true — instance 1 server.close() karta hai, existing requests complete hone deta hai, process.send("ready") bhejta hai. Naya instance 1 ready — traffic milta hai. Instance 2 reload. Aur aage. Puri duration mein 3 instances alive — zero downtime. Graceful shutdown zaroori hai — process.on("SIGINT") handle karo.',
          }}
          realWorldScenario="E-commerce site peak sales hours mein deploy karna risk tha — maintenance window dhundni padti thi. PM2 cluster (4 instances) setup kiya, pm2 reload — ek ek instance reload, hamesha 3 instances alive. Ek baar 50 deployments ek din mein kiye bina single user complaint ke. Rollback? pm2 revert myapp — 5 seconds, purani version live. Deploy confidence itna badha ki team roz naye features ship karne lagi. Ye culture shift hai."
          commonMistakes={[
            {
              mistake: 'Graceful shutdown implement nahi karna',
              why: 'SIGTERM mein existing requests mid-flight khatam ho jaate hain — users ko error response milta hai.',
              fix: 'process.on("SIGTERM") handle karo — server.close() karo new connections band karo, existing complete hone do.',
            },
            {
              mistake: 'pm2 restart vs pm2 reload confuse karna',
              why: 'pm2 restart sab instances ek saath kill karta hai — downtime hota hai. pm2 reload rolling restart karta hai.',
              fix: 'Zero-downtime ke liye hamesha pm2 reload use karo. restart sirf debugging/troubleshooting ke liye.',
            },
          ]}
          proTip="Kubernetes mein: strategy: RollingUpdate, maxUnavailable: 0, maxSurge: 1 — hamesha all replicas available, ek extra during update. readinessProbe lazmi hai — naya pod ready hone se pehle traffic nahi milta. PM2 aur Kubernetes dono zero-downtime dete hain, approach alag hai. Single server? PM2. Kubernetes? Native rolling update use karo."
        />
      </div>

      {/* Production Dockerfile Code Block */}
      <div
        id="production-dockerfile"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.05)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-4">
          Production Dockerfile — Best Practice
        </h3>
        <pre
          className="text-sm text-[#A1A1AA] overflow-x-auto leading-relaxed"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <code>{`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
CMD ["node", "src/index.js"]`}</code>
        </pre>
        <p className="text-sm text-[#71717A] mt-3">
          Multi-stage build ka essence: builder stage mein dependencies install, production stage mein sirf runtime zaroori files. USER node se non-root user — container security best practice. Ye ek template hai — copy karo, customize karo, production mein use karo.
        </p>
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 22 Quiz — Docker & DevOps Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — Docker, CI/CD, Nginx, deployment strategies test karo!
          </p>
        </div>
        <QuizSection questions={dockerQuiz} chapterSlug="docker-and-containers" />
      </div>
    </div>
  )
}
