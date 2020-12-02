import { DataTypeEm } from "./dataTypeEm"

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

  public toString(): string {
    return `${this.description}: ${this.value} ${this.unit}`
  }
}