const path = require("path");
const favicon = require("serve-favicon");
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const { generate } = require("./gen");

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

// body parser alt
app.use(express.urlencoded({ extended: true }));
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
    res.json({ def });
  } catch (error) {
    res.status(400).json({ message: "Failed to generate SVG for workflow" });
  }
});

app.get("/result", (req, res) => {
  for (const [simplfied, nmPath] of Object.entries(staticServerPaths)) {
    app.use(`/${simplfied}`, express.static(path.join(__dirname, nmPath)));
  }

  res.sendFile(path.join(viewsPath, "result.html"));
});

app.listen(port, () => console.log(`App listening on port ${port}`));

// temp - remove later
const debugDef =
  'graph LR;IF(fa:fa-map-signs) -->|T| Trello(<img src=\'/trello.svg\' />);class IF standardNode;class Trello standardNode;click IF "https://docs.n8n.io/nodes/n8n-nodes-base.if" _blank;click Trello "https://docs.n8n.io/nodes/n8n-nodes-base.trello" _blank;IF(fa:fa-map-signs) -->|F| NoOp(fa:fa-arrow-right);class IF standardNode;class NoOp standardNode;click IF "https://docs.n8n.io/nodes/n8n-nodes-base.if" _blank;click NoOp "https://docs.n8n.io/nodes/n8n-nodes-base.noOp" _blank;Set(fa:fa-pen) --> Airtable*(<img src=\'/airtable.svg\' />);class Set standardNode;class Airtable* standardNode;click Set "https://docs.n8n.io/nodes/n8n-nodes-base.set" _blank;click Airtable* "https://docs.n8n.io/nodes/n8n-nodes-base.airtable" _blank;TypeformTrigger(<img src=\'/typeform.svg\' />) --> Set(fa:fa-pen);class TypeformTrigger standardNode;click TypeformTrigger "https://docs.n8n.io/nodes/n8n-nodes-base.typeformTrigger" _blank;Airtable*(<img src=\'/airtable.svg\' />) --> IF(fa:fa-map-signs);class Airtable* highlight;click Airtable* "https://docs.n8n.io/nodes/n8n-nodes-base.airtable" _blank';
