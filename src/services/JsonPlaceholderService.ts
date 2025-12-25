import axios, { HttpStatusCode } from "axios";
import { Request, Response, NextFunction } from "express";
import { JSON_PLACEHOLDER_URL } from "../router/router.utills";

export class JsonPlaceholderService {

  async getAllPosts(res: Response, next: NextFunction) {
    try {
      const posts = await axios.get(`${JSON_PLACEHOLDER_URL}/posts`)

      res.status(200).send(posts.data)
    } catch (err) {
      console.log('Error to get posts', {
        case: {
          message: 'Have no idea what is going on',
          statusCode: HttpStatusCode.NotFound
        }
      })

      next(err)
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    await axios.get(`${JSON_PLACEHOLDER_URL}/posts/${req.params.postId}`)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        next(error);
      });
  }
}
