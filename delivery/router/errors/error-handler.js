const {customError} = require("./errors");
const Sentry = require("@sentry/node");
const path = require("path");

const DOWNSTREAM_ERROR = 'Downstream server error!'
const INTERNAL_ERROR = 'Internal Server Error!'

const logError = (err, req, res, next) => {

  if (err.response) {
    Sentry.captureMessage(DOWNSTREAM_ERROR, 'error');
    console.error(customError(err.response.status, err.code, "Downstream server error!"));
  }  else {
    Sentry.captureMessage(INTERNAL_ERROR, 'error');
    console.error(customError(500, "Internal server error!", err.message));
  }
  next(err);
}

const renderError = (err, res) => {
  res.status(err.response.status).render(path.resolve(__dirname, "..", "..", "..", "views", "error-pages", "error-page.html"), {
    errorStatus: err.response.status,
    statusText: err.response.statusText
  })
}

module.exports = {
  logError,
  renderError,
}