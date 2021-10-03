const fs = require("fs");
const path = require("path");

const NODES_BASE_DIR_PATH = path.resolve(
  process.cwd(),
  "node_modules",
  "n8n-nodes-base"
);

const pathMap = makePathMap();

async function addImages(transposed) {
  const promises = transposed.map(async (i) => {
    return {
      source: {
        name: i.source.name,
        img: await getImgPathFromType(i.source.type),
        type: i.source.type,
      },
      target: {
        name: i.target.name,
        img: await getImgPathFromType(i.target.type),
        type: i.target.type,
      },
    };
  });

  return await Promise.all(promises);
}

const isFreeFloatingNode = (nodePathParts) => nodePathParts.length === 3;

const imgElement = (filePath) => `<img src='${filePath}' />`;

async function getImgPathFromType(nodeType) {
  if (!nodeType) return null;

  const pathMapKey = nodeType
    .split(".")
    .pop()
    .toLowerCase()
    .replace("trigger", "");

  if (!pathMap[pathMapKey]) {
    throw new Error(`Mapping failed for key:\n${pathMapKey}`);
  }

  const nodePathParts = pathMap[pathMapKey].split("/");

  if (isFreeFloatingNode(nodePathParts)) {
    const nodePath = path.resolve(NODES_BASE_DIR_PATH, ...nodePathParts);
    const [NodeClass] = Object.values(require(nodePath));
    const nodeInstance = new NodeClass();
    const { icon } = nodeInstance.description;

    if (icon.startsWith("file:")) {
      const filePath = path.resolve(
        nodePath.split("/").slice(0, -1).join("/"),
        icon.split("file:").pop()
      );
      return imgElement(filePath);
    } else if (icon.startsWith("fa:")) {
      // TODO: Delete me
      const { color } = nodeInstance.description.defaults;
      console.log(icon, color);
      // ------------
      return icon.replace("fa:", "fa:fa-");
    }
  }

  // directoried node

  const nodePath = path.resolve(
    NODES_BASE_DIR_PATH,
    ...nodePathParts.slice(0, -1)
  );

  const filesAtDir = await fs.promises.readdir(nodePath);

  const imgFile = filesAtDir.find(
    (f) => f.endsWith(".svg") || f.endsWith(".png")
  );

  if (!imgFile) {
    try {
      return getFontAwesomeIcon(nodeType, nodePath); // dir'd node with FA icon (edge case)
    } catch {
      throw new Error(`No image found for ${nodeType}`);
    }
  }

  const filePath = path.resolve(nodePath, imgFile);

  return imgElement(filePath);
}

function getFontAwesomeIcon(nodeType, nodePath) {
  const nodeName = nodeType.split(".").pop();
  const nodeFileName = nodeName.charAt(0).toUpperCase() + nodeName.slice(1);
  const fileContent = require(path.resolve(
    nodePath,
    `${nodeFileName}.node.js`
  ));
  const [NodeClass] = Object.values(fileContent);
  const nodeInstance = new NodeClass();
  const faIcon = nodeInstance.description.icon.replace("fa:", "fa:fa-");

  // TODO: Delete this -------------------------
  const { color } = nodeInstance.description.defaults;
  console.log(faIcon, color);
  // ------------------------------------------

  return faIcon;
}

/**
 * Make a map from lowercased brand to node dir path.
 */
function makePathMap() {
  const nodesBasePackageJson = require(path.resolve(
    NODES_BASE_DIR_PATH,
    "package.json"
  ));

  return nodesBasePackageJson.n8n.nodes.reduce((acc, cur) => {
    let key = cur.replace("dist/nodes/", "").split("/");

    key =
      key.length > 2
        ? (key[0] + key[1]).toLowerCase() // nested dir as prefix, e.g. awss3
        : key.shift().toLowerCase().replace(".node.js", "");

    acc[key] = cur;
    return acc;
  }, {});
}

module.exports = { getImgPathFromType, addImages };
