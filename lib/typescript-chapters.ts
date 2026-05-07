export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface TSChapter {
  number: number
  slug: string
  title: string
  subtitle: string
  difficulty: Difficulty
  estimatedMinutes: number
  phase: 1 | 2 | 3
  topics: string[]
  conceptCount: number
  visualization?: string
}

export const tsChapters: TSChapter[] = [
  // Phase 1: Foundation (Ch 1-4)
  {
    number: 1,
    slug: 'ts-intro',
    title: 'TypeScript Kya Hai?',
    subtitle: 'JavaScript ka type-safe superset — kyun, kab, kaise',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    phase: 1,
    topics: ['What is TypeScript', 'JS vs TS', 'Installation', 'tsc compiler', 'First TS file'],
    conceptCount: 5,
  },
  {
    number: 2,
    slug: 'ts-types',
    title: 'Basic Types — Type System Ki Neev',
    subtitle: 'string, number, boolean, arrays, tuples, enums, any, unknown, never',
    difficulty: 'beginner',
    estimatedMinutes: 45,
    phase: 1,
    topics: ['Primitive types', 'Arrays & Tuples', 'Enums', 'any vs unknown', 'never & void', 'Type inference'],
    conceptCount: 8,
  },
  {
    number: 3,
    slug: 'ts-functions',
    title: 'Functions in TypeScript',
    subtitle: 'Parameter types, return types, optional params, overloads',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    phase: 1,
    topics: ['Typed parameters', 'Return types', 'Optional & default params', 'Rest params', 'Function overloads', 'Arrow functions'],
    conceptCount: 7,
  },
  {
    number: 4,
    slug: 'ts-interfaces',
    title: 'Interfaces & Type Aliases',
    subtitle: 'Object shapes define karo — interface vs type, union, intersection',
    difficulty: 'beginner',
    estimatedMinutes: 50,
    phase: 1,
    topics: ['interface', 'type alias', 'Optional properties', 'Readonly', 'Union types', 'Intersection types', 'Declaration merging'],
    conceptCount: 8,
  },

  // Phase 2: Core Concepts (Ch 5-9)
  {
    number: 5,
    slug: 'ts-classes',
    title: 'Classes & OOP in TypeScript',
    subtitle: 'Access modifiers, abstract classes, implements, decorators intro',
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    phase: 2,
    topics: ['public/private/protected', 'readonly fields', 'Abstract classes', 'implements', 'static members', 'Parameter properties'],
    conceptCount: 8,
  },
  {
    number: 6,
    slug: 'ts-generics',
    title: 'Generics — Reusable Type-Safe Code',
    subtitle: 'Generic functions, interfaces, constraints, utility types',
    difficulty: 'intermediate',
    estimatedMinutes: 65,
    phase: 2,
    topics: ['Generic functions', 'Generic interfaces', 'Generic classes', 'extends constraints', 'keyof & typeof', 'Built-in utility types'],
    conceptCount: 9,
  },
  {
    number: 7,
    slug: 'ts-advanced-types',
    title: 'Advanced Types',
    subtitle: 'Conditional types, mapped types, template literal types',
    difficulty: 'intermediate',
    estimatedMinutes: 70,
    phase: 2,
    topics: ['Conditional types', 'infer keyword', 'Mapped types', 'Template literal types', 'Discriminated unions', 'Index signatures'],
    conceptCount: 9,
  },
  {
    number: 8,
    slug: 'ts-modules',
    title: 'TypeScript Modules & Declaration Files',
    subtitle: 'import/export, namespaces, .d.ts files, @types packages',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    phase: 2,
    topics: ['ES Modules in TS', 'Namespaces', 'Declaration files', '@types packages', 'module resolution', 'Path aliases'],
    conceptCount: 7,
  },
  {
    number: 9,
    slug: 'ts-type-narrowing',
    title: 'Type Guards & Narrowing',
    subtitle: 'typeof, instanceof, in, custom type predicates, discriminated unions',
    difficulty: 'intermediate',
    estimatedMinutes: 55,
    phase: 2,
    topics: ['typeof guards', 'instanceof', 'in operator', 'Type predicates', 'Discriminated unions', 'Exhaustiveness checking'],
    conceptCount: 7,
  },

  // Phase 3: Advanced (Ch 10-12)
  {
    number: 10,
    slug: 'ts-with-nodejs',
    title: 'TypeScript with Node.js & Express',
    subtitle: 'Production-ready TS setup — Express types, strict config',
    difficulty: 'advanced',
    estimatedMinutes: 75,
    phase: 3,
    topics: ['@types/node', 'Express + TS', 'Request/Response typing', 'Middleware types', 'Zod validation', 'ts-node & tsx'],
    conceptCount: 9,
  },
  {
    number: 11,
    slug: 'ts-config',
    title: 'tsconfig Deep Dive',
    subtitle: 'Compiler options, strict mode, project references, incremental builds',
    difficulty: 'advanced',
    estimatedMinutes: 50,
    phase: 3,
    topics: ['compilerOptions', 'strict mode flags', 'Module & target', 'Path aliases', 'Project references', 'Composite builds'],
    conceptCount: 8,
  },
  {
    number: 12,
    slug: 'ts-patterns',
    title: 'Real-world TypeScript Patterns',
    subtitle: 'Builder pattern, decorators, branded types, type-safe APIs',
    difficulty: 'advanced',
    estimatedMinutes: 80,
    phase: 3,
    topics: ['Decorators', 'Builder pattern', 'Branded/Nominal types', 'Fluent interfaces', 'Conditional return types', 'Satisfies operator'],
    conceptCount: 8,
  },
]

export const tsPhases = [
  { number: 1 as const, name: 'Foundation', color: '#3178C6', chapters: tsChapters.filter((c) => c.phase === 1) },
  { number: 2 as const, name: 'Core Concepts', color: '#0EA5E9', chapters: tsChapters.filter((c) => c.phase === 2) },
  { number: 3 as const, name: 'Advanced', color: '#6366F1', chapters: tsChapters.filter((c) => c.phase === 3) },
]

export const tsDifficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bg: string; border: string }
> = {
  beginner: {
    label: 'Beginner',
    color: 'text-[#10B981]',
    bg: 'bg-[rgba(16,185,129,0.12)]',
    border: 'border-[rgba(16,185,129,0.3)]',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-[#F59E0B]',
    bg: 'bg-[rgba(245,158,11,0.12)]',
    border: 'border-[rgba(245,158,11,0.3)]',
  },
  advanced: {
    label: 'Advanced',
    color: 'text-[#7C3AED]',
    bg: 'bg-[rgba(124,58,237,0.12)]',
    border: 'border-[rgba(124,58,237,0.3)]',
  },
}
