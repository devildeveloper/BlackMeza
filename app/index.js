var chalk=require('chalk');
var generators=require('yeoman-generator');
var path =require('path');

module.exports  = generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Cual sera el nombre de tu proyecto?',
      default : 'my-web-site' // Default to current folder name
    }, function (answers) {
      this.directory(
        'Env',
        path.join(process.cwd(),answers.name)
      );
      done();
    }.bind(this));
  }
});
