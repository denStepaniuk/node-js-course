import {MainController} from "./MainController";
import {NextFunction, Request, Response} from "express";
import {ResponseRenderService} from "../services/ResponseRenderService";

export class PicturesController extends MainController {
  private readonly renderService: ResponseRenderService;

  constructor() {
    super();
    this.renderService = new ResponseRenderService();
    this.bindRoutes([
      {
        path: "/get-pictures",
        method: "get",
        func: this.renderRoverPictures
      }
    ]);
  }

  renderRoverPictures(req: Request, res: Response, next: NextFunction) {
    try {
      this.renderService.renderPicturePage(req, res, next);
    } catch (error) {
      next(error);
    }
  }

}