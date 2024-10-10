import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [talents, setTalents] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState(null); // Track selected talent
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch talents when "My Talent" tab is active
  useEffect(() => {
    if (activeTab === "talent") {
      const fetchTalents = async () => {
        try {
          setLoading(true);
          setError("");
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "http://localhost:5002/user-talents",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setTalents(response.data);
        } catch (err) {
          setError("Failed to load talents. Please try again.");
          console.error("Error fetching talents:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchTalents();
    }
  }, [activeTab]);

  // Handle talent selection
  const handleSelectTalent = (talent) => {
    setSelectedTalent(talent);
    setEditMode(false);
  };

  // Toggle edit mode and load selected talent's data
  const handleEdit = () => setEditMode(true);

  // Update the selected talent data in state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTalent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle availability date change
  const handleDateChange = (field, value) => {
    setSelectedTalent((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [field]: value,
      },
    }));
  };

  // Save updated talent data to the backend
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5002/data/${selectedTalent._id}`,
        selectedTalent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTalents((prev) =>
        prev.map((talent) =>
          talent._id === selectedTalent._id ? response.data : talent
        )
      );
      setEditMode(false);
      setSelectedTalent(null); // Clear selection after save
    } catch (error) {
      setError("Failed to update talent.");
      console.error("Error updating talent:", error);
    }
  };

  // Delete the selected talent
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5002/data/${selectedTalent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTalents((prev) =>
        prev.filter((talent) => talent._id !== selectedTalent._id)
      );
      setSelectedTalent(null); // Clear selection after delete
    } catch (error) {
      setError("Failed to delete talent.");
      console.error("Error deleting talent:", error);
    }
  };

  // Helper to format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handles cases where the date might be missing
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as "MM/DD/YYYY" or customize if needed
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-buttons">
        <button className="dashboard-btn" onClick={() => navigate("/talent")}>
          Talent
        </button>

        <button className="dashboard-btn" onClick={() => navigate("/projects")}>
          Projects
        </button>
      </div>

      <div className="tabs-container">
        <div
          className={`tab ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          My Projects
        </div>
        <div
          className={`tab ${activeTab === "talent" ? "active" : ""}`}
          onClick={() => setActiveTab("talent")}
        >
          My Talent
        </div>
      </div>

      <div className="content-area">
        {activeTab === "projects" && <p>Projects feature coming soon...</p>}

        {activeTab === "talent" && (
          <div className="talent-list">
            {loading ? (
              <p>Loading talents...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : talents.length > 0 ? (
              <ul>
                {talents.map((talent) => (
                  <li
                    key={talent._id}
                    className={`talent-item ${
                      selectedTalent?._id === talent._id ? "selected" : ""
                    }`}
                    onClick={() => handleSelectTalent(talent)}
                  >
                    <strong>
                      {talent.firstName} {talent.lastName}
                    </strong>{" "}
                    - {talent.position} - {talent.experienceLevel} -{" "}
                    {talent.location} - {talent.email} - {talent.phoneNumber} -{" "}
                    <br />
                    Availability: {formatDate(
                      talent.availability.startDate
                    )} to {formatDate(talent.availability.endDate)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No talent submissions found.</p>
            )}

            {selectedTalent && (
              <div className="talent-details">
                {editMode ? (
                  <>
                    <input
                      name="firstName"
                      value={selectedTalent.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                    <input
                      name="lastName"
                      value={selectedTalent.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    <input
                      name="position"
                      value={selectedTalent.position}
                      onChange={handleChange}
                      placeholder="Position"
                    />
                    <input
                      name="experienceLevel"
                      value={selectedTalent.experienceLevel}
                      onChange={handleChange}
                      placeholder="Experience Level"
                    />
                    <input
                      name="location"
                      value={selectedTalent.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                    <input
                      name="email"
                      value={selectedTalent.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    <input
                      name="phoneNumber"
                      value={selectedTalent.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={selectedTalent.availability.startDate}
                      onChange={(e) =>
                        handleDateChange("startDate", e.target.value)
                      }
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={selectedTalent.availability.endDate}
                      onChange={(e) =>
                        handleDateChange("endDate", e.target.value)
                      }
                    />
                    <input
                      name="skills"
                      value={selectedTalent.skills.join(", ")}
                      onChange={(e) =>
                        setSelectedTalent((prev) => ({
                          ...prev,
                          skills: e.target.value
                            .split(",")
                            .map((skill) => skill.trim()),
                        }))
                      }
                      placeholder="Skills (comma-separated)"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>
                        {selectedTalent.firstName} {selectedTalent.lastName}
                      </strong>{" "}
                      - {selectedTalent.position}
                    </p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
