declare type Primitive = string | number | boolean | undefined;
declare type DeepConvert<Input, From, To> = Input extends From ? To : Input extends Primitive | null ? Input : Input extends {} ? {
    [K in keyof Input]: DeepConvert<Input[K], From, To>;
} : never;
export declare const deepConvert: <Input, From, To>(value: Input, check: (v: unknown) => boolean, convert: (from: From) => To) => DeepConvert<Input, From, To>;
export {};
