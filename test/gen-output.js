var fs = require('fs');
var util = require('./util');
var gussy = require('../index');

describe('generate test outputs from examples', function() {
  util.outputStyles.forEach(function(style) {
    describe(style, function() {
      util.eachExample(function(example) {
        var styleFilename = example.cssFilename.replace(/css$/, style + '.css');

        it(example.jsFile + ' => ' + styleFilename, function(done) {
          gussy({outputStyle: style}).compile(example.module, function(result) {
            fs.writeFile(util.cssPath + styleFilename, result, done);
          });
        });
      });
    });
  });
});
