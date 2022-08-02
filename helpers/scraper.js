const { default: axios } = require('axios');
const cheerio = require('cheerio');

exports.scrapeAmazon = ({
  url,
}) => new Promise(async (resolve, reject) => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const name = $('#productTitle').text().trim(' ');
    const image = $('#imgTagWrapperId').find('img').attr('src');
    const price = $('.a-price-whole').first().text().replace(/\,/g, '')
      .replace(/\./, '');

    resolve({
      name,
      image,
      price,
    });
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
