// import { Joi, contractProvider } from 'ts-contract';
import { Joi, contractProvider } from '../src/ts-contract';

// CalcService.ts

const contract = contractProvider();

const add = contract(
  'CalcService#add',
  ['a', 'b'],
  {
    a: Joi.number().required(),
    b: Joi.number().required(),
  },
  (a, b) => a + b,
  { sync: true },
);

add(1, 3); // returns 4
add('5' as any, '6' as any); // returns 11, input parameters are converted to number types
add('1' as any, { foo: 'bar' } as any); // logs and throws an error
