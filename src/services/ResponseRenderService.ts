import {NextFunction, Request, Response} from 'express'
import path from 'path';
import {MeteorDataProxyService} from './MeteorDataProxyService';
import {PicturesProxyService} from './PicturesProxyService';
import {meteorResponseDataValidator} from '../utils/validators/validators';
import {InvalidResponseBodyException} from '../utils/exceptions/InvalidResponseBodyException';

export class ResponseRenderService {
private readonly meteorProxyService: MeteorDataProxyService;
private readonly pictureProxyService: PicturesProxyService;

constructor() {
  this.meteorProxyService = new MeteorDataProxyService();
  this.pictureProxyService = new PicturesProxyService();
}
  renderHomePage(req: Request, res: Response, next: NextFunction) {
    try {
      res.render(path.resolve(__dirname, '..', '..', '..', 'views', 'start.html'));
    } catch (error) {next(error)
    }
  }

  renderHazardousPage (req: Request, res: Response, next: NextFunction) {
      this.meteorProxyService.getMeteorDataWithQueryParams(req.query)
      .then((responseBody) => {
        let validation = meteorResponseDataValidator(responseBody);
        if (validation.error) {
          throw new InvalidResponseBodyException(500, 'ResponseBody Validation Failed', validation.error.message)
        } else {
          res.render(path.resolve(__dirname, '..', '..', '..',  'views', 'dangerous-meteors.html'), {
            hazardousAmount: responseBody.amount,
            meteors: responseBody.meteors
          })
        }
      }).catch((error) => {
        next(error)
      })
  }

  renderPicturePage (req: Request, res: Response, next: NextFunction) {
      this.pictureProxyService.getLinksToRoverPictures()
        .then((linksArray) => {
          res.render(path.resolve(__dirname, '..', '..', '..', 'views', 'pictures.html'), {linksArray});
        }).catch((error) => {
          next(error)
      } )
  }
}