function markIfBranches(imagified) {
  const hasIf = imagified.filter((c) => c.source.type === "n8n-nodes-base.if");

  if (!hasIf) return imagified;

  let branchType = true; // alternating true-false-true-false etc.

  for (const c of imagified) {
    if (c.source.type === "n8n-nodes-base.if") {
      c.source.branchType = branchType;
      branchType = !branchType;
    }
  }

  return imagified;
}

module.exports = { markIfBranches };
