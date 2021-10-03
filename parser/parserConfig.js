const parserConfig = {
  securityLevel: "loose",
  removeStartNode: false,

  flowchart: {
    /**
     * One of `LR`, `TB`.
     */
    direction: "LR",

    /**
     * One of `-->`, `==>`, `-.->`
     * Add dashes for longer arrows: ---->
     */
    arrowType: "-->",

    // arrow length is _not_ available in Mermaid.js v8.0.0
  },
};

module.exports = { parserConfig };
