import {
  hazardousMeteorsResponseValidSchema, nearObjectResponse,
  observableMeteorsSchema, responseMeteorValidSchema,
  roverPictureRequestValidSchema
} from './validation.schemas'
import {
  MeteorResponse,
  NearEarthObjectsResponse
} from '../../dtos/MeteorResponseTypes';
import {NextFunction, Request} from 'express';

export const observableMeteorsResponseValidator = (responseBody: MeteorResponse) => {
  return observableMeteorsSchema.validate(responseBody);
};

export const hazardousMeteorResponseBodyValidator = (responseBody: MeteorResponse) => {
  return hazardousMeteorsResponseValidSchema.validate(responseBody);
};

export const roverPictureRequestBodyValidator = (req: Request, next: NextFunction) => {
  const {error} = roverPictureRequestValidSchema.validate(req.body);
  next(error);
};

export const meteorResponseDataValidator = (responseBody: MeteorResponse) => {
  return responseMeteorValidSchema.validate(responseBody);
}

export const nearEarthObjectValidator = (responseBody: NearEarthObjectsResponse) => {
  return nearObjectResponse.validate(responseBody)
}