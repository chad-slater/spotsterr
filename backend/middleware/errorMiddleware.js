const errorHandler = (err, req, res, next) => {
  const refreshToken = req.cookies.spotifyRefreshToken;
  const statusCode = err.statusCode ? err.statusCode : 500;

  if (refreshToken && statusCode === 401) {
    res.redirect("/api/spotify/refresh");
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = {
  errorHandler,
};
