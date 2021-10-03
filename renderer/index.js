mermaid.mermaidAPI.initialize(rendererConfig);

var exampleCallback = function () {
  alert("Example callback was triggered!!");
};

const embedSvg = function (svgCode, bindFunctions) {
  document.getElementById("canvas").innerHTML = svgCode;
};

mermaid.mermaidAPI.render("mermaid", debugDef, embedSvg);
