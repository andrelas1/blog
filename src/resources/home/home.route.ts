import * as express from "express";

const router = express.Router();

export const homeRouteController = router.get("/", function homeCOntroller(
  req,
  res,
  next
) {
  res.end(res.locals.template);
});
