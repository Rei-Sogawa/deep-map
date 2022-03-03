"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeConvert = void 0;
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
const _typeConvert = (value, check, convert) => {
    if (check(value))
        return convert(value);
    if (isPrimitive(value))
        return value;
    if (value === null)
        return value;
    if (Array.isArray(value))
        return value.map((v) => _typeConvert(v, check, convert));
    if (isObject(value))
        return Object.entries(value).reduce((p, [k, v]) => ({
            ...p,
            [k]: _typeConvert(v, check, convert),
        }), {});
    throw new Error("cannot typeConvert");
};
const typeConvert = (value, check, convert) => {
    const output = _typeConvert(value, check, convert);
    return output;
};
exports.typeConvert = typeConvert;
