var fmt = require('util').format;

var Config = function(options) {
  options = options || {};

  this.name = options.name;
  if (!this.name) throw new Error("'name' is required");

  this.path = options.path || fmt('./%s.config.js', this.name);
  this.defaults = options.defaults || {};
  this.debug = options.debug || false;

  try {
    this.configModule = require(this.path);
  } catch(e) {
    if (this.debug)
      console.error(e.message);
    this.configModule = {};
  }
}

function nameToEnvName(applicationName, variableName) {
  return fmt("%s_%s",
    applicationName,
    variableName.replace(/([a-z])([A-Z])/g, '$1_$2')
  ).toUpperCase();
}

Config.prototype.get = function(variableName) {
  return this.configModule[variableName] ||
    process.env[nameToEnvName(this.name, variableName)] ||
    this.defaults[variableName];
}

module.exports.Configuration = Config;