type Primitive = string | number | boolean | undefined;

declare type TypeConvert<Input, From, To> = Input extends From
  ? To
  : Input extends Primitive | null
  ? Input
  : Input extends {} // Object and Array
  ? { [K in keyof Input]: TypeConvert<Input[K], From, To> }
  : never;

const isPrimitive = (value: unknown) => {
  if (["string", "number", "boolean", "undefined"].includes(typeof value))
    return true;
  return false;
};

const isObject = (value: unknown) => {
  if (typeof value === "object" && !Array.isArray(value) && value !== null)
    return true;
  return false;
};

const _typeConvert = <Input, From, To>(
  value: Input,
  check: (v: unknown) => boolean,
  convert: (from: From) => To
): unknown => {
  if (check(value)) return convert(value as unknown as From);

  if (isPrimitive(value)) return value;
  if (value === null) return value;

  if (Array.isArray(value))
    return value.map((v) => _typeConvert(v, check, convert));
  if (isObject(value))
    return Object.entries(value).reduce(
      (p, [k, v]) => ({
        ...p,
        [k]: _typeConvert(v, check, convert),
      }),
      {}
    );

  throw new Error("cannot typeConvert");
};

export const typeConvert = <Input, From, To>(
  value: Input,
  check: (v: unknown) => boolean,
  convert: (from: From) => To
): TypeConvert<Input, From, To> => {
  const output = _typeConvert(value, check, convert);
  return output as TypeConvert<Input, From, To>;
};

// example

// const input = {
//   id: 1,
//   createdAt: new Date(),
//   deletedAt: null,
//   creator: {
//     id: 1,
//     createdAt: new Date(),
//   },
//   likedAtList: [new Date(), new Date()],
// };

// const output = typeConvert(
//   input,
//   (v) => v instanceof Date,
//   (v: Date) => v.toISOString()
// );

// console.log(output);
