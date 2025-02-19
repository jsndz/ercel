import express from "express";
import path from "path";
import cors from "cors";
import simpleGit from "simple-git";
import { createClient } from "redis";
import { Redis } from "ioredis";

import { generate } from "./utils/generateID";
import { PORT, REDIS_URI } from "./config";
import { getFilePath } from "./utils/filePath";
import { uploadFiles } from "./utils/aws";

const pub = new Redis(REDIS_URI!);
const sub = new Redis(REDIS_URI!);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const url = req.body.url;
  const id = generate();
  await simpleGit().clone(url, path.join(__dirname, `out/${id}`));
  const files = getFilePath(path.join(__dirname, `out/${id}`));
  console.log(files);
  files.forEach(async (file) => {
    await uploadFiles(file, file.slice(__dirname.length + 1));
  });

  await pub.lpush("build-queue", id);
  await pub.hset("status", id, "uploaded");

  res.json({ id });
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await sub.hget("status", id as string);
  res.json({
    status: response,
  });
});
app.listen(PORT, () => {
  console.log(`sever running in ${PORT}`);
});
