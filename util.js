var _range = function(n) {
  return new Array(n).join(' ').split(' ').map(function(x, index) {
    return index;
  })
};

var Util = function(rule) {
  this.rule = rule;
  this._wrapped = rule;
}

Util.prototype.extend = function(ext) {
  if (typeof ext !== 'object' || ext === null) {
    return this;
  }

  var prop;
  for (prop in ext) {
    this.rule[prop] = ext[prop];
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

module.exports = function(rule) {
  return new Util(rule);
};
