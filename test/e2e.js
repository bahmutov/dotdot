var foo = {
  n: 101,
  bar: function() {
    console.assert(this.n === 101, 'invalid value of n, this =', this);
  }
};

foo.bar();
foo.bar.bind(foo)();

var foobar = foo.bar;
try {
  foobar();
  console.log('hmm, no exception thrown!');
  process.exit(-1);
} catch (err) {};

foobar = foo..bar();
foobar();

// do it again for fun
foobar = foo..bar();
foobar();
