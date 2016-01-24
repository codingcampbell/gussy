var fs = require('fs');
var util = require('./util');
var gussy = require('../index');

var diff = function(expected, actual, done) {
  if (expected !== actual) {
    var err = new Error();
    err.expected = expected;
    err.actual = actual;
    return done(err);
  }

  done();
};

describe('test all output styles', function() {
  util.outputStyles.forEach(function(style) {
    describe(style, function() {
      util.eachExample(function(example) {
        var styleFilename = example.cssFilename.replace(/css$/, style + '.css');

        it(example.jsFile + ' === ' + styleFilename, function(done) {
          gussy({outputStyle: style}).compile(example.module, function(result) {
            fs.readFile(util.cssPath + styleFilename, function(err, expected) {
              if (err) {
                return done(err);
              }

              diff(expected.toString(), result, done);
            });
          });
        });
      });
    });
  });
});
