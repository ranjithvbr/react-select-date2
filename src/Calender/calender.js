import React, { useEffect, useState, useCallback, useMemo } from "react";
import CldDateField from "../Fields/cldDateField";
import {
  getDisableDate,
  getDisableDateForArrow,
  getDisableYear,
  getDisableCertainDate,
  getDisableWhenRange,
} from "../cldDisable";
import { SelectMonthField, SelectYearField } from "../Fields/cldSelectField";
import "./calender.css";

const currentdate = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 *@returns {React.ReactElement} returns a calender with single, multiple and range options
 */
function CustomCalender() {
  const findDaysInMonth = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0).getDate();
  const findStartDayInMonth = new Date(currentdate.getFullYear(), currentdate.getMonth(), 1).getDay();
  const disableState = "";
  // const disableCertainDate = useMemo(() => {
  //   return ["2021-06-04", "2021-06-07", "2021-06-8", "2021-06-15", "2021-06-21"];
  // }, []);
  const disableCertainDate = useMemo(() => {
    return [];
  }, []);
  const [selectType] = useState("range");
  const [getDate, setGetDate] = useState(findDaysInMonth);
  const [getStartDay, setGetStartDay] = useState(findStartDayInMonth);
  const [calenderDates, setCalenderDates] = useState();
  const [dynMonth, setDynMonth] = useState(currentdate.getMonth() + 1);
  const [dynYear, setDynYear] = useState(currentdate.getFullYear());
  const [baseId, setBaseId] = useState([]);
  const [rangeId, setRangeId] = useState([]);
  const [inRange, setInRange] = useState();
  const [disableArrow, setDisableArrow] = useState();
  const [startDate, setStartDate] = useState("");
  const [multipleDate, setMultipleDate] = useState("");
  const [startAndendDate, setStartAndendDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [startAndendYearOptions, setstartAndendYearOptions] = useState({
    startYearOption: 1921,
    endYearOption: 2100,
  });

  const handleDisableArrow = useCallback(() => {
    setDisableArrow(getDisableDateForArrow(disableState, dynMonth, dynYear));
  }, [dynMonth, dynYear]);

  useEffect(() => {
    handleDisableArrow();
  }, [handleDisableArrow]);

  useEffect(() => {
    if (disableState === "past" || disableState === "future") {
      setstartAndendYearOptions(getDisableYear(disableState));
    }
  }, []);

  const rangeCalculater = useCallback(
    (id) => {
      const idDate = new Date(id);
      if (rangeId.length === 0) {
        const convertID = `${idDate.getDate()}${idDate.getMonth() + 1}${idDate.getFullYear()}`;
        setRangeId([convertID]);
        setStartAndendDate((prevState) => ({
          ...prevState,
          startDate: idDate,
        }));
        setInRange();
      } else if (rangeId.length === 1) {
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

        let getStartDate;
        let getEndDate;
        const findGreater = new Date(startAndendDate.startDate) < idDate;
        if (findGreater) {
          getStartDate = startAndendDate.startDate;
          getEndDate = idDate;
        } else {
          getStartDate = idDate;
          getEndDate = startAndendDate.startDate;
        }

        const range = dateRange(new Date(getStartDate), new Date(getEndDate));
        const allRangeDate = range.map((date) => `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`);

        setRangeId(allRangeDate);
        setInRange();
        if (findGreater) {
          setStartAndendDate({
            startDate: startAndendDate.startDate,
            endDate: idDate,
          });
        } else {
          setStartAndendDate({
            startDate: idDate,
            endDate: startAndendDate.startDate,
          });
        }
      } else {
        const convertID = `${idDate.getDate()}${idDate.getMonth() + 1}${idDate.getFullYear()}`;
        setRangeId([convertID]);
        setStartAndendDate({
          startDate: idDate,
        });
      }
    },
    [rangeId, startAndendDate],
  );

  const highLight = useCallback(
    (id, actualDateId) => {
      switch (selectType) {
        case "single":
          setBaseId([id]);
          setStartDate(new Date(actualDateId));
          break;
        case "multiple":
          if (!baseId.includes(id)) {
            setBaseId((oldArray) => [...oldArray, id]);
            setMultipleDate((oldArray) => [...oldArray, new Date(actualDateId)]);
          } else {
            const findedId = baseId.findIndex((li) => li === id);
            const removedSelect = baseId.filter((_i, index) => findedId !== index);
            const removedActualDateId = multipleDate.filter((_i, index) => findedId !== index);
            setBaseId(removedSelect);
            setMultipleDate(removedActualDateId);
          }
          break;
        case "range":
          rangeCalculater(id);
          break;
        default:
      }
    },
    [baseId, multipleDate, rangeCalculater, selectType],
  );
  /**
   * @param {object} event mouseHover data-info
   */
  const handleMouseEnter = (event) => {
    setInRange(event.target.dataset.info);
  };

  const handleRenderDate = useCallback(() => {
    const noOfDate = [];
    for (let i = 1; i <= getDate + getStartDay; i += 1) {
      if (i <= getStartDay) {
        noOfDate.push(<td />);
      } else {
        const dateId = `${i - getStartDay}${dynMonth}${dynYear}`;
        const dateTypeId = `${dynYear}-${dynMonth}-${i - getStartDay}`;
        // range classname for start,between and end
        let rangeHightLight;
        if (rangeId[0] === dateId) {
          rangeHightLight = "cld_highlightFirstNum";
        } else if (rangeId[rangeId.length - 1] === dateId) {
          rangeHightLight = "cld_highlightLastNum";
        } else if (rangeId.includes(dateId)) {
          rangeHightLight = "cld_highlightNum";
        }
        // firstOrder change className
        const rangeStartDate = startAndendDate.startDate && startAndendDate.startDate;
        const rangeEndDate = startAndendDate.endDate && startAndendDate.endDate;
        if (rangeId.length === 1 && rangeStartDate.getDate() > Number(inRange)) {
          rangeHightLight = rangeId[0] === dateId && "cld_highlightLastNum";
        }
        // classname for range, single and multiple
        const highLightNum = `${
          selectType === "range" ? `${rangeHightLight || ""}` : baseId.includes(dateId) && "cld_highlightNumCircle"
        }`;
        // startDate and endDate between ranges
        let inRangeCondition;
        if (rangeId.length === 1) {
          if (dynYear === rangeStartDate.getFullYear() && dynMonth === rangeStartDate.getMonth() + 1) {
            inRangeCondition =
              (Number(inRange) >= i - getStartDay &&
                rangeStartDate.getDate() < i - getStartDay &&
                "cld_inrange cld_inrangeLastIndex") ||
              (Number(inRange) <= i - getStartDay &&
                rangeStartDate.getDate() > i - getStartDay &&
                "cld_inrange cld_inrangeFirstIndex");
          } else if (rangeStartDate < new Date(`${dynYear}-${dynMonth}-${Number(inRange)}`)) {
            inRangeCondition = Number(inRange) >= i - getStartDay && "cld_inrange cld_inrangeLastIndex";
          } else {
            inRangeCondition = Number(inRange) <= i - getStartDay && "cld_inrange cld_inrangeFirstIndex";
          }
        }
        // disableDate
        const disableDate = disableState ? getDisableDate(new Date(dateTypeId), disableState) : "";

        const showDisableWhenRange =
          rangeId.length > 1 &&
          getDisableWhenRange(disableCertainDate, new Date(dateTypeId), rangeStartDate, rangeEndDate);

        const disableSpecificDate =
          disableCertainDate.length > 0 ? getDisableCertainDate(new Date(dateTypeId), disableCertainDate) : "";

        // wrappe all classname
        const cssClassname =
          disableDate ||
          disableSpecificDate ||
          `${highLightNum} ${selectType !== "range" ? "cld_cellSingleMultiple" : ""} ${
            rangeId.length !== 1 && "cld_cellactive"
          } ${inRangeCondition || ""}`;

        noOfDate.push(
          <td
            onMouseEnter={(!disableDate || !disableSpecificDate) && rangeId.length === 1 ? handleMouseEnter : null}
            data-info={i - getStartDay}
            onClick={
              disableDate || disableSpecificDate
                ? null
                : () => highLight(selectType === "range" ? dateTypeId : dateId, dateTypeId)
            }
            aria-hidden="true"
          >
            <div data-info={i - getStartDay} className={`cld_cellHover ${showDisableWhenRange} ${cssClassname.trim()}`}>
              {i - getStartDay}
            </div>
          </td>,
        );
      }
    }

    const trDate = [];
    for (let j = 0; j < noOfDate.length; j += 1) {
      let count = 0 + j;
      if (j % 7 === 0) {
        trDate.push(
          <tr key={count}>
            {noOfDate[count + 0] || <td key={count + 0} />}
            {noOfDate[count + 1] || <td key={count + 1} />}
            {noOfDate[count + 2] || <td key={count + 2} />}
            {noOfDate[count + 3] || <td key={count + 3} />}
            {noOfDate[count + 4] || <td key={count + 4} />}
            {noOfDate[count + 5] || <td key={count + 5} />}
            {noOfDate[count + 6] || <td key={count + 6} />}
          </tr>,
        );
        count += 1;
      }
    }
    setCalenderDates(trDate);
  }, [
    baseId,
    disableCertainDate,
    dynMonth,
    dynYear,
    getDate,
    getStartDay,
    highLight,
    inRange,
    rangeId,
    selectType,
    startAndendDate,
  ]);

  useEffect(() => {
    handleRenderDate();
  }, [handleRenderDate, dynMonth, dynYear, baseId, rangeId, inRange]);

  /**
   * Action type for decrease the month and year
   */
  const handleLeft = () => {
    handleDisableArrow();
    setGetDate(new Date(dynYear, dynMonth - 1, 0).getDate());
    setGetStartDay(new Date(dynYear, dynMonth - 2, 1).getDay());
    if (dynMonth === 1) {
      setDynYear(dynYear - 1);
      setDynMonth(12);
    } else {
      setDynMonth(dynMonth - 1);
    }
  };

  /**
   * Action type for increase the month and year
   */
  const handleRight = () => {
    handleDisableArrow();
    setGetDate(new Date(dynYear, dynMonth + 1, 0).getDate());
    setGetStartDay(new Date(dynYear, dynMonth, 1).getDay());
    if (dynMonth === 12) {
      setDynYear(dynYear + 1);
      setDynMonth(1);
    } else {
      setDynMonth(dynMonth + 1);
    }
  };

  /**
   * Action type for select the specific month
   *
   * @param {object} e contain selected option value
   */
  const handleSelectMonth = (e) => {
    setDynMonth(Number(e.target.value) + 1);
    setGetDate(new Date(dynYear, Number(e.target.value) + 1, 0).getDate());
    setGetStartDay(new Date(dynYear, Number(e.target.value), 1).getDay());
  };

  /**
   * Action type for select the specific year
   *
   * @param {object} e contain selected option value
   */
  const handleSelectYear = (e) => {
    setDynYear(Number(e.target.value));
    setGetDate(new Date(e.target.value, dynMonth, 0).getDate());
    setGetStartDay(new Date(e.target.value, dynMonth - 1, 1).getDay());
  };

  /**
   * Action type for select the specific year
   *
   * @param {object} id contain selected date
   */
  const rangeCalculaterFromField = (id) => {
    if (id.startDateFromField && id.endDateFromField) {
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

      const getStartDate = id.startDateFromField;
      const getEndDate = id.endDateFromField;

      const range = dateRange(new Date(getStartDate), new Date(getEndDate));
      const allRangeDate = range.map((date) => `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`);

      setRangeId(allRangeDate);
      setStartAndendDate({
        startDate: new Date(id.startDateFromField),
        endDate: new Date(id.endDateFromField),
      });
    } else {
      const idDate = new Date(id.startDateFromField || id.endDateFromField);
      const convertID = `${idDate.getDate()}${idDate.getMonth() + 1}${idDate.getFullYear()}`;
      setRangeId([convertID]);
      setStartAndendDate((prevState) => ({
        ...prevState,
        startDate: new Date(id.startDateFromField) || new Date(id.endDateFromField),
      }));
    }

    if (id.from) {
      const refreshDate =
        id.from === "startDateSelect" ? new Date(id.startDateFromField) : new Date(id.endDateFromField);
      setDynMonth(refreshDate.getMonth() + 1);
      setGetDate(new Date(refreshDate.getFullYear(), refreshDate.getMonth() + 1, 0).getDate());
      setGetStartDay(new Date(refreshDate.getFullYear(), refreshDate.getMonth(), 1).getDay());
      setDynYear(refreshDate.getFullYear());
    }
  };

  /**
   * Return the selected date range from date-input field
   *
   * @param {object} da contain selected option value
   */
  const setFieldValue = (da) => {
    if (selectType !== "range") {
      const selDt = new Date(da.startDateFromField);
      const fieldFindDaysInMonth = new Date(selDt.getFullYear(), selDt.getMonth() + 1, 0).getDate();
      const fieldFindStartDayInMonth = new Date(selDt.getFullYear(), selDt.getMonth(), 1).getDay();
      const dateIdFromFiled = `${selDt.getDate()}${selDt.getMonth() + 1}${selDt.getFullYear()}`;

      setDynYear(selDt.getFullYear());
      setDynMonth(selDt.getMonth() + 1);
      setGetDate(fieldFindDaysInMonth);
      setGetStartDay(fieldFindStartDayInMonth);

      switch (selectType) {
        case "single":
          setBaseId([dateIdFromFiled]);
          break;
        case "multiple":
          if (!baseId.includes(dateIdFromFiled)) {
            setBaseId((oldArray) => [...oldArray, dateIdFromFiled]);
          }
          break;
        default:
      }
    } else {
      rangeCalculaterFromField(da);
    }
  };

  /**
   *@returns {string} seletedDate from calender single || multiple || range
   */
  const selectedDateFromCldFunc = () => {
    let selDate;
    if (selectType === "single") {
      selDate = startDate;
    } else if (selectType === "multiple") {
      selDate = multipleDate[multipleDate.length - 1];
    } else {
      selDate = startAndendDate;
    }
    return selDate;
  };

  // console.log(startDate, multipleDate, startAndendDate, rangeId, dynYear, dynMonth, "actualDate");
  return (
    <div className="cld_container">
      <div>
        <CldDateField
          selectedDate={(da) => setFieldValue(da)}
          selectType={selectType}
          selectedDateFromCld={selectedDateFromCldFunc()}
          disableState={disableState}
          disableCertainDate={disableCertainDate}
        />
        <div className="cld_btnAlign">
          <button
            disabled={(disableState === "past" && disableArrow) || (dynYear === 1921 && dynMonth === 1)}
            onClick={() => handleLeft()}
            type="button"
          >
            {"<"}
          </button>
          <div className="cld_showDays">
            <SelectMonthField
              disableState={disableState}
              dynMonth={dynMonth}
              dynYear={dynYear}
              handleChangeSelect={(e) => handleSelectMonth(e)}
            />
            <SelectYearField
              startAndendYearOptions={startAndendYearOptions}
              dynYear={dynYear}
              handleChangeSelect={(e) => handleSelectYear(e)}
            />
          </div>
          <button
            disabled={(disableState === "future" && disableArrow) || (dynYear === 2100 && dynMonth === 12)}
            onClick={() => handleRight()}
            type="button"
          >
            {">"}
          </button>
        </div>
      </div>
      <table onMouseLeave={rangeId.length === 1 ? () => setInRange() : null}>
        <thead>
          <tr>
            {days.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>{calenderDates}</tbody>
      </table>
    </div>
  );
}

export default CustomCalender;