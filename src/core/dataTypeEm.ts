export enum DataTypeEm {
  // 位
  Bool = "Bool",
  // unshort 2个字节
  Ushort = "Ushort",
  // short 2个字节
  Short = "Short",
  // int 4个字节
  Int = "Int",
  // int 4个字节
  Uint = "Uint",
  // // long 8个字节
  // Long,
  // // unlong 8个字节
  // Ulong,
  // float 4个字节
  Float = "Float",
  // double 8个字节
  Double = "Double",
  // string 1个字节
  String = "String",
}

/**
 * 字符串和枚举之间的映射关系
 */
export const dataTypeEmMap: { [index: string]: DataTypeEm } = {
  "bool": DataTypeEm.Bool,
  "ushort": DataTypeEm.Ushort,
  "short": DataTypeEm.Short,
  "int": DataTypeEm.Int,
  "uint": DataTypeEm.Uint,
  "float": DataTypeEm.Float,
  "double": DataTypeEm.Double,
  "string": DataTypeEm.String

}
