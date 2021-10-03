const path = require("path");
const { getNodesAndConnections } = require("./getNodesAndConnections");
const { transpose } = require("./transpose");
const { markIfBranches } = require("./markIfBranches");
const { setHighlight } = require("./setHighlight");
const { addImages } = require("./addImages");
const { makeDef } = require("./makeDef");
const { writeFile, writeDebugDef } = require("./utils");
const { parserConfig } = require("./parserConfig");

const WORKFLOW_TO_PARSE = "../workflows/workflow5.json";

async function main() {
  const json = require(WORKFLOW_TO_PARSE);
  let { nodes, connections } = getNodesAndConnections(json);

  connections = parserConfig.removeStartNode
    ? connections.filter((c) => c.source !== "Start")
    : connections;

  // console.log(JSON.stringify(connections, null, 2));
  // console.log(JSON.stringify(nodes, null, 2));
  const transposed = transpose(connections, nodes);
  const imagified = await addImages(transposed);

  const marked = markIfBranches(imagified);
  const highlighted = setHighlight(marked);

  console.log(highlighted);

  // const def = makeDef(imagified, { type: "compact" });
  // writeFile("compactDef.mmd", JSON.stringify({ def }));

  // const def = makeDef(imagified, { type: "readable" });
  // writeFile("readableDef.md", def);

  const def = makeDef(highlighted, { type: "compact" });
  const writePath = path.resolve(__dirname, "..", "renderer", "debugDef.js");
  writeDebugDef(writePath, `"${def}"`);
}

main(WORKFLOW_TO_PARSE);

// console.log(JSON.stringify(nodesAndConnections, null, 2));
// const svgPaths = await Promise.all(types.map(findSvgPath));

// for (let i = 0; i < svgPaths.length; i++) {
//   const svgString = await readFile(svgPaths[i]);
// }

// canvas.svg(str) to import
// canvas.svg() to export

module.exports = { main };
