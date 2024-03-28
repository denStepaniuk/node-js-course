import {Request, Response, NextFunction, Router} from 'express';
import {IMiddleware} from './IMiddleware';

export interface IController {
 path: string,
 method: keyof Pick<Router, 'get' | 'post'>,
 func: (req: Request, res: Response, next: NextFunction) => void;
 middlewares?: Array<IMiddleware>
}