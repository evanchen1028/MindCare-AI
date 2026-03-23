import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Exercises from './components/Exercises';
import Calendar from './components/Calendar';
import CrisisSupport from './components/CrisisSupport';
import HealthAssessment from './components/HealthAssessment';
import MentalHealthSolutions from './components/MentalHealthSolutions';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'health-assessment':
        return <HealthAssessment />;
      case 'mental-health':
        return <MentalHealthSolutions />;
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <Journal />;
      case 'exercises':
        return <Exercises />;
      case 'calendar':
        return <Calendar />;
      case 'crisis':
        return <CrisisSupport />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;