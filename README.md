# dotdot

> Replaced foo..bar() with foo.bar.bind(foo) automatically using Nodejs require hook

[![NPM][dotdot-icon]][dotdot-url]

[![Build status][dotdot-ci-image]][dotdot-ci-url]
[![dependencies][dotdot-dependencies-image]][dotdot-dependencies-url]
[![devdependencies][dotdot-devdependencies-image]][dotdot-devdependencies-url]

[![endorse][endorse-image]][endorse-url]

*dotdot* installs a Node loader hook that transforms each loaded JavaScript file.

```js
var foo = {
    n: 101,
    print: function () {
        console.log(n);
    }
};
var printN = foo..print();
printN();
// becomes
var foo = {
    n: 101,
    print: function () {
        console.log(n);
    }
};
var printN = foo.print.bind(foo);
printN();
// prints
101
```

Both object properties and stand alone functions are supported, including arguments

```js
foo..bar('arg1', 'arg2')  //=> foo.bar.bind(foo, 'arg1', 'arg2')
bar..(3, 'something') //=> bar.bind(null, 3, 'something')
```

for more examples see [test/e2e.js](test/e2e.js)

## install and use

```sh
npm install --save dotdot
```

then require *dotdot* BEFORE any source files with `..` are required.
The hook does NOT transform the file that loads `dotdot` itself, since it is too late.

## performance

The source code transformation happens once per file, on the first `require` call.
The substitution itself is a simple RegExp execution, there is no abstract syntax tree,
so it should be fast enough.

Later I [plan](https://github.com/bahmutov/dotdot/issues/2) to support a
filter function / option to limit substitution to
certain files, for example to avoid transforming any source file loaded from `node_modules`
folder.

## why?

I got tired of constantly writing `.bind(null, ...)`, especially in promise chains.
I looked at using [sweet.js](http://sweetjs.org/) macros, but that project is still
too fresh (most of their own examples did not work using v0.3.x), and too ambitious
for this small change. Now my promise chains are much cleaner:

```js
// compare
asyncSquare(2)
.then(console.log.bind(null, '2 ='))
.then(asyncSquare..(3))
.then(console.log.bind(null, '3 ='))
.then(asyncSquare..(4))
.then(console.log.bind(null, '4 ='));

// with
asyncSquare(2)
.then(console..log('2 ='))
.then(asyncSquare..(3))
.then(console..log('3 ='))
.then(asyncSquare..(4))
.then(console..log('4 ='));
```

## Small print

Author: Gleb Bahmutov &copy; 2013

* [Changelog](History.md)
* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: [MIT](MIT-license.md) - do anything with the code,
but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet / open issue on Github

[dotdot-icon]: https://nodei.co/npm/dotdot.png?downloads=true
[dotdot-url]: https://npmjs.org/package/dotdot
[dotdot-ci-image]: https://travis-ci.org/bahmutov/dotdot.png?branch=master
[dotdot-ci-url]: https://travis-ci.org/bahmutov/dotdot
[dotdot-dependencies-image]: https://david-dm.org/bahmutov/dotdot.png
[dotdot-dependencies-url]: https://david-dm.org/bahmutov/dotdot
[dotdot-devdependencies-image]: https://david-dm.org/bahmutov/dotdot/dev-status.png
[dotdot-devdependencies-url]: https://david-dm.org/bahmutov/dotdot#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
