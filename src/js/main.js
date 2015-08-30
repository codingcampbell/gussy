var flair = require('./flair');
var style = require('./examples/promises');

flair({outputStyle: 'nested'}).compile(style, function(result) {
  console.log(result);
});
