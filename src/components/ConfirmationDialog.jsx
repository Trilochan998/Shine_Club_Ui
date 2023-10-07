import Modal from 'react-modal';
import React from 'react'
import axios from 'axios';
import '../css/memberList.css'

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, phoneNo, activeStatus, memberId }) => {
    const customStyles = {
        content: {
          width: '450px', // Set the desired width
          height: '200px',
          margin: 'auto', // Center the modal horizontally
          backgroundColor: '#B9BEF9',

        },
      };

      const handleYesClick = async () => {
        // alert(mobileNo + ": "+status)
        console.log("member_active_status_"+memberId);
        var spanElement = document.getElementById("member_active_status_"+memberId);
    if (activeStatus === 'active') {
      spanElement.innerHTML = "inactive"; 
    }else if(activeStatus === 'inactive'){
      spanElement.innerHTML = "active"; 
    }
      
        try {
          await axios.get("http://localhost:8080/admin/makeStatusUpdate?mobileNo="+phoneNo+"&status="+activeStatus)
          .then(function (response) {
            // console.log(response);
            if (response.status === 200) {
                onConfirm();
            }
          
          });
        }catch(error){
          if (error.response && error.response.status === 404) {
            // setError('Invalid Secret Key');
          }
        }
      }

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Confirmation Dialog"
          style={customStyles}
          shouldCloseOnOverlayClick={false}
        >
          <h2>Do you want to proceed?</h2>
          <div className='confirm-dialog'>
            <button className='btn btn-primary' onClick={handleYesClick}>Yes</button>
            <button className='btn btn-primary' onClick={onClose}>No</button>
          </div>
        </Modal>
      );
    }

export default ConfirmationDialog
