import {IMiddleware} from "../interfaces/IMiddleware";
import {Request, Response, NextFunction} from "express";

// Middleware triggered for any types of requests not only for those that defined in controllers
// even calls to favicon or static trapped

export const logger: IMiddleware = {
  cast: (req: Request, res: Response, next: NextFunction): void => {
    console.log(`HERE STARTS MIDDLEWARE: --> : `);
    Object.keys(req.params).length !== 0 ? console.log(req.params) : undefined;
    console.log(req.url);
    console.log("MESSAGE FROM MIDDLEWARE \n");
    next();
  }
};