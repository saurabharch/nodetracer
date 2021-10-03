const fs = require("fs");

const readFile = (filePath) =>
  fs.promises.readFile(filePath, { encoding: "utf8" });

const writeFile = (filePath, data) => fs.promises.writeFile(filePath, data);

const writeDebugDef = (filePath, data) =>
  fs.promises.writeFile(filePath, `const debugDef = ${data}`);

module.exports = {
  readFile,
  writeFile,
  writeDebugDef,
};

// function findWorkflowOrigin(nodesAndConnections) {
//   const targets = nodesAndConnections.connections.reduce((acc, cur) => {
//     acc.push(...cur.targets);
//     return acc;
//   }, []);

//   const names = nodesAndConnections.nodes.reduce((acc, cur) => {
//     acc.push(cur.name);
//     return acc;
//   }, []);

//   return names.filter((n) => !targets.includes(n));
// }
