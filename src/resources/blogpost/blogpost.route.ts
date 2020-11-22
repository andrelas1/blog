import * as ejs from "ejs";

import { BlogpostModel } from "./blogpost.model";

const r = /(js|css|ttf|png)$/gm;

export const blogpostsRouteController = async (req, res, next) => {
  console.log("PATGH PORRA", req.params.path);
  const blogpost = await BlogpostModel.findOne({ slug: req.params.path });
  if (blogpost && !r.test(req.url)) {
    ejs.renderFile(res.locals.templatePath, blogpost, (err, template) => {
      if (err) {
        next(err);
      } else {
        res.end(template);
      }
    });
  } else {
    res.end();
  }
};
