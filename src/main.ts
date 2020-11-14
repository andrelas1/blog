import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as morgan from "morgan";
import * as mongoose from "mongoose";

import {
  BlogpostModel,
  blogpostRouteController,
  blogpostSchema,
  homeRouteController,
} from "./resources";
import { serverStaticsMW, templateMW } from "./middlewares";

const app = express();
const port = 3000;
const staticsPath = process.cwd() + "/statics";

app.set("view engine", "ejs");

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose.connect("mongodb://mongodb:27018/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("CONNECTION ERROR", err);
});

db.once("open", (res) => {
  console.log("CONNECTED!!!", res);
});

// routes

// TODO: register these two middlewares in the router??
app.use(
  "/",
  serverStaticsMW(app, "/", [staticsPath]),
  templateMW(`${staticsPath}/index/index.ejs`),
  homeRouteController
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
    // const title = req.body.title;
    console.log("CARAIOOOO", req.body.title);
    const blogPostOne = new BlogpostModel({
      title: req.body.title,
      subtitle: "subtitle 1",
      content: "hbiuhgiuhbhuia",
      subject: "webdev",
      published: true,
    });
    blogPostOne.save((err) => {
      if (err) {
        res.status(500).json({ ok: "not ok", err });
      }

      res.status(200).json({ ok: "ok" });
    });
  });

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

console.log("ENV VARIABVLE", process.env.DATABASE_CONNECTIONSTRING);
