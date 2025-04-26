import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import * as XLSX from 'xlsx';
import './PerfromanceReport.css';

const PerformanceReport = () => {
  const { course_id } = useParams();
  const [reportData, setReportData] = useState({});
  const [courseName, setCourseName] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [semester, setSemester] = useState('');
  const [term] = useState('T242'); // Static term
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  const parameters = [
    { key: 'rating_parameter1', question: '1) Has the teacher covered entire syllabus as prescribed by University?' },
    { key: 'rating_parameter2', question: '2) Has the teacher covered relevant topics beyond syllabus?' },
    { key: 'rating_parameter3', question: '3) Effectiveness of a teacher in terms of: Technical content, communication skills, use of teaching aids' },
    { key: 'rating_parameter4', question: '4) Pace at which contents are covered' },
    { key: 'rating_parameter5', question: '5) Motivation and inspiration for student to learn' },
    { key: 'rating_parameter6', question: '6) Support for the development of students\' skills (Practical skills, hands-on training)' },
    { key: 'rating_parameter7', question: '7) Clarity of expectation from students' },
    { key: 'rating_parameter8', question: '8) Feedback provided on students\' progress' },
    { key: 'rating_parameter9', question: '9) Willingness to offer help and advice to students' },
  ];

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token =
          localStorage.getItem('token') ||
          localStorage.getItem('hod_token') ||
          localStorage.getItem('faculty_token');

        if (!token) {
          alert("Unauthorized Access");
          return navigate('/');
        }

        const res = await axios.get(`/reviews/report/${course_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.data.total_reviews) {
          alert("No reviews found for this course.");
          return navigate('/');
        }

        setCourseName(res.data.course_info.course_name);
        setSemester(res.data.course_info.semester); // ✅ lowercase 'semester'
        setFacultyName(res.data.faculty_info.faculty_name); // ✅ faculty name
        setDepartment(res.data.faculty_info.branch);
        setReportData(res.data.summary);
        setIsAuthorized(true);
      } catch (err) {
        console.error(err);
        alert("Error fetching report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [course_id, navigate]);

  const downloadExcel = () => {
    const headerInfo = [
      ['Performance Report'],
      [`Faculty Name: ${facultyName || 'N/A'}`],
      [`Course Name: ${courseName || 'N/A'}`],
      [`Department: ${department || 'N/A'}`],
      [`Semester: ${semester || 'N/A'}`],
      [`Term: ${term}`],
      [''], // Empty row
    ];

    const tableHeader = [
      ['Parameter', '1 rating', '2 rating', '3 rating', '4 rating', '5 rating']
    ];

    const tableBody = parameters.map((param) => [
      param.question,
      reportData[param.key]?.[1] || 0,
      reportData[param.key]?.[2] || 0,
      reportData[param.key]?.[3] || 0,
      reportData[param.key]?.[4] || 0,
      reportData[param.key]?.[5] || 0
    ]);

    const wsData = [...headerInfo, ...tableHeader, ...tableBody];
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Performance Report");

    XLSX.writeFile(workbook, `Performance_Report_${course_id}.xlsx`);
  };

  if (loading) return <div className='load'>Loading...</div>;
  if (!isAuthorized) return null;

  return (
    <div className="report-container">
      <h2>Performance Report</h2>

      <p><strong>Faculty Name:</strong> {facultyName || 'N/A'}</p>
      <p><strong>Course Name:</strong> {courseName || 'N/A'}</p>
      <p><strong>Department:</strong> {department || 'N/A'}</p>
      <p><strong>Semester:</strong> {semester || 'N/A'}</p>
      <p><strong>Term:</strong> {term}</p>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>1 rating</th>
            <th>2 rating</th>
            <th>3 rating</th>
            <th>4 rating</th>
            <th>5 rating</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param) => (
            <tr key={param.key}>
              <td>{param.question}</td>
              <td>{reportData[param.key]?.[1] || 0}</td>
              <td>{reportData[param.key]?.[2] || 0}</td>
              <td>{reportData[param.key]?.[3] || 0}</td>
              <td>{reportData[param.key]?.[4] || 0}</td>
              <td>{reportData[param.key]?.[5] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="download-buttons">
        <button onClick={downloadExcel}>Download Excel</button>
      </div>
    </div>
  );
};

export default PerformanceReport;
