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
  value: string | number | boolean = 0

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
   * 字节长度，默认1
   */
  byteLength: number = 1

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
   * 获取单元数据的信息
   */
  public toString(): string {
    return `${this.description}: ${this.value} ${this.unit}`
  }

  /**
   * 提取数据
   * 
   * @param parse 数据解析器
   */
  public extractValue(parse: HexParse): void {
    switch (this.dataType) {
      case DataTypeEm.Bool: this.value = parse.toBoolean(this.byteOffset, this.bitOffset); break;
      case DataTypeEm.Ushort: this.value = parse.toUint16(this.byteOffset, this.littleEndian); break;
      case DataTypeEm.Short: this.value = parse.toInt16(this.byteOffset, this.littleEndian); break;
      case DataTypeEm.Uint: this.value = parse.toUint32(this.byteOffset, this.littleEndian); break;
      case DataTypeEm.Int: this.value = parse.toInt32(this.byteOffset, this.littleEndian); break;
      case DataTypeEm.Float: this.value = parse.toFloat32(this.byteOffset, this.littleEndian); break;
      case DataTypeEm.Double: this.value = parse.toFloat64(this.byteOffset, this.littleEndian); break;
      case DataTypeEm.String: this.value = parse.toString(this.byteOffset, this.byteLength); break;
    }
    this.bytes = parse.getUint8Array(this.byteOffset, this.byteLength)
  }
}