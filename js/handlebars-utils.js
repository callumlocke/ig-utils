'use strict';

var Handlebars = require('hbsfy/runtime');

Handlebars.createGlobalHelper = function(name, hash, commands) {
  commands = commands || {};
  Handlebars.registerHelper(name, function(context) {
    if (!context) {
      return '';
    }

    var c = context.toString();
    var val = hash[c];
    var fn = typeof commands[c] === 'function' ? commands[c] : null;

    if (fn) {
      context = val;
      val = fn.apply(this, arguments);
    }

    return val;
  });
};

Handlebars.createOptionsHelper = function(options, commands) {
  var isAbsURL = /^https?:\/\//;
  var o = {
    'image.baseURL': function(baseURL, filename) {
      baseURL = baseURL || 'images/content';
      return isAbsURL.test(filename) ? filename : (baseURL + '/' + filename).replace(/[^:]\/{2,}/, '/');
    }
  };
  Handlebars.Utils.extend(o, commands);
  Handlebars.createGlobalHelper('options', options, o);
};


Handlebars.registerHelper('href', function (text) {
  if (!text) {
    return '';
  }

  var uuid = /^uuid\:\/{2}/;

  if (uuid.test(text)) {
    return 'http://www.ft.com/cms/0/' + text.split(uuid)[1] + '.html';
  }

  return text;
});

Handlebars.registerHelper('linebreaks', function (text) {
  if (!text) {
    return '';
  }

  var html = Handlebars.Utils.escapeExpression(text).replace(/\n/g, '<br>');

  return new Handlebars.SafeString(html);
});
/*
  reference:: http://blog.teamtreehouse.com/handlebars-js-part-3-tips-and-tricks
  usage:: {{debug}}
  output::  Current Context
            ====================
            --variables--
            ====================
*/
Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});
