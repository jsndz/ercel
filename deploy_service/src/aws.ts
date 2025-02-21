import { S3 } from "aws-sdk";
import fs, { existsSync } from "fs";
import path from "path";

import { R2_BUCKET_ENDPOINT, R2_BUCKET_ID, R2_BUCKET_SECRET } from "./config";

const s3 = new S3({
  accessKeyId: R2_BUCKET_ID,
  secretAccessKey: R2_BUCKET_SECRET,
  endpoint: R2_BUCKET_ENDPOINT,
});

export const downloadS3Folder = async (prefix: string) => {
  const allFiles = await s3
    .listObjectsV2({
      Bucket: "ercel",
      Prefix: prefix,
    })
    .promise();
  //Key is Path to file
  const allPromises =
    allFiles.Contents?.map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        if (!Key) {
          resolve("");
          return;
        }
        const finalOutputPath = path.join(__dirname, Key);
        const outputFile = fs.createWriteStream(finalOutputPath);
        const dirName = path.dirname(finalOutputPath);
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }
        s3.getObject({ Bucket: "ercel", Key })
          .createReadStream()
          .pipe(outputFile)
          .on("finish", () => {
            resolve("");
          });
      });
    }) || [];
  await Promise.all(allPromises?.filter((x) => x !== undefined));
};

export const uploadFiles = async (localfilePath: string, fileName: string) => {
  try {
    const fileContents = fs.readFileSync(localfilePath);
    const res = await s3
      .upload({
        Body: fileContents,
        Bucket: "ercel",
        Key: fileName,
      })
      .promise();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
