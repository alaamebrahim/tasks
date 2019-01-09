// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://tasks.test/',
  userPicPath: 'http://tasks.test/uploads/user_files/',
  projectsImagePath: 'http://tasks.test/uploads/projects_files/',
  attachmentsPath: 'http://tasks.test/uploads/tasks_files/'
};
