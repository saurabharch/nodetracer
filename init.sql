CREATE TABLE defs (
  id SERIAL PRIMARY KEY,
  def TEXT NOT NULL,
  paths JSON NOT NULL
);

INSERT INTO defs (def, paths)
VALUES  ('testDef', '{"urlScanIo.svg":"node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg","emelia.svg":"node_modules/n8n-nodes-base/dist/nodes/Emelia/emelia.svg","airtable.svg":"node_modules/n8n-nodes-base/dist/nodes/Airtable/airtable.svg","git.svg":"node_modules/n8n-nodes-base/dist/nodes/Git/git.svg","asana.svg":"node_modules/n8n-nodes-base/dist/nodes/Asana/asana.svg"}');