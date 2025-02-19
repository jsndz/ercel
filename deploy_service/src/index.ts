import { Redis } from "ioredis";

import { REDIS_URI } from "./config";

const pub = new Redis(REDIS_URI!);

async function main() {
  while (1) {
    await pub.brpop("build-queue", 0);
  }
}
main();
