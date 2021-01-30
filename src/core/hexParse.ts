
import { TextEncoder, TextDecoder } from "util"
import { DataTypeEm } from "./dataTypeEm"
import DataUnit from "./dataUnit"

/**
 * 16进制数据解析器
 */
export default class HexParse {

  //#region 变量

  /**
   * 读取数据的dataView对象，需要外接传入
   */
  private rdDataView: DataView

  /**
   * 写入数据的dataView对象，默认生成，最大字节数8个
   */
  private wtDataView: DataView = new DataView(new ArrayBuffer(8))

  /**
   * 添加数据使用的ArrayBuffer
   */
  private adBuffer: number[] = []

  //#endregion

  //#region 构造方法

  /**
   * 构造方法
   * 
   * @param rdData 传入数据源
   */
  constructor(rdData: Uint8Array = new Uint8Array()) {
    this.rdDataView = new DataView(rdData.buffer)
  }

  //#endregion

  //#region  获取数值

  /**
   * 转换对应类型数据的执行方法
   * 
   * @param byteOffset 字节偏移量
   * @param count 数据个数
   * @param typeByteLength 类型对应的字节长度 
   * @param callbackFn 回调方法，传入第几个数据的索引，返回对应类型的数据
   * @returns 对应类型的数组
   * @throws RangeError异常，超出可访问的索引
   */
  private toHandle<T>(byteOffset: number = 0, count: number = 1, typeByteLength: number = 1, callbackFn: (index: number) => T): T[] {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`总数据字节长度 = ${this.rdDataView.byteLength}`)
    if (count < 1) throw RangeError("获取的数据个数 < 1")
    if (byteOffset + count * typeByteLength > this.rdDataView.byteLength)
      throw RangeError(`偏移量 + 数据个数 * 类型字节长度 > 总数据字节长度${this.rdDataView.byteLength}`)
    const res: T[] = []
    for (let i = 0; i < count; i++) {
      res.push(callbackFn(i))
    }
    return res
  }

  /**
   * 获取Boolean类型数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param bitOffset 位偏移量，默认0
   * @param count 数据个数，默认1
   * @returns true|false
   * @throws RangeError异常，超出可访问的索引
   */
  public toBoolean(byteOffset: number = 0, bitOffset: number = 0, count: number = 1): boolean[] {
    if (bitOffset < 0 || bitOffset >= 8) throw RangeError(`位偏移量范围[0,7]`)
    // boolean类型特殊一点，类型字节长度时 1 / 8 = 0.125
    return this.toHandle(byteOffset, count, 1 / 8, i => {
      const bitAdd = (bitOffset + i) % 8
      const byteAdd = Math.floor((bitOffset + i) / 8)
      return (this.rdDataView.getUint8(byteOffset + byteAdd) >> bitAdd & 0x01) == 0x01
    })
  }

  /**
   * 获取Int8类型数据
   * 
   * @param byteOffset  字节偏移量，默认0
   * @param count 数据个数，默认1
   * @returns Int8类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toInt8(byteOffset: number = 0, count: number = 1): number[] {
    return this.toHandle(byteOffset, count, 1, i => this.rdDataView.getInt8(byteOffset + i * 1))
  }

  /**
   * 获取Uint8类型数据
   * 
   * @param byteOffset  字节偏移量，默认0
   * @param count 数据个数，默认1
   * @returns Uint8类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toUint8(byteOffset: number = 0, count: number = 1): number[] {
    return this.toHandle(byteOffset, count, 1, i => this.rdDataView.getUint8(byteOffset + i * 1))
  }

  /**
   * 获取Int16类型数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param count 数据个数，默认1
   * @param littleEndian 是否小端模式，可不填，默认大端模式 即false
   * @returns Int16类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toInt16(byteOffset: number = 0, count: number = 1, littleEndian?: boolean): number[] {
    return this.toHandle(byteOffset, count, 2, i => this.rdDataView.getInt16(byteOffset + i * 2, littleEndian))
  }

  /**
   * 获取Uint16类型数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param count 数据个数，默认1
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint16类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toUint16(byteOffset: number = 0, count: number = 1, littleEndian?: boolean): number[] {
    return this.toHandle(byteOffset, count, 2, i => this.rdDataView.getUint16(byteOffset + i * 2, littleEndian))
  }

  /**
   * 获取Int32类型数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param count 数据个数，默认1
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Int32类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toInt32(byteOffset: number = 0, count: number = 1, littleEndian?: boolean): number[] {
    return this.toHandle(byteOffset, count, 4, i => this.rdDataView.getInt32(byteOffset + i * 4, littleEndian))
  }

  /**
   * 获取Uint32类型数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param count 数据个数，默认1
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint32类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toUint32(byteOffset: number = 0, count: number = 1, littleEndian?: boolean): number[] {
    return this.toHandle(byteOffset, count, 4, i => this.rdDataView.getUint32(byteOffset + i * 4, littleEndian))
  }

  /**
   * 获取Float32类型数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param count 数据个数，默认1
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Float32类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toFloat32(byteOffset: number = 0, count: number = 1, littleEndian?: boolean): number[] {
    return this.toHandle(byteOffset, count, 4, i => this.rdDataView.getFloat32(byteOffset + i * 4, littleEndian))
  }

  /**
   * 获取Float64类型数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param count 数据个数，默认1
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Float64类型数组
   * @throws RangeError异常，超出可访问的索引
   */
  public toFloat64(byteOffset: number = 0, count: number = 1, littleEndian?: boolean): number[] {
    return this.toHandle(byteOffset, count, 8, i => this.rdDataView.getFloat64(byteOffset + i * 8, littleEndian))
  }

  /**
   * 获取字符串类型的数据
   * 
   * @param byteOffset 字节偏移量，默认0
   * @param count 数据个数，按字节为单位，若不填则直接获取当前偏移量到字符串结束位置
   * @param outputEncoding 字符编码，默认“utf-8”
   * @returns 解析的字符串
   * @throws RangeError异常，超出可访问的索引
   */
  public toString(byteOffset: number = 0, count?: number, outputEncoding?: string): string {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`总数据字节长度 = ${this.rdDataView.byteLength}`)
    if (count && count < 1) throw RangeError("获取的数据个数 < 1")
    const decoder = new TextDecoder(outputEncoding ? outputEncoding : "utf-8")
    const buf = count ? this.rdDataView.buffer.slice(byteOffset, byteOffset + count * 1)
      : this.rdDataView.buffer.slice(byteOffset)
    return decoder.decode(buf)
  }

  //#endregion

  //#region  获取字节数组

  /**
   * 将Int8数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @returns Uint8Array对象
   */
  public getInt8Bytes(num: number): Uint8Array {
    this.wtDataView.setInt8(0, num)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 1)
  }

  /**
   * 将Uint8数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @returns Uint8Array对象
   */
  public getUint8Bytes(num: number): Uint8Array {
    this.wtDataView.setUint8(0, num)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 1)
  }

  /**
   * 将Int16数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint8Array对象
   */
  public getInt16Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setInt16(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 2)
  }

  /**
   * 将Uint16数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint8Array对象
   */
  public getUint16Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setUint16(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 2)
  }

  /**
   * 将Int32数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint8Array对象
   */
  public getInt32Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setInt32(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 4)
  }

  /**
   * 将Uint32数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint8Array对象
   */
  public getUint32Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setUint32(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 4)
  }

  /**
   * 将Float32数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint8Array对象
   */
  public getFloat32Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setFloat32(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 4)
  }

  /**
   * 将Float64数值解析成Uint8Array数据
   * 
   * @param num 数值
   * @param littleEndian 是否小端模式，可不填，默认大端模式
   * @returns Uint8Array对象
   */
  public getFloat64Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setFloat64(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 8)
  }

  /**
   * 将字符串数据解析成Uint8Array数据，默认utf-8
   * 
   * @param str 字符串的内容
   * @returns Uint8Array对象
   */
  public getStringBytes(str: string): Uint8Array {
    const encoder = new TextEncoder()
    return encoder.encode(str)
  }

  /**
   * 根据字节偏移量和字节长度获取指定字节数组
   * 
   * @param byteOffset 字节偏移量
   * @param byteLength 字节长度
   * @returns Uint8Array对象
   */
  public getUint8Array(byteOffset: number, byteLength: number): Uint8Array {
    return new Uint8Array(this.rdDataView.buffer).subarray(byteOffset, byteOffset + byteLength)
  }

  //#endregion

  //#region  添加数据并串联数据

  /**
   * 清除添加的数据缓存
   */
  public clearAddBuffer(): void {
    this.adBuffer = []
  }

  /**
   * 获取添加的数据字节数组，即Uint8Array数据
   */
  public getAddResult(): Uint8Array {
    return new Uint8Array(this.adBuffer)
  }

  /**
   * 根据添加的数据结果更新RdDataView，节省外部转换
   */
  public assignRdDataViewByAddResult() {
    const tmp = new Uint8Array(this.adBuffer)
    this.rdDataView = new DataView(tmp.buffer)
    return this
  }

  /**
   * 添加Int8的数据类型
   * 
   * @param num 待添加的Int8类型数据
   * @returns 对象本身this
   */
  public addInt8(num: number): HexParse {
    this.getInt8Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Int8的数据类型
   * 
   * @param num 待添加的Int8类型数据
   * @returns 对象本身this
   */
  public addInt8Array(num: number[]): HexParse {
    num.forEach(x => this.addInt8(x))
    return this
  }

  /**
 * 添加Uint8的数据类型
 * 
 * @param num 待添加的Uint8类型数据
 * @returns 对象本身this
 */
  public addUint8(num: number): HexParse {
    this.getUint8Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Uint8的数据类型
   * 
   * @param num 待添加的Uint8类型数据
   * @returns 对象本身this
   */
  public addUint8Array(num: number[]): HexParse {
    num.forEach(x => this.addUint8(x))
    return this
  }

  /**
   * 添加Int16的数据类型
   * 
   * @param num 待添加的Int16类型数据
   * @returns 对象本身this
   */
  public addInt16(num: number): HexParse {
    this.getInt16Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Int16的数据类型
   * 
   * @param num 待添加的Int16类型数据
   * @returns 对象本身this
   */
  public addInt16Array(num: number[]): HexParse {
    num.forEach(x => this.addInt16(x))
    return this
  }

  /**
   * 添加Uint16的数据类型
   * 
   * @param num 待添加的Uint16类型数据
   * @returns 对象本身this
   */
  public addUint16(num: number): HexParse {
    this.getUint16Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Uint16的数据类型
   * 
   * @param num 待添加的Uint16类型数据
   * @returns 对象本身this
   */
  public addUint16Array(num: number[]): HexParse {
    num.forEach(x => this.addUint16(x))
    return this
  }

  /**
   * 添加Int32的数据类型
   * 
   * @param num 待添加的Int32类型数据
   * @returns 对象本身this
   */
  public addInt32(num: number): HexParse {
    this.getInt32Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Int32的数据类型
   * 
   * @param num 待添加的Int32类型数据
   * @returns 对象本身this
   */
  public addInt32Array(num: number[]): HexParse {
    num.forEach(x => this.addInt32(x))
    return this
  }

  /**
   * 添加Uint32的数据类型
   * 
   * @param num 待添加的Uint32类型数据
   * @returns 对象本身this
   */
  public addUint32(num: number): HexParse {
    this.getUint32Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Uint32的数据类型
   * 
   * @param num 待添加的Uint32类型数据
   * @returns 对象本身this
   */
  public addUint32Array(num: number[]): HexParse {
    num.forEach(x => this.addUint32(x))
    return this
  }

  /**
   * 添加Float32的数据类型
   * 
   * @param num 待添加的Float32类型数据
   * @returns 对象本身this
   */
  public addFloat32(num: number): HexParse {
    this.getFloat32Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Float32的数据类型
   * 
   * @param num 待添加的Float32类型数据
   * @returns 对象本身this
   */
  public addFloat32Array(num: number[]): HexParse {
    num.forEach(x => this.addFloat32(x))
    return this
  }


  /**
   * 添加Float64的数据类型
   * 
   * @param num 待添加的Float64类型数据
   * @returns 对象本身this
   */
  public addFloat64(num: number): HexParse {
    this.getFloat64Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加Float64的数据类型数组
   * 
   * @param num 待添加的Float64类型数据
   * @returns 对象本身this
   */
  public addFloat64Array(num: number[]): HexParse {
    num.forEach(x => this.addFloat64(x))
    return this
  }

  /**
   * 添加字符串的数据类型
   * 
   * @param num 待添加的string类型数据
   * @returns 对象本身this
   */
  public addString(str: string): HexParse {
    this.getStringBytes(str).forEach(x => this.adBuffer.push(x))
    return this
  }

  /**
   * 添加字符串的数据类型
   * 
   * @param num 待添加的数据
   * @returns 对象本身this
   */
  public addStringArray(str: string[]): HexParse {
    str.forEach(x => this.addString(x))
    return this
  }

  //#endregion

  /**
   * 根据数据单元解析数据
   * 
   * @param src 数据源
   * @returns 解析的数据结果
   */
  public parseData(src: DataUnit): string | number[] | boolean[] {
    switch (src.dataType) {
      case DataTypeEm.Bool: src.value = this.toBoolean(src.byteOffset, src.bitOffset, src.count); break;
      case DataTypeEm.Ushort: src.value = this.toUint16(src.byteOffset, src.count, src.littleEndian); break;
      case DataTypeEm.Short: src.value = this.toInt16(src.byteOffset, src.count, src.littleEndian); break;
      case DataTypeEm.Uint: src.value = this.toUint32(src.byteOffset, src.count, src.littleEndian); break;
      case DataTypeEm.Int: src.value = this.toInt32(src.byteOffset, src.count, src.littleEndian); break;
      case DataTypeEm.Float: src.value = this.toFloat32(src.byteOffset, src.count, src.littleEndian); break;
      case DataTypeEm.Double: src.value = this.toFloat64(src.byteOffset, src.count, src.littleEndian); break;
      case DataTypeEm.String: src.value = this.toString(src.byteOffset, src.count); break;
    }
    src.bytes = this.getUint8Array(src.byteOffset, src.getTotalByteLength())
    return src.value
  }

  public parseDataArray(src: DataUnit[]) {
    for (let i = 0, length = src.length; i < length; i++) {
      this.parseData(src[i])
    }
  }
}