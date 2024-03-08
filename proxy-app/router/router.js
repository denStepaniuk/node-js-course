const axios = require("axios");
const express = require('express', 4.18);
const {NASA_URL, METEORS_PATH} = require("./router-utills");
const {getPreviousWeekDates} = require("../utils/date-utils");
const {proceedAndTransform} = require("../utils/response-transform-utils");
const {processError} = require("../errors/error-handler");
require('dotenv').config();

const app = express();
const localPort = process.env.local_port
const nasa_api_key = process.env.api_key

const getMeteors = () => {
  app.get('/meteors', async (req, resp) => {
    try {
      const response = await axios
      .get(`${NASA_URL}${METEORS_PATH}`, {
        params: {
          start_date: getPreviousWeekDates().monday,
          end_date: getPreviousWeekDates().friday,
          api_key: nasa_api_key
        }
      });

      const responseBody = proceedAndTransform(response);

      if (response.status === 200) {
        console.log(`Success ${METEORS_PATH} : ${response.config.method} ${JSON.stringify(response.status)} OK`);
        resp.send(responseBody);
      }
    } catch (err) {
      processError(err, resp)
    }
  });

  app.listen(localPort, () => {
    console.log(`App started on port ${localPort}`)
  })
}

module.exports = {
  getMeteors
}