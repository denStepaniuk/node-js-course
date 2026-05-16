import { NextFunction, Request, Response } from "express";
import { MeteorDataProxyService } from "./MeteorDataProxyService";
import {
  meteorResponseDataValidator, nearEarthObjectValidator
} from "../../utils/validators/validators";
import { InvalidResponseBodyException } from "../../utils/exceptions/InvalidResponseBodyException";

/**
 * @deprecated
 */
export class MeteorDataService {
  private readonly proxyService: MeteorDataProxyService;

  constructor() {
    this.proxyService = new MeteorDataProxyService();
  }

  private get someExtra(): string {
    return "Hello fellow test"
  }

  getMeteorsJsonData(req: Request, res: Response, next: NextFunction) {
    const s = this.someExtra
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
    }
  }
}
