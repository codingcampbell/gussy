var flair = require('./flair');
var style = require('./examples/basic');

flair.compile(style, function(result) {
  console.log(result);
});
