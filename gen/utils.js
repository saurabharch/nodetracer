function deepMerge(...objects) {
  let result = {};

  for (const o of objects) {
    for (let [key, value] of Object.entries(o)) {
      if (value instanceof Object && key in result) {
        value = deepMerge(result[key], value);
      }

      result = { ...result, [key]: value };
    }
  }

  return result;
}

module.exports = {
  deepMerge,
};
