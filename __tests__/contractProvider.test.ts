import * as Logger from 'bunyan';
import * as Joi from '../src/joi';
import { Contract } from '../src/types';
import { contractProvider } from '../src/contractProvider';

let logger: Logger;
let contract: Contract;

beforeEach(() => {
  logger = getLogger();
  contract = contractProvider({
    getLogger: () => logger,
  });
});

function getLogger() {
  return ({
    error: jest.fn(),
    debug: jest.fn(),
  } as any) as Logger;
}

it('should throw if signature is invalid', () => {
  expect(() => {
    contract('foo', [], {}, () => 10, { sync: true });
  }).toThrowErrorMatchingSnapshot();
});

it('validate sync function', () => {
  const fn = contract(
    'myService#fn',
    ['a'],
    {
      a: Joi.number()
        .positive()
        .required(),
    },
    a => a + 10,
    { sync: true },
  );
  expect(() => {
    fn(10);
  }).not.toThrow();
  expect(() => {
    fn(-10);
  }).toThrowErrorMatchingSnapshot();
  expect((logger.debug as jest.Mock<any>).mock.calls).toMatchSnapshot();
  expect((logger.error as jest.Mock<any>).mock.calls).toMatchSnapshot();
});

it('validate sync with nested object', () => {
  const fn = contract(
    'myService#fn',
    ['params'],
    {
      params: Joi.object({
        username: Joi.string()
          .min(2)
          .required(),
        inner: Joi.object({
          b: Joi.number()
            .min(0)
            .required(),
        }).required(),
      }).required(),
    },
    params => params.username + '-' + params.inner.b,
    { sync: true },
  );
  expect(() => {
    fn({ username: 'baz', inner: { b: -1 } });
  }).toThrowErrorMatchingSnapshot();
  expect(() => {
    fn({ username: 'b', inner: { b: 10 } });
  }).toThrowErrorMatchingSnapshot();
  expect(fn({ username: 'bar', inner: { b: 10 } })).toEqual('bar-10');
});

it('validate async function', async () => {
  const fn = contract(
    'myService#fn',
    ['a'],
    {
      a: Joi.number()
        .positive()
        .required(),
    },
    async a => a + 10,
  );
  await expect(fn(10)).resolves.toBe(20);
  await expect(fn(-10)).rejects.toThrowErrorMatchingSnapshot();
  expect((logger.debug as jest.Mock<any>).mock.calls).toMatchSnapshot();
  expect((logger.error as jest.Mock<any>).mock.calls).toMatchSnapshot();
});

it('with removeOutput', () => {
  const fn = contract(
    'myService#fn',
    ['a'],
    {
      a: Joi.number()
        .positive()
        .required(),
    },
    a => a + 10,
    { sync: true, removeOutput: true },
  );
  fn(10);
  expect((logger.debug as jest.Mock<any>).mock.calls).toMatchSnapshot();
});

it('should keep `this` context', () => {
  class MyService {
    fn = contract(
      'myService#fn',
      ['a'],
      {
        a: Joi.number()
          .positive()
          .required(),
      },
      a => a + this.getInt(),
      { sync: true, removeOutput: true },
    );
    private getInt() {
      return 10;
    }
  }
  const myService = new MyService();
  expect(myService.fn(5)).toBe(15);
});
