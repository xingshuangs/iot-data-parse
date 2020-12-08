export enum DataTypeEm {
  // 位 bool 1个字节
  Bool = "bool",
  // 字节 byte 1个字节
  Byte = "byte",
  // unshort 2个字节
  Ushort = "ushort",
  // short 2个字节
  Short = "short",
  // int 4个字节
  Int = "int",
  // int 4个字节
  Uint = "uint",
  // // long 8个字节
  // Long,
  // // unlong 8个字节
  // Ulong,
  // float 4个字节
  Float = "float",
  // double 8个字节
  Double = "double",
  // string 1个字节
  String = "string",
}

/**
 * 字符串和枚举之间的映射关系
 */
export const dataTypeEmMap: { [index: string]: DataTypeEm } = {
  "bool": DataTypeEm.Bool,
  "byte": DataTypeEm.Byte,
  "ushort": DataTypeEm.Ushort,
  "short": DataTypeEm.Short,
  "int": DataTypeEm.Int,
  "uint": DataTypeEm.Uint,
  "float": DataTypeEm.Float,
  "double": DataTypeEm.Double,
  "string": DataTypeEm.String
}

