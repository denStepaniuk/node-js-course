import {
  HazardousMeteor,
  MeteorResponse,
  NearEarthObjectsResponse,
} from "../dtos/MeteorResponseTypes";

export class NasaResponseUtils {
  retrievePotentiallyDangerousMeteors(response: any): HazardousMeteor {
    let body = this.transformMeteorResponse(response);
    let responseBody: HazardousMeteor = {
      amount: 0,
      meteors: [],
    };

    for (const key in body) {
      body[key].forEach((arr) => {
        if (arr.is_potentially_hazardous_asteroid) {
          responseBody.meteors.push({
            id: arr.id,
            name: arr.name,
            isPotentiallyHazard: arr.is_potentially_hazardous_asteroid,
          });
        }
      });
    }
    responseBody.amount = responseBody.meteors.length;

    return responseBody;
  }

  transformMeteorResponse(response: any): NearEarthObjectsResponse {
    const responseBody: NearEarthObjectsResponse = {};

    for (const key in response.data.near_earth_objects) {
      if (response.data.near_earth_objects.hasOwnProperty(key)) {
        responseBody[key] = response.data.near_earth_objects[key].map(function (
          meteor: any,
        ) {
          return {
            id: meteor.id,
            name: meteor.name,
            average_diameter: estimatedDiameterInMeters(
              meteor.estimated_diameter.meters.estimated_diameter_min,
              meteor.estimated_diameter.meters.estimated_diameter_max,
            ),
            is_potentially_hazardous_asteroid:
              meteor.is_potentially_hazardous_asteroid,
            close_approach_data: meteor.close_approach_data,
            relative_velocity:
              meteor.close_approach_data[0].relative_velocity
                .kilometers_per_second,
          };
        });
      }
    }

    return responseBody;
  }

  countVisibleMeteors(response: any): MeteorResponse {
    const meteorResponse: MeteorResponse = {};
    meteorResponse.amount = response.data.element_count;

    return meteorResponse;
  }
}

function estimatedDiameterInMeters(
  estimatedDiameterMin: number,
  estimatedDiameterMax: number,
): number {
  return (estimatedDiameterMin + estimatedDiameterMax) / 2;
}
