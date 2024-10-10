// Projects.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./projects.css"; // Add any necessary styles here

function Projects() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("add");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to home page
  };

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Planning",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5003/projects", newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Project added successfully!");
      setNewProject({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Planning",
      });
    } catch (error) {
      console.error("Error adding project:", error);
      setErrors("Failed to add project. Please try again.");
    }
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch projects when "Find Project" tab is active
  useEffect(() => {
    if (activeTab === "find") {
      const fetchProjects = async () => {
        try {
          setLoading(true);
          setError("");
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:5003/projects", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProjects(response.data);
        } catch (err) {
          setError("Failed to load projects. Please try again.");
          console.error("Error fetching projects:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }
  }, [activeTab]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="projects-container">
      {/* Logout button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1 className="projects-title">Projects</h1>

      {/* Back to Dashboard Link */}
      <button
        className="back-to-dashboard-link"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>

      {/* Tab buttons */}
      <div className="tab-buttons">
        <button
          className={`tab ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Add Project
        </button>
        <button
          className={`tab ${activeTab === "find" ? "active" : ""}`}
          onClick={() => setActiveTab("find")}
        >
          Find Project
        </button>
      </div>

      {/* Display success message when a talent is added */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Content area for each tab */}
      <div className="content-area">
        {activeTab === "add" && (
          <div className="add-project-container">
            {activeTab === "add" && (
              <div className="add-project-form">
                <h2>Add New Project</h2>
                <form onSubmit={handleAddProject}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={handleInputChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <label>
                    Start Date:
                    <input
                      type="date"
                      name="startDate"
                      value={newProject.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    End Date:
                    <input
                      type="date"
                      name="endDate"
                      value={newProject.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <select
                    name="status"
                    value={newProject.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button type="submit" className="submit-project-btn">
                    Add Project
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === "find" && (
          <div className="find-project-container">
            {activeTab === "find" && (
              <div className="project-list">
                {loading ? (
                  <p>Loading projects...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
                ) : projects.length > 0 ? (
                  <ul>
                    {projects.map((project) => (
                      <li key={project._id} className="project-item">
                        <strong>{project.name}</strong> - {project.status}
                        <br />
                        Description:{" "}
                        {project.description || "No description provided"}
                        <br />
                        Duration: {formatDate(project.startDate)} to{" "}
                        {formatDate(project.endDate)}
                        <br />
                        Skills Required:{" "}
                        {project.skillsRequired.length > 0
                          ? project.skillsRequired.join(", ")
                          : "None specified"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No projects available.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
