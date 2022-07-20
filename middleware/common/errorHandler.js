const notfoundHandler = (req, res) => {
  try {
    req.render(`common/notfound`, {
      title: "page not found",
      message: `404 page is not found`,
    });
  } catch (error) {
    res.render(`common/error`, { title: `Error Occurred`, error });
  }
};

const errorHandler = (error, req, res, next) => {
  try {
    if (res.headerSent) {
      next(error);
    }
  } catch (error) {
    res.render(`common/error`, { title: `Error Occurred`, error });
  }
};

module.exports = {
  notfoundHandler,
  errorHandler,
};
