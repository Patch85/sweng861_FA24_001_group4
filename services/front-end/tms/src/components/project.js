import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './project.css'; // Assuming we will style using CSS
import DatePicker from 'react-datepicker'; // To handle date picking
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker styles
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

function Project() {
  const [activeTab, setActiveTab] = useState('add'); // Default is "Find Project"
  const [searchQuery, setSearchQuery] = useState(''); // Store search input
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Planning',
    skillsRequired: [],
    teamMembers: [],
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all projects when the component mounts
    axios
      .get('/api/projects')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/projects', newProject)
      .then((response) => {
        setProjects([...projects, response.data]);
        setSuccessMessage('Project added successfully!');
        setError('');
      })
      .catch((error) => {
        console.error('Error adding project:', error);
        setError('Failed to add project');
        setSuccessMessage('');
      });
  };

  // Fetch talents when the "Find Talent" tab is clicked
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5003/projects'); // Adjust based on your backend
      setTalents(response.data);
    } catch (error) {
      console.error('Error fetching talent data:', error);
    }
  };

  // Handle tab switch and fetch data for "Find Talent"
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'find') {
      fetchProjects(); // Fetch talents when "Find Talent" tab is clicked
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="project-page">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1 className="project-title">Projects</h1>

      {/* Add a link to go back to the Dashboard */}
      <Link to="/dashboard" className="back-to-dashboard-link">
        Back to Dashboard
      </Link>

      {/* Display tab based on user input */}
      <div className="tab-buttons">
        <button
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => handleTabClick('add')}
        >
          Add Project
        </button>
        <button
          className={`tab ${activeTab === 'find' ? 'active' : ''}`}
          onClick={() => handleTabClick('find')}
        >
          Find Project
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={newProject.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={newProject.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={newProject.endDate}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">
          Add Project
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="project-list">
        {projects.map((project) => (
          <div key={project._id} className="project-item">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>
              Start Date: {new Date(project.startDate).toLocaleDateString()}
            </p>
            <p>End Date: {new Date(project.endDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
