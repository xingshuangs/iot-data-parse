
export default class HexUtils {
  /**
 * 16进制字符串与之对应的number
 */
  static const str2Num: { [index: string]: number } = {
    '0': 0x00,
    '1': 0x01,
    '2': 0x02,
    '3': 0x03,
    '4': 0x04,
    '5': 0x05,
    '6': 0x06,
    '7': 0x07,
    '8': 0x08,
    '9': 0x09,
    'A': 0x0A,
    'B': 0x0B,
    'C': 0x0C,
    'D': 0x0D,
    'E': 0x0E,
    'F': 0x0F,
    'a': 0x0A,
    'b': 0x0B,
    'c': 0x0C,
    'd': 0x0D,
    'e': 0x0E,
    'f': 0x0F
  }

  static toArray(src: string): number[] {
    return [1, 2];
  }
}