const fs = require("fs");
const path = require("path");

// example: `npm run debug -- 3`

const wf = require(`./_trash/workflows/workflow${process.argv.pop()}.json`);
const writePath = path.resolve(__dirname, "views", "debugWorkflow.js");

fs.promises.writeFile(
  writePath,
  `const debugWorkflow = ${JSON.stringify(wf, null, 2)}`
);
