import * as express from "express";

const router = express.Router();

const homeController = (req, res, next) => {
  res.end(res.locals.template);
};

export const homeRouteController = router.get("/", homeController);
