import * as ejs from "ejs";
import * as showdown from 'showdown';

import { BlogpostModel } from "./blogpost.model";

const r = /(js|css|ttf|png)$/gm;

export const blogpostsRouteController = async (req, res, next) => {
  const converter = new showdown.Converter();

  const blogpost = await BlogpostModel.findOne({ slug: req.params.path });

  if (blogpost && !r.test(req.url)) {
    const content = blogpost.get('content');
    const htmlContent = converter.makeHtml(content);
    const data = {
      title: blogpost.get('title'),
      subtitle: blogpost.get('subtitle'),
      content: htmlContent
    };
    ejs.renderFile(res.locals.templatePath, data, (err, template) => {
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
