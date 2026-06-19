import ApiError from "../utils/ApiError.js";

export default function notFoundMiddleware(req, res, next) {
  next(new ApiError(`Route not found: ${req.originalUrl}`, 404));
}
