import DataUnit from "../../src/core/dataUnit"

const right = "正确情况"

test(`${right}：init`, () => {
  const dataUnit = new DataUnit()
  const json = { description: "报警内容", unit: "", name: "alarmContent", byteOffset: 44, bitOffset: 0, count: 20, dataType: "string", littleEndian: false }
  dataUnit.init(json)
  expect(dataUnit.description).toEqual("报警内容")
  expect(dataUnit.byteOffset).toEqual(44)
})

test(`${right}：batchInit`, () => {
  const jsonObj = [
    { description: "运行状态", unit: "", name: "runStatus", byteOffset: 0, bitOffset: 0, count: 1, dataType: "bool", littleEndian: false },
    { description: "报警状态", unit: "", name: "alarmStatus", byteOffset: 0, bitOffset: 1, count: 1, dataType: "bool", littleEndian: false },
    { description: "自动状态", unit: "", name: "autoStatus", byteOffset: 0, bitOffset: 2, count: 1, dataType: "bool", littleEndian: false },
    { description: "生产数量", unit: "个", name: "productNumber", byteOffset: 1, bitOffset: 0, count: 1, dataType: "int", littleEndian: false },
    { description: "电流", unit: "A", name: "current", byteOffset: 5, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
    { description: "电压", unit: "V", name: "voltage", byteOffset: 9, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
    { description: "温度", unit: "℃", name: "temperature", byteOffset: 13, bitOffset: 0, count: 2, dataType: "double", littleEndian: false },
    { description: "频率", unit: "Hz", name: "frequency", byteOffset: 29, bitOffset: 0, count: 2, dataType: "float", littleEndian: false },
    { description: "用户名", unit: "", name: "username", byteOffset: 37, bitOffset: 0, count: 7, dataType: "string", littleEndian: false },
    { description: "报警内容", unit: "", name: "alarmContent", byteOffset: 44, bitOffset: 0, count: 20, dataType: "string", littleEndian: false }
  ]
  const data = DataUnit.batchInit(jsonObj)
  expect(data).toHaveLength(10)
})