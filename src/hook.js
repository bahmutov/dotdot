// based on https://github.com/gotwarlost/istanbul/blob/master/lib/hook.js

/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var extension = '.js';

var fs = require('fs'),
  Module = require('module'),
  originalLoader = Module._extensions[extension];

function hook(transform) {
  console.assert(typeof transform === 'function', 'expected transformer function');
  Module._extensions[extension] = function (module, filename) {
    var ret = transform(fs.readFileSync(filename, 'utf8'), filename);
    module._compile(ret, filename);
  };
}

function unhook() {
  Module._extensions[extension] = originalLoader;
}

module.exports = {
  hook: hook,
  unhook: unhook
};
