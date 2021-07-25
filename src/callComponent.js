import React from "react";
import Calendar from "./Calendar/calendar";

/**
 * @returns {object} returns calendar
 */
function CallComponent() {
  return (
      <Calendar
        onSelect={(data) => console.log(data, "data")}
      />
  );
}

export default CallComponent;
