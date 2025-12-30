
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Business
 * 
 */
export type Business = $Result.DefaultSelection<Prisma.$BusinessPayload>
/**
 * Model UserBusiness
 * 
 */
export type UserBusiness = $Result.DefaultSelection<Prisma.$UserBusinessPayload>
/**
 * Model UserGuest
 * 
 */
export type UserGuest = $Result.DefaultSelection<Prisma.$UserGuestPayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model TicketDetail
 * 
 */
export type TicketDetail = $Result.DefaultSelection<Prisma.$TicketDetailPayload>
/**
 * Model newsletterSubscriber
 * 
 */
export type newsletterSubscriber = $Result.DefaultSelection<Prisma.$newsletterSubscriberPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST'
};

export type Role = (typeof Role)[keyof typeof Role]


export const BusinessStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING: 'PENDING'
};

export type BusinessStatus = (typeof BusinessStatus)[keyof typeof BusinessStatus]


export const BusinessEntity: {
  INDIVIDUAL: 'INDIVIDUAL',
  COMPANY: 'COMPANY'
};

export type BusinessEntity = (typeof BusinessEntity)[keyof typeof BusinessEntity]


export const UserGuestStatus: {
  PENDIENT: 'PENDIENT',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  DELETED: 'DELETED'
};

