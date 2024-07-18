import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddStudent.css';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [section, setSection] = useState('');
  const [qualified, setQualified] = useState('No');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const addStudent = async () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!rollNo) newErrors.rollNo = 'Roll No is required';
    if (!section) newErrors.section = 'Section is required';
    if (!qualified) newErrors.qualified = 'Qualification status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/students`, { name, rollNo, section, qualified });
      alert('Student added successfully');
      navigate('/students');
    } catch (err) {
      console.error(err);
      alert('Failed to add student');
    }
  };

  return (
    <div className="container">
      <h1>Fill Student Details</h1>
      <form onSubmit={(e) => { e.preventDefault(); addStudent(); }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
            }}
            placeholder="Enter Name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label>Roll No:</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => {
              setRollNo(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, rollNo: '' }));
            }}
            placeholder="Enter Roll No"
          />
          {errors.rollNo && <p className="error-message">{errors.rollNo}</p>}
        </div>
        <div>
          <label>Section:</label>
          <input
            type="text"
            value={section}
            onChange={(e) => {
              setSection(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, section: '' }));
            }}
            placeholder="Enter Section"
          />
          {errors.section && <p className="error-message">{errors.section}</p>}
        </div>
        <div>
          <label>Qualified:</label>
          <select value={qualified} onChange={(e) => setQualified(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.qualified && <p className="error-message">{errors.qualified}</p>}
        </div>
        <button className="add-btn" type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
