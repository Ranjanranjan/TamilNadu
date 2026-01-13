import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};
