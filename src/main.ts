import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as morgan from "morgan";
import * as mongoose from "mongoose";

import { blogpostRouteController, homeRouteController } from "./resources";
import { serverStaticsMW, templateMW } from "./middlewares";

const app = express();
const port = 3000;
const staticsPath = process.cwd() + "/statics";

app.set("view engine", "ejs");

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// open connection to database
mongoose.connect(process.env.DATABASE_CONNECTIONSTRING, {
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

app.use(
  "/",
  serverStaticsMW(app, "/", [staticsPath]),
  templateMW(`${staticsPath}/index/index.ejs`),
  homeRouteController
);

app.use(
  "/blogpost",
  serverStaticsMW(app, "blogpost", [`${staticsPath}`]),
  templateMW(`${staticsPath}/blogpost/blogpost.ejs`),
  blogpostRouteController
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
