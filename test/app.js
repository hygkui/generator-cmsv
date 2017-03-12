'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-cmsv:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: "demo"})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'client/demo.client.module.js'
    ]);
  });
});
