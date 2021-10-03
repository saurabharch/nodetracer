function setHighlight(marked) {
  for (const c of marked) {
    if (c.source.name.endsWith("*")) {
      c.source.highlighted = true;
    }
  }

  return marked;
}

module.exports = { setHighlight };
