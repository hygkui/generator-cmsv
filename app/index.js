'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pkg = require('../package.json');


module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super ' + chalk.red('generator-cmsv') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your module name?',
      default: 'blog'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;

      console.log('props:', props);

      this.props = props;
      console.log('the module name is ', props.name);
    }.bind(this));
  },

  writing: function () {
    var capitalize = function(s)
    {
      return s && s[0].toUpperCase() + s.slice(1);
    }

    var paramsData = {
      name: this.props.name,
      Name: capitalize(this.props.name),
      date: (new Date()).toLocaleDateString(),
      user: pkg.author.name,
      email: pkg.author.email
    }

    this.fs.copyTpl(
      this.templatePath('client/module.js'),
      this.destinationPath(paramsData.name + '/client/' + this.props.name + '.client.module.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('client/config.js'),
      this.destinationPath(paramsData.name + '/client/config/' + this.props.name + '.client.config.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('client/controller.js'),
      this.destinationPath(paramsData.name + '/client/controllers/' + this.props.name + '.client.controller.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('client/less'),
      this.destinationPath(paramsData.name + '/client/less/' + this.props.name + '.less'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('client/service.js'),
      this.destinationPath(paramsData.name + '/client/services/' + this.props.name + '.client.service.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('client/view.html'),
      this.destinationPath(paramsData.name + '/client/views/' + this.props.name + '.client.view.html'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('server/apiRoute.js'),
      this.destinationPath(paramsData.name + '/server/apiRoutes/' + this.props.name + '.server.apiRoute.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('server/controller.js'),
      this.destinationPath(paramsData.name + '/server/controllers/' + this.props.name + '.server.controller.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('server/model.js'),
      this.destinationPath(paramsData.name + '/server/models/' + this.props.name + '.server.model.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('server/policy.js'),
      this.destinationPath(paramsData.name + '/server/policies/' + this.props.name + '.server.policy.js'),
      paramsData
    );

    this.fs.copyTpl(
      this.templatePath('server/route.js'),
      this.destinationPath(paramsData.name + '/server/routes/' + this.props.name + '.server.route.js'),
      paramsData
    );



  },

  install: function () {
    // this.installDependencies();
    console.log('copy done, enter install....');
  }
});
