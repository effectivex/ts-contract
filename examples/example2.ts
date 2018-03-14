// import { Joi, contractProvider } from 'ts-contract';
import { Joi, contractProvider } from '../src/ts-contract';

// UserService.ts

const contract = contractProvider();

const createUser = contract(
  'UserService#createUser',
  ['values'],
  {
    values: Joi.object({
      name: Joi.string()
        .required()
        .alphanum(),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(5),
    }).required(),
  },
  async values => {
    // do something with values
    // UserModel.create(values);
    const id = 1;
    return id;
  },
);

async function test() {
  await createUser({
    name: 'john',
    email: 'john@example.com',
    password: 'secret',
  }); // ok
  await createUser({
    name: 'john',
    email: 'invalid email',
    password: 'secret',
  }); // throw error because email is invalid
}
test().catch(e => {
  throw e;
});
