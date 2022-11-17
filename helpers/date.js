exports.setCreateAndExpireTime = () => {
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 5 * 60000);

  return {
    createdAt,
    expiresAt,
  };
};
