import { DataTypeEm } from "./dataTypeEm"
import HexParse from "./hexParse"

/**
 * 数据单元的值和配置信息
 */
export default class DataUnit {

  /**
   * 字节数组
   */
  bytes: Uint8Array = new Uint8Array()

  /**
   * 具体的数值
   */
  value: string | number[] | boolean[] = []

  /**
   * 字段名
   */
  name: string = ""

  /**
   * 描述
   */
  description: string = ""

  /**
   * 字节偏移量，默认0
   */
  byteOffset: number = 0

  /**
   * 位偏移量，默认0
   */
  bitOffset: number = 0

  /**
   * 数据个数，默认1个，字节长度 = 数据个数 * 类型占的字节数
   * "bool": 1个字节,
   * "byte": 1个字节,
   * "ushort": 2个字节,
   * "short": 2个字节,
   * "int": 4个字节,
   * "uint": 4个字节,
   * "float": 4个字节,
   * "double": 8个字节,
   * "string": 1个字节
   */
  count: number = 1

  /**
   * 数据类型，默认string类型
   */
  dataType: DataTypeEm = DataTypeEm.String

  /**
   * 是否为小端模式，默认false
   */
  littleEndian: boolean = false

  /**
   * 单位
   */
  unit: string = ""

  constructor() {

  }

  /**
   * 获取总字节长度
   * 
   * @returns 字节长度
   */
  public getTotalByteLength(): number {
    switch (this.dataType) {
      case DataTypeEm.Bool: return Math.ceil((this.bitOffset + this.count) / 8);
      case DataTypeEm.Ushort: return this.count * 2;
      case DataTypeEm.Short: return this.count * 2;
      case DataTypeEm.Uint: return this.count * 4;
      case DataTypeEm.Int: return this.count * 4;
      case DataTypeEm.Float: return this.count * 4;
      case DataTypeEm.Double: return this.count * 8;
      case DataTypeEm.String: return this.count;
      default: return this.count;
    }
  }

  /**
   * 获取单元数据的信息
   * @returns 输出信息
   */
  public toString(): string {
    let res = ""
    if (this.value instanceof Array) {
      for (let i = 0, length = this.value.length; i < length; i++) {
        res += `${this.value[i]} ${this.unit}`
        if (i != length - 1) res += ", "
      }
      return `${this.description}: ${res}`
    }
    else return `${this.description}: ${this.value} ${this.unit}`
  }

  /**
   * 提取数据
   * 
   * @param parse 数据解析器
   * @returns 提取的值
   */
  public extractValue(parse: HexParse): string | number[] | boolean[] {
    switch (this.dataType) {
      case DataTypeEm.Bool: this.value = parse.toBoolean(this.byteOffset, this.bitOffset, this.count); break;
      case DataTypeEm.Ushort: this.value = parse.toUint16(this.byteOffset, this.count, this.littleEndian); break;
      case DataTypeEm.Short: this.value = parse.toInt16(this.byteOffset, this.count, this.littleEndian); break;
      case DataTypeEm.Uint: this.value = parse.toUint32(this.byteOffset, this.count, this.littleEndian); break;
      case DataTypeEm.Int: this.value = parse.toInt32(this.byteOffset, this.count, this.littleEndian); break;
      case DataTypeEm.Float: this.value = parse.toFloat32(this.byteOffset, this.count, this.littleEndian); break;
      case DataTypeEm.Double: this.value = parse.toFloat64(this.byteOffset, this.count, this.littleEndian); break;
      case DataTypeEm.String: this.value = parse.toString(this.byteOffset, this.count); break;
    }
    this.bytes = parse.getUint8Array(this.byteOffset, this.getTotalByteLength())
    return this.value
  }
}