export default function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const response = {
    success: false,
    message: error.message || "Server error"
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
}
