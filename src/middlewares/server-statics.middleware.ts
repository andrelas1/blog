const regexStaticsExtensions = /(js|css|png|ttf)$/gm;

export const serverStaticsMW = () => (req, res, next) => {
  // pathsToServeStatics.forEach((path) => {
  //   app.use(dirName, express.static(path));
  // });
  console.log("MIDDLEWARE REQ URL", req.url);
  console.log("path", req.path);
  console.log(
    "RESOLVED URL",
    `${process.cwd()}/statics/${req.url.split("/").reverse()[0]}`
  );
  if (regexStaticsExtensions.test(req.url)) {
    res.sendFile(
      `${process.cwd()}/statics/${req.url.split("/").reverse()[0]}`,
      (err) => {
        console.log("ERRR", err);
      }
    );
  } else {
    next();
  }
};
