const path = require("path");

const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");
require("express-async-errors");

const { generate } = require("./gen");
const { pool } = require("./dbConfig");

const viewsDir = path.join(__dirname, "views");

const app = express();

try {
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
  app.use(express.static(viewsDir));
  app.use(favicon(path.join(viewsDir, "favicon.ico")));
  app.use(compression());

  // ----------------------------------
  //               API
  // ----------------------------------

  app.post("/api/generate", async (req, res) => {
    const { workflow, options } = req.body;
    const { def, paths } = await generate(workflow, options);
    const { id } = await storeDef(def, paths);
    res.json({ def, id });
  });

  app.get("/api/defs/:id", async (req, res) => {
    const { def } = await getDefById(req.params.id);
    res.json({ def });
  });

  app.post("/api/register-paths", async (req, res) => {
    await registerPaths(req.body.id, res);
    res.json({ message: "Paths registered" });
  });

  /**
   * Register simplified static paths (e.g. `/git.svg`) pointing to node_modules paths
   * (e.g. `/node_modules/n8n-nodes-base/dist/nodes/Git/git.svg`), for a cleaner SVG.
   */
  const registerPaths = async (id, res) => {
    const sql = "SELECT paths FROM defs WHERE id = $1";
    const result = await pool.query(sql, [id]).then((r) => r.rows[0]);

    if (!result)
      return res
        .status(400)
        .json({ message: `No workflow with ID ${id} found` });

    for (const [simplified, nmPath] of Object.entries(result.paths)) {
      app.use(`/${simplified}`, express.static(path.join(__dirname, nmPath)));
    }
  };

  const getDefById = async (id) => {
    const sql = "SELECT def FROM defs WHERE id = $1;";
    return await pool.query(sql, [id]).then((r) => r.rows[0]);
  };

  const storeDef = async (def, paths) => {
    const sql = "INSERT INTO defs (def, paths) VALUES ($1, $2) RETURNING id;";
    return await pool.query(sql, [def, paths]).then((r) => r.rows[0]);
  };

  // ----------------------------------
  //               FE
  // ----------------------------------

  app.get("/results/:id", async (_, res) => {
    res.sendFile(path.join(viewsDir, "resultsId.html"));
  });

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`App listening on port ${port}`));
} catch (errors) {
  console.log(`Error Message: ${errors.message}`);
}
