const {retrieveMeteorDataWithQueryParams, retrieveMeteorDataLastWeek,
  getLinksToRoverPictures
} = require("../../use-cases/retrieve-meteors-data");
const {
  meteorResponseBodyValidator,
  observableMeteorsResponseValidator
} = require("../../app-utils/validators/validators");
const path = require("path");

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

const getRoot = (req, res, next) => {
    res.render(path.resolve(__dirname, "..", "..", "views", "start.html"));
}

const getPictures = (req, res, next) => {
  getLinksToRoverPictures()
  .then((linksArray) => {
    res.render(path.resolve(__dirname, "..", "..", "views", "pictures.html"), {linksArray});
  })
  .catch((err) => {
    next(err);
  })
}

const getMostDangerousMeteors = (req, res, next) => {
  retrieveMeteorDataWithQueryParams(res, {were_dangerous_meteors: "true"})
  .then((responseBody) => {
    res.status(200).render(path.resolve(__dirname, "..", "..", "views", "dangerous-meteors.html"), {
      hazardousAmount: responseBody.hazardous.amount,
      meteors: responseBody.hazardous.meteors
    })
  })
  .catch((error) => {
    next(error);
  })
}

module.exports = {
  getRoot,
  getMeteorsData,
  getPictures,
  getMostDangerousMeteors
}