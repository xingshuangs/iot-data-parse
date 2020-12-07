# IOT-DATA-PARSE

![npm-v1.0.1](https://img.shields.io/badge/npm-v1.0.1-brightgreen)

## CopyRight

@2019-2020 Oscura, All Rights Reserved

## How to get

```
npm install @oscura/iot-data-parse
```

## Description

Now, it is a demo.

## Target

For general data analysis of Internet of Things.

# Example

When the data uploaded by the device is as below.

```
{
	"status": true,
	"temperature": 126,
	"time": "1606630210",
}
```

The useful data is just like

```
true
126
1606630210
```

and "status","temperature","time" are useless and waste bandwidth. So we can convert the data as

```
true => 01
126 => 7E
1606630210 => 5F C3 3B 42

= 01 7E 5F C3 3B 42
```

At last, the data we need is "01 7E 5F C3 3B 42", when we get it, we can parse it out according to the rules.

# Instance

```
const dataSource: DataUnit[] = []
// data configuration that comes from xls file
const json = [
  { description: "运行状态", unit: "", name: "runStatus", byteOffset: 0, bitOffset: 0, count: 1, dataType: "bool", littleEndian: false },
  { description: "报警状态", unit: "", name: "alarmStatus", byteOffset: 0, bitOffset: 1, count: 1, dataType: "bool", littleEndian: false },
  { description: "自动状态", unit: "", name: "autoStatus", byteOffset: 0, bitOffset: 2, count: 1, dataType: "bool", littleEndian: false },
  { description: "生产数量", unit: "个", name: "productNumber", byteOffset: 1, bitOffset: 0, count: 1, dataType: "int", littleEndian: false },
  { description: "电流", unit: "A", name: "current", byteOffset: 5, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
  { description: "电压", unit: "V", name: "voltage", byteOffset: 9, bitOffset: 0, count: 1, dataType: "float", littleEndian: false },
  { description: "温度", unit: "℃", name: "temperature", byteOffset: 13, bitOffset: 0, count: 2, dataType: "double", littleEndian: false },
  { description: "频率", unit: "Hz", name: "frequency", byteOffset: 29, bitOffset: 0, count: 2, dataType: "float", littleEndian: false },
  { description: "用户名", unit: "", name: "username", byteOffset: 37, bitOffset: 0, count: 10, dataType: "string", littleEndian: false },
  { description: "报警内容", unit: "", name: "alarmContent", byteOffset: 47, bitOffset: 0, count: 20, dataType: "string", littleEndian: false }
]

// create data configuration
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

// create data source in Uint8Array
const hexParse = new HexParse()
const src = hexParse.addUint8(0x07)
  // productNumber
  .addInt32(153)
  // current
  .addFloat32(32.15)
  // voltage
  .addFloat32(55.24)
  // temperature
  .addFloat64Array([37.22, 38.51])
  // frequency
  .addFloat32Array([20.125, 32.811])
  // username
  .addString("xingshuang")
  // alarmContent
  .addString("今天天气好")
  .getAddResult()
hexParse.rdDataView = new DataView(src.buffer)

// parse data
dataSource.forEach(x => x.extractValue(hexParse))
let result = ""
dataSource.forEach(x => result += (x.toString() + "\r\n"))
console.log(result)
```

result：

```
  运行状态: true
  报警状态: true
  自动状态: true
  生产数量: 153 个
  电流: 32.150001525878906 A
  电压: 55.2400016784668 V
  温度: 37.22 ℃, 38.51 ℃
  频率: 20.125 Hz, 32.81100082397461 Hz
  用户名: xingshuang
  报警内容: 今天天气好
```
