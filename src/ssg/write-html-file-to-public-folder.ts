import * as ejs from "ejs";
import { writeFileSync } from "fs";

export const writeHtmlFileToPublicFolder = (
  templatePath,
  publicPath,
  blogpost
) => {
  ejs.renderFile(templatePath, blogpost, (err, template) => {
    if (err) console.error("Error creating the html files", err);

    // write the html to the file
    writeFileSync(publicPath, template, {
      flag: "w",
    });
  });
};
