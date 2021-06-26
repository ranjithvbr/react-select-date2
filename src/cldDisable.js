const currentDate =  new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function getDisableDate(renderDate, disableState ) {
        let subractOneDay
    if(disableState === "past"){
        subractOneDay = new Date(renderDate);
        subractOneDay.setDate(subractOneDay.getDate() + 1);
    }
    const disableRange = disableState === "past" ? subractOneDay < new Date() && "cld_disableDate" : disableState === "future" ? renderDate >= new Date() && "cld_disableDate" : null;
    return disableRange
}

export function getDisableDateForArrow(month, year) {
    const disableArrow = currentDate.getMonth() === month - 1 && currentDate.getFullYear() === year ? true : false 
    return disableArrow
}

export function getDisableYear(disableState) {
    let disableYear
    if (disableState === "past") {
        disableYear = ({
          startYearOption: currentDate.getFullYear(),
          endYearOption: 2100
        })
      } else if (disableState === "future") {
        disableYear = ({
          startYearOption: 1921,
          endYearOption: currentDate.getFullYear()
        })
      }
    return disableYear
}

export function getDisableDateForField(disableState) {
    let disablefield
        if(disableState === "past"){
        disablefield = ({
            minDate: formatDay(new Date()),
            maxDate:"2100-12-31"
        })
        }else if(disableState === "future"){
            disablefield = ({
                minDate:"1921-01-01",
                maxDate: formatDay(new Date())
            })
        }
    return disablefield
}

export function formatDay(date,format){
    if(date){
        const addZeroToMonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const addZeroToDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        if(format){
            return months[Number(addZeroToMonth) - 1] + " " +addZeroToDate + "," + date.getFullYear()
        }
        const dateIdFromCld = date.getFullYear() + "-" + addZeroToMonth + "-" + addZeroToDate;
        
        return dateIdFromCld
    }else{
        return ""
    }
}