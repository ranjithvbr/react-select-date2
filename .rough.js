import React, { useEffect, useState } from 'react';
import { useCallback } from 'react/cjs/react.production.min';
import './App.css';
import CalenderField from './cldDateField';

const currentdate = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CustomCalender() {
  const findDaysInMonth = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0).getDate()
  const findStartDayInMonth = new Date(currentdate.getFullYear(), currentdate.getMonth(), 1).getDay()

  const [getDate, setGetDate] = useState(findDaysInMonth);
  const [getStartDay, setGetStartDay] = useState(findStartDayInMonth);
  const [calenderDates, setCalenderDates] = useState();
  const [dynMonth, setDynMonth] = useState(currentdate.getMonth() + 1);
  const [dynYear, setDynYear] = useState(currentdate.getFullYear());
  const [baseId, setBaseId] = useState([]);
  const [selectType] = useState("range");
  const [rangeId, setRangeId] = useState([]);
  const [inRange, setInRange] = useState()
  const [startDate, setStartDate] = useState("");
  const [multipleDate, setMultipleDate] = useState("");
  const [startAndendDate, setStartAndendDate] = useState({
    startDate: "",
    endDate: ""
  });

  const rangeCalculater = useCallback((id) => {
    let idDate = new Date(id)
    if (rangeId.length === 0) {
      let convertID = idDate.getDate() + "" + (idDate.getMonth() + 1) + idDate.getFullYear()
      setRangeId([convertID])
      setStartAndendDate((prevState) => ({
        ...prevState,
        startDate: idDate
      }))
      setInRange()
    }
    else if (rangeId.length === 1) {
      const addDays = (date, days = 1) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        console.log(result, "result")
        return result;
      };

      const dateRange = (start, end, range = []) => {
        if (start > end) return range;
        const next = addDays(start, 1);
        console.log(start, end, range, "finnaltest")
        return dateRange(next, end, [...range, start]);
      };

      let getStartDate
      let getEndDate
      let findGreater = new Date(startAndendDate.startDate) < idDate
      if (findGreater) {
        getStartDate = startAndendDate.startDate
        getEndDate = idDate
      } else {
        getStartDate = idDate
        getEndDate = startAndendDate.startDate
      }

      const range = dateRange(new Date(getStartDate), new Date(getEndDate));
      const allRangeDate = range.map(date => date.getDate() + "" + (date.getMonth() + 1) + date.getFullYear())

      console.log(range, allRangeDate, getStartDate, getEndDate, idDate, "allRangeDate")
      setRangeId(allRangeDate)
      if (findGreater) {
        setStartAndendDate({
          startDate: startAndendDate.startDate,
          endDate: idDate
        })
      } else {
        setStartAndendDate({
          startDate: idDate,
          endDate: startAndendDate.startDate
        })
      }
    } else {
      let convertID = idDate.getDate() + "" + (idDate.getMonth() + 1) + idDate.getFullYear()
      setRangeId([convertID])
      setStartAndendDate({
        startDate: idDate
      })
      setInRange()
    }
  }, [rangeId, startAndendDate])

  const highLight = useCallback((id, actualDateId) => {
    switch (selectType) {
      case "single":
        setBaseId([id])
        setStartDate(new Date(actualDateId))
        break;
      case "multiple":
        if (!baseId.includes(id)) {
          setBaseId(oldArray => [...oldArray, id])
          setMultipleDate(oldArray => [...oldArray, new Date(actualDateId)])
        } else {
          let findedId = baseId.findIndex((li) => li === id)
          let removedSelect = baseId.filter((_i, index) => findedId !== index)
          let removedActualDateId = multipleDate.filter((_i, index) => findedId !== index)
          setBaseId(removedSelect)
          setMultipleDate(removedActualDateId)
        }
        break;
      case "range":
        rangeCalculater(id)
        break;
      default:
    }
  }, [baseId, multipleDate, rangeCalculater, selectType])

  console.log(startDate, multipleDate, startAndendDate, rangeId, "actualDate")

  const handleMouseEnter = (event) => {
    setInRange(event.target.dataset.info)
  };

  const handleRenderDate = useCallback(() => {
    let noOfDate = []
    for (let i = 1; i <= getDate + getStartDay; i++) {
      if (i <= getStartDay) {
        noOfDate.push(<td>{""}</td>)
      } else {
        let dateId = i - getStartDay + "" + dynMonth + dynYear;
        let dateTypeId = dynYear + "-" + dynMonth + "-" + (i - getStartDay)
        console.log(dateId, baseId, getStartDay, getDate, "baseId")
        // css for range startDate and endDate.
        let rangeHightLight = (rangeId[0] === dateId ? "cld_highlightFirstNum" : rangeId[rangeId.length - 1] === dateId ? "cld_highlightLastNum" : rangeId.includes(dateId) && "cld_highlightNum")
        // firstOrderdate css 
        let inRangeStartDate = startAndendDate.startDate && startAndendDate.startDate
        if (rangeId.length === 1 && inRangeStartDate.getDate() > Number(inRange)) {
          rangeHightLight = rangeId[0] === dateId && "cld_highlightLastNum"
        }
        // css for range, single and multiple.
        let highLightNum = `${selectType === "range" ? rangeHightLight : baseId.includes(dateId) && "cld_highlightNumCircle"}`
        // startDate and endDate between ranges
        let inRangeCondition = rangeId.length === 1 && ((Number(inRange) >= (i - getStartDay) && inRangeStartDate.getDate() < (i - getStartDay)) || (Number(inRange) <= (i - getStartDay) && inRangeStartDate.getDate() > (i - getStartDay))) && "cld_inrange"

        noOfDate.push(<td onMouseEnter={rangeId.length === 1 ? handleMouseEnter : null} data-info={i - getStartDay} onClick={() => highLight(selectType === "range" ? dateTypeId : dateId, dateTypeId)}>
          <div data-info={i - getStartDay} className={`${highLightNum} cld_cellHover ${rangeId.length !== 1 && "cld_cellactive"} ${inRangeCondition}`}>{i - getStartDay}</div>
        </td>)
      }
    }

    var trDate = []
    for (let j = 0; j < noOfDate.length; j++) {
      var count = 0 + j
      if (j % 7 === 0) {
        trDate.push(
          <tr>
            {noOfDate[count + 0] || <td key={count + 0}>{""}</td>}
            {noOfDate[count + 1] || <td key={count + 1}>{""}</td>}
            {noOfDate[count + 2] || <td key={count + 2}>{""}</td>}
            {noOfDate[count + 3] || <td key={count + 3}>{""}</td>}
            {noOfDate[count + 4] || <td key={count + 4}>{""}</td>}
            {noOfDate[count + 5] || <td key={count + 5}>{""}</td>}
            {noOfDate[count + 6] || <td key={count + 6}>{""}</td>}
          </tr>
        )
        count++
      }
    }
    setCalenderDates(trDate)
  }, [baseId, dynMonth, dynYear, getDate, getStartDay, highLight, inRange, rangeId, selectType, startAndendDate.startDate])

  const handleLeft = () => {
    setGetDate(new Date(dynYear, dynMonth - 1, 0).getDate())
    setGetStartDay(new Date(dynYear, dynMonth - 2, 1).getDay())
    if (dynMonth === 1) {
      setDynYear(dynYear - 1)
      setDynMonth(12)
    } else {
      setDynMonth(dynMonth - 1)
    }
  }

  const handleRight = () => {
    setGetDate(new Date(dynYear, dynMonth + 1, 0).getDate())
    setGetStartDay(new Date(dynYear, dynMonth, 1).getDay())
    if (dynMonth === 12) {
      setDynYear(dynYear + 1)
      setDynMonth(1)
    } else {
      setDynMonth(dynMonth + 1)
    }
  }

  const handleSelectMonth = (e) => {
    setDynMonth(Number(e.target.value) + 1)
    setGetDate(new Date(dynYear, Number(e.target.value) + 1, 0).getDate())
    setGetStartDay(new Date(dynYear, Number(e.target.value), 1).getDay())
  }

  const handleSelectYear = (e) => {
    setDynYear(Number(e.target.value))
    setGetDate(new Date(e.target.value, dynMonth, 0).getDate())
    setGetStartDay(new Date(e.target.value, dynMonth - 1, 1).getDay())
  }

  const yearOptions = useCallback(() => {
    let yearoption = []
    for (let n = 0; n <= 20; n++) {
      if (n <= 10) {
        yearoption.unshift(dynYear - n)
      } else {
        yearoption.push(dynYear + n - 10)
      }
    }
    return yearoption
  }, [dynYear])

  const setFieldValue = (da) => {
    if (selectType !== "range") {
      const selDt = new Date(da.startDateFromField)
      const fieldFindDaysInMonth = new Date(selDt.getFullYear(), selDt.getMonth() + 1, 0).getDate()
      const fieldFindStartDayInMonth = new Date(selDt.getFullYear(), selDt.getMonth(), 1).getDay()
      const dateIdFromFiled = selDt.getDate() + "" + (selDt.getMonth() + 1) + selDt.getFullYear();

      setDynYear(selDt.getFullYear())
      setDynMonth(selDt.getMonth() + 1)
      setGetDate(fieldFindDaysInMonth)
      setGetStartDay(fieldFindStartDayInMonth)

      switch (selectType) {
        case "single":
          setBaseId([dateIdFromFiled])
          break;
        case "multiple":
          if (!baseId.includes(dateIdFromFiled)) {
            setBaseId(oldArray => [...oldArray, dateIdFromFiled])
          }
          break;
        default:
      }
    } else {
      rangeCalculaterFromField(da)
    }
  }

  const rangeCalculaterFromField = (id) => {
    if (id.startDateFromField && id.endDateFromField) {
      const addDays = (date, days = 1) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      };

      const dateRange = (start, end, range = []) => {
        if (start > end) return range;
        const next = addDays(start, 1);
        return dateRange(next, end, [...range, start]);
      };

      let getStartDate = id.startDateFromField
      let getEndDate = id.endDateFromField

      const range = dateRange(new Date(getStartDate), new Date(getEndDate));
      const allRangeDate = range.map(date => date.getDate() + "" + (date.getMonth() + 1) + date.getFullYear())

      setRangeId(allRangeDate)
      setStartAndendDate({
        startDate: new Date(id.startDateFromField),
        endDate: new Date(id.endDateFromField)
      })
    }
    else {
      let idDate = new Date(id.startDateFromField || id.endDateFromField)
      let convertID = idDate.getDate() + "" + (idDate.getMonth() + 1) + idDate.getFullYear()
      setRangeId([convertID])
      setStartAndendDate((prevState) => ({
        ...prevState,
        startDate: new Date(id.startDateFromField) || new Date(id.endDateFromField)
      }))
    }

    if (id.from) {
      const refreshDate = id.from === "startDateSelect" ? new Date(id.startDateFromField) : new Date(id.endDateFromField);
      setDynMonth(refreshDate.getMonth() + 1)
      setGetDate(new Date(refreshDate.getFullYear(), refreshDate.getMonth() + 1, 0).getDate())
      setGetStartDay(new Date(refreshDate.getFullYear(), refreshDate.getMonth(), 1).getDay())
      setDynYear(refreshDate.getFullYear())
      console.log(new Date(refreshDate.getFullYear(), refreshDate.getMonth() + 1, 1).getDate(), new Date(refreshDate.getFullYear(), refreshDate.getMonth() + 1, 0).getDay(), "reresult")
    }
  }

  useEffect(() => {
    handleRenderDate()
    yearOptions()
  }, [handleRenderDate, yearOptions, dynMonth, dynYear, baseId, rangeId, inRange])

  return (
    <div className="cld_container">
      <div>
        <CalenderField selectedDate={(da) => setFieldValue(da)} selectType={selectType} selectedDateFromCld={selectType === "single" ? startDate : selectType === "multiple" ? multipleDate[multipleDate.length - 1] : startAndendDate} />
        <div className="cld_btnAlign">
          <button onClick={() => handleLeft()}>{"<"}</button>
          <div className="cld_showDays">
            <select id="selectMonth" value={dynMonth - 1} onChange={(e) => handleSelectMonth(e)}>
              {months.map((data, index) => {
                return <option key={index} value={index}>{data}</option>
              })}
            </select>
            <select id="selectYear" value={dynYear} onChange={(e) => handleSelectYear(e)}>
              {yearOptions().map((data, index) => {
                return <option key={index} value={data}>{data}</option>
              })}
            </select>
          </div>
          <button onClick={() => handleRight()}>{">"}</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>{days.map((d, index) => <th key={index}>{d}</th>)}</tr>
        </thead>
        <tbody>
          {calenderDates}
        </tbody>
      </table>
    </div>
  )
}

export default CustomCalender;

    // {
    //   "src": "logo192.png",
    //   "type": "image/png",
    //   "sizes": "192x192"
    // },
    // {
    //   "src": "logo512.png",
    //   "type": "image/png",
    //   "sizes": "512x512"
    // }