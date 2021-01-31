const fse = require("fs-extra");
const { spawn } = require("child_process");

const root = process.cwd();
console.log("ROOOT", root);

const appFolder = "./app";

fse.ensureDirSync(appFolder);

// copying statics
fse.copySync(`${root}/statics`, `${root}/app/statics`);

// copying src
fse.copySync(`${root}/src`, `${root}/app/src`);

// copy package.json
fse.copySync(`${root}/package.json`, `${root}/app/package.json`);

// copy package-lock.json
fse.copySync(`${root}/package-lock.json`, `${root}/app/package-lock.json`);

// copy node_modules
// const npmInstall = spawn("npm", ["install", "--only=prod"], { cwd: process.cwd() + "/app" });

// npmInstall.stdout.on("data", (data) => {
//   console.log(`stdout: ${data}`);
// });
