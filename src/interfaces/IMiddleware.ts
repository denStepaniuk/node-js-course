import {Request, Response, NextFunction} from 'express'
import Exception from '../utils/exceptions/Exception';

export class IMiddleware {
  cast: ((req: Request, res: Response, next: NextFunction) => void)
}