
var env = require('..');

module.exports = {
  'create_app': function() {
    var factory = require('./...');
    return factory.create_app(env);
  }
}
