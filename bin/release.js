#!/usr/bin/env node
const inquirer = require('inquirer');
const shell = require('shelljs');

function trim (str) {
  return str.replace(/(\r\n\t|\n|\r\t)/g, "");
}

const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD').stdout;

// if (trim(currentBranch) !== 'master') {
//   shell.echo('Error: 请先切到master分支');
//   shell.exit(1);
// }

shell.exec('git pull');

const branchList = shell.exec('git branch').stdout.split('\n').map((branch) => {
  return branch.replace(/[*|\s]/g, '');
}).filter((branch) => {
  if (branch) return branch;
});

inquirer.prompt([{
  type: 'list',
  message: '请选择要合并的分支',
  name: 'branch',
  choices: branchList
}]).then((result) => {
  const { branch } = result;

  shell.exec(`git merge ${branch}`);

  shell.exec('yarn version');
})