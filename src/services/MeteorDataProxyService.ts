import axios from 'axios';
import {nasa_api_key} from '../config/config';
import {METEORS_PATH, NASA_URL} from '../router/router.utills';
import {DateUtils} from '../utils/DateUtils';
import {NasaResponseUtils} from '../utils/NasaResponseUtils';
import {
  HazardousMeteor,
  MeteorResponse,
  NearEarthObjectsResponse
} from '../dtos/MeteorResponseTypes';

export class MeteorDataProxyService {
  private readonly responseUtils: NasaResponseUtils;
  private readonly dateUtils: DateUtils;

  constructor() {
    this.responseUtils = new NasaResponseUtils();
    this.dateUtils = new DateUtils();
  }

  async getMeteorDataWithQueryParams(queryParams: any): Promise<MeteorResponse> {
    let responseBody: MeteorResponse;

    return await axios.get(`${NASA_URL}${METEORS_PATH}`, {
      params: {
        api_key: nasa_api_key,
        start_date: queryParams.start_date,
        end_date: queryParams.end_date
      }
    })
    .then((response) => {
      if (queryParams.count === 'true') {
        responseBody = this.responseUtils.countVisibleMeteors(response);
      }

      if (queryParams.start_date && queryParams.end_date && !queryParams.were_dangerous_meteors) {
        responseBody = this.responseUtils.transformMeteorResponse(response);
      }

      if (queryParams.start_date && queryParams.end_date && queryParams.were_dangerous_meteors === 'true') {
        let hazardousData: HazardousMeteor =  this.responseUtils.retrievePotentiallyDangerousMeteors(response);
        responseBody.amount = hazardousData.amount;
        responseBody.meteors = hazardousData.meteors;
      }

      if (queryParams.were_dangerous_meteors === 'true' && !(queryParams.start_date && queryParams.end_date)) {
        responseBody = this.responseUtils.retrievePotentiallyDangerousMeteors(response);
      }

      return responseBody;
    })
  };

  async retrieveMeteorDataLastWeek(): Promise<NearEarthObjectsResponse> {
    return await axios.get(`${NASA_URL}${METEORS_PATH}`, {
      params: {
        start_date: this.dateUtils.getPreviousWeekDates().monday,
        end_date: this.dateUtils.getPreviousWeekDates().friday,
        api_key: nasa_api_key
      }
    })
    .then((response) => {
      return this.responseUtils.transformMeteorResponse(response);
    });
  };
}