import React, { useState } from 'react';
import { Brain, Heart, Shield, Lightbulb, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { mentalHealthStrategies } from '../data/healthData';

const MentalHealthSolutions: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [currentMood, setCurrentMood] = useState<number>(5);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [sleepQuality, setSleepQuality] = useState<number>(5);

  const mentalHealthConditions = [
    'Anxiety', 'Depression', 'Stress', 'Insomnia', 'Panic Attacks', 
    'Social Anxiety', 'PTSD', 'Bipolar Disorder', 'OCD', 'ADHD'
  ];

  const getPersonalizedRecommendations = () => {
    const recommendations = [];
    
    // Mood-based recommendations
    if (currentMood <= 3) {
      recommendations.push({
        category: 'Immediate Support',
        actions: [
          'Practice deep breathing for 5 minutes',
          'Call a trusted friend or family member',
          'Engage in a small, pleasant activity',
          'Consider professional counseling'
        ]
      });
    }

    // Stress-based recommendations
    if (stressLevel >= 7) {
      recommendations.push({
        category: 'Stress Management',
        actions: [
          'Take a 10-minute walk outside',
          'Practice progressive muscle relaxation',
          'Limit caffeine intake',
          'Set boundaries with stressful situations'
        ]
      });
    }

    // Sleep-based recommendations
    if (sleepQuality <= 4) {
      recommendations.push({
        category: 'Sleep Hygiene',
        actions: [
          'Establish a consistent bedtime routine',
          'Avoid screens 1 hour before bed',
          'Keep bedroom cool and dark',
          'Consider melatonin (consult doctor first)'
        ]
      });
    }

    return recommendations;
  };

  const selectedStrategy = mentalHealthStrategies.find(s => s.condition === selectedCondition);
  const personalizedRecs = getPersonalizedRecommendations();

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="w-8 h-8 text-purple-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Mental Health Solutions</h2>
              <p className="text-gray-500">Personalized strategies and professional guidance</p>
            </div>
          </div>

          {/* Quick Assessment */}
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Quick Mental Health Check</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    Current Mood (1-10)
                  </label>
                  <span className="text-lg font-semibold text-purple-600">{currentMood}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentMood}
                  onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                    Stress Level (1-10)
                  </label>
                  <span className="text-lg font-semibold text-orange-600">{stressLevel}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    Sleep Quality (1-10)
                  </label>
                  <span className="text-lg font-semibold text-blue-600">{sleepQuality}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          {personalizedRecs.length > 0 && (
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                Personalized Recommendations Based on Your Assessment
              </h3>
              
              <div className="space-y-4">
                {personalizedRecs.map((rec, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">{rec.category}</h4>
                    <ul className="space-y-1">
                      {rec.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Condition Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a specific condition for detailed guidance:</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {mentalHealthConditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => setSelectedCondition(condition)}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    selectedCondition === condition
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{condition}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Strategies */}
        {selectedStrategy && (
          <div className="space-y-6">
            {/* Immediate Strategies */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="flex items-center text-xl font-semibold text-blue-800 mb-4">
                <Lightbulb className="w-6 h-6 mr-2" />
                Immediate Strategies for {selectedCondition}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedStrategy.immediateStrategies.map((strategy, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strategy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Long-term Strategies */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="flex items-center text-xl font-semibold text-green-800 mb-4">
                <Shield className="w-6 h-6 mr-2" />
                Long-term Management Strategies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedStrategy.longTermStrategies.map((strategy, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strategy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Precautions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="flex items-center text-xl font-semibold text-orange-800 mb-4">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Important Precautions
              </h3>
              
              <div className="space-y-3">
                {selectedStrategy.precautions.map((precaution, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{precaution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* When to Seek Help */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="flex items-center text-xl font-semibold text-red-800 mb-4">
                <AlertTriangle className="w-6 h-6 mr-2" />
                When to Seek Professional Help
              </h3>
              
              <div className="space-y-3">
                {selectedStrategy.whenToSeekHelp.map((warning, index) => (
                  <div key={index} className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{warning}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-red-100 rounded-lg">
                <p className="text-red-800 font-medium">
                  🚨 If you're experiencing thoughts of self-harm or suicide, please seek immediate help:
                </p>
                <div className="flex space-x-3 mt-2">
                  <a
                    href="tel:988"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Call 988
                  </a>
                  <a
                    href="sms:741741?body=HOME"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Text HOME to 741741
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Professional Resources */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Mental Health Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Therapy & Counseling</h4>
              <p className="text-sm text-gray-600 mb-3">Find licensed therapists and counselors</p>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Find Therapists
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Support Groups</h4>
              <p className="text-sm text-gray-600 mb-3">Connect with peer support communities</p>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Join Groups
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Crisis Intervention</h4>
              <p className="text-sm text-gray-600 mb-3">24/7 crisis support and intervention</p>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Get Help Now
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Mental Health Disclaimer:</strong> This information is for educational purposes only and does not replace professional mental health treatment. 
            If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthSolutions;