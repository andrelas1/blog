import * as ejs from "ejs";

import { HomeModel } from "./home.model";

export async function homeRouteController(req, res, next) {
  const home = await HomeModel.findOne({ site: "andrelas1" });
  console.log("HOME", home);
  if (home) {
    ejs.renderFile(res.locals.templatePath, home, (err, template) => {
      if (err) {
        next(err);
      } else {
        res.end(template);
      }
    });
  }
}
