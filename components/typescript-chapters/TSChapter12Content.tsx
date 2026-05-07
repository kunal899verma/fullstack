'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'Branded types ka kya fayda hai?',
    options: [
      { text: 'Runtime pe type check hota hai', correct: false, explanation: 'Branded types compile-time only hain — runtime pe erase ho jaate hain.' },
      { text: 'Structurally same types ko accidentally interchange nahi kar sakte — UserId aur ProductId dono strings hain lekin mix nahi ho sakte', correct: true, explanation: 'Sahi! TypeScript structural typing se UserId aur ProductId interchangeable hote — branded types se compiler error milta hai agar mix karo.' },
      { text: 'Types ko faster banata hai', correct: false, explanation: 'Branded types runtime pe koi effect nahi karte.' },
      { text: 'Types ko optional bana deta hai', correct: false, explanation: 'Branded types optionality se related nahi hain.' },
    ],
  },
  {
    question: 'satisfies operator (TypeScript 4.9) aur as assertion mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi', correct: false, explanation: 'Important difference hai — type inference preservation.' },
      { text: 'satisfies: type check karta hai lekin narrow type preserve karta hai; as: forcefully type cast karta hai', correct: true, explanation: 'Sahi! satisfies se config.theme type "dark" rehta hai, as Config se "dark" string ho jaata hai. satisfies safer hai.' },
      { text: 'satisfies sirf objects pe kaam karta hai', correct: false, explanation: 'satisfies kisi bhi type expression pe kaam karta hai.' },
      { text: 'as safer hai satisfies se', correct: false, explanation: 'Bilkul ulta — as unsafe cast hai, satisfies checked verification hai.' },
    ],
  },
  {
    question: 'TypeScript decorators (@) kab use karte hain?',
    options: [
      { text: 'Hamesha — ye standard TypeScript feature hai', correct: false, explanation: 'Decorators experimental hain — tsconfig mein experimentalDecorators: true chahiye.' },
      { text: 'Class/method/property ko metadata ya behavior add karne ke liye — NestJS, TypeORM jaise frameworks mein', correct: true, explanation: 'Sahi! @Injectable, @Get, @Column, @Entity — ye sab decorators hain. Framework-specific patterns mein widely used.' },
      { text: 'Sirf testing mein use karte hain', correct: false, explanation: 'Decorators production code mein use hote hain — frameworks mein.' },
      { text: 'TypeScript 5.0 mein remove ho gaye', correct: false, explanation: 'TypeScript 5.0 mein new decorators proposal aaya — legacy decorators bhi kaam karte hain.' },
    ],
  },
  {
    question: 'Builder pattern TypeScript mein kab useful hota hai?',
    options: [
      { text: 'Jab ek object banane ke liye bahut saare optional parameters hon', correct: true, explanation: 'Sahi! new QueryBuilder(table, undefined, undefined, undefined, ...) se behtar: QueryBuilder.from(table).select("*").where("id=1").build(). Readable aur type-safe.' },
      { text: 'Sirf complex algorithms ke liye', correct: false, explanation: 'Builder pattern object construction ke liye hai — algorithm se related nahi.' },
      { text: 'Performance optimize karne ke liye', correct: false, explanation: 'Builder pattern readability aur API design ke liye hai — performance optimization nahi.' },
      { text: 'Jab class private honi chahiye', correct: false, explanation: 'Builder pattern visibility se related nahi — construction complexity manage karne ke liye hai.' },
    ],
  },
  {
    question: 'Template literal types kab useful hain?',
    options: [
      { text: 'Runtime string interpolation ke liye', correct: false, explanation: 'Template literal types compile-time only hain — runtime pe JavaScript template literals use karo.' },
      { text: 'String pattern types define karne ke liye — event names, CSS properties, API endpoints', correct: true, explanation: 'Sahi! type EventName = \`on${string}\` se TypeScript sirf "onClick", "onChange" accept karta hai — "click" nahi.' },
      { text: 'Regular expressions ke liye', correct: false, explanation: 'Template literal types string patterns hain, regex nahi — runtime validation nahi karte.' },
      { text: 'Sirf type aliases mein', correct: false, explanation: 'Template literal types interface, mapped types, conditions sab mein use hote hain.' },
    ],
  },
]

