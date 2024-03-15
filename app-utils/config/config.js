require("dotenv").config();

const nasa_api_key = process.env.api_key;
const sentry_dsn = process.env.sentry_dsn;
const local_port = process.env.local_port

module.exports = {
  nasa_api_key,
  sentry_dsn,
  local_port
}