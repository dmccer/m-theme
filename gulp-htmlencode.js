var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path');
var _ = require('underscore');
var htmlencode = require('htmlencode');

module.exports = function (options) {
  // Mixes in default options.
  options = options || {};

  function transform (file, enc, next) {
    var self = this;

    if (file.isNull()) {
      this.push(file); // pass along
      return next();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-htmlencode', 'Streaming not supported'));
      return next();
    }

    var str = file.contents.toString('utf8');

    var encodedStr = htmlencode.htmlEncode(str);

    file.contents = new Buffer(encodedStr);
    file.path = gutil.replaceExtension(file.path, '.ech');
    self.push(file);

    next();
  }

  return through2.obj(transform);
}