export default function TSChapter12Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Real-world TypeScript Patterns
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ye chapter advanced TypeScript patterns cover karta hai jo real production codebases mein use hote hain — branded types, builder pattern, decorators, satisfies operator, aur zyada.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye patterns sikhne ke baad aap truly type-safe, expressive TypeScript code likh sakte ho.
        </p>
      </div>

      <div id="branded-types">
        <ConceptCard
          title="Branded Types — Type-Safe IDs"
          emoji="🏷️"
          difficulty="advanced"
          whatIsIt="TypeScript structural typing mein UserId aur ProductId dono string hain — interchangeable. Branded types nominal typing simulate karte hain — same underlying type hone ke bawajood mix nahi ho sakta."
          whenToUse={[
            'User IDs, Product IDs — accidentally mix nahi hona chahiye',
            'Validated strings (EmailAddress, PhoneNumber)',
            'Units (Meters, Kilograms) — wrong unit mix prevent karna',
          ]}
          whyUseIt="deleteUser(productId) — TypeScript bina branded types ke ye error nahi pakdega! Branded types compile-time safety dete hain structural equivalents ke beech."
          howToUse={{
            code: `// Branded type pattern
type Brand<T, B> = T & { readonly _brand: B }

// Specific branded types
type UserId = Brand<string, 'UserId'>
type ProductId = Brand<string, 'ProductId'>
type EmailAddress = Brand<string, 'EmailAddress'>

// "Constructor" functions — validate aur brand karo
function asUserId(id: string): UserId {
  if (!id.startsWith('user_')) throw new Error('Invalid UserId format')
  return id as UserId
}

function asEmail(email: string): EmailAddress {
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    throw new Error('Invalid email format')
  }
  return email as EmailAddress
}

// Functions now reject wrong types
function getUser(id: UserId): Promise<User> {
  return db.findUser(id)
}

function deleteProduct(id: ProductId): Promise<void> {
  return db.deleteProduct(id)
}

const userId = asUserId('user_123')
const productId = 'prod_456' as ProductId  // force-cast if needed

await getUser(userId)     // ✅
// await getUser(productId) // ❌ TypeScript error! ProductId ≠ UserId
// await getUser('user_123') // ❌ Error! Plain string ≠ UserId`,
            language: 'typescript',
            explanation: 'Brand<T, B> = T & { _brand: B } — structural typing se same lagta hai lekin brand field different hai. Compiler UserId aur ProductId mix nahi karne deta.',
            filename: 'branded-types.ts',
          }}
          realWorldScenario="Large codebase mein IDs mix hona common bug hai — deleteUser(req.params.productId) ek typo se production data corrupt ho sakta hai. Branded types ye bugs compile time pe pakad lete hain."
          commonMistakes={[
            { mistake: '_brand field runtime pe access karna', why: '_brand runtime pe exist nahi karta — sirf type-level concept hai', fix: 'Branded types sirf TypeScript type system mein hain — runtime checks constructor functions mein karo' },
          ]}
          proTip="io-ts ya zod ke saath branded types combine karo — runtime validation + compile-time safety. z.string().brand<'UserId'>() Zod mein directly possible hai."
        />
      </div>

      <div id="builder-pattern">
        <ConceptCard
          title="Builder Pattern with TypeScript"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Builder pattern complex object construction ko step-by-step chainable method calls mein convert karta hai — readable, type-safe, aur optional parameters friendly."
          whenToUse={[
            'Query builders (SQL, Elasticsearch)',
            'Test data factories',
            'Complex configuration objects',
            'HTTP request builders',
          ]}
          whyUseIt="new User(name, null, undefined, 'admin', null, new Date()) se zyada readable: UserBuilder.create().name('Rahul').role('admin').build(). Intent clear hoti hai."
          howToUse={{
            code: `class QueryBuilder<T extends Record<string, unknown>> {
  private tableName: string = ''
  private conditions: string[] = []
  private selectedColumns: string[] = ['*']
  private limitValue?: number
  private orderByColumn?: string

  static from<T extends Record<string, unknown>>(table: string): QueryBuilder<T> {
    const builder = new QueryBuilder<T>()
    builder.tableName = table
    return builder
  }

  select(...columns: (keyof T & string)[]): this {
    this.selectedColumns = columns
    return this  // method chaining ke liye this return karo
  }

  where(condition: string): this {
    this.conditions.push(condition)
    return this
  }

  limit(n: number): this {
    this.limitValue = n
    return this
  }

  orderBy(column: keyof T & string): this {
    this.orderByColumn = column as string
    return this
  }

  build(): string {
    let query = \`SELECT \${this.selectedColumns.join(', ')} FROM \${this.tableName}\`
    if (this.conditions.length) query += \` WHERE \${this.conditions.join(' AND ')}\`
    if (this.orderByColumn) query += \` ORDER BY \${this.orderByColumn}\`
    if (this.limitValue) query += \` LIMIT \${this.limitValue}\`
    return query
  }
}

// Usage — type-safe aur readable
const query = QueryBuilder.from<User>('users')
  .select('id', 'name', 'email')
  .where('active = true')
  .where('role = \\'admin\\'')
  .orderBy('name')
  .limit(10)
  .build()

// SELECT id, name, email FROM users WHERE active = true AND role = 'admin' ORDER BY name LIMIT 10`,
            language: 'typescript',
            explanation: 'QueryBuilder<T> generic hai — T se columns type-safe hain. return this se method chaining kaam karta hai. build() final string produce karta hai.',
            filename: 'builder-pattern.ts',
          }}
          realWorldScenario="Drizzle ORM, TypeORM — sab builder pattern use karte hain. Test data factories (UserFactory.create().admin().withEmail('test@example.com').build()) mein bhi bahut useful hai."
          commonMistakes={[
            { mistake: 'Builder mutable state return karna alag instances se', why: 'this return se same builder modify hota hai — agar share karo toh bugs', fix: 'Immutable builders: har method new instance return kare — functional style' },
          ]}
          proTip="Test factories ke liye @faker-js/faker ke saath builder pattern combine karo: UserFactory.create().name(faker.person.fullName()).build() — realistic test data."
        />
      </div>

      <div id="decorators">
        <ConceptCard
          title="Decorators — Class Metadata & Behavior"
          emoji="🎨"
          difficulty="advanced"
          whatIsIt="Decorators (@) class, method, property ko annotate karte hain — metadata add kar sakte hain ya behavior wrap kar sakte hain. NestJS, TypeORM, class-validator mein heavily used."
          whenToUse={[
            'NestJS controllers, services, modules',
            'TypeORM entity columns, relations',
            'class-validator validation rules',
            'Logging, caching, authentication middleware (method decorators)',
          ]}
          whyUseIt="Decorators cross-cutting concerns (logging, auth, validation) ko logic se separate karte hain — code clean aur readable rehta hai."
          howToUse={{
            code: `// tsconfig mein enable karo: experimentalDecorators: true

// Simple logging decorator
function Log(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value
  descriptor.value = function (...args: unknown[]) {
    console.log(\`[LOG] \${propertyKey} called with:\`, args)
    const result = original.apply(this, args)
    console.log(\`[LOG] \${propertyKey} returned:\`, result)
    return result
  }
  return descriptor
}

class MathService {
  @Log
  add(a: number, b: number): number {
    return a + b
  }
}

const svc = new MathService()
svc.add(2, 3)
// [LOG] add called with: [2, 3]
// [LOG] add returned: 5

// NestJS style — real-world usage
@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    return this.userRepo.findOneOrFail({ where: { id } })
  }
}

// TypeScript 5.0 new decorators (no experimentalDecorators needed)
function logged<T, Args extends unknown[]>(
  fn: (...args: Args) => T,
  context: ClassMethodDecoratorContext
): (...args: Args) => T {
  return function (...args: Args): T {
    console.log(\`Calling \${String(context.name)}\`)
    return fn.apply(this, args)
  }
}`,
            language: 'typescript',
            explanation: '@Log method decorator original function ko wrap karta hai. NestJS @Injectable, @Get, @Param — sab decorators hain. TypeScript 5.0 mein new decorator proposal hai bina experimental flag ke.',
            filename: 'decorators.ts',
          }}
          realWorldScenario="NestJS entire framework decorators pe based hai — @Controller, @Get, @Post, @Body, @Param. class-validator mein @IsEmail(), @MinLength(8) body validation ke liye. Ye patterns production mein bahut common hain."
          commonMistakes={[
            { mistake: 'experimentalDecorators: true bhool jaana', why: 'TypeScript by default decorators support nahi karta — error aata hai', fix: 'tsconfig mein experimentalDecorators: true set karo (legacy) ya TypeScript 5.0+ use karo' },
          ]}
          proTip="Custom decorators banane se pehle reflect-metadata package install karo — NestJS aur TypeORM ke saath zaroori hai. npm install reflect-metadata."
        />
      </div>

      <div id="satisfies-operator">
        <ConceptCard
          title="satisfies Operator — TypeScript 4.9"
          emoji="✅"
          difficulty="advanced"
          whatIsIt="satisfies operator type check karta hai lekin narrow/inferred type ko preserve karta hai. as assertion se safer hai — forceful cast nahi karta."
          whenToUse={[
            'Configuration objects jo specific type satisfy karein lekin narrow types preserve karein',
            'Route maps, color palettes, constant objects',
            'as assertion se safer alternative',
          ]}
          whyUseIt="as Config karta hai lekin theme type 'dark' (narrow) se string (wide) ho jaata hai. satisfies ke saath theme: 'dark' type preserve hoti hai."
          howToUse={{
            code: `type AppConfig = {
  theme: 'light' | 'dark' | 'system'
  language: string
  features: Record<string, boolean>
}

// Problem with 'as':
const config1 = {
  theme: 'dark',
  language: 'en',
  features: { darkMode: true }
} as AppConfig
config1.theme  // type: 'light' | 'dark' | 'system' — too wide!

// satisfies — type checked + narrow type preserved
const config2 = {
  theme: 'dark',
  language: 'en',
  features: { darkMode: true }
} satisfies AppConfig
config2.theme  // type: 'dark' — narrow! ✅

// Error catching — satisfies validates
const badConfig = {
  theme: 'purple',  // ❌ Type error: 'purple' not in union
  language: 'en',
  features: {}
} satisfies AppConfig

// Palette example
type Palette = Record<string, [number, number, number]>

const palette = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
} satisfies Palette

palette.red  // type: [number, number, number] — tuple type!
// as Palette se: Record<string, ...> — tuple info lost

// Object methods with satisfies
const routes = {
  home: '/',
  about: '/about',
  blog: '/blog',
} satisfies Record<string, string>

routes.home  // type: string literal '/' preserved!`,
            language: 'typescript',
            explanation: 'satisfies check karta hai ki object AppConfig ke compatible hai — lekin theme: "dark" literal type preserve karta hai. as cast se woh string ho jaata. palette.red tuple type preserve karta hai.',
            filename: 'satisfies.ts',
          }}
          realWorldScenario="Application routing table mein satisfies use karo — routes sab valid strings hain (type checked) lekin har route ka exact literal type bhi available hai intellisense mein."
          commonMistakes={[
            { mistake: 'satisfies aur as ko same samajhna', why: 'as forceful unsafe cast hai — errors hide karta hai. satisfies type check karta hai + preserves', fix: 'as sirf jab absolutely sure ho. satisfies prefer karo configuration objects ke liye' },
          ]}
          proTip="satisfies + as const combination: value satisfies SomeType as const — type safety + narrowest possible types dono milte hain."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-patterns" />
    </div>
  )
}
