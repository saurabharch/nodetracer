const defaultConfig = {
  securityLevel: "loose",

  /**
   * One of `hidden`, 'showing'
   */
  removeStartNode: true,

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
  },
};

module.exports = { defaultConfig };
