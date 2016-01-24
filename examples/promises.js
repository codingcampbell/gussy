var exec = require('child_process').exec;

// Append ?v=<git-sha> to URL. Useful for things like cache-busting
var gitUrl = src => new Promise(resolve => exec('git rev-parse v0.0.6', (err, result) =>
  resolve(`url(${src}?v=${result.toString().slice(0, 7)})`)
));

module.exports = {
  '.content': {
    '.img-container-1': {
      'background-image': gitUrl('bg-1.jpg'),
      'background-repeat': 'no-repeat'
    },

    '.img-container-2': {
      background: [gitUrl('bg-2.jpg'), ' no-repeat']
    }
  }
};
