
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

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type BusinessStatus = $Enums.BusinessStatus

export const BusinessStatus: typeof $Enums.BusinessStatus

export type BusinessEntity = $Enums.BusinessEntity

export const BusinessEntity: typeof $Enums.BusinessEntity

export type UserGuestStatus = $Enums.UserGuestStatus

export const UserGuestStatus: typeof $Enums.UserGuestStatus

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
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    UserGuest: 'UserGuest'
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
      modelProps: "user" | "business" | "userBusiness" | "userGuest"
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
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserBusiness?: boolean | UserCountOutputTypeCountUserBusinessArgs
    UserGuest?: boolean | UserCountOutputTypeCountUserGuestArgs
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
   * Count Type BusinessCountOutputType
   */

  export type BusinessCountOutputType = {
    UserGuest: number
    UserBusiness: number
  }

  export type BusinessCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserGuest?: boolean | BusinessCountOutputTypeCountUserGuestArgs
    UserBusiness?: boolean | BusinessCountOutputTypeCountUserBusinessArgs
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
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
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
    userPassword?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "userFirstName" | "userLastName" | "userEmail" | "userPassword" | "userLastConnection" | "userCodePhoneNumber" | "userPhoneNumber" | "userDocumentType" | "userDocumentNumber" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserBusiness?: boolean | User$UserBusinessArgs<ExtArgs>
    UserGuest?: boolean | User$UserGuestArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      UserBusiness: Prisma.$UserBusinessPayload<ExtArgs>[]
      UserGuest: Prisma.$UserGuestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      userFirstName: string
      userLastName: string
      userEmail: string
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
    businessEntity: $Enums.BusinessEntity | null
    businessStatus: $Enums.BusinessStatus | null
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
    businessEntity: $Enums.BusinessEntity | null
    businessStatus: $Enums.BusinessStatus | null
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
    businessEntity: number
    businessStatus: number
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
    businessEntity?: true
    businessStatus?: true
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
    businessEntity?: true
    businessStatus?: true
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
    businessEntity?: true
    businessStatus?: true
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
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
    businessEntity?: boolean
    businessStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    UserGuest?: boolean | Business$UserGuestArgs<ExtArgs>
    UserBusiness?: boolean | Business$UserBusinessArgs<ExtArgs>
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
    businessEntity?: boolean
    businessStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
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
    businessEntity?: boolean
    businessStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
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
    businessEntity?: boolean
    businessStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"businessId" | "businessName" | "businessType" | "businessDocumentType" | "businessDocumentNumber" | "businessEmail" | "businessPhoneNumber" | "businessCodePhoneNumber" | "businessCountry" | "businessCodeWhatsappNumber" | "businessWhatsappNumber" | "businessEntity" | "businessStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["business"]>
  export type BusinessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserGuest?: boolean | Business$UserGuestArgs<ExtArgs>
    UserBusiness?: boolean | Business$UserBusinessArgs<ExtArgs>
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BusinessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BusinessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BusinessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Business"
    objects: {
      UserGuest: Prisma.$UserGuestPayload<ExtArgs>[]
      UserBusiness: Prisma.$UserBusinessPayload<ExtArgs>[]
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
      businessEntity: $Enums.BusinessEntity
      businessStatus: $Enums.BusinessStatus
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
    UserGuest<T extends Business$UserGuestArgs<ExtArgs> = {}>(args?: Subset<T, Business$UserGuestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    UserBusiness<T extends Business$UserBusinessArgs<ExtArgs> = {}>(args?: Subset<T, Business$UserBusinessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly businessEntity: FieldRef<"Business", 'BusinessEntity'>
    readonly businessStatus: FieldRef<"Business", 'BusinessStatus'>
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
    businessEntity: 'businessEntity',
    businessStatus: 'businessStatus',
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


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
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
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
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
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    userEmail?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userFirstName?: StringFilter<"User"> | string
    userLastName?: StringFilter<"User"> | string
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
  }, "userId" | "userEmail">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
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
    businessEntity?: EnumBusinessEntityFilter<"Business"> | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFilter<"Business"> | $Enums.BusinessStatus
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    UserGuest?: UserGuestListRelationFilter
    UserBusiness?: UserBusinessListRelationFilter
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
    businessEntity?: SortOrder
    businessStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    UserGuest?: UserGuestOrderByRelationAggregateInput
    UserBusiness?: UserBusinessOrderByRelationAggregateInput
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
    businessEntity?: EnumBusinessEntityFilter<"Business"> | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFilter<"Business"> | $Enums.BusinessStatus
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    UserGuest?: UserGuestListRelationFilter
    UserBusiness?: UserBusinessListRelationFilter
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
    businessEntity?: SortOrder
    businessStatus?: SortOrder
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
    businessEntity?: EnumBusinessEntityWithAggregatesFilter<"Business"> | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusWithAggregatesFilter<"Business"> | $Enums.BusinessStatus
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

  export type UserCreateInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
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
  }

  export type UserUncheckedCreateInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
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
  }

  export type UserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
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
  }

  export type UserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
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
  }

  export type UserCreateManyInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessCreateNestedManyWithoutBusinessInput
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutBusinessInput
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUpdateManyWithoutBusinessNestedInput
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutBusinessNestedInput
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
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

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
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
    businessEntity?: SortOrder
    businessStatus?: SortOrder
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
    businessEntity?: SortOrder
    businessStatus?: SortOrder
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
    businessEntity?: SortOrder
    businessStatus?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
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

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumBusinessEntityFieldUpdateOperationsInput = {
    set?: $Enums.BusinessEntity
  }

  export type EnumBusinessStatusFieldUpdateOperationsInput = {
    set?: $Enums.BusinessStatus
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

  export type UserCreateWithoutUserBusinessInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserBusinessInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutUserInput
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestCreateNestedManyWithoutBusinessInput
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    UserGuest?: UserGuestUncheckedCreateNestedManyWithoutBusinessInput
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
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserBusinessInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutUserNestedInput
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUpdateManyWithoutBusinessNestedInput
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserGuest?: UserGuestUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type UserCreateWithoutUserGuestInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserGuestInput = {
    userId?: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userPassword: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutUserInput
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessCreateNestedManyWithoutBusinessInput
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
    businessEntity: $Enums.BusinessEntity
    businessStatus: $Enums.BusinessStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    UserBusiness?: UserBusinessUncheckedCreateNestedManyWithoutBusinessInput
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
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserGuestInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userPassword?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutUserNestedInput
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUpdateManyWithoutBusinessNestedInput
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
    businessEntity?: EnumBusinessEntityFieldUpdateOperationsInput | $Enums.BusinessEntity
    businessStatus?: EnumBusinessStatusFieldUpdateOperationsInput | $Enums.BusinessStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    UserBusiness?: UserBusinessUncheckedUpdateManyWithoutBusinessNestedInput
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