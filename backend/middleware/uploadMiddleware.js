import multer from "multer";
import { compressImage, MAX_COMPRESSED_IMAGE_BYTES } from "../services/imageCompressionService.js";
import ApiError from "../utils/ApiError.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024
  }
});

export async function compressUploadedImage(req, res, next) {
  if (!req.file) return next();

  try {
    if (!req.file.mimetype.startsWith("image/")) {
      if (req.file.size > MAX_COMPRESSED_IMAGE_BYTES) throw new ApiError("Non-image files must be smaller than 5 MB", 400);
      return next();
    }

    const originalSize = req.file.size;
    req.file.buffer = await compressImage(req.file.buffer);
    req.file.size = req.file.buffer.length;
    req.file.mimetype = "image/webp";
    req.file.originalSize = originalSize;
    req.file.originalname = req.file.originalname.replace(/\.[^.]+$/, "") + ".webp";
    return next();
  } catch (error) {
    return next(error);
  }
}
