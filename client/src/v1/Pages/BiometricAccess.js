import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';

const BiometricAccess = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    department: '',
    contactInfo: '',
    biometricType: '',
    reason: '',
    accessDuration: '',
    approvedBy: '',
    accessLocation: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add form submission logic here (API call, validation, etc.)
  };

  return (
    <div className="flex">
      <div className="bg-[#1D2753]">
            <SideBar />
        </div>
        <div className="ms-[69px] flex-grow">
            <NavBar />
        <div className="mx-10 my-5">
          <h1 className="text-2xl font-bold mb-5">Biometric Access Request</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-lg">
            {/* Full Name */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter employee ID"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter department"
                required
              />
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Contact Information</label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter contact info"
                required
              />
            </div>

            {/* Biometric Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Biometric Type</label>
              <select
                name="biometricType"
                value={formData.biometricType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Biometric Type</option>
                <option value="Fingerprint">Fingerprint</option>
                <option value="Facial Recognition">Facial Recognition</option>
                <option value="Iris Scan">Iris Scan</option>
                <option value="Voice Authentication">Voice Authentication</option>
              </select>
            </div>

            {/* Reason for Request */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Reason for Request</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Provide a reason for the biometric access request"
                rows="3"
                required
              />
            </div>

            {/* Access Duration */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Access Duration</label>
              <input
                type="text"
                name="accessDuration"
                value={formData.accessDuration}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., Temporary (1 month)"
                required
              />
            </div>

            {/* Approved By */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Approved By</label>
              <input
                type="text"
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter approver's name"
                required
              />
            </div>

            {/* Access Location */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Access Location/Device</label>
              <input
                type="text"
                name="accessLocation"
                value={formData.accessLocation}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Specify the access location or device"
                required
              />
            </div>

            {/* Consent */}
            <div className="col-span-2 flex items-center">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label className="text-gray-700">I consent to the collection and use of my biometric data.</label>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiometricAccess;
