var fs = require('fs');

var examples = {};
fs.readdirSync('examples').forEach(function(file) {
  var srcFile = 'examples/' + file;
  var cssFilename = file.replace(/\.js$/, '.css');
  examples[file] = {
    jsFilename: file,
    cssFilename: cssFilename,
    jsFile: srcFile,
    cssFile: 'test/output/' + cssFilename,
    module: require('../' + srcFile)
  };
});

module.exports = {
  eachExample: function(callback) {
    Object.keys(examples).forEach(function(file) {
      callback(examples[file]);
    });
  },

  cssPath: 'test/output/',

  outputStyles: ['nested', 'expanded', 'compact', 'compressed']
};
