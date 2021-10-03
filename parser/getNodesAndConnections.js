function getNodesAndConnections(json) {
  const nodes = json.nodes.map(({ name, type }) => ({
    name,
    type,
  }));

  let { connections } = json;

  if (containHighlight(nodes)) {
    connections = replicateHighlight(nodes, json.connections);
  }

  const simplified = Object.entries(connections).map((entry) => {
    const [source, targetsContainer] = entry;

    if (targetsContainer.main.length === 1) {
      const targets = targetsContainer.main[0].map(({ node: name }) => name);
      return { source, targets };
    }

    const targets = targetsContainer.main.map((i) => i[0].node);

    return { source, targets };
  });

  return { nodes, connections: simplified };
}

const containHighlight = (nodes) => nodes.some((n) => n.name.endsWith("*"));

/**
 * Replicate `*` suffix in node name to node names in sources and targets in connections.
 */
function replicateHighlight(nodes, connections) {
  for (const node of nodes) {
    if (node.name.endsWith("*")) {
      for (let [source, targetsContainer] of Object.entries(connections)) {
        if (source === node.name.replace("*", "")) {
          delete connections[source]; // delete *-less name
          source = node.name; // set *-suffixed name
        }

        for (const t of targetsContainer.main.flat()) {
          if (t.node === node.name.replace("*", "")) {
            t.node = node.name;
          }
        }

        connections[source] = targetsContainer;
      }
    }
  }

  return connections;
}

module.exports = { getNodesAndConnections };
