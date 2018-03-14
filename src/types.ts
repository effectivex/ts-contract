// tslint:disable:no-shadowed-variable
import * as Logger from 'bunyan';
import * as Joi from './joi';

export type Pick<T, K extends keyof T> = { [P in K]: T[P] };

export type NonNeverNames<T> = {
  [K in keyof T]: T[K] extends (null | undefined) ? never : K
}[keyof T];

export type FilterNever<T> = Pick<T, NonNeverNames<T>>;

export type JoiPrimitiveSchema =
  | Joi.StringSchema
  | Joi.NumberSchema
  | Joi.BooleanSchema
  | Joi.DateSchema;

export type Flatten<T> = { [K in keyof T]: T[K] };

export type ConvertType<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? Array<
        K extends Joi.ObjectSchema<infer REQ, infer P>
          ? (REQ extends true ? ExtractObject2<P> : (ExtractObject2<P> | undefined))
          : ConvertType2<K>
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K>
      ? (REQ extends true ? ExtractObject2<K> : (ExtractObject2<K> | undefined))
      : T;

/* Auto generated */

export type ConvertType3<T> = T extends JoiPrimitiveSchema ? ExtractPrimitive<T> : T;

export type ConvertType2<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? Array<K extends Joi.ObjectSchema<infer REQ, infer P> ? ExtractObject3<P> : ConvertType3<K>>
    : T extends Joi.ObjectSchema<infer REQ, infer K> ? ExtractObject3<K> : T;

// export type ExtractObject2<T> = { [K in keyof T]: ConvertType2<T[K]> };
export type ExtractObject3<T> = { [K in keyof T]: ConvertType3<T[K]> };

export type ExtractPrimitive<T> = T extends Joi.StringSchema<infer REQ>
  ? (REQ extends true ? string : (string | undefined))
  : T extends Joi.NumberSchema<infer REQ>
    ? (REQ extends true ? number : (number | undefined))
    : T extends Joi.BooleanSchema ? boolean : T extends Joi.DateSchema ? Date : T;

export type ExtractPrimitiveRequired<T> = T extends Joi.StringSchema<infer REQ>
  ? (REQ extends true ? string : never)
  : T extends Joi.NumberSchema<infer REQ>
    ? (REQ extends true ? number : never)
    : T extends Joi.BooleanSchema ? boolean : T extends Joi.DateSchema ? Date : T;

export type ExtractPrimitiveOptional<T> = T extends Joi.StringSchema<infer REQ>
  ? (REQ extends false ? string : never)
  : T extends Joi.NumberSchema<infer REQ>
    ? (REQ extends false ? number : never)
    : T extends Joi.BooleanSchema ? boolean : T extends Joi.DateSchema ? Date : T;

// export type ExtractPrimitiveRequired2<T> = T extends Joi.StringSchema<infer REQ>
//   ? (REQ extends true ? string : never)
//   : T extends Joi.NumberSchema<infer REQ>
//     ? (REQ extends true ? number : never)
//     : T extends Joi.BooleanSchema ? boolean : T extends Joi.DateSchema ? Date : T;

// export type ExtractPrimitiveOptional2<T> = T extends Joi.StringSchema<infer REQ>
//   ? (REQ extends false ? string : never)
//   : T extends Joi.NumberSchema<infer REQ>
//     ? (REQ extends false ? number : never)
//     : T extends Joi.BooleanSchema ? boolean : T extends Joi.DateSchema ? Date : T;

export type ConvertTypeRequired<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitiveRequired<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? Array<
        K extends Joi.ObjectSchema<infer REQ, infer P>
          ? (REQ extends true ? ExtractObject2<P> : (ExtractObject2<P> | undefined))
          : ConvertType2<K>
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K>
      ? (REQ extends true ? ExtractObject2<K> : (ExtractObject2<K> | undefined))
      : T;

export type ConvertTypeOptional<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitiveOptional<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? Array<
        K extends Joi.ObjectSchema<infer REQ, infer P>
          ? (REQ extends true ? ExtractObject2<P> : (ExtractObject2<P> | undefined))
          : ConvertType2<K>
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K>
      ? (REQ extends true ? ExtractObject2<K> : (ExtractObject2<K> | undefined))
      : T;

export type ConvertTypeRequired2<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitiveRequired<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? Array<
        K extends Joi.ObjectSchema<infer REQ, infer P>
          ? (REQ extends true ? ExtractObject3<P> : (ExtractObject3<P> | undefined))
          : ConvertType2<K>
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K>
      ? (REQ extends true ? ExtractObject3<K> : (ExtractObject3<K> | undefined))
      : T;

