const {roverPictureRequestBodyValidator} = require('../../app-utils/validators/validators')
const express = require('express');
const {processError} = require('./errors/error-handler');
const {getMeteorsData} = require('../controllers/get-controller');
const {postRequestToNasaRover} = require('../controllers/post-controller');
require('dotenv').config();

const router = express.Router();
router.use(express.json());

router.get('/meteors', getMeteorsData);

router.post(`/yep-its-post-but-get-me-photo`, roverPictureRequestBodyValidator, (req, res, next ) => {
  postRequestToNasaRover(req, res, next);
});

router.use((err, req, res, next) => {
  const processedError = processError(err, res);
  res.send(processedError);
})

module.exports = {
  router
}