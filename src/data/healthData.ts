import { HealthAssessment, MedicationRecommendation, SymptomChecker } from '../types';

export const commonSymptoms: SymptomChecker[] = [
  {
    id: 'fever',
    symptom: 'Fever',
    possibleCauses: ['Viral infection', 'Bacterial infection', 'Inflammatory conditions', 'Heat exhaustion'],
    homeRemedies: [
      'Rest and stay hydrated',
      'Take acetaminophen or ibuprofen as directed',
      'Use cool compresses on forehead',
      'Wear light clothing',
      'Take lukewarm baths'
    ],
    whenToSeekHelp: [
      'Fever above 103°F (39.4°C)',
      'Fever lasting more than 3 days',
      'Severe headache or neck stiffness',
      'Difficulty breathing',
      'Persistent vomiting'
    ],
    redFlags: [
      'Temperature above 104°F (40°C)',
      'Confusion or altered mental state',
      'Severe dehydration',
      'Chest pain or difficulty breathing',
      'Signs of meningitis (neck stiffness, light sensitivity)'
    ]
  },
  {
    id: 'cough',
    symptom: 'Cough',
    possibleCauses: ['Common cold', 'Flu', 'Allergies', 'Bronchitis', 'Asthma'],
    homeRemedies: [
      'Stay hydrated with warm liquids',
      'Use honey (not for children under 1 year)',
      'Gargle with salt water',
      'Use a humidifier',
      'Avoid irritants like smoke'
    ],
    whenToSeekHelp: [
      'Cough lasting more than 3 weeks',
      'Coughing up blood',
      'High fever with cough',
      'Shortness of breath',
      'Chest pain'
    ],
    redFlags: [
      'Coughing up blood or pink foam',
      'Severe difficulty breathing',
      'Blue lips or face',
      'High fever with severe cough',
      'Signs of pneumonia'
    ]
  },
  {
    id: 'headache',
    symptom: 'Headache',
    possibleCauses: ['Tension', 'Stress', 'Dehydration', 'Migraine', 'Sinus congestion'],
    homeRemedies: [
      'Rest in a quiet, dark room',
      'Apply cold or warm compress',
      'Stay hydrated',
      'Gentle neck and shoulder massage',
      'Practice relaxation techniques'
    ],
    whenToSeekHelp: [
      'Sudden severe headache',
      'Headache with fever and neck stiffness',
      'Changes in vision',
      'Headache after head injury',
      'Frequent or worsening headaches'
    ],
    redFlags: [
      'Sudden, severe "thunderclap" headache',
      'Headache with fever, neck stiffness, and rash',
      'Headache with confusion or loss of consciousness',
      'Headache with weakness or numbness',
      'Worst headache of your life'
    ]
  }
];

export const otcMedications: MedicationRecommendation[] = [
  {
    name: 'Acetaminophen (Tylenol)',
    dosage: '500-1000mg',
    frequency: 'Every 4-6 hours',
    duration: 'As needed, max 3 days without consulting doctor',
    type: 'otc',
    precautions: [
      'Do not exceed 4000mg in 24 hours',
      'Avoid alcohol while taking',
      'Check other medications for acetaminophen content'
    ],
    sideEffects: ['Rare: liver damage with overdose', 'Allergic reactions (rare)'],
    contraindications: ['Severe liver disease', 'Allergy to acetaminophen']
  },
  {
    name: 'Ibuprofen (Advil, Motrin)',
    dosage: '200-400mg',
    frequency: 'Every 4-6 hours',
    duration: 'As needed, max 3 days without consulting doctor',
    type: 'otc',
    precautions: [
      'Take with food to reduce stomach irritation',
      'Stay hydrated',
      'Do not exceed 1200mg in 24 hours without medical supervision'
    ],
    sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Kidney problems (with long-term use)'],
    contraindications: ['Kidney disease', 'Heart disease', 'Stomach ulcers', 'Allergy to NSAIDs']
  },
  {
    name: 'Diphenhydramine (Benadryl)',
    dosage: '25-50mg',
    frequency: 'Every 4-6 hours',
    duration: 'As needed for allergies',
    type: 'otc',
    precautions: [
      'May cause drowsiness',
      'Avoid driving or operating machinery',
      'Avoid alcohol'
    ],
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision', 'Constipation'],
    contraindications: ['Glaucoma', 'Enlarged prostate', 'Severe asthma', 'Age under 2 years']
  }
];

export const mentalHealthStrategies = [
  {
    condition: 'Anxiety',
    immediateStrategies: [
      'Practice 4-7-8 breathing technique',
      'Use 5-4-3-2-1 grounding method',
      'Progressive muscle relaxation',
      'Mindful observation of surroundings'
    ],
    longTermStrategies: [
      'Regular exercise routine',
      'Consistent sleep schedule',
      'Limit caffeine and alcohol',
      'Practice daily meditation',
      'Cognitive behavioral therapy techniques'
    ],
    precautions: [
      'Avoid excessive caffeine',
      'Monitor alcohol consumption',
      'Seek professional help if symptoms worsen',
      'Don\'t stop prescribed medications without consulting doctor'
    ],
    whenToSeekHelp: [
      'Panic attacks interfering with daily life',
      'Persistent worry for more than 6 months',
      'Physical symptoms like chest pain or shortness of breath',
      'Avoiding important activities due to anxiety'
    ]
  },
  {
    condition: 'Depression',
    immediateStrategies: [
      'Engage in small, achievable activities',
      'Spend time in natural light',
      'Connect with supportive friends or family',
      'Practice self-compassion'
    ],
    longTermStrategies: [
      'Establish daily routine',
      'Regular physical activity',
      'Maintain social connections',
      'Consider therapy or counseling',
      'Practice gratitude journaling'
    ],
    precautions: [
      'Monitor for suicidal thoughts',
      'Avoid isolation',
      'Limit alcohol and substance use',
      'Don\'t make major life decisions during depressive episodes'
    ],
    whenToSeekHelp: [
      'Thoughts of self-harm or suicide',
      'Inability to function in daily activities',
      'Symptoms lasting more than 2 weeks',
      'Loss of interest in all activities'
    ]
  }
];

export const emergencyProtocols = [
  {
    situation: 'Suicidal Thoughts',
    immediateActions: [
      'Call 988 (Suicide & Crisis Lifeline) immediately',
      'Go to nearest emergency room',
      'Call 911 if in immediate danger',
      'Remove access to means of self-harm'
    ],
    supportActions: [
      'Stay with the person',
      'Listen without judgment',
      'Encourage professional help',
      'Follow up regularly'
    ]
  },
  {
    situation: 'Severe Allergic Reaction',
    immediateActions: [
      'Call 911 immediately',
      'Use epinephrine auto-injector if available',
      'Help person lie down and elevate legs',
      'Loosen tight clothing'
    ],
    supportActions: [
      'Monitor breathing and pulse',
      'Be prepared to perform CPR',
      'Stay calm and reassuring',
      'Provide information to emergency responders'
    ]
  },
  {
    situation: 'High Fever (104°F+)',
    immediateActions: [
      'Call doctor or 911 immediately',
      'Cool the person with lukewarm water',
      'Remove excess clothing',
      'Apply cool, wet cloths to forehead and wrists'
    ],
    supportActions: [
      'Monitor temperature regularly',
      'Encourage fluid intake if conscious',
      'Watch for signs of confusion or seizures',
      'Prepare for emergency transport'
    ]
  }
];