
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
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model SaleDetail
 * 
 */
export type SaleDetail = $Result.DefaultSelection<Prisma.$SaleDetailPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ProductStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED'
};

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]


export const ProductUnit: {
  UNIT: 'UNIT',
  KILOGRAM: 'KILOGRAM',
  GRAM: 'GRAM',
  LITER: 'LITER',
  MILLILITER: 'MILLILITER',
  METER: 'METER',
  CENTIMETER: 'CENTIMETER'
};

export type ProductUnit = (typeof ProductUnit)[keyof typeof ProductUnit]


export const ServiceUnit: {
  UNIT: 'UNIT',
  MONTH: 'MONTH',
  DAY: 'DAY',
  HOUR: 'HOUR',
  MINUTE: 'MINUTE'
};

export type ServiceUnit = (typeof ServiceUnit)[keyof typeof ServiceUnit]


export const UsageContext: {
  PRODUCTS: 'PRODUCTS',
  SERVICES: 'SERVICES',
  BOTH: 'BOTH'
};

export type UsageContext = (typeof UsageContext)[keyof typeof UsageContext]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ProductStatus = $Enums.ProductStatus

export const ProductStatus: typeof $Enums.ProductStatus

export type ProductUnit = $Enums.ProductUnit

export const ProductUnit: typeof $Enums.ProductUnit

export type ServiceUnit = $Enums.ServiceUnit

export const ServiceUnit: typeof $Enums.ServiceUnit

export type UsageContext = $Enums.UsageContext

