var flair = require('./flair');
var style = require('./examples/loops');

flair.compile(style, function(result) {
  console.log(result);
});
