import DataUnit from "../../src/core/dataUnit"
import HexParse from "../../src/core/hexParse"
import HexUtils from "../../src/utils/hexUtils";
import { DataTypeEm } from "../../src/core/dataTypeEm"

const right = "正确情况"

const dataSource: DataUnit[] = []
const json = [
  { description: "运行状态", unit: "", name: "runStatus", byteOffset: 0, bitOffset: 0, byteLength: 1, dataType: "Bool", littleEndian: false },
  { description: "报警状态", unit: "", name: "alarmStatus", byteOffset: 0, bitOffset: 1, byteLength: 1, dataType: "Bool", littleEndian: false },
  { description: "自动状态", unit: "", name: "autoStatus", byteOffset: 0, bitOffset: 2, byteLength: 1, dataType: "Bool", littleEndian: false },
  { description: "生产数量", unit: "个", name: "productNumber", byteOffset: 1, bitOffset: 0, byteLength: 4, dataType: "Int", littleEndian: false },
  { description: "电流", unit: "A", name: "current", byteOffset: 5, bitOffset: 0, byteLength: 4, dataType: "Float", littleEndian: false },
  { description: "电压", unit: "V", name: "voltage", byteOffset: 9, bitOffset: 0, byteLength: 4, dataType: "Float", littleEndian: false },
  { description: "温度1", unit: "℃", name: "temperature1", byteOffset: 13, bitOffset: 0, byteLength: 8, dataType: "Double", littleEndian: false },
  { description: "温度2", unit: "℃", name: "temperature2", byteOffset: 21, bitOffset: 0, byteLength: 8, dataType: "Double", littleEndian: false },
  { description: "频率1", unit: "Hz", name: "frequency1", byteOffset: 29, bitOffset: 0, byteLength: 4, dataType: "Float", littleEndian: false },
  { description: "频率2", unit: "Hz", name: "frequency2", byteOffset: 33, bitOffset: 0, byteLength: 4, dataType: "Float", littleEndian: false },
  { description: "用户名", unit: "", name: "username", byteOffset: 37, bitOffset: 0, byteLength: 10, dataType: "String", littleEndian: false },
  { description: "报警内容", unit: "", name: "alarmContent", byteOffset: 47, bitOffset: 0, byteLength: 20, dataType: "String", littleEndian: false }
]

for (const item of json) {
  const data: DataUnit = new DataUnit()
  data.description = item.description
  data.unit = item.unit
  data.name = item.name
  data.byteOffset = item.byteOffset
  data.bitOffset = item.bitOffset
  data.byteLength = item.byteLength
  data.littleEndian = item.littleEndian
  switch (item.dataType) {
    case "Bool": data.dataType = DataTypeEm.Bool; break;
    case "Ushort": data.dataType = DataTypeEm.Ushort; break;
    case "Short": data.dataType = DataTypeEm.Short; break;
    case "Uint": data.dataType = DataTypeEm.Uint; break;
    case "Int": data.dataType = DataTypeEm.Int; break;
    case "Float": data.dataType = DataTypeEm.Float; break;
    case "Double": data.dataType = DataTypeEm.Double; break;
    case "String": data.dataType = DataTypeEm.String; break;
  }
  dataSource.push(data)
}

test(`${right}：toBoolean`, () => {
  const hexParse = new HexParse()
  const src = hexParse.addUint8(0x07)
    .addInt32(153)
    .addFloat32(32.15)
    .addFloat32(55.24)
    .addFloat64(37.22)
    .addFloat64(38.51)
    .addFloat32(20.125)
    .addFloat32(32.811)
    .addString("xingshuang")
    .addString("今天天气好")
    .getAddResult()
  console.log(HexUtils.toString(src, true, true))
  hexParse.rdDataView = new DataView(src.buffer)
  for (const item of dataSource) {
    switch (item.dataType) {
      case DataTypeEm.Bool: item.value = hexParse.toBoolean(item.byteOffset, item.bitOffset); break;
      case DataTypeEm.Ushort: item.value = hexParse.toUint16(item.byteOffset, item.littleEndian); break;
      case DataTypeEm.Short: item.value = hexParse.toInt16(item.byteOffset, item.littleEndian); break;
      case DataTypeEm.Uint: item.value = hexParse.toUint32(item.byteOffset, item.littleEndian); break;
      case DataTypeEm.Int: item.value = hexParse.toInt32(item.byteOffset, item.littleEndian); break;
      case DataTypeEm.Float: item.value = hexParse.toFloat32(item.byteOffset, item.littleEndian); break;
      case DataTypeEm.Double: item.value = hexParse.toFloat64(item.byteOffset, item.littleEndian); break;
      case DataTypeEm.String: item.value = hexParse.toString(item.byteOffset, item.byteLength); break;
    }
    item.bytes = src.subarray(item.byteOffset, item.byteOffset + item.byteLength)
  }
  let result = ""
  dataSource.forEach(x => result += (x.toString() + "\r\n"))
  console.log(result)
})