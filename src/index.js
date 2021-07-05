import React from 'react';
import ReactDOM from 'react-dom';
// import CustomCalender from './Calender/calender';
import CallComponent from './callComponent';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <CustomCalender /> */}
    <CallComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
