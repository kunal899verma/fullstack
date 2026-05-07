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
          Docker — Apni App Ko Anywhere Chalao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          &ldquo;Works on my machine&rdquo; — ye excuse Docker ke baad band ho gaya. Docker se apni Node.js app ek container mein pack karo — development, staging, production sab jagah same environment milti hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein Dockerfile, Docker Compose, GitHub Actions CI/CD, Nginx reverse proxy, aur zero-downtime deployment cover karenge — production-ready patterns ke saath.
        </p>
      </div>

      {/* ConceptCard 1: Docker for Node.js */}
      <div id="dockerfile">
        <ConceptCard
          title="Docker for Node.js"
          emoji="🐳"
          difficulty="advanced"
          whatIsIt="Docker container mein apni app, dependencies, aur runtime sab kuch pack hota hai. Kahi bhi run karo — developer laptop, CI server, AWS EC2 — sab jagah same behavior. Dockerfile image banana ka recipe hai."
          whenToUse={[
            'App deploy karna hai — server par consistent environment chahiye',
            'Team mein development environment standardize karna',
            'Multiple Node.js versions different projects ke liye',
            'Microservices — har service ka alag container',
          ]}
          whyUseIt="Bina Docker ke deployment mein: server par Node.js version mismatch, missing system dependencies, configuration drift. Docker se: immutable image, reproducible builds, easy rollback, horizontal scaling. alpine images small hain — node:20-alpine 150MB vs node:20 900MB."
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
            explanation: 'Multi-stage build — builder stage mein npm ci, production stage mein sirf needed files. USER node se non-root user se run — security best practice. HEALTHCHECK se Docker automatically unhealthy container restart karta hai.',
          }}
          realWorldScenario="Startup ka Node.js API pehle 850MB Docker image tha — deploy time 8 minutes. Multi-stage alpine build: 95MB image, deploy time 90 seconds. Cost bhi kam hua — ECR storage aur transfer costs. Rollback 30 seconds mein — previous image tag par."
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
          proTip="Docker layer caching ka maximum faayda uthao — rarely changing files pehle COPY karo. package.json → npm ci → src COPY — agar source code change ho lekin dependencies nahi, npm ci layer cache se milega. Build time 3 minutes se 20 seconds aa jaata hai."
        />
      </div>

      {/* ConceptCard 2: Docker Compose */}
      <div id="docker-compose">
        <ConceptCard
          title="Docker Compose — Multi-Service Setup"
          emoji="🎻"
          difficulty="advanced"
          whatIsIt="Docker Compose se multiple containers ek saath define aur run karo — Node.js app + MongoDB + Redis + Nginx ek command se. Development environment standardize karo puri team ke liye."
          whenToUse={[
            'Development environment — Node + DB + Redis locally chalao',
            'Integration testing — real services ke saath test karo',
            'Small production deployments — single server',
            'Demo environments — clients ko dikhane ke liye',
          ]}
          whyUseIt="docker compose up se puri stack ek command mein start hoti hai. Team join karne wale new developer 5 minutes mein ready ho jaate hain — koi manual setup nahi. Services ek network mein hain — service names se communicate karo."
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
            explanation: 'docker compose up -d se background mein start. docker compose logs -f app se logs follow karo. docker compose down -v se sab stop aur volumes delete. volumes: .:/app se hot reload hota hai — file save = container mein visible.',
          }}
          realWorldScenario="8 developers ki team thi — har kisi ka local environment different tha. 'Works on my machine' issues roz. Docker Compose add kiya — docker compose up ek command. Naya developer join kiya, 10 minutes mein running. Environment parity ne integration bugs 80% reduce kiye."
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
          proTip="docker compose --profile tools up se optional services (mongo-express, pgadmin) conditionally start karo. profiles: [tools] set karo optional services par — default up mein nahi aayenge. Resources save hote hain."
        />
      </div>

      {/* ConceptCard 3: GitHub Actions */}
      <div id="github-actions">
        <ConceptCard
          title="GitHub Actions CI/CD"
          emoji="⚙️"
          difficulty="advanced"
          whatIsIt="GitHub Actions se automated pipeline banao — code push hone par automatically test karo, Docker image build karo, aur server par deploy karo. YAML files .github/workflows/ mein define hote hain."
          whenToUse={[
            'Har PR par automatically tests run karo',
            'Main branch par push hone par production deploy karo',
            'Docker image build aur registry push automate karo',
            'Environment-specific deployments — staging vs production',
          ]}
          whyUseIt="Manual deployment error-prone aur slow hota hai. GitHub Actions se: tests pass → build → deploy — fully automated. Deployment history milti hai, rollback easy hai, team ko visibility milti hai. Free minutes GitHub par public repos ke liye unlimited, private repos ke liye 2000 min/month."
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
            explanation: 'needs: test ensure karta hai deploy sirf test pass hone par hoga. docker/build-push-action cache-from/to se Docker layer cache GitHub Actions mein persist hota hai — subsequent builds fast. SSH action se remote server par deploy karo.',
          }}
          realWorldScenario="Team mein manual deployment tha — developer SSH karke server par, git pull, npm install, pm2 restart. 15 minute process, 2-3 errors per week. GitHub Actions CI/CD: push to main → test → build → deploy — 4 minutes, zero errors, full audit trail. Developer confidence badhi."
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
          proTip="GitHub Environments (Settings → Environments) se production deployment protection rules add karo — required reviewers, deployment branches restrict karo. environment: production workflow mein set karo. Manual approval gate milta hai production deployment ke liye."
        />
      </div>

      {/* ConceptCard 4: Nginx */}
      <div id="nginx">
        <ConceptCard
          title="Nginx Reverse Proxy"
          emoji="🌐"
          difficulty="advanced"
          whatIsIt="Nginx lightweight, high-performance web server aur reverse proxy hai. Node.js ko directly internet par expose mat karo — Nginx ke peeche rakho. SSL termination, static file serving, load balancing, aur rate limiting Nginx handle karta hai."
          whenToUse={[
            'Node.js app ko production mein serve karna — SSL ke saath',
            'Multiple Node.js instances ke saath load balancing',
            'Static files serve karna (images, CSS, JS) — Node.js se zyada fast',
            'WebSocket proxying ke liye',
          ]}
          whyUseIt="Node.js ko directly port 80/443 par expose karna security risk hai — root access chahiye hota hai. Nginx low privileges mein run karta hai, battle-tested hai, aur SSL certificate management (Let's Encrypt) easy hai. Static files Nginx se 10x faster serve hote hain Node.js se."
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
            explanation: 'upstream block mein multiple Node instances add karo — automatic load balancing. proxy_set_header X-Forwarded-For se Node.js mein real client IP milti hai. WebSocket ke liye Upgrade aur Connection headers zaroori hain.',
          }}
          realWorldScenario="Production Node.js app pehle direct port 3000 par thi — no SSL, no compression, no caching. Nginx add kiya: Let's Encrypt SSL free mein, gzip se response size 70% kam, static files cache hone se API load 40% reduce. Nginx se node_modules folder kabhi expose nahi hoga accidentally."
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
          proTip="certbot --nginx -d api.myapp.com se automatic SSL install aur Nginx config update hoti hai Let's Encrypt se. Auto-renewal cron job automatically set hota hai. SSL Labs test (ssllabs.com) se A+ grade check karo configuration ke baad."
        />
      </div>

      {/* ConceptCard 5: Zero-Downtime Deployment */}
      <div id="zero-downtime">
        <ConceptCard
          title="Zero-Downtime Deployment"
          emoji="🔄"
          difficulty="advanced"
          whatIsIt="Zero-downtime deployment matlab app update karo bina users ko downtime feel kiye. PM2 cluster mode, rolling updates, aur blue-green deployment strategies se achieve karte hain."
          whenToUse={[
            'Production app update karna — users affected na hon',
            '24/7 service chahiye — maintenance window nahi',
            'Frequent deployments — daily ya multiple times per day',
            'Critical applications — banking, healthcare, e-commerce',
          ]}
          whyUseIt="Har deployment par downtime = revenue loss + user frustration. PM2 cluster mode se: app ke multiple instances hain — ek ek karke restart hote hain. Puri duration mein traffic handle hota rehta hai. Blue-green se instant rollback possible hai."
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
            explanation: 'PM2 cluster mode mein instances ek ek karke restart hote hain — hamesha at least one instance available. wait_ready: true se PM2 wait karta hai jab tak app ready signal bheje — premature traffic routing se bachata hai.',
          }}
          realWorldScenario="E-commerce site peak hours mein deploy karna mushkil tha. PM2 cluster (4 instances) + reload command: ek ek instance reload hota hai — users kabhi downtime experience nahi karte. 50 daily deployments possible ho gaye bina business impact ke. Rollback 5 seconds mein — pm2 revert myapp."
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
          proTip="Kubernetes deployment strategy: RollingUpdate se maxUnavailable: 0, maxSurge: 1 set karo — hamesha all instances available. readinessProbe set karo — ready hone se pehle traffic nahi milti. Kubernetes native zero-downtime deta hai bina PM2 ke."
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
          Multi-stage build: builder mein dependencies install, final image mein sirf runtime. USER node se non-root security.
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
