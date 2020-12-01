import HexParseError from "../exceptions/hexParseError";

export default class HexUtils {

  /**
   * 验证16进制字符串的正则表达式
   * ^ = 开始
   * $ = 结束
   * + = 匹配前面的子表达式一次或多次。
   * [] = 表达式的开始和结束
   */
  private static readonly regex = "^[a-f0-9A-F]+$"

  /**
 * 16进制字符串与之对应的number
 */
  private static readonly hexStrMap: { [index: string]: number } = {
    "0": 0x00,
    "1": 0x01,
    "2": 0x02,
    "3": 0x03,
    "4": 0x04,
    "5": 0x05,
    "6": 0x06,
    "7": 0x07,
    "8": 0x08,
    "9": 0x09,
    "A": 0x0A,
    "B": 0x0B,
    "C": 0x0C,
    "D": 0x0D,
    "E": 0x0E,
    "F": 0x0F,
    "a": 0x0A,
    "b": 0x0B,
    "c": 0x0C,
    "d": 0x0D,
    "e": 0x0E,
    "f": 0x0F
  }

  /**
   * 将16进制的字符串转换成16进制数值型数组
   * 1a6BdE8c => 1a 6B dE 8c
   * 大端模式：左高 -> 右低
   * 
   * @param src 数据源
   * @returns 16进制数值型数组
   */
  public static toArray(src: string): Uint8Array {
    if (!src || !src.length) throw new HexParseError("输入的字符串为null|undefined|''")
    if ((src.length & -src.length) == 0x01) throw new HexParseError("输入的字符串个数必须为偶数");
    if (!src.match(HexUtils.regex)) throw new HexParseError("字符串内容必须是[0-9|a-f|A-F]");

    const res = new Uint8Array(src.length / 2)
    for (let i = 0, length = src.length; i < length; i = i + 2) {
      const high = HexUtils.hexStrMap[src.charAt(i)]
      const low = HexUtils.hexStrMap[src.charAt(i + 1)]
      res[i / 2] = (high << 4) + low
    }
    return res;
  }

  /**
   * 将16进制数值型数组转换为16进制字符串
   * 
   * @param src 16进制数值型数组
   * @param splitComma 是否采用逗号分割
   * @param prefix 是否添加前缀“0x”
   * @returns 16进制字符串
   * @example 
   * src : [0x22,0x56,0xA1], splitComma : true, prefix : true ==> 0x22,0x56,0xA1
   * src : [0x22,0x56,0xA1], splitComma :                     ==> 22,56,A1
   * src : [0x22,0x56,0xA1]                                   ==> 2256A1
   */
  public static toString(src: Uint8Array, splitComma?: boolean, prefix?: boolean): string {
    if (!src || !src.length) return ""

    if (splitComma) {
      const res: string[] = []
      const pre = prefix ? "0x" : ""
      src.forEach(x => res.push(pre + x.toString(16).toLocaleUpperCase()))
      return res.toLocaleString()
    } else {
      let res = ""
      src.forEach(x => res += x.toString(16).toLocaleUpperCase())
      return res
    }
  }
}