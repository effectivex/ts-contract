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
