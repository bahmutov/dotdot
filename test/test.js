gt.module('testing .. detection');

var r = /(\D\w+)\.\.(\D\w+)\(/;

gt.test('foo..bar(', function () {
  gt.ok(r.test('foo..bar('));
});

gt.test('f100..bar(', function () {
  gt.ok(r.test('f100..bar('));
});

gt.test('! 100..bar', function () {
  gt.ok(!r.test('100..bar'));
});

gt.test('! 100..bar(', function () {
  gt.ok(!r.test('100..bar('));
});

gt.test('! f100.bar(', function () {
  gt.ok(!r.test('f100.bar('));
});

gt.test('variables f100..bar(', function () {
  var matches = r.exec('f100..bar(');
  gt.equal(matches[1], 'f100', 'reference');
  gt.equal(matches[2], 'bar', 'property');
});

gt.test('variables f100..bar(something)', function () {
  var matches = r.exec('f100..bar(something)');
  gt.equal(matches[1], 'f100', 'reference');
  gt.equal(matches[2], 'bar', 'property');
});

gt.module('dotdot replacement');

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

// foo..bar( => foo.bar.bind(foo,
gt.test('dotdot basics', function () {
  gt.func(dotdot, 'is a function');
  gt.string(dotdot('something'), 'returns a string');
});

gt.test('foo..bar() -> foo.bar.bind(foo)', function () {
  var replaced = dotdot('foo..bar()');
  gt.equal(replaced, 'foo.bar.bind(foo)');
});

gt.test('foo..bar(10) -> foo.bar.bind(foo, 10)', function () {
  var replaced = dotdot('foo..bar(10)');
  gt.equal(replaced, 'foo.bar.bind(foo, 10)');
});
