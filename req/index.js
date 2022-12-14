import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonData = require("../json/lock.json");
const tsConfigData = require("../json/typesConfig.json");
const Done = () => {
  var _directoryName = path?.resolve();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const functionA = async () => {
    const d = JSON.stringify(jsonData, null, `\t`);
    fs.writeFile(`${_directoryName}/package.json`, `${d}`, (error) => {
      if (error) {
        console.log(error);
      } else {
        return console?.log("Generated a package.json file.");
      }
    });
    await delay(3000);
    await exec("npm i --save-dev typescript", (e, stdOut, stdDerr) => {
      if (e) {
        console.log(e);
        console.error(`There is an error while downloading the dependencies.`);
      } else {
        console.info(stdOut);
        console.log(
          `When everything is done, use the command "npm start" to start up the project.`
        );
      }
    });
    const t = JSON.stringify(tsConfigData, null, `\t`);
    fs?.writeFile(`${_directoryName}/tsconfig.json`, `${t}`, (error) => {
      if (error) {
        console.error(error);
      } else {
        return console?.info(`Generated a tsConfig file in the directory.`);
      }
    });
    fs?.mkdir(
      path?.resolve(_directoryName, `source/public`),
      { recursive: true },
      (e) => {
        if (e) {
          console.error(
            `An error has been occurred while creating the "public" folder in the path: ${_directoryName}`
          );
        } else {
          console.log(
            `Successfully created the "public" folder. Without getting any errors.`
          );
        }
      }
    );
    fs?.mkdir(
      path?.resolve(_directoryName, `source/dist`),
      { recursive: true },
      (e) => {
        if (e) {
          console.error(
            `An error has been occurred while creating the "dist" folder in the path: ${_directoryName}`
          );
        } else {
          console.log(
            `Successfully created the "dist" folder. Without getting any errors.`
          );
        }
      }
    );
    fs?.mkdir(
      path?.resolve(_directoryName, `source/ts`),
      { recursive: true },
      (e) => {
        if (e) {
          console.error(
            `An error has been occurred while creating the "typings" folder in the path: ${_directoryName}`
          );
        } else {
          console.log(
            `Successfully created the "ts" folder. Without getting any errors.`
          );
        }
      }
    );
    await delay(2000);
    fs.writeFile(`${_directoryName}/source/public/index.ts`, ``, (e) => {
      if (e) {
        console.error(e.message);
      } else {
        console.log(`Created a ts file in the public folder`);
      }
    });
    fs.writeFileSync(`${_directoryName}/source/dist/index.js`, ``, (e) => {
      if (e) {
        console.info(
          "There was an error while creating a js file in the dist folder,",
          e
        );
      } else {
        console.log(`Created a js file in the dist folder.`);
      }
    });
  };
  functionA();
};

export { Done };
