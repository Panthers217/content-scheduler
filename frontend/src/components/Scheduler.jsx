import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl } from '../config/api'

export default function Scheduler() {
  const [items, setItems] = useState([])
  const [templates, setTemplates] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    scheduledTime: '',
    status: 'scheduled',
    author: 'user',
    category: 'general',
    platform: 'general',
    tags: '',
    isRecurring: false,
    recurringType: 'daily',
    recurringInterval: 1,
    recurringEndDate: '',
    templateId: ''
  })
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [bulkUploadFile, setBulkUploadFile] = useState(null)
  const [templateForm, setTemplateForm] = useState({
    name: '',
    title: '',
    content: '',
    category: 'general',
    platform: 'general',
    tags: ''
  })
  const [filter, setFilter] = useState({
    category: '',
    platform: '',
    status: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchPosts()
    fetchTemplates()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/posts'))
      setItems(response.data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setItems([])
    }
  }

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/templates'))
      setTemplates(response.data || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
      setTemplates([])
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t._id === templateId)
    if (template) {
      setFormData(prev => ({
        ...prev,
        title: template.title,
        content: template.content,
        category: template.category,
        platform: template.platform,
        tags: template.tags.join(', '),
        templateId: templateId
      }))
    }
  }

  const addItem = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return

    setIsLoading(true)
    setErrorMessage('')

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        scheduledTime: formData.scheduledTime || new Date().toISOString()
      }

      if (formData.isRecurring) {
        postData.recurringPattern = {
          type: formData.recurringType,
          interval: parseInt(formData.recurringInterval),
          endDate: formData.recurringEndDate || null
        }
      }

      const response = await axios.post(getApiUrl('/api/posts'), postData)
      setItems([response.data, ...items])
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        scheduledTime: '',
        status: 'scheduled',
        author: 'user',
        category: 'general',
        platform: 'general',
        tags: '',
        isRecurring: false,
        recurringType: 'daily',
        recurringInterval: 1,
        recurringEndDate: '',
        templateId: ''
      })
      
      console.log('Post saved successfully:', response.data)
    } catch (error) {
      console.error('Failed to save post:', error)
      setErrorMessage('Failed to save post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const saveTemplate = async (e) => {
    e.preventDefault()
    if (!templateForm.name.trim() || !templateForm.title.trim()) return

    try {
      const templateData = {
        ...templateForm,
        tags: templateForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }

      const response = await axios.post(getApiUrl('/api/templates'), templateData)
      setTemplates([response.data, ...templates])
      setShowTemplateModal(false)
      
      // Reset template form
      setTemplateForm({
        name: '',
        title: '',
        content: '',
        category: 'general',
        platform: 'general',
        tags: ''
      })
    } catch (error) {
      console.error('Failed to save template:', error)
      alert('Failed to save template. Please try again.')
    }
  }

  const handleBulkUpload = async (e) => {
    e.preventDefault()
    if (!bulkUploadFile) {
      alert('Please select a CSV file')
      return
    }

    const formData = new FormData()
    formData.append('csvFile', bulkUploadFile)

    try {
      setIsLoading(true)
      const response = await axios.post(getApiUrl('/api/bulk-upload'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      alert(`Successfully uploaded ${response.data.created} posts. ${response.data.errors} errors.`)
      fetchPosts()
      setShowBulkUpload(false)
      setBulkUploadFile(null)
    } catch (error) {
      console.error('Bulk upload failed:', error)
      alert('Bulk upload failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadTemplate = () => {
    window.open(getApiUrl('/api/bulk-upload/template'), '_blank')
  }

  // Filter posts based on current filters
  const filteredItems = items.filter(item => {
    return (!filter.category || item.category === filter.category) &&
           (!filter.platform || item.platform === filter.platform) &&
           (!filter.status || item.status === filter.status)
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Schedule Content
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            New Template
          </button>
          <button
            onClick={() => setShowBulkUpload(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            Bulk Upload
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={addItem} className="mb-8 space-y-4">
        {/* Template Selection */}
        {templates.length > 0 && (
          <div>
            <label className="block text-white text-sm font-medium mb-2">Use Template (Optional)</label>
            <select
              name="templateId"
              value={formData.templateId}
              onChange={(e) => {
                handleInputChange(e)
                if (e.target.value) handleTemplateSelect(e.target.value)
              }}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a template...</option>
              {templates.map(template => (
                <option key={template._id} value={template._id} className="bg-gray-800">
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Post title"
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Scheduled Time</label>
            <input
              type="datetime-local"
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Post content"
            required
            rows="3"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Advanced Options Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="general">General</option>
                  <option value="marketing">Marketing</option>
                  <option value="updates">Updates</option>
                  <option value="announcements">Announcements</option>
                  <option value="social">Social</option>
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Platform</label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="general">General</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="tag1, tag2, tag3"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Recurring Options */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <label className="text-white text-sm font-medium">Recurring Post</label>
              </div>

              {formData.isRecurring && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Frequency</label>
                    <select
                      name="recurringType"
                      value={formData.recurringType}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Interval</label>
                    <input
                      type="number"
                      name="recurringInterval"
                      value={formData.recurringInterval}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">End Date (Optional)</label>
                    <input
                      type="date"
                      name="recurringEndDate"
                      value={formData.recurringEndDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-lg hover:from-blue-700 hover:to-slate-800 transition-all duration-200 font-medium shadow-lg disabled:opacity-50"
        >
          {isLoading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>

      {/* Filters */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <h3 className="text-white font-medium mb-3">Filter Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filter.category}
            onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="marketing">Marketing</option>
            <option value="updates">Updates</option>
            <option value="announcements">Announcements</option>
            <option value="social">Social</option>
          </select>
          <select
            value={filter.platform}
            onChange={(e) => setFilter(prev => ({ ...prev, platform: e.target.value }))}
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
            value={filter.status}
            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Posts Display */}
      <div className="space-y-4">
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg">No posts found</p>
            <p className="text-sm mt-1">Create your first scheduled post above</p>
          </div>
        )}
        {filteredItems.map((it, idx) => (
          <div key={it._id || idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/15 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium text-white text-lg">{it.title}</div>
                <div className="text-sm text-white/80 mt-1">{it.content}</div>
                <div className="text-sm text-white/60 mt-2 flex flex-wrap gap-4">
                  <span>📅 {new Date(it.scheduledTime || it.scheduledAt).toLocaleDateString()} at {new Date(it.scheduledTime || it.scheduledAt).toLocaleTimeString()}</span>
                  {it.category && <span>🏷️ {it.category}</span>}
                  {it.platform && <span>📱 {it.platform}</span>}
                  {it.isRecurring && <span>🔄 Recurring</span>}
                </div>
                {it.tags && it.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {it.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                  it.status === 'published' ? 'bg-green-600' :
                  it.status === 'draft' ? 'bg-yellow-600' :
                  'bg-blue-600'
                }`}>
                  {it.status || 'scheduled'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-medium">Create Template</h3>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={saveTemplate} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Template Name *</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Template name"
                  required
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={templateForm.title}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Post title template"
                  required
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Content *</label>
                <textarea
                  value={templateForm.content}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Template content"
                  required
                  rows="3"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Category</label>
                  <select
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="general">General</option>
                    <option value="marketing">Marketing</option>
                    <option value="updates">Updates</option>
                    <option value="announcements">Announcements</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Platform</label>
                  <select
                    value={templateForm.platform}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="general">General</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  value={templateForm.tags}
                  onChange={(e) => setTemplateForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
                  className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-medium">Bulk Upload Posts</h3>
              <button
                onClick={() => setShowBulkUpload(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-white/80 text-sm mb-2">
                  Upload a CSV file with your posts. 
                  <button
                    onClick={downloadTemplate}
                    className="text-blue-400 hover:text-blue-300 underline ml-1"
                  >
                    Download template
                  </button>
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setBulkUploadFile(e.target.files[0])}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBulkUpload(false)}
                  className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUpload}
                  disabled={!bulkUploadFile || isLoading}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
