import {Router} from 'express';
import {IController} from '../interfaces/IController';

export class MainController {
  private readonly _mainRouter: Router;

  constructor() {
    this._mainRouter = Router();
  }

  bindRoutes(routes: Array<IController>): void {
    routes.forEach(({path, method, func, middlewares}) => {
      let middleware = middlewares?.forEach(mwr => mwr.cast.bind(mwr))
      let handler = func.bind(this);
      let pipeline = middleware ? [...middleware, handler] : handler;
      this._mainRouter[method](path, pipeline);
    });
  }

  get mainRouter(){
    return this._mainRouter;
  }
}