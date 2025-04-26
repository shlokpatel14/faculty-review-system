import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './DepatCourse.css';

const AddCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [semester, setSemester] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error

  const [departments, setDepartments] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check HOD authentication
    const hodToken = localStorage.getItem('hod_token');
    if (!hodToken) {
      navigate('/hod/login');
      return;
    }

    // ✅ Fetch departments and faculty list
    const fetchData = async () => {
      try {
        const deptRes = await axios.get('/departments');
        setDepartments(deptRes.data);

        const facultyRes = await axios.get('/faculty');
        setFacultyList(facultyRes.data);
      } catch (error) {
        setMessageType('error');
        setMessage('Error fetching data');
      }
    };
    fetchData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/courses', {
        course_id: courseId,
        course_name: courseName,
        department_id: departmentId,
        semester: semester,
        faculty_id: facultyId
      });

      setMessage('Course added successfully!');
      setMessageType('success');

      setCourseId('');
      setCourseName('');
      setDepartmentId('');
      setSemester('');
      setFacultyId('');
    } catch (err) {
      setMessageType('error');
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Course</h2>

      {message && (
        <p className={`form-message ${messageType}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />

        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.department_id} value={dept.department_id}>
              {dept.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        />

        <select
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          required
        >
          <option value="">Assign Faculty</option>
          {facultyList.map((fac) => (
            <option key={fac.faculty_id} value={fac.faculty_id}>
              {fac.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
