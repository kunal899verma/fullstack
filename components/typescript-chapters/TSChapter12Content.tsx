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

function TsPatternsDiagram() {
  const items = [
    { label: 'Branded Types', sublabel: 'Type-safe IDs — UserId ≠ ProductId even though both are strings. Compile-time only, zero runtime cost.', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '🏷️' },
    { label: 'Builder Pattern', sublabel: 'Fluent API for complex objects — QueryBuilder.from().select().where().build(). Chainable + typed.', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '🏗️' },
    { label: 'satisfies Operator', sublabel: 'Type check + preserve narrow types — config satisfies AppConfig keeps literal "dark", not wide string.', color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', icon: '✅' },
    { label: 'Decorators', sublabel: '@Injectable · @Get · @Entity — metadata & behavior injection. Foundation of NestJS / TypeORM.', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '🎨' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Real-world TypeScript Patterns</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TSChapter12Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Real-world TypeScript Patterns — Senior Developer Ki Toolkit
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ye fact tumhe shock karega — TypeScript structural typing mein UserId aur ProductId dono strings hain. Matlab deleteUser(productId) likhoge — TypeScript kuch nahi bolega. Ye sahi nahi hai. Senior TypeScript developers branded types use karte hain — same underlying type, lekin TypeScript unhe accidentally mix nahi karne deta. Compile-time safety jo runtime pe zero cost hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ab sawaal ye aata hai — production code mein kaunse patterns actually use hote hain? Branded types ID safety ke liye, builder pattern complex objects ke liye, satisfies operator type-safe config ke liye, decorators NestJS/TypeORM ke liye. Ye sab real codebases mein dikhen ge tum log — is chapter mein samjhenge WHY pehle, phir HOW.
        </p>
      </div>

      <TsPatternsDiagram />

      <div id="branded-types">
        <ConceptCard
          title="Branded Types — Type-Safe IDs"
          emoji="🏷️"
          difficulty="advanced"
          whatIsIt="TypeScript structural typing — agar two types ka same shape hai toh woh interchangeable hain. UserId = string, ProductId = string — TypeScript ke liye dono same hain. deleteUser(productId) — no error. Ye dangerous hai! Branded types nominal typing simulate karte hain — ek phantom field add karo _brand, woh runtime pe exist nahi karta lekin TypeScript use distinguish karta hai. Ab deleteUser(productId) — compile error. Same string value, different type identity."
          whenToUse={[
            'User IDs, Product IDs — accidentally mix nahi hona chahiye',
            'Validated strings (EmailAddress, PhoneNumber)',
            'Units (Meters, Kilograms) — wrong unit mix prevent karna',
          ]}
          whyUseIt="Real bugs hote hain — large codebase, bahut saare IDs hain, ek developer ne function signature galat samjha, deleteUser(req.params.productId) pass kiya. TypeScript ne nahi pakda. Production mein wrong user delete ho gaya. Branded types ke saath — ye function signature hi reject kar deti hai UserId ke alawa kuch. Compile time safety, zero runtime cost. Ye TypeScript ka most underused feature hai."
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
            explanation: 'Brand&lt;T, B&gt; = T & { readonly _brand: B } — intersection type se brand field add kiya. Runtime pe ye field exist nahi karta — sirf TypeScript type system mein hai. asUserId constructor function actual validation karta hai — ID format check karta hai. Ye combination hai: runtime validation + compile-time branded type. Dono milta hai ek pattern se.',
            filename: 'branded-types.ts',
          }}
          realWorldScenario="E-commerce platform — UserId, ProductId, OrderId, CartId, PaymentId — sab strings. Branded types ke saath — har function exactly sahi ID type accept karta hai. Code review mein — addItemToCart(userId, cartId, productId) — sab branded, accidentally swap karo order — compiler immediately error. Review comment ki zaroorat nahi, compiler ne already catch kar liya."
          commonMistakes={[
            { mistake: '_brand field runtime pe access karna', why: '_brand runtime pe exist nahi karta — sirf type-level concept hai', fix: 'Branded types sirf TypeScript type system mein hain — runtime checks constructor functions mein karo' },
          ]}
          proTip="Zod mein z.string().brand&lt;'UserId'&gt;() directly possible hai — schema se branded type milti hai aur safeParse se runtime validation bhi. Ye cleanest approach hai branded types ke liye. Manual Brand utility likhne ki zaroorat nahi agar Zod use kar rahe ho. Aur Zod ka brand automatically z.infer se sahi TypeScript type deta hai."
        />
      </div>

      <div id="builder-pattern">
        <ConceptCard
          title="Builder Pattern with TypeScript"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Builder pattern ek classic design pattern hai — complex objects ko step-by-step banao, chainable methods se. TypeScript mein iska combination bahut powerful hai — har method return type this hota hai jo method chaining enable karta hai. Generic constraints se type-safety milti hai. QueryBuilder, HttpRequestBuilder, TestDataFactory — ye sab builder pattern ke real-world examples hain."
          whenToUse={[
            'Query builders (SQL, Elasticsearch)',
            'Test data factories',
            'Complex configuration objects',
            'HTTP request builders',
          ]}
          whyUseIt="Ab sawaal ye aata hai — constructor mein sab pass karo na? Jab 8-10 parameters ho jaate hain, positional arguments confusing ho jaate hain. createUser('Rahul', null, undefined, 'admin', null, new Date()) — which is which? Builder se — UserBuilder.create().withName('Rahul').withRole('admin').withCreatedAt(new Date()).build(). Intent crystal clear. Test data factories mein ye pattern bahut useful hai — realistic test objects banao step by step."
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
            explanation: 'return this — ye builder pattern ka magic hai. Har method same builder instance return karta hai, isliye chaining possible hai. Generic T se keyof T constraint lagata hai columns pe — galat column name likhoge toh compile error. Ye Drizzle ORM, Prisma query builder sab internally isi pattern pe based hain. Real-world ORM dekhna ho toh Drizzle source code dekhna — TypeScript builder pattern ka best example hai.',
            filename: 'builder-pattern.ts',
          }}
          realWorldScenario="Test suite mein UserFactory banao — UserFactory.create().withRole('admin').withEmail('admin@test.com').build(). Har test mein minimal setup, sirf jo chahiye woh override karo. 50 tests mein se 40 default user use karte hain — factory() call. 10 specific cases mein chain karo. Ye test maintenance dramatically reduce karta hai — schema change karo, factory update karo, sab tests automatically correct."
          commonMistakes={[
            { mistake: 'Builder mutable state return karna alag instances se', why: 'this return se same builder modify hota hai — agar share karo toh bugs', fix: 'Immutable builders: har method new instance return kare — functional style' },
          ]}
          proTip="@faker-js/faker ke saath builder pattern combine karo — UserFactory.create() default pe faker data use kare. UserFactory.create({ email: 'specific@test.com' }) override karo. Ye pattern E2E tests mein bahut powerful hai — realistic data ke saath test karo, specific edge cases ke liye specific values. Production-like testing, zero manual data entry."
        />
      </div>

      <div id="decorators">
        <ConceptCard
          title="Decorators — Class Metadata & Behavior"
          emoji="🎨"
          difficulty="advanced"
          whatIsIt="Decorators — @Controller, @Get, @Injectable, @Entity, @Column — NestJS aur TypeORM use karo toh ye everywhere dikhenge. Decorator ek function hai jo class, method, ya property ko wrap karta hai — metadata add karta hai ya behavior modify karta hai. TypeScript mein experimentalDecorators: true se enable hote hain. TypeScript 5.0 mein naya decorator proposal aaya hai jo stable hai — legacy decorator bhi kaam karte hain."
          whenToUse={[
            'NestJS controllers, services, modules',
            'TypeORM entity columns, relations',
            'class-validator validation rules',
            'Logging, caching, authentication middleware (method decorators)',
          ]}
          whyUseIt="Logging har function mein manually add karo — 100 functions hain, 100 jagah console.log. Koi function chhoot gaya? Debug mein ghante lag jaate hain. @Log decorator — ek baar likho, kisi bhi method pe apply karo. Cross-cutting concerns — logging, authentication, caching, retry logic — ye sab decorators ke liye made for hain. NestJS ka poora architecture isi philosophy pe based hai — business logic clean, infrastructure concerns decorators mein."
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
            explanation: 'Method decorator 3 arguments leta hai — target (class prototype), propertyKey (method name), descriptor (method descriptor). descriptor.value original function hai. Usse wrap karo, log add karo, return karo. NestJS ke decorators Reflect.metadata use karte hain — runtime pe metadata store karta hai, NestJS woh read karta hai dependency injection aur routing ke liye. reflect-metadata package install zaroori hai NestJS ke saath.',
            filename: 'decorators.ts',
          }}
          realWorldScenario="NestJS project mein — @Controller('/users'), @Get('/:id'), @Param('id') id: string, @Body() body: CreateUserDto, @UseGuards(AuthGuard). Ye sab decorators hain — metadata set karte hain, NestJS framework runtime pe read karke routing, validation, authentication handle karta hai. Business logic clean rehta hai — class aur methods mein sirf what to do, decorators handle karte hain how. Production-grade API aise hi banate hain."
          commonMistakes={[
            { mistake: 'experimentalDecorators: true bhool jaana', why: 'TypeScript by default decorators support nahi karta — error aata hai', fix: 'tsconfig mein experimentalDecorators: true set karo (legacy) ya TypeScript 5.0+ use karo' },
          ]}
          proTip="TypeScript 5.0 ke new decorators try karo — experimentalDecorators: true ki zaroorat nahi. New proposal TC39 Stage 3 pe tha — future of JavaScript. Syntax thoda different hai legacy decorators se. NestJS abhi legacy decorators use karta hai — transition hoga future mein. Abhi ke liye: NestJS projects mein legacy, custom projects mein new decorators explore karo."
        />
      </div>

      <div id="satisfies-operator">
        <ConceptCard
          title="satisfies Operator — TypeScript 4.9"
          emoji="✅"
          difficulty="advanced"
          whatIsIt="satisfies TypeScript 4.9 ka hidden gem hai. Problem ye thi — config object ko type annotate karo as Config — theme type 'dark' se wide string ho jaata. Type inference lose hoti hai. Bina annotation ke — TypeScript infer karta hai lekin type check nahi hoti galat values pe. satisfies dono worlds best deta hai — type check karo (errors pakdo) lekin narrow type preserve karo (inference lose mat karo)."
          whenToUse={[
            'Configuration objects jo specific type satisfy karein lekin narrow types preserve karein',
            'Route maps, color palettes, constant objects',
            'as assertion se safer alternative',
          ]}
          whyUseIt="Ye subtle hai lekin important — as Config ke baad config.theme === 'dark' compare karne pe TypeScript string === string dono sides mein dikhata hai. satisfies ke baad config.theme type 'dark' literal hai — autocomplete mein exact values milte hain. Routing tables, color palettes, feature flags — sab mein satisfies better hai as se. as is unsafe, satisfies is checked."
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
            explanation: 'Ab sawaal ye aata hai — as satisfies se kaise alag hai? as forcefully keh raha hai "trust me, this is this type" — koi check nahi. satisfies keh raha hai "check karo ki ye type satisfy karta hai, lekin inference mat kharao." palette.red example dekhte hain — as Palette se palette.red type Record&lt;string, [number, number, number]&gt; ho jaata hai, tuple info lost. satisfies se [number, number, number] tuple type preserve rehta hai.',
            filename: 'satisfies.ts',
          }}
          realWorldScenario="Navigation config banao — const routes = { home: '/', about: '/about', dashboard: '/dashboard' } satisfies Record&lt;string, string&gt;. Type check hota hai sab strings hain. routes.home type '/' literal hai — navigation type safety milti hai. Agar galat path type karo — compile error. Large SPA mein ye routing type safety bahut valuable hai."
          commonMistakes={[
            { mistake: 'satisfies aur as ko same samajhna', why: 'as forceful unsafe cast hai — errors hide karta hai. satisfies type check karta hai + preserves', fix: 'as sirf jab absolutely sure ho. satisfies prefer karo configuration objects ke liye' },
          ]}
          proTip="satisfies + as const combination powerful hai — value satisfies SomeType as const. satisfies type check karta hai, as const narrowest possible literal types deta hai. Config objects ke liye ideal — type safe aur exact literals dono. Ek rule of thumb: as ko replace karo satisfies se jab bhi possible — safer code, better inference, same functionality."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-patterns" />
    </div>
  )
}
