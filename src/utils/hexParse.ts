
export default class HexParse {

  /**
   * 读取数据的dataView对象，需要外接传入
   */
  public rdDataView: DataView

  /**
   * 写入数据的dataView对象，默认生成，最大字节数8个
   */
  private wtDataView: DataView = new DataView(new ArrayBuffer(8))

  /**
   * 添加数据使用的ArrayBuffer
   */
  private adBuffer: number[] = []

  /**
   * 构造方法
   * 
   * @param rdData 传入数据源
   */
  constructor(rdData: Uint8Array = new Uint8Array()) {
    this.rdDataView = new DataView(rdData.buffer)
  }

  //#region  获取数值

  /**
   * 获取Boolean类型数据
   * 
   * @param byteOffset  字节偏移量
   * @param bitOffset  位偏移量
   * @returns true|false
   */
  public toBoolean(byteOffset: number = 0, bitOffset: number): boolean {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    if (bitOffset < 0 || bitOffset >= 8) throw RangeError(`位偏移量=8`)

    return (this.rdDataView.getUint8(byteOffset) >> bitOffset & 0x01) == 0x01
  }

  /**
   * 获取Int8类型数据
   * 
   * @param byteOffset  字节偏移量
   * @returns Int8类型数据
   */
  public toInt8(byteOffset: number = 0): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getInt8(byteOffset)
  }

  /**
   * 获取Uint8类型数据
   * 
   * @param byteOffset  字节偏移量
   * @returns Uint8类型数据
   */
  public toUint8(byteOffset: number = 0): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getUint8(byteOffset)
  }

  /**
   * 获取Int16类型数据
   * 
   * @param byteOffset  字节偏移量
   * @param littleEndian 小端模式
   * @returns Int16类型数据
   */
  public toInt16(byteOffset: number = 0, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getInt16(byteOffset, littleEndian)
  }

  /**
   * 获取Uint16类型数据
   * 
   * @param byteOffset  字节偏移量
   * @param littleEndian 小端模式
   * @returns Uint16类型数据
   */
  public toUint16(byteOffset: number = 0, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getUint16(byteOffset, littleEndian)
  }

  /**
   * 获取Int32类型数据
   * 
   * @param byteOffset  字节偏移量
   * @param littleEndian 小端模式
   * @returns Int32类型数据
   */
  public toInt32(byteOffset: number = 0, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getInt32(byteOffset, littleEndian)
  }

  /**
   * 获取Uint32类型数据
   * 
   * @param byteOffset  字节偏移量
   * @param littleEndian 小端模式
   * @returns Uint32类型数据
   */
  public toUint32(byteOffset: number = 0, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getUint32(byteOffset, littleEndian)
  }

  /**
   * 获取Float32类型数据
   * 
   * @param byteOffset  字节偏移量
   * @param littleEndian 小端模式
   * @returns Float32类型数据
   */
  public toFloat32(byteOffset: number = 0, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getFloat32(byteOffset, littleEndian)
  }

  /**
   * 获取Float64类型数据
   * 
   * @param byteOffset  字节偏移量
   * @param littleEndian 小端模式
   * @returns Float64类型数据
   */
  public toFloat64(byteOffset: number = 0, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getFloat64(byteOffset, littleEndian)
  }

  /**
   * 获取字符串类型的数据
   * 
   * @param byteOffset 字节偏移量
   * @param byteLength 字节长度
   * @param outputEncoding 字符编码
   * @returns 解析的字符串
   */
  public toString(byteOffset: number = 0, byteLength: number = 0, outputEncoding: string = "utf-8"): string {
    const decoder = new TextDecoder(outputEncoding)
    const buf = this.rdDataView.buffer.slice(byteOffset, byteOffset + byteLength)
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
   * @returns Uint8Array对象
   */
  public getFloat64Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setFloat64(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 8)
  }

  public getStringBytes(str: string): Uint8Array {
    return new TextEncoder().encode(str)
  }

  //#endregion

  //#region  添加并串联数据

  public clearAddBuffer(): void {
    this.adBuffer = []
  }

  public getAddResult(): Uint8Array {
    return new Uint8Array(this.adBuffer)
  }

  public addInt8(num: number): HexParse {
    this.getInt8Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addUint8(num: number): HexParse {
    this.getUint8Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addInt16(num: number): HexParse {
    this.getInt16Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addUint16(num: number): HexParse {
    this.getUint16Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addInt32(num: number): HexParse {
    this.getInt32Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addUint32(num: number): HexParse {
    this.getUint32Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addFloat32(num: number): HexParse {
    this.getFloat32Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addFloat64(num: number): HexParse {
    this.getFloat64Bytes(num).forEach(x => this.adBuffer.push(x))
    return this
  }

  public addString(str: string): HexParse {
    this.getStringBytes(str).forEach(x => this.adBuffer.push(x))
    return this
  }

  //#endregion
}