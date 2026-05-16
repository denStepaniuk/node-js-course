import IMiddleware from "../interfaces/IMiddleware";
import { Request, Response, NextFunction } from "express";

// Middleware triggered for any types of requests not only for those that defined in controllers
// even calls to favicon or static trapped

export const logger: IMiddleware = {
  cast: (req: Request, res: Response, next: NextFunction) => {
    console.info('Logger activated');

    const logBody = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    };

    console.info(logBody);

    next();
  }
};
