import axios from 'axios';
import React, { useState } from 'react'
import '../css/sheduleMeeting.css'
function convertDateFormat(inputDate) {
  // Split the input date string by "/"
  console.log(inputDate);
  const dateParts = inputDate.split('-');

  // Extract month, day, and year
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  console.log(dateParts);
  // Create a new date string in "yyyy-MM-dd" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}


const AgendaModal = ({ content, onClose }) => {
  return (
    <div className="agenda-model">
      <div className="agenda-modal-content">
        <p>{content}</p>
        <button onClick={onClose} className='agenda-btn'>Close</button>
      </div>
    </div>
  );
};

const TransactionModal = ({  onClose }) => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Today's date
  const [agenda, setAgenda] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAMPM] = useState('');
  const [error, setError] = useState(null);
  const[msg,setMsg]=useState(null)

  const createMeeting = async (e) => {
    setMsg('Please wait...')
    const date = convertDateFormat(selectedDate);

    const meetingDetails = {
    "title":title,
    "date":date,
    "agenda":agenda,
    "time":hour+":"+minute+" "+ampm,
    "status":"Open"
    }

    try{
    await axios.post("http://localhost:8080/admin/sheduleMeeting",meetingDetails)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          setMsg("Meeting Created Successfully")
          
          // //redirect user to home page
          window.location.href = '/admin'
        }
    
      
      });
    }catch(error){
     
        setMsg('Meeting Not Created')
    }
  };
   

  const handleTextChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
  };

  const handleAMPMChange = (e) => {
    setAMPM(e.target.value);
  };
  const handleTextareaChange = (e) => {
    setAgenda(e.target.value);
  };
  return (
    <div className="meeting-modal1">
      <div className="meeting-modal-content1">
        <h2>Create A New Meeting </h2>
        <label>
        Add Title:
        <input type="text" value={title} onChange={handleTextChange} />
      </label>
      <br />
      <label>
        Date:
        <input type="date" value={selectedDate} min={new Date().toISOString().slice(0, 10)} onChange={handleDateChange} />
      </label>
      <br />
      <label>
        Time:
        <select value={hour} onChange={handleHourChange}>
          <option value="">Hour</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select value={minute} onChange={handleMinuteChange}>
          <option value="">Minute</option>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <select value={ampm} onChange={handleAMPMChange}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </label>
      <br />
      <label>
        <textarea value={agenda} onChange={handleTextareaChange} placeholder='Type details for this meeting'></textarea>
      </label> <br></br>
        
      <button onClick={createMeeting}>Create</button>
      <button onClick={onClose}>Close</button>
      {msg ? (
        <p >{msg}</p>
      ) : (
        <></>
      )}
      </div>
    </div>
  );
};
const SchedulingMeeting = (props) => {
  const [selectedMember, setSelectedMember] = useState(false);
  const [agenda, setAgenda] = useState(false);
  const [agendaContent, setAgendaContent] = useState("")
  const [disabledButtons, setDisabledButtons] = useState([]);

  const openMeetingModal = (meetingAgendaDetails) => {
    setAgenda(true);
    setAgendaContent(meetingAgendaDetails);
    
  }

  const closeMeetingModal = () => {
    setAgenda(false);
  }

  const openModal = () => {
    setSelectedMember(true);
  };

  const closeModal = () => {
    setSelectedMember(false);
  };

 
  const cancelMeeting= async(id)=>{
    var spanElement = document.getElementById("status_"+id);
    spanElement.innerHTML = "Cancelled"; 
    setDisabledButtons([...disabledButtons, id]);

    try{
      await axios.post("http://localhost:8080/admin/cancelMeeting?id="+id)
        .then(function (response) {
          // console.log(response);
          if (response.status === 200) {
            // setMsg("Meeting Created Successfully")
            
            // //redirect user to home page
            // window.location.href = '/admin'
          }
      
        
        });
      }catch(error){
       
          // setMsg('Meeting Not Created')
      }
    };

  return (
    <div style={{overflowX: 'scroll'}}>
      <h2>Schedule A Meeting</h2>
      <button class="btn btn-primary create-meeting" onClick={() => openModal()}>+Create Meeting</button>
      <table className='meeting'>
        <tr >
          <th>Meeting Id</th>
          <th>Title</th>
          <th>Date</th>
          <th>Time</th>
          <th>Current Status</th>
          <th>Cancel Meeting</th>

        </tr>
      {props.listOfmeeting.map((meeting) => (
            <tr>
              <td>{meeting.meetingId}</td>
              <td onClick={() => openMeetingModal(meeting.agenda)} className='agenda_title'>{meeting.title}</td>
              <td>{meeting.date}</td>
              <td>{meeting.time}</td>
              <td className='current-status'>
                <span class="status-container" id={'status_'+meeting.meetingId}>{meeting.status}</span>
              </td>
              <td>
              {meeting.status === 'Cancelled' ? (
                <span>
                <button className='btn btn-danger cancel-meeting'
                  onClick={() => cancelMeeting(meeting.meetingId)}
                  disabled
                >
                  Cancel
                </button>
              </span>
            ) : meeting.status === 'Closed' ? (
              <span>
                <button className='btn btn-primary cancel-meeting'
                  onClick={() => cancelMeeting(meeting.meetingId)}
                  disabled
                >
                  Close
                </button>
              </span>
            )
            :(
              <span>
                <button className='btn btn-success cancel-meeting'
                  onClick={() => cancelMeeting(meeting.meetingId)}
                >
                  Cancel
                </button>
              </span>
              )}
              </td>
              {/* <td onClick={() => openMeetingModal(meeting.agenda)}>Get Meeting Details</td> */}
            </tr>
          ))}
     </table>
      {/* <button>+Cancel Meeting</button> */}
      {agenda && (
        <AgendaModal content = {agendaContent} onClose={closeMeetingModal} />
      )}
      {selectedMember && (
        <TransactionModal member={selectedMember} onClose={closeModal} />
      )}
    </div>
  )
}

export default SchedulingMeeting