export const UsageContext: typeof $Enums.UsageContext

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
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.saleDetail`: Exposes CRUD operations for the **SaleDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SaleDetails
    * const saleDetails = await prisma.saleDetail.findMany()
    * ```
    */
  get saleDetail(): Prisma.SaleDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
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
    Customer: 'Customer',
    Product: 'Product',
    Service: 'Service',
    Category: 'Category',
    Sale: 'Sale',
    SaleDetail: 'SaleDetail',
    Payment: 'Payment'
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
      modelProps: "user" | "customer" | "product" | "service" | "category" | "sale" | "saleDetail" | "payment"
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
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SaleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      SaleDetail: {
        payload: Prisma.$SaleDetailPayload<ExtArgs>
        fields: Prisma.SaleDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          findFirst: {
            args: Prisma.SaleDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          findMany: {
            args: Prisma.SaleDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>[]
          }
          create: {
            args: Prisma.SaleDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          createMany: {
            args: Prisma.SaleDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleDetailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>[]
          }
          delete: {
            args: Prisma.SaleDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          update: {
            args: Prisma.SaleDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          deleteMany: {
            args: Prisma.SaleDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SaleDetailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>[]
          }
          upsert: {
            args: Prisma.SaleDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDetailPayload>
          }
          aggregate: {
            args: Prisma.SaleDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaleDetail>
          }
          groupBy: {
            args: Prisma.SaleDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleDetailCountArgs<ExtArgs>
            result: $Utils.Optional<SaleDetailCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
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
    customer?: CustomerOmit
    product?: ProductOmit
    service?: ServiceOmit
    category?: CategoryOmit
    sale?: SaleOmit
    saleDetail?: SaleDetailOmit
    payment?: PaymentOmit
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
    customers: number
    Product: number
    Service: number
    Category: number
    Sale: number
    Payment: number
    SaleDetail: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | UserCountOutputTypeCountCustomersArgs
    Product?: boolean | UserCountOutputTypeCountProductArgs
    Service?: boolean | UserCountOutputTypeCountServiceArgs
    Category?: boolean | UserCountOutputTypeCountCategoryArgs
    Sale?: boolean | UserCountOutputTypeCountSaleArgs
    Payment?: boolean | UserCountOutputTypeCountPaymentArgs
    SaleDetail?: boolean | UserCountOutputTypeCountSaleDetailArgs
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
  export type UserCountOutputTypeCountCustomersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSaleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    Sale: number
    SaleDetail: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Sale?: boolean | CustomerCountOutputTypeCountSaleArgs
    SaleDetail?: boolean | CustomerCountOutputTypeCountSaleDetailArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountSaleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountSaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    SaleDetail: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SaleDetail?: boolean | ProductCountOutputTypeCountSaleDetailArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    SaleDetail: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SaleDetail?: boolean | ServiceCountOutputTypeCountSaleDetailArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountSaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
    services: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
    services?: boolean | CategoryCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type SaleCountOutputType
   */

  export type SaleCountOutputType = {
    SaleDetail: number
    Payment: number
  }

  export type SaleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SaleDetail?: boolean | SaleCountOutputTypeCountSaleDetailArgs
    Payment?: boolean | SaleCountOutputTypeCountPaymentArgs
  }

  // Custom InputTypes
  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleCountOutputType
     */
    select?: SaleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountSaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountPaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
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
    userLastConnection: Date | null
    userCodePhoneNumber: string | null
    userPhoneNumber: string | null
    userDocumentType: string | null
    userDocumentNumber: string | null
    userRole: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    userId: string | null
    userFirstName: string | null
    userLastName: string | null
    userEmail: string | null
    userLastConnection: Date | null
    userCodePhoneNumber: string | null
    userPhoneNumber: string | null
    userDocumentType: string | null
    userDocumentNumber: string | null
    userRole: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    userFirstName: number
    userLastName: number
    userEmail: number
    userLastConnection: number
    userCodePhoneNumber: number
    userPhoneNumber: number
    userDocumentType: number
    userDocumentNumber: number
    userRole: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    userId?: true
    userFirstName?: true
    userLastName?: true
    userEmail?: true
    userLastConnection?: true
    userCodePhoneNumber?: true
    userPhoneNumber?: true
    userDocumentType?: true
    userDocumentNumber?: true
    userRole?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    userFirstName?: true
    userLastName?: true
    userEmail?: true
    userLastConnection?: true
    userCodePhoneNumber?: true
    userPhoneNumber?: true
    userDocumentType?: true
    userDocumentNumber?: true
    userRole?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    userFirstName?: true
    userLastName?: true
    userEmail?: true
    userLastConnection?: true
    userCodePhoneNumber?: true
    userPhoneNumber?: true
    userDocumentType?: true
    userDocumentNumber?: true
    userRole?: true
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
    userLastConnection: Date | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
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
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    userRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customers?: boolean | User$customersArgs<ExtArgs>
    Product?: boolean | User$ProductArgs<ExtArgs>
    Service?: boolean | User$ServiceArgs<ExtArgs>
    Category?: boolean | User$CategoryArgs<ExtArgs>
    Sale?: boolean | User$SaleArgs<ExtArgs>
    Payment?: boolean | User$PaymentArgs<ExtArgs>
    SaleDetail?: boolean | User$SaleDetailArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    userRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    userRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    userId?: boolean
    userFirstName?: boolean
    userLastName?: boolean
    userEmail?: boolean
    userLastConnection?: boolean
    userCodePhoneNumber?: boolean
    userPhoneNumber?: boolean
    userDocumentType?: boolean
    userDocumentNumber?: boolean
    userRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "userFirstName" | "userLastName" | "userEmail" | "userLastConnection" | "userCodePhoneNumber" | "userPhoneNumber" | "userDocumentType" | "userDocumentNumber" | "userRole" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | User$customersArgs<ExtArgs>
    Product?: boolean | User$ProductArgs<ExtArgs>
    Service?: boolean | User$ServiceArgs<ExtArgs>
    Category?: boolean | User$CategoryArgs<ExtArgs>
    Sale?: boolean | User$SaleArgs<ExtArgs>
    Payment?: boolean | User$PaymentArgs<ExtArgs>
    SaleDetail?: boolean | User$SaleDetailArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      customers: Prisma.$CustomerPayload<ExtArgs>[]
      Product: Prisma.$ProductPayload<ExtArgs>[]
      Service: Prisma.$ServicePayload<ExtArgs>[]
      Category: Prisma.$CategoryPayload<ExtArgs>[]
      Sale: Prisma.$SalePayload<ExtArgs>[]
      Payment: Prisma.$PaymentPayload<ExtArgs>[]
      SaleDetail: Prisma.$SaleDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      userFirstName: string
      userLastName: string
      userEmail: string
      userLastConnection: Date | null
      userCodePhoneNumber: string
      userPhoneNumber: string
      userDocumentType: string
      userDocumentNumber: string
      userRole: $Enums.Role
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
    customers<T extends User$customersArgs<ExtArgs> = {}>(args?: Subset<T, User$customersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Product<T extends User$ProductArgs<ExtArgs> = {}>(args?: Subset<T, User$ProductArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Service<T extends User$ServiceArgs<ExtArgs> = {}>(args?: Subset<T, User$ServiceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Category<T extends User$CategoryArgs<ExtArgs> = {}>(args?: Subset<T, User$CategoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Sale<T extends User$SaleArgs<ExtArgs> = {}>(args?: Subset<T, User$SaleArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Payment<T extends User$PaymentArgs<ExtArgs> = {}>(args?: Subset<T, User$PaymentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    SaleDetail<T extends User$SaleDetailArgs<ExtArgs> = {}>(args?: Subset<T, User$SaleDetailArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly userLastConnection: FieldRef<"User", 'DateTime'>
    readonly userCodePhoneNumber: FieldRef<"User", 'String'>
    readonly userPhoneNumber: FieldRef<"User", 'String'>
    readonly userDocumentType: FieldRef<"User", 'String'>
    readonly userDocumentNumber: FieldRef<"User", 'String'>
    readonly userRole: FieldRef<"User", 'Role'>
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
   * User.customers
   */
  export type User$customersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    cursor?: CustomerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * User.Product
   */
  export type User$ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * User.Service
   */
  export type User$ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * User.Category
   */
  export type User$CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * User.Sale
   */
  export type User$SaleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * User.Payment
   */
  export type User$PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.SaleDetail
   */
  export type User$SaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    cursor?: SaleDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
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
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    customerId: string | null
    customerFirstName: string | null
    customerLastName: string | null
    customerEmail: string | null
    customerCodePhoneNumber: string | null
    customerPhoneNumber: string | null
    customerDocumentType: string | null
    customerDocumentNumber: string | null
    customerComment: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdByUserId: string | null
  }

  export type CustomerMaxAggregateOutputType = {
    customerId: string | null
    customerFirstName: string | null
    customerLastName: string | null
    customerEmail: string | null
    customerCodePhoneNumber: string | null
    customerPhoneNumber: string | null
    customerDocumentType: string | null
    customerDocumentNumber: string | null
    customerComment: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdByUserId: string | null
  }

  export type CustomerCountAggregateOutputType = {
    customerId: number
    customerFirstName: number
    customerLastName: number
    customerEmail: number
    customerCodePhoneNumber: number
    customerPhoneNumber: number
    customerDocumentType: number
    customerDocumentNumber: number
    customerComment: number
    createdAt: number
    updatedAt: number
    createdByUserId: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    customerId?: true
    customerFirstName?: true
    customerLastName?: true
    customerEmail?: true
    customerCodePhoneNumber?: true
    customerPhoneNumber?: true
    customerDocumentType?: true
    customerDocumentNumber?: true
    customerComment?: true
    createdAt?: true
    updatedAt?: true
    createdByUserId?: true
  }

  export type CustomerMaxAggregateInputType = {
    customerId?: true
    customerFirstName?: true
    customerLastName?: true
    customerEmail?: true
    customerCodePhoneNumber?: true
    customerPhoneNumber?: true
    customerDocumentType?: true
    customerDocumentNumber?: true
    customerComment?: true
    createdAt?: true
    updatedAt?: true
    createdByUserId?: true
  }

  export type CustomerCountAggregateInputType = {
    customerId?: true
    customerFirstName?: true
    customerLastName?: true
    customerEmail?: true
    customerCodePhoneNumber?: true
    customerPhoneNumber?: true
    customerDocumentType?: true
    customerDocumentNumber?: true
    customerComment?: true
    createdAt?: true
    updatedAt?: true
    createdByUserId?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    customerId: string
    customerFirstName: string
    customerLastName: string
    customerEmail: string | null
    customerCodePhoneNumber: string | null
    customerPhoneNumber: string | null
    customerDocumentType: string | null
    customerDocumentNumber: string | null
    customerComment: string | null
    createdAt: Date
    updatedAt: Date
    createdByUserId: string
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    customerId?: boolean
    customerFirstName?: boolean
    customerLastName?: boolean
    customerEmail?: boolean
    customerCodePhoneNumber?: boolean
    customerPhoneNumber?: boolean
    customerDocumentType?: boolean
    customerDocumentNumber?: boolean
    customerComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
    createdBy?: boolean | Customer$createdByArgs<ExtArgs>
    Sale?: boolean | Customer$SaleArgs<ExtArgs>
    SaleDetail?: boolean | Customer$SaleDetailArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    customerId?: boolean
    customerFirstName?: boolean
    customerLastName?: boolean
    customerEmail?: boolean
    customerCodePhoneNumber?: boolean
    customerPhoneNumber?: boolean
    customerDocumentType?: boolean
    customerDocumentNumber?: boolean
    customerComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
    createdBy?: boolean | Customer$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    customerId?: boolean
    customerFirstName?: boolean
    customerLastName?: boolean
    customerEmail?: boolean
    customerCodePhoneNumber?: boolean
    customerPhoneNumber?: boolean
    customerDocumentType?: boolean
    customerDocumentNumber?: boolean
    customerComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
    createdBy?: boolean | Customer$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    customerId?: boolean
    customerFirstName?: boolean
    customerLastName?: boolean
    customerEmail?: boolean
    customerCodePhoneNumber?: boolean
    customerPhoneNumber?: boolean
    customerDocumentType?: boolean
    customerDocumentNumber?: boolean
    customerComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"customerId" | "customerFirstName" | "customerLastName" | "customerEmail" | "customerCodePhoneNumber" | "customerPhoneNumber" | "customerDocumentType" | "customerDocumentNumber" | "customerComment" | "createdAt" | "updatedAt" | "createdByUserId", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Customer$createdByArgs<ExtArgs>
    Sale?: boolean | Customer$SaleArgs<ExtArgs>
    SaleDetail?: boolean | Customer$SaleDetailArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Customer$createdByArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Customer$createdByArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      Sale: Prisma.$SalePayload<ExtArgs>[]
      SaleDetail: Prisma.$SaleDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      customerId: string
      customerFirstName: string
      customerLastName: string
      customerEmail: string | null
      customerCodePhoneNumber: string | null
      customerPhoneNumber: string | null
      customerDocumentType: string | null
      customerDocumentNumber: string | null
      customerComment: string | null
      createdAt: Date
      updatedAt: Date
      createdByUserId: string
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `customerId`
     * const customerWithCustomerIdOnly = await prisma.customer.findMany({ select: { customerId: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `customerId`
     * const customerWithCustomerIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { customerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `customerId`
     * const customerWithCustomerIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { customerId: true },
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
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Customer$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Customer$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Sale<T extends Customer$SaleArgs<ExtArgs> = {}>(args?: Subset<T, Customer$SaleArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    SaleDetail<T extends Customer$SaleDetailArgs<ExtArgs> = {}>(args?: Subset<T, Customer$SaleDetailArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly customerId: FieldRef<"Customer", 'String'>
    readonly customerFirstName: FieldRef<"Customer", 'String'>
    readonly customerLastName: FieldRef<"Customer", 'String'>
    readonly customerEmail: FieldRef<"Customer", 'String'>
    readonly customerCodePhoneNumber: FieldRef<"Customer", 'String'>
    readonly customerPhoneNumber: FieldRef<"Customer", 'String'>
    readonly customerDocumentType: FieldRef<"Customer", 'String'>
    readonly customerDocumentNumber: FieldRef<"Customer", 'String'>
    readonly customerComment: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
    readonly createdByUserId: FieldRef<"Customer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.createdBy
   */
  export type Customer$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Customer.Sale
   */
  export type Customer$SaleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Customer.SaleDetail
   */
  export type Customer$SaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    cursor?: SaleDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    productPrice: number | null
  }

  export type ProductSumAggregateOutputType = {
    productPrice: number | null
  }

  export type ProductMinAggregateOutputType = {
    productId: string | null
    productName: string | null
    productDescription: string | null
    productSKU: string | null
    categoryId: string | null
    productPrice: number | null
    productPriceFixed: boolean | null
    productStatus: $Enums.ProductStatus | null
    productUnit: $Enums.ProductUnit | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    productId: string | null
    productName: string | null
    productDescription: string | null
    productSKU: string | null
    categoryId: string | null
    productPrice: number | null
    productPriceFixed: boolean | null
    productStatus: $Enums.ProductStatus | null
    productUnit: $Enums.ProductUnit | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    productId: number
    productName: number
    productDescription: number
    productSKU: number
    categoryId: number
    productPrice: number
    productPriceFixed: number
    productStatus: number
    productUnit: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    productPrice?: true
  }

  export type ProductSumAggregateInputType = {
    productPrice?: true
  }

  export type ProductMinAggregateInputType = {
    productId?: true
    productName?: true
    productDescription?: true
    productSKU?: true
    categoryId?: true
    productPrice?: true
    productPriceFixed?: true
    productStatus?: true
    productUnit?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    productId?: true
    productName?: true
    productDescription?: true
    productSKU?: true
    categoryId?: true
    productPrice?: true
    productPriceFixed?: true
    productStatus?: true
    productUnit?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    productId?: true
    productName?: true
    productDescription?: true
    productSKU?: true
    categoryId?: true
    productPrice?: true
    productPriceFixed?: true
    productStatus?: true
    productUnit?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    productId: string
    productName: string
    productDescription: string | null
    productSKU: string
    categoryId: string
    productPrice: number
    productPriceFixed: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    productName?: boolean
    productDescription?: boolean
    productSKU?: boolean
    categoryId?: boolean
    productPrice?: boolean
    productPriceFixed?: boolean
    productStatus?: boolean
    productUnit?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    SaleDetail?: boolean | Product$SaleDetailArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    productName?: boolean
    productDescription?: boolean
    productSKU?: boolean
    categoryId?: boolean
    productPrice?: boolean
    productPriceFixed?: boolean
    productStatus?: boolean
    productUnit?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    productName?: boolean
    productDescription?: boolean
    productSKU?: boolean
    categoryId?: boolean
    productPrice?: boolean
    productPriceFixed?: boolean
    productStatus?: boolean
    productUnit?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    productId?: boolean
    productName?: boolean
    productDescription?: boolean
    productSKU?: boolean
    categoryId?: boolean
    productPrice?: boolean
    productPriceFixed?: boolean
    productStatus?: boolean
    productUnit?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"productId" | "productName" | "productDescription" | "productSKU" | "categoryId" | "productPrice" | "productPriceFixed" | "productStatus" | "productUnit" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    SaleDetail?: boolean | Product$SaleDetailArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      SaleDetail: Prisma.$SaleDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: string
      productName: string
      productDescription: string | null
      productSKU: string
      categoryId: string
      productPrice: number
      productPriceFixed: boolean | null
      productStatus: $Enums.ProductStatus
      productUnit: $Enums.ProductUnit
      createdByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const productWithProductIdOnly = await prisma.product.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `productId`
     * const productWithProductIdOnly = await prisma.product.createManyAndReturn({
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `productId`
     * const productWithProductIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { productId: true },
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
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    SaleDetail<T extends Product$SaleDetailArgs<ExtArgs> = {}>(args?: Subset<T, Product$SaleDetailArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly productId: FieldRef<"Product", 'String'>
    readonly productName: FieldRef<"Product", 'String'>
    readonly productDescription: FieldRef<"Product", 'String'>
    readonly productSKU: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly productPrice: FieldRef<"Product", 'Int'>
    readonly productPriceFixed: FieldRef<"Product", 'Boolean'>
    readonly productStatus: FieldRef<"Product", 'ProductStatus'>
    readonly productUnit: FieldRef<"Product", 'ProductUnit'>
    readonly createdByUserId: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.SaleDetail
   */
  export type Product$SaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    cursor?: SaleDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    servicePrice: number | null
  }

  export type ServiceSumAggregateOutputType = {
    servicePrice: number | null
  }

  export type ServiceMinAggregateOutputType = {
    serviceId: string | null
    serviceName: string | null
    serviceDescription: string | null
    serviceSKU: string | null
    servicePrice: number | null
    servicePriceFixed: boolean | null
    serviceStatus: $Enums.ProductStatus | null
    serviceUnit: $Enums.ServiceUnit | null
    categoryId: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    serviceId: string | null
    serviceName: string | null
    serviceDescription: string | null
    serviceSKU: string | null
    servicePrice: number | null
    servicePriceFixed: boolean | null
    serviceStatus: $Enums.ProductStatus | null
    serviceUnit: $Enums.ServiceUnit | null
    categoryId: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    serviceId: number
    serviceName: number
    serviceDescription: number
    serviceSKU: number
    servicePrice: number
    servicePriceFixed: number
    serviceStatus: number
    serviceUnit: number
    categoryId: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    servicePrice?: true
  }

  export type ServiceSumAggregateInputType = {
    servicePrice?: true
  }

  export type ServiceMinAggregateInputType = {
    serviceId?: true
    serviceName?: true
    serviceDescription?: true
    serviceSKU?: true
    servicePrice?: true
    servicePriceFixed?: true
    serviceStatus?: true
    serviceUnit?: true
    categoryId?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    serviceId?: true
    serviceName?: true
    serviceDescription?: true
    serviceSKU?: true
    servicePrice?: true
    servicePriceFixed?: true
    serviceStatus?: true
    serviceUnit?: true
    categoryId?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    serviceId?: true
    serviceName?: true
    serviceDescription?: true
    serviceSKU?: true
    servicePrice?: true
    servicePriceFixed?: true
    serviceStatus?: true
    serviceUnit?: true
    categoryId?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    serviceId: string
    serviceName: string
    serviceDescription: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    categoryId: string
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    serviceId?: boolean
    serviceName?: boolean
    serviceDescription?: boolean
    serviceSKU?: boolean
    servicePrice?: boolean
    servicePriceFixed?: boolean
    serviceStatus?: boolean
    serviceUnit?: boolean
    categoryId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    SaleDetail?: boolean | Service$SaleDetailArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    serviceId?: boolean
    serviceName?: boolean
    serviceDescription?: boolean
    serviceSKU?: boolean
    servicePrice?: boolean
    servicePriceFixed?: boolean
    serviceStatus?: boolean
    serviceUnit?: boolean
    categoryId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    serviceId?: boolean
    serviceName?: boolean
    serviceDescription?: boolean
    serviceSKU?: boolean
    servicePrice?: boolean
    servicePriceFixed?: boolean
    serviceStatus?: boolean
    serviceUnit?: boolean
    categoryId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    serviceId?: boolean
    serviceName?: boolean
    serviceDescription?: boolean
    serviceSKU?: boolean
    servicePrice?: boolean
    servicePriceFixed?: boolean
    serviceStatus?: boolean
    serviceUnit?: boolean
    categoryId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"serviceId" | "serviceName" | "serviceDescription" | "serviceSKU" | "servicePrice" | "servicePriceFixed" | "serviceStatus" | "serviceUnit" | "categoryId" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    SaleDetail?: boolean | Service$SaleDetailArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      SaleDetail: Prisma.$SaleDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      serviceId: string
      serviceName: string
      serviceDescription: string | null
      serviceSKU: string
      servicePrice: number
      servicePriceFixed: boolean | null
      serviceStatus: $Enums.ProductStatus
      serviceUnit: $Enums.ServiceUnit
      categoryId: string
      createdByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `serviceId`
     * const serviceWithServiceIdOnly = await prisma.service.findMany({ select: { serviceId: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `serviceId`
     * const serviceWithServiceIdOnly = await prisma.service.createManyAndReturn({
     *   select: { serviceId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `serviceId`
     * const serviceWithServiceIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { serviceId: true },
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
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    SaleDetail<T extends Service$SaleDetailArgs<ExtArgs> = {}>(args?: Subset<T, Service$SaleDetailArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly serviceId: FieldRef<"Service", 'String'>
    readonly serviceName: FieldRef<"Service", 'String'>
    readonly serviceDescription: FieldRef<"Service", 'String'>
    readonly serviceSKU: FieldRef<"Service", 'String'>
    readonly servicePrice: FieldRef<"Service", 'Int'>
    readonly servicePriceFixed: FieldRef<"Service", 'Boolean'>
    readonly serviceStatus: FieldRef<"Service", 'ProductStatus'>
    readonly serviceUnit: FieldRef<"Service", 'ServiceUnit'>
    readonly categoryId: FieldRef<"Service", 'String'>
    readonly createdByUserId: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.SaleDetail
   */
  export type Service$SaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    cursor?: SaleDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    categoryId: string | null
    categoryName: string | null
    createdByUserId: string | null
    allowedFor: $Enums.UsageContext | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    categoryId: string | null
    categoryName: string | null
    createdByUserId: string | null
    allowedFor: $Enums.UsageContext | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    categoryId: number
    categoryName: number
    createdByUserId: number
    allowedFor: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    categoryId?: true
    categoryName?: true
    createdByUserId?: true
    allowedFor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    categoryId?: true
    categoryName?: true
    createdByUserId?: true
    allowedFor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    categoryId?: true
    categoryName?: true
    createdByUserId?: true
    allowedFor?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    categoryId: string
    categoryName: string
    createdByUserId: string
    allowedFor: $Enums.UsageContext
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    categoryName?: boolean
    createdByUserId?: boolean
    allowedFor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    services?: boolean | Category$servicesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    categoryName?: boolean
    createdByUserId?: boolean
    allowedFor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    categoryName?: boolean
    createdByUserId?: boolean
    allowedFor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    categoryId?: boolean
    categoryName?: boolean
    createdByUserId?: boolean
    allowedFor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"categoryId" | "categoryName" | "createdByUserId" | "allowedFor" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    services?: boolean | Category$servicesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      categoryId: string
      categoryName: string
      createdByUserId: string
      allowedFor: $Enums.UsageContext
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `categoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.findMany({ select: { categoryId: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `categoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.createManyAndReturn({
     *   select: { categoryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `categoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { categoryId: true },
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
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Category$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Category$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly categoryId: FieldRef<"Category", 'String'>
    readonly categoryName: FieldRef<"Category", 'String'>
    readonly createdByUserId: FieldRef<"Category", 'String'>
    readonly allowedFor: FieldRef<"Category", 'UsageContext'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category.services
   */
  export type Category$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    saleTotal: number | null
    saleTotalPayments: number | null
    salePendingAmount: number | null
  }

  export type SaleSumAggregateOutputType = {
    saleTotal: number | null
    saleTotalPayments: number | null
    salePendingAmount: number | null
  }

  export type SaleMinAggregateOutputType = {
    saleId: string | null
    saleCustomerId: string | null
    saleTotal: number | null
    saleTotalPayments: number | null
    salePendingAmount: number | null
    createdByUserId: string | null
    saleComment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleMaxAggregateOutputType = {
    saleId: string | null
    saleCustomerId: string | null
    saleTotal: number | null
    saleTotalPayments: number | null
    salePendingAmount: number | null
    createdByUserId: string | null
    saleComment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleCountAggregateOutputType = {
    saleId: number
    saleCustomerId: number
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: number
    saleComment: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    saleTotal?: true
    saleTotalPayments?: true
    salePendingAmount?: true
  }

  export type SaleSumAggregateInputType = {
    saleTotal?: true
    saleTotalPayments?: true
    salePendingAmount?: true
  }

  export type SaleMinAggregateInputType = {
    saleId?: true
    saleCustomerId?: true
    saleTotal?: true
    saleTotalPayments?: true
    salePendingAmount?: true
    createdByUserId?: true
    saleComment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleMaxAggregateInputType = {
    saleId?: true
    saleCustomerId?: true
    saleTotal?: true
    saleTotalPayments?: true
    salePendingAmount?: true
    createdByUserId?: true
    saleComment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleCountAggregateInputType = {
    saleId?: true
    saleCustomerId?: true
    saleTotal?: true
    saleTotalPayments?: true
    salePendingAmount?: true
    createdByUserId?: true
    saleComment?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    saleId: string
    saleCustomerId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: string
    saleComment: string | null
    createdAt: Date
    updatedAt: Date
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleId?: boolean
    saleCustomerId?: boolean
    saleTotal?: boolean
    saleTotalPayments?: boolean
    salePendingAmount?: boolean
    createdByUserId?: boolean
    saleComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    SaleDetail?: boolean | Sale$SaleDetailArgs<ExtArgs>
    Payment?: boolean | Sale$PaymentArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleId?: boolean
    saleCustomerId?: boolean
    saleTotal?: boolean
    saleTotalPayments?: boolean
    salePendingAmount?: boolean
    createdByUserId?: boolean
    saleComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleId?: boolean
    saleCustomerId?: boolean
    saleTotal?: boolean
    saleTotalPayments?: boolean
    salePendingAmount?: boolean
    createdByUserId?: boolean
    saleComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectScalar = {
    saleId?: boolean
    saleCustomerId?: boolean
    saleTotal?: boolean
    saleTotalPayments?: boolean
    salePendingAmount?: boolean
    createdByUserId?: boolean
    saleComment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SaleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"saleId" | "saleCustomerId" | "saleTotal" | "saleTotalPayments" | "salePendingAmount" | "createdByUserId" | "saleComment" | "createdAt" | "updatedAt", ExtArgs["result"]["sale"]>
  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    SaleDetail?: boolean | Sale$SaleDetailArgs<ExtArgs>
    Payment?: boolean | Sale$PaymentArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type SaleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
      SaleDetail: Prisma.$SaleDetailPayload<ExtArgs>[]
      Payment: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      saleId: string
      saleCustomerId: string
      saleTotal: number
      saleTotalPayments: number
      salePendingAmount: number
      createdByUserId: string
      saleComment: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `saleId`
     * const saleWithSaleIdOnly = await prisma.sale.findMany({ select: { saleId: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {SaleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `saleId`
     * const saleWithSaleIdOnly = await prisma.sale.createManyAndReturn({
     *   select: { saleId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales and returns the data updated in the database.
     * @param {SaleUpdateManyAndReturnArgs} args - Arguments to update many Sales.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sales and only return the `saleId`
     * const saleWithSaleIdOnly = await prisma.sale.updateManyAndReturn({
     *   select: { saleId: true },
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
    updateManyAndReturn<T extends SaleUpdateManyAndReturnArgs>(args: SelectSubset<T, SaleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
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
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    SaleDetail<T extends Sale$SaleDetailArgs<ExtArgs> = {}>(args?: Subset<T, Sale$SaleDetailArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Payment<T extends Sale$PaymentArgs<ExtArgs> = {}>(args?: Subset<T, Sale$PaymentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Sale model
   */
  interface SaleFieldRefs {
    readonly saleId: FieldRef<"Sale", 'String'>
    readonly saleCustomerId: FieldRef<"Sale", 'String'>
    readonly saleTotal: FieldRef<"Sale", 'Int'>
    readonly saleTotalPayments: FieldRef<"Sale", 'Int'>
    readonly salePendingAmount: FieldRef<"Sale", 'Int'>
    readonly createdByUserId: FieldRef<"Sale", 'String'>
    readonly saleComment: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
    readonly updatedAt: FieldRef<"Sale", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sale createManyAndReturn
   */
  export type SaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
  }

  /**
   * Sale updateManyAndReturn
   */
  export type SaleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to delete.
     */
    limit?: number
  }

  /**
   * Sale.SaleDetail
   */
  export type Sale$SaleDetailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    cursor?: SaleDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * Sale.Payment
   */
  export type Sale$PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model SaleDetail
   */

  export type AggregateSaleDetail = {
    _count: SaleDetailCountAggregateOutputType | null
    _avg: SaleDetailAvgAggregateOutputType | null
    _sum: SaleDetailSumAggregateOutputType | null
    _min: SaleDetailMinAggregateOutputType | null
    _max: SaleDetailMaxAggregateOutputType | null
  }

  export type SaleDetailAvgAggregateOutputType = {
    saleDetailQuantity: number | null
    saleDetailPrice: number | null
    saleDetailTotal: number | null
  }

  export type SaleDetailSumAggregateOutputType = {
    saleDetailQuantity: number | null
    saleDetailPrice: number | null
    saleDetailTotal: number | null
  }

  export type SaleDetailMinAggregateOutputType = {
    saleDetailId: string | null
    saleId: string | null
    saleDetailProductId: string | null
    saleDetailServiceId: string | null
    saleDetailQuantity: number | null
    saleDetailPrice: number | null
    saleDetailTotal: number | null
    saleDetailType: string | null
    createdByUserId: string | null
    saleCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleDetailMaxAggregateOutputType = {
    saleDetailId: string | null
    saleId: string | null
    saleDetailProductId: string | null
    saleDetailServiceId: string | null
    saleDetailQuantity: number | null
    saleDetailPrice: number | null
    saleDetailTotal: number | null
    saleDetailType: string | null
    createdByUserId: string | null
    saleCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleDetailCountAggregateOutputType = {
    saleDetailId: number
    saleId: number
    saleDetailProductId: number
    saleDetailServiceId: number
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: number
    createdByUserId: number
    saleCustomerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SaleDetailAvgAggregateInputType = {
    saleDetailQuantity?: true
    saleDetailPrice?: true
    saleDetailTotal?: true
  }

  export type SaleDetailSumAggregateInputType = {
    saleDetailQuantity?: true
    saleDetailPrice?: true
    saleDetailTotal?: true
  }

  export type SaleDetailMinAggregateInputType = {
    saleDetailId?: true
    saleId?: true
    saleDetailProductId?: true
    saleDetailServiceId?: true
    saleDetailQuantity?: true
    saleDetailPrice?: true
    saleDetailTotal?: true
    saleDetailType?: true
    createdByUserId?: true
    saleCustomerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleDetailMaxAggregateInputType = {
    saleDetailId?: true
    saleId?: true
    saleDetailProductId?: true
    saleDetailServiceId?: true
    saleDetailQuantity?: true
    saleDetailPrice?: true
    saleDetailTotal?: true
    saleDetailType?: true
    createdByUserId?: true
    saleCustomerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleDetailCountAggregateInputType = {
    saleDetailId?: true
    saleId?: true
    saleDetailProductId?: true
    saleDetailServiceId?: true
    saleDetailQuantity?: true
    saleDetailPrice?: true
    saleDetailTotal?: true
    saleDetailType?: true
    createdByUserId?: true
    saleCustomerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SaleDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleDetail to aggregate.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SaleDetails
    **/
    _count?: true | SaleDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleDetailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleDetailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleDetailMaxAggregateInputType
  }

  export type GetSaleDetailAggregateType<T extends SaleDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateSaleDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaleDetail[P]>
      : GetScalarType<T[P], AggregateSaleDetail[P]>
  }




  export type SaleDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDetailWhereInput
    orderBy?: SaleDetailOrderByWithAggregationInput | SaleDetailOrderByWithAggregationInput[]
    by: SaleDetailScalarFieldEnum[] | SaleDetailScalarFieldEnum
    having?: SaleDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleDetailCountAggregateInputType | true
    _avg?: SaleDetailAvgAggregateInputType
    _sum?: SaleDetailSumAggregateInputType
    _min?: SaleDetailMinAggregateInputType
    _max?: SaleDetailMaxAggregateInputType
  }

  export type SaleDetailGroupByOutputType = {
    saleDetailId: string
    saleId: string
    saleDetailProductId: string | null
    saleDetailServiceId: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt: Date
    updatedAt: Date
    _count: SaleDetailCountAggregateOutputType | null
    _avg: SaleDetailAvgAggregateOutputType | null
    _sum: SaleDetailSumAggregateOutputType | null
    _min: SaleDetailMinAggregateOutputType | null
    _max: SaleDetailMaxAggregateOutputType | null
  }

  type GetSaleDetailGroupByPayload<T extends SaleDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleDetailGroupByOutputType[P]>
            : GetScalarType<T[P], SaleDetailGroupByOutputType[P]>
        }
      >
    >


  export type SaleDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleDetailId?: boolean
    saleId?: boolean
    saleDetailProductId?: boolean
    saleDetailServiceId?: boolean
    saleDetailQuantity?: boolean
    saleDetailPrice?: boolean
    saleDetailTotal?: boolean
    saleDetailType?: boolean
    createdByUserId?: boolean
    saleCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleDetail$productArgs<ExtArgs>
    service?: boolean | SaleDetail$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["saleDetail"]>

  export type SaleDetailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleDetailId?: boolean
    saleId?: boolean
    saleDetailProductId?: boolean
    saleDetailServiceId?: boolean
    saleDetailQuantity?: boolean
    saleDetailPrice?: boolean
    saleDetailTotal?: boolean
    saleDetailType?: boolean
    createdByUserId?: boolean
    saleCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleDetail$productArgs<ExtArgs>
    service?: boolean | SaleDetail$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["saleDetail"]>

  export type SaleDetailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleDetailId?: boolean
    saleId?: boolean
    saleDetailProductId?: boolean
    saleDetailServiceId?: boolean
    saleDetailQuantity?: boolean
    saleDetailPrice?: boolean
    saleDetailTotal?: boolean
    saleDetailType?: boolean
    createdByUserId?: boolean
    saleCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleDetail$productArgs<ExtArgs>
    service?: boolean | SaleDetail$serviceArgs<ExtArgs>
  }, ExtArgs["result"]["saleDetail"]>

  export type SaleDetailSelectScalar = {
    saleDetailId?: boolean
    saleId?: boolean
    saleDetailProductId?: boolean
    saleDetailServiceId?: boolean
    saleDetailQuantity?: boolean
    saleDetailPrice?: boolean
    saleDetailTotal?: boolean
    saleDetailType?: boolean
    createdByUserId?: boolean
    saleCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SaleDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"saleDetailId" | "saleId" | "saleDetailProductId" | "saleDetailServiceId" | "saleDetailQuantity" | "saleDetailPrice" | "saleDetailTotal" | "saleDetailType" | "createdByUserId" | "saleCustomerId" | "createdAt" | "updatedAt", ExtArgs["result"]["saleDetail"]>
  export type SaleDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleDetail$productArgs<ExtArgs>
    service?: boolean | SaleDetail$serviceArgs<ExtArgs>
  }
  export type SaleDetailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleDetail$productArgs<ExtArgs>
    service?: boolean | SaleDetail$serviceArgs<ExtArgs>
  }
  export type SaleDetailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    product?: boolean | SaleDetail$productArgs<ExtArgs>
    service?: boolean | SaleDetail$serviceArgs<ExtArgs>
  }

  export type $SaleDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SaleDetail"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      sale: Prisma.$SalePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs> | null
      service: Prisma.$ServicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      saleDetailId: string
      saleId: string
      saleDetailProductId: string | null
      saleDetailServiceId: string | null
      saleDetailQuantity: number
      saleDetailPrice: number
      saleDetailTotal: number
      saleDetailType: string
      createdByUserId: string
      saleCustomerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["saleDetail"]>
    composites: {}
  }

  type SaleDetailGetPayload<S extends boolean | null | undefined | SaleDetailDefaultArgs> = $Result.GetResult<Prisma.$SaleDetailPayload, S>

  type SaleDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleDetailCountAggregateInputType | true
    }

  export interface SaleDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SaleDetail'], meta: { name: 'SaleDetail' } }
    /**
     * Find zero or one SaleDetail that matches the filter.
     * @param {SaleDetailFindUniqueArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleDetailFindUniqueArgs>(args: SelectSubset<T, SaleDetailFindUniqueArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SaleDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleDetailFindUniqueOrThrowArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SaleDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailFindFirstArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleDetailFindFirstArgs>(args?: SelectSubset<T, SaleDetailFindFirstArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SaleDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailFindFirstOrThrowArgs} args - Arguments to find a SaleDetail
     * @example
     * // Get one SaleDetail
     * const saleDetail = await prisma.saleDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SaleDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SaleDetails
     * const saleDetails = await prisma.saleDetail.findMany()
     * 
     * // Get first 10 SaleDetails
     * const saleDetails = await prisma.saleDetail.findMany({ take: 10 })
     * 
     * // Only select the `saleDetailId`
     * const saleDetailWithSaleDetailIdOnly = await prisma.saleDetail.findMany({ select: { saleDetailId: true } })
     * 
     */
    findMany<T extends SaleDetailFindManyArgs>(args?: SelectSubset<T, SaleDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SaleDetail.
     * @param {SaleDetailCreateArgs} args - Arguments to create a SaleDetail.
     * @example
     * // Create one SaleDetail
     * const SaleDetail = await prisma.saleDetail.create({
     *   data: {
     *     // ... data to create a SaleDetail
     *   }
     * })
     * 
     */
    create<T extends SaleDetailCreateArgs>(args: SelectSubset<T, SaleDetailCreateArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SaleDetails.
     * @param {SaleDetailCreateManyArgs} args - Arguments to create many SaleDetails.
     * @example
     * // Create many SaleDetails
     * const saleDetail = await prisma.saleDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleDetailCreateManyArgs>(args?: SelectSubset<T, SaleDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SaleDetails and returns the data saved in the database.
     * @param {SaleDetailCreateManyAndReturnArgs} args - Arguments to create many SaleDetails.
     * @example
     * // Create many SaleDetails
     * const saleDetail = await prisma.saleDetail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SaleDetails and only return the `saleDetailId`
     * const saleDetailWithSaleDetailIdOnly = await prisma.saleDetail.createManyAndReturn({
     *   select: { saleDetailId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleDetailCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleDetailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SaleDetail.
     * @param {SaleDetailDeleteArgs} args - Arguments to delete one SaleDetail.
     * @example
     * // Delete one SaleDetail
     * const SaleDetail = await prisma.saleDetail.delete({
     *   where: {
     *     // ... filter to delete one SaleDetail
     *   }
     * })
     * 
     */
    delete<T extends SaleDetailDeleteArgs>(args: SelectSubset<T, SaleDetailDeleteArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SaleDetail.
     * @param {SaleDetailUpdateArgs} args - Arguments to update one SaleDetail.
     * @example
     * // Update one SaleDetail
     * const saleDetail = await prisma.saleDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleDetailUpdateArgs>(args: SelectSubset<T, SaleDetailUpdateArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SaleDetails.
     * @param {SaleDetailDeleteManyArgs} args - Arguments to filter SaleDetails to delete.
     * @example
     * // Delete a few SaleDetails
     * const { count } = await prisma.saleDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDetailDeleteManyArgs>(args?: SelectSubset<T, SaleDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SaleDetails
     * const saleDetail = await prisma.saleDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleDetailUpdateManyArgs>(args: SelectSubset<T, SaleDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleDetails and returns the data updated in the database.
     * @param {SaleDetailUpdateManyAndReturnArgs} args - Arguments to update many SaleDetails.
     * @example
     * // Update many SaleDetails
     * const saleDetail = await prisma.saleDetail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SaleDetails and only return the `saleDetailId`
     * const saleDetailWithSaleDetailIdOnly = await prisma.saleDetail.updateManyAndReturn({
     *   select: { saleDetailId: true },
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
    updateManyAndReturn<T extends SaleDetailUpdateManyAndReturnArgs>(args: SelectSubset<T, SaleDetailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SaleDetail.
     * @param {SaleDetailUpsertArgs} args - Arguments to update or create a SaleDetail.
     * @example
     * // Update or create a SaleDetail
     * const saleDetail = await prisma.saleDetail.upsert({
     *   create: {
     *     // ... data to create a SaleDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SaleDetail we want to update
     *   }
     * })
     */
    upsert<T extends SaleDetailUpsertArgs>(args: SelectSubset<T, SaleDetailUpsertArgs<ExtArgs>>): Prisma__SaleDetailClient<$Result.GetResult<Prisma.$SaleDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SaleDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailCountArgs} args - Arguments to filter SaleDetails to count.
     * @example
     * // Count the number of SaleDetails
     * const count = await prisma.saleDetail.count({
     *   where: {
     *     // ... the filter for the SaleDetails we want to count
     *   }
     * })
    **/
    count<T extends SaleDetailCountArgs>(
      args?: Subset<T, SaleDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SaleDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SaleDetailAggregateArgs>(args: Subset<T, SaleDetailAggregateArgs>): Prisma.PrismaPromise<GetSaleDetailAggregateType<T>>

    /**
     * Group by SaleDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDetailGroupByArgs} args - Group by arguments.
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
      T extends SaleDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleDetailGroupByArgs['orderBy'] }
        : { orderBy?: SaleDetailGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SaleDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SaleDetail model
   */
  readonly fields: SaleDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SaleDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends SaleDetail$productArgs<ExtArgs> = {}>(args?: Subset<T, SaleDetail$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    service<T extends SaleDetail$serviceArgs<ExtArgs> = {}>(args?: Subset<T, SaleDetail$serviceArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SaleDetail model
   */
  interface SaleDetailFieldRefs {
    readonly saleDetailId: FieldRef<"SaleDetail", 'String'>
    readonly saleId: FieldRef<"SaleDetail", 'String'>
    readonly saleDetailProductId: FieldRef<"SaleDetail", 'String'>
    readonly saleDetailServiceId: FieldRef<"SaleDetail", 'String'>
    readonly saleDetailQuantity: FieldRef<"SaleDetail", 'Int'>
    readonly saleDetailPrice: FieldRef<"SaleDetail", 'Int'>
    readonly saleDetailTotal: FieldRef<"SaleDetail", 'Int'>
    readonly saleDetailType: FieldRef<"SaleDetail", 'String'>
    readonly createdByUserId: FieldRef<"SaleDetail", 'String'>
    readonly saleCustomerId: FieldRef<"SaleDetail", 'String'>
    readonly createdAt: FieldRef<"SaleDetail", 'DateTime'>
    readonly updatedAt: FieldRef<"SaleDetail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SaleDetail findUnique
   */
  export type SaleDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail findUniqueOrThrow
   */
  export type SaleDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail findFirst
   */
  export type SaleDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleDetails.
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleDetails.
     */
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * SaleDetail findFirstOrThrow
   */
  export type SaleDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetail to fetch.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleDetails.
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleDetails.
     */
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * SaleDetail findMany
   */
  export type SaleDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter, which SaleDetails to fetch.
     */
    where?: SaleDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleDetails to fetch.
     */
    orderBy?: SaleDetailOrderByWithRelationInput | SaleDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SaleDetails.
     */
    cursor?: SaleDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleDetails.
     */
    skip?: number
    distinct?: SaleDetailScalarFieldEnum | SaleDetailScalarFieldEnum[]
  }

  /**
   * SaleDetail create
   */
  export type SaleDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a SaleDetail.
     */
    data: XOR<SaleDetailCreateInput, SaleDetailUncheckedCreateInput>
  }

  /**
   * SaleDetail createMany
   */
  export type SaleDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SaleDetails.
     */
    data: SaleDetailCreateManyInput | SaleDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SaleDetail createManyAndReturn
   */
  export type SaleDetailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * The data used to create many SaleDetails.
     */
    data: SaleDetailCreateManyInput | SaleDetailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SaleDetail update
   */
  export type SaleDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a SaleDetail.
     */
    data: XOR<SaleDetailUpdateInput, SaleDetailUncheckedUpdateInput>
    /**
     * Choose, which SaleDetail to update.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail updateMany
   */
  export type SaleDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SaleDetails.
     */
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyInput>
    /**
     * Filter which SaleDetails to update
     */
    where?: SaleDetailWhereInput
    /**
     * Limit how many SaleDetails to update.
     */
    limit?: number
  }

  /**
   * SaleDetail updateManyAndReturn
   */
  export type SaleDetailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * The data used to update SaleDetails.
     */
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyInput>
    /**
     * Filter which SaleDetails to update
     */
    where?: SaleDetailWhereInput
    /**
     * Limit how many SaleDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SaleDetail upsert
   */
  export type SaleDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the SaleDetail to update in case it exists.
     */
    where: SaleDetailWhereUniqueInput
    /**
     * In case the SaleDetail found by the `where` argument doesn't exist, create a new SaleDetail with this data.
     */
    create: XOR<SaleDetailCreateInput, SaleDetailUncheckedCreateInput>
    /**
     * In case the SaleDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleDetailUpdateInput, SaleDetailUncheckedUpdateInput>
  }

  /**
   * SaleDetail delete
   */
  export type SaleDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
    /**
     * Filter which SaleDetail to delete.
     */
    where: SaleDetailWhereUniqueInput
  }

  /**
   * SaleDetail deleteMany
   */
  export type SaleDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleDetails to delete
     */
    where?: SaleDetailWhereInput
    /**
     * Limit how many SaleDetails to delete.
     */
    limit?: number
  }

  /**
   * SaleDetail.product
   */
  export type SaleDetail$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * SaleDetail.service
   */
  export type SaleDetail$serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
  }

  /**
   * SaleDetail without action
   */
  export type SaleDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleDetail
     */
    select?: SaleDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleDetail
     */
    omit?: SaleDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleDetailInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    paymentAmount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    paymentAmount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    paymentId: string | null
    saleId: string | null
    paymentAmount: number | null
    paymentMethod: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    paymentId: string | null
    saleId: string | null
    paymentAmount: number | null
    paymentMethod: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    paymentId: number
    saleId: number
    paymentAmount: number
    paymentMethod: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    paymentAmount?: true
  }

  export type PaymentSumAggregateInputType = {
    paymentAmount?: true
  }

  export type PaymentMinAggregateInputType = {
    paymentId?: true
    saleId?: true
    paymentAmount?: true
    paymentMethod?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    paymentId?: true
    saleId?: true
    paymentAmount?: true
    paymentMethod?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    paymentId?: true
    saleId?: true
    paymentAmount?: true
    paymentMethod?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    paymentId: string
    saleId: string
    paymentAmount: number
    paymentMethod: string
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paymentId?: boolean
    saleId?: boolean
    paymentAmount?: boolean
    paymentMethod?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paymentId?: boolean
    saleId?: boolean
    paymentAmount?: boolean
    paymentMethod?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paymentId?: boolean
    saleId?: boolean
    paymentAmount?: boolean
    paymentMethod?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    Sale?: boolean | SaleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    paymentId?: boolean
    saleId?: boolean
    paymentAmount?: boolean
    paymentMethod?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"paymentId" | "saleId" | "paymentAmount" | "paymentMethod" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Sale?: boolean | SaleDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Sale?: boolean | SaleDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    Sale?: boolean | SaleDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      Sale: Prisma.$SalePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      paymentId: string
      saleId: string
      paymentAmount: number
      paymentMethod: string
      createdByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `paymentId`
     * const paymentWithPaymentIdOnly = await prisma.payment.findMany({ select: { paymentId: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `paymentId`
     * const paymentWithPaymentIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { paymentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `paymentId`
     * const paymentWithPaymentIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { paymentId: true },
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
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
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
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly paymentId: FieldRef<"Payment", 'String'>
    readonly saleId: FieldRef<"Payment", 'String'>
    readonly paymentAmount: FieldRef<"Payment", 'Int'>
    readonly paymentMethod: FieldRef<"Payment", 'String'>
    readonly createdByUserId: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
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
    userLastConnection: 'userLastConnection',
    userCodePhoneNumber: 'userCodePhoneNumber',
    userPhoneNumber: 'userPhoneNumber',
    userDocumentType: 'userDocumentType',
    userDocumentNumber: 'userDocumentNumber',
    userRole: 'userRole',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    customerId: 'customerId',
    customerFirstName: 'customerFirstName',
    customerLastName: 'customerLastName',
    customerEmail: 'customerEmail',
    customerCodePhoneNumber: 'customerCodePhoneNumber',
    customerPhoneNumber: 'customerPhoneNumber',
    customerDocumentType: 'customerDocumentType',
    customerDocumentNumber: 'customerDocumentNumber',
    customerComment: 'customerComment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdByUserId: 'createdByUserId'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    productId: 'productId',
    productName: 'productName',
    productDescription: 'productDescription',
    productSKU: 'productSKU',
    categoryId: 'categoryId',
    productPrice: 'productPrice',
    productPriceFixed: 'productPriceFixed',
    productStatus: 'productStatus',
    productUnit: 'productUnit',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    serviceId: 'serviceId',
    serviceName: 'serviceName',
    serviceDescription: 'serviceDescription',
    serviceSKU: 'serviceSKU',
    servicePrice: 'servicePrice',
    servicePriceFixed: 'servicePriceFixed',
    serviceStatus: 'serviceStatus',
    serviceUnit: 'serviceUnit',
    categoryId: 'categoryId',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    categoryId: 'categoryId',
    categoryName: 'categoryName',
    createdByUserId: 'createdByUserId',
    allowedFor: 'allowedFor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    saleId: 'saleId',
    saleCustomerId: 'saleCustomerId',
    saleTotal: 'saleTotal',
    saleTotalPayments: 'saleTotalPayments',
    salePendingAmount: 'salePendingAmount',
    createdByUserId: 'createdByUserId',
    saleComment: 'saleComment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const SaleDetailScalarFieldEnum: {
    saleDetailId: 'saleDetailId',
    saleId: 'saleId',
    saleDetailProductId: 'saleDetailProductId',
    saleDetailServiceId: 'saleDetailServiceId',
    saleDetailQuantity: 'saleDetailQuantity',
    saleDetailPrice: 'saleDetailPrice',
    saleDetailTotal: 'saleDetailTotal',
    saleDetailType: 'saleDetailType',
    createdByUserId: 'createdByUserId',
    saleCustomerId: 'saleCustomerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SaleDetailScalarFieldEnum = (typeof SaleDetailScalarFieldEnum)[keyof typeof SaleDetailScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    paymentId: 'paymentId',
    saleId: 'saleId',
    paymentAmount: 'paymentAmount',
    paymentMethod: 'paymentMethod',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ProductStatus'
   */
  export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>
    


  /**
   * Reference to a field of type 'ProductStatus[]'
   */
  export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>
    


  /**
   * Reference to a field of type 'ProductUnit'
   */
  export type EnumProductUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductUnit'>
    


  /**
   * Reference to a field of type 'ProductUnit[]'
   */
  export type ListEnumProductUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductUnit[]'>
    


  /**
   * Reference to a field of type 'ServiceUnit'
   */
  export type EnumServiceUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceUnit'>
    


  /**
   * Reference to a field of type 'ServiceUnit[]'
   */
  export type ListEnumServiceUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceUnit[]'>
    


  /**
   * Reference to a field of type 'UsageContext'
   */
  export type EnumUsageContextFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UsageContext'>
    


  /**
   * Reference to a field of type 'UsageContext[]'
   */
  export type ListEnumUsageContextFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UsageContext[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
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
    userLastConnection?: DateTimeNullableFilter<"User"> | Date | string | null
    userCodePhoneNumber?: StringFilter<"User"> | string
    userPhoneNumber?: StringFilter<"User"> | string
    userDocumentType?: StringFilter<"User"> | string
    userDocumentNumber?: StringFilter<"User"> | string
    userRole?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customers?: CustomerListRelationFilter
    Product?: ProductListRelationFilter
    Service?: ServiceListRelationFilter
    Category?: CategoryListRelationFilter
    Sale?: SaleListRelationFilter
    Payment?: PaymentListRelationFilter
    SaleDetail?: SaleDetailListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userLastConnection?: SortOrderInput | SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    userRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customers?: CustomerOrderByRelationAggregateInput
    Product?: ProductOrderByRelationAggregateInput
    Service?: ServiceOrderByRelationAggregateInput
    Category?: CategoryOrderByRelationAggregateInput
    Sale?: SaleOrderByRelationAggregateInput
    Payment?: PaymentOrderByRelationAggregateInput
    SaleDetail?: SaleDetailOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    userEmail?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userFirstName?: StringFilter<"User"> | string
    userLastName?: StringFilter<"User"> | string
    userLastConnection?: DateTimeNullableFilter<"User"> | Date | string | null
    userCodePhoneNumber?: StringFilter<"User"> | string
    userPhoneNumber?: StringFilter<"User"> | string
    userDocumentType?: StringFilter<"User"> | string
    userDocumentNumber?: StringFilter<"User"> | string
    userRole?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customers?: CustomerListRelationFilter
    Product?: ProductListRelationFilter
    Service?: ServiceListRelationFilter
    Category?: CategoryListRelationFilter
    Sale?: SaleListRelationFilter
    Payment?: PaymentListRelationFilter
    SaleDetail?: SaleDetailListRelationFilter
  }, "userId" | "userEmail">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userLastConnection?: SortOrderInput | SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    userRole?: SortOrder
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
    userLastConnection?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    userCodePhoneNumber?: StringWithAggregatesFilter<"User"> | string
    userPhoneNumber?: StringWithAggregatesFilter<"User"> | string
    userDocumentType?: StringWithAggregatesFilter<"User"> | string
    userDocumentNumber?: StringWithAggregatesFilter<"User"> | string
    userRole?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    customerId?: StringFilter<"Customer"> | string
    customerFirstName?: StringFilter<"Customer"> | string
    customerLastName?: StringFilter<"Customer"> | string
    customerEmail?: StringNullableFilter<"Customer"> | string | null
    customerCodePhoneNumber?: StringNullableFilter<"Customer"> | string | null
    customerPhoneNumber?: StringNullableFilter<"Customer"> | string | null
    customerDocumentType?: StringNullableFilter<"Customer"> | string | null
    customerDocumentNumber?: StringNullableFilter<"Customer"> | string | null
    customerComment?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    createdByUserId?: StringFilter<"Customer"> | string
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    Sale?: SaleListRelationFilter
    SaleDetail?: SaleDetailListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    customerId?: SortOrder
    customerFirstName?: SortOrder
    customerLastName?: SortOrder
    customerEmail?: SortOrderInput | SortOrder
    customerCodePhoneNumber?: SortOrderInput | SortOrder
    customerPhoneNumber?: SortOrderInput | SortOrder
    customerDocumentType?: SortOrderInput | SortOrder
    customerDocumentNumber?: SortOrderInput | SortOrder
    customerComment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    Sale?: SaleOrderByRelationAggregateInput
    SaleDetail?: SaleDetailOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    customerId?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    customerFirstName?: StringFilter<"Customer"> | string
    customerLastName?: StringFilter<"Customer"> | string
    customerEmail?: StringNullableFilter<"Customer"> | string | null
    customerCodePhoneNumber?: StringNullableFilter<"Customer"> | string | null
    customerPhoneNumber?: StringNullableFilter<"Customer"> | string | null
    customerDocumentType?: StringNullableFilter<"Customer"> | string | null
    customerDocumentNumber?: StringNullableFilter<"Customer"> | string | null
    customerComment?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    createdByUserId?: StringFilter<"Customer"> | string
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    Sale?: SaleListRelationFilter
    SaleDetail?: SaleDetailListRelationFilter
  }, "customerId">

  export type CustomerOrderByWithAggregationInput = {
    customerId?: SortOrder
    customerFirstName?: SortOrder
    customerLastName?: SortOrder
    customerEmail?: SortOrderInput | SortOrder
    customerCodePhoneNumber?: SortOrderInput | SortOrder
    customerPhoneNumber?: SortOrderInput | SortOrder
    customerDocumentType?: SortOrderInput | SortOrder
    customerDocumentNumber?: SortOrderInput | SortOrder
    customerComment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    customerId?: StringWithAggregatesFilter<"Customer"> | string
    customerFirstName?: StringWithAggregatesFilter<"Customer"> | string
    customerLastName?: StringWithAggregatesFilter<"Customer"> | string
    customerEmail?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    customerCodePhoneNumber?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    customerPhoneNumber?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    customerDocumentType?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    customerDocumentNumber?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    customerComment?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    createdByUserId?: StringWithAggregatesFilter<"Customer"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    productId?: StringFilter<"Product"> | string
    productName?: StringFilter<"Product"> | string
    productDescription?: StringNullableFilter<"Product"> | string | null
    productSKU?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    productPrice?: IntFilter<"Product"> | number
    productPriceFixed?: BoolNullableFilter<"Product"> | boolean | null
    productStatus?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    productUnit?: EnumProductUnitFilter<"Product"> | $Enums.ProductUnit
    createdByUserId?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    SaleDetail?: SaleDetailListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    productId?: SortOrder
    productName?: SortOrder
    productDescription?: SortOrderInput | SortOrder
    productSKU?: SortOrder
    categoryId?: SortOrder
    productPrice?: SortOrder
    productPriceFixed?: SortOrderInput | SortOrder
    productStatus?: SortOrder
    productUnit?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    SaleDetail?: SaleDetailOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    productId?: string
    productSKU?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    productName?: StringFilter<"Product"> | string
    productDescription?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringFilter<"Product"> | string
    productPrice?: IntFilter<"Product"> | number
    productPriceFixed?: BoolNullableFilter<"Product"> | boolean | null
    productStatus?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    productUnit?: EnumProductUnitFilter<"Product"> | $Enums.ProductUnit
    createdByUserId?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    SaleDetail?: SaleDetailListRelationFilter
  }, "productId" | "productSKU">

  export type ProductOrderByWithAggregationInput = {
    productId?: SortOrder
    productName?: SortOrder
    productDescription?: SortOrderInput | SortOrder
    productSKU?: SortOrder
    categoryId?: SortOrder
    productPrice?: SortOrder
    productPriceFixed?: SortOrderInput | SortOrder
    productStatus?: SortOrder
    productUnit?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    productId?: StringWithAggregatesFilter<"Product"> | string
    productName?: StringWithAggregatesFilter<"Product"> | string
    productDescription?: StringNullableWithAggregatesFilter<"Product"> | string | null
    productSKU?: StringWithAggregatesFilter<"Product"> | string
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    productPrice?: IntWithAggregatesFilter<"Product"> | number
    productPriceFixed?: BoolNullableWithAggregatesFilter<"Product"> | boolean | null
    productStatus?: EnumProductStatusWithAggregatesFilter<"Product"> | $Enums.ProductStatus
    productUnit?: EnumProductUnitWithAggregatesFilter<"Product"> | $Enums.ProductUnit
    createdByUserId?: StringWithAggregatesFilter<"Product"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    serviceId?: StringFilter<"Service"> | string
    serviceName?: StringFilter<"Service"> | string
    serviceDescription?: StringNullableFilter<"Service"> | string | null
    serviceSKU?: StringFilter<"Service"> | string
    servicePrice?: IntFilter<"Service"> | number
    servicePriceFixed?: BoolNullableFilter<"Service"> | boolean | null
    serviceStatus?: EnumProductStatusFilter<"Service"> | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFilter<"Service"> | $Enums.ServiceUnit
    categoryId?: StringFilter<"Service"> | string
    createdByUserId?: StringFilter<"Service"> | string
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    SaleDetail?: SaleDetailListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    serviceId?: SortOrder
    serviceName?: SortOrder
    serviceDescription?: SortOrderInput | SortOrder
    serviceSKU?: SortOrder
    servicePrice?: SortOrder
    servicePriceFixed?: SortOrderInput | SortOrder
    serviceStatus?: SortOrder
    serviceUnit?: SortOrder
    categoryId?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    SaleDetail?: SaleDetailOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    serviceId?: string
    serviceSKU?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    serviceName?: StringFilter<"Service"> | string
    serviceDescription?: StringNullableFilter<"Service"> | string | null
    servicePrice?: IntFilter<"Service"> | number
    servicePriceFixed?: BoolNullableFilter<"Service"> | boolean | null
    serviceStatus?: EnumProductStatusFilter<"Service"> | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFilter<"Service"> | $Enums.ServiceUnit
    categoryId?: StringFilter<"Service"> | string
    createdByUserId?: StringFilter<"Service"> | string
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    SaleDetail?: SaleDetailListRelationFilter
  }, "serviceId" | "serviceSKU">

  export type ServiceOrderByWithAggregationInput = {
    serviceId?: SortOrder
    serviceName?: SortOrder
    serviceDescription?: SortOrderInput | SortOrder
    serviceSKU?: SortOrder
    servicePrice?: SortOrder
    servicePriceFixed?: SortOrderInput | SortOrder
    serviceStatus?: SortOrder
    serviceUnit?: SortOrder
    categoryId?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    serviceId?: StringWithAggregatesFilter<"Service"> | string
    serviceName?: StringWithAggregatesFilter<"Service"> | string
    serviceDescription?: StringNullableWithAggregatesFilter<"Service"> | string | null
    serviceSKU?: StringWithAggregatesFilter<"Service"> | string
    servicePrice?: IntWithAggregatesFilter<"Service"> | number
    servicePriceFixed?: BoolNullableWithAggregatesFilter<"Service"> | boolean | null
    serviceStatus?: EnumProductStatusWithAggregatesFilter<"Service"> | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitWithAggregatesFilter<"Service"> | $Enums.ServiceUnit
    categoryId?: StringWithAggregatesFilter<"Service"> | string
    createdByUserId?: StringWithAggregatesFilter<"Service"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    categoryId?: StringFilter<"Category"> | string
    categoryName?: StringFilter<"Category"> | string
    createdByUserId?: StringFilter<"Category"> | string
    allowedFor?: EnumUsageContextFilter<"Category"> | $Enums.UsageContext
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
    services?: ServiceListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CategoryOrderByWithRelationInput = {
    categoryId?: SortOrder
    categoryName?: SortOrder
    createdByUserId?: SortOrder
    allowedFor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    categoryId?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    categoryName?: StringFilter<"Category"> | string
    createdByUserId?: StringFilter<"Category"> | string
    allowedFor?: EnumUsageContextFilter<"Category"> | $Enums.UsageContext
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
    services?: ServiceListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "categoryId">

  export type CategoryOrderByWithAggregationInput = {
    categoryId?: SortOrder
    categoryName?: SortOrder
    createdByUserId?: SortOrder
    allowedFor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    categoryId?: StringWithAggregatesFilter<"Category"> | string
    categoryName?: StringWithAggregatesFilter<"Category"> | string
    createdByUserId?: StringWithAggregatesFilter<"Category"> | string
    allowedFor?: EnumUsageContextWithAggregatesFilter<"Category"> | $Enums.UsageContext
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    saleId?: StringFilter<"Sale"> | string
    saleCustomerId?: StringFilter<"Sale"> | string
    saleTotal?: IntFilter<"Sale"> | number
    saleTotalPayments?: IntFilter<"Sale"> | number
    salePendingAmount?: IntFilter<"Sale"> | number
    createdByUserId?: StringFilter<"Sale"> | string
    saleComment?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    SaleDetail?: SaleDetailListRelationFilter
    Payment?: PaymentListRelationFilter
  }

  export type SaleOrderByWithRelationInput = {
    saleId?: SortOrder
    saleCustomerId?: SortOrder
    saleTotal?: SortOrder
    saleTotalPayments?: SortOrder
    salePendingAmount?: SortOrder
    createdByUserId?: SortOrder
    saleComment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
    SaleDetail?: SaleDetailOrderByRelationAggregateInput
    Payment?: PaymentOrderByRelationAggregateInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    saleId?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    saleCustomerId?: StringFilter<"Sale"> | string
    saleTotal?: IntFilter<"Sale"> | number
    saleTotalPayments?: IntFilter<"Sale"> | number
    salePendingAmount?: IntFilter<"Sale"> | number
    createdByUserId?: StringFilter<"Sale"> | string
    saleComment?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    SaleDetail?: SaleDetailListRelationFilter
    Payment?: PaymentListRelationFilter
  }, "saleId">

  export type SaleOrderByWithAggregationInput = {
    saleId?: SortOrder
    saleCustomerId?: SortOrder
    saleTotal?: SortOrder
    saleTotalPayments?: SortOrder
    salePendingAmount?: SortOrder
    createdByUserId?: SortOrder
    saleComment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    saleId?: StringWithAggregatesFilter<"Sale"> | string
    saleCustomerId?: StringWithAggregatesFilter<"Sale"> | string
    saleTotal?: IntWithAggregatesFilter<"Sale"> | number
    saleTotalPayments?: IntWithAggregatesFilter<"Sale"> | number
    salePendingAmount?: IntWithAggregatesFilter<"Sale"> | number
    createdByUserId?: StringWithAggregatesFilter<"Sale"> | string
    saleComment?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
  }

  export type SaleDetailWhereInput = {
    AND?: SaleDetailWhereInput | SaleDetailWhereInput[]
    OR?: SaleDetailWhereInput[]
    NOT?: SaleDetailWhereInput | SaleDetailWhereInput[]
    saleDetailId?: StringFilter<"SaleDetail"> | string
    saleId?: StringFilter<"SaleDetail"> | string
    saleDetailProductId?: StringNullableFilter<"SaleDetail"> | string | null
    saleDetailServiceId?: StringNullableFilter<"SaleDetail"> | string | null
    saleDetailQuantity?: IntFilter<"SaleDetail"> | number
    saleDetailPrice?: IntFilter<"SaleDetail"> | number
    saleDetailTotal?: IntFilter<"SaleDetail"> | number
    saleDetailType?: StringFilter<"SaleDetail"> | string
    createdByUserId?: StringFilter<"SaleDetail"> | string
    saleCustomerId?: StringFilter<"SaleDetail"> | string
    createdAt?: DateTimeFilter<"SaleDetail"> | Date | string
    updatedAt?: DateTimeFilter<"SaleDetail"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
  }

  export type SaleDetailOrderByWithRelationInput = {
    saleDetailId?: SortOrder
    saleId?: SortOrder
    saleDetailProductId?: SortOrderInput | SortOrder
    saleDetailServiceId?: SortOrderInput | SortOrder
    saleDetailQuantity?: SortOrder
    saleDetailPrice?: SortOrder
    saleDetailTotal?: SortOrder
    saleDetailType?: SortOrder
    createdByUserId?: SortOrder
    saleCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    sale?: SaleOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type SaleDetailWhereUniqueInput = Prisma.AtLeast<{
    saleDetailId?: string
    AND?: SaleDetailWhereInput | SaleDetailWhereInput[]
    OR?: SaleDetailWhereInput[]
    NOT?: SaleDetailWhereInput | SaleDetailWhereInput[]
    saleId?: StringFilter<"SaleDetail"> | string
    saleDetailProductId?: StringNullableFilter<"SaleDetail"> | string | null
    saleDetailServiceId?: StringNullableFilter<"SaleDetail"> | string | null
    saleDetailQuantity?: IntFilter<"SaleDetail"> | number
    saleDetailPrice?: IntFilter<"SaleDetail"> | number
    saleDetailTotal?: IntFilter<"SaleDetail"> | number
    saleDetailType?: StringFilter<"SaleDetail"> | string
    createdByUserId?: StringFilter<"SaleDetail"> | string
    saleCustomerId?: StringFilter<"SaleDetail"> | string
    createdAt?: DateTimeFilter<"SaleDetail"> | Date | string
    updatedAt?: DateTimeFilter<"SaleDetail"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
  }, "saleDetailId">

  export type SaleDetailOrderByWithAggregationInput = {
    saleDetailId?: SortOrder
    saleId?: SortOrder
    saleDetailProductId?: SortOrderInput | SortOrder
    saleDetailServiceId?: SortOrderInput | SortOrder
    saleDetailQuantity?: SortOrder
    saleDetailPrice?: SortOrder
    saleDetailTotal?: SortOrder
    saleDetailType?: SortOrder
    createdByUserId?: SortOrder
    saleCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SaleDetailCountOrderByAggregateInput
    _avg?: SaleDetailAvgOrderByAggregateInput
    _max?: SaleDetailMaxOrderByAggregateInput
    _min?: SaleDetailMinOrderByAggregateInput
    _sum?: SaleDetailSumOrderByAggregateInput
  }

  export type SaleDetailScalarWhereWithAggregatesInput = {
    AND?: SaleDetailScalarWhereWithAggregatesInput | SaleDetailScalarWhereWithAggregatesInput[]
    OR?: SaleDetailScalarWhereWithAggregatesInput[]
    NOT?: SaleDetailScalarWhereWithAggregatesInput | SaleDetailScalarWhereWithAggregatesInput[]
    saleDetailId?: StringWithAggregatesFilter<"SaleDetail"> | string
    saleId?: StringWithAggregatesFilter<"SaleDetail"> | string
    saleDetailProductId?: StringNullableWithAggregatesFilter<"SaleDetail"> | string | null
    saleDetailServiceId?: StringNullableWithAggregatesFilter<"SaleDetail"> | string | null
    saleDetailQuantity?: IntWithAggregatesFilter<"SaleDetail"> | number
    saleDetailPrice?: IntWithAggregatesFilter<"SaleDetail"> | number
    saleDetailTotal?: IntWithAggregatesFilter<"SaleDetail"> | number
    saleDetailType?: StringWithAggregatesFilter<"SaleDetail"> | string
    createdByUserId?: StringWithAggregatesFilter<"SaleDetail"> | string
    saleCustomerId?: StringWithAggregatesFilter<"SaleDetail"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SaleDetail"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SaleDetail"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    paymentId?: StringFilter<"Payment"> | string
    saleId?: StringFilter<"Payment"> | string
    paymentAmount?: IntFilter<"Payment"> | number
    paymentMethod?: StringFilter<"Payment"> | string
    createdByUserId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Sale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    paymentId?: SortOrder
    saleId?: SortOrder
    paymentAmount?: SortOrder
    paymentMethod?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    Sale?: SaleOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    paymentId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    saleId?: StringFilter<"Payment"> | string
    paymentAmount?: IntFilter<"Payment"> | number
    paymentMethod?: StringFilter<"Payment"> | string
    createdByUserId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    Sale?: XOR<SaleScalarRelationFilter, SaleWhereInput>
  }, "paymentId">

  export type PaymentOrderByWithAggregationInput = {
    paymentId?: SortOrder
    saleId?: SortOrder
    paymentAmount?: SortOrder
    paymentMethod?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    paymentId?: StringWithAggregatesFilter<"Payment"> | string
    saleId?: StringWithAggregatesFilter<"Payment"> | string
    paymentAmount?: IntWithAggregatesFilter<"Payment"> | number
    paymentMethod?: StringWithAggregatesFilter<"Payment"> | string
    createdByUserId?: StringWithAggregatesFilter<"Payment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type UserCreateInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutCreatedByInput
    Product?: ProductCreateNestedManyWithoutUserInput
    Service?: ServiceCreateNestedManyWithoutUserInput
    Category?: CategoryCreateNestedManyWithoutUserInput
    Sale?: SaleCreateNestedManyWithoutUserInput
    Payment?: PaymentCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutCreatedByInput
    Product?: ProductUncheckedCreateNestedManyWithoutUserInput
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
    Category?: CategoryUncheckedCreateNestedManyWithoutUserInput
    Sale?: SaleUncheckedCreateNestedManyWithoutUserInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUpdateManyWithoutUserNestedInput
    Service?: ServiceUpdateManyWithoutUserNestedInput
    Category?: CategoryUpdateManyWithoutUserNestedInput
    Sale?: SaleUpdateManyWithoutUserNestedInput
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUncheckedUpdateManyWithoutUserNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
    Category?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    Sale?: SaleUncheckedUpdateManyWithoutUserNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCustomersInput
    Sale?: SaleCreateNestedManyWithoutCustomerInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUserId: string
    Sale?: SaleUncheckedCreateNestedManyWithoutCustomerInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCustomersNestedInput
    Sale?: SaleUpdateManyWithoutCustomerNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    Sale?: SaleUncheckedUpdateManyWithoutCustomerNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUserId: string
  }

  export type CustomerUpdateManyMutationInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    user: UserCreateNestedOneWithoutProductInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    categoryId: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    user?: UserUpdateOneRequiredWithoutProductNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    categoryId: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutServicesInput
    user: UserCreateNestedOneWithoutServiceInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    categoryId: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    categoryId?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    categoryId: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    categoryId?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    categoryId?: string
    categoryName: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
    user: UserCreateNestedOneWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    categoryId?: string
    categoryName: string
    createdByUserId: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
    user?: UserUpdateOneRequiredWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    categoryId?: string
    categoryName: string
    createdByUserId: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateInput = {
    saleId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSaleInput
    customer: CustomerCreateNestedOneWithoutSaleInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutSaleInput
    Payment?: PaymentCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateInput = {
    saleId: string
    saleCustomerId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: string
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutSaleInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleUpdateInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSaleNestedInput
    customer?: CustomerUpdateOneRequiredWithoutSaleNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutSaleNestedInput
    Payment?: PaymentUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutSaleNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleCreateManyInput = {
    saleId: string
    saleCustomerId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: string
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleUpdateManyMutationInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailCreateInput = {
    saleDetailId: string
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSaleDetailInput
    user: UserCreateNestedOneWithoutSaleDetailInput
    sale: SaleCreateNestedOneWithoutSaleDetailInput
    product?: ProductCreateNestedOneWithoutSaleDetailInput
    service?: ServiceCreateNestedOneWithoutSaleDetailInput
  }

  export type SaleDetailUncheckedCreateInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailUpdateInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSaleDetailNestedInput
    user?: UserUpdateOneRequiredWithoutSaleDetailNestedInput
    sale?: SaleUpdateOneRequiredWithoutSaleDetailNestedInput
    product?: ProductUpdateOneWithoutSaleDetailNestedInput
    service?: ServiceUpdateOneWithoutSaleDetailNestedInput
  }

  export type SaleDetailUncheckedUpdateInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailCreateManyInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailUpdateManyMutationInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUncheckedUpdateManyInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    paymentId: string
    paymentAmount: number
    paymentMethod: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentInput
    Sale: SaleCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    paymentId: string
    saleId: string
    paymentAmount: number
    paymentMethod: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentNestedInput
    Sale?: SaleUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    paymentId: string
    saleId: string
    paymentAmount: number
    paymentMethod: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type CustomerListRelationFilter = {
    every?: CustomerWhereInput
    some?: CustomerWhereInput
    none?: CustomerWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type SaleDetailListRelationFilter = {
    every?: SaleDetailWhereInput
    some?: SaleDetailWhereInput
    none?: SaleDetailWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SaleDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userLastConnection?: SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    userRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userLastConnection?: SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    userRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    userFirstName?: SortOrder
    userLastName?: SortOrder
    userEmail?: SortOrder
    userLastConnection?: SortOrder
    userCodePhoneNumber?: SortOrder
    userPhoneNumber?: SortOrder
    userDocumentType?: SortOrder
    userDocumentNumber?: SortOrder
    userRole?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CustomerCountOrderByAggregateInput = {
    customerId?: SortOrder
    customerFirstName?: SortOrder
    customerLastName?: SortOrder
    customerEmail?: SortOrder
    customerCodePhoneNumber?: SortOrder
    customerPhoneNumber?: SortOrder
    customerDocumentType?: SortOrder
    customerDocumentNumber?: SortOrder
    customerComment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    customerId?: SortOrder
    customerFirstName?: SortOrder
    customerLastName?: SortOrder
    customerEmail?: SortOrder
    customerCodePhoneNumber?: SortOrder
    customerPhoneNumber?: SortOrder
    customerDocumentType?: SortOrder
    customerDocumentNumber?: SortOrder
    customerComment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    customerId?: SortOrder
    customerFirstName?: SortOrder
    customerLastName?: SortOrder
    customerEmail?: SortOrder
    customerCodePhoneNumber?: SortOrder
    customerPhoneNumber?: SortOrder
    customerDocumentType?: SortOrder
    customerDocumentNumber?: SortOrder
    customerComment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type EnumProductUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductUnit | EnumProductUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumProductUnitFilter<$PrismaModel> | $Enums.ProductUnit
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProductCountOrderByAggregateInput = {
    productId?: SortOrder
    productName?: SortOrder
    productDescription?: SortOrder
    productSKU?: SortOrder
    categoryId?: SortOrder
    productPrice?: SortOrder
    productPriceFixed?: SortOrder
    productStatus?: SortOrder
    productUnit?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    productPrice?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    productId?: SortOrder
    productName?: SortOrder
    productDescription?: SortOrder
    productSKU?: SortOrder
    categoryId?: SortOrder
    productPrice?: SortOrder
    productPriceFixed?: SortOrder
    productStatus?: SortOrder
    productUnit?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    productId?: SortOrder
    productName?: SortOrder
    productDescription?: SortOrder
    productSKU?: SortOrder
    categoryId?: SortOrder
    productPrice?: SortOrder
    productPriceFixed?: SortOrder
    productStatus?: SortOrder
    productUnit?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    productPrice?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type EnumProductUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductUnit | EnumProductUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumProductUnitWithAggregatesFilter<$PrismaModel> | $Enums.ProductUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductUnitFilter<$PrismaModel>
    _max?: NestedEnumProductUnitFilter<$PrismaModel>
  }

  export type EnumServiceUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceUnit | EnumServiceUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceUnitFilter<$PrismaModel> | $Enums.ServiceUnit
  }

  export type ServiceCountOrderByAggregateInput = {
    serviceId?: SortOrder
    serviceName?: SortOrder
    serviceDescription?: SortOrder
    serviceSKU?: SortOrder
    servicePrice?: SortOrder
    servicePriceFixed?: SortOrder
    serviceStatus?: SortOrder
    serviceUnit?: SortOrder
    categoryId?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    servicePrice?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    serviceId?: SortOrder
    serviceName?: SortOrder
    serviceDescription?: SortOrder
    serviceSKU?: SortOrder
    servicePrice?: SortOrder
    servicePriceFixed?: SortOrder
    serviceStatus?: SortOrder
    serviceUnit?: SortOrder
    categoryId?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    serviceId?: SortOrder
    serviceName?: SortOrder
    serviceDescription?: SortOrder
    serviceSKU?: SortOrder
    servicePrice?: SortOrder
    servicePriceFixed?: SortOrder
    serviceStatus?: SortOrder
    serviceUnit?: SortOrder
    categoryId?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    servicePrice?: SortOrder
  }

  export type EnumServiceUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceUnit | EnumServiceUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceUnitWithAggregatesFilter<$PrismaModel> | $Enums.ServiceUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceUnitFilter<$PrismaModel>
    _max?: NestedEnumServiceUnitFilter<$PrismaModel>
  }

  export type EnumUsageContextFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageContext | EnumUsageContextFieldRefInput<$PrismaModel>
    in?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageContextFilter<$PrismaModel> | $Enums.UsageContext
  }

  export type CategoryCountOrderByAggregateInput = {
    categoryId?: SortOrder
    categoryName?: SortOrder
    createdByUserId?: SortOrder
    allowedFor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    categoryId?: SortOrder
    categoryName?: SortOrder
    createdByUserId?: SortOrder
    allowedFor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    categoryId?: SortOrder
    categoryName?: SortOrder
    createdByUserId?: SortOrder
    allowedFor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUsageContextWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageContext | EnumUsageContextFieldRefInput<$PrismaModel>
    in?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageContextWithAggregatesFilter<$PrismaModel> | $Enums.UsageContext
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUsageContextFilter<$PrismaModel>
    _max?: NestedEnumUsageContextFilter<$PrismaModel>
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type SaleCountOrderByAggregateInput = {
    saleId?: SortOrder
    saleCustomerId?: SortOrder
    saleTotal?: SortOrder
    saleTotalPayments?: SortOrder
    salePendingAmount?: SortOrder
    createdByUserId?: SortOrder
    saleComment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    saleTotal?: SortOrder
    saleTotalPayments?: SortOrder
    salePendingAmount?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    saleId?: SortOrder
    saleCustomerId?: SortOrder
    saleTotal?: SortOrder
    saleTotalPayments?: SortOrder
    salePendingAmount?: SortOrder
    createdByUserId?: SortOrder
    saleComment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    saleId?: SortOrder
    saleCustomerId?: SortOrder
    saleTotal?: SortOrder
    saleTotalPayments?: SortOrder
    salePendingAmount?: SortOrder
    createdByUserId?: SortOrder
    saleComment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    saleTotal?: SortOrder
    saleTotalPayments?: SortOrder
    salePendingAmount?: SortOrder
  }

  export type SaleScalarRelationFilter = {
    is?: SaleWhereInput
    isNot?: SaleWhereInput
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type ServiceNullableScalarRelationFilter = {
    is?: ServiceWhereInput | null
    isNot?: ServiceWhereInput | null
  }

  export type SaleDetailCountOrderByAggregateInput = {
    saleDetailId?: SortOrder
    saleId?: SortOrder
    saleDetailProductId?: SortOrder
    saleDetailServiceId?: SortOrder
    saleDetailQuantity?: SortOrder
    saleDetailPrice?: SortOrder
    saleDetailTotal?: SortOrder
    saleDetailType?: SortOrder
    createdByUserId?: SortOrder
    saleCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleDetailAvgOrderByAggregateInput = {
    saleDetailQuantity?: SortOrder
    saleDetailPrice?: SortOrder
    saleDetailTotal?: SortOrder
  }

  export type SaleDetailMaxOrderByAggregateInput = {
    saleDetailId?: SortOrder
    saleId?: SortOrder
    saleDetailProductId?: SortOrder
    saleDetailServiceId?: SortOrder
    saleDetailQuantity?: SortOrder
    saleDetailPrice?: SortOrder
    saleDetailTotal?: SortOrder
    saleDetailType?: SortOrder
    createdByUserId?: SortOrder
    saleCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleDetailMinOrderByAggregateInput = {
    saleDetailId?: SortOrder
    saleId?: SortOrder
    saleDetailProductId?: SortOrder
    saleDetailServiceId?: SortOrder
    saleDetailQuantity?: SortOrder
    saleDetailPrice?: SortOrder
    saleDetailTotal?: SortOrder
    saleDetailType?: SortOrder
    createdByUserId?: SortOrder
    saleCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleDetailSumOrderByAggregateInput = {
    saleDetailQuantity?: SortOrder
    saleDetailPrice?: SortOrder
    saleDetailTotal?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    paymentId?: SortOrder
    saleId?: SortOrder
    paymentAmount?: SortOrder
    paymentMethod?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    paymentAmount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    paymentId?: SortOrder
    saleId?: SortOrder
    paymentAmount?: SortOrder
    paymentMethod?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    paymentId?: SortOrder
    saleId?: SortOrder
    paymentAmount?: SortOrder
    paymentMethod?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    paymentAmount?: SortOrder
  }

  export type CustomerCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CustomerCreateWithoutCreatedByInput, CustomerUncheckedCreateWithoutCreatedByInput> | CustomerCreateWithoutCreatedByInput[] | CustomerUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutCreatedByInput | CustomerCreateOrConnectWithoutCreatedByInput[]
    createMany?: CustomerCreateManyCreatedByInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutUserInput = {
    create?: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput> | ServiceCreateWithoutUserInput[] | ServiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutUserInput | ServiceCreateOrConnectWithoutUserInput[]
    createMany?: ServiceCreateManyUserInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type SaleCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type SaleDetailCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleDetailCreateWithoutUserInput, SaleDetailUncheckedCreateWithoutUserInput> | SaleDetailCreateWithoutUserInput[] | SaleDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutUserInput | SaleDetailCreateOrConnectWithoutUserInput[]
    createMany?: SaleDetailCreateManyUserInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type CustomerUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CustomerCreateWithoutCreatedByInput, CustomerUncheckedCreateWithoutCreatedByInput> | CustomerCreateWithoutCreatedByInput[] | CustomerUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutCreatedByInput | CustomerCreateOrConnectWithoutCreatedByInput[]
    createMany?: CustomerCreateManyCreatedByInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput> | ServiceCreateWithoutUserInput[] | ServiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutUserInput | ServiceCreateOrConnectWithoutUserInput[]
    createMany?: ServiceCreateManyUserInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type SaleDetailUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SaleDetailCreateWithoutUserInput, SaleDetailUncheckedCreateWithoutUserInput> | SaleDetailCreateWithoutUserInput[] | SaleDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutUserInput | SaleDetailCreateOrConnectWithoutUserInput[]
    createMany?: SaleDetailCreateManyUserInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomerUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CustomerCreateWithoutCreatedByInput, CustomerUncheckedCreateWithoutCreatedByInput> | CustomerCreateWithoutCreatedByInput[] | CustomerUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutCreatedByInput | CustomerCreateOrConnectWithoutCreatedByInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutCreatedByInput | CustomerUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CustomerCreateManyCreatedByInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutCreatedByInput | CustomerUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutCreatedByInput | CustomerUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutUserInput | ProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutUserInput | ProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutUserInput | ProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput> | ServiceCreateWithoutUserInput[] | ServiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutUserInput | ServiceCreateOrConnectWithoutUserInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutUserInput | ServiceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServiceCreateManyUserInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutUserInput | ServiceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutUserInput | ServiceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type SaleUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutUserInput | SaleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutUserInput | SaleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutUserInput | SaleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type SaleDetailUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleDetailCreateWithoutUserInput, SaleDetailUncheckedCreateWithoutUserInput> | SaleDetailCreateWithoutUserInput[] | SaleDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutUserInput | SaleDetailCreateOrConnectWithoutUserInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutUserInput | SaleDetailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleDetailCreateManyUserInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutUserInput | SaleDetailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutUserInput | SaleDetailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type CustomerUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CustomerCreateWithoutCreatedByInput, CustomerUncheckedCreateWithoutCreatedByInput> | CustomerCreateWithoutCreatedByInput[] | CustomerUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutCreatedByInput | CustomerCreateOrConnectWithoutCreatedByInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutCreatedByInput | CustomerUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CustomerCreateManyCreatedByInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutCreatedByInput | CustomerUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutCreatedByInput | CustomerUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutUserInput | ProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutUserInput | ProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutUserInput | ProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput> | ServiceCreateWithoutUserInput[] | ServiceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutUserInput | ServiceCreateOrConnectWithoutUserInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutUserInput | ServiceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServiceCreateManyUserInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutUserInput | ServiceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutUserInput | ServiceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput> | SaleCreateWithoutUserInput[] | SaleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutUserInput | SaleCreateOrConnectWithoutUserInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutUserInput | SaleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleCreateManyUserInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutUserInput | SaleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutUserInput | SaleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type SaleDetailUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SaleDetailCreateWithoutUserInput, SaleDetailUncheckedCreateWithoutUserInput> | SaleDetailCreateWithoutUserInput[] | SaleDetailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutUserInput | SaleDetailCreateOrConnectWithoutUserInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutUserInput | SaleDetailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SaleDetailCreateManyUserInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutUserInput | SaleDetailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutUserInput | SaleDetailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCustomersInput = {
    create?: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomersInput
    connect?: UserWhereUniqueInput
  }

  export type SaleCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleDetailCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SaleDetailCreateWithoutCustomerInput, SaleDetailUncheckedCreateWithoutCustomerInput> | SaleDetailCreateWithoutCustomerInput[] | SaleDetailUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutCustomerInput | SaleDetailCreateOrConnectWithoutCustomerInput[]
    createMany?: SaleDetailCreateManyCustomerInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleDetailUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SaleDetailCreateWithoutCustomerInput, SaleDetailUncheckedCreateWithoutCustomerInput> | SaleDetailCreateWithoutCustomerInput[] | SaleDetailUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutCustomerInput | SaleDetailCreateOrConnectWithoutCustomerInput[]
    createMany?: SaleDetailCreateManyCustomerInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneWithoutCustomersNestedInput = {
    create?: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomersInput
    upsert?: UserUpsertWithoutCustomersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomersInput, UserUpdateWithoutCustomersInput>, UserUncheckedUpdateWithoutCustomersInput>
  }

  export type SaleUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutCustomerInput | SaleUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutCustomerInput | SaleUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutCustomerInput | SaleUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type SaleDetailUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SaleDetailCreateWithoutCustomerInput, SaleDetailUncheckedCreateWithoutCustomerInput> | SaleDetailCreateWithoutCustomerInput[] | SaleDetailUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutCustomerInput | SaleDetailCreateOrConnectWithoutCustomerInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutCustomerInput | SaleDetailUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SaleDetailCreateManyCustomerInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutCustomerInput | SaleDetailUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutCustomerInput | SaleDetailUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutCustomerInput | SaleUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutCustomerInput | SaleUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutCustomerInput | SaleUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type SaleDetailUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SaleDetailCreateWithoutCustomerInput, SaleDetailUncheckedCreateWithoutCustomerInput> | SaleDetailCreateWithoutCustomerInput[] | SaleDetailUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutCustomerInput | SaleDetailCreateOrConnectWithoutCustomerInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutCustomerInput | SaleDetailUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SaleDetailCreateManyCustomerInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutCustomerInput | SaleDetailUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutCustomerInput | SaleDetailUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProductInput = {
    create?: XOR<UserCreateWithoutProductInput, UserUncheckedCreateWithoutProductInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductInput
    connect?: UserWhereUniqueInput
  }

  export type SaleDetailCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleDetailCreateWithoutProductInput, SaleDetailUncheckedCreateWithoutProductInput> | SaleDetailCreateWithoutProductInput[] | SaleDetailUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutProductInput | SaleDetailCreateOrConnectWithoutProductInput[]
    createMany?: SaleDetailCreateManyProductInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type SaleDetailUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SaleDetailCreateWithoutProductInput, SaleDetailUncheckedCreateWithoutProductInput> | SaleDetailCreateWithoutProductInput[] | SaleDetailUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutProductInput | SaleDetailCreateOrConnectWithoutProductInput[]
    createMany?: SaleDetailCreateManyProductInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type EnumProductStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductStatus
  }

  export type EnumProductUnitFieldUpdateOperationsInput = {
    set?: $Enums.ProductUnit
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type UserUpdateOneRequiredWithoutProductNestedInput = {
    create?: XOR<UserCreateWithoutProductInput, UserUncheckedCreateWithoutProductInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductInput
    upsert?: UserUpsertWithoutProductInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProductInput, UserUpdateWithoutProductInput>, UserUncheckedUpdateWithoutProductInput>
  }

  export type SaleDetailUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleDetailCreateWithoutProductInput, SaleDetailUncheckedCreateWithoutProductInput> | SaleDetailCreateWithoutProductInput[] | SaleDetailUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutProductInput | SaleDetailCreateOrConnectWithoutProductInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutProductInput | SaleDetailUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleDetailCreateManyProductInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutProductInput | SaleDetailUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutProductInput | SaleDetailUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type SaleDetailUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SaleDetailCreateWithoutProductInput, SaleDetailUncheckedCreateWithoutProductInput> | SaleDetailCreateWithoutProductInput[] | SaleDetailUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutProductInput | SaleDetailCreateOrConnectWithoutProductInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutProductInput | SaleDetailUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SaleDetailCreateManyProductInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutProductInput | SaleDetailUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutProductInput | SaleDetailUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutServicesInput = {
    create?: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutServicesInput
    connect?: CategoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutServiceInput = {
    create?: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceInput
    connect?: UserWhereUniqueInput
  }

  export type SaleDetailCreateNestedManyWithoutServiceInput = {
    create?: XOR<SaleDetailCreateWithoutServiceInput, SaleDetailUncheckedCreateWithoutServiceInput> | SaleDetailCreateWithoutServiceInput[] | SaleDetailUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutServiceInput | SaleDetailCreateOrConnectWithoutServiceInput[]
    createMany?: SaleDetailCreateManyServiceInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type SaleDetailUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<SaleDetailCreateWithoutServiceInput, SaleDetailUncheckedCreateWithoutServiceInput> | SaleDetailCreateWithoutServiceInput[] | SaleDetailUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutServiceInput | SaleDetailCreateOrConnectWithoutServiceInput[]
    createMany?: SaleDetailCreateManyServiceInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type EnumServiceUnitFieldUpdateOperationsInput = {
    set?: $Enums.ServiceUnit
  }

  export type CategoryUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutServicesInput
    upsert?: CategoryUpsertWithoutServicesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutServicesInput, CategoryUpdateWithoutServicesInput>, CategoryUncheckedUpdateWithoutServicesInput>
  }

  export type UserUpdateOneRequiredWithoutServiceNestedInput = {
    create?: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceInput
    upsert?: UserUpsertWithoutServiceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServiceInput, UserUpdateWithoutServiceInput>, UserUncheckedUpdateWithoutServiceInput>
  }

  export type SaleDetailUpdateManyWithoutServiceNestedInput = {
    create?: XOR<SaleDetailCreateWithoutServiceInput, SaleDetailUncheckedCreateWithoutServiceInput> | SaleDetailCreateWithoutServiceInput[] | SaleDetailUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutServiceInput | SaleDetailCreateOrConnectWithoutServiceInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutServiceInput | SaleDetailUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: SaleDetailCreateManyServiceInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutServiceInput | SaleDetailUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutServiceInput | SaleDetailUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type SaleDetailUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<SaleDetailCreateWithoutServiceInput, SaleDetailUncheckedCreateWithoutServiceInput> | SaleDetailCreateWithoutServiceInput[] | SaleDetailUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutServiceInput | SaleDetailCreateOrConnectWithoutServiceInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutServiceInput | SaleDetailUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: SaleDetailCreateManyServiceInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutServiceInput | SaleDetailUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutServiceInput | SaleDetailUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCategoryInput = {
    create?: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoryInput
    connect?: UserWhereUniqueInput
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type EnumUsageContextFieldUpdateOperationsInput = {
    set?: $Enums.UsageContext
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCategoryNestedInput = {
    create?: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoryInput
    upsert?: UserUpsertWithoutCategoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCategoryInput, UserUpdateWithoutCategoryInput>, UserUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSaleInput = {
    create?: XOR<UserCreateWithoutSaleInput, UserUncheckedCreateWithoutSaleInput>
    connectOrCreate?: UserCreateOrConnectWithoutSaleInput
    connect?: UserWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutSaleInput = {
    create?: XOR<CustomerCreateWithoutSaleInput, CustomerUncheckedCreateWithoutSaleInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSaleInput
    connect?: CustomerWhereUniqueInput
  }

  export type SaleDetailCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutSaleInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type SaleDetailUncheckedCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutSaleInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSaleNestedInput = {
    create?: XOR<UserCreateWithoutSaleInput, UserUncheckedCreateWithoutSaleInput>
    connectOrCreate?: UserCreateOrConnectWithoutSaleInput
    upsert?: UserUpsertWithoutSaleInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSaleInput, UserUpdateWithoutSaleInput>, UserUncheckedUpdateWithoutSaleInput>
  }

  export type CustomerUpdateOneRequiredWithoutSaleNestedInput = {
    create?: XOR<CustomerCreateWithoutSaleInput, CustomerUncheckedCreateWithoutSaleInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSaleInput
    upsert?: CustomerUpsertWithoutSaleInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutSaleInput, CustomerUpdateWithoutSaleInput>, CustomerUncheckedUpdateWithoutSaleInput>
  }

  export type SaleDetailUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutSaleInput | SaleDetailUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutSaleInput | SaleDetailUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutSaleInput | SaleDetailUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutSaleNestedInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSaleInput | PaymentUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSaleInput | PaymentUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSaleInput | PaymentUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type SaleDetailUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput> | SaleDetailCreateWithoutSaleInput[] | SaleDetailUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleDetailCreateOrConnectWithoutSaleInput | SaleDetailCreateOrConnectWithoutSaleInput[]
    upsert?: SaleDetailUpsertWithWhereUniqueWithoutSaleInput | SaleDetailUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleDetailCreateManySaleInputEnvelope
    set?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    disconnect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    delete?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    connect?: SaleDetailWhereUniqueInput | SaleDetailWhereUniqueInput[]
    update?: SaleDetailUpdateWithWhereUniqueWithoutSaleInput | SaleDetailUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleDetailUpdateManyWithWhereWithoutSaleInput | SaleDetailUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput> | PaymentCreateWithoutSaleInput[] | PaymentUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSaleInput | PaymentCreateOrConnectWithoutSaleInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSaleInput | PaymentUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: PaymentCreateManySaleInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSaleInput | PaymentUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSaleInput | PaymentUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutSaleDetailInput = {
    create?: XOR<CustomerCreateWithoutSaleDetailInput, CustomerUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSaleDetailInput
    connect?: CustomerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSaleDetailInput = {
    create?: XOR<UserCreateWithoutSaleDetailInput, UserUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: UserCreateOrConnectWithoutSaleDetailInput
    connect?: UserWhereUniqueInput
  }

  export type SaleCreateNestedOneWithoutSaleDetailInput = {
    create?: XOR<SaleCreateWithoutSaleDetailInput, SaleUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: SaleCreateOrConnectWithoutSaleDetailInput
    connect?: SaleWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutSaleDetailInput = {
    create?: XOR<ProductCreateWithoutSaleDetailInput, ProductUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSaleDetailInput
    connect?: ProductWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutSaleDetailInput = {
    create?: XOR<ServiceCreateWithoutSaleDetailInput, ServiceUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutSaleDetailInput
    connect?: ServiceWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutSaleDetailNestedInput = {
    create?: XOR<CustomerCreateWithoutSaleDetailInput, CustomerUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSaleDetailInput
    upsert?: CustomerUpsertWithoutSaleDetailInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutSaleDetailInput, CustomerUpdateWithoutSaleDetailInput>, CustomerUncheckedUpdateWithoutSaleDetailInput>
  }

  export type UserUpdateOneRequiredWithoutSaleDetailNestedInput = {
    create?: XOR<UserCreateWithoutSaleDetailInput, UserUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: UserCreateOrConnectWithoutSaleDetailInput
    upsert?: UserUpsertWithoutSaleDetailInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSaleDetailInput, UserUpdateWithoutSaleDetailInput>, UserUncheckedUpdateWithoutSaleDetailInput>
  }

  export type SaleUpdateOneRequiredWithoutSaleDetailNestedInput = {
    create?: XOR<SaleCreateWithoutSaleDetailInput, SaleUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: SaleCreateOrConnectWithoutSaleDetailInput
    upsert?: SaleUpsertWithoutSaleDetailInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutSaleDetailInput, SaleUpdateWithoutSaleDetailInput>, SaleUncheckedUpdateWithoutSaleDetailInput>
  }

  export type ProductUpdateOneWithoutSaleDetailNestedInput = {
    create?: XOR<ProductCreateWithoutSaleDetailInput, ProductUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSaleDetailInput
    upsert?: ProductUpsertWithoutSaleDetailInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSaleDetailInput, ProductUpdateWithoutSaleDetailInput>, ProductUncheckedUpdateWithoutSaleDetailInput>
  }

  export type ServiceUpdateOneWithoutSaleDetailNestedInput = {
    create?: XOR<ServiceCreateWithoutSaleDetailInput, ServiceUncheckedCreateWithoutSaleDetailInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutSaleDetailInput
    upsert?: ServiceUpsertWithoutSaleDetailInput
    disconnect?: ServiceWhereInput | boolean
    delete?: ServiceWhereInput | boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutSaleDetailInput, ServiceUpdateWithoutSaleDetailInput>, ServiceUncheckedUpdateWithoutSaleDetailInput>
  }

  export type UserCreateNestedOneWithoutPaymentInput = {
    create?: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentInput
    connect?: UserWhereUniqueInput
  }

  export type SaleCreateNestedOneWithoutPaymentInput = {
    create?: XOR<SaleCreateWithoutPaymentInput, SaleUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: SaleCreateOrConnectWithoutPaymentInput
    connect?: SaleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentInput
    upsert?: UserUpsertWithoutPaymentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentInput, UserUpdateWithoutPaymentInput>, UserUncheckedUpdateWithoutPaymentInput>
  }

  export type SaleUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<SaleCreateWithoutPaymentInput, SaleUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: SaleCreateOrConnectWithoutPaymentInput
    upsert?: SaleUpsertWithoutPaymentInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutPaymentInput, SaleUpdateWithoutPaymentInput>, SaleUncheckedUpdateWithoutPaymentInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type NestedEnumProductUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductUnit | EnumProductUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumProductUnitFilter<$PrismaModel> | $Enums.ProductUnit
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type NestedEnumProductUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductUnit | EnumProductUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductUnit[] | ListEnumProductUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumProductUnitWithAggregatesFilter<$PrismaModel> | $Enums.ProductUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductUnitFilter<$PrismaModel>
    _max?: NestedEnumProductUnitFilter<$PrismaModel>
  }

  export type NestedEnumServiceUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceUnit | EnumServiceUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceUnitFilter<$PrismaModel> | $Enums.ServiceUnit
  }

  export type NestedEnumServiceUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceUnit | EnumServiceUnitFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceUnit[] | ListEnumServiceUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceUnitWithAggregatesFilter<$PrismaModel> | $Enums.ServiceUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceUnitFilter<$PrismaModel>
    _max?: NestedEnumServiceUnitFilter<$PrismaModel>
  }

  export type NestedEnumUsageContextFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageContext | EnumUsageContextFieldRefInput<$PrismaModel>
    in?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageContextFilter<$PrismaModel> | $Enums.UsageContext
  }

  export type NestedEnumUsageContextWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageContext | EnumUsageContextFieldRefInput<$PrismaModel>
    in?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageContext[] | ListEnumUsageContextFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageContextWithAggregatesFilter<$PrismaModel> | $Enums.UsageContext
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUsageContextFilter<$PrismaModel>
    _max?: NestedEnumUsageContextFilter<$PrismaModel>
  }

  export type CustomerCreateWithoutCreatedByInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Sale?: SaleCreateNestedManyWithoutCustomerInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutCreatedByInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Sale?: SaleUncheckedCreateNestedManyWithoutCustomerInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutCreatedByInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutCreatedByInput, CustomerUncheckedCreateWithoutCreatedByInput>
  }

  export type CustomerCreateManyCreatedByInputEnvelope = {
    data: CustomerCreateManyCreatedByInput | CustomerCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutUserInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutUserInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    categoryId: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutUserInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput>
  }

  export type ProductCreateManyUserInputEnvelope = {
    data: ProductCreateManyUserInput | ProductCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutUserInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutServicesInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutUserInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    categoryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutUserInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput>
  }

  export type ServiceCreateManyUserInputEnvelope = {
    data: ServiceCreateManyUserInput | ServiceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutUserInput = {
    categoryId?: string
    categoryName: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserInput = {
    categoryId?: string
    categoryName: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutUserInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryCreateManyUserInputEnvelope = {
    data: CategoryCreateManyUserInput | CategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SaleCreateWithoutUserInput = {
    saleId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSaleInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutSaleInput
    Payment?: PaymentCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutUserInput = {
    saleId: string
    saleCustomerId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutSaleInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutUserInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput>
  }

  export type SaleCreateManyUserInputEnvelope = {
    data: SaleCreateManyUserInput | SaleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    paymentId: string
    paymentAmount: number
    paymentMethod: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Sale: SaleCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    paymentId: string
    saleId: string
    paymentAmount: number
    paymentMethod: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SaleDetailCreateWithoutUserInput = {
    saleDetailId: string
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSaleDetailInput
    sale: SaleCreateNestedOneWithoutSaleDetailInput
    product?: ProductCreateNestedOneWithoutSaleDetailInput
    service?: ServiceCreateNestedOneWithoutSaleDetailInput
  }

  export type SaleDetailUncheckedCreateWithoutUserInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailCreateOrConnectWithoutUserInput = {
    where: SaleDetailWhereUniqueInput
    create: XOR<SaleDetailCreateWithoutUserInput, SaleDetailUncheckedCreateWithoutUserInput>
  }

  export type SaleDetailCreateManyUserInputEnvelope = {
    data: SaleDetailCreateManyUserInput | SaleDetailCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CustomerWhereUniqueInput
    update: XOR<CustomerUpdateWithoutCreatedByInput, CustomerUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CustomerCreateWithoutCreatedByInput, CustomerUncheckedCreateWithoutCreatedByInput>
  }

  export type CustomerUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CustomerWhereUniqueInput
    data: XOR<CustomerUpdateWithoutCreatedByInput, CustomerUncheckedUpdateWithoutCreatedByInput>
  }

  export type CustomerUpdateManyWithWhereWithoutCreatedByInput = {
    where: CustomerScalarWhereInput
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CustomerScalarWhereInput = {
    AND?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    OR?: CustomerScalarWhereInput[]
    NOT?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    customerId?: StringFilter<"Customer"> | string
    customerFirstName?: StringFilter<"Customer"> | string
    customerLastName?: StringFilter<"Customer"> | string
    customerEmail?: StringNullableFilter<"Customer"> | string | null
    customerCodePhoneNumber?: StringNullableFilter<"Customer"> | string | null
    customerPhoneNumber?: StringNullableFilter<"Customer"> | string | null
    customerDocumentType?: StringNullableFilter<"Customer"> | string | null
    customerDocumentNumber?: StringNullableFilter<"Customer"> | string | null
    customerComment?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    createdByUserId?: StringFilter<"Customer"> | string
  }

  export type ProductUpsertWithWhereUniqueWithoutUserInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutUserInput, ProductUncheckedUpdateWithoutUserInput>
    create: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutUserInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutUserInput, ProductUncheckedUpdateWithoutUserInput>
  }

  export type ProductUpdateManyWithWhereWithoutUserInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutUserInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    productId?: StringFilter<"Product"> | string
    productName?: StringFilter<"Product"> | string
    productDescription?: StringNullableFilter<"Product"> | string | null
    productSKU?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    productPrice?: IntFilter<"Product"> | number
    productPriceFixed?: BoolNullableFilter<"Product"> | boolean | null
    productStatus?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    productUnit?: EnumProductUnitFilter<"Product"> | $Enums.ProductUnit
    createdByUserId?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutUserInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutUserInput, ServiceUncheckedUpdateWithoutUserInput>
    create: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutUserInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutUserInput, ServiceUncheckedUpdateWithoutUserInput>
  }

  export type ServiceUpdateManyWithWhereWithoutUserInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutUserInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    serviceId?: StringFilter<"Service"> | string
    serviceName?: StringFilter<"Service"> | string
    serviceDescription?: StringNullableFilter<"Service"> | string | null
    serviceSKU?: StringFilter<"Service"> | string
    servicePrice?: IntFilter<"Service"> | number
    servicePriceFixed?: BoolNullableFilter<"Service"> | boolean | null
    serviceStatus?: EnumProductStatusFilter<"Service"> | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFilter<"Service"> | $Enums.ServiceUnit
    categoryId?: StringFilter<"Service"> | string
    createdByUserId?: StringFilter<"Service"> | string
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type CategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUpdateManyWithWhereWithoutUserInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    categoryId?: StringFilter<"Category"> | string
    categoryName?: StringFilter<"Category"> | string
    createdByUserId?: StringFilter<"Category"> | string
    allowedFor?: EnumUsageContextFilter<"Category"> | $Enums.UsageContext
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type SaleUpsertWithWhereUniqueWithoutUserInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutUserInput, SaleUncheckedUpdateWithoutUserInput>
    create: XOR<SaleCreateWithoutUserInput, SaleUncheckedCreateWithoutUserInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutUserInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutUserInput, SaleUncheckedUpdateWithoutUserInput>
  }

  export type SaleUpdateManyWithWhereWithoutUserInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutUserInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    saleId?: StringFilter<"Sale"> | string
    saleCustomerId?: StringFilter<"Sale"> | string
    saleTotal?: IntFilter<"Sale"> | number
    saleTotalPayments?: IntFilter<"Sale"> | number
    salePendingAmount?: IntFilter<"Sale"> | number
    createdByUserId?: StringFilter<"Sale"> | string
    saleComment?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    paymentId?: StringFilter<"Payment"> | string
    saleId?: StringFilter<"Payment"> | string
    paymentAmount?: IntFilter<"Payment"> | number
    paymentMethod?: StringFilter<"Payment"> | string
    createdByUserId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type SaleDetailUpsertWithWhereUniqueWithoutUserInput = {
    where: SaleDetailWhereUniqueInput
    update: XOR<SaleDetailUpdateWithoutUserInput, SaleDetailUncheckedUpdateWithoutUserInput>
    create: XOR<SaleDetailCreateWithoutUserInput, SaleDetailUncheckedCreateWithoutUserInput>
  }

  export type SaleDetailUpdateWithWhereUniqueWithoutUserInput = {
    where: SaleDetailWhereUniqueInput
    data: XOR<SaleDetailUpdateWithoutUserInput, SaleDetailUncheckedUpdateWithoutUserInput>
  }

  export type SaleDetailUpdateManyWithWhereWithoutUserInput = {
    where: SaleDetailScalarWhereInput
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyWithoutUserInput>
  }

  export type SaleDetailScalarWhereInput = {
    AND?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
    OR?: SaleDetailScalarWhereInput[]
    NOT?: SaleDetailScalarWhereInput | SaleDetailScalarWhereInput[]
    saleDetailId?: StringFilter<"SaleDetail"> | string
    saleId?: StringFilter<"SaleDetail"> | string
    saleDetailProductId?: StringNullableFilter<"SaleDetail"> | string | null
    saleDetailServiceId?: StringNullableFilter<"SaleDetail"> | string | null
    saleDetailQuantity?: IntFilter<"SaleDetail"> | number
    saleDetailPrice?: IntFilter<"SaleDetail"> | number
    saleDetailTotal?: IntFilter<"SaleDetail"> | number
    saleDetailType?: StringFilter<"SaleDetail"> | string
    createdByUserId?: StringFilter<"SaleDetail"> | string
    saleCustomerId?: StringFilter<"SaleDetail"> | string
    createdAt?: DateTimeFilter<"SaleDetail"> | Date | string
    updatedAt?: DateTimeFilter<"SaleDetail"> | Date | string
  }

  export type UserCreateWithoutCustomersInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    Product?: ProductCreateNestedManyWithoutUserInput
    Service?: ServiceCreateNestedManyWithoutUserInput
    Category?: CategoryCreateNestedManyWithoutUserInput
    Sale?: SaleCreateNestedManyWithoutUserInput
    Payment?: PaymentCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCustomersInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    Product?: ProductUncheckedCreateNestedManyWithoutUserInput
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
    Category?: CategoryUncheckedCreateNestedManyWithoutUserInput
    Sale?: SaleUncheckedCreateNestedManyWithoutUserInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCustomersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
  }

  export type SaleCreateWithoutCustomerInput = {
    saleId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSaleInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutSaleInput
    Payment?: PaymentCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutCustomerInput = {
    saleId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: string
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutSaleInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutCustomerInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput>
  }

  export type SaleCreateManyCustomerInputEnvelope = {
    data: SaleCreateManyCustomerInput | SaleCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type SaleDetailCreateWithoutCustomerInput = {
    saleDetailId: string
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSaleDetailInput
    sale: SaleCreateNestedOneWithoutSaleDetailInput
    product?: ProductCreateNestedOneWithoutSaleDetailInput
    service?: ServiceCreateNestedOneWithoutSaleDetailInput
  }

  export type SaleDetailUncheckedCreateWithoutCustomerInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailCreateOrConnectWithoutCustomerInput = {
    where: SaleDetailWhereUniqueInput
    create: XOR<SaleDetailCreateWithoutCustomerInput, SaleDetailUncheckedCreateWithoutCustomerInput>
  }

  export type SaleDetailCreateManyCustomerInputEnvelope = {
    data: SaleDetailCreateManyCustomerInput | SaleDetailCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCustomersInput = {
    update: XOR<UserUpdateWithoutCustomersInput, UserUncheckedUpdateWithoutCustomersInput>
    create: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomersInput, UserUncheckedUpdateWithoutCustomersInput>
  }

  export type UserUpdateWithoutCustomersInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Product?: ProductUpdateManyWithoutUserNestedInput
    Service?: ServiceUpdateManyWithoutUserNestedInput
    Category?: CategoryUpdateManyWithoutUserNestedInput
    Sale?: SaleUpdateManyWithoutUserNestedInput
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomersInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Product?: ProductUncheckedUpdateManyWithoutUserNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
    Category?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    Sale?: SaleUncheckedUpdateManyWithoutUserNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleUpsertWithWhereUniqueWithoutCustomerInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutCustomerInput, SaleUncheckedUpdateWithoutCustomerInput>
    create: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutCustomerInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutCustomerInput, SaleUncheckedUpdateWithoutCustomerInput>
  }

  export type SaleUpdateManyWithWhereWithoutCustomerInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutCustomerInput>
  }

  export type SaleDetailUpsertWithWhereUniqueWithoutCustomerInput = {
    where: SaleDetailWhereUniqueInput
    update: XOR<SaleDetailUpdateWithoutCustomerInput, SaleDetailUncheckedUpdateWithoutCustomerInput>
    create: XOR<SaleDetailCreateWithoutCustomerInput, SaleDetailUncheckedCreateWithoutCustomerInput>
  }

  export type SaleDetailUpdateWithWhereUniqueWithoutCustomerInput = {
    where: SaleDetailWhereUniqueInput
    data: XOR<SaleDetailUpdateWithoutCustomerInput, SaleDetailUncheckedUpdateWithoutCustomerInput>
  }

  export type SaleDetailUpdateManyWithWhereWithoutCustomerInput = {
    where: SaleDetailScalarWhereInput
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CategoryCreateWithoutProductsInput = {
    categoryId?: string
    categoryName: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutCategoryInput
    user: UserCreateNestedOneWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    categoryId?: string
    categoryName: string
    createdByUserId: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type UserCreateWithoutProductInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutCreatedByInput
    Service?: ServiceCreateNestedManyWithoutUserInput
    Category?: CategoryCreateNestedManyWithoutUserInput
    Sale?: SaleCreateNestedManyWithoutUserInput
    Payment?: PaymentCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProductInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutCreatedByInput
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
    Category?: CategoryUncheckedCreateNestedManyWithoutUserInput
    Sale?: SaleUncheckedCreateNestedManyWithoutUserInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProductInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProductInput, UserUncheckedCreateWithoutProductInput>
  }

  export type SaleDetailCreateWithoutProductInput = {
    saleDetailId: string
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSaleDetailInput
    user: UserCreateNestedOneWithoutSaleDetailInput
    sale: SaleCreateNestedOneWithoutSaleDetailInput
    service?: ServiceCreateNestedOneWithoutSaleDetailInput
  }

  export type SaleDetailUncheckedCreateWithoutProductInput = {
    saleDetailId: string
    saleId: string
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailCreateOrConnectWithoutProductInput = {
    where: SaleDetailWhereUniqueInput
    create: XOR<SaleDetailCreateWithoutProductInput, SaleDetailUncheckedCreateWithoutProductInput>
  }

  export type SaleDetailCreateManyProductInputEnvelope = {
    data: SaleDetailCreateManyProductInput | SaleDetailCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutCategoryNestedInput
    user?: UserUpdateOneRequiredWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type UserUpsertWithoutProductInput = {
    update: XOR<UserUpdateWithoutProductInput, UserUncheckedUpdateWithoutProductInput>
    create: XOR<UserCreateWithoutProductInput, UserUncheckedCreateWithoutProductInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProductInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProductInput, UserUncheckedUpdateWithoutProductInput>
  }

  export type UserUpdateWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutCreatedByNestedInput
    Service?: ServiceUpdateManyWithoutUserNestedInput
    Category?: CategoryUpdateManyWithoutUserNestedInput
    Sale?: SaleUpdateManyWithoutUserNestedInput
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutCreatedByNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
    Category?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    Sale?: SaleUncheckedUpdateManyWithoutUserNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleDetailUpsertWithWhereUniqueWithoutProductInput = {
    where: SaleDetailWhereUniqueInput
    update: XOR<SaleDetailUpdateWithoutProductInput, SaleDetailUncheckedUpdateWithoutProductInput>
    create: XOR<SaleDetailCreateWithoutProductInput, SaleDetailUncheckedCreateWithoutProductInput>
  }

  export type SaleDetailUpdateWithWhereUniqueWithoutProductInput = {
    where: SaleDetailWhereUniqueInput
    data: XOR<SaleDetailUpdateWithoutProductInput, SaleDetailUncheckedUpdateWithoutProductInput>
  }

  export type SaleDetailUpdateManyWithWhereWithoutProductInput = {
    where: SaleDetailScalarWhereInput
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyWithoutProductInput>
  }

  export type CategoryCreateWithoutServicesInput = {
    categoryId?: string
    categoryName: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
    user: UserCreateNestedOneWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutServicesInput = {
    categoryId?: string
    categoryName: string
    createdByUserId: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutServicesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
  }

  export type UserCreateWithoutServiceInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutCreatedByInput
    Product?: ProductCreateNestedManyWithoutUserInput
    Category?: CategoryCreateNestedManyWithoutUserInput
    Sale?: SaleCreateNestedManyWithoutUserInput
    Payment?: PaymentCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutServiceInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutCreatedByInput
    Product?: ProductUncheckedCreateNestedManyWithoutUserInput
    Category?: CategoryUncheckedCreateNestedManyWithoutUserInput
    Sale?: SaleUncheckedCreateNestedManyWithoutUserInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutServiceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
  }

  export type SaleDetailCreateWithoutServiceInput = {
    saleDetailId: string
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSaleDetailInput
    user: UserCreateNestedOneWithoutSaleDetailInput
    sale: SaleCreateNestedOneWithoutSaleDetailInput
    product?: ProductCreateNestedOneWithoutSaleDetailInput
  }

  export type SaleDetailUncheckedCreateWithoutServiceInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailCreateOrConnectWithoutServiceInput = {
    where: SaleDetailWhereUniqueInput
    create: XOR<SaleDetailCreateWithoutServiceInput, SaleDetailUncheckedCreateWithoutServiceInput>
  }

  export type SaleDetailCreateManyServiceInputEnvelope = {
    data: SaleDetailCreateManyServiceInput | SaleDetailCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutServicesInput = {
    update: XOR<CategoryUpdateWithoutServicesInput, CategoryUncheckedUpdateWithoutServicesInput>
    create: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutServicesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutServicesInput, CategoryUncheckedUpdateWithoutServicesInput>
  }

  export type CategoryUpdateWithoutServicesInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
    user?: UserUpdateOneRequiredWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutServicesInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type UserUpsertWithoutServiceInput = {
    update: XOR<UserUpdateWithoutServiceInput, UserUncheckedUpdateWithoutServiceInput>
    create: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServiceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServiceInput, UserUncheckedUpdateWithoutServiceInput>
  }

  export type UserUpdateWithoutServiceInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUpdateManyWithoutUserNestedInput
    Category?: CategoryUpdateManyWithoutUserNestedInput
    Sale?: SaleUpdateManyWithoutUserNestedInput
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutServiceInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUncheckedUpdateManyWithoutUserNestedInput
    Category?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    Sale?: SaleUncheckedUpdateManyWithoutUserNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleDetailUpsertWithWhereUniqueWithoutServiceInput = {
    where: SaleDetailWhereUniqueInput
    update: XOR<SaleDetailUpdateWithoutServiceInput, SaleDetailUncheckedUpdateWithoutServiceInput>
    create: XOR<SaleDetailCreateWithoutServiceInput, SaleDetailUncheckedCreateWithoutServiceInput>
  }

  export type SaleDetailUpdateWithWhereUniqueWithoutServiceInput = {
    where: SaleDetailWhereUniqueInput
    data: XOR<SaleDetailUpdateWithoutServiceInput, SaleDetailUncheckedUpdateWithoutServiceInput>
  }

  export type SaleDetailUpdateManyWithWhereWithoutServiceInput = {
    where: SaleDetailScalarWhereInput
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyWithoutServiceInput>
  }

  export type ProductCreateWithoutCategoryInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProductInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutCategoryInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutServiceInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutCategoryInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceCreateManyCategoryInputEnvelope = {
    data: ServiceCreateManyCategoryInput | ServiceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCategoryInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutCreatedByInput
    Product?: ProductCreateNestedManyWithoutUserInput
    Service?: ServiceCreateNestedManyWithoutUserInput
    Sale?: SaleCreateNestedManyWithoutUserInput
    Payment?: PaymentCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoryInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutCreatedByInput
    Product?: ProductUncheckedCreateNestedManyWithoutUserInput
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
    Sale?: SaleUncheckedCreateNestedManyWithoutUserInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ServiceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
  }

  export type ServiceUpdateManyWithWhereWithoutCategoryInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserUpsertWithoutCategoryInput = {
    update: XOR<UserUpdateWithoutCategoryInput, UserUncheckedUpdateWithoutCategoryInput>
    create: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCategoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCategoryInput, UserUncheckedUpdateWithoutCategoryInput>
  }

  export type UserUpdateWithoutCategoryInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUpdateManyWithoutUserNestedInput
    Service?: ServiceUpdateManyWithoutUserNestedInput
    Sale?: SaleUpdateManyWithoutUserNestedInput
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCategoryInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUncheckedUpdateManyWithoutUserNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
    Sale?: SaleUncheckedUpdateManyWithoutUserNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSaleInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutCreatedByInput
    Product?: ProductCreateNestedManyWithoutUserInput
    Service?: ServiceCreateNestedManyWithoutUserInput
    Category?: CategoryCreateNestedManyWithoutUserInput
    Payment?: PaymentCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSaleInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutCreatedByInput
    Product?: ProductUncheckedCreateNestedManyWithoutUserInput
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
    Category?: CategoryUncheckedCreateNestedManyWithoutUserInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSaleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSaleInput, UserUncheckedCreateWithoutSaleInput>
  }

  export type CustomerCreateWithoutSaleInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCustomersInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutSaleInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUserId: string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutSaleInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutSaleInput, CustomerUncheckedCreateWithoutSaleInput>
  }

  export type SaleDetailCreateWithoutSaleInput = {
    saleDetailId: string
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSaleDetailInput
    user: UserCreateNestedOneWithoutSaleDetailInput
    product?: ProductCreateNestedOneWithoutSaleDetailInput
    service?: ServiceCreateNestedOneWithoutSaleDetailInput
  }

  export type SaleDetailUncheckedCreateWithoutSaleInput = {
    saleDetailId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailCreateOrConnectWithoutSaleInput = {
    where: SaleDetailWhereUniqueInput
    create: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput>
  }

  export type SaleDetailCreateManySaleInputEnvelope = {
    data: SaleDetailCreateManySaleInput | SaleDetailCreateManySaleInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutSaleInput = {
    paymentId: string
    paymentAmount: number
    paymentMethod: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutSaleInput = {
    paymentId: string
    paymentAmount: number
    paymentMethod: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutSaleInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput>
  }

  export type PaymentCreateManySaleInputEnvelope = {
    data: PaymentCreateManySaleInput | PaymentCreateManySaleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSaleInput = {
    update: XOR<UserUpdateWithoutSaleInput, UserUncheckedUpdateWithoutSaleInput>
    create: XOR<UserCreateWithoutSaleInput, UserUncheckedCreateWithoutSaleInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSaleInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSaleInput, UserUncheckedUpdateWithoutSaleInput>
  }

  export type UserUpdateWithoutSaleInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUpdateManyWithoutUserNestedInput
    Service?: ServiceUpdateManyWithoutUserNestedInput
    Category?: CategoryUpdateManyWithoutUserNestedInput
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSaleInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUncheckedUpdateManyWithoutUserNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
    Category?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CustomerUpsertWithoutSaleInput = {
    update: XOR<CustomerUpdateWithoutSaleInput, CustomerUncheckedUpdateWithoutSaleInput>
    create: XOR<CustomerCreateWithoutSaleInput, CustomerUncheckedCreateWithoutSaleInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutSaleInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutSaleInput, CustomerUncheckedUpdateWithoutSaleInput>
  }

  export type CustomerUpdateWithoutSaleInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCustomersNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutSaleInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type SaleDetailUpsertWithWhereUniqueWithoutSaleInput = {
    where: SaleDetailWhereUniqueInput
    update: XOR<SaleDetailUpdateWithoutSaleInput, SaleDetailUncheckedUpdateWithoutSaleInput>
    create: XOR<SaleDetailCreateWithoutSaleInput, SaleDetailUncheckedCreateWithoutSaleInput>
  }

  export type SaleDetailUpdateWithWhereUniqueWithoutSaleInput = {
    where: SaleDetailWhereUniqueInput
    data: XOR<SaleDetailUpdateWithoutSaleInput, SaleDetailUncheckedUpdateWithoutSaleInput>
  }

  export type SaleDetailUpdateManyWithWhereWithoutSaleInput = {
    where: SaleDetailScalarWhereInput
    data: XOR<SaleDetailUpdateManyMutationInput, SaleDetailUncheckedUpdateManyWithoutSaleInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutSaleInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutSaleInput, PaymentUncheckedUpdateWithoutSaleInput>
    create: XOR<PaymentCreateWithoutSaleInput, PaymentUncheckedCreateWithoutSaleInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutSaleInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutSaleInput, PaymentUncheckedUpdateWithoutSaleInput>
  }

  export type PaymentUpdateManyWithWhereWithoutSaleInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutSaleInput>
  }

  export type CustomerCreateWithoutSaleDetailInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCustomersInput
    Sale?: SaleCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutSaleDetailInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUserId: string
    Sale?: SaleUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutSaleDetailInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutSaleDetailInput, CustomerUncheckedCreateWithoutSaleDetailInput>
  }

  export type UserCreateWithoutSaleDetailInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutCreatedByInput
    Product?: ProductCreateNestedManyWithoutUserInput
    Service?: ServiceCreateNestedManyWithoutUserInput
    Category?: CategoryCreateNestedManyWithoutUserInput
    Sale?: SaleCreateNestedManyWithoutUserInput
    Payment?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSaleDetailInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutCreatedByInput
    Product?: ProductUncheckedCreateNestedManyWithoutUserInput
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
    Category?: CategoryUncheckedCreateNestedManyWithoutUserInput
    Sale?: SaleUncheckedCreateNestedManyWithoutUserInput
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSaleDetailInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSaleDetailInput, UserUncheckedCreateWithoutSaleDetailInput>
  }

  export type SaleCreateWithoutSaleDetailInput = {
    saleId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSaleInput
    customer: CustomerCreateNestedOneWithoutSaleInput
    Payment?: PaymentCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutSaleDetailInput = {
    saleId: string
    saleCustomerId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: string
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Payment?: PaymentUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutSaleDetailInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutSaleDetailInput, SaleUncheckedCreateWithoutSaleDetailInput>
  }

  export type ProductCreateWithoutSaleDetailInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    user: UserCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSaleDetailInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    categoryId: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutSaleDetailInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSaleDetailInput, ProductUncheckedCreateWithoutSaleDetailInput>
  }

  export type ServiceCreateWithoutSaleDetailInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutServicesInput
    user: UserCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutSaleDetailInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    categoryId: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutSaleDetailInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutSaleDetailInput, ServiceUncheckedCreateWithoutSaleDetailInput>
  }

  export type CustomerUpsertWithoutSaleDetailInput = {
    update: XOR<CustomerUpdateWithoutSaleDetailInput, CustomerUncheckedUpdateWithoutSaleDetailInput>
    create: XOR<CustomerCreateWithoutSaleDetailInput, CustomerUncheckedCreateWithoutSaleDetailInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutSaleDetailInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutSaleDetailInput, CustomerUncheckedUpdateWithoutSaleDetailInput>
  }

  export type CustomerUpdateWithoutSaleDetailInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCustomersNestedInput
    Sale?: SaleUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutSaleDetailInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    Sale?: SaleUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserUpsertWithoutSaleDetailInput = {
    update: XOR<UserUpdateWithoutSaleDetailInput, UserUncheckedUpdateWithoutSaleDetailInput>
    create: XOR<UserCreateWithoutSaleDetailInput, UserUncheckedCreateWithoutSaleDetailInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSaleDetailInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSaleDetailInput, UserUncheckedUpdateWithoutSaleDetailInput>
  }

  export type UserUpdateWithoutSaleDetailInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUpdateManyWithoutUserNestedInput
    Service?: ServiceUpdateManyWithoutUserNestedInput
    Category?: CategoryUpdateManyWithoutUserNestedInput
    Sale?: SaleUpdateManyWithoutUserNestedInput
    Payment?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSaleDetailInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUncheckedUpdateManyWithoutUserNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
    Category?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    Sale?: SaleUncheckedUpdateManyWithoutUserNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleUpsertWithoutSaleDetailInput = {
    update: XOR<SaleUpdateWithoutSaleDetailInput, SaleUncheckedUpdateWithoutSaleDetailInput>
    create: XOR<SaleCreateWithoutSaleDetailInput, SaleUncheckedCreateWithoutSaleDetailInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutSaleDetailInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutSaleDetailInput, SaleUncheckedUpdateWithoutSaleDetailInput>
  }

  export type SaleUpdateWithoutSaleDetailInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSaleNestedInput
    customer?: CustomerUpdateOneRequiredWithoutSaleNestedInput
    Payment?: PaymentUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutSaleDetailInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type ProductUpsertWithoutSaleDetailInput = {
    update: XOR<ProductUpdateWithoutSaleDetailInput, ProductUncheckedUpdateWithoutSaleDetailInput>
    create: XOR<ProductCreateWithoutSaleDetailInput, ProductUncheckedCreateWithoutSaleDetailInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSaleDetailInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSaleDetailInput, ProductUncheckedUpdateWithoutSaleDetailInput>
  }

  export type ProductUpdateWithoutSaleDetailInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    user?: UserUpdateOneRequiredWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSaleDetailInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpsertWithoutSaleDetailInput = {
    update: XOR<ServiceUpdateWithoutSaleDetailInput, ServiceUncheckedUpdateWithoutSaleDetailInput>
    create: XOR<ServiceCreateWithoutSaleDetailInput, ServiceUncheckedCreateWithoutSaleDetailInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutSaleDetailInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutSaleDetailInput, ServiceUncheckedUpdateWithoutSaleDetailInput>
  }

  export type ServiceUpdateWithoutSaleDetailInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutSaleDetailInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    categoryId?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPaymentInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutCreatedByInput
    Product?: ProductCreateNestedManyWithoutUserInput
    Service?: ServiceCreateNestedManyWithoutUserInput
    Category?: CategoryCreateNestedManyWithoutUserInput
    Sale?: SaleCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentInput = {
    userId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    userLastConnection?: Date | string | null
    userCodePhoneNumber: string
    userPhoneNumber: string
    userDocumentType: string
    userDocumentNumber: string
    userRole: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutCreatedByInput
    Product?: ProductUncheckedCreateNestedManyWithoutUserInput
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
    Category?: CategoryUncheckedCreateNestedManyWithoutUserInput
    Sale?: SaleUncheckedCreateNestedManyWithoutUserInput
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
  }

  export type SaleCreateWithoutPaymentInput = {
    saleId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSaleInput
    customer: CustomerCreateNestedOneWithoutSaleInput
    SaleDetail?: SaleDetailCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutPaymentInput = {
    saleId: string
    saleCustomerId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: string
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    SaleDetail?: SaleDetailUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutPaymentInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutPaymentInput, SaleUncheckedCreateWithoutPaymentInput>
  }

  export type UserUpsertWithoutPaymentInput = {
    update: XOR<UserUpdateWithoutPaymentInput, UserUncheckedUpdateWithoutPaymentInput>
    create: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentInput, UserUncheckedUpdateWithoutPaymentInput>
  }

  export type UserUpdateWithoutPaymentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUpdateManyWithoutUserNestedInput
    Service?: ServiceUpdateManyWithoutUserNestedInput
    Category?: CategoryUpdateManyWithoutUserNestedInput
    Sale?: SaleUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userFirstName?: StringFieldUpdateOperationsInput | string
    userLastName?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userLastConnection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userCodePhoneNumber?: StringFieldUpdateOperationsInput | string
    userPhoneNumber?: StringFieldUpdateOperationsInput | string
    userDocumentType?: StringFieldUpdateOperationsInput | string
    userDocumentNumber?: StringFieldUpdateOperationsInput | string
    userRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutCreatedByNestedInput
    Product?: ProductUncheckedUpdateManyWithoutUserNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
    Category?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    Sale?: SaleUncheckedUpdateManyWithoutUserNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SaleUpsertWithoutPaymentInput = {
    update: XOR<SaleUpdateWithoutPaymentInput, SaleUncheckedUpdateWithoutPaymentInput>
    create: XOR<SaleCreateWithoutPaymentInput, SaleUncheckedCreateWithoutPaymentInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutPaymentInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutPaymentInput, SaleUncheckedUpdateWithoutPaymentInput>
  }

  export type SaleUpdateWithoutPaymentInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSaleNestedInput
    customer?: CustomerUpdateOneRequiredWithoutSaleNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutPaymentInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type CustomerCreateManyCreatedByInput = {
    customerId?: string
    customerFirstName: string
    customerLastName: string
    customerEmail?: string | null
    customerCodePhoneNumber?: string | null
    customerPhoneNumber?: string | null
    customerDocumentType?: string | null
    customerDocumentNumber?: string | null
    customerComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyUserInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    categoryId: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateManyUserInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    categoryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateManyUserInput = {
    categoryId?: string
    categoryName: string
    allowedFor: $Enums.UsageContext
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleCreateManyUserInput = {
    saleId: string
    saleCustomerId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyUserInput = {
    paymentId: string
    saleId: string
    paymentAmount: number
    paymentMethod: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailCreateManyUserInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateWithoutCreatedByInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Sale?: SaleUpdateManyWithoutCustomerNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutCreatedByInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Sale?: SaleUncheckedUpdateManyWithoutCustomerNestedInput
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateManyWithoutCreatedByInput = {
    customerId?: StringFieldUpdateOperationsInput | string
    customerFirstName?: StringFieldUpdateOperationsInput | string
    customerLastName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    customerCodePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentType?: NullableStringFieldUpdateOperationsInput | string | null
    customerDocumentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutUserInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutUserInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutUserInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpdateWithoutUserInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutUserInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutUserInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    categoryName?: StringFieldUpdateOperationsInput | string
    allowedFor?: EnumUsageContextFieldUpdateOperationsInput | $Enums.UsageContext
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUpdateWithoutUserInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSaleNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutSaleNestedInput
    Payment?: PaymentUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutUserInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutSaleNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutUserInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutUserInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Sale?: SaleUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUpdateWithoutUserInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSaleDetailNestedInput
    sale?: SaleUpdateOneRequiredWithoutSaleDetailNestedInput
    product?: ProductUpdateOneWithoutSaleDetailNestedInput
    service?: ServiceUpdateOneWithoutSaleDetailNestedInput
  }

  export type SaleDetailUncheckedUpdateWithoutUserInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUncheckedUpdateManyWithoutUserInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyCustomerInput = {
    saleId: string
    saleTotal: number
    saleTotalPayments: number
    salePendingAmount: number
    createdByUserId: string
    saleComment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailCreateManyCustomerInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleUpdateWithoutCustomerInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSaleNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutSaleNestedInput
    Payment?: PaymentUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutCustomerInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutSaleNestedInput
    Payment?: PaymentUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutCustomerInput = {
    saleId?: StringFieldUpdateOperationsInput | string
    saleTotal?: IntFieldUpdateOperationsInput | number
    saleTotalPayments?: IntFieldUpdateOperationsInput | number
    salePendingAmount?: IntFieldUpdateOperationsInput | number
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleComment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUpdateWithoutCustomerInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSaleDetailNestedInput
    sale?: SaleUpdateOneRequiredWithoutSaleDetailNestedInput
    product?: ProductUpdateOneWithoutSaleDetailNestedInput
    service?: ServiceUpdateOneWithoutSaleDetailNestedInput
  }

  export type SaleDetailUncheckedUpdateWithoutCustomerInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUncheckedUpdateManyWithoutCustomerInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailCreateManyProductInput = {
    saleDetailId: string
    saleId: string
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailUpdateWithoutProductInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSaleDetailNestedInput
    user?: UserUpdateOneRequiredWithoutSaleDetailNestedInput
    sale?: SaleUpdateOneRequiredWithoutSaleDetailNestedInput
    service?: ServiceUpdateOneWithoutSaleDetailNestedInput
  }

  export type SaleDetailUncheckedUpdateWithoutProductInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUncheckedUpdateManyWithoutProductInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailCreateManyServiceInput = {
    saleDetailId: string
    saleId: string
    saleDetailProductId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailUpdateWithoutServiceInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSaleDetailNestedInput
    user?: UserUpdateOneRequiredWithoutSaleDetailNestedInput
    sale?: SaleUpdateOneRequiredWithoutSaleDetailNestedInput
    product?: ProductUpdateOneWithoutSaleDetailNestedInput
  }

  export type SaleDetailUncheckedUpdateWithoutServiceInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUncheckedUpdateManyWithoutServiceInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    productId?: string
    productName: string
    productDescription?: string | null
    productSKU: string
    productPrice: number
    productPriceFixed?: boolean | null
    productStatus: $Enums.ProductStatus
    productUnit: $Enums.ProductUnit
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateManyCategoryInput = {
    serviceId?: string
    serviceName: string
    serviceDescription?: string | null
    serviceSKU: string
    servicePrice: number
    servicePriceFixed?: boolean | null
    serviceStatus: $Enums.ProductStatus
    serviceUnit: $Enums.ServiceUnit
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProductNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productDescription?: NullableStringFieldUpdateOperationsInput | string | null
    productSKU?: StringFieldUpdateOperationsInput | string
    productPrice?: IntFieldUpdateOperationsInput | number
    productPriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    productStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    productUnit?: EnumProductUnitFieldUpdateOperationsInput | $Enums.ProductUnit
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutCategoryInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
    SaleDetail?: SaleDetailUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCategoryInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SaleDetail?: SaleDetailUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryInput = {
    serviceId?: StringFieldUpdateOperationsInput | string
    serviceName?: StringFieldUpdateOperationsInput | string
    serviceDescription?: NullableStringFieldUpdateOperationsInput | string | null
    serviceSKU?: StringFieldUpdateOperationsInput | string
    servicePrice?: IntFieldUpdateOperationsInput | number
    servicePriceFixed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    serviceStatus?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    serviceUnit?: EnumServiceUnitFieldUpdateOperationsInput | $Enums.ServiceUnit
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailCreateManySaleInput = {
    saleDetailId: string
    saleDetailProductId?: string | null
    saleDetailServiceId?: string | null
    saleDetailQuantity: number
    saleDetailPrice: number
    saleDetailTotal: number
    saleDetailType: string
    createdByUserId: string
    saleCustomerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManySaleInput = {
    paymentId: string
    paymentAmount: number
    paymentMethod: string
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleDetailUpdateWithoutSaleInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSaleDetailNestedInput
    user?: UserUpdateOneRequiredWithoutSaleDetailNestedInput
    product?: ProductUpdateOneWithoutSaleDetailNestedInput
    service?: ServiceUpdateOneWithoutSaleDetailNestedInput
  }

  export type SaleDetailUncheckedUpdateWithoutSaleInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleDetailUncheckedUpdateManyWithoutSaleInput = {
    saleDetailId?: StringFieldUpdateOperationsInput | string
    saleDetailProductId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailServiceId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDetailQuantity?: IntFieldUpdateOperationsInput | number
    saleDetailPrice?: IntFieldUpdateOperationsInput | number
    saleDetailTotal?: IntFieldUpdateOperationsInput | number
    saleDetailType?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    saleCustomerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutSaleInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutSaleInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutSaleInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    paymentAmount?: IntFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
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