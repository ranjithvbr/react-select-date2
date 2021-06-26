import React, { useEffect, useState } from "react";
import { getDisableDateForField, formatDay } from "./cldDisable";
import "./cldDateField.css";

function CalenderField(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errMsg_start, setErrMsg_start] = useState();
    const [errMsg_end, setErrMsg_end] = useState();
    const [selectedDateFromField, setSelectedDateFromField] = useState({
        startDateFromField:"",
        endDateFromField:""
    });
    const [minAndmaxDate, setminAndmaxDate] = useState({
        minDate:"1921-01-01",
        maxDate:"2100-12-31"
    })

    useEffect(()=>{
        const timer = setTimeout(() => {
            setErrMsg_start("")
            setErrMsg_end("")
        }, 3000);
        return () => clearTimeout(timer);
    }, [errMsg_start, errMsg_end])

    useEffect(()=>{
        if(props.disableState === "past" || props.disableState === "future"){
            setminAndmaxDate(getDisableDateForField(props.disableState))
        }
    }, [props.disableState])

    useEffect(()=>{
        if(props.selectType === "range"){
            const { startDate, endDate } = props.selectedDateFromCld
            setStartDate(formatDay(startDate));
            setEndDate(formatDay(endDate));
            setSelectedDateFromField({
                startDateFromField: formatDay(startDate),
                endDateFromField: formatDay(endDate)
              })
        }else{
            const dateFromCld = props.selectedDateFromCld;
            if(dateFromCld){
                setStartDate(formatDay(dateFromCld));
            }
        }
    }, [props.selectType, props.selectedDateFromCld])

    const handleStartDate = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value)
    }

    const startSetError = (e) => {
            if(e.code === 'Space'){
                e.preventDefault()
            }
            if ((e.code === 'Enter' && startDate) || (e._reactName === "onBlur" && startDate)) {
                const {minDate, maxDate} = minAndmaxDate;
                if(new Date(startDate) > new Date(maxDate)){
                    setErrMsg_start(`Date must be ${formatDay(new Date(maxDate), true)} or earlier`)
                }else if(new Date(startDate) < new Date(minDate)){
                    setErrMsg_start(`Date must be ${formatDay(new Date(minDate), true)}or later`)
                }else if(new Date(startDate) >= new Date(endDate)){
                    setErrMsg_start("start Date should be lower than end Date")
                    // setStartDate(selectedDateFromField.startDateFromField)
                }
                else{
                    setSelectedDateFromField((prevState) => ({
                        ...prevState,
                        startDateFromField: startDate,
                      }))
                      props.selectedDate({
                        startDateFromField: startDate,
                        endDateFromField: selectedDateFromField.endDateFromField,
                        from:"startDateSelect"
                      })
                    return
                }
            }else if(e.key === 'Enter' && !startDate){
                setErrMsg_start("Please enter a valid Date")
            }
    }

    const endSetError = (e) => {
        if(e.code === 'Space'){
            e.preventDefault()
        }
        if ((e.code === 'Enter' && endDate) || (e._reactName === "onBlur" && endDate)) {
            const {minDate, maxDate} = minAndmaxDate;
            if(new Date(endDate) > new Date(maxDate)){
                setErrMsg_end(`Date must be ${formatDay(new Date(maxDate), true)} or earlier`)
            }else if(new Date(endDate) < new Date(minDate)){
                setErrMsg_end(`Date must be ${formatDay(new Date(minDate), true)} or later`)
            }else if(new Date(startDate) >= new Date(endDate)){
                setErrMsg_end("End Date should be smaller than start Date")
                // setEndDate(selectedDateFromField.endDateFromField)
            }else if(!startDate){
                setStartDate(endDate)
                setEndDate("")
                setSelectedDateFromField((prevState) => ({
                    ...prevState,
                    startDateFromField: endDate,
                  }))
                  props.selectedDate({
                    startDateFromField: endDate,
                    endDateFromField: selectedDateFromField.endDateFromField,
                    from:"startDateSelect"
                  })
            }
            else{
                setSelectedDateFromField({
                    startDateFromField: selectedDateFromField.startDateFromField,
                    endDateFromField: endDate
                  })

                  props.selectedDate({
                    startDateFromField: selectedDateFromField.startDateFromField,
                    endDateFromField: endDate,
                    from:"endDateSelect"
                  })
                return
            }
        }else if(e.key === 'Enter' && !endDate){
            setErrMsg_end("Please enter a valid Date")
        }
    }

    // startDate, endDate,selectedDateFromField,
    console.log(minAndmaxDate, "selectedDateFromField" )

    return (
        <>
        <div className={`${props.selectType === "range" ? "cld_fieldContainer" : "cld_startDateFieldOnly"}`}>
            <div>
                <input type="date" id="start_Cld_Field" value={startDate} onChange={(e) => handleStartDate(e)} onKeyDown={(e) => startSetError(e)} onBlur={startSetError} min={minAndmaxDate.minDate} max={minAndmaxDate.maxDate} />
            </div>
            {props.selectType === "range" && <div>
                <input type="date" id="end_Cld_Field" value={endDate} onChange={(e) => handleEndDate(e)} onKeyDown={(e) => endSetError(e)} onBlur={endSetError} min={minAndmaxDate.minDate} max={minAndmaxDate.maxDate} />
            </div>}
        </div>
        <div className={`${props.selectType === "range" ? "cld_errmsgContainer" : "cld_startaerrmsg"}`}>
            <div className={`cld_errmsg ${errMsg_start && "hidecld_errmsg"}`}>{errMsg_start}</div>
            {props.selectType === "range" && 
            <div className={`cld_errmsg ${errMsg_end && "hidecld_errmsg"}`}>{errMsg_end}</div>
            }
        </div>
        </>
    )
}

export default CalenderField;