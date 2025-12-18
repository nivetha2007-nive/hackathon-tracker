import React, { useState } from 'react';
import HackathonDashboard from './components/HackathonDashboard';
import TeamMemberDashboard from './components/TeamMemberDashboard';
import './styles/index.css';

function App() {
  const [currentView, setCurrentView] = useState('hackathons'); // 'hackathons' or 'members'

  return (
    <div className="App">
      <header className="app-header">
        <h1>Hackathon Tracker</h1>
        <div className="nav-tabs">
          <button
            className={`nav-btn ${currentView === 'hackathons' ? 'active' : ''}`}
            onClick={() => setCurrentView('hackathons')}
          >
            Hackathons
          </button>
          <button
            className={`nav-btn ${currentView === 'members' ? 'active' : ''}`}
            onClick={() => setCurrentView('members')}
          >
            Team Members
          </button>
        </div>
      </header>

      <div className="main-content">
        {currentView === 'hackathons' ? <HackathonDashboard /> : <TeamMemberDashboard />}
      </div>
    </div>
  );
}

export default App;
