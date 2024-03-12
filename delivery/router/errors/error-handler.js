const {customError} = require("./errors");

const processError = (err, res) => {
  console.error(err);

  if (err.response) {
    res
    .status(err.response.status)
    .send(customError(err.response.status, err.code, "Downstream server error!"));
  } else {
    res
    .status(500)
    .send(customError(500, "Internal Server Error", err.message))
  }
}

module.exports = {
  processError
}