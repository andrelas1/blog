import * as ejs from "ejs";

export async function aboutMeRouteController(req, res, next) {
  const profile = res.locals.cmsData.profile;
  const templateData = {
    profile,
    workExperiences: res.locals.cmsData.experience.map((exp) =>
      exp.skills ? exp : { ...exp, skills: [] }
    ),
    educationExperiences: res.locals.cmsData.educations,
    skills: res.locals.cmsData.skills,
    languages: res.locals.cmsData.languages,
  };

  ejs.renderFile(res.locals.templatePath, templateData, (err, template) => {
    if (err) {
      next(err);
    } else {
      res.end(template);
    }
  });
}
