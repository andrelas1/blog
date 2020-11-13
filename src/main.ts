import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as morgan from "morgan";

import { blogpostRouteController, indexRouteController } from "./routes";
import { serverStaticsMW, templateMW } from "./middlewares";

const app = express();
const port = 3000;
const staticsPath = process.cwd() + "/statics";

app.set("view engine", "ejs");

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes

// TODO: register these two middlewares in the router??
app.use(
  "/",
  serverStaticsMW(app, "/", [staticsPath]),
  templateMW(`${staticsPath}/index/index.ejs`),
  indexRouteController
);

// TODO: register these two middlewares in the router??
app.use(
  "/blogpost",
  serverStaticsMW(app, "blogpost", [`${staticsPath}`]),
  templateMW(`${staticsPath}/blogpost/blogpost.ejs`),
  blogpostRouteController
);

// create API requests with router.route
const router = express.Router();

router
  .route("/blog")
  .get((req, res, next) => {
    res.send({ test: "test" });
  })
  .post((req, res, next) => {
    console.log("REQ", req.body);
    res.send({ ok: "ok" });
  });

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
