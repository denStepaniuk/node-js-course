import { IMiddleware } from "../interfaces/IMiddleware";
import { Request, Response, NextFunction } from "express";

// Middleware responded in case using it in JsonPlaceHolderController
// Se how it has been added in Application file
// So making request on /posts/1 we triggered middleware

export const logger: IMiddleware = {
  cast: (req: Request, res: Response, next: NextFunction): void => {
    console.log('HERE STARTS MIDDLEWARE: --> :')
    console.log(req.params)
    console.log(req.url)
    console.log('MESSAGE FROM MIDDLEWARE');
    next();
  }
}