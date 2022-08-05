require('dotenv').config();

const Queue = require('bull');

const {
  REDIS_HOST,
  REDIS_PORT,
} = process.env;

const queueList = [
  'SCRAPER_AMAZON',
  'USER_SCRAPER_CHILD',
  'USER_SCRAPER_MASTER',
];

const queues = {};
queueList.forEach((queue) => {
  queues[queue] = new Queue(queue, {
    redis: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: '',
    },
  });
});

module.exports = {
  queues,
};
