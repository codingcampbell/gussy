var _range = function(n) {
  return new Array(n).join(' ').split(' ').map(function(x, index) {
    return index;
  })
};

var Util = function(rule) {
  this.rule = rule;
  this._wrapped = rule;
  this.selectorPrefix = '';
}

Util.prototype.extend = function(ext) {
  /* Add padding to selectors to avoid namespace collision
  * (due to JavaScript's unique-key restriction for objects)
  */
  this.selectorPrefix += ' ';

  if (typeof ext !== 'object' || ext === null) {
    return this;
  }

  var prop;
  for (prop in ext) {
    this.rule[this.selectorPrefix + prop] = ext[prop];
  }

  return this;
};

Util.prototype.loop = function(arr, fn) {
  if (typeof arr === 'number') {
    return this.loop(_range(arr), fn);
  }

  var obj;
  for (obj of arr.map(fn)) {
    this.extend(obj);
  }

  return this;
};

var util = function(rule) {
  return new Util(rule);
};

util.prefix = function(value) {
  return function(key) {
    var result = {};
    result['-webkit-' + key] = value;
    result['-moz-' + key] = value;
    result['-ms-' + key] = value;
    result[key] = value;
    return result;
  };
};

module.exports = util;
