import schedule from 'node-schedule'

import * as userDao from '../../dao/user'

export default schedule.scheduleJob('* * * * *', async () => {

  const expiredVerification = await userDao.updateUserVerification({
    data: {
      is_expired: true,
    },
    where: {
      is_expired: false,
      created_at: {
        lt: new Date()
      }
    }
  }, true)

  console.log('Expired tokens revoked', JSON.stringify(expiredVerification))

})
