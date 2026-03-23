export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice';
  audioUrl?: string;
  category?: 'general' | 'mental-health' | 'medical' | 'emergency';
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: number; // 1-10 scale
  energy: number; // 1-10 scale
  anxiety: number; // 1-10 scale
  note?: string;
  tags: string[];
  symptoms?: string[];
  medications?: string[];
}

export interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: number;
  prompt?: string;
  tags: string[];
  healthConcerns?: string[];
  treatmentPlan?: string[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'breathing' | 'mindfulness' | 'cbt' | 'movement' | 'physical-therapy';
  completed: boolean;
  completedAt?: Date;
  healthBenefits?: string[];
  precautions?: string[];
}

export interface CrisisResource {
  id: string;
  name: string;
  phone: string;
  description: string;
  available24h: boolean;
  type: 'mental-health' | 'medical-emergency' | 'poison-control' | 'general';
}

export interface HealthAssessment {
  id: string;
  date: Date;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  precautions: string[];
  medications?: MedicationRecommendation[];
  followUpRequired: boolean;
  emergencyWarning?: string;
}

export interface MedicationRecommendation {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  precautions: string[];
  sideEffects: string[];
  contraindications: string[];
  type: 'otc' | 'prescription-required';
}

export interface SymptomChecker {
  id: string;
  symptom: string;
  possibleCauses: string[];
  homeRemedies: string[];
  whenToSeekHelp: string[];
  redFlags: string[];
}