import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDisableDateForField, formatDay } from "../cldDisable";
import "./cldDateField.css";

/**
 * @param {*} props all props
 * @returns {React.ReactElement} returns a date-input field
 */
function CldDateField({ disableState, selectType, selectedDateFromCld, selectedDate, disableCertainDate }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errMsgStart, setErrMsgStart] = useState();
  const [errMsgEnd, setErrMsgEnd] = useState();
  const [selectedDateFromField, setSelectedDateFromField] = useState({
    startDateFromField: "",
    endDateFromField: "",
  });
  const [minAndmaxDate, setminAndmaxDate] = useState({
    minDate: "1921-01-01",
    maxDate: "2100-12-31",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrMsgStart("");
      setErrMsgEnd("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errMsgStart, errMsgEnd]);

  useEffect(() => {
    if (disableState === "past" || disableState === "future") {
      setminAndmaxDate(getDisableDateForField(disableState));
    }
  }, [disableState]);

  useEffect(() => {
    if (selectType === "range") {
      const { startDate, endDate } = selectedDateFromCld;
      setStartDate(formatDay(startDate));
      setEndDate(formatDay(endDate));
      setSelectedDateFromField({
        startDateFromField: formatDay(startDate),
        endDateFromField: formatDay(endDate),
      });
    } else {
      const dateFromCld = selectedDateFromCld;
      if (dateFromCld) {
        setStartDate(formatDay(dateFromCld));
      }
    }
  }, [selectType, selectedDateFromCld]);

  /**
   * @param {object} e contain selected start date
   */
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  /**
   * @param {object} e contain selected end date
   */
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  /**
   * @param {string} date contain date
   * @returns {boolean} return boolean
   */
  const handleDisableDateField = (date) => {
    const disableField = disableCertainDate.find((dt) => formatDay(new Date(dt)) === formatDay(new Date(date)));
    console.log(disableField, "handleDisableDateField");

    return disableField;
  };
  /**
   * @param {*} e contain selected start date
   */
  const startSetError = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
    }
    if ((e.code === "Enter" && startDate) || (e._reactName === "onBlur" && startDate)) {
      const { minDate, maxDate } = minAndmaxDate;
      if (new Date(startDate) > new Date(maxDate)) {
        setErrMsgStart(`Date must be ${formatDay(new Date(maxDate), true)} or earlier`);
      } else if (new Date(startDate) < new Date(minDate)) {
        setErrMsgStart(`Date must be ${formatDay(new Date(minDate), true)} or later`);
      } else if (new Date(startDate) >= new Date(endDate)) {
        setErrMsgStart("start Date should be lower than end Date");
        // setStartDate(selectedDateFromField.startDateFromField)
      } else if (handleDisableDateField(startDate)) {
        setErrMsgStart("Date must not be disabled date");
      } else {
        setSelectedDateFromField((prevState) => ({
          ...prevState,
          startDateFromField: startDate,
        }));
        selectedDate({
          startDateFromField: startDate,
          endDateFromField: selectedDateFromField.endDateFromField,
          from: "startDateSelect",
        });
      }
    } else if (e.key === "Enter" && !startDate) {
      setErrMsgStart("Please enter a valid Date");
    }
  };

  /**
   *
   * @param {*} e contain selected end date
   */
  const endSetError = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
    }
    if ((e.code === "Enter" && endDate) || (e._reactName === "onBlur" && endDate)) {
      const { minDate, maxDate } = minAndmaxDate;
      if (new Date(endDate) > new Date(maxDate)) {
        setErrMsgEnd(`Date must be ${formatDay(new Date(maxDate), true)} or earlier`);
      } else if (new Date(endDate) < new Date(minDate)) {
        setErrMsgEnd(`Date must be ${formatDay(new Date(minDate), true)} or later`);
      } else if (new Date(startDate) >= new Date(endDate)) {
        setErrMsgEnd("End Date should be smaller than start Date");
        // setEndDate(selectedDateFromField.endDateFromField)
      } else if (!startDate) {
        setStartDate(endDate);
        setEndDate("");
        setSelectedDateFromField((prevState) => ({
          ...prevState,
          startDateFromField: endDate,
        }));
        selectedDate({
          startDateFromField: endDate,
          endDateFromField: selectedDateFromField.endDateFromField,
          from: "startDateSelect",
        });
      } else if (handleDisableDateField(endDate)) {
        setErrMsgEnd("Date must not be disabled date");
      } else {
        setSelectedDateFromField({
          startDateFromField: selectedDateFromField.startDateFromField,
          endDateFromField: endDate,
        });

        selectedDate({
          startDateFromField: selectedDateFromField.startDateFromField,
          endDateFromField: endDate,
          from: "endDateSelect",
        });
      }
    } else if (e.key === "Enter" && !endDate) {
      setErrMsgEnd("Please enter a valid Date");
    }
  };

  // console.log(startDate, endDate,selectedDateFromField, minAndmaxDate, "selectedDateFromField");

  return (
    <>
      <div className={`${selectType === "range" ? "cld_fieldContainer" : "cld_startDateFieldOnly"}`}>
        <div>
          <input
            type="date"
            id="start_Cld_Field"
            value={startDate}
            onChange={(e) => handleStartDate(e)}
            onKeyDown={(e) => startSetError(e)}
            onBlur={startSetError}
            min={minAndmaxDate.minDate}
            max={minAndmaxDate.maxDate}
          />
        </div>
        {selectType === "range" && (
          <div>
            <input
              type="date"
              id="end_Cld_Field"
              value={endDate}
              onChange={(e) => handleEndDate(e)}
              onKeyDown={(e) => endSetError(e)}
              onBlur={endSetError}
              min={minAndmaxDate.minDate}
              max={minAndmaxDate.maxDate}
            />
          </div>
        )}
      </div>
      <div className={`${selectType === "range" ? "cld_errmsgContainer" : "cld_startaerrmsg"}`}>
        <div className={`cld_errmsg ${errMsgStart && "hidecld_errmsg"}`}>{errMsgStart}</div>
        {selectType === "range" && <div className={`cld_errmsg ${errMsgEnd && "hidecld_errmsg"}`}>{errMsgEnd}</div>}
      </div>
    </>
  );
}

CldDateField.propTypes = {
  disableState: PropTypes.string,
  selectType: PropTypes.string.isRequired,
  selectedDateFromCld: PropTypes.object.isRequired,
  selectedDate: PropTypes.func.isRequired,
  disableCertainDate: PropTypes.array,
};

CldDateField.defaultProps = {
  disableState: "",
  disableCertainDate: [],
};

export default CldDateField;