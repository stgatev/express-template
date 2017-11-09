# express-template

## Description
This is a NodeJS / Express application. It is written in TypeScript, and uses Swagger for REST API routing.

## Getting Started

### Prerequisites

#### NodeJS with NPM
Download Node from [nodejs.org](https://nodejs.org). Minimum required version is 6.9.1. Node distributions include NPM, the Node Package Manager.

#### Yarn
Install Yarn globally (if installed locally, the package installation may try to remove it, as it is not declared as a project dependency, and run into a problem)
```
npm install -g yarn
```

#### Project dependencies
The project dependencies are declared in **package.json**. They can be installed by NPM or Yarn. Yarn is recommended. If **yarn.lock** file does not exist, it will be created and versions locked. After cloning the project, run **yarn**:
```
yarn
```
**NOTE:** On Windows, it is possible for the Node modules installation by either NPM or Yarn to fail with a message stating a staging directory could not be renamed. Try disabling the Antivirus (both Real-time and Cloud-based protection). Another thing to try is to change the maximum path lenght, kept in the MAX_PATH environment variable, originally set to 260 characters, to a larger value:
```
SET MAX_PATH=10000
```

### Configuration
Configuration is handled by [Node Config](https://www.npmjs.com/package/config), which supports multi-level overrides. Default configuration is stored in **./config/default.json** file. For non-dev environments, overriding configuration is stored in **./config/{$NODE\_ENV}.json** file, where **$NODE\_ENV** is the name of the environment variable determining the deployment environment (e.g. ci, staging, production).

### Running the code
In the root directory of the project, run
```
npm start
```
Then, open a browser and point it to
```
http://localhost:8000
```
The actual port number is set in the project configuration (see **Configuration** above)

### Running the tests
In the project root directory, run
```
npm test
```

### In Visual Studio Code
The TypeScript options specify that the transpiler should create source code maps, which make it possible to debug the original *.ts* files while their counterpart *.js* files are being executed.

The project includes Visual Studio Code tasks configuration as well as a launch configuration.

#### Tasks Configuration
Visual Studio Code can run *tasks*. To run a task, open the Command Palette (View->Command Palette or *Ctrl-Shift-P*), then select "Run Task" command, and select the task to run.

- **build** invokes the TypeScript transpiler and converts the TypeScript code to JavaScript, ready for execution. The **build** task is also set as a default build task so it can be invoked with "Tasks: Run Build Task" command (*Ctrl-Shift-B*).

- **test** runs all unit and integration tests. The task is configured as a designated test task in Visual Studio Code, and can be executed directly with "Tasks: Run Test Task".

#### Launch Configuration
The launch configuration starts the **watch** as a pre-launch task, which will be automatically invoked when the debug session starts. The task will continue running after the debug session is ended, watching for changes and transpiling the TypeScript files, until it is killed (see **watch** task above).

## Note on Azure deployment
If using Azure's Git deployment option, with the application set to monitor the repository and automatically pull the changes and deploy, the modules under the **devDependencies** must be moved to **dependencies** to ensure proper build.

The following files are specific to the Azure deployment and runtime environment:
- **.deployment**
- **deploy.cmd**
- **Web.config**

Note that Azure switches the working directory to that of the entry script when invoking *iisnode*, in this case, **dist/**. In dev, the working directory is not changed, and is usually the root of the project. To match the environments, the following command is added to **app.ts**:
```
process.chdir(path.resolve(__dirname + './..'));
```

## Good reads
### Setting up a Project with TypeScript + Express
- [Developing a RESTful API With Node and TypeScript](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/)
- [Build a Node.js RESTful API and deploy it to an API app in Azure](https://docs.microsoft.com/en-us/azure/app-service-api/app-service-api-nodejs-api-app)
- [Deploying TypeScript Projects to Azure from GitHub Using Continuous Deployment](http://www.codefoster.com/tscazure/)
