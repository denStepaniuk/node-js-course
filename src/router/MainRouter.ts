import {Router} from 'express';
import {MainController} from '../controllers/MainController';

/**
 * @deprecated
 */
export class MainRouter {
  private readonly router: Router;
  private readonly mainController: MainController;

  constructor() {
    this.mainController = new MainController();
    this.router = Router();
    this.init();
  }

  init() {
    // this.router.get('/', this.mainController.renderHomePage);
    // this.router.get('/meteors', this.mainController.renderHazardousMeteorsPage);
  }
}