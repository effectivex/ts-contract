// tslint:disable:no-shadowed-variable
import * as Logger from 'bunyan';
import * as Joi from './joi';

export type Pick<T, K extends keyof T> = { [P in K]: T[P] };

export type NonNeverNames<T> = {
  [K in keyof T]: T[K] extends (null | undefined) ? never : K
}[keyof T];

export type FilterNever<T> = Pick<T, NonNeverNames<T>>;

export type CheckREQ<REQ, T> = REQ extends true ? T : (T | undefined);

export type JoiPrimitiveSchema =
  | Joi.StringSchema
  | Joi.NumberSchema
  | Joi.BooleanSchema
  | Joi.DateSchema;

export type Flatten<T> = { [K in keyof T]: T[K] };

/* Auto generated */

export type ExtractPrimitive<T> = T extends Joi.StringSchema<infer REQ>
  ? CheckREQ<REQ, string>
  : T extends Joi.NumberSchema<infer REQ>
    ? CheckREQ<REQ, number>
    : T extends Joi.BooleanSchema<infer REQ>
      ? CheckREQ<REQ, boolean>
      : T extends Joi.DateSchema<infer REQ> ? CheckREQ<REQ, Date> : T;

export type ExtractObject<T> = { [K in keyof T]: ConvertType<T[K]> };

export type ConvertType<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? CheckREQ<
        REQ,
        Array<
          K extends Joi.ObjectSchema<infer REQ, infer P>
            ? CheckREQ<REQ, ExtractObject2<P>>
            : ConvertType2<K>
        >
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K> ? CheckREQ<REQ, ExtractObject2<K>> : T;

export type ExtractObject2<T> = ConvertObject<{ [K in keyof T]: ConvertType2<T[K]> }>;

export type ConvertType2<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? CheckREQ<
        REQ,
        Array<
          K extends Joi.ObjectSchema<infer REQ, infer P>
            ? CheckREQ<REQ, ExtractObject3<P>>
            : ConvertType3<K>
        >
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K> ? CheckREQ<REQ, ExtractObject3<K>> : T;

export type ExtractObject3<T> = { [K in keyof T]: ConvertType3<T[K]> };

export type ConvertType3<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? CheckREQ<
        REQ,
        Array<
          K extends Joi.ObjectSchema<infer REQ, infer P>
            ? CheckREQ<REQ, ExtractObject4<P>>
            : ConvertType4<K>
        >
      >
    : T extends Joi.ObjectSchema<infer REQ, infer K> ? CheckREQ<REQ, ExtractObject4<K>> : T;

export type ExtractObject4<T> = { [K in keyof T]: ConvertType4<T[K]> };

export type ConvertType4<T> = T extends JoiPrimitiveSchema ? ExtractPrimitive<T> : T;

/* Auto generated END */

// DEEP Convert

export type Convert<T> = ConvertType<T>;

export type NonFunctionProp<T> = T extends Function ? never : T;

export type OptionalPropNames<T> = { [P in keyof T]: undefined extends T[P] ? P : never }[keyof T];

export type RequiredPropNames<T> = { [P in keyof T]: undefined extends T[P] ? never : P }[keyof T];

export type OptionalProps<T> = { [P in OptionalPropNames<T>]: T[P] };
export type RequiredProps<T> = { [P in RequiredPropNames<T>]: T[P] };

export type MakeOptional<T> = { [P in keyof T]?: T[P] };

export type ConvertObject<T> = Flatten<MakeOptional<OptionalProps<T>> & RequiredProps<T>>;

export type DeepConvertObject<T> = T extends Array<any>
  ? T
  : ConvertObject<{ [P in keyof T]: DeepConvert<T[P]> }>;

export type DeepConvert<T> = T extends object ? DeepConvertObject<T> : T;

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
      arg1: Convert<T[ARG1]>,
      arg2: Convert<T[ARG2]>,
      arg3: Convert<T[ARG3]>,
      arg4: Convert<T[ARG4]>,
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
    FN extends (arg1: Convert<T[ARG1]>, arg2: Convert<T[ARG2]>, arg3: Convert<T[ARG3]>) => R
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
    FN extends (arg1: Convert<T[ARG1]>, arg2: Convert<T[ARG2]>) => R
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
    FN extends (arg1: Convert<T[ARG1]>) => R
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
