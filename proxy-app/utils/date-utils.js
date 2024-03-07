const getPreviousWeekDates = () => {
  const currentDate = new Date();

  const mondayOfPreviousWeek = new Date(currentDate);
  mondayOfPreviousWeek.setDate(currentDate.getDate() - currentDate.getDay() - 6);

  const fridayOfPreviousWeek = new Date(currentDate);
  fridayOfPreviousWeek.setDate(currentDate.getDate() - currentDate.getDay() - 2);

  const formattedMonday = formatDate(mondayOfPreviousWeek);
  const formattedFriday = formatDate(fridayOfPreviousWeek);

  return { monday: formattedMonday, friday: formattedFriday };
}

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

module.exports = {
  getPreviousWeekDates
}