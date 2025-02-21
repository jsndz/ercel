import { exec } from "child_process";
import path from "path";
import { stdout } from "process";

export const buildProject = (id: string) => {
  return new Promise((resolve) => {
    const child = exec(
      `cd  ${path.join(__dirname, `out/${id}`)} && npm install && npm run build`
    );

    child.stdout?.on("data", function (data) {
      console.log(data);
    });
    child.stderr?.on("data", function (data) {
      console.log(data);
    });
    child.on("close", function () {
      resolve("");
    });
  });
};
