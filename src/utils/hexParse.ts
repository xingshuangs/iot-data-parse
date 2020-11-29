
export default class HexParse {

  private rdDataView: DataView

  private wtDataView: DataView

  constructor(uint8Array: Uint8Array) {
    this.rdDataView = new DataView(uint8Array.buffer)
    this.wtDataView = new DataView(new ArrayBuffer(8))
  }

  public toBoolean(byteOffset: number, bitOffset: number): boolean {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    if (bitOffset < 0 || bitOffset >= 8) throw RangeError(`位偏移量=8`)
    return (this.rdDataView.getUint8(byteOffset) >> bitOffset & 0x01) == 0x01
  }

  public toInt8(byteOffset: number): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getInt8(byteOffset)
  }

  public toUint8(byteOffset: number): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getUint8(byteOffset)
  }

  public toInt16(byteOffset: number, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getInt16(byteOffset, littleEndian)
  }

  public toUint16(byteOffset: number, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getUint16(byteOffset, littleEndian)
  }

  public toInt32(byteOffset: number, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getInt32(byteOffset, littleEndian)
  }

  public toUint32(byteOffset: number, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getUint32(byteOffset, littleEndian)
  }

  public toFloat32(byteOffset: number, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getFloat32(byteOffset, littleEndian)
  }

  public toFloat64(byteOffset: number, littleEndian?: boolean): number {
    if (byteOffset >= this.rdDataView.byteLength) throw RangeError(`数据字节长度=${this.rdDataView.byteLength}`)
    return this.rdDataView.getFloat64(byteOffset, littleEndian)
  }

  public getInt8Bytes(num: number): Uint8Array {
    this.wtDataView.setInt8(0, num)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 1)
  }

  public getUint8Bytes(num: number): Uint8Array {
    this.wtDataView.setUint8(0, num)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 1)
  }

  public getInt16Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setInt16(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 2)
  }

  public getUint16Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setUint16(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 2)
  }

  public getInt32Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setInt32(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 4)
  }

  public getUint32Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setUint32(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 4)
  }

  public getFloat32Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setFloat32(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 4)
  }

  public getFloat64Bytes(num: number, littleEndian?: boolean): Uint8Array {
    this.wtDataView.setFloat64(0, num, littleEndian)
    return new Uint8Array(this.wtDataView.buffer).subarray(0, 8)
  }
}