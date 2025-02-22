import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const R2_BUCKET_ID = process.env.R2_BUCKET_ID;
export const R2_BUCKET_SECRET = process.env.R2_BUCKET_SECRET;
export const R2_BUCKET_ENDPOINT = process.env.R2_BUCKET_ENDPOINT;
