import path from "path";
import fs from "fs";
import ts from "rollup-plugin-typescript2";
import cjs from "@rollup/plugin-commonjs";

const pkgPath = path.resolve(__dirname, "../../packages"); //包路径
const distPath = path.resolve(__dirname, "../../dist/node_modules"); //打包产物路径

export function resolvePkgPath(pkgName, isDist) {
  if (isDist) {
    //如果是打包路径，则返回打包产物路径
    return `${distPath}/${pkgName}`;
  }
  //返回包路径
  return `${pkgPath}/${pkgName}`;
}
export function getPackageJSON(pkgName) {
  //。。。包路径
  const path = `${resolvePkgPath(pkgName)}/package.json`; //获取包地址下的package.json
  const str = fs.readFileSync(path, { encoding: "utf-8" }); //读取文件为string
  return JSON.parse(str);
}
export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [cjs(), ts(typescript)];
}
