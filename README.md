<p align="center">
  <a href="https://github.com/ivov/nodetracer">
    <img src="https://i.ibb.co/RDh0XnV/nodetracer-logo.png" width="180px">
  </a>
</p>

## ⚙️👨‍💻 Nodetracer

Generating Workflow SVG Image and visualize it.

<br></br>

#### 📝Notes

> > First Create the in your postgresql DB 💾 with datatable name defs

With Docker Postgres Container. first make sure 5432 port is available

```sh

docker run --name postgres -p 5432:5432 -v ${pwd}/postgresql_data:/var/lib/postgresql/data -v postgresql:/var/lib/postgresql -e POSTGRES_USER=postgres POSTGRES_PASSWORD=password POSTGRES_DB=whoa -e DOCKER_HOST=tcp://docker:2376 --network=bridge --restart=on-failure postgres:latest

```

```sh

docker exec -it container-id psql -U postgres whoa

```

📰 create table in database

```sh

CREATE TABLE defs (
  id SERIAL PRIMARY KEY,
  def TEXT NOT NULL,
  paths JSON NOT NULL
);

```

➕ Add some example data

```sh

INSERT INTO defs (def, paths) VALUES  ('testDef', '{"urlScanIo.svg":"node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg","emelia.svg":"node_modules/n8n-nodes-base/dist/nodes/Emelia/emelia.svg","airtable.svg":"node_modules/n8n-nodes-base/dist/nodes/Airtable/airtable.svg","git.svg":"node_modules/n8n-nodes-base/dist/nodes/Git/git.svg","asana.svg":"node_modules/n8n-nodes-base/dist/nodes/Asana/asana.svg"}');

```

than after exit from the database.

Testing locally your setting is running perfectly fine with your database and query

```sh

npm install && npm run dev

```

Test The Workflow SVG generation

(go to)[https://n8n.io/workflows/] and select any workflow example

click on use template , sample workflow is copied in your clipboard than past this copied workflow
in your running (application)[http://localhost:5000] and paste it in workflow text area, than customise it as you wish steps flow and click on generate button.
