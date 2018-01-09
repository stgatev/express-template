// The Azure deployment is buggy.
// ===============================
//     Command: deploy.cmd
//     Handling node.js deployment.
//     KuduSync.NET from: 'D:\home\site\repository' to: 'D:\home\site\wwwroot'
//     Copying file: 'npm-debug.log'
//     Copying file: 'src\app.ts'
//     Copying file: 'src\server.ts'
//     Start script "dist/server.js" from package.json is not found.
//     Looking for app.js/server.js under site root.
//     Missing server.js/app.js files, web.config is not generated
// ===============================
// It checks for existing app.js or server.js before proceding to deployment,
// and since the transpilation of app.ts and server.ts hasn't happened yet,
// it does not create the necessary web.config.
// As a workaround, we create this wrapper, which will exist before the transpilation
// of the actual application.
require('./dist/server');