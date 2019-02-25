import * as Comlink from 'comlinkjs';
import jsQR from 'jsqr';

class BarcodeDetectorPolyfill {
  async detect(imageData) {
    const result = jsQR(imageData.data, imageData.width, imageData.height);
    if (!result) {
      return [];
    }

    const loc = result.location;
    const detected = {
      rawValue: result.data,
      format: 'qr_code',
      boundingBox: {
        x: loc.topLeftCorner.x,
        y: loc.topLeftCorner.y,
        top: loc.topLeftCorner.x,
        left: loc.topLeftCorner.y,
        right: loc.bottomRightCorner.y,
        bottom: loc.bottomRightCorner.x,
        width: loc.bottomRightCorner.x - loc.topLeftCorner.x,
        height: loc.bottomRightCorner.y - loc.topLeftCorner.y,
      },
      cornerPoints: [
        loc.topLeftCorner,
        loc.topRightCorner,
        loc.bottomRightCorner,
        loc.bottomLeftCorner,
      ],
    };

    return [detected];
  }
}

self.BarcodeDetector = self.BarcodeDetector || BarcodeDetectorPolyfill;

Comlink.expose(self.BarcodeDetector, self);
