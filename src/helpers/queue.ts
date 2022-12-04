import Worker from '../packages/bull'

export const sendMessageToQueue = async ({
  name,
  data,
}: {
  name: string,
  data: any,
}) => {
  const job = await Worker[name].add(data)
  console.log('Job saved with id', job.id)
}
