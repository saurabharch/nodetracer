const fs = require("fs");

const readFile = (filePath) =>
  fs.promises.readFile(filePath, { encoding: "utf8" });

const writeFile = (filePath, data) => fs.promises.writeFile(filePath, data);

const writeDebugDef = (filePath, data) =>
  fs.promises.writeFile(filePath, `const debugDef = ${data}`);

function deepMerge(...objects) {
  let result = {};

  for (const o of objects) {
    for (let [key, value] of Object.entries(o)) {
      if (value instanceof Object && key in result) {
        value = deepMerge(result[key], value);
      }

      result = { ...result, [key]: value };
    }
  }

  return result;
}

module.exports = {
  deepMerge,
  readFile,
  writeFile,
  writeDebugDef,
};
