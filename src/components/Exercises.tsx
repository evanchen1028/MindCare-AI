import React, { useState } from 'react';
import { Play, CheckCircle, Clock, Filter, RotateCcw } from 'lucide-react';
import { Exercise } from '../types';
import { mockExercises } from '../data/mockData';
import { format } from 'date-fns';

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);
  const [filter, setFilter] = useState<'all' | 'breathing' | 'mindfulness' | 'cbt' | 'movement'>('all');
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      handleCompleteExercise();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startExercise = (exercise: Exercise) => {
    setActiveExercise(exercise.id);
    setTimer(exercise.duration * 60); // Convert minutes to seconds
    setIsRunning(true);
  };

  const handleCompleteExercise = () => {
    if (activeExercise) {
      setExercises(exercises.map(ex => 
        ex.id === activeExercise 
          ? { ...ex, completed: true, completedAt: new Date() }
          : ex
      ));
      setActiveExercise(null);
      setTimer(0);
      setIsRunning(false);
    }
  };

  const resetExercise = (exerciseId: string) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId 
        ? { ...ex, completed: false, completedAt: undefined }
        : ex
    ));
  };

  const filteredExercises = exercises.filter(exercise => 
    filter === 'all' || exercise.category === filter
  );

  const completedToday = exercises.filter(ex => 
    ex.completed && ex.completedAt && 
    ex.completedAt.toDateString() === new Date().toDateString()
  ).length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const categoryColors = {
    breathing: 'bg-blue-50 text-blue-700 border-blue-200',
    mindfulness: 'bg-green-50 text-green-700 border-green-200',
    cbt: 'bg-purple-50 text-purple-700 border-purple-200',
    movement: 'bg-orange-50 text-orange-700 border-orange-200'
  };

  const categoryIcons = {
    breathing: '🫁',
    mindfulness: '🧘',
    cbt: '🧠',
    movement: '🤸'
  };

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mental Fitness Exercises</h2>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-900">{completedToday}</p>
                <p className="text-sm text-primary-600">Completed Today</p>
              </div>
            </div>
            <div className="bg-healing-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-healing-900">
                  {exercises.filter(ex => ex.completed).length}
                </p>
                <p className="text-sm text-healing-600">Total Completed</p>
              </div>
            </div>
            <div className="bg-calm-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-calm-900">7</p>
                <p className="text-sm text-calm-600">Day Streak</p>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-900">
                  {exercises.reduce((acc, ex) => ex.completed ? acc + ex.duration : acc, 0)}
                </p>
                <p className="text-sm text-yellow-600">Minutes Practiced</p>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-500 text-white border-primary-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              All Exercises
            </button>
            {['breathing', 'mindfulness', 'cbt', 'movement'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as any)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filter === category 
                    ? 'bg-primary-500 text-white border-primary-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {categoryIcons[category as keyof typeof categoryIcons]} {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Active Exercise Timer */}
        {activeExercise && (
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-primary-200">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {exercises.find(ex => ex.id === activeExercise)?.title}
              </h3>
              <div className="text-6xl font-mono font-bold text-primary-600 mb-4">
                {formatTime(timer)}
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {isRunning ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => {
                    setActiveExercise(null);
                    setTimer(0);
                    setIsRunning(false);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
                    {exercise.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm border ${
                    categoryColors[exercise.category]
                  }`}>
                    {categoryIcons[exercise.category]} {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {exercise.duration} min
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{exercise.description}</p>
              
              {exercise.completed && exercise.completedAt && (
                <p className="text-sm text-green-600 mb-4">
                  ✓ Completed on {format(exercise.completedAt, 'MMM d, yyyy \'at\' h:mm a')}
                </p>
              )}
              
              <div className="flex space-x-3">
                {!exercise.completed ? (
                  <button
                    onClick={() => startExercise(exercise)}
                    disabled={activeExercise !== null}
                    className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Exercise</span>
                  </button>
                ) : (
                  <button
                    onClick={() => resetExercise(exercise.id)}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Practice Again</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm text-center">
            <div className="text-4xl mb-4">🧘‍♀️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
            <p className="text-gray-500">Try adjusting your filter to see more exercises</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;