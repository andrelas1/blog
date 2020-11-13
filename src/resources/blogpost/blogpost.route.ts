import * as express from "express";

const router = express.Router();

const blogpostController = (req, res, _) => {
  res.end(res.locals.template);
};

/**
 * receives the template from the middleware
 * returns the template with data
 */
export const blogpostRouteController = router.get("/", blogpostController);
