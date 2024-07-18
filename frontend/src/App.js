// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import AdminLogin from './components/AdminLogin';
import EditStudent from './components/EditStudent';
import AddStudent from './components/AddStudent';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar shown on all pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/admin" element={<AdminPage />} /> */}
          <Route path="/students" element={<StudentPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/edit-student/:rollNo" element={<EditStudent />} /> {/* Edit student route */}
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/home" element={<HomePage />} /> Route for home.html
        </Routes>
      </Router>
    </AuthProvider>
  );
};



export default App;
