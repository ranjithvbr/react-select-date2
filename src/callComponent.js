import React from "react";
import CustomCalender from "./Calender/calender";

/**
 * @returns {boolean} return props defined calender
 */
function CallComponent() {
  // const singleSlotDates = [
  //   { date: "2021-06-03", avaliableSlot: 7 },
  //   { date: "2021-06-05", avaliableSlot: 1 },
  //   { date: "2021-06-15", avaliableSlot: 7 },
  //   { date: "2021-07-07", avaliableSlot: 10 },
  //   { date: "2021-07-28", avaliableSlot: 10 },
  // ];

  // const duelSlotDates = [
  //   { date: "2021-06-02", totalSlot: "25", avaliableSlot: "4" },
  //   { date: "2021-06-10", totalSlot: "30", avaliableSlot: "5" },
  //   { date: "2021-07-05", totalSlot: "280", avaliableSlot: "6" },
  //   { date: "2021-06-02", totalSlot: "30", avaliableSlot: "14" },
  //   { date: "2020-06-02", totalSlot: "28", avaliableSlot: "24" },
  //   { date: "2021-6-11", totalSlot: "30", avaliableSlot: "0" },
  //   { date: "2021-06-25", totalSlot: "50", avaliableSlot: "30" },
  // ];

  // const disableCertainDates = ["2021-05-04", "2021-06-07", "2021-07-8", "2021-07-15"];

  return (
    <>
      <CustomCalender
        // duelSlotDates={duelSlotDates}
        // singleSlotDates={singleSlotDates}
        selectDateType="range"
        disableDate=""
        // disableCertainDates={disableCertainDates}
        onSelect={(data) => console.log(data, "data")}
        // slotInfo={true}
        // showDateInputField={false}
        // showArrow={false}
        // showMonthDisable={true}
        // showYearDisable={true}
        // showDatelabel={true}
        templateClr="blue"
      />
    </>
  );
}

export default CallComponent;
