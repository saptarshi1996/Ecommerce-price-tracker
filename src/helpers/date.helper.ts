export const addMinutes = ({
  date,
  minute
}: {
  date: Date
  minute: number
}) => new Date(date.getTime() + minute * 60000)
