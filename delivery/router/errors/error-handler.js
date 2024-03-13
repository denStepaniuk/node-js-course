const {customError} = require("./errors");

const processError = (err) => {
  console.log("Try to process errorr")
  console.error(err);

  if (err.response) {
   return customError(err.response.status, err.code, "Downstream server error!")
  } else {
   return customError(500, "Internal server error!", err.message)
  }
}

module.exports = {
  processError
}