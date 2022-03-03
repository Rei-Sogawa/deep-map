"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepConvert = void 0;
const isPrimitive = (value) => {
    if (["string", "number", "boolean", "undefined"].includes(typeof value))
        return true;
    return false;
};
const isObject = (value) => {
    if (typeof value === "object" && !Array.isArray(value) && value !== null)
        return true;
    return false;
};
const _deepConvert = (value, check, convert) => {
    if (check(value))
        return convert(value);
    if (isPrimitive(value))
        return value;
    if (value === null)
        return value;
    if (Array.isArray(value))
        return value.map((v) => _deepConvert(v, check, convert));
    if (isObject(value))
        return Object.entries(value).reduce((p, [k, v]) => ({
            ...p,
            [k]: _deepConvert(v, check, convert),
        }), {});
    throw new Error("cannot deepConvert");
};
const deepConvert = (value, check, convert) => {
    const output = _deepConvert(value, check, convert);
    return output;
};
exports.deepConvert = deepConvert;
