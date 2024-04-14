import express, { Express, NextFunction, Request, Response } from "express";
import nunjucks from "nunjucks";
import path from "path";
import { MeteorsController } from "./controllers/MeteorsController";
import { PicturesController } from "./controllers/PicturesController";
import { sentryInitiator } from "./utils/SentryUtils";
import { ExceptionFilter } from "./utils/exceptions/ExceptionFilter";
import Exception from "./utils/exceptions/Exception";
import { errorProcessor } from "./utils/exceptions/processed.error";

export class Application {
  serverPort: number;
  app: Express;
  meteorsController: MeteorsController;
  picturesController: PicturesController;

  constructor(port: number) {
    this.app = express();
    this.serverPort = port;
    this.meteorsController = new MeteorsController();
    this.picturesController = new PicturesController();
  }

  useRouter() {
    this.app.use("/", this.picturesController.mainRouter);
    this.app.use("/", this.meteorsController.mainRouter);
  }

  useNunjucks() {
    nunjucks.configure("views", {
      autoescape: true,
      express: this.app,
    });
  }

  useLogger() {
    sentryInitiator(this.meteorsController.mainRouter);
    sentryInitiator(this.picturesController.mainRouter);
    this.app.use(sentryInitiator);
  }
  useExceptionHandler() {
    const exceptionFilter = new ExceptionFilter();
    this.app.use(exceptionFilter.catch.bind(exceptionFilter));
    this.app.use("*", (req: Request, res: Response) => {
      res.render(
        path.resolve(
          __dirname,
          "..",
          "..",
          "views",
          "error-pages",
          "page-not-found.html",
        ),
      );
    });
  }

  init() {
    // this.useLogger()
    this.useRouter();
    this.useNunjucks();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.resolve(__dirname, "..", "..", "public")));
    this.useExceptionHandler();
    this.app.use(
      (err: unknown, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof Exception) {
          res.status(500).send(errorProcessor(err));
        }
      },
    );
    this.app.listen(this.serverPort, () => {
      console.log(`App started on port: ${this.serverPort}`);
    });
  }
}
