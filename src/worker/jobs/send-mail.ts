import Worker from '../../packages/bull'

Worker['SendMail'].process(async (job: any, done: any) => {
  try {
    console.log(job.data)
    done()
  } catch (ex) {
    done(ex)
  }
})
