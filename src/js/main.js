var glam = require('./glam');
var style = require('./examples/promises');

glam({outputStyle: 'nested'}).compile(style, function(result) {
  console.log(result);
});
