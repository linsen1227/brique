#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const shell = require('shelljs');

function generateDate () {
  const dateTime = new Date();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();

  function appendZero (num) {
    if (num < 10) return '0' + num;
    return num;
  }

  return appendZero(year) + appendZero(month) + appendZero(date);
}

function trim (str) {
  return str.replace(/(\r\n\t|\n|\r\t)/g, "");
}

inquirer.prompt([{
  type: 'list',
  message: '请选择分支类型',
  name: 'branchType',
  choices: [
    'feature',
    'hotfix'
  ]
}]).then(async function(result) {
  const { branchType } = result;
  
  const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD').stdout;

  if (trim(currentBranch) !== 'master') {
    shell.echo('Error: 请从master下拉分支');
    shell.exit(1);
  }

  const inputValue = await inquirer.prompt([{
    type: 'input',
    message: '请输入分支名',
    name: 'branchName',
    validate: function (val) {
      const done = this.async();
      if (!val) {
        done('分支名必填');
        return
      }
      done(null, true);
    }
  }])
  const { branchName } = inputValue;

  shell.exec('git pull');

  const username = shell.exec('git config user.name').stdout;

  const fullBranchName = trim(`${branchType}/${username}-${branchName}-${generateDate()}`);

  shell.exec(`git checkout -b ${fullBranchName}`);
});