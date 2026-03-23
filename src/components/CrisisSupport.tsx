import React, { useState } from 'react';
import { Phone, MessageCircle, AlertTriangle, Heart, Clock, ExternalLink, Shield } from 'lucide-react';
import { crisisResources } from '../data/mockData';

const CrisisSupport: React.FC = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);

  const copingStrategies = [
    {
      title: "Box Breathing",
      description: "Breathe in for 4, hold for 4, breathe out for 4, hold for 4. Repeat.",
      icon: "🫁",
      steps: ["Inhale slowly for 4 counts", "Hold your breath for 4 counts", "Exhale slowly for 4 counts", "Hold empty for 4 counts", "Repeat 4-6 times"]
    },
    {
      title: "5-4-3-2-1 Grounding",
      description: "Use your senses to ground yourself in the present moment.",
      icon: "🌟",
      steps: ["5 things you can see", "4 things you can touch", "3 things you can hear", "2 things you can smell", "1 thing you can taste"]
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release muscle groups to reduce physical tension.",
      icon: "💪",
      steps: ["Start with your toes", "Tense muscles for 5 seconds", "Release and relax for 10 seconds", "Move up through your body", "End with facial muscles"]
    },
    {
      title: "Safe Place Visualization",
      description: "Imagine a place where you feel completely safe and calm.",
      icon: "🏞️",
      steps: ["Close your eyes gently", "Imagine your safe place", "Notice the colors and details", "Feel the peace and safety", "Stay here as long as needed"]
    }
  ];

  const warningSigns = [
    "Thoughts of hurting yourself or others",
    "Feeling completely hopeless",
    "Substance abuse as a way to cope",
    "Extreme mood swings",
    "Inability to perform daily activities",
    "Hearing voices or seeing things others don't",
    "Feeling disconnected from reality"
  ];

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Emergency Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h2 className="text-2xl font-semibold text-red-900">Crisis Support</h2>
              <p className="text-red-700">Immediate help is available 24/7</p>
            </div>
          </div>
          
          <div className="bg-red-100 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-medium mb-2">
              🚨 If you're having thoughts of suicide or self-harm, please reach out immediately:
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:988"
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Call 988</span>
              </a>
              <a
                href="sms:741741?body=HOME"
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">Text HOME to 741741</span>
              </a>
              <button
                onClick={() => setEmergencyMode(!emergencyMode)}
                className="flex items-center space-x-2 bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Emergency Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Crisis Hotlines & Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisResources.map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  </div>
                  {resource.available24h && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      24/7
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <a
                    href={`tel:${resource.phone.replace(/\D/g, '')}`}
                    className="flex items-center space-x-2 bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{resource.phone}</span>
                  </a>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {resource.available24h ? '24/7 Available' : 'Limited Hours'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Signs */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">When to Seek Immediate Help</h3>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 font-medium mb-2">
              Seek immediate professional help if you experience any of these warning signs:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {warningSigns.map((sign, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{sign}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Coping Strategies */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Immediate Coping Strategies</h3>
          <p className="text-gray-600 mb-6">Try these techniques to help manage intense feelings:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copingStrategies.map((strategy, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{strategy.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{strategy.title}</h4>
                    <p className="text-sm text-gray-600">{strategy.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {strategy.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-2">
                      <span className="bg-primary-100 text-primary-700 text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span className="text-sm text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Planning */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Safety Plan</h3>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Warning Signs I Should Watch For:</h4>
              <textarea
                placeholder="List your personal warning signs..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">People I Can Contact:</h4>
              <textarea
                placeholder="List trusted friends, family members, or professionals..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Coping Strategies That Work for Me:</h4>
              <textarea
                placeholder="List activities and techniques that help you feel better..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            <button className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium">
              Save My Safety Plan
            </button>
          </div>
        </div>

        {/* Professional Resources */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Find a Therapist</h4>
              <p className="text-sm text-gray-600 mb-3">Connect with mental health professionals in your area</p>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Search Therapists <ExternalLink className="w-3 h-3 inline ml-1" />
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Online Counseling</h4>
              <p className="text-sm text-gray-600 mb-3">Access therapy from the comfort of your home</p>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Learn More <ExternalLink className="w-3 h-3 inline ml-1" />
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Support Groups</h4>
              <p className="text-sm text-gray-600 mb-3">Connect with others who understand your experiences</p>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Find Groups <ExternalLink className="w-3 h-3 inline ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;