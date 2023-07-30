import React, { useEffect, useState } from 'react';
import  "../css/transction.css";
import MakePayment from './MakePayment';

const Transaction = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0].split('-')[0]);
  const [amount, setAmount] = useState(0)
  const [currentmonth, setCurrentMonth] = useState("")
  const [transactionDetails,setTransactionDetails]=useState([])


  const generateDateOptions = () => {
    const currentDate = new Date();
    const fiveYearsAgo = new Date(currentDate.getFullYear() - 5, 0, 1); // January 1st, 5 years ago

    const dateOptions = [];
    let currentDateIter = new Date(currentDate);

    while (currentDateIter.getFullYear() >= fiveYearsAgo.getFullYear()) {
      const optionValue = currentDateIter.toISOString().split('T')[0].split('-')[0]; // Extract only the year
      dateOptions.push(optionValue);
      currentDateIter.setFullYear(currentDateIter.getFullYear() - 1);
    }

    return dateOptions;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

 
  useEffect(() => {
    const currentDate = new Date();
    const currentMonthName = months[currentDate.getMonth()];
    setCurrentMonth(currentMonthName)
    console.log(currentmonth);
    
    const storedObjectData = localStorage.getItem("transction");
    const parsedObjectData = JSON.parse(storedObjectData);
      setTransactionDetails(JSON.parse(storedObjectData));
      // console.log(parsedObjectData);
      

  },[]);
 if (transactionDetails.length != 0) {
  
  console.log("sonu: "+transactionDetails.includes(months));
}

  return (
    transactionDetails.length != 0 ?
    <div>
      <h1>{selectedDate}</h1>
      <h1>Transaction details</h1>
      <h2>Select a date:</h2>
      <select value={selectedDate} onChange={handleDateChange}>
        {generateDateOptions().map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
    
        <table>
        <tr>
          <th>Month</th>
          <th>Amount</th>
          <th>Status</th>
          <th>current Month</th>
        </tr>
        {/* (index != transactionDetails[index].month-1) */}
        {months.map((month, index) => (
            month != currentmonth && (index < transactionDetails.length && (index === transactionDetails[index].month-1 && index != transactionDetails[index].month-1))? <tr key={index} className='disabled-row'>
            <td>{month}</td>
            <td><input type='number' placeholder='Enter Amount' onChange={e => setAmount(e.target.value)}></input></td>
            <td><MakePayment amount={amount}></MakePayment></td>
            <td></td>
          </tr> :
          <tr key={index} >
          <td>{month}</td>
          <td><input type='number' placeholder='Enter Amount'  onChange={e => setAmount(e.target.value)}></input></td>
          <td><MakePayment amount={amount}></MakePayment></td>
          <td></td>
        </tr>
        
      ))}

      </table>
          
    </div> : ""
  );
};

export default Transaction;
