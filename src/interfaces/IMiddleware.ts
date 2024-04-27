import {Request, Response, NextFunction} from "express";

export class IMiddleware {
  cast: ((req: Request, res: Response, next: NextFunction) => void);
}