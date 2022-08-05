const { PrismaClient } = require('@prisma/client');

const {
  url,
  site,
  product,
  userProduct,
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

exports.getAllUrls = () => new Promise(async (resolve, reject) => {
  try {
    const urlList = await url.findMany({
      select: {
        link: true,
      }
    });

    resolve(urlList.map((li) => li.link));
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

exports.createUserProduct = (data) => new Promise(async (resolve, reject) => {
  try {
    await userProduct.create({
      data,
    });
    resolve();
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.getProductFromUrl = ({
  link,
}) => new Promise(async (resolve, reject) => {
  try {
    const productList = await product.findMany({
      where: {
        url: {
          link,
        },
      },
      select: {
        lowestPrice: true,
        currentPrice: true,
        id: true,
      }
    });
    resolve(productList);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
