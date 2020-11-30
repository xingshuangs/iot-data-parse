import HexParse from "../../src/utils/hexParse"
const right = "正确情况"
// const wrong = "错误情况"

test(`${right}：toInt8`, () => {
  const hexParse = new HexParse(new Uint8Array([0xFF, 0x81, 0x01, 0x7F]))
  expect(hexParse.toInt8()).toEqual(-1);
  expect(hexParse.toInt8(1)).toEqual(-127);
  expect(hexParse.toInt8(2)).toEqual(1);
  expect(hexParse.toInt8(3)).toEqual(127);
});

test(`${right}：toUint8`, () => {
  const hexParse = new HexParse(new Uint8Array([0x21, 0xFE, 0xD3, 0x79]))
  expect(hexParse.toUint8()).toEqual(33);
  expect(hexParse.toUint8(1)).toEqual(254);
  expect(hexParse.toUint8(2)).toEqual(211);
  expect(hexParse.toUint8(3)).toEqual(121);
});

test(`${right}：toInt16`, () => {
  const hexParse = new HexParse(new Uint8Array([0xFF, 0xFF, 0xFF, 0x81, 0x64, 0x59, 0x9B, 0xA7]))
  expect(hexParse.toInt16()).toEqual(-1);
  expect(hexParse.toInt16(2)).toEqual(-127);
  expect(hexParse.toInt16(4)).toEqual(25689);
  expect(hexParse.toInt16(6)).toEqual(-25689);
});

test(`${right}：toUint16`, () => {
  const hexParse = new HexParse(new Uint8Array([0x00, 0x21, 0x00, 0xFE, 0x21, 0xCE, 0x64, 0x59]))
  expect(hexParse.toUint16()).toEqual(33);
  expect(hexParse.toUint16(2)).toEqual(254);
  expect(hexParse.toUint16(4)).toEqual(8654);
  expect(hexParse.toUint16(6)).toEqual(25689);
});

test(`${right}：toInt32`, () => {
  const hexParse = new HexParse(new Uint8Array([0xFF, 0xFF, 0xFF, 0x81, 0x00, 0x00, 0x64, 0x59, 0xFF, 0xFF, 0x9B, 0xA7]))
  expect(hexParse.toInt32()).toEqual(-127);
  expect(hexParse.toInt32(4)).toEqual(25689);
  expect(hexParse.toInt32(8)).toEqual(-25689);
});

test(`${right}：toUint32`, () => {
  const hexParse = new HexParse(new Uint8Array([0x00, 0x00, 0x00, 0x21, 0x99, 0x1F, 0x2A, 0xA8, 0x00, 0x00, 0x64, 0x59]))
  expect(hexParse.toUint32()).toEqual(33);
  expect(hexParse.toUint32(4)).toEqual(2568956584);
  expect(hexParse.toUint32(8)).toEqual(25689);
});

test(`${right}：addInt8`, () => {
  const hexParse = new HexParse()
  const res = hexParse.addInt8(-1).addInt8(-127).addInt8(1).addInt8(127).getAddResult()
  expect(res).toEqual(new Uint8Array([0xFF, 0x81, 0x01, 0x7F]));
});

test(`${right}：addUint8`, () => {
  const hexParse = new HexParse()
  const res = hexParse.addUint8(33).addUint8(254).addUint8(211).addUint8(121).getAddResult()
  expect(res).toEqual(new Uint8Array([0x21, 0xFE, 0xD3, 0x79]));
});

test(`${right}：addInt16`, () => {
  const hexParse = new HexParse()
  const res = hexParse.addInt16(-1).addInt16(-127).addInt16(25689).addInt16(-25689).getAddResult()
  expect(res).toEqual(new Uint8Array([0xFF, 0xFF, 0xFF, 0x81, 0x64, 0x59, 0x9B, 0xA7]));
});

test(`${right}：addUint16`, () => {
  const hexParse = new HexParse()
  const res = hexParse.addUint16(33).addUint16(254).addUint16(8654).addInt16(25689).getAddResult()
  expect(res).toEqual(new Uint8Array([0x00, 0x21, 0x00, 0xFE, 0x21, 0xCE, 0x64, 0x59]));
});

test(`${right}：addInt32`, () => {
  const hexParse = new HexParse()
  const res = hexParse.addInt32(-127).addInt32(25689).addInt32(-25689).getAddResult()
  expect(res).toEqual(new Uint8Array([0xFF, 0xFF, 0xFF, 0x81, 0x00, 0x00, 0x64, 0x59, 0xFF, 0xFF, 0x9B, 0xA7]));
});

test(`${right}：addUint32`, () => {
  const hexParse = new HexParse()
  const res = hexParse.addUint32(33).addUint32(2568956584).addInt32(25689).getAddResult()
  expect(res).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x21, 0x99, 0x1F, 0x2A, 0xA8, 0x00, 0x00, 0x64, 0x59]));
});