import HexParse from "../../src/utils/hexParse"
const right = "正确情况"
// const wrong = "错误情况"

test(`${right}：单个偶数个数的16进制字符串`, () => {
  const hexParse = new HexParse()
  const res = hexParse.addUint8(129).getAddResult()
  expect(res).toEqual(new Uint8Array([0x81]));
});