import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    // Check if user is logged in from local storage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }

    // Handle window resize
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (provider) => {
    if (provider === 'google') {
      console.log('Google clicked');
    } else if (provider === 'apple') {
      console.log('Apple clicked');
    }
    
    // TODO: Add AES with CryptoJS
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        {!isLoggedIn ? (
          <div className="welcome-screen">
            <h1>Welcome to Surgical Companion</h1>
            <div className="login-buttons">
              <button onClick={() => handleLogin('google')} className="login-button google">
                Login with Google
              </button>
              <button onClick={() => handleLogin('apple')} className="login-button apple">
                Login with Apple
              </button>
            </div>
          </div>
        ) : (
          <div className="main-container">
            <button className="menu-toggle" onClick={toggleSidebar}>
              ☰
            </button>
            
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
              <h2>Surgical Companion</h2>
              <nav>
                <ul>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/educational">Educational Content</Link></li>
                  <li><Link to="/personalized-educational">Personalized Educational Content</Link></li>
                  <li><Link to="/timeline">Personalized Timeline</Link></li>
                  <li><Link to="/symptom-tracker">Symptom and Progress Tracker</Link></li>
                  <li><Link to="/medication">Medication Management</Link></li>
                  <li><Link to="/nutrition">Nutrition and Exercise Plans</Link></li>
                  <li><Link to="/mental-health">Mental Health Support</Link></li>
                  <li><Link to="/checklists">Preparation Checklists</Link></li>
                  <li><Link to="/surprises">Post-Op Surprises</Link></li>
                  <li><Link to="/qa">Chat-Like Q&A</Link></li>
                </ul>
              </nav>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
            
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/educational" element={<EducationalContent />} />
                <Route path="/personalized-educational" element={<PersonalizedEducationalContent />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/symptom-tracker" element={<SymptomTracker />} />
                <Route path="/medication" element={<MedicationManagement />} />
                <Route path="/nutrition" element={<NutritionExercise />} />
                <Route path="/mental-health" element={<MentalHealthSupport />} />
                <Route path="/checklists" element={<PreparationChecklists />} />
                <Route path="/surprises" element={<PostOpSurprises />} />
                <Route path="/qa" element={<QandA />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
              
              <div className="privacy-disclaimer">
                Data stays on your device unless synced. Use a secure device. Not medical advice.
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

// Placeholder components for each route
function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to your surgical companion dashboard.</p>
    </div>
  );
}

function EducationalContent() {
  return (
    <div className="content-container">
      <h2>Educational Content</h2>
      <p>General educational resources about surgical procedures.</p>
    </div>
  );
}

function PersonalizedEducationalContent() {
  return (
    <div className="content-container">
      <h2>Personalized Educational Content</h2>
      <p>Educational content tailored to your specific procedure.</p>
    </div>
  );
}

function Timeline() {
  return (
    <div className="content-container">
      <h2>Personalized Timeline</h2>
      <p>Your personalized surgery timeline and milestones.</p>
    </div>
  );
}

function SymptomTracker() {
  return (
    <div className="content-container">
      <h2>Symptom and Progress Tracker</h2>
      <p>Track your symptoms and recovery progress.</p>
    </div>
  );
}

function MedicationManagement() {
  return (
    <div className="content-container">
      <h2>Medication Management</h2>
      <p>Manage your medications and schedules.</p>
    </div>
  );
}

function NutritionExercise() {
  return (
    <div className="content-container">
      <h2>Nutrition and Exercise Plans</h2>
      <p>Recommended nutrition and exercise plans for your recovery.</p>
    </div>
  );
}

function MentalHealthSupport() {
  return (
    <div className="content-container">
      <h2>Mental Health Support</h2>
      <p>Resources and tools to support your mental health during recovery.</p>
    </div>
  );
}

function PreparationChecklists() {
  return (
    <div className="content-container">
      <h2>Preparation Checklists</h2>
      <p>Checklists to help you prepare for your surgery.</p>
    </div>
  );
}

function PostOpSurprises() {
  return (
    <div className="content-container">
      <h2>Post-Op Surprises</h2>
      <p>Information about unexpected aspects of post-operative recovery.</p>
    </div>
  );
}

function QandA() {
  return (
    <div className="content-container">
      <h2>Q&A</h2>
      <p>Ask questions and get answers about your surgical journey.</p>
    </div>
  );
}

export default App;

/* Add this to a new file named App.css in the same directory */
/* 
body {
  margin: 0;
  font-family: Arial, sans-serif;
  font-size: 16px;
  background-color: #E6F0FA;
  color: #1E3A8A;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}

.login-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.login-button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: #1E3A8A;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 250px;
}

.login-button:hover {
  opacity: 0.9;
}

.main-container {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.sidebar {
  width: 250px;
  background-color: #FFFFFF;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  overflow-y: auto;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar.closed {
  width: 0;
  padding: 0;
  overflow: hidden;
}

.sidebar h2 {
  margin-bottom: 20px;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 15px;
}

.sidebar a {
  text-decoration: none;
  color: #1E3A8A;
  display: block;
  padding: 8px 0;
}

.sidebar a:hover {
  text-decoration: underline;
}

.sidebar-toggle {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  background-color: #1E3A8A;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 30px;
  background-color: #E6F0FA;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-container, .dashboard-container {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.privacy-disclaimer {
  margin-top: auto;
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.logout-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #1E3A8A;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 100;
  }
  
  .sidebar.open {
    width: 250px;
  }
  
  .sidebar.closed {
    width: 0;
  }
  
  .content {
    margin-left: 0;
  }
  
  .sidebar-toggle {
    display: block;
  }
}
*/
