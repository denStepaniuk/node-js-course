const express = require('express');
const {processError} = require("./errors/error-handler");
const {
  retrieveMeteorDataLastWeek, 
  retrieveMeteorDataWithQueryParams,
  getLinkToRoverPicture
} = require("../../use-cases/retrieve-meteors-data");
require('dotenv').config();

const router = express.Router();
router.use(express.json());

router.get('/meteors', (req, res, next) => {
  if (Object.keys(req.query).length !== 0) {
    retrieveMeteorDataWithQueryParams(res, req.query)
    .catch((err) => {
      next(err);
   });
  } else {
    retrieveMeteorDataLastWeek(res)
    .catch((err) => {
     next(err);
   });
  }
});

router.post(`/yep-its-post-but-get-me-photo`, (req, res, next) => {
  getLinkToRoverPicture(req)
  .then((link) => {
    res.redirect(link);
  })
  .catch((err) => {
   next(err)
  })
});

router.use((err, req, res, next) => {
  const processedError = processError(err, res);
  res.send(processedError);
})

module.exports = {
  router
}