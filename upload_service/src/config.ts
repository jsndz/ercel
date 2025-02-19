import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const R2_BUCKET_ID = process.env.R2_BUCKET_ID;
export const R2_BUCKET_SECRET = process.env.R2_BUCKET_SECRET;
export const R2_BUCKET_ENDPOINT = process.env.R2_BUCKET_ENDPOINT;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_URI = process.env.REDIS_URI;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_USER = process.env.REDIS_USER;
