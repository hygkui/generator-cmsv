'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

// function capitalize(s)
// {
//     return s && s[0].toUpperCase() + s.slice(1);
// }

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
    this.fs.copyTpl(
      this.templatePath('client/client.module.js'),
      this.destinationPath('client/' + this.props.name + '.client.module.js'),
      {
        name: this.props.name
      }
    );
  },

  install: function () {
    // this.installDependencies();
    console.log('copy done, enter install....');
  }
});
