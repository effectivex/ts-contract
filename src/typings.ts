import * as Joi from './joi';
import { ConvertType, ExtractObject, ExtractObjectRequired } from './types';

// check string
{
  const schema = {
    optionalString: Joi.string(),
    requiredString: Joi.string().required(),
  };
  type StringData = ExtractObject<typeof schema>;
  const stringData: StringData = {
    requiredString: 'str',
  };

  const stringData2: StringData = {
    requiredString: 'str',
    optionalString: 'str',
  };
}

// check number
{
  const schema = {
    optionalNumber: Joi.number(),
    requiredNumber: Joi.number().required(),
  };
  type StringData = ExtractObject<typeof schema>;
  const data: StringData = {
    requiredNumber: 1,
  };

  const data2: StringData = {
    optionalNumber: 1,
    requiredNumber: 2,
  };
}

// type A = { a: string } & { b: number };

// type B = { [K in keyof A]: A[K] };

// const fn = (a: B) => 1;

// fn();

// export type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// export type NonNeverNames<T> = {
//   [K in keyof T]: T[K] extends (null | undefined) ? never : K
// }[keyof T];

// export type NeverNames<T> = {
//   [K in keyof T]: T[K] extends (null | undefined) ? K : never
// }[keyof T];

// type Primitive = number | string | object;

// export type StringNames<T> = {
//   [K in keyof T]: T[K] extends (number | string) ? K : never
// }[keyof T];

// export type NonOptional<T> = {
//   [K in keyof T]: T[K] extends NonNullable<T[K]> ? K : never
// }[keyof T];

// export type Optional<T> = { [K in keyof T]: T[K] extends NonNullable<T[K]> ? never : K }[keyof T];

// export type FilterNever<T> = NonNeverNames<T, NonNeverNames<T>>;

// export type Flatten<T> = T; //{ [K in keyof T]: T[K] };

type Before = {
  a: string;
  b: number;
  c: string | undefined;
  d: number | undefined;
  nested: {
    a2: string;
    b2: number;
    c2: string | undefined;
    d2: number | undefined;
    nested2: {
      a3: string;
      b3: number;
      c3: string | undefined;
      d3: number | undefined;
    };
  };
};

// type Simple = {
//   nested: {
//     a2: string;
//     c2: string | undefined;
//   };
// };

type Flatten<T> = { [K in keyof T]: T[K] };

type OptionalPropNames<T> = { [P in keyof T]: undefined extends T[P] ? P : never }[keyof T];
type RequiredPropNames<T> = { [P in keyof T]: undefined extends T[P] ? never : P }[keyof T];

type OptionalProps<T> = { [P in OptionalPropNames<T>]: T[P] };
type RequiredProps<T> = { [P in RequiredPropNames<T>]: T[P] };

type MakeOptional<T> = { [P in keyof T]?: T[P] };

type ConvertObject<T> = Flatten<MakeOptional<OptionalProps<T>> & RequiredProps<T>>;

type DeepConvertObject<T> = ConvertObject<{ [P in keyof T]: DeepConvert<T[P]> }>;

type DeepConvert<T> = T extends object ? DeepConvertObject<T> : T;

type After = DeepConvert<Before>;
// type SimpleAfter = DeepConvert<Simple>;

const fnBefore = (input: Before) => {
  return input;
};

const fnAfter = (input: After) => {
  return input;
};

// type B = OptionalProps<A>;
// type C = RequiredProps<A>;
// type D = ConvertObject<A>;
// type B = NonOptional<A>;
// type C = Optional<A>;

// type MakeOptional<T> = { [P in keyof T]?: NonNullable<T[P]> };

// type Convert<T> = Flatten<Pick<T, NonOptional<T>> & MakeOptional<Pick<T, Optional<T>>>>;

// type D = Convert<A>;

// type TypeName<T> =
//     T extends string ? "string" :
//     T extends number ? "number" :
//     T extends boolean ? "boolean" :
//     T extends undefined ? "undefined" :
//     T extends Function ? "function" :
//     "object";

// type C = TypeName<string | undefined>
