const express = require('express');
const {processError} = require("./errors/error-handler");
const {retrieveMeteorDataLastWeek, retrieveMeteorDataWithQueryParams} = require("../../use-cases/retrieve-meteors-data");
require('dotenv').config();

const router = express.Router();

router.get('/meteors', (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    retrieveMeteorDataWithQueryParams(res, req.query)
    .catch((err) => {
      processError(err,res);
    });
  } else {
    retrieveMeteorDataLastWeek(res)
    .catch((err) => {
      processError(err, res);
    });
  }
});

module.exports = {
  router
}