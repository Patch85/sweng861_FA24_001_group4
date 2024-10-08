import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./talent.css"; // Assuming we will style using CSS
import DatePicker from "react-datepicker"; // To handle date picking
import "react-datepicker/dist/react-datepicker.css"; // DatePicker styles
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

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
  // Add this state at the top of your component
  const [activeTab, setActiveTab] = useState("add"); // Default is "Add Talent"
  const [talents, setTalents] = useState([]); // Store fetched talents
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

  // CSV file-related state
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvError, setCsvError] = useState("");
  const navigate = useNavigate();

  // Pre-populated skills
  const prePopulatedSkills = [
    "JavaScript",
    "Java",
    "Python",
    "C++",
    "DevSecOps",
    "React",
    "Angular",
  ];

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

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
    setSelectedFile(null); // If a file was selected
    setCsvError(""); // Clear any error messages
    setSuccessMessage(""); // Clear the success message
  };

  // Handle adding custom skill
  const addSkill = () => {
    const trimmedSkill = currentSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setCurrentSkill(""); // Clear input after adding
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
    if (!firstName.trim())
      validationErrors.firstName = "First Name is required";
    if (!lastName.trim()) validationErrors.lastName = "Last Name is required";
    if (!position.trim()) validationErrors.position = "Position is required";
    if (!experienceLevel.trim())
      validationErrors.experienceLevel = "Experience Level is required";
    if (!location.trim()) validationErrors.location = "Location is required";
    if (!email.trim() || !isValidEmail(email))
      validationErrors.email = "Valid email is required";
    if (!phoneNumber.trim() || !isValidPhoneNumber(phoneNumber))
      validationErrors.phoneNumber = "Valid phone number is required";
    if (startDate >= endDate)
      validationErrors.dates = "Start date must be before end date";
    if (skills.length === 0)
      validationErrors.skills =
        "At least one skill must be highlighted or added";

    // Set validation errors in state
    setErrors(validationErrors);

    // If no validation errors exist, form is valid
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [
    firstName,
    lastName,
    position,
    experienceLevel,
    location,
    email,
    phoneNumber,
    startDate,
    endDate,
    skills,
  ]);

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
        const token = localStorage.getItem("token");
        // Send POST request to the backend service
        const response = await axios.post(
          "http://localhost:5002/data",
          talent,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Assuming Talent Management runs on port 5002
        console.log("Talent added successfully:", response.data);

        // Success feedback
        setSuccessMessage("Talent successfully added!");

        // Clear the form after 3 seconds
        setTimeout(() => {
          handleReset();
        }, 3000);
      } catch (error) {
        console.error("Error adding talent:", error);
        setErrors({ form: "Failed to add talent. Please try again." });
      }
    }
  };

  // Fetch talents when the "Find Talent" tab is clicked
  const fetchTalents = async () => {
    try {
      const response = await axios.get("http://localhost:5002/data"); // Adjust based on your backend
      setTalents(response.data);
    } catch (error) {
      console.error("Error fetching talent data:", error);
    }
  };

  // Filter the talents based on search query
  const filteredTalents = talents.filter((talent) => {
    return (
      talent.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.join(", ").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle tab switch and fetch data for "Find Talent"
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "find") {
      fetchTalents(); // Fetch talents when "Find Talent" tab is clicked
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // CSV Processing Logic (to be executed on submit)
  // Skipping the header row and ignoring empty rows
  const processCSVData = (csvData) => {
    const rows = csvData.split("\n");

    // Skip the header by slicing the array from index 1
    const talents = rows.slice(1).map((row) => {
      const columns = row.split(",");
      return {
        firstName: columns[0].trim(),
        lastName: columns[1].trim(),
        position: columns[2].trim(),
        experienceLevel: columns[3].trim(),
        location: columns[4].trim(),
        email: columns[5].trim(),
        phoneNumber: columns[6].trim(),
        availability: {
          startDate: columns[7].trim(),
          endDate: columns[8].trim(),
        },
        skills: columns[9]
          ? columns[9].split(",").map((skill) => skill.trim())
          : [],
      };
    });

    // Filter out any rows that have empty required fields
    const validTalents = talents.filter(
      (talent) =>
        talent.firstName && talent.lastName && talent.position && talent.email
    );

    return validTalents;
  };

  // Handle form submission (including CSV processing)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvData = event.target.result;

        // Process CSV and send to backend
        const parsedData = processCSVData(csvData);

        if (parsedData.length === 0) {
          setCsvError("No valid rows found in the CSV.");
          return; // Prevent upload if no valid rows are present
        }

        try {
          const token = localStorage.getItem("token"); // Get the token from localStorage
          const response = await axios.post(
            "http://localhost:5002/upload",
            { talents: parsedData },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
              },
            }
          );

          console.log("CSV data successfully uploaded", response.data);

          if (response.status === 201) {
            setSuccessMessage("CSV upload successful!");
            setTimeout(() => {
              handleReset();
            }, 3000);
          }
        } catch (err) {
          if (err.response && err.response.status === 400) {
            setCsvError("Some rows in the CSV have errors.");
            console.error(err.response.data.errors);
          } else {
            setCsvError("Failed to upload CSV. Please try again.");
          }
          console.error("Error uploading CSV data:", err);
        }
      };

      reader.readAsText(selectedFile); // Start reading the file
    } else {
      setCsvError("Please select a CSV file before submitting.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="talent-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="talent-title">Talent</h1>

      {/* Add a link to go back to the Dashboard */}
      <Link to="/dashboard" className="back-to-dashboard-link">
        Back to Dashboard
      </Link>

      {/* Display tab based on user input */}
      <div className="tab-buttons">
        <button
          className={`tab ${activeTab === "add" ? "active" : ""}`}
          onClick={() => handleTabClick("add")}
        >
          Add Talent
        </button>
        <button
          className={`tab ${activeTab === "find" ? "active" : ""}`}
          onClick={() => handleTabClick("find")}
        >
          Find Talent
        </button>
      </div>

      {/* Render only the Find Talent section when "Find Talent" is active */}
      {activeTab === "find" && (
        <div className="find-talent">
          <input
            type="text"
            placeholder="Search Talent by name, position, or skills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-box"
          />

          {/* Display filtered talent list */}
          <div className="talent-list">
            {filteredTalents.length === 0 ? (
              <p>No talent found.</p>
            ) : (
              filteredTalents.map((talent, index) => (
                <div className="talent-card" key={index}>
                  <strong>
                    {talent.firstName} {talent.lastName}
                  </strong>{" "}
                  - {talent.position}
                  <p>Skills: {talent.skills.join(", ")}</p>
                  <p>
                    Availability:{" "}
                    {new Date(
                      talent.availability.startDate
                    ).toLocaleDateString()}
                    to{" "}
                    {new Date(talent.availability.endDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Display success message when a talent is added */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Render only the Add Talent form when "Add Talent" is active */}
      {activeTab === "add" && (
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
          {errors.firstName && (
            <p className="error-message-inline">{errors.firstName}</p>
          )}
          <div className="form-row">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field phone"
            />
          </div>
          {errors.lastName && (
            <p className="error-message-inline">{errors.lastName}</p>
          )}

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
          {errors.position && (
            <span className="error-message-inline">{errors.position}</span>
          )}

          <div className="form-row">
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="input-field phone" // Keep this class for consistent styling
            >
              <option value="">Experience Level</option>
              <option value="Junior">Junior</option>
              <option value="Staff">Staff</option>
              <option value="Senior">Senior</option>
              <option value="Principal">Principal</option>
            </select>
          </div>
          {errors.experienceLevel && (
            <span className="error-message-inline">
              {errors.experienceLevel}
            </span>
          )}

          <div className="form-row">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field phone"
            />
          </div>
          {errors.location && (
            <span className="error-message-inline">{errors.location}</span>
          )}

          <div className="form-row">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field phone"
            />
          </div>
          {errors.email && (
            <span className="error-message-inline">{errors.email}</span>
          )}

          <div className="form-row">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field phone"
            />
          </div>
          {errors.phoneNumber && (
            <span className="error-message-inline">{errors.phoneNumber}</span>
          )}

          <div className="form-row availability-container">
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
              minDate={startDate} // Ensure end date is after start date
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
              className="input-field skill-input" // Smaller input for adding skills
            />
            <button type="button" onClick={addSkill} className="add-skill-btn">
              Add Skill
            </button>
          </div>

          {/* Skills Display Box */}
          <div className="skills-display-box">
            <div className="prepopulated-skills">
              {prePopulatedSkills.map((skill, index) => (
                <span
                  key={index}
                  className={`skill-tag ${
                    skills.includes(skill) ? "highlighted" : ""
                  }`}
                  onClick={() => toggleSkillHighlight(skill)} // Toggle highlight on click
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="user-added-skills">
              {skills
                .filter((skill) => !prePopulatedSkills.includes(skill)) // Show only custom-added skills
                .map((skill, index) => (
                  <span
                    key={index}
                    className="skill-tag highlighted"
                    onClick={() => toggleSkillHighlight(skill)} // Allow unhighlighting user-added skills
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Talent
            </button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>

          {/* File upload for CSV */}
          <div className="csv-upload-form">
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Upload CSV
            </button>
          </div>
          {csvError && <p className="error-message">{csvError}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
      )}
    </div>
  );
}

export default Talent;
