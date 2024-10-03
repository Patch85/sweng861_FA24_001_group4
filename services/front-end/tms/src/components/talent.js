import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './talent.css';  // Assuming we will style using CSS
import DatePicker from "react-datepicker";  // To handle date picking
import "react-datepicker/dist/react-datepicker.css";  // DatePicker styles
import axios from 'axios';  // Import Axios

function Talent() {
  // State for input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");

  // Pre-populated skills
  const prePopulatedSkills = ["JavaScript", "Java", "Python", "C++", "DevSecOps", "React", "Angular"];

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);  // Track form validity

  // Handle form reset
  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setPosition("");
    setExperienceLevel("");
    setLocation("");
    setEmail("");
    setPhoneNumber("");
    setStartDate(new Date());
    setEndDate(new Date());
    setSkills([]);
    setCurrentSkill("");
    setErrors({});
    setSuccessMessage("");
  };

  // Handle adding custom skill
  const addSkill = () => {
    const trimmedSkill = currentSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setCurrentSkill("");  // Clear input after adding
    }
  };

  // Handle clicking on a pre-populated skill
  const toggleSkillHighlight = (skill) => {
    if (skills.includes(skill)) {
      // If already highlighted, remove it
      setSkills(skills.filter((s) => s !== skill));
    } else {
      // Add the skill to highlighted skills
      setSkills([...skills, skill]);
    }
  };

    // Validation helper functions
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhoneNumber = (number) => /^[0-9]{10,15}$/.test(number);
    
    // Real-time form validation
    useEffect(() => {
      const validationErrors = {};
  
      // Validate fields
      if (!firstName.trim()) validationErrors.firstName = "First Name is required";
      if (!lastName.trim()) validationErrors.lastName = "Last Name is required";
      if (!position.trim()) validationErrors.position = "Position is required";
      if (!experienceLevel.trim()) validationErrors.experienceLevel = "Experience Level is required";
      if (!location.trim()) validationErrors.location = "Location is required";
      if (!email.trim() || !isValidEmail(email)) validationErrors.email = "Valid email is required";
      if (!phoneNumber.trim() || !isValidPhoneNumber(phoneNumber)) validationErrors.phoneNumber = "Valid phone number is required";
      if (startDate >= endDate) validationErrors.dates = "Start date must be before end date";
      if (skills.length === 0) validationErrors.skills = "At least one skill must be highlighted or added";
  
      // Set validation errors in state
      setErrors(validationErrors);
  
      // If no validation errors exist, form is valid
      setIsFormValid(Object.keys(validationErrors).length === 0);
    }, [firstName, lastName, position, experienceLevel, location, email, phoneNumber, startDate, endDate, skills]);

  // Handle form submission
  const handleAddTalent = async (e) => {
    e.preventDefault();

  // If the form is valid, submit the form
  if (isFormValid) {
    const talent = {
      firstName,
      lastName,
      position,
      experienceLevel,
      location,
      email,
      phoneNumber,
      availability: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      skills,
    };

    try {
      // Send POST request to the backend service
      const response = await axios.post('http://localhost:5002/data', talent);  // Assuming Talent Management runs on port 5002
      console.log('Talent added successfully:', response.data);

      // Success feedback
      setSuccessMessage("Talent successfully added!");

      // Clear the form after 3 seconds
      setTimeout(() => {
        handleReset();
      }, 3000);
    } catch (error) {
      console.error('Error adding talent:', error);
      setErrors({ form: 'Failed to add talent. Please try again.' });
    }
  }
};

  return (
    <div className="talent-container">
      <h1 className="talent-title">Talent</h1>

      {/* Add a link to go back to the Dashboard */}
      <Link to="/dashboard" className="back-to-dashboard-link">
        Back to Dashboard
      </Link>
      <div className="tab-buttons">
        <button className="tab active">Add Talent</button>
        <button className="tab">Find Talent</button>
      </div>

      {/* Display success message when a talent is added */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form className="talent-form" onSubmit={handleAddTalent}>
        <div className="form-row">
          <input 
            type="text" 
            placeholder="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="input-field phone"
          />
        </div>
        {errors.firstName && <p className="error-message-inline">{errors.firstName}</p>}
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="input-field phone"
          />
        </div>
        {errors.lastName && <p className="error-message-inline">{errors.lastName}</p>}
        {/* Other form fields */}
        
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Position" 
            value={position} 
            onChange={(e) => setPosition(e.target.value)} 
            className="input-field phone"
          />
          </div>
          {errors.position && <span className="error-message-inline">{errors.position}</span>}
          <div className="form-row">
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="input-field phone"  // Keep this class for consistent styling
          >
            <option value="">Experience Level</option>
            <option value="Junior">Junior</option>
            <option value="Staff">Staff</option>
            <option value="Senior">Senior</option>
            <option value="Principal">Principal</option>
          </select>
        </div>
        {errors.experienceLevel && <span className="error-message-inline">{errors.experienceLevel}</span>}
        
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="input-field phone"
          />
          </div>
          {errors.location && <span className="error-message-inline">{errors.location}</span>}
          <div className="form-row">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="input-field phone"
          />
        </div>
        {errors.email && <span className="error-message-inline">{errors.email}</span>}
        
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Phone Number" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            className="input-field phone"
          />
          </div>
          {errors.phoneNumber && <span className="error-message-inline">{errors.phoneNumber}</span>}

          <div className="form-row availability-container">
          {/* Availability Section */}
          <label className="availability-label">Availability:</label>
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            className="input-field date-picker"
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
          />
          <span className="to-label">to</span>
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            className="input-field date-picker"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}  // Ensure end date is after start date
            placeholderText="End Date"
          />
        </div>
        {errors.dates && <p className="error-message">{errors.dates}</p>}

        {/* Skills Section */}
        <div className="form-row skill-row">
          <input 
            type="text" 
            placeholder="Add Skill" 
            value={currentSkill} 
            onChange={(e) => setCurrentSkill(e.target.value)} 
            className="input-field skill-input"  // Smaller input for adding skills
          />
          <button type="button" onClick={addSkill} className="add-skill-btn">Add Skill</button>
        </div>

        {/* Skills Display Box */}
        <div className="skills-display-box">
          {/* Prepopulated Skills */}
          <div className="prepopulated-skills">
            {prePopulatedSkills.map((skill, index) => (
              <span 
                key={index} 
                className={`skill-tag ${skills.includes(skill) ? 'highlighted' : ''}`}
                onClick={() => toggleSkillHighlight(skill)}  // Toggle highlight on click
              >
                {skill}
              </span>
            ))}
          </div>
          {/* User-added Skills */}
          <div className="user-added-skills">
            {skills
              .filter(skill => !prePopulatedSkills.includes(skill))  // Show only custom-added skills
              .map((skill, index) => (
              <span 
                key={index} 
                className="skill-tag highlighted"
                onClick={() => toggleSkillHighlight(skill)}  // Allow unhighlighting user-added skills
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Talent</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Talent;
