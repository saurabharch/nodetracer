function makeDef(imagified, { type }, config) {
  const {
    flowchart: { arrowType, direction },
  } = config;

  return imagified
    .reduce(
      (acc, { source, target }) => {
        const sourceName = escapeName(source.name);
        const targetName = escapeName(target.name);

        const lineSource = `${sourceName}(${source.img})`;
        const lineTarget = `${targetName}(${target.img})`;

        if (source.type === "n8n-nodes-base.if") {
          const label = source.branchType ? "T" : "F";
          acc.push(`${lineSource} ${arrowType}|${label}| ${lineTarget}`);
        } else {
          acc.push(`${lineSource} ${arrowType} ${lineTarget}`);
        }

        if (source.highlighted) {
          acc.push(`class ${sourceName} highlight`);
        } else {
          acc.push(`class ${sourceName} standardNode`);
        }

        if (!targetClassIsCovered(acc, targetName)) {
          acc.push(`class ${targetName} standardNode`);
        }

        acc.push(makeDocsClickLine(source.type, sourceName));

        if (!targetClickIsCovered(acc, targetName)) {
          acc.push(makeDocsClickLine(target.type, targetName));
        }

        return acc;
      },
      [`graph ${direction}`]
    )
    .join(getSeparator(type));
}

/**
 * Return whether a target's click line is already covered by a source's click line.
 */
function targetClickIsCovered(acc, targetName) {
  return acc.some((line) => line.startsWith(`click ${targetName}`));
}

function targetClassIsCovered(acc, targetName) {
  return acc.some((line) => line === `class ${targetName} standardNode`);
}

function makeDocsClickLine(type, name) {
  const link = `https://docs.n8n.io/nodes/${type}`;
  return `click ${name} "${link}" _blank`;
}

function getSeparator(type) {
  if (type === "compact") return ";";
  if (type === "readable") return "\n\t";

  throw new Error("Type must be `compact` or `readable`");
}

function escapeName(name) {
  return name.replace(/\s/g, "");
}

module.exports = { makeDef };
