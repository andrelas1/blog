import * as express from "express";

const router = express.Router();

const blogpostController = (req, res, _) => {
  res.end(res.locals.template);
};

export const blogpostRouteController = router.get("/", blogpostController);
