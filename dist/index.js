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
const _typeConvert = (value, convert) => {
    const converted = convert(value);
    if (converted)
        return converted;
    if (isPrimitive(value))
        return value;
    if (value === null)
        return value;
    if (Array.isArray(value))
        return value.map((v) => _typeConvert(v, convert));
    if (isObject(value))
        return Object.entries(value).reduce((p, [k, v]) => ({
            ...p,
            [k]: _typeConvert(v, convert),
        }), {});
    throw new Error("cannot typeConvert");
};
const typeConvert = (value, convert) => {
    const output = _typeConvert(value, convert);
    return output;
};
exports.typeConvert = typeConvert;
