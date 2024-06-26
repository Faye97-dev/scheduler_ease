import dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.ENV;
export const APP_PORT = Number(process.env.APP_PORT ?? 8080);
export const ORIGIN = process.env.ORIGIN ?? '*';
export const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const DATABASE_URL = process.env.DATABASE_URL;

