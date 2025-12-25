import { Request, Response, NextFunction } from "express";

export default class IMiddleware {
  cast: ((req: Request, res: Response, next: NextFunction) => void);
}
