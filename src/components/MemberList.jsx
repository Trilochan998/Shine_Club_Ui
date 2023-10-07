import React, { useEffect, useState } from "react";
import "../css/memberList.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialog";
import { act } from "react-dom/test-utils";

const TransactionModal = ({ member, onClose }) => {
  return (
    <div className="modal1">
      <div className="modal-content1">
        <h2>Transaction Details for {member.memberName}</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date of Transaction</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {member.transction.map((transaction) => (
              <tr key={transaction.transctionId}>
                <td>{transaction.transctionId}</td>
                <td>{transaction.dateOfTransction}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


const MemberList = () => {
  const [adminData, setAdminData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [memberId, setMemberId] = useState(null);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm === '') {
      // Reset filteredData to the original adminData when the search term is empty
      setFilteredData(adminData);
    } else {
      // Filter the adminData based on the search term
      const filteredResults = adminData.filter((member) =>
        member.memberName.toLowerCase().includes(searchTerm)
      );

      setFilteredData(filteredResults);
    }
  };

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  useEffect(() => {
    // Retrieving the object from localStorage when the component mounts
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      setFilteredData(parsedAdminData); 
      setAdminData(parsedAdminData);
    }
  }, []);

  const handleConfirmClick = () => {
    // Handle the 'Yes' button click here
    console.log('Proceeding...');
    setConfirmationOpen(false);
  };

  const handleNoClick = () => {
    // Handle the 'No' button click here
    console.log('Cancelled.');
    setConfirmationOpen(false);
  };

  const makememberStatus = (phoneNo, activeStatus,id) => {
    setMobileNo(phoneNo);
    setMeetingStatus(activeStatus);
    setMemberId(id);
    console.log(phoneNo + " : "+activeStatus);
  }

  return (
    <div style={{overflowX: 'scroll'}}>
      <div className="memInfo">
      <h1>Members Information</h1>
      <input
        type="text"
        placeholder="Search by Member Name"
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>
      <table>
       
          <tr className="transaction_tab_tr">
            <th>Member Name</th>
            <th>id</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Payment Details</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Remaining Amount</th>
            <th>Advance Amount</th>
            <th>Status</th>
            <th>Send Notification</th>
          </tr>
        <>
          {filteredData.map((member) => (
            <tr key={member.memberName} className="transaction_tab_tr_td">
              <td>{member.memberName}</td>
              <td>{member.memberId}</td>
              <td>{member.mobileNo}</td>
              <td>{member.email}</td>
              <td><span onClick={() => openModal(member)} className="modal-transaction">
              Transaction Details
                </span></td>
              <td>{member.totalAmount}</td>
              <td>{member.paidAmount}</td>
              <td>{member.remainingAmount}</td>
              <td>{member.advanceAmount}</td>
              <td><button className='active-member-status' onClick={()=>makememberStatus(member.mobileNo, member.activeStatus,member.memberId,setConfirmationOpen(true))} id={'member_active_status_'+member.memberId}>{member.activeStatus}</button></td>
              <td>Send Notification</td>
              

            </tr>
          ))}
        </>
      </table>
      {selectedMember && (
        <TransactionModal member={selectedMember} onClose={closeModal} />
      )}
      {
        <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmClick}
        phoneNo ={mobileNo}
        activeStatus={meetingStatus}
        memberId={memberId}
      />
      }
    </div>
  );
};
export default MemberList;
