import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl } from '../config/api'

export default function Calendar() {
  const [posts, setPosts] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [viewMode, setViewMode] = useState('month') // month, week, day
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [currentDate, viewMode])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(getApiUrl('/api/posts'))
      setPosts(response.data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const getPostsForDate = (date) => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduledTime || post.scheduledAt)
      return isSameDay(postDate, date)
    })
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction * 7))
    setCurrentDate(newDate)
  }

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + direction)
    setCurrentDate(newDate)
  }

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0)
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i
      days.push({
        day,
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day),
        isCurrentMonth: false,
        isPrevMonth: true
      })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
        isCurrentMonth: true,
        isPrevMonth: false
      })
    }

    // Next month's leading days
    const remainingDays = 42 - days.length // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day),
        isCurrentMonth: false,
        isPrevMonth: false
      })
    }

    return days
  }

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day // Adjust to start on Sunday
    startOfWeek.setDate(diff)

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
    return days
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-500'
      case 'draft': return 'bg-yellow-500'
      case 'scheduled': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="Calendar-container lg:p-6 xl:p-6 md:p-6 sm:p-4 xs:p-[0.5rem]">
      {/* Header */}
      <div className="flex xs:inline-block justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Content Calendar
        </h2>

        {/* View Mode Toggle */}
        <div className="flex bg-white/10 rounded-lg p-1">
          {['month', 'week', 'day'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            if (viewMode === 'month') navigateMonth(-1)
            else if (viewMode === 'week') navigateWeek(-1)
            else navigateDay(-1)
          }}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-xl font-semibold text-white">
          {viewMode === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          {viewMode === 'week' && `Week of ${currentDate.toLocaleDateString()}`}
          {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>

        <button
          onClick={() => {
            if (viewMode === 'month') navigateMonth(1)
            else if (viewMode === 'week') navigateWeek(1)
            else navigateDay(1)
          }}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-8 text-white/60">Loading calendar...</div>
      )}

      {/* Month View */}
      {viewMode === 'month' && !isLoading && (
        <div className="bg-white/5 rounded-lg border border-white/10">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-px bg-white/10">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-white/80 font-medium bg-white/5">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-white/10">
            {getCalendarDays().map((dayObj, index) => {
              const dayPosts = getPostsForDate(dayObj.date)
              const isToday = isSameDay(dayObj.date, new Date())
              const isSelected = selectedDate && isSameDay(dayObj.date, selectedDate)

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(dayObj.date)}
                  className={`min-h-[60px] xs:min-h-[80px] sm:min-h-[120px] p-1 xs:p-2 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors ${
                    !dayObj.isCurrentMonth ? 'text-white/40' : 'text-white'
                  } ${isToday ? 'bg-blue-500/20' : ''} ${isSelected ? 'bg-blue-500/30' : ''}`}
                >
                  <div className={`text-xs xs:text-sm font-medium mb-1 ${isToday ? 'text-blue-300' : ''}`}>
                    {dayObj.day}
                  </div>
                  <div className="space-y-1">
                    {dayPosts.slice(0, viewMode === 'month' ? (window.innerWidth < 475 ? 1 : 3) : 3).map(post => (
                      <div
                        key={post._id}
                        className={`text-xs p-1 rounded truncate ${getStatusColor(post.status)} text-white ${
                          post.isDemoData ? 'border border-amber-400/30' : ''
                        }`}
                        title={`${post.title} - ${formatTime(post.scheduledTime || post.scheduledAt)}${post.isDemoData ? ' (Demo Data)' : ''}`}
                      >
                        <span className="xs:hidden">•</span>
                        <span className="hidden xs:inline">{post.isDemoData && '💡 '}{formatTime(post.scheduledTime || post.scheduledAt)} </span>
                        <span className="xs:hidden">{dayPosts.length}</span>
                        <span className="hidden xs:inline">{post.title}</span>
                      </div>
                    ))}
                    {dayPosts.length > (window.innerWidth < 475 ? 1 : 3) && (
                      <div className="text-xs text-white/60">
                        <span className="xs:hidden">+{dayPosts.length - 1}</span>
                        <span className="hidden xs:inline">+{dayPosts.length - 3} more</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === 'week' && !isLoading && (
        <div className="bg-white/5 rounded-lg border border-white/10">
          <div className="grid grid-cols-7 gap-px bg-white/10">
            {getWeekDays().map((date, index) => {
              const dayPosts = getPostsForDate(date)
              const isToday = isSameDay(date, new Date())

              return (
                <div key={index} className="bg-white/5">
                  <div className={`p-3 text-center border-b border-white/10 ${isToday ? 'bg-blue-500/20' : ''}`}>
                    <div className="text-white/80 text-sm">{dayNames[date.getDay()]}</div>
                    <div className={`text-lg font-semibold ${isToday ? 'text-blue-300' : 'text-white'}`}>
                      {date.getDate()}
                    </div>
                  </div>
                  <div className="p-2 min-h-[300px] space-y-1">
                    {dayPosts.map(post => (
                      <div
                        key={post._id}
                        className={`text-xs p-2 rounded ${getStatusColor(post.status)} text-white`}
                      >
                        <div className="font-medium">{formatTime(post.scheduledTime || post.scheduledAt)}</div>
                        <div className="truncate" title={post.title}>{post.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' && !isLoading && (
        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <div className="space-y-4">
            {getPostsForDate(currentDate).length === 0 ? (
              <div className="text-center py-12 text-white/60">
                <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg">No posts scheduled for this day</p>
              </div>
            ) : (
              getPostsForDate(currentDate)
                .sort((a, b) => new Date(a.scheduledTime || a.scheduledAt) - new Date(b.scheduledTime || b.scheduledAt))
                .map(post => (
                  <div key={post._id} className={`bg-white/10 rounded-lg p-4 border ${
                    post.isDemoData ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/20'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(post.status)}`}></div>
                        <span className="text-white/60 text-sm">
                          {formatTime(post.scheduledTime || post.scheduledAt)}
                        </span>
                        {post.isDemoData && (
                          <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                            Demo
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </div>
                    <h3 className="text-white font-medium text-lg mb-2">{post.title}</h3>
                    <p className="text-white/80 mb-3">{post.content}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-white/60">
                      {post.category && <span>🏷️ {post.category}</span>}
                      {post.platform && <span>📱 {post.platform}</span>}
                      {post.isRecurring && <span>🔄 Recurring</span>}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Selected Date Details Modal */}
      {selectedDate && viewMode === 'month' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-medium">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {getPostsForDate(selectedDate).length === 0 ? (
                <p className="text-white/60 text-center py-8">No posts scheduled for this day</p>
              ) : (
                getPostsForDate(selectedDate)
                  .sort((a, b) => new Date(a.scheduledTime || a.scheduledAt) - new Date(b.scheduledTime || b.scheduledAt))
                  .map(post => (
                    <div key={post._id} className="bg-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white/60 text-sm">
                          {formatTime(post.scheduledTime || post.scheduledAt)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      <h4 className="text-white font-medium mb-1">{post.title}</h4>
                      <p className="text-white/80 text-sm">{post.content}</p>
                      {(post.category || post.platform) && (
                        <div className="mt-2 text-xs text-white/60">
                          {post.category && <span>🏷️ {post.category}</span>}
                          {post.platform && <span className="ml-2">📱 {post.platform}</span>}
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}