import { typeConvert } from "../src/index";

describe("Date to ISOString", () => {
  const convert = (value: unknown) => {
    return value instanceof Date ? value.toISOString() : undefined;
  };

  describe("primitive", () => {
    it("string is not converted", () => {
      expect(typeConvert("hello world", convert)).toBe("hello world");
    });

    it("number is not converted", () => {
      expect(typeConvert(0, convert)).toBe(0);
    });

    it("boolean is not converted", () => {
      expect(typeConvert(true, convert)).toBe(true);
    });

    it("undefined is not converted", () => {
      expect(typeConvert(undefined, convert)).toBe(undefined);
    });
  });

  describe("null", () => {
    it("null is not converted", () => {
      expect(typeConvert(null, convert)).toBe(null);
    });
  });

  describe("Date", () => {
    it("Date is converted", () => {
      const input = new Date("2000-01-01");
      const output = "2000-01-01T00:00:00.000Z";
      expect(typeConvert(input, convert)).toBe(output);
    });
  });

  describe("Array", () => {
    it("if element type is Date, it is converted", () => {
      const input = [
        "hello world",
        0,
        true,
        undefined,
        null,
        new Date("2000-01-01"),
        ["hello world", 0, true, undefined, null, new Date("2000-01-01")],
      ];

      const output = [
        "hello world",
        0,
        true,
        undefined,
        null,
        "2000-01-01T00:00:00.000Z",
        ["hello world", 0, true, undefined, null, "2000-01-01T00:00:00.000Z"],
      ];

      expect(typeConvert(input, convert)).toStrictEqual(output);
    });
  });

  describe("Object", () => {
    it("if value type is Date, it is converted", () => {
      const input = {
        string: "hello world",
        number: 0,
        boolean: true,
        undefined: undefined,
        null: null,
        Date: new Date("2000-01-01"),
        object: {
          string: "hello world",
          number: 0,
          boolean: true,
          undefined: undefined,
          null: null,
          Date: new Date("2000-01-01"),
        },
        array: [
          "hello world",
          0,
          true,
          undefined,
          null,
          new Date("2000-01-01"),
        ],
      };

      const output = {
        string: "hello world",
        number: 0,
        boolean: true,
        undefined: undefined,
        null: null,
        Date: "2000-01-01T00:00:00.000Z",
        object: {
          string: "hello world",
          number: 0,
          boolean: true,
          undefined: undefined,
          null: null,
          Date: "2000-01-01T00:00:00.000Z",
        },
        array: [
          "hello world",
          0,
          true,
          undefined,
          null,
          "2000-01-01T00:00:00.000Z",
        ],
      };

      expect(typeConvert(input, convert)).toStrictEqual(output);
    });
  });
});
