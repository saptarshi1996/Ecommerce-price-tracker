const { PrismaClient } = require('@prisma/client');

const { site } = new PrismaClient();

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