export type ConvertTypeOptional2<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitiveOptional<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? Array<
        K extends Joi.ObjectSchema<infer REQ, infer P>
          ? (REQ extends true ? ExtractObject3<P> : (ExtractObject3<P> | undefined))
          : ConvertType3<K>
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K>
      ? (REQ extends true ? ExtractObject3<K> : (ExtractObject3<K> | undefined))
      : T;

export type ExtractObjectOld<T> = { [K in keyof T]: ConvertType<T[K]> };

export type ExtractObjectRequiredBase<T> = { [K in keyof T]: ConvertTypeRequired<T[K]> };
export type ExtractObjectRequired<T> = FilterNever<ExtractObjectRequiredBase<T>>;

export type ExtractObjectOptionalBase<T> = { [K in keyof T]?: ConvertTypeOptional<T[K]> };
export type ExtractObjectOptional<T> = FilterNever<ExtractObjectOptionalBase<T>>;

export type ExtractObject<T> = Flatten<ExtractObjectRequired<T> & ExtractObjectOptional<T>>;

export type ExtractObjectRequiredBase2<T> = { [K in keyof T]: ConvertTypeRequired2<T[K]> };
export type ExtractObjectRequired2<T> = FilterNever<ExtractObjectRequiredBase2<T>>;

export type ExtractObjectOptionalBase2<T> = { [K in keyof T]?: ConvertTypeOptional2<T[K]> };
export type ExtractObjectOptional2<T> = FilterNever<ExtractObjectOptionalBase2<T>>;

export type ExtractObject2<T> = Flatten<ExtractObjectRequired2<T> & ExtractObjectOptional2<T>>;

/* Auto generated END */

export interface ContractOptions {
  sync?: boolean;
  removeOutput?: boolean;
}

export interface ContractConfig {
  removeFields: string[];
  debug: boolean;
  depth: number;
  maxArrayLength: number;
  getLogger: (serviceName: string) => Logger;
  getNextId: () => number;
}

export type SetSync<T> = T extends true
  ? (ContractOptions & { sync: true })
  : (ContractOptions & { sync: false | undefined });

export type MakeOptions<FN> = FN extends Promise<infer PT>
  ? (SetSync<false> | undefined)
  : SetSync<true>;

type O = MakeOptions<Promise<void>>;
type O2 = MakeOptions<number>;

export interface Contract {
  <
    ARG1 extends string,
    ARG2 extends string,
    ARG3 extends string,
    ARG4 extends string,
    T extends { [key in ARG1 | ARG2 | ARG3 | ARG4]: Joi.SchemaLike },
    R,
    FN extends (
      arg1: ConvertType<T[ARG1]>,
      arg2: ConvertType<T[ARG2]>,
      arg3: ConvertType<T[ARG3]>,
      arg4: ConvertType<T[ARG4]>,
    ) => R
  >(
    signature: string,
    params: [ARG1, ARG2, ARG3, ARG4],
    schema: T,
    fn: FN,
    options?: ContractOptions,
  ): FN;

  <
    ARG1 extends string,
    ARG2 extends string,
    ARG3 extends string,
    T extends { [key in ARG1 | ARG2 | ARG3]: Joi.SchemaLike },
    R,
    FN extends (
      arg1: ConvertType<T[ARG1]>,
      arg2: ConvertType<T[ARG2]>,
      arg3: ConvertType<T[ARG3]>,
    ) => R
  >(
    signature: string,
    params: [ARG1, ARG2, ARG3],
    schema: T,
    fn: FN,
    options?: ContractOptions,
  ): FN;

  <
    ARG1 extends string,
    ARG2 extends string,
    T extends { [key in ARG1 | ARG2]: Joi.SchemaLike },
    R,
    FN extends (arg1: ConvertType<T[ARG1]>, arg2: ConvertType<T[ARG2]>) => R
  >(
    signature: string,
    params: [ARG1, ARG2],
    schema: T,
    fn: FN,
    options?: ContractOptions,
  ): FN;

  <
    ARG1 extends string,
    T extends { [key in ARG1]: Joi.SchemaLike },
    R,
    FN extends (arg1: ConvertType<T[ARG1]>) => R
  >(
    signature: string,
    params: [ARG1],
    schema: T,
    fn: FN,
    options?: ContractOptions,
  ): FN;

  <T extends {}, R, FN extends () => R>(
    signature: string,
    params: undefined[],
    schema: T,
    fn: FN,
    options?: ContractOptions,
  ): FN;
}
