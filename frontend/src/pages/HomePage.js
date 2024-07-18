import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import '../styles/HomePage.css';

const HomePage = () => {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);
  const [errors, setErrors] = useState({});

  const searchStudent = async () => {
    if (!rollNo) {
      setErrors({ rollNo: 'Roll No is required' });
      return;
    }

    try {
      const response = await axiosInstance.get(`/students/${rollNo}`);
      setStudent(response.data);
      setErrors({});
    } catch (err) {
      setStudent(null);
      setErrors({ general: 'Student not found' });
    }
  };

  const getQualifiedColor = () => {
    return student.qualified === 'Yes' ? 'green' : 'red';
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Lookup Your Information Using Roll Number</h2>
   
        <div className="search-bar">
          <input
            type="text"
            value={rollNo}
            onChange={(e) => {
              setRollNo(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, rollNo: '' }));
            }}
            placeholder="Enter Roll No."
            className="search-input"
          />
          <button onClick={searchStudent} className="search-button">
            Search
          </button>
        </div>
        {errors.rollNo && <p className="error-message">{errors.rollNo}</p>}
        {errors.general && <p className="error-message">{errors.general}</p>}
        {student && (
          <div className="student-info">
            <h2>Student Details</h2>
            <p><strong>Roll No:</strong> {student.rollNo}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Qualified:</strong> <span style={{ color: getQualifiedColor() }}>{student.qualified}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
