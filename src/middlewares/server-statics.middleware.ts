const regexStaticsExtensions = /(js|css|png|ttf)$/gm;

export const serverStaticsMW = () => (req, res, next) => {
  // pathsToServeStatics.forEach((path) => {
  //   app.use(dirName, express.static(path));
  // });
  console.log("MIDDLEWARE REQ URL", req.url);
  if (regexStaticsExtensions.test(req.url)) {
    console.log("requst", req.url);
    res.sendFile(
      `${process.cwd()}/statics/${req.url.split("/").reverse()[0]}`,
      {},
      (err) => {
        if (err) {
          console.log("ERRR SERVING STATICS", err);
        } else {
          console.log(
            "FILE SENT:",
            `${process.cwd()}/statics/${req.url.split("/").reverse()[0]}`
          );
        }
      }
    );
  } else {
    next();
  }
};
