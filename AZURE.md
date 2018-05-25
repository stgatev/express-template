# Azure Deployment

## Generating deployment files

### Azure CLI
If not already done, install Azure CLI:
```
npm install -g azure-cli
```

### Generate the deployment files
The **site** command is not available in the default *Resource Management** mode. To use it, first change the *mode* to Service Management mode:
```
azure config mode asm
```

Then, issue the following command to generate **.deployment** and **deploy.cmd**:
```
azure site deploymentscript --node
```

### Add the deployment files to the project
Make sure to add **.deployment** and **deploy.cmd** files to the project.

### Dev modules
If using Azure's Git deployment option, with the building taking place in Azure, it is necessary to move the modules needed for building from **devDependencies** to **dependencies**.

### Including a transpilation step into the deployment
Azure Node deployment is made with JS project in mind. For a TS, an extra transpilation step is required. There are two ways to include the step into the deployment sequence.
One is to include it as a step in **deploy.cmd*. Insert the following lines after Step 3, Installing the NPM Packages:
```
    :: 4. Compile TypeScript
    echo Transpiling TypeScript in %DEPLOYMENT_TARGET%...
    call :ExecuteCmd node %DEPLOYMENT_TARGET%\node_modules\typescript\bin\tsc -p "%DEPLOYMENT_TARGET%"
```
The other way is to make the **build** task fire after the NPM modules installation, as a **postinstall** task in **package.json**:
````
    "scripts": {
      "postinstall": "npm run build",
````

## Code changes

### Wrapper startup script
Azure deployment looks inside **package.json** to figure the application's entry point, and uses it to generate **web.config**. Because the latter is generated prior to building the application, a TypeScript project will not have the startup file generated, and Azure will fail to generate **web.config**. To aid it, we use a wrapper, **index.js**, which is present at the time of **web.config** generation, before the TypeScript compilation.

## Good reads
### Setting up a project with TypeScript + Express
- [Developing a RESTful API With Node and TypeScript](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/)
- [Build a Node.js RESTful API and deploy it to an API app in Azure](https://docs.microsoft.com/en-us/azure/app-service-api/app-service-api-nodejs-api-app)
- [Deploying TypeScript Projects to Azure from GitHub Using Continuous Deployment](http://www.codefoster.com/tscazure/)
