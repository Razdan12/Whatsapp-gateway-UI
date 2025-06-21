"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye, Webhook, CheckCircle, XCircle, AlertCircle, Copy, Play } from 'lucide-react'

const webhooks = [
  {
    id: 1,
    name: "Message Events",
    url: "https://api.yourapp.com/webhooks/whatsapp/messages",
    events: ["message.received", "message.delivered", "message.read"],
    status: "active",
    lastTriggered: "2 minutes ago",
    successRate: "99.2%",
    totalCalls: 15420,
  },
  {
    id: 2,
    name: "Status Updates",
    url: "https://api.yourapp.com/webhooks/whatsapp/status",
    events: ["status.update", "phone.verified"],
    status: "active",
    lastTriggered: "15 minutes ago",
    successRate: "98.7%",
    totalCalls: 8934,
  },
  {
    id: 3,
    name: "Error Notifications",
    url: "https://api.yourapp.com/webhooks/whatsapp/errors",
    events: ["message.failed", "webhook.failed"],
    status: "inactive",
    lastTriggered: "2 hours ago",
    successRate: "95.1%",
    totalCalls: 234,
  },
]

const availableEvents = [
  { id: "message.received", name: "Message Received", description: "Triggered when a message is received" },
  { id: "message.delivered", name: "Message Delivered", description: "Triggered when a message is delivered" },
  { id: "message.read", name: "Message Read", description: "Triggered when a message is read" },
  { id: "message.failed", name: "Message Failed", description: "Triggered when a message fails to send" },
  { id: "status.update", name: "Status Update", description: "Triggered when contact status changes" },
  { id: "phone.verified", name: "Phone Verified", description: "Triggered when a phone number is verified" },
  { id: "webhook.failed", name: "Webhook Failed", description: "Triggered when a webhook delivery fails" },
]

export default function ApisPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState(null)

  const filteredWebhooks = webhooks.filter((webhook) => {
    const matchesSearch = webhook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webhook.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || webhook.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold ">WhatsApp APIs</h2>
          <p className="">Configure endpoints to receive real-time WhatsApp events</p>
        </div>
       
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search webhooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        
        </div>
      </div>

      {/* Webhooks Table */}
      <div className="bg-base-100 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-base-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Webhook
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Events
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Triggered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {filteredWebhooks.map((webhook) => (
                <tr key={webhook.id} className="hover:bg-base-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                        <Webhook className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium ">{webhook.name}</div>
                        <div className="text-sm  font-mono">{webhook.url}</div>
                        <div className="text-xs ">{webhook.totalCalls.toLocaleString()} total calls</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        webhook.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 "
                      }`}
                    >
                      {webhook.status === "active" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {webhook.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.slice(0, 2).map((event) => (
                        <span
                          key={event}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {event}
                        </span>
                      ))}
                      {webhook.events.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{webhook.events.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium ">{webhook.successRate}</span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: webhook.successRate }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">{webhook.lastTriggered}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                      
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Webhook Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setShowCreateModal(false)}
            />
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create Webhook</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Message Events"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://api.yourapp.com/webhooks/whatsapp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Events to Subscribe</label>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                    {availableEvents.map((event) => (
                      <label key={event.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.name}</div>
                          <div className="text-xs text-gray-500">{event.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Create Webhook
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
