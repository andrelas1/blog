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
