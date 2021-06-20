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

    const formatDay = (date) => {
        if(date){
        const addZeroToMonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const addZeroToDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const dateIdFromCld =date.getFullYear() + "-" + addZeroToMonth + "-" + addZeroToDate;
        return dateIdFromCld
        }else{
            return ""
        }
    }

    useEffect(()=>{
        if(props.selectType === "range"){
            const { startDate, endDate } = props.selectedDateFromCld
            console.log(startDate, endDate, "startDate, endDate")
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

    const startSetError = (e) => {
            if(e.code === 'Space'){
                e.preventDefault()
            }
            if ((e.code === 'Enter' && startDate) || (e._reactName === "onBlur" && startDate)) {
                console.log(startDate,new Date(startDate).getFullYear() <= 2100, "startDate")
                if(new Date(startDate).getFullYear() >= 2100){
                    setErrMsg_start("year must be 2100 or earlier")
                }else if(new Date(startDate).getFullYear() <= 1921){
                    setErrMsg_start("year must be 1921 or later")
                }else if(new Date(startDate) >= new Date(endDate)){
                    setErrMsg_start("start Date should be lower than end Date")
                    setStartDate(selectedDateFromField.startDateFromField)
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
            if(new Date(endDate).getFullYear() >= 2100){
                setErrMsg_end("year must be 2100 or earlier")
            }else if(new Date(endDate).getFullYear() <= 1921){
                setErrMsg_end("year must be 1921 or later")
            }else if(new Date(startDate) >= new Date(endDate)){
                setErrMsg_end("End Date should be smaller than start Date")
                setEndDate(selectedDateFromField.endDateFromField)
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

    console.log(startDate, endDate,selectedDateFromField, "selectedDateFromField" )

    return (
        <div className={`${props.selectType === "range" ? "cld_fieldContainer" : "cld_startDateFieldOnly"}`}>
            <div>
                <input type="date" id="start_Cld_Field" value={startDate} onChange={(e) => handleStartDate(e)} onKeyDown={(e) => startSetError(e)} onBlur={startSetError} min={"1921-01-01"} max={"2100-12-31"} />
                <div className={`cld_errmsg ${errMsg_start && "hidecld_errmsg"}`}>{errMsg_start}</div>
            </div>
            {props.selectType === "range" && <div>
                <input type="date" id="end_Cld_Field" value={endDate} onChange={(e) => handleEndDate(e)} onKeyDown={(e) => endSetError(e)} onBlur={endSetError} min={"1921-01-01"} max={"2100-12-31"} />
                <div className={`cld_errmsg ${errMsg_end && "hidecld_errmsg"}`}>{errMsg_end}</div>
            </div>}
        </div>
    )
}

export default CalenderField;