import * as ejs from "ejs";
import { BlogpostModel } from "../blogpost/blogpost.model";

import { HomeModel } from "./home.model";

export async function homeRouteController(req, res, next) {
  // TODO: would be nice to type this
  const home = (await HomeModel.findOne({ site: "andrelas1" })) as any;
  const blogposts = await BlogpostModel.find({});
  const templateData = {
    title: home.title,
    subtitle: home.subtitle,
    site: home.site,
    blogposts,
  };

  if (home) {
    ejs.renderFile(res.locals.templatePath, templateData, (err, template) => {
      if (err) {
        next(err);
      } else {
        res.end(template);
      }
    });
  }
}
