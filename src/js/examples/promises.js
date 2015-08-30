var exec = require('child_process').exec;

// Append ?v=<git-sha> to URL. Useful for things like cache-busting
var gitUrl = src => new Promise(resolve => exec('git rev-parse HEAD', (err, result) =>
  resolve(`url(${src}?v=${result.toString().slice(0, 7)})`)
));

module.exports = {
  '.content': {
    '.img-container': {
      background: gitUrl('bg.jpg')
    }
  }
};
