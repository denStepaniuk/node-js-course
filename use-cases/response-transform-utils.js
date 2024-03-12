const {estimatedDiameterInMeters} = require('../app-utils/iso-utils');

const transformMeteorResponse = (response) => {

  const responseBody = {};

  for (const key in response.data.near_earth_objects) {
    responseBody[key] = [];
    if (response.data.near_earth_objects.hasOwnProperty(key)) {

      response.data.near_earth_objects[key].forEach(meteor => {
            responseBody[key].push(
                {
                  id: meteor.id,
                  name: meteor.name,
                  average_diameter: estimatedDiameterInMeters(
                      meteor.estimated_diameter.meters.estimated_diameter_min,
                      meteor.estimated_diameter.meters.estimated_diameter_max
                  ),
                  is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
                  close_approach_data: meteor.close_approach_data,
                  relative_velocity: meteor.close_approach_data[0].relative_velocity.kilometers_per_second
                }
            )
          }
      );
    }
  }
  return responseBody;
};

const retrievePotentiallyDangerousMeteors = (response) => {
  let body =  transformMeteorResponse(response);
  const responseBody = {
    amount: null,
    meteors : []
  };

  for ( const key in body) {

    body[key].forEach(arr => {

      if (arr.is_potentially_hazardous_asteroid === true) {
        responseBody.meteors.push({
          id: arr.id,
          name: arr.name,
          is_potentially_hazard: arr.is_potentially_hazardous_asteroid
        })
      }
    })
  }
  responseBody.amount = responseBody.meteors.length;

  return responseBody;
};

const countVisibleMeteors = (response) => {
  return { meteors: response.data.element_count};
};

module.exports = {
  transformMeteorResponse,
  countVisibleMeteors,
  retrievePotentiallyDangerousMeteors
}