import cloudinary from "../config/cloudinary.js";

function uploadBuffer(fileBuffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => error ? reject(error) : resolve(result));
    stream.end(fileBuffer);
  });
}

export function uploadImage(fileBuffer, options = {}) { return uploadBuffer(fileBuffer, { resource_type: "image", ...options }); }
export function uploadRawFile(fileBuffer, options = {}) { return uploadBuffer(fileBuffer, { resource_type: "raw", ...options }); }
export function deleteImage(publicId, resourceType = "image") { return cloudinary.uploader.destroy(publicId, { resource_type: resourceType }); }
