const express = require("express");
const {roverPictureRequestBodyValidator} = require("../../app-utils/validators/validators")
const {processError} = require("./errors/error-handler");
const {getMeteorsData} = require("../controllers/get-controller");
const {postRequestToNasaRover} = require("../controllers/post-controller");
const {sentryInitiator} = require("../../app-utils/logging/sentry-initiator");

const router = express.Router();
const Sentry = sentryInitiator(router);
router.use(Sentry.Handlers.requestHandler());
router.use(Sentry.Handlers.tracingHandler());
router.use(express.json());

router.get('/meteors', getMeteorsData);

router.post(`/yep-its-post-but-get-me-photo`, roverPictureRequestBodyValidator, (req, res, next ) => {
  postRequestToNasaRover(req, res, next);
});

router.use(Sentry.Handlers.errorHandler())
router.use((err, req, res, next) => {
  const processedError = processError(err, res);
  res.send(processedError);
})

module.exports = {
  router
}