var assert = require("assert")
  , Configuration = require("../index").Configuration;

describe('config', function() {
  describe('create', function() {
    it('should create an instance of configuration loader', function() {
      var config = new Configuration({
        name: 'tester',
      });
      assert.equal(config.name, 'tester');
      assert.equal(config.path, './tester.config.js');
    });

    it('should record defaults', function() {
      var config = new Configuration({
        name: 'tester',
        defaults: {
          thisVariable: 'foo'
        }
      });
      assert.equal(config.get('thisVariable'), 'foo');
      assert.equal(config.get('thatVariable'), undefined);
    });
  });

  describe('read', function() {
    it('should read a variable from file', function() {
      var config = new Configuration({
        name: 'tester',
        path: __dirname + '/test.config.js'
      });
      assert.equal(config.path, __dirname + '/test.config.js');
      assert.equal(config.get('variableOne'), 'one');
    });

    it('should read a variable from environment', function() {
      var config = new Configuration({
        name: 'tester',
      });
      process.env['TESTER_VARIABLE_ONE'] = 'two'
      assert.equal(config.get('variableOne'), 'two');
    });

  });
});
