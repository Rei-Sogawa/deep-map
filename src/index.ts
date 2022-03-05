type Primitive = string | number | boolean | undefined;

declare type TypeConvert<Input, From, To> = Input extends From
  ? To
  : Input extends Primitive | null
  ? Input
  : Input extends {} // Object or Array
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

const _typeConvert = <Input, To>(
  value: Input,
  convert: (value: unknown) => To | undefined
): unknown => {
  const converted = convert(value);
  if (converted) return converted;

  if (isPrimitive(value)) return value;
  if (value === null) return value;

  if (Array.isArray(value)) return value.map((v) => _typeConvert(v, convert));
  if (isObject(value))
    return Object.entries(value).reduce(
      (p, [k, v]) => ({
        ...p,
        [k]: _typeConvert(v, convert),
      }),
      {}
    );

  throw new Error("cannot typeConvert");
};

export const typeConvert = <Input, From, To>(
  value: Input,
  convert: (value: unknown) => To | undefined
): TypeConvert<Input, From, To> => {
  const output = _typeConvert<Input, To>(value, convert);
  return output as TypeConvert<Input, From, To>;
};
