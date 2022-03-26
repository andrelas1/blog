import * as ejs from "ejs";
import * as showdown from "showdown";

const r = /(js|css|ttf|png)$/gm;

export const blogpostsRouteController = async (req, res, next) => {
  const converter = new showdown.Converter();

  const blogpost = res.locals.cmsData;

  if (blogpost && !r.test(req.url)) {
    const htmlContent = converter.makeHtml(blogpost.body);
    const data = {
      title: blogpost.title,
      subtitle: blogpost.subtitle,
      content: htmlContent,
    };
    ejs.renderFile(res.locals.templatePath, data, (err, template) => {
      if (err) {
        next(err);
      } else {
        res.end(template);
      }
    });
  }
};
