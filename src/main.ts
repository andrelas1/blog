import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as morgan from "morgan";
import * as mongoose from "mongoose";

import { blogpostsRouteController, homeRouteController } from "./resources";
import { serverStaticsMW, templateMW } from "./middlewares";

function app() {
  console.log("ENV VARIABLEs");
  console.log(process.env);
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

  app.use(express.static(`${process.cwd()}/statics`));
  // routes

  app.get("/", templateMW(`${staticsPath}/index.ejs`), homeRouteController);

  app.get(
    "/blogposts/:path",
    serverStaticsMW(),
    templateMW(`${staticsPath}/blogpost.ejs`),
    blogpostsRouteController
  );

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

app();
