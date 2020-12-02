import { DataTypeEm } from "../../src/core/dataTypeEm"

const right = "正确情况"

test(`${right}：DataTypeEm`, () => {
  console.log(DataTypeEm.Bool)
  console.log(DataTypeEm["Ushort"])
})