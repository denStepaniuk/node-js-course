const express = require('express', 4.18);
const {APP_LOCAL_PORT, NASA_API_KEY} = require("./environments");
const {NASA_URL, METEORS_PATH} = require('./router-utills')
const axios = require("axios");
const {customError} = require('./errorrs');
const {getPreviousWeekDates} = require('./utils');

const app = express();

app.get('/meteors', async (req, resp) => {

  let meteors = {
    meteors: {
    }
  }

  try {
    const response = await axios
    .get(`${NASA_URL}${METEORS_PATH}`, {
      params: {
        start_date: getPreviousWeekDates().monday,
        end_date: getPreviousWeekDates().friday,
        api_key: NASA_API_KEY
      }
    });

    for (const key in response.data.near_earth_objects){
      if (response.data.near_earth_objects.hasOwnProperty(key)) {
        let data = response.data.near_earth_objects[key];
        // console.log(`-------------> ${JSON.stringify(data)}`)
        console.log('Key' + key)
        // delete meteors.meteors.date;
        console.log('Meteors: ' + JSON.stringify(meteors));
        meteors.meteors[key] = response.data.near_earth_objects[key];
        console.log('Changed: ' + JSON.stringify(meteors));
        //TODO:
        // complete transformation to resulting object
        // to send to requester;
      }
    }
    if (response.status === 200) {
      // console.log(JSON.stringify(response.data.near_earth_objects));
      resp.send(response.data);
    }

  } catch (err) {
    console.error(err);
    resp.status(err.response.status).send(
        customError(err.response.status, err.code, "Downstream server error!"));
  }
});

app.listen(APP_LOCAL_PORT, () => {
  console.log(`App started on port ${APP_LOCAL_PORT}`)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});