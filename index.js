
var serving = require('./lib/serving'),
    helpers = require('./src/helpers'),
    factory = require('./src/factory');

module.exports = {
  serving: serving,
  env: {
    helpers: helpers,
    factory: factory,
  }
}
