const {customError} = require("./errors");
const Sentry = require("@sentry/node");

const DOWNSTREAM_ERROR = 'Downstream server error!'
const INTERNAL_ERROR = 'Internal Server Error!'

const processError = (err, res) => {
  console.error(err)

  if (err.response) {
    Sentry.captureMessage(DOWNSTREAM_ERROR, 'error');
   return customError(err.response.status, err.code, "Downstream server error!");
  } else {
    Sentry.captureMessage(INTERNAL_ERROR, 'error');
   return customError(500, "Internal server error!", err.message);
  }
}

module.exports = {
  processError
}