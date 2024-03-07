const {v4: uuidv4} = require("uuid");

let customError = (code, status, message) => {
  return {
    id: uuidv4(),
    code: code,
    status: status,
    message: message
  }
};

module.exports = {customError}