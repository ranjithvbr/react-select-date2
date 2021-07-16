          // disableDate ||
          // disableSpecificDate ||
          // `${highLightNum} ${selectType !== "range" && !slotsState && "cld_cellSingleMultiple"} ${
          //   rangeId.length !== 1 && "cld_cellactive"
          // } ${inRangeCondition}`;


import React from "react";
import Calender from "react-select-date";

function MyComponent() {
  return (
      <Calender 
        onSelect={(data) => console.log(data, "data")}
      />
  );
}

export default MyComponent;
