import React, { useState } from 'react';
import { PlusCircle, BookOpen, Calendar, Tag, Search } from 'lucide-react';
import { JournalEntry } from '../types';
import { mockJournalEntries } from '../data/mockData';
import { format } from 'date-fns';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 5,
    tags: [] as string[],
    tagInput: ''
  });

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a challenging situation you handled well recently.",
    "What emotions are you experiencing right now, and what might be causing them?",
    "Write about a person who has positively influenced your life.",
    "What would you tell your younger self?",
    "Describe your ideal day. What makes it special?",
    "What are you looking forward to this week?"
  ];

  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handleSubmitEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags,
      prompt: selectedPrompt || undefined
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: '', content: '', mood: 5, tags: [], tagInput: '' });
    setSelectedPrompt('');
    setIsWriting(false);
  };

  const handleAddTag = () => {
    if (newEntry.tagInput.trim() && !newEntry.tags.includes(newEntry.tagInput.trim())) {
      setNewEntry({
        ...newEntry,
        tags: [...newEntry.tags, newEntry.tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewEntry({
      ...newEntry,
      tags: newEntry.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isWriting) {
    return (
      <div className="h-full bg-gray-50 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">New Journal Entry</h2>
              <button
                onClick={() => setIsWriting(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>

            {/* Journal Prompts */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Need inspiration? Try a prompt:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {journalPrompts.slice(0, 4).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPrompt(prompt)}
                    className={`text-left p-3 rounded-lg border transition-colors ${
                      selectedPrompt === prompt
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm">{prompt}</p>
                  </button>
                ))}
              </div>
              {selectedPrompt && (
                <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-700 font-medium">Selected prompt:</p>
                  <p className="text-sm text-primary-600">{selectedPrompt}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder="Give your entry a title..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your thoughts
                </label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder="Write about your thoughts, feelings, experiences..."
                  rows={12}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Mood */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    How are you feeling? (1-10)
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
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newEntry.tagInput}
                    onChange={(e) => setNewEntry({ ...newEntry, tagInput: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add tags..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Add
                  </button>
                </div>
                {newEntry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newEntry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-primary-500 hover:text-primary-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmitEntry}
                disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Personal Journal</h2>
                <p className="text-gray-500">Reflect on your thoughts and experiences</p>
              </div>
            </div>
            <button
              onClick={() => setIsWriting(true)}
              className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your entries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-primary-600">Total Entries</p>
                  <p className="text-xl font-bold text-primary-900">{entries.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-healing-50 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-healing-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-healing-600">This Month</p>
                  <p className="text-xl font-bold text-healing-900">
                    {entries.filter(entry => 
                      entry.date.getMonth() === new Date().getMonth()
                    ).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-calm-50 rounded-lg p-4">
              <div className="flex items-center">
                <Tag className="w-6 h-6 text-calm-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-calm-600">Unique Tags</p>
                  <p className="text-xl font-bold text-calm-900">
                    {new Set(entries.flatMap(entry => entry.tags)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl p-6 shadow-sm animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{entry.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{format(entry.date, 'MMMM d, yyyy')}</span>
                    <span>Mood: {entry.mood}/10</span>
                  </div>
                </div>
              </div>
              
              {entry.prompt && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                  <p className="text-sm text-gray-600 italic">Prompt: {entry.prompt}</p>
                </div>
              )}
              
              <div className="prose prose-gray max-w-none mb-4">
                <p className="text-gray-700 leading-relaxed">{entry.content}</p>
              </div>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {filteredEntries.length === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-sm text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No entries match your search' : 'No journal entries yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Start documenting your thoughts and experiences'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setIsWriting(true)}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Write Your First Entry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;