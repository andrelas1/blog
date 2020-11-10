import * as express from "express";

const router = express.Router();

export const indexRouteController = router.get("/", (req, res, next) => {
  res.end(res.locals.template);
});
