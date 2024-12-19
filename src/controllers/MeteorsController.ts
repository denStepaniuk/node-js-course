import { NextFunction, Request, Response } from "express";
import { MainController } from "./MainController";
import { ResponseRenderService } from "../services/archived/ResponseRenderService";
import { MeteorDataService } from "../services/archived/MeteorDataService";
import { log } from "node:console";

export class MeteorsController extends MainController {
  private readonly renderService: ResponseRenderService;
  private readonly dataService: MeteorDataService;

  constructor() {
    super();
    this.renderService = new ResponseRenderService();
    this.dataService = new MeteorDataService();

    this.bindRoutes([
      {
        path: "/get-meteors-data",
        method: "get",
        func: this.getMeteorsData,
      },
      {
        path: "/",
        method: "get",
        func: this.renderHomePage,
      },
      {
        path: "/get-dangerous-meteors",
        method: "get",
        func: this.renderHazardousMeteorsPage,
      },
    ]);
  }

  renderHomePage(req: Request, res: Response, next: NextFunction): void {
    try {
      this.renderService.renderHomePage(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  //deprecated due to availability lost
  renderHazardousMeteorsPage(req: Request, res: Response, next: NextFunction) {
    try {
      this.renderService.renderHazardousPage(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  //deprecated due to availability lost
  getMeteorsData(req: Request, res: Response, next: NextFunction) {
    try {
      this.dataService.getMeteorsJsonData(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
