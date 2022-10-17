const defaultDefConfig = {
  securityLevel: "loose",
  removeStartNode: true,
  flowchart: {
    /**
     * One of `LR`, `TB`, `RL`, `BT`.
     */
    direction: "LR",

    /**
     * One of `-->`, `==>`, `-.->`
     */
    arrowType: "-->",
  },
};

module.exports = { defaultDefConfig };
