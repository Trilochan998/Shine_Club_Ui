import React, { useEffect, useState } from "react";
import "../css/transction.css";
import '../css/sheduleMeeting.css'
import MakePayment from "./MakePayment";

const Transaction = () => {
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0].split("-")[0]
  // );
  // new Date().getFullYear()
  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [currentmonth, setCurrentMonth] = useState("");
  const [currMonth, setCurrMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  const [transactionDetails, setTransactionDetails] = useState([]);
  const [filteredTransactionDetails, setFilteredTransactionDetails] = useState(
    null
  );
  const [disableMonth, setDisableMonth] = useState([]);
  const [isAmountDisabled, setIsAmountDisabled] = useState(true);


  const handleDateChange = (event) => {
    console.log(event.target.value);
    setSelectedDate(event.target.value);
    if (event.target.value !== "Select Year") {
      
      const selectedYear = event.target.value;
  
      // const storedObjectData = localStorage.getItem("transction");
      const filteredTransactions = transactionDetails.filter((element) => {
        if (element != null && element.dateOfTransction != null) {
          return element.dateOfTransction.match(/\d{4}/)[0] === selectedYear;
        }
        return false;
      });

      setFilteredTransactionDetails(filteredTransactions);
    } else {
      setFilteredTransactionDetails(null); // Reset to null when "Select Year" is chosen
    }
  };


  useEffect(() => {
    // const amountDiv = document.querySelector(".amount");

    // if (amountDiv.textContent === "0") {
    //   amountDiv.classList.add("disabled");
    // }

    const storedObjectData = localStorage.getItem("transction");
    setTransactionDetails(JSON.parse(storedObjectData));
    if (transactionDetails && transactionDetails.length > 0) {
      setIsAmountDisabled(false);
    }
    setDisableMonth(
      filteredTransactionDetails?.map((transaction) => transaction.month) ?? []
    );

  }, [filteredTransactionDetails]);

  
  const renderMonthCells = () => {
    if (!filteredTransactionDetails) {
      return null; // Don't render anything if filteredTransactionDetails is null
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month, index) => {
      const monthValue = index + 1;
      const transaction = filteredTransactionDetails.find(
        (item) => item.month === monthValue
      );
      console.log(transaction);
      const amount = transaction ? transaction.amount : 0;
      const paymentStatus = transaction ? transaction.paymentStatus : "Pay";

      return (
        <>
          <tr>
            <td className="inner-div">{month}</td>
            {amount === 0 && month !== currMonth ? (
              <td
                className={`inner-div amount ${
                  amount === 0 && month !== currMonth ? "disabled" : ""
                }`}
              >
                {amount}
              </td>
              
            ) : amount !== 0 && month !== currMonth ? (
              <td
                className={`inner-div amount ${
                  amount != 0 && month !== currMonth ? "disabled" : ""
                }`}
              >
                {amount}
              </td>
            ) : amount !== 0 && month === currMonth ? (
              <td
                className={`inner-div amount ${
                  amount !== 0 && month === currMonth ? "disabled" : ""
                }`}
              >
                {amount}
              </td>
            ) : (
              <td>
              <input
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => setPaymentAmount(e.target.value)}
                style={{borderRadius:'5px'}}
              ></input>
              </td>
            )}

            {(amount === 0 || amount !== 0) && month != currMonth ? (
              <td className="tran_status">{paymentStatus}</td>
            ) 
            : (amount !== 0) && month === currMonth ? (
              <td className="tran_success_status">{paymentStatus}</td>
            ) 
            :
             (
              <MakePayment amount={paymentAmount}></MakePayment>
            )}
          </tr>
        </>
      );
    });
  };

  // console.log(disabledMonths);
  return (
    <>
      <div className="transaction">
        <h1>Transaction Details</h1>
        <span className="transaction_date">
        <h2>Select a date:</h2>
        <select onChange={handleDateChange}>
          <option value="Select Year">Select Year</option> {/* Change value here */}
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        </span>
        {selectedDate !== "Select Year" && filteredTransactionDetails && (
          <table className={`meeting ${isAmountDisabled ? "disabled" : ""}`}>
            <tr className="member-transaction-th">
              <th>Month</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
            {renderMonthCells()}
          </table>
        )}
      </div>
      <br />
    </>
  );
};

export default Transaction;
