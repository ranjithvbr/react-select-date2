const currentDate = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * @param {string} renderDate contain a date
 * @param {string} disableState contain a disable-state past || future
 * @returns {string} disable date
 */
export function getDisableDate(renderDate, disableState) {

  let disableRange;
  if (disableState === "past") {
    let subractOneDay;
    subractOneDay = new Date(renderDate);
    subractOneDay.setDate(subractOneDay.getDate() + 1);
    disableRange = subractOneDay < new Date() && "cld_disableDate";
  } else if (disableState === "future") {
    disableRange = renderDate >= new Date() && "cld_disableDate";
  }
  return disableRange;
}

/**
 * @param {string} disableState contain a disable-state past || future
 * @param {string} month contain a month value
 * @param {string} year contain a year value
 * @returns {boolean} for disable arrow
 */
export function getDisableDateForArrow(disableState, month, year) {
  let disableArrow;
  if(disableState === "past"){
    disableArrow = currentDate.getMonth() >= month - 1 && currentDate.getFullYear() >= year ? true : false
  }else if(disableState === "future"){
    disableArrow = currentDate.getMonth() <= month - 1 && currentDate.getFullYear() <= year ? true : false
  }
  return disableArrow;
}

/**
 * @param {string} disableState contain a disable-state past || future
 * @returns {string} disable year
 */
export function getDisableYear(disableState) {
  let disableYear;
  if (disableState === "past") {
    disableYear = {
      startYearOption: currentDate.getFullYear(),
      endYearOption: 2100,
    };
  } else if (disableState === "future") {
    disableYear = {
      startYearOption: 1921,
      endYearOption: currentDate.getFullYear(),
    };
  }
  return disableYear;
}

/**
 * @param {string} date contain date
 * @param {boolean} format contain boolean value
 * @returns {string} returns a formated date
 */
export function formatDay(date, format) {
  if (date) {
    const addZeroToMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const addZeroToDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    if (format) {
      return `${months[Number(addZeroToMonth) - 1]} ${addZeroToDate},${date.getFullYear()}`;
    }
    const dateIdFromCld = `${date.getFullYear()}-${addZeroToMonth}-${addZeroToDate}`;

    return dateIdFromCld;
  }
  return "";
}

/**
 * @param {string} disableState contain a disable-state past || future
 * @returns {object} set the start date and end date in field
 */
export function getDisableDateForField(disableState) {
  let disablefield;
  if (disableState === "past") {
    disablefield = {
      minDate: formatDay(new Date()),
      maxDate: "2100-12-31",
    };
  } else if (disableState === "future") {
    disablefield = {
      minDate: "1921-01-01",
      maxDate: formatDay(new Date()),
    };
  }
  return disablefield;
}

/**
 * @param {string} renderDate contain a date
 * @param {string} disableCertainDate contain a disable-state past || future
 * @returns {string} disable date
 */
 export function getDisableCertainDate(renderDate, disableCertainDate) {
  let disableCerDate;
  disableCertainDate.forEach((dt) => {
    const formatDt = new Date(dt);
    if (
      formatDt.getDate() === renderDate.getDate() &&
      formatDt.getMonth() === renderDate.getMonth() &&
      formatDt.getFullYear() === renderDate.getFullYear()
    ) {
      disableCerDate = "cld_disableDate";
    }
  });
  return disableCerDate;
}

/**
 * 
 */
export function getDisableWhenRange(disableCertainDate, dateTypeId, rangeStartDate, rangeEndDate) {

 let disableCertainDateFormat = []

  disableCertainDate.forEach((dt)=>{
    disableCertainDateFormat.push(formatDay(new Date(dt)))
  })
  let disableWhenRange;
  if((dateTypeId > rangeStartDate && dateTypeId < rangeEndDate) &&  disableCertainDateFormat.includes(formatDay(new Date(dateTypeId)))){
    disableWhenRange = "cld_disablebgColor"
  }else{
    disableWhenRange = ""
  }
  return disableWhenRange;
}
