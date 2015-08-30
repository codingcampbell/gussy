var flair = require('./flair');
var style = require('./examples/promises');

flair.compile(style, function(result) {
  console.log(result);
});
