import * as ejs from "ejs";
import { writeFileSync, accessSync, mkdirSync } from "fs";

export const writeHtmlFileToPublicFolder = (
  templatePath,
  outputFilePath,
  blogpost
) => {
  ejs.renderFile(templatePath, blogpost, (err, template) => {
    if (err) console.error("Error creating the html files", err);

    const outputFolder = outputFilePath.split("/").slice(0, -1).join("/");
    if (directoryExists(outputFolder)) {
      writeFileSync(outputFilePath, template, {
        flag: "w",
      });
    } else {
      console.info("Creating directory", outputFolder);
      mkdirSync(outputFolder);

      writeFileSync(outputFilePath, template, {
        flag: "w",
      });
    }
    console.log("GENERATED:", outputFilePath);
  });
};

function directoryExists(dirPath: string) {
  let result = false;
  try {
    accessSync(dirPath);
    result = true;
  } catch (e) {
    console.error("Directory does not exists", e);
  }

  return result;
}
