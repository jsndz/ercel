import { S3 } from "aws-sdk";
import fs from "fs";
import { R2_BUCKET_ENDPOINT, R2_BUCKET_ID, R2_BUCKET_SECRET } from "../config";

const s3 = new S3({
  accessKeyId: R2_BUCKET_ID,
  secretAccessKey: R2_BUCKET_SECRET,
  endpoint: R2_BUCKET_ENDPOINT,
});

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
