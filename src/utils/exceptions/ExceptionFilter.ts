import path from 'path';
import Exception from './Exception';
import {NextFunction, Request, Response} from 'express';
import {InvalidResponseBodyException} from './InvalidResponseBodyException';
import {errorProcessor} from './processed.error'

export class ExceptionFilter {
  catch(
      err: Error | Exception | InvalidResponseBodyException,
      req: Request,
      res: Response,
      next: NextFunction
  ): void {
    if (err instanceof InvalidResponseBodyException) {
      res.status(500).send(errorProcessor(err))
    } else {
      res.status(500).render(path.resolve(__dirname, '..', '..', '..', '..', 'views', 'error-pages', 'error-page.html'), {
        statusText: "Internal Server Error",
        errorStatus: 500
      });
    }
  }
}