import DataUnit from "../../src/core/dataUnit"
import HexParse from "../../src/core/hexParse"
// import HexUtils from "../../src/utils/hexUtils";
import { dataTypeEmMap } from "../../src/core/dataTypeEm"

const right = "正确情况"

const dataSource: DataUnit[] = []
const json = [
  { description: "运行状态", unit: "", name: "runStatus", byteOffset: 0, bitOffset: 0, count: 1, dataType: "bool", littleEndian: false },
  { description: "报警状态", unit: "", name: "alarmStatus", byteOffset: 0, bitOffset: 1, count: 1, dataType: "bool", littleEndian: false },
  { description: "自动状态", unit: "", name: "autoStatus", byteOffset: 0, bitOffset: 2, count: 1, dataType: "bool", littleEndian: false },
  { description: "生产数量", unit: "个", name: "productNumber", byteOffset: 1, bitOffset: 0, count: 1, dataType: "int", littleEndian: false },
  { description: "电流", unit: "A", name: "current", byteOffset: 5, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
  { description: "电压", unit: "V", name: "voltage", byteOffset: 9, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
  { description: "温度1", unit: "℃", name: "temperature1", byteOffset: 13, bitOffset: 0, count: 1, dataType: "double", littleEndian: false },
  { description: "温度2", unit: "℃", name: "temperature2", byteOffset: 21, bitOffset: 0, count: 1, dataType: "double", littleEndian: false },
  { description: "频率1", unit: "Hz", name: "frequency1", byteOffset: 29, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
  { description: "频率2", unit: "Hz", name: "frequency2", byteOffset: 33, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
  { description: "用户名", unit: "", name: "username", byteOffset: 37, bitOffset: 0, count: 10, dataType: "string", littleEndian: false },
  { description: "报警内容", unit: "", name: "alarmContent", byteOffset: 47, bitOffset: 0, count: 20, dataType: "string", littleEndian: false }
]

for (const item of json) {
  const data: DataUnit = new DataUnit()
  data.description = item.description
  data.unit = item.unit
  data.name = item.name
  data.byteOffset = item.byteOffset
  data.bitOffset = item.bitOffset
  data.count = item.count
  data.littleEndian = item.littleEndian
  data.dataType = dataTypeEmMap[item.dataType]
  dataSource.push(data)
}

test(`${right}：example1`, () => {
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
  // console.log(HexUtils.toString(src, true))
  hexParse.rdDataView = new DataView(src.buffer)
  dataSource.forEach(x => x.extractValue(hexParse))
  let result = ""
  dataSource.forEach(x => result += (x.toString() + "\r\n"))
  console.log(result)
})