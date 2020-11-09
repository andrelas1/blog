import * as express from "express";
import * as ejs from "ejs";

const app = express();
const port = 3000;

// app.use(express.static(process.cwd() + "/dist"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  ejs.renderFile(
    process.cwd() + "/src/statics/index/index.ejs",
    (err, template) => {
      console.log("TEMPLATe", template);
      if (err) {
        console.log("ERROR", err);
      } else {
        res.end(template);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
