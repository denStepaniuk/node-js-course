const {retrieveMeteorDataWithQueryParams, retrieveMeteorDataLastWeek} = require(
    "../../use-cases/retrieve-meteors-data");
const {
  meteorResponseBodyValidator,
  observableMeteorsResponseValidator
} = require("../../app-utils/validators/validators");

const getMeteorsData = (req, res, next) => {
  if (Object.keys(req.query).length !== 0) {
    retrieveMeteorDataWithQueryParams(res, req.query)
    .then((responseBody) => {
      const {error} = meteorResponseBodyValidator(responseBody, next);
      error
          ? next(error)
          : res.send(responseBody);
    })
    .catch((err) => {
      next(err);
    });
  } else {
    retrieveMeteorDataLastWeek(res)
    .then((responseBody) => {
      const {error} = observableMeteorsResponseValidator(responseBody);
      error
          ? next(error)
          : res.send(responseBody)
    })
    .catch((err) => {
      next(err);
    });
  }
};

module.exports = {
  getMeteorsData,
}