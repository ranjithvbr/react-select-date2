import React from "react";
import PropTypes from "prop-types";
import "./cldSelectField.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentDate = new Date();

/**
 * @param {*} props all props
 * @returns {object} returns a select field(Month)
 */
export function SelectMonthField({ disableState, dynMonth, dynYear, handleChangeSelect, showMonthArrow }) {
  /**
   * @param {number} index contain id
   * @returns {boolean} returns a boolean value
   */
  const disableMonthFunc = (index) => {
    let disableMon;
    if (disableState === "past") {
      disableMon = currentDate.getFullYear() === dynYear && currentDate.getMonth() > index;
    } else if (disableState === "future") {
      disableMon = currentDate.getFullYear() === dynYear && currentDate.getMonth() < index;
    } else {
      disableMon = false;
    }
    return disableMon;
  };

  return (
    <select
      disabled={showMonthArrow}
      className={`${showMonthArrow && "cld_disableArrow"}`}
      id="selectMonth"
      value={dynMonth - 1}
      onChange={(e) => handleChangeSelect(e)}
    >
      {months.map((data, index) => {
        return (
          <option disabled={disableMonthFunc(index)} key={data} value={index}>
            {data}
          </option>
        );
      })}
    </select>
  );
}

SelectMonthField.propTypes = {
  disableState: PropTypes.array,
  dynMonth: PropTypes.number.isRequired,
  dynYear: PropTypes.number.isRequired,
  handleChangeSelect: PropTypes.func.isRequired,
  showMonthArrow: PropTypes.bool.isRequired,
};

SelectMonthField.defaultProps = {
  disableState: [],
};

/**
 * @param {*} props all props
 * @returns {object} returns a select field(Month)
 */
export function SelectYearField({ dynYear, startAndendYearOptions, handleChangeSelect, showYearArrow }) {
  /**
   *
   * @returns {Array} returns no. of year values
   */
  const yearOptions = () => {
    const yearoption = [];
    const { startYearOption, endYearOption } = startAndendYearOptions;
    for (let n = startYearOption; n <= endYearOption; n += 1) {
      yearoption.push(n);
    }
    return yearoption;
  };
  return (
    <select
      disabled={showYearArrow}
      className={`${showYearArrow && "cld_disableArrow"}`}
      id="selectYear"
      value={dynYear}
      onChange={(e) => handleChangeSelect(e)}
    >
      {yearOptions().map((data) => {
        return (
          <option key={data} value={data}>
            {data}
          </option>
        );
      })}
    </select>
  );
}

SelectYearField.propTypes = {
  dynYear: PropTypes.number.isRequired,
  startAndendYearOptions: PropTypes.object.isRequired,
  handleChangeSelect: PropTypes.func.isRequired,
  showYearArrow: PropTypes.bool.isRequired,
};
