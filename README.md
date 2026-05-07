# NodeMaster — Node.js Mastery in Hinglish

A production-grade, fully static, interactive learning platform for Node.js. Content in Hinglish (Hindi + English). No backend required — deploys to Vercel/Netlify/GitHub Pages for free.

## What's Inside

- **23 Chapters** covering Node.js from beginner to expert level
- **7 Interactive Visualizations** — Event Loop, Streams, HTTP Lifecycle, JWT Auth, N+1 Problem, Cluster vs Workers, Async Timeline
- **Code Playground** powered by Sandpack (runs Node.js in-browser)
- **Searchable Glossary** with 45+ terms in Hinglish
- **Master Quiz** with chapter-by-chapter tests (localStorage progress tracking)
- **Printable Cheatsheet** with copy-able code snippets

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework with `output: 'export'` |
| TypeScript 5 (strict) | Type safety throughout |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | All animations |
| Sandpack | In-browser Node.js playground |
| Lucide React | Icons |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Opens at http://localhost:3000

# Build for production (static export)
npm run build
# Output in /out directory

# Lint
npm run lint
```

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
Connect GitHub repo. Set:
- Build command: `npm run build`
- Publish directory: `out`

### GitHub Pages
```bash
npm run build
npx gh-pages -d out
```

## Project Structure

```
nodemaster/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Landing page
│   ├── course/               # Course index + [chapter] pages
│   ├── visualizations/       # 7 interactive visualization pages
│   ├── playground/           # Sandpack code playground
│   ├── cheatsheet/           # Printable reference
│   ├── glossary/             # Searchable term dictionary
│   ├── quiz/                 # Quizzes + mock test
│   └── about/                # About page
├── components/
│   ├── learn/                # ConceptCard, DiffBlock, QuizSection, TOC
│   ├── ui/                   # Button, Card, Badge, CodeBlock, CalloutBox
│   ├── marketing/            # Landing page sections
│   ├── visualizations/       # EventLoop, Streams, JWT, HTTP, etc.
│   ├── chapters/             # Per-chapter content (Ch 1 & 6 complete)
│   └── layout/               # Navbar, Footer
├── lib/
│   ├── chapters.ts           # All 23 chapter metadata
│   ├── progress.ts           # localStorage progress tracking
│   └── utils.ts              # Utilities
└── hooks/
    ├── useProgress.ts        # Progress state hook
    └── useScrollSpy.ts       # TOC scroll-spy hook
```

## Adding Chapter Content

1. Create `components/chapters/ChapterNContent.tsx` using `<ConceptCard />`:

```tsx
<ConceptCard
  title="Concept Name"
  emoji="🔄"
  difficulty="intermediate"
  whatIsIt="Plain Hinglish explanation..."
  whenToUse={["Jab tumhe X karna ho", "..."]}
  whyUseIt="Problem it solves..."
  howToUse={{ code: `// example`, explanation: "..." }}
  realWorldScenario="Production mein..."
  commonMistakes={[{ mistake: "...", why: "...", fix: "..." }]}
  proTip="Senior engineer ka secret..."
/>
```

2. Map the slug in `app/course/[chapter]/page.tsx` (line ~215):
```tsx
const hasContent = slug === 'what-is-nodejs' || slug === 'your-new-slug'
```

## Credits

Built with Hinglish ❤️ — When/Why/How/WTF structure for every concept so it actually sticks.
