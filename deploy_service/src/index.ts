import { Redis } from "ioredis";

import { REDIS_URI } from "./config";
import { downloadS3Folder } from "./aws";
import { buildProject } from "./build";
import { copyFinalDist } from "./upload";

const pub = new Redis(REDIS_URI!);

async function main() {
  while (1) {
    const res = await pub.brpop("build-queue", 0);
    console.log(res![1]);
    if (res) {
      await downloadS3Folder(`out/${res[1]}`);
      await buildProject(res[1]);
      await copyFinalDist(res[1]);
    }
  }
}
main();
