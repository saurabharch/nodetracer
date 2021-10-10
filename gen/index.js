const { getNodesAndConnections } = require("./getNodesAndConnections");
const { deepMerge } = require("./utils");
const { defaultConfig } = require("./defaultConfig");

const { transpose } = require("./steps/transpose");
const { markIfBranches } = require("./steps/markIfBranches");
const { setHighlight } = require("./steps/setHighlight");
const { addImages } = require("./steps/addImages");
const { makeDef } = require("./steps/makeDef");

async function generate(json, options) {
  let { nodes, connections } = getNodesAndConnections(json);

  const config = deepMerge(defaultConfig, options);

  connections = config.removeStartNode
    ? connections.filter((c) => c.source !== "Start")
    : connections;

  const transposed = transpose(connections, nodes);
  const { imagified, paths } = await addImages(transposed);
  const marked = markIfBranches(imagified);
  const highlighted = setHighlight(marked);

  return {
    def: makeDef(highlighted, { type: "compact" }, config),
    paths,
  };
}

module.exports = { generate };
