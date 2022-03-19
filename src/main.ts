import sanityClient from "@sanity/client";
import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";

import {
  aboutMeRouteController,
  blogpostsRouteController,
  homeRouteController,
} from "./resources";
import { templateMW } from "./middlewares";
import { cmsMW } from "./middlewares/cms.middleware";

function app() {
  // Sanity login
  const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2022-03-19", // use current UTC date - see "specifying API version"!
    token: process.env.SANITY_TOKEN,
    useCdn: true, // `false` if you want to ensure fresh data
  });

  const app = express();
  const port = process.env.PORT;
  const staticsPath = process.cwd() + "/statics";

  app.set("view engine", "ejs");

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan("dev"));

  // open connection to database
  // function connectToDb() {
  //   mongoose.connect(process.env.DATABASE_CONNECTIONSTRING, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   return mongoose.connection;
  // }

  // const db = connectToDb();

  // db.on("error", (err) => {
  //   console.error("CONNECTION ERROR", err);
  //   console.log("trying to connect again...");
  // });

  // db.once("open", (res) => {
  //   console.log("CONNECTED!!!", res);
  // });

  // statics
  const staticsFileSystemPath = `${process.cwd()}/statics`;
  app.use(express.static(staticsFileSystemPath));
  app.use("/blogposts", express.static(staticsFileSystemPath));

  // routes

  app.get(
    "/",
    cmsMW(client),
    templateMW(`${staticsPath}/index.ejs`),
    homeRouteController
  );

  app.get(
    "/blogposts/:path",
    templateMW(`${staticsPath}/blogpost.ejs`),
    cmsMW(client),
    blogpostsRouteController
  );

  app.get(
    "/about-me",
    templateMW(`${staticsPath}/about-me.ejs`),
    cmsMW(client),
    aboutMeRouteController
  );

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    console.log("NODE ENV", process.env.NODE_ENV);
  });
}

app();
