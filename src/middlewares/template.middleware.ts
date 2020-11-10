import * as ejs from "ejs";

export const templateMW = (templatePath: string) => (req, res, next) => {
  ejs.renderFile(templatePath, (err, template) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.locals.template = template;
    }
  });
  next();
};
