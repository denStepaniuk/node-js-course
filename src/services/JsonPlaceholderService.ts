import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { JSON_PLACEHOLDER_URL } from '../router/router.utills';

export class JsonPlaceholderService {
  async getAllPosts(res: Response, next: NextFunction) {
    await axios.get(`${JSON_PLACEHOLDER_URL}/posts`)
      .then((response) => {
        console.log('Response Data: ')
        console.info(response.data);
        res.status(200).send(response.data);
      }).catch((err) => {
        console.error(err)
        next(err)
      })
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    await axios.get(`${JSON_PLACEHOLDER_URL}/posts/${req.params.postId}`)
      .then((response) => {
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch((error) => {
        next(error);
      })
  }
}
