var _range = n => new Array(n).join(' ').split(' ').map((x, index) => index);

var Util = function(rule) {
  this.rule = rule;
  this._wrapped = rule;
}

Util.prototype = {
  extend(ext) {
    if (typeof ext !== 'object' || ext === null) {
      return this;
    }

    for (let prop in ext) {
      this.rule[prop] = ext[prop];
    }

    return this;
  },

  loop(arr, fn) {
    if (typeof arr === 'number') {
      return this.loop(_range(arr), fn);
    }

    for (let obj of arr.map(fn)) {
      this.extend(obj);
    }

    return this;
  }
};

module.exports = rule => new Util(rule);
