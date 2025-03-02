import moment from "moment";

function convertTo12HourFormat(time24) {
  if (typeof time24 !== "string" || !time24.includes(":"))
    return "Invalid time";

  // Split the time into hours and minutes
  const [hours24, minutes] = time24.split(":").map(Number);

  if (isNaN(hours24) || isNaN(minutes)) return "Invalid time";

  // Determine AM or PM
  const period = hours24 >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours24 % 12 || 12; // 0 should be converted to 12

  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

const formatDate = (date) => {
  if (!date || !moment(date, moment.ISO_8601, true).isValid()) {
    return "Invalid date";
  }

  return moment(date).format("MMM D, YYYY");
};

export { convertTo12HourFormat, formatDate };
