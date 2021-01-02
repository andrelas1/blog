export const templateMW = (templatePath: string) => (req, res, next) => {
  res.locals.templatePath = templatePath;
  next();
};
