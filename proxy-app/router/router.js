const axios = require("axios");
const express = require('express', 4.18);
const {NASA_URL, METEORS_PATH} = require("./router-utills");
const {getPreviousWeekDates} = require("../utils/date-utils");
const {NASA_API_KEY, APP_LOCAL_PORT} = require("../env-constants/environments");
const {proceedAndTransform} = require("../utils/response-transform-utils");
const {processAndSendError} = require("../errors/error-handler");

const app = express();

const getMeteors = () => {
  app.get('/meteors', async (req, resp) => {
    try {
      const response = await axios
      .get(`${NASA_URL}${METEORS_PATH}`, {
        params: {
          start_date: getPreviousWeekDates().monday,
          end_date: getPreviousWeekDates().friday,
          api_key: NASA_API_KEY
        }
      });

      const responseBody = proceedAndTransform(response);

      if (response.status === 200) {
        console.log(
            `Success ${METEORS_PATH} : ${response.config.method} ${JSON.stringify(response.status)} OK`);
        resp.send(responseBody);
      }
    } catch (err) {
      processAndSendError(err, resp)
    }
  });

  app.listen(APP_LOCAL_PORT, () => {
    console.log(`App started on port ${APP_LOCAL_PORT}`)
  })
}

module.exports = {
  getMeteors
}