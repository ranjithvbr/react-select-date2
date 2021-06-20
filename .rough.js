import React, { useEffect, useState } from "react";
import "./cldDateField.css";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function CalenderField(props) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [errMsg_start, setErrMsg_start] = useState();
    const [errMsg_end, setErrMsg_end] = useState();
    const [selectedDateFromField, setSelectedDateFromField] = useState({
        startDateFromField:"",
        endDateFromField:""
    })

    const handleStartDate = (e) => {
        setStartDate(e.target.value)
        console.log(e.target.value,e, "startDatew")
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value)
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setErrMsg_start("")
            setErrMsg_end("")
        }, 3000);
        return () => clearTimeout(timer);
    }, [errMsg_start, errMsg_end])

    // useEffect(()=>{
    //     if(selectedDateFromField.startDateFromField || selectedDateFromField.endDateFromField){
    //         props.selectedDate(selectedDateFromField)
    //     }
    // }, [selectedDateFromField])

    const formatDay = (date) => {
        if(date){
        const addZeroToMonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const addZeroToDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const dateIdFromCld =date.getFullYear() + "-" + addZeroToMonth + "-" + addZeroToDate;
        return dateIdFromCld
        }else{
            return "yyyy-MM-dd"
        }
    }

    useEffect(()=>{
        if(props.selectType === "range"){
            const { startDate, endDate } = props.selectedDateFromCld
            console.log(startDate, endDate,"final")
            setStartDate(formatDay(startDate));
            setEndDate(formatDay(endDate));
        }else{
            const dateFromCld = props.selectedDateFromCld;
            if(dateFromCld){
                // const addZeroToMonth = dateFromCld.getMonth() + 1 < 10 ? "0" + (dateFromCld.getMonth() + 1) : dateFromCld.getMonth() + 1;
                // const addZeroToDate = dateFromCld.getDate() < 10 ? "0" + dateFromCld.getDate() : dateFromCld.getDate();
                // const dateIdFromCld =dateFromCld.getFullYear() + "-" + addZeroToMonth + "-" + addZeroToDate;
                // console.log(props.selectedDateFromCld,dateIdFromCld, "props.selectedDateFromCld");
                setStartDate(formatDay(dateFromCld));
            }
        }
    }, [props.selectedDateFromCld])

    const startSetError = (e) => {
            if(e.code === 'Space'){
                e.preventDefault()
            }
            if (e.code === 'Enter' && startDate) {
                console.log(startDate,new Date(startDate).getFullYear() <= 2100, "startDate")
                if(new Date(startDate).getFullYear() >= 2100){
                    setErrMsg_start("year must be 2100 or earlier")
                }else if(new Date(startDate).getFullYear() <= 1921){
                    setErrMsg_start("year must be 1921 or later")
                }else{
                    setSelectedDateFromField((prevState) => ({
                        ...prevState,
                        startDateFromField: startDate,
                      }))
                      props.selectedDate({
                        startDateFromField: startDate,
                        endDateFromField: selectedDateFromField.endDateFromField
                      })
                    return
                }
            }else if(e.key === 'Enter' && !startDate){
                setErrMsg_start("Please enter a valid Date")
            }
    }

    const endSetError = (e) => {
        console.log(endDate,new Date(endDate).getFullYear() >= 2100, "endDate")

        if(e.code === 'Space'){
            e.preventDefault()
        }
        if (e.code === 'Enter' && endDate) {
            if(new Date(endDate).getFullYear() >= 2100){
                setErrMsg_end("year must be 2100 or earlier")
            }else if(new Date(endDate).getFullYear() <= 1921){
                setErrMsg_end("year must be 1921 or later")
            }else{
                setSelectedDateFromField((prevState) => ({
                    ...prevState,
                    endDateFromField: endDate
                  }))
                  props.selectedDate({
                    startDateFromField: selectedDateFromField.startDateFromField,
                    endDateFromField: endDate
                  })
                return
            }
        }else if(e.key === 'Enter' && !endDate){
            setErrMsg_end("Please enter a valid Date")
        }
    }

    return (
        <div className={`${props.selectType === "range" ? "cld_fieldContainer" : "cld_startDateFieldOnly"}`}>
        {/* onBlur={() => reChangeValue()} */}
            <div>
                <input type="date" id="start_Cld_Field" value={startDate} onChange={(e) => handleStartDate(e)} onKeyDown={(e) => startSetError(e)} min={"1921-01-01"} max={"2100-12-31"} />
                <div className={`cld_errmsg ${errMsg_start && "hidecld_errmsg"}`}>{errMsg_start}</div>
            </div>
            {props.selectType === "range" && <div>
                <input type="date" id="end_Cld_Field" value={endDate} onChange={(e) => handleEndDate(e)} onKeyDown={(e) => endSetError(e)} min={"1921-01-01"} max={"2100-12-31"} />
                <div className={`cld_errmsg ${errMsg_end && "hidecld_errmsg"}`}>{errMsg_end}</div>
            </div>}
        </div>
    )
}

export default CalenderField;