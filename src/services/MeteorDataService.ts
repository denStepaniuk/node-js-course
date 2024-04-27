import { NextFunction, Request, Response } from "express";
import { MeteorDataProxyService } from "./MeteorDataProxyService";
import {
  meteorResponseDataValidator, nearEarthObjectValidator
} from "../utils/validators/validators";
import { InvalidResponseBodyException } from "../utils/exceptions/InvalidResponseBodyException";

export class MeteorDataService {
  private readonly proxyService: MeteorDataProxyService;

  constructor() {
    this.proxyService = new MeteorDataProxyService();
  }

  getMeteorsJsonData(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.query).length !== 0) {
      this.proxyService.getMeteorDataWithQueryParams(req.query)
        .then((responseBody) => {
          const validationResult = meteorResponseDataValidator(responseBody);

          if (validationResult.error) {
            throw new InvalidResponseBodyException(500, "Invalid Response Body Validation", validationResult.error.message);
          }

          res.status(200).send(responseBody);
        }).catch((error) => {
          next(error);
        });
    } else {
      this.proxyService.retrieveMeteorDataLastWeek()
        .then((responseBody) => {
          const invalidResponseBody = nearEarthObjectValidator(responseBody);

          if (invalidResponseBody.error) {
            throw new InvalidResponseBodyException(500, "Invalid Response Body Validation", invalidResponseBody.error.message);
          }

          res.status(200).send(responseBody);
        }).catch((error) => {
          next(error);
        });
    }
  }
}
