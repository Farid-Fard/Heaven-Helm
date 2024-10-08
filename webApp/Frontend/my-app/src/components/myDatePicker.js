import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = ({ selectedDate, onDateChange, placeholder }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      placeholderText={placeholder}
      dateFormat="MMMM d"
      className="date-picker" 
    />
  );
};

export default MyDatePicker;
