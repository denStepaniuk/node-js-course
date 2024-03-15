const axios = require("axios");
const Sentry = require("@sentry/node");
const {nasa_api_key} = require("../app-utils/config/config");
const {NASA_URL, METEORS_PATH, ROVER_PATH} = require("../delivery/router/router-utills");
const {getPreviousWeekDates} = require("../app-utils/date-utils");
const {
  transformMeteorResponse,
  countVisibleMeteors,
  retrievePotentiallyDangerousMeteors,
  retrieveLinkOfPictureOfTheDay
} = require("./response-transform-utils");

const retrieveMeteorDataLastWeek = async (res) => {
  return await axios.get(`${NASA_URL}${METEORS_PATH}`, {
    params: {
      start_date: getPreviousWeekDates().monday,
      end_date: getPreviousWeekDates().friday,
      api_key: nasa_api_key
    }
  })
  .then((response) => {
    Sentry.captureMessage(`Downstream response: ${METEORS_PATH} : ${response.config.method.toUpperCase()} ${JSON.stringify(response.status)} OK`, 'info');
    return transformMeteorResponse(response);
  });
};

const retrieveMeteorDataWithQueryParams = async (serverResp, queryParams) => {
  const responseBody = {};

  return await axios.get(`${NASA_URL}${METEORS_PATH}`, {
    params: {
      api_key: nasa_api_key,
      start_date: queryParams.start_date,
      end_date: queryParams.end_date
    }
  })
  .then((response) => {
    Sentry.captureMessage(`Downstream response: ${METEORS_PATH} : ${response.config.method.toUpperCase()} ${JSON.stringify(response.status)} OK`, 'info');
    if (queryParams.count === 'true') {
      responseBody.visible = countVisibleMeteors(response);
    }

    if (queryParams.start_date && queryParams.end_date && !queryParams.were_dangerous_meteors) {
      responseBody.date_based = transformMeteorResponse(response);
    }

    if (queryParams.start_date && queryParams.end_date && queryParams.were_dangerous_meteors === 'true') {
      responseBody.hazardous = retrievePotentiallyDangerousMeteors(response);
    }

    if (queryParams.were_dangerous_meteors === 'true' && !(queryParams.start_date && queryParams.end_date)) {
      responseBody.hazardous = retrievePotentiallyDangerousMeteors(response);
    }

    return responseBody;
  });
}

const getLinkToRoverPicture = async (request) => {
  return await axios.get(`${NASA_URL}${ROVER_PATH}`, {
    params: {
      api_key: request.body.user_api_key,
      sol: request.body.sol,
      page: request.body.page
    }
  })
  .then((response) => {
    Sentry.captureMessage(`Downstream response: ${ROVER_PATH} : ${response.config.method.toUpperCase()} ${JSON.stringify(response.status)} OK`, 'info');
    return retrieveLinkOfPictureOfTheDay(response.data);
  })
};

module.exports = {
  retrieveMeteorDataLastWeek,
  retrieveMeteorDataWithQueryParams,
  getLinkToRoverPicture
}