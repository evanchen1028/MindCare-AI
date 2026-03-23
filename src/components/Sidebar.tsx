import React from 'react';
import { 
  MessageCircle, 
  Heart, 
  BookOpen, 
  Calendar, 
  Activity, 
  AlertTriangle,
  Brain,
  Stethoscope,
  Shield
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'health-assessment', label: 'Health Assessment', icon: Stethoscope },
    { id: 'mental-health', label: 'Mental Health Solutions', icon: Brain },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'exercises', label: 'Exercises', icon: Activity },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'crisis', label: 'Crisis Support', icon: AlertTriangle },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Shield className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">HealthCare AI</h1>
            <p className="text-sm text-gray-500">Advanced Health Copilot</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCrisis = tab.id === 'crisis';
          const isHealth = tab.id === 'health-assessment';
          const isMentalHealth = tab.id === 'mental-health';
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? isCrisis
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : isHealth
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : isMentalHealth
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                isActive && isCrisis ? 'text-red-600' : 
                isActive && isHealth ? 'text-blue-600' :
                isActive && isMentalHealth ? 'text-purple-600' :
                isActive ? 'text-primary-600' : 'text-gray-400'
              }`} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-healing-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-healing-800 mb-2">Health Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-healing-600">Daily goals</span>
              <span className="font-medium text-healing-800">3/5</span>
            </div>
            <div className="w-full bg-healing-200 rounded-full h-2">
              <div className="bg-healing-500 h-2 rounded-full w-3/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;