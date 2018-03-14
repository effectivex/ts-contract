import * as Joi from './joi';
import { ConvertType } from './types';

export * from './types';
export { Joi };

export function contract<
  ARG1 extends string,
  ARG2 extends string,
  T extends { [key in ARG1 | ARG2]: Joi.SchemaLike },
  R,
  FN extends (arg1: ConvertType<T[ARG1]>, arg2: ConvertType<T[ARG2]>) => R
>(params: [ARG1, ARG2], schema: T, fn: FN): FN;

export function contract<
  ARG1 extends string,
  T extends { [key in ARG1]: Joi.SchemaLike },
  R,
  FN extends (arg1: ConvertType<T[ARG1]>) => R
>(params: [ARG1], schema: T, fn: FN): FN;

export function contract(params: any, schema: any, fn: any): any {
  return 2;
}
