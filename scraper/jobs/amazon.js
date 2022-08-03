const { queues } = require('../../config/bull');

const siteDao = require('../../dao/site');
const { scrapeAmazon } = require('../../helpers/scraper');

queues.SCRAPER_AMAZON.process(async (job, done) => {
  try {
    const { url, userId, siteId } = job.data;
    const {
      name,
      image,
      price,
    } = await scrapeAmazon({
      url,
    });

    const urlCreated = await siteDao.saveUrl({ link: url });
    const productCreated = await siteDao.saveProduct({
      name,
      currentPrice: +price,
      lowestPrice: +price,
      siteId,
      urlId: urlCreated.id,
      image,
    });

    await siteDao.createUserProduct({
      userId,
      productId: productCreated.id,
    });

    done();
  } catch (ex) {
    console.log(ex);
    done(ex);
  }
});
