import axios from "axios";
import { NASA_URL, ROVER_PATH } from "../../router/router.utills";
import { nasa_api_key } from "../../config/config";
import { PictureProcessorService } from "./PictureProcessorService";
/**
 * @deprecated
 */
export class PicturesProxyService {
  private readonly pictureProcessor: PictureProcessorService;

  constructor() {
    this.pictureProcessor = new PictureProcessorService();
  }

  async getLinksToRoverPictures() {
    return await axios.get(`${NASA_URL}${ROVER_PATH}`, {
      params: {
        api_key: nasa_api_key,
        sol: 1000,
        page: 1
      }
    }).then((response) => {
      return this.pictureProcessor.getLinksOnPhotos(response.data);
    });
  }
}
