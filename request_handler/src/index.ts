import express from "express";
import { PORT } from "./config";

const app = express();

app.get("/*", (req, res) => {
  const hostname = req.hostname;
  console.log(hostname);

  const id = hostname.split(".")[0];
  console.log(id);
});

app.listen(PORT, () => {
  console.log(`sever running at ${PORT}`);
});
