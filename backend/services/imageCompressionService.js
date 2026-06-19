import sharp from "sharp";
import ApiError from "../utils/ApiError.js";

export const MAX_COMPRESSED_IMAGE_BYTES = 5 * 1024 * 1024;

const qualitySteps = [82, 72, 62, 52, 42, 32];
const dimensionSteps = [3000, 2400, 2000, 1600, 1200];

export async function compressImage(buffer) {
  let lastResult;

  try {
    for (const dimension of dimensionSteps) {
      for (const quality of qualitySteps) {
        lastResult = await sharp(buffer, { limitInputPixels: 100_000_000 })
          .rotate()
          .resize({ width: dimension, height: dimension, fit: "inside", withoutEnlargement: true })
          .webp({ quality, effort: 5, smartSubsample: true })
          .toBuffer();

        if (lastResult.length < MAX_COMPRESSED_IMAGE_BYTES) return lastResult;
      }
    }
  } catch (error) {
    throw new ApiError(`The selected image could not be processed: ${error.message}`, 400);
  }

  throw new ApiError("The image could not be compressed below 5 MB. Please choose a smaller image.", 400);
}
