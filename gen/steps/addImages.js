const fs = require("fs");
const path = require("path");

const NODES_BASE_DIR_PATH = path.resolve(
  process.cwd(),
  "node_modules",
  "n8n-nodes-base"
);

// example simplified-to-nmPath entry
// { trello: node_modules/n8n-nodes-base/dist/nodes/Trello/trello.svg }

async function addImages(transposed) {
  const paths = {};

  const promises = transposed.map(async (i) => {
    const { img: sourceImg, mapping: sourceServerPaths } =
      await getImgPathFromType(i.source.type);
    const { img: targetImg, mapping: targetServerPaths } =
      await getImgPathFromType(i.target.type);

    if (sourceServerPaths) {
      for (const [simplePath, nmPath] of Object.entries(sourceServerPaths)) {
        paths[simplePath] = nmPath;
      }
    }

    if (targetServerPaths) {
      for (const [simplePath, nmPath] of Object.entries(targetServerPaths)) {
        paths[simplePath] = nmPath;
      }
    }

    return {
      source: {
        name: i.source.name,
        img: sourceImg,
        type: i.source.type,
      },
      target: {
        name: i.target.name,
        img: targetImg,
        type: i.target.type,
      },
    };
  });

  return {
    imagified: await Promise.all(promises),
    paths,
  };
}

const pathMap = makePathMap();

const isFreeFloatingNode = (nodePathParts) => nodePathParts.length === 3;

const imgElement = (filePath) => `<img src='${filePath}' />`;

async function getImgPathFromType(nodeType) {
  if (!nodeType) return null;

  let pathMapKey = nodeType
    .split(".")
    .pop()
    .toLowerCase()
    .replace("trigger", "");

  // edge case: folder name `Sheet` and node name `Sheets`
  if (pathMapKey === "googlesheets") {
    pathMapKey = pathMapKey.replace(/s$/, "");
  }

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
      const fullPath = path.resolve(
        nodePath.split("/").slice(0, -1).join("/"),
        icon.split("file:").pop()
      );
      const simplified = fullPath.split("/").pop();
      const nmPath = getNodesModulesPath(fullPath);

      return {
        img: imgElement(simplified),
        mapping: { [simplified]: nmPath },
      };
    } else if (icon.startsWith("fa:")) {
      // TODO: Delete me
      // const { color } = nodeInstance.description.defaults;
      // console.log(icon, color);
      // ------------
      return { img: icon.replace("fa:", "fa:fa-") };
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

  const fullPath = path.resolve(nodePath, imgFile);
  const simplified = fullPath.split("/").pop();
  const nmPath = getNodesModulesPath(fullPath);

  return {
    img: imgElement(`/${simplified}`),
    mapping: { [simplified]: nmPath },
  };
}

const getNodesModulesPath = (fullPath) => {
  return fullPath.substring(fullPath.indexOf("node_modules"));
};

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
  // const { color } = nodeInstance.description.defaults;
  // console.log(faIcon, color);
  // ------------------------------------------

  return { img: faIcon };
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
