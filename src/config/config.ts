import {config} from "dotenv";

config();

export const nasa_api_key = process.env.api_key;
export const sentry_dsn = process.env.sentry_dsn;
export const local_port = process.env.local_port;