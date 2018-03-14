import * as Joi from './joi';
import { ConvertType, ExtractObject, ExtractObjectRequired } from './types';

const schema = {
  optionalString: Joi.string(),
  requiredString: Joi.string().required(),
};
const a = Joi.string();
type A = ConvertType<typeof a>;
type StringData = ExtractObject<typeof schema>;
const stringData: StringData = {
  requiredString: 'str',
  // optionalString: undefined,
};

type NonNeverNames<T> = { [K in keyof T]: T[K] extends (null | undefined) ? never : K }[keyof T];

type BData = {
  a: string;
  b: string | undefined;
  c: never;
};

const bdata: BData = {
  a: 'str',
  b: 'str',
};

type ValueOf<T> = T[keyof T];

type B = NonNeverNames<BData>;

type FilterNever<T> = Pick<T, NonNeverNames<T>>;

type C = FilterNever<BData>;

// type C = NonNullable<BData>;
// type D = keyof BData;
// type E = ValueOf<BData>;
// type F = Pick<BData, 'a' | 'b'>;

// type GetRequired<T> = { [P in NonNullable<keyof T>]: NonNullable<T[P]> };

// type G = GetRequired<BData>;
