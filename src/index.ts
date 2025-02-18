import express from "express";
import { PORT } from "./config";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils/generateID";
import path from "path";
import { getFilePath } from "./utils/filePath";
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const url = req.body.url;
  const id = generate();
  await simpleGit().clone(url, path.join(__dirname, `out/${id}`));
  const files = getFilePath(path.join(__dirname, `out/${id}`));
  console.log(files);

  res.json({ id });
});

app.listen(PORT, () => {
  console.log(`sever running in ${PORT}`);
});
