import piexif from 'piexifjs';
import dayjs from 'dayjs';

import BinaryStringUtils from '~/helpers/BinaryStringUtils';

class EXIF {
  /**
   * @typedef EXIFOptions
   * @property {number} width
   * @property {number} height
   */

  /**
   * @param {EXIFOptions} options
   * @param {*} [exifObj]
   */
  constructor(options, exifObj) {
    this.exifObj = exifObj || EXIF.generateEXIFObject(options);
  }

  /** @param {EXIFOptions} options */
  static generateEXIFObject(options) {
    const now = dayjs();
    const dateTimeString = now.format('YYYY:MM:DD HH:mm:ss');

    const exifObj = {
      '0th': {
        [piexif.ImageIFD.XResolution]: [72, 1],
        [piexif.ImageIFD.YResolution]: [72, 1],
        [piexif.ImageIFD.ResolutionUnit]: 2,
        [piexif.ImageIFD.YCbCrPositioning]: 1,
        [piexif.ImageIFD.DateTime]: dateTimeString,
      },
      Exif: {
        [piexif.ExifIFD.ExifVersion]: '0230',
        [piexif.ExifIFD.DateTimeOriginal]: dateTimeString,
        [piexif.ExifIFD.DateTimeDigitized]: dateTimeString,
        [piexif.ExifIFD.ComponentsConfiguration]: '\x01\x02\x03\x00',
        [piexif.ExifIFD.FlashpixVersion]: '0100',
        [piexif.ExifIFD.ColorSpace]: 1,
        [piexif.ExifIFD.PixelXDimension]: options.width,
        [piexif.ExifIFD.PixelYDimension]: options.height,
      },
    };

    return exifObj;
  }

  /** @param {Blob} blob */
  static async extractFrom(blob) {
    const exifObj = piexif.load(await BinaryStringUtils.createFromBlob(blob));
    return new EXIF(null, exifObj);
  }

  /** @param {Blob} blob */
  async insertTo(blob) {
    const inserted = piexif.insert(
      piexif.dump(this.exifObj),
      await BinaryStringUtils.createFromBlob(blob),
    );
    return BinaryStringUtils.convertToBlob(inserted, { type: blob.type });
  }
}

export default EXIF;
