import express from "express";
import {
  PORT,
  R2_BUCKET_ENDPOINT,
  R2_BUCKET_ID,
  R2_BUCKET_SECRET,
} from "./config";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: R2_BUCKET_ID,
  secretAccessKey: R2_BUCKET_SECRET,
  endpoint: R2_BUCKET_ENDPOINT,
});

const app = express();

app.get("/*", async (req, res) => {
  const hostname = req.hostname;
  console.log(hostname);
  const id = hostname.split(".")[0];
  const filePath = req.path;
  const content = await s3
    .getObject({
      Bucket: "ercel",
      Key: `/dist/${id}${filePath}`,
    })
    .promise();
  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
  res.set("Content-type", type);
  res.send(content.Body);
});

app.listen(PORT, () => {
  console.log(`sever running at ${PORT}`);
});
