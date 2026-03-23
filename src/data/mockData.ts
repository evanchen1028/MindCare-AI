import { MoodEntry, JournalEntry, Exercise, CrisisResource } from '../types';

export const mockMoodEntries: MoodEntry[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    mood: 7,
    energy: 6,
    anxiety: 4,
    note: 'Had a good day at work, feeling positive',
    tags: ['work', 'positive'],
    symptoms: ['mild headache'],
    medications: ['acetaminophen 500mg']
  },
  {
    id: '2',
    date: new Date('2024-01-14'),
    mood: 5,
    energy: 4,
    anxiety: 6,
    note: 'Feeling a bit overwhelmed with tasks',
    tags: ['stress', 'work'],
    symptoms: ['fatigue', 'tension'],
    medications: []
  },
  {
    id: '3',
    date: new Date('2024-01-13'),
    mood: 8,
    energy: 7,
    anxiety: 3,
    note: 'Great weekend with family',
    tags: ['family', 'relaxation'],
    symptoms: [],
    medications: []
  },
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    title: 'Reflection on Today',
    content: 'Today was a good day. I managed to complete my tasks and felt productive. I\'m grateful for the support from my colleagues.',
    mood: 7,
    tags: ['gratitude', 'work'],
    prompt: 'What are three things you\'re grateful for today?',
    healthConcerns: ['mild stress'],
    treatmentPlan: ['deep breathing exercises', 'regular breaks']
  },
  {
    id: '2',
    date: new Date('2024-01-13'),
    title: 'Weekend Thoughts',
    content: 'Spent quality time with family. These moments remind me of what\'s truly important in life.',
    mood: 8,
    tags: ['family', 'values'],
    healthConcerns: [],
    treatmentPlan: []
  }
];

export const mockExercises: Exercise[] = [
  {
    id: '1',
    title: 'Deep Breathing Exercise',
    description: 'Practice 4-7-8 breathing technique to reduce anxiety and promote relaxation',
    duration: 5,
    category: 'breathing',
    completed: true,
    completedAt: new Date('2024-01-15T09:00:00'),
    healthBenefits: ['Reduces anxiety', 'Lowers blood pressure', 'Improves focus'],
    precautions: ['Stop if you feel dizzy', 'Practice in a safe environment']
  },
  {
    id: '2',
    title: 'Mindful Body Scan',
    description: 'Focus on different parts of your body to increase awareness and reduce tension',
    duration: 10,
    category: 'mindfulness',
    completed: false,
    healthBenefits: ['Reduces muscle tension', 'Improves body awareness', 'Promotes relaxation'],
    precautions: ['Find a comfortable position', 'Don\'t force relaxation']
  },
  {
    id: '3',
    title: 'Thought Challenging',
    description: 'Identify and challenge negative thought patterns using CBT techniques',
    duration: 15,
    category: 'cbt',
    completed: false,
    healthBenefits: ['Improves mood', 'Reduces negative thinking', 'Builds resilience'],
    precautions: ['Work with a therapist if needed', 'Be patient with the process']
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Systematically tense and relax muscle groups to reduce physical stress',
    duration: 12,
    category: 'movement',
    completed: true,
    completedAt: new Date('2024-01-14T18:30:00'),
    healthBenefits: ['Reduces muscle tension', 'Improves sleep quality', 'Lowers stress hormones'],
    precautions: ['Avoid if you have muscle injuries', 'Don\'t over-tense muscles']
  },
  {
    id: '5',
    title: 'Gentle Neck Stretches',
    description: 'Simple neck and shoulder stretches to relieve tension and improve mobility',
    duration: 8,
    category: 'physical-therapy',
    completed: false,
    healthBenefits: ['Relieves neck pain', 'Improves range of motion', 'Reduces headaches'],
    precautions: ['Move slowly and gently', 'Stop if you feel pain', 'Consult doctor for chronic pain']
  }
];

export const crisisResources: CrisisResource[] = [
  {
    id: '1',
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: 'Free and confidential support for people in distress',
    available24h: true,
    type: 'mental-health'
  },
  {
    id: '2',
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Free, 24/7 support via text message',
    available24h: true,
    type: 'mental-health'
  },
  {
    id: '3',
    name: 'SAMHSA National Helpline',
    phone: '1-800-662-4357',
    description: 'Treatment referral and information service',
    available24h: true,
    type: 'mental-health'
  },
  {
    id: '4',
    name: 'Emergency Medical Services',
    phone: '911',
    description: 'Immediate medical emergency response',
    available24h: true,
    type: 'medical-emergency'
  },
  {
    id: '5',
    name: 'Poison Control Center',
    phone: '1-800-222-1222',
    description: 'Emergency poison information and treatment advice',
    available24h: true,
    type: 'poison-control'
  }
];

export const aiResponses = [
  "I understand you're experiencing these symptoms. Based on what you've shared, I recommend starting with rest and hydration. However, if your symptoms worsen or you develop a fever above 101°F, please consult a healthcare provider.",
  "Thank you for sharing your health concerns with me. For your current symptoms, here are some evidence-based recommendations. Remember, this guidance doesn't replace professional medical advice.",
  "I notice you mentioned feeling anxious about your symptoms. It's natural to feel concerned about your health. Let me provide some practical steps you can take while monitoring your condition.",
  "Based on your symptoms, I can suggest some safe, over-the-counter options and home remedies. However, please seek immediate medical attention if you experience any red flag symptoms.",
  "Your mental health is just as important as your physical health. I'm here to provide support and evidence-based strategies. If you're having thoughts of self-harm, please reach out to a crisis helpline immediately.",
  "I can help you understand your symptoms and provide general health guidance. For persistent or severe symptoms, it's important to consult with a healthcare professional for proper diagnosis and treatment.",
];