import { Activity, Users, Server, AlertCircle, TrendingUp, Clock, CheckCircle, XCircle, Phone, MessageCircle, Webhook, Send } from 'lucide-react'

const stats = [
  {
    name: "Phone Numbers",
    value: "4",
    change: "+1 this month",
    changeType: "positive",
    icon: Phone,
  },
  {
    name: "Messages Today",
    value: "1.2K",
    change: "+15.3%",
    changeType: "positive",
    icon: MessageCircle,
  },
  {
    name: "Delivery Rate",
    value: "98.5%",
    change: "+2.1%",
    changeType: "positive",
    icon: CheckCircle,
  },
  {
    name: "Active Webhooks",
    value: "8",
    change: "+2 this week",
    changeType: "positive",
    icon: Webhook,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "success",
    message: 'Message delivered to +1 (555) 987-6543 via "Customer Support" number',
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    type: "info",
    message: 'New inbound message received from +44 7911 123456',
    timestamp: "5 minutes ago",
  },
  {
    id: 3,
    type: "success",
    message: 'Webhook "message.delivered" sent successfully to your endpoint',
    timestamp: "15 minutes ago",
  },
  {
    id: 4,
    type: "warning",
    message: 'Phone number +91 98765 43210 verification pending',
    timestamp: "1 hour ago",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-base-100 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium ">{stat.name}</p>
                <p className="text-3xl font-bold  mt-2">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-base-200 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp
                className={`w-4 h-4 mr-1 ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}
              />
              <span
                className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </span>
              <span className="text-sm ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-base-100 rounded-xl shadow-md">
          <div className="p-6 ">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2 " />
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm ">{activity.message}</p>
                    <p className="text-xs mt-1">{activity.timestamp}</p>
                  </div>
                  {activity.type === "success" && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {activity.type === "error" && <XCircle className="w-4 h-4 text-red-500" />}
                  {activity.type === "warning" && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                  {activity.type === "info" && <AlertCircle className="w-4 h-4 text-blue-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-base-100 rounded-xl shadow-md">
          <div className="p-6 ">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center p-4 border border-green-400 rounded-lg  hover:bg-base-300 transition-colors text-left">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Send className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Send WhatsApp Message</h4>
                  <p className="text-xs">Send a message to any WhatsApp number</p>
                </div>
              </button>
              <button className="flex items-center p-4 border border-green-400 rounded-lg hover:bg-base-300  transition-colors text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium ">Add Phone Number</h4>
                  <p className="text-xs">Connect a new WhatsApp Business number</p>
                </div>
              </button>
              <button className="flex items-center p-4 border border-green-400 rounded-lg  hover:bg-base-300  transition-colors text-left">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Webhook className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium ">Configure Webhook</h4>
                  <p className="text-xs">Set up webhook endpoints for events</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Usage Chart Placeholder */}
      <div className="bg-base-100 rounded-xl shadow-md">
        <div className="p-6 ">
          <h3 className="text-lg font-semibold ">WhatsApp Message Analytics</h3>
        </div>
        <div className="p-6">
          <div className="h-64 bg-base-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Message delivery and engagement metrics would go here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
