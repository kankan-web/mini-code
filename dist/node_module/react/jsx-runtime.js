(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["jsx-runtime"] = global["jsx-runtime"] || {}, global["jsx-runtime"].js = {})));
})(this, (function (exports) { 'use strict';

  //#MARK:为什么叫Symbols，为了防止其他人滥用ReactElement，所有要将reactElement定义为独一无二的值
  //1.查看是否支持Symbol
  const supportSymbol = typeof Symbol === "function" && Symbol.for;
  //2.若支持则导出唯一值，若不支持导出某个数
  const REACT_ELEMENT_TYPE = supportSymbol
      ? Symbol.for("react.element")
      : 0xeac7;

  //ReactElement
  const ReactElement = function (type, key, ref, props) {
      const element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          __mark: "Egg",
      };
      return element;
  };
  const jsx = (type, config, ...maybeChildren) => {
      let key = null;
      const props = {};
      let ref = null;
      for (const prop in config) {
          const val = config[props];
          if (prop === "key") {
              if (val !== undefined) {
                  key = "" + val;
              }
              continue;
          }
          if (props === "ref") {
              if (val !== undefined) {
                  ref = val;
              }
              continue;
          }
          if ({}.hasOwnProperty.call(config, prop)) {
              props[prop] = val;
          }
      }
      const maybeChildrenLength = maybeChildren.length;
      if (maybeChildrenLength) {
          if (maybeChildrenLength === 1) {
              props.children = maybeChildren[0];
          }
          else {
              props.children = maybeChildren;
          }
      }
      return ReactElement(type, key, ref, props);
  };
  const jsxDEV = jsx;

  exports.jsx = jsx;
  exports.jsxDEV = jsxDEV;

}));
