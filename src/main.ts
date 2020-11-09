import * as express from "express";
import * as ejs from "ejs";

const app = express();
const port = 3000;
const staticsPath = process.cwd() + "/statics";

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  app.use(express.static(`${staticsPath}`));
  app.use("/index", express.static(`${staticsPath}/index`));

  ejs.renderFile(`${staticsPath}/index/index.ejs`, (err, template) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.end(template);
    }
  });
});

app.get("/blogpost", (req, res) => {
  app.use("/blogpost", express.static(`${staticsPath}`));
  app.use("/blogpost", express.static(`${staticsPath}/blogpost`));

  ejs.renderFile(`${staticsPath}/blogpost/blogpost.ejs`, (err, template) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.end(template);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
