import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, Pill, Shield, CheckCircle, Clock, Phone } from 'lucide-react';
import { HealthAssessment, MedicationRecommendation } from '../types';
import { commonSymptoms, otcMedications, emergencyProtocols } from '../data/healthData';

const HealthAssessmentComponent: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);
  const [showEmergencyProtocol, setShowEmergencyProtocol] = useState(false);

  const symptomsList = [
    'Fever', 'Cough', 'Headache', 'Sore throat', 'Runny nose', 'Body aches',
    'Nausea', 'Vomiting', 'Diarrhea', 'Fatigue', 'Dizziness', 'Chest pain',
    'Shortness of breath', 'Abdominal pain', 'Back pain', 'Joint pain'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const generateAssessment = () => {
    if (selectedSymptoms.length === 0) return;

    // Check for emergency symptoms
    const emergencySymptoms = ['Chest pain', 'Shortness of breath', 'Severe headache'];
    const hasEmergencySymptoms = selectedSymptoms.some(s => emergencySymptoms.includes(s));

    if (hasEmergencySymptoms || severity === 'severe') {
      setShowEmergencyProtocol(true);
      return;
    }

    const recommendations: string[] = [];
    const precautions: string[] = [];
    const medications: MedicationRecommendation[] = [];

    // Generate recommendations based on symptoms
    selectedSymptoms.forEach(symptom => {
      const symptomData = commonSymptoms.find(s => s.symptom.toLowerCase() === symptom.toLowerCase());
      if (symptomData) {
        recommendations.push(...symptomData.homeRemedies);
        precautions.push(...symptomData.whenToSeekHelp);
      }
    });

    // Add appropriate medications
    if (selectedSymptoms.includes('Fever') || selectedSymptoms.includes('Headache') || selectedSymptoms.includes('Body aches')) {
      medications.push(otcMedications.find(m => m.name.includes('Acetaminophen'))!);
      medications.push(otcMedications.find(m => m.name.includes('Ibuprofen'))!);
    }

    const newAssessment: HealthAssessment = {
      id: Date.now().toString(),
      date: new Date(),
      symptoms: selectedSymptoms,
      severity,
      recommendations: [...new Set(recommendations)],
      precautions: [...new Set(precautions)],
      medications,
      followUpRequired: severity === 'moderate' || selectedSymptoms.length > 3,
      emergencyWarning: severity === 'severe' ? 'Seek immediate medical attention' : undefined
    };

    setAssessment(newAssessment);
  };

  const resetAssessment = () => {
    setSelectedSymptoms([]);
    setSeverity('mild');
    setAssessment(null);
    setShowEmergencyProtocol(false);
  };

  if (showEmergencyProtocol) {
    return (
      <div className="h-full bg-red-50 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border-2 border-red-300 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <h2 className="text-2xl font-semibold text-red-900">Emergency Protocol Activated</h2>
                <p className="text-red-700">Your symptoms require immediate medical attention</p>
              </div>
            </div>
            
            <div className="bg-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-medium mb-2">🚨 IMMEDIATE ACTIONS REQUIRED:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Call 911 or go to nearest emergency room</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span>Do not delay seeking medical care</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="tel:911"
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">Call 911</span>
              </a>
              <a
                href="tel:1-800-222-1222"
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">Poison Control</span>
              </a>
              <button
                onClick={resetAssessment}
                className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span>New Assessment</span>
              </button>
            </div>
          </div>

          {emergencyProtocols.map((protocol, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{protocol.situation}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Immediate Actions:</h4>
                  <ul className="space-y-1">
                    {protocol.immediateActions.map((action, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Support Actions:</h4>
                  <ul className="space-y-1">
                    {protocol.supportActions.map((action, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Stethoscope className="w-8 h-8 text-primary-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Health Assessment</h2>
              <p className="text-gray-500">Get personalized health recommendations and precautions</p>
            </div>
          </div>

          {!assessment ? (
            <div className="space-y-6">
              {/* Symptom Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select your symptoms:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {symptomsList.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        selectedSymptoms.includes(symptom)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{symptom}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">How severe are your symptoms?</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['mild', 'moderate', 'severe'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSeverity(level)}
                      className={`p-4 rounded-lg border text-center transition-colors ${
                        severity === level
                          ? level === 'severe' 
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : level === 'moderate'
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium capitalize">{level}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateAssessment}
                disabled={selectedSymptoms.length === 0}
                className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Get Health Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Assessment Results */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Assessment Results</h3>
                <p className="text-blue-700">
                  Based on your symptoms: <strong>{assessment.symptoms.join(', ')}</strong>
                </p>
                <p className="text-blue-700">
                  Severity: <strong className="capitalize">{assessment.severity}</strong>
                </p>
              </div>

              {/* Recommendations */}
              <div className="bg-white border border-green-200 rounded-lg p-6">
                <h4 className="flex items-center text-lg font-semibold text-green-800 mb-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Recommended Actions
                </h4>
                <ul className="space-y-2">
                  {assessment.recommendations.slice(0, 8).map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medications */}
              {assessment.medications && assessment.medications.length > 0 && (
                <div className="bg-white border border-blue-200 rounded-lg p-6">
                  <h4 className="flex items-center text-lg font-semibold text-blue-800 mb-4">
                    <Pill className="w-5 h-5 mr-2" />
                    Suggested Over-the-Counter Medications
                  </h4>
                  <div className="space-y-4">
                    {assessment.medications.map((med, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">{med.name}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Dosage:</strong> {med.dosage}</p>
                            <p><strong>Frequency:</strong> {med.frequency}</p>
                            <p><strong>Duration:</strong> {med.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-orange-700 mb-1">Precautions:</p>
                            <ul className="text-gray-600 space-y-1">
                              {med.precautions.slice(0, 3).map((precaution, idx) => (
                                <li key={idx} className="text-xs">• {precaution}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Precautions */}
              <div className="bg-white border border-orange-200 rounded-lg p-6">
                <h4 className="flex items-center text-lg font-semibold text-orange-800 mb-4">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  When to Seek Medical Help
                </h4>
                <ul className="space-y-2">
                  {assessment.precautions.slice(0, 6).map((precaution, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow-up */}
              {assessment.followUpRequired && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">
                    📅 Follow-up recommended: Consider scheduling an appointment with your healthcare provider if symptoms persist or worsen.
                  </p>
                </div>
              )}

              <button
                onClick={resetAssessment}
                className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                New Assessment
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only and does not constitute medical advice. 
            Always consult with a qualified healthcare professional for proper diagnosis and treatment. In case of emergency, call 911 immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthAssessmentComponent;