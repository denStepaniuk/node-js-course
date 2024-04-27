export class PictureProcessorService {

  getLinksOnPhotos(responseData: any) {
    let counter = 0;
    const toReturn = [];

    for (let i = counter; i < 6; i++) {
      toReturn[i] = responseData.photos[i].img_src;
      counter++;
    }

    return toReturn;
  }
}

