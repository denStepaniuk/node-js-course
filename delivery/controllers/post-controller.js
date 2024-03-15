const {getLinkToRoverPicture} = require("../../use-cases/retrieve-meteors-data");

const postRequestToNasaRover = (req, res, next) => {
  getLinkToRoverPicture(req)
  .then((link) => {
    res.redirect(link);
  })
  .catch((err) => {
    next(err)
  })
};

module.exports = {
  postRequestToNasaRover
}