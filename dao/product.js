const { PrismaClient } = require('@prisma/client');

const {
  userProduct,
} = new PrismaClient();

exports.getUserProducts = ({
  userId,
}) => new Promise(async (resolve, reject) => {
  try {
    const products = await userProduct.findMany({
      where: {
        userId,
      }
    });
    resolve(products);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.getUserProduct = ({
  productId,
}) => new Promise(async (resolve, reject) => {
  try {
    const product = await userProduct.findFirst({
      where: {
        id: productId,
      },
      select: {
        id: true,
        product: true,
      }
    });
    resolve(product);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.deleteUserProduct = ({
  productId,
}) => new Promise(async (resolve, reject) => {
  try {
    await userProduct.delete({
      where: {
        id: productId,
      },
    });
    resolve();
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
