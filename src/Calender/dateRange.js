/**
 * @param {object} date contain date
 * @param {number} addupDay to plus one date
 * @returns {string} returns date
 */
const addDays = (date, addupDay = 1) => {
  const result = new Date(date);
  result.setDate(result.getDate() + addupDay);
  return result;
};

/**
 * @param {object} start contain startdate
 * @param {object} end contain enddate
 * @param {object} range contain the date
 * @returns {string} returns dateRange
 */
const dateRange = (start, end, range = []) => {
  if (start > end) return range;
  const next = addDays(start, 1);
  return dateRange(next, end, [...range, start]);
};

export { dateRange as DateRange };
