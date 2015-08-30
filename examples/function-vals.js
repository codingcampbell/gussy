var asyncVal = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(200);
    }, 1000);
  });
};

module.exports = function(async, util) {
  return async({
    body: {
      'border-radius': util.prefix([asyncVal(), 'px'])
    }
  });
};
