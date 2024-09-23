import React from "react";
import { useNavigate } from "react-router-dom";  // For navigation
import './dashboard.css';  // We have a CSS file for styling

function Dashboard() {
  const navigate = useNavigate();  // React Router's navigation function

  return (
    <div className="dashboard-container">
      {/* Dashboard Title */}
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Buttons for Talent and Projects */}
      <div className="dashboard-buttons">
        <button 
          className="dashboard-btn" 
          onClick={() => navigate("/talent")}  // Navigate to Talent page
        >
          Talent
        </button>

        <button 
          className="dashboard-btn"
          onClick={() => alert('Projects feature coming soon!')}  // Placeholder for now
        >
          Projects
        </button>
      </div>

      {/* Tab-like Navigation for Projects and Talent */}
      <div className="tabs-container">
        <div className="tab">My Projects</div>
        <div className="tab">My Talent</div>
      </div>

      {/* Content area (can be dynamically populated based on the selected tab) */}
      <div className="content-area">
        {/* Placeholder content for now */}
        <p>Functionality coming soon...</p>
      </div>
    </div>
  );
}

export default Dashboard;
