// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StudentAuth from './components/studentAuth';
import HODLogin from './components/HODLogin';
import FacultyLogin from'./components/FacultyLogin';
import FacultyRegister from './components/FacultyRegister';
import ProtectedRoute from './components/ProtectedRoute';
import HODDashboard from './components/HODDashboard';
import StudentDashboard from './components/StudentDashboard';  
//import StudentDashboard from './components/StudentDashboard'; // when you make it
import FacultyDashboard from './components/FacultyDashboard'; 
import AddDepartment from './components/AddDepartment';
import AddCourse from './components/AddCourse';
import SubmitReview from './components/SubmitReview';
import GetCoursesFaculty from './components/GetCoursesFaculty'; 
import GetCoursesStudent from './components/GetCoursesStudent';
import CourseReviews from './components/CourseReview'; // import CourseReviews when ready
import PerfomanceReport from './components/PerformanceReport.jsx'; // import PerfomanceReport when ready
import FacultyList from './components/FacultyList.jsx';
import StudentList from './components/StudentList.jsx';
import CourseListByDepartment from './components/CourseListByDepartment.jsx'; // import CourseListByDepartment when ready

// import Dashboards when ready

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/student/login" element={<StudentAuth />} />
        <Route path="/hod/login" element={<HODLogin />} />
        { <Route path="/faculty/login" element={<FacultyLogin />} /> }
        <Route path="/hod/AddDepartment" element={<AddDepartment />} />
        <Route path="/hod/AddCourse" element={<AddCourse />} />
        <Route path="/student/review/:course_id" element={<SubmitReview />} />
        <Route path="/faculty/login/dashboard/GetCoursesFaculty" element={<GetCoursesFaculty />} />
        <Route path="/student/login/dashboard/GetCoursesStudent" element={<GetCoursesStudent />} />
        <Route path="/faculty/reviews/:course_id" element={<CourseReviews />} />
        <Route path="/reviews/report/:course_id" element={<PerfomanceReport />} />
        <Route
          path="/faculty/register"
          element={
            <ProtectedRoute>
              <FacultyRegister />
            </ProtectedRoute>
          }
        />
        <Route path="/hod/listCourse" element={<CourseListByDepartment />} />
        <Route path="/hod/student-list" element={<StudentList />} />
        <Route path="/hod/faculty-list" element={<FacultyList />} />
        { <Route path="/hod/login/dashboard" element={<HODDashboard />} /> }
        { <Route path="/student/login/dashboard" element={<StudentDashboard />} /> }
        { <Route path="/faculty/dashboard" element={<FacultyDashboard />} /> }
        {/* <Route path="/student/dashboard" element={<StudentDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
