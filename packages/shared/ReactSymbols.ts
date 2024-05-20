//#MARK:为什么叫Symbols，为了防止其他人滥用ReactElement，所有要将reactElement定义为独一无二的值
//1.查看是否支持Symbol
const supportSymbol = typeof Symbol === "function" && Symbol.for;
//2.若支持则导出唯一值，若不支持导出某个数
export const REACT_ELEMENT_TYPE = supportSymbol
  ? Symbol.for("react.element")
  : 0xeac7;
