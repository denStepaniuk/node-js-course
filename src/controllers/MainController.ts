import { Router } from "express";
import { IController } from "../interfaces/IController";
import { logger } from "../middleware/middleware";

export class MainController {
  private readonly _mainRouter: Router;

  constructor() {
    this._mainRouter = Router();
  }

  bindRoutes(routes: Array<IController>): void {
    routes.forEach(({ path, method, func, middlewares }) => {
      const middleware = middlewares?.forEach(mwr => mwr.cast.bind(mwr));
      const handler = func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this._mainRouter[method](path, pipeline);
    });
  }

  get mainRouter() {
    this._mainRouter.use((req, res, next) => {
      // middleware here used on lvl of rourer
      logger.cast(req, res, next);

    });
    return this._mainRouter;
  }
}
