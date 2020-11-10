import * as express from "express";

const router = express.Router();

/**
 * receives the template from the middleware
 * returns the template with data
 */
export const blogpostRouteController = router.get("/", (req, res, _) => {
  res.end(res.locals.template);
});
