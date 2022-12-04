export const getCreatedAndExpiredDate = (minutes: number) => {
  const createdAt = new Date()
  const expiredAt = new Date(createdAt.getTime() + (minutes * 60 * 1000));
  return {
    createdAt,
    expiredAt,
  }
}
