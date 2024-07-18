import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditStudent.css';

const EditStudent = () => {
  const { rollNo } = useParams();
  const [student, setStudent] = useState({
    rollNo: '',
    name: '',
    section: '',
    qualified: 'No'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/students/${rollNo}`);
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  }, [rollNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rollNo, name, section, qualified } = student;

    const newErrors = {};
    if (!rollNo) newErrors.rollNo = 'Roll No is required';
    if (!name) newErrors.name = 'Name is required';
    if (!section) newErrors.section = 'Section is required';
    if (!qualified) newErrors.qualified = 'Qualification status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/students/${rollNo}`, student);
      navigate('/students');
    } catch (error) {
      console.error('Error updating student data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={student.rollNo}
            readOnly
          />
          {errors.rollNo && <p className="error">{errors.rollNo}</p>}
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={student.section}
            onChange={handleChange}
            placeholder="Enter Section"
          />
          {errors.section && <p className="error">{errors.section}</p>}
        </div>
        <div>
          <label>Qualified:</label>
          <select
            name="qualified"
            value={student.qualified}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.qualified && <p className="error">{errors.qualified}</p>}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
