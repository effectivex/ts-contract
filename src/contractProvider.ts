import * as Logger from 'bunyan';
import * as Joi from './joi';
import { ConvertType, ContractOptions, ContractConfig, Contract } from './types';
import { wrapValidate } from './wrapValidate';
import { wrapLog } from './wrapLog';

const getConfig = (config?: Partial<ContractConfig>): ContractConfig => {
  let defaultId = 0;
  const loggerMap: Record<string, Logger> = {};
  return {
    removeFields: ['password', 'token', 'accessToken'],
    debug: true,
    depth: 4,
    maxArrayLength: 30,
    getLogger(serviceName: string) {
      if (!loggerMap[serviceName]) {
        loggerMap[serviceName] = Logger.createLogger({
          name: serviceName,
          level: this.debug ? 'debug' : 'error',
        });
      }
      return loggerMap[serviceName];
    },
    getNextId: () => ++defaultId,
    ...(config || {}),
  };
};

const getOptions = (options?: Partial<ContractOptions>): ContractOptions => {
  return {
    sync: false,
    removeOutput: false,
    ...(options || {}),
  };
};

/**
 * Create a new contract wrapper
 * @param overrideConfig the config
 */
export const contractProvider = (overrideConfig?: Partial<ContractConfig>): Contract => {
  const config = getConfig(overrideConfig);
  // function contract<
  //   ARG1 extends string,
  //   ARG2 extends string,
  //   T extends { [key in ARG1 | ARG2]: Joi.SchemaLike },
  //   R,
  //   FN extends (arg1: ConvertType<T[ARG1]>, arg2: ConvertType<T[ARG2]>) => R
  // >(signature: string, params: [ARG1, ARG2], schema: T, fn: FN, options?: ContractOptions): FN;

  // function contract<
  //   ARG1 extends string,
  //   T extends { [key in ARG1]: Joi.SchemaLike },
  //   R,
  //   FN extends (arg1: ConvertType<T[ARG1]>) => R
  // >(signature: string, params: [ARG1], schema: T, fn: FN, options?: ContractOptions): FN;

  function contract(
    signature: string,
    params: any[],
    schema: Record<string, Joi.SchemaLike>,
    fn: () => any,
    overrideOptions?: Partial<ContractOptions>,
  ): any {
    const [serviceName, methodName] = signature.split('#');
    if (!methodName) {
      throw new Error(
        `Invalid signature. Must be in format "service-name#method-name". Received "${signature}".`,
      );
    }
    return function decorated(this: any, ...args: any[]) {
      const options = getOptions(overrideOptions);
      const logger = config.getLogger(serviceName);
      const withValidation = wrapValidate({
        keysSchema: schema,
        method: fn,
        paramNames: params,
        sync: options.sync,
      });

      const withLogging = wrapLog({
        logger,
        method: withValidation.bind(this),
        methodName,
        paramNames: params,
        config,
        removeOutput: options.removeOutput,
      });
      return withLogging.call(this, ...args);
    };
  }

  return contract;
};
