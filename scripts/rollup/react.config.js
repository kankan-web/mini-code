import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from "./utils";
import generatePackageJson from "rollup-plugin-generate-package-json"; //生成打包后的package.json文件
const { name, module } = getPackageJSON("react");
//react包的路径
const pkgPath = resolvePkgPath(name);
//react产物路径
const pkgDistPath = resolvePkgPath(name, true);
/*
  rollup.config.js
  rollup的配置文件
  1. 配置文件需要导出一个对象
  2. 这个对象中需要有input,output,plugins三个属性
  3. input: 入口文件
  4. output: 出口文件
  5. plugins: 插件
*/
export default [
  //react
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      format: "umd",
      name: "index.js",
      // sourcemap: true,
    },
    //插件
    plugins: [
      ...getBaseRollupPlugins(),
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        //基本内容，并不是所有的react下的package.json字段都需要，故自定义一些必要的字段
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          main: "index.js", //打包产物为cmj模块，故可用main
        }),
      }),
    ],
  },
  // jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      //jsx-runtime.js
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        format: "umd",
        name: "jsx-runtime.js",
      },
      // jsx-dev-runtime
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        format: "umd",
        name: "jsx-dev-runtime.js",
      },
    ],
    //插件
    plugins: getBaseRollupPlugins(),
  },
];

