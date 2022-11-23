exports.success = ({
  res,
  statusCode,
  body,
}) => res.status(statusCode).json({
  ...body,
});

exports.error = ({ res, ex }) => {
  console.log(ex);
  return res.status(ex.statusCode || 500).json({
    message: ex.message,
  });
};
