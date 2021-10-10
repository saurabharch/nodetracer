const path = require("path");
const favicon = require("serve-favicon");
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const { generate } = require("./gen");
const { pool } = require("./dbConfig");
const { writeStoredDef } = require("./gen/utils");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const viewsPath = path.join(__dirname, "views");

app.use(express.urlencoded({ extended: true })); // body parser
app.use(express.json());

app.use(express.static(viewsPath));

app.use(favicon(path.join(viewsPath, "favicon.ico")));

app.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, "index.html"));
});

let staticServerPaths = {};

app.post("/api/generate", async (req, res) => {
  const { workflow, options } = req.body;

  if (!workflow) {
    res.status(400).json({ message: "Workflow missing" });
  }

  let json;

  try {
    json = JSON.parse(workflow);
  } catch (error) {
    return res.status(400).json({ message: "Invalid JSON" }).end();
  }

  try {
    const { def, serverPaths } = await generate(json, options);
    staticServerPaths = serverPaths;

    const dbResult = await pool.query(
      "INSERT INTO defs (def, paths) VALUES ($1, $2) RETURNING id",
      [def, serverPaths]
    );

    const { id } = dbResult.rows[0];

    res.json({ def, id });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to generate and store SVG for workflow" });
  }
});

app.get("/result", (req, res) => {
  for (const [simplified, nmPath] of Object.entries(staticServerPaths)) {
    app.use(`/${simplified}`, express.static(path.join(__dirname, nmPath)));
  }

  res.sendFile(path.join(viewsPath, "result.html"));
});

app.get("/results/:id", async (req, res) => {
  const { id } = req.params;

  const dbResult = await pool.query(
    "SELECT def, paths FROM defs WHERE id = $1",
    [id]
  );

  const { def, paths } = dbResult.rows[0];

  console.log(paths);
  for (const [simplified, nmPath] of Object.entries(paths)) {
    app.use(`/${simplified}`, express.static(path.join(__dirname, nmPath)));
  }
  console.log("paths applied");

  const writePath = path.resolve(__dirname, "views", "storedDef.js");
  await writeStoredDef(writePath, `\`${def}\``);
  console.log("stored def written");

  // function sleep(time) {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // }

  // await sleep(1000);

  console.log("sending file...");
  res.sendFile(path.join(viewsPath, "resultsId.html"));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
