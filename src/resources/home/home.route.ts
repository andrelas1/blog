import * as ejs from "ejs";

export async function homeRouteController(req, res, next) {
  const blogposts = res.locals.cmsData;

  const templateData = {
    title: "andrelas1",
    subtitle:
      "Thoughts and ideas about IT, movies, life, books and other things.",
    site: "andrelas1",
    blogposts,
  };

  ejs.renderFile(res.locals.templatePath, templateData, (err, template) => {
    if (err) {
      next(err);
    } else {
      res.end(template);
    }
  });
}
