var async = require('async');
var fs = require('fs');
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var sane = require('sane');

process.on('uncaughtException', function(err) {
  console.log(err.message);
});

var config = {};
config.jsRoot = './src/js/'
config.jsMain = config.jsRoot + 'main.js';
config.build = './build/';
config.jsBundle = config.build + 'app.js';

var tasks = {};
tasks.javascript = function(opts, callback) {
  opts = opts || {};

  var b = browserify({
    builtins: false,
    debug: !opts.minify,
    cache: {},
    packageCache: {},
    paths: [config.jsRoot]
  });

  if (opts.watch) {
    b = watchify(b);
  }

  b.transform(babelify.configure({
    blacklist: [
      'es6.forOf',
      'spec.functionName'
    ]
  }));

  if (opts.minify) {
    b.transform({
      global: true,
      mangle: true,
      compress: {
        unsafe: true,
        drop_debugger: true,
        drop_console: true
      }
    }, 'uglifyify');
  }

  if (opts.watch) {
    b.on('update', function () { b.bundle().pipe(fs.createWriteStream(config.jsBundle)); })
    b.on('time', function (time) { console.log(config.jsBundle + ' built in ' + time + ' ms'); })
  }

  b.on('error', function (err) { console.log('Error : ' + err.message); })
  b.require(config.jsMain, { entry: true })
  b.bundle().pipe(fs.createWriteStream(config.jsBundle).on('close', function() {
    return callback && callback();
  }));
};

tasks.compile = function(callback) {
  tasks.clean(function() {
    tasks.javascript({}, callback);
  });
};

tasks.build = function(opts) {
  tasks.clean(function() {
    tasks.javascript({ minify: true });
  });
};

tasks.dev = function() {
  tasks.clean(function() {
    tasks.javascript({ watch: true });
    tasks.serve();
  });
};

tasks.clean = function(callback) {
  del([config.jsBundle], callback);
};

tasks.run = function() {
  tasks.compile(function() {
    require(config.jsBundle);
  });
};

tasks['default'] = function() {
  tasks.run();
};

var args = process.argv.slice(2);
if (!args.length) {
  tasks['default']();
} else {
  args.forEach(function(task) {
    if (typeof tasks[task] !== 'function') {
      console.error('Unknown task: ' + task);
      return;
    }

    tasks[task]();
  });
}
