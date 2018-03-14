const getSuffix = (num: number) => (num > 1 ? num.toString() : '');

// const extractObject = (num: number) => {
//   const suffix = getSuffix(num);
//   return `

// export type ExtractObjectRequiredBase${suffix}<T> =
//  { [K in keyof T]: ConvertTypeRequired${suffix}<T[K]> };

// export type ExtractObjectRequired${suffix}<T> =
// FilterNever<ExtractObjectRequiredBase${suffix}<T>>;

// export type ExtractObjectOptionalBase${suffix}<T> =
//  { [K in keyof T]?: ConvertTypeOptional${suffix}<T[K]> };

// export type ExtractObjectOptional${suffix}<T> =
//  FilterNever<ExtractObjectOptionalBase${suffix}<T>>;

// export type ExtractObject${suffix}<T> =
//  Flatten<ExtractObjectRequired${suffix}<T> & ExtractObjectOptional${suffix}<T>>;

//  `;
// };

const extractObject = (num: number) => {
  const suffix = getSuffix(num);
  return `
  export type ExtractObject${suffix}<T> =
    { [K in keyof T]: ConvertType${suffix}<T[K]> };
 
 `;
};
// const convertTypeBase = (required: boolean, num: number) => {
//   const suffix = getSuffix(num);
//   const nextSuffix = getSuffix(num + 1);
//   const name = required ? 'Required' : 'Optional';
//   const value = required ? 'true' : 'false';
//   return `
//   export type ConvertType${name}${suffix}<T> = T extends JoiPrimitiveSchema
//   ? ExtractPrimitive${name}<T>
//   : T extends Joi.ArraySchema<infer REQ, infer K>
//     ? (REQ extends ${value} ? Array<
//         K extends Joi.ObjectSchema<infer REQ, infer P>
//           ? (REQ extends ${value} ? ExtractObject${nextSuffix}<P> : never)
//           : ConvertType${name}${nextSuffix}<K>
//       > : never)
//     : T extends Joi.ObjectSchema<infer REQ, infer K>
//       ? (REQ extends ${value} ? ExtractObject${nextSuffix}<K> : never)
//       : T;
//       `;
// };

// const convertTypeBase = (required: boolean, num: number) => {
//   const suffix = getSuffix(num);
//   const nextSuffix = getSuffix(num + 1);
//   const name = required ? 'Required' : 'Optional';
//   const value = required ? 'true' : 'false';
//   return `
//   export type ConvertType${name}${suffix}<T> = T extends JoiPrimitiveSchema
//   ? ExtractPrimitive${name}<T>
//   : T extends Joi.ArraySchema<infer REQ, infer K>
//     ? (REQ extends ${value} ? Array<
//         K extends Joi.ObjectSchema<infer REQ, infer P>
//           ? (REQ extends ${value} ? ExtractObject${nextSuffix}<P> : never)
//           : ConvertType${name}${nextSuffix}<K>
//       > : never)
//     : T extends Joi.ObjectSchema<infer REQ, infer K>
//       ? (REQ extends ${value} ? ExtractObject${nextSuffix}<K> : never)
//       : T;
//       `;
// };

// const extractPrimitive = (type: 'Required' | 'Optional' | 'Base') => {
//   const name = type === 'Base' ? '' : type;
//   const value = type === 'Optional' ? 'false' : 'true';
//   const match = (str: string, type: string) => `T extends Joi.${str}Schema<infer REQ>
//   ? (REQ extends ${value} ? ${type} : never)`;
//   return `
//   export type ExtractPrimitive${name}<T> =
//   ${match('String', 'string')}
//   : ${match('Number', 'number')}
//   : ${match('Boolean', 'boolean')}
//   : ${match('Date', 'Date')}
//   : T;
//   `;
// };

const extractPrimitive = (type: 'Required' | 'Optional' | 'Base') => {
  const match = (str: string, type: string) => `T extends Joi.${str}Schema<infer REQ>
  ? CheckREQ<REQ, ${type}>`;
  return `
  export type ExtractPrimitive<T> = 
  ${match('String', 'string')}
  : ${match('Number', 'number')}
  : ${match('Boolean', 'boolean')}
  : ${match('Date', 'Date')}
  : T;
  `;
};

const convertType = (num: number) => {
  const suffix = getSuffix(num);
  const nextSuffix = getSuffix(num + 1);
  const name = '';
  const array = `Array<
  K extends Joi.ObjectSchema<infer REQ, infer P>
    ? CheckREQ<REQ, ExtractObject${nextSuffix}<P> >
    : ConvertType${nextSuffix}<K>
>`;
  return `
  export type ConvertType${suffix}<T> = T extends JoiPrimitiveSchema
  ? ExtractPrimitive<T>
  : T extends Joi.ArraySchema<infer REQ, infer K>
    ? CheckREQ<REQ, ${array}>
    : T extends Joi.ObjectSchema<infer REQ, infer K>
      ? CheckREQ<REQ, ExtractObject${nextSuffix}<K>>
      : T;
      `;
};

const convertTypeLast = (num: number) => {
  const suffix = getSuffix(num);
  return `
  export type ConvertType${suffix}<T> = T extends JoiPrimitiveSchema ? ExtractPrimitive<T> : T;

`;
  //   return `
  //   export type ConvertTypeRequired${suffix}<T> = T extends JoiPrimitiveSchema ? ExtractPrimitiveRequired<T> : T;

  //   export type ConvertTypeOptional${suffix}<T> = T extends JoiPrimitiveSchema ? ExtractPrimitiveOptional<T> : T;
  // `;
};

const getAllLevels = (current: number, max: number) => {
  const base = extractObject(current);
  if (current === max) {
    return base + convertTypeLast(current);
  }
  return base + convertType(current) + getAllLevels(current + 1, max);
};

function generate(levels: number) {
  return `
  ${extractPrimitive('Base')}
  ${getAllLevels(1, levels)}
  `;
}

console.log(generate(4));
