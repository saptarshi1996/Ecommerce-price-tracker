const siteDao = require('../dao/site');

exports.getSite = async (_, res) => {
  try {
    const sites = await siteDao.getSites();
    res.status(200).json(sites);
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    });
  }
};
