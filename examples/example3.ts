// import { Joi, contractProvider } from 'ts-contract';
import { Joi, contractProvider } from '../src/ts-contract';

// SecurityService.ts

const contract = contractProvider();

const hashPassword = contract(
  'SecurityService#hashPassword',
  ['password'],
  {
    password: Joi.string().required(),
  },
  password => 'ba817ef716',
  { sync: true },
);

hashPassword('secret-password');
