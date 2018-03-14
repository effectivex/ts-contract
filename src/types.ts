// tslint:disable:no-shadowed-variable
import * as Logger from 'bunyan';
import * as Joi from './joi';

export type ConvertType3<T> = T extends JoiPrimitiveSchema ? ExtractPrimitive<T> : T;

export type ConvertType2<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer K>
    ? Array<K extends Joi.ObjectSchema<infer P> ? ExtractObject3<P> : ConvertType3<K>>
    : T extends Joi.ObjectSchema<infer K> ? ExtractObject3<K> : T;

export type ExtractObject2<T> = { [K in keyof T]: ConvertType2<T[K]> };
export type ExtractObject3<T> = { [K in keyof T]: ConvertType3<T[K]> };

export type JoiPrimitiveSchema =
  | Joi.StringSchema
  | Joi.NumberSchema
  | Joi.BooleanSchema
  | Joi.DateSchema;

export type ExtractPrimitive<T> = T extends Joi.StringSchema<infer REQ>
  ? (REQ extends true ? string : (string | undefined))
  : T extends Joi.NumberSchema<infer REQ>
    ? (REQ extends true ? number : (number | undefined))
    : T extends Joi.BooleanSchema ? boolean : T extends Joi.DateSchema ? Date : T;

export type ConvertType<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer K>
    ? Array<
        K extends Joi.ObjectSchema<infer P, infer REQ>
          ? (REQ extends true ? ExtractObject2<P> : (ExtractObject2<P> | undefined))
          : ConvertType2<K>
      >
    : T extends Joi.ObjectSchema<infer K, infer REQ>
      ? (REQ extends true ? ExtractObject2<K> : (ExtractObject2<K> | undefined))
      : T;

export type ExtractObject<T> = { [K in keyof T]: ConvertType<T[K]> };

export interface ContractOptions {
  sync: boolean;
  removeOutput: boolean;
}

export interface ContractConfig {
  removeFields: string[];
  debug: boolean;
  depth: number;
  maxArrayLength: number;
  getLogger: (serviceName: string) => Logger;
  getNextId: () => number;
}

export interface Contract {
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
    options?: Partial<ContractOptions>,
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
    options?: Partial<ContractOptions>,
  ): FN;
  <T extends {}, R, FN extends () => R>(
    signature: string,
    params: undefined[],
    schema: T,
    fn: FN,
    options?: Partial<ContractOptions>,
  ): FN;
}
