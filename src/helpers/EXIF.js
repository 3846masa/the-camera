import piexif from 'piexifjs';
import dayjs from 'dayjs';

import BinaryStringUtils from '~/helpers/BinaryStringUtils';

const { degToDmsRational } = piexif.GPSHelper;

class EXIF {
  /**
   * @typedef EXIFOptions
   * @property {number} width
   * @property {number} height
   * @property {number} [longitude]
   * @property {number} [latitude]
   * @property {number} [orientation]
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
        [piexif.ImageIFD.Orientation]: options.orientation,
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

    if (options.latitude != null && options.longitude != null) {
      const utc = now.subtract(now.utcOffset(), 'minutes');

      Object.assign(exifObj, {
        GPS: {
          [piexif.GPSIFD.GPSVersionID]: [2, 3, 0, 0],
          [piexif.GPSIFD.GPSLatitudeRef]: options.latitude > 0 ? 'N' : 'S',
          [piexif.GPSIFD.GPSLatitude]: degToDmsRational(
            Math.abs(options.latitude),
          ),
          [piexif.GPSIFD.GPSLongitudeRef]: options.longitude > 0 ? 'E' : 'W',
          [piexif.GPSIFD.GPSLongitude]: degToDmsRational(
            Math.abs(options.longitude),
          ),
          [piexif.GPSIFD.GPSTimeStamp]: [
            [utc.hour(), 1],
            [utc.minute(), 1],
            [utc.second() * 1000 + utc.millisecond(), 1000],
          ],
          [piexif.GPSIFD.GPSDateStamp]: utc.format('YYYY:MM:DD'),
        },
      });
    }

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
