import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track admin login status
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/check-auth`, { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Error checking authentication:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/students`); // Adjust the URL if needed
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    checkAuth();
    fetchStudents();
  }, []);

  const handleEdit = (rollNo) => {
    navigate(`/edit-student/${rollNo}`);
  };

  const handleDelete = async (rollNo) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/students/${rollNo}`); // Adjust the URL if needed
      setStudents(students.filter(student => student.rollNo !== rollNo));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const addStudent = () => {
    navigate('/add-student');
  };

  return (
    <div className="student-list-container">
      <div className="header">
        <h1>Student List</h1>
        {isAuthenticated && (
          <button className="add-student-btn" onClick={addStudent}>Add Student</button>
        )}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Section</th>
              <th>Qualified</th>
              {isAuthenticated && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.rollNo}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.section}</td>
                <td>{student.qualified}</td>
                {isAuthenticated && (
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(student.rollNo)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(student.rollNo)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
