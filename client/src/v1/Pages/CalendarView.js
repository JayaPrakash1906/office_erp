import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';

const localizer = momentLocalizer(moment);
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    zIndex: 1050,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1040,
  },
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [meetingName, setMeetingName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetingPurpose, setMeetingPurpose] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setModalIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (meetingName && startTime && endTime && meetingPurpose && contactNumber && email && team) {
      const newEvent = {
        title: meetingName,
        start: new Date(`${selectedSlot.start.toDateString()} ${startTime}`),
        end: new Date(`${selectedSlot.start.toDateString()} ${endTime}`),
        purpose: meetingPurpose,
        contactNumber,
        email,
        team,
      };

      setEvents([...events, newEvent]);
      sendConfirmationEmail();
      setModalIsOpen(false);
      clearForm();
    } else {
      alert('Please fill out all fields.');
    }
  };

  const sendConfirmationEmail = () => {
    const emailParams = {
      to_email: email,
      meeting_name: meetingName,
      start_time: startTime,
      end_time: endTime,
      purpose: meetingPurpose,
      contact_number: contactNumber,
      team,
    };

    emailjs
      .send('your_service_id', 'your_template_id', emailParams, 'your_user_id')
      .then(
        (response) => {
          alert('Confirmation email sent successfully!');
          console.log('Email sent:', response.status, response.text);
        },
        (error) => {
          console.error('Failed to send email:', error);
        }
      );
  };

  const clearForm = () => {
    setMeetingName('');
    setStartTime('');
    setEndTime('');
    setMeetingPurpose('');
    setContactNumber('');
    setEmail('');
    setTeam('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        views={['month', 'week', 'day']}
        defaultView="month"
        style={{ height: 500, zIndex: 1 }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Add Meeting"
      >
        <h2 className="text-xl font-bold mb-4">Add Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Meeting Name</label>
              <input
                type="text"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter meeting name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Purpose</label>
              <textarea
                value={meetingPurpose}
                onChange={(e) => setMeetingPurpose(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter meeting purpose"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter contact number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter email ID"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Team/Company/Office</label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter team, company, or office name"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CalendarView;
