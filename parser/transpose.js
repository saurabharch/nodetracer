const makeTypeParser = (nodes) => (name) => {
  if (!name) return null;

  return nodes.find((n) => n.name === name).type; // compare without highlighter
};

/**
 * Restructure connections from one to many, to one to one.
 */
function transpose(connections, nodes) {
  const parseType = makeTypeParser(nodes);
  return connections
    .filter((c) => c.targets.length > 0) // some workflows have empty array as target
    .map((c) => {
      if (c.targets.length === 1) {
        return {
          source: {
            name: c.source,
            type: parseType(c.source),
          },
          target: {
            name: c.targets[0],
            type: parseType(c.targets[0]),
          },
        };
      }

      return c.targets.map((t) => ({
        source: {
          name: c.source,
          type: parseType(c.source),
        },
        target: {
          name: t,
          type: parseType(t),
        },
      }));
    })
    .flat();
}

module.exports = { transpose };
