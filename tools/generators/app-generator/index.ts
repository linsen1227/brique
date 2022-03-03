import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
  names,
  getWorkspaceLayout
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace';
import { applicationGenerator } from '@nrwl/react'
import { join } from 'path';

function deleteDir (tree: Tree, schema: any, path: string) {
  const name = names(schema.name).fileName;
  const projectDirectory = schema.directory
    ? `${names(schema.directory).fileName}/${name}`
    : name;
  const { libsDir, npmScope, appsDir } = getWorkspaceLayout(tree);
  const projectRoot = joinPathFragments(appsDir, projectDirectory);
  tree.delete(join(projectRoot, path));
}

export default async function (tree: Tree, schema: any) {
  await applicationGenerator(tree, {
    name: schema.name,
    style: 'less',
    skipFormat: true,
    unitTestRunner: 'none',
    e2eTestRunner: 'none',
    linter: 'eslint' as any
  });

  deleteDir(tree, schema, 'src/app');

  const libraryRoot = readProjectConfiguration(tree, schema.name).root;
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    libraryRoot, // destination path of the files
    schema // config object to replace variable in file templates
  );
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}