const { queues } = require('../../config/bull');

const siteDao = require('../../dao/site');
const { scrapeAmazon } = require('../../helpers/scraper');

queues.USER_SCRAPER_MASTER.process(async (_, done) => {
  try {
    // get all urls.
    // get all products.

    const urls = await siteDao.getAllUrls();
    console.log(urls);
    urls.forEach((url) => {
      queues.USER_SCRAPER_CHILD.add({
        url,
      });
    });

    done();
  } catch (ex) {
    console.log(ex);
    done(ex);
  }
});

queues.USER_SCRAPER_CHILD.process(async (job, done) => {
  try {
    // get all urls.
    // get all products.

    console.log(job.data);

    const { url } = job.data;
    const { price } = await scrapeAmazon({
      url,
    });

    console.log(price);

    const product = await siteDao.getProductFromUrl({
      link: url
    });

    console.log(product);

    done();
  } catch (ex) {
    console.log(ex);
    done(ex);
  }
});
