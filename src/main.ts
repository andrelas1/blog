import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as morgan from "morgan";
import * as mongoose from "mongoose";

import {
  aboutMeRouteController,
  blogpostsRouteController,
  homeRouteController,
} from "./resources";
import { templateMW } from "./middlewares";

function app() {
  const app = express();
  const port = process.env.PORT;
  const staticsPath = process.cwd() + "/statics";

  app.set("view engine", "ejs");

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan("dev"));

  // open connection to database
  function connectToDb() {
    mongoose.connect(process.env.DATABASE_CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return mongoose.connection;
  }

  const db = connectToDb();

  db.on("error", (err) => {
    console.error("CONNECTION ERROR", err);
    console.log("trying to connect again...");
  });

  db.once("open", (res) => {
    console.log("CONNECTED!!!", res);
  });

  // statics
  const staticsFileSystemPath = `${process.cwd()}/statics`;
  app.use(express.static(staticsFileSystemPath));
  app.use("/blogposts", express.static(staticsFileSystemPath));

  // routes

  app.get("/", templateMW(`${staticsPath}/index.ejs`), homeRouteController);

  app.get(
    "/blogposts/:path",
    templateMW(`${staticsPath}/blogpost.ejs`),
    blogpostsRouteController
  );

  app.get(
    "/about-me",
    templateMW(`${staticsPath}/about-me.ejs`),
    aboutMeRouteController
  );

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    console.log("DB PORT", process.env.DB_PORT);
    console.log("DB CONNECTION STRING", process.env.DATABASE_CONNECTIONSTRING);
    console.log("NODE ENV", process.env.NODE_ENV);
  });
}

app();
