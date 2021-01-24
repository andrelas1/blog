/**
 * Not being used but could be useful to:
 *
 * 1. setup database mocked data
 * 2. setup website metadata (see home.json)
 * 3. run docker command to spin up app and db container
 * */

import { exec } from "child_process";

const start = () => {
  exec(
    "docker-compose -f docker-compose.dev.yml up --build",
    (err, stdout, stderr) => {
      if (err) {
        console.log("ERROR", err.message);
      }
      if (stderr) {
        console.log("STD ERROR", stderr);
      }
      console.log(stdout);
    }
  );
};

start();
