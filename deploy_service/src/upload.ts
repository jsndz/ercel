import path from "path";
import { getFilePath } from "./filePath";
import { uploadFiles } from "./aws";

export const copyFinalDist = async (id: string) => {
  const folderPath = path.join(__dirname, `out/${id}/dist`);
  const allFiles = getFilePath(folderPath);
  allFiles.forEach((file) => {
    uploadFiles(file, `dist/${id}/` + file.slice(folderPath.length + 1));
  });
};
