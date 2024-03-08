const {estimatedDiameterInMeters} = require('./iso-utils');

const proceedAndTransform = (response) => {

  const responseBody = {meteors: {}};

  for (const key in response.data.near_earth_objects) {

    if (response.data.near_earth_objects.hasOwnProperty(key)) {

      responseBody.meteors[key] = response.data.near_earth_objects[key];

      response.data.near_earth_objects[key].forEach(arr => {
        responseBody.meteors[key] = {
          id: arr.id,
          name: arr.name,
          average_diameter: estimatedDiameterInMeters(
              arr.estimated_diameter.meters.estimated_diameter_min,
              arr.estimated_diameter.meters.estimated_diameter_max
          ),
          is_potentially_hazardous_asteroid: arr.is_potentially_hazardous_asteroid,
          close_approach_data: arr.close_approach_data,
          relative_velocity: arr.close_approach_data[0].relative_velocity.kilometers_per_second
        }
      })
    }
  }
  return responseBody;
}

module.exports = {
  proceedAndTransform
}