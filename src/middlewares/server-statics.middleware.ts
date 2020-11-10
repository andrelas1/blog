import * as express from "express";

export const serverStaticsMW = (
  app,
  dirName: string,
  pathsToServeStatics: string[]
) => (req, res, next) => {
  pathsToServeStatics.forEach((path) => {
    app.use(dirName, express.static(path));
  });
  next();
};
