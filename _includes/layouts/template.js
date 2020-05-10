function html(literals, ...keys) {
  let raw = literals.raw,
    result = "",
    i = 1,
    len = arguments.length,
    str,
    variable;

  while (i < len) {
    str = raw[i - 1];
    variable = keys[i - 1];
    result += str + variable;
    i++;
  }
  result += raw[raw.length - 1];
  return result;
}

module.exports = {
  html
};
