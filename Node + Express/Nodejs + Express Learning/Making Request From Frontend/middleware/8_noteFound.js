const notFound = (req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  return next(error);
};

export default notFound;