import fs from "fs";
import path from "path";

export const getFilePath = (folderPath: string): string[] => {
  try {
    return fs.readdirSync(folderPath).flatMap((file) => {
      //flatMap with map then flatten the array
      const filePath = path.join(folderPath, file);
      return fs.statSync(filePath).isDirectory()
        ? getFilePath(filePath)
        : [filePath];
    });
  } catch (error) {
    console.error(`Error reading directory: ${folderPath}`, error);
    return [];
  }
};
