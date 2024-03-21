const express = require("express");
const {roverPictureRequestBodyValidator} = require("../../app-utils/validators/validators")
const {
  renderError,
  logError
} = require("./errors/error-handler");
const {
  getMostDangerousMeteors,
  getMeteorsData,
  getPictures,
  getRoot,
} = require("../controllers/get-controller");
const {postRequestToNasaRover} = require("../controllers/post-controller");
const {sentryInitiator} = require("../../app-utils/logging/sentry-initiator");
const path = require("path");
const router = express.Router();
const Sentry = sentryInitiator(router);

router.use(Sentry.Handlers.requestHandler());
router.use(Sentry.Handlers.tracingHandler());
router.use(express.json());
router.use(express.static(path.resolve(__dirname, "..", "..", "public")));

router.get('/', getRoot);
router.get('/get-pictures', getPictures);
router.get('/get-meteors-data', getMostDangerousMeteors);

router.get('/meteors', getMeteorsData);
router.post('/yep-its-post-but-get-me-photo', roverPictureRequestBodyValidator, (req, res, next ) => {
  postRequestToNasaRover(req, res, next);
});

router.use(Sentry.Handlers.errorHandler());
router.use(logError);
router.use(( err, req, res, next) => {
  console.error(err);
  renderError(err, res);
});

router.use("*", (req, res) => {
  res.status(404).render(path.resolve(__dirname, "..", "..", "views", "error-pages", "error-page.html"), {
    statusText: "Page Not Found",
    errorStatus: 404
  });
});

module.exports = {
  router
}