import * as Joi from './joi';
import { ConvertType, Convert, ExtractObject, DeepConvert } from './types';

type ConvertSchema<T> = DeepConvert<ExtractObject<T>>;

// check string
{
  const schema = {
    optional: Joi.string(),
    required: Joi.string().required(),
  };
  type StringData = ConvertSchema<typeof schema>;
  const stringData: StringData = {
    required: 'str',
  };

  const stringData2: StringData = {
    required: 'str',
    optional: 'str',
  };
}

// check number
{
  const schema = {
    optional: Joi.number(),
    required: Joi.number().required(),
  };
  type Data = ConvertSchema<typeof schema>;
  const data: Data = {
    required: 1,
  };

  const data2: Data = {
    optional: 1,
    required: 2,
  };
}

// check bool
{
  const schema = {
    optional: Joi.boolean(),
    required: Joi.boolean().required(),
  };
  type Date = ConvertSchema<typeof schema>;
  const data: Date = {
    required: true,
  };

  const data2: Date = {
    optional: true,
    required: true,
  };
}

// check date
{
  const schema = {
    optional: Joi.date(),
    required: Joi.date().required(),
  };
  type Data = ConvertSchema<typeof schema>;
  const data: Data = {
    required: new Date(),
  };

  const data2: Data = {
    optional: new Date(),
    required: new Date(),
  };
}

// check object
{
  const schema = {
    optional: Joi.object(),
    required: Joi.object().required(),
  };
  type Data = ConvertSchema<typeof schema>;
  const data: Data = {
    required: {},
  };

  const data2: Data = {
    optional: {},
    required: {},
  };
}

// check object with keys
{
  const schema = {
    obj: Joi.object().keys({
      a: Joi.string().required(),
      b: Joi.number(),
    }),
  };
  type Data = ConvertSchema<typeof schema>;
  const data: Data = {
    obj: {
      a: 'str',
    },
  };

  const data2: Data = {
    obj: {
      a: 'str',
      b: 123,
    },
  };
}

// check array
{
  const schema = {
    optional: Joi.array(),
    required: Joi.array().required(),
  };
  type Data = ConvertSchema<typeof schema>;
  const data: Data = {
    required: [],
  };

  const data2: Data = {
    optional: [],
    required: [],
  };
}

// check array with items
{
  const schema = {
    arr: Joi.array().items(Joi.string().required()),
  };
  type Data = ConvertSchema<typeof schema>;
  const data: Data = {
    arr: ['a', 'b'],
  };
}

// type A = {
//   array: string[] | undefined;
// };

// type B = DeepConvertObject<A>;

// type C = B['array'];

// type D = OptionalProps<A>;
// type E = RequiredProps<A>;

// type F = Flatten<MakeOptional<OptionalProps<A>> & RequiredProps<A>>;

// type TMP<T> = Flatten<MakeOptional<OptionalProps<T>> & RequiredProps<T>>;

// type G = TMP<A>;

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

// type Flatten<T> = { [K in keyof T]: T[K] };

// type OptionalPropNames<T> = { [P in keyof T]: undefined extends T[P] ? P : never }[keyof T];
// type RequiredPropNames<T> = { [P in keyof T]: undefined extends T[P] ? never : P }[keyof T];

// type OptionalProps<T> = { [P in OptionalPropNames<T>]: T[P] };
// type RequiredProps<T> = { [P in RequiredPropNames<T>]: T[P] };

// type MakeOptional<T> = { [P in keyof T]?: T[P] };

// type ConvertObject<T> = Flatten<MakeOptional<OptionalProps<T>> & RequiredProps<T>>;

// type DeepConvertObject<T> = ConvertObject<{ [P in keyof T]: DeepConvert<T[P]> }>;

// type DeepConvert<T> = T extends object ? DeepConvertObject<T> : T;

// type After = DeepConvert<Before>;
// // type SimpleAfter = DeepConvert<Simple>;

// const fnBefore = (input: Before) => {
//   return input;
// };

// const fnAfter = (input: After) => {
//   return input;
// };

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
