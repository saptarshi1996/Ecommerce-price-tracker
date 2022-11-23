const { PrismaClient } = require('@prisma/client');

const {
  link: Link,
  userProduct: UserProduct,
} = new PrismaClient();

exports.createLink = ({
  data,
}) => new Promise(async (resolve, reject) => {
  try {
    const linkCreated = await Link.create({
      data,
    });

    resolve(linkCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.listUserProduct = ({
  where,
  select,
}) => new Promise(async (resolve, reject) => {
  try {
    const productList = await UserProduct.findMany({
      where,
      select,
    });

    resolve(productList);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.getUserProduct = ({
  where,
  select,
}) => new Promise(async (resolve, reject) => {
  try {
    const product = await UserProduct.findFirst({
      where,
      select,
    });

    resolve(product);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.deleteUserProduct = ({
  where,
}) => new Promise(async (resolve, reject) => {
  try {
    const deletedProduct = await UserProduct.delete({
      where,
    });

    resolve(deletedProduct);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
