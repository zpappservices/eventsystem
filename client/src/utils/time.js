import moment from "moment";

function convertTo12HourFormat(time24) {
  if (!time24) return;
  // Split the time into hours and minutes
  const [hours24, minutes] = time24?.split(":").map(Number);

  // Determine AM or PM
  const period = hours24 >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours24 % 12 || 12; // 0 should be converted to 12

  // Return formatted time
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

const formatDate = (date) => {
  // Check if the date exists and is valid
  if (!date || !moment(date, moment.ISO_8601, true).isValid()) {
    return "Invalid date";
  }

  // Format the valid date
  const stringDate = moment(date).format("dddd, MMMM Do YYYY");
  return stringDate;
};

export { convertTo12HourFormat, formatDate };
