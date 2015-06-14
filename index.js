'use strict';
var dotPropGet = require('dot-prop').get;

function compareFunc(prop) {
  return function(a, b) {
    var ret = 0;

    (Array.isArray(prop) ? prop : [prop]).some(function(el) {
      var x;
      var y;

      if (typeof el === 'function') {
        x = el(a);
        y = el(b);
      } else if (typeof el === 'string') {
        x = dotPropGet(a, el);
        y = dotPropGet(b, el);
      } else {
        x = a;
        y = b;
      }

      if (x === y) {
        ret = 0;
        return;
      }

      if (typeof x === 'string' && typeof y === 'string') {
        ret = x.localeCompare(y);
        return ret !== 0;
      }

      ret = x < y ? -1 : 1;
      return true;
    });

    return ret;
  };
}

module.exports = compareFunc;
