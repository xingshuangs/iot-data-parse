import HexUtils from "../../src/utils/hexUtils";
const right = "正确情况"
const wrong = "错误情况"

//#region toArray()

test(`${right}：单个偶数个数的16进制字符串`, () => {
  expect(HexUtils.toArray("1A")).toEqual(new Uint8Array([0x1A]));
});

test(`${right}：多个偶数个数的16进制字符串`, () => {
  expect(HexUtils.toArray("1a6BdE8c")).toEqual(new Uint8Array([0x1a, 0x6b, 0xde, 0x8c]));
});

test(`${wrong}：0个的16进制字符串`, () => {
  expect(() => HexUtils.toArray("")).toThrowError("输入的字符串为null|undefined|''");
});

test(`${wrong}：奇数个数的16进制字符串`, () => {
  expect(() => HexUtils.toArray("1a6BdE8")).toThrowError("输入的字符串个数必须为偶数")
});

test(`${wrong}：存在非16进制字符串的字符`, () => {
  expect(() => HexUtils.toArray("1a6BdE8x")).toThrowError("字符串内容必须是[0-9|a-f|A-F]")
});

//#endregion

//#region toString()

test(`${right}：空16进制数值型数组`, () => {
  expect(HexUtils.toString(new Uint8Array([]))).toEqual("");
});

test(`${right}：单个16进制数值型数组`, () => {
  expect(HexUtils.toString(new Uint8Array([0x1A]))).toEqual("1A");
});

test(`${right}：多个16进制数值型数组，无逗号分割，无前缀`, () => {
  expect(HexUtils.toString(new Uint8Array([0x1A, 0x66, 0x3d]))).toEqual("1A663D");
});

test(`${right}：多个16进制数值型数组，有逗号分割，无前缀`, () => {
  expect(HexUtils.toString(new Uint8Array([0x1A, 0x66, 0x3d]), true)).toEqual("1A,66,3D");
});

test(`${right}：多个16进制数值型数组，有逗号分割，有前缀`, () => {
  expect(HexUtils.toString(new Uint8Array([0x1A, 0x66, 0x3d]), true, true)).toEqual("0x1A,0x66,0x3D");
});

//#endregion