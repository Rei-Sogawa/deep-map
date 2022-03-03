declare type Primitive = string | number | boolean | undefined;
declare type TypeConvert<Input, From, To> = Input extends From ? To : Input extends Primitive | null ? Input : Input extends {} ? {
    [K in keyof Input]: TypeConvert<Input[K], From, To>;
} : never;
export declare const typeConvert: <Input, From, To>(value: Input, check: (v: unknown) => boolean, convert: (from: From) => To) => TypeConvert<Input, From, To>;
export {};
