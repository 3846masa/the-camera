class BinaryStringUtils {
  /**
   * @param {Blob} blob
   * @returns {Promise<string>}
   */
  static async createFromBlob(blob) {
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
      reader.addEventListener('load', resolve, { once: true });
      reader.addEventListener('error', reject, { once: true });
      reader.readAsBinaryString(blob);
    });
    return reader.result;
  }

  /**
   * @param {string} binaryString
   * @param {BlobPropertyBag} [options]
   */
  static convertToBlob(binaryString, options) {
    const length = binaryString.length;
    const buffer = new Uint8Array(length);
    for (let idx = 0; idx < length; idx++) {
      buffer[idx] = binaryString.charCodeAt(idx) & 0xff;
    }
    return new Blob([buffer], options);
  }
}

export default BinaryStringUtils;
