const fs = require("fs");
const path = require("path");
const { main } = require("..");

(async () => {
  const mocksDir = path.resolve(__dirname, "..", "..", "trash", "workflows");
  const filesAtDir = await fs.promises.readdir(mocksDir);
  filesAtDir.forEach(main);
})();
