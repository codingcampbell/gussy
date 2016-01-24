var asyncVal = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(200);
    }, 1000);
  });
};

// Like plain object exports, function exports must return their structure immediately.
// Async support is for _values_ only, accomplished with promises.
// The only real advantage to function exports is the `util` module passed to them.
module.exports = function(util) {
  return {
    body: {
      'border-radius': util.prefix([asyncVal(), 'px'])
    }
  };
};
