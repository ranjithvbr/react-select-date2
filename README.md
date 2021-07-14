# react-select-date
A React Component for choosing the single-date, multiple-date, range and slots booking.Purely date calculated from JavaScript Date Object.

Live Demo: ---Working on it---

![](https://user-images.githubusercontent.com/37235948/125201244-d6fa6e00-e28b-11eb-9761-4f0760ad357b.png)

![](https://user-images.githubusercontent.com/37235948/125206652-0027f800-e2a6-11eb-9fb5-2a7b219e9a5a.png)

# Getting Started

### Installation

Run `npm i react-select-date`

## Usage

### `SingelDate`
```javascript
import Calender from "react-select-date";

function MyComponent() {
  return (
      <Calender 
        onSelect={(date) => console.log(date)}
      />
  );
}

export default MyComponent;

```

### `DateRange`
```javascript
import Calender from "react-select-date";

function MyComponent() {
  return (
      <Calender 
        onSelect={(date) => console.log(date)}
        selectDateType="range"
        // select template color
        templateClr="blue"
      />
  );
}

export default MyComponent;

```

### `Multiple With DuelSlots`
```javascript
import Calender from "react-select-date";

function MyComponent() {
  const duelSlotDates = [
      { date: "2021-07-02", totalSlot: "30", avaliableSlot: "4" },
      { date: "2021-07-10", totalSlot: "30", avaliableSlot: "5" },
      { date: "2021-07-05", totalSlot: "280", avaliableSlot: "160" },
      { date: "2021-07-07", totalSlot: "30", avaliableSlot: "14" },
    ]
  return (
      <Calender
        onSelect={(date) => console.log(date)}
        selectDateType="multiple"
        duelSlotDates={duelSlotDates}
      />
  );
}

export default MyComponent;

```
### Options

Property                             | type      | Default Value    | Description
-------------------------------------|-----------|------------------|-----------------------------------------------------------------
selectDateType                       | String    | single           | define the selection type of single,multiple or range
onSelect                             | Func      |                  | callback function for return the selected date
singleSlotDates                      | *Object[] | []               | define the avilable slots
duelSlotDates                        | *Object[] | []               | define the avilable slots and total slots
templateClr                          | String    | green            | define the selecte date color(green || blue)
disableCertainDates                  | *Object[] | []               | disable the certain dates
disableDates                         | String    |                  | disable the past or future date
slotInfo                             | Boolean   | true             | visibility of slotInfo
showDatelabel                        | Boolean   | false            | visibility of label for date input
showDateInputField                   | Boolean   | true             | visibility of date input
showMonthArrow                       | Boolean   | false            | whether month select field can be editable and visibiliyu of arrow
showYearArrow                        | Boolean   | false            | whether year select field can be editable and visibiliyu of arrow 
showArrow                            | Boolean   | true             | visibility of left arrow and right arrow
selectDateType                       | String    | single           | define the selection type of single,multiple or range
selectDateType                       | String    | single           | define the selection type of single,multiple or range
selectDateType                       | String    | single           | define the selection type of single,multiple or range

