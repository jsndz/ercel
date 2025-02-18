import express from "express";
import { PORT } from "./config";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils/utils";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", (req, res) => {
  const url = req.body.url;
  const id = generate();
  simpleGit().clone(url, `out/${id}`);
  res.json({ id });
});

app.listen(PORT, () => {
  console.log(`sever running in ${PORT}`);
});
