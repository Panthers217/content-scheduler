import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl } from '../config/api'

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [trends, setTrends] = useState([])
  const [topPosts, setTopPosts] = useState([])
  const [platformBreakdown, setPlatformBreakdown] = useState([])
  const [categoryBreakdown, setCategoryBreakdown] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('views')
  const [filters, setFilters] = useState({
    platform: '',
    category: '',
    startDate: '',
    endDate: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchAllAnalytics()
  }, [selectedPeriod, filters])

  const fetchAllAnalytics = async () => {
    setIsLoading(true)
    try {
      await Promise.all([
        fetchOverview(),
        fetchTrends(),
        fetchTopPosts(),
        fetchPlatformBreakdown(),
        fetchCategoryBreakdown()
      ])
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOverview = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.platform) params.append('platform', filters.platform)
      if (filters.category) params.append('category', filters.category)
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const response = await axios.get(`${getApiUrl('/api/analytics/overview')}?${params}`)
      setAnalytics(response.data)
    } catch (error) {
      console.error('Error fetching overview:', error)
    }
  }

  const fetchTrends = async () => {
    try {
      const params = new URLSearchParams()
      params.append('period', selectedPeriod)
      if (filters.platform) params.append('platform', filters.platform)
      if (filters.category) params.append('category', filters.category)

      const response = await axios.get(`${getApiUrl('/api/analytics/trends')}?${params}`)
      setTrends(response.data)
    } catch (error) {
      console.error('Error fetching trends:', error)
    }
  }

  const fetchTopPosts = async () => {
    try {
      const params = new URLSearchParams()
      params.append('metric', selectedMetric)
      params.append('limit', '5')
      if (filters.platform) params.append('platform', filters.platform)
      if (filters.category) params.append('category', filters.category)

      const response = await axios.get(`${getApiUrl('/api/analytics/top-posts')}?${params}`)
      setTopPosts(response.data)
    } catch (error) {
      console.error('Error fetching top posts:', error)
    }
  }

  const fetchPlatformBreakdown = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const response = await axios.get(`${getApiUrl('/api/analytics/platform-breakdown')}?${params}`)
      setPlatformBreakdown(response.data)
    } catch (error) {
      console.error('Error fetching platform breakdown:', error)
    }
  }

  const fetchCategoryBreakdown = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const response = await axios.get(`${getApiUrl('/api/analytics/category-breakdown')}?${params}`)
      setCategoryBreakdown(response.data)
    } catch (error) {
      console.error('Error fetching category breakdown:', error)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num?.toString() || '0'
  }

  const formatPercentage = (num) => {
    return `${(num || 0).toFixed(1)}%`
  }

  const MetricCard = ({ title, value, change, icon, color = 'blue' }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{formatNumber(value)}</p>
          {change !== undefined && (
            <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '↗' : '↘'} {Math.abs(change).toFixed(1)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20`}>
          {icon}
        </div>
      </div>
    </div>
  )

  const ChartBar = ({ label, value, maxValue, color = 'blue' }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0
    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm text-white/80 mb-1">
          <span>{label}</span>
          <span>{formatNumber(value)}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  if (isLoading && !analytics) {
    return (
      <div className="p-6">
        <div className="text-center py-12 text-white/60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex xs:inline-block justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Post Analytics
        </h2>

        {/* Period Toggle */}
        <div className="flex bg-white/10 rounded-lg p-1">
          {['24h', '7d', '30d', '90d'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-500 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {period.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <h3 className="text-white font-medium mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.platform}
            onChange={(e) => handleFilterChange('platform', e.target.value)}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Platforms</option>
            <option value="general">General</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="marketing">Marketing</option>
            <option value="updates">Updates</option>
            <option value="announcements">Announcements</option>
            <option value="social">Social</option>
          </select>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Overview Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Posts"
            value={analytics.totalPosts}
            icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>}
          />
          <MetricCard
            title="Total Views"
            value={analytics.totalViews}
            icon={<svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>}
            color="green"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${analytics.avgEngagementRate?.toFixed(1) || 0}%`}
            icon={<svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>}
            color="purple"
          />
          <MetricCard
            title="Click-Through Rate"
            value={`${analytics.avgClickThroughRate?.toFixed(1) || 0}%`}
            icon={<svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>}
            color="yellow"
          />
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Trends Chart */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
          <h3 className="text-white font-medium mb-4">Performance Trends</h3>
          <div className="space-y-4">
            {trends.length > 0 ? (
              trends.slice(-7).map((trend, index) => (
                <ChartBar
                  key={trend._id}
                  label={new Date(trend._id).toLocaleDateString()}
                  value={trend[selectedMetric.replace('analytics.', '')] || 0}
                  maxValue={Math.max(...trends.map(t => t[selectedMetric.replace('analytics.', '')] || 0))}
                />
              ))
            ) : (
              <p className="text-white/60 text-center py-8">No trend data available</p>
            )}
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Top Posts</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="p-1 rounded bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="views">Views</option>
              <option value="clicks">Clicks</option>
              <option value="likes">Likes</option>
              <option value="shares">Shares</option>
              <option value="comments">Comments</option>
            </select>
          </div>
          <div className="space-y-3">
            {topPosts.length > 0 ? (
              topPosts.map((post, index) => (
                <div key={post._id} className="top-post-card-div flex xs:inline-block justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium truncate">{post.title}</p>
                    <p className="text-white/60 text-xs">{post.platform} • {post.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{formatNumber(post.analytics[selectedMetric])}</p>
                    <p className="text-white/60 text-xs">#{index + 1}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/60 text-center py-8">No posts data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Breakdown */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
          <h3 className="text-white font-medium mb-4">Platform Performance</h3>
          <div className="space-y-4">
            {platformBreakdown.length > 0 ? (
              platformBreakdown.map((platform, index) => (
                <ChartBar
                  key={platform._id}
                  label={platform._id || 'Unknown'}
                  value={platform.views}
                  maxValue={Math.max(...platformBreakdown.map(p => p.views))}
                  color={['blue', 'green', 'purple', 'yellow', 'red'][index % 5]}
                />
              ))
            ) : (
              <p className="text-white/60 text-center py-8">No platform data available</p>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
          <h3 className="text-white font-medium mb-4">Category Performance</h3>
          <div className="space-y-4">
            {categoryBreakdown.length > 0 ? (
              categoryBreakdown.map((category, index) => (
                <ChartBar
                  key={category._id}
                  label={category._id || 'Unknown'}
                  value={category.views}
                  maxValue={Math.max(...categoryBreakdown.map(c => c.views))}
                  color={['green', 'blue', 'purple', 'yellow', 'red'][index % 5]}
                />
              ))
            ) : (
              <p className="text-white/60 text-center py-8">No category data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}