export type UserGuestStatus = (typeof UserGuestStatus)[keyof typeof UserGuestStatus]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  PENDIENT: 'PENDIENT'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const TicketStatus: {
  RESOLVED: 'RESOLVED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
  URGENT: 'URGENT'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const TicketType: {
  SUPPORT: 'SUPPORT',
  SUGGESTION: 'SUGGESTION',
  REQUEST: 'REQUEST'
};

export type TicketType = (typeof TicketType)[keyof typeof TicketType]


export const TicketDetailOrigin: {
  CUSTOMER: 'CUSTOMER',
  APPSFLY: 'APPSFLY'
};

export type TicketDetailOrigin = (typeof TicketDetailOrigin)[keyof typeof TicketDetailOrigin]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type BusinessStatus = $Enums.BusinessStatus

export const BusinessStatus: typeof $Enums.BusinessStatus

export type BusinessEntity = $Enums.BusinessEntity

export const BusinessEntity: typeof $Enums.BusinessEntity

export type UserGuestStatus = $Enums.UserGuestStatus

export const UserGuestStatus: typeof $Enums.UserGuestStatus

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type TicketType = $Enums.TicketType

export const TicketType: typeof $Enums.TicketType

export type TicketDetailOrigin = $Enums.TicketDetailOrigin

export const TicketDetailOrigin: typeof $Enums.TicketDetailOrigin

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.business`: Exposes CRUD operations for the **Business** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Businesses
    * const businesses = await prisma.business.findMany()
    * ```
    */
  get business(): Prisma.BusinessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userBusiness`: Exposes CRUD operations for the **UserBusiness** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserBusinesses
    * const userBusinesses = await prisma.userBusiness.findMany()
    * ```
    */
  get userBusiness(): Prisma.UserBusinessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGuest`: Exposes CRUD operations for the **UserGuest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGuests
    * const userGuests = await prisma.userGuest.findMany()
    * ```
    */
  get userGuest(): Prisma.UserGuestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticketDetail`: Exposes CRUD operations for the **TicketDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TicketDetails
    * const ticketDetails = await prisma.ticketDetail.findMany()
    * ```
    */
  get ticketDetail(): Prisma.TicketDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterSubscriber`: Exposes CRUD operations for the **newsletterSubscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterSubscribers
    * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
    * ```
    */
  get newsletterSubscriber(): Prisma.newsletterSubscriberDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Business: 'Business',
    UserBusiness: 'UserBusiness',
    UserGuest: 'UserGuest',
    Plan: 'Plan',
    Subscription: 'Subscription',
    Ticket: 'Ticket',
    TicketDetail: 'TicketDetail',
    newsletterSubscriber: 'newsletterSubscriber'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "business" | "userBusiness" | "userGuest" | "plan" | "subscription" | "ticket" | "ticketDetail" | "newsletterSubscriber"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Business: {
        payload: Prisma.$BusinessPayload<ExtArgs>
        fields: Prisma.BusinessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findFirst: {
            args: Prisma.BusinessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findMany: {
            args: Prisma.BusinessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          create: {
            args: Prisma.BusinessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          createMany: {
            args: Prisma.BusinessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          delete: {
            args: Prisma.BusinessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          update: {
            args: Prisma.BusinessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          deleteMany: {
            args: Prisma.BusinessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          upsert: {
            args: Prisma.BusinessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          aggregate: {
            args: Prisma.BusinessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusiness>
          }
          groupBy: {
            args: Prisma.BusinessGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessCountAggregateOutputType> | number
          }
        }
      }
      UserBusiness: {
        payload: Prisma.$UserBusinessPayload<ExtArgs>
        fields: Prisma.UserBusinessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserBusinessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserBusinessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>
          }
          findFirst: {
            args: Prisma.UserBusinessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserBusinessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>
          }
          findMany: {
            args: Prisma.UserBusinessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>[]
          }
          create: {
            args: Prisma.UserBusinessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>
          }
          createMany: {
            args: Prisma.UserBusinessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserBusinessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>[]
          }
          delete: {
            args: Prisma.UserBusinessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>
          }
          update: {
            args: Prisma.UserBusinessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>
          }
          deleteMany: {
            args: Prisma.UserBusinessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserBusinessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserBusinessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>[]
          }
          upsert: {
            args: Prisma.UserBusinessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBusinessPayload>
          }
          aggregate: {
            args: Prisma.UserBusinessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserBusiness>
          }
          groupBy: {
            args: Prisma.UserBusinessGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserBusinessGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserBusinessCountArgs<ExtArgs>
            result: $Utils.Optional<UserBusinessCountAggregateOutputType> | number
          }
        }
      }
      UserGuest: {
        payload: Prisma.$UserGuestPayload<ExtArgs>
        fields: Prisma.UserGuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>
          }
          findFirst: {
            args: Prisma.UserGuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>
          }
          findMany: {
            args: Prisma.UserGuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>[]
          }
          create: {
            args: Prisma.UserGuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>
          }
          createMany: {
            args: Prisma.UserGuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>[]
          }
          delete: {
            args: Prisma.UserGuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>
          }
          update: {
            args: Prisma.UserGuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>
          }
          deleteMany: {
            args: Prisma.UserGuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGuestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>[]
          }
          upsert: {
            args: Prisma.UserGuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGuestPayload>
          }
          aggregate: {
            args: Prisma.UserGuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGuest>
          }
          groupBy: {
            args: Prisma.UserGuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGuestCountArgs<ExtArgs>
            result: $Utils.Optional<UserGuestCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      TicketDetail: {
        payload: Prisma.$TicketDetailPayload<ExtArgs>
        fields: Prisma.TicketDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>
          }
          findFirst: {
            args: Prisma.TicketDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>
          }
          findMany: {
            args: Prisma.TicketDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>[]
          }
          create: {
            args: Prisma.TicketDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>
          }
          createMany: {
            args: Prisma.TicketDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketDetailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>[]
          }
          delete: {
            args: Prisma.TicketDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>
          }
          update: {
            args: Prisma.TicketDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>
          }
          deleteMany: {
            args: Prisma.TicketDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketDetailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>[]
          }
          upsert: {
            args: Prisma.TicketDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketDetailPayload>
          }
          aggregate: {
            args: Prisma.TicketDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicketDetail>
          }
          groupBy: {
            args: Prisma.TicketDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketDetailCountArgs<ExtArgs>
            result: $Utils.Optional<TicketDetailCountAggregateOutputType> | number
          }
        }
      }
      newsletterSubscriber: {
        payload: Prisma.$newsletterSubscriberPayload<ExtArgs>
        fields: Prisma.newsletterSubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.newsletterSubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.newsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>
          }
          findFirst: {
            args: Prisma.newsletterSubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.newsletterSubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>
          }
          findMany: {
            args: Prisma.newsletterSubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>[]
          }
          create: {
            args: Prisma.newsletterSubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>
          }
          createMany: {
            args: Prisma.newsletterSubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.newsletterSubscriberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>[]
          }
          delete: {
            args: Prisma.newsletterSubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>
          }
          update: {
            args: Prisma.newsletterSubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>
          }
          deleteMany: {
            args: Prisma.newsletterSubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.newsletterSubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.newsletterSubscriberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>[]
          }
          upsert: {
            args: Prisma.newsletterSubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$newsletterSubscriberPayload>
          }
          aggregate: {
            args: Prisma.NewsletterSubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterSubscriber>
          }
          groupBy: {
            args: Prisma.newsletterSubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.newsletterSubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    business?: BusinessOmit
    userBusiness?: UserBusinessOmit
    userGuest?: UserGuestOmit
    plan?: PlanOmit
    subscription?: SubscriptionOmit
    ticket?: TicketOmit
    ticketDetail?: TicketDetailOmit
    newsletterSubscriber?: newsletterSubscriberOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    UserBusiness: number
    UserGuest: number
    businesses: number
    subscriptions: number
    tickets: number
    ticketDetails: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserBusiness?: boolean | UserCountOutputTypeCountUserBusinessArgs
    UserGuest?: boolean | UserCountOutputTypeCountUserGuestArgs
    businesses?: boolean | UserCountOutputTypeCountBusinessesArgs
    subscriptions?: boolean | UserCountOutputTypeCountSubscriptionsArgs
    tickets?: boolean | UserCountOutputTypeCountTicketsArgs
    ticketDetails?: boolean | UserCountOutputTypeCountTicketDetailsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserBusinessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBusinessWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserGuestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGuestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBusinessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketDetailWhereInput
  }


  /**
   * Count Type BusinessCountOutputType
   */

  export type BusinessCountOutputType = {
    UserGuest: number
    UserBusiness: number
    subscriptions: number
  }

  export type BusinessCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserGuest?: boolean | BusinessCountOutputTypeCountUserGuestArgs
    UserBusiness?: boolean | BusinessCountOutputTypeCountUserBusinessArgs
    subscriptions?: boolean | BusinessCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessCountOutputType
     */
    select?: BusinessCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountUserGuestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGuestWhereInput
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountUserBusinessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBusinessWhereInput
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    subscriptions: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | PlanCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }


  /**
   * Count Type TicketCountOutputType
   */

  export type TicketCountOutputType = {
    ticketDetails: number
  }

  export type TicketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticketDetails?: boolean | TicketCountOutputTypeCountTicketDetailsArgs
  }

  // Custom InputTypes
  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketCountOutputType
     */
    select?: TicketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeCountTicketDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketDetailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    userId: string | null
    userFirstName: string | null
    userLastName: string | null
    userEmail: string | null
    userConfirmEmail: boolean | null
    userPassword: string | null
    userLastConnection: Date | null
    userCodePhoneNumber: string | null
    userPhoneNumber: string | null
    userDocumentType: string | null
    userDocumentNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    userId: string | null
    userFirstName: string | null
    userLastName: string | null
    userEmail: string | null
    userConfirmEmail: boolean | null
    userPassword: string | null
    userLastConnection: Date | null
    userCodePhoneNumber: string | null
    userPhoneNumber: string | null
    userDocumentType: string | null
    userDocumentNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    userFirstName: number
    userLastName: number
    userEmail: number
    userConfirmEmail: number
    userPassword: number
    userLastConnection: number
    userCodePhoneNumber: number
    userPhoneNumber: number
    userDocumentType: number
    userDocumentNumber: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    userId?: true
    userFirstName?: true
    userLastName?: true
    userEmail?: true
    userConfirmEmail?: true
    userPassword?: true
    userLastConnection?: true
    userCodePhoneNumber?: true
    userPhoneNumber?: true
    userDocumentType?: true
    userDocumentNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    userFirstName?: true
    userLastName?: true
    userEmail?: true
    userConfirmEmail?: true
    userPassword?: true
    userLastConnection?: true
    userCodePhoneNumber?: true
    userPhoneNumber?: true
    userDocumentType?: true
    userDocumentNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    userFirstName?: true
    userLastName?: true
    userEmail?: true
    userConfirmEmail?: true
    userPassword?: true
    userLastConnection?: true
    userCodePhoneNumber?: true
    userPhoneNumber?: true
    userDocumentType?: true
    userDocumentNumber?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail: boolean
    userPassword: string
    userLastConnection: Date | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
    userConfirmEmail?: boolean
    userPassword?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    UserBusiness?: boolean | User$UserBusinessArgs<ExtArgs>
    UserGuest?: boolean | User$UserGuestArgs<ExtArgs>
    businesses?: boolean | User$businessesArgs<ExtArgs>
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    tickets?: boolean | User$ticketsArgs<ExtArgs>
    ticketDetails?: boolean | User$ticketDetailsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
    userConfirmEmail?: boolean
    userPassword?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
    userConfirmEmail?: boolean
    userPassword?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
    userConfirmEmail?: boolean
    userPassword?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "userFirstName" | "userLastName" | "userEmail" | "userConfirmEmail" | "userPassword" | "userLastConnection" | "userCodePhoneNumber" | "userPhoneNumber" | "userDocumentType" | "userDocumentNumber" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserBusiness?: boolean | User$UserBusinessArgs<ExtArgs>
    UserGuest?: boolean | User$UserGuestArgs<ExtArgs>
    businesses?: boolean | User$businessesArgs<ExtArgs>
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    tickets?: boolean | User$ticketsArgs<ExtArgs>
    ticketDetails?: boolean | User$ticketDetailsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      UserBusiness: Prisma.$UserBusinessPayload<ExtArgs>[]
      UserGuest: Prisma.$UserGuestPayload<ExtArgs>[]
      businesses: Prisma.$BusinessPayload<ExtArgs>[]
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      tickets: Prisma.$TicketPayload<ExtArgs>[]
      ticketDetails: Prisma.$TicketDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      userFirstName: string
      userLastName: string
      userEmail: string
      userConfirmEmail: boolean
      userPassword: string
      userLastConnection: Date | null
      userCodePhoneNumber: string
      userPhoneNumber: string
      userDocumentType: string
      userDocumentNumber: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    UserBusiness<T extends User$UserBusinessArgs<ExtArgs> = {}>(args?: Subset<T, User$UserBusinessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    UserGuest<T extends User$UserGuestArgs<ExtArgs> = {}>(args?: Subset<T, User$UserGuestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businesses<T extends User$businessesArgs<ExtArgs> = {}>(args?: Subset<T, User$businessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends User$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tickets<T extends User$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ticketDetails<T extends User$ticketDetailsArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly userId: FieldRef<"User", 'String'>
    readonly userFirstName: FieldRef<"User", 'String'>
    readonly userLastName: FieldRef<"User", 'String'>
    readonly userEmail: FieldRef<"User", 'String'>
    readonly userConfirmEmail: FieldRef<"User", 'Boolean'>
    readonly userPassword: FieldRef<"User", 'String'>
    readonly userLastConnection: FieldRef<"User", 'DateTime'>
    readonly userCodePhoneNumber: FieldRef<"User", 'String'>
    readonly userPhoneNumber: FieldRef<"User", 'String'>
    readonly userDocumentType: FieldRef<"User", 'String'>
    readonly userDocumentNumber: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.UserBusiness
   */
  export type User$UserBusinessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    where?: UserBusinessWhereInput
    orderBy?: UserBusinessOrderByWithRelationInput | UserBusinessOrderByWithRelationInput[]
    cursor?: UserBusinessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[]
  }

  /**
   * User.UserGuest
   */
  export type User$UserGuestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    where?: UserGuestWhereInput
    orderBy?: UserGuestOrderByWithRelationInput | UserGuestOrderByWithRelationInput[]
    cursor?: UserGuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGuestScalarFieldEnum | UserGuestScalarFieldEnum[]
  }

  /**
   * User.businesses
   */
  export type User$businessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    where?: BusinessWhereInput
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    cursor?: BusinessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * User.subscriptions
   */
  export type User$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * User.tickets
   */
  export type User$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.ticketDetails
   */
  export type User$ticketDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    where?: TicketDetailWhereInput
    orderBy?: TicketDetailOrderByWithRelationInput | TicketDetailOrderByWithRelationInput[]
    cursor?: TicketDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketDetailScalarFieldEnum | TicketDetailScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Business
   */

  export type AggregateBusiness = {
    _count: BusinessCountAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  export type BusinessMinAggregateOutputType = {
    businessId: string | null
    businessName: string | null
    businessType: string | null
    businessDocumentType: string | null
    businessDocumentNumber: string | null
    businessEmail: string | null
    businessPhoneNumber: string | null
    businessCodePhoneNumber: string | null
    businessCountry: string | null
    businessCodeWhatsappNumber: string | null
    businessWhatsappNumber: string | null
    businessConnectionDB: string | null
    businessEntity: $Enums.BusinessEntity | null
    businessStatus: $Enums.BusinessStatus | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessMaxAggregateOutputType = {
    businessId: string | null
    businessName: string | null
    businessType: string | null
    businessDocumentType: string | null
    businessDocumentNumber: string | null
    businessEmail: string | null
    businessPhoneNumber: string | null
    businessCodePhoneNumber: string | null
    businessCountry: string | null
    businessCodeWhatsappNumber: string | null
    businessWhatsappNumber: string | null
    businessConnectionDB: string | null
    businessEntity: $Enums.BusinessEntity | null
    businessStatus: $Enums.BusinessStatus | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessCountAggregateOutputType = {
    businessId: number
    businessName: number
    businessType: number
    businessDocumentType: number
    businessDocumentNumber: number
    businessEmail: number
    businessPhoneNumber: number
    businessCodePhoneNumber: number
    businessCountry: number
    businessCodeWhatsappNumber: number
    businessWhatsappNumber: number
    businessConnectionDB: number
    businessEntity: number
    businessStatus: number
    businessProcess: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusinessMinAggregateInputType = {
    businessId?: true
    businessName?: true
    businessType?: true
    businessDocumentType?: true
    businessDocumentNumber?: true
    businessEmail?: true
    businessPhoneNumber?: true
    businessCodePhoneNumber?: true
    businessCountry?: true
    businessCodeWhatsappNumber?: true
    businessWhatsappNumber?: true
    businessConnectionDB?: true
    businessEntity?: true
    businessStatus?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessMaxAggregateInputType = {
    businessId?: true
    businessName?: true
    businessType?: true
    businessDocumentType?: true
    businessDocumentNumber?: true
    businessEmail?: true
    businessPhoneNumber?: true
    businessCodePhoneNumber?: true
    businessCountry?: true
    businessCodeWhatsappNumber?: true
    businessWhatsappNumber?: true
    businessConnectionDB?: true
    businessEntity?: true
    businessStatus?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessCountAggregateInputType = {
    businessId?: true
    businessName?: true
    businessType?: true
    businessDocumentType?: true
    businessDocumentNumber?: true
    businessEmail?: true
    businessPhoneNumber?: true
    businessCodePhoneNumber?: true
    businessCountry?: true
    businessCodeWhatsappNumber?: true
    businessWhatsappNumber?: true
    businessConnectionDB?: true
    businessEntity?: true
    businessStatus?: true
    businessProcess?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Business to aggregate.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Businesses
    **/
    _count?: true | BusinessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessMaxAggregateInputType
  }

  export type GetBusinessAggregateType<T extends BusinessAggregateArgs> = {
        [P in keyof T & keyof AggregateBusiness]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusiness[P]>
      : GetScalarType<T[P], AggregateBusiness[P]>
  }




  export type BusinessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessWhereInput
    orderBy?: BusinessOrderByWithAggregationInput | BusinessOrderByWithAggregationInput[]
    by: BusinessScalarFieldEnum[] | BusinessScalarFieldEnum
    having?: BusinessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessCountAggregateInputType | true
    _min?: BusinessMinAggregateInputType
    _max?: BusinessMaxAggregateInputType
  }

  export type BusinessGroupByOutputType = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber: string | null
    businessWhatsappNumber: string | null
    businessConnectionDB: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess: JsonValue | null
    createdByUserId: string | null
    createdAt: Date
    updatedAt: Date
    _count: BusinessCountAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  type GetBusinessGroupByPayload<T extends BusinessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessGroupByOutputType[P]>
        }
      >
    >


  export type BusinessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    businessId?: boolean
    businessName?: boolean
    businessType?: boolean
    businessDocumentType?: boolean
    businessDocumentNumber?: boolean
    businessEmail?: boolean
    businessPhoneNumber?: boolean
    businessCodePhoneNumber?: boolean
    businessCountry?: boolean
    businessCodeWhatsappNumber?: boolean
    businessWhatsappNumber?: boolean
    businessConnectionDB?: boolean
    businessEntity?: boolean
    businessStatus?: boolean
    businessProcess?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | Business$createdByArgs<ExtArgs>
    UserGuest?: boolean | Business$UserGuestArgs<ExtArgs>
    UserBusiness?: boolean | Business$UserBusinessArgs<ExtArgs>
    subscriptions?: boolean | Business$subscriptionsArgs<ExtArgs>
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    businessId?: boolean
    businessName?: boolean
    businessType?: boolean
    businessDocumentType?: boolean
    businessDocumentNumber?: boolean
    businessEmail?: boolean
    businessPhoneNumber?: boolean
    businessCodePhoneNumber?: boolean
    businessCountry?: boolean
    businessCodeWhatsappNumber?: boolean
    businessWhatsappNumber?: boolean
    businessConnectionDB?: boolean
    businessEntity?: boolean
    businessStatus?: boolean
    businessProcess?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | Business$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    businessId?: boolean
    businessName?: boolean
    businessType?: boolean
    businessDocumentType?: boolean
    businessDocumentNumber?: boolean
    businessEmail?: boolean
    businessPhoneNumber?: boolean
    businessCodePhoneNumber?: boolean
    businessCountry?: boolean
    businessCodeWhatsappNumber?: boolean
    businessWhatsappNumber?: boolean
    businessConnectionDB?: boolean
    businessEntity?: boolean
    businessStatus?: boolean
    businessProcess?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | Business$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectScalar = {
    businessId?: boolean
    businessName?: boolean
    businessType?: boolean
    businessDocumentType?: boolean
    businessDocumentNumber?: boolean
    businessEmail?: boolean
    businessPhoneNumber?: boolean
    businessCodePhoneNumber?: boolean
    businessCountry?: boolean
    businessCodeWhatsappNumber?: boolean
    businessWhatsappNumber?: boolean
    businessConnectionDB?: boolean
    businessEntity?: boolean
    businessStatus?: boolean
    businessProcess?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"businessId" | "businessName" | "businessType" | "businessDocumentType" | "businessDocumentNumber" | "businessEmail" | "businessPhoneNumber" | "businessCodePhoneNumber" | "businessCountry" | "businessCodeWhatsappNumber" | "businessWhatsappNumber" | "businessConnectionDB" | "businessEntity" | "businessStatus" | "businessProcess" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["business"]>
  export type BusinessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Business$createdByArgs<ExtArgs>
    UserGuest?: boolean | Business$UserGuestArgs<ExtArgs>
    UserBusiness?: boolean | Business$UserBusinessArgs<ExtArgs>
    subscriptions?: boolean | Business$subscriptionsArgs<ExtArgs>
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BusinessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Business$createdByArgs<ExtArgs>
  }
  export type BusinessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Business$createdByArgs<ExtArgs>
  }

  export type $BusinessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Business"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      UserGuest: Prisma.$UserGuestPayload<ExtArgs>[]
      UserBusiness: Prisma.$UserBusinessPayload<ExtArgs>[]
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      businessId: string
      businessName: string
      businessType: string
      businessDocumentType: string
      businessDocumentNumber: string
      businessEmail: string
      businessPhoneNumber: string
      businessCodePhoneNumber: string
      businessCountry: string
      businessCodeWhatsappNumber: string | null
      businessWhatsappNumber: string | null
      businessConnectionDB: string | null
      businessEntity: $Enums.BusinessEntity
      businessStatus: $Enums.BusinessStatus
      businessProcess: Prisma.JsonValue | null
      createdByUserId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["business"]>
    composites: {}
  }

  type BusinessGetPayload<S extends boolean | null | undefined | BusinessDefaultArgs> = $Result.GetResult<Prisma.$BusinessPayload, S>

  type BusinessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessCountAggregateInputType | true
    }

  export interface BusinessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Business'], meta: { name: 'Business' } }
    /**
     * Find zero or one Business that matches the filter.
     * @param {BusinessFindUniqueArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessFindUniqueArgs>(args: SelectSubset<T, BusinessFindUniqueArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Business that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessFindUniqueOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessFindFirstArgs>(args?: SelectSubset<T, BusinessFindFirstArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Businesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Businesses
     * const businesses = await prisma.business.findMany()
     * 
     * // Get first 10 Businesses
     * const businesses = await prisma.business.findMany({ take: 10 })
     * 
     * // Only select the `businessId`
     * const businessWithBusinessIdOnly = await prisma.business.findMany({ select: { businessId: true } })
     * 
     */
    findMany<T extends BusinessFindManyArgs>(args?: SelectSubset<T, BusinessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Business.
     * @param {BusinessCreateArgs} args - Arguments to create a Business.
     * @example
     * // Create one Business
     * const Business = await prisma.business.create({
     *   data: {
     *     // ... data to create a Business
     *   }
     * })
     * 
     */
    create<T extends BusinessCreateArgs>(args: SelectSubset<T, BusinessCreateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Businesses.
     * @param {BusinessCreateManyArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessCreateManyArgs>(args?: SelectSubset<T, BusinessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Businesses and returns the data saved in the database.
     * @param {BusinessCreateManyAndReturnArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Businesses and only return the `businessId`
     * const businessWithBusinessIdOnly = await prisma.business.createManyAndReturn({
     *   select: { businessId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Business.
     * @param {BusinessDeleteArgs} args - Arguments to delete one Business.
     * @example
     * // Delete one Business
     * const Business = await prisma.business.delete({
     *   where: {
     *     // ... filter to delete one Business
     *   }
     * })
     * 
     */
    delete<T extends BusinessDeleteArgs>(args: SelectSubset<T, BusinessDeleteArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Business.
     * @param {BusinessUpdateArgs} args - Arguments to update one Business.
     * @example
     * // Update one Business
     * const business = await prisma.business.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUpdateArgs>(args: SelectSubset<T, BusinessUpdateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Businesses.
     * @param {BusinessDeleteManyArgs} args - Arguments to filter Businesses to delete.
     * @example
     * // Delete a few Businesses
     * const { count } = await prisma.business.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessDeleteManyArgs>(args?: SelectSubset<T, BusinessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUpdateManyArgs>(args: SelectSubset<T, BusinessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses and returns the data updated in the database.
     * @param {BusinessUpdateManyAndReturnArgs} args - Arguments to update many Businesses.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Businesses and only return the `businessId`
     * const businessWithBusinessIdOnly = await prisma.business.updateManyAndReturn({
     *   select: { businessId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusinessUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Business.
     * @param {BusinessUpsertArgs} args - Arguments to update or create a Business.
     * @example
     * // Update or create a Business
     * const business = await prisma.business.upsert({
     *   create: {
     *     // ... data to create a Business
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Business we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUpsertArgs>(args: SelectSubset<T, BusinessUpsertArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessCountArgs} args - Arguments to filter Businesses to count.
     * @example
     * // Count the number of Businesses
     * const count = await prisma.business.count({
     *   where: {
     *     // ... the filter for the Businesses we want to count
     *   }
     * })
    **/
    count<T extends BusinessCountArgs>(
      args?: Subset<T, BusinessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessAggregateArgs>(args: Subset<T, BusinessAggregateArgs>): Prisma.PrismaPromise<GetBusinessAggregateType<T>>

    /**
     * Group by Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessGroupByArgs['orderBy'] }
        : { orderBy?: BusinessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Business model
   */
  readonly fields: BusinessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Business.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Business$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Business$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    UserGuest<T extends Business$UserGuestArgs<ExtArgs> = {}>(args?: Subset<T, Business$UserGuestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    UserBusiness<T extends Business$UserBusinessArgs<ExtArgs> = {}>(args?: Subset<T, Business$UserBusinessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends Business$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Business$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Business model
   */
  interface BusinessFieldRefs {
    readonly businessId: FieldRef<"Business", 'String'>
    readonly businessName: FieldRef<"Business", 'String'>
    readonly businessType: FieldRef<"Business", 'String'>
    readonly businessDocumentType: FieldRef<"Business", 'String'>
    readonly businessDocumentNumber: FieldRef<"Business", 'String'>
    readonly businessEmail: FieldRef<"Business", 'String'>
    readonly businessPhoneNumber: FieldRef<"Business", 'String'>
    readonly businessCodePhoneNumber: FieldRef<"Business", 'String'>
    readonly businessCountry: FieldRef<"Business", 'String'>
    readonly businessCodeWhatsappNumber: FieldRef<"Business", 'String'>
    readonly businessWhatsappNumber: FieldRef<"Business", 'String'>
    readonly businessConnectionDB: FieldRef<"Business", 'String'>
    readonly businessEntity: FieldRef<"Business", 'BusinessEntity'>
    readonly businessStatus: FieldRef<"Business", 'BusinessStatus'>
    readonly businessProcess: FieldRef<"Business", 'Json'>
    readonly createdByUserId: FieldRef<"Business", 'String'>
    readonly createdAt: FieldRef<"Business", 'DateTime'>
    readonly updatedAt: FieldRef<"Business", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Business findUnique
   */
  export type BusinessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findUniqueOrThrow
   */
  export type BusinessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findFirst
   */
  export type BusinessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findFirstOrThrow
   */
  export type BusinessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findMany
   */
  export type BusinessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Businesses to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business create
   */
  export type BusinessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The data needed to create a Business.
     */
    data: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
  }

  /**
   * Business createMany
   */
  export type BusinessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Business createManyAndReturn
   */
  export type BusinessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Business update
   */
  export type BusinessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The data needed to update a Business.
     */
    data: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
    /**
     * Choose, which Business to update.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business updateMany
   */
  export type BusinessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
  }

  /**
   * Business updateManyAndReturn
   */
  export type BusinessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Business upsert
   */
  export type BusinessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The filter to search for the Business to update in case it exists.
     */
    where: BusinessWhereUniqueInput
    /**
     * In case the Business found by the `where` argument doesn't exist, create a new Business with this data.
     */
    create: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
    /**
     * In case the Business was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
  }

  /**
   * Business delete
   */
  export type BusinessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter which Business to delete.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business deleteMany
   */
  export type BusinessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Businesses to delete
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to delete.
     */
    limit?: number
  }

  /**
   * Business.createdBy
   */
  export type Business$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Business.UserGuest
   */
  export type Business$UserGuestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    where?: UserGuestWhereInput
    orderBy?: UserGuestOrderByWithRelationInput | UserGuestOrderByWithRelationInput[]
    cursor?: UserGuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGuestScalarFieldEnum | UserGuestScalarFieldEnum[]
  }

  /**
   * Business.UserBusiness
   */
  export type Business$UserBusinessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    where?: UserBusinessWhereInput
    orderBy?: UserBusinessOrderByWithRelationInput | UserBusinessOrderByWithRelationInput[]
    cursor?: UserBusinessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[]
  }

  /**
   * Business.subscriptions
   */
  export type Business$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Business without action
   */
  export type BusinessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
  }


  /**
   * Model UserBusiness
   */

  export type AggregateUserBusiness = {
    _count: UserBusinessCountAggregateOutputType | null
    _min: UserBusinessMinAggregateOutputType | null
    _max: UserBusinessMaxAggregateOutputType | null
  }

  export type UserBusinessMinAggregateOutputType = {
    userBusinessUserId: string | null
    userBusinessBusinessId: string | null
    userBusinessRole: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserBusinessMaxAggregateOutputType = {
    userBusinessUserId: string | null
    userBusinessBusinessId: string | null
    userBusinessRole: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserBusinessCountAggregateOutputType = {
    userBusinessUserId: number
    userBusinessBusinessId: number
    userBusinessRole: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserBusinessMinAggregateInputType = {
    userBusinessUserId?: true
    userBusinessBusinessId?: true
    userBusinessRole?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserBusinessMaxAggregateInputType = {
    userBusinessUserId?: true
    userBusinessBusinessId?: true
    userBusinessRole?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserBusinessCountAggregateInputType = {
    userBusinessUserId?: true
    userBusinessBusinessId?: true
    userBusinessRole?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserBusinessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBusiness to aggregate.
     */
    where?: UserBusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?: UserBusinessOrderByWithRelationInput | UserBusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserBusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBusinesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserBusinesses
    **/
    _count?: true | UserBusinessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserBusinessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserBusinessMaxAggregateInputType
  }

  export type GetUserBusinessAggregateType<T extends UserBusinessAggregateArgs> = {
        [P in keyof T & keyof AggregateUserBusiness]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBusiness[P]>
      : GetScalarType<T[P], AggregateUserBusiness[P]>
  }




  export type UserBusinessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBusinessWhereInput
    orderBy?: UserBusinessOrderByWithAggregationInput | UserBusinessOrderByWithAggregationInput[]
    by: UserBusinessScalarFieldEnum[] | UserBusinessScalarFieldEnum
    having?: UserBusinessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserBusinessCountAggregateInputType | true
    _min?: UserBusinessMinAggregateInputType
    _max?: UserBusinessMaxAggregateInputType
  }

  export type UserBusinessGroupByOutputType = {
    userBusinessUserId: string
    userBusinessBusinessId: string
    userBusinessRole: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserBusinessCountAggregateOutputType | null
    _min: UserBusinessMinAggregateOutputType | null
    _max: UserBusinessMaxAggregateOutputType | null
  }

  type GetUserBusinessGroupByPayload<T extends UserBusinessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserBusinessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserBusinessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBusinessGroupByOutputType[P]>
            : GetScalarType<T[P], UserBusinessGroupByOutputType[P]>
        }
      >
    >


  export type UserBusinessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userBusinessUserId?: boolean
    userBusinessBusinessId?: boolean
    userBusinessRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBusiness"]>

  export type UserBusinessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userBusinessUserId?: boolean
    userBusinessBusinessId?: boolean
    userBusinessRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBusiness"]>

  export type UserBusinessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userBusinessUserId?: boolean
    userBusinessBusinessId?: boolean
    userBusinessRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBusiness"]>

  export type UserBusinessSelectScalar = {
    userBusinessUserId?: boolean
    userBusinessBusinessId?: boolean
    userBusinessRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserBusinessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userBusinessUserId" | "userBusinessBusinessId" | "userBusinessRole" | "createdAt" | "updatedAt", ExtArgs["result"]["userBusiness"]>
  export type UserBusinessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type UserBusinessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type UserBusinessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }

  export type $UserBusinessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserBusiness"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
      Business: Prisma.$BusinessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userBusinessUserId: string
      userBusinessBusinessId: string
      userBusinessRole: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userBusiness"]>
    composites: {}
  }

  type UserBusinessGetPayload<S extends boolean | null | undefined | UserBusinessDefaultArgs> = $Result.GetResult<Prisma.$UserBusinessPayload, S>

  type UserBusinessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserBusinessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserBusinessCountAggregateInputType | true
    }

  export interface UserBusinessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserBusiness'], meta: { name: 'UserBusiness' } }
    /**
     * Find zero or one UserBusiness that matches the filter.
     * @param {UserBusinessFindUniqueArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserBusinessFindUniqueArgs>(args: SelectSubset<T, UserBusinessFindUniqueArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserBusiness that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserBusinessFindUniqueOrThrowArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserBusinessFindUniqueOrThrowArgs>(args: SelectSubset<T, UserBusinessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBusiness that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessFindFirstArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserBusinessFindFirstArgs>(args?: SelectSubset<T, UserBusinessFindFirstArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBusiness that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessFindFirstOrThrowArgs} args - Arguments to find a UserBusiness
     * @example
     * // Get one UserBusiness
     * const userBusiness = await prisma.userBusiness.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserBusinessFindFirstOrThrowArgs>(args?: SelectSubset<T, UserBusinessFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserBusinesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBusinesses
     * const userBusinesses = await prisma.userBusiness.findMany()
     * 
     * // Get first 10 UserBusinesses
     * const userBusinesses = await prisma.userBusiness.findMany({ take: 10 })
     * 
     * // Only select the `userBusinessUserId`
     * const userBusinessWithUserBusinessUserIdOnly = await prisma.userBusiness.findMany({ select: { userBusinessUserId: true } })
     * 
     */
    findMany<T extends UserBusinessFindManyArgs>(args?: SelectSubset<T, UserBusinessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserBusiness.
     * @param {UserBusinessCreateArgs} args - Arguments to create a UserBusiness.
     * @example
     * // Create one UserBusiness
     * const UserBusiness = await prisma.userBusiness.create({
     *   data: {
     *     // ... data to create a UserBusiness
     *   }
     * })
     * 
     */
    create<T extends UserBusinessCreateArgs>(args: SelectSubset<T, UserBusinessCreateArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserBusinesses.
     * @param {UserBusinessCreateManyArgs} args - Arguments to create many UserBusinesses.
     * @example
     * // Create many UserBusinesses
     * const userBusiness = await prisma.userBusiness.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserBusinessCreateManyArgs>(args?: SelectSubset<T, UserBusinessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserBusinesses and returns the data saved in the database.
     * @param {UserBusinessCreateManyAndReturnArgs} args - Arguments to create many UserBusinesses.
     * @example
     * // Create many UserBusinesses
     * const userBusiness = await prisma.userBusiness.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserBusinesses and only return the `userBusinessUserId`
     * const userBusinessWithUserBusinessUserIdOnly = await prisma.userBusiness.createManyAndReturn({
     *   select: { userBusinessUserId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserBusinessCreateManyAndReturnArgs>(args?: SelectSubset<T, UserBusinessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserBusiness.
     * @param {UserBusinessDeleteArgs} args - Arguments to delete one UserBusiness.
     * @example
     * // Delete one UserBusiness
     * const UserBusiness = await prisma.userBusiness.delete({
     *   where: {
     *     // ... filter to delete one UserBusiness
     *   }
     * })
     * 
     */
    delete<T extends UserBusinessDeleteArgs>(args: SelectSubset<T, UserBusinessDeleteArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserBusiness.
     * @param {UserBusinessUpdateArgs} args - Arguments to update one UserBusiness.
     * @example
     * // Update one UserBusiness
     * const userBusiness = await prisma.userBusiness.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserBusinessUpdateArgs>(args: SelectSubset<T, UserBusinessUpdateArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserBusinesses.
     * @param {UserBusinessDeleteManyArgs} args - Arguments to filter UserBusinesses to delete.
     * @example
     * // Delete a few UserBusinesses
     * const { count } = await prisma.userBusiness.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserBusinessDeleteManyArgs>(args?: SelectSubset<T, UserBusinessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBusinesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBusinesses
     * const userBusiness = await prisma.userBusiness.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserBusinessUpdateManyArgs>(args: SelectSubset<T, UserBusinessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBusinesses and returns the data updated in the database.
     * @param {UserBusinessUpdateManyAndReturnArgs} args - Arguments to update many UserBusinesses.
     * @example
     * // Update many UserBusinesses
     * const userBusiness = await prisma.userBusiness.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserBusinesses and only return the `userBusinessUserId`
     * const userBusinessWithUserBusinessUserIdOnly = await prisma.userBusiness.updateManyAndReturn({
     *   select: { userBusinessUserId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserBusinessUpdateManyAndReturnArgs>(args: SelectSubset<T, UserBusinessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserBusiness.
     * @param {UserBusinessUpsertArgs} args - Arguments to update or create a UserBusiness.
     * @example
     * // Update or create a UserBusiness
     * const userBusiness = await prisma.userBusiness.upsert({
     *   create: {
     *     // ... data to create a UserBusiness
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBusiness we want to update
     *   }
     * })
     */
    upsert<T extends UserBusinessUpsertArgs>(args: SelectSubset<T, UserBusinessUpsertArgs<ExtArgs>>): Prisma__UserBusinessClient<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserBusinesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessCountArgs} args - Arguments to filter UserBusinesses to count.
     * @example
     * // Count the number of UserBusinesses
     * const count = await prisma.userBusiness.count({
     *   where: {
     *     // ... the filter for the UserBusinesses we want to count
     *   }
     * })
    **/
    count<T extends UserBusinessCountArgs>(
      args?: Subset<T, UserBusinessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserBusinessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserBusiness.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserBusinessAggregateArgs>(args: Subset<T, UserBusinessAggregateArgs>): Prisma.PrismaPromise<GetUserBusinessAggregateType<T>>

    /**
     * Group by UserBusiness.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBusinessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserBusinessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBusinessGroupByArgs['orderBy'] }
        : { orderBy?: UserBusinessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserBusinessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserBusinessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserBusiness model
   */
  readonly fields: UserBusinessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBusiness.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBusinessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserBusiness model
   */
  interface UserBusinessFieldRefs {
    readonly userBusinessUserId: FieldRef<"UserBusiness", 'String'>
    readonly userBusinessBusinessId: FieldRef<"UserBusiness", 'String'>
    readonly userBusinessRole: FieldRef<"UserBusiness", 'Role'>
    readonly createdAt: FieldRef<"UserBusiness", 'DateTime'>
    readonly updatedAt: FieldRef<"UserBusiness", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserBusiness findUnique
   */
  export type UserBusinessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * Filter, which UserBusiness to fetch.
     */
    where: UserBusinessWhereUniqueInput
  }

  /**
   * UserBusiness findUniqueOrThrow
   */
  export type UserBusinessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * Filter, which UserBusiness to fetch.
     */
    where: UserBusinessWhereUniqueInput
  }

  /**
   * UserBusiness findFirst
   */
  export type UserBusinessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * Filter, which UserBusiness to fetch.
     */
    where?: UserBusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?: UserBusinessOrderByWithRelationInput | UserBusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBusinesses.
     */
    cursor?: UserBusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBusinesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBusinesses.
     */
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[]
  }

  /**
   * UserBusiness findFirstOrThrow
   */
  export type UserBusinessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * Filter, which UserBusiness to fetch.
     */
    where?: UserBusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?: UserBusinessOrderByWithRelationInput | UserBusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBusinesses.
     */
    cursor?: UserBusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBusinesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBusinesses.
     */
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[]
  }

  /**
   * UserBusiness findMany
   */
  export type UserBusinessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * Filter, which UserBusinesses to fetch.
     */
    where?: UserBusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBusinesses to fetch.
     */
    orderBy?: UserBusinessOrderByWithRelationInput | UserBusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserBusinesses.
     */
    cursor?: UserBusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBusinesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBusinesses.
     */
    skip?: number
    distinct?: UserBusinessScalarFieldEnum | UserBusinessScalarFieldEnum[]
  }

  /**
   * UserBusiness create
   */
  export type UserBusinessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * The data needed to create a UserBusiness.
     */
    data: XOR<UserBusinessCreateInput, UserBusinessUncheckedCreateInput>
  }

  /**
   * UserBusiness createMany
   */
  export type UserBusinessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserBusinesses.
     */
    data: UserBusinessCreateManyInput | UserBusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserBusiness createManyAndReturn
   */
  export type UserBusinessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * The data used to create many UserBusinesses.
     */
    data: UserBusinessCreateManyInput | UserBusinessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserBusiness update
   */
  export type UserBusinessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * The data needed to update a UserBusiness.
     */
    data: XOR<UserBusinessUpdateInput, UserBusinessUncheckedUpdateInput>
    /**
     * Choose, which UserBusiness to update.
     */
    where: UserBusinessWhereUniqueInput
  }

  /**
   * UserBusiness updateMany
   */
  export type UserBusinessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserBusinesses.
     */
    data: XOR<UserBusinessUpdateManyMutationInput, UserBusinessUncheckedUpdateManyInput>
    /**
     * Filter which UserBusinesses to update
     */
    where?: UserBusinessWhereInput
    /**
     * Limit how many UserBusinesses to update.
     */
    limit?: number
  }

  /**
   * UserBusiness updateManyAndReturn
   */
  export type UserBusinessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * The data used to update UserBusinesses.
     */
    data: XOR<UserBusinessUpdateManyMutationInput, UserBusinessUncheckedUpdateManyInput>
    /**
     * Filter which UserBusinesses to update
     */
    where?: UserBusinessWhereInput
    /**
     * Limit how many UserBusinesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserBusiness upsert
   */
  export type UserBusinessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * The filter to search for the UserBusiness to update in case it exists.
     */
    where: UserBusinessWhereUniqueInput
    /**
     * In case the UserBusiness found by the `where` argument doesn't exist, create a new UserBusiness with this data.
     */
    create: XOR<UserBusinessCreateInput, UserBusinessUncheckedCreateInput>
    /**
     * In case the UserBusiness was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBusinessUpdateInput, UserBusinessUncheckedUpdateInput>
  }

  /**
   * UserBusiness delete
   */
  export type UserBusinessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
    /**
     * Filter which UserBusiness to delete.
     */
    where: UserBusinessWhereUniqueInput
  }

  /**
   * UserBusiness deleteMany
   */
  export type UserBusinessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBusinesses to delete
     */
    where?: UserBusinessWhereInput
    /**
     * Limit how many UserBusinesses to delete.
     */
    limit?: number
  }

  /**
   * UserBusiness without action
   */
  export type UserBusinessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBusiness
     */
    select?: UserBusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBusiness
     */
    omit?: UserBusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBusinessInclude<ExtArgs> | null
  }


  /**
   * Model UserGuest
   */

  export type AggregateUserGuest = {
    _count: UserGuestCountAggregateOutputType | null
    _min: UserGuestMinAggregateOutputType | null
    _max: UserGuestMaxAggregateOutputType | null
  }

  export type UserGuestMinAggregateOutputType = {
    userGuestId: string | null
    userGuestEmail: string | null
    userGuestUserId: string | null
    userGuestBusinessId: string | null
    userGuestRole: $Enums.Role | null
    userGuestStatus: $Enums.UserGuestStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserGuestMaxAggregateOutputType = {
    userGuestId: string | null
    userGuestEmail: string | null
    userGuestUserId: string | null
    userGuestBusinessId: string | null
    userGuestRole: $Enums.Role | null
    userGuestStatus: $Enums.UserGuestStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserGuestCountAggregateOutputType = {
    userGuestId: number
    userGuestEmail: number
    userGuestUserId: number
    userGuestBusinessId: number
    userGuestRole: number
    userGuestStatus: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserGuestMinAggregateInputType = {
    userGuestId?: true
    userGuestEmail?: true
    userGuestUserId?: true
    userGuestBusinessId?: true
    userGuestRole?: true
    userGuestStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserGuestMaxAggregateInputType = {
    userGuestId?: true
    userGuestEmail?: true
    userGuestUserId?: true
    userGuestBusinessId?: true
    userGuestRole?: true
    userGuestStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserGuestCountAggregateInputType = {
    userGuestId?: true
    userGuestEmail?: true
    userGuestUserId?: true
    userGuestBusinessId?: true
    userGuestRole?: true
    userGuestStatus?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserGuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGuest to aggregate.
     */
    where?: UserGuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGuests to fetch.
     */
    orderBy?: UserGuestOrderByWithRelationInput | UserGuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGuests
    **/
    _count?: true | UserGuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGuestMaxAggregateInputType
  }

  export type GetUserGuestAggregateType<T extends UserGuestAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGuest[P]>
      : GetScalarType<T[P], AggregateUserGuest[P]>
  }




  export type UserGuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGuestWhereInput
    orderBy?: UserGuestOrderByWithAggregationInput | UserGuestOrderByWithAggregationInput[]
    by: UserGuestScalarFieldEnum[] | UserGuestScalarFieldEnum
    having?: UserGuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGuestCountAggregateInputType | true
    _min?: UserGuestMinAggregateInputType
    _max?: UserGuestMaxAggregateInputType
  }

  export type UserGuestGroupByOutputType = {
    userGuestId: string
    userGuestEmail: string
    userGuestUserId: string
    userGuestBusinessId: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt: Date
    updatedAt: Date
    _count: UserGuestCountAggregateOutputType | null
    _min: UserGuestMinAggregateOutputType | null
    _max: UserGuestMaxAggregateOutputType | null
  }

  type GetUserGuestGroupByPayload<T extends UserGuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGuestGroupByOutputType[P]>
            : GetScalarType<T[P], UserGuestGroupByOutputType[P]>
        }
      >
    >


  export type UserGuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userGuestId?: boolean
    userGuestEmail?: boolean
    userGuestUserId?: boolean
    userGuestBusinessId?: boolean
    userGuestRole?: boolean
    userGuestStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGuest"]>

  export type UserGuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userGuestId?: boolean
    userGuestEmail?: boolean
    userGuestUserId?: boolean
    userGuestBusinessId?: boolean
    userGuestRole?: boolean
    userGuestStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGuest"]>

  export type UserGuestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userGuestId?: boolean
    userGuestEmail?: boolean
    userGuestUserId?: boolean
    userGuestBusinessId?: boolean
    userGuestRole?: boolean
    userGuestStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGuest"]>

  export type UserGuestSelectScalar = {
    userGuestId?: boolean
    userGuestEmail?: boolean
    userGuestUserId?: boolean
    userGuestBusinessId?: boolean
    userGuestRole?: boolean
    userGuestStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserGuestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userGuestId" | "userGuestEmail" | "userGuestUserId" | "userGuestBusinessId" | "userGuestRole" | "userGuestStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["userGuest"]>
  export type UserGuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type UserGuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type UserGuestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Business?: boolean | BusinessDefaultArgs<ExtArgs>
  }

  export type $UserGuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGuest"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
      Business: Prisma.$BusinessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userGuestId: string
      userGuestEmail: string
      userGuestUserId: string
      userGuestBusinessId: string
      userGuestRole: $Enums.Role
      userGuestStatus: $Enums.UserGuestStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userGuest"]>
    composites: {}
  }

  type UserGuestGetPayload<S extends boolean | null | undefined | UserGuestDefaultArgs> = $Result.GetResult<Prisma.$UserGuestPayload, S>

  type UserGuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGuestCountAggregateInputType | true
    }

  export interface UserGuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGuest'], meta: { name: 'UserGuest' } }
    /**
     * Find zero or one UserGuest that matches the filter.
     * @param {UserGuestFindUniqueArgs} args - Arguments to find a UserGuest
     * @example
     * // Get one UserGuest
     * const userGuest = await prisma.userGuest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGuestFindUniqueArgs>(args: SelectSubset<T, UserGuestFindUniqueArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGuest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGuestFindUniqueOrThrowArgs} args - Arguments to find a UserGuest
     * @example
     * // Get one UserGuest
     * const userGuest = await prisma.userGuest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGuestFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGuest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGuestFindFirstArgs} args - Arguments to find a UserGuest
     * @example
     * // Get one UserGuest
     * const userGuest = await prisma.userGuest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGuestFindFirstArgs>(args?: SelectSubset<T, UserGuestFindFirstArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGuest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGuestFindFirstOrThrowArgs} args - Arguments to find a UserGuest
     * @example
     * // Get one UserGuest
     * const userGuest = await prisma.userGuest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGuestFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGuests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGuests
     * const userGuests = await prisma.userGuest.findMany()
     * 
     * // Get first 10 UserGuests
     * const userGuests = await prisma.userGuest.findMany({ take: 10 })
     * 
     * // Only select the `userGuestId`
     * const userGuestWithUserGuestIdOnly = await prisma.userGuest.findMany({ select: { userGuestId: true } })
     * 
     */
    findMany<T extends UserGuestFindManyArgs>(args?: SelectSubset<T, UserGuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGuest.
     * @param {UserGuestCreateArgs} args - Arguments to create a UserGuest.
     * @example
     * // Create one UserGuest
     * const UserGuest = await prisma.userGuest.create({
     *   data: {
     *     // ... data to create a UserGuest
     *   }
     * })
     * 
     */
    create<T extends UserGuestCreateArgs>(args: SelectSubset<T, UserGuestCreateArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGuests.
     * @param {UserGuestCreateManyArgs} args - Arguments to create many UserGuests.
     * @example
     * // Create many UserGuests
     * const userGuest = await prisma.userGuest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGuestCreateManyArgs>(args?: SelectSubset<T, UserGuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGuests and returns the data saved in the database.
     * @param {UserGuestCreateManyAndReturnArgs} args - Arguments to create many UserGuests.
     * @example
     * // Create many UserGuests
     * const userGuest = await prisma.userGuest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGuests and only return the `userGuestId`
     * const userGuestWithUserGuestIdOnly = await prisma.userGuest.createManyAndReturn({
     *   select: { userGuestId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGuestCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGuest.
     * @param {UserGuestDeleteArgs} args - Arguments to delete one UserGuest.
     * @example
     * // Delete one UserGuest
     * const UserGuest = await prisma.userGuest.delete({
     *   where: {
     *     // ... filter to delete one UserGuest
     *   }
     * })
     * 
     */
    delete<T extends UserGuestDeleteArgs>(args: SelectSubset<T, UserGuestDeleteArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGuest.
     * @param {UserGuestUpdateArgs} args - Arguments to update one UserGuest.
     * @example
     * // Update one UserGuest
     * const userGuest = await prisma.userGuest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGuestUpdateArgs>(args: SelectSubset<T, UserGuestUpdateArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGuests.
     * @param {UserGuestDeleteManyArgs} args - Arguments to filter UserGuests to delete.
     * @example
     * // Delete a few UserGuests
     * const { count } = await prisma.userGuest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGuestDeleteManyArgs>(args?: SelectSubset<T, UserGuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGuests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGuests
     * const userGuest = await prisma.userGuest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGuestUpdateManyArgs>(args: SelectSubset<T, UserGuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGuests and returns the data updated in the database.
     * @param {UserGuestUpdateManyAndReturnArgs} args - Arguments to update many UserGuests.
     * @example
     * // Update many UserGuests
     * const userGuest = await prisma.userGuest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGuests and only return the `userGuestId`
     * const userGuestWithUserGuestIdOnly = await prisma.userGuest.updateManyAndReturn({
     *   select: { userGuestId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGuestUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGuest.
     * @param {UserGuestUpsertArgs} args - Arguments to update or create a UserGuest.
     * @example
     * // Update or create a UserGuest
     * const userGuest = await prisma.userGuest.upsert({
     *   create: {
     *     // ... data to create a UserGuest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGuest we want to update
     *   }
     * })
     */
    upsert<T extends UserGuestUpsertArgs>(args: SelectSubset<T, UserGuestUpsertArgs<ExtArgs>>): Prisma__UserGuestClient<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGuests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGuestCountArgs} args - Arguments to filter UserGuests to count.
     * @example
     * // Count the number of UserGuests
     * const count = await prisma.userGuest.count({
     *   where: {
     *     // ... the filter for the UserGuests we want to count
     *   }
     * })
    **/
    count<T extends UserGuestCountArgs>(
      args?: Subset<T, UserGuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGuest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserGuestAggregateArgs>(args: Subset<T, UserGuestAggregateArgs>): Prisma.PrismaPromise<GetUserGuestAggregateType<T>>

    /**
     * Group by UserGuest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGuestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGuestGroupByArgs['orderBy'] }
        : { orderBy?: UserGuestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGuest model
   */
  readonly fields: UserGuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGuest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserGuest model
   */
  interface UserGuestFieldRefs {
    readonly userGuestId: FieldRef<"UserGuest", 'String'>
    readonly userGuestEmail: FieldRef<"UserGuest", 'String'>
    readonly userGuestUserId: FieldRef<"UserGuest", 'String'>
    readonly userGuestBusinessId: FieldRef<"UserGuest", 'String'>
    readonly userGuestRole: FieldRef<"UserGuest", 'Role'>
    readonly userGuestStatus: FieldRef<"UserGuest", 'UserGuestStatus'>
    readonly createdAt: FieldRef<"UserGuest", 'DateTime'>
    readonly updatedAt: FieldRef<"UserGuest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserGuest findUnique
   */
  export type UserGuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * Filter, which UserGuest to fetch.
     */
    where: UserGuestWhereUniqueInput
  }

  /**
   * UserGuest findUniqueOrThrow
   */
  export type UserGuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * Filter, which UserGuest to fetch.
     */
    where: UserGuestWhereUniqueInput
  }

  /**
   * UserGuest findFirst
   */
  export type UserGuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * Filter, which UserGuest to fetch.
     */
    where?: UserGuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGuests to fetch.
     */
    orderBy?: UserGuestOrderByWithRelationInput | UserGuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGuests.
     */
    cursor?: UserGuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGuests.
     */
    distinct?: UserGuestScalarFieldEnum | UserGuestScalarFieldEnum[]
  }

  /**
   * UserGuest findFirstOrThrow
   */
  export type UserGuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * Filter, which UserGuest to fetch.
     */
    where?: UserGuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGuests to fetch.
     */
    orderBy?: UserGuestOrderByWithRelationInput | UserGuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGuests.
     */
    cursor?: UserGuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGuests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGuests.
     */
    distinct?: UserGuestScalarFieldEnum | UserGuestScalarFieldEnum[]
  }

  /**
   * UserGuest findMany
   */
  export type UserGuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * Filter, which UserGuests to fetch.
     */
    where?: UserGuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGuests to fetch.
     */
    orderBy?: UserGuestOrderByWithRelationInput | UserGuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGuests.
     */
    cursor?: UserGuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGuests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGuests.
     */
    skip?: number
    distinct?: UserGuestScalarFieldEnum | UserGuestScalarFieldEnum[]
  }

  /**
   * UserGuest create
   */
  export type UserGuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGuest.
     */
    data: XOR<UserGuestCreateInput, UserGuestUncheckedCreateInput>
  }

  /**
   * UserGuest createMany
   */
  export type UserGuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGuests.
     */
    data: UserGuestCreateManyInput | UserGuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGuest createManyAndReturn
   */
  export type UserGuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * The data used to create many UserGuests.
     */
    data: UserGuestCreateManyInput | UserGuestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGuest update
   */
  export type UserGuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGuest.
     */
    data: XOR<UserGuestUpdateInput, UserGuestUncheckedUpdateInput>
    /**
     * Choose, which UserGuest to update.
     */
    where: UserGuestWhereUniqueInput
  }

  /**
   * UserGuest updateMany
   */
  export type UserGuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGuests.
     */
    data: XOR<UserGuestUpdateManyMutationInput, UserGuestUncheckedUpdateManyInput>
    /**
     * Filter which UserGuests to update
     */
    where?: UserGuestWhereInput
    /**
     * Limit how many UserGuests to update.
     */
    limit?: number
  }

  /**
   * UserGuest updateManyAndReturn
   */
  export type UserGuestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * The data used to update UserGuests.
     */
    data: XOR<UserGuestUpdateManyMutationInput, UserGuestUncheckedUpdateManyInput>
    /**
     * Filter which UserGuests to update
     */
    where?: UserGuestWhereInput
    /**
     * Limit how many UserGuests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGuest upsert
   */
  export type UserGuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGuest to update in case it exists.
     */
    where: UserGuestWhereUniqueInput
    /**
     * In case the UserGuest found by the `where` argument doesn't exist, create a new UserGuest with this data.
     */
    create: XOR<UserGuestCreateInput, UserGuestUncheckedCreateInput>
    /**
     * In case the UserGuest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGuestUpdateInput, UserGuestUncheckedUpdateInput>
  }

  /**
   * UserGuest delete
   */
  export type UserGuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
    /**
     * Filter which UserGuest to delete.
     */
    where: UserGuestWhereUniqueInput
  }

  /**
   * UserGuest deleteMany
   */
  export type UserGuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGuests to delete
     */
    where?: UserGuestWhereInput
    /**
     * Limit how many UserGuests to delete.
     */
    limit?: number
  }

  /**
   * UserGuest without action
   */
  export type UserGuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGuest
     */
    select?: UserGuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGuest
     */
    omit?: UserGuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGuestInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    planPrice: number | null
    planDuration: number | null
  }

  export type PlanSumAggregateOutputType = {
    planPrice: number | null
    planDuration: number | null
  }

  export type PlanMinAggregateOutputType = {
    planId: string | null
    planName: string | null
    planPrice: number | null
    planDuration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    planId: string | null
    planName: string | null
    planPrice: number | null
    planDuration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    planId: number
    planName: number
    planFeatures: number
    planPrice: number
    planDuration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    planPrice?: true
    planDuration?: true
  }

  export type PlanSumAggregateInputType = {
    planPrice?: true
    planDuration?: true
  }

  export type PlanMinAggregateInputType = {
    planId?: true
    planName?: true
    planPrice?: true
    planDuration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    planId?: true
    planName?: true
    planPrice?: true
    planDuration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    planId?: true
    planName?: true
    planFeatures?: true
    planPrice?: true
    planDuration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    planId: string
    planName: string
    planFeatures: JsonValue
    planPrice: number
    planDuration: number
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    planId?: boolean
    planName?: boolean
    planFeatures?: boolean
    planPrice?: boolean
    planDuration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptions?: boolean | Plan$subscriptionsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    planId?: boolean
    planName?: boolean
    planFeatures?: boolean
    planPrice?: boolean
    planDuration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    planId?: boolean
    planName?: boolean
    planFeatures?: boolean
    planPrice?: boolean
    planDuration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    planId?: boolean
    planName?: boolean
    planFeatures?: boolean
    planPrice?: boolean
    planDuration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"planId" | "planName" | "planFeatures" | "planPrice" | "planDuration" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | Plan$subscriptionsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      planId: string
      planName: string
      planFeatures: Prisma.JsonValue
      planPrice: number
      planDuration: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `planId`
     * const planWithPlanIdOnly = await prisma.plan.findMany({ select: { planId: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `planId`
     * const planWithPlanIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { planId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `planId`
     * const planWithPlanIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { planId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends Plan$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly planId: FieldRef<"Plan", 'String'>
    readonly planName: FieldRef<"Plan", 'String'>
    readonly planFeatures: FieldRef<"Plan", 'Json'>
    readonly planPrice: FieldRef<"Plan", 'Float'>
    readonly planDuration: FieldRef<"Plan", 'Int'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.subscriptions
   */
  export type Plan$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    subscriptionDuration: number | null
    subscriptionAmount: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    subscriptionDuration: number | null
    subscriptionAmount: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    subscriptionId: string | null
    subscriptionBusinessId: string | null
    subscriptionPlanId: string | null
    subscriptionStartDate: Date | null
    subscriptionDuration: number | null
    subscriptionEndDate: Date | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    subscriptionAmount: number | null
    subscriptionPaymentMethod: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    subscriptionId: string | null
    subscriptionBusinessId: string | null
    subscriptionPlanId: string | null
    subscriptionStartDate: Date | null
    subscriptionDuration: number | null
    subscriptionEndDate: Date | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    subscriptionAmount: number | null
    subscriptionPaymentMethod: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    subscriptionId: number
    subscriptionBusinessId: number
    subscriptionPlanId: number
    subscriptionStartDate: number
    subscriptionDuration: number
    subscriptionEndDate: number
    subscriptionStatus: number
    subscriptionAmount: number
    subscriptionPaymentMethod: number
    subscriptionPlanFeatures: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    subscriptionDuration?: true
    subscriptionAmount?: true
  }

  export type SubscriptionSumAggregateInputType = {
    subscriptionDuration?: true
    subscriptionAmount?: true
  }

  export type SubscriptionMinAggregateInputType = {
    subscriptionId?: true
    subscriptionBusinessId?: true
    subscriptionPlanId?: true
    subscriptionStartDate?: true
    subscriptionDuration?: true
    subscriptionEndDate?: true
    subscriptionStatus?: true
    subscriptionAmount?: true
    subscriptionPaymentMethod?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    subscriptionId?: true
    subscriptionBusinessId?: true
    subscriptionPlanId?: true
    subscriptionStartDate?: true
    subscriptionDuration?: true
    subscriptionEndDate?: true
    subscriptionStatus?: true
    subscriptionAmount?: true
    subscriptionPaymentMethod?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    subscriptionId?: true
    subscriptionBusinessId?: true
    subscriptionPlanId?: true
    subscriptionStartDate?: true
    subscriptionDuration?: true
    subscriptionEndDate?: true
    subscriptionStatus?: true
    subscriptionAmount?: true
    subscriptionPaymentMethod?: true
    subscriptionPlanFeatures?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    subscriptionId: string
    subscriptionBusinessId: string
    subscriptionPlanId: string
    subscriptionStartDate: Date
    subscriptionDuration: number
    subscriptionEndDate: Date
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonValue
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subscriptionId?: boolean
    subscriptionBusinessId?: boolean
    subscriptionPlanId?: boolean
    subscriptionStartDate?: boolean
    subscriptionDuration?: boolean
    subscriptionEndDate?: boolean
    subscriptionStatus?: boolean
    subscriptionAmount?: boolean
    subscriptionPaymentMethod?: boolean
    subscriptionPlanFeatures?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subscriptionId?: boolean
    subscriptionBusinessId?: boolean
    subscriptionPlanId?: boolean
    subscriptionStartDate?: boolean
    subscriptionDuration?: boolean
    subscriptionEndDate?: boolean
    subscriptionStatus?: boolean
    subscriptionAmount?: boolean
    subscriptionPaymentMethod?: boolean
    subscriptionPlanFeatures?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subscriptionId?: boolean
    subscriptionBusinessId?: boolean
    subscriptionPlanId?: boolean
    subscriptionStartDate?: boolean
    subscriptionDuration?: boolean
    subscriptionEndDate?: boolean
    subscriptionStatus?: boolean
    subscriptionAmount?: boolean
    subscriptionPaymentMethod?: boolean
    subscriptionPlanFeatures?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    subscriptionId?: boolean
    subscriptionBusinessId?: boolean
    subscriptionPlanId?: boolean
    subscriptionStartDate?: boolean
    subscriptionDuration?: boolean
    subscriptionEndDate?: boolean
    subscriptionStatus?: boolean
    subscriptionAmount?: boolean
    subscriptionPaymentMethod?: boolean
    subscriptionPlanFeatures?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"subscriptionId" | "subscriptionBusinessId" | "subscriptionPlanId" | "subscriptionStartDate" | "subscriptionDuration" | "subscriptionEndDate" | "subscriptionStatus" | "subscriptionAmount" | "subscriptionPaymentMethod" | "subscriptionPlanFeatures" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      plan: Prisma.$PlanPayload<ExtArgs>
      business: Prisma.$BusinessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      subscriptionId: string
      subscriptionBusinessId: string
      subscriptionPlanId: string
      subscriptionStartDate: Date
      subscriptionDuration: number
      subscriptionEndDate: Date
      subscriptionStatus: $Enums.SubscriptionStatus
      subscriptionAmount: number
      subscriptionPaymentMethod: string
      subscriptionPlanFeatures: Prisma.JsonValue
      createdByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `subscriptionId`
     * const subscriptionWithSubscriptionIdOnly = await prisma.subscription.findMany({ select: { subscriptionId: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `subscriptionId`
     * const subscriptionWithSubscriptionIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { subscriptionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `subscriptionId`
     * const subscriptionWithSubscriptionIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { subscriptionId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly subscriptionId: FieldRef<"Subscription", 'String'>
    readonly subscriptionBusinessId: FieldRef<"Subscription", 'String'>
    readonly subscriptionPlanId: FieldRef<"Subscription", 'String'>
    readonly subscriptionStartDate: FieldRef<"Subscription", 'DateTime'>
    readonly subscriptionDuration: FieldRef<"Subscription", 'Int'>
    readonly subscriptionEndDate: FieldRef<"Subscription", 'DateTime'>
    readonly subscriptionStatus: FieldRef<"Subscription", 'SubscriptionStatus'>
    readonly subscriptionAmount: FieldRef<"Subscription", 'Float'>
    readonly subscriptionPaymentMethod: FieldRef<"Subscription", 'String'>
    readonly subscriptionPlanFeatures: FieldRef<"Subscription", 'Json'>
    readonly createdByUserId: FieldRef<"Subscription", 'String'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketMinAggregateOutputType = {
    ticketId: string | null
    ticketNumber: string | null
    ticketSubject: string | null
    ticketType: $Enums.TicketType | null
    ticketStatus: $Enums.TicketStatus | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketMaxAggregateOutputType = {
    ticketId: string | null
    ticketNumber: string | null
    ticketSubject: string | null
    ticketType: $Enums.TicketType | null
    ticketStatus: $Enums.TicketStatus | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketCountAggregateOutputType = {
    ticketId: number
    ticketNumber: number
    ticketSubject: number
    ticketType: number
    ticketStatus: number
    ticketAssociatedTo: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TicketMinAggregateInputType = {
    ticketId?: true
    ticketNumber?: true
    ticketSubject?: true
    ticketType?: true
    ticketStatus?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketMaxAggregateInputType = {
    ticketId?: true
    ticketNumber?: true
    ticketSubject?: true
    ticketType?: true
    ticketStatus?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketCountAggregateInputType = {
    ticketId?: true
    ticketNumber?: true
    ticketSubject?: true
    ticketType?: true
    ticketStatus?: true
    ticketAssociatedTo?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    ticketId: string
    ticketNumber: string | null
    ticketSubject: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo: string[]
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: TicketCountAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ticketId?: boolean
    ticketNumber?: boolean
    ticketSubject?: boolean
    ticketType?: boolean
    ticketStatus?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ticketDetails?: boolean | Ticket$ticketDetailsArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ticketId?: boolean
    ticketNumber?: boolean
    ticketSubject?: boolean
    ticketType?: boolean
    ticketStatus?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ticketId?: boolean
    ticketNumber?: boolean
    ticketSubject?: boolean
    ticketType?: boolean
    ticketStatus?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    ticketId?: boolean
    ticketNumber?: boolean
    ticketSubject?: boolean
    ticketType?: boolean
    ticketStatus?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ticketId" | "ticketNumber" | "ticketSubject" | "ticketType" | "ticketStatus" | "ticketAssociatedTo" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["ticket"]>
  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticketDetails?: boolean | Ticket$ticketDetailsArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      ticketDetails: Prisma.$TicketDetailPayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ticketId: string
      ticketNumber: string | null
      ticketSubject: string | null
      ticketType: $Enums.TicketType
      ticketStatus: $Enums.TicketStatus
      ticketAssociatedTo: string[]
      createdByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }

  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketFindUniqueArgs>(args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ticket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketFindFirstArgs>(args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `ticketId`
     * const ticketWithTicketIdOnly = await prisma.ticket.findMany({ select: { ticketId: true } })
     * 
     */
    findMany<T extends TicketFindManyArgs>(args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
     */
    create<T extends TicketCreateArgs>(args: SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCreateManyArgs>(args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `ticketId`
     * const ticketWithTicketIdOnly = await prisma.ticket.createManyAndReturn({
     *   select: { ticketId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
     */
    delete<T extends TicketDeleteArgs>(args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketUpdateArgs>(args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDeleteManyArgs>(args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketUpdateManyArgs>(args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `ticketId`
     * const ticketWithTicketIdOnly = await prisma.ticket.updateManyAndReturn({
     *   select: { ticketId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
     */
    upsert<T extends TicketUpsertArgs>(args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticketDetails<T extends Ticket$ticketDetailsArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$ticketDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ticket model
   */
  interface TicketFieldRefs {
    readonly ticketId: FieldRef<"Ticket", 'String'>
    readonly ticketNumber: FieldRef<"Ticket", 'String'>
    readonly ticketSubject: FieldRef<"Ticket", 'String'>
    readonly ticketType: FieldRef<"Ticket", 'TicketType'>
    readonly ticketStatus: FieldRef<"Ticket", 'TicketStatus'>
    readonly ticketAssociatedTo: FieldRef<"Ticket", 'String[]'>
    readonly createdByUserId: FieldRef<"Ticket", 'String'>
    readonly createdAt: FieldRef<"Ticket", 'DateTime'>
    readonly updatedAt: FieldRef<"Ticket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }

  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ticket createManyAndReturn
   */
  export type TicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Ticket updateManyAndReturn
   */
  export type TicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }

  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Ticket.ticketDetails
   */
  export type Ticket$ticketDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    where?: TicketDetailWhereInput
    orderBy?: TicketDetailOrderByWithRelationInput | TicketDetailOrderByWithRelationInput[]
    cursor?: TicketDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketDetailScalarFieldEnum | TicketDetailScalarFieldEnum[]
  }

  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
  }


  /**
   * Model TicketDetail
   */

  export type AggregateTicketDetail = {
    _count: TicketDetailCountAggregateOutputType | null
    _min: TicketDetailMinAggregateOutputType | null
    _max: TicketDetailMaxAggregateOutputType | null
  }

  export type TicketDetailMinAggregateOutputType = {
    ticketDetailId: string | null
    ticketDetailNumber: string | null
    ticketId: string | null
    ticketDetailContent: string | null
    createdByUserId: string | null
    ticketDetailOrigin: $Enums.TicketDetailOrigin | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketDetailMaxAggregateOutputType = {
    ticketDetailId: string | null
    ticketDetailNumber: string | null
    ticketId: string | null
    ticketDetailContent: string | null
    createdByUserId: string | null
    ticketDetailOrigin: $Enums.TicketDetailOrigin | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketDetailCountAggregateOutputType = {
    ticketDetailId: number
    ticketDetailNumber: number
    ticketId: number
    ticketDetailContent: number
    ticketDetailImage: number
    ticketAssociatedTo: number
    createdByUserId: number
    ticketDetailOrigin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TicketDetailMinAggregateInputType = {
    ticketDetailId?: true
    ticketDetailNumber?: true
    ticketId?: true
    ticketDetailContent?: true
    createdByUserId?: true
    ticketDetailOrigin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketDetailMaxAggregateInputType = {
    ticketDetailId?: true
    ticketDetailNumber?: true
    ticketId?: true
    ticketDetailContent?: true
    createdByUserId?: true
    ticketDetailOrigin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketDetailCountAggregateInputType = {
    ticketDetailId?: true
    ticketDetailNumber?: true
    ticketId?: true
    ticketDetailContent?: true
    ticketDetailImage?: true
    ticketAssociatedTo?: true
    createdByUserId?: true
    ticketDetailOrigin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TicketDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketDetail to aggregate.
     */
    where?: TicketDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketDetails to fetch.
     */
    orderBy?: TicketDetailOrderByWithRelationInput | TicketDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TicketDetails
    **/
    _count?: true | TicketDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketDetailMaxAggregateInputType
  }

  export type GetTicketDetailAggregateType<T extends TicketDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateTicketDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicketDetail[P]>
      : GetScalarType<T[P], AggregateTicketDetail[P]>
  }




  export type TicketDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketDetailWhereInput
    orderBy?: TicketDetailOrderByWithAggregationInput | TicketDetailOrderByWithAggregationInput[]
    by: TicketDetailScalarFieldEnum[] | TicketDetailScalarFieldEnum
    having?: TicketDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketDetailCountAggregateInputType | true
    _min?: TicketDetailMinAggregateInputType
    _max?: TicketDetailMaxAggregateInputType
  }

  export type TicketDetailGroupByOutputType = {
    ticketDetailId: string
    ticketDetailNumber: string | null
    ticketId: string
    ticketDetailContent: string
    ticketDetailImage: string[]
    ticketAssociatedTo: string[]
    createdByUserId: string
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt: Date
    updatedAt: Date
    _count: TicketDetailCountAggregateOutputType | null
    _min: TicketDetailMinAggregateOutputType | null
    _max: TicketDetailMaxAggregateOutputType | null
  }

  type GetTicketDetailGroupByPayload<T extends TicketDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketDetailGroupByOutputType[P]>
            : GetScalarType<T[P], TicketDetailGroupByOutputType[P]>
        }
      >
    >


  export type TicketDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ticketDetailId?: boolean
    ticketDetailNumber?: boolean
    ticketId?: boolean
    ticketDetailContent?: boolean
    ticketDetailImage?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    ticketDetailOrigin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    Ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketDetail"]>

  export type TicketDetailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ticketDetailId?: boolean
    ticketDetailNumber?: boolean
    ticketId?: boolean
    ticketDetailContent?: boolean
    ticketDetailImage?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    ticketDetailOrigin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    Ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketDetail"]>

  export type TicketDetailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ticketDetailId?: boolean
    ticketDetailNumber?: boolean
    ticketId?: boolean
    ticketDetailContent?: boolean
    ticketDetailImage?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    ticketDetailOrigin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    Ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketDetail"]>

  export type TicketDetailSelectScalar = {
    ticketDetailId?: boolean
    ticketDetailNumber?: boolean
    ticketId?: boolean
    ticketDetailContent?: boolean
    ticketDetailImage?: boolean
    ticketAssociatedTo?: boolean
    createdByUserId?: boolean
    ticketDetailOrigin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TicketDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ticketDetailId" | "ticketDetailNumber" | "ticketId" | "ticketDetailContent" | "ticketDetailImage" | "ticketAssociatedTo" | "createdByUserId" | "ticketDetailOrigin" | "createdAt" | "updatedAt", ExtArgs["result"]["ticketDetail"]>
  export type TicketDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    Ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }
  export type TicketDetailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    Ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }
  export type TicketDetailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    Ticket?: boolean | TicketDefaultArgs<ExtArgs>
  }

  export type $TicketDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TicketDetail"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      Ticket: Prisma.$TicketPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ticketDetailId: string
      ticketDetailNumber: string | null
      ticketId: string
      ticketDetailContent: string
      ticketDetailImage: string[]
      ticketAssociatedTo: string[]
      createdByUserId: string
      ticketDetailOrigin: $Enums.TicketDetailOrigin
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ticketDetail"]>
    composites: {}
  }

  type TicketDetailGetPayload<S extends boolean | null | undefined | TicketDetailDefaultArgs> = $Result.GetResult<Prisma.$TicketDetailPayload, S>

  type TicketDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketDetailCountAggregateInputType | true
    }

  export interface TicketDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TicketDetail'], meta: { name: 'TicketDetail' } }
    /**
     * Find zero or one TicketDetail that matches the filter.
     * @param {TicketDetailFindUniqueArgs} args - Arguments to find a TicketDetail
     * @example
     * // Get one TicketDetail
     * const ticketDetail = await prisma.ticketDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketDetailFindUniqueArgs>(args: SelectSubset<T, TicketDetailFindUniqueArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TicketDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketDetailFindUniqueOrThrowArgs} args - Arguments to find a TicketDetail
     * @example
     * // Get one TicketDetail
     * const ticketDetail = await prisma.ticketDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketDetailFindFirstArgs} args - Arguments to find a TicketDetail
     * @example
     * // Get one TicketDetail
     * const ticketDetail = await prisma.ticketDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketDetailFindFirstArgs>(args?: SelectSubset<T, TicketDetailFindFirstArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketDetailFindFirstOrThrowArgs} args - Arguments to find a TicketDetail
     * @example
     * // Get one TicketDetail
     * const ticketDetail = await prisma.ticketDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TicketDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TicketDetails
     * const ticketDetails = await prisma.ticketDetail.findMany()
     * 
     * // Get first 10 TicketDetails
     * const ticketDetails = await prisma.ticketDetail.findMany({ take: 10 })
     * 
     * // Only select the `ticketDetailId`
     * const ticketDetailWithTicketDetailIdOnly = await prisma.ticketDetail.findMany({ select: { ticketDetailId: true } })
     * 
     */
    findMany<T extends TicketDetailFindManyArgs>(args?: SelectSubset<T, TicketDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TicketDetail.
     * @param {TicketDetailCreateArgs} args - Arguments to create a TicketDetail.
     * @example
     * // Create one TicketDetail
     * const TicketDetail = await prisma.ticketDetail.create({
     *   data: {
     *     // ... data to create a TicketDetail
     *   }
     * })
     * 
     */
    create<T extends TicketDetailCreateArgs>(args: SelectSubset<T, TicketDetailCreateArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TicketDetails.
     * @param {TicketDetailCreateManyArgs} args - Arguments to create many TicketDetails.
     * @example
     * // Create many TicketDetails
     * const ticketDetail = await prisma.ticketDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketDetailCreateManyArgs>(args?: SelectSubset<T, TicketDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TicketDetails and returns the data saved in the database.
     * @param {TicketDetailCreateManyAndReturnArgs} args - Arguments to create many TicketDetails.
     * @example
     * // Create many TicketDetails
     * const ticketDetail = await prisma.ticketDetail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TicketDetails and only return the `ticketDetailId`
     * const ticketDetailWithTicketDetailIdOnly = await prisma.ticketDetail.createManyAndReturn({
     *   select: { ticketDetailId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketDetailCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketDetailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TicketDetail.
     * @param {TicketDetailDeleteArgs} args - Arguments to delete one TicketDetail.
     * @example
     * // Delete one TicketDetail
     * const TicketDetail = await prisma.ticketDetail.delete({
     *   where: {
     *     // ... filter to delete one TicketDetail
     *   }
     * })
     * 
     */
    delete<T extends TicketDetailDeleteArgs>(args: SelectSubset<T, TicketDetailDeleteArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TicketDetail.
     * @param {TicketDetailUpdateArgs} args - Arguments to update one TicketDetail.
     * @example
     * // Update one TicketDetail
     * const ticketDetail = await prisma.ticketDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketDetailUpdateArgs>(args: SelectSubset<T, TicketDetailUpdateArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TicketDetails.
     * @param {TicketDetailDeleteManyArgs} args - Arguments to filter TicketDetails to delete.
     * @example
     * // Delete a few TicketDetails
     * const { count } = await prisma.ticketDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDetailDeleteManyArgs>(args?: SelectSubset<T, TicketDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TicketDetails
     * const ticketDetail = await prisma.ticketDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketDetailUpdateManyArgs>(args: SelectSubset<T, TicketDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketDetails and returns the data updated in the database.
     * @param {TicketDetailUpdateManyAndReturnArgs} args - Arguments to update many TicketDetails.
     * @example
     * // Update many TicketDetails
     * const ticketDetail = await prisma.ticketDetail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TicketDetails and only return the `ticketDetailId`
     * const ticketDetailWithTicketDetailIdOnly = await prisma.ticketDetail.updateManyAndReturn({
     *   select: { ticketDetailId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketDetailUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketDetailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TicketDetail.
     * @param {TicketDetailUpsertArgs} args - Arguments to update or create a TicketDetail.
     * @example
     * // Update or create a TicketDetail
     * const ticketDetail = await prisma.ticketDetail.upsert({
     *   create: {
     *     // ... data to create a TicketDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TicketDetail we want to update
     *   }
     * })
     */
    upsert<T extends TicketDetailUpsertArgs>(args: SelectSubset<T, TicketDetailUpsertArgs<ExtArgs>>): Prisma__TicketDetailClient<$Result.GetResult<Prisma.$TicketDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TicketDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketDetailCountArgs} args - Arguments to filter TicketDetails to count.
     * @example
     * // Count the number of TicketDetails
     * const count = await prisma.ticketDetail.count({
     *   where: {
     *     // ... the filter for the TicketDetails we want to count
     *   }
     * })
    **/
    count<T extends TicketDetailCountArgs>(
      args?: Subset<T, TicketDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TicketDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketDetailAggregateArgs>(args: Subset<T, TicketDetailAggregateArgs>): Prisma.PrismaPromise<GetTicketDetailAggregateType<T>>

    /**
     * Group by TicketDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketDetailGroupByArgs['orderBy'] }
        : { orderBy?: TicketDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TicketDetail model
   */
  readonly fields: TicketDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TicketDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Ticket<T extends TicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TicketDefaultArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TicketDetail model
   */
  interface TicketDetailFieldRefs {
    readonly ticketDetailId: FieldRef<"TicketDetail", 'String'>
    readonly ticketDetailNumber: FieldRef<"TicketDetail", 'String'>
    readonly ticketId: FieldRef<"TicketDetail", 'String'>
    readonly ticketDetailContent: FieldRef<"TicketDetail", 'String'>
    readonly ticketDetailImage: FieldRef<"TicketDetail", 'String[]'>
    readonly ticketAssociatedTo: FieldRef<"TicketDetail", 'String[]'>
    readonly createdByUserId: FieldRef<"TicketDetail", 'String'>
    readonly ticketDetailOrigin: FieldRef<"TicketDetail", 'TicketDetailOrigin'>
    readonly createdAt: FieldRef<"TicketDetail", 'DateTime'>
    readonly updatedAt: FieldRef<"TicketDetail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TicketDetail findUnique
   */
  export type TicketDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * Filter, which TicketDetail to fetch.
     */
    where: TicketDetailWhereUniqueInput
  }

  /**
   * TicketDetail findUniqueOrThrow
   */
  export type TicketDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * Filter, which TicketDetail to fetch.
     */
    where: TicketDetailWhereUniqueInput
  }

  /**
   * TicketDetail findFirst
   */
  export type TicketDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * Filter, which TicketDetail to fetch.
     */
    where?: TicketDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketDetails to fetch.
     */
    orderBy?: TicketDetailOrderByWithRelationInput | TicketDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketDetails.
     */
    cursor?: TicketDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketDetails.
     */
    distinct?: TicketDetailScalarFieldEnum | TicketDetailScalarFieldEnum[]
  }

  /**
   * TicketDetail findFirstOrThrow
   */
  export type TicketDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * Filter, which TicketDetail to fetch.
     */
    where?: TicketDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketDetails to fetch.
     */
    orderBy?: TicketDetailOrderByWithRelationInput | TicketDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketDetails.
     */
    cursor?: TicketDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketDetails.
     */
    distinct?: TicketDetailScalarFieldEnum | TicketDetailScalarFieldEnum[]
  }

  /**
   * TicketDetail findMany
   */
  export type TicketDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * Filter, which TicketDetails to fetch.
     */
    where?: TicketDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketDetails to fetch.
     */
    orderBy?: TicketDetailOrderByWithRelationInput | TicketDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TicketDetails.
     */
    cursor?: TicketDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketDetails.
     */
    skip?: number
    distinct?: TicketDetailScalarFieldEnum | TicketDetailScalarFieldEnum[]
  }

  /**
   * TicketDetail create
   */
  export type TicketDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a TicketDetail.
     */
    data: XOR<TicketDetailCreateInput, TicketDetailUncheckedCreateInput>
  }

  /**
   * TicketDetail createMany
   */
  export type TicketDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TicketDetails.
     */
    data: TicketDetailCreateManyInput | TicketDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TicketDetail createManyAndReturn
   */
  export type TicketDetailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * The data used to create many TicketDetails.
     */
    data: TicketDetailCreateManyInput | TicketDetailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketDetail update
   */
  export type TicketDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a TicketDetail.
     */
    data: XOR<TicketDetailUpdateInput, TicketDetailUncheckedUpdateInput>
    /**
     * Choose, which TicketDetail to update.
     */
    where: TicketDetailWhereUniqueInput
  }

  /**
   * TicketDetail updateMany
   */
  export type TicketDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TicketDetails.
     */
    data: XOR<TicketDetailUpdateManyMutationInput, TicketDetailUncheckedUpdateManyInput>
    /**
     * Filter which TicketDetails to update
     */
    where?: TicketDetailWhereInput
    /**
     * Limit how many TicketDetails to update.
     */
    limit?: number
  }

  /**
   * TicketDetail updateManyAndReturn
   */
  export type TicketDetailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * The data used to update TicketDetails.
     */
    data: XOR<TicketDetailUpdateManyMutationInput, TicketDetailUncheckedUpdateManyInput>
    /**
     * Filter which TicketDetails to update
     */
    where?: TicketDetailWhereInput
    /**
     * Limit how many TicketDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketDetail upsert
   */
  export type TicketDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the TicketDetail to update in case it exists.
     */
    where: TicketDetailWhereUniqueInput
    /**
     * In case the TicketDetail found by the `where` argument doesn't exist, create a new TicketDetail with this data.
     */
    create: XOR<TicketDetailCreateInput, TicketDetailUncheckedCreateInput>
    /**
     * In case the TicketDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketDetailUpdateInput, TicketDetailUncheckedUpdateInput>
  }

  /**
   * TicketDetail delete
   */
  export type TicketDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
    /**
     * Filter which TicketDetail to delete.
     */
    where: TicketDetailWhereUniqueInput
  }

  /**
   * TicketDetail deleteMany
   */
  export type TicketDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketDetails to delete
     */
    where?: TicketDetailWhereInput
    /**
     * Limit how many TicketDetails to delete.
     */
    limit?: number
  }

  /**
   * TicketDetail without action
   */
  export type TicketDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketDetail
     */
    select?: TicketDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketDetail
     */
    omit?: TicketDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketDetailInclude<ExtArgs> | null
  }


  /**
   * Model newsletterSubscriber
   */

  export type AggregateNewsletterSubscriber = {
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  export type NewsletterSubscriberMinAggregateOutputType = {
    newsletterSubscriberId: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriberMaxAggregateOutputType = {
    newsletterSubscriberId: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriberCountAggregateOutputType = {
    newsletterSubscriberId: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsletterSubscriberMinAggregateInputType = {
    newsletterSubscriberId?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriberMaxAggregateInputType = {
    newsletterSubscriberId?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriberCountAggregateInputType = {
    newsletterSubscriberId?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsletterSubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which newsletterSubscriber to aggregate.
     */
    where?: newsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of newsletterSubscribers to fetch.
     */
    orderBy?: newsletterSubscriberOrderByWithRelationInput | newsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: newsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` newsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` newsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned newsletterSubscribers
    **/
    _count?: true | NewsletterSubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterSubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type GetNewsletterSubscriberAggregateType<T extends NewsletterSubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
      : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
  }




  export type newsletterSubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: newsletterSubscriberWhereInput
    orderBy?: newsletterSubscriberOrderByWithAggregationInput | newsletterSubscriberOrderByWithAggregationInput[]
    by: NewsletterSubscriberScalarFieldEnum[] | NewsletterSubscriberScalarFieldEnum
    having?: newsletterSubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterSubscriberCountAggregateInputType | true
    _min?: NewsletterSubscriberMinAggregateInputType
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type NewsletterSubscriberGroupByOutputType = {
    newsletterSubscriberId: string
    email: string
    createdAt: Date
    updatedAt: Date
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  type GetNewsletterSubscriberGroupByPayload<T extends newsletterSubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterSubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterSubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
        }
      >
    >


  export type newsletterSubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    newsletterSubscriberId?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type newsletterSubscriberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    newsletterSubscriberId?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type newsletterSubscriberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    newsletterSubscriberId?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type newsletterSubscriberSelectScalar = {
    newsletterSubscriberId?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type newsletterSubscriberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"newsletterSubscriberId" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["newsletterSubscriber"]>

  export type $newsletterSubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "newsletterSubscriber"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      newsletterSubscriberId: string
      email: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsletterSubscriber"]>
    composites: {}
  }

  type newsletterSubscriberGetPayload<S extends boolean | null | undefined | newsletterSubscriberDefaultArgs> = $Result.GetResult<Prisma.$newsletterSubscriberPayload, S>

  type newsletterSubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<newsletterSubscriberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterSubscriberCountAggregateInputType | true
    }

  export interface newsletterSubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['newsletterSubscriber'], meta: { name: 'newsletterSubscriber' } }
    /**
     * Find zero or one NewsletterSubscriber that matches the filter.
     * @param {newsletterSubscriberFindUniqueArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends newsletterSubscriberFindUniqueArgs>(args: SelectSubset<T, newsletterSubscriberFindUniqueArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterSubscriber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {newsletterSubscriberFindUniqueOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends newsletterSubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, newsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsletterSubscriberFindFirstArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends newsletterSubscriberFindFirstArgs>(args?: SelectSubset<T, newsletterSubscriberFindFirstArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsletterSubscriberFindFirstOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends newsletterSubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, newsletterSubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterSubscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsletterSubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
     * 
     * // Get first 10 NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany({ take: 10 })
     * 
     * // Only select the `newsletterSubscriberId`
     * const newsletterSubscriberWithNewsletterSubscriberIdOnly = await prisma.newsletterSubscriber.findMany({ select: { newsletterSubscriberId: true } })
     * 
     */
    findMany<T extends newsletterSubscriberFindManyArgs>(args?: SelectSubset<T, newsletterSubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterSubscriber.
     * @param {newsletterSubscriberCreateArgs} args - Arguments to create a NewsletterSubscriber.
     * @example
     * // Create one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.create({
     *   data: {
     *     // ... data to create a NewsletterSubscriber
     *   }
     * })
     * 
     */
    create<T extends newsletterSubscriberCreateArgs>(args: SelectSubset<T, newsletterSubscriberCreateArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterSubscribers.
     * @param {newsletterSubscriberCreateManyArgs} args - Arguments to create many NewsletterSubscribers.
     * @example
     * // Create many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends newsletterSubscriberCreateManyArgs>(args?: SelectSubset<T, newsletterSubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterSubscribers and returns the data saved in the database.
     * @param {newsletterSubscriberCreateManyAndReturnArgs} args - Arguments to create many NewsletterSubscribers.
     * @example
     * // Create many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterSubscribers and only return the `newsletterSubscriberId`
     * const newsletterSubscriberWithNewsletterSubscriberIdOnly = await prisma.newsletterSubscriber.createManyAndReturn({
     *   select: { newsletterSubscriberId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends newsletterSubscriberCreateManyAndReturnArgs>(args?: SelectSubset<T, newsletterSubscriberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterSubscriber.
     * @param {newsletterSubscriberDeleteArgs} args - Arguments to delete one NewsletterSubscriber.
     * @example
     * // Delete one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.delete({
     *   where: {
     *     // ... filter to delete one NewsletterSubscriber
     *   }
     * })
     * 
     */
    delete<T extends newsletterSubscriberDeleteArgs>(args: SelectSubset<T, newsletterSubscriberDeleteArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterSubscriber.
     * @param {newsletterSubscriberUpdateArgs} args - Arguments to update one NewsletterSubscriber.
     * @example
     * // Update one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends newsletterSubscriberUpdateArgs>(args: SelectSubset<T, newsletterSubscriberUpdateArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterSubscribers.
     * @param {newsletterSubscriberDeleteManyArgs} args - Arguments to filter NewsletterSubscribers to delete.
     * @example
     * // Delete a few NewsletterSubscribers
     * const { count } = await prisma.newsletterSubscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends newsletterSubscriberDeleteManyArgs>(args?: SelectSubset<T, newsletterSubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsletterSubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends newsletterSubscriberUpdateManyArgs>(args: SelectSubset<T, newsletterSubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscribers and returns the data updated in the database.
     * @param {newsletterSubscriberUpdateManyAndReturnArgs} args - Arguments to update many NewsletterSubscribers.
     * @example
     * // Update many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterSubscribers and only return the `newsletterSubscriberId`
     * const newsletterSubscriberWithNewsletterSubscriberIdOnly = await prisma.newsletterSubscriber.updateManyAndReturn({
     *   select: { newsletterSubscriberId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends newsletterSubscriberUpdateManyAndReturnArgs>(args: SelectSubset<T, newsletterSubscriberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterSubscriber.
     * @param {newsletterSubscriberUpsertArgs} args - Arguments to update or create a NewsletterSubscriber.
     * @example
     * // Update or create a NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.upsert({
     *   create: {
     *     // ... data to create a NewsletterSubscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterSubscriber we want to update
     *   }
     * })
     */
    upsert<T extends newsletterSubscriberUpsertArgs>(args: SelectSubset<T, newsletterSubscriberUpsertArgs<ExtArgs>>): Prisma__newsletterSubscriberClient<$Result.GetResult<Prisma.$newsletterSubscriberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsletterSubscriberCountArgs} args - Arguments to filter NewsletterSubscribers to count.
     * @example
     * // Count the number of NewsletterSubscribers
     * const count = await prisma.newsletterSubscriber.count({
     *   where: {
     *     // ... the filter for the NewsletterSubscribers we want to count
     *   }
     * })
    **/
    count<T extends newsletterSubscriberCountArgs>(
      args?: Subset<T, newsletterSubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterSubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsletterSubscriberAggregateArgs>(args: Subset<T, NewsletterSubscriberAggregateArgs>): Prisma.PrismaPromise<GetNewsletterSubscriberAggregateType<T>>

    /**
     * Group by NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {newsletterSubscriberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends newsletterSubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: newsletterSubscriberGroupByArgs['orderBy'] }
        : { orderBy?: newsletterSubscriberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, newsletterSubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the newsletterSubscriber model
   */
  readonly fields: newsletterSubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for newsletterSubscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__newsletterSubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the newsletterSubscriber model
   */
  interface newsletterSubscriberFieldRefs {
    readonly newsletterSubscriberId: FieldRef<"newsletterSubscriber", 'String'>
    readonly email: FieldRef<"newsletterSubscriber", 'String'>
    readonly createdAt: FieldRef<"newsletterSubscriber", 'DateTime'>
    readonly updatedAt: FieldRef<"newsletterSubscriber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * newsletterSubscriber findUnique
   */
  export type newsletterSubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which newsletterSubscriber to fetch.
     */
    where: newsletterSubscriberWhereUniqueInput
  }

  /**
   * newsletterSubscriber findUniqueOrThrow
   */
  export type newsletterSubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which newsletterSubscriber to fetch.
     */
    where: newsletterSubscriberWhereUniqueInput
  }

  /**
   * newsletterSubscriber findFirst
   */
  export type newsletterSubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which newsletterSubscriber to fetch.
     */
    where?: newsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of newsletterSubscribers to fetch.
     */
    orderBy?: newsletterSubscriberOrderByWithRelationInput | newsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for newsletterSubscribers.
     */
    cursor?: newsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` newsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` newsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of newsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * newsletterSubscriber findFirstOrThrow
   */
  export type newsletterSubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which newsletterSubscriber to fetch.
     */
    where?: newsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of newsletterSubscribers to fetch.
     */
    orderBy?: newsletterSubscriberOrderByWithRelationInput | newsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for newsletterSubscribers.
     */
    cursor?: newsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` newsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` newsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of newsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * newsletterSubscriber findMany
   */
  export type newsletterSubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter, which newsletterSubscribers to fetch.
     */
    where?: newsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of newsletterSubscribers to fetch.
     */
    orderBy?: newsletterSubscriberOrderByWithRelationInput | newsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing newsletterSubscribers.
     */
    cursor?: newsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` newsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` newsletterSubscribers.
     */
    skip?: number
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * newsletterSubscriber create
   */
  export type newsletterSubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to create a newsletterSubscriber.
     */
    data: XOR<newsletterSubscriberCreateInput, newsletterSubscriberUncheckedCreateInput>
  }

  /**
   * newsletterSubscriber createMany
   */
  export type newsletterSubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many newsletterSubscribers.
     */
    data: newsletterSubscriberCreateManyInput | newsletterSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * newsletterSubscriber createManyAndReturn
   */
  export type newsletterSubscriberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data used to create many newsletterSubscribers.
     */
    data: newsletterSubscriberCreateManyInput | newsletterSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * newsletterSubscriber update
   */
  export type newsletterSubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data needed to update a newsletterSubscriber.
     */
    data: XOR<newsletterSubscriberUpdateInput, newsletterSubscriberUncheckedUpdateInput>
    /**
     * Choose, which newsletterSubscriber to update.
     */
    where: newsletterSubscriberWhereUniqueInput
  }

  /**
   * newsletterSubscriber updateMany
   */
  export type newsletterSubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update newsletterSubscribers.
     */
    data: XOR<newsletterSubscriberUpdateManyMutationInput, newsletterSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which newsletterSubscribers to update
     */
    where?: newsletterSubscriberWhereInput
    /**
     * Limit how many newsletterSubscribers to update.
     */
    limit?: number
  }

  /**
   * newsletterSubscriber updateManyAndReturn
   */
  export type newsletterSubscriberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data used to update newsletterSubscribers.
     */
    data: XOR<newsletterSubscriberUpdateManyMutationInput, newsletterSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which newsletterSubscribers to update
     */
    where?: newsletterSubscriberWhereInput
    /**
     * Limit how many newsletterSubscribers to update.
     */
    limit?: number
  }

  /**
   * newsletterSubscriber upsert
   */
  export type newsletterSubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * The filter to search for the newsletterSubscriber to update in case it exists.
     */
    where: newsletterSubscriberWhereUniqueInput
    /**
     * In case the newsletterSubscriber found by the `where` argument doesn't exist, create a new newsletterSubscriber with this data.
     */
    create: XOR<newsletterSubscriberCreateInput, newsletterSubscriberUncheckedCreateInput>
    /**
     * In case the newsletterSubscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<newsletterSubscriberUpdateInput, newsletterSubscriberUncheckedUpdateInput>
  }

  /**
   * newsletterSubscriber delete
   */
  export type newsletterSubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
    /**
     * Filter which newsletterSubscriber to delete.
     */
    where: newsletterSubscriberWhereUniqueInput
  }

  /**
   * newsletterSubscriber deleteMany
   */
  export type newsletterSubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which newsletterSubscribers to delete
     */
    where?: newsletterSubscriberWhereInput
    /**
     * Limit how many newsletterSubscribers to delete.
     */
    limit?: number
  }

  /**
   * newsletterSubscriber without action
   */
  export type newsletterSubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the newsletterSubscriber
     */
    select?: newsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the newsletterSubscriber
     */
    omit?: newsletterSubscriberOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    userFirstName: 'userFirstName',
    userLastName: 'userLastName',
    userEmail: 'userEmail',
    userConfirmEmail: 'userConfirmEmail',
    userPassword: 'userPassword',
    userLastConnection: 'userLastConnection',
    userCodePhoneNumber: 'userCodePhoneNumber',
    userPhoneNumber: 'userPhoneNumber',
    userDocumentType: 'userDocumentType',
    userDocumentNumber: 'userDocumentNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BusinessScalarFieldEnum: {
    businessId: 'businessId',
    businessName: 'businessName',
    businessType: 'businessType',
    businessDocumentType: 'businessDocumentType',
    businessDocumentNumber: 'businessDocumentNumber',
    businessEmail: 'businessEmail',
    businessPhoneNumber: 'businessPhoneNumber',
    businessCodePhoneNumber: 'businessCodePhoneNumber',
    businessCountry: 'businessCountry',
    businessCodeWhatsappNumber: 'businessCodeWhatsappNumber',
    businessWhatsappNumber: 'businessWhatsappNumber',
    businessConnectionDB: 'businessConnectionDB',
    businessEntity: 'businessEntity',
    businessStatus: 'businessStatus',
    businessProcess: 'businessProcess',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BusinessScalarFieldEnum = (typeof BusinessScalarFieldEnum)[keyof typeof BusinessScalarFieldEnum]


  export const UserBusinessScalarFieldEnum: {
    userBusinessUserId: 'userBusinessUserId',
    userBusinessBusinessId: 'userBusinessBusinessId',
    userBusinessRole: 'userBusinessRole',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserBusinessScalarFieldEnum = (typeof UserBusinessScalarFieldEnum)[keyof typeof UserBusinessScalarFieldEnum]


  export const UserGuestScalarFieldEnum: {
    userGuestId: 'userGuestId',
    userGuestEmail: 'userGuestEmail',
    userGuestUserId: 'userGuestUserId',
    userGuestBusinessId: 'userGuestBusinessId',
    userGuestRole: 'userGuestRole',
    userGuestStatus: 'userGuestStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserGuestScalarFieldEnum = (typeof UserGuestScalarFieldEnum)[keyof typeof UserGuestScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    planId: 'planId',
    planName: 'planName',
    planFeatures: 'planFeatures',
    planPrice: 'planPrice',
    planDuration: 'planDuration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    subscriptionId: 'subscriptionId',
    subscriptionBusinessId: 'subscriptionBusinessId',
    subscriptionPlanId: 'subscriptionPlanId',
    subscriptionStartDate: 'subscriptionStartDate',
    subscriptionDuration: 'subscriptionDuration',
    subscriptionEndDate: 'subscriptionEndDate',
    subscriptionStatus: 'subscriptionStatus',
    subscriptionAmount: 'subscriptionAmount',
    subscriptionPaymentMethod: 'subscriptionPaymentMethod',
    subscriptionPlanFeatures: 'subscriptionPlanFeatures',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const TicketScalarFieldEnum: {
    ticketId: 'ticketId',
    ticketNumber: 'ticketNumber',
    ticketSubject: 'ticketSubject',
    ticketType: 'ticketType',
    ticketStatus: 'ticketStatus',
    ticketAssociatedTo: 'ticketAssociatedTo',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const TicketDetailScalarFieldEnum: {
    ticketDetailId: 'ticketDetailId',
    ticketDetailNumber: 'ticketDetailNumber',
    ticketId: 'ticketId',
    ticketDetailContent: 'ticketDetailContent',
    ticketDetailImage: 'ticketDetailImage',
    ticketAssociatedTo: 'ticketAssociatedTo',
    createdByUserId: 'createdByUserId',
    ticketDetailOrigin: 'ticketDetailOrigin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TicketDetailScalarFieldEnum = (typeof TicketDetailScalarFieldEnum)[keyof typeof TicketDetailScalarFieldEnum]


  export const NewsletterSubscriberScalarFieldEnum: {
    newsletterSubscriberId: 'newsletterSubscriberId',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsletterSubscriberScalarFieldEnum = (typeof NewsletterSubscriberScalarFieldEnum)[keyof typeof NewsletterSubscriberScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BusinessEntity'
   */
  export type EnumBusinessEntityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessEntity'>
    


  /**
   * Reference to a field of type 'BusinessEntity[]'
   */
  export type ListEnumBusinessEntityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessEntity[]'>
    


  /**
   * Reference to a field of type 'BusinessStatus'
   */
  export type EnumBusinessStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessStatus'>
    


  /**
   * Reference to a field of type 'BusinessStatus[]'
   */
  export type ListEnumBusinessStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'UserGuestStatus'
   */
  export type EnumUserGuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserGuestStatus'>
    


  /**
   * Reference to a field of type 'UserGuestStatus[]'
   */
  export type ListEnumUserGuestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserGuestStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'TicketType'
   */
  export type EnumTicketTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketType'>
    


  /**
   * Reference to a field of type 'TicketType[]'
   */
  export type ListEnumTicketTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketType[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'TicketDetailOrigin'
   */
  export type EnumTicketDetailOriginFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketDetailOrigin'>
    


  /**
   * Reference to a field of type 'TicketDetailOrigin[]'
   */
  export type ListEnumTicketDetailOriginFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketDetailOrigin[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userId?: StringFilter<"User"> | string
    userFirstName?: StringFilter<"User"> | string
    userLastName?: StringFilter<"User"> | string
    userEmail?: StringFilter<"User"> | string
    userConfirmEmail?: BoolFilter<"User"> | boolean
    userPassword?: StringFilter<"User"> | string
    userLastConnection?: DateTimeNullableFilter<"User"> | Date | string | null
    userCodePhoneNumber?: StringFilter<"User"> | string
    userPhoneNumber?: StringFilter<"User"> | string
    userDocumentType?: StringFilter<"User"> | string
    userDocumentNumber?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    UserBusiness?: UserBusinessListRelationFilter
    UserGuest?: UserGuestListRelationFilter
    businesses?: BusinessListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    tickets?: TicketListRelationFilter
    ticketDetails?: TicketDetailListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userConfirmEmail?: SortOrder
    userPassword?: SortOrder
    userLastConnection?: SortOrderInput | SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    UserBusiness?: UserBusinessOrderByRelationAggregateInput
    UserGuest?: UserGuestOrderByRelationAggregateInput
    businesses?: BusinessOrderByRelationAggregateInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    tickets?: TicketOrderByRelationAggregateInput
    ticketDetails?: TicketDetailOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    userEmail?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userFirstName?: StringFilter<"User"> | string
    userLastName?: StringFilter<"User"> | string
    userConfirmEmail?: BoolFilter<"User"> | boolean
    userPassword?: StringFilter<"User"> | string
    userLastConnection?: DateTimeNullableFilter<"User"> | Date | string | null
    userCodePhoneNumber?: StringFilter<"User"> | string
    userPhoneNumber?: StringFilter<"User"> | string
    userDocumentType?: StringFilter<"User"> | string
    userDocumentNumber?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    UserBusiness?: UserBusinessListRelationFilter
    UserGuest?: UserGuestListRelationFilter
    businesses?: BusinessListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    tickets?: TicketListRelationFilter
    ticketDetails?: TicketDetailListRelationFilter
  }, "userId" | "userEmail">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userConfirmEmail?: SortOrder
    userPassword?: SortOrder
    userLastConnection?: SortOrderInput | SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"User"> | string
    userFirstName?: StringWithAggregatesFilter<"User"> | string
    userLastName?: StringWithAggregatesFilter<"User"> | string
    userEmail?: StringWithAggregatesFilter<"User"> | string
    userConfirmEmail?: BoolWithAggregatesFilter<"User"> | boolean
    userPassword?: StringWithAggregatesFilter<"User"> | string
    userLastConnection?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    userCodePhoneNumber?: StringWithAggregatesFilter<"User"> | string
    userPhoneNumber?: StringWithAggregatesFilter<"User"> | string
    userDocumentType?: StringWithAggregatesFilter<"User"> | string
    userDocumentNumber?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BusinessWhereInput = {
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    businessId?: StringFilter<"Business"> | string
    businessName?: StringFilter<"Business"> | string
    businessType?: StringFilter<"Business"> | string
    businessDocumentType?: StringFilter<"Business"> | string
    businessDocumentNumber?: StringFilter<"Business"> | string
    businessEmail?: StringFilter<"Business"> | string
    businessPhoneNumber?: StringFilter<"Business"> | string
    businessCodePhoneNumber?: StringFilter<"Business"> | string
    businessCountry?: StringFilter<"Business"> | string
    businessCodeWhatsappNumber?: StringNullableFilter<"Business"> | string | null
    businessWhatsappNumber?: StringNullableFilter<"Business"> | string | null
    businessConnectionDB?: StringNullableFilter<"Business"> | string | null
    businessEntity?: EnumBusinessEntityFilter<"Business"> | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFilter<"Business"> | $Enums.BusinessStatus
    businessProcess?: JsonNullableFilter<"Business">
    createdByUserId?: StringNullableFilter<"Business"> | string | null
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    UserGuest?: UserGuestListRelationFilter
    UserBusiness?: UserBusinessListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
  }

  export type BusinessOrderByWithRelationInput = {
    businessId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    businessDocumentType?: SortOrder
    businessDocumentNumber?: SortOrder
    businessEmail?: SortOrder
    businessPhoneNumber?: SortOrder
    businessCodePhoneNumber?: SortOrder
    businessCountry?: SortOrder
    businessCodeWhatsappNumber?: SortOrderInput | SortOrder
    businessWhatsappNumber?: SortOrderInput | SortOrder
    businessConnectionDB?: SortOrderInput | SortOrder
    businessEntity?: SortOrder
    businessStatus?: SortOrder
    businessProcess?: SortOrderInput | SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    UserGuest?: UserGuestOrderByRelationAggregateInput
    UserBusiness?: UserBusinessOrderByRelationAggregateInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
  }

  export type BusinessWhereUniqueInput = Prisma.AtLeast<{
    businessId?: string
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    businessName?: StringFilter<"Business"> | string
    businessType?: StringFilter<"Business"> | string
    businessDocumentType?: StringFilter<"Business"> | string
    businessDocumentNumber?: StringFilter<"Business"> | string
    businessEmail?: StringFilter<"Business"> | string
    businessPhoneNumber?: StringFilter<"Business"> | string
    businessCodePhoneNumber?: StringFilter<"Business"> | string
    businessCountry?: StringFilter<"Business"> | string
    businessCodeWhatsappNumber?: StringNullableFilter<"Business"> | string | null
    businessWhatsappNumber?: StringNullableFilter<"Business"> | string | null
    businessConnectionDB?: StringNullableFilter<"Business"> | string | null
    businessEntity?: EnumBusinessEntityFilter<"Business"> | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFilter<"Business"> | $Enums.BusinessStatus
    businessProcess?: JsonNullableFilter<"Business">
    createdByUserId?: StringNullableFilter<"Business"> | string | null
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    UserGuest?: UserGuestListRelationFilter
    UserBusiness?: UserBusinessListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
  }, "businessId">

  export type BusinessOrderByWithAggregationInput = {
    businessId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    businessDocumentType?: SortOrder
    businessDocumentNumber?: SortOrder
    businessEmail?: SortOrder
    businessPhoneNumber?: SortOrder
    businessCodePhoneNumber?: SortOrder
    businessCountry?: SortOrder
    businessCodeWhatsappNumber?: SortOrderInput | SortOrder
    businessWhatsappNumber?: SortOrderInput | SortOrder
    businessConnectionDB?: SortOrderInput | SortOrder
    businessEntity?: SortOrder
    businessStatus?: SortOrder
    businessProcess?: SortOrderInput | SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BusinessCountOrderByAggregateInput
    _max?: BusinessMaxOrderByAggregateInput
    _min?: BusinessMinOrderByAggregateInput
  }

  export type BusinessScalarWhereWithAggregatesInput = {
    AND?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    OR?: BusinessScalarWhereWithAggregatesInput[]
    NOT?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    businessId?: StringWithAggregatesFilter<"Business"> | string
    businessName?: StringWithAggregatesFilter<"Business"> | string
    businessType?: StringWithAggregatesFilter<"Business"> | string
    businessDocumentType?: StringWithAggregatesFilter<"Business"> | string
    businessDocumentNumber?: StringWithAggregatesFilter<"Business"> | string
    businessEmail?: StringWithAggregatesFilter<"Business"> | string
    businessPhoneNumber?: StringWithAggregatesFilter<"Business"> | string
    businessCodePhoneNumber?: StringWithAggregatesFilter<"Business"> | string
    businessCountry?: StringWithAggregatesFilter<"Business"> | string
    businessCodeWhatsappNumber?: StringNullableWithAggregatesFilter<"Business"> | string | null
    businessWhatsappNumber?: StringNullableWithAggregatesFilter<"Business"> | string | null
    businessConnectionDB?: StringNullableWithAggregatesFilter<"Business"> | string | null
    businessEntity?: EnumBusinessEntityWithAggregatesFilter<"Business"> | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusWithAggregatesFilter<"Business"> | $Enums.BusinessStatus
    businessProcess?: JsonNullableWithAggregatesFilter<"Business">
    createdByUserId?: StringNullableWithAggregatesFilter<"Business"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
  }

  export type UserBusinessWhereInput = {
    AND?: UserBusinessWhereInput | UserBusinessWhereInput[]
    OR?: UserBusinessWhereInput[]
    NOT?: UserBusinessWhereInput | UserBusinessWhereInput[]
    userBusinessUserId?: StringFilter<"UserBusiness"> | string
    userBusinessBusinessId?: StringFilter<"UserBusiness"> | string
    userBusinessRole?: EnumRoleFilter<"UserBusiness"> | $Enums.Role
    createdAt?: DateTimeFilter<"UserBusiness"> | Date | string
    updatedAt?: DateTimeFilter<"UserBusiness"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }

  export type UserBusinessOrderByWithRelationInput = {
    userBusinessUserId?: SortOrder
    userBusinessBusinessId?: SortOrder
    userBusinessRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    User?: UserOrderByWithRelationInput
    Business?: BusinessOrderByWithRelationInput
  }

  export type UserBusinessWhereUniqueInput = Prisma.AtLeast<{
    userBusinessUserId_userBusinessBusinessId?: UserBusinessUserBusinessUserIdUserBusinessBusinessIdCompoundUniqueInput
    AND?: UserBusinessWhereInput | UserBusinessWhereInput[]
    OR?: UserBusinessWhereInput[]
    NOT?: UserBusinessWhereInput | UserBusinessWhereInput[]
    userBusinessUserId?: StringFilter<"UserBusiness"> | string
    userBusinessBusinessId?: StringFilter<"UserBusiness"> | string
    userBusinessRole?: EnumRoleFilter<"UserBusiness"> | $Enums.Role
    createdAt?: DateTimeFilter<"UserBusiness"> | Date | string
    updatedAt?: DateTimeFilter<"UserBusiness"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }, "userBusinessUserId_userBusinessBusinessId">

  export type UserBusinessOrderByWithAggregationInput = {
    userBusinessUserId?: SortOrder
    userBusinessBusinessId?: SortOrder
    userBusinessRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserBusinessCountOrderByAggregateInput
    _max?: UserBusinessMaxOrderByAggregateInput
    _min?: UserBusinessMinOrderByAggregateInput
  }

  export type UserBusinessScalarWhereWithAggregatesInput = {
    AND?: UserBusinessScalarWhereWithAggregatesInput | UserBusinessScalarWhereWithAggregatesInput[]
    OR?: UserBusinessScalarWhereWithAggregatesInput[]
    NOT?: UserBusinessScalarWhereWithAggregatesInput | UserBusinessScalarWhereWithAggregatesInput[]
    userBusinessUserId?: StringWithAggregatesFilter<"UserBusiness"> | string
    userBusinessBusinessId?: StringWithAggregatesFilter<"UserBusiness"> | string
    userBusinessRole?: EnumRoleWithAggregatesFilter<"UserBusiness"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"UserBusiness"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserBusiness"> | Date | string
  }

  export type UserGuestWhereInput = {
    AND?: UserGuestWhereInput | UserGuestWhereInput[]
    OR?: UserGuestWhereInput[]
    NOT?: UserGuestWhereInput | UserGuestWhereInput[]
    userGuestId?: StringFilter<"UserGuest"> | string
    userGuestEmail?: StringFilter<"UserGuest"> | string
    userGuestUserId?: StringFilter<"UserGuest"> | string
    userGuestBusinessId?: StringFilter<"UserGuest"> | string
    userGuestRole?: EnumRoleFilter<"UserGuest"> | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFilter<"UserGuest"> | $Enums.UserGuestStatus
    createdAt?: DateTimeFilter<"UserGuest"> | Date | string
    updatedAt?: DateTimeFilter<"UserGuest"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }

  export type UserGuestOrderByWithRelationInput = {
    userGuestId?: SortOrder
    userGuestEmail?: SortOrder
    userGuestUserId?: SortOrder
    userGuestBusinessId?: SortOrder
    userGuestRole?: SortOrder
    userGuestStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    User?: UserOrderByWithRelationInput
    Business?: BusinessOrderByWithRelationInput
  }

  export type UserGuestWhereUniqueInput = Prisma.AtLeast<{
    userGuestId?: string
    AND?: UserGuestWhereInput | UserGuestWhereInput[]
    OR?: UserGuestWhereInput[]
    NOT?: UserGuestWhereInput | UserGuestWhereInput[]
    userGuestEmail?: StringFilter<"UserGuest"> | string
    userGuestUserId?: StringFilter<"UserGuest"> | string
    userGuestBusinessId?: StringFilter<"UserGuest"> | string
    userGuestRole?: EnumRoleFilter<"UserGuest"> | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFilter<"UserGuest"> | $Enums.UserGuestStatus
    createdAt?: DateTimeFilter<"UserGuest"> | Date | string
    updatedAt?: DateTimeFilter<"UserGuest"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
    Business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }, "userGuestId">

  export type UserGuestOrderByWithAggregationInput = {
    userGuestId?: SortOrder
    userGuestEmail?: SortOrder
    userGuestUserId?: SortOrder
    userGuestBusinessId?: SortOrder
    userGuestRole?: SortOrder
    userGuestStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserGuestCountOrderByAggregateInput
    _max?: UserGuestMaxOrderByAggregateInput
    _min?: UserGuestMinOrderByAggregateInput
  }

  export type UserGuestScalarWhereWithAggregatesInput = {
    AND?: UserGuestScalarWhereWithAggregatesInput | UserGuestScalarWhereWithAggregatesInput[]
    OR?: UserGuestScalarWhereWithAggregatesInput[]
    NOT?: UserGuestScalarWhereWithAggregatesInput | UserGuestScalarWhereWithAggregatesInput[]
    userGuestId?: StringWithAggregatesFilter<"UserGuest"> | string
    userGuestEmail?: StringWithAggregatesFilter<"UserGuest"> | string
    userGuestUserId?: StringWithAggregatesFilter<"UserGuest"> | string
    userGuestBusinessId?: StringWithAggregatesFilter<"UserGuest"> | string
    userGuestRole?: EnumRoleWithAggregatesFilter<"UserGuest"> | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusWithAggregatesFilter<"UserGuest"> | $Enums.UserGuestStatus
    createdAt?: DateTimeWithAggregatesFilter<"UserGuest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserGuest"> | Date | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    planId?: StringFilter<"Plan"> | string
    planName?: StringFilter<"Plan"> | string
    planFeatures?: JsonFilter<"Plan">
    planPrice?: FloatFilter<"Plan"> | number
    planDuration?: IntFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    planId?: SortOrder
    planName?: SortOrder
    planFeatures?: SortOrder
    planPrice?: SortOrder
    planDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptions?: SubscriptionOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    planId?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    planName?: StringFilter<"Plan"> | string
    planFeatures?: JsonFilter<"Plan">
    planPrice?: FloatFilter<"Plan"> | number
    planDuration?: IntFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }, "planId">

  export type PlanOrderByWithAggregationInput = {
    planId?: SortOrder
    planName?: SortOrder
    planFeatures?: SortOrder
    planPrice?: SortOrder
    planDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    planId?: StringWithAggregatesFilter<"Plan"> | string
    planName?: StringWithAggregatesFilter<"Plan"> | string
    planFeatures?: JsonWithAggregatesFilter<"Plan">
    planPrice?: FloatWithAggregatesFilter<"Plan"> | number
    planDuration?: IntWithAggregatesFilter<"Plan"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    subscriptionId?: StringFilter<"Subscription"> | string
    subscriptionBusinessId?: StringFilter<"Subscription"> | string
    subscriptionPlanId?: StringFilter<"Subscription"> | string
    subscriptionStartDate?: DateTimeFilter<"Subscription"> | Date | string
    subscriptionDuration?: IntFilter<"Subscription"> | number
    subscriptionEndDate?: DateTimeFilter<"Subscription"> | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFilter<"Subscription"> | number
    subscriptionPaymentMethod?: StringFilter<"Subscription"> | string
    subscriptionPlanFeatures?: JsonFilter<"Subscription">
    createdByUserId?: StringFilter<"Subscription"> | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    subscriptionId?: SortOrder
    subscriptionBusinessId?: SortOrder
    subscriptionPlanId?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionDuration?: SortOrder
    subscriptionEndDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionPaymentMethod?: SortOrder
    subscriptionPlanFeatures?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    plan?: PlanOrderByWithRelationInput
    business?: BusinessOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    subscriptionId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    subscriptionBusinessId?: StringFilter<"Subscription"> | string
    subscriptionPlanId?: StringFilter<"Subscription"> | string
    subscriptionStartDate?: DateTimeFilter<"Subscription"> | Date | string
    subscriptionDuration?: IntFilter<"Subscription"> | number
    subscriptionEndDate?: DateTimeFilter<"Subscription"> | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFilter<"Subscription"> | number
    subscriptionPaymentMethod?: StringFilter<"Subscription"> | string
    subscriptionPlanFeatures?: JsonFilter<"Subscription">
    createdByUserId?: StringFilter<"Subscription"> | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }, "subscriptionId">

  export type SubscriptionOrderByWithAggregationInput = {
    subscriptionId?: SortOrder
    subscriptionBusinessId?: SortOrder
    subscriptionPlanId?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionDuration?: SortOrder
    subscriptionEndDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionPaymentMethod?: SortOrder
    subscriptionPlanFeatures?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    subscriptionId?: StringWithAggregatesFilter<"Subscription"> | string
    subscriptionBusinessId?: StringWithAggregatesFilter<"Subscription"> | string
    subscriptionPlanId?: StringWithAggregatesFilter<"Subscription"> | string
    subscriptionStartDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    subscriptionDuration?: IntWithAggregatesFilter<"Subscription"> | number
    subscriptionEndDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    subscriptionStatus?: EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatWithAggregatesFilter<"Subscription"> | number
    subscriptionPaymentMethod?: StringWithAggregatesFilter<"Subscription"> | string
    subscriptionPlanFeatures?: JsonWithAggregatesFilter<"Subscription">
    createdByUserId?: StringWithAggregatesFilter<"Subscription"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    ticketId?: StringFilter<"Ticket"> | string
    ticketNumber?: StringNullableFilter<"Ticket"> | string | null
    ticketSubject?: StringNullableFilter<"Ticket"> | string | null
    ticketType?: EnumTicketTypeFilter<"Ticket"> | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    ticketAssociatedTo?: StringNullableListFilter<"Ticket">
    createdByUserId?: StringFilter<"Ticket"> | string
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    ticketDetails?: TicketDetailListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TicketOrderByWithRelationInput = {
    ticketId?: SortOrder
    ticketNumber?: SortOrderInput | SortOrder
    ticketSubject?: SortOrderInput | SortOrder
    ticketType?: SortOrder
    ticketStatus?: SortOrder
    ticketAssociatedTo?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ticketDetails?: TicketDetailOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    ticketId?: string
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    ticketNumber?: StringNullableFilter<"Ticket"> | string | null
    ticketSubject?: StringNullableFilter<"Ticket"> | string | null
    ticketType?: EnumTicketTypeFilter<"Ticket"> | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    ticketAssociatedTo?: StringNullableListFilter<"Ticket">
    createdByUserId?: StringFilter<"Ticket"> | string
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    ticketDetails?: TicketDetailListRelationFilter
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "ticketId">

  export type TicketOrderByWithAggregationInput = {
    ticketId?: SortOrder
    ticketNumber?: SortOrderInput | SortOrder
    ticketSubject?: SortOrderInput | SortOrder
    ticketType?: SortOrder
    ticketStatus?: SortOrder
    ticketAssociatedTo?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TicketCountOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    ticketId?: StringWithAggregatesFilter<"Ticket"> | string
    ticketNumber?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    ticketSubject?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    ticketType?: EnumTicketTypeWithAggregatesFilter<"Ticket"> | $Enums.TicketType
    ticketStatus?: EnumTicketStatusWithAggregatesFilter<"Ticket"> | $Enums.TicketStatus
    ticketAssociatedTo?: StringNullableListFilter<"Ticket">
    createdByUserId?: StringWithAggregatesFilter<"Ticket"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
  }

  export type TicketDetailWhereInput = {
    AND?: TicketDetailWhereInput | TicketDetailWhereInput[]
    OR?: TicketDetailWhereInput[]
    NOT?: TicketDetailWhereInput | TicketDetailWhereInput[]
    ticketDetailId?: StringFilter<"TicketDetail"> | string
    ticketDetailNumber?: StringNullableFilter<"TicketDetail"> | string | null
    ticketId?: StringFilter<"TicketDetail"> | string
    ticketDetailContent?: StringFilter<"TicketDetail"> | string
    ticketDetailImage?: StringNullableListFilter<"TicketDetail">
    ticketAssociatedTo?: StringNullableListFilter<"TicketDetail">
    createdByUserId?: StringFilter<"TicketDetail"> | string
    ticketDetailOrigin?: EnumTicketDetailOriginFilter<"TicketDetail"> | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFilter<"TicketDetail"> | Date | string
    updatedAt?: DateTimeFilter<"TicketDetail"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    Ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
  }

  export type TicketDetailOrderByWithRelationInput = {
    ticketDetailId?: SortOrder
    ticketDetailNumber?: SortOrderInput | SortOrder
    ticketId?: SortOrder
    ticketDetailContent?: SortOrder
    ticketDetailImage?: SortOrder
    ticketAssociatedTo?: SortOrder
    createdByUserId?: SortOrder
    ticketDetailOrigin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    Ticket?: TicketOrderByWithRelationInput
  }

  export type TicketDetailWhereUniqueInput = Prisma.AtLeast<{
    ticketDetailId?: string
    AND?: TicketDetailWhereInput | TicketDetailWhereInput[]
    OR?: TicketDetailWhereInput[]
    NOT?: TicketDetailWhereInput | TicketDetailWhereInput[]
    ticketDetailNumber?: StringNullableFilter<"TicketDetail"> | string | null
    ticketId?: StringFilter<"TicketDetail"> | string
    ticketDetailContent?: StringFilter<"TicketDetail"> | string
    ticketDetailImage?: StringNullableListFilter<"TicketDetail">
    ticketAssociatedTo?: StringNullableListFilter<"TicketDetail">
    createdByUserId?: StringFilter<"TicketDetail"> | string
    ticketDetailOrigin?: EnumTicketDetailOriginFilter<"TicketDetail"> | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFilter<"TicketDetail"> | Date | string
    updatedAt?: DateTimeFilter<"TicketDetail"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    Ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
  }, "ticketDetailId">

  export type TicketDetailOrderByWithAggregationInput = {
    ticketDetailId?: SortOrder
    ticketDetailNumber?: SortOrderInput | SortOrder
    ticketId?: SortOrder
    ticketDetailContent?: SortOrder
    ticketDetailImage?: SortOrder
    ticketAssociatedTo?: SortOrder
    createdByUserId?: SortOrder
    ticketDetailOrigin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TicketDetailCountOrderByAggregateInput
    _max?: TicketDetailMaxOrderByAggregateInput
    _min?: TicketDetailMinOrderByAggregateInput
  }

  export type TicketDetailScalarWhereWithAggregatesInput = {
    AND?: TicketDetailScalarWhereWithAggregatesInput | TicketDetailScalarWhereWithAggregatesInput[]
    OR?: TicketDetailScalarWhereWithAggregatesInput[]
    NOT?: TicketDetailScalarWhereWithAggregatesInput | TicketDetailScalarWhereWithAggregatesInput[]
    ticketDetailId?: StringWithAggregatesFilter<"TicketDetail"> | string
    ticketDetailNumber?: StringNullableWithAggregatesFilter<"TicketDetail"> | string | null
    ticketId?: StringWithAggregatesFilter<"TicketDetail"> | string
    ticketDetailContent?: StringWithAggregatesFilter<"TicketDetail"> | string
    ticketDetailImage?: StringNullableListFilter<"TicketDetail">
    ticketAssociatedTo?: StringNullableListFilter<"TicketDetail">
    createdByUserId?: StringWithAggregatesFilter<"TicketDetail"> | string
    ticketDetailOrigin?: EnumTicketDetailOriginWithAggregatesFilter<"TicketDetail"> | $Enums.TicketDetailOrigin
    createdAt?: DateTimeWithAggregatesFilter<"TicketDetail"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TicketDetail"> | Date | string
  }

  export type newsletterSubscriberWhereInput = {
    AND?: newsletterSubscriberWhereInput | newsletterSubscriberWhereInput[]
    OR?: newsletterSubscriberWhereInput[]
    NOT?: newsletterSubscriberWhereInput | newsletterSubscriberWhereInput[]
    newsletterSubscriberId?: StringFilter<"newsletterSubscriber"> | string
    email?: StringFilter<"newsletterSubscriber"> | string
    createdAt?: DateTimeFilter<"newsletterSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"newsletterSubscriber"> | Date | string
  }

  export type newsletterSubscriberOrderByWithRelationInput = {
    newsletterSubscriberId?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type newsletterSubscriberWhereUniqueInput = Prisma.AtLeast<{
    newsletterSubscriberId?: string
    AND?: newsletterSubscriberWhereInput | newsletterSubscriberWhereInput[]
    OR?: newsletterSubscriberWhereInput[]
    NOT?: newsletterSubscriberWhereInput | newsletterSubscriberWhereInput[]
    email?: StringFilter<"newsletterSubscriber"> | string
    createdAt?: DateTimeFilter<"newsletterSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"newsletterSubscriber"> | Date | string
  }, "newsletterSubscriberId">

  export type newsletterSubscriberOrderByWithAggregationInput = {
    newsletterSubscriberId?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: newsletterSubscriberCountOrderByAggregateInput
    _max?: newsletterSubscriberMaxOrderByAggregateInput
    _min?: newsletterSubscriberMinOrderByAggregateInput
  }

  export type newsletterSubscriberScalarWhereWithAggregatesInput = {
    AND?: newsletterSubscriberScalarWhereWithAggregatesInput | newsletterSubscriberScalarWhereWithAggregatesInput[]
    OR?: newsletterSubscriberScalarWhereWithAggregatesInput[]
    NOT?: newsletterSubscriberScalarWhereWithAggregatesInput | newsletterSubscriberScalarWhereWithAggregatesInput[]
    newsletterSubscriberId?: StringWithAggregatesFilter<"newsletterSubscriber"> | string
    email?: StringWithAggregatesFilter<"newsletterSubscriber"> | string
    createdAt?: DateTimeWithAggregatesFilter<"newsletterSubscriber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"newsletterSubscriber"> | Date | string
  }

  export type UserCreateInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestCreateNestedManyWithoutUserInput
    businesses?: BusinessCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    tickets?: TicketCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutUserInput
    businesses?: BusinessUncheckedCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUpdateManyWithoutUserNestedInput
    businesses?: BusinessUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUncheckedUpdateManyWithoutUserNestedInput
    businesses?: BusinessUncheckedUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessCreateInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutBusinessesInput
    UserGuest?: UserGuestCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUpdateInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutBusinessesNestedInput
    UserGuest?: UserGuestUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessCreateManyInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessUpdateManyMutationInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUncheckedUpdateManyInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBusinessCreateInput = {
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    User: UserCreateNestedOneWithoutUserBusinessInput
    Business: BusinessCreateNestedOneWithoutUserBusinessInput
  }

  export type UserBusinessUncheckedCreateInput = {
    userBusinessUserId: string
    userBusinessBusinessId: string
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBusinessUpdateInput = {
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutUserBusinessNestedInput
    Business?: BusinessUpdateOneRequiredWithoutUserBusinessNestedInput
  }

  export type UserBusinessUncheckedUpdateInput = {
    userBusinessUserId?: StringFieldUpdateOperationsInput | string
    userBusinessBusinessId?: StringFieldUpdateOperationsInput | string
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBusinessCreateManyInput = {
    userBusinessUserId: string
    userBusinessBusinessId: string
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBusinessUpdateManyMutationInput = {
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBusinessUncheckedUpdateManyInput = {
    userBusinessUserId?: StringFieldUpdateOperationsInput | string
    userBusinessBusinessId?: StringFieldUpdateOperationsInput | string
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGuestCreateInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    User: UserCreateNestedOneWithoutUserGuestInput
    Business: BusinessCreateNestedOneWithoutUserGuestInput
  }

  export type UserGuestUncheckedCreateInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestUserId: string
    userGuestBusinessId: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGuestUpdateInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutUserGuestNestedInput
    Business?: BusinessUpdateOneRequiredWithoutUserGuestNestedInput
  }

  export type UserGuestUncheckedUpdateInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestUserId?: StringFieldUpdateOperationsInput | string
    userGuestBusinessId?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGuestCreateManyInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestUserId: string
    userGuestBusinessId: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGuestUpdateManyMutationInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGuestUncheckedUpdateManyInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestUserId?: StringFieldUpdateOperationsInput | string
    userGuestBusinessId?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateInput = {
    planId: string
    planName: string
    planFeatures: JsonNullValueInput | InputJsonValue
    planPrice: number
    planDuration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    planId: string
    planName: string
    planFeatures: JsonNullValueInput | InputJsonValue
    planPrice: number
    planDuration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    planId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    planFeatures?: JsonNullValueInput | InputJsonValue
    planPrice?: FloatFieldUpdateOperationsInput | number
    planDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    planId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    planFeatures?: JsonNullValueInput | InputJsonValue
    planPrice?: FloatFieldUpdateOperationsInput | number
    planDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    planId: string
    planName: string
    planFeatures: JsonNullValueInput | InputJsonValue
    planPrice: number
    planDuration: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    planId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    planFeatures?: JsonNullValueInput | InputJsonValue
    planPrice?: FloatFieldUpdateOperationsInput | number
    planDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    planId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    planFeatures?: JsonNullValueInput | InputJsonValue
    planPrice?: FloatFieldUpdateOperationsInput | number
    planDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    subscriptionId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutSubscriptionsInput
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
    business: BusinessCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateInput = {
    subscriptionId: string
    subscriptionBusinessId: string
    subscriptionPlanId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    business?: BusinessUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionBusinessId?: StringFieldUpdateOperationsInput | string
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    subscriptionId: string
    subscriptionBusinessId: string
    subscriptionPlanId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionBusinessId?: StringFieldUpdateOperationsInput | string
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketDetails?: TicketDetailCreateNestedManyWithoutTicketInput
    createdBy: UserCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketUpdateInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketDetails?: TicketDetailUpdateManyWithoutTicketNestedInput
    createdBy?: UserUpdateOneRequiredWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketCreateManyInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketUpdateManyMutationInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketDetailCreateInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTicketDetailsInput
    Ticket: TicketCreateNestedOneWithoutTicketDetailsInput
  }

  export type TicketDetailUncheckedCreateInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketId: string
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    createdByUserId: string
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketDetailUpdateInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTicketDetailsNestedInput
    Ticket?: TicketUpdateOneRequiredWithoutTicketDetailsNestedInput
  }

  export type TicketDetailUncheckedUpdateInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketDetailCreateManyInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketId: string
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    createdByUserId: string
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketDetailUpdateManyMutationInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketDetailUncheckedUpdateManyInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type newsletterSubscriberCreateInput = {
    newsletterSubscriberId?: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type newsletterSubscriberUncheckedCreateInput = {
    newsletterSubscriberId?: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type newsletterSubscriberUpdateInput = {
    newsletterSubscriberId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type newsletterSubscriberUncheckedUpdateInput = {
    newsletterSubscriberId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type newsletterSubscriberCreateManyInput = {
    newsletterSubscriberId?: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type newsletterSubscriberUpdateManyMutationInput = {
    newsletterSubscriberId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type newsletterSubscriberUncheckedUpdateManyInput = {
    newsletterSubscriberId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserBusinessListRelationFilter = {
    every?: UserBusinessWhereInput
    some?: UserBusinessWhereInput
    none?: UserBusinessWhereInput
  }

  export type UserGuestListRelationFilter = {
    every?: UserGuestWhereInput
    some?: UserGuestWhereInput
    none?: UserGuestWhereInput
  }

  export type BusinessListRelationFilter = {
    every?: BusinessWhereInput
    some?: BusinessWhereInput
    none?: BusinessWhereInput
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type TicketDetailListRelationFilter = {
    every?: TicketDetailWhereInput
    some?: TicketDetailWhereInput
    none?: TicketDetailWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserBusinessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGuestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userConfirmEmail?: SortOrder
    userPassword?: SortOrder
    userLastConnection?: SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userConfirmEmail?: SortOrder
    userPassword?: SortOrder
    userLastConnection?: SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userConfirmEmail?: SortOrder
    userPassword?: SortOrder
    userLastConnection?: SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumBusinessEntityFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessEntity | EnumBusinessEntityFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessEntityFilter<$PrismaModel> | $Enums.BusinessEntity
  }

  export type EnumBusinessStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessStatus | EnumBusinessStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessStatusFilter<$PrismaModel> | $Enums.BusinessStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type BusinessCountOrderByAggregateInput = {
    businessId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    businessDocumentType?: SortOrder
    businessDocumentNumber?: SortOrder
    businessEmail?: SortOrder
    businessPhoneNumber?: SortOrder
    businessCodePhoneNumber?: SortOrder
    businessCountry?: SortOrder
    businessCodeWhatsappNumber?: SortOrder
    businessWhatsappNumber?: SortOrder
    businessConnectionDB?: SortOrder
    businessEntity?: SortOrder
    businessStatus?: SortOrder
    businessProcess?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessMaxOrderByAggregateInput = {
    businessId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    businessDocumentType?: SortOrder
    businessDocumentNumber?: SortOrder
    businessEmail?: SortOrder
    businessPhoneNumber?: SortOrder
    businessCodePhoneNumber?: SortOrder
    businessCountry?: SortOrder
    businessCodeWhatsappNumber?: SortOrder
    businessWhatsappNumber?: SortOrder
    businessConnectionDB?: SortOrder
    businessEntity?: SortOrder
    businessStatus?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessMinOrderByAggregateInput = {
    businessId?: SortOrder
    businessName?: SortOrder
    businessType?: SortOrder
    businessDocumentType?: SortOrder
    businessDocumentNumber?: SortOrder
    businessEmail?: SortOrder
    businessPhoneNumber?: SortOrder
    businessCodePhoneNumber?: SortOrder
    businessCountry?: SortOrder
    businessCodeWhatsappNumber?: SortOrder
    businessWhatsappNumber?: SortOrder
    businessConnectionDB?: SortOrder
    businessEntity?: SortOrder
    businessStatus?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumBusinessEntityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessEntity | EnumBusinessEntityFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessEntityWithAggregatesFilter<$PrismaModel> | $Enums.BusinessEntity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessEntityFilter<$PrismaModel>
    _max?: NestedEnumBusinessEntityFilter<$PrismaModel>
  }

  export type EnumBusinessStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessStatus | EnumBusinessStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessStatusWithAggregatesFilter<$PrismaModel> | $Enums.BusinessStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessStatusFilter<$PrismaModel>
    _max?: NestedEnumBusinessStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BusinessScalarRelationFilter = {
    is?: BusinessWhereInput
    isNot?: BusinessWhereInput
  }

  export type UserBusinessUserBusinessUserIdUserBusinessBusinessIdCompoundUniqueInput = {
    userBusinessUserId: string
    userBusinessBusinessId: string
  }

  export type UserBusinessCountOrderByAggregateInput = {
    userBusinessUserId?: SortOrder
    userBusinessBusinessId?: SortOrder
    userBusinessRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserBusinessMaxOrderByAggregateInput = {
    userBusinessUserId?: SortOrder
    userBusinessBusinessId?: SortOrder
    userBusinessRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserBusinessMinOrderByAggregateInput = {
    userBusinessUserId?: SortOrder
    userBusinessBusinessId?: SortOrder
    userBusinessRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumUserGuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserGuestStatus | EnumUserGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserGuestStatusFilter<$PrismaModel> | $Enums.UserGuestStatus
  }

  export type UserGuestCountOrderByAggregateInput = {
    userGuestId?: SortOrder
    userGuestEmail?: SortOrder
    userGuestUserId?: SortOrder
    userGuestBusinessId?: SortOrder
    userGuestRole?: SortOrder
    userGuestStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserGuestMaxOrderByAggregateInput = {
    userGuestId?: SortOrder
    userGuestEmail?: SortOrder
    userGuestUserId?: SortOrder
    userGuestBusinessId?: SortOrder
    userGuestRole?: SortOrder
    userGuestStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserGuestMinOrderByAggregateInput = {
    userGuestId?: SortOrder
    userGuestEmail?: SortOrder
    userGuestUserId?: SortOrder
    userGuestBusinessId?: SortOrder
    userGuestRole?: SortOrder
    userGuestStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserGuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserGuestStatus | EnumUserGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserGuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserGuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserGuestStatusFilter<$PrismaModel>
    _max?: NestedEnumUserGuestStatusFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PlanCountOrderByAggregateInput = {
    planId?: SortOrder
    planName?: SortOrder
    planFeatures?: SortOrder
    planPrice?: SortOrder
    planDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    planPrice?: SortOrder
    planDuration?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    planId?: SortOrder
    planName?: SortOrder
    planPrice?: SortOrder
    planDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    planId?: SortOrder
    planName?: SortOrder
    planPrice?: SortOrder
    planDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    planPrice?: SortOrder
    planDuration?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type SubscriptionCountOrderByAggregateInput = {
    subscriptionId?: SortOrder
    subscriptionBusinessId?: SortOrder
    subscriptionPlanId?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionDuration?: SortOrder
    subscriptionEndDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionPaymentMethod?: SortOrder
    subscriptionPlanFeatures?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    subscriptionDuration?: SortOrder
    subscriptionAmount?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    subscriptionId?: SortOrder
    subscriptionBusinessId?: SortOrder
    subscriptionPlanId?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionDuration?: SortOrder
    subscriptionEndDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionPaymentMethod?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    subscriptionId?: SortOrder
    subscriptionBusinessId?: SortOrder
    subscriptionPlanId?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionDuration?: SortOrder
    subscriptionEndDate?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionAmount?: SortOrder
    subscriptionPaymentMethod?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    subscriptionDuration?: SortOrder
    subscriptionAmount?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type EnumTicketTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketType | EnumTicketTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketTypeFilter<$PrismaModel> | $Enums.TicketType
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type TicketCountOrderByAggregateInput = {
    ticketId?: SortOrder
    ticketNumber?: SortOrder
    ticketSubject?: SortOrder
    ticketType?: SortOrder
    ticketStatus?: SortOrder
    ticketAssociatedTo?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    ticketId?: SortOrder
    ticketNumber?: SortOrder
    ticketSubject?: SortOrder
    ticketType?: SortOrder
    ticketStatus?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    ticketId?: SortOrder
    ticketNumber?: SortOrder
    ticketSubject?: SortOrder
    ticketType?: SortOrder
    ticketStatus?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTicketTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketType | EnumTicketTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketTypeWithAggregatesFilter<$PrismaModel> | $Enums.TicketType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketTypeFilter<$PrismaModel>
    _max?: NestedEnumTicketTypeFilter<$PrismaModel>
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type EnumTicketDetailOriginFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketDetailOrigin | EnumTicketDetailOriginFieldRefInput<$PrismaModel>
    in?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketDetailOriginFilter<$PrismaModel> | $Enums.TicketDetailOrigin
  }

  export type TicketScalarRelationFilter = {
    is?: TicketWhereInput
    isNot?: TicketWhereInput
  }

  export type TicketDetailCountOrderByAggregateInput = {
    ticketDetailId?: SortOrder
    ticketDetailNumber?: SortOrder
    ticketId?: SortOrder
    ticketDetailContent?: SortOrder
    ticketDetailImage?: SortOrder
    ticketAssociatedTo?: SortOrder
    createdByUserId?: SortOrder
    ticketDetailOrigin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketDetailMaxOrderByAggregateInput = {
    ticketDetailId?: SortOrder
    ticketDetailNumber?: SortOrder
    ticketId?: SortOrder
    ticketDetailContent?: SortOrder
    createdByUserId?: SortOrder
    ticketDetailOrigin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketDetailMinOrderByAggregateInput = {
    ticketDetailId?: SortOrder
    ticketDetailNumber?: SortOrder
    ticketId?: SortOrder
    ticketDetailContent?: SortOrder
    createdByUserId?: SortOrder
    ticketDetailOrigin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTicketDetailOriginWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketDetailOrigin | EnumTicketDetailOriginFieldRefInput<$PrismaModel>
    in?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketDetailOriginWithAggregatesFilter<$PrismaModel> | $Enums.TicketDetailOrigin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketDetailOriginFilter<$PrismaModel>
    _max?: NestedEnumTicketDetailOriginFilter<$PrismaModel>
  }

  export type newsletterSubscriberCountOrderByAggregateInput = {
    newsletterSubscriberId?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type newsletterSubscriberMaxOrderByAggregateInput = {
    newsletterSubscriberId?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type newsletterSubscriberMinOrderByAggregateInput = {
    newsletterSubscriberId?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserBusinessCreateNestedManyWithoutUserInput = {
    create?: XOR<UserBusinessCreateWithoutUserInput, UserBusinessUncheckedCreateWithoutUserInput> | UserBusinessCreateWithoutUserInput[] | UserBusinessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutUserInput | UserBusinessCreateOrConnectWithoutUserInput[]
    createMany?: UserBusinessCreateManyUserInputEnvelope
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
  }

  export type UserGuestCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGuestCreateWithoutUserInput, UserGuestUncheckedCreateWithoutUserInput> | UserGuestCreateWithoutUserInput[] | UserGuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutUserInput | UserGuestCreateOrConnectWithoutUserInput[]
    createMany?: UserGuestCreateManyUserInputEnvelope
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
  }

  export type BusinessCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BusinessCreateWithoutCreatedByInput, BusinessUncheckedCreateWithoutCreatedByInput> | BusinessCreateWithoutCreatedByInput[] | BusinessUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BusinessCreateOrConnectWithoutCreatedByInput | BusinessCreateOrConnectWithoutCreatedByInput[]
    createMany?: BusinessCreateManyCreatedByInputEnvelope
    connect?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TicketCreateWithoutCreatedByInput, TicketUncheckedCreateWithoutCreatedByInput> | TicketCreateWithoutCreatedByInput[] | TicketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatedByInput | TicketCreateOrConnectWithoutCreatedByInput[]
    createMany?: TicketCreateManyCreatedByInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketDetailCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TicketDetailCreateWithoutCreatedByInput, TicketDetailUncheckedCreateWithoutCreatedByInput> | TicketDetailCreateWithoutCreatedByInput[] | TicketDetailUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutCreatedByInput | TicketDetailCreateOrConnectWithoutCreatedByInput[]
    createMany?: TicketDetailCreateManyCreatedByInputEnvelope
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
  }

  export type UserBusinessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserBusinessCreateWithoutUserInput, UserBusinessUncheckedCreateWithoutUserInput> | UserBusinessCreateWithoutUserInput[] | UserBusinessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutUserInput | UserBusinessCreateOrConnectWithoutUserInput[]
    createMany?: UserBusinessCreateManyUserInputEnvelope
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
  }

  export type UserGuestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGuestCreateWithoutUserInput, UserGuestUncheckedCreateWithoutUserInput> | UserGuestCreateWithoutUserInput[] | UserGuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutUserInput | UserGuestCreateOrConnectWithoutUserInput[]
    createMany?: UserGuestCreateManyUserInputEnvelope
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
  }

  export type BusinessUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BusinessCreateWithoutCreatedByInput, BusinessUncheckedCreateWithoutCreatedByInput> | BusinessCreateWithoutCreatedByInput[] | BusinessUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BusinessCreateOrConnectWithoutCreatedByInput | BusinessCreateOrConnectWithoutCreatedByInput[]
    createMany?: BusinessCreateManyCreatedByInputEnvelope
    connect?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TicketCreateWithoutCreatedByInput, TicketUncheckedCreateWithoutCreatedByInput> | TicketCreateWithoutCreatedByInput[] | TicketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatedByInput | TicketCreateOrConnectWithoutCreatedByInput[]
    createMany?: TicketCreateManyCreatedByInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketDetailUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TicketDetailCreateWithoutCreatedByInput, TicketDetailUncheckedCreateWithoutCreatedByInput> | TicketDetailCreateWithoutCreatedByInput[] | TicketDetailUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutCreatedByInput | TicketDetailCreateOrConnectWithoutCreatedByInput[]
    createMany?: TicketDetailCreateManyCreatedByInputEnvelope
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserBusinessUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserBusinessCreateWithoutUserInput, UserBusinessUncheckedCreateWithoutUserInput> | UserBusinessCreateWithoutUserInput[] | UserBusinessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutUserInput | UserBusinessCreateOrConnectWithoutUserInput[]
    upsert?: UserBusinessUpsertWithWhereUniqueWithoutUserInput | UserBusinessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserBusinessCreateManyUserInputEnvelope
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    update?: UserBusinessUpdateWithWhereUniqueWithoutUserInput | UserBusinessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserBusinessUpdateManyWithWhereWithoutUserInput | UserBusinessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[]
  }

  export type UserGuestUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGuestCreateWithoutUserInput, UserGuestUncheckedCreateWithoutUserInput> | UserGuestCreateWithoutUserInput[] | UserGuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutUserInput | UserGuestCreateOrConnectWithoutUserInput[]
    upsert?: UserGuestUpsertWithWhereUniqueWithoutUserInput | UserGuestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGuestCreateManyUserInputEnvelope
    set?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    disconnect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    delete?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    update?: UserGuestUpdateWithWhereUniqueWithoutUserInput | UserGuestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGuestUpdateManyWithWhereWithoutUserInput | UserGuestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGuestScalarWhereInput | UserGuestScalarWhereInput[]
  }

  export type BusinessUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BusinessCreateWithoutCreatedByInput, BusinessUncheckedCreateWithoutCreatedByInput> | BusinessCreateWithoutCreatedByInput[] | BusinessUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BusinessCreateOrConnectWithoutCreatedByInput | BusinessCreateOrConnectWithoutCreatedByInput[]
    upsert?: BusinessUpsertWithWhereUniqueWithoutCreatedByInput | BusinessUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BusinessCreateManyCreatedByInputEnvelope
    set?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    disconnect?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    delete?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    connect?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    update?: BusinessUpdateWithWhereUniqueWithoutCreatedByInput | BusinessUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BusinessUpdateManyWithWhereWithoutCreatedByInput | BusinessUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BusinessScalarWhereInput | BusinessScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput | SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput | SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutCreatedByInput | SubscriptionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TicketCreateWithoutCreatedByInput, TicketUncheckedCreateWithoutCreatedByInput> | TicketCreateWithoutCreatedByInput[] | TicketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatedByInput | TicketCreateOrConnectWithoutCreatedByInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCreatedByInput | TicketUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TicketCreateManyCreatedByInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCreatedByInput | TicketUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCreatedByInput | TicketUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketDetailUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TicketDetailCreateWithoutCreatedByInput, TicketDetailUncheckedCreateWithoutCreatedByInput> | TicketDetailCreateWithoutCreatedByInput[] | TicketDetailUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutCreatedByInput | TicketDetailCreateOrConnectWithoutCreatedByInput[]
    upsert?: TicketDetailUpsertWithWhereUniqueWithoutCreatedByInput | TicketDetailUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TicketDetailCreateManyCreatedByInputEnvelope
    set?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    disconnect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    delete?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    update?: TicketDetailUpdateWithWhereUniqueWithoutCreatedByInput | TicketDetailUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TicketDetailUpdateManyWithWhereWithoutCreatedByInput | TicketDetailUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TicketDetailScalarWhereInput | TicketDetailScalarWhereInput[]
  }

  export type UserBusinessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserBusinessCreateWithoutUserInput, UserBusinessUncheckedCreateWithoutUserInput> | UserBusinessCreateWithoutUserInput[] | UserBusinessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutUserInput | UserBusinessCreateOrConnectWithoutUserInput[]
    upsert?: UserBusinessUpsertWithWhereUniqueWithoutUserInput | UserBusinessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserBusinessCreateManyUserInputEnvelope
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    update?: UserBusinessUpdateWithWhereUniqueWithoutUserInput | UserBusinessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserBusinessUpdateManyWithWhereWithoutUserInput | UserBusinessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[]
  }

  export type UserGuestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGuestCreateWithoutUserInput, UserGuestUncheckedCreateWithoutUserInput> | UserGuestCreateWithoutUserInput[] | UserGuestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutUserInput | UserGuestCreateOrConnectWithoutUserInput[]
    upsert?: UserGuestUpsertWithWhereUniqueWithoutUserInput | UserGuestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGuestCreateManyUserInputEnvelope
    set?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    disconnect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    delete?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    update?: UserGuestUpdateWithWhereUniqueWithoutUserInput | UserGuestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGuestUpdateManyWithWhereWithoutUserInput | UserGuestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGuestScalarWhereInput | UserGuestScalarWhereInput[]
  }

  export type BusinessUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BusinessCreateWithoutCreatedByInput, BusinessUncheckedCreateWithoutCreatedByInput> | BusinessCreateWithoutCreatedByInput[] | BusinessUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BusinessCreateOrConnectWithoutCreatedByInput | BusinessCreateOrConnectWithoutCreatedByInput[]
    upsert?: BusinessUpsertWithWhereUniqueWithoutCreatedByInput | BusinessUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BusinessCreateManyCreatedByInputEnvelope
    set?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    disconnect?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    delete?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    connect?: BusinessWhereUniqueInput | BusinessWhereUniqueInput[]
    update?: BusinessUpdateWithWhereUniqueWithoutCreatedByInput | BusinessUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BusinessUpdateManyWithWhereWithoutCreatedByInput | BusinessUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BusinessScalarWhereInput | BusinessScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput | SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput | SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutCreatedByInput | SubscriptionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TicketCreateWithoutCreatedByInput, TicketUncheckedCreateWithoutCreatedByInput> | TicketCreateWithoutCreatedByInput[] | TicketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCreatedByInput | TicketCreateOrConnectWithoutCreatedByInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCreatedByInput | TicketUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TicketCreateManyCreatedByInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCreatedByInput | TicketUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCreatedByInput | TicketUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketDetailUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TicketDetailCreateWithoutCreatedByInput, TicketDetailUncheckedCreateWithoutCreatedByInput> | TicketDetailCreateWithoutCreatedByInput[] | TicketDetailUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutCreatedByInput | TicketDetailCreateOrConnectWithoutCreatedByInput[]
    upsert?: TicketDetailUpsertWithWhereUniqueWithoutCreatedByInput | TicketDetailUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TicketDetailCreateManyCreatedByInputEnvelope
    set?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    disconnect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    delete?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    update?: TicketDetailUpdateWithWhereUniqueWithoutCreatedByInput | TicketDetailUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TicketDetailUpdateManyWithWhereWithoutCreatedByInput | TicketDetailUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TicketDetailScalarWhereInput | TicketDetailScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBusinessesInput = {
    create?: XOR<UserCreateWithoutBusinessesInput, UserUncheckedCreateWithoutBusinessesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBusinessesInput
    connect?: UserWhereUniqueInput
  }

  export type UserGuestCreateNestedManyWithoutBusinessInput = {
    create?: XOR<UserGuestCreateWithoutBusinessInput, UserGuestUncheckedCreateWithoutBusinessInput> | UserGuestCreateWithoutBusinessInput[] | UserGuestUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutBusinessInput | UserGuestCreateOrConnectWithoutBusinessInput[]
    createMany?: UserGuestCreateManyBusinessInputEnvelope
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
  }

  export type UserBusinessCreateNestedManyWithoutBusinessInput = {
    create?: XOR<UserBusinessCreateWithoutBusinessInput, UserBusinessUncheckedCreateWithoutBusinessInput> | UserBusinessCreateWithoutBusinessInput[] | UserBusinessUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutBusinessInput | UserBusinessCreateOrConnectWithoutBusinessInput[]
    createMany?: UserBusinessCreateManyBusinessInputEnvelope
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutBusinessInput = {
    create?: XOR<SubscriptionCreateWithoutBusinessInput, SubscriptionUncheckedCreateWithoutBusinessInput> | SubscriptionCreateWithoutBusinessInput[] | SubscriptionUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBusinessInput | SubscriptionCreateOrConnectWithoutBusinessInput[]
    createMany?: SubscriptionCreateManyBusinessInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type UserGuestUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<UserGuestCreateWithoutBusinessInput, UserGuestUncheckedCreateWithoutBusinessInput> | UserGuestCreateWithoutBusinessInput[] | UserGuestUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutBusinessInput | UserGuestCreateOrConnectWithoutBusinessInput[]
    createMany?: UserGuestCreateManyBusinessInputEnvelope
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
  }

  export type UserBusinessUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<UserBusinessCreateWithoutBusinessInput, UserBusinessUncheckedCreateWithoutBusinessInput> | UserBusinessCreateWithoutBusinessInput[] | UserBusinessUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutBusinessInput | UserBusinessCreateOrConnectWithoutBusinessInput[]
    createMany?: UserBusinessCreateManyBusinessInputEnvelope
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<SubscriptionCreateWithoutBusinessInput, SubscriptionUncheckedCreateWithoutBusinessInput> | SubscriptionCreateWithoutBusinessInput[] | SubscriptionUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBusinessInput | SubscriptionCreateOrConnectWithoutBusinessInput[]
    createMany?: SubscriptionCreateManyBusinessInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumBusinessEntityFieldUpdateOperationsInput = {
    set?: $Enums.BusinessEntity
  }

  export type EnumBusinessStatusFieldUpdateOperationsInput = {
    set?: $Enums.BusinessStatus
  }

  export type UserUpdateOneWithoutBusinessesNestedInput = {
    create?: XOR<UserCreateWithoutBusinessesInput, UserUncheckedCreateWithoutBusinessesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBusinessesInput
    upsert?: UserUpsertWithoutBusinessesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBusinessesInput, UserUpdateWithoutBusinessesInput>, UserUncheckedUpdateWithoutBusinessesInput>
  }

  export type UserGuestUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<UserGuestCreateWithoutBusinessInput, UserGuestUncheckedCreateWithoutBusinessInput> | UserGuestCreateWithoutBusinessInput[] | UserGuestUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutBusinessInput | UserGuestCreateOrConnectWithoutBusinessInput[]
    upsert?: UserGuestUpsertWithWhereUniqueWithoutBusinessInput | UserGuestUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: UserGuestCreateManyBusinessInputEnvelope
    set?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    disconnect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    delete?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    update?: UserGuestUpdateWithWhereUniqueWithoutBusinessInput | UserGuestUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: UserGuestUpdateManyWithWhereWithoutBusinessInput | UserGuestUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: UserGuestScalarWhereInput | UserGuestScalarWhereInput[]
  }

  export type UserBusinessUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<UserBusinessCreateWithoutBusinessInput, UserBusinessUncheckedCreateWithoutBusinessInput> | UserBusinessCreateWithoutBusinessInput[] | UserBusinessUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutBusinessInput | UserBusinessCreateOrConnectWithoutBusinessInput[]
    upsert?: UserBusinessUpsertWithWhereUniqueWithoutBusinessInput | UserBusinessUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: UserBusinessCreateManyBusinessInputEnvelope
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    update?: UserBusinessUpdateWithWhereUniqueWithoutBusinessInput | UserBusinessUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: UserBusinessUpdateManyWithWhereWithoutBusinessInput | UserBusinessUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<SubscriptionCreateWithoutBusinessInput, SubscriptionUncheckedCreateWithoutBusinessInput> | SubscriptionCreateWithoutBusinessInput[] | SubscriptionUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBusinessInput | SubscriptionCreateOrConnectWithoutBusinessInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutBusinessInput | SubscriptionUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: SubscriptionCreateManyBusinessInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutBusinessInput | SubscriptionUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutBusinessInput | SubscriptionUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type UserGuestUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<UserGuestCreateWithoutBusinessInput, UserGuestUncheckedCreateWithoutBusinessInput> | UserGuestCreateWithoutBusinessInput[] | UserGuestUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserGuestCreateOrConnectWithoutBusinessInput | UserGuestCreateOrConnectWithoutBusinessInput[]
    upsert?: UserGuestUpsertWithWhereUniqueWithoutBusinessInput | UserGuestUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: UserGuestCreateManyBusinessInputEnvelope
    set?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    disconnect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    delete?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    connect?: UserGuestWhereUniqueInput | UserGuestWhereUniqueInput[]
    update?: UserGuestUpdateWithWhereUniqueWithoutBusinessInput | UserGuestUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: UserGuestUpdateManyWithWhereWithoutBusinessInput | UserGuestUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: UserGuestScalarWhereInput | UserGuestScalarWhereInput[]
  }

  export type UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<UserBusinessCreateWithoutBusinessInput, UserBusinessUncheckedCreateWithoutBusinessInput> | UserBusinessCreateWithoutBusinessInput[] | UserBusinessUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: UserBusinessCreateOrConnectWithoutBusinessInput | UserBusinessCreateOrConnectWithoutBusinessInput[]
    upsert?: UserBusinessUpsertWithWhereUniqueWithoutBusinessInput | UserBusinessUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: UserBusinessCreateManyBusinessInputEnvelope
    set?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    disconnect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    delete?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    connect?: UserBusinessWhereUniqueInput | UserBusinessWhereUniqueInput[]
    update?: UserBusinessUpdateWithWhereUniqueWithoutBusinessInput | UserBusinessUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: UserBusinessUpdateManyWithWhereWithoutBusinessInput | UserBusinessUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<SubscriptionCreateWithoutBusinessInput, SubscriptionUncheckedCreateWithoutBusinessInput> | SubscriptionCreateWithoutBusinessInput[] | SubscriptionUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutBusinessInput | SubscriptionCreateOrConnectWithoutBusinessInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutBusinessInput | SubscriptionUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: SubscriptionCreateManyBusinessInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutBusinessInput | SubscriptionUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutBusinessInput | SubscriptionUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserBusinessInput = {
    create?: XOR<UserCreateWithoutUserBusinessInput, UserUncheckedCreateWithoutUserBusinessInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserBusinessInput
    connect?: UserWhereUniqueInput
  }

  export type BusinessCreateNestedOneWithoutUserBusinessInput = {
    create?: XOR<BusinessCreateWithoutUserBusinessInput, BusinessUncheckedCreateWithoutUserBusinessInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutUserBusinessInput
    connect?: BusinessWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type UserUpdateOneRequiredWithoutUserBusinessNestedInput = {
    create?: XOR<UserCreateWithoutUserBusinessInput, UserUncheckedCreateWithoutUserBusinessInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserBusinessInput
    upsert?: UserUpsertWithoutUserBusinessInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserBusinessInput, UserUpdateWithoutUserBusinessInput>, UserUncheckedUpdateWithoutUserBusinessInput>
  }

  export type BusinessUpdateOneRequiredWithoutUserBusinessNestedInput = {
    create?: XOR<BusinessCreateWithoutUserBusinessInput, BusinessUncheckedCreateWithoutUserBusinessInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutUserBusinessInput
    upsert?: BusinessUpsertWithoutUserBusinessInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutUserBusinessInput, BusinessUpdateWithoutUserBusinessInput>, BusinessUncheckedUpdateWithoutUserBusinessInput>
  }

  export type UserCreateNestedOneWithoutUserGuestInput = {
    create?: XOR<UserCreateWithoutUserGuestInput, UserUncheckedCreateWithoutUserGuestInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserGuestInput
    connect?: UserWhereUniqueInput
  }

  export type BusinessCreateNestedOneWithoutUserGuestInput = {
    create?: XOR<BusinessCreateWithoutUserGuestInput, BusinessUncheckedCreateWithoutUserGuestInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutUserGuestInput
    connect?: BusinessWhereUniqueInput
  }

  export type EnumUserGuestStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserGuestStatus
  }

  export type UserUpdateOneRequiredWithoutUserGuestNestedInput = {
    create?: XOR<UserCreateWithoutUserGuestInput, UserUncheckedCreateWithoutUserGuestInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserGuestInput
    upsert?: UserUpsertWithoutUserGuestInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserGuestInput, UserUpdateWithoutUserGuestInput>, UserUncheckedUpdateWithoutUserGuestInput>
  }

  export type BusinessUpdateOneRequiredWithoutUserGuestNestedInput = {
    create?: XOR<BusinessCreateWithoutUserGuestInput, BusinessUncheckedCreateWithoutUserGuestInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutUserGuestInput
    upsert?: BusinessUpsertWithoutUserGuestInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutUserGuestInput, BusinessUpdateWithoutUserGuestInput>, BusinessUncheckedUpdateWithoutUserGuestInput>
  }

  export type SubscriptionCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubscriptionUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutPlanInput | SubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutPlanInput | SubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutPlanInput | SubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput> | SubscriptionCreateWithoutPlanInput[] | SubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPlanInput | SubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutPlanInput | SubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubscriptionCreateManyPlanInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutPlanInput | SubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutPlanInput | SubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
  }

  export type PlanCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutSubscriptionsInput
    connect?: PlanWhereUniqueInput
  }

  export type BusinessCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<BusinessCreateWithoutSubscriptionsInput, BusinessUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutSubscriptionsInput
    connect?: BusinessWhereUniqueInput
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type UserUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    upsert?: UserUpsertWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscriptionsInput, UserUpdateWithoutSubscriptionsInput>, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type PlanUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutSubscriptionsInput
    upsert?: PlanUpsertWithoutSubscriptionsInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutSubscriptionsInput, PlanUpdateWithoutSubscriptionsInput>, PlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type BusinessUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<BusinessCreateWithoutSubscriptionsInput, BusinessUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutSubscriptionsInput
    upsert?: BusinessUpsertWithoutSubscriptionsInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutSubscriptionsInput, BusinessUpdateWithoutSubscriptionsInput>, BusinessUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type TicketCreateticketAssociatedToInput = {
    set: string[]
  }

  export type TicketDetailCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketDetailCreateWithoutTicketInput, TicketDetailUncheckedCreateWithoutTicketInput> | TicketDetailCreateWithoutTicketInput[] | TicketDetailUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutTicketInput | TicketDetailCreateOrConnectWithoutTicketInput[]
    createMany?: TicketDetailCreateManyTicketInputEnvelope
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutTicketsInput = {
    create?: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type TicketDetailUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketDetailCreateWithoutTicketInput, TicketDetailUncheckedCreateWithoutTicketInput> | TicketDetailCreateWithoutTicketInput[] | TicketDetailUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutTicketInput | TicketDetailCreateOrConnectWithoutTicketInput[]
    createMany?: TicketDetailCreateManyTicketInputEnvelope
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
  }

  export type EnumTicketTypeFieldUpdateOperationsInput = {
    set?: $Enums.TicketType
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type TicketUpdateticketAssociatedToInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TicketDetailUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketDetailCreateWithoutTicketInput, TicketDetailUncheckedCreateWithoutTicketInput> | TicketDetailCreateWithoutTicketInput[] | TicketDetailUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutTicketInput | TicketDetailCreateOrConnectWithoutTicketInput[]
    upsert?: TicketDetailUpsertWithWhereUniqueWithoutTicketInput | TicketDetailUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketDetailCreateManyTicketInputEnvelope
    set?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    disconnect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    delete?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    update?: TicketDetailUpdateWithWhereUniqueWithoutTicketInput | TicketDetailUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketDetailUpdateManyWithWhereWithoutTicketInput | TicketDetailUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketDetailScalarWhereInput | TicketDetailScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsInput
    upsert?: UserUpsertWithoutTicketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsInput, UserUpdateWithoutTicketsInput>, UserUncheckedUpdateWithoutTicketsInput>
  }

  export type TicketDetailUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketDetailCreateWithoutTicketInput, TicketDetailUncheckedCreateWithoutTicketInput> | TicketDetailCreateWithoutTicketInput[] | TicketDetailUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketDetailCreateOrConnectWithoutTicketInput | TicketDetailCreateOrConnectWithoutTicketInput[]
    upsert?: TicketDetailUpsertWithWhereUniqueWithoutTicketInput | TicketDetailUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketDetailCreateManyTicketInputEnvelope
    set?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    disconnect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    delete?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    connect?: TicketDetailWhereUniqueInput | TicketDetailWhereUniqueInput[]
    update?: TicketDetailUpdateWithWhereUniqueWithoutTicketInput | TicketDetailUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketDetailUpdateManyWithWhereWithoutTicketInput | TicketDetailUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketDetailScalarWhereInput | TicketDetailScalarWhereInput[]
  }

  export type TicketDetailCreateticketDetailImageInput = {
    set: string[]
  }

  export type TicketDetailCreateticketAssociatedToInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutTicketDetailsInput = {
    create?: XOR<UserCreateWithoutTicketDetailsInput, UserUncheckedCreateWithoutTicketDetailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketDetailsInput
    connect?: UserWhereUniqueInput
  }

  export type TicketCreateNestedOneWithoutTicketDetailsInput = {
    create?: XOR<TicketCreateWithoutTicketDetailsInput, TicketUncheckedCreateWithoutTicketDetailsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutTicketDetailsInput
    connect?: TicketWhereUniqueInput
  }

  export type TicketDetailUpdateticketDetailImageInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TicketDetailUpdateticketAssociatedToInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumTicketDetailOriginFieldUpdateOperationsInput = {
    set?: $Enums.TicketDetailOrigin
  }

  export type UserUpdateOneRequiredWithoutTicketDetailsNestedInput = {
    create?: XOR<UserCreateWithoutTicketDetailsInput, UserUncheckedCreateWithoutTicketDetailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketDetailsInput
    upsert?: UserUpsertWithoutTicketDetailsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketDetailsInput, UserUpdateWithoutTicketDetailsInput>, UserUncheckedUpdateWithoutTicketDetailsInput>
  }

  export type TicketUpdateOneRequiredWithoutTicketDetailsNestedInput = {
    create?: XOR<TicketCreateWithoutTicketDetailsInput, TicketUncheckedCreateWithoutTicketDetailsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutTicketDetailsInput
    upsert?: TicketUpsertWithoutTicketDetailsInput
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutTicketDetailsInput, TicketUpdateWithoutTicketDetailsInput>, TicketUncheckedUpdateWithoutTicketDetailsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumBusinessEntityFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessEntity | EnumBusinessEntityFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessEntityFilter<$PrismaModel> | $Enums.BusinessEntity
  }

  export type NestedEnumBusinessStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessStatus | EnumBusinessStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessStatusFilter<$PrismaModel> | $Enums.BusinessStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumBusinessEntityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessEntity | EnumBusinessEntityFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessEntity[] | ListEnumBusinessEntityFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessEntityWithAggregatesFilter<$PrismaModel> | $Enums.BusinessEntity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessEntityFilter<$PrismaModel>
    _max?: NestedEnumBusinessEntityFilter<$PrismaModel>
  }

  export type NestedEnumBusinessStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessStatus | EnumBusinessStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessStatus[] | ListEnumBusinessStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessStatusWithAggregatesFilter<$PrismaModel> | $Enums.BusinessStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessStatusFilter<$PrismaModel>
    _max?: NestedEnumBusinessStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumUserGuestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserGuestStatus | EnumUserGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserGuestStatusFilter<$PrismaModel> | $Enums.UserGuestStatus
  }

  export type NestedEnumUserGuestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserGuestStatus | EnumUserGuestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserGuestStatus[] | ListEnumUserGuestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserGuestStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserGuestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserGuestStatusFilter<$PrismaModel>
    _max?: NestedEnumUserGuestStatusFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedEnumTicketTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketType | EnumTicketTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketTypeFilter<$PrismaModel> | $Enums.TicketType
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketType | EnumTicketTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketType[] | ListEnumTicketTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketTypeWithAggregatesFilter<$PrismaModel> | $Enums.TicketType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketTypeFilter<$PrismaModel>
    _max?: NestedEnumTicketTypeFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedEnumTicketDetailOriginFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketDetailOrigin | EnumTicketDetailOriginFieldRefInput<$PrismaModel>
    in?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketDetailOriginFilter<$PrismaModel> | $Enums.TicketDetailOrigin
  }

  export type NestedEnumTicketDetailOriginWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketDetailOrigin | EnumTicketDetailOriginFieldRefInput<$PrismaModel>
    in?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketDetailOrigin[] | ListEnumTicketDetailOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketDetailOriginWithAggregatesFilter<$PrismaModel> | $Enums.TicketDetailOrigin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketDetailOriginFilter<$PrismaModel>
    _max?: NestedEnumTicketDetailOriginFilter<$PrismaModel>
  }

  export type UserBusinessCreateWithoutUserInput = {
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    Business: BusinessCreateNestedOneWithoutUserBusinessInput
  }

  export type UserBusinessUncheckedCreateWithoutUserInput = {
    userBusinessBusinessId: string
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBusinessCreateOrConnectWithoutUserInput = {
    where: UserBusinessWhereUniqueInput
    create: XOR<UserBusinessCreateWithoutUserInput, UserBusinessUncheckedCreateWithoutUserInput>
  }

  export type UserBusinessCreateManyUserInputEnvelope = {
    data: UserBusinessCreateManyUserInput | UserBusinessCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserGuestCreateWithoutUserInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    Business: BusinessCreateNestedOneWithoutUserGuestInput
  }

  export type UserGuestUncheckedCreateWithoutUserInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestBusinessId: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGuestCreateOrConnectWithoutUserInput = {
    where: UserGuestWhereUniqueInput
    create: XOR<UserGuestCreateWithoutUserInput, UserGuestUncheckedCreateWithoutUserInput>
  }

  export type UserGuestCreateManyUserInputEnvelope = {
    data: UserGuestCreateManyUserInput | UserGuestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BusinessCreateWithoutCreatedByInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutCreatedByInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutCreatedByInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutCreatedByInput, BusinessUncheckedCreateWithoutCreatedByInput>
  }

  export type BusinessCreateManyCreatedByInputEnvelope = {
    data: BusinessCreateManyCreatedByInput | BusinessCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutCreatedByInput = {
    subscriptionId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
    business: BusinessCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutCreatedByInput = {
    subscriptionId: string
    subscriptionBusinessId: string
    subscriptionPlanId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutCreatedByInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput>
  }

  export type SubscriptionCreateManyCreatedByInputEnvelope = {
    data: SubscriptionCreateManyCreatedByInput | SubscriptionCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutCreatedByInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketDetails?: TicketDetailCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutCreatedByInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutCreatedByInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutCreatedByInput, TicketUncheckedCreateWithoutCreatedByInput>
  }

  export type TicketCreateManyCreatedByInputEnvelope = {
    data: TicketCreateManyCreatedByInput | TicketCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TicketDetailCreateWithoutCreatedByInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
    Ticket: TicketCreateNestedOneWithoutTicketDetailsInput
  }

  export type TicketDetailUncheckedCreateWithoutCreatedByInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketId: string
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketDetailCreateOrConnectWithoutCreatedByInput = {
    where: TicketDetailWhereUniqueInput
    create: XOR<TicketDetailCreateWithoutCreatedByInput, TicketDetailUncheckedCreateWithoutCreatedByInput>
  }

  export type TicketDetailCreateManyCreatedByInputEnvelope = {
    data: TicketDetailCreateManyCreatedByInput | TicketDetailCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type UserBusinessUpsertWithWhereUniqueWithoutUserInput = {
    where: UserBusinessWhereUniqueInput
    update: XOR<UserBusinessUpdateWithoutUserInput, UserBusinessUncheckedUpdateWithoutUserInput>
    create: XOR<UserBusinessCreateWithoutUserInput, UserBusinessUncheckedCreateWithoutUserInput>
  }

  export type UserBusinessUpdateWithWhereUniqueWithoutUserInput = {
    where: UserBusinessWhereUniqueInput
    data: XOR<UserBusinessUpdateWithoutUserInput, UserBusinessUncheckedUpdateWithoutUserInput>
  }

  export type UserBusinessUpdateManyWithWhereWithoutUserInput = {
    where: UserBusinessScalarWhereInput
    data: XOR<UserBusinessUpdateManyMutationInput, UserBusinessUncheckedUpdateManyWithoutUserInput>
  }

  export type UserBusinessScalarWhereInput = {
    AND?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[]
    OR?: UserBusinessScalarWhereInput[]
    NOT?: UserBusinessScalarWhereInput | UserBusinessScalarWhereInput[]
    userBusinessUserId?: StringFilter<"UserBusiness"> | string
    userBusinessBusinessId?: StringFilter<"UserBusiness"> | string
    userBusinessRole?: EnumRoleFilter<"UserBusiness"> | $Enums.Role
    createdAt?: DateTimeFilter<"UserBusiness"> | Date | string
    updatedAt?: DateTimeFilter<"UserBusiness"> | Date | string
  }

  export type UserGuestUpsertWithWhereUniqueWithoutUserInput = {
    where: UserGuestWhereUniqueInput
    update: XOR<UserGuestUpdateWithoutUserInput, UserGuestUncheckedUpdateWithoutUserInput>
    create: XOR<UserGuestCreateWithoutUserInput, UserGuestUncheckedCreateWithoutUserInput>
  }

  export type UserGuestUpdateWithWhereUniqueWithoutUserInput = {
    where: UserGuestWhereUniqueInput
    data: XOR<UserGuestUpdateWithoutUserInput, UserGuestUncheckedUpdateWithoutUserInput>
  }

  export type UserGuestUpdateManyWithWhereWithoutUserInput = {
    where: UserGuestScalarWhereInput
    data: XOR<UserGuestUpdateManyMutationInput, UserGuestUncheckedUpdateManyWithoutUserInput>
  }

  export type UserGuestScalarWhereInput = {
    AND?: UserGuestScalarWhereInput | UserGuestScalarWhereInput[]
    OR?: UserGuestScalarWhereInput[]
    NOT?: UserGuestScalarWhereInput | UserGuestScalarWhereInput[]
    userGuestId?: StringFilter<"UserGuest"> | string
    userGuestEmail?: StringFilter<"UserGuest"> | string
    userGuestUserId?: StringFilter<"UserGuest"> | string
    userGuestBusinessId?: StringFilter<"UserGuest"> | string
    userGuestRole?: EnumRoleFilter<"UserGuest"> | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFilter<"UserGuest"> | $Enums.UserGuestStatus
    createdAt?: DateTimeFilter<"UserGuest"> | Date | string
    updatedAt?: DateTimeFilter<"UserGuest"> | Date | string
  }

  export type BusinessUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: BusinessWhereUniqueInput
    update: XOR<BusinessUpdateWithoutCreatedByInput, BusinessUncheckedUpdateWithoutCreatedByInput>
    create: XOR<BusinessCreateWithoutCreatedByInput, BusinessUncheckedCreateWithoutCreatedByInput>
  }

  export type BusinessUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: BusinessWhereUniqueInput
    data: XOR<BusinessUpdateWithoutCreatedByInput, BusinessUncheckedUpdateWithoutCreatedByInput>
  }

  export type BusinessUpdateManyWithWhereWithoutCreatedByInput = {
    where: BusinessScalarWhereInput
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type BusinessScalarWhereInput = {
    AND?: BusinessScalarWhereInput | BusinessScalarWhereInput[]
    OR?: BusinessScalarWhereInput[]
    NOT?: BusinessScalarWhereInput | BusinessScalarWhereInput[]
    businessId?: StringFilter<"Business"> | string
    businessName?: StringFilter<"Business"> | string
    businessType?: StringFilter<"Business"> | string
    businessDocumentType?: StringFilter<"Business"> | string
    businessDocumentNumber?: StringFilter<"Business"> | string
    businessEmail?: StringFilter<"Business"> | string
    businessPhoneNumber?: StringFilter<"Business"> | string
    businessCodePhoneNumber?: StringFilter<"Business"> | string
    businessCountry?: StringFilter<"Business"> | string
    businessCodeWhatsappNumber?: StringNullableFilter<"Business"> | string | null
    businessWhatsappNumber?: StringNullableFilter<"Business"> | string | null
    businessConnectionDB?: StringNullableFilter<"Business"> | string | null
    businessEntity?: EnumBusinessEntityFilter<"Business"> | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFilter<"Business"> | $Enums.BusinessStatus
    businessProcess?: JsonNullableFilter<"Business">
    createdByUserId?: StringNullableFilter<"Business"> | string | null
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutCreatedByInput, SubscriptionUncheckedUpdateWithoutCreatedByInput>
    create: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutCreatedByInput, SubscriptionUncheckedUpdateWithoutCreatedByInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutCreatedByInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    subscriptionId?: StringFilter<"Subscription"> | string
    subscriptionBusinessId?: StringFilter<"Subscription"> | string
    subscriptionPlanId?: StringFilter<"Subscription"> | string
    subscriptionStartDate?: DateTimeFilter<"Subscription"> | Date | string
    subscriptionDuration?: IntFilter<"Subscription"> | number
    subscriptionEndDate?: DateTimeFilter<"Subscription"> | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFilter<"Subscription"> | number
    subscriptionPaymentMethod?: StringFilter<"Subscription"> | string
    subscriptionPlanFeatures?: JsonFilter<"Subscription">
    createdByUserId?: StringFilter<"Subscription"> | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type TicketUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutCreatedByInput, TicketUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TicketCreateWithoutCreatedByInput, TicketUncheckedCreateWithoutCreatedByInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutCreatedByInput, TicketUncheckedUpdateWithoutCreatedByInput>
  }

  export type TicketUpdateManyWithWhereWithoutCreatedByInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    ticketId?: StringFilter<"Ticket"> | string
    ticketNumber?: StringNullableFilter<"Ticket"> | string | null
    ticketSubject?: StringNullableFilter<"Ticket"> | string | null
    ticketType?: EnumTicketTypeFilter<"Ticket"> | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    ticketAssociatedTo?: StringNullableListFilter<"Ticket">
    createdByUserId?: StringFilter<"Ticket"> | string
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
  }

  export type TicketDetailUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TicketDetailWhereUniqueInput
    update: XOR<TicketDetailUpdateWithoutCreatedByInput, TicketDetailUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TicketDetailCreateWithoutCreatedByInput, TicketDetailUncheckedCreateWithoutCreatedByInput>
  }

  export type TicketDetailUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TicketDetailWhereUniqueInput
    data: XOR<TicketDetailUpdateWithoutCreatedByInput, TicketDetailUncheckedUpdateWithoutCreatedByInput>
  }

  export type TicketDetailUpdateManyWithWhereWithoutCreatedByInput = {
    where: TicketDetailScalarWhereInput
    data: XOR<TicketDetailUpdateManyMutationInput, TicketDetailUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TicketDetailScalarWhereInput = {
    AND?: TicketDetailScalarWhereInput | TicketDetailScalarWhereInput[]
    OR?: TicketDetailScalarWhereInput[]
    NOT?: TicketDetailScalarWhereInput | TicketDetailScalarWhereInput[]
    ticketDetailId?: StringFilter<"TicketDetail"> | string
    ticketDetailNumber?: StringNullableFilter<"TicketDetail"> | string | null
    ticketId?: StringFilter<"TicketDetail"> | string
    ticketDetailContent?: StringFilter<"TicketDetail"> | string
    ticketDetailImage?: StringNullableListFilter<"TicketDetail">
    ticketAssociatedTo?: StringNullableListFilter<"TicketDetail">
    createdByUserId?: StringFilter<"TicketDetail"> | string
    ticketDetailOrigin?: EnumTicketDetailOriginFilter<"TicketDetail"> | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFilter<"TicketDetail"> | Date | string
    updatedAt?: DateTimeFilter<"TicketDetail"> | Date | string
  }

  export type UserCreateWithoutBusinessesInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    tickets?: TicketCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutBusinessesInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutBusinessesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBusinessesInput, UserUncheckedCreateWithoutBusinessesInput>
  }

  export type UserGuestCreateWithoutBusinessInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    User: UserCreateNestedOneWithoutUserGuestInput
  }

  export type UserGuestUncheckedCreateWithoutBusinessInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestUserId: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGuestCreateOrConnectWithoutBusinessInput = {
    where: UserGuestWhereUniqueInput
    create: XOR<UserGuestCreateWithoutBusinessInput, UserGuestUncheckedCreateWithoutBusinessInput>
  }

  export type UserGuestCreateManyBusinessInputEnvelope = {
    data: UserGuestCreateManyBusinessInput | UserGuestCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type UserBusinessCreateWithoutBusinessInput = {
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    User: UserCreateNestedOneWithoutUserBusinessInput
  }

  export type UserBusinessUncheckedCreateWithoutBusinessInput = {
    userBusinessUserId: string
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBusinessCreateOrConnectWithoutBusinessInput = {
    where: UserBusinessWhereUniqueInput
    create: XOR<UserBusinessCreateWithoutBusinessInput, UserBusinessUncheckedCreateWithoutBusinessInput>
  }

  export type UserBusinessCreateManyBusinessInputEnvelope = {
    data: UserBusinessCreateManyBusinessInput | UserBusinessCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutBusinessInput = {
    subscriptionId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutSubscriptionsInput
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutBusinessInput = {
    subscriptionId: string
    subscriptionPlanId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutBusinessInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutBusinessInput, SubscriptionUncheckedCreateWithoutBusinessInput>
  }

  export type SubscriptionCreateManyBusinessInputEnvelope = {
    data: SubscriptionCreateManyBusinessInput | SubscriptionCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBusinessesInput = {
    update: XOR<UserUpdateWithoutBusinessesInput, UserUncheckedUpdateWithoutBusinessesInput>
    create: XOR<UserCreateWithoutBusinessesInput, UserUncheckedCreateWithoutBusinessesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBusinessesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBusinessesInput, UserUncheckedUpdateWithoutBusinessesInput>
  }

  export type UserUpdateWithoutBusinessesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutBusinessesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserGuestUpsertWithWhereUniqueWithoutBusinessInput = {
    where: UserGuestWhereUniqueInput
    update: XOR<UserGuestUpdateWithoutBusinessInput, UserGuestUncheckedUpdateWithoutBusinessInput>
    create: XOR<UserGuestCreateWithoutBusinessInput, UserGuestUncheckedCreateWithoutBusinessInput>
  }

  export type UserGuestUpdateWithWhereUniqueWithoutBusinessInput = {
    where: UserGuestWhereUniqueInput
    data: XOR<UserGuestUpdateWithoutBusinessInput, UserGuestUncheckedUpdateWithoutBusinessInput>
  }

  export type UserGuestUpdateManyWithWhereWithoutBusinessInput = {
    where: UserGuestScalarWhereInput
    data: XOR<UserGuestUpdateManyMutationInput, UserGuestUncheckedUpdateManyWithoutBusinessInput>
  }

  export type UserBusinessUpsertWithWhereUniqueWithoutBusinessInput = {
    where: UserBusinessWhereUniqueInput
    update: XOR<UserBusinessUpdateWithoutBusinessInput, UserBusinessUncheckedUpdateWithoutBusinessInput>
    create: XOR<UserBusinessCreateWithoutBusinessInput, UserBusinessUncheckedCreateWithoutBusinessInput>
  }

  export type UserBusinessUpdateWithWhereUniqueWithoutBusinessInput = {
    where: UserBusinessWhereUniqueInput
    data: XOR<UserBusinessUpdateWithoutBusinessInput, UserBusinessUncheckedUpdateWithoutBusinessInput>
  }

  export type UserBusinessUpdateManyWithWhereWithoutBusinessInput = {
    where: UserBusinessScalarWhereInput
    data: XOR<UserBusinessUpdateManyMutationInput, UserBusinessUncheckedUpdateManyWithoutBusinessInput>
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutBusinessInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutBusinessInput, SubscriptionUncheckedUpdateWithoutBusinessInput>
    create: XOR<SubscriptionCreateWithoutBusinessInput, SubscriptionUncheckedCreateWithoutBusinessInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutBusinessInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutBusinessInput, SubscriptionUncheckedUpdateWithoutBusinessInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutBusinessInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutBusinessInput>
  }

  export type UserCreateWithoutUserBusinessInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestCreateNestedManyWithoutUserInput
    businesses?: BusinessCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    tickets?: TicketCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutUserBusinessInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutUserInput
    businesses?: BusinessUncheckedCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutUserBusinessInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserBusinessInput, UserUncheckedCreateWithoutUserBusinessInput>
  }

  export type BusinessCreateWithoutUserBusinessInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutBusinessesInput
    UserGuest?: UserGuestCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutUserBusinessInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutUserBusinessInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutUserBusinessInput, BusinessUncheckedCreateWithoutUserBusinessInput>
  }

  export type UserUpsertWithoutUserBusinessInput = {
    update: XOR<UserUpdateWithoutUserBusinessInput, UserUncheckedUpdateWithoutUserBusinessInput>
    create: XOR<UserCreateWithoutUserBusinessInput, UserUncheckedCreateWithoutUserBusinessInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserBusinessInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserBusinessInput, UserUncheckedUpdateWithoutUserBusinessInput>
  }

  export type UserUpdateWithoutUserBusinessInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUpdateManyWithoutUserNestedInput
    businesses?: BusinessUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUserBusinessInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutUserNestedInput
    businesses?: BusinessUncheckedUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type BusinessUpsertWithoutUserBusinessInput = {
    update: XOR<BusinessUpdateWithoutUserBusinessInput, BusinessUncheckedUpdateWithoutUserBusinessInput>
    create: XOR<BusinessCreateWithoutUserBusinessInput, BusinessUncheckedCreateWithoutUserBusinessInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutUserBusinessInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutUserBusinessInput, BusinessUncheckedUpdateWithoutUserBusinessInput>
  }

  export type BusinessUpdateWithoutUserBusinessInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutBusinessesNestedInput
    UserGuest?: UserGuestUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutUserBusinessInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type UserCreateWithoutUserGuestInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutUserInput
    businesses?: BusinessCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    tickets?: TicketCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutUserGuestInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutUserInput
    businesses?: BusinessUncheckedCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutUserGuestInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserGuestInput, UserUncheckedCreateWithoutUserGuestInput>
  }

  export type BusinessCreateWithoutUserGuestInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutBusinessesInput
    UserBusiness?: UserBusinessCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutUserGuestInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutUserGuestInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutUserGuestInput, BusinessUncheckedCreateWithoutUserGuestInput>
  }

  export type UserUpsertWithoutUserGuestInput = {
    update: XOR<UserUpdateWithoutUserGuestInput, UserUncheckedUpdateWithoutUserGuestInput>
    create: XOR<UserCreateWithoutUserGuestInput, UserUncheckedCreateWithoutUserGuestInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserGuestInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserGuestInput, UserUncheckedUpdateWithoutUserGuestInput>
  }

  export type UserUpdateWithoutUserGuestInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutUserNestedInput
    businesses?: BusinessUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUserGuestInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput
    businesses?: BusinessUncheckedUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type BusinessUpsertWithoutUserGuestInput = {
    update: XOR<BusinessUpdateWithoutUserGuestInput, BusinessUncheckedUpdateWithoutUserGuestInput>
    create: XOR<BusinessCreateWithoutUserGuestInput, BusinessUncheckedCreateWithoutUserGuestInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutUserGuestInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutUserGuestInput, BusinessUncheckedUpdateWithoutUserGuestInput>
  }

  export type BusinessUpdateWithoutUserGuestInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutBusinessesNestedInput
    UserBusiness?: UserBusinessUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutUserGuestInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type SubscriptionCreateWithoutPlanInput = {
    subscriptionId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutSubscriptionsInput
    business: BusinessCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutPlanInput = {
    subscriptionId: string
    subscriptionBusinessId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type SubscriptionCreateManyPlanInputEnvelope = {
    data: SubscriptionCreateManyPlanInput | SubscriptionCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutPlanInput, SubscriptionUncheckedUpdateWithoutPlanInput>
    create: XOR<SubscriptionCreateWithoutPlanInput, SubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutPlanInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutPlanInput, SubscriptionUncheckedUpdateWithoutPlanInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutPlanInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutPlanInput>
  }

  export type UserCreateWithoutSubscriptionsInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestCreateNestedManyWithoutUserInput
    businesses?: BusinessCreateNestedManyWithoutCreatedByInput
    tickets?: TicketCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSubscriptionsInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutUserInput
    businesses?: BusinessUncheckedCreateNestedManyWithoutCreatedByInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSubscriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
  }

  export type PlanCreateWithoutSubscriptionsInput = {
    planId: string
    planName: string
    planFeatures: JsonNullValueInput | InputJsonValue
    planPrice: number
    planDuration: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUncheckedCreateWithoutSubscriptionsInput = {
    planId: string
    planName: string
    planFeatures: JsonNullValueInput | InputJsonValue
    planPrice: number
    planDuration: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutSubscriptionsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
  }

  export type BusinessCreateWithoutSubscriptionsInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutBusinessesInput
    UserGuest?: UserGuestCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutSubscriptionsInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutSubscriptionsInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutSubscriptionsInput, BusinessUncheckedCreateWithoutSubscriptionsInput>
  }

  export type UserUpsertWithoutSubscriptionsInput = {
    update: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UserUpdateWithoutSubscriptionsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUpdateManyWithoutUserNestedInput
    businesses?: BusinessUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUncheckedUpdateManyWithoutUserNestedInput
    businesses?: BusinessUncheckedUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type PlanUpsertWithoutSubscriptionsInput = {
    update: XOR<PlanUpdateWithoutSubscriptionsInput, PlanUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutSubscriptionsInput, PlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type PlanUpdateWithoutSubscriptionsInput = {
    planId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    planFeatures?: JsonNullValueInput | InputJsonValue
    planPrice?: FloatFieldUpdateOperationsInput | number
    planDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateWithoutSubscriptionsInput = {
    planId?: StringFieldUpdateOperationsInput | string
    planName?: StringFieldUpdateOperationsInput | string
    planFeatures?: JsonNullValueInput | InputJsonValue
    planPrice?: FloatFieldUpdateOperationsInput | number
    planDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUpsertWithoutSubscriptionsInput = {
    update: XOR<BusinessUpdateWithoutSubscriptionsInput, BusinessUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<BusinessCreateWithoutSubscriptionsInput, BusinessUncheckedCreateWithoutSubscriptionsInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutSubscriptionsInput, BusinessUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type BusinessUpdateWithoutSubscriptionsInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutBusinessesNestedInput
    UserGuest?: UserGuestUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutSubscriptionsInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type TicketDetailCreateWithoutTicketInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTicketDetailsInput
  }

  export type TicketDetailUncheckedCreateWithoutTicketInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    createdByUserId: string
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketDetailCreateOrConnectWithoutTicketInput = {
    where: TicketDetailWhereUniqueInput
    create: XOR<TicketDetailCreateWithoutTicketInput, TicketDetailUncheckedCreateWithoutTicketInput>
  }

  export type TicketDetailCreateManyTicketInputEnvelope = {
    data: TicketDetailCreateManyTicketInput | TicketDetailCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTicketsInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestCreateNestedManyWithoutUserInput
    businesses?: BusinessCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutTicketsInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutUserInput
    businesses?: BusinessUncheckedCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    ticketDetails?: TicketDetailUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
  }

  export type TicketDetailUpsertWithWhereUniqueWithoutTicketInput = {
    where: TicketDetailWhereUniqueInput
    update: XOR<TicketDetailUpdateWithoutTicketInput, TicketDetailUncheckedUpdateWithoutTicketInput>
    create: XOR<TicketDetailCreateWithoutTicketInput, TicketDetailUncheckedCreateWithoutTicketInput>
  }

  export type TicketDetailUpdateWithWhereUniqueWithoutTicketInput = {
    where: TicketDetailWhereUniqueInput
    data: XOR<TicketDetailUpdateWithoutTicketInput, TicketDetailUncheckedUpdateWithoutTicketInput>
  }

  export type TicketDetailUpdateManyWithWhereWithoutTicketInput = {
    where: TicketDetailScalarWhereInput
    data: XOR<TicketDetailUpdateManyMutationInput, TicketDetailUncheckedUpdateManyWithoutTicketInput>
  }

  export type UserUpsertWithoutTicketsInput = {
    update: XOR<UserUpdateWithoutTicketsInput, UserUncheckedUpdateWithoutTicketsInput>
    create: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsInput, UserUncheckedUpdateWithoutTicketsInput>
  }

  export type UserUpdateWithoutTicketsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUpdateManyWithoutUserNestedInput
    businesses?: BusinessUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUncheckedUpdateManyWithoutUserNestedInput
    businesses?: BusinessUncheckedUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutTicketDetailsInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestCreateNestedManyWithoutUserInput
    businesses?: BusinessCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    tickets?: TicketCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutTicketDetailsInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userConfirmEmail?: boolean
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutUserInput
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutUserInput
    businesses?: BusinessUncheckedCreateNestedManyWithoutCreatedByInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutTicketDetailsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketDetailsInput, UserUncheckedCreateWithoutTicketDetailsInput>
  }

  export type TicketCreateWithoutTicketDetailsInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateWithoutTicketDetailsInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateOrConnectWithoutTicketDetailsInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutTicketDetailsInput, TicketUncheckedCreateWithoutTicketDetailsInput>
  }

  export type UserUpsertWithoutTicketDetailsInput = {
    update: XOR<UserUpdateWithoutTicketDetailsInput, UserUncheckedUpdateWithoutTicketDetailsInput>
    create: XOR<UserCreateWithoutTicketDetailsInput, UserUncheckedCreateWithoutTicketDetailsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketDetailsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketDetailsInput, UserUncheckedUpdateWithoutTicketDetailsInput>
  }

  export type UserUpdateWithoutTicketDetailsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUpdateManyWithoutUserNestedInput
    businesses?: BusinessUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketDetailsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userConfirmEmail?: BoolFieldUpdateOperationsInput | boolean
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput
    UserGuest?: UserGuestUncheckedUpdateManyWithoutUserNestedInput
    businesses?: BusinessUncheckedUpdateManyWithoutCreatedByNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TicketUpsertWithoutTicketDetailsInput = {
    update: XOR<TicketUpdateWithoutTicketDetailsInput, TicketUncheckedUpdateWithoutTicketDetailsInput>
    create: XOR<TicketCreateWithoutTicketDetailsInput, TicketUncheckedCreateWithoutTicketDetailsInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutTicketDetailsInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutTicketDetailsInput, TicketUncheckedUpdateWithoutTicketDetailsInput>
  }

  export type TicketUpdateWithoutTicketDetailsInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutTicketDetailsInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBusinessCreateManyUserInput = {
    userBusinessBusinessId: string
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGuestCreateManyUserInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestBusinessId: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessCreateManyCreatedByInput = {
    businessId: string
    businessName: string
    businessType: string
    businessDocumentType: string
    businessDocumentNumber: string
    businessEmail: string
    businessPhoneNumber: string
    businessCodePhoneNumber: string
    businessCountry: string
    businessCodeWhatsappNumber?: string | null
    businessWhatsappNumber?: string | null
    businessConnectionDB?: string | null
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateManyCreatedByInput = {
    subscriptionId: string
    subscriptionBusinessId: string
    subscriptionPlanId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyCreatedByInput = {
    ticketId?: string
    ticketNumber?: string | null
    ticketSubject?: string | null
    ticketType: $Enums.TicketType
    ticketStatus: $Enums.TicketStatus
    ticketAssociatedTo?: TicketCreateticketAssociatedToInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketDetailCreateManyCreatedByInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketId: string
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBusinessUpdateWithoutUserInput = {
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Business?: BusinessUpdateOneRequiredWithoutUserBusinessNestedInput
  }

  export type UserBusinessUncheckedUpdateWithoutUserInput = {
    userBusinessBusinessId?: StringFieldUpdateOperationsInput | string
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBusinessUncheckedUpdateManyWithoutUserInput = {
    userBusinessBusinessId?: StringFieldUpdateOperationsInput | string
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGuestUpdateWithoutUserInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Business?: BusinessUpdateOneRequiredWithoutUserGuestNestedInput
  }

  export type UserGuestUncheckedUpdateWithoutUserInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestBusinessId?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGuestUncheckedUpdateManyWithoutUserInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestBusinessId?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUpdateWithoutCreatedByInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutCreatedByInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateManyWithoutCreatedByInput = {
    businessId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    businessDocumentType?: StringFieldUpdateOperationsInput | string
    businessDocumentNumber?: StringFieldUpdateOperationsInput | string
    businessEmail?: StringFieldUpdateOperationsInput | string
    businessPhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    businessCountry?: StringFieldUpdateOperationsInput | string
    businessCodeWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessWhatsappNumber?: NullableStringFieldUpdateOperationsInput | string | null
    businessConnectionDB?: NullableStringFieldUpdateOperationsInput | string | null
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    businessProcess?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutCreatedByInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    business?: BusinessUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutCreatedByInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionBusinessId?: StringFieldUpdateOperationsInput | string
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutCreatedByInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionBusinessId?: StringFieldUpdateOperationsInput | string
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutCreatedByInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketDetails?: TicketDetailUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutCreatedByInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketDetails?: TicketDetailUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutCreatedByInput = {
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketSubject?: NullableStringFieldUpdateOperationsInput | string | null
    ticketType?: EnumTicketTypeFieldUpdateOperationsInput | $Enums.TicketType
    ticketStatus?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    ticketAssociatedTo?: TicketUpdateticketAssociatedToInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketDetailUpdateWithoutCreatedByInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Ticket?: TicketUpdateOneRequiredWithoutTicketDetailsNestedInput
  }

  export type TicketDetailUncheckedUpdateWithoutCreatedByInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketDetailUncheckedUpdateManyWithoutCreatedByInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGuestCreateManyBusinessInput = {
    userGuestId: string
    userGuestEmail: string
    userGuestUserId: string
    userGuestRole: $Enums.Role
    userGuestStatus: $Enums.UserGuestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBusinessCreateManyBusinessInput = {
    userBusinessUserId: string
    userBusinessRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateManyBusinessInput = {
    subscriptionId: string
    subscriptionPlanId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGuestUpdateWithoutBusinessInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutUserGuestNestedInput
  }

  export type UserGuestUncheckedUpdateWithoutBusinessInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestUserId?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGuestUncheckedUpdateManyWithoutBusinessInput = {
    userGuestId?: StringFieldUpdateOperationsInput | string
    userGuestEmail?: StringFieldUpdateOperationsInput | string
    userGuestUserId?: StringFieldUpdateOperationsInput | string
    userGuestRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    userGuestStatus?: EnumUserGuestStatusFieldUpdateOperationsInput | $Enums.UserGuestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBusinessUpdateWithoutBusinessInput = {
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutUserBusinessNestedInput
  }

  export type UserBusinessUncheckedUpdateWithoutBusinessInput = {
    userBusinessUserId?: StringFieldUpdateOperationsInput | string
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBusinessUncheckedUpdateManyWithoutBusinessInput = {
    userBusinessUserId?: StringFieldUpdateOperationsInput | string
    userBusinessRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutBusinessInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutBusinessInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutBusinessInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionPlanId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyPlanInput = {
    subscriptionId: string
    subscriptionBusinessId: string
    subscriptionStartDate: Date | string
    subscriptionDuration: number
    subscriptionEndDate: Date | string
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionAmount: number
    subscriptionPaymentMethod: string
    subscriptionPlanFeatures: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateWithoutPlanInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
    business?: BusinessUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutPlanInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionBusinessId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutPlanInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    subscriptionBusinessId?: StringFieldUpdateOperationsInput | string
    subscriptionStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionDuration?: IntFieldUpdateOperationsInput | number
    subscriptionEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionPaymentMethod?: StringFieldUpdateOperationsInput | string
    subscriptionPlanFeatures?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketDetailCreateManyTicketInput = {
    ticketDetailId?: string
    ticketDetailNumber?: string | null
    ticketDetailContent: string
    ticketDetailImage?: TicketDetailCreateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailCreateticketAssociatedToInput | string[]
    createdByUserId: string
    ticketDetailOrigin: $Enums.TicketDetailOrigin
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketDetailUpdateWithoutTicketInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTicketDetailsNestedInput
  }

  export type TicketDetailUncheckedUpdateWithoutTicketInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketDetailUncheckedUpdateManyWithoutTicketInput = {
    ticketDetailId?: StringFieldUpdateOperationsInput | string
    ticketDetailNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ticketDetailContent?: StringFieldUpdateOperationsInput | string
    ticketDetailImage?: TicketDetailUpdateticketDetailImageInput | string[]
    ticketAssociatedTo?: TicketDetailUpdateticketAssociatedToInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    ticketDetailOrigin?: EnumTicketDetailOriginFieldUpdateOperationsInput | $Enums.TicketDetailOrigin
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}