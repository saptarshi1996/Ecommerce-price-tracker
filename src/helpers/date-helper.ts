export class DateHelper { 

  addMinutesToCurrentDate(minutes: number): Date {
    const newDate: Date = new Date();
    newDate.setMinutes(new Date().getMinutes()+minutes);
    return newDate;
  }

}
