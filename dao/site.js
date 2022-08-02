const { PrismaClient } = require('@prisma/client');

const {
  site,
  product,
  url,
} = new PrismaClient();

exports.getSites = () => new Promise(async (resolve, reject) => {
  try {
    const sites = await site.findMany({
      select: {
        id: true,
        name: true,
      }
    });

    resolve(sites);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.saveUrl = ({
  link
}) => new Promise(async (resolve, reject) => {
  try {
    const urlCreated = await url.create({
      data: {
        link
      },
    });
    resolve(urlCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.saveProduct = (data) => new Promise(async (resolve, reject) => {
  try {
    const productCreated = await product.create({
      data,
    });
    resolve(productCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
