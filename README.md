# react-select-date
A React Component for choosing the single-date, multiple-date, range and slots booking.Purely date calculated from JavaScript Date Object.

Live Demo: ---Working on it---

#### Single and Multiple select
![](https://user-images.githubusercontent.com/37235948/125201244-d6fa6e00-e28b-11eb-9761-4f0760ad357b.png)

#### SingleSlots and DuelSlots
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
onSelect                             | Func      |                  | callback function for returns the selected date
singleSlotDates                      | *Object[] | []               | define the avilable slots
duelSlotDates                        | *Object[] | []               | define the avilable slots and total slots
templateClr                          | String    | green            | define the selecte date color(green || blue)
disableCertainDates                  | *Object[] | []               | disable the certain dates
disableDates                         | String    |                  | disable the past or future date
slotInfo                             | Boolean   | true             | visibility of slotInfo
showDatelabel                        | Boolean   | false            | visibility of label for date input
showDateInputField                   | Boolean   | true             | visibility of date input
showMonthArrow                       | Boolean   | false            | whether month select field can be editable and visibility of arrow
showYearArrow                        | Boolean   | false            | whether year select field can be editable and visibility of arrow 
showArrow                            | Boolean   | true             | visibility of left arrow and right arrow

### About Calender
This Calender developed based on hooks and javascript date object.Uses of choosing the single-date, multiple-date, range and slots booking.

#### Single-Date Select
The single Date selection is a fully controlled component that allows users to select a single date. Can select the date from calendar table. Similarly, you can select the date from `date-input` when after you fill the valid date and click the Enter button inside the respective field or navigate the focus it will trigger the selectDate Func.`date-input` field will throw the error message if the date is not valid.`slotInfo` props will allow showing the color of selected-Date and disabled-Date.

#### Multiple-Date Select
The multiple Date selection is a fully controlled component that allows users to select a multiple date. This works same as single-date for select the date.

#### DateRange
The dateRange is a fully controlled component that allows users to select a date range.Can select the date range from `date-input` field or calender table. You can control the selected dates using the `onSelect` props. The DateRange also manages internal state for partial dates entered by typing (although `onSelect` will not trigger until a date has been entered completely in that case, `date-input` field will throw the error message if the date is not valid).

#### Slots
The slots booking is a fully controlled component that allows users to view the avilable slots and total slots.In slots booking calender can change the type of selection throw 
`selectDateType` props.Similarly, you want to display only avilable slots can achieve throw sending `singleSlotDates` value, In order to show avilable slots and total slots need to send `duelSlotDates` value(should not send both at the same `singleSlotDates` and `duelSlotDates`).

```javascript
// example slots values
singleSlotDates = {[ { date: "2021-07-03", avaliableSlot: "7" } ]}
duelSlotDates = {[ { date: "2021-07-02", totalSlot: "30", avaliableSlot: "4" } ]}
```
### Author
- Ranjith - ranjithvbr@gmail.com

### License
  MIT
