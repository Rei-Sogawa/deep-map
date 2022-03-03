type Primitive = string | number | boolean | undefined;

declare type DeepMap<Input, From, To> = Input extends From
  ? To
  : Input extends Primitive | null
  ? Input
  : Input extends {} // Object and Array
  ? { [K in keyof Input]: DeepMap<Input[K], From, To> }
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

const _deepConvert = <Input, From, To>(
  value: Input,
  check: (v: unknown) => boolean,
  convert: (from: From) => To
): unknown => {
  if (check(value)) return convert(value as unknown as From);

  if (isPrimitive(value)) return value;
  if (value === null) return value;

  if (Array.isArray(value))
    return value.map((v) => _deepConvert(v, check, convert));
  if (isObject(value))
    return Object.entries(value).reduce(
      (p, [k, v]) => ({
        ...p,
        [k]: _deepConvert(v, check, convert),
      }),
      {}
    );

  throw new Error("cannot deepConvert");
};

export const deepConvert = <Input, From, To>(
  value: Input,
  check: (v: unknown) => boolean,
  convert: (from: From) => To
): DeepMap<Input, From, To> => {
  const output = _deepConvert(value, check, convert);
  return output as DeepMap<Input, From, To>;
};
