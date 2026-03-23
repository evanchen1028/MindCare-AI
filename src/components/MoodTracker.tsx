import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Heart, Zap, AlertCircle } from 'lucide-react';
import { MoodEntry } from '../types';
import { mockMoodEntries } from '../data/mockData';
import { format } from 'date-fns';

const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodEntries);
  const [newEntry, setNewEntry] = useState({
    mood: 5,
    energy: 5,
    anxiety: 5,
    note: '',
    tags: [] as string[]
  });

  const handleSubmitEntry = () => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: newEntry.mood,
      energy: newEntry.energy,
      anxiety: newEntry.anxiety,
      note: newEntry.note,
      tags: newEntry.tags
    };

    setMoodEntries([entry, ...moodEntries]);
    setNewEntry({
      mood: 5,
      energy: 5,
      anxiety: 5,
      note: '',
      tags: []
    });
  };

  const chartData = moodEntries
    .slice(-7)
    .reverse()
    .map(entry => ({
      date: format(entry.date, 'MMM dd'),
      mood: entry.mood,
      energy: entry.energy,
      anxiety: 10 - entry.anxiety, // Invert anxiety for better visualization
    }));

  const averageMood = moodEntries.reduce((acc, entry) => acc + entry.mood, 0) / moodEntries.length;

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mood Tracker</h2>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-primary-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-primary-600">Average Mood</p>
                  <p className="text-2xl font-bold text-primary-900">{averageMood.toFixed(1)}/10</p>
                </div>
              </div>
            </div>
            
            <div className="bg-healing-50 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-healing-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-healing-600">Days Tracked</p>
                  <p className="text-2xl font-bold text-healing-900">{moodEntries.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-calm-50 rounded-lg p-4">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-calm-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-calm-600">Streak</p>
                  <p className="text-2xl font-bold text-calm-900">7 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mood Chart */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Mood Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#3B82F6" strokeWidth={3} name="Mood" />
                <Line type="monotone" dataKey="energy" stroke="#10B981" strokeWidth={3} name="Energy" />
                <Line type="monotone" dataKey="anxiety" stroke="#F59E0B" strokeWidth={3} name="Calm" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Entry Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h3>
          
          <div className="space-y-6">
            {/* Mood Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  Mood
                </label>
                <span className="text-lg font-semibold text-primary-600">{newEntry.mood}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={newEntry.mood}
                onChange={(e) => setNewEntry({ ...newEntry, mood: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Very Low</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Energy Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                  Energy
                </label>
                <span className="text-lg font-semibold text-healing-600">{newEntry.energy}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={newEntry.energy}
                onChange={(e) => setNewEntry({ ...newEntry, energy: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Exhausted</span>
                <span>Energized</span>
              </div>
            </div>

            {/* Anxiety Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                  Anxiety
                </label>
                <span className="text-lg font-semibold text-orange-600">{newEntry.anxiety}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={newEntry.anxiety}
                onChange={(e) => setNewEntry({ ...newEntry, anxiety: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Very Calm</span>
                <span>Very Anxious</span>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={newEntry.note}
                onChange={(e) => setNewEntry({ ...newEntry, note: e.target.value })}
                placeholder="What's on your mind today?"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSubmitEntry}
              className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Save Today's Entry
            </button>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
          <div className="space-y-4">
            {moodEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {format(entry.date, 'MMMM d, yyyy')}
                  </span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-primary-600">Mood: {entry.mood}/10</span>
                    <span className="text-healing-600">Energy: {entry.energy}/10</span>
                    <span className="text-orange-600">Anxiety: {entry.anxiety}/10</span>
                  </div>
                </div>
                {entry.note && (
                  <p className="text-gray-600 text-sm">{entry.note}</p>
                )}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;