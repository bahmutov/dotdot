var dotdot = require('../index');
var r = dotdot.r;

// taken from lodash
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};
var regexpClass = '[object RegExp]';
function isRegExp(value) {
  return value && objectTypes[typeof value] && toString.call(value) == regexpClass || false;
}

gt.module('testing .. detection');

gt.test('dotdot regexp', function () {
  gt.ok(isRegExp(r), 'regexp');
});

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
