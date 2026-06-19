import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

export default function validateObjectId(paramName = "id") {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      return next(new ApiError("Invalid resource identifier", 400));
    }

    return next();
  };
}
