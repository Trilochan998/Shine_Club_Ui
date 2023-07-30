import React, { useEffect, useState } from "react";
import "../css/transction.css";
import MakePayment from "./MakePayment";

const Transaction = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0].split("-")[0]
  );
  const [amount, setAmount] = useState(0);
  const [currentmonth, setCurrentMonth] = useState("");
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [filteredTransactionDetails, setFilteredTransactionDetails] = useState(
    []
  );
  const [disableMonth, setDisableMonth] = useState([])

  const generateDateOptions = () => {
    const currentDate = new Date();
    const fiveYearsAgo = new Date(currentDate.getFullYear() - 5, 0, 1); // January 1st, 5 years ago

    const dateOptions = [];
    let currentDateIter = new Date(currentDate);

    while (currentDateIter.getFullYear() >= fiveYearsAgo.getFullYear()) {
      const optionValue = currentDateIter
        .toISOString()
        .split("T")[0]
        .split("-")[0]; // Extract only the year
      dateOptions.push(optionValue);
      currentDateIter.setFullYear(currentDateIter.getFullYear() - 1);
    }

    return dateOptions;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    const selectedYear = event.target.value;
    // const storedObjectData = localStorage.getItem("transction");
    var filteredTransactions = [];
    for (let index = 0; index < transactionDetails.length; index++) {
      const element = transactionDetails[index];
      if (element.dateOfTransction.match(/\d{4}/)[0] == selectedYear) {
        filteredTransactions.push(element);
      }
    }
    setFilteredTransactionDetails(filteredTransactions);
  };

  const months = [
    1,2,3,4,5,6,7,8,9,10,11,12
  ];

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthName = months[currentDate.getMonth()];
    console.log(currentmonth);

    const storedObjectData = localStorage.getItem("transction");
    const parsedObjectData = JSON.parse(storedObjectData);
    setTransactionDetails(JSON.parse(storedObjectData));
    var filteredTransactions = [];
    for (let index = 0; index < transactionDetails.length; index++) {
      const element = transactionDetails[index];
      if (
        element.dateOfTransction.match(/\d{4}/)[0] == new Date().getFullYear()
      ) {
        filteredTransactions.push(element);
      }
    }
    setFilteredTransactionDetails(filteredTransactions);
    setDisableMonth(filteredTransactionDetails.map(transaction => transaction.month))
 
  }, []);

  //test the code

  const disabledMonths = disableMonth;
  const renderMonthCells = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const handleMonthClick = (month) => {
      // Handle the clicked month
      console.log('Clicked Month:', month);
    };

    return months.map((month, index) => {
      const monthValue = index + 1;
      const isDisabled = disabledMonths.includes(monthValue);
      const transaction = filteredTransactionDetails.find(item => item.month === monthValue);
      console.log(transaction);
      const amount = transaction ? transaction.amount : 0;

      return (
        <td
          key={monthValue}
          onClick={() => handleMonthClick(monthValue)}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', color: isDisabled ? 'gray' : 'black' }}
        >
          <div>{month}</div>
          <div>{isDisabled ? "Amount: N/A" : `Amount: ${amount}`}</div>
        </td>
      );
    });
  };
   
  // console.log(disabledMonths);
  return (
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
        {/* {months.map((month, index) => (
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
        
      ))} */}

      {/* {months.map((month) => (
        <tr>
        <td>{month}</td>
        <td><input type='number' placeholder='Enter Amount'  onChange={e => setAmount(e.target.value)}></input></td>
        <td>
        <button
          key={month}
          // disabled={disabledMonths.includes(month)}
        >Pay</button>
        </td>
          
        </tr>
       
      ))} */}

{renderMonthCells()}


        {/* {filteredTransactionDetails.map((data, index) => (
          <>
            {data.month === 1 ? (
              <>
                <td>January</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={data.amount}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : data.month === 2 ? (
              <>
                <td>February</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : data.month === 3 ? (
              <>
                <td>March</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : data.month === 4 ? (
              <>
                <td>April</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : data.month === 5 ? (
              <>
                <td>May</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : data.month === 6 ? (
              <>
                <td>June</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : data.month === 7 ? (
              <>
                <td>July</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : data.month === 8 ? (
              <>
                <td>August</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            ) : (
              <>
                <td>September</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </td>
                <td>
                  <MakePayment amount={amount}></MakePayment>
                </td>
              </>
            )}
          </>
        ))} */}
      </table>
    </div>
  );
};

export default Transaction;
