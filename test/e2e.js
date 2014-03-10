var foo = {
  n: 101,
  bar: function() {
    console.log('foo.bar');
    console.assert(this.n === 101, 'invalid value of n, this =', this);
  }
};

foo.bar();
console.log('binding using function.bind');
foo.bar.bind(foo)();
console.log('bound');

var foobar = foo.bar;
try {
  foobar();
  console.log('hmm, no exception thrown!');
  process.exit(-1);
} catch (err) {};

console.log('binding using .. syntax');
foobar = foo..bar();
console.log('trying the dotdot function');
foobar();

// do it again for fun
foobar = foo..bar();
foobar();

// function without an object
function add(a, b) { return a + b; }
console.assert(add(2, 3) === 5, '2+3 = 5');
console.assert(add..(2)(3) === 5, '..2+3 = 5');
console.assert(add..(10, 11)() === 21, '..10,11 = 21');
