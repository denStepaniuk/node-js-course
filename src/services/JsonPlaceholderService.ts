import { Request, Response, NextFunction } from "express";
import { JSON_PLACEHOLDER_URL } from "../router/router.utills";

export class JsonPlaceholderService {

  async getAllPosts(res: Response, next: NextFunction) {
    try {
      // const posts = await axios.get(`${JSON_PLACEHOLDER_URL}/posts`)
      const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts`);
      const data = await response.json()
      res.status(200).send(data)
    } catch (err) {
      console.log('Error to get posts', {
        case: {
          message: 'Have no idea what is going on',
          statusCode: 404
        }
      })

      next(err)
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts/${req.params.postId}`);
      const data = await response.json()
      res.status(200).send(data)
    } catch (err) {
      console.log('Error to get post', {
        case: {
          message: 'Have no idea what is going on',
          statusCode: 404
        }
      })

      next(err)
    }
  }
}
