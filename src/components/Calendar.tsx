import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, User, MapPin } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'therapy' | 'checkup' | 'group' | 'medication';
  therapist?: string;
  location?: string;
  notes?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Weekly Therapy Session',
      date: new Date(2024, 0, 18, 14, 0),
      time: '2:00 PM',
      type: 'therapy',
      therapist: 'Dr. Sarah Johnson',
      location: 'Downtown Medical Center',
      notes: 'Focus on anxiety management techniques'
    },
    {
      id: '2',
      title: 'Medication Check-in',
      date: new Date(2024, 0, 22, 10, 30),
      time: '10:30 AM',
      type: 'medication',
      therapist: 'Dr. Michael Chen',
      location: 'Virtual Appointment'
    },
    {
      id: '3',
      title: 'Support Group Meeting',
      date: new Date(2024, 0, 25, 18, 0),
      time: '6:00 PM',
      type: 'group',
      location: 'Community Center - Room B',
      notes: 'Monthly group session'
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(apt => isSameDay(apt.date, date));
  };

  const typeColors = {
    therapy: 'bg-blue-100 text-blue-800 border-blue-200',
    checkup: 'bg-green-100 text-green-800 border-green-200',
    group: 'bg-purple-100 text-purple-800 border-purple-200',
    medication: 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const typeIcons = {
    therapy: '💬',
    checkup: '🩺',
    group: '👥',
    medication: '💊'
  };

  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Calendar</h2>
              <p className="text-gray-500">Manage your therapy appointments and check-ins</p>
            </div>
            <button className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              <Plus className="w-5 h-5" />
              <span>New Appointment</span>
            </button>
          </div>

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month start */}
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="h-24"></div>
            ))}
            
            {/* Month days */}
            {monthDays.map(day => {
              const dayAppointments = getAppointmentsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`h-24 p-2 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                    isToday ? 'border-primary-500 bg-primary-50' :
                    isSelected ? 'border-primary-300 bg-primary-25' :
                    dayAppointments.length > 0 ? 'border-blue-200 bg-blue-25' :
                    'border-gray-200'
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-primary-700' : 
                    isSameMonth(day, currentDate) ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  
                  {dayAppointments.slice(0, 2).map(apt => (
                    <div
                      key={apt.id}
                      className={`text-xs p-1 rounded mb-1 truncate ${typeColors[apt.type]}`}
                    >
                      {typeIcons[apt.type]} {apt.time}
                    </div>
                  ))}
                  
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayAppointments.length - 2} more
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          
          <div className="space-y-4">
            {appointments
              .filter(apt => apt.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map(apt => (
                <div key={apt.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm border ${typeColors[apt.type]}`}>
                          {typeIcons[apt.type]} {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                        </span>
                        <h4 className="font-medium text-gray-900">{apt.title}</h4>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {format(apt.date, 'EEEE, MMMM d, yyyy')} at {apt.time}
                        </div>
                        
                        {apt.therapist && (
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {apt.therapist}
                          </div>
                        )}
                        
                        {apt.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {apt.location}
                          </div>
                        )}
                        
                        {apt.notes && (
                          <p className="text-gray-500 italic mt-2">{apt.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          {appointments.filter(apt => apt.date >= new Date()).length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📅</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h4>
              <p className="text-gray-500 mb-4">Schedule your next therapy session or check-in</p>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                Schedule Appointment
              </button>
            </div>
          )}
        </div>

        {/* Selected Day Details */}
        {selectedDate && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            
            {getAppointmentsForDay(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getAppointmentsForDay(selectedDate).map(apt => (
                  <div key={apt.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{apt.title}</h4>
                        <p className="text-sm text-gray-600">{apt.time}</p>
                        {apt.therapist && (
                          <p className="text-sm text-gray-600">with {apt.therapist}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm border ${typeColors[apt.type]}`}>
                        {typeIcons[apt.type]} {apt.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No appointments scheduled for this day</p>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Add Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;