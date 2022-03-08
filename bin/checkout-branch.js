#!/usr/bin/env node

const { exec } = require('child_process');
const program = require('commander');
const inquirer = require('inquirer');
const shell = require('shelljs');

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
  
  const currentBranch = shell.exec('git symbolic-ref --short -q HEAD').stdout;

  if (currentBranch !== 'master') {
    shell.echo('Error: 请从master下拉分支');
    shell.exit(1);
  }
});