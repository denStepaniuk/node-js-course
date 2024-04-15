import { Request, Response, NextFunction } from 'express';
import { JsonPlaceholderService } from '../services/JsonPlaceholderService';
import { MainController } from './MainController';
import { logger } from '../middleware/middleware';

export class JsonPlaceholderController extends MainController {
  private readonly jphService: JsonPlaceholderService;

  constructor() {
    super();
    this.jphService = new JsonPlaceholderService();
    this.bindRoutes([
      {
        path: '/posts',
        method: 'get',
        func: this.getAllPostsFromJPH,
      },
      {
        path: '/posts/:postId',
        method: 'get',
        func: this.getSpecificPost,
      }
    ])
  }

  getAllPostsFromJPH(req: Request, res: Response, next: NextFunction) {
    try {
      this.jphService.getAllPosts(res, next);
    } catch (error) {
      next(error)
    }
  }

  getSpecificPost(req: Request, resp: Response, next: NextFunction) {
    try {
        console.log(req.params.postId)
        this.jphService.getPost(req, resp, next)
    } catch (error) {
      next(error);
    }
  }
}
