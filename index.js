var r = /(\D\w+)\.\.(\D\w+)\(/;

function dotdot(str) {
  var matches = r.exec(str);
  console.log('matches', matches);
  if (!matches) {
    return str;
  }
  var before = str.substr(0, matches.index);
  console.log('before', before);
  var after = str.substr(matches.index + matches[0].length);
  console.log('after', after);
  var reference = matches[1];
  var functionName = matches[2];
  var bound = before + reference + '.' + functionName + '.bind(' + reference;
  if (after[0] === ')') {
    return bound + after;
  } else {
    return bound + ', ' + after;
  }
}

dotdot.r = r;

module.exports = dotdot;
