export class DateUtils {

  getPreviousWeekDates() {
    const MONDAY_OFFSET = 6;
    const FRIDAY_OFFSET = 2;

    const currentDate = new Date();
    const mondayOfPreviousWeek = new Date();
    const fridayOfPreviousWeek = new Date();

    mondayOfPreviousWeek.setDate(currentDate.getDate() - currentDate.getDay() - MONDAY_OFFSET);
    fridayOfPreviousWeek.setDate(currentDate.getDate() - currentDate.getDay() - FRIDAY_OFFSET);

    const formattedMonday = this.formatDate(mondayOfPreviousWeek);
    const formattedFriday = this.formatDate(fridayOfPreviousWeek);

    return {monday: formattedMonday, friday: formattedFriday};
  }

  private formatDate(date: Date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}