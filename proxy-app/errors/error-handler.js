const {customError} = require("./errors");

const processError = (err, resp) => {
  console.error(err);

  if (err.response) {
    resp
    .status(err.response.status)
    .send(customError(err.response.status, err.code, "Downstream server error!"));
  } else {
    resp
    .status(500)
    .send(customError(500, "Internal Server Error", err.message))
  }
}

module.exports = {
  processError
}