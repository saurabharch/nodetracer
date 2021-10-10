const path = require("path");
const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");

const { generate } = require("./gen");
const { pool } = require("./dbConfig");

const viewsPath = path.join(__dirname, "views");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(viewsPath));
app.use(favicon(path.join(viewsPath, "favicon.ico")));
app.use(compression());

// ----------------------------------
//               API
// ----------------------------------

app.post("/api/generate", async (req, res) => {
  try {
    const { workflow, options } = req.body;
    const json = JSON.parse(workflow);
    const { def, paths } = await generate(json, options);
    const { id } = await storeDefAndPaths(def, paths);
    res.json({ def, id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!!" });
  }
});

app.get("/api/defs/:id", async (req, res) => {
  try {
    const { def } = await getDefById(req.params.id);
    res.json({ def });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!!" });
  }
});

const getDefById = async (id) => {
  const sql = "SELECT def FROM defs WHERE id = $1";
  return await pool.query(sql, [id]).then((dbResult) => dbResult.rows[0]);
};

const storeDefAndPaths = async (def, paths) => {
  const sql = "INSERT INTO defs (def, paths) VALUES ($1, $2) RETURNING id";
  return await pool.query(sql, [def, paths]).then((ret) => ret.rows[0]);
};

// ----------------------------------
//               FE
// ----------------------------------

app.get("/", (_, res) => {
  res.sendFile(path.join(viewsPath, "index.html"));
});

app.get("/result", (req, res) => {
  for (const [simplified, nmPath] of Object.entries(staticServerPaths)) {
    app.use(`/${simplified}`, express.static(path.join(__dirname, nmPath)));
  }

  res.sendFile(path.join(viewsPath, "result.html"));
});

app.get("/results/:id", async (req, res) => {
  const sql = "SELECT paths FROM defs WHERE id = $1";
  const { paths } = await pool
    .query(sql, [req.params.id])
    .then((ret) => ret.rows[0]);

  for (const [simplified, nmPath] of Object.entries(paths)) {
    app.use(`/${simplified}`, express.static(path.join(__dirname, nmPath)));
  }

  res.sendFile(path.join(viewsPath, "resultsId.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}`));
